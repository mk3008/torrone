$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$experiment = Join-Path $root 'docs/poc/experiments/014-customer-create-common-shell-variability/attempt-12'
$fixture = Join-Path $experiment 'consumer-input/common-shell-fixture'

foreach ($path in @('README.md', 'evaluation-contract.md', 'comparison.html', 'comparison.css', 'capture-evaluation.ps1', 'capture-record.json', 'consumer-input/user-prompt-ja.md', 'consumer-input/common-shell-fixture/README.md', 'consumer-input/common-shell-fixture/shell-template.html', 'consumer-input/common-shell-fixture/shell.css', 'consumer-input/common-shell-fixture/shell.js')) {
  if (-not (Test-Path -LiteralPath (Join-Path $experiment $path))) { throw "Missing attempt-12 artifact: $path" }
}

$prompt = Get-Content -Raw (Join-Path $experiment 'consumer-input/user-prompt-ja.md')
foreach ($needle in @('顧客追加', '顧客IDは内部管理用の連番', '画面に入力欄を表示しません', '氏名、生年月日、住所、電話番号、メールアドレス、備考', '氏名、生年月日、住所、電話番号、メールアドレスは必須', '備考は任意', '必須入力、日付形式、電話番号形式、メールアドレス形式', 'Lucide')) {
  if (-not $prompt.Contains($needle)) { throw "Fixed prompt is missing a supplied fact: $needle" }
}
foreach ($forbidden in @('グループキャプション', '枠線', 'カード', 'パネル', '余白', '論理末尾', '区切り線', '外枠', 'Theme', 'テーマ', 'ライト', 'ダーク', '?drawer=', '?theme=')) {
  if ($prompt.Contains($forbidden)) { throw "Fixed prompt leaks Manifest-owned presentation guidance: $forbidden" }
}

$manifestFiles = Get-ChildItem -Recurse -File -LiteralPath (Join-Path $experiment 'consumer-input/design-manifest')
if ($manifestFiles.Count -ne 46) { throw "Expected 46 frozen Manifest files; found $($manifestFiles.Count)." }
$hashes = @{ 'shell.css' = 'F67F4951B463B58C787C65AF81C12ECAFFFF4CEF93817783BF6AF24ACD22FBEB'; 'shell.js' = '1753A5FC9FE19B73878D55C893F63F781F00B83A778D2657763F322909967565' }
foreach ($file in $hashes.Keys) { if ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $fixture $file)).Hash -ne $hashes[$file]) { throw "Fixture digest mismatch: $file" } }

function Normalize-PageSlot([string]$html) {
  $pattern = '(?is)(<main class="workspace" aria-label="ワークスペース">).*?(<div class="numbers" id="numbers" hidden style="display: none">\s*</div>\s*</main>)'
  if ($html -notmatch $pattern) { throw 'Run HTML does not preserve the declared workspace page slot.' }
  $normalized = [regex]::Replace($html, $pattern, '$1<!-- PAGE_SLOT -->$2', 1)
  $normalized = [regex]::Replace($normalized, '(?is)<title>.*?</title>', '<title><!-- PAGE_TITLE --></title>', 1)
  return ([regex]::Replace($normalized, '(?s)>\s+<', '><')).Trim()
}

