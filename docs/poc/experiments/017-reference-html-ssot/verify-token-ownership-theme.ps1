$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$variant = Join-Path $experiment 'variants/08-token-ownership-theme-independence'
$candidateA = Join-Path $variant 'candidate-a-self-contained'
$candidateB = Join-Path $variant 'candidate-b-token-only'
$output = Join-Path $experiment 'output/token-ownership-theme'
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$aReferences = [ordered]@{
  'common-shell' = Join-Path $experiment 'variants/04-partial-reference/references/common-shell.html'
  'search-workspace' = Join-Path $experiment 'variants/04-partial-reference/references/search-workspace.html'
  'form-workflow' = Join-Path $experiment 'variants/05-form-heavy-partial/reference/form-workflow.html'
  'detail-summary' = Join-Path $candidateA 'detail-summary.html'
}
$bReferences = [ordered]@{}
foreach ($name in $aReferences.Keys) { $bReferences[$name] = Join-Path $candidateB "$name.html" }
$sharedTokens = Join-Path $candidateB 'shared-tokens.css'

$fixedHashes = [ordered]@{
  ($aReferences['common-shell']) = '08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527'
  ($aReferences['search-workspace']) = '3078962D0880A28658691922D2F6CB6E9E3A9239BCE735994EC71ABABBFD4C3B'
  ($aReferences['form-workflow']) = 'A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4'
  ($aReferences['detail-summary']) = 'FD9DDD69570D420149A9904E5E05058423815C3AA8CA078FD5128E3206B2A9E3'
  $core = '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8'
  $cli = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8'
}
$fixedVisualFileCount = 197
$fixedVisualDigest = '9D35977A710AF47C2AAAC1E209A33A097BA92371D5F6C173E4AB0005F7CEB99E'

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

function Get-VisualPacket {
  $files = @()
  $files += Get-ChildItem -File -Recurse (Join-Path $experiment 'variants/07-visual-rule-synchronization')
  $files += Get-ChildItem -File -Recurse (Join-Path $experiment 'output/visual-rule-synchronization')
  $files += Get-Item @(
    (Join-Path $experiment 'visual-synchronization-plan.md'),
    (Join-Path $experiment 'visual-synchronization-result.md'),
    (Join-Path $experiment 'visual-synchronization-cost-record.md'),
    (Join-Path $experiment 'visual-synchronization-verification-record.md'),
    (Join-Path $experiment 'visual-synchronization-self-review.md'),
    (Join-Path $experiment 'verify-visual-synchronization.ps1')
  )
  return [ordered]@{ fileCount = @($files).Count; digest = Get-PacketDigest $files }
}

function Require-FixedEvidence([string]$When) {
  foreach ($entry in $fixedHashes.GetEnumerator()) { Require-Hash $entry.Key $entry.Value "$($entry.Key) $When" }
  $packet = Get-VisualPacket
  if ($packet.fileCount -ne $fixedVisualFileCount -or $packet.digest -ne $fixedVisualDigest) {
    throw "Visual Synchronization packet changed $When. Files=$($packet.fileCount), digest=$($packet.digest)."
  }
}

function Get-TreeDigest([string]$Path) {
  $root = [IO.Path]::GetFullPath($Path).TrimEnd([IO.Path]::DirectorySeparatorChar)
  $files = @(Get-ChildItem -File -Recurse $root | Where-Object FullName -NotMatch '[\\/]node_modules[\\/]')
  $lines = @($files | Sort-Object FullName | ForEach-Object {
    $relative = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    "$relative=$((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)"
  })
  return [ordered]@{
    fileCount = $files.Count
    digest = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes(($lines -join "`n"))))
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

