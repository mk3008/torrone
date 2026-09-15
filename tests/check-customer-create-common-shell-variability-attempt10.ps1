$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$experiment = Join-Path $root 'docs/poc/experiments/014-customer-create-common-shell-variability/attempt-10'
$fixture = Join-Path $experiment 'consumer-input/common-shell-fixture'

foreach ($path in @('README.md', 'evaluation-contract.md', 'evaluation.md', 'comparison.html', 'comparison.css', 'capture-evaluation.ps1', 'capture-record.json', 'consumer-input/user-prompt-ja.md', 'consumer-input/common-shell-fixture/README.md', 'consumer-input/common-shell-fixture/shell-template.html', 'consumer-input/common-shell-fixture/shell.css', 'consumer-input/common-shell-fixture/shell.js')) {
  if (-not (Test-Path -LiteralPath (Join-Path $experiment $path))) { throw "Missing attempt-10 artifact: $path" }
}

$prompt = Get-Content -Raw (Join-Path $experiment 'consumer-input/user-prompt-ja.md')
foreach ($needle in @('顧客追加', '顧客IDは内部管理用の連番', '画面に入力欄を表示しません', '氏名、生年月日、住所、電話番号、メールアドレス、備考', '氏名、生年月日、住所、電話番号、メールアドレスは必須', '備考は任意', '必須入力、日付形式、電話番号形式、メールアドレス形式', '保存、データ接続、画面遷移、権限判定は実装しません')) {
  if (-not $prompt.Contains($needle)) { throw "Fixed prompt is missing a supplied product fact: $needle" }
}
foreach ($forbidden in @('グループキャプション', '枠線', 'カード', 'パネル', '余白', '論理末尾', 'ヘッダー', '区切り線', '外枠', 'Theme', 'テーマ', 'ライト', 'ダーク', '?drawer=', '?theme=')) {
  if ($prompt.Contains($forbidden)) { throw "Fixed prompt leaks Manifest-owned presentation guidance: $forbidden" }
}

$manifestFiles = Get-ChildItem -Recurse -File -LiteralPath (Join-Path $experiment 'consumer-input/design-manifest')
if ($manifestFiles.Count -ne 45) { throw "Expected 45 frozen Manifest files; found $($manifestFiles.Count)." }

$expectedFixtureHashes = @{
  'shell-template.html' = '764E870E5DC584BAB41EF07220653AD98ACBC3A9769D31F678BDBF3A9AB7C21F'
  'shell.css' = '7913120EB305AA155A5F530AB7EEFDB31B944AC7AC819831A8F1594FCEDEB6C8'
  'shell.js' = 'AFFDECA06526580975C1F06DAE701EA4201D8D9CE54230B0934CB021BB46DCBD'
}
foreach ($file in $expectedFixtureHashes.Keys) {
  if ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $fixture $file)).Hash -ne $expectedFixtureHashes[$file]) { throw "Fixture digest mismatch: $file" }
}
$fixtureCss = Get-Content -Raw (Join-Path $fixture 'shell.css')
foreach ($needle in @('--text-muted: #52657A', '--error-foreground: #B42318', '--text-muted: #BAC6D2', '--error-foreground: #FFB4AE')) {
  if (-not $fixtureCss.Contains($needle)) { throw "Attempt-9 fixture does not expose the canonical semantic role: $needle" }
}

