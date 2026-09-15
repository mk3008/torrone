$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$variant = Join-Path $experiment 'variants/03-relational-reuse'
$variantReference = Join-Path $variant 'reference/index.html'
$target = Join-Path $variant 'target/index.html'
$ambiguityProbe = Join-Path $variant 'relational-ambiguity-probe.html'
$output = Join-Path $experiment 'output/relational-reuse'
$browser = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$acceptedReferenceHash = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
$coreHash = 'D382601184DED6D351D2BBF5B6213013791AD4A59E0E9DB853B9E68754B59A76'
$cliHash = '7109A169EB8F6EA7C1483B2C14C8A9711560667ECD80DFDCCCC19380E38A8837'
$fixedTransferEvidenceDigest = '96457B6FFEEFC5BABFD15FF97DDF781A740C919A04266DD7D769DA438129EFFF'
$fixedMixedEvidenceDigest = '819FBCD6FA157E033E72A3E45FF7ACD5A9CDA51C7DC5730066CB357643010658'
$env:REFERENCE_UI_DEBUG = '1'
$env:REFERENCE_UI_BROWSER = $browser

$script:harnessAttempts = 0
$script:harnessTimeouts = 0
$script:harnessRetries = 0
$script:harnessEvents = @()

function Require-Exit([int]$Expected, [string]$Label) {
  if ($LASTEXITCODE -ne $Expected) {
    throw "$Label exited with $LASTEXITCODE; expected $Expected."
  }
}

function Require-Hash([string]$Path, [string]$Expected, [string]$Label) {
  $actual = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
  if ($actual -ne $Expected) {
    throw "$Label changed. Expected $Expected but found $actual."
  }
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

function Get-FixedTransferEvidenceDigest() {
  $fixed = @()
  $fixed += Get-Item (Join-Path $experiment 'reference/index.html')
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'consumers/transferability-gate-react') |
    Where-Object FullName -NotMatch '[\/](?:node_modules|dist)[\/]'
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'output/transferability-gate')
  $fixed += Get-Item @(
    (Join-Path $experiment 'transferability-gate-plan.md'),
    (Join-Path $experiment 'transferability-gate-result.md'),
    (Join-Path $experiment 'transferability-verification-record.md'),
    (Join-Path $experiment 'transferability-stable-key-audit.md'),
    (Join-Path $experiment 'transferability-correction-record.md'),
    (Join-Path $experiment 'transferability-screen-review.md'),
    (Join-Path $experiment 'transferability-self-review.md'),
    (Join-Path $experiment 'verify-transferability-gate.ps1')
  )
  return Get-PacketDigest $fixed
}

function Get-FixedMixedEvidenceDigest() {
  $fixed = @()
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'output/mixed-semantic')
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'variants/02-mixed-semantic') |
    Where-Object FullName -NotMatch '[\/](?:node_modules|dist)[\/]'
  $fixed += Get-Item @(
    (Join-Path $experiment 'mixed-semantic-plan.md'),
    (Join-Path $experiment 'mixed-semantic-key-classification.md'),
    (Join-Path $experiment 'mixed-semantic-cost-record.md'),
    (Join-Path $experiment 'mixed-semantic-result.md'),
    (Join-Path $experiment 'mixed-semantic-self-review.md'),
    (Join-Path $experiment 'mixed-semantic-verification-record.md'),
    (Join-Path $experiment 'verify-mixed-semantic.ps1')
  )
  return Get-PacketDigest $fixed
}