$template = Normalize-PageSlot (Get-Content -Raw (Join-Path $fixture 'shell-template.html'))
Add-Type -AssemblyName System.Drawing
$captureCount = 0
foreach ($run in 1..3) {
  $runRoot = Join-Path $experiment "runs/run-$run"
  foreach ($file in @('index.html', 'shell.css', 'shell.js', 'page.css', 'page.js')) { if (-not (Test-Path -LiteralPath (Join-Path $runRoot $file))) { throw "Run $run is missing: $file" } }
  foreach ($file in $hashes.Keys) { if ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $runRoot $file)).Hash -ne $hashes[$file]) { throw "Run $run modified fixed $file" } }
  $html = Get-Content -Raw (Join-Path $runRoot 'index.html')
  $css = Get-Content -Raw (Join-Path $runRoot 'page.css')
  $script = Get-Content -Raw (Join-Path $runRoot 'page.js')
  $combined = "$html`n$css`n$script"
  if ((Normalize-PageSlot $html) -cne $template) { throw "Run $run modified markup outside the page slot." }
  if ($combined -match '(?i)https?://|//fonts\.|@import|@font-face|fetch\(|xmlhttprequest|localstorage|sessionstorage|indexeddb') { throw "Run $run has an external dependency or persistence mechanism." }
  if ($css -match '(?im)(?:^|[},])\s*(?:html|body|#shell|\.shell|\.header|\.drawer|\.shell-body|\.workspace|\.navigation|\.icon-button|\.workspace-name)\b(?=\s*(?:,|\{))') { throw "Run $run page CSS restyles the fixed shell." }
  foreach ($label in @('顧客追加', '氏名', '生年月日', '住所', '電話番号', 'メールアドレス', '備考', '保存')) { if (-not $html.Contains($label)) { throw "Run $run is missing supplied content: $label" } }
  if ($html -match '(?is)<(?:input|select|textarea)\b[^>]*(?:id|name)=["''][^"'']*(?:customer[-_]?id|顧客ID)[^"'']*["''][^>]*>') { throw "Run $run exposes Customer ID as a control." }
  foreach ($field in @('氏名', '生年月日', '住所', '電話番号', 'メールアドレス')) { if ($html -notmatch "(?is)<label[^>]*>\s*$field.*?(?:必須|required)") { throw "Run $run does not visibly mark $field as required." } }
  if ($html -notmatch 'YYYY-MM-DD') { throw "Run $run lacks date-format help." }
  if ($combined -match '使用できます|\*\s*は\s*必須') { throw "Run $run adds disallowed helper or requiredness legend copy." }
  if ($css -notmatch '(?is)(?:message|helper|error)[^\{]*\{[^}]*(?:min-block-size|min-height|height)\s*:') { throw "Run $run does not reserve one-line helper-or-error space." }
  if ($css -notmatch 'var\(--text-muted\)' -or $css -notmatch 'var\(--error-foreground\)') { throw "Run $run does not consume the helper and error semantic roles." }
  if ($script -notmatch '(?is)addEventListener\s*\(\s*[^\r\n]{0,48}blur') { throw "Run $run lacks blur validation." }
  if ($script -notmatch '(?is)addEventListener\s*\(\s*[^\r\n]{0,48}input') { throw "Run $run lacks correction-time validation." }
  if ($combined -notmatch '(?is)aria-(?:describedby|live)|role=["'']alert["'']') { throw "Run $run lacks associated validation feedback." }
  foreach ($drawer in @('open', 'hidden')) { foreach ($theme in @('light', 'dark')) {
    $png = Join-Path $runRoot "customer-create-$drawer-$theme.png"
    if (-not (Test-Path -LiteralPath $png)) { throw "Run $run is missing capture: $drawer/$theme" }
    $image = [System.Drawing.Image]::FromFile($png)
    try { if ($image.Width -ne 1440 -or $image.Height -ne 1200) { throw "Run $run has bad capture size: $drawer/$theme" } } finally { $image.Dispose() }
    $captureCount++
  } }
  if (-not (Test-Path -LiteralPath (Join-Path $runRoot 'customer-create-narrow-hidden-light.png'))) { throw "Run $run is missing narrow capture." }
}
$captures = Get-Content -Raw (Join-Path $experiment 'capture-record.json') | ConvertFrom-Json
if ($captures.captures.Count -ne 15 -or $captures.viewport -ne '1440x1200' -or $captures.narrow_viewport -ne '720x1200') { throw 'Capture record is incomplete.' }
$comparison = Get-Content -Raw (Join-Path $experiment 'comparison.html')
if ($comparison -match '(?i)https?://|@import|<script') { throw 'Comparison page has an external reference or script.' }
foreach ($line in @('既存の共通シェルを再利用して、顧客追加の静的HTMLを作成してください。', '顧客IDは内部管理用の連番であり、画面に入力欄を表示しません。', 'アイコンには Lucide を使用します。')) {
  if (-not $comparison.Contains($line)) { throw "Comparison report is missing prompt evidence: $line" }
}
Write-Output "Customer-create attempt-12 checks passed. Runs: 3. Manifest snapshot: 46 files. Captures: $captureCount wide plus 3 narrow. External dependencies: 0."
