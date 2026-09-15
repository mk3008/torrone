[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$variant = Join-Path $experiment 'variants/11-composite-granularity'
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$historicalManifestPath = Join-Path $experiment 'review/historical-evidence-provenance.json'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$acceptedReferenceHash = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = Join-Path $experiment "output/composite-granularity/$runId"
$probeRoot = Join-Path $env:TEMP "poc017-composite-granularity-$([guid]::NewGuid().ToString('N'))"
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_BROWSER = $browser

$references = [ordered]@{
  'date-picker' = Join-Path $variant 'references/date-picker.html'
  'date-range-picker' = Join-Path $variant 'references/date-range-picker.html'
  'date-picker-family-sheet' = Join-Path $variant 'date-picker-family-sheet.html'
  'entity-autocomplete' = Join-Path $variant 'references/entity-autocomplete.html'
  'entity-dialog-lookup' = Join-Path $variant 'references/entity-dialog-lookup.html'
}
$targets = [ordered]@{
  'date-range-target' = Join-Path $variant 'targets/date-range/index.html'
  'entity-autocomplete-target' = Join-Path $variant 'targets/entity-autocomplete/index.html'
}

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Write-Json([string]$Path, $Value) {
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Path))) | Out-Null
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
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

function Assert-HistoricalDigests($Before, $After) {
  $beforeJson = $Before | ConvertTo-Json -Depth 20 -Compress
  $afterJson = $After | ConvertTo-Json -Depth 20 -Compress
  if ($beforeJson -cne $afterJson) { throw 'Historical PoC 017 evidence changed during this gate.' }
}

function Invoke-ReferenceUi([string[]]$Arguments, [int[]]$Expected, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $lines = @(& node $cli @Arguments 2>&1)
    $exitCode = $LASTEXITCODE
    $lines | ForEach-Object { Write-Host $_ }
    if ($Expected -contains $exitCode) { return $exitCode }
    $timedOut = ($lines -join "`n") -match 'Timed out|timeout'
    if ($timedOut -and $attempt -eq 1) {
      Write-Host "$Label timed out; retrying once."
      continue
    }
    throw "$Label exited with $exitCode; expected one of $($Expected -join ', ')."
  }
}

function Assert-HealthyReport([string]$Path, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -and $report.status -ne 'pass') { throw "$Label status was $($report.status)." }
  if ($report.console.errorCount -ne 0) { throw "$Label had console errors." }
  if (@($report.network.externalRequests).Count -ne 0 -or $report.network.failedRequestCount -ne 0) {
    throw "$Label used external network or had failed requests."
  }
  if ($report.summary -and $report.summary.errorCount -ne 0) { throw "$Label had comparison or conformance errors." }
}

function Assert-OperationCompletions([string]$OutputRoot) {
  $checks = @(
    [ordered]@{ file='date-picker.snapshot.json'; scenario='pointer date selection'; trigger='date-trigger'; region='semantic:controlled-by:date-trigger'; selection='date-selection'; clear='date-clear'; focus='date-trigger' }
    [ordered]@{ file='date-range-picker.snapshot.json'; scenario='pointer range selection'; trigger='range-trigger'; region='semantic:controlled-by:range-trigger'; selection='range-selection'; clear='range-clear'; focus='range-trigger' }
    [ordered]@{ file='entity-autocomplete.snapshot.json'; scenario='keyboard entity selection'; trigger='entity-query'; region='semantic:controlled-by:entity-query'; selection='entity-selection'; clear='entity-clear'; focus='entity-query' }
    [ordered]@{ file='entity-dialog-lookup.snapshot.json'; scenario='keyboard dialog selection'; trigger='lookup-trigger'; region='semantic:controlled-by:lookup-trigger'; selection='lookup-selection'; clear='lookup-clear'; focus='lookup-trigger' }
  )
  foreach ($check in $checks) {
    $bundle = Read-Json (Join-Path $OutputRoot $check.file)
    $scenario = @($bundle.scenarios | Where-Object name -eq $check.scenario)
    if ($scenario.Count -ne 1 -or $scenario[0].steps.Count -lt 1) { throw "$($check.scenario) completion scenario was missing." }
    $state = $scenario[0].steps[-1].state
    if ($state.elements.($check.trigger).attributes.'aria-expanded' -ne 'false' -or
        $state.elements.($check.region).visible -ne $false -or
        $state.elements.($check.selection).visible -ne $true -or
        $state.elements.($check.clear).visible -ne $true -or
        $state.document.activeRef -ne $check.focus) {
      throw "$($check.scenario) did not reach its required completed state."
    }
  }
}

