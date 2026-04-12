param(
  [int]$Port = 4317,
  [switch]$PromptLibrary,
  [switch]$NoOpen
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$python = "C:\Python314\python.exe"
$maxPortAttempts = 12
$siteMarker = "Northstar AI Directory"
if (-not (Test-Path $python)) {
  throw "Python not found at $python"
}

function Test-PreviewContent {
  param(
    [int]$TestPort
  )

  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:$TestPort/index.html" -TimeoutSec 3
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

$finalReady = Test-PreviewContent -TestPort $resolvedPort

if (-not $finalReady) {
  throw "Preview server did not become ready. Checked ports $Port-$($Port + $maxPortAttempts - 1)."
}

$path = if ($PromptLibrary) {
  "prompt-library.html?track=deepseek"
} else {
  "index.html"
}

$url = "http://127.0.0.1:$resolvedPort/$path"
Write-Output "Preview URL: $url"

if (-not $NoOpen) {
  Start-Process $url | Out-Null
}
