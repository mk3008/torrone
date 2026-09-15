param(
  [string]$OutputRoot
)

$ErrorActionPreference = 'Stop'
$experiment = Split-Path -Parent $MyInvocation.MyCommand.Path
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$reference = Join-Path $experiment 'review/date-picker-human-calibration/adjusted/date-range.html'
$historicalTarget = Join-Path $experiment 'variants/11-composite-granularity/targets/date-range/index.html'
$variant = Join-Path $experiment 'variants/12-date-picker-human-approved-transfer'
$target = Join-Path $variant 'target/index.html'
$overrides = Join-Path $variant 'target/scenario-overrides.json'
$relationshipFixtures = Join-Path $variant 'relationship-regression'
$phase1Single = Join-Path $experiment 'review/date-picker-human-calibration/baseline/single-date.html'
$phase1Range = Join-Path $experiment 'review/date-picker-human-calibration/baseline/date-range.html'
$acceptedSingle = Join-Path $experiment 'review/date-picker-human-calibration/adjusted/single-date.html'
$compositeRangeReference = Join-Path $experiment 'variants/11-composite-granularity/references/date-range-picker.html'
$preFollowupReport = Join-Path $experiment 'output/date-picker-human-calibration-phase-2/20260814T062509Z/pre-followup-target.verify.json'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = if ($OutputRoot) { [IO.Path]::GetFullPath($OutputRoot) } else { Join-Path $experiment "output/date-picker-human-calibration-phase-2/$runId" }
$probeRoot = Join-Path $env:TEMP "poc017-date-picker-human-phase2-$runId"

$approvedReferenceHash = '387EC789769DE702263A802DE27368EA2128A2F27C25002E494C00DC65CC5D86'
$historicalTargetHash = '36EBF244C519FA6B932E7E6F9243E3615B5F8581D6B51CE3BD91F1144D683CB7'
$targetHash = '41676A07A5570F862CAAA79F85841A21F4FFC8C4B4F633B2EE624A2E5454B8A3'
$overrideHash = 'EA2926633ACA0F32EB464D585899EB80F32B3757F95A830B88C031B9B0E1E4A4'
$unchangedCliHash = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
$historicalCoreHash = '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8'

