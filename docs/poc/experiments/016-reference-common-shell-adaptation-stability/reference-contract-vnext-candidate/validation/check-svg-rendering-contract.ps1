[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$TargetRoot,
  [string]$CanonicalBindings = ''
)

$ErrorActionPreference = 'Stop'

$candidateRoot = Split-Path -Parent $PSScriptRoot
$experimentRoot = Split-Path -Parent $candidateRoot
if ([string]::IsNullOrWhiteSpace($CanonicalBindings)) {
  $CanonicalBindings = Join-Path $experimentRoot 'attempt-3/reference-owned/visual-bindings'
}

$resolvedTarget = (Resolve-Path -LiteralPath $TargetRoot).Path
$resolvedBindings = (Resolve-Path -LiteralPath $CanonicalBindings).Path
$iconDirectory = Join-Path $resolvedBindings 'icons'

if (-not (Test-Path -LiteralPath $iconDirectory -PathType Container)) {
  throw "Canonical icon directory was not found: $iconDirectory"
}

$themedIcons = Get-ChildItem -LiteralPath $iconDirectory -File -Filter '*.svg' |
  Where-Object {
    (Get-Content -LiteralPath $_.FullName -Raw) -match '(?i)(stroke|fill)\s*=\s*["'']currentColor["'']'
  }

if ($themedIcons.Count -eq 0) {
  throw 'No canonical currentColor SVG assets were found.'
}

$sourceFiles = Get-ChildItem -LiteralPath $resolvedTarget -File -Recurse |
  Where-Object { $_.Extension.ToLowerInvariant() -in @('.html', '.htm', '.js', '.jsx', '.ts', '.tsx', '.vue') }

$violations = [System.Collections.Generic.List[string]]::new()
foreach ($sourceFile in $sourceFiles) {
  $source = Get-Content -LiteralPath $sourceFile.FullName -Raw
  foreach ($iconName in $themedIcons.Name) {
    $escapedIconName = [regex]::Escape($iconName)
    $directImagePattern = '(?is)<img\b[^>]*\bsrc\s*=\s*["''][^"'']*(?:[\\/])' + $escapedIconName + '["''][^>]*>'
    $scriptImagePattern = '(?is)(?:\.src\s*=|setAttribute\s*\(\s*["'']src["'']\s*,)\s*["''][^"'']*(?:[\\/])' + $escapedIconName + '["'']'
    if ($source -match $directImagePattern -or $source -match $scriptImagePattern) {
      $violations.Add("$($sourceFile.FullName) [$iconName]")
    }
  }
}

if ($violations.Count -gt 0) {
  throw "Themed currentColor SVGs must not use direct external image rendering: $($violations -join ', ')"
}

Write-Output "SVG rendering contract static check passed. Target=$resolvedTarget; themed-assets=$($themedIcons.Count)."
