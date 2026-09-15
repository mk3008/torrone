$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$experiment = Join-Path $root 'docs/poc/experiments/013-customer-search-common-shell-variability/attempt-10'
$fixture = Join-Path $experiment 'consumer-input/common-shell-fixture'

foreach ($file in @('README.md', 'evaluation-contract.md', 'evaluation.md', 'comparison.html', 'comparison.css', 'capture-evaluation.ps1', 'capture-record.json', 'consumer-input/user-prompt-ja.md', 'consumer-input/common-shell-fixture/README.md', 'consumer-input/common-shell-fixture/shell-template.html', 'consumer-input/common-shell-fixture/shell.css', 'consumer-input/common-shell-fixture/shell.js')) {
  if (-not (Test-Path -LiteralPath (Join-Path $experiment $file))) { throw "Missing attempt-10 artifact: $file" }
}

$prompt = Get-Content -Raw (Join-Path $experiment 'consumer-input/user-prompt-ja.md')
foreach ($needle in @('顧客検索', '氏名、生年月日、電話番号、メールアドレス', '顧客IDは内部管理用の連番で編集不可', '検索実行とリセット', '顧客を追加', '6件の中立fixture', 'ページング能力')) {
  if (-not $prompt.Contains($needle)) { throw "Fixed prompt is missing a supplied product fact: $needle" }
}
foreach ($forbidden in @('グループキャプション', '枠線', 'カード', 'パネル', '余白', '論理末尾', 'ヘッダー', '区切り線', '外枠', 'ページ番号', 'Theme', 'テーマ', 'ライト', 'ダーク', '?drawer=', '?theme=')) {
  if ($prompt.Contains($forbidden)) { throw "Fixed prompt leaks manifest-owned presentation guidance: $forbidden" }
}

$manifestFiles = Get-ChildItem -Recurse -File -LiteralPath (Join-Path $experiment 'consumer-input/design-manifest')
if ($manifestFiles.Count -ne 45) { throw "Expected 45 frozen manifest files; found $($manifestFiles.Count)." }

$expectedFixtureHashes = @{
  'shell-template.html' = '6F46D192CE447F70D8E2BC4DE1C3C0D8CFEE14A53B328E937B05DA76A10CE852'
  'shell.css' = 'B0B0DE59CC66F05D2F6549470038772E17FE4F6E4E3D8E31465050835D23A0EF'
  'shell.js' = 'AFFDECA06526580975C1F06DAE701EA4201D8D9CE54230B0934CB021BB46DCBD'
}
foreach ($file in $expectedFixtureHashes.Keys) {
  $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $fixture $file)).Hash
  if ($hash -ne $expectedFixtureHashes[$file]) { throw "Fixture digest mismatch: $file" }
}

function Normalize-PageSlot([string]$html) {
  $pattern = '(?is)(<main class="workspace" aria-label="ワークスペース">).*?(</main>)'
  if ($html -notmatch $pattern) { throw 'Run HTML does not preserve the declared workspace page slot.' }
  return [regex]::Replace($html, $pattern, '$1<!-- PAGE_SLOT -->$2', 1)
}

