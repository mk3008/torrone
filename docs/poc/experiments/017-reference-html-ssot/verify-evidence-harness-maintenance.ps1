[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$historicalManifestPath = Join-Path $experiment 'review/historical-evidence-provenance.json'
$historicalManifestHash = 'D2DDF8102D236DFA588A47EC2196D4FB68C895C1DB9C59AAEC3ADFA098CD47EF'
$corePath = Join-Path $experiment 'core/browser-core.js'
$cliPath = Join-Path $experiment 'cli/reference-ui.mjs'
$reporterPath = Join-Path $experiment 'review/diagnostic-presentation.mjs'
$focusContractPath = Join-Path $experiment 'review/focus-failure-contract.mjs'
$focusContractTests = Join-Path $experiment 'review/focus-failure-contract.test.mjs'
$pwsh = Join-Path $PSHOME 'pwsh.exe'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$outputFamily = Join-Path $experiment 'output/evidence-harness-maintenance'
$runOutput = Join-Path $outputFamily $runId
$logOutput = Join-Path $runOutput 'logs'
$canaryOutput = Join-Path $runOutput 'canary'
$currentCoreHash = (Get-FileHash -LiteralPath $corePath -Algorithm SHA256).Hash
$currentCliHash = (Get-FileHash -LiteralPath $cliPath -Algorithm SHA256).Hash
$manifest = Get-Content -Raw -LiteralPath $historicalManifestPath | ConvertFrom-Json -Depth 100
$gateResults = [Collections.Generic.List[object]]::new()
$temporaryRoots = [Collections.Generic.List[string]]::new()

function Write-Json([string]$Path, $Value) {
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Path))) | Out-Null
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Require-Hash([string]$Path, [string]$Expected, [string]$Label) {
  $actual = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
  if ($actual -ne $Expected) {
    throw "$Label changed. Expected $Expected but found $actual."
  }
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
    sha256 = [Convert]::ToHexString(
      [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n")))
    )
  }
}

