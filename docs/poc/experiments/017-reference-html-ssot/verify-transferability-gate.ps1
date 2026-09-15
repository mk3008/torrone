$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$reference = Join-Path $experiment 'reference/index.html'
$expectedReferenceHash = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$target = Join-Path $experiment 'consumers/transferability-gate-react'
$targetDist = Join-Path $target 'dist'
$output = Join-Path $experiment 'output/transferability-gate'
$baseline = Join-Path $output 'reference.snapshot.json'
$scenarioOverrides = Join-Path $target 'scenario-overrides.json'

function Require-Exit([int]$Expected, [string]$Label) {
  if ($LASTEXITCODE -ne $Expected) {
    throw "$Label exited with $LASTEXITCODE; expected $Expected."
  }
}

function Require-ReferenceHash([string]$When) {
  $actual = (Get-FileHash -LiteralPath $reference -Algorithm SHA256).Hash
  if ($actual -ne $expectedReferenceHash) {
    throw "Approved Reference changed $When. Expected $expectedReferenceHash but found $actual."
  }
}

function Get-Selectors([string]$Css) {
  return @([regex]::Matches($Css, '(?m)^\s*([^@\r\n][^{]+)\s*\{') |
    ForEach-Object { $_.Groups[1].Value.Trim() } |
    Sort-Object -Unique)
}

