[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$TargetRoot
)

$ErrorActionPreference = 'Stop'

$attemptRoot = Split-Path -Parent $PSScriptRoot
$canonicalRoot = Join-Path $attemptRoot 'reference-owned/visual-bindings'
$targetRootPath = (Resolve-Path -LiteralPath $TargetRoot).Path
$targetBindings = Join-Path $targetRootPath 'reference-visual-bindings'

function Get-NormalizedText([string]$Path) {
  return (Get-Content -Raw -LiteralPath $Path).Replace("`r`n", "`n")
}

function Assert-NormalizedMatch([string]$ExpectedPath, [string]$ActualPath) {
  if (-not (Test-Path -LiteralPath $ActualPath -PathType Leaf)) {
    throw "Missing required visual binding asset: $ActualPath"
  }
  if ((Get-NormalizedText $ExpectedPath) -cne (Get-NormalizedText $ActualPath)) {
    throw "Visual binding asset differs from canonical source: $ActualPath"
  }
}

if (-not (Test-Path -LiteralPath $targetBindings -PathType Container)) {
  throw "Target lacks reference-visual-bindings directory: $targetBindings"
}

$assetNames = @(
  'visual-tokens.css',
  'binding-map.json',
  'icons/drawer-hide.svg',
  'icons/drawer-show.svg',
  'icons/theme-to-dark.svg',
  'icons/theme-to-light.svg',
  'icons/disclosure-expanded.svg',
  'icons/disclosure-collapsed.svg',
  'icons/search.svg'
)

foreach ($assetName in $assetNames) {
  Assert-NormalizedMatch (Join-Path $canonicalRoot $assetName) (Join-Path $targetBindings $assetName)
}

$templateEvidence = Join-Path $PSScriptRoot 'visual-binding-evidence.template.json'
$targetEvidence = Join-Path $targetRootPath 'visual-binding-evidence.json'
Assert-NormalizedMatch $templateEvidence $targetEvidence

$implementationFiles = Get-ChildItem -LiteralPath $targetRootPath -Recurse -File |
  Where-Object { $_.Extension -in @('.html', '.css', '.js') }
if (-not $implementationFiles) { throw 'Target has no HTML, CSS, or JavaScript implementation source.' }

$implementationSource = ($implementationFiles | ForEach-Object { Get-Content -Raw -LiteralPath $_.FullName }) -join "`n"
if ($implementationSource -notmatch 'reference-visual-bindings[\\/]visual-tokens\.css') {
  throw 'Target implementation does not reference the canonical visual token stylesheet.'
}
if ($implementationSource -notmatch 'data-reference-visual-theme') {
  throw 'Target implementation does not expose the required visual theme-root hook.'
}
foreach ($assetName in $assetNames | Where-Object { $_ -like 'icons/*' }) {
  $escaped = [regex]::Escape($assetName)
  if ($implementationSource -notmatch $escaped) {
    throw "Target implementation does not reference fixed icon asset: $assetName"
  }
}

Write-Output 'Visual binding validation passed.'
