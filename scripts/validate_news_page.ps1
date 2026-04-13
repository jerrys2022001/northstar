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

function Invoke-PlaywrightCli {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$Arguments
  )

  $output = & npx.cmd --yes --package @playwright/cli playwright-cli --session $sessionName @Arguments 2>&1
  $text = ($output | Out-String).Trim()
  if ($LASTEXITCODE -ne 0 -or $text -match "### Error") {
    throw "Playwright CLI failed: $text"
  }
  return $text
}

Push-Location $screenshotDir
try {
  $openOutput = Invoke-PlaywrightCli -Arguments @("open", $url)
  $snapshotOutput = Invoke-PlaywrightCli -Arguments @("snapshot")
  $titleOutput = Invoke-PlaywrightCli -Arguments @("eval", "document.title")
  $groupCountOutput = Invoke-PlaywrightCli -Arguments @("eval", "document.querySelectorAll('#news-feed .news-day-group').length")
  $leadCountOutput = Invoke-PlaywrightCli -Arguments @("eval", "document.querySelectorAll('#news-lead-grid .news-feature-card').length")
  $screenshotOutput = Invoke-PlaywrightCli -Arguments @("screenshot")

  $titleMatch = [regex]::Match($titleOutput, "### Result\s+([\s\S]+)$")
  $titleValue = if ($titleMatch.Success) { $titleMatch.Groups[1].Value.Trim() } else { "" }
  $groupMatch = [regex]::Match($groupCountOutput, "### Result\s+(\d+)")
  $leadMatch = [regex]::Match($leadCountOutput, "### Result\s+(\d+)")
  $groupCount = if ($groupMatch.Success) { [int]$groupMatch.Groups[1].Value } else { 0 }
  $leadCount = if ($leadMatch.Success) { [int]$leadMatch.Groups[1].Value } else { 0 }

  if (-not $titleValue) {
    throw "News page title could not be read from the rendered page."
  }
  if ($groupCount -lt 1) {
    throw "News page rendered without any day groups."
  }
  if ($leadCount -lt 1) {
    throw "News page rendered without any lead cards."
  }

  $snapshotPath = [regex]::Match($snapshotOutput, "\[Snapshot\]\(([^)]+)\)").Groups[1].Value
  $screenshotPath = [regex]::Match($screenshotOutput, "\[Screenshot\]\(([^)]+)\)").Groups[1].Value
  Write-Output "passed ($url) title=$titleValue groups=$groupCount leads=$leadCount snapshot=$snapshotPath screenshot=$screenshotPath"
} finally {
  & npx.cmd --yes --package @playwright/cli playwright-cli --session $sessionName close | Out-Null
  Pop-Location
  if ($startedServer -and $server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
  }
}
