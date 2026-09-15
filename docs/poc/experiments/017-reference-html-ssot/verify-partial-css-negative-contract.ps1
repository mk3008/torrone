[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$reference = Join-Path $experiment 'variants/04-partial-reference/references/search-workspace.html'
$target = Join-Path $experiment 'variants/04-partial-reference/target/index.html'
$contractTool = Join-Path $experiment 'review/partial-css-failure-contract.mjs'
$contractTests = Join-Path $experiment 'review/partial-css-failure-contract.test.mjs'
$historicalManifest = Join-Path $experiment 'review/historical-evidence-provenance.json'
$historicalReport = Join-Path $experiment 'output/partial-reference/partial-style-negative.report.json'
$fixedMaintenanceRun = Join-Path $experiment 'output/evidence-harness-maintenance/20260813T112543Z'
$savedBaseline = Join-Path $fixedMaintenanceRun 'partial-reference/search-workspace.snapshot.json'
$savedFreshReport = Join-Path $fixedMaintenanceRun 'partial-reference/partial-style-negative.report.json'
$browser = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = Join-Path $experiment "output/partial-css-negative-contract/$runId"
$probeRoot = Join-Path $env:TEMP "poc017-partial-css-contract-$([guid]::NewGuid().ToString('N'))"

$fixedHashes = [ordered]@{
  $reference = '3078962D0880A28658691922D2F6CB6E9E3A9239BCE735994EC71ABABBFD4C3B'
  $target = '4A03A602D11252F1AB0E45094377CB0190D51AD7B88E67F191CA29D9E350E63F'
  $core = '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8'
  $cli = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
  (Join-Path $experiment 'verify-partial-reference.ps1') = 'D68C733C3EFC94A511AA1CB1FF2E9B436FF6662132DA0852FE8C5BD74B677B1A'
  $historicalManifest = 'D2DDF8102D236DFA588A47EC2196D4FB68C895C1DB9C59AAEC3ADFA098CD47EF'
  $historicalReport = 'FFB8B8454D6C43EAE4245348E80A0590AD04B82DACE0EE3CF37D56FC1AA3D9FC'
  $savedBaseline = '4A4634C56DEDF0A045AFEDE8AE6FD93F2EA12B96E56FD2E1DC0C2B8FAF4A95B3'
  $savedFreshReport = '1F2E01861FA2D2D6C43C4363604F362D3E322D2AABC2A9F7A4C220CCA159E53E'
}

$env:REFERENCE_UI_BROWSER = $browser
$script:attempts = 0
$script:timeouts = 0
$script:retries = 0
$script:events = @()

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Write-Json([string]$Path, $Value) {
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Path))) | Out-Null
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Require-Hash([string]$Path, [string]$Expected, [string]$Label) {
  $actual = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
  if ($actual -ne $Expected) { throw "$Label changed. Expected $Expected; found $actual." }
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
    sha256 = [Convert]::ToHexString(
      [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n")))
    )
  }
}

function Require-FixedEvidence([string]$When) {
  foreach ($entry in $fixedHashes.GetEnumerator()) { Require-Hash $entry.Key $entry.Value "$($entry.Key) $When" }
  $manifest = Read-Json $historicalManifest
  foreach ($property in $manifest.gates.PSObject.Properties) {
    $name = $property.Name
    $gate = $property.Value
    Require-Hash (Join-Path $experiment $gate.entryPoint.path) $gate.entryPoint.sha256 "$name entry point $When"
    Require-Hash (Join-Path $experiment $gate.verificationRecord.path) $gate.verificationRecord.sha256 "$name verification record $When"
    $tree = Get-TreeDigest (Join-Path $experiment $gate.output.path) $experiment
    if ($tree.fileCount -ne $gate.output.fileCount -or $tree.sha256 -ne $gate.output.sha256) {
      throw "$name historical output changed $When. Files=$($tree.fileCount), digest=$($tree.sha256)."
    }
  }
}