function Require-SnapshotHealth([string]$Path, [string]$Label, [int]$HarnessRoots) {
  $bundle = Read-Json $Path
  if (@($bundle.network.externalRequests).Count -ne 0 -or $bundle.network.failedRequestCount -ne 0) { throw "$Label contains external or failed requests." }
  if ($bundle.console.errorCount -ne 0) { throw "$Label contains console errors." }
  foreach ($scenario in $bundle.scenarios) {
    if (@($scenario.loadConsoleErrors).Count -ne 0) { throw "$Label has load console errors." }
    foreach ($step in $scenario.steps) {
      if ($step.actionError -or @($step.consoleErrors).Count -ne 0) { throw "$Label has action or console errors." }
    }
  }
  foreach ($state in Get-AllStates $bundle) {
    if (@($state.duplicateKeys).Count -ne 0 -or @($state.semanticAmbiguities).Count -ne 0) { throw "$Label has identity failures." }
    if (@($state.accessibilityIssues).Count -ne 0) { throw "$Label has bounded accessibility failures." }
    if (@($state.accessibilityTree.unnamedInteractive.PSObject.Properties).Count -ne 0) { throw "$Label has unnamed accessibility controls." }
    if ($state.observationBoundary.excludedHarnessRoots -ne $HarnessRoots -or $state.observationBoundary.axExcludedHarnessRoots -ne $HarnessRoots) { throw "$Label has an unexpected harness boundary." }
  }
  return $bundle
}

function Require-DetailRoundTrip($Bundle, [string]$Label) {
  if ($Bundle.scenarios.Count -ne 1 -or $Bundle.scenarios[0].steps.Count -ne 2) { throw "$Label has an unexpected disclosure scenario shape." }
  $states = @($Bundle.initial, $Bundle.scenarios[0].steps[0].state, $Bundle.scenarios[0].steps[1].state)
  $openStates = @($states | ForEach-Object { $_.elements.'processing-notes'.attributes.open })
  if ($openStates[0] -ne $false -or $openStates[1] -ne $true -or $openStates[2] -ne $false) { throw "$Label did not complete closed-open-closed." }
  foreach ($state in $states[1..2]) {
    if ($state.document.activeRef -ne 'processing-notes-toggle') { throw "$Label did not retain focus on the disclosure trigger." }
    if ($state.elements.'processing-notes-toggle'.styles.outlineStyle -ne 'solid') { throw "$Label did not expose keyboard focus styling." }
  }
  $boxes = @($states | ForEach-Object { $_.elements.'processing-notes-toggle'.box })
  foreach ($box in $boxes[1..2]) {
    if ($box.x -ne $boxes[0].x -or $box.y -ne $boxes[0].y -or $box.width -ne $boxes[0].width -or $box.height -ne $boxes[0].height) { throw "$Label moved or resized its disclosure trigger." }
  }
}

function Require-PassReport([string]$Path, [string]$Label) {
  $report = Read-Json $Path
  if ($report.status -ne 'pass' -or $report.summary.errorCount -ne 0) { throw "$Label did not pass with zero errors." }
  return $report
}

function Require-FailReport([string]$Path, [string]$PathPattern, [string]$Label) {
  $report = Read-Json $Path
  $paths = @($report.summary.errorSignatures.path)
  if ($report.status -ne 'fail' -or $report.summary.errorCount -lt 1 -or -not ($paths -match $PathPattern)) {
    throw "$Label did not expose the expected difference. Paths=$($paths -join ', ')."
  }
  $unexpected = @($paths | Where-Object { $_ -notmatch $PathPattern })
  if ($unexpected.Count -ne 0) { throw "$Label exposed unintended differences: $($unexpected -join ', ')." }
  return $report
}

function Require-Preflight([string]$Path, [string]$Label, [string]$Status = 'pass') {
  $report = Read-Json $Path
  if ($report.status -ne $Status) { throw "$Label preflight status was $($report.status), expected $Status." }
  if ($Status -eq 'pass' -and ($report.summary.errorCount -ne 0 -or $report.summary.warningCount -ne 0)) { throw "$Label preflight was not zero-error and zero-warning." }
  if ($report.responsibility -ne 'reference-library-only') { throw "$Label has the wrong Conformance responsibility." }
  return $report
}

