param(
  [string]$PythonExe = "py",
  [string]$PythonArgs = "-3 -B",
  [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [string]$TaskNamePrefix = "Northstar-News",
  [string]$PrimaryAt = "08:45",
  [string]$FirstCheckAt = "11:15",
  [string]$SecondCheckAt = "16:45",
  [string]$FinalCheckAt = "21:30",
  [string]$LogonDelay = "PT5M",
  [string]$TimeZone = "Asia/Shanghai",
  [string]$GitRemote = "origin",
  [string]$GitBranch = "main",
  [bool]$ReplaceExisting = $true
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ScriptPath = Join-Path $RepoRoot "scripts\run_news_update_and_publish.py"
if (-not (Test-Path $ScriptPath)) {
  throw "Missing script: $ScriptPath"
}

$PythonCommand = (Get-Command $PythonExe -ErrorAction Stop).Source
if (-not $PythonCommand) {
  throw "Cannot resolve Python command: $PythonExe"
}

function Remove-TaskIfExists([string]$TaskName) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue | Out-Null
}

function New-NewsAction {
  $Args = "$PythonArgs `"$ScriptPath`" --repo-root `"$RepoRoot`" --time-zone $TimeZone --max-backfill-days 3 --limit 96 --fetch-min-items 80 --max-fetch-min-items 80 --max-fetch-limit 96 --max-window-hours 72 --initial-catalog-expansion-feeds 48 --max-catalog-expansion-feeds 48 --skip-render-validation --git-commit --git-push --git-remote $GitRemote --git-branch $GitBranch"
  return New-ScheduledTaskAction -Execute $PythonCommand -Argument $Args -WorkingDirectory $RepoRoot
}

function New-NewsSettings {
  return New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -MultipleInstances IgnoreNew `
    -ExecutionTimeLimit (New-TimeSpan -Hours 6)
}

function Register-DailyNewsTask([string]$TaskName, [string]$At) {
  if ($ReplaceExisting) {
    Remove-TaskIfExists $TaskName
  }
  $Trigger = New-ScheduledTaskTrigger -Daily -At $At
  Register-ScheduledTask `
    -TaskName $TaskName `
    -Action (New-NewsAction) `
    -Trigger $Trigger `
    -Settings (New-NewsSettings) `
    -Force `
    -ErrorAction Stop | Out-Null
  Write-Output "Installed task: $TaskName at $At"
}

function Register-LogonNewsTask([string]$TaskName) {
  if ($ReplaceExisting) {
    Remove-TaskIfExists $TaskName
  }
  try {
    $Trigger = New-ScheduledTaskTrigger -AtLogOn
    if ($LogonDelay) {
      $Trigger.Delay = $LogonDelay
    }
    Register-ScheduledTask `
      -TaskName $TaskName `
      -Action (New-NewsAction) `
      -Trigger $Trigger `
      -Settings (New-NewsSettings) `
      -Force `
      -ErrorAction Stop | Out-Null
    Write-Output "Installed task: $TaskName at logon (delay $LogonDelay)"
    return $true
  } catch {
    Write-Warning "Optional logon catch-up task was not installed: $TaskName"
    Write-Warning $_.Exception.Message
    return $false
  }
}

$PrimaryTask = "$TaskNamePrefix-Update-08-45"
$FirstCheckTask = "$TaskNamePrefix-Check-11-15"
$SecondCheckTask = "$TaskNamePrefix-Check-16-45"
$FinalCheckTask = "$TaskNamePrefix-Check-21-30"
$LogonTask = "$TaskNamePrefix-Catchup-AtLogOn"

Register-DailyNewsTask $PrimaryTask $PrimaryAt
Register-DailyNewsTask $FirstCheckTask $FirstCheckAt
Register-DailyNewsTask $SecondCheckTask $SecondCheckAt
Register-DailyNewsTask $FinalCheckTask $FinalCheckAt
$LogonInstalled = Register-LogonNewsTask $LogonTask

Write-Output ""
Write-Output "Installed Northstar NEWS update schedule:"
Write-Output "  Primary: $PrimaryTask at $PrimaryAt"
Write-Output "  Check:   $FirstCheckTask at $FirstCheckAt"
Write-Output "  Check:   $SecondCheckTask at $SecondCheckAt"
Write-Output "  Check:   $FinalCheckTask at $FinalCheckAt"
if ($LogonInstalled) {
  Write-Output "  Logon:   $LogonTask after $LogonDelay"
} else {
  Write-Warning "  Logon:   skipped. Daily tasks still use StartWhenAvailable."
}
Write-Output "Command: $PythonCommand $PythonArgs `"$ScriptPath`" --repo-root `"$RepoRoot`" ..."
