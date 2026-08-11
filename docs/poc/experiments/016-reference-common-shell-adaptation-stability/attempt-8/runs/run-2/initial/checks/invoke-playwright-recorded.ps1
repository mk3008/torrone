[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$Session,
  [Parameter(Mandatory = $true)]
  [string]$Action,
  [string[]]$ActionArguments = @(),
  [string]$LogPath = ''
)

$ErrorActionPreference = 'Stop'
$runRoot = Split-Path -Parent $PSScriptRoot

if ([string]::IsNullOrWhiteSpace($LogPath)) {
  $LogPath = Join-Path $runRoot 'evidence/interaction/command-log.txt'
}

function Format-Argument([string]$Value) {
  if ($Value -match '[\s&?=]') {
    return "'$($Value.Replace("'", "''"))'"
  }
  return $Value
}

$cliArguments = @(
  '--yes',
  '--package',
  '@playwright/cli@0.1.18',
  'playwright-cli',
  "-s=$Session",
  $Action
) + $ActionArguments

$displayCommand = 'npx ' + (($cliArguments | ForEach-Object { Format-Argument $_ }) -join ' ')
$outputDirectory = Split-Path -Parent $LogPath
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

$output = @(& npx @cliArguments 2>&1)
$exitCode = $LASTEXITCODE

$record = @(
  "command=$displayCommand",
  "exit_code=$exitCode",
  'output_begin',
  ($output | ForEach-Object { [string]$_ }),
  'output_end',
  ''
)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::AppendAllLines($LogPath, [string[]]$record, $utf8NoBom)

$output | ForEach-Object { Write-Output $_ }
if ($exitCode -ne 0) {
  exit $exitCode
}