function Invoke-ReferenceUi([string[]]$Arguments, [int[]]$Expected, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $script:attempts += 1
    $started = Get-Date
    $lines = @(& node $cli @Arguments 2>&1)
    $exitCode = $LASTEXITCODE
    $text = $lines -join "`n"
    $timedOut = $text -match 'Timed out|timeout'
    if ($timedOut) { $script:timeouts += 1 }
    $script:events += [ordered]@{
      label = $Label
      attempt = $attempt
      exitCode = $exitCode
      timedOut = $timedOut
      elapsedMilliseconds = [int]((Get-Date) - $started).TotalMilliseconds
    }
    $lines | ForEach-Object { Write-Host $_ }
    if ($Expected -contains $exitCode) { return $exitCode }
    if ($timedOut -and $attempt -eq 1) { $script:retries += 1; continue }
    throw "$Label exited with $exitCode; expected one of $($Expected -join ', ')."
  }
}

function Normalized-Errors($Report) {
  return @($Report.differences | Where-Object severity -eq 'error' | ForEach-Object {
    [ordered]@{
      path = $_.path
      normalizedPath = $_.path -replace '^initial\.', '' -replace '^scenarios\.[^.]+\.step-\d+\.', ''
      expected = $_.expected
      actual = $_.actual
    }
  })
}