Push-Location $experiment
try {
  Require-ReferenceHash 'before the gate'

  node --check $cli
  Require-Exit 0 'CLI syntax check'
  node --check (Join-Path $experiment 'core/browser-core.js')
  Require-Exit 0 'Core syntax check'

  $targetSources = @(
    'consumers/transferability-gate-react/index.html',
    'consumers/transferability-gate-react/src/main.jsx',
    'consumers/transferability-gate-react/src/target.css',
    'consumers/transferability-gate-react/scenario-overrides.json'
  )

  $sharedSource = rg -n 'reference/index|consumers/(?:vanilla|react)|\.\./vanilla|data-reference-harness|data-reference-scenario' @targetSources
  if ($LASTEXITCODE -eq 0) { throw "Target contains a prohibited source/harness reference:`n$sharedSource" }
  if ($LASTEXITCODE -gt 1) { throw 'Target source-sharing scan failed.' }

  $external = rg -n 'https?://|@import|url\(\s*["'']?https?://' @targetSources
  if ($LASTEXITCODE -eq 0) { throw "Target contains an external runtime reference:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'Target external-reference scan failed.' }

  $referenceLeak = rg -ni 'Control Center|Access review queue|Mina Patel|mina\.patel|Identity management|Access review|Policy exceptions|Audit exports|AR-10(?:48|44|41|39)|Payment release|Customer export|Ledger correction|Account recovery' @targetSources
  if ($LASTEXITCODE -eq 0) { throw "Reference business content leaked into the Target:`n$referenceLeak" }
  if ($LASTEXITCODE -gt 1) { throw 'Reference-content leakage scan failed.' }

  $targetCssPath = Join-Path $target 'src/target.css'
  $vanillaCssPath = Join-Path $experiment 'consumers/vanilla/styles.css'
  $targetCss = Get-Content -Raw -LiteralPath $targetCssPath
  $vanillaCss = Get-Content -Raw -LiteralPath $vanillaCssPath
  $referenceHtml = Get-Content -Raw -LiteralPath $reference
  $referenceCssMatch = [regex]::Match($referenceHtml, '(?s)<style>\s*(.*?)\s*</style>')
  if (-not $referenceCssMatch.Success) { throw 'Approved Reference inline CSS was not found.' }
  $referenceCss = $referenceCssMatch.Groups[1].Value
  $targetSelectors = Get-Selectors $targetCss
  $vanillaSelectors = Get-Selectors $vanillaCss
  $referenceSelectors = Get-Selectors $referenceCss
  $sharedWithVanilla = @($targetSelectors | Where-Object { $vanillaSelectors -contains $_ })
  $sharedWithReference = @($targetSelectors | Where-Object { $referenceSelectors -contains $_ })
  $sourceIndependence = [ordered]@{
    targetCss = [ordered]@{
      path = 'consumers/transferability-gate-react/src/target.css'
      sha256 = (Get-FileHash -LiteralPath $targetCssPath -Algorithm SHA256).Hash
      lines = (Get-Content -LiteralPath $targetCssPath).Count
      selectorCount = $targetSelectors.Count
    }
    reference = [ordered]@{
      path = 'reference/index.html#inline-css'
      sha256 = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($referenceCss)))
      selectorCount = $referenceSelectors.Count
      sharedSelectorCount = $sharedWithReference.Count
      sharedSelectors = $sharedWithReference
    }
    historicalVanilla = [ordered]@{
      path = 'consumers/vanilla/styles.css'
      sha256 = (Get-FileHash -LiteralPath $vanillaCssPath -Algorithm SHA256).Hash
      lines = (Get-Content -LiteralPath $vanillaCssPath).Count
      selectorCount = $vanillaSelectors.Count
      sharedSelectorCount = $sharedWithVanilla.Count
      sharedSelectors = $sharedWithVanilla
    }
  }
  if ($sourceIndependence.targetCss.sha256 -eq $sourceIndependence.historicalVanilla.sha256 -or $sourceIndependence.targetCss.sha256 -eq $sourceIndependence.reference.sha256) {
    throw 'Target CSS is byte-identical to an existing CSS source.'
  }
  New-Item -ItemType Directory -Path $output -Force | Out-Null
  $sourceIndependence | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $output 'source-independence.json') -Encoding utf8

  node $cli snapshot $reference --out $baseline
  Require-Exit 0 'Gate Reference snapshot'

  Push-Location $target
  try {
    npm ci --no-audit --no-fund
    Require-Exit 0 'Target npm ci'
    npm run build
    Require-Exit 0 'Target build'
  }
  finally {
    Pop-Location
  }

  node $cli snapshot $targetDist --out (Join-Path $output 'target.snapshot.json')
  Require-Exit 0 'Target initial snapshot'

  node $cli verify $targetDist --baseline $baseline --scenario-overrides $scenarioOverrides --out (Join-Path $output 'target.report.json') --artifacts (Join-Path $output 'target')
  Require-Exit 0 'Target verification'

  $targetSnapshot = Get-Content -Raw -LiteralPath (Join-Path $output 'target.snapshot.json') | ConvertFrom-Json -Depth 100
  if (@($targetSnapshot.initial.elements.PSObject.Properties).Count -ne 27) { throw 'Target initial snapshot does not expose all 27 stable keys.' }
  if ($targetSnapshot.initial.duplicateKeys.Count -ne 0) { throw 'Target initial snapshot contains duplicate stable keys.' }
  if ($targetSnapshot.initial.accessibilityIssues.Count -ne 0) { throw 'Target initial snapshot contains bounded accessibility issues.' }
  if (@($targetSnapshot.initial.accessibilityTree.unnamedInteractive.PSObject.Properties).Count -ne 0) { throw 'Target initial snapshot contains unnamed accessibility-tree controls.' }
  if ($targetSnapshot.initial.observationBoundary.excludedHarnessRoots -ne 0 -or $targetSnapshot.initial.observationBoundary.axExcludedHarnessRoots -ne 0) { throw 'Target contains a Reference scenario harness.' }

  $targetReport = Get-Content -Raw -LiteralPath (Join-Path $output 'target.report.json') | ConvertFrom-Json -Depth 100
  if ($targetReport.status -ne 'pass' -or $targetReport.summary.errorCount -ne 0) { throw 'Target report is not a zero-error pass.' }
  if ($targetReport.console.errorCount -ne 0) { throw 'Target report contains console or uncaught errors.' }
  if ($targetReport.network.externalRequests.Count -ne 0 -or $targetReport.network.failedRequestCount -ne 0) { throw 'Target report contains external or failed requests.' }
  if ($targetReport.contract.scenarios.Count -ne 11 -or @($targetReport.contract.scenarios.steps).Count -ne 19) { throw 'Target did not replay the complete current Reference contract.' }
  $relationshipKeys = @('navigation-toggle', 'user-menu-toggle', 'navigation-parent', 'filter-toggle')
  foreach ($key in $relationshipKeys) {
    if (@($targetSnapshot.initial.elements.$key.relationships.controls).Count -ne 1) { throw "Target $key did not expose one controlled stable-key relationship." }
  }

  $negativeRoot = Join-Path $env:TEMP "poc017-transfer-style-negative-$([guid]::NewGuid().ToString('N'))"
  try {
    Copy-Item -LiteralPath $targetDist -Destination $negativeRoot -Recurse
    $negativeCss = Get-ChildItem -LiteralPath (Join-Path $negativeRoot 'assets') -File -Filter '*.css'
    if ($negativeCss.Count -ne 1) { throw 'Expected exactly one built Target CSS asset for the style mutation.' }
    [IO.File]::AppendAllText($negativeCss[0].FullName, "`n[data-ref='filter-toggle'] { border-radius: 0 !important; }`n", [Text.Encoding]::UTF8)
    node $cli verify $negativeRoot --baseline $baseline --scenario-overrides $scenarioOverrides --out (Join-Path $output 'style-negative.report.json') --artifacts (Join-Path $output 'style-negative')
    Require-Exit 1 'Independent Target style negative verification'
  }
  finally {
    $resolvedNegative = [IO.Path]::GetFullPath($negativeRoot)
    $safeTempPrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
    if ($resolvedNegative.StartsWith($safeTempPrefix, [StringComparison]::OrdinalIgnoreCase) -and (Split-Path -Leaf $resolvedNegative).StartsWith('poc017-transfer-style-negative-')) {
      Remove-Item -LiteralPath $resolvedNegative -Recurse -Force
    }
  }

  $styleNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'style-negative.report.json') | ConvertFrom-Json -Depth 100
  if ($styleNegative.status -ne 'fail') { throw 'Independent Target style negative unexpectedly passed.' }
  $styleSignatures = @($styleNegative.summary.errorSignatures | ForEach-Object path)
  if ($styleSignatures -notcontains 'elements.filter-toggle.styles.borderRadius') { throw 'Independent Target style negative did not report filter-toggle borderRadius.' }

  & (Join-Path $experiment 'verify.ps1')

  Require-ReferenceHash 'after the gate'

  Write-Host 'Reference transferability gate passed.'
  Write-Host "Approved Reference SHA-256: $expectedReferenceHash"
  Write-Host "Target: $($targetReport.status), errors=$($targetReport.summary.errorCount), diagnostics=$($targetReport.summary.diagnosticCount)"
  Write-Host "Style negative: $($styleNegative.status), signatures=$($styleNegative.summary.uniqueErrorCount)"
  Write-Host "Independent Target selectors: $($targetSelectors.Count); shared exact selectors with Reference=$($sharedWithReference.Count), historical vanilla=$($sharedWithVanilla.Count)"
}
finally {
  Pop-Location
}
