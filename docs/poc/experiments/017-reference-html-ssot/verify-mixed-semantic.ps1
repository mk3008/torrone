$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$variant = Join-Path $experiment 'variants/02-mixed-semantic'
$variantReference = Join-Path $variant 'reference/index.html'
$target = Join-Path $variant 'target-react'
$targetDist = Join-Path $target 'dist'
$scenarioOverrides = Join-Path $target 'scenario-overrides.json'
$ambiguityProbe = Join-Path $variant 'semantic-ambiguity-probe.html'
$output = Join-Path $experiment 'output/mixed-semantic'
$acceptedReferenceHash = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
$fixedTransferEvidenceDigest = '96457B6FFEEFC5BABFD15FF97DDF781A740C919A04266DD7D769DA438129EFFF'
$env:REFERENCE_UI_DEBUG = '1'

function Require-Exit([int]$Expected, [string]$Label) {
  if ($LASTEXITCODE -ne $Expected) {
    throw "$Label exited with $LASTEXITCODE; expected $Expected."
  }
}

function Require-AcceptedReferenceHash([string]$When) {
  $actual = (Get-FileHash -LiteralPath $acceptedReference -Algorithm SHA256).Hash
  if ($actual -ne $acceptedReferenceHash) {
    throw "Accepted Reference changed $When. Expected $acceptedReferenceHash but found $actual."
  }
}

function Get-FixedTransferEvidenceDigest() {
  $fixed = @()
  $fixed += Get-Item (Join-Path $experiment 'reference/index.html')
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'consumers/transferability-gate-react') |
    Where-Object FullName -NotMatch '[\\/](?:node_modules|dist)[\\/]'
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
  $root = [IO.Path]::GetFullPath($experiment).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $lines = @($fixed | Sort-Object FullName -Unique | ForEach-Object {
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    $hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
    "$relative=$hash"
  })
  return [Convert]::ToHexString(
    [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n")))
  )
}

function Require-FixedTransferEvidence([string]$When) {
  $actual = Get-FixedTransferEvidenceDigest
  if ($actual -ne $fixedTransferEvidenceDigest) {
    throw "Fixed Transferability evidence changed $When. Expected $fixedTransferEvidenceDigest but found $actual."
  }
}

function Get-AllStates($Bundle) {
  $states = @($Bundle.initial)
  foreach ($scenario in $Bundle.scenarios) {
    foreach ($step in $scenario.steps) { $states += $step.state }
  }
  return $states
}

function Require-BundleHealth($Bundle, [string]$Label, [int]$HarnessRoots) {
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
    if ($state.observationBoundary.excludedHarnessRoots -ne $HarnessRoots -or
        $state.observationBoundary.axExcludedHarnessRoots -ne $HarnessRoots) {
      throw "$Label has an unexpected harness boundary."
    }
  }
}

