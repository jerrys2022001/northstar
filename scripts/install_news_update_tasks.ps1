param(
  [string]$PythonExe = "",
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

$ScriptPath = Join-Path $RepoRoot "scripts\run_news_update_task.ps1"
if (-not (Test-Path $ScriptPath)) {
  throw "Missing script: $ScriptPath"
}

$EnsureScriptPath = Join-Path $RepoRoot "scripts\ensure_news_update_tasks.ps1"
if (-not (Test-Path $EnsureScriptPath)) {
  throw "Missing script: $EnsureScriptPath"
}

$PowerShellCommand = (Get-Command "powershell.exe" -ErrorAction Stop).Source

function Remove-TaskIfExists([string]$TaskName) {
  Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false -ErrorAction SilentlyContinue | Out-Null
}

function New-NewsAction {
  $Args = "-NoProfile -ExecutionPolicy Bypass -File `"$ScriptPath`" -RepoRoot `"$RepoRoot`" -TimeZone $TimeZone -GitRemote $GitRemote -GitBranch $GitBranch"
  if ($PythonExe) {
    $Args += " -PythonExe `"$PythonExe`""
  }
  return New-ScheduledTaskAction -Execute $PowerShellCommand -Argument $Args -WorkingDirectory $RepoRoot
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

function Install-StartupEnsureShortcut {
  try {
    $StartupDir = [Environment]::GetFolderPath("Startup")
    if (-not $StartupDir) {
      Write-Warning "Startup folder could not be resolved."
      return $false
    }

    $ShortcutPath = Join-Path $StartupDir "$TaskNamePrefix-Ensure.lnk"
    $Shell = New-Object -ComObject WScript.Shell
    $Shortcut = $Shell.CreateShortcut($ShortcutPath)
    $Shortcut.TargetPath = $PowerShellCommand
    $Shortcut.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$EnsureScriptPath`" -RepoRoot `"$RepoRoot`""
    $Shortcut.WorkingDirectory = $RepoRoot
    $Shortcut.Save()
    Write-Output "Installed startup ensure shortcut: $ShortcutPath"
    return $true
  } catch {
    Write-Warning "Startup ensure shortcut was not installed."
    Write-Warning $_.Exception.Message
    return $false
  }
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
$StartupEnsureInstalled = Install-StartupEnsureShortcut

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
if ($StartupEnsureInstalled) {
  Write-Output "  Ensure:  Startup shortcut repairs missing/stale tasks at user logon"
} else {
  Write-Warning "  Ensure:  startup shortcut skipped."
}
Write-Output "Command: $PowerShellCommand -NoProfile -ExecutionPolicy Bypass -File `"$ScriptPath`" -RepoRoot `"$RepoRoot`" ..."
