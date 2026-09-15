$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$experiment = Join-Path $root 'docs/poc/experiments/012-common-shell-variability/attempt-22'
$snapshot = Join-Path $experiment 'consumer-input/design-manifest'

foreach ($path in @('README.md', 'evaluation-contract.md', 'consumer-input/user-prompt-ja.md', 'capture-evaluation.ps1', 'capture-record.json', 'comparison.html', 'comparison.css', 'evaluation.md')) {
  if (-not (Test-Path -LiteralPath (Join-Path $experiment $path))) { throw "Missing experiment artifact: $path" }
}

$prompt = Get-Content -Raw (Join-Path $experiment 'consumer-input/user-prompt-ja.md')
foreach ($needle in @('共通Header、Drawer、およびスクロール検証用の中立workspaceだけ', '業務ワークスペース', 'メニュー内検索が利用可能', '現在位置のbinding値だけをその項目へ更新', 'スクロール検証用ダミーコンテンツ', '`1` から `80`', '?drawer=open', '?drawer=hidden')) {
  if (-not $prompt.Contains($needle)) { throw "Fixed prompt is missing supplied product fact: $needle" }
}
foreach ($forbidden in @('即時絞り込み', '検索ボタンは置かず', 'Headerは', '独立して縦スクロール', 'sticky', 'fixed')) {
  if ($prompt.Contains($forbidden)) { throw "Fixed prompt leaks Manifest-owned behavior: $forbidden" }
}
foreach ($needle in @('Lucide', 'PanelLeftClose', 'PanelLeftOpen', '`Search`', '`X`', '`ChevronDown`', '`ChevronRight`', '`Moon`', '`Sun`')) {
  if (-not $prompt.Contains($needle)) { throw "Fixed prompt is missing the supplied icon-system instruction: $needle" }
}

$manifestFiles = Get-ChildItem -Recurse -File -LiteralPath $snapshot
if ($manifestFiles.Count -ne 46) { throw "Expected 46 frozen Manifest files; found $($manifestFiles.Count)." }
foreach ($relative in @('components/header.md', 'components/drawer.md', 'foundations/layout-panes.md', 'foundations/iconography.md')) {
  if (-not (Test-Path -LiteralPath (Join-Path $snapshot $relative))) { throw "Manifest snapshot is missing: $relative" }
}
$header = Get-Content -Raw (Join-Path $snapshot 'components/header.md')
$drawer = Get-Content -Raw (Join-Path $snapshot 'components/drawer.md')
$layout = Get-Content -Raw (Join-Path $snapshot 'foundations/layout-panes.md')
$accessibility = Get-Content -Raw (Join-Path $snapshot 'foundations/accessible-work-surface.md')
$iconography = Get-Content -Raw (Join-Path $snapshot 'foundations/iconography.md')
$manifestText = ($header + $drawer + $layout + $accessibility + $iconography) -replace '\s+', ' '
foreach ($needle in @('Keep the shared Header available while the workspace scrolls', 'sticky or fixed', 'navigation search is available', 'filters the available Drawer items as the user types', 'no separate submit button', 'do not render the clear control or reserve space for it', 'matching child''s supplied parent context', 'independently vertically scrolling navigation list', 'separate vertical scroll regions', 'always-present leading `Search` icon', 'full-row selection', 'single supplied current destination', 'physical left edge', 'never follows a child indentation lane', 'same nested label start', 'ordinary leaf label start', 'same layout geometry, including label start and padding', 'paint layer only', 'semantically as the current navigation item', 'replaces the binding''s current-destination value', 'hierarchy, including its label indentation', 'changes only that parent''s supplied expanded/collapsed state', 'never clears, replaces, or otherwise changes the binding''s current destination', 'separate outer halo', 'complete left-panel shape', 'left-pointing', 'right-pointing', 'fully inside the rendered icon canvas', 'uncut and non-overlapping', 'When a product, implementation constraint, or request names an icon library', 'Moon', 'Sun', 'ChevronDown', 'ChevronRight', '`X`')) {
  if (-not $manifestText.Contains($needle)) { throw "Frozen Manifest is missing the common-shell rule: $needle" }
}
if ((Get-ChildItem -Recurse -File -LiteralPath $snapshot | Get-Content -Raw) -match '(?i)lucide') { throw 'Frozen Manifest must not name an icon library.' }

