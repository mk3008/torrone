$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$acceptedReference = Join-Path $experiment 'reference/index.html'
$commonShell = Join-Path $experiment 'variants/04-partial-reference/references/common-shell.html'
$searchWorkspace = Join-Path $experiment 'variants/04-partial-reference/references/search-workspace.html'
$formReference = Join-Path $experiment 'variants/05-form-heavy-partial/reference/form-workflow.html'
$target = Join-Path $experiment 'variants/05-form-heavy-partial/target/index.html'
$scenarioOverrides = Join-Path $experiment 'variants/05-form-heavy-partial/target/scenario-overrides.json'
$output = Join-Path $experiment 'output/form-heavy-partial'
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$acceptedReferenceHash = '868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056'
$commonShellHash = '08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527'
$coreHash = '14BB52C2C60B9DA9A27B7593C772B09E18A2DA2A79AD7C129827330C0D4077EA'
$cliHash = '7109A169EB8F6EA7C1483B2C14C8A9711560667ECD80DFDCCCC19380E38A8837'
$fixedTransferEvidenceDigest = '96457B6FFEEFC5BABFD15FF97DDF781A740C919A04266DD7D769DA438129EFFF'
$fixedMixedEvidenceDigest = '819FBCD6FA157E033E72A3E45FF7ACD5A9CDA51C7DC5730066CB357643010658'
$fixedRelationalEvidenceDigest = '6FB20902AC306081B66B0170E99DF1DE786A7FA16E66380EE264A62BC24ED17E'
$fixedPartialEvidenceDigest = '72B69347C75CC6EFABF647B2CE8E31C7D9B98220CB9E4501181D81A564C0D9D3'

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

function Get-FixedPartialEvidenceDigest() {
  $fixed = @()
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'output/partial-reference')
  $fixed += Get-ChildItem -File -Recurse (Join-Path $experiment 'variants/04-partial-reference')
  $fixed += Get-Item @(
    (Join-Path $experiment 'partial-reference-plan.md'),
    (Join-Path $experiment 'partial-reference-result.md'),
    (Join-Path $experiment 'partial-reference-cost-record.md'),
    (Join-Path $experiment 'partial-reference-verification-record.md'),
    (Join-Path $experiment 'partial-reference-screen-review.md'),
    (Join-Path $experiment 'partial-reference-self-review.md'),
    (Join-Path $experiment 'verify-partial-reference.ps1')
  )
  return Get-PacketDigest $fixed
}

function Require-FixedInputs([string]$When) {
  Require-Hash $acceptedReference $acceptedReferenceHash "Accepted Reference $When"
  Require-Hash $commonShell $commonShellHash "Common-shell Reference $When"
  Require-Hash $core $coreHash "Core $When"
  Require-Hash $cli $cliHash "CLI $When"
  if ((Get-FixedTransferEvidenceDigest) -ne $fixedTransferEvidenceDigest) { throw "Transferability evidence changed $When." }
  if ((Get-FixedMixedEvidenceDigest) -ne $fixedMixedEvidenceDigest) { throw "Mixed evidence changed $When." }
  if ((Get-FixedRelationalEvidenceDigest) -ne $fixedRelationalEvidenceDigest) { throw "Relational evidence changed $When." }
  if ((Get-FixedPartialEvidenceDigest) -ne $fixedPartialEvidenceDigest) { throw "Partial Reference evidence changed $When." }
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
  if (@($Bundle.network.externalRequests).Count -ne 0 -or $Bundle.network.failedRequestCount -ne 0) { throw "$Label contains external or failed requests." }
  if ($Bundle.console.errorCount -ne 0) { throw "$Label contains console or uncaught errors." }
  foreach ($scenario in $Bundle.scenarios) {
    if (@($scenario.loadConsoleErrors).Count -ne 0) { throw "$Label scenario $($scenario.name) has load console errors." }
    foreach ($step in $scenario.steps) {
      if ($step.actionError -or @($step.consoleErrors).Count -ne 0) { throw "$Label scenario $($scenario.name) contains an action or console error." }
    }
  }
  foreach ($state in Get-AllStates $Bundle) {
    if (@($state.duplicateKeys).Count -ne 0) { throw "$Label contains duplicate observation keys." }
    if (@($state.semanticAmbiguities).Count -ne 0) { throw "$Label contains ambiguous semantic keys." }
    if (@($state.accessibilityIssues).Count -ne 0) { throw "$Label contains bounded accessibility issues." }
    if (@($state.accessibilityTree.unnamedInteractive.PSObject.Properties).Count -ne 0) { throw "$Label contains unnamed accessibility-tree controls." }
    if ($state.observationBoundary.excludedHarnessRoots -ne $HarnessRoots -or $state.observationBoundary.axExcludedHarnessRoots -ne $HarnessRoots) { throw "$Label has an unexpected harness boundary." }
  }
}