function Assert-NegativeReport([string]$Path, [string]$Label) {
  $report = Read-Json $Path
  if (@('fail', 'error') -notcontains $report.status -or $report.summary.errorCount -lt 1) {
    throw "$Label did not produce an error report."
  }
  return [ordered]@{
    status = $report.status
    errorCount = $report.summary.errorCount
    signatures = if ($report.summary.errorSignatures) { @($report.summary.errorSignatures) } else { @($report.errors.code | Sort-Object -Unique) }
  }
}

function Replace-ExactlyOnce([string]$Text, [string]$Old, [string]$New, [string]$Label) {
  $count = [regex]::Matches($Text, [regex]::Escape($Old)).Count
  if ($count -ne 1) { throw "$Label replacement count was $count; expected 1." }
  return $Text.Replace($Old, $New)
}

function Get-BlockLineCount([string]$Text, [string]$Pattern) {
  $count = 0
  foreach ($match in [regex]::Matches($Text, $Pattern, [Text.RegularExpressions.RegexOptions]::Singleline)) {
    $count += @(($match.Groups['body'].Value -split "`r?`n") | Where-Object { $_.Trim() }).Count
  }
  return $count
}

function Measure-Source([string]$Name, [string]$Path, [string]$SnapshotPath, [string]$PreflightPath) {
  $text = [IO.File]::ReadAllText($Path)
  $scenarioMatch = [regex]::Match($text, '<script[^>]*data-reference-scenarios[^>]*>(?<body>.*?)</script>', [Text.RegularExpressions.RegexOptions]::Singleline)
  $scenarios = @()
  if ($scenarioMatch.Success) { $scenarios = @((ConvertFrom-Json $scenarioMatch.Groups['body'].Value).scenarios) }
  $dataRefs = @([regex]::Matches($text, '\sdata-ref="(?<key>[^"]+)"') | ForEach-Object { $_.Groups['key'].Value })
  $snapshot = if ($SnapshotPath -and (Test-Path -LiteralPath $SnapshotPath)) { Read-Json $SnapshotPath } else { $null }
  $preflight = if ($PreflightPath -and (Test-Path -LiteralPath $PreflightPath)) { Read-Json $PreflightPath } else { $null }
  $elementKeys = if ($snapshot) { @($snapshot.initial.elements.PSObject.Properties.Name) } else { @() }
  return [ordered]@{
    name = $Name
    path = $Path.Substring([IO.Path]::GetFullPath($experiment).Length + 1).Replace('\', '/')
    sourceFiles = 1
    totalLines = @($text -split "`r?`n").Count
    nonblankLines = @(($text -split "`r?`n") | Where-Object { $_.Trim() }).Count
    cssLines = Get-BlockLineCount $text '<style[^>]*>(?<body>.*?)</style>'
    javascriptLines = Get-BlockLineCount $text '<script(?![^>]*type="application/json")[^>]*>(?<body>.*?)</script>'
    scenarioCount = $scenarios.Count
    scenarioActionCount = @($scenarios | ForEach-Object { $_.steps }).Count
    checkedStateCount = if ($preflight) { $preflight.summary.checkedStateCount } else { 0 }
    fixtureItemCount = [regex]::Matches($text, '<button class="(?:day|calendar-day)"').Count + [regex]::Matches($text, 'role="option"').Count
    explicitIdentityCount = @($dataRefs | Sort-Object -Unique).Count
    explicitIdentityOccurrences = $dataRefs.Count
    semanticIdentityCount = @($elementKeys | Where-Object { $_ -like 'semantic:*' }).Count
    observedElementCount = $elementKeys.Count
    harnessRootCount = [regex]::Matches($text, '\sdata-reference-harness=').Count
    scenarioMetadataRootCount = [regex]::Matches($text, '\sdata-reference-scenarios').Count
    validationOnlyAnnotationCount = @($dataRefs | Sort-Object -Unique).Count + [regex]::Matches($text, '\sdata-reference-harness=').Count + [regex]::Matches($text, '\sdata-reference-scenarios').Count
  }
}

function Get-StyleHash([string]$Path) {
  $text = [IO.File]::ReadAllText($Path)
  $style = [regex]::Match($text, '<style[^>]*>(?<body>.*?)</style>', [Text.RegularExpressions.RegexOptions]::Singleline).Groups['body'].Value
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($style)))
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