function Require-HistoricalEvidence([string]$When) {
  Require-Hash $historicalManifestPath $historicalManifestHash "Historical provenance manifest $When"
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

function Replace-ExactlyOnce([string]$Text, [string]$Old, [string]$New, [string]$Label) {
  $count = [regex]::Matches($Text, [regex]::Escape($Old)).Count
  if ($count -ne 1) { throw "$Label replacement count was $count; expected 1." }
  return $Text.Replace($Old, $New)
}

function Copy-IsolatedExperiment([string]$GateName) {
  $destination = Join-Path $env:TEMP "poc017-maintenance-$GateName-$([guid]::NewGuid().ToString('N'))"
  [IO.Directory]::CreateDirectory($destination) | Out-Null
  $temporaryRoots.Add($destination)
  $sourceRoot = [IO.Path]::GetFullPath($experiment).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $sourcePrefix = "$sourceRoot$([IO.Path]::DirectorySeparatorChar)"
  $currentOutputPrefix = [IO.Path]::GetFullPath($outputFamily).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
  $files = Get-ChildItem -LiteralPath $sourceRoot -File -Recurse -Force | Where-Object {
    $_.FullName -notmatch '[\\/]node_modules[\\/]' -and
    -not $_.FullName.StartsWith($currentOutputPrefix, [StringComparison]::OrdinalIgnoreCase)
  }
  foreach ($file in $files) {
    $relative = $file.FullName.Substring($sourcePrefix.Length)
    $target = Join-Path $destination $relative
    [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($target)) | Out-Null
    Copy-Item -LiteralPath $file.FullName -Destination $target
  }
  return $destination
}

function Remove-IsolatedExperiment([string]$Path) {
  if (-not $Path -or -not (Test-Path -LiteralPath $Path)) { return }
  $resolved = [IO.Path]::GetFullPath($Path)
  $safePrefix = [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
  if (-not $resolved.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -or
      -not (Split-Path -Leaf $resolved).StartsWith('poc017-maintenance-')) {
    throw "Refusing to remove unexpected temporary path: $resolved"
  }
  Remove-Item -LiteralPath $resolved -Recurse -Force
}

function Set-CurrentImplementationHashes([string]$Text, $Historical, [string]$Style, [string]$Label) {
  switch ($Style) {
    'variables' {
      $Text = Replace-ExactlyOnce $Text `
        ('$coreHash = ''' + $Historical.coreSha256 + '''') `
        ('$coreHash = ''' + $currentCoreHash + '''') "$Label Core hash"
      $Text = Replace-ExactlyOnce $Text `
        ('$cliHash = ''' + $Historical.cliSha256 + '''') `
        ('$cliHash = ''' + $currentCliHash + '''') "$Label CLI hash"
    }
    'fixed-map' {
      $Text = Replace-ExactlyOnce $Text `
        ('$core = ''' + $Historical.coreSha256 + '''') `
        ('$core = ''' + $currentCoreHash + '''') "$Label Core hash"
      $Text = Replace-ExactlyOnce $Text `
        ('$cli = ''' + $Historical.cliSha256 + '''') `
        ('$cli = ''' + $currentCliHash + '''') "$Label CLI hash"
    }
    'require-hash' {
      $Text = Replace-ExactlyOnce $Text `
        ("Require-Hash 'core/browser-core.js' '" + $Historical.coreSha256 + "'") `
        ("Require-Hash 'core/browser-core.js' '" + $currentCoreHash + "'") "$Label Core hash"
      $Text = Replace-ExactlyOnce $Text `
        ("Require-Hash 'cli/reference-ui.mjs' '" + $Historical.cliSha256 + "'") `
        ("Require-Hash 'cli/reference-ui.mjs' '" + $currentCliHash + "'") "$Label CLI hash"
    }
    'none' { }
    default { throw "Unknown hash replacement style: $Style" }
  }
  return $Text
}

function Set-DiagnosticFocusContract([string]$Text) {
  $Text = $Text.Replace("`r`n", "`n")
  $toolLine = '$reporterTests = Join-Path $experiment ''review/diagnostic-presentation.test.mjs'''
  $Text = Replace-ExactlyOnce $Text $toolLine ($toolLine + "`n" + '$focusContractTool = Join-Path $experiment ''review/focus-failure-contract.mjs''') 'Focus contract tool'

  $oldRawAssertion = @'
  $errorPaths = @($raw.differences | Where-Object severity -eq 'error' | ForEach-Object {
    $_.path -replace '^initial\.', '' -replace '^scenarios\.[^.]+\.step-\d+\.', ''
  } | Sort-Object -Unique)
  if ($errorPaths.Count -ne 1 -or $errorPaths[0] -ne 'elements.filter-toggle.styles.outlineColor') {
    throw 'Injected focus defect produced an unexpected error signature.'
  }
'@
  $Text = Replace-ExactlyOnce $Text $oldRawAssertion '' 'Historical raw focus-count assertion'

  $oldPresentationAssertion = @'
  if ($presentation.errors.Count -ne 1 -or $presentation.errors[0].normalizedPath -ne 'elements.filter-toggle.styles.outlineColor') {
    throw 'Reviewer presentation did not isolate the injected defect.'
  }
'@
  $newPresentationAssertion = @'
  $failureContractPath = Join-Path $output 'focus-failure-contract.json'
  Invoke-Node @($focusContractTool, $rawReport, '--presentation', (Join-Path $output 'presentations/injected-focus.json'), '--out', $failureContractPath) 0 'Injected focus failure contract'
  $failureContract = Read-Json $failureContractPath
'@
  $Text = Replace-ExactlyOnce $Text $oldPresentationAssertion $newPresentationAssertion 'Reviewer focus-count assertion'
  $Text = Replace-ExactlyOnce $Text `
    '    rawIndexes = $presentation.errors[0].rawDifferenceIndexes' `
    '    rawIndexes = $failureContract.rawErrorIndexes' 'Focus raw-index evidence'
  $Text = Replace-ExactlyOnce $Text `
    '    presentation = $presentationMetric' `
    "    presentation = `$presentationMetric`n    failureContract = `$failureContract" 'Focus contract result'
  return $Text
}

function Invoke-CapturedProcess([string]$FilePath, [string[]]$Arguments, [string]$LogPath) {
  $lines = @(& $FilePath @Arguments 2>&1)
  $exitCode = $LASTEXITCODE
  $lines | ForEach-Object { $_.ToString() } | Set-Content -LiteralPath $LogPath -Encoding utf8
  return [ordered]@{ exitCode = $exitCode; lines = @($lines | ForEach-Object { $_.ToString() }) }
}

function Invoke-Canaries {
  [IO.Directory]::CreateDirectory($canaryOutput) | Out-Null
  $shaCanaries = [Collections.Generic.List[object]]::new()
  foreach ($name in @('relational-reuse', 'partial-reference', 'form-heavy-partial')) {
    $gate = $manifest.gates.$name
    $log = Join-Path $canaryOutput "$name-stale-sha.log"
    $process = Invoke-CapturedProcess $pwsh @('-NoProfile', '-File', (Join-Path $experiment $gate.entryPoint.path)) $log
    $text = $process.lines -join "`n"
    if ($process.exitCode -eq 0 -or $text -notmatch [regex]::Escape($gate.implementation.coreSha256) -or $text -notmatch [regex]::Escape($currentCoreHash)) {
      throw "$name did not reproduce the historical Core-SHA stop."
    }
    $shaCanaries.Add([ordered]@{
      gate = $name
      status = 'reproduced'
      oldEntryPointExit = $process.exitCode
      historicalCoreSha256 = $gate.implementation.coreSha256
      currentCoreSha256 = $currentCoreHash
      log = "canary/$name-stale-sha.log"
    })
  }

  $historicalRawPath = Join-Path $experiment 'output/diagnostic-review/injected-focus.report.json'
  $currentRawPath = Join-Path $experiment 'output/diagnostic-adoption/established-regression/injected-focus.report.json'
  $presentationPath = Join-Path $canaryOutput 'current-focus.presentation.json'
  $presentationMarkdown = Join-Path $canaryOutput 'current-focus.presentation.md'
  $reporter = Invoke-CapturedProcess 'node' @($reporterPath, $currentRawPath, '--out', $presentationPath, '--markdown', $presentationMarkdown) (Join-Path $canaryOutput 'current-focus-presentation.log')
  if ($reporter.exitCode -ne 1) { throw "Focus canary presentation exited with $($reporter.exitCode); expected 1." }
  $contractResultPath = Join-Path $canaryOutput 'current-focus.contract.json'
  $contract = Invoke-CapturedProcess 'node' @($focusContractPath, $currentRawPath, '--presentation', $presentationPath, '--out', $contractResultPath) (Join-Path $canaryOutput 'current-focus-contract.log')
  if ($contract.exitCode -ne 0) { throw 'The bounded focus contract rejected the strengthened current result.' }

  $historicalRaw = Read-Json $historicalRawPath
  $currentRaw = Read-Json $currentRawPath
  $currentPresentation = Read-Json $presentationPath
  $currentPaths = @($currentRaw.differences | Where-Object severity -eq 'error' | ForEach-Object {
    $_.path -replace '^initial\.', '' -replace '^scenarios\.[^.]+\.step-\d+\.', ''
  } | Sort-Object -Unique)
  $oldRawAssertionWouldPass = $currentPaths.Count -eq 1 -and $currentPaths[0] -eq 'elements.filter-toggle.styles.outlineColor'
  $oldPresentationAssertionWouldPass = $currentPresentation.errors.Count -eq 1 -and $currentPresentation.errors[0].normalizedPath -eq 'elements.filter-toggle.styles.outlineColor'
  if ($oldRawAssertionWouldPass -or $oldPresentationAssertionWouldPass) {
    throw 'The saved strengthened focus result did not reproduce the old fixed-count rejection.'
  }

  $fixtureTests = Invoke-CapturedProcess 'node' @('--test', $focusContractTests) (Join-Path $canaryOutput 'focus-contract-tests.log')
  if ($fixtureTests.exitCode -ne 0) { throw 'Focus failure-contract fixture tests failed.' }

  $canary = [ordered]@{
    status = 'pass'
    staleShaStops = $shaCanaries
    focusCount = [ordered]@{
      status = 'reproduced-and-repaired'
      historicalRaw = [ordered]@{
        path = 'output/diagnostic-review/injected-focus.report.json'
        sha256 = (Get-FileHash -LiteralPath $historicalRawPath -Algorithm SHA256).Hash
        errorCount = $historicalRaw.summary.errorCount
      }
      strengthenedSavedRaw = [ordered]@{
        path = 'output/diagnostic-adoption/established-regression/injected-focus.report.json'
        sha256 = (Get-FileHash -LiteralPath $currentRawPath -Algorithm SHA256).Hash
        errorCount = $currentRaw.summary.errorCount
        normalizedErrorPaths = $currentPaths
      }
      oldRawAssertionWouldPass = $oldRawAssertionWouldPass
      oldPresentationAssertionWouldPass = $oldPresentationAssertionWouldPass
      boundedContract = Read-Json $contractResultPath
      fixtureTestCount = 9
      fixtureTestsPassed = 9
    }
  }
  Write-Json (Join-Path $canaryOutput 'canary-summary.json') $canary
  return $canary
}

function Invoke-CurrentGate($Spec) {
  $temporaryRoot = Copy-IsolatedExperiment $Spec.name
  try {
    $scriptPath = Join-Path $temporaryRoot $Spec.script
    $scriptText = Get-Content -Raw -LiteralPath $scriptPath
    $historical = $manifest.gates.$($Spec.name).implementation
    $scriptText = Set-CurrentImplementationHashes $scriptText $historical $Spec.hashStyle $Spec.name
    if ($Spec.focusContract) { $scriptText = Set-DiagnosticFocusContract $scriptText }
    [IO.File]::WriteAllText($scriptPath, $scriptText, [Text.UTF8Encoding]::new($false))
    [ScriptBlock]::Create((Get-Content -Raw -LiteralPath $scriptPath)) | Out-Null

    $logPath = Join-Path $logOutput "$($Spec.name).log"
    $process = Invoke-CapturedProcess $pwsh @('-NoProfile', '-File', $scriptPath) $logPath
    if ($process.exitCode -ne 0) {
      throw "$($Spec.name) current regression failed with exit $($process.exitCode). See $logPath."
    }

    $sourceOutput = Join-Path $temporaryRoot "output/$($Spec.output)"
    if (-not (Test-Path -LiteralPath $sourceOutput -PathType Container)) {
      throw "$($Spec.name) did not produce $sourceOutput."
    }
    $destinationOutput = Join-Path $runOutput $Spec.output
    Copy-Item -LiteralPath $sourceOutput -Destination $destinationOutput -Recurse
    $tree = Get-TreeDigest $destinationOutput
    $reliabilityPath = Join-Path $destinationOutput 'harness-reliability.json'
    $reliability = if (Test-Path -LiteralPath $reliabilityPath) { Read-Json $reliabilityPath } else { $null }
    $transientEntryPointHash = (Get-FileHash -LiteralPath $scriptPath -Algorithm SHA256).Hash
    $result = [ordered]@{
      name = $Spec.name
      status = 'pass'
      historicalEntryPointSha256 = $manifest.gates.$($Spec.name).entryPoint.sha256
      transientEntryPointSha256 = $transientEntryPointHash
      entryPointBytesChanged = $transientEntryPointHash -ne $manifest.gates.$($Spec.name).entryPoint.sha256
      historicalCoreSha256 = $historical.coreSha256
      historicalCliSha256 = $historical.cliSha256
      currentCoreSha256 = $currentCoreHash
      currentCliSha256 = $currentCliHash
      currentImplementationGuardPrepared = $Spec.hashStyle -ne 'none'
      implementationHashValueChanged = $historical.coreSha256 -ne $currentCoreHash -or $historical.cliSha256 -ne $currentCliHash
      focusFailureContractSubstitution = [bool]$Spec.focusContract
      output = $Spec.output
      outputFileCount = $tree.fileCount
      outputSha256 = $tree.sha256
      reliability = $reliability
      log = "logs/$($Spec.name).log"
    }
    $gateResults.Add($result)
    return $result
  }
  finally {
    Remove-IsolatedExperiment $temporaryRoot
  }
}

function Get-BrowserLineage {
  $paths = @(
    'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    'C:\Program Files\Google\Chrome\Application\chrome.exe'
  )
  return @($paths | ForEach-Object {
    if (Test-Path -LiteralPath $_ -PathType Leaf) {
      $item = Get-Item -LiteralPath $_
      [ordered]@{ path = $_; version = $item.VersionInfo.ProductVersion; sha256 = (Get-FileHash -LiteralPath $_ -Algorithm SHA256).Hash }
    }
  })
}

[IO.Directory]::CreateDirectory($logOutput) | Out-Null
[IO.Directory]::CreateDirectory($canaryOutput) | Out-Null

try {
  Require-HistoricalEvidence 'before current regression'
  node --check $cliPath
  if ($LASTEXITCODE -ne 0) { throw 'Current CLI syntax check failed.' }
  node --check $corePath
  if ($LASTEXITCODE -ne 0) { throw 'Current Core syntax check failed.' }
  node --check $focusContractPath
  if ($LASTEXITCODE -ne 0) { throw 'Focus failure-contract syntax check failed.' }

  $canaries = Invoke-Canaries
  $specs = @(
    [pscustomobject]@{ name = 'relational-reuse'; script = 'verify-relational-reuse.ps1'; output = 'relational-reuse'; hashStyle = 'variables'; focusContract = $false },
    [pscustomobject]@{ name = 'partial-reference'; script = 'verify-partial-reference.ps1'; output = 'partial-reference'; hashStyle = 'variables'; focusContract = $false },
    [pscustomobject]@{ name = 'form-heavy-partial'; script = 'verify-form-heavy-partial.ps1'; output = 'form-heavy-partial'; hashStyle = 'variables'; focusContract = $false },
    [pscustomobject]@{ name = 'reference-conformance'; script = 'verify-reference-conformance.ps1'; output = 'reference-conformance'; hashStyle = 'none'; focusContract = $false },
    [pscustomobject]@{ name = 'diagnostic-review'; script = 'verify-diagnostic-review.ps1'; output = 'diagnostic-review'; hashStyle = 'fixed-map'; focusContract = $true },
    [pscustomobject]@{ name = 'diagnostic-adoption'; script = 'verify-diagnostic-adoption.ps1'; output = 'diagnostic-adoption'; hashStyle = 'require-hash'; focusContract = $false }
  )
  foreach ($spec in $specs) {
    Write-Host "Running isolated current regression: $($spec.name)"
    Invoke-CurrentGate $spec | Out-Null
  }

  $derivedOutput = Join-Path $runOutput 'part-to-integrated-reviewer'
  $derivedResults = @(& (Join-Path $experiment 'review/write-part-to-integrated-presentations.ps1') `
    -PartialOutput (Join-Path $runOutput 'partial-reference') `
    -FormOutput (Join-Path $runOutput 'form-heavy-partial') `
    -OutputDirectory $derivedOutput)
  if ($derivedResults.Count -ne 4 -or @($derivedResults | Where-Object status -ne 'written').Count -ne 0) {
    throw 'Fresh part-to-integrated reviewer presentations were not all written.'
  }
  Write-Json (Join-Path $runOutput 'derived-presentation.json') ([ordered]@{
    status = 'pass'
    authority = 'non-authoritative-derived-presentation'
    results = $derivedResults
  })

  Require-HistoricalEvidence 'after current regression'
  $provenance = [ordered]@{
    status = 'pass'
    responsibility = 'fresh-current-regression-evidence'
    runId = $runId
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString('o')
    implementation = [ordered]@{
      core = [ordered]@{ path = 'core/browser-core.js'; sha256 = $currentCoreHash }
      cli = [ordered]@{ path = 'cli/reference-ui.mjs'; sha256 = $currentCliHash }
      maintenanceEntryPoint = [ordered]@{
        path = 'verify-evidence-harness-maintenance.ps1'
        sha256 = (Get-FileHash -LiteralPath $PSCommandPath -Algorithm SHA256).Hash
      }
      focusFailureContract = [ordered]@{
        path = 'review/focus-failure-contract.mjs'
        sha256 = (Get-FileHash -LiteralPath $focusContractPath -Algorithm SHA256).Hash
      }
    }
    historicalEvidence = [ordered]@{
      manifest = 'review/historical-evidence-provenance.json'
      manifestSha256 = $historicalManifestHash
      verifiedBefore = $true
      verifiedAfter = $true
      modified = $false
    }
    canaries = $canaries
    gates = $gateResults
    derivedPresentation = [ordered]@{
      status = 'pass'
      count = $derivedResults.Count
      authority = 'non-authoritative'
      output = 'part-to-integrated-reviewer'
    }
    browserLineage = Get-BrowserLineage
  }
  Write-Json (Join-Path $runOutput 'current-regression-provenance.json') $provenance
  Write-Host "Evidence Harness Maintenance Gate passed: $runOutput"
}
catch {
  Write-Json (Join-Path $runOutput 'current-regression-failure.json') ([ordered]@{
    status = 'fail'
    runId = $runId
    currentCoreSha256 = $currentCoreHash
    currentCliSha256 = $currentCliHash
    completedGates = $gateResults
    error = $_.Exception.Message
  })
  throw
}
finally {
  foreach ($temporaryRoot in @($temporaryRoots)) {
    if (Test-Path -LiteralPath $temporaryRoot) { Remove-IsolatedExperiment $temporaryRoot }
  }
}