function Replace-Count([string]$Path, [string]$Before, [string]$After, [int]$Expected, [string]$Label) {
  $text = Get-Content -Raw -LiteralPath $Path
  $count = [regex]::Matches($text, [regex]::Escape($Before)).Count
  if ($count -ne $Expected) { throw "$Label source count was $count, expected $Expected." }
  [IO.File]::WriteAllText($Path, $text.Replace($Before, $After), [Text.Encoding]::UTF8)
}

function Copy-Candidate([string]$Candidate, [string]$Destination) {
  New-Item -ItemType Directory -Path $Destination -Force | Out-Null
  $source = if ($Candidate -eq 'a-self-contained') { $aReferences } else { $bReferences }
  foreach ($entry in $source.GetEnumerator()) { Copy-Item -LiteralPath $entry.Value -Destination (Join-Path $Destination "$($entry.Key).html") -Force }
  if ($Candidate -eq 'b-token-only') { Copy-Item -LiteralPath $sharedTokens -Destination $Destination -Force }
}

function Get-SourceHashes([string]$Root) {
  $hashes = @{}
  foreach ($file in Get-ChildItem -File -Recurse $Root) { $hashes[$file.FullName.Substring($Root.Length + 1)] = (Get-FileHash $file.FullName -Algorithm SHA256).Hash }
  return $hashes
}

function Require-SourceHashes($Expected, [string]$Root, [string]$Label) {
  $actual = Get-SourceHashes $Root
  if ($actual.Count -ne $Expected.Count) { throw "$Label file count changed." }
  foreach ($entry in $Expected.GetEnumerator()) {
    if (-not $actual.ContainsKey($entry.Key) -or $actual[$entry.Key] -ne $entry.Value) { throw "$Label did not restore $($entry.Key)." }
  }
}

function New-DarkDetail([string]$SourceRoot, [string]$Destination, [string]$Candidate) {
  New-Item -ItemType Directory -Path $Destination -Force | Out-Null
  Copy-Item -LiteralPath (Join-Path $SourceRoot 'detail-summary.html') -Destination (Join-Path $Destination 'detail-summary.html') -Force
  if ($Candidate -eq 'b-token-only') { Copy-Item -LiteralPath (Join-Path $SourceRoot 'shared-tokens.css') -Destination $Destination -Force }
  Replace-Count (Join-Path $Destination 'detail-summary.html') '<body data-theme="light">' '<body data-theme="dark">' 1 "$Candidate dark detail"
  return Join-Path $Destination 'detail-summary.html'
}

function Get-ScreenshotHashEvidence([string]$BaselineRoot, [string]$CandidateRoot) {
  $baselineFiles = @(Get-ChildItem -File -Recurse $BaselineRoot)
  $candidateFiles = @(Get-ChildItem -File -Recurse $CandidateRoot)
  if ($baselineFiles.Count -ne $candidateFiles.Count) { throw 'Screenshot file count changed.' }
  $candidateMap = @{}
  foreach ($file in $candidateFiles) { $candidateMap[$file.FullName.Substring($CandidateRoot.Length + 1)] = $file }
  $mismatches = @()
  foreach ($file in $baselineFiles) {
    $relative = $file.FullName.Substring($BaselineRoot.Length + 1)
    if (-not $candidateMap.ContainsKey($relative)) { throw "Screenshot $relative is missing." }
    if ((Get-FileHash $file.FullName -Algorithm SHA256).Hash -ne (Get-FileHash $candidateMap[$relative].FullName -Algorithm SHA256).Hash) { $mismatches += $relative }
  }
  return [ordered]@{ screenshotFiles = $baselineFiles.Count; byteIdenticalFiles = $baselineFiles.Count - $mismatches.Count; byteHashMismatches = $mismatches }
}