function Normalize-PageSlot([string]$html) {
  $pattern = '(?is)(<main class="shell-workspace" aria-label="ワークスペース">).*?(</main>)'
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
  foreach ($file in @('index.html', 'shell.css', 'shell.js', 'page.css', 'page.js')) {
    if (-not (Test-Path -LiteralPath (Join-Path $runRoot $file))) { throw "Run $run is missing: $file" }
  }
  foreach ($file in @('shell.css', 'shell.js')) {
    if ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $runRoot $file)).Hash -ne $expectedFixtureHashes[$file]) { throw "Run $run modified immutable shell asset: $file" }
  }
  $html = Get-Content -Raw (Join-Path $runRoot 'index.html')
  if ((Normalize-PageSlot $html) -cne $template) { throw "Run $run modified markup outside the page slot." }
  $css = Get-Content -Raw (Join-Path $runRoot 'page.css')
  $script = Get-Content -Raw (Join-Path $runRoot 'page.js')
  $combined = "$html`n$css`n$script"
  if ($html -notmatch 'href="shell\.css"' -or $html -notmatch 'href="page\.css"' -or $html -notmatch 'src="shell\.js"' -or $html -notmatch 'src="page\.js"') { throw "Run $run does not use the declared shell/page asset boundary." }
  if ($combined -match '(?i)https?://|//fonts\.|@import|@font-face|fetch\(|xmlhttprequest|localstorage|sessionstorage|indexeddb') { throw "Run $run has an external dependency, request, or persistence mechanism." }
  if ($css -match '(?im)(?:^|[},])\s*(?:html|body|\.shell-header|\.shell-drawer|\.shell-body|\.shell-workspace|\.shell-drawer-list|\.shell-icon-button|\.shell-workspace-name|\.shell-theme-button|\.shared-shell)\b(?=\s*(?:,|\{))') { throw "Run $run page CSS restyles the fixed shell." }
  foreach ($label in @('顧客追加', '氏名', '生年月日', '住所', '電話番号', 'メールアドレス', '備考', '保存')) {
    if (-not $html.Contains($label)) { throw "Run $run is missing supplied content: $label" }
  }
  if ($html -match '(?is)<(?:input|select|textarea)\b[^>]*(?:id|name)=["''][^"'']*(?:customer[-_]?id|顧客ID)[^"'']*["''][^>]*>') { throw "Run $run exposes Customer ID as a control." }
  foreach ($field in @('氏名', '生年月日', '住所', '電話番号', 'メールアドレス')) {
    if ($html -notmatch "(?is)<label[^>]*>\s*$field.*?(?:必須|required)") { throw "Run $run does not visibly mark $field as required." }
  }
  if ($html -notmatch '(?is)<label[^>]*>\s*備考.*?(?:任意|optional)') { throw "Run $run does not visibly mark Notes as optional." }
  if ($combined -match '使用できます') { throw "Run $run uses capability language instead of action-oriented format help." }
  if ($combined -match '\*\s*は\s*必須') { throw "Run $run adds a requiredness legend alongside label markers." }
  if ($css -match '(?is)\.(?:customer[-_]?form|form[-_]?pane|field[-_]?group)[^{]*\{[^}]*background(?:-color)?\s*:') { throw "Run $run adds a filled background to its form or field-group container." }
  if ($css -match '(?is)\.(?:customer[-_]?form|form[-_]?pane|field[-_]?group)[^{]*\{[^}]*border-bottom\s*:') { throw "Run $run adds a horizontal rule to its form or field-group container." }
  if ($html -match '(?is)<fieldset\b') {
    $fieldsetClass = [regex]::Match($html, '(?is)<fieldset\b[^>]*\bclass=["''](?<class>[^"''\s]+)["'']').Groups['class'].Value
    $selector = if ([string]::IsNullOrWhiteSpace($fieldsetClass)) { 'fieldset' } else { "(?:fieldset|\.$([regex]::Escape($fieldsetClass)))" }
    $fieldsetRule = [regex]::Match($css, "(?is)$selector\s*\{(?<declarations>[^}]*)\}")
    if (-not $fieldsetRule.Success) { throw "Run $run uses a fieldset without a reset rule." }
    foreach ($property in @('border\s*:\s*0', 'padding\s*:\s*0', 'margin\s*:\s*0')) {
      if ($fieldsetRule.Groups['declarations'].Value -notmatch $property) { throw "Run $run uses a fieldset without resetting its browser-default $property." }
    }
  }
  if ($css -notmatch '(?is)(?:required|必須)[^\{]*\{[^}]*color\s*:\s*var\(--error-foreground\)') { throw "Run $run does not visibly use the canonical error treatment for the required marker." }
  if ($css -notmatch '(?is)(?:message|helper|error)[^\{]*\{[^}]*min-block-size\s*:') { throw "Run $run does not reserve a shared helper-or-error message region." }
  if ($css -notmatch 'var\(--text-muted\)' -or $css -notmatch 'var\(--error-foreground\)') { throw "Run $run does not consume the canonical helper and error text roles." }
  if ($css -match '(?i)(?:#B42318|#FFB4AE|#7A3E00|#FFC56B|warning-foreground)') { throw "Run $run uses a literal or warning color instead of the canonical validation error role." }
  if ($html -notmatch 'YYYY-MM-DD') { throw "Run $run does not show the supplied date-format help." }
  if ($html -match '(?is)(?:氏名|住所|備考)[^<]{0,100}(?:入力してください|入力をしてください)') { throw "Run $run adds redundant default helper copy for an intuitive field." }
  if ($css -notmatch '(?is)(?:form[-_]?actions|action[-_]?toolbar)[^\{]*\{[^}]*justify-content\s*:\s*flex-start') { throw "Run $run does not align the dedicated form toolbar at logical start." }
  if ($html -notmatch '(?is)<(?:button|input)[^>]*>\s*保存\s*</(?:button|input)>.*?(?:キャンセル|取消|Cancel)|(?:キャンセル|取消|Cancel).*?<button[^>]*>\s*保存\s*</button>') { throw "Run $run does not expose Save before Cancel in source order." }
  if ($css -notmatch 'var\(--action-background\)' -or $css -notmatch 'var\(--action-foreground\)') { throw "Run $run does not use the canonical primary-action tokens." }
  if ($css -match '(?i)(?:[\w-]*primary[\w-]*)[^\{]*\{[^}]*color\s*:\s*(?:#fff(?:fff)?|#000(?:000)?)') { throw "Run $run uses a literal primary-action foreground." }
  foreach ($rule in @('date|birth', 'phone|tel', 'email')) { if ($script -notmatch "(?i)$rule") { throw "Run $run lacks a validation implementation for: $rule" } }
  if ($script -notmatch '(?is)addEventListener\s*\(\s*[^\r\n]{0,48}blur') { throw "Run $run does not validate on blur." }
  if ($script -notmatch '(?is)addEventListener\s*\(\s*[^\r\n]{0,48}input') { throw "Run $run does not re-evaluate an invalid field during correction." }
  if ($combined -notmatch '(?is)aria-(?:describedby|live)|role=["'']alert["'']') { throw "Run $run does not expose field-associated or alert validation feedback." }
  foreach ($drawer in @('open', 'hidden')) { foreach ($theme in @('light', 'dark')) {
    $png = Join-Path $runRoot "customer-create-$drawer-$theme.png"
    if (-not (Test-Path -LiteralPath $png)) { throw "Run $run is missing capture: $drawer/$theme" }
    $image = [System.Drawing.Image]::FromFile($png)
    try { if ($image.Width -ne 1440 -or $image.Height -ne 1200) { throw "Run $run capture has unexpected dimensions: $drawer/$theme" } } finally { $image.Dispose() }
    if ((Get-Item -LiteralPath $png).Length -le 0) { throw "Run $run capture is empty: $drawer/$theme" }
    $captureCount++
  } }
  $narrow = Join-Path $runRoot 'customer-create-narrow-hidden-light.png'
  if (-not (Test-Path -LiteralPath $narrow)) { throw "Run $run is missing narrow capture." }
  $image = [System.Drawing.Image]::FromFile($narrow)
  try { if ($image.Width -ne 720 -or $image.Height -ne 1200) { throw "Run $run narrow capture has unexpected dimensions." } } finally { $image.Dispose() }
}

