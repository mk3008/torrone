$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$reference = Join-Path $PSScriptRoot 'index.html'
$styles = Join-Path $PSScriptRoot 'styles.css'
$script = Join-Path $PSScriptRoot 'app.js'
$contract = Join-Path $PSScriptRoot 'reference-contract.md'
$readme = Join-Path $PSScriptRoot 'README.md'

foreach ($file in @($reference, $styles, $script, $contract, $readme)) {
  if (-not (Test-Path -LiteralPath $file -PathType Leaf)) {
    throw "Missing required Reference file: $file"
  }
}

$html = Get-Content -Raw -LiteralPath $reference
$css = Get-Content -Raw -LiteralPath $styles
$javascript = Get-Content -Raw -LiteralPath $script
$documentation = (Get-Content -Raw -LiteralPath $contract) + (Get-Content -Raw -LiteralPath $readme)

$requiredHtml = @(
  '<header class="app-header">',
  '<aside class="drawer"',
  '<nav class="navigation-list"',
  '<main class="workspace"',
  'drawer-control',
  'theme-control',
  'id="navigation-search"'
)

foreach ($needle in $requiredHtml) {
  if (-not $html.Contains($needle)) { throw "Reference HTML lacks: $needle" }
}

$requiredCss = @(
  '.shell.drawer-hidden .drawer { display: none; }',
  '.shell {',
  'color: var(--text-primary);',
  '.navigation-list {',
  'overflow-y: auto;',
  '.workspace {',
  'button:focus-visible, input:focus-visible, .workspace:focus-visible'
)

foreach ($needle in $requiredCss) {
  if (-not $css.Contains($needle)) { throw "Reference CSS lacks: $needle" }
}

if ($css -notmatch '(?s)\.shell\s*\{[^}]*color:\s*var\(--text-primary\);') {
  throw 'Reference shell must inherit the active palette primary text color.'
}

$requiredScript = @(
  "get('drawer') !== 'hidden'",
  "params.set('drawer', drawerOpen ? 'open' : 'hidden')",
  "drawerControl.addEventListener('click'",
  "themeControl.addEventListener('click'",
  "searchInput.addEventListener('input'",
  'aria-current="page"'
)

foreach ($needle in $requiredScript) {
  if (-not $javascript.Contains($needle)) { throw "Reference JavaScript lacks: $needle" }
}

foreach ($class in @('Invariant', 'Default', 'Parameter', 'Freedom')) {
  if (-not $documentation.Contains($class)) { throw "Reference documentation lacks decision class: $class" }
}

foreach ($needle in @('Attempt 23 Run 1', 'Attempts 29–34', 'Do not copy this page')) {
  if (-not $documentation.Contains($needle)) { throw "Reference documentation lacks boundary evidence: $needle" }
}

if ($documentation -notmatch 'not a replacement\s+Manifest') {
  throw 'Reference documentation lacks the Manifest replacement boundary.'
}

if ($html -match 'https?://' -or $css -match 'https?://' -or $javascript -match 'https?://') {
  throw 'Reference assets must not contain external HTTP(S) references.'
}

Write-Output 'Reference-first common shell static check passed.'
