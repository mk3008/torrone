$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$semanticReference = Join-Path $experiment 'iterations/01-semantic-only/reference.html'
$mixedReference = Join-Path $experiment 'variants/02-mixed-semantic/reference/index.html'
$relationalReference = Join-Path $experiment 'variants/03-relational-reuse/reference/index.html'
$commonShell = Join-Path $experiment 'variants/04-partial-reference/references/common-shell.html'
$searchWorkspace = Join-Path $experiment 'variants/04-partial-reference/references/search-workspace.html'
$formReference = Join-Path $experiment 'variants/05-form-heavy-partial/reference/form-workflow.html'
$formTarget = Join-Path $experiment 'variants/05-form-heavy-partial/target/index.html'
$formOverrides = Join-Path $experiment 'variants/05-form-heavy-partial/target/scenario-overrides.json'
$validFixture = Join-Path $experiment 'variants/06-reference-conformance/valid.html'
$output = Join-Path $experiment 'output/reference-conformance'
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$acceptedReferenceHash = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
$formReferenceHash = 'A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4'
$formTargetHash = '84DBFB367754C963A8897C64B84B887B61CF30D257EC7A1A3D791253529FE048'
$commonShellHash = '08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527'
$fixedFormPacketDigest = 'E3DDFE25D0855B6ADE922DC0625F6DA7A6BFFF66444234FA9491F4AA201F5D91'

$env:REFERENCE_UI_BROWSER = $browser
$script:harnessAttempts = 0
$script:harnessTimeouts = 0
$script:harnessRetries = 0
$script:harnessEvents = @()

function Require-Exit([int]$Expected, [string]$Label) {
  if ($LASTEXITCODE -ne $Expected) { throw "$Label exited with $LASTEXITCODE; expected $Expected." }
}

function Require-Hash([string]$Path, [string]$Expected, [string]$Label) {
  $actual = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
  if ($actual -ne $Expected) { throw "$Label changed. Expected $Expected but found $actual." }
}

function Get-PacketDigest($Files) {
  $root = [IO.Path]::GetFullPath($experiment).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $lines = @($Files | Sort-Object FullName -Unique | ForEach-Object {
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    $hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
    "$relative=$hash"
  })
  return [Convert]::ToHexString(
    [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n")))
  )
}

function Get-FixedFormPacketDigest() {
  $files = @()
  $files += Get-ChildItem -File -Recurse (Join-Path $experiment 'variants/05-form-heavy-partial')
  $files += Get-ChildItem -File -Recurse (Join-Path $experiment 'output/form-heavy-partial')
  $files += Get-Item @(
    (Join-Path $experiment 'form-partial-plan.md'),
    (Join-Path $experiment 'form-partial-cost-record.md'),
    (Join-Path $experiment 'form-partial-result.md'),
    (Join-Path $experiment 'form-partial-screen-review.md'),
    (Join-Path $experiment 'form-partial-self-review.md'),
    (Join-Path $experiment 'form-partial-verification-record.md'),
    (Join-Path $experiment 'verify-form-heavy-partial.ps1')
  )
  return [ordered]@{ fileCount = @($files).Count; digest = Get-PacketDigest $files }
}

function Require-FixedEvidence([string]$When) {
  Require-Hash $acceptedReference $acceptedReferenceHash "Accepted Reference $When"
  Require-Hash $formReference $formReferenceHash "Form Reference $When"
  Require-Hash $formTarget $formTargetHash "Form Target $When"
  Require-Hash $commonShell $commonShellHash "Common-shell Reference $When"
  $packet = Get-FixedFormPacketDigest
  if ($packet.fileCount -ne 98 -or $packet.digest -ne $fixedFormPacketDigest) {
    throw "Fixed form-heavy packet changed $When. Files=$($packet.fileCount), digest=$($packet.digest)."
  }
}

function Invoke-ReferenceUi([string[]]$CliArguments, [int]$Expected, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $script:harnessAttempts += 1
    $started = Get-Date
    $lines = @(& node $cli @CliArguments 2>&1)
    $exitCode = $LASTEXITCODE
    $text = $lines -join "`n"
    $timedOut = $text -match 'Timed out waiting'
    if ($timedOut) { $script:harnessTimeouts += 1 }
    $script:harnessEvents += [ordered]@{
      label = $Label
      attempt = $attempt
      exitCode = $exitCode
      timedOut = $timedOut
      elapsedMilliseconds = [int]((Get-Date) - $started).TotalMilliseconds
    }
    $lines | ForEach-Object { Write-Host $_ }
    if ($exitCode -eq $Expected) { return }
    if ($timedOut -and $attempt -eq 1) {
      $script:harnessRetries += 1
      continue
    }
    throw "$Label exited with $exitCode; expected $Expected."
  }
}

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Require-PreflightPass([string]$Path, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0 -or $report.summary.warningCount -ne 0) {
    throw "$Label did not produce a zero-error, zero-warning preflight pass."
  }
  if ($report.responsibility -ne 'reference-library-only') { throw "$Label has the wrong responsibility boundary." }
}