Push-Location $experiment
try {
  Require-AcceptedReferenceHash 'before the experiment'
  Require-FixedTransferEvidence 'before the experiment'

  node --check $cli
  Require-Exit 0 'CLI syntax check'
  node --check $core
  Require-Exit 0 'Core syntax check'

  $trailing = rg -n --pcre2 '[ \t]+$' . --glob '!output/**' --glob '!**/node_modules/**' --glob '!**/dist/**'
  if ($LASTEXITCODE -eq 0) { throw "PoC source contains trailing whitespace:`n$trailing" }
  if ($LASTEXITCODE -gt 1) { throw 'Whitespace scan failed.' }

  $markdownFiles = Get-ChildItem -LiteralPath $experiment -Recurse -File -Filter '*.md' |
    Where-Object { $_.FullName -notmatch '[\\/](?:node_modules|dist|output)[\\/]' }
  foreach ($markdown in $markdownFiles) {
    $content = Get-Content -Raw -LiteralPath $markdown.FullName
    foreach ($match in [regex]::Matches($content, '\[[^\]]*\]\(([^)]+)\)')) {
      $targetPath = $match.Groups[1].Value.Trim('<>')
      if ($targetPath -match '^(?:https?:|mailto:|#)') { continue }
      $pathOnly = ($targetPath -split '#', 2)[0]
      if (-not $pathOnly) { continue }
      $resolved = Join-Path $markdown.DirectoryName $pathOnly
      if (-not (Test-Path -LiteralPath $resolved)) {
        throw "Broken Markdown link in $($markdown.FullName): $targetPath"
      }
    }
  }

  $variantSources = @(
    'variants/02-mixed-semantic/reference/index.html',
    'variants/02-mixed-semantic/target-react/index.html',
    'variants/02-mixed-semantic/target-react/src/main.jsx',
    'variants/02-mixed-semantic/target-react/src/target.css',
    'variants/02-mixed-semantic/target-react/scenario-overrides.json'
  )
  $external = rg -n 'https?://|@import|url\(\s*["'']?https?://' @variantSources
  if ($LASTEXITCODE -eq 0) { throw "Variant contains an external runtime reference:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'Variant external-reference scan failed.' }

  $leakage = rg -ni 'Control Center|Access review queue|Mina Patel|mina\.patel|Identity management|Access review|Policy exceptions|Audit exports|AR-10(?:48|44|41|39)|Payment release|Customer export|Ledger correction|Account recovery' @(
    'variants/02-mixed-semantic/target-react/index.html',
    'variants/02-mixed-semantic/target-react/src/main.jsx',
    'variants/02-mixed-semantic/target-react/src/target.css'
  )
  if ($LASTEXITCODE -eq 0) { throw "Reference business content leaked into Target Variant:`n$leakage" }
  if ($LASTEXITCODE -gt 1) { throw 'Variant leakage scan failed.' }

  $oldBusinessKeys = rg -n 'navigation-access-review|navigation-audit-exports|requester-filter' @variantSources
  if ($LASTEXITCODE -eq 0) { throw "Variant retains Reference-business key names:`n$oldBusinessKeys" }
  if ($LASTEXITCODE -gt 1) { throw 'Business-key scan failed.' }

  $variantCssHash = (Get-FileHash -LiteralPath (Join-Path $target 'src/target.css') -Algorithm SHA256).Hash
  $fixedIndependentCssHash = (Get-FileHash -LiteralPath (Join-Path $experiment 'consumers/transferability-gate-react/src/target.css') -Algorithm SHA256).Hash
  $vanillaCssHash = (Get-FileHash -LiteralPath (Join-Path $experiment 'consumers/vanilla/styles.css') -Algorithm SHA256).Hash
  if ($variantCssHash -ne $fixedIndependentCssHash) { throw 'Mixed Target did not preserve the fixed independent-CSS input.' }
  if ($variantCssHash -eq $vanillaCssHash) { throw 'Mixed Target unexpectedly shares the vanilla CSS source.' }

  New-Item -ItemType Directory -Path $output -Force | Out-Null
  $acceptedHtml = Get-Content -Raw -LiteralPath $acceptedReference
  $variantHtml = Get-Content -Raw -LiteralPath $variantReference
  $acceptedDataRefCount = [regex]::Matches($acceptedHtml, '<[^>]+\bdata-ref\s*=').Count
  $variantDataRefCount = [regex]::Matches($variantHtml, '<[^>]+\bdata-ref\s*=').Count
  if ($acceptedDataRefCount -ne 27 -or $variantDataRefCount -ne 21) {
    throw "Unexpected Reference annotation counts: accepted=$acceptedDataRefCount, variant=$variantDataRefCount."
  }
  $sourceMetrics = [ordered]@{
    acceptedReference = [ordered]@{
      dataRefAttributes = $acceptedDataRefCount
      lines = (Get-Content -LiteralPath $acceptedReference).Count
      scenarioTargets = [regex]::Matches($acceptedHtml, '"target"\s*:').Count
      javascriptDataRefQueries = [regex]::Matches($acceptedHtml, 'querySelector\([^\r\n]*data-ref').Count
    }
    mixedReference = [ordered]@{
      dataRefAttributes = $variantDataRefCount
      lines = (Get-Content -LiteralPath $variantReference).Count
      scenarioTargets = [regex]::Matches($variantHtml, '"target"\s*:').Count
      javascriptDataRefQueries = [regex]::Matches($variantHtml, 'querySelector\([^\r\n]*data-ref').Count
    }
    sharedCore = [ordered]@{
      lines = (Get-Content -LiteralPath $core).Count
      mixedFunctions = @('semanticDescriptor', 'semanticIndex', 'find', 'semanticInventory')
    }
    targetCss = [ordered]@{
      mixedVariantSha256 = $variantCssHash
      fixedIndependentTargetSha256 = $fixedIndependentCssHash
      historicalVanillaSha256 = $vanillaCssHash
    }
  }
  $sourceMetrics | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $output 'source-metrics.json') -Encoding utf8

  node $cli snapshot $variantReference --out (Join-Path $output 'reference.snapshot.json') --artifacts (Join-Path $output 'reference')
  Require-Exit 0 'Mixed Reference snapshot'
  node $cli snapshot $variantReference --out (Join-Path $output 'reference.repeat.snapshot.json') --artifacts (Join-Path $output 'reference-repeat')
  Require-Exit 0 'Mixed Reference repeat snapshot'
  $firstHash = (Get-FileHash -LiteralPath (Join-Path $output 'reference.snapshot.json') -Algorithm SHA256).Hash
  $secondHash = (Get-FileHash -LiteralPath (Join-Path $output 'reference.repeat.snapshot.json') -Algorithm SHA256).Hash
  if ($firstHash -ne $secondHash) { throw 'Mixed Reference repeated capture is not byte-identical.' }

  Push-Location $target
  try {
    npm ci --no-audit --no-fund
    Require-Exit 0 'Mixed Target npm ci'
    npm run build
    Require-Exit 0 'Mixed Target build'
  }
  finally { Pop-Location }

  node $cli snapshot $targetDist --out (Join-Path $output 'target.snapshot.json')
  Require-Exit 0 'Mixed Target snapshot'
  node $cli verify $targetDist --baseline (Join-Path $output 'reference.snapshot.json') --scenario-overrides $scenarioOverrides --out (Join-Path $output 'target.report.json') --artifacts (Join-Path $output 'target')
  Require-Exit 0 'Mixed Target verification'

  $reference = Get-Content -Raw -LiteralPath (Join-Path $output 'reference.snapshot.json') | ConvertFrom-Json -Depth 100
  $targetSnapshot = Get-Content -Raw -LiteralPath (Join-Path $output 'target.snapshot.json') | ConvertFrom-Json -Depth 100
  $targetReport = Get-Content -Raw -LiteralPath (Join-Path $output 'target.report.json') | ConvertFrom-Json -Depth 100
  $semanticKeys = @(
    'semantic:controlled-by:filter-toggle',
    'semantic:controlled-by:navigation-parent',
    'semantic:controlled-by:navigation-toggle',
    'semantic:controlled-by:user-menu-toggle',
    'semantic:role:banner',
    'semantic:role:main'
  )
  foreach ($bundle in @($reference, $targetSnapshot)) {
    if ($bundle.initial.mode -ne 'mixed-data-ref-semantic') { throw 'A Variant did not use mixed observation mode.' }
    $names = @($bundle.initial.elements.PSObject.Properties.Name | Sort-Object)
    if ($names.Count -ne 27) { throw 'A Variant did not preserve all 27 observation points.' }
    $actualSemantic = @($names | Where-Object { $_ -like 'semantic:*' })
    if (Compare-Object $semanticKeys $actualSemantic -SyncWindow 0) { throw 'A Variant has an unexpected semantic-key inventory.' }
    if (@($names | Where-Object { $_ -notlike 'semantic:*' }).Count -ne 21) { throw 'A Variant does not retain exactly 21 explicit keys.' }
  }
  Require-BundleHealth $reference 'Mixed Reference' 1
  Require-BundleHealth $targetSnapshot 'Mixed Target' 0
  if ($reference.scenarios.Count -ne 11 -or @($reference.scenarios.steps).Count -ne 19) { throw 'Mixed Reference does not preserve all scenarios/actions.' }
  if ($targetReport.status -ne 'pass' -or $targetReport.summary.errorCount -ne 0) { throw 'Mixed Target is not a zero-error pass.' }
  if ($targetReport.contract.scenarios.Count -ne 11 -or @($targetReport.contract.scenarios.steps).Count -ne 19) { throw 'Mixed Target did not replay all scenarios/actions.' }
  if ($targetReport.console.errorCount -ne 0 -or $targetReport.network.externalRequests.Count -ne 0 -or $targetReport.network.failedRequestCount -ne 0) {
    throw 'Mixed Target report contains console or network errors.'
  }
  foreach ($controller in @('navigation-toggle', 'navigation-parent', 'user-menu-toggle', 'filter-toggle')) {
    $expectedRelationship = "semantic:controlled-by:$controller"
    if (@($targetSnapshot.initial.elements.$controller.relationships.controls) -notcontains $expectedRelationship) {
      throw "$controller does not resolve to $expectedRelationship."
    }
  }

  node $cli snapshot $ambiguityProbe --out (Join-Path $output 'semantic-ambiguity.snapshot.json')
  Require-Exit 0 'Semantic ambiguity probe'
  $ambiguity = Get-Content -Raw -LiteralPath (Join-Path $output 'semantic-ambiguity.snapshot.json') | ConvertFrom-Json -Depth 100
  $expectedAmbiguities = @(
    'semantic:aria-live:polite',
    'semantic:role:button:aria-expanded',
    'semantic:role:button:aria-pressed',
    'semantic:role:menuitem',
    'semantic:role:navigation',
    'semantic:role:table'
  )
  $actualAmbiguities = @($ambiguity.initial.semanticAmbiguities.key | Sort-Object)
  if (Compare-Object $expectedAmbiguities $actualAmbiguities -SyncWindow 0) { throw 'Ambiguity probe did not fail closed for the expected descriptors.' }
  foreach ($key in $expectedAmbiguities) {
    if ($ambiguity.initial.elements.PSObject.Properties.Name -contains $key) { throw "Ambiguous descriptor $key was captured by position." }
  }

  node $cli snapshot 'reference/index.html' --out (Join-Path $output 'accepted-reference-regression.snapshot.json')
  Require-Exit 0 'Accepted Reference regression snapshot'
  $acceptedRegression = Get-Content -Raw -LiteralPath (Join-Path $output 'accepted-reference-regression.snapshot.json') | ConvertFrom-Json -Depth 100
  if ($acceptedRegression.initial.mode -ne 'explicit-data-ref' -or @($acceptedRegression.initial.elements.PSObject.Properties).Count -ne 27 -or $acceptedRegression.scenarios.Count -ne 11) {
    throw 'Accepted Reference explicit-mode regression failed.'
  }
  Require-BundleHealth $acceptedRegression 'Accepted Reference regression' 1

  node $cli verify 'consumers/negative/index.html' --root 'consumers' --baseline 'output/reference.snapshot.json' --out (Join-Path $output 'historical-negative.report.json') --artifacts (Join-Path $output 'historical-negative')
  Require-Exit 1 'Historical negative verification'

  node $cli snapshot 'iterations/01-semantic-only/reference.html' --out (Join-Path $output 'semantic-only-reference.snapshot.json')
  Require-Exit 0 'Semantic-only Reference snapshot'
  node $cli verify 'iterations/01-semantic-only/consumer.html' --baseline (Join-Path $output 'semantic-only-reference.snapshot.json') --out (Join-Path $output 'semantic-only-consumer.report.json')
  Require-Exit 1 'Semantic-only negative verification'

  $negativeRoot = Join-Path $env:TEMP "poc017-mixed-style-negative-$([guid]::NewGuid().ToString('N'))"
  try {
    Copy-Item -LiteralPath $targetDist -Destination $negativeRoot -Recurse
    $negativeCss = @(Get-ChildItem -LiteralPath (Join-Path $negativeRoot 'assets') -File -Filter '*.css')
    if ($negativeCss.Count -ne 1) { throw 'Expected one built CSS asset for the style negative.' }
    [IO.File]::AppendAllText($negativeCss[0].FullName, "`n[data-ref='filter-toggle'] { border-radius: 0 !important; }`n", [Text.Encoding]::UTF8)
    node $cli verify $negativeRoot --baseline (Join-Path $output 'reference.snapshot.json') --scenario-overrides $scenarioOverrides --out (Join-Path $output 'style-negative.report.json') --artifacts (Join-Path $output 'style-negative')
    Require-Exit 1 'Mixed style negative verification'
  }
  finally {
    $resolvedNegative = [IO.Path]::GetFullPath($negativeRoot)
    $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
    if ($resolvedNegative.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -and (Split-Path -Leaf $resolvedNegative).StartsWith('poc017-mixed-style-negative-')) {
      Remove-Item -LiteralPath $resolvedNegative -Recurse -Force
    }
  }

  $historicalNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'historical-negative.report.json') | ConvertFrom-Json -Depth 100
  $semanticNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'semantic-only-consumer.report.json') | ConvertFrom-Json -Depth 100
  $styleNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'style-negative.report.json') | ConvertFrom-Json -Depth 100
  if ($historicalNegative.status -ne 'fail' -or $historicalNegative.summary.uniqueErrorCount -ne 15) { throw 'Historical negative signature coverage changed.' }
  if ($semanticNegative.status -ne 'fail' -or @($semanticNegative.summary.errorSignatures.path) -notcontains 'semanticInventory.combobox') { throw 'Semantic-only negative did not expose the combobox-count mismatch.' }
  if ($styleNegative.status -ne 'fail' -or @($styleNegative.summary.errorSignatures.path) -notcontains 'elements.filter-toggle.styles.borderRadius') { throw 'Mixed style negative did not expose filter-toggle borderRadius.' }

  $frozenVanilla = Get-Content -Raw -LiteralPath 'output/vanilla.report.json' | ConvertFrom-Json -Depth 100
  $frozenReact = Get-Content -Raw -LiteralPath 'output/react.report.json' | ConvertFrom-Json -Depth 100
  if ($frozenVanilla.status -ne 'pass' -or $frozenReact.status -ne 'pass') { throw 'A frozen positive report is no longer pass.' }

  Require-AcceptedReferenceHash 'after the experiment'
  Require-FixedTransferEvidence 'after the experiment'

  Write-Host 'Mixed semantic/stable-key experiment passed.'
  Write-Host "Accepted Reference SHA-256: $acceptedReferenceHash"
  Write-Host "Fixed Transferability evidence digest: $fixedTransferEvidenceDigest"
  Write-Host "Mixed observations: total=27, semantic=6, explicit=21"
  Write-Host "Target: $($targetReport.status), errors=$($targetReport.summary.errorCount), diagnostics=$($targetReport.summary.diagnosticCount)"
  Write-Host "Expected rejections: ambiguity=6, historical=$($historicalNegative.status), semantic-only=$($semanticNegative.status), style=$($styleNegative.status)"
}
finally {
  Pop-Location
}
