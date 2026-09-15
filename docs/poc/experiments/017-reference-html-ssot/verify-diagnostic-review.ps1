$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$reporter = Join-Path $experiment 'review/diagnostic-presentation.mjs'
$analysisTool = Join-Path $experiment 'review/diagnostic-analysis.mjs'
$reporterTests = Join-Path $experiment 'review/diagnostic-presentation.test.mjs'
$output = Join-Path $experiment 'output/diagnostic-review'
$edgeBrowser = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$chromeBrowser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$partialVariant = Join-Path $experiment 'variants/04-partial-reference'
$formVariant = Join-Path $experiment 'variants/05-form-heavy-partial'
$consumerRoot = Join-Path $experiment 'consumers'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$searchTarget = Join-Path $partialVariant 'target/index.html'
$formTarget = Join-Path $formVariant 'target/index.html'
$formOverrides = Join-Path $formVariant 'target/scenario-overrides.json'

$rawReports = [ordered]@{
  'search-shell' = 'output/partial-reference/target-shell.report.json'
  'search-workspace' = 'output/partial-reference/target-workspace.report.json'
  'form-shell' = 'output/form-heavy-partial/target-shell.report.json'
  'form-workflow' = 'output/form-heavy-partial/target-form.report.json'
}
$fixedHashes = [ordered]@{
  $cli = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
  $core = '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8'
  $acceptedReference = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
  (Join-Path $experiment $rawReports['search-shell']) = '833DB640FC2C4AA6E4D8D16EC3F7298D4EE686AF38213B7F4E776C35A5A8E720'
  (Join-Path $experiment $rawReports['search-workspace']) = '71C6B4BBB7A2E1D41651AC75F61938923DAADFBD982191B5A2C4AA6E2F0A6ADE'
  (Join-Path $experiment $rawReports['form-shell']) = 'E7A975CE96552851FD5D69DB5B4B3F880CD0C7AC7CA135A35558A11CB5E47213'
  (Join-Path $experiment $rawReports['form-workflow']) = 'D208532EFB4D812AB2AFA0897C39A2DEA085D8B67D95D4CC85559C98014F5923'
}
$fixedTrees = [ordered]@{
  $partialVariant = [ordered]@{ fileCount = 4; digest = '8DC5FFBC2F0CD00D240B4C99A868F0A751EC90E6FF6D2DEF2006AE1A908D94E1'; excludeDependencies = $false }
  $formVariant = [ordered]@{ fileCount = 3; digest = '79C69C17B2D549C8132B14C414A4D9F7D73D9272B92287ED3D5092D43DB66188'; excludeDependencies = $false }
  $consumerRoot = [ordered]@{ fileCount = 20; digest = 'B2B0E11CEC5F01725CEF1A490437A8D2E4B1DC2E1CC50B2306CABA0D0569F26A'; excludeDependencies = $true }
}

$env:REFERENCE_UI_BROWSER = $chromeBrowser
$script:harnessAttempts = 0
$script:harnessTimeouts = 0
$script:harnessRetries = 0
$script:harnessEvents = @()

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Write-Json([string]$Path, $Value) {
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Require-Hash([string]$Path, [string]$Expected, [string]$Label) {
  $actual = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
  if ($actual -ne $Expected) { throw "$Label changed. Expected $Expected but found $actual." }
}

function Get-TreeDigest([string]$Path, [bool]$ExcludeDependencies) {
  $root = [IO.Path]::GetFullPath($Path).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $files = @(Get-ChildItem -File -Recurse $root | Where-Object {
    -not $ExcludeDependencies -or $_.FullName -notmatch '[\\/]node_modules[\\/]'
  })
  $lines = @($files | Sort-Object FullName | ForEach-Object {
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    "$relative=$((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)"
  })
  return [ordered]@{
    fileCount = $files.Count
    digest = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n"))))
  }
}

function Require-FixedEvidence([string]$When) {
  foreach ($entry in $fixedHashes.GetEnumerator()) { Require-Hash $entry.Key $entry.Value "$($entry.Key) $When" }
  foreach ($entry in $fixedTrees.GetEnumerator()) {
    $actual = Get-TreeDigest $entry.Key $entry.Value.excludeDependencies
    if ($actual.fileCount -ne $entry.Value.fileCount -or $actual.digest -ne $entry.Value.digest) {
      throw "$($entry.Key) changed $When. Files=$($actual.fileCount), digest=$($actual.digest)."
    }
  }
}

function Invoke-Node([string[]]$NodeArguments, [int]$Expected, [string]$Label) {
  $lines = @(& node @NodeArguments 2>&1)
  $exitCode = $LASTEXITCODE
  $lines | ForEach-Object { Write-Host $_ }
  if ($exitCode -ne $Expected) { throw "$Label exited with $exitCode; expected $Expected." }
}

function Invoke-ReferenceUi([string[]]$CliArguments, [int]$Expected, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $script:harnessAttempts += 1
    $started = Get-Date
    $lines = @(& node $cli @CliArguments 2>&1)
    $exitCode = $LASTEXITCODE
    $joined = $lines -join "`n"
    $timedOut = $joined -match 'Timed out waiting'
    if ($timedOut) { $script:harnessTimeouts += 1 }
    $script:harnessEvents += [ordered]@{
      label = $Label
      attempt = $attempt
      browser = $env:REFERENCE_UI_BROWSER
      exitCode = $exitCode
      timedOut = $timedOut
      elapsedMilliseconds = [int]((Get-Date) - $started).TotalMilliseconds
    }
    $lines | ForEach-Object { Write-Host $_ }
    if ($exitCode -eq $Expected) { return }
    if ($timedOut -and $attempt -eq 1) { $script:harnessRetries += 1; continue }
    throw "$Label exited with $exitCode; expected $Expected."
  }
}

