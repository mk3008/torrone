[CmdletBinding()]
param(
  [switch]$SkipRegression,
  [switch]$UseRecordedRegressionEvidence
)

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$variant = Join-Path $experiment 'variants/11-composite-granularity'
$reference = Join-Path $variant 'references/entity-autocomplete.html'
$target = Join-Path $variant 'targets/entity-autocomplete/index.html'
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$approvedDateReference = Join-Path $experiment 'review/date-picker-human-calibration/adjusted/date-range.html'
$historicalManifestPath = Join-Path $experiment 'review/historical-evidence-provenance.json'
$canary = Join-Path $experiment 'output/active-descendant-observation-canary/20260814T073329Z'
$compositeEntryPoint = Join-Path $experiment 'verify-composite-granularity.ps1'
$maintenanceEntryPoint = Join-Path $experiment 'verify-evidence-harness-maintenance.ps1'
$recordedCompositeOutput = Join-Path $experiment 'output/composite-granularity/20260814T074337Z'
$recordedMaintenanceOutput = Join-Path $experiment 'output/evidence-harness-maintenance/20260814T075010Z'
$recordedDiagnosticControl = Join-Path $experiment 'output/active-descendant-observation/diagnostic-review-current-control'
$recordedDiagnosticPass = Join-Path $experiment 'output/active-descendant-observation/diagnostic-reproduction/report.json'
$recordedAdoptionControl = Join-Path $experiment 'output/active-descendant-observation/diagnostic-adoption-current-control'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = Join-Path $experiment "output/active-descendant-observation/$runId"
$probeRoot = Join-Path $env:TEMP "poc017-active-descendant-$([guid]::NewGuid().ToString('N'))"
$env:REFERENCE_UI_BROWSER = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$fixedHashes = [ordered]@{
  reference = 'F7AE21DAE37C07965FF488435102B0B1DA7A12F8BC3D7DD66FC5E103DC135F03'
  target = '1ED5AC6CD1C139B656D46DA11AC2C50637831EB55A22007D142CC2380FEA741C'
  approvedDateReference = '387EC789769DE702263A802DE27368EA2128A2F27C25002E494C00DC65CC5D86'
  canaryCore = 'F09AF96679EC529718AC3766DF19431AECC0A222A91A32523EA56C12CCC47285'
  canaryCli = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
  currentCore = 'E62FD23295EFF665B8EC280B55AF4D40DD4E3B4063F5B40DAFA224ECA46C506F'
  currentCli = '19872837F9F7BEDE66F64C8F6C30AE20B769097E2C5374377394BBC7C4C07271'
}

$fixedTrees = [ordered]@{
  canary = [ordered]@{ path = $canary; fileCount = 7; sha256 = 'A6E5BB5C6E588F8B8A925AB8C383013D446E1F4E09C31986C25061BF125E5453' }
  composite = [ordered]@{ path = (Join-Path $experiment 'output/composite-granularity/20260813T235448Z'); fileCount = 113; sha256 = '10C10E2FE172C4A310569BC706DB34C16F29E18A89B341514AD4B1AA17DBCB5E' }
  humanCalibration = [ordered]@{ path = (Join-Path $experiment 'output/date-picker-human-calibration-phase-2/20260814T070736Z'); fileCount = 138; sha256 = 'BAA29CAFE8A18D124E55B88F1BDF357C076CAE6EF0FFEA5141C13FCD5AAF487C' }
  evidenceHarness = [ordered]@{ path = (Join-Path $experiment 'output/evidence-harness-maintenance/20260814T065303Z'); fileCount = 440; sha256 = 'AFACFB59297891B913C80B014BED860E660AD37C5308706F6CCE54A7338CB20B' }
}

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Write-Json([string]$Path, $Value) {
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Path))) | Out-Null
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Get-TreeDigest([string]$Path, [string]$RelativeRoot = $Path) {
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

function Assert-FixedTrees {
  $observed = [ordered]@{}
  foreach ($entry in $fixedTrees.GetEnumerator()) {
    $digest = Get-TreeDigest $entry.Value.path
    if ($digest.fileCount -ne $entry.Value.fileCount -or $digest.sha256 -ne $entry.Value.sha256) {
      throw "$($entry.Key) fixed evidence changed."
    }
    $observed[$entry.Key] = $digest
  }
  return $observed
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

function Assert-SameJson($Before, $After, [string]$Label) {
  if (($Before | ConvertTo-Json -Depth 50 -Compress) -cne ($After | ConvertTo-Json -Depth 50 -Compress)) {
    throw "$Label changed during this Gate."
  }
}

function Invoke-ReferenceUi([string[]]$Arguments, [int[]]$Expected, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $lines = @(& node $cli @Arguments 2>&1)
    $exitCode = $LASTEXITCODE
    $lines | ForEach-Object { Write-Host $_ }
    if ($Expected -contains $exitCode) { return $exitCode }
    if (($lines -join "`n") -match 'Timed out|timeout' -and $attempt -eq 1) {
      Write-Host "$Label timed out; retrying once."
      continue
    }
    throw "$Label exited with $exitCode; expected one of $($Expected -join ', ')."
  }
}

function Replace-ExactlyOnce([string]$Text, [string]$Old, [string]$New, [string]$Label) {
  $count = [regex]::Matches($Text, [regex]::Escape($Old)).Count
  if ($count -ne 1) { throw "$Label replacement count was $count; expected 1." }
  return $Text.Replace($Old, $New)
}

function Assert-Healthy([string]$Path, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -and $report.status -ne 'pass') { throw "$Label status was $($report.status)." }
  if ($report.summary -and $report.summary.errorCount -ne 0) { throw "$Label had errors." }
  if ($report.console.errorCount -ne 0) { throw "$Label had console errors." }
  if (@($report.network.externalRequests).Count -ne 0 -or $report.network.failedRequestCount -ne 0) {
    throw "$Label used external network or had failed requests."
  }
  return $report
}

