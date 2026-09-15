$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$variant = Join-Path $experiment 'variants/04-partial-reference'
$shellReference = Join-Path $variant 'references/common-shell.html'
$workspaceReference = Join-Path $variant 'references/search-workspace.html'
$target = Join-Path $variant 'target/index.html'
$h1Probe = Join-Path $variant 'probes/whole-page-missing-h1.html'
$output = Join-Path $experiment 'output/partial-reference'
$browser = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

$acceptedReferenceHash = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
$coreHash = '14BB52C2C60B9DA9A27B7593C772B09E18A2DA2A79AD7C129827330C0D4077EA'
$cliHash = '7109A169EB8F6EA7C1483B2C14C8A9711560667ECD80DFDCCCC19380E38A8837'
$fixedTransferEvidenceDigest = '96457B6FFEEFC5BABFD15FF97DDF781A740C919A04266DD7D769DA438129EFFF'
$fixedMixedEvidenceDigest = '819FBCD6FA157E033E72A3E45FF7ACD5A9CDA51C7DC5730066CB357643010658'
$fixedRelationalEvidenceDigest = '6FB20902AC306081B66B0170E99DF1DE786A7FA16E66380EE264A62BC24ED17E'
$env:REFERENCE_UI_DEBUG = '1'
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

function Get-FixedRelationalEvidenceDigest() {
  $fixed = @()
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'output/relational-reuse')
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'variants/03-relational-reuse')
  $fixed += Get-Item @(
    (Join-Path $experiment 'relational-reuse-plan.md'),
    (Join-Path $experiment 'relational-reuse-result.md'),
    (Join-Path $experiment 'relational-reuse-verification-record.md'),
    (Join-Path $experiment 'relational-reuse-cost-record.md'),
    (Join-Path $experiment 'relational-reuse-screen-review.md'),
    (Join-Path $experiment 'relational-reuse-self-review.md'),
    (Join-Path $experiment 'verify-relational-reuse.ps1')
  )
  return Get-PacketDigest $fixed
}

