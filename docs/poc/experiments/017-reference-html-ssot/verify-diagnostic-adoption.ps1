$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$output = Join-Path $experiment 'output/diagnostic-adoption'
$reporter = Join-Path $experiment 'review/diagnostic-presentation.mjs'
$reporterTest = Join-Path $experiment 'review/diagnostic-presentation.test.mjs'
$publisher = Join-Path $experiment 'review/write-diagnostic-presentation.ps1'
$adapter = Join-Path $experiment 'review/write-part-to-integrated-presentations.ps1'

function Read-Json([string]$Path) {
  Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Require-Hash([string]$Path, [string]$Expected) {
  $actual = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
  if ($actual -ne $Expected) { throw "Hash mismatch for $Path. Expected $Expected; found $actual." }
}

function Require-PassReport([string]$Path, [int]$Diagnostics) {
  $report = Read-Json $Path
  if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0 -or $report.summary.diagnosticCount -ne $Diagnostics) {
    throw "Unexpected pass report: $Path"
  }
  if ($report.console.errorCount -ne 0 -or $report.network.failedRequestCount -ne 0 -or @($report.network.externalRequests).Count -ne 0) {
    throw "Unhealthy browser evidence: $Path"
  }
  $report
}

function Require-Trace([string]$RawPath, [string]$PresentationPath) {
  $raw = Read-Json $RawPath
  $presentation = Read-Json $PresentationPath
  $rawHash = (Get-FileHash -LiteralPath $RawPath -Algorithm SHA256).Hash
  if ($presentation.source.sha256 -ne $rawHash -or $presentation.source.status -ne $raw.status) {
    throw "Presentation source trace changed: $PresentationPath"
  }
  $indexes = @($presentation.errors.rawDifferenceIndexes) + @($presentation.diagnostics.rawDifferenceIndexes)
  $ordered = @($indexes | Sort-Object)
  if ($ordered.Count -ne $raw.differences.Count) { throw "Trace count changed: $PresentationPath" }
  for ($index = 0; $index -lt $ordered.Count; $index += 1) {
    if ($ordered[$index] -ne $index + 1) { throw "Missing or duplicate raw index in $PresentationPath" }
  }
  $presentation
}

