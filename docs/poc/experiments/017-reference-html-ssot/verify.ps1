$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$output = Join-Path $experiment 'output'
$react = Join-Path $experiment 'consumers/react'

function Require-Exit([int]$Expected, [string]$Label) {
  if ($LASTEXITCODE -ne $Expected) {
    throw "$Label exited with $LASTEXITCODE; expected $Expected."
  }
}

function Require-ResultVisibility($State, [bool]$Initial, [bool]$Results, [bool]$Empty, [bool]$Pagination, [string]$Label) {
  $actual = @(
    [bool]$State.elements.'result-initial'.visible,
    [bool]$State.elements.'result-table'.visible,
    [bool]$State.elements.'result-empty'.visible,
    [bool]$State.elements.'result-pagination'.visible
  )
  $expected = @($Initial, $Results, $Empty, $Pagination)
  if ((Compare-Object $expected $actual -SyncWindow 0)) {
    throw "$Label has unexpected result-region visibility: $($actual -join ', ')."
  }
}

Push-Location $experiment
try {
  node --check $cli
  Require-Exit 0 'CLI syntax check'
  node --check (Join-Path $experiment 'core/browser-core.js')
  Require-Exit 0 'Core syntax check'

  $external = rg -n 'https?://|@import\s+url|<script[^>]+src=["'']https?://' 'reference/index.html'
  if ($LASTEXITCODE -eq 0) { throw "Reference contains an external runtime reference:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'External-reference scan failed.' }

  $undecidedDetail = rg -n '<dialog|detail-dialog|dialog-close|showModal\(|Approve access|Request changes' 'reference/index.html'
  if ($LASTEXITCODE -eq 0) { throw "Reference contains an undecided detail interaction:`n$undecidedDetail" }
  if ($LASTEXITCODE -gt 1) { throw 'Undecided-detail scan failed.' }

  $trailing = rg -n --pcre2 '[ \t]+$' . --glob '!output/**' --glob '!consumers/react/node_modules/**' --glob '!consumers/react/dist/**'
  if ($LASTEXITCODE -eq 0) { throw "PoC source contains trailing whitespace:`n$trailing" }
  if ($LASTEXITCODE -gt 1) { throw 'Whitespace scan failed.' }

  $markdownFiles = Get-ChildItem -LiteralPath $experiment -Recurse -File -Filter '*.md' |
    Where-Object { $_.FullName -notmatch '[\\/](?:node_modules|dist|output)[\\/]' }
  foreach ($markdown in $markdownFiles) {
    $content = Get-Content -Raw -LiteralPath $markdown.FullName
    foreach ($match in [regex]::Matches($content, '\[[^\]]*\]\(([^)]+)\)')) {
      $target = $match.Groups[1].Value.Trim('<>')
      if ($target -match '^(?:https?:|mailto:|#)') { continue }
      $pathOnly = ($target -split '#', 2)[0]
      if (-not $pathOnly) { continue }
      $resolved = Join-Path $markdown.DirectoryName $pathOnly
      if (-not (Test-Path -LiteralPath $resolved)) {
        throw "Broken Markdown link in $($markdown.FullName): $target"
      }
    }
  }

  Push-Location $react
  try {
    npm ci --no-audit --no-fund
    Require-Exit 0 'React npm ci'
    npm run build
    Require-Exit 0 'React build'
  }
  finally {
    Pop-Location
  }

  node $cli snapshot 'reference/index.html' --out 'output/human-review/reference.snapshot.json' --artifacts 'output/human-review/reference'
  Require-Exit 0 'Human-review Reference snapshot'
  node $cli snapshot 'reference/index.html' --out 'output/human-review/reference.repeat.snapshot.json' --artifacts 'output/human-review/reference-repeat'
  Require-Exit 0 'Human-review Reference repeat snapshot'

  $firstHash = (Get-FileHash 'output/human-review/reference.snapshot.json' -Algorithm SHA256).Hash
  $secondHash = (Get-FileHash 'output/human-review/reference.repeat.snapshot.json' -Algorithm SHA256).Hash
  if ($firstHash -ne $secondHash) { throw 'Repeated Reference snapshots are not byte-identical.' }
  $firstImageHash = (Get-FileHash 'output/human-review/reference/00-initial.png' -Algorithm SHA256).Hash
  $secondImageHash = (Get-FileHash 'output/human-review/reference-repeat/00-initial.png' -Algorithm SHA256).Hash
  if ($firstImageHash -ne $secondImageHash) { throw 'Repeated initial screenshots are not byte-identical.' }
  Remove-Item -LiteralPath 'output/human-review/reference.repeat.snapshot.json' -Force
  Remove-Item -LiteralPath 'output/human-review/reference-repeat' -Recurse -Force

  node $cli verify 'consumers/negative/index.html' --root 'consumers' --baseline 'output/reference.snapshot.json' --out 'output/human-review/negative.report.json' --artifacts 'output/human-review/negative'
  Require-Exit 1 'Negative verification'

  node $cli snapshot 'iterations/01-semantic-only/reference.html' --out 'output/human-review/semantic-reference.snapshot.json'
  Require-Exit 0 'Semantic-only snapshot'
  node $cli verify 'iterations/01-semantic-only/consumer.html' --baseline 'output/human-review/semantic-reference.snapshot.json' --out 'output/human-review/semantic-consumer.report.json'
  Require-Exit 1 'Semantic-only cross-content verification'

  $reference = Get-Content -Raw 'output/human-review/reference.snapshot.json' | ConvertFrom-Json -Depth 100
  if ($reference.initial.mode -ne 'explicit-data-ref') { throw 'Reference did not use explicit stable keys.' }
  if ($reference.initial.duplicateKeys.Count -ne 0) { throw 'Reference contains duplicate stable keys.' }
  if ($reference.initial.accessibilityIssues.Count -ne 0) { throw 'Reference contains bounded accessibility issues.' }
  if ($reference.network.externalRequests.Count -ne 0) { throw 'Reference made external requests.' }
  if ($reference.network.failedRequestCount -ne 0) { throw 'Reference has failed network requests.' }
  if ($reference.console.errorCount -ne 0) { throw 'Reference has console or uncaught errors.' }
  if ($reference.scenarios.Count -ne 11) { throw 'Human-review Reference must expose 11 product interaction scenarios.' }
  if ($reference.initial.observationBoundary.excludedHarnessRoots -ne 1) { throw 'Core did not identify exactly one Reference harness root.' }
  if ($reference.initial.observationBoundary.axExcludedHarnessRoots -ne 1) { throw 'CLI did not exclude exactly one Reference harness root from the accessibility tree.' }
  if ($reference.initial.observationBoundary.axExcludedNodeCount -le 0) { throw 'Hiding the Reference harness did not reduce the observed accessibility tree.' }
  Require-ResultVisibility $reference.initial $true $false $false $false 'Initial state'
  $initialKeys = @($reference.initial.elements.PSObject.Properties.Name | Sort-Object)
  $referenceStates = @($reference.initial)
  foreach ($scenario in $reference.scenarios) {
    if (@($scenario.loadConsoleErrors).Count -ne 0) { throw "Reference scenario $($scenario.name) has a load console error." }
    foreach ($step in $scenario.steps) {
      if ($step.actionError) { throw "Reference scenario $($scenario.name) has action error: $($step.actionError)" }
      if (@($step.consoleErrors).Count -ne 0) { throw "Reference scenario $($scenario.name) has a step console error." }
      $referenceStates += $step.state
    }
  }
  foreach ($state in $referenceStates) {
    if ($state.duplicateKeys.Count -ne 0) { throw 'A Reference state contains duplicate stable keys.' }
    if ($state.accessibilityIssues.Count -ne 0) { throw 'A Reference state contains bounded accessibility issues.' }
    if (@($state.accessibilityTree.unnamedInteractive.PSObject.Properties).Count -ne 0) { throw 'A Reference state contains an unnamed accessibility-tree control.' }
    if ((Compare-Object $initialKeys @($state.elements.PSObject.Properties.Name | Sort-Object))) { throw 'A Reference state changed the stable-key inventory.' }
    if ($state.observationBoundary.excludedHarnessRoots -ne 1 -or $state.observationBoundary.axExcludedHarnessRoots -ne 1 -or $state.observationBoundary.axExcludedNodeCount -le 0) { throw 'A Reference state included the harness in product observation.' }
  }

  $resultsScenario = $reference.scenarios | Where-Object name -eq 'search results'
  $emptyScenario = $reference.scenarios | Where-Object name -eq 'search empty'
  $clearScenario = $reference.scenarios | Where-Object name -eq 'search clear to initial'
  $userMenuScenario = $reference.scenarios | Where-Object name -eq 'user menu escape'
  if (-not $resultsScenario -or -not $emptyScenario -or -not $clearScenario -or -not $userMenuScenario) { throw 'A required human-review scenario is missing.' }
  Require-ResultVisibility $resultsScenario.steps[-1].state $false $true $false $true 'Results state'
  Require-ResultVisibility $emptyScenario.steps[-1].state $false $false $true $false 'Empty state'
  Require-ResultVisibility $clearScenario.steps[-1].state $true $false $false $false 'Clear-to-Initial state'
  if ($userMenuScenario.steps[-1].state.document.activeRef -ne 'user-menu-toggle') { throw 'User menu Escape did not restore focus.' }

  $frozenReference = Get-Content -Raw 'output/reference.snapshot.json' | ConvertFrom-Json -Depth 100
  $vanilla = Get-Content -Raw 'output/vanilla.report.json' | ConvertFrom-Json -Depth 100
  $reactReport = Get-Content -Raw 'output/react.report.json' | ConvertFrom-Json -Depth 100
  $negative = Get-Content -Raw 'output/human-review/negative.report.json' | ConvertFrom-Json -Depth 100
  $semantic = Get-Content -Raw 'output/human-review/semantic-consumer.report.json' | ConvertFrom-Json -Depth 100

  if ($vanilla.status -ne 'pass' -or $reactReport.status -ne 'pass') { throw 'A positive consumer report is not pass.' }
  if ($frozenReference.scenarios.Count -ne 4) { throw 'Frozen transfer baseline was unexpectedly changed.' }
  if ($vanilla.baseline.digest -ne $frozenReference.source.digest -or $reactReport.baseline.digest -ne $frozenReference.source.digest) { throw 'A frozen positive report no longer points to the frozen Reference baseline.' }
  if ($negative.status -ne 'fail') { throw 'Negative consumer was not rejected.' }
  if ($semantic.status -ne 'fail') { throw 'Semantic-only cross-content match unexpectedly passed.' }

  $signaturePaths = @($negative.summary.errorSignatures | ForEach-Object path)
  foreach ($required in @(
    'elements.filter-toggle.styles.borderRadius',
    'accessibility.unnamed-interactive',
    'elements.detail-dialog.visible'
  )) {
    if ($signaturePaths -notcontains $required) { throw "Negative report did not contain $required." }
  }

  Write-Host 'Reference HTML SSOT PoC verification passed.'
  Write-Host "Human-review Reference snapshot SHA-256: $firstHash"
  Write-Host "Human-review Reference initial PNG SHA-256: $firstImageHash"
  Write-Host "Frozen transfer evidence: vanilla=$($vanilla.status), react=$($reactReport.status)"
  Write-Host "Expected rejections: negative=$($negative.status), semantic-only=$($semantic.status)"
}
finally {
  Pop-Location
}
