[CmdletBinding()]
param([string]$RunRoot = '')

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RunRoot)) {
  $RunRoot = Split-Path -Parent $PSScriptRoot
}

$resolvedRoot = (Resolve-Path -LiteralPath $RunRoot).Path
$appPath = Join-Path $resolvedRoot 'src/HarnessApp.tsx'
$cssPath = Join-Path $resolvedRoot 'src/harness.css'

foreach ($path in @($appPath, $cssPath)) {
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    throw "Missing Run source: $path"
  }
}

$app = Get-Content -Raw -LiteralPath $appPath
$css = Get-Content -Raw -LiteralPath $cssPath
$combined = $app + [Environment]::NewLine + $css

$requiredProductFacts = @(
  'Operations workspace',
  'Overview',
  'Workspace',
  'Section 01',
  'Section 02',
  'Section 03',
  'Activity',
  'Search navigation',
  'Find an item',
  'No matching navigation items.',
  'Neutral workspace content',
  'This content is only an overflow fixture for observing the common shell.',
  'length: 24'
)

foreach ($fact in $requiredProductFacts) {
  if (-not $app.Contains($fact)) {
    throw "Missing product-fixture fact: $fact"
  }
}

$orderedLabels = @('Overview', 'Workspace', 'Section 01', 'Section 02', 'Section 03', 'Activity')
$previousIndex = -1
foreach ($label in $orderedLabels) {
  $index = $app.IndexOf($label, [System.StringComparison]::Ordinal)
  if ($index -le $previousIndex) {
    throw "Product navigation order is not preserved at: $label"
  }
  $previousIndex = $index
}

foreach ($referenceOnlyLabel in @('Example workspace', 'Example group', 'Example child', 'Example leaf', 'Observation')) {
  if ($combined.Contains($referenceOnlyLabel)) {
    throw "Illustrative Reference material leaked into the Run: $referenceOnlyLabel"
  }
}

foreach ($asset in @(
  'drawer-hide.svg',
  'drawer-show.svg',
  'theme-to-dark.svg',
  'theme-to-light.svg',
  'disclosure-expanded.svg',
  'disclosure-collapsed.svg',
  'search.svg'
)) {
  if (-not $css.Contains("reference-visual-bindings/icons/$asset")) {
    throw "Fixed SVG is not referenced from Run CSS: $asset"
  }
}

if (-not $css.Contains("@import '../reference-visual-bindings/visual-tokens.css';")) {
  throw 'Canonical visual token stylesheet is not imported.'
}
if (-not $app.Contains('data-reference-visual-theme={theme}')) {
  throw 'Required visual theme-root hook is missing.'
}
if ($combined -match '(?i)<img\b') {
  throw 'Run must not render the themed currentColor SVGs through img.'
}
if ($combined -match '(?i)https?://|@import\s+url\s*\(\s*["'']?https?://') {
  throw 'Run source must not depend on an external runtime asset.'
}

$ariaExpandedOccurrences = ([regex]::Matches($app, 'aria-expanded=')).Count
if ($ariaExpandedOccurrences -ne 2) {
  throw "Expected Drawer and Workspace as the only expanded-state controls; found $ariaExpandedOccurrences."
}

Write-Output 'Attempt 8 Run 2 static check passed. Product facts, owner assets, source boundary, and focused control surface are present.'