function Invoke-CommonProbe([string]$Candidate, [string]$ProbeBase) {
  $root = Join-Path $ProbeBase $Candidate
  Copy-Candidate $Candidate $root
  $original = Get-SourceHashes $root
  if ($Candidate -eq 'a-self-contained') {
    Replace-Count (Join-Path $root 'common-shell.html') '--focus: #86b9ee;' '--focus: #ff00aa;' 1 "$Candidate common light focus"
    Replace-Count (Join-Path $root 'common-shell.html') '--focus: #9acbff;' '--focus: #ff80cc;' 1 "$Candidate common dark focus"
    Replace-Count (Join-Path $root 'search-workspace.html') '--focus: #86b9ee;' '--focus: #ff00aa;' 1 "$Candidate workspace focus"
    Replace-Count (Join-Path $root 'form-workflow.html') '--focus: #86b9ee;' '--focus: #ff00aa;' 1 "$Candidate form focus"
    Replace-Count (Join-Path $root 'detail-summary.html') '--focus: #86b9ee;' '--focus: #ff00aa;' 1 "$Candidate detail light focus"
    Replace-Count (Join-Path $root 'detail-summary.html') '--focus: #9acbff;' '--focus: #ff80cc;' 1 "$Candidate detail dark focus"
    $changedFiles = 4
    $changedLocations = 6
  } else {
    Replace-Count (Join-Path $root 'shared-tokens.css') '--focus: #86b9ee;' '--focus: #ff00aa;' 1 "$Candidate shared light focus"
    Replace-Count (Join-Path $root 'shared-tokens.css') '--focus: #9acbff;' '--focus: #ff80cc;' 1 "$Candidate shared dark focus"
    $changedFiles = 1
    $changedLocations = 2
  }

  foreach ($name in @('common-shell', 'search-workspace', 'form-workflow', 'detail-summary')) {
    $report = Join-Path $output "probe-common.$Candidate.$name.report.json"
    Invoke-ReferenceUi @('verify', (Join-Path $root "$name.html"), '--baseline', (Join-Path $output "baseline.$name.snapshot.json"), '--out', $report) 1 "$Candidate common probe $name"
    Require-FailReport $report '\.styles\.outlineColor$' "$Candidate common probe $name" | Out-Null
  }
  $darkRoot = Join-Path $ProbeBase "$Candidate-dark"
  $darkDetail = New-DarkDetail $root $darkRoot $Candidate
  $darkReport = Join-Path $output "probe-common.$Candidate.detail-summary-dark.report.json"
  Invoke-ReferenceUi @('verify', $darkDetail, '--baseline', (Join-Path $output 'baseline.detail-summary-dark.snapshot.json'), '--out', $darkReport) 1 "$Candidate common probe detail dark"
  Require-FailReport $darkReport '\.styles\.outlineColor$' "$Candidate common probe detail dark" | Out-Null

  Copy-Candidate $Candidate $root
  Require-SourceHashes $original $root "$Candidate common probe"
  return [ordered]@{
    changedFiles = $changedFiles
    changedLocations = $changedLocations
    lightLocations = if ($Candidate -eq 'a-self-contained') { 4 } else { 1 }
    darkLocations = if ($Candidate -eq 'a-self-contained') { 2 } else { 1 }
    validationCommands = 5
    restoreFileWrites = $changedFiles
    restoredByteIdentically = $true
    unintendedDifferencePaths = 0
    synchronizationRisk = if ($Candidate -eq 'a-self-contained') { 'six edits across four files can diverge' } else { 'one file owns both theme values; five fan-out validations remain' }
  }
}

