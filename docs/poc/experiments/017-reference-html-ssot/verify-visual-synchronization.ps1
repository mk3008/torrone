$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$variant = Join-Path $experiment 'variants/07-visual-rule-synchronization'
$output = Join-Path $experiment 'output/visual-rule-synchronization'
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$references = [ordered]@{
  'common-shell' = Join-Path $experiment 'variants/04-partial-reference/references/common-shell.html'
  'search-workspace' = Join-Path $experiment 'variants/04-partial-reference/references/search-workspace.html'
  'form-workflow' = Join-Path $experiment 'variants/05-form-heavy-partial/reference/form-workflow.html'
}
$candidates = [ordered]@{
  'a-self-contained' = $null
  'b-token-only' = Join-Path $variant 'candidate-b-token-only'
  'c-visual-primitives' = Join-Path $variant 'candidate-c-visual-primitives'
}

$fixedHashes = [ordered]@{
  ($references['common-shell']) = '08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527'
  ($references['search-workspace']) = '3078962D0880A28658691922D2F6CB6E9E3A9239BCE735994EC71ABABBFD4C3B'
  ($references['form-workflow']) = 'A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4'
  $core = '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8'
  $cli = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
}
$fixedConformanceFileCount = 62
$fixedConformanceDigest = 'E318076A90555C11D9D678F6BB5FF57B311982552A86D59548A44433AC0BF7BF'

$env:REFERENCE_UI_BROWSER = $browser
$script:harnessAttempts = 0
$script:harnessTimeouts = 0
$script:harnessRetries = 0
$script:harnessEvents = @()

function Require-Hash([string]$Path, [string]$Expected, [string]$Label) {
  $actual = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash
  if ($actual -ne $Expected) { throw "$Label changed. Expected $Expected but found $actual." }
}

function Get-PacketDigest($Files) {
  $root = [IO.Path]::GetFullPath($experiment).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $lines = @($Files | Sort-Object FullName -Unique | ForEach-Object {
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    "$relative=$((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)"
  })
  return [Convert]::ToHexString(
    [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n")))
  )
}

function Get-ConformancePacket {
  $files = @()
  $files += Get-ChildItem -File -Recurse (Join-Path $experiment 'output/reference-conformance')
  $files += Get-Item @(
    (Join-Path $experiment 'conformance-plan.md'),
    (Join-Path $experiment 'reference-conformance-invariant-classification.md'),
    (Join-Path $experiment 'reference-conformance-result.md'),
    (Join-Path $experiment 'reference-conformance-verification-record.md'),
    (Join-Path $experiment 'reference-conformance-self-review.md'),
    (Join-Path $experiment 'verify-reference-conformance.ps1')
  )
  return [ordered]@{ fileCount = @($files).Count; digest = Get-PacketDigest $files }
}

function Require-FixedEvidence([string]$When) {
  foreach ($entry in $fixedHashes.GetEnumerator()) { Require-Hash $entry.Key $entry.Value "$($entry.Key) $When" }
  $packet = Get-ConformancePacket
  if ($packet.fileCount -ne $fixedConformanceFileCount -or $packet.digest -ne $fixedConformanceDigest) {
    throw "Reference Conformance packet changed $When. Files=$($packet.fileCount), digest=$($packet.digest)."
  }
}

function Invoke-ReferenceUi([string[]]$Arguments, [int]$Expected, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $script:harnessAttempts += 1
    $started = Get-Date
    $lines = @(& node $cli @Arguments 2>&1)
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
    if ($timedOut -and $attempt -eq 1) { $script:harnessRetries += 1; continue }
    throw "$Label exited with $exitCode; expected $Expected."
  }
}

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Get-AllStates($Bundle) {
  $states = @($Bundle.initial)
  foreach ($scenario in $Bundle.scenarios) { foreach ($step in $scenario.steps) { $states += $step.state } }
  return $states
}