function Measure-Independence([string]$ReferencePath, [string]$TargetPath, [string[]]$ForbiddenTerms) {
  $referenceClasses = Get-AttributeTokens $ReferencePath 'class'
  $targetClasses = Get-AttributeTokens $TargetPath 'class'
  $referenceIds = Get-AttributeTokens $ReferencePath 'id'
  $targetIds = Get-AttributeTokens $TargetPath 'id'
  $targetText = [IO.File]::ReadAllText($TargetPath)
  $leaks = @($ForbiddenTerms | Where-Object { $targetText.Contains($_, [StringComparison]::OrdinalIgnoreCase) })
  $external = [regex]::Matches($targetText, 'https?://|@import|<link[^>]+rel="stylesheet"', [Text.RegularExpressions.RegexOptions]::IgnoreCase).Count
  if ($leaks.Count -ne 0) { throw "Target leaked Reference terms: $($leaks -join ', ')." }
  if ($external -ne 0) { throw 'Target introduced an external stylesheet or network reference.' }
  if ($targetText -match 'data-reference-harness|data-reference-scenarios') { throw 'Target copied the Reference harness.' }
  $referenceStyleHash = Get-StyleHash $ReferencePath
  $targetStyleHash = Get-StyleHash $TargetPath
  if ($referenceStyleHash -eq $targetStyleHash) { throw 'Target and Reference style sources were identical.' }
  return [ordered]@{
    referenceStyleSha256 = $referenceStyleHash
    targetStyleSha256 = $targetStyleHash
    sharedStylesheetImports = 0
    sharedClassTokens = @(Compare-Object $referenceClasses $targetClasses -IncludeEqual -ExcludeDifferent | ForEach-Object InputObject)
    sharedLocalIds = @(Compare-Object $referenceIds $targetIds -IncludeEqual -ExcludeDifferent | ForEach-Object InputObject)
    leakedReferenceTerms = $leaks
    targetHarnessRoots = 0
    targetHasMainWorkspace = [regex]::IsMatch($targetText, '<main\b')
    referenceHasMainWorkspace = [regex]::IsMatch([IO.File]::ReadAllText($ReferencePath), '<main\b')
  }
}

[IO.Directory]::CreateDirectory($output) | Out-Null
[IO.Directory]::CreateDirectory($probeRoot) | Out-Null

$coreHashBefore = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
$cliHashBefore = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash
$referenceHashBefore = (Get-FileHash -LiteralPath $acceptedReference -Algorithm SHA256).Hash
if ($referenceHashBefore -ne $acceptedReferenceHash) { throw 'Accepted Reference changed before the gate.' }
$historicalBefore = Get-HistoricalDigests