function Invoke-LocalProbe([string]$Candidate, [string]$ProbeBase) {
  $root = Join-Path $ProbeBase $Candidate
  Copy-Candidate $Candidate $root
  $original = Get-SourceHashes $root
  $sharedBefore = if ($Candidate -eq 'b-token-only') { (Get-FileHash (Join-Path $root 'shared-tokens.css') -Algorithm SHA256).Hash } else { $null }
  $priorHashes = @{}
  foreach ($name in @('common-shell', 'search-workspace', 'form-workflow')) { $priorHashes[$name] = (Get-FileHash (Join-Path $root "$name.html") -Algorithm SHA256).Hash }

  $detail = Join-Path $root 'detail-summary.html'
  Replace-Count $detail '--status-accent: #1d73b7;' '--status-accent: #6b4eff;' 1 "$Candidate local light status"
  Replace-Count $detail '--status-accent: #68aee7;' '--status-accent: #c4b5fd;' 1 "$Candidate local dark status"

  $lightReport = Join-Path $output "probe-local.$Candidate.detail-summary.report.json"
  Invoke-ReferenceUi @('verify', $detail, '--baseline', (Join-Path $output 'baseline.detail-summary.snapshot.json'), '--out', $lightReport) 1 "$Candidate local detail light"
  Require-FailReport $lightReport 'elements\.record-status\.styles\.border(?:Top|Right|Bottom|Left)Color$' "$Candidate local detail light" | Out-Null
  $darkRoot = Join-Path $ProbeBase "$Candidate-dark"
  $darkDetail = New-DarkDetail $root $darkRoot $Candidate
  $darkReport = Join-Path $output "probe-local.$Candidate.detail-summary-dark.report.json"
  Invoke-ReferenceUi @('verify', $darkDetail, '--baseline', (Join-Path $output 'baseline.detail-summary-dark.snapshot.json'), '--out', $darkReport) 1 "$Candidate local detail dark"
  Require-FailReport $darkReport 'elements\.record-status\.styles\.border(?:Top|Right|Bottom|Left)Color$' "$Candidate local detail dark" | Out-Null

  $shellReport = Join-Path $output "probe-local.$Candidate.common-shell-unaffected.report.json"
  Invoke-ReferenceUi @('verify', (Join-Path $root 'common-shell.html'), '--baseline', (Join-Path $output 'baseline.common-shell.snapshot.json'), '--out', $shellReport) 0 "$Candidate local shell unaffected"
  Require-PassReport $shellReport "$Candidate local shell unaffected" | Out-Null
  foreach ($name in $priorHashes.Keys) {
    if ((Get-FileHash (Join-Path $root "$name.html") -Algorithm SHA256).Hash -ne $priorHashes[$name]) { throw "$Candidate local probe changed $name." }
  }
  if ($Candidate -eq 'b-token-only' -and (Get-FileHash (Join-Path $root 'shared-tokens.css') -Algorithm SHA256).Hash -ne $sharedBefore) { throw 'Local probe changed the shared token file.' }

  Copy-Candidate $Candidate $root
  Require-SourceHashes $original $root "$Candidate local probe"
  return [ordered]@{
    changedFiles = 1
    changedLocations = 2
    sharedLayerEdits = 0
    validationCommands = 3
    restoreFileWrites = 1
    restoredByteIdentically = $true
    priorReferenceHashesChanged = 0
    commonShellComparison = 'pass, zero errors'
    falseSharingEvidence = 'status accent changed independently while the equal shell accent and shared token file remained unchanged'
  }
}