$captures = Get-Content -Raw (Join-Path $experiment 'capture-record.json') | ConvertFrom-Json
if ($captures.chrome_version -ne '150.0.7871.187' -or $captures.viewport -ne '1440x1200' -or $captures.narrow_viewport -ne '720x1200' -or $captures.captures.Count -ne 15) { throw 'Capture record does not identify the expected Chrome version, viewports, and fifteen images.' }
$comparison = Get-Content -Raw (Join-Path $experiment 'comparison.html')
foreach ($run in 1..3) { foreach ($drawer in @('open', 'hidden')) { foreach ($theme in @('light', 'dark')) {
  $target = "runs/run-$run/index.html?drawer=$drawer&theme=$theme"
  $png = "runs/run-$run/customer-create-$drawer-$theme.png"
  if (-not $comparison.Contains($target.Replace('&', '&amp;')) -or -not $comparison.Contains($png)) { throw "Comparison is missing Run $run $drawer/$theme." }
} } }
if ($comparison -match '(?i)https?://|@import|<script') { throw 'Comparison has an external reference or script.' }

Write-Output "Customer-create attempt-10 composition checks passed. Runs: 3. Manifest snapshot files: $($manifestFiles.Count). Captures: $captureCount at 1440x1200 plus 3 at 720x1200. External dependencies: 0."