function Require-FixedInputs([string]$When) {
  Require-Hash $acceptedReference $acceptedReferenceHash "Accepted Reference $When"
  Require-Hash $core $coreHash "Shared Core $When"
  Require-Hash $cli $cliHash "CLI $When"
  $transferDigest = Get-FixedTransferEvidenceDigest
  if ($transferDigest -ne $fixedTransferEvidenceDigest) {
    throw "Fixed Transferability evidence changed $When. Expected $fixedTransferEvidenceDigest but found $transferDigest."
  }
  $mixedDigest = Get-FixedMixedEvidenceDigest
  if ($mixedDigest -ne $fixedMixedEvidenceDigest) {
    throw "Fixed Mixed evidence changed $When. Expected $fixedMixedEvidenceDigest but found $mixedDigest."
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

function Get-AllStates($Bundle) {
  $states = @($Bundle.initial)
  foreach ($scenario in $Bundle.scenarios) {
    foreach ($step in $scenario.steps) { $states += $step.state }
  }
  return $states
}

function Require-BundleHealth($Bundle, [string]$Label) {
  if ($Bundle.network.externalRequests.Count -ne 0 -or $Bundle.network.failedRequestCount -ne 0) {
    throw "$Label contains external or failed requests."
  }
  if ($Bundle.console.errorCount -ne 0) { throw "$Label contains console or uncaught errors." }
  foreach ($scenario in $Bundle.scenarios) {
    if (@($scenario.loadConsoleErrors).Count -ne 0) { throw "$Label scenario $($scenario.name) has load console errors." }
    foreach ($step in $scenario.steps) {
      if ($step.actionError -or @($step.consoleErrors).Count -ne 0) {
        throw "$Label scenario $($scenario.name) contains an action or console error."
      }
    }
  }
  foreach ($state in Get-AllStates $Bundle) {
    if ($state.duplicateKeys.Count -ne 0) { throw "$Label contains duplicate observation keys." }
    if ($state.semanticAmbiguities.Count -ne 0) { throw "$Label contains ambiguous semantic keys." }
    if ($state.accessibilityIssues.Count -ne 0) { throw "$Label contains bounded accessibility issues." }
    if (@($state.accessibilityTree.unnamedInteractive.PSObject.Properties).Count -ne 0) {
      throw "$Label contains unnamed accessibility-tree controls."
    }
    if ($state.observationBoundary.excludedHarnessRoots -ne 0 -or
        $state.observationBoundary.axExcludedHarnessRoots -ne 0) {
      throw "$Label unexpectedly contains a scenario harness."
    }
  }
}

function Get-ClassTokens([string]$Html) {
  return @([regex]::Matches($Html, 'class="([^"]+)"') |
    ForEach-Object { $_.Groups[1].Value -split '\s+' } |
    Where-Object { $_ } |
    Sort-Object -Unique)
}

function Get-LocalIds([string]$Html) {
  return @([regex]::Matches($Html, '\bid="([^"]+)"') |
    ForEach-Object { $_.Groups[1].Value } |
    Sort-Object -Unique)
}

function Get-StyleHash([string]$Html) {
  $match = [regex]::Match($Html, '(?s)<style>(.*?)</style>')
  if (-not $match.Success) { throw 'Expected one inline style block.' }
  return [Convert]::ToHexString(
    [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($match.Groups[1].Value))
  )
}

Push-Location $experiment
try {
  Require-FixedInputs 'before the experiment'

  node --check $cli
  Require-Exit 0 'CLI syntax check'
  node --check $core
  Require-Exit 0 'Core syntax check'

  $variantFiles = @(Get-ChildItem -LiteralPath $variant -Recurse -File)
  if ($variantFiles.Count -ne 3 -or @($variantFiles.Extension | Where-Object { $_ -ne '.html' }).Count -ne 0) {
    throw 'Relational Variant is no longer a three-file, buildless HTML experiment.'
  }

  $sourcePaths = @(
    'variants/03-relational-reuse/reference/index.html',
    'variants/03-relational-reuse/target/index.html',
    'variants/03-relational-reuse/relational-ambiguity-probe.html'
  )
  $external = rg -n 'https?://|@import|url\(\s*["'']?https?://' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "Variant contains an external runtime reference:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'Variant external-reference scan failed.' }

  $runtimeCalls = rg -n '\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "Variant contains a network/data-layer API:`n$runtimeCalls" }
  if ($LASTEXITCODE -gt 1) { throw 'Variant runtime API scan failed.' }

  $leakage = rg -ni 'Control Center|Access review queue|Identity management|AR-10(?:48|44|41|39)|Ledger Close|Month-end close checklist|Avery Chen|Financial controller|Reconcile clearing account|Confirm bank balances|Post accrual journal' 'variants/03-relational-reuse/target/index.html'
  if ($LASTEXITCODE -eq 0) { throw "Reference business content leaked into the Target:`n$leakage" }
  if ($LASTEXITCODE -gt 1) { throw 'Business-content leakage scan failed.' }

  $referenceHtml = Get-Content -Raw -LiteralPath $variantReference
  $targetHtml = Get-Content -Raw -LiteralPath $target
  if ($targetHtml -match 'data-reference-scenarios') { throw 'Target contains a Reference scenario harness.' }
  $referenceExplicitCount = [regex]::Matches($referenceHtml, '<[^>]+\bdata-ref\s*=').Count
  $targetExplicitCount = [regex]::Matches($targetHtml, '<[^>]+\bdata-ref\s*=').Count
  $referenceControlsCount = [regex]::Matches($referenceHtml, '<[^>]+\baria-controls\s*=').Count
  $targetControlsCount = [regex]::Matches($targetHtml, '<[^>]+\baria-controls\s*=').Count
  if ($referenceExplicitCount -ne 6 -or $targetExplicitCount -ne 6) { throw 'Expected exactly six explicit observation annotations per screen.' }
  if ($referenceControlsCount -ne 2 -or $targetControlsCount -ne 2) { throw 'Expected exactly two natural aria-controls relationships per screen.' }

  $sharedClasses = @(Compare-Object (Get-ClassTokens $referenceHtml) (Get-ClassTokens $targetHtml) -IncludeEqual |
    Where-Object SideIndicator -eq '==' |
    ForEach-Object InputObject)
  $sharedIds = @(Compare-Object (Get-LocalIds $referenceHtml) (Get-LocalIds $targetHtml) -IncludeEqual |
    Where-Object SideIndicator -eq '==' |
    ForEach-Object InputObject)
  if ($sharedClasses.Count -ne 0) { throw "Reference and Target share class tokens: $($sharedClasses -join ', ')." }
  if ($sharedIds.Count -ne 0) { throw "Reference and Target share local IDs: $($sharedIds -join ', ')." }
  $referenceStyleHash = Get-StyleHash $referenceHtml
  $targetStyleHash = Get-StyleHash $targetHtml
  if ($referenceStyleHash -eq $targetStyleHash) { throw 'Reference and Target share an identical style source.' }

  New-Item -ItemType Directory -Path $output -Force | Out-Null
  Invoke-ReferenceUi -CliArguments @(
    'snapshot', $variantReference,
    '--out', (Join-Path $output 'reference.snapshot.json'),
    '--artifacts', (Join-Path $output 'reference')
  ) -Expected 0 -Label 'Relational Reference snapshot'
  Invoke-ReferenceUi -CliArguments @(
    'snapshot', $variantReference,
    '--out', (Join-Path $output 'reference.repeat.snapshot.json'),
    '--artifacts', (Join-Path $output 'reference-repeat')
  ) -Expected 0 -Label 'Relational Reference repeat snapshot'
  $firstHash = (Get-FileHash -LiteralPath (Join-Path $output 'reference.snapshot.json') -Algorithm SHA256).Hash
  $secondHash = (Get-FileHash -LiteralPath (Join-Path $output 'reference.repeat.snapshot.json') -Algorithm SHA256).Hash
  if ($firstHash -ne $secondHash) { throw 'Repeated Reference capture is not byte-identical.' }

  Invoke-ReferenceUi -CliArguments @(
    'snapshot', $target,
    '--out', (Join-Path $output 'target.snapshot.json')
  ) -Expected 0 -Label 'Relational Target snapshot'
  Invoke-ReferenceUi -CliArguments @(
    'verify', $target,
    '--baseline', (Join-Path $output 'reference.snapshot.json'),
    '--out', (Join-Path $output 'target.report.json'),
    '--artifacts', (Join-Path $output 'target')
  ) -Expected 0 -Label 'Relational Target verification'
  Invoke-ReferenceUi -CliArguments @(
    'snapshot', $ambiguityProbe,
    '--out', (Join-Path $output 'relational-ambiguity.snapshot.json')
  ) -Expected 0 -Label 'Relational ambiguity probe'

  $reference = Get-Content -Raw -LiteralPath (Join-Path $output 'reference.snapshot.json') | ConvertFrom-Json -Depth 100
  $targetSnapshot = Get-Content -Raw -LiteralPath (Join-Path $output 'target.snapshot.json') | ConvertFrom-Json -Depth 100
  $targetReport = Get-Content -Raw -LiteralPath (Join-Path $output 'target.report.json') | ConvertFrom-Json -Depth 100
  $ambiguity = Get-Content -Raw -LiteralPath (Join-Path $output 'relational-ambiguity.snapshot.json') | ConvertFrom-Json -Depth 100

  $semanticKeys = @(
    'semantic:controlled-by:filter-toggle',
    'semantic:controlled-by:user-menu-toggle',
    'semantic:role:banner',
    'semantic:role:main'
  )
  $explicitKeys = @(
    'filter-toggle',
    'sign-out-action',
    'status-badge',
    'summary-strip',
    'user-menu-toggle',
    'work-region'
  )
  foreach ($bundle in @($reference, $targetSnapshot)) {
    if ($bundle.initial.mode -ne 'mixed-data-ref-semantic') { throw 'A screen did not use mixed observation mode.' }
    $names = @($bundle.initial.elements.PSObject.Properties.Name | Sort-Object)
    $actualSemantic = @($names | Where-Object { $_ -like 'semantic:*' })
    $actualExplicit = @($names | Where-Object { $_ -notlike 'semantic:*' })
    if (Compare-Object $semanticKeys $actualSemantic -SyncWindow 0) { throw 'A screen has an unexpected semantic-key inventory.' }
    if (Compare-Object $explicitKeys $actualExplicit -SyncWindow 0) { throw 'A screen has an unexpected explicit-key inventory.' }
  }
  Require-BundleHealth $reference 'Relational Reference'
  Require-BundleHealth $targetSnapshot 'Relational Target snapshot'
  if ($reference.scenarios.Count -ne 3 -or @($reference.scenarios.steps).Count -ne 6) {
    throw 'Relational Reference does not contain exactly three scenarios and six actions.'
  }
  if ($targetReport.status -ne 'pass' -or $targetReport.summary.errorCount -ne 0) {
    throw 'Relational Target is not a zero-error pass.'
  }
  if ($targetReport.contract.scenarios.Count -ne 3 -or @($targetReport.contract.scenarios.steps).Count -ne 6) {
    throw 'Relational Target did not replay all Reference scenarios/actions.'
  }
  if ($targetReport.console.errorCount -ne 0 -or $targetReport.network.externalRequests.Count -ne 0 -or $targetReport.network.failedRequestCount -ne 0) {
    throw 'Relational Target report contains console or network errors.'
  }

  foreach ($bundle in @($reference, $targetSnapshot)) {
    foreach ($controller in @('user-menu-toggle', 'filter-toggle')) {
      $expectedRelationship = "semantic:controlled-by:$controller"
      if (@($bundle.initial.elements.$controller.relationships.controls) -notcontains $expectedRelationship) {
        throw "$controller does not resolve to $expectedRelationship."
      }
    }
  }

  $filterOpen = $reference.scenarios[0].steps[0].state
  $filterClosed = $reference.scenarios[0].steps[1].state
  if (-not $filterOpen.elements.'semantic:controlled-by:filter-toggle'.visible -or
      $filterOpen.elements.'filter-toggle'.attributes.'aria-expanded' -ne 'true' -or
      $filterClosed.elements.'semantic:controlled-by:filter-toggle'.visible -or
      $filterClosed.elements.'filter-toggle'.attributes.'aria-expanded' -ne 'false') {
    throw 'Filter relationship state transition was not observed.'
  }
  $menuOpen = $reference.scenarios[2].steps[0].state
  $menuClosed = $reference.scenarios[2].steps[1].state
  if (-not $menuOpen.elements.'semantic:controlled-by:user-menu-toggle'.visible -or
      $menuOpen.document.activeRef -ne 'sign-out-action' -or
      $menuClosed.elements.'semantic:controlled-by:user-menu-toggle'.visible -or
      $menuClosed.document.activeRef -ne 'user-menu-toggle') {
    throw 'User-menu relationship/focus transition was not observed.'
  }

  $ambiguities = @($ambiguity.initial.semanticAmbiguities)
  if ($ambiguities.Count -ne 1 -or
      $ambiguities[0].key -ne 'semantic:controlled-by:filter-toggle' -or
      $ambiguities[0].count -ne 2) {
    throw 'Relational ambiguity probe did not report exactly two candidates.'
  }
  if ($ambiguity.initial.elements.PSObject.Properties.Name -contains 'semantic:controlled-by:filter-toggle') {
    throw 'Ambiguous relational identity was captured instead of failing closed.'
  }

  $historicalNegative = Get-Content -Raw -LiteralPath (Join-Path $experiment 'output/mixed-semantic/historical-negative.report.json') | ConvertFrom-Json -Depth 100
  $semanticNegative = Get-Content -Raw -LiteralPath (Join-Path $experiment 'output/mixed-semantic/semantic-only-consumer.report.json') | ConvertFrom-Json -Depth 100
  $styleNegative = Get-Content -Raw -LiteralPath (Join-Path $experiment 'output/mixed-semantic/style-negative.report.json') | ConvertFrom-Json -Depth 100
  if ($historicalNegative.status -ne 'fail' -or $historicalNegative.summary.uniqueErrorCount -ne 15) {
    throw 'Historical negative signature evidence changed.'
  }
  if ($semanticNegative.status -ne 'fail' -or @($semanticNegative.summary.errorSignatures.path) -notcontains 'semanticInventory.combobox') {
    throw 'Semantic-only negative evidence changed.'
  }
  if ($styleNegative.status -ne 'fail' -or @($styleNegative.summary.errorSignatures.path) -notcontains 'elements.filter-toggle.styles.borderRadius') {
    throw 'Style negative evidence changed.'
  }

  $sourceMetrics = [ordered]@{
    reference = [ordered]@{
      dataRefAttributes = $referenceExplicitCount
      ariaControlsRelationships = $referenceControlsCount
      classTokens = (Get-ClassTokens $referenceHtml).Count
      localIds = (Get-LocalIds $referenceHtml).Count
      lines = (Get-Content -LiteralPath $variantReference).Count
      styleSha256 = $referenceStyleHash
    }
    target = [ordered]@{
      dataRefAttributes = $targetExplicitCount
      ariaControlsRelationships = $targetControlsCount
      classTokens = (Get-ClassTokens $targetHtml).Count
      localIds = (Get-LocalIds $targetHtml).Count
      lines = (Get-Content -LiteralPath $target).Count
      styleSha256 = $targetStyleHash
      sharedClassTokens = $sharedClasses.Count
      sharedLocalIds = $sharedIds.Count
      scenarioHarnessRoots = 0
    }
    identity = [ordered]@{
      totalObservations = 10
      explicitObservations = 6
      nativeSemanticObservations = 2
      relationalSemanticObservations = 2
      priorRelationalCandidates = 4
      naturallyReusedRelationalIdentities = 2
      addedHeuristics = 0
      explicitAlternativeAttributes = 8
      ambiguousProbeCandidates = 2
    }
    fixedInputs = [ordered]@{
      acceptedReferenceSha256 = $acceptedReferenceHash
      coreSha256 = $coreHash
      cliSha256 = $cliHash
      transferabilityPacketSha256 = $fixedTransferEvidenceDigest
      mixedPacketSha256 = $fixedMixedEvidenceDigest
    }
  }
  $sourceMetrics | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'source-metrics.json') -Encoding utf8

  $harness = [ordered]@{
    browser = $browser
    gateAttempts = $script:harnessAttempts
    gateTimeouts = $script:harnessTimeouts
    gateRetries = $script:harnessRetries
    events = $script:harnessEvents
    note = 'Development-phase attempts are recorded in the verification record, not added to these final Gate counters.'
  }
  $harness | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'harness-reliability.json') -Encoding utf8

  Require-FixedInputs 'after the experiment'

  Write-Host 'Relational semantic identity reuse Gate passed.'
  Write-Host 'Observations: total=10, explicit=6, native-semantic=2, relational-semantic=2'
  Write-Host 'Relational reuse: natural=2 of prior 4, added heuristics=0, ambiguity candidates=2 (fail-closed)'
  Write-Host "Target: $($targetReport.status), errors=$($targetReport.summary.errorCount), diagnostics=$($targetReport.summary.diagnosticCount)"
  Write-Host "Final Gate DevTools: attempts=$($script:harnessAttempts), timeouts=$($script:harnessTimeouts), retries=$($script:harnessRetries)"
}
finally {
  Pop-Location
}