function Summarize-Report([string]$Path) {
  $report = Read-Json $Path
  $errors = Normalized-Errors $report
  return [ordered]@{
    path = $Path.Substring([IO.Path]::GetFullPath($experiment).Length + 1).Replace('\', '/')
    sha256 = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
    status = $report.status
    errorCount = $errors.Count
    signatures = @($errors.normalizedPath | Sort-Object -Unique)
    errors = $errors
    browser = $report.browser
    sourceDigest = $report.actual.digest
    consoleErrorCount = $report.console.errorCount
    externalRequestCount = @($report.network.externalRequests).Count
    failedRequestCount = $report.network.failedRequestCount
  }
}

function Require-Shape($Summary, [string]$Status, [int]$Errors, [string[]]$Signatures, [string]$Label) {
  $actualSignatures = @($Summary.signatures | Sort-Object)
  $expectedSignatures = @($Signatures | Sort-Object)
  if ($Summary.status -ne $Status -or $Summary.errorCount -ne $Errors -or
      (Compare-Object $expectedSignatures $actualSignatures -SyncWindow 0)) {
    throw "$Label changed. Status=$($Summary.status), errors=$($Summary.errorCount), signatures=$($actualSignatures -join ', ')."
  }
}

function Write-Probe([string]$Path, [string]$Original, [bool]$Mutated) {
  $text = $Original
  if ($Mutated) {
    $pattern = '(?s)(\.outline-action\s*\{.*?border-radius:\s*)6px;'
    if ([regex]::Matches($text, $pattern).Count -ne 1) { throw 'Border-radius mutation target is not unique.' }
    $text = [regex]::Replace($text, $pattern, '${1}20px;')
  }
  [IO.File]::WriteAllText($Path, $text, [Text.UTF8Encoding]::new($false))
}

function Invoke-Contract([string[]]$Controls, [string]$Mutation, [string]$Out, [string]$AffectedKeys, [string]$Label) {
  $contractArgs = @()
  foreach ($control in $Controls) { $contractArgs += @('--control', $control) }
  $contractArgs += @('--mutation', $Mutation, '--affected-keys', $AffectedKeys, '--out', $Out)
  $lines = @(& node $contractTool @contractArgs 2>&1)
  $lines | ForEach-Object { Write-Host $_ }
  if ($LASTEXITCODE -ne 0) { throw "$Label contract failed with $LASTEXITCODE." }
  return Read-Json $Out
}

[IO.Directory]::CreateDirectory($output) | Out-Null
[IO.Directory]::CreateDirectory($probeRoot) | Out-Null

try {
  Require-FixedEvidence 'before the audit'
  node --check $cli
  if ($LASTEXITCODE -ne 0) { throw 'CLI syntax check failed.' }
  node --check $core
  if ($LASTEXITCODE -ne 0) { throw 'Core syntax check failed.' }
  node --check $contractTool
  if ($LASTEXITCODE -ne 0) { throw 'Partial CSS contract syntax check failed.' }
  node --test $contractTests
  if ($LASTEXITCODE -ne 0) { throw 'Partial CSS contract fixture tests failed.' }

  $historical = Summarize-Report $historicalReport
  $savedFresh = Summarize-Report $savedFreshReport
  $radiusSignatures = @(
    'elements.clear-action.styles.borderRadius',
    'elements.filter-toggle.styles.borderRadius'
  )
  $focusSignatures = @(
    'elements.query-filter.styles.outlineColor',
    'elements.query-filter.styles.outlineStyle'
  )
  Require-Shape $historical 'fail' 20 $radiusSignatures 'Historical partial CSS negative'
  Require-Shape $savedFresh 'fail' 22 @($radiusSignatures + $focusSignatures) 'Saved fresh partial CSS negative'

  $targetText = Get-Content -Raw -LiteralPath $target
  $affectedKeys = @([regex]::Matches($targetText, '<[^>]+>') | Where-Object {
    $_.Value -match '\bclass="[^"]*\boutline-action\b[^"]*"' -and $_.Value -match '\bdata-ref="[^"]+"'
  } | ForEach-Object {
    [regex]::Match($_.Value, '\bdata-ref="([^"]+)"').Groups[1].Value
  } | Sort-Object -Unique)
  if ($affectedKeys.Count -ne 2 -or (Compare-Object @('clear-action', 'filter-toggle') $affectedKeys -SyncWindow 0)) {
    throw "Unexpected .outline-action affected keys: $($affectedKeys -join ', ')."
  }
  $affectedKeyArgument = $affectedKeys -join ','

  $freshBaseline = Join-Path $output 'fresh-baseline.snapshot.json'
  $freshBaselineRepeat = Join-Path $output 'fresh-baseline.repeat.snapshot.json'
  Push-Location $experiment
  try {
    Invoke-ReferenceUi @('snapshot', $reference, '--out', $freshBaseline) @(0) 'Fresh Reference baseline' | Out-Null
    Invoke-ReferenceUi @('snapshot', $reference, '--out', $freshBaselineRepeat) @(0) 'Fresh Reference baseline repeat' | Out-Null
  }
  finally { Pop-Location }
  $savedState = (Read-Json $savedBaseline).scenarios | Where-Object name -eq 'search empty'
  $freshState = (Read-Json $freshBaseline).scenarios | Where-Object name -eq 'search empty'
  $freshRepeatState = (Read-Json $freshBaselineRepeat).scenarios | Where-Object name -eq 'search empty'
  $savedQuery = $savedState.steps[0].state.elements.'query-filter'
  $freshQuery = $freshState.steps[0].state.elements.'query-filter'
  $freshRepeatQuery = $freshRepeatState.steps[0].state.elements.'query-filter'
  if ($savedState.steps[0].state.document.activeRef -ne 'query-filter' -or
      $freshState.steps[0].state.document.activeRef -ne 'query-filter' -or
      $freshRepeatState.steps[0].state.document.activeRef -ne 'query-filter') {
    throw 'The fill step no longer focuses query-filter.'
  }

  $probe = Join-Path $probeRoot 'index.html'
  $probeHash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
  $reports = [ordered]@{}
  Push-Location $experiment
  try {
    Write-Probe $probe $targetText $false
    $reports.savedControl = Join-Path $output 'saved-baseline.control.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $savedBaseline, '--out', $reports.savedControl) @(0, 1) 'Saved-baseline exact control' | Out-Null
    $reports.savedControlRepeat = Join-Path $output 'saved-baseline.control-repeat.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $savedBaseline, '--out', $reports.savedControlRepeat) @(0, 1) 'Saved-baseline exact control repeat' | Out-Null

    Write-Probe $probe $targetText $true
    $reports.savedMutation = Join-Path $output 'saved-baseline.radius-mutation.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $savedBaseline, '--out', $reports.savedMutation) @(1) 'Saved-baseline radius mutation' | Out-Null

    Write-Probe $probe $targetText $false
    $reports.savedRestore = Join-Path $output 'saved-baseline.restore.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $savedBaseline, '--out', $reports.savedRestore) @(0, 1) 'Saved-baseline restore' | Out-Null
    $reports.savedRestoreRepeat = Join-Path $output 'saved-baseline.restore-repeat.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $savedBaseline, '--out', $reports.savedRestoreRepeat) @(0, 1) 'Saved-baseline restore repeat' | Out-Null

    $reports.freshControl = Join-Path $output 'fresh-baseline.control.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $freshBaseline, '--out', $reports.freshControl) @(0, 1) 'Fresh-baseline exact control' | Out-Null
    $reports.freshControlRepeat = Join-Path $output 'fresh-baseline.control-repeat.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $freshBaseline, '--out', $reports.freshControlRepeat) @(0, 1) 'Fresh-baseline exact control repeat' | Out-Null

    Write-Probe $probe $targetText $true
    $reports.freshMutation = Join-Path $output 'fresh-baseline.radius-mutation.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $freshBaseline, '--out', $reports.freshMutation) @(1) 'Fresh-baseline radius mutation' | Out-Null

    Write-Probe $probe $targetText $false
    $reports.freshRestore = Join-Path $output 'fresh-baseline.restore.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $freshBaseline, '--out', $reports.freshRestore) @(0, 1) 'Fresh-baseline restore' | Out-Null
    $reports.freshRestoreRepeat = Join-Path $output 'fresh-baseline.restore-repeat.report.json'
    Invoke-ReferenceUi @('verify', $probe, '--baseline', $freshBaseline, '--out', $reports.freshRestoreRepeat) @(0, 1) 'Fresh-baseline restore repeat' | Out-Null
  }
  finally { Pop-Location }

  if ((Get-FileHash -LiteralPath $probe -Algorithm SHA256).Hash -ne $probeHash) {
    throw 'Probe source was not restored byte-identically.'
  }

  $summaries = [ordered]@{}
  foreach ($entry in $reports.GetEnumerator()) { $summaries[$entry.Key] = Summarize-Report $entry.Value }
  $controlDigests = @(
    $summaries.savedControl.sourceDigest,
    $summaries.savedControlRepeat.sourceDigest,
    $summaries.savedRestore.sourceDigest,
    $summaries.savedRestoreRepeat.sourceDigest,
    $summaries.freshControl.sourceDigest,
    $summaries.freshControlRepeat.sourceDigest,
    $summaries.freshRestore.sourceDigest,
    $summaries.freshRestoreRepeat.sourceDigest
  ) | Sort-Object -Unique
  $mutationDigests = @($summaries.savedMutation.sourceDigest, $summaries.freshMutation.sourceDigest) | Sort-Object -Unique
  if ($controlDigests.Count -ne 1) { throw 'Exact control reports do not describe the same restored source.' }
  if ($mutationDigests.Count -ne 1 -or $mutationDigests[0] -eq $controlDigests[0]) {
    throw 'Mutation reports do not describe one distinct mutated source.'
  }

  $allExactControls = @(
    $reports.savedControl,
    $reports.savedControlRepeat,
    $reports.savedRestore,
    $reports.savedRestoreRepeat,
    $reports.freshControl,
    $reports.freshControlRepeat,
    $reports.freshRestore,
    $reports.freshRestoreRepeat
  )
  $savedContract = Invoke-Contract $allExactControls $reports.savedMutation (Join-Path $output 'saved-baseline.contract.json') $affectedKeyArgument 'Saved-baseline'
  $freshContract = Invoke-Contract $allExactControls $reports.freshMutation (Join-Path $output 'fresh-baseline.contract.json') $affectedKeyArgument 'Fresh-baseline'

  foreach ($summary in $summaries.Values) {
    if ($summary.consoleErrorCount -ne 0 -or $summary.externalRequestCount -ne 0 -or $summary.failedRequestCount -ne 0) {
      throw "Unhealthy browser report: $($summary.path)"
    }
  }

  $browserItem = Get-Item -LiteralPath $browser
  $baselineComparison = [ordered]@{
    saved = [ordered]@{
      path = 'output/evidence-harness-maintenance/20260813T112543Z/partial-reference/search-workspace.snapshot.json'
      sha256 = (Get-FileHash -LiteralPath $savedBaseline -Algorithm SHA256).Hash
      browser = (Read-Json $savedBaseline).browser
      activeRef = $savedState.steps[0].state.document.activeRef
      outlineColor = $savedQuery.styles.outlineColor
      outlineStyle = $savedQuery.styles.outlineStyle
    }
    fresh = [ordered]@{
      path = "output/partial-css-negative-contract/$runId/fresh-baseline.snapshot.json"
      sha256 = (Get-FileHash -LiteralPath $freshBaseline -Algorithm SHA256).Hash
      browser = (Read-Json $freshBaseline).browser
      activeRef = $freshState.steps[0].state.document.activeRef
      outlineColor = $freshQuery.styles.outlineColor
      outlineStyle = $freshQuery.styles.outlineStyle
    }
    freshRepeat = [ordered]@{
      path = "output/partial-css-negative-contract/$runId/fresh-baseline.repeat.snapshot.json"
      sha256 = (Get-FileHash -LiteralPath $freshBaselineRepeat -Algorithm SHA256).Hash
      browser = (Read-Json $freshBaselineRepeat).browser
      activeRef = $freshRepeatState.steps[0].state.document.activeRef
      outlineColor = $freshRepeatQuery.styles.outlineColor
      outlineStyle = $freshRepeatQuery.styles.outlineStyle
    }
  }
  $focusVariants = @(
    "$($savedQuery.styles.outlineColor)|$($savedQuery.styles.outlineStyle)",
    "$($freshQuery.styles.outlineColor)|$($freshQuery.styles.outlineStyle)",
    "$($freshRepeatQuery.styles.outlineColor)|$($freshRepeatQuery.styles.outlineStyle)"
  ) | Sort-Object -Unique

  Write-Json (Join-Path $output 'audit-matrix.json') ([ordered]@{
    status = 'pass'
    attainment = 'historical-drift-confirmed'
    classification = 'C-harness-baseline-browser-condition'
    mutationCausalForAddedFocusSignatures = $false
    historical = $historical
    savedFresh = $savedFresh
    baselineComparison = $baselineComparison
    focusObservationVariantCount = $focusVariants.Count
    affectedElementKeys = $affectedKeys
    probes = $summaries
    contracts = [ordered]@{ savedBaseline = $savedContract; freshBaseline = $freshContract }
  })
  Write-Json (Join-Path $output 'harness-reliability.json') ([ordered]@{
    browserExecutable = $browser
    browserVersion = $browserItem.VersionInfo.ProductVersion
    browserSha256 = (Get-FileHash -LiteralPath $browser -Algorithm SHA256).Hash
    attempts = $script:attempts
    timeouts = $script:timeouts
    retries = $script:retries
    events = $script:events
  })

  Require-FixedEvidence 'after the audit'
  Write-Json (Join-Path $output 'gate-summary.json') ([ordered]@{
    status = 'pass'
    attainment = 'historical-drift-confirmed'
    cause = 'The two focus-style errors reproduce in an unmutated exact control against the saved focus-visible baseline and disappear from a fresh same-root control/mutation pair.'
    contractDecision = 'Exclude the focus signatures from the radius mutation contract; retain them in raw evidence as control/execution-condition observations.'
    historicalEvidenceChanged = $false
    canonicalSourceChanged = $false
    cliCoreChanged = $false
    comparisonSemanticsChanged = $false
    toleranceChanged = $false
    temporaryProbeRestored = $true
    attempts = $script:attempts
    timeouts = $script:timeouts
    retries = $script:retries
    currentCoreSha256 = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
    currentCliSha256 = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash
    entryPointSha256 = (Get-FileHash -LiteralPath $PSCommandPath -Algorithm SHA256).Hash
    contractToolSha256 = (Get-FileHash -LiteralPath $contractTool -Algorithm SHA256).Hash
  })
  Write-Host "Partial CSS Negative Contract Audit passed: $output"
}
finally {
  if (Test-Path -LiteralPath $probeRoot) {
    $resolved = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $resolved.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -or
        -not (Split-Path -Leaf $resolved).StartsWith('poc017-partial-css-contract-')) {
      throw "Refusing to remove unexpected probe directory: $resolved"
    }
    Remove-Item -LiteralPath $resolved -Recurse -Force
  }
}
