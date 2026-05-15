param(
  [string]$PythonExe = "",
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [string]$TimeZone = "Asia/Shanghai",
  [string]$GitRemote = "origin",
  [string]$GitBranch = "main"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$RepoRoot = (Resolve-Path $RepoRoot).Path
$ScriptPath = Join-Path $RepoRoot "scripts\run_news_update_and_publish.py"
$LogDir = Join-Path $RepoRoot "output\news-update-logs"
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

$Today = Get-Date -Format "yyyy-MM-dd"
$RunId = Get-Date -Format "yyyyMMdd-HHmmss"
$LogPath = Join-Path $LogDir "$Today-task-$RunId.log"

function Write-TaskLog([string]$Message) {
  $Stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
  "[$Stamp] $Message" | Add-Content -LiteralPath $LogPath -Encoding UTF8
}

function Resolve-PythonExe([string]$RequestedPython) {
  if ($RequestedPython) {
    $Command = Get-Command $RequestedPython -ErrorAction Stop
    return $Command.Source
  }

  $PyLauncher = Get-Command "py" -ErrorAction SilentlyContinue
  if ($PyLauncher) {
    $Resolved = & $PyLauncher.Source -3 -c "import sys; print(sys.executable)" 2>$null
    if ($LASTEXITCODE -eq 0 -and $Resolved) {
      return [string]$Resolved
    }
  }

  $PythonCommand = Get-Command "python" -ErrorAction Stop
  return $PythonCommand.Source
}

try {
  $ResolvedPython = Resolve-PythonExe $PythonExe
  Write-TaskLog "start repo_root=$RepoRoot python=$ResolvedPython"

  $Arguments = @(
    "-B",
    $ScriptPath,
    "--repo-root",
    $RepoRoot,
    "--time-zone",
    $TimeZone,
    "--max-backfill-days",
    "3",
    "--limit",
    "96",
    "--fetch-min-items",
    "80",
    "--max-fetch-min-items",
    "80",
    "--max-fetch-limit",
    "96",
    "--max-window-hours",
    "72",
    "--initial-catalog-expansion-feeds",
    "48",
    "--max-catalog-expansion-feeds",
    "48",
    "--max-auto-per-tool-per-day",
    "3",
    "--skip-render-validation",
    "--git-commit",
    "--git-push",
    "--git-remote",
    $GitRemote,
    "--git-branch",
    $GitBranch
  )

  Write-TaskLog "command=$ResolvedPython $($Arguments -join ' ')"
  Push-Location $RepoRoot
  try {
    $Output = & $ResolvedPython @Arguments 2>&1
    $ExitCode = $LASTEXITCODE
  } finally {
    Pop-Location
  }

  if ($Output) {
    $Output | Out-String | Add-Content -LiteralPath $LogPath -Encoding UTF8
  }
  Write-TaskLog "exit_code=$ExitCode"
  exit $ExitCode
} catch {
  Write-TaskLog "error=$($_.Exception.Message)"
  Write-TaskLog "exit_code=1"
  exit 1
}