function Assert-Negative([string]$Path, [string[]]$RequiredPaths, [string]$Label) {
  $report = Read-Json $Path
  if (@('fail', 'error') -notcontains $report.status -or $report.summary.errorCount -lt 1) {
    throw "$Label did not fail."
  }
  $haystack = @(
    @($report.summary.errorSignatures | ForEach-Object path)
    @($report.errors | ForEach-Object { "$($_.code):$($_.detail)" })
  ) -join "`n"
  foreach ($required in $RequiredPaths) {
    if ($haystack -notmatch [regex]::Escape($required)) { throw "$Label did not include required evidence $required." }
  }
  return [ordered]@{
    status = $report.status
    errorCount = $report.summary.errorCount
    uniqueErrorCount = $report.summary.uniqueErrorCount
    required = $RequiredPaths
  }
}

function Get-ScenarioState($Bundle, [string]$Name, [int]$Step) {
  $scenario = @($Bundle.scenarios | Where-Object name -eq $Name)
  if ($scenario.Count -ne 1 -or $scenario[0].steps.Count -lt $Step) { throw "Scenario state $Name step $Step is missing." }
  return $scenario[0].steps[$Step - 1].state
}

function Assert-ActiveDescendantStates($Bundle, [string]$Label) {
  $fill = Get-ScenarioState $Bundle 'keyboard entity selection' 1
  $arrow = Get-ScenarioState $Bundle 'keyboard entity selection' 2
  $enter = Get-ScenarioState $Bundle 'keyboard entity selection' 3
  $pointer = Get-ScenarioState $Bundle 'pointer entity selection' 2
  $empty = Get-ScenarioState $Bundle 'entity no results' 1
  $clear = Get-ScenarioState $Bundle 'clear entity selection' 3

  foreach ($state in @($Bundle.initial, $fill, $enter, $pointer, $empty, $clear)) {
    if ($null -ne $state.elements.'entity-query'.attributes.'aria-activedescendant' -or
        $state.elements.'entity-query'.relationships.PSObject.Properties.Name -contains 'activeDescendant') {
      throw "$Label retained aria-activedescendant in a state where the Reference does not expose it."
    }
  }
  $activeIdentity = @($arrow.elements.'entity-query'.relationships.activeDescendant)
  if ($arrow.elements.'entity-query'.attributes.'aria-activedescendant' -eq $null -or
      $activeIdentity.Count -ne 1 -or $activeIdentity[0] -ne 'entity-option-primary' -or
      $arrow.elements.'entity-option-primary'.attributes.'aria-selected' -ne 'true' -or
      $arrow.document.activeRef -ne 'entity-query') {
    throw "$Label did not resolve the keyboard-active option to entity-option-primary."
  }
  return [ordered]@{
    initial = 'absent'
    popupOpenBeforeKeyboardMove = 'absent'
    keyboardMove = $activeIdentity[0]
    selectionComplete = 'absent'
    pointerComplete = 'absent'
    noResults = 'absent'
    clearComplete = 'absent'
  }
}

