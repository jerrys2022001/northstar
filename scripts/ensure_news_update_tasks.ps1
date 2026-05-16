param(
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [string]$TaskNamePrefix = "Northstar-News"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = (Resolve-Path $RepoRoot).Path
$InstallScript = Join-Path $RepoRoot "scripts\install_news_update_tasks.ps1"
$RunnerScript = Join-Path $RepoRoot "scripts\run_news_update_task.ps1"
$LogDir = Join-Path $RepoRoot "output\news-update-logs"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
$LogPath = Join-Path $LogDir "$(Get-Date -Format 'yyyy-MM-dd')-ensure.log"

function Write-EnsureLog([string]$Message) {
  $Stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
  "[$Stamp] $Message" | Add-Content -LiteralPath $LogPath -Encoding UTF8
}

function Test-NewsTask([string]$TaskName) {
  $Task = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
  if (-not $Task) {
    Write-EnsureLog "missing task=$TaskName"
    return $false
  }

  $Action = $Task.Actions | Select-Object -First 1
  if (-not $Action) {
    Write-EnsureLog "missing_action task=$TaskName"
    return $false
  }

  $ExpectedRunner = $RunnerScript.ToLowerInvariant()
  $ActualExecute = [string]$Action.Execute
  $ActualArguments = [string]$Action.Arguments
  if ($ActualExecute -notmatch "powershell(\.exe)?$" -or $ActualArguments.ToLowerInvariant() -notlike "*$ExpectedRunner*") {
    Write-EnsureLog "stale_action task=$TaskName execute=$ActualExecute arguments=$ActualArguments"
    return $false
  }

  return $true
}

$ExpectedTasks = @(
  "$TaskNamePrefix-Update-08-45",
  "$TaskNamePrefix-Check-11-15",
  "$TaskNamePrefix-Check-16-45",
  "$TaskNamePrefix-Check-21-30"
)

$AllHealthy = $true
foreach ($TaskName in $ExpectedTasks) {
  if (-not (Test-NewsTask $TaskName)) {
    $AllHealthy = $false
  }
}

if ($AllHealthy) {
  Write-EnsureLog "healthy tasks=$($ExpectedTasks -join ',')"
  exit 0
}

Write-EnsureLog "repair_start install_script=$InstallScript"
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $InstallScript -RepoRoot $RepoRoot 2>&1 |
  Out-String |
  Add-Content -LiteralPath $LogPath -Encoding UTF8
$ExitCode = $LASTEXITCODE
Write-EnsureLog "repair_exit_code=$ExitCode"
exit $ExitCode