function Require-FixedInputs([string]$When) {
  Require-Hash $acceptedReference $acceptedReferenceHash "Accepted Reference $When"
  Require-Hash $core $coreHash "Bounded partial-aware Core $When"
  Require-Hash $cli $cliHash "CLI $When"
  $transferDigest = Get-FixedTransferEvidenceDigest
  if ($transferDigest -ne $fixedTransferEvidenceDigest) { throw "Transferability evidence changed $When." }
  $mixedDigest = Get-FixedMixedEvidenceDigest
  if ($mixedDigest -ne $fixedMixedEvidenceDigest) { throw "Mixed evidence changed $When." }
  $relationalDigest = Get-FixedRelationalEvidenceDigest
  if ($relationalDigest -ne $fixedRelationalEvidenceDigest) { throw "Relational evidence changed $When." }
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

function Require-BundleHealth($Bundle, [string]$Label, [int]$HarnessRoots) {
  if (@($Bundle.network.externalRequests).Count -ne 0 -or $Bundle.network.failedRequestCount -ne 0) {
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
    if (@($state.duplicateKeys).Count -ne 0) { throw "$Label contains duplicate observation keys." }
    if (@($state.semanticAmbiguities).Count -ne 0) { throw "$Label contains ambiguous semantic keys." }
    if (@($state.accessibilityIssues).Count -ne 0) { throw "$Label contains bounded accessibility issues." }
    if (@($state.accessibilityTree.unnamedInteractive.PSObject.Properties).Count -ne 0) {
      throw "$Label contains unnamed accessibility-tree controls."
    }
    if ($state.observationBoundary.excludedHarnessRoots -ne $HarnessRoots -or
        $state.observationBoundary.axExcludedHarnessRoots -ne $HarnessRoots) {
      throw "$Label has an unexpected harness boundary."
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

function Get-CssDeclarations([string]$Html) {
  $style = [regex]::Match($Html, '(?s)<style>(.*?)</style>').Groups[1].Value
  return @([regex]::Matches($style, '(?m)(--[\w-]+|[a-zA-Z-]+)\s*:\s*([^;{}]+);') |
    ForEach-Object { ("$($_.Groups[1].Value):$($_.Groups[2].Value)" -replace '\s+', ' ').Trim() } |
    Sort-Object -Unique)
}

function Get-ScriptLines([string]$Html) {
  $matches = [regex]::Matches($Html, '(?s)<script>(.*?)</script>')
  if ($matches.Count -eq 0) { return @() }
  return @($matches[$matches.Count - 1].Groups[1].Value -split "`r?`n" |
    ForEach-Object { $_.Trim() } |
    Where-Object { $_ -and $_ -notin @('{', '}', '})();') } |
    Sort-Object -Unique)
}

function Get-HtmlLines([string]$Html) {
  $withoutStyle = [regex]::Replace($Html, '(?s)<style>.*?</style>', '')
  $withoutScripts = [regex]::Replace($withoutStyle, '(?s)<script.*?</script>', '')
  return @($withoutScripts -split "`r?`n" |
    ForEach-Object { $_.Trim() } |
    Where-Object { $_ } |
    Sort-Object -Unique)
}

function Get-StyleHash([string]$Html) {
  $style = [regex]::Match($Html, '(?s)<style>(.*?)</style>').Groups[1].Value
  return [Convert]::ToHexString(
    [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($style))
  )
}

function Count-ScenarioActions($Bundle) {
  $count = 0
  foreach ($scenario in $Bundle.scenarios) { $count += $scenario.steps.Count }
  return $count
}

function Invoke-PartialStyleNegative([string]$Baseline, [string]$ReportPath) {
  $probeRoot = Join-Path $env:TEMP "poc017-partial-style-negative-$([guid]::NewGuid().ToString('N'))"
  try {
    New-Item -ItemType Directory -Path $probeRoot | Out-Null
    $probe = Join-Path $probeRoot 'index.html'
    Copy-Item -LiteralPath $target -Destination $probe
    $text = Get-Content -Raw -LiteralPath $probe
    $pattern = '(?s)(\.outline-action\s*\{.*?border-radius:\s*)6px;'
    if ([regex]::Matches($text, $pattern).Count -ne 1) { throw 'Partial style-negative probe target is not unique.' }
    $mutated = [regex]::Replace($text, $pattern, '${1}20px;')
    [IO.File]::WriteAllText($probe, $mutated, [Text.Encoding]::UTF8)
    Invoke-ReferenceUi -CliArguments @('verify', $probe, '--baseline', $Baseline, '--out', $ReportPath) -Expected 1 -Label 'Partial style negative'
  }
  finally {
    $resolvedProbe = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
    if ($resolvedProbe.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -and
        (Split-Path -Leaf $resolvedProbe).StartsWith('poc017-partial-style-negative-')) {
      Remove-Item -LiteralPath $resolvedProbe -Recurse -Force
    }
  }
}

function Run-MaintenanceProbes([string]$OutputPath) {
  $probeRoot = Join-Path $env:TEMP "poc017-partial-maintenance-$([guid]::NewGuid().ToString('N'))"
  try {
    New-Item -ItemType Directory -Path $probeRoot | Out-Null
    $wholeCopy = Join-Path $probeRoot 'whole-reference.html'
    $shellCopy = Join-Path $probeRoot 'common-shell.html'
    $workspaceCopy = Join-Path $probeRoot 'search-workspace.html'
    Copy-Item -LiteralPath $acceptedReference -Destination $wholeCopy
    Copy-Item -LiteralPath $shellReference -Destination $shellCopy
    Copy-Item -LiteralPath $workspaceReference -Destination $workspaceCopy

    $localWholeBefore = (Get-FileHash -LiteralPath $wholeCopy -Algorithm SHA256).Hash
    $localPartialBefore = (Get-FileHash -LiteralPath $workspaceCopy -Algorithm SHA256).Hash
    $wholeText = Get-Content -Raw -LiteralPath $wholeCopy
    $workspaceText = Get-Content -Raw -LiteralPath $workspaceCopy
    $wholeLocalOccurrences = [regex]::Matches($wholeText, [regex]::Escape('No requests found')).Count
    $partialLocalOccurrences = [regex]::Matches($workspaceText, [regex]::Escape('No purchase orders found')).Count
    [IO.File]::WriteAllText($wholeCopy, $wholeText.Replace('No requests found', 'No matching requests'), [Text.Encoding]::UTF8)
    [IO.File]::WriteAllText($workspaceCopy, $workspaceText.Replace('No purchase orders found', 'No matching purchase orders'), [Text.Encoding]::UTF8)
    $local = [ordered]@{
      description = 'Artificial reversible empty-state copy correction'
      whole = [ordered]@{ filesTouched = [int]($localWholeBefore -ne (Get-FileHash -LiteralPath $wholeCopy -Algorithm SHA256).Hash); locations = $wholeLocalOccurrences; reviewLines = (Get-Content -LiteralPath $acceptedReference).Count }
      partial = [ordered]@{ filesTouched = [int]($localPartialBefore -ne (Get-FileHash -LiteralPath $workspaceCopy -Algorithm SHA256).Hash); locations = $partialLocalOccurrences; reviewLines = (Get-Content -LiteralPath $workspaceReference).Count }
    }

    Copy-Item -LiteralPath $acceptedReference -Destination $wholeCopy -Force
    Copy-Item -LiteralPath $shellReference -Destination $shellCopy -Force
    Copy-Item -LiteralPath $workspaceReference -Destination $workspaceCopy -Force
    $wholeText = Get-Content -Raw -LiteralPath $wholeCopy
    $shellText = Get-Content -Raw -LiteralPath $shellCopy
    $workspaceText = Get-Content -Raw -LiteralPath $workspaceCopy
    $wholeCommonOccurrences = [regex]::Matches($wholeText, [regex]::Escape('--focus: #2f7bd0;')).Count
    $shellCommonOccurrences = [regex]::Matches($shellText, [regex]::Escape('--focus: #86b9ee;')).Count
    $workspaceCommonOccurrences = [regex]::Matches($workspaceText, [regex]::Escape('--focus: #86b9ee;')).Count
    [IO.File]::WriteAllText($wholeCopy, $wholeText.Replace('--focus: #2f7bd0;', '--focus: #2e7acf;'), [Text.Encoding]::UTF8)
    [IO.File]::WriteAllText($shellCopy, $shellText.Replace('--focus: #86b9ee;', '--focus: #85b8ed;'), [Text.Encoding]::UTF8)
    [IO.File]::WriteAllText($workspaceCopy, $workspaceText.Replace('--focus: #86b9ee;', '--focus: #85b8ed;'), [Text.Encoding]::UTF8)
    $common = [ordered]@{
      description = 'Artificial reversible shared light-focus token correction'
      whole = [ordered]@{ filesTouched = 1; locations = $wholeCommonOccurrences }
      partial = [ordered]@{ filesTouched = 2; locations = $shellCommonOccurrences + $workspaceCommonOccurrences }
    }

    [ordered]@{ local = $local; common = $common } |
      ConvertTo-Json -Depth 10 |
      Set-Content -LiteralPath $OutputPath -Encoding utf8
  }
  finally {
    $resolvedProbe = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
    if ($resolvedProbe.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -and
        (Split-Path -Leaf $resolvedProbe).StartsWith('poc017-partial-maintenance-')) {
      Remove-Item -LiteralPath $resolvedProbe -Recurse -Force
    }
  }
}

Push-Location $experiment
try {
  Require-FixedInputs 'before the Gate'
  node --check $cli
  Require-Exit 0 'CLI syntax check'
  node --check $core
  Require-Exit 0 'Core syntax check'

  $sourcePaths = @(
    'variants/04-partial-reference/references/common-shell.html',
    'variants/04-partial-reference/references/search-workspace.html',
    'variants/04-partial-reference/target/index.html',
    'variants/04-partial-reference/probes/whole-page-missing-h1.html'
  )
  $external = rg -n --pcre2 'https?://|@import|url\(\s*["'']?https?://|<script[^>]+src=|<link[^>]+href=(?!"data:)' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "Partial experiment contains an external/composed runtime reference:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'External/composition scan failed.' }
  $runtimeCalls = rg -n '\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "Partial experiment contains a network/data-layer API:`n$runtimeCalls" }
  if ($LASTEXITCODE -gt 1) { throw 'Runtime API scan failed.' }

  $targetLeakage = rg -ni 'Control Center|Access review queue|AR-10(?:48|44|41|39)|Operations Desk|Work management|Review queue|Purchase order search|Northstar Parts|Harbor Office|Cedar Packaging|PO-48(?:21|16|09)' 'variants/04-partial-reference/target/index.html'
  if ($LASTEXITCODE -eq 0) { throw "Reference business content leaked into Target:`n$targetLeakage" }
  if ($LASTEXITCODE -gt 1) { throw 'Target leakage scan failed.' }

  $wholeHtml = Get-Content -Raw -LiteralPath $acceptedReference
  $shellHtml = Get-Content -Raw -LiteralPath $shellReference
  $workspaceHtml = Get-Content -Raw -LiteralPath $workspaceReference
  $targetHtml = Get-Content -Raw -LiteralPath $target
  if ($targetHtml -match 'data-reference-harness|data-reference-scenarios|data-reference-state') { throw 'Target contains a Reference harness or scenario contract.' }

  foreach ($partHtml in @($shellHtml, $workspaceHtml)) {
    $sharedClasses = @(Compare-Object (Get-ClassTokens $partHtml) (Get-ClassTokens $targetHtml) -IncludeEqual |
      Where-Object SideIndicator -eq '==')
    $sharedIds = @(Compare-Object (Get-LocalIds $partHtml) (Get-LocalIds $targetHtml) -IncludeEqual |
      Where-Object SideIndicator -eq '==')
    if ($sharedClasses.Count -ne 0) { throw 'A partial Reference shares class tokens with Target.' }
    if ($sharedIds.Count -ne 0) { throw 'A partial Reference shares local IDs with Target.' }
    if ((Get-StyleHash $partHtml) -eq (Get-StyleHash $targetHtml)) { throw 'A partial Reference shares an identical style source with Target.' }
  }

  New-Item -ItemType Directory -Path $output -Force | Out-Null
  Invoke-ReferenceUi -CliArguments @('snapshot', $shellReference, '--out', (Join-Path $output 'common-shell.snapshot.json'), '--artifacts', (Join-Path $output 'common-shell')) -Expected 0 -Label 'Common shell snapshot'
  Invoke-ReferenceUi -CliArguments @('snapshot', $shellReference, '--out', (Join-Path $output 'common-shell.repeat.snapshot.json'), '--artifacts', (Join-Path $output 'common-shell-repeat')) -Expected 0 -Label 'Common shell repeat snapshot'
  Invoke-ReferenceUi -CliArguments @('snapshot', $workspaceReference, '--out', (Join-Path $output 'search-workspace.snapshot.json'), '--artifacts', (Join-Path $output 'search-workspace')) -Expected 0 -Label 'Search workspace snapshot'
  Invoke-ReferenceUi -CliArguments @('snapshot', $workspaceReference, '--out', (Join-Path $output 'search-workspace.repeat.snapshot.json'), '--artifacts', (Join-Path $output 'search-workspace-repeat')) -Expected 0 -Label 'Search workspace repeat snapshot'
  if ((Get-FileHash -LiteralPath (Join-Path $output 'common-shell.snapshot.json') -Algorithm SHA256).Hash -ne
      (Get-FileHash -LiteralPath (Join-Path $output 'common-shell.repeat.snapshot.json') -Algorithm SHA256).Hash) {
    throw 'Common shell capture is not deterministic.'
  }
  if ((Get-FileHash -LiteralPath (Join-Path $output 'search-workspace.snapshot.json') -Algorithm SHA256).Hash -ne
      (Get-FileHash -LiteralPath (Join-Path $output 'search-workspace.repeat.snapshot.json') -Algorithm SHA256).Hash) {
    throw 'Search workspace capture is not deterministic.'
  }

  Invoke-ReferenceUi -CliArguments @('snapshot', $target, '--out', (Join-Path $output 'target.snapshot.json'), '--artifacts', (Join-Path $output 'target-snapshot')) -Expected 0 -Label 'Integrated Target snapshot'
  Invoke-ReferenceUi -CliArguments @('verify', $target, '--baseline', (Join-Path $output 'common-shell.snapshot.json'), '--out', (Join-Path $output 'target-shell.report.json'), '--artifacts', (Join-Path $output 'target-shell')) -Expected 0 -Label 'Target against shell'
  Invoke-ReferenceUi -CliArguments @('verify', $target, '--baseline', (Join-Path $output 'search-workspace.snapshot.json'), '--out', (Join-Path $output 'target-workspace.report.json'), '--artifacts', (Join-Path $output 'target-workspace')) -Expected 0 -Label 'Target against workspace'
  Invoke-ReferenceUi -CliArguments @('snapshot', $h1Probe, '--out', (Join-Path $output 'whole-page-missing-h1.snapshot.json')) -Expected 0 -Label 'Whole-page missing-h1 probe'
  Invoke-ReferenceUi -CliArguments @('snapshot', $acceptedReference, '--out', (Join-Path $output 'accepted-reference-regression.snapshot.json')) -Expected 0 -Label 'Accepted Reference regression'
  Invoke-ReferenceUi -CliArguments @('verify', 'consumers/negative/index.html', '--root', 'consumers', '--baseline', 'output/reference.snapshot.json', '--out', (Join-Path $output 'historical-negative.report.json')) -Expected 1 -Label 'Historical negative regression'
  Invoke-ReferenceUi -CliArguments @('snapshot', 'iterations/01-semantic-only/reference.html', '--out', (Join-Path $output 'semantic-only-reference.snapshot.json')) -Expected 0 -Label 'Semantic-only Reference regression'
  Invoke-ReferenceUi -CliArguments @('verify', 'iterations/01-semantic-only/consumer.html', '--baseline', (Join-Path $output 'semantic-only-reference.snapshot.json'), '--out', (Join-Path $output 'semantic-only-consumer.report.json')) -Expected 1 -Label 'Semantic-only negative regression'
  Invoke-PartialStyleNegative (Join-Path $output 'search-workspace.snapshot.json') (Join-Path $output 'partial-style-negative.report.json')

  $shell = Get-Content -Raw -LiteralPath (Join-Path $output 'common-shell.snapshot.json') | ConvertFrom-Json -Depth 100
  $workspace = Get-Content -Raw -LiteralPath (Join-Path $output 'search-workspace.snapshot.json') | ConvertFrom-Json -Depth 100
  $targetSnapshot = Get-Content -Raw -LiteralPath (Join-Path $output 'target.snapshot.json') | ConvertFrom-Json -Depth 100
  $shellReport = Get-Content -Raw -LiteralPath (Join-Path $output 'target-shell.report.json') | ConvertFrom-Json -Depth 100
  $workspaceReport = Get-Content -Raw -LiteralPath (Join-Path $output 'target-workspace.report.json') | ConvertFrom-Json -Depth 100
  $h1 = Get-Content -Raw -LiteralPath (Join-Path $output 'whole-page-missing-h1.snapshot.json') | ConvertFrom-Json -Depth 100
  $accepted = Get-Content -Raw -LiteralPath (Join-Path $output 'accepted-reference-regression.snapshot.json') | ConvertFrom-Json -Depth 100

  $shellKeys = @(
    'navigation-current', 'navigation-empty', 'navigation-filter', 'navigation-parent',
    'navigation-secondary', 'navigation-toggle',
    'semantic:controlled-by:navigation-parent', 'semantic:controlled-by:navigation-toggle',
    'semantic:controlled-by:user-menu-toggle', 'semantic:role:banner',
    'sign-out-action', 'theme-toggle', 'user-menu-toggle'
  ) | Sort-Object
  $workspaceKeys = @(
    'clear-action', 'create-action', 'filter-actions', 'filter-toggle', 'query-filter',
    'result-empty', 'result-initial', 'result-pagination', 'result-summary',
    'result-table', 'search-action', 'semantic:controlled-by:filter-toggle',
    'semantic:role:main', 'status-badge'
  ) | Sort-Object
  $actualShellKeys = @($shell.initial.elements.PSObject.Properties.Name | Sort-Object)
  $actualWorkspaceKeys = @($workspace.initial.elements.PSObject.Properties.Name | Sort-Object)
  $actualTargetKeys = @($targetSnapshot.initial.elements.PSObject.Properties.Name | Sort-Object)
  $unionKeys = @($shellKeys + $workspaceKeys | Sort-Object -Unique)
  if (Compare-Object $shellKeys $actualShellKeys -SyncWindow 0) { throw 'Unexpected common-shell key inventory.' }
  if (Compare-Object $workspaceKeys $actualWorkspaceKeys -SyncWindow 0) { throw 'Unexpected search-workspace key inventory.' }
  if (Compare-Object $unionKeys $actualTargetKeys -SyncWindow 0) { throw 'Integrated Target does not expose the exact union of both partial contracts.' }
  if (@(Compare-Object $shellKeys $workspaceKeys -IncludeEqual | Where-Object SideIndicator -eq '==').Count -ne 0) { throw 'Partial contracts unexpectedly share observation keys.' }

  Require-BundleHealth $shell 'Common shell' 1
  Require-BundleHealth $workspace 'Search workspace' 1
  Require-BundleHealth $targetSnapshot 'Integrated Target snapshot' 0
  if ($shell.scenarios.Count -ne 6 -or (Count-ScenarioActions $shell) -ne 12) { throw 'Common shell scenario contract changed.' }
  if ($workspace.scenarios.Count -ne 5 -or (Count-ScenarioActions $workspace) -ne 9) { throw 'Search workspace scenario contract changed.' }
  foreach ($report in @($shellReport, $workspaceReport)) {
    if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0) { throw 'A partial-to-Target verification failed.' }
    if ($report.console.errorCount -ne 0 -or @($report.network.externalRequests).Count -ne 0 -or $report.network.failedRequestCount -ne 0) {
      throw 'A partial-to-Target report contains console or network errors.'
    }
  }

  $resultsState = $workspace.scenarios[0].steps[0].state
  $emptyState = $workspace.scenarios[1].steps[1].state
  $clearedState = $workspace.scenarios[2].steps[1].state
  if (-not $resultsState.elements.'result-table'.visible -or -not $resultsState.elements.'result-pagination'.visible) { throw 'Results state is incomplete.' }
  if (-not $emptyState.elements.'result-empty'.visible -or $emptyState.elements.'result-table'.visible) { throw 'Empty state is incomplete.' }
  if (-not $clearedState.elements.'result-initial'.visible -or $clearedState.elements.'result-table'.visible) { throw 'Clear did not restore Initial.' }
  $menuOpen = $shell.scenarios[5].steps[0].state
  $menuClosed = $shell.scenarios[5].steps[1].state
  if ($menuOpen.document.activeRef -ne 'sign-out-action' -or $menuClosed.document.activeRef -ne 'user-menu-toggle') { throw 'Shell user-menu focus behavior changed.' }

  $h1Issues = @($h1.initial.accessibilityIssues)
  if ($h1Issues.Count -ne 1 -or $h1Issues[0].code -ne 'unexpected-h1-count') { throw 'Full-page missing-h1 probe did not preserve the bounded issue.' }
  if ($accepted.initial.mode -ne 'explicit-data-ref' -or @($accepted.initial.elements.PSObject.Properties).Count -ne 27 -or $accepted.scenarios.Count -ne 11) {
    throw 'Accepted Reference regression changed.'
  }
  Require-BundleHealth $accepted 'Accepted Reference regression' 1

  $historicalNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'historical-negative.report.json') | ConvertFrom-Json -Depth 100
  $semanticNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'semantic-only-consumer.report.json') | ConvertFrom-Json -Depth 100
  $partialStyleNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'partial-style-negative.report.json') | ConvertFrom-Json -Depth 100
  $storedStyleNegative = Get-Content -Raw -LiteralPath (Join-Path $experiment 'output/mixed-semantic/style-negative.report.json') | ConvertFrom-Json -Depth 100
  if ($historicalNegative.status -ne 'fail' -or $historicalNegative.summary.uniqueErrorCount -ne 15) { throw 'Historical negative signature coverage changed.' }
  if ($semanticNegative.status -ne 'fail' -or @($semanticNegative.summary.errorSignatures.path) -notcontains 'semanticInventory.combobox') { throw 'Semantic-only negative coverage changed.' }
  if ($partialStyleNegative.status -ne 'fail' -or @($partialStyleNegative.summary.errorSignatures.path) -notcontains 'elements.filter-toggle.styles.borderRadius') { throw 'Partial style-negative coverage changed.' }
  if ($storedStyleNegative.status -ne 'fail' -or @($storedStyleNegative.summary.errorSignatures.path) -notcontains 'elements.filter-toggle.styles.borderRadius') { throw 'Stored style-negative evidence changed.' }

  $shellExtra = @($shellReport.differences | Where-Object { $_.severity -eq 'info' -and $_.actual -eq 'extra annotated element' }).Count
  $shellGeometry = @($shellReport.differences | Where-Object { $_.severity -eq 'info' -and $_.path -match '\.box\.' }).Count
  $workspaceExtra = @($workspaceReport.differences | Where-Object { $_.severity -eq 'info' -and $_.actual -eq 'extra annotated element' }).Count
  $workspaceGeometry = @($workspaceReport.differences | Where-Object { $_.severity -eq 'info' -and $_.path -match '\.box\.' }).Count
  if ($shellExtra + $shellGeometry -ne $shellReport.summary.diagnosticCount -or
      $workspaceExtra + $workspaceGeometry -ne $workspaceReport.summary.diagnosticCount) {
    throw 'Partial diagnostic classification contains an unexpected category.'
  }
  [ordered]@{
    shell = [ordered]@{ extraElements = $shellExtra; geometry = $shellGeometry; total = $shellReport.summary.diagnosticCount }
    workspace = [ordered]@{ extraElements = $workspaceExtra; geometry = $workspaceGeometry; total = $workspaceReport.summary.diagnosticCount }
  } | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $output 'diagnostic-summary.json') -Encoding utf8

  $shellCss = Get-CssDeclarations $shellHtml
  $workspaceCss = Get-CssDeclarations $workspaceHtml
  $sharedCss = @(Compare-Object $shellCss $workspaceCss -IncludeEqual | Where-Object SideIndicator -eq '==' | ForEach-Object InputObject)
  $sharedTokens = @($sharedCss | Where-Object { $_ -like '--*' })
  $shellJs = Get-ScriptLines $shellHtml
  $workspaceJs = Get-ScriptLines $workspaceHtml
  $sharedJs = @(Compare-Object $shellJs $workspaceJs -IncludeEqual | Where-Object SideIndicator -eq '==')
  $shellMarkup = Get-HtmlLines $shellHtml
  $workspaceMarkup = Get-HtmlLines $workspaceHtml
  $sharedMarkup = @(Compare-Object $shellMarkup $workspaceMarkup -IncludeEqual | Where-Object SideIndicator -eq '==')
  $wholeLines = (Get-Content -LiteralPath $acceptedReference).Count
  $shellLines = (Get-Content -LiteralPath $shellReference).Count
  $workspaceLines = (Get-Content -LiteralPath $workspaceReference).Count
  $wholeBytes = (Get-Item -LiteralPath $acceptedReference).Length
  $shellBytes = (Get-Item -LiteralPath $shellReference).Length
  $workspaceBytes = (Get-Item -LiteralPath $workspaceReference).Length
  $sourceMetrics = [ordered]@{
    wholeReference = [ordered]@{
      files = 1; lines = $wholeLines; bytes = $wholeBytes
      dataRefAttributes = [regex]::Matches($wholeHtml, '<[^>]+\bdata-ref\s*=').Count
      scenarios = 11; actions = 19; harnessRoots = 1
    }
    partialReferences = [ordered]@{
      files = 2; lines = $shellLines + $workspaceLines; bytes = $shellBytes + $workspaceBytes
      lineChangePercent = [Math]::Round((($shellLines + $workspaceLines - $wholeLines) / $wholeLines) * 100, 1)
      byteChangePercent = [Math]::Round((($shellBytes + $workspaceBytes - $wholeBytes) / $wholeBytes) * 100, 1)
      dataRefAttributes = [regex]::Matches($shellHtml + $workspaceHtml, '<[^>]+\bdata-ref\s*=').Count
      semanticObservations = 6; totalObservations = 27
      scenarios = 11; actions = 21; harnessRoots = 2
      commonShellLines = $shellLines; searchWorkspaceLines = $workspaceLines
    }
    duplication = [ordered]@{
      uniqueCssDeclarations = [ordered]@{ commonShell = $shellCss.Count; searchWorkspace = $workspaceCss.Count; shared = $sharedCss.Count; sharedDesignTokens = $sharedTokens.Count }
      uniqueJavaScriptLines = [ordered]@{ commonShell = $shellJs.Count; searchWorkspace = $workspaceJs.Count; shared = $sharedJs.Count }
      uniqueMarkupLines = [ordered]@{ commonShell = $shellMarkup.Count; searchWorkspace = $workspaceMarkup.Count; shared = $sharedMarkup.Count }
    }
    target = [ordered]@{
      files = 1; lines = (Get-Content -LiteralPath $target).Count; bytes = (Get-Item -LiteralPath $target).Length
      explicitKeys = 21; semanticKeys = 6; totalObservations = 27
      sharedClassTokens = 0; sharedLocalIds = 0; scenarioHarnessRoots = 0
    }
    core = [ordered]@{
      preExperimentSha256 = 'D382601184DED6D351D2BBF5B6213013791AD4A59E0E9DB853B9E68754B59A76'
      postExperimentSha256 = $coreHash
      addedConditions = 1
      purpose = 'Apply whole-document h1 count only when an observed product main exists.'
    }
  }
  $sourceMetrics | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'source-metrics.json') -Encoding utf8

  Run-MaintenanceProbes (Join-Path $output 'maintenance-probes.json')

  [ordered]@{
    browser = $browser
    gateAttempts = $script:harnessAttempts
    gateTimeouts = $script:harnessTimeouts
    gateRetries = $script:harnessRetries
    events = $script:harnessEvents
    note = 'Development-phase attempts are recorded separately in the verification record.'
  } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'harness-reliability.json') -Encoding utf8

  Require-FixedInputs 'after the Gate'

  Write-Host 'Partial Reference maintenance/composition Gate passed mechanically.'
  Write-Host "Partials: files=2, lines=$($shellLines + $workspaceLines), bytes=$($shellBytes + $workspaceBytes), observations=27"
  Write-Host "Target reports: shell=$($shellReport.status)/$($shellReport.summary.diagnosticCount) diagnostics, workspace=$($workspaceReport.status)/$($workspaceReport.summary.diagnosticCount) diagnostics"
  Write-Host "Final Gate DevTools: attempts=$($script:harnessAttempts), timeouts=$($script:harnessTimeouts), retries=$($script:harnessRetries)"
}
finally {
  Pop-Location
}