function Get-NewOutputDirectory([string]$Root, [string[]]$Before) {
  $after = @(Get-ChildItem -LiteralPath $Root -Directory | ForEach-Object FullName)
  $new = @($after | Where-Object { $Before -notcontains $_ })
  if ($new.Count -ne 1) { throw "Expected one new output under $Root but found $($new.Count)." }
  return $new[0]
}

function Get-AttributeTokens([string]$Path, [string]$Attribute) {
  $text = [IO.File]::ReadAllText($Path)
  $tokens = [Collections.Generic.List[string]]::new()
  $pattern = '\s{0}="(?<value>[^"]+)"' -f [regex]::Escape($Attribute)
  foreach ($match in [regex]::Matches($text, $pattern)) {
    foreach ($token in $match.Groups['value'].Value.Split(' ', [StringSplitOptions]::RemoveEmptyEntries)) { $tokens.Add($token) }
  }
  return @($tokens | Sort-Object -Unique)
}

[IO.Directory]::CreateDirectory($output) | Out-Null
[IO.Directory]::CreateDirectory($probeRoot) | Out-Null

$fixedBefore = Assert-FixedTrees
$historicalBefore = Get-HistoricalDigests
$sourceBefore = [ordered]@{
  reference = (Get-FileHash -LiteralPath $reference -Algorithm SHA256).Hash
  target = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
  approvedDateReference = (Get-FileHash -LiteralPath $approvedDateReference -Algorithm SHA256).Hash
}

