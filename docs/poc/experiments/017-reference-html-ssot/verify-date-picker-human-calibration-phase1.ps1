[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$reviewRoot = Join-Path $experiment 'review/date-picker-human-calibration'
$baselineRoot = Join-Path $reviewRoot 'baseline'
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$historicalManifestPath = Join-Path $experiment 'review/historical-evidence-provenance.json'
$fixedCompositeOutput = Join-Path $experiment 'output/composite-granularity/20260813T235448Z'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = Join-Path $experiment "output/date-picker-human-calibration/$runId"
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_BROWSER = $browser

$sources = [ordered]@{
  'single-date' = Join-Path $baselineRoot 'single-date.html'
  'date-range' = Join-Path $baselineRoot 'date-range.html'
}

$expectedHashes = [ordered]@{
  'single-date' = '7FB5D151B48FEDC64CF6839EFC5B87C2D4BE0D77B3264F2FE2958CAA65F41E10'
  'date-range' = 'DA068C8BB35EC3B0AF8108DF4EB72A17201886BF56B6CDFCB4B0EA58A18A9C94'
  'origin-single-date' = 'B8F4FEC9B02D96769D139DCE77AC424C7F51063C0B43550B3409D5588E2EA6CE'
  'origin-date-range' = '82E6769E5A75ED8E86205164BC857030FB7484D57950DE1558B039095A0EFA64'
  'cli' = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
  'core' = '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8'
  'accepted-reference' = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
  'composite-verifier' = '1A1538587C3FEDC27FD2D23EAF2C9345CD62D5803FC5DF0C98A1DFB79DCBC9CC'
  'composite-result' = 'D9073684A108D0B4ABC8360A3DD20EBD7B870B4688222EC7A6B49D065FC91E3D'
  'composite-verification-record' = '47F218AAE4FC861B8A0273433813439A2B6AD3EFD8BCDACC3AC956EA65BA5B55'
}

$hashPaths = [ordered]@{
  'single-date' = $sources['single-date']
  'date-range' = $sources['date-range']
  'origin-single-date' = Join-Path $experiment 'variants/11-composite-granularity/references/date-picker.html'
  'origin-date-range' = Join-Path $experiment 'variants/11-composite-granularity/references/date-range-picker.html'
  'cli' = $cli
  'core' = $core
  'accepted-reference' = $acceptedReference
  'composite-verifier' = Join-Path $experiment 'verify-composite-granularity.ps1'
  'composite-result' = Join-Path $experiment 'composite-granularity-result.md'
  'composite-verification-record' = Join-Path $experiment 'composite-granularity-verification-record.md'
}

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Write-Json([string]$Path, $Value) {
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Path))) | Out-Null
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Get-RelativePath([string]$Path) {
  return [IO.Path]::GetFullPath($Path).Substring([IO.Path]::GetFullPath($experiment).TrimEnd('\').Length + 1).Replace('\', '/')
}

function Get-TreeDigest([string]$Path, [string]$RelativeRoot) {
  $root = [IO.Path]::GetFullPath($Path).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $relativeRootPath = [IO.Path]::GetFullPath($RelativeRoot).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $files = @(Get-ChildItem -LiteralPath $root -File -Recurse)
  $lines = @($files | Sort-Object FullName | ForEach-Object {
    $relative = $_.FullName.Substring($relativeRootPath.Length + 1).Replace('\', '/')
    "$relative=$((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)"
  })
  return [ordered]@{
    fileCount = $files.Count
    sha256 = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n"))))
  }
}

function Get-HistoricalDigests {
  $manifest = Read-Json $historicalManifestPath
  $result = [ordered]@{}
  foreach ($property in $manifest.gates.PSObject.Properties) {
    $gate = $property.Value
    $observed = [ordered]@{
      entryPoint = (Get-FileHash -LiteralPath (Join-Path $experiment $gate.entryPoint.path) -Algorithm SHA256).Hash
      verificationRecord = (Get-FileHash -LiteralPath (Join-Path $experiment $gate.verificationRecord.path) -Algorithm SHA256).Hash
      output = Get-TreeDigest (Join-Path $experiment $gate.output.path) $experiment
    }
    if ($observed.entryPoint -ne $gate.entryPoint.sha256 -or
        $observed.verificationRecord -ne $gate.verificationRecord.sha256 -or
        $observed.output.fileCount -ne $gate.output.fileCount -or
        $observed.output.sha256 -ne $gate.output.sha256) {
      throw "$($property.Name) historical evidence no longer matches its provenance manifest."
    }
    $result[$property.Name] = $observed
  }
  return $result
}

function Assert-EqualDigest($Before, $After, [string]$Label) {
  if (($Before | ConvertTo-Json -Depth 30 -Compress) -cne ($After | ConvertTo-Json -Depth 30 -Compress)) {
    throw "$Label changed during Phase 1 verification."
  }
}

function Assert-FrozenInputs {
  foreach ($item in $hashPaths.GetEnumerator()) {
    $actual = (Get-FileHash -LiteralPath $item.Value -Algorithm SHA256).Hash
    if ($actual -ne $expectedHashes[$item.Key]) {
      throw "$($item.Key) hash was $actual; expected $($expectedHashes[$item.Key])."
    }
  }
  $composite = Get-TreeDigest $fixedCompositeOutput $experiment
  if ($composite.fileCount -ne 113 -or $composite.sha256 -ne '99BDD8BC4C702E2C78509AD2120332D69B09609AA77D7FE906DBA49944BF00BB') {
    throw 'The fixed Composite UI evidence tree no longer matches its Phase 1 provenance.'
  }
}

function Invoke-ReferenceUi([string[]]$Arguments, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $lines = @(& node $cli @Arguments 2>&1)
    $exitCode = $LASTEXITCODE
    $lines | ForEach-Object { Write-Host $_ }
    if ($exitCode -eq 0) { return }
    $timedOut = ($lines -join "`n") -match 'Timed out|timeout'
    if ($timedOut -and $attempt -eq 1) {
      Write-Host "$Label timed out; retrying once."
      continue
    }
    throw "$Label exited with $exitCode."
  }
}

function Assert-SourceContract([string]$Path, [string]$Kind) {
  $text = [IO.File]::ReadAllText($Path)
  if ([regex]::Matches($text, '\sdata-reference-harness=').Count -ne 1) { throw "$Kind must have exactly one review-harness label." }
  if ([regex]::Matches($text, '\sdata-reference-scenarios').Count -ne 1) { throw "$Kind must have exactly one scenario metadata root." }
  if ([regex]::Matches($text, '<button[^>]*aria-current="date"').Count -ne 1) { throw "$Kind must expose exactly one fixed today fixture." }
  if ($text -notmatch 'September 14, 2026, today') { throw "$Kind today fixture must have a complete accessible label." }
  if ($text -match 'aria-selected=') { throw "$Kind still uses aria-selected on native buttons." }
  if ($text -match '(?i)https?://|@import\s|\bfetch\s*\(|XMLHttpRequest|WebSocket') { throw "$Kind contains an external-resource or network primitive." }
  if ($text -notmatch "trigger\.addEventListener\('click', \(\) => \{ if \(popup\.hidden\) open\(\); else close\(\); \}\);") {
    throw "$Kind trigger does not implement observable open/close toggling."
  }
}

function Assert-HealthyPreflight([string]$Path, [string]$Label, [int]$ExpectedStates) {
  $report = Read-Json $Path
  if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0 -or $report.summary.checkedStateCount -ne $ExpectedStates) {
    throw "$Label conformance did not pass the expected $ExpectedStates states."
  }
  if ($report.console.errorCount -ne 0 -or @($report.network.externalRequests).Count -ne 0 -or $report.network.failedRequestCount -ne 0) {
    throw "$Label had console, external-network, or failed-request errors."
  }
}

function Get-AllStates($Bundle) {
  $states = @($Bundle.initial)
  foreach ($scenario in $Bundle.scenarios) {
    foreach ($step in $scenario.steps) { $states += $step.state }
  }
  return $states
}

function Assert-HealthySnapshot([string]$Path, [string]$Label, [int]$ExpectedScenarios) {
  $bundle = Read-Json $Path
  if ($bundle.console.errorCount -ne 0 -or @($bundle.network.externalRequests).Count -ne 0 -or $bundle.network.failedRequestCount -ne 0) {
    throw "$Label snapshot had console, external-network, or failed-request errors."
  }
  if (@($bundle.scenarios).Count -ne $ExpectedScenarios) { throw "$Label scenario count changed." }
  foreach ($state in (Get-AllStates $bundle)) {
    if (@($state.duplicateKeys).Count -ne 0 -or @($state.semanticAmbiguities).Count -ne 0 -or @($state.accessibilityIssues).Count -ne 0) {
      throw "$Label had duplicate identity, semantic ambiguity, or bounded accessibility issues."
    }
    if ($state.observationBoundary.excludedHarnessRoots -ne 1 -or $state.observationBoundary.axExcludedHarnessRoots -ne 1) {
      throw "$Label review harness was not excluded from DOM and accessibility observations."
    }
  }
  return $bundle
}

function Get-ScenarioState($Bundle, [string]$Scenario, [int]$Step) {
  $match = @($Bundle.scenarios | Where-Object name -eq $Scenario)
  if ($match.Count -ne 1 -or $Step -ge $match[0].steps.Count) { throw "$Scenario step $($Step + 1) is missing." }
  return $match[0].steps[$Step].state
}

function Assert-SingleDateStates($Bundle) {
  $open = Get-ScenarioState $Bundle 'toggle date picker' 0
  $closed = Get-ScenarioState $Bundle 'toggle date picker' 1
  $selected = Get-ScenarioState $Bundle 'pointer date selection' 1
  $focus = Get-ScenarioState $Bundle 'keyboard date selection' 1
  $clear = Get-ScenarioState $Bundle 'clear and reopen' 3
  if ($open.elements.'date-trigger'.attributes.'aria-expanded' -ne 'true' -or
      $open.elements.'semantic:controlled-by:date-trigger'.visible -ne $true -or $open.document.activeRef -ne 'date-day') { throw 'Single date open state failed.' }
  if ($closed.elements.'date-trigger'.attributes.'aria-expanded' -ne 'false' -or
      $closed.elements.'semantic:controlled-by:date-trigger'.visible -ne $false -or $closed.document.activeRef -ne 'date-trigger') { throw 'Single date closed state failed.' }
  if ($selected.elements.'date-day'.attributes.'aria-pressed' -ne 'true' -or
      $selected.elements.'date-selection'.name -ne 'Selected: September 15, 2026.' -or
      $selected.elements.'date-clear'.visible -ne $true -or $selected.document.activeRef -ne 'date-trigger') { throw 'Single date completion state failed.' }
  if ($focus.document.activeRef -ne 'date-next-day' -or $focus.elements.'date-next-day'.attributes.'aria-pressed') { throw 'Single date focus-before-selection state failed.' }
  if ($clear.elements.'date-trigger'.attributes.'aria-expanded' -ne 'true' -or
      $clear.elements.'date-day'.attributes.'aria-pressed' -or $clear.elements.'date-clear'.visible -ne $false -or
      $clear.elements.'date-selection'.name -ne 'No date selected.' -or $clear.document.activeRef -ne 'date-day') { throw 'Single date clear and reselection state failed.' }
}

function Assert-DateRangeStates($Bundle) {
  $open = Get-ScenarioState $Bundle 'toggle range picker' 0
  $closed = Get-ScenarioState $Bundle 'toggle range picker' 1
  $start = Get-ScenarioState $Bundle 'pointer range selection' 1
  $completed = Get-ScenarioState $Bundle 'pointer range selection' 2
  $focus = Get-ScenarioState $Bundle 'keyboard range selection' 2
  $clear = Get-ScenarioState $Bundle 'clear and reselect range' 4
  if ($open.elements.'range-trigger'.attributes.'aria-expanded' -ne 'true' -or
      $open.elements.'semantic:controlled-by:range-trigger'.visible -ne $true -or $open.document.activeRef -ne 'range-start-day') { throw 'Date range open state failed.' }
  if ($closed.elements.'range-trigger'.attributes.'aria-expanded' -ne 'false' -or
      $closed.elements.'semantic:controlled-by:range-trigger'.visible -ne $false -or $closed.document.activeRef -ne 'range-trigger') { throw 'Date range closed state failed.' }
  if ($start.elements.'range-start-day'.attributes.'aria-pressed' -ne 'true' -or
      $start.elements.'range-status'.name -ne 'Select the end date.' -or $start.elements.'range-clear'.visible -ne $false -or
      $start.elements.'semantic:controlled-by:range-trigger'.visible -ne $true) { throw 'Date range intermediate state failed.' }
  if ($completed.elements.'range-start-day'.attributes.'aria-pressed' -ne 'true' -or
      $completed.elements.'range-end-day'.attributes.'aria-pressed' -ne 'true' -or
      $completed.elements.'range-selection'.name -ne 'Selected: September 15 through 19, 2026.' -or
      $completed.elements.'range-clear'.visible -ne $true -or $completed.document.activeRef -ne 'range-trigger') { throw 'Date range completion state failed.' }
  if ($focus.document.activeRef -ne 'range-next-day' -or $focus.elements.'range-next-day'.attributes.'aria-pressed' -ne 'true' -or
      $focus.elements.'range-status'.name -ne 'Select the end date.') { throw 'Date range keyboard intermediate state failed.' }
  if ($clear.elements.'range-trigger'.attributes.'aria-expanded' -ne 'true' -or
      $clear.elements.'range-start-day'.attributes.'aria-pressed' -or $clear.elements.'range-end-day'.attributes.'aria-pressed' -or
      $clear.elements.'range-clear'.visible -ne $false -or $clear.elements.'range-selection'.name -ne 'No range selected.' -or
      $clear.document.activeRef -ne 'range-start-day') { throw 'Date range clear and reselection state failed.' }
}

[IO.Directory]::CreateDirectory($output) | Out-Null

$historicalBefore = Get-HistoricalDigests
$compositeBefore = Get-TreeDigest $fixedCompositeOutput $experiment
Assert-FrozenInputs
Assert-SourceContract $sources['single-date'] 'Single date'
Assert-SourceContract $sources['date-range'] 'Date range'

foreach ($item in $sources.GetEnumerator()) {
  $preflight = Join-Path $output "$($item.Key).preflight.json"
  $snapshot = Join-Path $output "$($item.Key).snapshot.json"
  $artifacts = Join-Path $output "$($item.Key)-artifacts"
  Invoke-ReferenceUi @('preflight', $item.Value, '--out', $preflight) "$($item.Key) preflight"
  Invoke-ReferenceUi @('snapshot', $item.Value, '--out', $snapshot, '--artifacts', $artifacts) "$($item.Key) snapshot"
}

Assert-HealthyPreflight (Join-Path $output 'single-date.preflight.json') 'Single date' 12
Assert-HealthyPreflight (Join-Path $output 'date-range.preflight.json') 'Date range' 15
$single = Assert-HealthySnapshot (Join-Path $output 'single-date.snapshot.json') 'Single date' 4
$range = Assert-HealthySnapshot (Join-Path $output 'date-range.snapshot.json') 'Date range' 4
Assert-SingleDateStates $single
Assert-DateRangeStates $range

Assert-FrozenInputs
$historicalAfter = Get-HistoricalDigests
$compositeAfter = Get-TreeDigest $fixedCompositeOutput $experiment
Assert-EqualDigest $historicalBefore $historicalAfter 'Historical evidence'
Assert-EqualDigest $compositeBefore $compositeAfter 'Fixed Composite UI evidence'

$manifest = [ordered]@{
  responsibility = 'human-calibration-phase-1-baseline-evidence'
  status = 'ready-for-human-review'
  phase = 1
  runId = $runId
  browser = $browser
  baseline = @($sources.GetEnumerator() | ForEach-Object {
    [ordered]@{ name = $_.Key; path = Get-RelativePath $_.Value; sha256 = $expectedHashes[$_.Key] }
  })
  origin = @(
    [ordered]@{ name = 'single-date'; path = 'variants/11-composite-granularity/references/date-picker.html'; sha256 = $expectedHashes['origin-single-date'] }
    [ordered]@{ name = 'date-range'; path = 'variants/11-composite-granularity/references/date-range-picker.html'; sha256 = $expectedHashes['origin-date-range'] }
  )
  fixedInputs = [ordered]@{
    acceptedReferenceSha256 = $expectedHashes['accepted-reference']
    cliSha256 = $expectedHashes['cli']
    coreSha256 = $expectedHashes['core']
    fixedCompositeOutput = $compositeAfter
  }
  objectivePreReviewAdjustments = @(
    'Trigger activation now toggles the picker closed as well as open.'
    'Unsupported aria-selected state was removed from native buttons; selected-only aria-pressed state is used.'
    'A fixed Sep 14 today fixture exposes today, selection, and focus as distinct review states.'
  )
  checks = [ordered]@{
    conformanceStates = [ordered]@{ singleDate = 12; dateRange = 15 }
    scenarios = [ordered]@{ singleDate = 4; dateRange = 4 }
    consoleErrors = 0
    externalRequests = 0
    failedRequests = 0
    boundedAccessibilityIssues = 0
    duplicateKeys = 0
    semanticAmbiguities = 0
    excludedHarnessRootsPerState = 1
  }
  reviewStates = [ordered]@{
    singleDate = @('closed', 'opened', 'keyboard focus', 'selected value', 'clear', 'reselection')
    dateRange = @('closed', 'opened', 'range start', 'intermediate selection', 'completion', 'completed value', 'clear', 'reselection')
  }
  scopeBoundary = 'Phase 1 baseline only; no Target transfer, observation classification, canonical decision, or CLI/Core change.'
}
Write-Json (Join-Path $output 'baseline-manifest.json') $manifest

Write-Host "DatePicker human-calibration Phase 1 verification: pass"
Write-Host "Evidence: $output"