function Require-SnapshotHealth([string]$Path, [string]$Label) {
  $bundle = Read-Json $Path
  if (@($bundle.network.externalRequests).Count -ne 0 -or $bundle.network.failedRequestCount -ne 0) { throw "$Label contains external or failed requests." }
  if ($bundle.console.errorCount -ne 0) { throw "$Label contains console errors." }
  foreach ($scenario in $bundle.scenarios) {
    if (@($scenario.loadConsoleErrors).Count -ne 0) { throw "$Label has scenario load errors." }
    foreach ($step in $scenario.steps) {
      if ($step.actionError -or @($step.consoleErrors).Count -ne 0) { throw "$Label has action or console errors." }
    }
  }
  foreach ($state in Get-AllStates $bundle) {
    if (@($state.duplicateKeys).Count -ne 0 -or @($state.semanticAmbiguities).Count -ne 0) { throw "$Label has identity failures." }
    if (@($state.accessibilityIssues).Count -ne 0) { throw "$Label has bounded accessibility failures." }
    if (@($state.accessibilityTree.unnamedInteractive.PSObject.Properties).Count -ne 0) { throw "$Label has unnamed interactive accessibility nodes." }
    if ($state.observationBoundary.excludedHarnessRoots -ne 1 -or $state.observationBoundary.axExcludedHarnessRoots -ne 1) { throw "$Label has an unexpected harness boundary." }
  }
}

function Require-PassReport([string]$Path, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0) { throw "$Label did not pass with zero errors." }
}

function Require-FailReport([string]$Path, [string]$PathPattern, [string]$Label) {
  $report = Read-Json $Path
  $paths = @($report.summary.errorSignatures.path)
  if ($report.status -ne 'fail' -or $report.summary.errorCount -lt 1 -or -not ($paths -match $PathPattern)) {
    throw "$Label did not expose the expected style difference. Paths=$($paths -join ', ')."
  }
}

function Require-Preflight([string]$Path, [string]$Label, [string]$Status = 'pass') {
  $report = Read-Json $Path
  if ($report.status -ne $Status) { throw "$Label preflight status was $($report.status), expected $Status." }
  if ($Status -eq 'pass' -and ($report.summary.errorCount -ne 0 -or $report.summary.warningCount -ne 0)) { throw "$Label preflight was not zero-error and zero-warning." }
  if ($report.responsibility -ne 'reference-library-only') { throw "$Label has the wrong Conformance responsibility." }
}

function Get-CandidatePath([string]$Candidate, [string]$Name) {
  if ($Candidate -eq 'a-self-contained') { return $references[$Name] }
  return Join-Path $candidates[$Candidate] "$Name.html"
}

function Get-ScreenshotHashComparison([string]$BaselineRoot, [string]$CandidateRoot, [string]$Label) {
  $baselineFiles = @(Get-ChildItem -File -Recurse $BaselineRoot)
  $candidateFiles = @(Get-ChildItem -File -Recurse $CandidateRoot)
  if ($baselineFiles.Count -ne $candidateFiles.Count) { throw "$Label screenshot count changed." }
  $candidateMap = @{}
  foreach ($file in $candidateFiles) { $candidateMap[$file.FullName.Substring($CandidateRoot.Length + 1)] = $file }
  $mismatches = @()
  foreach ($file in $baselineFiles) {
    $relative = $file.FullName.Substring($BaselineRoot.Length + 1)
    if (-not $candidateMap.ContainsKey($relative)) { throw "$Label screenshot $relative is missing." }
    if ((Get-FileHash $file.FullName -Algorithm SHA256).Hash -ne (Get-FileHash $candidateMap[$relative].FullName -Algorithm SHA256).Hash) {
      $mismatches += $relative
    }
  }
  return [ordered]@{
    screenshotFiles = $baselineFiles.Count
    byteIdenticalFiles = $baselineFiles.Count - $mismatches.Count
    byteHashMismatches = $mismatches
  }
}

function Replace-ExactlyOnce([string]$Path, [string]$Before, [string]$After, [string]$Label) {
  $text = Get-Content -Raw -LiteralPath $Path
  if ([regex]::Matches($text, [regex]::Escape($Before)).Count -ne 1) { throw "$Label source is not unique." }
  [IO.File]::WriteAllText($Path, $text.Replace($Before, $After), [Text.Encoding]::UTF8)
}

function Copy-Candidate([string]$Candidate, [string]$Destination) {
  New-Item -ItemType Directory -Path $Destination -Force | Out-Null
  foreach ($name in $references.Keys) { Copy-Item -LiteralPath (Get-CandidatePath $Candidate $name) -Destination (Join-Path $Destination "$name.html") }
  if ($Candidate -eq 'b-token-only') { Copy-Item -LiteralPath (Join-Path $candidates[$Candidate] 'shared-tokens.css') -Destination $Destination }
  if ($Candidate -eq 'c-visual-primitives') { Copy-Item -LiteralPath (Join-Path $candidates[$Candidate] 'shared-visual-primitives.css') -Destination $Destination }
}

