[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$baselineRoot = Join-Path $experiment 'review/date-picker-human-calibration/baseline'
$adjusted = Join-Path $experiment 'review/date-picker-human-calibration/adjusted/single-date.html'
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = Join-Path $experiment "output/date-picker-human-calibration-adjustment/$runId"
$browser = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$env:REFERENCE_UI_BROWSER = $browser

$frozen = [ordered]@{
  'baseline-single' = [ordered]@{ path = Join-Path $baselineRoot 'single-date.html'; sha256 = '7FB5D151B48FEDC64CF6839EFC5B87C2D4BE0D77B3264F2FE2958CAA65F41E10' }
  'baseline-range' = [ordered]@{ path = Join-Path $baselineRoot 'date-range.html'; sha256 = 'DA068C8BB35EC3B0AF8108DF4EB72A17201886BF56B6CDFCB4B0EA58A18A9C94' }
  'adjusted-single' = [ordered]@{ path = $adjusted; sha256 = '254E3BA5B2ECD1E2A1677DD5C4FC8FA95224FCB605A74387300E47BFA40102B7' }
  'cli' = [ordered]@{ path = $cli; sha256 = '968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8' }
  'core' = [ordered]@{ path = $core; sha256 = '62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8' }
}

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Write-Json([string]$Path, $Value) {
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Path))) | Out-Null
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Assert-FrozenFiles {
  foreach ($item in $frozen.GetEnumerator()) {
    $actual = (Get-FileHash -LiteralPath $item.Value.path -Algorithm SHA256).Hash
    if ($actual -ne $item.Value.sha256) { throw "$($item.Key) hash was $actual; expected $($item.Value.sha256)." }
  }
}

function Invoke-ReferenceUi([string[]]$Arguments, [string]$Label) {
  for ($attempt = 1; $attempt -le 2; $attempt += 1) {
    $lines = @(& node $cli @Arguments 2>&1)
    $exitCode = $LASTEXITCODE
    $lines | ForEach-Object { Write-Host $_ }
    if ($exitCode -eq 0) { return }
    if ((($lines -join "`n") -match 'Timed out|timeout') -and $attempt -eq 1) {
      Write-Host "$Label timed out; retrying once."
      continue
    }
    throw "$Label exited with $exitCode."
  }
}

function Assert-SourceContract {
  $text = [IO.File]::ReadAllText($adjusted)
  $required = @(
    'role="combobox"',
    'inputmode="numeric"',
    'placeholder="yyyy-mm-dd"',
    'aria-haspopup="dialog"',
    'aria-describedby="date-hint"',
    'aria-errormessage="date-error"',
    'data-ref="date-trigger"',
    'aria-label="Open calendar"',
    'data-ref="date-close"',
    'aria-label="Close calendar"',
    'data-ref="date-prev-year"',
    'data-ref="date-prev-month"',
    'data-ref="date-next-month"',
    'data-ref="date-next-year"',
    'data-ref="date-grid"',
    'role="grid"',
    '--sunday: #b42318',
    '--saturday: #155b92',
    '.calendar th:first-child',
    '.calendar th:last-child',
    '.control-stack { position: relative; width: 336px; max-width: 100%; }',
    '.picker { position: absolute; z-index: 10; top: calc(100% + 10px); left: 0; width: 336px;',
    'data-ref="date-error"',
    'data-reference-harness="reference-label"'
  )
  foreach ($fragment in $required) {
    if (-not $text.Contains($fragment)) { throw "Adjusted Single date is missing $fragment." }
  }
  if ($text -match '<input[^>]*\sreadonly(?:\s|>)') { throw 'Adjusted Single date input is still read-only.' }
  if ($text -match '>Choose date<') { throw 'The external Choose date text button remains.' }
  if ($text -match '(?i)https?://|@import\s|\bfetch\s*\(|XMLHttpRequest|WebSocket') { throw 'Adjusted Single date contains an external-resource or network primitive.' }
  if (-not $text.Contains("const fixedToday = '2026-08-14';")) { throw 'The fixed today fixture changed.' }
  if (-not $text.Contains("if (iso === fixedToday) parts.push('today');")) { throw 'The current date lost its accessible today name.' }
  if (-not $text.Contains("if (iso === fixedToday) button.setAttribute('aria-current', 'date');")) { throw 'The current date lost aria-current.' }
  if (-not $text.Contains('setViewFromIso(selectedIso || fixedToday);')) { throw 'Reopening no longer returns to the selected date or fixed today.' }
  if ($text -notmatch 'data-ref="date-trigger"[^>]*tabindex="-1"') { throw 'The inline calendar action entered the page Tab sequence.' }
  if ($text -notmatch 'data-ref="date-clear"[^>]*tabindex="-1"') { throw 'The inline Clear action entered the page Tab sequence.' }
  if (-not $text.Contains("if (event.key === 'Tab' && !popup.hidden) close();")) { throw 'Tab-leave closing is missing.' }
  if (-not $text.Contains('button.disabled = disabled;')) { throw 'The calendar does not expose unavailable dates as disabled controls.' }
  if ([regex]::Matches($text, '\sdata-reference-harness=').Count -ne 1) { throw 'The review harness boundary changed.' }
}