Push-Location $experiment
try {
  Require-Hash 'reference/index.html' '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
  Require-Hash 'variants/04-partial-reference/references/common-shell.html' '08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527'
  Require-Hash 'variants/08-token-ownership-theme-independence/candidate-a-self-contained/detail-summary.html' 'FD9DDD69570D420149A9904E5E05058423815C3AA8CA078FD5128E3206B2A9E3'
  Require-Hash 'core/browser-core.js' '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8'
  Require-Hash 'cli/reference-ui.mjs' '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
  Require-Hash $reporter '42C28A6BD2678AB20304469F5C1A8FC8496DECB0C40D34C8D75DFEAB45E65D4C'
  Require-Hash 'variants/10-diagnostic-presentation-adoption/target/index.html' '7C65E52C6597B8FC93CA794249610135967D2E07C79E334E26BA8533AE5DBFE2'

  node --check $reporter
  if ($LASTEXITCODE -ne 0) { throw 'Reporter syntax check failed.' }
  node --test $reporterTest
  if ($LASTEXITCODE -ne 0) { throw 'Reporter fixture tests failed.' }
  [ScriptBlock]::Create((Get-Content -Raw -LiteralPath $publisher)) | Out-Null
  [ScriptBlock]::Create((Get-Content -Raw -LiteralPath $adapter)) | Out-Null

  $shell = Require-PassReport (Join-Path $output 'target-shell.raw.report.json') 78
  $detail = Require-PassReport (Join-Path $output 'target-detail.raw.report.json') 48
  if ($shell.browser.name -ne $detail.browser.name -or $shell.browser.name -notmatch '^Chrome/') {
    throw 'Third-responsibility browser lineage changed.'
  }

  $shellPresentation = Require-Trace (Join-Path $output 'target-shell.raw.report.json') (Join-Path $output 'reviewer/target-shell.json')
  $detailPresentation = Require-Trace (Join-Path $output 'target-detail.raw.report.json') (Join-Path $output 'reviewer/target-detail.json')
  if ($shellPresentation.summary.diagnosticEntryCount -ne 6 -or $detailPresentation.summary.diagnosticEntryCount -ne 17) {
    throw 'Third-responsibility presentation counts changed.'
  }
  foreach ($name in @('target-shell.json', 'target-shell.md', 'target-detail.json', 'target-detail.md')) {
    $first = Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $output "reviewer/$name")
    $repeat = Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $output "reviewer-repeat/$name")
    if ($first.Hash -ne $repeat.Hash) { throw "Nondeterministic presentation: $name" }
  }

  $negativeRaw = Read-Json (Join-Path $output 'negative-focus.raw.report.json')
  $negativePresentation = Require-Trace (Join-Path $output 'negative-focus.raw.report.json') (Join-Path $output 'reviewer/negative-focus.json')
  $firstError = 0
  for ($index = 0; $index -lt $negativeRaw.differences.Count; $index += 1) {
    if ($negativeRaw.differences[$index].severity -eq 'error') { $firstError = $index + 1; break }
  }
  if ($negativeRaw.status -ne 'fail' -or $negativeRaw.summary.errorCount -ne 2 -or
      $negativePresentation.errors.Count -ne 1 -or $firstError -ne 17 -or
      (@($negativePresentation.errors[0].rawDifferenceIndexes) -join ',') -ne '17,34') {
    throw 'Negative trace changed.'
  }

  $analysis = Read-Json (Join-Path $output 'new-responsibility.analysis.json')
  $detailAnalysis = @($analysis.comparisons | Where-Object name -eq 'detail')[0]
  if ($detailAnalysis.fieldOnly.heterogeneousGroupCount -ne 1 -or $detailAnalysis.exactValue.trace.status -ne 'pass') {
    throw 'False-grouping evidence changed.'
  }

  $savedReports = [ordered]@{
    'output/partial-reference/target-shell.report.json' = '833DB640FC2C4AA6E4D8D16EC3F7298D4EE686AF38213B7F4E776C35A5A8E720'
    'output/partial-reference/target-workspace.report.json' = '71C6B4BBB7A2E1D41651AC75F61938923DAADFBD982191B5A2C4AA6E2F0A6ADE'
    'output/form-heavy-partial/target-shell.report.json' = 'E7A975CE96552851FD5D69DB5B4B3F880CD0C7AC7CA135A35558A11CB5E47213'
    'output/form-heavy-partial/target-form.report.json' = 'D208532EFB4D812AB2AFA0897C39A2DEA085D8B67D95D4CC85559C98014F5923'
  }
  foreach ($entry in $savedReports.GetEnumerator()) { Require-Hash $entry.Key $entry.Value }

  $auditOutput = Join-Path $output 'verification-adopted'
  $results = @(& $adapter -OutputDirectory $auditOutput)
  if ($results.Count -ne 4 -or @($results | Where-Object status -ne 'written').Count -ne 0) {
    throw 'Adoption adapter did not publish all four reports.'
  }
  foreach ($entry in $savedReports.GetEnumerator()) { Require-Hash $entry.Key $entry.Value }

  $isolationJson = Join-Path $output 'verification-failure/review.json'
  $isolationMarkdown = Join-Path $output 'verification-failure/review.md'
  $isolationRaw = Join-Path $output 'target-detail.raw.report.json'
  $rawHash = (Get-FileHash -LiteralPath $isolationRaw -Algorithm SHA256).Hash
  $skipped = & $publisher -RawReport $isolationRaw -OutputJson $isolationJson -OutputMarkdown $isolationMarkdown -Reporter (Join-Path $experiment 'review/missing-reporter.mjs') 3>$null
  if ($skipped.status -ne 'skipped' -or $LASTEXITCODE -ne 0 -or
      (Test-Path -LiteralPath $isolationJson) -or (Test-Path -LiteralPath $isolationMarkdown) -or
      (Get-FileHash -LiteralPath $isolationRaw -Algorithm SHA256).Hash -ne $rawHash) {
    throw 'Presentation failure isolation changed.'
  }

  $aliasMarkdown = Join-Path $output 'verification-failure/alias.md'
  $aliasResult = & $publisher -RawReport $isolationRaw -OutputJson $isolationRaw -OutputMarkdown $aliasMarkdown 3>$null
  if ($aliasResult.status -ne 'skipped' -or $LASTEXITCODE -ne 0 -or
      -not (Test-Path -LiteralPath $isolationRaw -PathType Leaf) -or
      (Get-FileHash -LiteralPath $isolationRaw -Algorithm SHA256).Hash -ne $rawHash) {
    throw 'Raw/derived alias protection changed.'
  }

  $conformance = Read-Json (Join-Path $output 'conformance-regression/gate-summary.json')
  $reliability = Read-Json (Join-Path $output 'conformance-regression/harness-reliability.json')
  if ($conformance.status -ne 'pass' -or $conformance.positiveReferenceShapes -ne 8 -or
      $conformance.reversibleProbeFamilies -ne 9 -or $reliability.gateTimeouts -ne 0 -or $reliability.gateRetries -ne 0) {
    throw 'Conformance regression evidence changed.'
  }
  $thirdReliability = Read-Json (Join-Path $output 'harness-reliability.json')
  if ($thirdReliability.browserVersion -ne $shell.browser.name -or
      $thirdReliability.thirdResponsibilityDevelopmentAndGateAttempts -ne 9 -or
      $thirdReliability.timeouts -ne 0 -or $thirdReliability.retries -ne 0) {
    throw 'Third-responsibility harness evidence changed.'
  }

  $established = [ordered]@{
    'regression.search-shell.report.json' = 182
    'regression.search-workspace.report.json' = 199
    'regression.form-shell.report.json' = 247
    'regression.form-workflow.report.json' = 192
  }
  foreach ($entry in $established.GetEnumerator()) {
    Require-PassReport (Join-Path $output "established-regression/$($entry.Key)") $entry.Value | Out-Null
  }
  $strengthenedNegative = Read-Json (Join-Path $output 'established-regression/injected-focus.report.json')
  if ($strengthenedNegative.status -ne 'fail' -or $strengthenedNegative.summary.errorCount -ne 3 -or $strengthenedNegative.summary.uniqueErrorCount -ne 2) {
    throw 'Current established negative evidence changed.'
  }

  $external = rg -n --pcre2 'https?://|@import|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b' 'variants/10-diagnostic-presentation-adoption/target/index.html' 'review/write-diagnostic-presentation.ps1' 'review/write-part-to-integrated-presentations.ps1'
  if ($LASTEXITCODE -eq 0) { throw "External transport found:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'External-source scan failed.' }
  if (@(Get-ChildItem -File -Recurse -LiteralPath $output | Where-Object Name -Match '\.tmp-').Count -ne 0) {
    throw 'Temporary presentation files remain.'
  }

  Require-Hash $reporter '42C28A6BD2678AB20304469F5C1A8FC8496DECB0C40D34C8D75DFEAB45E65D4C'
  Write-Host 'Diagnostic Presentation Adoption evidence audit passed.'
  Write-Host 'New responsibility: 126 raw diagnostics -> 23 exact entries; negative raw 17 -> presentation 1.'
  Write-Host 'Adoption: 4 saved raw reports published; Conformance: pass; timeouts/retries: 0/0.'
} finally {
  Pop-Location
}