function Get-TreeHashes([string]$Path) {
  $map = @{}
  foreach ($file in Get-ChildItem -File -Recurse $Path) { $map[$file.FullName.Substring($Path.Length + 1)] = (Get-FileHash $file.FullName -Algorithm SHA256).Hash }
  return $map
}

function Require-TreeHashes($Expected, [string]$Path, [string]$Label) {
  $actual = Get-TreeHashes $Path
  if ($Expected.Count -ne $actual.Count) { throw "$Label file count changed." }
  foreach ($entry in $Expected.GetEnumerator()) {
    if (-not $actual.ContainsKey($entry.Key) -or $actual[$entry.Key] -ne $entry.Value) { throw "$Label did not restore $($entry.Key)." }
  }
}

function Get-CssText([string]$Path) {
  if ([IO.Path]::GetExtension($Path) -eq '.css') { return Get-Content -Raw -LiteralPath $Path }
  return [regex]::Match((Get-Content -Raw -LiteralPath $Path), '(?s)<style>(.*?)</style>').Groups[1].Value
}

function Get-CssMetrics([string]$Candidate) {
  $files = @($references.Keys | ForEach-Object { Get-CandidatePath $Candidate $_ })
  if ($Candidate -eq 'b-token-only') { $files += Join-Path $candidates[$Candidate] 'shared-tokens.css' }
  if ($Candidate -eq 'c-visual-primitives') { $files += Join-Path $candidates[$Candidate] 'shared-visual-primitives.css' }
  $declarations = @()
  $customProperties = @()
  foreach ($file in $files) {
    $css = Get-CssText $file
    foreach ($match in [regex]::Matches($css, '(?m)(--[\w-]+|[a-zA-Z-]+)\s*:\s*([^;{}]+);')) {
      $declaration = ("$($match.Groups[1].Value):$($match.Groups[2].Value)" -replace '\s+', ' ').Trim()
      $declarations += $declaration
      if ($match.Groups[1].Value.StartsWith('--')) { $customProperties += $declaration }
    }
  }
  $duplicateOccurrences = @($declarations | Group-Object | ForEach-Object { [Math]::Max(0, $_.Count - 1) } | Measure-Object -Sum).Sum
  return [ordered]@{
    authoredFiles = $files.Count
    filesToUnderstandOneReference = if ($Candidate -eq 'a-self-contained') { 1 } else { 2 }
    externalStylesheetImports = if ($Candidate -eq 'a-self-contained') { 0 } else { 3 }
    declarationOccurrences = $declarations.Count
    exactDuplicateDeclarationOccurrences = $duplicateOccurrences
    customPropertyDefinitionOccurrences = $customProperties.Count
  }
}

function Invoke-CommonProbe([string]$Candidate, [string]$ProbeRoot) {
  $root = Join-Path $ProbeRoot $Candidate
  Copy-Candidate $Candidate $root
  $original = Get-TreeHashes $root
  $changedFiles = 0
  if ($Candidate -eq 'a-self-contained') {
    foreach ($name in $references.Keys) {
      Replace-ExactlyOnce (Join-Path $root "$name.html") '--focus: #86b9ee;' '--focus: #ff00aa;' "$Candidate common focus probe"
      $changedFiles += 1
    }
  } elseif ($Candidate -eq 'b-token-only') {
    Replace-ExactlyOnce (Join-Path $root 'shared-tokens.css') '--focus: #86b9ee;' '--focus: #ff00aa;' "$Candidate common focus probe"
    $changedFiles = 1
  } else {
    Replace-ExactlyOnce (Join-Path $root 'shared-visual-primitives.css') '--focus: #86b9ee;' '--focus: #ff00aa;' "$Candidate common focus probe"
    $changedFiles = 1
  }
  foreach ($name in $references.Keys) {
    $report = Join-Path $output "probe-common.$Candidate.$name.report.json"
    Invoke-ReferenceUi @('verify', (Join-Path $root "$name.html"), '--baseline', (Join-Path $output "baseline.$name.snapshot.json"), '--out', $report) 1 "$Candidate common probe $name"
    Require-FailReport $report '\.styles\.outlineColor$' "$Candidate common probe $name"
  }
  Copy-Candidate $Candidate $root
  Require-TreeHashes $original $root "$Candidate common probe"
  return [ordered]@{
    changedFiles = $changedFiles
    changedLocations = $changedFiles
    validationCommands = 3
    restoreWrites = $changedFiles
    restoreProof = 'byte-identical source tree'
    missedSynchronizationRisk = if ($Candidate -eq 'a-self-contained') { 'three independent edits can diverge' } else { 'one edit; fan-out validation still required' }
  }
}