function Get-ClassTokens([string]$Html) {
  return @([regex]::Matches($Html, 'class="([^"]+)"') | ForEach-Object { $_.Groups[1].Value -split '\s+' } | Where-Object { $_ } | Sort-Object -Unique)
}

function Get-LocalIds([string]$Html) {
  return @([regex]::Matches($Html, '\bid="([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique)
}

function Get-CssDeclarations([string]$Html) {
  $style = [regex]::Match($Html, '(?s)<style>(.*?)</style>').Groups[1].Value
  return @([regex]::Matches($style, '(?m)(--[\w-]+|[a-zA-Z-]+)\s*:\s*([^;{}]+);') |
    ForEach-Object { ("$($_.Groups[1].Value):$($_.Groups[2].Value)" -replace '\s+', ' ').Trim() } |
    Sort-Object -Unique)
}

function Get-CustomProperties([string]$Html) {
  $style = [regex]::Match($Html, '(?s)<style>(.*?)</style>').Groups[1].Value
  $values = @{}
  foreach ($match in [regex]::Matches($style, '(?m)(--[\w-]+)\s*:\s*([^;{}]+);')) {
    $name = $match.Groups[1].Value
    if (-not $values.ContainsKey($name)) { $values[$name] = @() }
    $values[$name] += (($match.Groups[2].Value -replace '\s+', ' ').Trim())
  }
  return $values
}

function Get-ScriptLines([string]$Html) {
  $matches = [regex]::Matches($Html, '(?s)<script>(.*?)</script>')
  if ($matches.Count -eq 0) { return @() }
  return @($matches[$matches.Count - 1].Groups[1].Value -split "`r?`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -and $_ -notin @('{', '}', '})();') } | Sort-Object -Unique)
}

function Get-StyleHash([string]$Html) {
  $style = [regex]::Match($Html, '(?s)<style>(.*?)</style>').Groups[1].Value
  return [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($style)))
}

function Count-ScenarioActions($Bundle) {
  $count = 0
  foreach ($scenario in $Bundle.scenarios) { $count += $scenario.steps.Count }
  return $count
}

function Invoke-RelationshipNegative([string]$Baseline, [string]$ReportPath) {
  $probeRoot = Join-Path $env:TEMP "poc017-form-relationship-negative-$([guid]::NewGuid().ToString('N'))"
  try {
    New-Item -ItemType Directory -Path $probeRoot | Out-Null
    $probe = Join-Path $probeRoot 'index.html'
    Copy-Item -LiteralPath $target -Destination $probe
    $text = Get-Content -Raw -LiteralPath $probe
    $needle = "control.setAttribute('aria-describedby', message.id);"
    if ([regex]::Matches($text, [regex]::Escape($needle)).Count -ne 1) { throw 'Relationship-negative target is not unique.' }
    [IO.File]::WriteAllText($probe, $text.Replace($needle, "control.removeAttribute('aria-describedby');"), [Text.Encoding]::UTF8)
    Invoke-ReferenceUi -CliArguments @('verify', $probe, '--baseline', $Baseline, '--scenario-overrides', $scenarioOverrides, '--out', $ReportPath) -Expected 1 -Label 'Form relationship negative'
  }
  finally {
    $resolvedProbe = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
    if ($resolvedProbe.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -and (Split-Path -Leaf $resolvedProbe).StartsWith('poc017-form-relationship-negative-')) {
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
    'variants/05-form-heavy-partial/reference/form-workflow.html',
    'variants/05-form-heavy-partial/target/index.html'
  )
  $external = rg -n --pcre2 'https?://|@import|url\(\s*["'']?https?://|<script[^>]+src=|<link[^>]+href=(?!"data:)' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "Form experiment contains an external/composed runtime reference:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'External/composition scan failed.' }
  $runtimeCalls = rg -n '\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "Form experiment contains a network/data-layer API:`n$runtimeCalls" }
  if ($LASTEXITCODE -gt 1) { throw 'Runtime API scan failed.' }

  $targetLeakage = rg -ni 'Schedule maintenance work|Work details|Replace dock leveler|North distribution center|morgan\.lee|loading area|Access review queue|AR-10(?:48|44|41|39)|Purchase order search|PO-48(?:21|16|09)' 'variants/05-form-heavy-partial/target/index.html' 'variants/05-form-heavy-partial/target/scenario-overrides.json'
  if ($LASTEXITCODE -eq 0) { throw "Reference content leaked into Target:`n$targetLeakage" }
  if ($LASTEXITCODE -gt 1) { throw 'Target leakage scan failed.' }

  $shellHtml = Get-Content -Raw -LiteralPath $commonShell
  $workspaceHtml = Get-Content -Raw -LiteralPath $searchWorkspace
  $formHtml = Get-Content -Raw -LiteralPath $formReference
  $targetHtml = Get-Content -Raw -LiteralPath $target
  if ($targetHtml -match 'data-reference-harness|data-reference-scenarios|data-reference-state') { throw 'Target contains a Reference harness or scenario contract.' }
  foreach ($partHtml in @($shellHtml, $formHtml)) {
    $sharedClasses = @(Compare-Object (Get-ClassTokens $partHtml) (Get-ClassTokens $targetHtml) -IncludeEqual | Where-Object SideIndicator -eq '==')
    $sharedIds = @(Compare-Object (Get-LocalIds $partHtml) (Get-LocalIds $targetHtml) -IncludeEqual | Where-Object SideIndicator -eq '==')
    if ($sharedClasses.Count -ne 0) { throw 'A Reference shares class tokens with Target.' }
    if ($sharedIds.Count -ne 0) { throw 'A Reference shares local IDs with Target.' }
    if ((Get-StyleHash $partHtml) -eq (Get-StyleHash $targetHtml)) { throw 'A Reference shares an identical style source with Target.' }
  }

  New-Item -ItemType Directory -Path $output -Force | Out-Null
  Invoke-ReferenceUi -CliArguments @('snapshot', $commonShell, '--out', (Join-Path $output 'common-shell.snapshot.json'), '--artifacts', (Join-Path $output 'common-shell')) -Expected 0 -Label 'Common shell snapshot'
  Invoke-ReferenceUi -CliArguments @('snapshot', $commonShell, '--out', (Join-Path $output 'common-shell.repeat.snapshot.json'), '--artifacts', (Join-Path $output 'common-shell-repeat')) -Expected 0 -Label 'Common shell repeat snapshot'
  Invoke-ReferenceUi -CliArguments @('snapshot', $formReference, '--out', (Join-Path $output 'form-workflow.snapshot.json'), '--artifacts', (Join-Path $output 'form-workflow')) -Expected 0 -Label 'Form workflow snapshot'
  Invoke-ReferenceUi -CliArguments @('snapshot', $formReference, '--out', (Join-Path $output 'form-workflow.repeat.snapshot.json'), '--artifacts', (Join-Path $output 'form-workflow-repeat')) -Expected 0 -Label 'Form workflow repeat snapshot'
  if ((Get-FileHash -LiteralPath (Join-Path $output 'common-shell.snapshot.json') -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath (Join-Path $output 'common-shell.repeat.snapshot.json') -Algorithm SHA256).Hash) { throw 'Common-shell capture is not deterministic.' }
  if ((Get-FileHash -LiteralPath (Join-Path $output 'form-workflow.snapshot.json') -Algorithm SHA256).Hash -ne (Get-FileHash -LiteralPath (Join-Path $output 'form-workflow.repeat.snapshot.json') -Algorithm SHA256).Hash) { throw 'Form capture is not deterministic.' }

  Invoke-ReferenceUi -CliArguments @('snapshot', $target, '--out', (Join-Path $output 'target.snapshot.json'), '--artifacts', (Join-Path $output 'target-snapshot')) -Expected 0 -Label 'Integrated Target snapshot'
  Invoke-ReferenceUi -CliArguments @('verify', $target, '--baseline', (Join-Path $output 'common-shell.snapshot.json'), '--out', (Join-Path $output 'target-shell.report.json'), '--artifacts', (Join-Path $output 'target-shell')) -Expected 0 -Label 'Target against common shell'
  Invoke-ReferenceUi -CliArguments @('verify', $target, '--baseline', (Join-Path $output 'form-workflow.snapshot.json'), '--scenario-overrides', $scenarioOverrides, '--out', (Join-Path $output 'target-form.report.json'), '--artifacts', (Join-Path $output 'target-form')) -Expected 0 -Label 'Target against form workflow'
  Invoke-ReferenceUi -CliArguments @('snapshot', $acceptedReference, '--out', (Join-Path $output 'accepted-reference-regression.snapshot.json')) -Expected 0 -Label 'Accepted Reference regression'
  Invoke-ReferenceUi -CliArguments @('verify', 'consumers/negative/index.html', '--root', 'consumers', '--baseline', 'output/reference.snapshot.json', '--out', (Join-Path $output 'historical-negative.report.json')) -Expected 1 -Label 'Historical negative regression'
  Invoke-ReferenceUi -CliArguments @('snapshot', 'iterations/01-semantic-only/reference.html', '--out', (Join-Path $output 'semantic-only-reference.snapshot.json')) -Expected 0 -Label 'Semantic-only Reference regression'
  Invoke-ReferenceUi -CliArguments @('verify', 'iterations/01-semantic-only/consumer.html', '--baseline', (Join-Path $output 'semantic-only-reference.snapshot.json'), '--out', (Join-Path $output 'semantic-only-consumer.report.json')) -Expected 1 -Label 'Semantic-only negative regression'
  Invoke-RelationshipNegative (Join-Path $output 'form-workflow.snapshot.json') (Join-Path $output 'form-relationship-negative.report.json')

  $shell = Get-Content -Raw -LiteralPath (Join-Path $output 'common-shell.snapshot.json') | ConvertFrom-Json -Depth 100
  $form = Get-Content -Raw -LiteralPath (Join-Path $output 'form-workflow.snapshot.json') | ConvertFrom-Json -Depth 100
  $targetSnapshot = Get-Content -Raw -LiteralPath (Join-Path $output 'target.snapshot.json') | ConvertFrom-Json -Depth 100
  $shellReport = Get-Content -Raw -LiteralPath (Join-Path $output 'target-shell.report.json') | ConvertFrom-Json -Depth 100
  $formReport = Get-Content -Raw -LiteralPath (Join-Path $output 'target-form.report.json') | ConvertFrom-Json -Depth 100
  $accepted = Get-Content -Raw -LiteralPath (Join-Path $output 'accepted-reference-regression.snapshot.json') | ConvertFrom-Json -Depth 100

  $shellKeys = @(
    'navigation-current', 'navigation-empty', 'navigation-filter', 'navigation-parent', 'navigation-secondary', 'navigation-toggle',
    'semantic:controlled-by:navigation-parent', 'semantic:controlled-by:navigation-toggle', 'semantic:controlled-by:user-menu-toggle',
    'semantic:role:banner', 'sign-out-action', 'theme-toggle', 'user-menu-toggle'
  ) | Sort-Object
  $formKeys = @(
    'cancel-action', 'confirm-action', 'edit-action', 'form-actions', 'form-choice-group', 'form-contact-error',
    'form-contact-field', 'form-date-field', 'form-error-summary', 'form-notes-field', 'form-primary-error',
    'form-primary-field', 'form-review-heading', 'form-review-region', 'form-select-field', 'review-action',
    'review-actions', 'semantic:role:form', 'semantic:role:main'
  ) | Sort-Object
  $actualShellKeys = @($shell.initial.elements.PSObject.Properties.Name | Sort-Object)
  $actualFormKeys = @($form.initial.elements.PSObject.Properties.Name | Sort-Object)
  $actualTargetKeys = @($targetSnapshot.initial.elements.PSObject.Properties.Name | Sort-Object)
  $unionKeys = @($shellKeys + $formKeys | Sort-Object -Unique)
  if (Compare-Object $shellKeys $actualShellKeys -SyncWindow 0) { throw 'Unexpected common-shell key inventory.' }
  if (Compare-Object $formKeys $actualFormKeys -SyncWindow 0) { throw 'Unexpected form key inventory.' }
  if (Compare-Object $unionKeys $actualTargetKeys -SyncWindow 0) { throw 'Target does not expose the exact union of shell and form contracts.' }
  if (@(Compare-Object $shellKeys $formKeys -IncludeEqual | Where-Object SideIndicator -eq '==').Count -ne 0) { throw 'Shell and form contracts share observation keys.' }

  Require-BundleHealth $shell 'Common shell' 1
  Require-BundleHealth $form 'Form workflow' 1
  Require-BundleHealth $targetSnapshot 'Integrated Target snapshot' 0
  Require-BundleHealth $accepted 'Accepted Reference regression' 1
  if ($shell.scenarios.Count -ne 6 -or (Count-ScenarioActions $shell) -ne 12) { throw 'Common-shell scenario contract changed.' }
  if ($form.scenarios.Count -ne 3 -or (Count-ScenarioActions $form) -ne 10) { throw 'Form scenario contract changed.' }
  foreach ($report in @($shellReport, $formReport)) {
    if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0) { throw 'A Target comparison failed.' }
    if ($report.console.errorCount -ne 0 -or @($report.network.externalRequests).Count -ne 0 -or $report.network.failedRequestCount -ne 0) { throw 'A Target comparison contains console or network errors.' }
  }

  $missing = $form.scenarios[0].steps[0].state
  if (-not $missing.elements.'form-error-summary'.visible -or -not $missing.elements.'form-primary-error'.visible -or -not $missing.elements.'form-contact-error'.visible) { throw 'Required-field error presentation is incomplete.' }
  if ($missing.elements.'form-primary-field'.attributes.'aria-invalid' -ne 'true' -or $missing.elements.'form-contact-field'.attributes.'aria-invalid' -ne 'true') { throw 'Required fields do not expose aria-invalid=true.' }
  if (@($missing.elements.'form-primary-field'.relationships.describedBy) -notcontains 'form-primary-error' -or @($missing.elements.'form-contact-field'.relationships.describedBy) -notcontains 'form-contact-error') { throw 'Required fields do not expose stable error relationships.' }
  if ($missing.document.activeRef -ne 'form-primary-field') { throw 'Invalid submission did not focus the first invalid field.' }

  $invalidEmail = $form.scenarios[1].steps[2].state
  $correctedEmail = $form.scenarios[1].steps[3].state
  $reviewed = $form.scenarios[1].steps[4].state
  if ($invalidEmail.document.activeRef -ne 'form-contact-field' -or -not $invalidEmail.elements.'form-contact-error'.visible -or $invalidEmail.elements.'form-contact-field'.attributes.'aria-invalid' -ne 'true') { throw 'Invalid-email state is incomplete.' }
  if ($correctedEmail.elements.'form-contact-error'.visible -or $correctedEmail.elements.'form-error-summary'.visible -or $correctedEmail.elements.'form-contact-field'.attributes.'aria-invalid') { throw 'Email correction did not clear the error state.' }
  if (-not $reviewed.elements.'form-review-region'.visible -or $reviewed.elements.'semantic:role:form'.visible -or $reviewed.document.activeRef -ne 'form-review-heading') { throw 'Review transition or focus is incomplete.' }
  $edited = $form.scenarios[2].steps[3].state
  if ($edited.elements.'form-review-region'.visible -or -not $edited.elements.'semantic:role:form'.visible -or $edited.document.activeRef -ne 'form-primary-field') { throw 'Back-to-edit transition or focus is incomplete.' }

  if ($accepted.initial.mode -ne 'explicit-data-ref' -or @($accepted.initial.elements.PSObject.Properties).Count -ne 27 -or $accepted.scenarios.Count -ne 11) { throw 'Accepted Reference regression changed.' }
  $historicalNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'historical-negative.report.json') | ConvertFrom-Json -Depth 100
  $semanticNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'semantic-only-consumer.report.json') | ConvertFrom-Json -Depth 100
  $relationshipNegative = Get-Content -Raw -LiteralPath (Join-Path $output 'form-relationship-negative.report.json') | ConvertFrom-Json -Depth 100
  if ($historicalNegative.status -ne 'fail' -or $historicalNegative.summary.uniqueErrorCount -ne 15) { throw 'Historical negative signature coverage changed.' }
  if ($semanticNegative.status -ne 'fail' -or @($semanticNegative.summary.errorSignatures.path) -notcontains 'semanticInventory.combobox') { throw 'Semantic-only negative coverage changed.' }
  if ($relationshipNegative.status -ne 'fail' -or @($relationshipNegative.summary.errorSignatures.path) -notcontains 'elements.form-primary-field.relationships.describedBy' -or @($relationshipNegative.summary.errorSignatures.path) -notcontains 'elements.form-contact-field.relationships.describedBy') { throw 'Form relationship negative did not detect both broken error relationships.' }

  function Get-DiagnosticGroup($Report) {
    $extra = @($Report.differences | Where-Object { $_.severity -eq 'info' -and $_.actual -eq 'extra annotated element' }).Count
    $geometry = @($Report.differences | Where-Object { $_.severity -eq 'info' -and $_.path -match '\.box\.' }).Count
    $other = $Report.summary.diagnosticCount - $extra - $geometry
    if ($other -ne 0) { throw 'Unexpected informational diagnostic category.' }
    return [ordered]@{ extraElements = $extra; geometry = $geometry; other = $other; total = $Report.summary.diagnosticCount }
  }
  [ordered]@{ shell = Get-DiagnosticGroup $shellReport; form = Get-DiagnosticGroup $formReport } |
    ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $output 'diagnostic-summary.json') -Encoding utf8

  $shellCss = Get-CssDeclarations $shellHtml
  $workspaceCss = Get-CssDeclarations $workspaceHtml
  $formCss = Get-CssDeclarations $formHtml
  $formShellShared = @(Compare-Object $formCss $shellCss -IncludeEqual | Where-Object SideIndicator -eq '==' | ForEach-Object InputObject)
  $formWorkspaceShared = @(Compare-Object $formCss $workspaceCss -IncludeEqual | Where-Object SideIndicator -eq '==' | ForEach-Object InputObject)
  $shellTokens = Get-CustomProperties $shellHtml
  $workspaceTokens = Get-CustomProperties $workspaceHtml
  $formTokens = Get-CustomProperties $formHtml
  $tokenRows = @()
  foreach ($name in @($formTokens.Keys | Sort-Object)) {
    if ($shellTokens.ContainsKey($name) -or $workspaceTokens.ContainsKey($name)) {
      $tokenRows += [ordered]@{
        name = $name
        formValues = @($formTokens[$name])
        shellValues = @($shellTokens[$name])
        searchValues = @($workspaceTokens[$name])
        sameInShell = $shellTokens.ContainsKey($name) -and (@($formTokens[$name]) -join '|') -eq (@($shellTokens[$name]) -join '|')
        sameInSearch = $workspaceTokens.ContainsKey($name) -and (@($formTokens[$name]) -join '|') -eq (@($workspaceTokens[$name]) -join '|')
      }
    }
  }
  $formJs = Get-ScriptLines $formHtml
  $shellJs = Get-ScriptLines $shellHtml
  $workspaceJs = Get-ScriptLines $workspaceHtml
  $sourceMetrics = [ordered]@{
    historicalWholeReference = [ordered]@{ lines = (Get-Content -LiteralPath $acceptedReference).Count; bytes = (Get-Item -LiteralPath $acceptedReference).Length; note = 'Different-content historical baseline, not a form-equivalent source.' }
    currentWholeScreenProxy = [ordered]@{ lines = (Get-Content -LiteralPath $target).Count; bytes = (Get-Item -LiteralPath $target).Length; note = 'Integrated Target source used only as current whole-screen review-surface proxy.' }
    newFormReference = [ordered]@{
      files = 1; lines = (Get-Content -LiteralPath $formReference).Count; bytes = (Get-Item -LiteralPath $formReference).Length
      explicitKeys = [regex]::Matches($formHtml, '<[^>]+\bdata-ref\s*=').Count
      semanticKeys = 2; totalObservations = 19; scenarios = 3; actions = 10
      harnessRoots = [regex]::Matches($formHtml, 'data-reference-harness=').Count
      harnessButtons = [regex]::Matches($formHtml, 'data-reference-state=').Count
      uniqueJavaScriptLines = $formJs.Count
    }
    reusedCommonShell = [ordered]@{ lines = (Get-Content -LiteralPath $commonShell).Count; bytes = (Get-Item -LiteralPath $commonShell).Length; changedFiles = 0 }
    currentPartialLibrary = [ordered]@{ referenceFiles = 3; sharedFocusTokenFiles = 3 }
    cssRecurrence = [ordered]@{
      formUniqueDeclarations = $formCss.Count
      exactDeclarationsSharedWithShell = $formShellShared.Count
      exactDeclarationsSharedWithSearch = $formWorkspaceShared.Count
      tokenNamesSharedWithPriorPartials = $tokenRows.Count
      tokens = $tokenRows
      exactSharedWithShell = $formShellShared
      exactSharedWithSearch = $formWorkspaceShared
    }
    javascriptRecurrence = [ordered]@{
      formUniqueLines = $formJs.Count
      exactLinesSharedWithShell = @(Compare-Object $formJs $shellJs -IncludeEqual | Where-Object SideIndicator -eq '==').Count
      exactLinesSharedWithSearch = @(Compare-Object $formJs $workspaceJs -IncludeEqual | Where-Object SideIndicator -eq '==').Count
    }
    target = [ordered]@{
      files = 2; htmlLines = (Get-Content -LiteralPath $target).Count; overrideLines = (Get-Content -LiteralPath $scenarioOverrides).Count
      explicitKeys = [regex]::Matches($targetHtml, '<[^>]+\bdata-ref\s*=').Count
      semanticKeys = @($actualTargetKeys | Where-Object { $_ -like 'semantic:*' }).Count
      totalObservations = $actualTargetKeys.Count
      sharedClassTokens = 0; sharedLocalIds = 0; harnessRoots = 0
    }
    coreCli = [ordered]@{ coreChanged = $false; cliChanged = $false; newHeuristics = 0; newCompositionFeatures = 0 }
  }
  $sourceMetrics | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'source-metrics.json') -Encoding utf8

  [ordered]@{
    browser = $browser
    gateAttempts = $script:harnessAttempts
    gateTimeouts = $script:harnessTimeouts
    gateRetries = $script:harnessRetries
    events = $script:harnessEvents
  } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'harness-reliability.json') -Encoding utf8

  Require-FixedInputs 'after the Gate'
  Write-Host 'Form-heavy partial Reference reuse Gate passed mechanically.'
  Write-Host "Form Reference: elements=$(@($form.initial.elements.PSObject.Properties).Count), scenarios=$($form.scenarios.Count), actions=$(Count-ScenarioActions $form)"
  Write-Host "Target reports: shell=$($shellReport.status)/$($shellReport.summary.diagnosticCount) diagnostics, form=$($formReport.status)/$($formReport.summary.diagnosticCount) diagnostics"
  Write-Host "Final Gate DevTools: attempts=$($script:harnessAttempts), timeouts=$($script:harnessTimeouts), retries=$($script:harnessRetries)"
}
finally {
  Pop-Location
}