function Require-PreflightError([string]$Path, [string[]]$Codes, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -ne 'error' -or $report.summary.errorCount -lt 1) { throw "$Label did not fail preflight." }
  $actual = @($report.errors.code | Sort-Object -Unique)
  foreach ($code in $Codes) {
    if ($actual -notcontains $code) { throw "$Label did not report $code. Actual: $($actual -join ', ')." }
  }
}

function Replace-ExactlyOnce([string]$Path, [string]$Before, [string]$After, [string]$Label) {
  $text = Get-Content -Raw -LiteralPath $Path
  if ([regex]::Matches($text, [regex]::Escape($Before)).Count -ne 1) { throw "$Label mutation source is not unique." }
  [IO.File]::WriteAllText($Path, $text.Replace($Before, $After), [Text.Encoding]::UTF8)
}

function Invoke-ReversiblePreflightProbe(
  [string]$ProbeRoot,
  [string]$Name,
  [string]$Before,
  [string]$After,
  [string[]]$ExpectedCodes
) {
  $probe = Join-Path $ProbeRoot "$Name.html"
  Copy-Item -LiteralPath $validFixture -Destination $probe
  $beforeReport = Join-Path $output "$Name.before.json"
  $brokenReport = Join-Path $output "$Name.error.json"
  $restoredReport = Join-Path $output "$Name.restored.json"
  Invoke-ReferenceUi @('preflight', $probe, '--out', $beforeReport) 0 "$Name before"
  Replace-ExactlyOnce $probe $Before $After $Name
  Invoke-ReferenceUi @('preflight', $probe, '--out', $brokenReport) 1 "$Name broken"
  Require-PreflightError $brokenReport $ExpectedCodes $Name
  Copy-Item -LiteralPath $validFixture -Destination $probe -Force
  Invoke-ReferenceUi @('preflight', $probe, '--out', $restoredReport) 0 "$Name restored"
  Require-PreflightPass $restoredReport "$Name restored"
  if ((Get-FileHash -LiteralPath $beforeReport -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath $restoredReport -Algorithm SHA256).Hash) {
    throw "$Name restored report is not byte-identical to its initial report."
  }
}

function Invoke-FormCanary([string]$ProbeRoot) {
  $referenceProbe = Join-Path $ProbeRoot 'form-canary-reference.html'
  $targetProbe = Join-Path $ProbeRoot 'form-canary-target.html'
  Copy-Item -LiteralPath $formReference -Destination $referenceProbe
  Copy-Item -LiteralPath $formTarget -Destination $targetProbe
  Replace-ExactlyOnce $referenceProbe "field.setAttribute('aria-invalid', 'true');" "field.toggleAttribute('aria-invalid', invalid);" 'Form Reference canary'
  Replace-ExactlyOnce $targetProbe "control.setAttribute('aria-invalid', 'true');" "control.toggleAttribute('aria-invalid', invalid);" 'Form Target canary'

  $baseline = Join-Path $output 'form-canary-broken.snapshot.json'
  $comparison = Join-Path $output 'form-canary-broken-comparison.report.json'
  $preflight = Join-Path $output 'form-canary-broken.preflight.json'
  $restored = Join-Path $output 'form-canary-restored.preflight.json'
  Invoke-ReferenceUi @('snapshot', $referenceProbe, '--out', $baseline) 0 'Form canary broken Reference snapshot'
  Invoke-ReferenceUi @('verify', $targetProbe, '--baseline', $baseline, '--scenario-overrides', $formOverrides, '--out', $comparison) 0 'Form canary broken comparative check'
  Invoke-ReferenceUi @('preflight', $referenceProbe, '--out', $preflight) 1 'Form canary broken Reference preflight'
  Require-PreflightError $preflight @('contradictory-aria-invalid-state') 'Form canary'
  $comparisonReport = Read-Json $comparison
  if ($comparisonReport.status -ne 'pass' -or $comparisonReport.summary.errorCount -ne 0) {
    throw 'The reproduced same-defect Reference and Target no longer pass comparative validation.'
  }
  Copy-Item -LiteralPath $formReference -Destination $referenceProbe -Force
  Invoke-ReferenceUi @('preflight', $referenceProbe, '--out', $restored) 0 'Form canary restored Reference preflight'
  Require-PreflightPass $restored 'Form canary restored Reference'
}