function Invoke-LocalProbe([string]$Candidate, [string]$ProbeRoot) {
  $root = Join-Path $ProbeRoot $Candidate
  Copy-Candidate $Candidate $root
  $original = Get-TreeHashes $root
  $form = Join-Path $root 'form-workflow.html'
  Replace-ExactlyOnce $form '--danger: #b42318;' '--danger: #7f1d1d;' "$Candidate local form probe"
  $report = Join-Path $output "probe-local.$Candidate.form-workflow.report.json"
  Invoke-ReferenceUi @('verify', $form, '--baseline', (Join-Path $output 'baseline.form-workflow.snapshot.json'), '--out', $report) 1 "$Candidate local form probe"
  Require-FailReport $report '\.styles\.(?:color|border(?:Top|Right|Bottom|Left)Color)$' "$Candidate local form probe"
  Copy-Candidate $Candidate $root
  Require-TreeHashes $original $root "$Candidate local probe"
  return [ordered]@{
    changedFiles = 1
    changedLocations = 1
    commonLayerEdits = 0
    validationCommands = 1
    restoreWrites = 1
    unaffectedReferenceProof = 'common layer, shell, and workspace hashes unchanged'
    restoreProof = 'byte-identical source tree'
  }
}

$probeRoot = Join-Path $env:TEMP "poc017-visual-synchronization-$([guid]::NewGuid().ToString('N'))"
Push-Location $experiment
try {
  Require-FixedEvidence 'before the Gate'
  node --check $cli
  if ($LASTEXITCODE -ne 0) { throw 'CLI syntax check failed.' }
  node --check $core
  if ($LASTEXITCODE -ne 0) { throw 'Core syntax check failed.' }

  New-Item -ItemType Directory -Path $output -Force | Out-Null
  New-Item -ItemType Directory -Path $probeRoot | Out-Null
  $baselineScreenshotControls = [ordered]@{}
  $candidateScreenshotEvidence = [ordered]@{}

  $sourcePaths = @()
  foreach ($candidate in @('b-token-only', 'c-visual-primitives')) { $sourcePaths += Get-ChildItem -File $candidates[$candidate] | Select-Object -ExpandProperty FullName }
  $external = rg -n --pcre2 'https?://|@import|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b' @sourcePaths
  if ($LASTEXITCODE -eq 0) { throw "A candidate introduced external communication:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'Candidate external-communication scan failed.' }

  foreach ($name in $references.Keys) {
    $baseline = Join-Path $output "baseline.$name.snapshot.json"
    $artifacts = Join-Path $output "baseline.$name.screens"
    Invoke-ReferenceUi @('snapshot', $references[$name], '--out', $baseline, '--artifacts', $artifacts) 0 "Baseline $name snapshot"
    Require-SnapshotHealth $baseline "Baseline $name"
    $repeat = Join-Path $output "baseline-repeat.$name.snapshot.json"
    $repeatArtifacts = Join-Path $output "baseline-repeat.$name.screens"
    Invoke-ReferenceUi @('snapshot', $references[$name], '--out', $repeat, '--artifacts', $repeatArtifacts) 0 "Baseline $name repeat snapshot"
    Require-SnapshotHealth $repeat "Baseline $name repeat"
    if ((Get-FileHash $baseline -Algorithm SHA256).Hash -ne (Get-FileHash $repeat -Algorithm SHA256).Hash) { throw "Baseline $name observation bundle is not deterministic." }
    $baselineScreenshotControls[$name] = Get-ScreenshotHashComparison $artifacts $repeatArtifacts "Baseline $name repeat"
    $preflight = Join-Path $output "preflight.a-self-contained.$name.json"
    Invoke-ReferenceUi @('preflight', $references[$name], '--out', $preflight) 0 "Baseline $name preflight"
    Require-Preflight $preflight "Baseline $name"
  }

  foreach ($candidate in @('b-token-only', 'c-visual-primitives')) {
    foreach ($name in $references.Keys) {
      $candidatePath = Get-CandidatePath $candidate $name
      $snapshot = Join-Path $output "$candidate.$name.snapshot.json"
      $artifacts = Join-Path $output "$candidate.$name.screens"
      Invoke-ReferenceUi @('snapshot', $candidatePath, '--out', $snapshot, '--artifacts', $artifacts) 0 "$candidate $name snapshot"
      Require-SnapshotHealth $snapshot "$candidate $name"
      $report = Join-Path $output "$candidate.$name.report.json"
      Invoke-ReferenceUi @('verify', $candidatePath, '--baseline', (Join-Path $output "baseline.$name.snapshot.json"), '--out', $report) 0 "$candidate $name comparison"
      Require-PassReport $report "$candidate $name comparison"
      $candidateScreenshotEvidence["$candidate/$name"] = Get-ScreenshotHashComparison (Join-Path $output "baseline.$name.screens") $artifacts "$candidate $name"
      $preflight = Join-Path $output "preflight.$candidate.$name.json"
      Invoke-ReferenceUi @('preflight', $candidatePath, '--out', $preflight) 0 "$candidate $name preflight"
      Require-Preflight $preflight "$candidate $name"
    }
  }

  $negativePreflights = [ordered]@{
    'semantic-ambiguity' = 'variants/02-mixed-semantic/semantic-ambiguity-probe.html'
    'relational-ambiguity' = 'variants/03-relational-reuse/relational-ambiguity-probe.html'
    'whole-page-missing-h1' = 'variants/04-partial-reference/probes/whole-page-missing-h1.html'
  }
  foreach ($entry in $negativePreflights.GetEnumerator()) {
    $report = Join-Path $output "conformance-negative.$($entry.Key).json"
    Invoke-ReferenceUi @('preflight', $entry.Value, '--out', $report) 1 "Conformance negative $($entry.Key)"
    Require-Preflight $report "Conformance negative $($entry.Key)" 'error'
  }

  $commonProbe = [ordered]@{}
  $localProbe = [ordered]@{}
  foreach ($candidate in $candidates.Keys) {
    $commonProbe[$candidate] = Invoke-CommonProbe $candidate (Join-Path $probeRoot 'common')
    $localProbe[$candidate] = Invoke-LocalProbe $candidate (Join-Path $probeRoot 'local')
  }

  $metrics = [ordered]@{}
  foreach ($candidate in $candidates.Keys) { $metrics[$candidate] = Get-CssMetrics $candidate }
  $metrics | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'source-metrics.json') -Encoding utf8
  [ordered]@{ common = $commonProbe; local = $localProbe } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'maintenance-probes.json') -Encoding utf8
  [ordered]@{
    browser = $browser
    attempts = $script:harnessAttempts
    timeouts = $script:harnessTimeouts
    retries = $script:harnessRetries
    events = $script:harnessEvents
  } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'harness-reliability.json') -Encoding utf8
  [ordered]@{
    status = 'pass'
    candidates = $candidates.Keys
    canonicalComparisons = 6
    deterministicBaselineBundles = 3
    screenshotHashEvidence = [ordered]@{
      baselineRepeatControls = $baselineScreenshotControls
      candidateComparisons = $candidateScreenshotEvidence
      interpretation = 'Byte hashes are supplementary. Exact observation-bundle determinism and zero-error computed comparisons are authoritative because interaction-frame capture can vary.'
    }
    positiveConformanceChecks = 9
    retainedNegativeConformanceChecks = 3
    commonProbe = $commonProbe
    localProbe = $localProbe
    fixedConformancePacket = Get-ConformancePacket
    coreSha256 = (Get-FileHash $core -Algorithm SHA256).Hash
    cliSha256 = (Get-FileHash $cli -Algorithm SHA256).Hash
    consumerRequirementsAdded = 0
    buildOrRuntimeRequirementsAdded = 0
  } | ConvertTo-Json -Depth 30 | Set-Content -LiteralPath (Join-Path $output 'gate-summary.json') -Encoding utf8

  Require-FixedEvidence 'after the Gate'
  Write-Host 'Reference Visual Rule Synchronization Gate passed mechanically.'
  Write-Host 'Canonical comparisons: 6; deterministic baseline bundles: 3; positive Conformance checks: 9.'
  Write-Host "Harness attempts=$($script:harnessAttempts), timeouts=$($script:harnessTimeouts), retries=$($script:harnessRetries)."
}
finally {
  $resolvedProbe = [IO.Path]::GetFullPath($probeRoot)
  $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
  if (Test-Path -LiteralPath $resolvedProbe) {
    if ($resolvedProbe.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -and (Split-Path -Leaf $resolvedProbe).StartsWith('poc017-visual-synchronization-')) {
      Remove-Item -LiteralPath $resolvedProbe -Recurse -Force
    }
  }
  Pop-Location
}
