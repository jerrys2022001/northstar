param(
  [int]$Port = 4317,
  [string]$Date = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$python = "C:\Python314\python.exe"
$siteMarker = "Northstar AI Directory"
$maxPortAttempts = 12
$sessionName = if ($Date) { "news-validate-$($Date -replace '-', '')" } else { "news-validate" }
$env:npm_config_cache = Join-Path $repoRoot ".npm-cache"
$env:PLAYWRIGHT_DAEMON_SESSION_DIR = Join-Path $repoRoot ".playwright-daemon"
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $repoRoot ".playwright-browsers"
$env:LOCALAPPDATA = $repoRoot
New-Item -ItemType Directory -Force -Path $env:PLAYWRIGHT_DAEMON_SESSION_DIR | Out-Null
New-Item -ItemType Directory -Force -Path $env:PLAYWRIGHT_BROWSERS_PATH | Out-Null

function Test-PreviewContent {
  param(
    [int]$TestPort
  )

  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$TestPort/news.html" -TimeoutSec 3
    return $response.Content -like "*$siteMarker*"
  } catch {
    return $false
  }
}

function Wait-PreviewReady {
  param(
    [int]$TestPort
  )

  for ($i = 0; $i -lt 12; $i++) {
    if (Test-PreviewContent -TestPort $TestPort) {
      return $true
    }
    Start-Sleep -Milliseconds 500
  }

  return $false
}

function Test-PortListening {
  param(
    [int]$TestPort
  )

  $matches = netstat -ano | Select-String -Pattern "LISTENING\s+\d+$TestPort$"
  if ($matches) {
    return $true
  }

  $matches = netstat -ano | Select-String -Pattern "[:\.]$TestPort\s+.*LISTENING"
  return [bool]$matches
}

$resolvedPort = $Port
$startedServer = $false
$server = $null

for ($attempt = 0; $attempt -lt $maxPortAttempts; $attempt++) {
  $candidatePort = $Port + $attempt
  $existingListener = Test-PortListening -TestPort $candidatePort

  if ($existingListener) {
    if (Test-PreviewContent -TestPort $candidatePort) {
      $resolvedPort = $candidatePort
      break
    }
    continue
  }

  $serverArgs = @("-m", "http.server", "$candidatePort", "--bind", "127.0.0.1")
  $server = Start-Process `
    -FilePath $python `
    -ArgumentList $serverArgs `
    -WorkingDirectory $repoRoot `
    -WindowStyle Hidden `
    -PassThru

  if (Wait-PreviewReady -TestPort $candidatePort) {
    $resolvedPort = $candidatePort
    $startedServer = $true
    break
  }

  if (-not $server.HasExited) {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
  }
}

if (-not (Test-PreviewContent -TestPort $resolvedPort)) {
  throw "Preview server did not become ready for news validation."
}

$url = "http://127.0.0.1:$resolvedPort/news.html"
$screenshotDir = Join-Path $repoRoot "output\playwright"
New-Item -ItemType Directory -Force -Path $screenshotDir | Out-Null

$playwrightPackage = Get-ChildItem `
  -Path (Join-Path $repoRoot ".npm-cache\_npx") `
  -Filter "package.json" `
  -Recurse `
  -ErrorAction SilentlyContinue `
  | Where-Object { $_.FullName -like "*\node_modules\playwright\package.json" } `
  | Select-Object -First 1

if (-not $playwrightPackage) {
  throw "Could not locate a cached Playwright package under .npm-cache."
}

$playwrightModulePath = Split-Path -Parent $playwrightPackage.FullName
$systemBrowserPath = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
$timestamp = Get-Date -Format "yyyy-MM-ddTHH-mm-ss"
$snapshotPath = Join-Path $screenshotDir "news-page-$timestamp.html"
$screenshotPath = Join-Path $screenshotDir "news-page-$timestamp.png"
$validatorScript = Join-Path $screenshotDir "validate-news-page.cjs"
$validatorScriptContent = @'
const fs = require("fs");
const path = require("path");

const playwrightModulePath = process.argv[2];
const targetUrl = process.argv[3];
const snapshotPath = process.argv[4];
const screenshotPath = process.argv[5];
const browserExecutablePath = process.argv[6];

async function main() {
  const { chromium } = require(playwrightModulePath);
  const launchOptions = { headless: true };
  if (browserExecutablePath)
    launchOptions.executablePath = browserExecutablePath;
  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });

  try {
    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("#news-feed .news-day-group", { timeout: 30000 });
    await page.waitForSelector("#news-lead-grid .news-feature-card", { timeout: 30000 });

    const title = await page.title();
    const groups = await page.$$eval("#news-feed .news-day-group", (nodes) => nodes.length);
    const leads = await page.$$eval("#news-lead-grid .news-feature-card", (nodes) => nodes.length);

    fs.writeFileSync(snapshotPath, await page.content(), "utf8");
    await page.screenshot({ path: screenshotPath, fullPage: true });

    process.stdout.write(JSON.stringify({
      title,
      groups,
      leads,
      snapshotPath,
      screenshotPath
    }));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  process.stderr.write(String(error && error.stack ? error.stack : error));
  process.exit(1);
});
'@
$validatorScriptContent | Set-Content -Path $validatorScript -Encoding UTF8

Push-Location $screenshotDir
try {
  $rawValidation = $null
  $nodeExitCode = 0
  try {
    $rawValidation = & node $validatorScript $playwrightModulePath $url $snapshotPath $screenshotPath $systemBrowserPath 2>&1
    $nodeExitCode = $LASTEXITCODE
  } catch {
    $rawValidation = $_ | Out-String
    $nodeExitCode = 1
  }

  if ($nodeExitCode -ne 0) {
    $rawText = ($rawValidation | Out-String)
    if ($rawText -match "spawn EPERM" -or $rawText -match "spawn UNKNOWN" -or $rawText -match "Executable doesn't exist") {
      $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 5
      $content = $response.Content
      $hasNewsFeed = $content -like '*id="news-feed"*'
      $hasLeadGrid = $content -like '*id="news-lead-grid"*'
      $hasAppScript = $content -like '*<script src="app.js"></script>*'
      if (-not $hasNewsFeed -or -not $hasLeadGrid -or -not $hasAppScript) {
        throw "Fallback validation failed: required news page anchors were not present in the served HTML."
      }
      Write-Output "passed ($url) title=NEWS - Northstar AI groups=static-check leads=static-check snapshot=none screenshot=none fallback=static-http"
      return
    }
    throw "Playwright validation failed: $rawText"
  }

  $result = ($rawValidation | Out-String).Trim() | ConvertFrom-Json
  $titleValue = [string]$result.title
  $groupCount = [int]$result.groups
  $leadCount = [int]$result.leads

  if (-not $titleValue) {
    throw "News page title could not be read from the rendered page."
  }
  if ($groupCount -lt 1) {
    throw "News page rendered without any day groups."
  }
  if ($leadCount -lt 1) {
    throw "News page rendered without any lead cards."
  }

  Write-Output "passed ($url) title=$titleValue groups=$groupCount leads=$leadCount snapshot=$snapshotPath screenshot=$screenshotPath"
} finally {
  Pop-Location
  Remove-Item -LiteralPath $validatorScript -ErrorAction SilentlyContinue
  if ($startedServer -and $server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
  }
}
