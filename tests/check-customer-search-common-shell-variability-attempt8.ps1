$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$experiment = Join-Path $root 'docs/poc/experiments/013-customer-search-common-shell-variability/attempt-8'

foreach ($file in @('README.md', 'evaluation-contract.md', 'evaluation.md', 'comparison.html', 'comparison.css', 'capture-evaluation.ps1', 'capture-record.json', 'consumer-input/user-prompt-ja.md')) {
  if (-not (Test-Path -LiteralPath (Join-Path $experiment $file))) { throw "Missing attempt-8 artifact: $file" }
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

Add-Type -AssemblyName System.Drawing
$captures = Get-Content -Raw (Join-Path $experiment 'capture-record.json') | ConvertFrom-Json
if ($captures.chrome_version -ne '150.0.7871.187' -or $captures.viewport -ne '1440x1200' -or $captures.captures.Count -ne 12) {
  throw 'Capture record does not identify the expected Chrome version, viewport, and twelve images.'
}

$pngCount = 0
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
  foreach ($label in @('顧客検索', '氏名', '生年月日', '電話番号', 'メールアドレス', '検索', '検索結果', '顧客を追加', '住所', '備考')) {
    if (-not $html.Contains($label)) { throw "Run $run is missing supplied content: $label" }
  }
  if ($html -notmatch 'リセット|クリア') { throw "Run $run is missing the supplied reset capability." }
  $tableBody = [regex]::Match($html, '(?s)<tbody[^>]*>(.*?)</tbody>')
  if (-not $tableBody.Success -or [regex]::Matches($tableBody.Groups[1].Value, '<tr\b').Count -ne 6) { throw "Run $run does not contain six fixture rows." }
  if ($tableBody.Groups[1].Value -notmatch '(?is)<tr[^>]*>\s*<td[^>]*>\s*<(?:a|button)\b') { throw "Run $run does not expose a leading record identity operation." }
  if ($html -notmatch '(?is)<(?:h[1-6]|p|div|span|legend)[^>]*>\s*検索条件\s*</') { throw "Run $run omits the search-conditions caption." }
  if ($html -notmatch '(?is)<(?:button|a)[^>]*>\s*顧客を追加\s*</(?:button|a)>') { throw "Run $run omits the supplied collection action." }
  if ($html -notmatch '(?is)class="[^"]*(?:condition-pane|search-conditions)[^"]*"') {
    throw "Run $run does not name the bounded condition pane."
  }
  if ($css -notmatch '(?is)\.(?:condition-pane|search-conditions)\s*\{[^}]*max-(?:width|inline-size)\s*:') {
    throw "Run $run does not constrain the bounded condition pane."
  }
  if ($html -notmatch '(?is)class="[^"]*(?:result-pane|results-pane)[^"]*"') {
    throw "Run $run does not name the fluid result pane."
  }
  if ($css -notmatch '(?is)\.(?:result-pane|results-pane)\s*\{[^}]*inline-size\s*:\s*100%\s*;?[^}]*\}') {
    throw "Run $run does not make the result pane fluid."
  }
  if ($css -notmatch '(?is)\.(?:condition-actions|condition-toolbar|search-actions|form-actions)\s*\{[^}]*justify-content\s*:\s*flex-end\s*;?[^}]*\}') {
    throw "Run $run does not place the condition-action toolbar at the logical end."
  }
  if ($css -notmatch '(?is)(?:\.(?:result-toolbar|results-toolbar)\s*\{|\.(?:condition-toolbar|condition-actions|search-actions|form-actions)[^{]*\.(?:result-toolbar|results-toolbar)[^{]*\{)[^}]*inline-size\s*:\s*100%\s*;?[^}]*\}') {
    throw "Run $run does not make the result toolbar match the fluid Grid width."
  }
  if ($css -notmatch '(?is)(?:\.(?:pagination-footer|result-pagination)\s*\{|\.(?:condition-toolbar|condition-actions|search-actions|form-actions)[^{]*\.(?:pagination-footer|result-pagination)[^{]*\{)[^}]*inline-size\s*:\s*100%\s*;?[^}]*\}') {
    throw "Run $run does not make the pagination footer match the fluid Grid width."
  }
  if ($css -notmatch '(?is)(?:tbody\s+)?td(?:[.#][a-z0-9_-]+)?\s*\{[^}]*background(?:-color)?\s*:\s*var\(--surface-background\)\s*;?[^}]*color\s*:\s*var\(--text-primary\)\s*;?[^}]*\}') {
    throw "Run $run does not apply the active surface and primary-text roles to body cells."
  }
  if ($css -notmatch '(?is)(?:thead\s+)?th\s*\{[^}]*background(?:-color)?\s*:\s*var\(--table-header-background\)\s*;?[^}]*color\s*:\s*var\(--table-header-foreground\)\s*;?[^}]*\}') {
    throw "Run $run does not apply the active table-header roles to header cells."
  }
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

Write-Output "Customer-search attempt-8 artifact checks passed. Runs: 3. Manifest snapshot files: $($manifestFiles.Count). Captures: $pngCount at 1440x1200. External dependencies: 0."