function Write-Json([string]$Path, [object]$Value) {
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Invoke-ReferenceUi([string[]]$Arguments, [int[]]$Expected, [string]$Label) {
  & node $cli @Arguments
  $code = $LASTEXITCODE
  if ($Expected -notcontains $code) { throw "$Label exited $code; expected $($Expected -join ', ')." }
  return $code
}

function Read-Report([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Assert-Healthy([string]$Path, [string]$Label) {
  $report = Read-Report $Path
  if ($report.PSObject.Properties.Name -contains 'status' -and $report.status -ne 'pass') { throw "$Label status was $($report.status)." }
  if ($report.console.errorCount -ne 0) { throw "$Label had console errors." }
  if ($report.network.failedRequestCount -ne 0 -or @($report.network.externalRequests).Count -ne 0) { throw "$Label had failed or external requests." }
  $accessibilityIssues = @()
  if ($report.accessibility) { $accessibilityIssues += @($report.accessibility.issues) }
  if ($report.initial.accessibility) { $accessibilityIssues += @($report.initial.accessibility.issues) }
  foreach ($scenario in @($report.scenarios)) {
    foreach ($state in @($scenario.states)) {
      if ($state.accessibility) { $accessibilityIssues += @($state.accessibility.issues) }
    }
  }
  if ($accessibilityIssues.Count -ne 0) { throw "$Label had bounded accessibility issues." }
  return $report
}

function Assert-Negative([string]$Path, [string]$RequiredPath, [string]$Label) {
  $report = Read-Report $Path
  if ($report.status -notin @('fail', 'error') -or $report.summary.errorCount -lt 1) { throw "$Label did not fail closed." }
  $observedPaths = @($report.summary.errorSignatures.path) + @($report.errors.code)
  if ($RequiredPath -and -not $observedPaths.Contains($RequiredPath)) { throw "$Label did not include $RequiredPath." }
  return [ordered]@{ status = $report.status; errorCount = $report.summary.errorCount; uniqueErrorCount = $report.summary.uniqueErrorCount; requiredPath = $RequiredPath }
}

function Get-TreeDigest([string]$Path) {
  $resolved = [IO.Path]::GetFullPath($Path)
  $lines = @(Get-ChildItem -LiteralPath $resolved -Recurse -File | Sort-Object FullName | ForEach-Object {
    $relative = $_.FullName.Substring($resolved.Length).TrimStart('\', '/').Replace('\', '/')
    "$relative`t$((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)"
  })
  $payload = [Text.Encoding]::UTF8.GetBytes(($lines -join "`n"))
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($payload))
}

function Get-Markup([string]$Path) {
  return ([IO.File]::ReadAllText($Path) -split '<script', 2)[0]
}

function Get-AttributeTokens([string]$Markup, [string]$Attribute) {
  $pattern = '\s{0}="(?<value>[^"]+)"' -f [regex]::Escape($Attribute)
  return @([regex]::Matches($Markup, $pattern) | ForEach-Object {
    $_.Groups['value'].Value.Split(' ', [StringSplitOptions]::RemoveEmptyEntries)
  } | Sort-Object -Unique)
}

function Get-StyleHash([string]$Path) {
  $text = [IO.File]::ReadAllText($Path)
  $style = [regex]::Match($text, '(?s)<style>(?<value>.*?)</style>').Groups['value'].Value
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($style)))
}

function Replace-Once([string]$Text, [string]$Before, [string]$After, [string]$Label) {
  $count = ([regex]::Matches($Text, [regex]::Escape($Before))).Count
  if ($count -ne 1) { throw "$Label expected one source occurrence, found $count." }
  return $Text.Replace($Before, $After)
}

$historicalPaths = [ordered]@{
  composite = Join-Path $experiment 'output/composite-granularity/20260813T235448Z'
  phase1 = Join-Path $experiment 'output/date-picker-human-calibration/20260814T060630Z'
  acceptedSingle = Join-Path $experiment 'output/date-picker-human-calibration-adjustment/20260814T060610Z'
  approvedRange = Join-Path $experiment 'output/date-picker-human-calibration-range-adjustment/20260814T061156Z'
}

[IO.Directory]::CreateDirectory($output) | Out-Null
[IO.Directory]::CreateDirectory($probeRoot) | Out-Null
$historicalBefore = [ordered]@{}
foreach ($item in $historicalPaths.GetEnumerator()) { $historicalBefore[$item.Key] = Get-TreeDigest $item.Value }
$referenceHashBefore = (Get-FileHash -LiteralPath $reference -Algorithm SHA256).Hash
$coreHashBefore = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
$cliHashBefore = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash

try {
  if ($referenceHashBefore -ne $approvedReferenceHash) { throw 'The human-approved Date range Reference changed.' }
  if ((Get-FileHash -LiteralPath $historicalTarget -Algorithm SHA256).Hash -ne $historicalTargetHash) { throw 'The historical Composite Target changed.' }
  if ((Get-FileHash -LiteralPath $phase1Single -Algorithm SHA256).Hash -ne '7FB5D151B48FEDC64CF6839EFC5B87C2D4BE0D77B3264F2FE2958CAA65F41E10') { throw 'The Phase 1 Single date baseline changed.' }
  if ((Get-FileHash -LiteralPath $phase1Range -Algorithm SHA256).Hash -ne 'DA068C8BB35EC3B0AF8108DF4EB72A17201886BF56B6CDFCB4B0EA58A18A9C94') { throw 'The Phase 1 Date range baseline changed.' }
  if ((Get-FileHash -LiteralPath $acceptedSingle -Algorithm SHA256).Hash -ne '254E3BA5B2ECD1E2A1677DD5C4FC8FA95224FCB605A74387300E47BFA40102B7') { throw 'The accepted Single date Reference changed.' }
  if ((Get-FileHash -LiteralPath $compositeRangeReference -Algorithm SHA256).Hash -ne '82E6769E5A75ED8E86205164BC857030FB7484D57950DE1558B039095A0EFA64') { throw 'The Composite Date range Reference changed.' }
  if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash -ne $targetHash) { throw 'The Phase 2 Target changed without updating the gate evidence.' }
  if ((Get-FileHash -LiteralPath $overrides -Algorithm SHA256).Hash -ne $overrideHash) { throw 'The scenario override changed without updating the gate evidence.' }
  if ($cliHashBefore -ne $unchangedCliHash) { throw 'The CLI changed unexpectedly.' }
  if ($coreHashBefore -eq $historicalCoreHash) { throw 'The describedBy independence correction is not present.' }
  if (-not (Test-Path -LiteralPath $preFollowupReport)) { throw 'The preserved pre-followup comparison report is missing.' }

  node --check $cli
  if ($LASTEXITCODE -ne 0) { throw 'CLI syntax check failed.' }
  node --check $core
  if ($LASTEXITCODE -ne 0) { throw 'Core syntax check failed.' }

  $preFollowup = Read-Report $preFollowupReport
  if ($preFollowup.status -ne 'fail' -or $preFollowup.summary.errorCount -lt 1) { throw 'The pre-followup report no longer proves a mismatch.' }
  foreach ($required in @('action', 'elements.range-start-input', 'elements.range-end-input', 'elements.range-disabled-day', 'elements.range-close')) {
    if (-not @($preFollowup.summary.errorSignatures.path).Contains($required)) { throw "Pre-followup evidence lacks $required." }
  }

  $referencePreflightPath = Join-Path $output 'human-approved-reference.preflight.json'
  $referenceSnapshotPath = Join-Path $output 'human-approved-reference.snapshot.json'
  $targetReportPath = Join-Path $output 'target-followup.verify.json'
  Invoke-ReferenceUi @('preflight', $reference, '--out', $referencePreflightPath) @(0) 'human-approved Reference Conformance' | Out-Null
  Invoke-ReferenceUi @('snapshot', $reference, '--out', $referenceSnapshotPath, '--artifacts', (Join-Path $output 'human-approved-reference-artifacts')) @(0) 'human-approved Reference snapshot' | Out-Null
  Invoke-ReferenceUi @('verify', $target, '--baseline', $referenceSnapshotPath, '--scenario-overrides', $overrides, '--out', $targetReportPath, '--artifacts', (Join-Path $output 'target-followup-artifacts')) @(0) 'independent Target comparison' | Out-Null
  $referencePreflight = Assert-Healthy $referencePreflightPath 'human-approved Reference Conformance'
  $referenceSnapshot = Assert-Healthy $referenceSnapshotPath 'human-approved Reference snapshot'
  $targetReport = Assert-Healthy $targetReportPath 'independent Target comparison'
  if ($referenceSnapshot.contract.scenarios.Count -ne 22 -or @($referenceSnapshot.contract.scenarios.steps).Count -ne 58) { throw 'The approved interaction contract changed.' }
  if (@($referenceSnapshot.initial.elements.PSObject.Properties).Count -ne 25) { throw 'The approved observation count changed.' }

  $dateRegressionOutput = Join-Path $output 'date-picker-current-regression'
  [IO.Directory]::CreateDirectory($dateRegressionOutput) | Out-Null
  $dateRegression = [ordered]@{}
  foreach ($entry in @(
    [pscustomobject]@{ name = 'phase1-single'; path = $phase1Single },
    [pscustomobject]@{ name = 'phase1-range'; path = $phase1Range },
    [pscustomobject]@{ name = 'accepted-single'; path = $acceptedSingle }
  )) {
    $preflightPath = Join-Path $dateRegressionOutput "$($entry.name).preflight.json"
    $snapshotPath = Join-Path $dateRegressionOutput "$($entry.name).snapshot.json"
    Invoke-ReferenceUi @('preflight', $entry.path, '--out', $preflightPath) @(0) "$($entry.name) current Conformance" | Out-Null
    Invoke-ReferenceUi @('snapshot', $entry.path, '--out', $snapshotPath) @(0) "$($entry.name) current snapshot" | Out-Null
    $preflightReport = Assert-Healthy $preflightPath "$($entry.name) current Conformance"
    $snapshotReport = Assert-Healthy $snapshotPath "$($entry.name) current snapshot"
    $dateRegression[$entry.name] = [ordered]@{
      conformance = $preflightReport.status
      observedElements = @($snapshotReport.initial.elements.PSObject.Properties).Count
      scenarios = $snapshotReport.contract.scenarios.Count
      actions = @($snapshotReport.contract.scenarios.steps).Count
    }
  }
  $compositeSnapshotPath = Join-Path $dateRegressionOutput 'composite-range.snapshot.json'
  $compositeTargetPath = Join-Path $dateRegressionOutput 'composite-range-target.verify.json'
  Invoke-ReferenceUi @('preflight', $compositeRangeReference, '--out', (Join-Path $dateRegressionOutput 'composite-range.preflight.json')) @(0) 'Composite Date range current Conformance' | Out-Null
  Invoke-ReferenceUi @('snapshot', $compositeRangeReference, '--out', $compositeSnapshotPath) @(0) 'Composite Date range current snapshot' | Out-Null
  Invoke-ReferenceUi @('verify', $historicalTarget, '--baseline', $compositeSnapshotPath, '--out', $compositeTargetPath) @(0) 'Composite Date range current Target comparison' | Out-Null
  $compositeTargetReport = Assert-Healthy $compositeTargetPath 'Composite Date range current Target comparison'
  $dateRegression['composite-range-target'] = [ordered]@{ comparison = $compositeTargetReport.status; errorCount = $compositeTargetReport.summary.errorCount }

  $relationshipOutput = Join-Path $output 'relationship-regression'
  [IO.Directory]::CreateDirectory($relationshipOutput) | Out-Null
  $relationshipBaseline = Join-Path $relationshipOutput 'reference.snapshot.json'
  Invoke-ReferenceUi @('snapshot', (Join-Path $relationshipFixtures 'reference.html'), '--out', $relationshipBaseline) @(0) 'describedBy fixture baseline' | Out-Null
  Invoke-ReferenceUi @('verify', (Join-Path $relationshipFixtures 'target.html'), '--baseline', $relationshipBaseline, '--out', (Join-Path $relationshipOutput 'target.verify.json')) @(0) 'different-local-ID describedBy control' | Out-Null
  Invoke-ReferenceUi @('verify', (Join-Path $relationshipFixtures 'hidden-negative.html'), '--baseline', $relationshipBaseline, '--out', (Join-Path $relationshipOutput 'hidden-negative.verify.json')) @(1) 'hidden describedBy negative' | Out-Null
  Invoke-ReferenceUi @('verify', (Join-Path $relationshipFixtures 'missing-negative.html'), '--baseline', $relationshipBaseline, '--out', (Join-Path $relationshipOutput 'missing-negative.verify.json')) @(1) 'missing describedBy comparison negative' | Out-Null
  Invoke-ReferenceUi @('preflight', (Join-Path $relationshipFixtures 'missing-negative.html'), '--out', (Join-Path $relationshipOutput 'missing-negative.preflight.json')) @(1) 'missing describedBy Conformance negative' | Out-Null
  $hiddenRelationshipNegative = Assert-Negative (Join-Path $relationshipOutput 'hidden-negative.verify.json') 'elements.relationship-field.relationships.describedBy' 'hidden describedBy negative'
  $missingRelationshipNegative = Assert-Negative (Join-Path $relationshipOutput 'missing-negative.verify.json') 'elements.relationship-field.relationships.describedBy' 'missing describedBy comparison negative'
  $missingConformanceNegative = Assert-Negative (Join-Path $relationshipOutput 'missing-negative.preflight.json') 'missing-aria-reference' 'missing describedBy Conformance negative'

  $targetText = [IO.File]::ReadAllText($target)
  $styleProbe = Join-Path $probeRoot 'style-negative.html'
  $styleText = Replace-Once $targetText '.date-choice[aria-pressed="true"] { color: #fff; background: var(--brand);' '.date-choice[aria-pressed="true"] { color: #fff; background: #7b2cbf;' 'selected-date style negative'
  [IO.File]::WriteAllText($styleProbe, $styleText, [Text.UTF8Encoding]::new($false))
  $styleReportPath = Join-Path $output 'target-style-negative.verify.json'
  Invoke-ReferenceUi @('verify', $styleProbe, '--baseline', $referenceSnapshotPath, '--scenario-overrides', $overrides, '--out', $styleReportPath) @(1) 'Target style negative' | Out-Null
  $styleNegative = Assert-Negative $styleReportPath 'elements.range-end-day.styles.backgroundColor' 'Target style negative'

  $interactionProbe = Join-Path $probeRoot 'interaction-negative.html'
  $interactionBefore = 'const side = sides[store.owner]; assign(store.owner, iso); side.input.value = iso; markValidity(side, true); toggleClear(side, true); setView(iso); showSelection(); draw(); hideCalendar(side.input);'
  $interactionAfter = 'const side = sides[store.owner]; assign(store.owner, iso); side.input.value = iso; markValidity(side, true); toggleClear(side, true); setView(iso); showSelection(); draw();'
  [IO.File]::WriteAllText($interactionProbe, (Replace-Once $targetText $interactionBefore $interactionAfter 'single-click completion negative'), [Text.UTF8Encoding]::new($false))
  $interactionReportPath = Join-Path $output 'target-interaction-negative.verify.json'
  Invoke-ReferenceUi @('verify', $interactionProbe, '--baseline', $referenceSnapshotPath, '--scenario-overrides', $overrides, '--out', $interactionReportPath) @(1) 'Target interaction negative' | Out-Null
  $interactionNegative = Assert-Negative $interactionReportPath 'document.activeRef' 'Target interaction negative'

  $referenceMarkup = Get-Markup $reference
  $targetMarkup = Get-Markup $target
  $sharedClasses = @(Compare-Object (Get-AttributeTokens $referenceMarkup 'class') (Get-AttributeTokens $targetMarkup 'class') -IncludeEqual -ExcludeDifferent | ForEach-Object InputObject)
  $sharedIds = @(Compare-Object (Get-AttributeTokens $referenceMarkup 'id') (Get-AttributeTokens $targetMarkup 'id') -IncludeEqual -ExcludeDifferent | ForEach-Object InputObject)
  if ($sharedClasses.Count -ne 0 -or $sharedIds.Count -ne 0) { throw 'Target shares a class token or local ID with the Reference.' }
  if ((Get-StyleHash $reference) -eq (Get-StyleHash $target)) { throw 'Target and Reference style sources are identical.' }
  if ($targetText -match 'data-reference-harness|data-reference-scenarios') { throw 'Target copied the Reference harness.' }
  if ([regex]::Matches($targetText, 'https?://|@import|<link[^>]+rel="stylesheet"', 'IgnoreCase').Count -ne 0) { throw 'Target introduced an external reference.' }
  $leakedTerms = @('Transaction date filter', 'Filter recorded transactions by date', 'Start date', 'End date', '2026-08-14', '20260810', '20260812', '20260818') | Where-Object { $targetText.Contains($_, [StringComparison]::OrdinalIgnoreCase) }
  if ($leakedTerms.Count -ne 0) { throw "Target leaked Reference content or fixtures: $($leakedTerms -join ', ')." }
  if ([regex]::Matches($referenceMarkup, 'data-ref="').Count -ne 20 -or [regex]::Matches($targetMarkup, 'data-ref="').Count -ne 20) { throw 'The explicit identity count changed.' }
  if ((Read-Report $targetReportPath).contract.scenarios.Count -ne 22) { throw 'Target did not replay the complete scenario contract.' }
  if ((Get-Content -Raw $overrides | ConvertFrom-Json).overrides.Count -ne 15) { throw 'The fixture override count changed.' }

  $historicalAfter = [ordered]@{}
  foreach ($item in $historicalPaths.GetEnumerator()) {
    $historicalAfter[$item.Key] = Get-TreeDigest $item.Value
    if ($historicalAfter[$item.Key] -ne $historicalBefore[$item.Key]) { throw "Historical evidence changed: $($item.Key)." }
  }
  $referenceHashAfter = (Get-FileHash -LiteralPath $reference -Algorithm SHA256).Hash
  $coreHashAfter = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
  $cliHashAfter = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash
  if ($referenceHashAfter -ne $referenceHashBefore) { throw 'The human-approved Reference changed during verification.' }
  if ($coreHashAfter -ne $coreHashBefore -or $cliHashAfter -ne $cliHashBefore) { throw 'CLI/Core changed during verification.' }

  $summary = [ordered]@{
    schemaVersion = 1
    gate = 'DatePicker Human Calibration Phase 2'
    runId = $runId
    status = 'meets'
    authority = [ordered]@{
      humanApprovedReference = $reference
      humanApprovedReferenceSha256 = $referenceHashAfter
      preFollowupComparison = $preFollowupReport
      comparison = $targetReportPath
      conformance = $referencePreflightPath
    }
    cycle = @('AI draft', 'human correction', 'human-approved Reference SSOT', 'Target difference detection', 'Target follow-up', 'comparative validation')
    preFollowup = [ordered]@{ status = $preFollowup.status; errorCount = $preFollowup.summary.errorCount; uniqueErrorCount = $preFollowup.summary.uniqueErrorCount; diagnosticCount = $preFollowup.summary.diagnosticCount }
    final = [ordered]@{
      referenceConformance = $referencePreflight.status
      referenceObservedElements = @($referenceSnapshot.initial.elements.PSObject.Properties).Count
      scenarios = $referenceSnapshot.contract.scenarios.Count
      actions = @($referenceSnapshot.contract.scenarios.steps).Count
      targetComparison = $targetReport.status
      targetErrorCount = $targetReport.summary.errorCount
      targetDiagnosticCount = $targetReport.summary.diagnosticCount
      consoleErrorCount = $targetReport.console.errorCount
      externalRequestCount = @($targetReport.network.externalRequests).Count
      failedRequestCount = $targetReport.network.failedRequestCount
    }
    independence = [ordered]@{
      referenceStyleSha256 = Get-StyleHash $reference
      targetStyleSha256 = Get-StyleHash $target
      sharedClassTokens = $sharedClasses
      sharedLocalIds = $sharedIds
      targetHarnessRoots = 0
      leakedReferenceTerms = @($leakedTerms)
      fixtureOverrides = 15
    }
    coreChange = [ordered]@{
      cliChanged = $false
      cliSha256 = $cliHashAfter
      coreChangedFromHistoricalGate = $true
      historicalCoreSha256 = $historicalCoreHash
      currentCoreSha256 = $coreHashAfter
      scope = 'Normalize unresolved aria-describedby targets by tag, role, and visibility instead of local ID spelling.'
    }
    negativeChecks = [ordered]@{
      describedByVisibility = $hiddenRelationshipNegative
      describedByMissingComparison = $missingRelationshipNegative
      describedByMissingConformance = $missingConformanceNegative
      selectedDateStyle = $styleNegative
      singleClickCompletion = $interactionNegative
    }
    currentDatePickerRegression = $dateRegression
    preservation = [ordered]@{ humanApprovedReferenceChanged = $false; historicalEvidenceChanged = $false; historicalDigests = $historicalAfter }
  }
  Write-Json (Join-Path $output 'gate-summary.json') $summary
  Write-Host "DatePicker Human Calibration Phase 2 passed: $output"
}
finally {
  if (Test-Path -LiteralPath $probeRoot) {
    $resolved = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $resolved.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -or -not (Split-Path -Leaf $resolved).StartsWith('poc017-date-picker-human-phase2-')) {
      throw "Refusing to remove unexpected temporary path: $resolved"
    }
    Remove-Item -LiteralPath $resolved -Recurse -Force
  }
}