function Invoke-CssNegative([string]$ProbeRoot, [string]$Baseline) {
  $probe = Join-Path $ProbeRoot 'style-negative.html'
  Copy-Item -LiteralPath $validFixture -Destination $probe
  Replace-ExactlyOnce $probe '</style>' "[data-ref='lookup-action'] { border-radius: 9px !important; }`n  </style>" 'CSS negative'
  $reportPath = Join-Path $output 'style-negative.report.json'
  Invoke-ReferenceUi @('verify', $probe, '--baseline', $Baseline, '--out', $reportPath) 1 'CSS negative comparison'
  $report = Read-Json $reportPath
  if ($report.status -ne 'fail' -or @($report.summary.errorSignatures.path) -notcontains 'elements.lookup-action.styles.borderRadius') {
    throw 'CSS negative did not expose lookup-action borderRadius.'
  }
}

Push-Location $experiment
$probeRoot = Join-Path $env:TEMP "poc017-reference-conformance-$([guid]::NewGuid().ToString('N'))"
try {
  Require-FixedEvidence 'before the Gate'
  node --check $cli
  Require-Exit 0 'CLI syntax check'
  node --check $core
  Require-Exit 0 'Core syntax check'

  New-Item -ItemType Directory -Path $output -Force | Out-Null
  New-Item -ItemType Directory -Path $probeRoot | Out-Null

  $positives = [ordered]@{
    'accepted-reference' = $acceptedReference
    'semantic-only-reference' = $semanticReference
    'mixed-reference' = $mixedReference
    'relational-reference' = $relationalReference
    'common-shell-reference' = $commonShell
    'search-workspace-reference' = $searchWorkspace
    'form-reference' = $formReference
    'valid-fixture' = $validFixture
  }
  foreach ($entry in $positives.GetEnumerator()) {
    $reportPath = Join-Path $output "$($entry.Key).preflight.json"
    Invoke-ReferenceUi @('preflight', $entry.Value, '--out', $reportPath) 0 "$($entry.Key) positive preflight"
    Require-PreflightPass $reportPath $entry.Key
  }

  Invoke-ReferenceUi @('preflight', $validFixture, '--out', (Join-Path $output 'valid-fixture.repeat.preflight.json')) 0 'Valid fixture repeat preflight'
  if ((Get-FileHash (Join-Path $output 'valid-fixture.preflight.json') -Algorithm SHA256).Hash -ne (Get-FileHash (Join-Path $output 'valid-fixture.repeat.preflight.json') -Algorithm SHA256).Hash) {
    throw 'Repeated valid preflight is not byte-identical.'
  }

  Invoke-ReversiblePreflightProbe $probeRoot 'missing-aria-reference' 'aria-describedby="query-help"' 'aria-describedby="missing-help"' @('missing-aria-reference')
  Invoke-ReversiblePreflightProbe $probeRoot 'aria-reference-enters-harness' 'aria-describedby="query-help"' 'aria-describedby="reference-control"' @('aria-reference-enters-harness')
  Invoke-ReversiblePreflightProbe $probeRoot 'invalid-label-target' 'for="reference-query"' 'for="missing-query"' @('invalid-label-for-target')
  Invoke-ReversiblePreflightProbe $probeRoot 'key-inside-harness' 'data-reference-state="ready"' 'data-reference-state="ready" data-ref="harness-control"' @('observation-key-inside-harness')
  Invoke-ReversiblePreflightProbe $probeRoot 'unsupported-invalid-token' 'aria-invalid=""' 'aria-invalid="pending"' @('unsupported-aria-invalid-token')
  Invoke-ReversiblePreflightProbe $probeRoot 'duplicate-stable-identity' 'data-ref="lookup-form"' 'data-ref="query-field"' @('duplicate-stable-identity')
  Invoke-ReversiblePreflightProbe $probeRoot 'console-error' '<script>' "<script>`n    console.error('intentional conformance probe');" @('console-error')
  Invoke-ReversiblePreflightProbe $probeRoot 'scenario-action-error' '"target": "lookup-action"' '"target": "missing-action"' @('scenario-action-error')
  Invoke-ReversiblePreflightProbe $probeRoot 'external-network' '</main>' '</main><img alt="" src="http://127.0.0.1:9/conformance-probe">' @('external-network-request')

  $semanticAmbiguityReport = Join-Path $output 'semantic-ambiguity-probe.preflight.json'
  Invoke-ReferenceUi @('preflight', 'variants/02-mixed-semantic/semantic-ambiguity-probe.html', '--out', $semanticAmbiguityReport) 1 'Existing semantic ambiguity probe'
  Require-PreflightError $semanticAmbiguityReport @('ambiguous-semantic-identity') 'Existing semantic ambiguity probe'
  $relationalAmbiguityReport = Join-Path $output 'relational-ambiguity-probe.preflight.json'
  Invoke-ReferenceUi @('preflight', 'variants/03-relational-reuse/relational-ambiguity-probe.html', '--out', $relationalAmbiguityReport) 1 'Existing relational ambiguity probe'
  Require-PreflightError $relationalAmbiguityReport @('ambiguous-semantic-identity') 'Existing relational ambiguity probe'
  $missingH1Report = Join-Path $output 'whole-page-missing-h1.preflight.json'
  Invoke-ReferenceUi @('preflight', 'variants/04-partial-reference/probes/whole-page-missing-h1.html', '--out', $missingH1Report) 1 'Existing missing-h1 probe'
  Require-PreflightError $missingH1Report @('unexpected-h1-count') 'Existing missing-h1 probe'

  Invoke-FormCanary $probeRoot

  $validBaseline = Join-Path $output 'valid-fixture.snapshot.json'
  Invoke-ReferenceUi @('snapshot', $validFixture, '--out', $validBaseline, '--artifacts', (Join-Path $output 'valid-fixture-screen')) 0 'Valid fixture comparative baseline'
  Invoke-CssNegative $probeRoot $validBaseline

  $formBaseline = Join-Path $output 'form-reference.snapshot.json'
  Invoke-ReferenceUi @('snapshot', $formReference, '--out', $formBaseline) 0 'Form Reference comparative regression'
  Invoke-ReferenceUi @('verify', $formTarget, '--baseline', $formBaseline, '--scenario-overrides', $formOverrides, '--out', (Join-Path $output 'form-target.report.json')) 0 'Form Target comparative regression'
  Invoke-ReferenceUi @('snapshot', $acceptedReference, '--out', (Join-Path $output 'accepted-reference.snapshot.json')) 0 'Accepted Reference snapshot regression'
  Invoke-ReferenceUi @('verify', 'consumers/negative/index.html', '--root', 'consumers', '--baseline', 'output/reference.snapshot.json', '--out', (Join-Path $output 'historical-negative.report.json')) 1 'Historical negative comparative regression'
  Invoke-ReferenceUi @('snapshot', $semanticReference, '--out', (Join-Path $output 'semantic-only-reference.snapshot.json')) 0 'Semantic-only Reference snapshot regression'
  Invoke-ReferenceUi @('verify', 'iterations/01-semantic-only/consumer.html', '--baseline', (Join-Path $output 'semantic-only-reference.snapshot.json'), '--out', (Join-Path $output 'semantic-only-consumer.report.json')) 1 'Semantic-only comparative negative regression'

  $formReport = Read-Json (Join-Path $output 'form-target.report.json')
  $acceptedSnapshot = Read-Json (Join-Path $output 'accepted-reference.snapshot.json')
  $historicalReport = Read-Json (Join-Path $output 'historical-negative.report.json')
  $semanticReport = Read-Json (Join-Path $output 'semantic-only-consumer.report.json')
  if ($formReport.status -ne 'pass' -or $formReport.summary.errorCount -ne 0) { throw 'Form Target comparative regression failed.' }
  if ($acceptedSnapshot.initial.mode -ne 'explicit-data-ref' -or @($acceptedSnapshot.initial.elements.PSObject.Properties).Count -ne 27 -or $acceptedSnapshot.scenarios.Count -ne 11) { throw 'Accepted Reference snapshot regression changed.' }
  if ($historicalReport.status -ne 'fail' -or $historicalReport.summary.uniqueErrorCount -ne 15) { throw 'Historical negative signature coverage changed.' }
  if ($semanticReport.status -ne 'fail' -or @($semanticReport.summary.errorSignatures.path) -notcontains 'semanticInventory.combobox') { throw 'Semantic-only negative signature coverage changed.' }

  $sourcePaths = @($acceptedReference, $formReference, $validFixture)
  $externalSource = rg -n --pcre2 'https?://(?!127\.0\.0\.1:9)|@import|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "A persistent Reference source added external communication:`n$externalSource" }
  if ($LASTEXITCODE -gt 1) { throw 'Persistent Reference external-source scan failed.' }

  $coreText = Get-Content -Raw -LiteralPath $core
  $cliText = Get-Content -Raw -LiteralPath $cli
  [ordered]@{
    approvedReferenceFilesChanged = 0
    consumerFilesChanged = 0
    validConformanceFixturesAdded = 1
    validFixtureLines = (Get-Content -LiteralPath $validFixture).Count
    referenceMetadataAdded = 0
    dependenciesAdded = 0
    coreInspectFunctionCount = [regex]::Matches($coreText, 'function inspectConformance\(').Count
    cliPreflightBranchCount = [regex]::Matches($cliText, 'const report = conformanceReport\(bundle\);').Count
    positiveReferenceShapes = $positives.Count
    reversibleProbeFamilies = 9
    reportKind = 'pass-or-error; no score'
  } | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $output 'source-metrics.json') -Encoding utf8

  [ordered]@{
    browser = $browser
    sandboxLaunchFailuresBeforeApprovedGate = 3
    note = 'The three preliminary Page.enable timeouts occurred under the restricted process sandbox and are not Reference conformance results.'
    gateAttempts = $script:harnessAttempts
    gateTimeouts = $script:harnessTimeouts
    gateRetries = $script:harnessRetries
    events = $script:harnessEvents
  } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'harness-reliability.json') -Encoding utf8

  [ordered]@{
    status = 'pass'
    positiveReferenceShapes = $positives.Count
    reversibleProbeFamilies = 9
    canary = [ordered]@{
      comparativeStatus = (Read-Json (Join-Path $output 'form-canary-broken-comparison.report.json')).status
      preflightStatus = (Read-Json (Join-Path $output 'form-canary-broken.preflight.json')).status
      restoredStatus = (Read-Json (Join-Path $output 'form-canary-restored.preflight.json')).status
    }
    comparativeRegression = [ordered]@{
      formTarget = $formReport.status
      historicalNegative = $historicalReport.status
      semanticOnlyNegative = $semanticReport.status
      cssNegative = (Read-Json (Join-Path $output 'style-negative.report.json')).status
    }
    fixedFormPacket = Get-FixedFormPacketDigest
    coreSha256 = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
    cliSha256 = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash
  } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'gate-summary.json') -Encoding utf8

  Require-FixedEvidence 'after the Gate'
  Write-Host 'Reference Conformance Gate passed mechanically.'
  Write-Host "Positive Reference shapes: $($positives.Count); reversible probe families: 9"
  Write-Host "Canary: comparison=$((Read-Json (Join-Path $output 'form-canary-broken-comparison.report.json')).status), preflight=$((Read-Json (Join-Path $output 'form-canary-broken.preflight.json')).status), restored=$((Read-Json (Join-Path $output 'form-canary-restored.preflight.json')).status)"
  Write-Host "Gate DevTools: attempts=$($script:harnessAttempts), timeouts=$($script:harnessTimeouts), retries=$($script:harnessRetries)"
}
finally {
  $resolvedProbe = [IO.Path]::GetFullPath($probeRoot)
  $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
  if (Test-Path -LiteralPath $resolvedProbe) {
    if ($resolvedProbe.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -and (Split-Path -Leaf $resolvedProbe).StartsWith('poc017-reference-conformance-')) {
      Remove-Item -LiteralPath $resolvedProbe -Recurse -Force
    }
  }
  Pop-Location
}