$template = Get-Content -Raw (Join-Path $fixture 'shell-template.html')
$pngCount = 0
Add-Type -AssemblyName System.Drawing

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
  if ((Normalize-PageSlot $html) -cne $template) { throw "Run $run modified markup outside the page slot." }
  $pageCss = Get-Content -Raw (Join-Path $runRoot 'page.css')
  $pageJs = Get-Content -Raw (Join-Path $runRoot 'page.js')
  $combined = "$html`n$pageCss`n$pageJs"
  if ($html -notmatch 'href="shell\.css"' -or $html -notmatch 'href="page\.css"' -or $html -notmatch 'src="shell\.js"' -or $html -notmatch 'src="page\.js"') { throw "Run $run does not use the declared shell/page asset boundary." }
  if ($combined -match '(?i)https?://|//fonts\.|@import|@font-face|fetch\(|xmlhttprequest|localstorage|sessionstorage|indexeddb') { throw "Run $run has an external dependency, request, or persistence mechanism." }
  if ($pageCss -match '(?im)(?:^|[},])\s*(?:html|body|\.header|\.drawer|\.shell-content|\.workspace|\.drawer-list|\.icon-button)\b|(?:^|[},])\s*\.shared-shell\s*(?:\{|,)') { throw "Run $run page CSS restyles the fixed shell." }
  foreach ($label in @('顧客検索', '氏名', '生年月日', '電話番号', 'メールアドレス', '検索', '検索結果', '顧客を追加', '住所', '備考')) {
    if (-not $html.Contains($label)) { throw "Run $run is missing supplied content: $label" }
  }
  if ($html -notmatch 'リセット|クリア') { throw "Run $run is missing the supplied reset capability." }
  $tableBody = [regex]::Match($html, '(?s)<tbody[^>]*>(.*?)</tbody>')
  if (-not $tableBody.Success -or [regex]::Matches($tableBody.Groups[1].Value, '<tr\b').Count -ne 6) { throw "Run $run does not contain six fixture rows." }
  if ($tableBody.Groups[1].Value -notmatch '(?is)<tr[^>]*>\s*<td[^>]*>\s*<(?:a|button)\b') { throw "Run $run does not expose a leading record identity operation." }
  if ($html -notmatch '(?is)<(?:h[1-6]|p|div|span|legend)[^>]*>\s*検索条件\s*</') { throw "Run $run omits the search-conditions caption." }
  if ($html -notmatch '(?is)<(?:button|a)[^>]*>\s*顧客を追加\s*</(?:button|a)>') { throw "Run $run omits the supplied collection action." }
  if ($html -notmatch '(?is)>\s*1\s*<') { throw "Run $run omits the plain current page number." }
  foreach ($theme in @('light', 'dark')) {
    foreach ($drawer in @('open', 'hidden')) {
      $png = Join-Path $runRoot "customer-search-$drawer-$theme.png"
      if (-not (Test-Path -LiteralPath $png)) { throw "Run $run is missing capture: $drawer/$theme" }
      $image = [System.Drawing.Image]::FromFile($png)
      try { if ($image.Width -ne 1440 -or $image.Height -ne 1200) { throw "Run $run capture has unexpected dimensions: $drawer/$theme" } } finally { $image.Dispose() }
      if ((Get-Item -LiteralPath $png).Length -le 0) { throw "Run $run capture is empty: $drawer/$theme" }
      $pngCount++
    }
  }
}

$captures = Get-Content -Raw (Join-Path $experiment 'capture-record.json') | ConvertFrom-Json
if ($captures.chrome_version -ne '150.0.7871.187' -or $captures.viewport -ne '1440x1200' -or $captures.captures.Count -ne 12) { throw 'Capture record does not identify the expected Chrome version, viewport, and twelve images.' }

$comparison = Get-Content -Raw (Join-Path $experiment 'comparison.html')
foreach ($run in 1..3) {
  foreach ($theme in @('light', 'dark')) {
    foreach ($drawer in @('open', 'hidden')) {
      $target = "runs/run-$run/index.html?drawer=$drawer&theme=$theme"
      $png = "runs/run-$run/customer-search-$drawer-$theme.png"
      if (-not $comparison.Contains($target.Replace('&', '&amp;')) -or -not $comparison.Contains($png)) { throw "Comparison is missing Run $run $drawer/$theme." }
    }
  }
}
if ($comparison -match '(?i)https?://|@import|<script') { throw 'Comparison page has an external reference or script.' }

Write-Output "Customer-search attempt-10 composition checks passed. Runs: 3. Manifest snapshot files: $($manifestFiles.Count). Immutable shell assets: 2 plus template. Captures: $pngCount at 1440x1200. External dependencies: 0."
