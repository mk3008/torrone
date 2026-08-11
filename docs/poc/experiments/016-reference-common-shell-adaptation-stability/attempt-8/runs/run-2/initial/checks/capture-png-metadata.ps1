[CmdletBinding()]
param(
  [string]$RunRoot = '',
  [string]$OutputPath = ''
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RunRoot)) {
  $RunRoot = Split-Path -Parent $PSScriptRoot
}
$resolvedRoot = (Resolve-Path -LiteralPath $RunRoot).Path

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
  $OutputPath = Join-Path $resolvedRoot 'evidence/interaction/png-metadata.json'
}

Add-Type -AssemblyName System.Drawing

$expected = @(
  '01-initial-expanded.png',
  '02-parent-collapsed-before.png',
  '03-drawer-hidden.png',
  '04-drawer-visible-collapsed.png',
  '05-parent-expanded.png',
  '06-parent-collapsed-after.png'
)

$records = foreach ($name in $expected) {
  $path = Join-Path $resolvedRoot "evidence/interaction/$name"
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    throw "Missing required capture: $name"
  }

  $image = [System.Drawing.Image]::FromFile($path)
  try {
    $width = $image.Width
    $height = $image.Height
  } finally {
    $image.Dispose()
  }

  if ($width -ne 1440 -or $height -ne 900) {
    throw "Unexpected capture dimensions for $name: ${width}x${height}"
  }

  [ordered]@{
    file = $name
    width = $width
    height = $height
    sha256 = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant()
    bytes = (Get-Item -LiteralPath $path).Length
  }
}

$outputDirectory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$json = $records | ConvertTo-Json -Depth 3
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($OutputPath, $json + [Environment]::NewLine, $utf8NoBom)

Write-Output "PNG metadata captured. files=$($records.Count) dimensions=1440x900 output=$OutputPath"