function Require-PresentationTrace($Raw, $Presentation, [string]$Label) {
  if ($Raw.status -ne $Presentation.summary.status -or $Raw.status -ne $Presentation.source.status) {
    throw "$Label changed source status."
  }
  if ($Raw.summary.errorCount -ne $Presentation.summary.rawErrorCount -or
      $Raw.summary.diagnosticCount -ne $Presentation.summary.rawDiagnosticCount -or
      $Raw.differences.Count -ne $Presentation.summary.rawDifferenceCount) {
    throw "$Label changed raw counts."
  }
  $indexes = @($Presentation.errors + $Presentation.diagnostics | ForEach-Object { $_.rawDifferenceIndexes })
  $sorted = @($indexes | Sort-Object)
  if ($sorted.Count -ne $Raw.differences.Count) { throw "$Label did not index every raw difference." }
  for ($index = 0; $index -lt $sorted.Count; $index += 1) {
    if ($sorted[$index] -ne $index + 1) { throw "$Label contains a missing or duplicate raw index." }
  }
}

function New-Presentation([string]$Name, [string]$RawRelative, [int]$ExpectedExit) {
  $presentationDirectory = Join-Path $output 'presentations'
  $repeatDirectory = Join-Path $output 'presentation-repeat'
  $json = Join-Path $presentationDirectory "$Name.json"
  $markdown = Join-Path $presentationDirectory "$Name.md"
  $repeatJson = Join-Path $repeatDirectory "$Name.json"
  $repeatMarkdown = Join-Path $repeatDirectory "$Name.md"
  Invoke-Node @($reporter, $RawRelative, '--out', $json, '--markdown', $markdown) $ExpectedExit "$Name presentation"
  Invoke-Node @($reporter, $RawRelative, '--out', $repeatJson, '--markdown', $repeatMarkdown) $ExpectedExit "$Name repeated presentation"
  $jsonHash = (Get-FileHash -LiteralPath $json -Algorithm SHA256).Hash
  $markdownHash = (Get-FileHash -LiteralPath $markdown -Algorithm SHA256).Hash
  if ($jsonHash -ne (Get-FileHash -LiteralPath $repeatJson -Algorithm SHA256).Hash -or
      $markdownHash -ne (Get-FileHash -LiteralPath $repeatMarkdown -Algorithm SHA256).Hash) {
    throw "$Name presentation is not byte-deterministic."
  }
  $rawPath = Join-Path $experiment $RawRelative
  $raw = Read-Json $rawPath
  $presentation = Read-Json $json
  Require-PresentationTrace $raw $presentation $Name
  if ($presentation.source.sha256 -ne (Get-FileHash -LiteralPath $rawPath -Algorithm SHA256).Hash) {
    throw "$Name source hash does not trace to the complete raw report."
  }
  return [ordered]@{
    name = $Name
    sourcePath = $RawRelative.Replace('\', '/')
    sourceSha256 = $presentation.source.sha256
    sourceStatus = $raw.status
    rawDifferenceCount = $raw.differences.Count
    rawErrorCount = $raw.summary.errorCount
    rawDiagnosticCount = $raw.summary.diagnosticCount
    reviewerEntryCount = $presentation.summary.reviewerEntryCount
    errorEntryCount = $presentation.summary.errorEntryCount
    diagnosticEntryCount = $presentation.summary.diagnosticEntryCount
    markdownLineCount = (Get-Content -LiteralPath $markdown).Count
    jsonSha256 = $jsonHash
    markdownSha256 = $markdownHash
    deterministic = $true
    traceability = 'complete one-based raw indexes plus source SHA-256'
  }
}

function Require-PassComparison([string]$Path, [int]$Diagnostics, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0 -or $report.summary.diagnosticCount -ne $Diagnostics) {
    throw "$Label regression changed."
  }
}