Add-Type -AssemblyName System.Drawing
$captureCount = 0
foreach ($run in 1..3) {
  $runRoot = Join-Path $experiment "runs/run-$run"
  foreach ($file in @('index.html', 'styles.css', 'app.js', 'README.md')) {
    if (-not (Test-Path -LiteralPath (Join-Path $runRoot $file))) { throw "Run $run is missing: $file" }
  }
  $html = Get-Content -Raw (Join-Path $runRoot 'index.html')
  $css = Get-Content -Raw (Join-Path $runRoot 'styles.css')
  $script = Get-Content -Raw (Join-Path $runRoot 'app.js')
  $combined = "$html`n$css`n$script"
  if ($html -notmatch 'href="styles\.css"' -or $html -notmatch 'src="app\.js"') { throw "Run $run does not reference local assets." }
  if ($combined -match '(?i)https?://|//fonts\.|@import|@font-face|fetch\(|xmlhttprequest|localstorage|sessionstorage|indexeddb') { throw "Run $run has an external dependency, request, or persistence mechanism." }
  foreach ($label in @('業務ワークスペース', 'グループ 01', '項目 01-01', '項目 01-02', 'スクロール検証用ダミーコンテンツ')) {
    if (-not $combined.Contains($label)) { throw "Run $run is missing supplied fixture content: $label" }
  }
  if ($combined -notmatch '(?i)(?:Array\.from\(\{\s*length\s*:\s*29|(?:number|i|value|n)\s*=\s*2\s*;\s*(?:number|i|value|n)\s*<=\s*30)') { throw "Run $run does not generate the supplied item 02–30 fixture." }
  if ($combined -notmatch '(?i)urlsearchparams|location\.search') { throw "Run $run does not expose query-driven initial state." }
  if ($combined -notmatch '(?is)<input[^>]+type="search"') { throw "Run $run does not expose a local Drawer search field." }
  if ($combined -match '(?is)<form[^>]*>.*?<input[^>]+type="search"') { throw "Run $run wraps Drawer search in a submit form." }
  if ($script -notmatch '(?i)(?:addEventListener\(\s*["'']input["'']|\.oninput\s*=)') { throw "Run $run does not filter the Drawer as the user types." }
  if ($combined -notmatch '(?i)no[-_ ]?match|一致する[^"'']{0,24}ありません') { throw "Run $run has no explicit no-match state." }
  if ($combined -notmatch '(?i)clear[-_ ]?search|検索をクリア') { throw "Run $run has no clear control." }
  if ($combined -notmatch '(?i)overflow(?:-y)?\s*:\s*auto') { throw "Run $run has no explicit vertical scroll region." }
  if ($combined -notmatch '(?i)(?:app[-_ ]?header|header)[^{]*\{[^}]*?(?:position\s*:\s*(?:sticky|fixed)|height\s*:)|shell-body|grid-template-rows') { throw "Run $run does not make a persistent Header structurally distinct from workspace scrolling." }
  if ([regex]::Matches($css, '(?i)overflow(?:-y)?\s*:\s*auto').Count -lt 2) { throw "Run $run does not define separate Drawer and workspace vertical scrollports." }
  if ($combined -notmatch '(?i)(?:length\s*:\s*80|(?:number|i|value|n|index)\s*=\s*1\s*;\s*(?:number|i|value|n|index)\s*<=\s*80|<li>80</li>)') { throw "Run $run does not generate the supplied 1–80 neutral fixture." }
  if ($html -match '(?i)>\s*(?:Theme|テーマ)\s*<') { throw "Run $run exposes a prohibited visible theme caption." }
  $png = Join-Path $runRoot 'shell-open-light.png'
  if (-not (Test-Path -LiteralPath $png)) { throw "Run $run is missing its fixed initial capture." }
    $image = [System.Drawing.Image]::FromFile($png)
  try { if ($image.Width -ne 1440 -or $image.Height -ne 1200) { throw "Run $run initial capture dimensions differ." } } finally { $image.Dispose() }
  if ((Get-Item -LiteralPath $png).Length -le 0) { throw "Run $run initial capture is empty." }
    $captureCount++
}

$captureRecord = Get-Content -Raw (Join-Path $experiment 'capture-record.json') | ConvertFrom-Json
if ($captureRecord.viewport -ne '1440x1200' -or $captureRecord.captures.Count -ne 15) { throw 'Capture record does not identify the complete fixed state matrix.' }
foreach ($run in 1..3) {
  $initial = @($captureRecord.captures | Where-Object { $_.run -eq $run -and $_.drawer -eq 'open' -and $_.theme -eq 'light' -and $_.viewport -eq '1440x1200' })
  if ($initial.Count -ne 1) { throw "Capture record does not identify one fixed initial capture for Run $run." }
}
$comparison = Get-Content -Raw (Join-Path $experiment 'comparison.html')
foreach ($run in 1..3) {
  foreach ($target in @("runs/run-$run/index.html?drawer=open&amp;theme=light", "runs/run-$run/index.html?drawer=hidden&amp;theme=light", "runs/run-$run/shell-open-light.png", "runs/run-$run/shell-hidden-light.png")) {
    if (-not $comparison.Contains($target)) { throw "Comparison is missing: $target" }
  }
}
if ($comparison -match '(?i)https?://|@import|<script') { throw 'Comparison has an external dependency or script.' }

Write-Output "Common-shell navigation/scroll Attempt 22 checks passed. Runs: 3. Frozen Manifest files: $($manifestFiles.Count). Fixed initial captures: $captureCount at 1440x1200. External dependencies: 0."