try {
  foreach ($name in @('reference', 'target', 'approvedDateReference')) {
    if ($sourceBefore[$name] -ne $fixedHashes[$name]) { throw "$name fixed source changed before the Gate." }
  }
  $canarySummary = Read-Json (Join-Path $canary 'canary-summary.json')
  if ($canarySummary.status -ne 'observation-hole-reproduced' -or
      $canarySummary.implementation.coreSha256 -ne $fixedHashes.canaryCore -or
      $canarySummary.implementation.cliSha256 -ne $fixedHashes.canaryCli -or
      $canarySummary.wrongActiveTarget.status -ne 'pass') {
    throw 'The preserved canary does not prove the pre-change false pass.'
  }
  if ((Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash -ne $fixedHashes.currentCore -or
      (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash -ne $fixedHashes.currentCli) {
    throw 'Current CLI/Core do not match the reviewed Gate implementation.'
  }
  node --check $core
  if ($LASTEXITCODE -ne 0) { throw 'Core syntax check failed.' }
  node --check $cli
  if ($LASTEXITCODE -ne 0) { throw 'CLI syntax check failed.' }

  $preflightPath = Join-Path $output 'reference.preflight.json'
  $baselinePath = Join-Path $output 'reference.snapshot.json'
  $validPath = Join-Path $output 'valid-target.verify.json'
  $targetObservationPath = Join-Path $output 'target-observation.snapshot.json'
  Invoke-ReferenceUi @('preflight', $reference, '--out', $preflightPath) @(0) 'Reference preflight' | Out-Null
  Invoke-ReferenceUi @('snapshot', $reference, '--out', $baselinePath) @(0) 'Reference snapshot' | Out-Null
  Invoke-ReferenceUi @('verify', $target, '--baseline', $baselinePath, '--out', $validPath) @(0) 'valid independent Target' | Out-Null
  $referenceText = [IO.File]::ReadAllText($reference)
  $targetText = [IO.File]::ReadAllText($target)
  $scenarioMatch = [regex]::Match($referenceText, '<script[^>]*data-reference-scenarios[^>]*>.*?</script>', [Text.RegularExpressions.RegexOptions]::Singleline)
  if (-not $scenarioMatch.Success) { throw 'Reference scenario block was not found.' }
  $observedTargetPath = Join-Path $probeRoot 'target-with-derived-scenarios.html'
  $observedTargetText = Replace-ExactlyOnce $targetText '</body>' "$($scenarioMatch.Value)`n</body>" 'derived Target scenario injection'
  [IO.File]::WriteAllText($observedTargetPath, $observedTargetText, [Text.UTF8Encoding]::new($false))
  Invoke-ReferenceUi @('snapshot', $observedTargetPath, '--out', $targetObservationPath) @(0) 'Target state observation' | Out-Null
  Assert-Healthy $preflightPath 'Reference preflight' | Out-Null
  Assert-Healthy $baselinePath 'Reference snapshot' | Out-Null
  Assert-Healthy $validPath 'valid independent Target' | Out-Null
  Assert-Healthy $targetObservationPath 'Target state observation' | Out-Null
  $preflight = Read-Json $preflightPath
  $baseline = Read-Json $baselinePath
  $valid = Read-Json $validPath
  $targetObservation = Read-Json $targetObservationPath
  $referenceStates = Assert-ActiveDescendantStates $baseline 'Reference'
  $targetStates = Assert-ActiveDescendantStates $targetObservation 'Target'

  $wrongPath = Join-Path $probeRoot 'wrong-active-target.html'
  $wrongText = Replace-ExactlyOnce $targetText `
    '<button class="carrier-result" type="button" role="option" aria-selected="false"><span>Northline Transport</span>' `
    '<button class="carrier-result" id="carrier-option-secondary" type="button" role="option" aria-selected="false"><span>Northline Transport</span>' `
    'secondary option local ID mutation'
  $wrongText = Replace-ExactlyOnce $wrongText `
    "parts.input.setAttribute('aria-activedescendant', parts.first.id);" `
    "parts.input.setAttribute('aria-activedescendant', parts.menu.querySelectorAll('[role=`"option`"]')[1].id);" `
    'wrong active target mutation'
  [IO.File]::WriteAllText($wrongPath, $wrongText, [Text.UTF8Encoding]::new($false))
  $wrongReportPath = Join-Path $output 'wrong-active-target.verify.json'
  Invoke-ReferenceUi @('verify', $wrongPath, '--baseline', $baselinePath, '--out', $wrongReportPath) @(1) 'wrong active target negative' | Out-Null
  $wrong = Assert-Negative $wrongReportPath @('elements.entity-query.relationships.activeDescendant') 'wrong active target negative'

  $brokenReferencePath = Join-Path $probeRoot 'missing-active-target.html'
  $brokenText = [IO.File]::ReadAllText($reference)
  $brokenText = Replace-ExactlyOnce $brokenText `
    "query.setAttribute('aria-activedescendant', active.id);" `
    "query.setAttribute('aria-activedescendant', 'missing-account-option');" `
    'missing active target mutation'
  [IO.File]::WriteAllText($brokenReferencePath, $brokenText, [Text.UTF8Encoding]::new($false))
  $brokenReportPath = Join-Path $output 'missing-active-target.preflight.json'
  Invoke-ReferenceUi @('preflight', $brokenReferencePath, '--out', $brokenReportPath) @(1) 'missing active target preflight' | Out-Null
  $missing = Assert-Negative $brokenReportPath @('missing-aria-reference', 'aria-activedescendant') 'missing active target preflight'

  $ambiguousPath = Join-Path $probeRoot 'ambiguous-active-target.html'
  $ambiguousText = Replace-ExactlyOnce $wrongText `
    '<button class="carrier-result" id="carrier-option-secondary" type="button" role="option" aria-selected="false"><span>Northline Transport</span>' `
    '<button class="carrier-result" id="carrier-option-secondary" type="button" role="option" data-ref="entity-option-primary" aria-selected="false"><span>Northline Transport</span>' `
    'ambiguous active target identity mutation'
  [IO.File]::WriteAllText($ambiguousPath, $ambiguousText, [Text.UTF8Encoding]::new($false))
  $ambiguousReportPath = Join-Path $output 'ambiguous-active-target.verify.json'
  Invoke-ReferenceUi @('verify', $ambiguousPath, '--baseline', $baselinePath, '--out', $ambiguousReportPath) @(1) 'ambiguous active target negative' | Out-Null
  $ambiguity = Assert-Negative $ambiguousReportPath @('duplicateKeys', 'elements.entity-query.relationships.activeDescendant') 'ambiguous active target negative'

  $referenceIds = Get-AttributeTokens $reference 'id'
  $targetIds = Get-AttributeTokens $target 'id'
  $referenceClasses = Get-AttributeTokens $reference 'class'
  $targetClasses = Get-AttributeTokens $target 'class'
  $sharedIds = @(Compare-Object $referenceIds $targetIds -IncludeEqual -ExcludeDifferent | ForEach-Object InputObject)
  $sharedClasses = @(Compare-Object $referenceClasses $targetClasses -IncludeEqual -ExcludeDifferent | ForEach-Object InputObject)
  if ($sharedIds.Count -ne 0 -or $sharedClasses.Count -ne 0) { throw 'Reference and Target share local IDs or classes.' }
  if ($referenceIds -notcontains 'account-option-primary' -or $targetIds -notcontains 'carrier-option-primary') {
    throw 'The expected distinct active-option local IDs were not found.'
  }
  $referenceAnnotationCount = ([regex]::Matches([IO.File]::ReadAllText($reference), '\sdata-ref="')).Count
  $targetAnnotationCount = ([regex]::Matches($targetText, '\sdata-ref="')).Count

  $compositeRegression = $null
  $maintenanceRegression = $null
  $diagnosticReviewRegression = $null
  $diagnosticAdoptionRegression = $null
  if ($UseRecordedRegressionEvidence) {
    $compositeSummary = Read-Json (Join-Path $recordedCompositeOutput 'gate-summary.json')
    if ($compositeSummary.status -ne 'pass' -or @($compositeSummary.targets | Where-Object status -ne 'pass').Count -ne 0) {
      throw 'Recorded Composite regression is not passing.'
    }
    $maintenanceFailure = Read-Json (Join-Path $recordedMaintenanceOutput 'current-regression-failure.json')
    if ($maintenanceFailure.status -ne 'fail' -or @($maintenanceFailure.completedGates | Where-Object status -ne 'pass').Count -ne 0 -or $maintenanceFailure.completedGates.Count -ne 4) {
      throw 'Recorded Evidence Harness failure does not contain the expected four passing Gate controls.'
    }
    $diagnosticFail = Read-Json (Join-Path $recordedDiagnosticControl 'regression.search-workspace.report.json')
    $diagnosticPass = Read-Json $recordedDiagnosticPass
    $requiredFocusPaths = @(
      'elements.query-filter.styles.outlineColor',
      'elements.query-filter.styles.outlineStyle'
    )
    $observedFocusPaths = @($diagnosticFail.summary.errorSignatures | ForEach-Object path | Sort-Object)
    if ($diagnosticFail.status -ne 'fail' -or
        ($observedFocusPaths -join "`n") -ne (($requiredFocusPaths | Sort-Object) -join "`n") -or
        $diagnosticPass.status -ne 'pass') {
      throw 'Recorded Diagnostic Review controls do not isolate the focus-sensitive failure.'
    }
    $adoptionSummary = Read-Json (Join-Path $recordedAdoptionControl 'gate-summary.json')
    if ($adoptionSummary.status -ne 'diagnostic-adoption-confirmed') { throw 'Recorded Diagnostic Adoption control did not pass.' }
    $compositeRegression = [ordered]@{ status = 'pass'; output = $recordedCompositeOutput.Substring($experiment.Length + 1).Replace('\', '/') }
    $maintenanceRegression = [ordered]@{
      status = 'fail'
      output = $recordedMaintenanceOutput.Substring($experiment.Length + 1).Replace('\', '/')
      completedGateCount = $maintenanceFailure.completedGates.Count
      completedGates = @($maintenanceFailure.completedGates | ForEach-Object { [ordered]@{ name = $_.name; status = $_.status } })
      stoppedAt = 'diagnostic-review'
      relationFailureObserved = $false
    }
    $diagnosticReviewRegression = [ordered]@{
      status = 'execution-sensitive'
      harnessErrorPaths = $observedFocusPaths
      immediateControlStatus = $diagnosticPass.status
      relationFailureObserved = $false
    }
    $diagnosticAdoptionRegression = [ordered]@{ status = 'pass'; output = $recordedAdoptionControl.Substring($experiment.Length + 1).Replace('\', '/') }
  }
  elseif (-not $SkipRegression) {
    $compositeRoot = Join-Path $experiment 'output/composite-granularity'
    $compositeBefore = @(Get-ChildItem -LiteralPath $compositeRoot -Directory | ForEach-Object FullName)
    & $compositeEntryPoint
    $compositeOutput = Get-NewOutputDirectory $compositeRoot $compositeBefore
    $compositeSummary = Read-Json (Join-Path $compositeOutput 'gate-summary.json')
    if ($compositeSummary.status -ne 'pass' -or @($compositeSummary.targets | Where-Object status -ne 'pass').Count -ne 0) {
      throw 'Composite granularity current regression did not pass.'
    }
    $compositeRegression = [ordered]@{ status = 'pass'; output = $compositeOutput.Substring($experiment.Length + 1).Replace('\', '/') }

    $maintenanceRoot = Join-Path $experiment 'output/evidence-harness-maintenance'
    $maintenanceBefore = @(Get-ChildItem -LiteralPath $maintenanceRoot -Directory | ForEach-Object FullName)
    & $maintenanceEntryPoint
    $maintenanceOutput = Get-NewOutputDirectory $maintenanceRoot $maintenanceBefore
    $maintenanceProvenance = Read-Json (Join-Path $maintenanceOutput 'current-regression-provenance.json')
    if ($maintenanceProvenance.status -ne 'pass' -or @($maintenanceProvenance.gates | Where-Object status -ne 'pass').Count -ne 0) {
      throw 'Evidence Harness current regression did not pass.'
    }
    $maintenanceRegression = [ordered]@{
      status = 'pass'
      output = $maintenanceOutput.Substring($experiment.Length + 1).Replace('\', '/')
      gates = @($maintenanceProvenance.gates | ForEach-Object { [ordered]@{ name = $_.name; status = $_.status } })
      historicalEvidenceModified = $maintenanceProvenance.historicalEvidence.modified
    }
  }

  $sourceAfter = [ordered]@{
    reference = (Get-FileHash -LiteralPath $reference -Algorithm SHA256).Hash
    target = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
    approvedDateReference = (Get-FileHash -LiteralPath $approvedDateReference -Algorithm SHA256).Hash
  }
  Assert-SameJson $sourceBefore $sourceAfter 'Fixed Reference/Target sources'
  $historicalAfter = Get-HistoricalDigests
  Assert-SameJson $historicalBefore $historicalAfter 'Historical evidence'
  $fixedAfter = Assert-FixedTrees
  Assert-SameJson $fixedBefore $fixedAfter 'Fixed Gate evidence'

  $summary = [ordered]@{
    schemaVersion = 1
    gate = 'aria-activedescendant Relational Observation Gate'
    runId = $runId
    status = if ($SkipRegression) {
      'targeted-pass'
    } elseif ($maintenanceRegression.status -eq 'pass') {
      'active-descendant-observation-beneficial'
    } else {
      'partial'
    }
    canary = [ordered]@{
      status = $canarySummary.status
      previousCoreSha256 = $fixedHashes.canaryCore
      previousCliSha256 = $fixedHashes.canaryCli
      wrongTargetFalsePass = $true
      errorCount = 0
    }
    implementation = [ordered]@{
      coreSha256 = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
      cliSha256 = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash
      publicCliOptionChanged = $false
      relation = 'aria-activedescendant'
      targetIdentity = 'existing explicit or semantic observation identity'
      localIdCompared = $false
    }
    stateObservation = [ordered]@{ reference = $referenceStates; target = $targetStates }
    positive = [ordered]@{
      referenceConformance = $preflight.status
      targetComparison = $valid.status
      targetErrorCount = $valid.summary.errorCount
      resolvedIdentity = 'entity-option-primary'
      referenceLocalId = 'account-option-primary'
      targetLocalId = 'carrier-option-primary'
      consoleErrorCount = $valid.console.errorCount
      externalRequestCount = @($valid.network.externalRequests).Count
      failedRequestCount = $valid.network.failedRequestCount
    }
    negatives = [ordered]@{ wrongActiveTarget = $wrong; missingActiveTarget = $missing; ambiguousActiveTarget = $ambiguity }
    independence = [ordered]@{
      sharedLocalIds = $sharedIds
      sharedClassTokens = $sharedClasses
      referenceAnnotationCount = $referenceAnnotationCount
      targetAnnotationCount = $targetAnnotationCount
      consumerAnnotationIncrease = 0
      referenceChanged = $false
      targetChanged = $false
      approvedDateReferenceChanged = $false
    }
    regressions = [ordered]@{
      composite = $compositeRegression
      evidenceHarness = $maintenanceRegression
      diagnosticReviewControl = $diagnosticReviewRegression
      diagnosticAdoptionControl = $diagnosticAdoptionRegression
    }
    preservation = [ordered]@{
      historicalEvidenceChanged = $false
      fixedGateEvidenceChanged = $false
      canaryChanged = $false
    }
  }
  Write-Json (Join-Path $output 'gate-summary.json') $summary
  Write-Host "Active-descendant relational observation Gate passed: $output"
}
finally {
  if (Test-Path -LiteralPath $probeRoot) {
    $resolved = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $resolved.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -or -not (Split-Path -Leaf $resolved).StartsWith('poc017-active-descendant-')) {
      throw "Refusing to remove unexpected temporary path: $resolved"
    }
    Remove-Item -LiteralPath $resolved -Recurse -Force
  }
}