$probeRoot = Join-Path $env:TEMP "poc017-token-ownership-theme-$([guid]::NewGuid().ToString('N'))"
$consumerBefore = Get-TreeDigest (Join-Path $experiment 'consumers')
$variantBefore = Get-TreeDigest $variant
Push-Location $experiment
try {
  Require-FixedEvidence 'before the Gate'
  node --check $cli
  if ($LASTEXITCODE -ne 0) { throw 'CLI syntax check failed.' }
  node --check $core
  if ($LASTEXITCODE -ne 0) { throw 'Core syntax check failed.' }

  New-Item -ItemType Directory -Path $output -Force | Out-Null
  New-Item -ItemType Directory -Path $probeRoot | Out-Null

  $persistentSources = @(Get-ChildItem -File -Recurse $variant | Select-Object -ExpandProperty FullName)
  $external = rg -n --pcre2 'https?://|@import|\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\b' @persistentSources
  if ($LASTEXITCODE -eq 0) { throw "A candidate introduced external communication:`n$external" }
  if ($LASTEXITCODE -gt 1) { throw 'External-communication scan failed.' }

  $screenshotEvidence = [ordered]@{}
  $baselineBundles = [ordered]@{}
  foreach ($name in $aReferences.Keys) {
    $harnessRoots = if ($name -eq 'detail-summary') { 0 } else { 1 }
    $baseline = Join-Path $output "baseline.$name.snapshot.json"
    $artifacts = Join-Path $output "baseline.$name.screens"
    Invoke-ReferenceUi @('snapshot', $aReferences[$name], '--out', $baseline, '--artifacts', $artifacts) 0 "A $name snapshot"
    $bundle = Require-SnapshotHealth $baseline "A $name" $harnessRoots
    if ($name -eq 'detail-summary') { Require-DetailRoundTrip $bundle 'A detail summary' }
    $baselineBundles[$name] = [ordered]@{ elements = @($bundle.initial.elements.PSObject.Properties).Count; scenarios = $bundle.scenarios.Count; states = (Get-AllStates $bundle).Count }
    $preflight = Join-Path $output "preflight.a.$name.json"
    Invoke-ReferenceUi @('preflight', $aReferences[$name], '--out', $preflight) 0 "A $name preflight"
    Require-Preflight $preflight "A $name" | Out-Null

    $bSnapshot = Join-Path $output "b.$name.snapshot.json"
    $bArtifacts = Join-Path $output "b.$name.screens"
    Invoke-ReferenceUi @('snapshot', $bReferences[$name], '--out', $bSnapshot, '--artifacts', $bArtifacts) 0 "B $name snapshot"
    $bBundle = Require-SnapshotHealth $bSnapshot "B $name" $harnessRoots
    if ($name -eq 'detail-summary') { Require-DetailRoundTrip $bBundle 'B detail summary' }
    $report = Join-Path $output "b.$name.report.json"
    Invoke-ReferenceUi @('verify', $bReferences[$name], '--baseline', $baseline, '--out', $report) 0 "B $name comparison"
    Require-PassReport $report "B $name comparison" | Out-Null
    $screenshotEvidence[$name] = Get-ScreenshotHashEvidence $artifacts $bArtifacts
    $bPreflight = Join-Path $output "preflight.b.$name.json"
    Invoke-ReferenceUi @('preflight', $bReferences[$name], '--out', $bPreflight) 0 "B $name preflight"
    Require-Preflight $bPreflight "B $name" | Out-Null
  }

  $darkAPath = New-DarkDetail $candidateA (Join-Path $probeRoot 'dark-a') 'a-self-contained'
  $darkBPath = New-DarkDetail $candidateB (Join-Path $probeRoot 'dark-b') 'b-token-only'
  $darkBaseline = Join-Path $output 'baseline.detail-summary-dark.snapshot.json'
  $darkAArtifacts = Join-Path $output 'baseline.detail-summary-dark.screens'
  Invoke-ReferenceUi @('snapshot', $darkAPath, '--out', $darkBaseline, '--artifacts', $darkAArtifacts) 0 'A detail dark snapshot'
  $darkABundle = Require-SnapshotHealth $darkBaseline 'A detail dark' 0
  Require-DetailRoundTrip $darkABundle 'A detail dark'
  $darkAPreflight = Join-Path $output 'preflight.a.detail-summary-dark.json'
  Invoke-ReferenceUi @('preflight', $darkAPath, '--out', $darkAPreflight) 0 'A detail dark preflight'
  Require-Preflight $darkAPreflight 'A detail dark' | Out-Null
  $darkBSnapshot = Join-Path $output 'b.detail-summary-dark.snapshot.json'
  $darkBArtifacts = Join-Path $output 'b.detail-summary-dark.screens'
  Invoke-ReferenceUi @('snapshot', $darkBPath, '--out', $darkBSnapshot, '--artifacts', $darkBArtifacts) 0 'B detail dark snapshot'
  $darkBBundle = Require-SnapshotHealth $darkBSnapshot 'B detail dark' 0
  Require-DetailRoundTrip $darkBBundle 'B detail dark'
  $darkReport = Join-Path $output 'b.detail-summary-dark.report.json'
  Invoke-ReferenceUi @('verify', $darkBPath, '--baseline', $darkBaseline, '--out', $darkReport) 0 'B detail dark comparison'
  Require-PassReport $darkReport 'B detail dark comparison' | Out-Null
  $screenshotEvidence['detail-summary-dark'] = Get-ScreenshotHashEvidence $darkAArtifacts $darkBArtifacts
  $darkBPreflight = Join-Path $output 'preflight.b.detail-summary-dark.json'
  Invoke-ReferenceUi @('preflight', $darkBPath, '--out', $darkBPreflight) 0 'B detail dark preflight'
  Require-Preflight $darkBPreflight 'B detail dark' | Out-Null

  $negativePreflights = [ordered]@{
    'semantic-ambiguity' = 'variants/02-mixed-semantic/semantic-ambiguity-probe.html'
    'relational-ambiguity' = 'variants/03-relational-reuse/relational-ambiguity-probe.html'
    'whole-page-missing-h1' = 'variants/04-partial-reference/probes/whole-page-missing-h1.html'
  }
  foreach ($entry in $negativePreflights.GetEnumerator()) {
    $report = Join-Path $output "conformance-negative.$($entry.Key).json"
    Invoke-ReferenceUi @('preflight', $entry.Value, '--out', $report) 1 "Conformance negative $($entry.Key)"
    Require-Preflight $report "Conformance negative $($entry.Key)" 'error' | Out-Null
  }
  Invoke-ReferenceUi @('verify', 'consumers/negative/index.html', '--root', 'consumers', '--baseline', 'output/reference.snapshot.json', '--out', (Join-Path $output 'historical-negative.report.json')) 1 'Historical comparative negative'
  Invoke-ReferenceUi @('snapshot', 'iterations/01-semantic-only/reference.html', '--out', (Join-Path $output 'semantic-only-reference.snapshot.json')) 0 'Semantic-only Reference regression'
  Invoke-ReferenceUi @('verify', 'iterations/01-semantic-only/consumer.html', '--baseline', (Join-Path $output 'semantic-only-reference.snapshot.json'), '--out', (Join-Path $output 'semantic-only-consumer.report.json')) 1 'Semantic-only comparative negative'

  $commonProbe = [ordered]@{}
  $localProbe = [ordered]@{}
  foreach ($candidate in @('a-self-contained', 'b-token-only')) {
    $commonProbe[$candidate] = Invoke-CommonProbe $candidate (Join-Path $probeRoot 'common')
    $localProbe[$candidate] = Invoke-LocalProbe $candidate (Join-Path $probeRoot 'local')
  }

  $metrics = [ordered]@{
    fourthReference = [ordered]@{
      responsibility = 'read-only record summary workspace'
      lines = (Get-Content $aReferences['detail-summary']).Count
      productScripts = 0
      scenarios = 1
      scenarioActions = 2
      observedElements = $baselineBundles['detail-summary'].elements
      harnessRoots = 0
    }
    themeCoverage = [ordered]@{
      lightReferences = 4
      completeDarkReferences = 2
      darkReferences = @('common-shell', 'detail-summary')
      lightSharedTokenDefinitionsA = 12
      darkSharedTokenDefinitionsA = 6
      lightSharedTokenDefinitionsB = 3
      darkSharedTokenDefinitionsB = 3
    }
    understanding = [ordered]@{
      filesForOneReferenceA = 1
      filesForOneReferenceB = 2
      sharedStylesheetLines = (Get-Content $sharedTokens).Count
      staticImportsB = 4
      buildRuntimeDependenciesAdded = 0
    }
    ownership = [ordered]@{
      canvas = 'shared: application workspace backdrop in light and complete dark themes'
      surface = 'shared: primary content surface in light and complete dark themes'
      focus = 'shared: keyboard focus indicator color; selector and geometry remain local'
      statusAccent = 'local false-sharing example: equal to shell accent in both themes but represents record status/timeline, not navigation selection'
      newSharedTokenCandidates = 0
    }
  }
  $metrics | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'source-metrics.json') -Encoding utf8
  [ordered]@{ commonTheme = $commonProbe; localAndFalseSharing = $localProbe } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'maintenance-probes.json') -Encoding utf8
  [ordered]@{ comparisons = $screenshotEvidence; interpretation = 'PNG byte hashes are supplementary to state/computed-style comparison.' } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'screenshot-evidence.json') -Encoding utf8
  [ordered]@{
    browser = $browser
    attempts = $script:harnessAttempts
    timeouts = $script:harnessTimeouts
    retries = $script:harnessRetries
    events = $script:harnessEvents
  } | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath (Join-Path $output 'harness-reliability.json') -Encoding utf8

  $historical = Read-Json (Join-Path $output 'historical-negative.report.json')
  $semantic = Read-Json (Join-Path $output 'semantic-only-consumer.report.json')
  if ($historical.status -ne 'fail' -or $historical.summary.uniqueErrorCount -ne 15) { throw 'Historical negative coverage changed.' }
  if ($semantic.status -ne 'fail' -or @($semantic.summary.errorSignatures.path) -notcontains 'semanticInventory.combobox') { throw 'Semantic-only negative coverage changed.' }

  $consumerAfter = Get-TreeDigest (Join-Path $experiment 'consumers')
  $variantAfter = Get-TreeDigest $variant
  if ($consumerBefore.digest -ne $consumerAfter.digest -or $consumerBefore.fileCount -ne $consumerAfter.fileCount) { throw 'Consumer tree changed during the Gate.' }
  if ($variantBefore.digest -ne $variantAfter.digest -or $variantBefore.fileCount -ne $variantAfter.fileCount) { throw 'Persistent Variant changed during probes.' }

  [ordered]@{
    status = 'pass'
    fourthReference = $metrics.fourthReference
    canonicalComparisons = 5
    positiveConformanceChecks = 10
    retainedConformanceNegatives = 3
    retainedComparativeNegatives = 2
    baselineBundles = $baselineBundles
    screenshotEvidence = $screenshotEvidence
    commonThemeProbe = $commonProbe
    localAndFalseSharingProbe = $localProbe
    fixedVisualPacket = Get-VisualPacket
    consumerTree = $consumerAfter
    consumerRequirementsAdded = 0
    coreSha256 = (Get-FileHash $core -Algorithm SHA256).Hash
    cliSha256 = (Get-FileHash $cli -Algorithm SHA256).Hash
    cliCoreChanges = 0
    conformanceRulesAdded = 0
    buildRuntimeDependenciesAdded = 0
    externalRequests = 0
    failedRequests = 0
  } | ConvertTo-Json -Depth 30 | Set-Content -LiteralPath (Join-Path $output 'gate-summary.json') -Encoding utf8

  Require-FixedEvidence 'after the Gate'
  Write-Host 'Shared Token Ownership / Theme Independence Gate passed mechanically.'
  Write-Host 'Canonical comparisons: 5; positive Conformance checks: 10; retained negatives: 5.'
  Write-Host "Harness attempts=$($script:harnessAttempts), timeouts=$($script:harnessTimeouts), retries=$($script:harnessRetries)."
}
finally {
  $resolvedProbe = [IO.Path]::GetFullPath($probeRoot)
  $safePrefix = "{0}{1}" -f [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar), [IO.Path]::DirectorySeparatorChar
  if (Test-Path -LiteralPath $resolvedProbe) {
    if ($resolvedProbe.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -and (Split-Path -Leaf $resolvedProbe).StartsWith('poc017-token-ownership-theme-')) {
      Remove-Item -LiteralPath $resolvedProbe -Recurse -Force
    }
  }
  Pop-Location
}