try {
  node --check $cli
  if ($LASTEXITCODE -ne 0) { throw 'CLI syntax check failed.' }
  node --check $core
  if ($LASTEXITCODE -ne 0) { throw 'Core syntax check failed.' }

  foreach ($item in $references.GetEnumerator()) {
    $preflight = Join-Path $output "$($item.Key).preflight.json"
    $snapshot = Join-Path $output "$($item.Key).snapshot.json"
    $artifacts = Join-Path $output "$($item.Key)-artifacts"
    Invoke-ReferenceUi @('preflight', $item.Value, '--out', $preflight) @(0) "$($item.Key) preflight" | Out-Null
    Invoke-ReferenceUi @('snapshot', $item.Value, '--out', $snapshot, '--artifacts', $artifacts) @(0) "$($item.Key) snapshot" | Out-Null
    Assert-HealthyReport $preflight "$($item.Key) preflight"
    Assert-HealthyReport $snapshot "$($item.Key) snapshot"
  }
  Assert-OperationCompletions $output

  $dateTargetReport = Join-Path $output 'date-range-target.verify.json'
  $entityTargetReport = Join-Path $output 'entity-autocomplete-target.verify.json'
  Invoke-ReferenceUi @('verify', $targets['date-range-target'], '--baseline', (Join-Path $output 'date-range-picker.snapshot.json'), '--out', $dateTargetReport, '--artifacts', (Join-Path $output 'date-range-target-artifacts')) @(0) 'date range Target' | Out-Null
  Invoke-ReferenceUi @('verify', $targets['entity-autocomplete-target'], '--baseline', (Join-Path $output 'entity-autocomplete.snapshot.json'), '--out', $entityTargetReport, '--artifacts', (Join-Path $output 'entity-autocomplete-target-artifacts')) @(0) 'entity autocomplete Target' | Out-Null
  Assert-HealthyReport $dateTargetReport 'date range Target'
  Assert-HealthyReport $entityTargetReport 'entity autocomplete Target'

  $familyTargetReport = Join-Path $output 'family-sheet-to-date-range-target.inapplicable.verify.json'
  Invoke-ReferenceUi @('verify', $targets['date-range-target'], '--baseline', (Join-Path $output 'date-picker-family-sheet.snapshot.json'), '--out', $familyTargetReport) @(1) 'family sheet to one-variant Target probe' | Out-Null
  $familyTargetNegative = Assert-NegativeReport $familyTargetReport 'family sheet to one-variant Target probe'

  $dateProbe = Join-Path $probeRoot 'date-range-negative.html'
  $dateText = [IO.File]::ReadAllText($targets['date-range-target'])
  $dateText = Replace-ExactlyOnce $dateText 'ui.clear.hidden = false; dismiss();' 'ui.clear.hidden = false;' 'date completion mutation'
  [IO.File]::WriteAllText($dateProbe, $dateText, [Text.UTF8Encoding]::new($false))
  $dateNegativeReport = Join-Path $output 'date-range-completion-negative.verify.json'
  Invoke-ReferenceUi @('verify', $dateProbe, '--baseline', (Join-Path $output 'date-range-picker.snapshot.json'), '--out', $dateNegativeReport) @(1) 'date completion negative' | Out-Null
  $dateNegative = Assert-NegativeReport $dateNegativeReport 'date completion negative'

  $entityCssProbe = Join-Path $probeRoot 'entity-autocomplete-css-negative.html'
  $entityCssText = [IO.File]::ReadAllText($targets['entity-autocomplete-target'])
  $entityCssText = Replace-ExactlyOnce $entityCssText 'border-radius: 5px; text-align: left;' 'border-radius: 18px; text-align: left;' 'entity option radius mutation'
  [IO.File]::WriteAllText($entityCssProbe, $entityCssText, [Text.UTF8Encoding]::new($false))
  $entityCssNegativeReport = Join-Path $output 'entity-autocomplete-css-negative.verify.json'
  Invoke-ReferenceUi @('verify', $entityCssProbe, '--baseline', (Join-Path $output 'entity-autocomplete.snapshot.json'), '--out', $entityCssNegativeReport) @(1) 'entity CSS negative' | Out-Null
  $entityCssNegative = Assert-NegativeReport $entityCssNegativeReport 'entity CSS negative'

  $entityRelationshipProbe = Join-Path $probeRoot 'entity-dialog-relationship-negative.html'
  $entityRelationshipText = [IO.File]::ReadAllText($references['entity-dialog-lookup'])
  $entityRelationshipText = Replace-ExactlyOnce $entityRelationshipText 'aria-controls="location-dialog"' 'aria-controls="missing-location-dialog"' 'entity dialog relationship mutation'
  [IO.File]::WriteAllText($entityRelationshipProbe, $entityRelationshipText, [Text.UTF8Encoding]::new($false))
  $entityRelationshipReport = Join-Path $output 'entity-dialog-relationship-negative.preflight.json'
  Invoke-ReferenceUi @('preflight', $entityRelationshipProbe, '--out', $entityRelationshipReport) @(1) 'entity relationship negative' | Out-Null
  $entityRelationshipNegative = Assert-NegativeReport $entityRelationshipReport 'entity relationship negative'

  $metrics = [Collections.Generic.List[object]]::new()
  foreach ($item in $references.GetEnumerator()) {
    $metrics.Add((Measure-Source $item.Key $item.Value (Join-Path $output "$($item.Key).snapshot.json") (Join-Path $output "$($item.Key).preflight.json")))
  }
  foreach ($item in $targets.GetEnumerator()) { $metrics.Add((Measure-Source $item.Key $item.Value $null $null)) }

  $dateIndependence = Measure-Independence $references['date-range-picker'] $targets['date-range-target'] @('Reporting period', 'September 2026', 'included in the report')
  $entityIndependence = Measure-Independence $references['entity-autocomplete'] $targets['entity-autocomplete-target'] @('Billing account', 'Harbor Medical Group', 'BA-2048', 'Alpine Service Network', 'Cedar Labs')

  $historicalAfter = Get-HistoricalDigests
  Assert-HistoricalDigests $historicalBefore $historicalAfter
  $coreHashAfter = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
  $cliHashAfter = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash
  $referenceHashAfter = (Get-FileHash -LiteralPath $acceptedReference -Algorithm SHA256).Hash
  if ($coreHashBefore -ne $coreHashAfter -or $cliHashBefore -ne $cliHashAfter) { throw 'CLI/Core changed during the gate.' }
  if ($referenceHashAfter -ne $acceptedReferenceHash) { throw 'Accepted Reference changed during the gate.' }

  $summary = [ordered]@{
    schemaVersion = 1
    gate = 'Composite UI Reference Granularity Gate'
    runId = $runId
    status = 'pass'
    authority = [ordered]@{
      conformance = 'Reference preflight reports only'
      comparison = 'Reference snapshot versus independent Target verify reports only'
      presentation = 'This summary and the gate result document are nonauthoritative'
    }
    implementation = [ordered]@{
      cliSha256 = $cliHashAfter
      coreSha256 = $coreHashAfter
      cliCoreChanged = $false
      acceptedReferenceSha256 = $referenceHashAfter
      acceptedReferenceChanged = $false
      historicalEvidenceChanged = $false
    }
    references = @($references.Keys | ForEach-Object { [ordered]@{ name = $_; preflight = 'pass'; snapshot = 'pass' } })
    targets = @(
      [ordered]@{ name = 'date-range-target'; status = 'pass'; errorCount = 0 }
      [ordered]@{ name = 'entity-autocomplete-target'; status = 'pass'; errorCount = 0 }
    )
    negativeChecks = [ordered]@{
      familySheetAgainstSingleVariantTarget = $familyTargetNegative
      dateCompletion = $dateNegative
      entityCss = $entityCssNegative
      entityRelationshipConformance = $entityRelationshipNegative
    }
    complexity = $metrics
    independence = [ordered]@{
      dateRange = $dateIndependence
      entityAutocomplete = $entityIndependence
    }
    network = [ordered]@{ externalRequestCount = 0; failedRequestCount = 0; consoleErrorCount = 0 }
  }
  Write-Json (Join-Path $output 'gate-summary.json') $summary
  Write-Host "Composite granularity verification passed: $output"
}
finally {
  if (Test-Path -LiteralPath $probeRoot) {
    $resolved = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $resolved.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -or -not (Split-Path -Leaf $resolved).StartsWith('poc017-composite-granularity-')) {
      throw "Refusing to remove unexpected temporary path: $resolved"
    }
    Remove-Item -LiteralPath $resolved -Recurse -Force
  }
}
