$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$experiment = Join-Path $root 'docs/poc/experiments/013-customer-search-common-shell-variability/attempt-25'
$fixture = Join-Path $experiment 'consumer-input/common-shell-fixture'

foreach ($path in @('README.md', 'evaluation-contract.md', 'comparison.html', 'comparison.css', 'capture-evaluation.ps1', 'capture-record.json', 'consumer-input/user-prompt-ja.md', 'consumer-input/common-shell-fixture/README.md', 'consumer-input/common-shell-fixture/shell-template.html', 'consumer-input/common-shell-fixture/shell.css', 'consumer-input/common-shell-fixture/shell.js')) {
  if (-not (Test-Path -LiteralPath (Join-Path $experiment $path))) { throw "Missing attempt-25 artifact: $path" }
}

$prompt = Get-Content -Raw (Join-Path $experiment 'consumer-input/user-prompt-ja.md')
foreach ($needle in @('顧客検索', '氏名、生年月日、電話番号、メールアドレス', '顧客IDは内部管理用の連番で編集不可', '検索実行とリセット', '顧客を追加', '6件の中立fixture', 'ページング能力', 'Lucide')) {
  if (-not $prompt.Contains($needle)) { throw "Fixed prompt is missing a supplied fact: $needle" }
}
foreach ($forbidden in @('グループキャプション', '枠線', 'カード', 'パネル', '余白', '論理末尾', '区切り線', '外枠', 'ページ番号', '?drawer=', '?theme=')) {
  if ($prompt.Contains($forbidden)) { throw "Fixed prompt leaks Manifest-owned presentation guidance: $forbidden" }
}

$manifestFiles = Get-ChildItem -Recurse -File -LiteralPath (Join-Path $experiment 'consumer-input/design-manifest')
if ($manifestFiles.Count -ne 46) { throw "Expected 46 frozen Manifest files; found $($manifestFiles.Count)." }

$expectedFixtureHashes = @{
  'shell.css' = 'F67F4951B463B58C787C65AF81C12ECAFFFF4CEF93817783BF6AF24ACD22FBEB'
  'shell.js' = '1753A5FC9FE19B73878D55C893F63F781F00B83A778D2657763F322909967565'
}
foreach ($file in $expectedFixtureHashes.Keys) {
  $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $fixture $file)).Hash
  if ($hash -ne $expectedFixtureHashes[$file]) { throw "Fixture digest mismatch: $file" }
}

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
  foreach ($file in @('index.html', 'shell.css', 'shell.js', 'page.css', 'page.js')) {
    if (-not (Test-Path -LiteralPath (Join-Path $runRoot $file))) { throw "Run $run is missing: $file" }
  }
  foreach ($file in @('shell.css', 'shell.js')) {
    $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $runRoot $file)).Hash
    if ($hash -ne $expectedFixtureHashes[$file]) { throw "Run $run modified immutable shell asset: $file" }
  }
  $html = Get-Content -Raw (Join-Path $runRoot 'index.html')
  $pageCss = Get-Content -Raw (Join-Path $runRoot 'page.css')
  $pageJs = Get-Content -Raw (Join-Path $runRoot 'page.js')
  if ((Normalize-PageSlot $html) -cne $template) { throw "Run $run modified markup outside the page slot." }
  if ($html -notmatch 'href="shell\.css"' -or $html -notmatch 'href="page\.css"' -or $html -notmatch 'src="shell\.js"' -or $html -notmatch 'src="page\.js"') { throw "Run $run does not use the shell/page boundary." }
  if ("$html`n$pageCss`n$pageJs" -match '(?i)https?://|//fonts\.|@import|@font-face|fetch\(|xmlhttprequest|localstorage|sessionstorage|indexeddb') { throw "Run $run has an external dependency or persistence mechanism." }
  if ($pageCss -match '(?im)(?:^|[},])\s*(?:html|body|\.shell|\.header|\.drawer|\.shell-body|\.workspace|\.navigation|\.icon-button|\.workspace-name)\b(?=\s*(?:,|\{))') { throw "Run $run page CSS restyles the fixed shell." }
  foreach ($label in @('顧客検索', '氏名', '生年月日', '電話番号', 'メールアドレス', '検索', '検索結果', '顧客を追加', '住所', '備考')) {
    if (-not $html.Contains($label)) { throw "Run $run is missing supplied content: $label" }
  }
  if ($html -notmatch 'リセット|クリア') { throw "Run $run is missing reset capability." }
  $tbody = [regex]::Match($html, '(?s)<tbody[^>]*>(.*?)</tbody>')
  if (-not $tbody.Success -or [regex]::Matches($tbody.Groups[1].Value, '<tr\b').Count -ne 6) { throw "Run $run does not contain six fixture rows." }
  if ($tbody.Groups[1].Value -notmatch '(?is)<tr[^>]*>\s*<td[^>]*>\s*<(?:a|button)\b') { throw "Run $run does not expose the leading Customer ID operation." }
  if ($pageCss -notmatch '(?i)overflow-x\s*:\s*auto') { throw "Run $run lacks local Grid horizontal scrolling." }
  if ($pageCss -notmatch '(?i)position\s*:\s*sticky') { throw "Run $run lacks a pinned leading Grid column." }
  foreach ($drawer in @('open', 'hidden')) {
    foreach ($theme in @('light', 'dark')) {
      $png = Join-Path $runRoot "customer-search-$drawer-$theme.png"
      if (-not (Test-Path -LiteralPath $png)) { throw "Run $run is missing capture: $drawer/$theme" }
      $image = [System.Drawing.Image]::FromFile($png)
      try { if ($image.Width -ne 1440 -or $image.Height -ne 1200) { throw "Run $run has bad capture size: $drawer/$theme" } } finally { $image.Dispose() }
      $captureCount++
    }
  }
  $narrow = Join-Path $runRoot 'customer-search-narrow-hidden-light.png'
  if (-not (Test-Path -LiteralPath $narrow)) { throw "Run $run is missing narrow capture." }
}

$captures = Get-Content -Raw (Join-Path $experiment 'capture-record.json') | ConvertFrom-Json
if ($captures.captures.Count -ne 15 -or $captures.viewport -ne '1440x1200' -or $captures.narrow_viewport -ne '720x1200') { throw 'Capture record is incomplete.' }
$comparison = Get-Content -Raw (Join-Path $experiment 'comparison.html')
if ($comparison -match '(?i)https?://|@import|<script') { throw 'Comparison page has an external reference or script.' }
if (-not $comparison.Contains($prompt)) { throw 'Comparison report does not include the exact fixed prompt.' }

Write-Output "Customer-search attempt-25 checks passed. Runs: 3. Manifest snapshot: 46 files. Captures: $captureCount wide plus 3 narrow. External dependencies: 0."
