$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$experiment = Join-Path $root 'docs/poc/experiments/012-common-shell-variability/attempt-29'
$frozen = Join-Path $experiment 'frozen-input'

foreach ($relative in @('fixed-user-prompt-ja.md', 'frozen-input-inventory.json', 'generation-input-manifest.yaml', 'implementation-constraints.yaml', 'self-review-contract.md')) {
  if (-not (Test-Path -LiteralPath (Join-Path $frozen $relative))) { throw "Missing frozen input: $relative" }
}

$inventory = Get-Content -Raw (Join-Path $frozen 'frozen-input-inventory.json') | ConvertFrom-Json
if ($inventory.files.Count -ne 59) { throw "Expected 59 frozen files; found $($inventory.files.Count)." }
$prompt = Get-Content -Raw (Join-Path $frozen 'fixed-user-prompt-ja.md')
foreach ($needle in @('業務ワークスペース', 'グループ 01', '項目 01-01', '?drawer=open', '?drawer=hidden', 'Lucide')) {
  if (-not $prompt.Contains($needle)) { throw "Fixed prompt is missing supplied fixture requirement: $needle" }
}

$manifestText = (Get-ChildItem -Recurse -File -LiteralPath (Join-Path $frozen 'design-manifest') | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$normalizedManifestText = $manifestText -replace '\s+', ' '
foreach ($needle in @('use the complete parent row as one disclosure control', 'never creates current-item treatment', 'visible `border_interactive` boundary', 'ordinary field boundary', 'logical start edge of the workspace')) {
  if ($normalizedManifestText -notmatch [regex]::Escape($needle)) { throw "Frozen Manifest is missing adopted common-shell guidance: $needle" }
}
if ($manifestText -match '(?i)lucide') { throw 'Frozen Manifest must not name an icon library.' }

$checkedRuns = 0
foreach ($run in 1..3) {
  $runRoot = Join-Path $experiment "runs/run-$run"
  foreach ($file in @('index.html', 'styles.css', 'app.js', 'README.md', 'self-review.md')) {
    if (-not (Test-Path -LiteralPath (Join-Path $runRoot $file))) { throw "Run $run is missing: $file" }
  }
  $html = Get-Content -Raw (Join-Path $runRoot 'index.html')
  $css = Get-Content -Raw (Join-Path $runRoot 'styles.css')
  $script = Get-Content -Raw (Join-Path $runRoot 'app.js')
  $combined = "$html`n$css`n$script"
  if ($combined -match '(?i)https?://|//fonts\.|@import|@font-face|fetch\(|xmlhttprequest|localstorage|sessionstorage|indexeddb') { throw "Run $run has an external dependency, request, or persistence mechanism." }
  foreach ($label in @('業務ワークスペース', 'グループ 01', '項目 01-01', '項目 01-02', 'スクロール検証用ダミーコンテンツ')) {
    if (-not $combined.Contains($label)) { throw "Run $run is missing supplied fixture content: $label" }
  }
  if ($combined -notmatch '(?i)urlsearchparams|location\.search') { throw "Run $run does not expose query-driven initial state." }
  if ([regex]::Matches($html, '(?is)<input\b[^>]*>').Count -ne 1) { throw "Run $run must render exactly one Drawer search input." }
  if ($css -notmatch '(?i):focus-visible') { throw "Run $run has no visible focus treatment." }
  if ([regex]::Matches($css, '(?i)overflow(?:-y)?\s*:\s*auto').Count -lt 2) { throw "Run $run does not define separate Drawer and workspace scroll regions." }
  if ($script -notmatch '(?i)addEventListener\(\s*["'']click["'']') { throw "Run $run has no click interaction wiring." }
  foreach ($icon in @('panel-left-open.svg', 'panel-left-close.svg', 'chevron-down.svg', 'chevron-right.svg', 'moon.svg', 'sun.svg', 'search.svg')) {
    if (-not (Test-Path -LiteralPath (Join-Path $runRoot "icons/$icon"))) { throw "Run $run is missing local icon fixture: $icon" }
  }
  $checkedRuns++
}

Write-Output "Common-shell Attempt 29 static checks passed. Eligible runs: $checkedRuns. Frozen inputs: $($inventory.files.Count). External dependencies: 0."