function Require-Preflight([string]$Path, [string]$Status, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -ne $Status) { throw "$Label preflight status changed." }
  if ($Status -eq 'pass' -and $report.summary.errorCount -ne 0) { throw "$Label contains Conformance errors." }
  if ($Status -eq 'error' -and $report.summary.errorCount -eq 0) { throw "$Label negative no longer fails." }
}

function Invoke-FocusProbe {
  $probeRoot = Join-Path $env:TEMP "poc017-diagnostic-focus-$([guid]::NewGuid().ToString('N'))"
  $rawReport = Join-Path $output 'injected-focus.report.json'
  try {
    New-Item -ItemType Directory -Path $probeRoot | Out-Null
    $probe = Join-Path $probeRoot 'index.html'
    Copy-Item -LiteralPath $searchTarget -Destination $probe
    $text = Get-Content -Raw -LiteralPath $probe
    if ([regex]::Matches($text, '--focus:\s*#86b9ee;').Count -ne 1) { throw 'Focus probe target is not unique.' }
    $mutated = [regex]::Replace($text, '--focus:\s*#86b9ee;', '--focus: #ff00aa;', 1)
    [IO.File]::WriteAllText($probe, $mutated, [Text.Encoding]::UTF8)
    Invoke-ReferenceUi @('verify', $probe, '--baseline', 'output/diagnostic-review/regression.search-workspace.baseline.snapshot.json', '--out', $rawReport) 1 'Injected late-focus defect'
  }
  finally {
    if (Test-Path $probeRoot) {
      $resolved = [IO.Path]::GetFullPath($probeRoot)
      $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
      if (-not $resolved.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -or
          -not (Split-Path -Leaf $resolved).StartsWith('poc017-diagnostic-focus-')) {
        throw 'Refusing to remove an unexpected focus-probe directory.'
      }
      Remove-Item -LiteralPath $resolved -Recurse -Force
    }
  }
  $raw = Read-Json $rawReport
  if ($raw.status -ne 'fail' -or $raw.summary.errorCount -eq 0 -or $raw.summary.diagnosticCount -ne 199) {
    throw 'Injected focus defect did not preserve noisy comparison semantics.'
  }
  $errorPaths = @($raw.differences | Where-Object severity -eq 'error' | ForEach-Object {
    $_.path -replace '^initial\.', '' -replace '^scenarios\.[^.]+\.step-\d+\.', ''
  } | Sort-Object -Unique)
  if ($errorPaths.Count -ne 1 -or $errorPaths[0] -ne 'elements.filter-toggle.styles.outlineColor') {
    throw 'Injected focus defect produced an unexpected error signature.'
  }
  $firstRawError = 0
  for ($index = 0; $index -lt $raw.differences.Count; $index += 1) {
    if ($raw.differences[$index].severity -eq 'error') { $firstRawError = $index + 1; break }
  }
  $presentationMetric = New-Presentation 'injected-focus' 'output/diagnostic-review/injected-focus.report.json' 1
  $presentation = Read-Json (Join-Path $output 'presentations/injected-focus.json')
  if ($presentation.errors.Count -ne 1 -or $presentation.errors[0].normalizedPath -ne 'elements.filter-toggle.styles.outlineColor') {
    throw 'Reviewer presentation did not isolate the injected defect.'
  }
  if ($firstRawError -le 1) { throw 'Injected defect is not a meaningful noisy-order probe.' }
  return [ordered]@{
    rawStatus = $raw.status
    rawErrorCount = $raw.summary.errorCount
    rawDiagnosticCount = $raw.summary.diagnosticCount
    firstRawErrorEntry = $firstRawError
    firstReviewerErrorEntry = 1
    reviewerErrorEntryCount = $presentation.errors.Count
    reviewerDiagnosticEntryCount = $presentation.diagnostics.Count
    rawSourceSha256 = (Get-FileHash -LiteralPath $rawReport -Algorithm SHA256).Hash
    presentationSourceSha256 = $presentation.source.sha256
    rawIndexes = $presentation.errors[0].rawDifferenceIndexes
    rawEvidenceComplete = $true
    rawCliExit = 1
    presentationExit = 1
    persistentTargetRestored = $true
    presentation = $presentationMetric
  }
}