function Get-ScenarioState($Bundle, [string]$Scenario, [int]$Step) {
  $match = @($Bundle.scenarios | Where-Object name -eq $Scenario)
  if ($match.Count -ne 1 -or $Step -ge $match[0].steps.Count) { throw "$Scenario step $($Step + 1) is missing." }
  return $match[0].steps[$Step].state
}

function Assert-State([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
}

function Assert-AdjustedStates($Bundle) {
  $focusOpen = Get-ScenarioState $Bundle 'input focus opens calendar' 0
  Assert-State ($focusOpen.document.activeRef -eq 'date-input' -and $focusOpen.elements.'date-input'.attributes.'aria-expanded' -eq 'true' -and $focusOpen.elements.'date-popup'.visible -eq $true) 'Input focus did not open the calendar while retaining input focus.'
  Assert-State ($focusOpen.elements.'date-control'.box.width -eq 336 -and $focusOpen.elements.'date-popup'.box.width -eq 336 -and $focusOpen.elements.'date-popup'.box.height -lt 340 -and $focusOpen.elements.'date-grid'.box.width -eq 310) 'The compact field or calendar geometry changed from the reviewed 336px candidate.'

  $tabClosed = Get-ScenarioState $Bundle 'tab leaves input and closes calendar' 0
  Assert-State ($tabClosed.elements.'date-popup'.visible -eq $false -and $tabClosed.elements.'date-input'.attributes.'aria-expanded' -eq 'false' -and $tabClosed.document.activeRef -ne 'date-input') 'Tab did not leave the input and close the calendar.'

  $iconOpen = Get-ScenarioState $Bundle 'calendar icon toggle' 0
  $iconClosed = Get-ScenarioState $Bundle 'calendar icon toggle' 1
  Assert-State ($iconOpen.elements.'date-popup'.visible -eq $true -and $iconOpen.document.activeRef -eq 'date-grid') 'Calendar icon did not open and focus the calendar.'
  Assert-State ($iconClosed.elements.'date-popup'.visible -eq $false -and $iconClosed.document.activeRef -eq 'date-trigger') 'Calendar icon did not toggle closed.'

  $monthNext = Get-ScenarioState $Bundle 'month navigation' 1
  $monthBack = Get-ScenarioState $Bundle 'month navigation' 2
  Assert-State ($monthNext.elements.'date-month-heading'.name -eq 'September 2026' -and $monthNext.elements.'date-popup'.visible -eq $true -and $monthNext.document.activeRef -eq 'date-next-month') 'Next-month navigation did not update the open calendar.'
  Assert-State ($monthBack.elements.'date-month-heading'.name -eq 'August 2026' -and $monthBack.document.activeRef -eq 'date-prev-month') 'Previous-month navigation did not return to the fixed month.'

  $yearPrevious = Get-ScenarioState $Bundle 'year navigation' 1
  $yearBack = Get-ScenarioState $Bundle 'year navigation' 2
  Assert-State ($yearPrevious.elements.'date-month-heading'.name -eq 'August 2025' -and $yearPrevious.elements.'date-popup'.visible -eq $true -and $yearPrevious.document.activeRef -eq 'date-prev-year') 'Previous-year navigation did not update the open calendar.'
  Assert-State ($yearBack.elements.'date-month-heading'.name -eq 'August 2026' -and $yearBack.document.activeRef -eq 'date-next-year') 'Next-year navigation did not return to the fixed year.'

  $pointer = Get-ScenarioState $Bundle 'pointer date selection' 1
  $keyboard = Get-ScenarioState $Bundle 'keyboard date selection' 2
  Assert-State ($pointer.elements.'date-selection'.name -eq 'Selected date: 2026-08-10.' -and $pointer.elements.'date-clear'.visible -eq $true -and $pointer.document.activeRef -eq 'date-input') 'Pointer selection did not commit the normalized value and focus return.'
  $clearRight = $pointer.elements.'date-clear'.box.x + $pointer.elements.'date-clear'.box.width
  Assert-State ($clearRight -eq $pointer.elements.'date-trigger'.box.x -and $pointer.elements.'date-trigger'.styles.borderLeftWidth -eq '1px') 'The Clear/calendar separator is missing or the inline actions overlap.'
  Assert-State ($keyboard.elements.'date-selection'.name -eq 'Selected date: 2026-08-11.' -and $keyboard.elements.'date-next-day'.attributes.'aria-pressed' -eq 'true' -and $keyboard.document.activeRef -eq 'date-input') 'Keyboard selection did not commit the normalized value and selected state.'

  $disabledDate = Get-ScenarioState $Bundle 'disabled future date' 1
  Assert-State ($disabledDate.elements.'date-disabled-day'.attributes.disabled -eq $true -and $disabledDate.elements.'date-popup'.visible -eq $true -and $disabledDate.elements.'date-selection'.name -eq 'No date selected.' -and $disabledDate.document.activeRef -eq 'date-grid') 'The disabled future date changed selection, closed the calendar, or lost the calendar focus context.'

  $compact = Get-ScenarioState $Bundle 'compact manual input' 1
  Assert-State ($compact.elements.'date-input'.attributes.'aria-invalid' -eq 'false' -and $compact.elements.'date-error'.visible -eq $false -and $compact.elements.'date-selection'.name -eq 'Selected date: 2026-08-12.' -and $compact.elements.'date-clear'.visible -eq $true) 'Compact manual input did not normalize to the expected valid state.'

  $invalid = Get-ScenarioState $Bundle 'invalid manual input' 1
  Assert-State ($invalid.elements.'date-input'.attributes.'aria-invalid' -eq 'true' -and $invalid.elements.'date-input'.attributes.'aria-describedby' -eq 'date-hint date-error' -and $invalid.elements.'date-error'.visible -eq $true -and $invalid.elements.'date-selection'.name -eq 'Invalid date.' -and $invalid.elements.'date-popup'.visible -eq $false) 'Invalid manual input was not rejected with visible and described recovery state.'

  $future = Get-ScenarioState $Bundle 'future manual input' 1
  Assert-State ($future.elements.'date-input'.attributes.'aria-invalid' -eq 'true' -and $future.elements.'date-error'.visible -eq $true -and $future.elements.'date-error'.name -eq 'Enter a date on or before 2026-08-14.' -and $future.elements.'date-selection'.name -eq 'Future date is unavailable.') 'Future manual input was not rejected with a boundary-specific recovery message.'

  $corrected = Get-ScenarioState $Bundle 'correct future manual input' 2
  Assert-State ($corrected.elements.'date-input'.attributes.'aria-invalid' -eq 'false' -and $corrected.elements.'date-input'.attributes.'aria-describedby' -eq 'date-hint' -and $corrected.elements.'date-error'.visible -eq $false -and $corrected.elements.'date-selection'.name -eq 'Selected date: 2026-08-12.') 'Correction after future input did not recover and remove the error description.'

  foreach ($scenario in @('escape closes calendar', 'close button closes calendar')) {
    $closed = Get-ScenarioState $Bundle $scenario 1
    Assert-State ($closed.elements.'date-popup'.visible -eq $false -and $closed.elements.'date-input'.attributes.'aria-expanded' -eq 'false' -and $closed.document.activeRef -eq 'date-input') "$scenario did not close and return focus to the input."
  }

  $reopen = Get-ScenarioState $Bundle 'clear and reopen' 3
  Assert-State ($reopen.elements.'date-popup'.visible -eq $true -and $reopen.elements.'date-clear'.visible -eq $false -and $reopen.elements.'date-selection'.name -eq 'No date selected.' -and $reopen.document.activeRef -eq 'date-grid') 'Clear and reselection did not return to the empty open state.'

  $initialTrigger = $Bundle.initial.elements.'date-trigger'.box
  foreach ($state in @($focusOpen, $compact, $invalid)) {
    $trigger = $state.elements.'date-trigger'.box
    Assert-State ($trigger.x -eq $initialTrigger.x -and $trigger.y -eq $initialTrigger.y -and $trigger.width -eq $initialTrigger.width -and $trigger.height -eq $initialTrigger.height) 'The integrated calendar trigger moved across focus, valid, or invalid states.'
  }
}

[IO.Directory]::CreateDirectory($output) | Out-Null
Assert-FrozenFiles
Assert-SourceContract

$preflightPath = Join-Path $output 'single-date.preflight.json'
$snapshotPath = Join-Path $output 'single-date.snapshot.json'
$artifacts = Join-Path $output 'single-date-artifacts'
Invoke-ReferenceUi @('preflight', $adjusted, '--out', $preflightPath) 'adjusted Single date preflight'
Invoke-ReferenceUi @('snapshot', $adjusted, '--out', $snapshotPath, '--artifacts', $artifacts) 'adjusted Single date snapshot'

$preflight = Read-Json $preflightPath
if ($preflight.status -ne 'pass' -or $preflight.summary.errorCount -ne 0 -or $preflight.summary.checkedStateCount -ne 35) { throw 'Adjusted Single date conformance did not pass 35 states.' }
if ($preflight.console.errorCount -ne 0 -or @($preflight.network.externalRequests).Count -ne 0 -or $preflight.network.failedRequestCount -ne 0) { throw 'Adjusted Single date preflight had runtime or network errors.' }

$bundle = Read-Json $snapshotPath
if (@($bundle.scenarios).Count -ne 15 -or $bundle.console.errorCount -ne 0 -or @($bundle.network.externalRequests).Count -ne 0 -or $bundle.network.failedRequestCount -ne 0) { throw 'Adjusted Single date snapshot health failed.' }
$states = @($bundle.initial)
foreach ($scenario in $bundle.scenarios) { foreach ($step in $scenario.steps) { $states += $step.state } }
foreach ($state in $states) {
  if (@($state.duplicateKeys).Count -ne 0 -or @($state.semanticAmbiguities).Count -ne 0 -or @($state.accessibilityIssues).Count -ne 0) { throw 'Adjusted Single date had identity or bounded accessibility issues.' }
  if ($state.observationBoundary.excludedHarnessRoots -ne 1 -or $state.observationBoundary.axExcludedHarnessRoots -ne 1) { throw 'The review harness entered product observation.' }
}
Assert-AdjustedStates $bundle
Assert-FrozenFiles

$manifest = [ordered]@{
  responsibility = 'human-calibration-single-date-adjustment-evidence'
  status = 'adjusted-candidate-awaiting-human-confirmation'
  runId = $runId
  adjusted = [ordered]@{ path = 'review/date-picker-human-calibration/adjusted/single-date.html'; sha256 = $frozen['adjusted-single'].sha256 }
  preserved = [ordered]@{
    baselineSingleSha256 = $frozen['baseline-single'].sha256
    baselineRangeSha256 = $frozen['baseline-range'].sha256
    cliSha256 = $frozen.cli.sha256
    coreSha256 = $frozen.core.sha256
  }
  checks = [ordered]@{
    conformanceStates = 35
    scenarios = 15
    consoleErrors = 0
    externalRequests = 0
    failedRequests = 0
    boundedAccessibilityIssues = 0
    duplicateKeys = 0
    semanticAmbiguities = 0
    integratedTriggerGeometryStable = $true
    pageTabStopsInComposite = 1
    monthAndYearNavigation = $true
    futureDatesUnavailable = $true
    compactFieldWidth = 336
    compactPopupWidth = 336
    compactPopupHeightBelow = 340
    inlineActionDivider = $true
    weekendColumnColor = $true
  }
  observationGap = 'The current Core does not capture editable input value or the unkeyed current-day cell directly; normalized value and today treatment rely on live/source state plus rendered evidence.'
  next = 'Human confirmation before Core change, Target transfer, observation classification, or final Gate judgment.'
}
Write-Json (Join-Path $output 'adjustment-manifest.json') $manifest

Write-Host 'DatePicker Single date adjustment verification: pass'
Write-Host "Evidence: $output"
