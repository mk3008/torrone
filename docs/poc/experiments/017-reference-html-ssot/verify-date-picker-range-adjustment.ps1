[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$baseline = Join-Path $experiment 'review/date-picker-human-calibration/baseline/date-range.html'
$acceptedSingle = Join-Path $experiment 'review/date-picker-human-calibration/adjusted/single-date.html'
$adjusted = Join-Path $experiment 'review/date-picker-human-calibration/adjusted/date-range.html'
$cli = Join-Path $experiment 'cli/reference-ui.mjs'
$core = Join-Path $experiment 'core/browser-core.js'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = Join-Path $experiment "output/date-picker-human-calibration-range-adjustment/$runId"
$env:REFERENCE_UI_BROWSER = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

$frozen = [ordered]@{
  'baseline-range' = [ordered]@{ path = $baseline; sha256 = 'DA068C8BB35EC3B0AF8108DF4EB72A17201886BF56B6CDFCB4B0EA58A18A9C94' }
  'accepted-single' = [ordered]@{ path = $acceptedSingle; sha256 = '254E3BA5B2ECD1E2A1677DD5C4FC8FA95224FCB605A74387300E47BFA40102B7' }
  'adjusted-range' = [ordered]@{ path = $adjusted; sha256 = '387EC789769DE702263A802DE27368EA2128A2F27C25002E494C00DC65CC5D86' }
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

function Assert-State([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
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
    'id="range-start-input"',
    'id="range-end-input"',
    '>Start date</label>',
    '>End date</label>',
    'role="combobox"',
    'inputmode="numeric"',
    'placeholder="yyyy-mm-dd"',
    'aria-haspopup="dialog"',
    'aria-errormessage="range-start-error"',
    'aria-errormessage="range-end-error"',
    'aria-label="Open calendar for start date"',
    'aria-label="Open calendar for end date"',
    'data-ref="range-popup"',
    'role="dialog"',
    'data-ref="range-grid"',
    'role="grid"',
    'data-ref="range-prev-year"',
    'data-ref="range-prev-month"',
    'data-ref="range-next-month"',
    'data-ref="range-next-year"',
    'data-ref="range-close"',
    'data-ref="range-status"',
    'data-ref="range-note"',
    'data-ref="range-selection"',
    "return 'range-before-start-day';",
    '.range-fields { position: relative; display: grid; width: max-content; max-width: 100%; grid-template-columns: 280px 24px 280px;',
    '.boundary-stack { width: 280px; }',
    '.picker { position: absolute; z-index: 10; top: calc(100% + 10px); left: 0; width: 336px;',
    '.range-fields[data-anchor="end"] .picker { right: 0; left: auto; }',
    '.calendar td.in-range-cell { background: var(--range-bg); }',
    '.calendar td.in-range-cell .day:not([aria-pressed="true"]) { background: var(--range-bg); }',
    '.day:disabled { color: var(--disabled-text); background: transparent;',
    '.day:hover:not(:disabled):not([aria-pressed="true"])',
    'Either date may be blank.',
    '--sunday: #b42318',
    '--saturday: #155b92',
    'data-reference-harness="reference-label"'
  )
  foreach ($fragment in $required) {
    if (-not $text.Contains($fragment)) { throw "Adjusted Date range is missing $fragment." }
  }
  if ([regex]::Matches($text, 'role="combobox"').Count -ne 2) { throw 'Date range must expose two explicit editable comboboxes.' }
  if ($text -match '<input[^>]*\sreadonly(?:\s|>)') { throw 'A Date range input is read-only.' }
  if ($text -match '(?i)https?://|@import\s|\bfetch\s*\(|XMLHttpRequest|WebSocket') { throw 'Adjusted Date range contains an external-resource or network primitive.' }
  if (-not $text.Contains("const fixedToday = '2026-08-14';")) { throw 'The fixed today fixture changed.' }
  if (-not $text.Contains('for (let week = 0; week < 6; week += 1)')) { throw 'The calendar no longer renders six weeks.' }
  if (-not $text.Contains('button.disabled = disabled;')) { throw 'Unavailable dates are not native disabled controls.' }
  if ($text -notmatch 'data-ref="range-start-trigger"[^>]*tabindex="-1"' -or $text -notmatch 'data-ref="range-end-trigger"[^>]*tabindex="-1"') { throw 'An inline calendar action entered the page Tab sequence.' }
  if ($text -notmatch 'data-ref="range-start-clear"[^>]*tabindex="-1"' -or $text -notmatch 'data-ref="range-end-clear"[^>]*tabindex="-1"') { throw 'An inline Clear action entered the page Tab sequence.' }
  if (-not $text.Contains("if (event.key === 'Tab' && !popup.hidden)")) { throw 'Tab-leave closing is missing.' }
  if (-not $text.Contains('{"action":"press","target":"range-start-input","key":"ArrowDown"}')) { throw 'Keyboard range selection does not begin from the page Tab-stop input.' }
  if (-not $text.Contains('{"name":"single-click start selection"') -or -not $text.Contains('{"name":"single-click end selection"')) { throw 'Independent one-click boundary selection scenarios are missing.' }
  if (-not $text.Contains('{"name":"end-only manual period"') -or -not $text.Contains('{"name":"start-only manual period"')) { throw 'Open-ended period scenarios are missing.' }
  if (-not $text.Contains("let popupOwner = 'start';")) { throw 'The popup anchor owner is no longer explicit.' }
  if ($text.Contains('activeBoundary')) { throw 'The rejected two-click range completion phase remains in the candidate.' }
  if (-not $text.Contains('if (!isCalendarSelectable(iso)) return;')) { throw 'Calendar selection is not bounded to the active field.' }
  if ([regex]::Matches($text, '\sdata-reference-harness=').Count -ne 1) { throw 'The review harness boundary changed.' }
}

function Get-ScenarioState($Bundle, [string]$Scenario, [int]$Step) {
  $match = @($Bundle.scenarios | Where-Object name -eq $Scenario)
  if ($match.Count -ne 1 -or $Step -ge $match[0].steps.Count) { throw "$Scenario step $($Step + 1) is missing." }
  return $match[0].steps[$Step].state
}

function Assert-AdjustedStates($Bundle) {
  $initial = $Bundle.initial
  Assert-State ($initial.elements.'range-popup'.visible -eq $false -and $initial.elements.'range-start-clear'.visible -eq $false -and $initial.elements.'range-end-clear'.visible -eq $false -and $initial.elements.'range-selection'.name -eq 'No range selected.') 'The initial empty range state changed.'

  $focusOpen = Get-ScenarioState $Bundle 'start input focus opens calendar' 0
  Assert-State ($focusOpen.document.activeRef -eq 'range-start-input' -and $focusOpen.elements.'range-popup'.visible -eq $true -and $focusOpen.elements.'range-start-input'.attributes.'aria-expanded' -eq 'true' -and $focusOpen.elements.'range-end-input'.attributes.'aria-expanded' -eq 'false') 'Start input focus did not open its calendar while retaining typing focus.'
  Assert-State ($focusOpen.elements.'range-control'.box.width -eq 608 -and $focusOpen.elements.'range-popup'.box.width -eq 336 -and $focusOpen.elements.'range-popup'.box.height -lt 365 -and $focusOpen.elements.'range-grid'.box.width -eq 310) 'The reviewed compact range or popup geometry changed.'

  $tabClosed = Get-ScenarioState $Bundle 'start input tab closes calendar' 0
  Assert-State ($tabClosed.elements.'range-popup'.visible -eq $false -and $tabClosed.document.activeRef -eq 'range-end-input' -and $tabClosed.elements.'range-start-input'.attributes.'aria-expanded' -eq 'false' -and $tabClosed.elements.'range-end-input'.attributes.'aria-expanded' -eq 'false') 'Tab did not close the popup and move directly to End date.'

  $iconOpen = Get-ScenarioState $Bundle 'start calendar icon toggle' 0
  $iconClosed = Get-ScenarioState $Bundle 'start calendar icon toggle' 1
  Assert-State ($iconOpen.elements.'range-popup'.visible -eq $true -and $iconOpen.document.activeRef -eq 'range-grid' -and $iconOpen.elements.'range-start-trigger'.attributes.'aria-expanded' -eq 'true') 'Start calendar action did not open and focus the calendar.'
  Assert-State ($iconClosed.elements.'range-popup'.visible -eq $false -and $iconClosed.document.activeRef -eq 'range-start-input') 'Start calendar action did not close and restore field focus.'

  $endOpen = Get-ScenarioState $Bundle 'end calendar anchor' 0
  Assert-State ($endOpen.elements.'range-popup'.visible -eq $true -and $endOpen.document.activeRef -eq 'range-grid' -and $endOpen.elements.'range-start-input'.attributes.'aria-expanded' -eq 'false' -and $endOpen.elements.'range-end-input'.attributes.'aria-expanded' -eq 'true') 'End calendar action did not own the open popup.'
  Assert-State (($endOpen.elements.'range-popup'.box.x + $endOpen.elements.'range-popup'.box.width) -eq ($endOpen.elements.'range-control'.box.x + $endOpen.elements.'range-control'.box.width)) 'The popup is not right-aligned below End date.'

  $monthNext = Get-ScenarioState $Bundle 'month navigation' 1
  $monthBack = Get-ScenarioState $Bundle 'month navigation' 2
  Assert-State ($monthNext.elements.'range-month-heading'.name -eq 'September 2026' -and $monthNext.document.activeRef -eq 'range-next-month') 'Next-month navigation failed.'
  Assert-State ($monthBack.elements.'range-month-heading'.name -eq 'August 2026' -and $monthBack.document.activeRef -eq 'range-prev-month') 'Previous-month navigation failed.'
  $yearPrevious = Get-ScenarioState $Bundle 'year navigation' 1
  $yearBack = Get-ScenarioState $Bundle 'year navigation' 2
  Assert-State ($yearPrevious.elements.'range-month-heading'.name -eq 'August 2025' -and $yearPrevious.document.activeRef -eq 'range-prev-year') 'Previous-year navigation failed.'
  Assert-State ($yearBack.elements.'range-month-heading'.name -eq 'August 2026' -and $yearBack.document.activeRef -eq 'range-next-year') 'Next-year navigation failed.'

  $startOnly = Get-ScenarioState $Bundle 'single-click start selection' 1
  Assert-State ($startOnly.elements.'range-popup'.visible -eq $false -and $startOnly.document.activeRef -eq 'range-start-input' -and $startOnly.elements.'range-selection'.name -eq 'Start date selected: 2026-08-10. End date is not selected.' -and $startOnly.elements.'range-start-clear'.visible -eq $true -and $startOnly.elements.'range-end-clear'.visible -eq $false) 'One Start-date click did not select, close, and preserve an open-ended period.'
  $endOnly = Get-ScenarioState $Bundle 'single-click end selection' 1
  Assert-State ($endOnly.elements.'range-popup'.visible -eq $false -and $endOnly.document.activeRef -eq 'range-end-input' -and $endOnly.elements.'range-selection'.name -eq 'End date selected: 2026-08-12. Start date is not selected.' -and $endOnly.elements.'range-start-clear'.visible -eq $false -and $endOnly.elements.'range-end-clear'.visible -eq $true) 'One End-date click did not select, close, and preserve an open-ended period.'

  $pointerStart = Get-ScenarioState $Bundle 'pointer range selection' 1
  $pointerEndOpen = Get-ScenarioState $Bundle 'pointer range selection' 2
  $pointerDone = Get-ScenarioState $Bundle 'pointer range selection' 3
  Assert-State ($pointerStart.elements.'range-popup'.visible -eq $false -and $pointerStart.document.activeRef -eq 'range-start-input' -and $pointerStart.elements.'range-selection'.name -eq 'Start date selected: 2026-08-10. End date is not selected.') 'Start selection did not finish as one independent field operation.'
  Assert-State ($pointerEndOpen.elements.'range-popup'.visible -eq $true -and $pointerEndOpen.elements.'range-status'.name -eq 'Choose end date.' -and $pointerEndOpen.elements.'range-note'.name -eq 'Available dates: 2026-08-10 to 2026-08-14.' -and $pointerEndOpen.elements.'range-end-input'.attributes.'aria-expanded' -eq 'true') 'Opening End date did not expose its independent constrained selection context.'
  Assert-State ($pointerEndOpen.elements.'range-before-start-day'.attributes.disabled -eq $true -and $pointerEndOpen.elements.'range-before-start-day'.name -match 'unavailable, before the current start date' -and $pointerEndOpen.elements.'range-before-start-day'.styles.backgroundColor -eq 'rgba(0, 0, 0, 0)') 'The date before Start is not directly exposed as an unavailable unfilled End-date option.'
  Assert-State (($pointerEndOpen.elements.'range-popup'.box.x + $pointerEndOpen.elements.'range-popup'.box.width) -eq ($pointerEndOpen.elements.'range-control'.box.x + $pointerEndOpen.elements.'range-control'.box.width)) 'The independent End picker is not anchored below End date.'
  Assert-State ($pointerDone.elements.'range-popup'.visible -eq $false -and $pointerDone.document.activeRef -eq 'range-end-input' -and $pointerDone.elements.'range-selection'.name -eq 'Selected range: 2026-08-10 through 2026-08-12.' -and $pointerDone.elements.'range-start-clear'.visible -eq $true -and $pointerDone.elements.'range-end-clear'.visible -eq $true) 'Pointer range completion did not commit the independently selected boundaries.'

  $reopen = Get-ScenarioState $Bundle 'completed range reopen' 4
  Assert-State ($reopen.elements.'range-popup'.visible -eq $true -and $reopen.elements.'range-end-input'.attributes.'aria-expanded' -eq 'true' -and $reopen.document.activeRef -eq 'range-end-day') 'Completed range did not reopen from End date with the end day active.'
  Assert-State ($reopen.elements.'range-start-day'.attributes.'aria-pressed' -eq 'true' -and $reopen.elements.'range-start-day'.styles.backgroundColor -eq 'rgb(29, 115, 183)' -and $reopen.elements.'range-end-day'.attributes.'aria-pressed' -eq 'true' -and $reopen.elements.'range-next-day'.styles.backgroundColor -eq 'rgb(215, 235, 255)') 'The reopened completed range does not distinguish endpoints and the connecting band.'
  Assert-State ($reopen.elements.'range-disabled-day'.styles.backgroundColor -eq 'rgba(0, 0, 0, 0)' -and $reopen.elements.'range-disabled-day'.styles.color -eq 'rgb(95, 111, 130)' -and $reopen.elements.'range-next-day'.styles.backgroundColor -ne $reopen.elements.'range-disabled-day'.styles.backgroundColor) 'The disabled-date treatment is still visually confusable with the range band.'

  $keyboardDone = Get-ScenarioState $Bundle 'keyboard range selection' 3
  Assert-State ($keyboardDone.elements.'range-selection'.name -eq 'Selected range: 2026-08-10 through 2026-08-12.' -and $keyboardDone.elements.'range-popup'.visible -eq $false -and $keyboardDone.document.activeRef -eq 'range-end-input') 'Keyboard range completion failed.'

  $disabled = Get-ScenarioState $Bundle 'disabled future date' 1
  Assert-State ($disabled.elements.'range-disabled-day'.attributes.disabled -eq $true -and $disabled.elements.'range-popup'.visible -eq $true -and $disabled.elements.'range-selection'.name -eq 'No range selected.' -and $disabled.document.activeRef -eq 'range-grid') 'The disabled future date changed the range or closed the calendar.'

  $manualDone = Get-ScenarioState $Bundle 'compact manual range' 2
  Assert-State ($manualDone.elements.'range-selection'.name -eq 'Selected range: 2026-08-10 through 2026-08-12.' -and $manualDone.elements.'range-start-input'.attributes.'aria-invalid' -eq 'false' -and $manualDone.elements.'range-end-input'.attributes.'aria-invalid' -eq 'false') 'Compact manual range did not normalize to a valid completed state.'
  $invalid = Get-ScenarioState $Bundle 'invalid manual start' 1
  Assert-State ($invalid.elements.'range-start-input'.attributes.'aria-invalid' -eq 'true' -and $invalid.elements.'range-start-error'.visible -eq $true -and $invalid.elements.'range-start-input'.attributes.'aria-describedby' -eq 'range-hint range-start-error') 'Invalid Start date was not rejected and described.'
  $future = Get-ScenarioState $Bundle 'future manual end' 2
  Assert-State ($future.elements.'range-end-input'.attributes.'aria-invalid' -eq 'true' -and $future.elements.'range-end-error'.name -eq 'Enter a date on or before 2026-08-14.' -and $future.elements.'range-selection'.name -eq 'Start date selected: 2026-08-10. End date is not selected.') 'Future End date was not rejected with the fixed boundary.'
  $reversed = Get-ScenarioState $Bundle 'reversed manual range' 2
  Assert-State ($reversed.elements.'range-end-input'.attributes.'aria-invalid' -eq 'true' -and $reversed.elements.'range-end-error'.name -eq 'End date must be on or after start date.') 'A reversed range was not rejected at End date.'
  $corrected = Get-ScenarioState $Bundle 'correct reversed range' 4
  Assert-State ($corrected.elements.'range-start-input'.attributes.'aria-invalid' -eq 'false' -and $corrected.elements.'range-end-input'.attributes.'aria-invalid' -eq 'false' -and $corrected.elements.'range-selection'.name -eq 'Selected range: 2026-08-10 through 2026-08-12.') 'Correcting a reversed range did not recover both fields.'

  foreach ($scenario in @('escape closes calendar', 'close button closes calendar')) {
    $closed = Get-ScenarioState $Bundle $scenario 1
    Assert-State ($closed.elements.'range-popup'.visible -eq $false -and $closed.document.activeRef -eq 'range-start-input' -and $closed.elements.'range-start-input'.attributes.'aria-expanded' -eq 'false') "$scenario did not close and restore Start date focus."
  }

  $clearReopen = Get-ScenarioState $Bundle 'clear end and reopen' 3
  Assert-State ($clearReopen.elements.'range-popup'.visible -eq $true -and $clearReopen.elements.'range-end-input'.attributes.'aria-expanded' -eq 'true' -and $clearReopen.elements.'range-selection'.name -eq 'Start date selected: 2026-08-10. End date is not selected.' -and $clearReopen.elements.'range-start-clear'.visible -eq $true -and $clearReopen.elements.'range-end-clear'.visible -eq $false) 'Clearing End date did not preserve Start date and reopen End selection.'

  $manualEndOnly = Get-ScenarioState $Bundle 'end-only manual period' 1
  Assert-State ($manualEndOnly.elements.'range-selection'.name -eq 'End date selected: 2026-08-12. Start date is not selected.' -and $manualEndOnly.elements.'range-start-input'.attributes.'aria-invalid' -eq 'false' -and $manualEndOnly.elements.'range-end-input'.attributes.'aria-invalid' -eq 'false' -and $manualEndOnly.elements.'range-start-clear'.visible -eq $false -and $manualEndOnly.elements.'range-end-clear'.visible -eq $true) 'A manual End-only open period was not accepted.'
  $manualStartOnly = Get-ScenarioState $Bundle 'start-only manual period' 1
  Assert-State ($manualStartOnly.elements.'range-selection'.name -eq 'Start date selected: 2026-08-10. End date is not selected.' -and $manualStartOnly.elements.'range-start-input'.attributes.'aria-invalid' -eq 'false' -and $manualStartOnly.elements.'range-end-input'.attributes.'aria-invalid' -eq 'false' -and $manualStartOnly.elements.'range-start-clear'.visible -eq $true -and $manualStartOnly.elements.'range-end-clear'.visible -eq $false) 'A manual Start-only open period was not accepted.'

  $dividerState = Get-ScenarioState $Bundle 'pointer range selection' 3
  foreach ($position in @('start', 'end')) {
    $clear = $dividerState.elements."range-$position-clear".box
    $trigger = $dividerState.elements."range-$position-trigger"
    Assert-State (($clear.x + $clear.width) -eq $trigger.box.x -and $trigger.styles.borderLeftWidth -eq '1px') "The $position Clear/calendar divider is missing or overlaps."
  }
}

[IO.Directory]::CreateDirectory($output) | Out-Null
Assert-FrozenFiles
Assert-SourceContract

$preflightPath = Join-Path $output 'date-range.preflight.json'
$snapshotPath = Join-Path $output 'date-range.snapshot.json'
$artifacts = Join-Path $output 'date-range-artifacts'
Invoke-ReferenceUi @('preflight', $adjusted, '--out', $preflightPath) 'adjusted Date range preflight'
Invoke-ReferenceUi @('snapshot', $adjusted, '--out', $snapshotPath, '--artifacts', $artifacts) 'adjusted Date range snapshot'

$preflight = Read-Json $preflightPath
if ($preflight.status -ne 'pass' -or $preflight.summary.errorCount -ne 0 -or $preflight.summary.checkedStateCount -ne 59) { throw 'Adjusted Date range conformance did not pass 59 states.' }
if ($preflight.console.errorCount -ne 0 -or @($preflight.network.externalRequests).Count -ne 0 -or $preflight.network.failedRequestCount -ne 0) { throw 'Adjusted Date range preflight had runtime or network errors.' }

$bundle = Read-Json $snapshotPath
if (@($bundle.scenarios).Count -ne 22 -or @($bundle.initial.elements.PSObject.Properties).Count -ne 25 -or $bundle.console.errorCount -ne 0 -or @($bundle.network.externalRequests).Count -ne 0 -or $bundle.network.failedRequestCount -ne 0) { throw 'Adjusted Date range snapshot health failed.' }
$states = @($bundle.initial)
foreach ($scenario in $bundle.scenarios) { foreach ($step in $scenario.steps) { $states += $step.state } }
foreach ($state in $states) {
  if (@($state.duplicateKeys).Count -ne 0 -or @($state.semanticAmbiguities).Count -ne 0 -or @($state.accessibilityIssues).Count -ne 0) { throw 'Adjusted Date range had identity or bounded accessibility issues.' }
  if ($state.observationBoundary.excludedHarnessRoots -ne 1 -or $state.observationBoundary.axExcludedHarnessRoots -ne 1) { throw 'The review harness entered product observation.' }
}
Assert-AdjustedStates $bundle
Assert-FrozenFiles

$manifest = [ordered]@{
  responsibility = 'human-calibration-date-range-adjustment-evidence'
  status = 'adjusted-candidate-awaiting-human-confirmation'
  runId = $runId
  adjusted = [ordered]@{ path = 'review/date-picker-human-calibration/adjusted/date-range.html'; sha256 = $frozen['adjusted-range'].sha256 }
  preserved = [ordered]@{
    baselineRangeSha256 = $frozen['baseline-range'].sha256
    acceptedSingleSha256 = $frozen['accepted-single'].sha256
    cliSha256 = $frozen.cli.sha256
    coreSha256 = $frozen.core.sha256
  }
  checks = [ordered]@{
    conformanceStates = 59
    scenarios = 22
    observedElements = 25
    consoleErrors = 0
    externalRequests = 0
    failedRequests = 0
    boundedAccessibilityIssues = 0
    duplicateKeys = 0
    semanticAmbiguities = 0
    pageTabStopsInRange = 2
    independentBoundarySelectionCloses = $true
    startOnlyPeriod = $true
    endOnlyPeriod = $true
    endpointAndInteriorStylesDistinct = $true
    rangeAndUnavailableStylesDistinct = $true
    monthAndYearNavigation = $true
    futureDatesUnavailable = $true
    compactBoundaryWidth = 280
    compactPopupWidth = 336
    compactPopupHeightBelow = 365
    inlineActionDividers = $true
    weekendColumnColor = $true
  }
  observationGap = 'The current Core does not capture editable input values or every unkeyed range-cell relationship directly; live state, keyed date styles, source assertions, and rendered evidence cover this candidate.'
  next = 'Human confirmation before Target transfer, observation classification, or any long-lived Reference guidance.'
}
Write-Json (Join-Path $output 'adjustment-manifest.json') $manifest

Write-Host 'DatePicker Date range adjustment verification: pass'
Write-Host "Evidence: $output"