$resolvedOutput = [IO.Path]::GetFullPath($output)
$expectedOutput = [IO.Path]::GetFullPath((Join-Path $experiment 'output/diagnostic-review'))
if ($resolvedOutput -ne $expectedOutput) { throw 'Diagnostic output path is not the expected workspace directory.' }
if (Test-Path $output) { Remove-Item -LiteralPath $output -Recurse -Force }
New-Item -ItemType Directory -Path $output | Out-Null
New-Item -ItemType Directory -Path (Join-Path $output 'presentations') | Out-Null
New-Item -ItemType Directory -Path (Join-Path $output 'presentation-repeat') | Out-Null

Push-Location $experiment
try {
  Require-FixedEvidence 'before the Gate'
  Invoke-Node @('--check', $reporter) 0 'Reporter syntax check'
  Invoke-Node @('--check', $analysisTool) 0 'Analysis syntax check'
  Invoke-Node @($reporterTests) 0 'Reporter fixture tests'

  $presentationMetrics = @()
  foreach ($entry in $rawReports.GetEnumerator()) {
    $presentationMetrics += New-Presentation $entry.Key $entry.Value 0
  }

  $analysisPath = Join-Path $output 'candidate-analysis.json'
  $analysisArguments = @($analysisTool, '--out', $analysisPath)
  foreach ($entry in $rawReports.GetEnumerator()) { $analysisArguments += "$($entry.Key)=$($entry.Value)" }
  Invoke-Node $analysisArguments 0 'Candidate analysis'
  $analysis = Read-Json $analysisPath
  if ($analysis.families.search.rawDiagnosticCount -ne 381 -or
      $analysis.families.search.exactDiagnosticEntryCount -ne 39 -or
      $analysis.families.search.heterogeneousFieldGroups -ne 0) { throw 'Search diagnostic classification changed.' }
  if ($analysis.families.formHeavy.rawDiagnosticCount -ne 439 -or
      $analysis.families.formHeavy.exactDiagnosticEntryCount -ne 40 -or
      $analysis.families.formHeavy.fieldOnlyDiagnosticEntryCount -ne 37 -or
      $analysis.families.formHeavy.heterogeneousFieldGroups -ne 3) { throw 'Form diagnostic classification changed.' }

  $regressions = [ordered]@{
    'search-shell' = [ordered]@{ target = $searchTarget; reference = 'variants/04-partial-reference/references/common-shell.html'; expected = 182; overrides = $null; browser = $edgeBrowser }
    'search-workspace' = [ordered]@{ target = $searchTarget; reference = 'variants/04-partial-reference/references/search-workspace.html'; expected = 199; overrides = $null; browser = $edgeBrowser }
    'form-shell' = [ordered]@{ target = $formTarget; reference = 'variants/04-partial-reference/references/common-shell.html'; expected = 247; overrides = $null; browser = $chromeBrowser }
    'form-workflow' = [ordered]@{ target = $formTarget; reference = 'variants/05-form-heavy-partial/reference/form-workflow.html'; expected = 192; overrides = $formOverrides; browser = $chromeBrowser }
  }
  foreach ($entry in $regressions.GetEnumerator()) {
    $env:REFERENCE_UI_BROWSER = $entry.Value.browser
    $baseline = Join-Path $output "regression.$($entry.Key).baseline.snapshot.json"
    Invoke-ReferenceUi @('snapshot', $entry.Value.reference, '--out', $baseline) 0 "Current baseline $($entry.Key)"
    $report = Join-Path $output "regression.$($entry.Key).report.json"
    $arguments = @('verify', $entry.Value.target, '--baseline', $baseline, '--out', $report)
    if ($entry.Value.overrides) { $arguments += @('--scenario-overrides', $entry.Value.overrides) }
    Invoke-ReferenceUi $arguments 0 "Current comparison $($entry.Key)"
    Require-PassComparison $report $entry.Value.expected "Current comparison $($entry.Key)"
  }

  $env:REFERENCE_UI_BROWSER = $edgeBrowser
  $injected = Invoke-FocusProbe

  $env:REFERENCE_UI_BROWSER = $chromeBrowser

  $positivePreflights = [ordered]@{
    'common-shell' = 'variants/04-partial-reference/references/common-shell.html'
    'search-workspace' = 'variants/04-partial-reference/references/search-workspace.html'
    'form-workflow' = 'variants/05-form-heavy-partial/reference/form-workflow.html'
  }
  foreach ($entry in $positivePreflights.GetEnumerator()) {
    $path = Join-Path $output "preflight.$($entry.Key).json"
    Invoke-ReferenceUi @('preflight', $entry.Value, '--out', $path) 0 "Positive preflight $($entry.Key)"
    Require-Preflight $path 'pass' $entry.Key
  }
  $negativePreflights = [ordered]@{
    'semantic-ambiguity' = 'variants/02-mixed-semantic/semantic-ambiguity-probe.html'
    'relational-ambiguity' = 'variants/03-relational-reuse/relational-ambiguity-probe.html'
    'whole-page-missing-h1' = 'variants/04-partial-reference/probes/whole-page-missing-h1.html'
  }
  foreach ($entry in $negativePreflights.GetEnumerator()) {
    $path = Join-Path $output "conformance-negative.$($entry.Key).json"
    Invoke-ReferenceUi @('preflight', $entry.Value, '--out', $path) 1 "Conformance negative $($entry.Key)"
    Require-Preflight $path 'error' $entry.Key
  }

  $historicalPath = Join-Path $output 'historical-negative.report.json'
  Invoke-ReferenceUi @('verify', 'consumers/negative/index.html', '--root', 'consumers', '--baseline', 'output/reference.snapshot.json', '--out', $historicalPath) 1 'Historical comparative negative'
  $historical = Read-Json $historicalPath
  if ($historical.status -ne 'fail' -or $historical.summary.uniqueErrorCount -ne 15) { throw 'Historical negative coverage changed.' }
  $semanticReference = Join-Path $output 'semantic-only-reference.snapshot.json'
  Invoke-ReferenceUi @('snapshot', 'iterations/01-semantic-only/reference.html', '--out', $semanticReference) 0 'Semantic-only Reference regression'
  $semanticPath = Join-Path $output 'semantic-only-consumer.report.json'
  Invoke-ReferenceUi @('verify', 'iterations/01-semantic-only/consumer.html', '--baseline', $semanticReference, '--out', $semanticPath) 1 'Semantic-only comparative negative'
  $semantic = Read-Json $semanticPath
  if ($semantic.status -ne 'fail' -or @($semantic.summary.errorSignatures.path) -notcontains 'semanticInventory.combobox') {
    throw 'Semantic-only negative coverage changed.'
  }

  $sourceMetrics = [ordered]@{
    reportingLayer = [ordered]@{
      files = 3
      reporterLines = (Get-Content $reporter).Count
      analysisLines = (Get-Content $analysisTool).Count
      fixtureTestLines = (Get-Content $reporterTests).Count
      dependenciesAdded = 0
      referenceSpecificRules = 0
      scopeMetadata = 0
      suppressionRules = 0
    }
    fixedComparisonCliCoreChanges = 0
    referenceChanges = 0
    targetChanges = 0
    consumerChanges = 0
    conformanceRulesAdded = 0
    geometryToleranceChanges = 0
  }
  Write-Json (Join-Path $output 'source-metrics.json') $sourceMetrics
  Write-Json (Join-Path $output 'presentation-generation.json') $presentationMetrics
  Write-Json (Join-Path $output 'injected-defect-metrics.json') $injected
  Write-Json (Join-Path $output 'harness-reliability.json') ([ordered]@{
    browsers = @($edgeBrowser, $chromeBrowser)
    attempts = $script:harnessAttempts
    timeouts = $script:harnessTimeouts
    retries = $script:harnessRetries
    events = $script:harnessEvents
  })

  Require-FixedEvidence 'after the Gate'
  $gate = [ordered]@{
    status = 'pass'
    selectedPresentation = $analysis.selectedPresentation
    noisyComparisons = 4
    rawDiagnosticCount = 820
    reviewerDiagnosticEntryCount = 79
    repeatedOccurrencesCollapsed = 741
    search = $analysis.families.search
    formHeavy = $analysis.families.formHeavy
    injectedDefect = $injected
    currentComparisonRegressions = 4
    positiveConformanceChecks = 3
    retainedConformanceNegatives = 3
    retainedComparativeNegatives = 2
    rawEvidenceChanged = 0
    comparisonSemanticsChanged = 0
    cliCoreChanges = 0
    referenceChanges = 0
    targetChanges = 0
    consumerChanges = 0
    conformanceRulesAdded = 0
    harnessAttempts = $script:harnessAttempts
    harnessTimeouts = $script:harnessTimeouts
    harnessRetries = $script:harnessRetries
  }
  Write-Json (Join-Path $output 'gate-summary.json') $gate
  Write-Host 'Diagnostic Review Signal / Noise Gate passed mechanically.'
  Write-Host "Raw diagnostics: 820; reviewer diagnostic entries: 79; harness attempts=$($script:harnessAttempts), timeouts=$($script:harnessTimeouts), retries=$($script:harnessRetries)."
}
finally {
  Pop-Location
}
