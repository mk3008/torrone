$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$pack = Join-Path $root 'templates/business-app/design-manifest'
$definition = Join-Path $pack 'configuration/record-list-options.md'
$overrides = @(
  (Join-Path $root 'templates/business-app/local-overrides/record-list-default.yaml'),
  (Join-Path $root 'templates/business-app/local-overrides/record-list-alternate.yaml')
)
$binding = Join-Path $root 'templates/business-app/product-bindings/record-list.example.yaml'
$limitedBinding = Join-Path $root 'templates/business-app/product-bindings/record-list-limited.example.yaml'
$implementationConstraints = Join-Path $root 'templates/business-app/implementation-constraints.example.yaml'
$required = @(
  'components/search-conditions.md', 'components/result-grid.md', 'components/pagination.md',
  'screen-patterns/record-list.md', 'screen-patterns/record-detail.md',
  'flows/list-to-detail.md', 'configuration/record-list-options.md'
)
foreach ($relative in $required) { if (-not (Test-Path -LiteralPath (Join-Path $pack $relative))) { throw "Missing standard-pack concept: $relative" } }
foreach ($path in @($definition) + $overrides + @($binding, $limitedBinding)) { if (-not (Test-Path -LiteralPath $path)) { throw "Missing YAML input: $path" } }
if (-not (Test-Path -LiteralPath $implementationConstraints)) { throw "Missing optional implementation-constraints example: $implementationConstraints" }
if ($implementationConstraints.StartsWith($pack, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'Implementation constraints must remain outside the distributable design-manifest pack.' }
$implementationConstraintText = Get-Content -Raw $implementationConstraints
foreach ($needle in @('implementation_constraints:', 'render_target:', 'icon_library:', 'asset_policy:')) {
  if (-not $implementationConstraintText.Contains($needle)) { throw "Implementation-constraints example is missing: $needle" }
}
$businessPackReadme = Get-Content -Raw (Join-Path $root 'templates/business-app/README.md')
$normalizedBusinessPackReadme = [regex]::Replace($businessPackReadme, '\s+', ' ')
foreach ($needle in @('outside `design-manifest/`', 'not a UI configuration override', 'supplies no implicit default', 'does not authorize dependency installation')) {
  if (-not $normalizedBusinessPackReadme.Contains($needle)) { throw "Implementation-constraints boundary is missing: $needle" }
}

$definitionText = Get-Content -Raw $definition
foreach ($id in @('search_actions_region', 'search_action_order', 'pagination_region', 'result_count_presentation', 'row_action_presentation')) {
  if ($definitionText -notmatch "(?m)^  - id: $id\r?$") { throw "Missing configuration ID: $id" }
}
if ($definitionText -match '(?m)^\s*(left|right|css|dom|framework)_') { throw 'Configuration definition contains a prohibited implementation or physical-direction contract.' }
foreach ($needle in @('filtered to its matching available semantic actions while preserving the selected relative order', 'If no action remains after filtering', 'exact string equality of both `pack_id` and `pack_version`')) {
  if (-not $definitionText.Contains($needle)) { throw "Configuration resolution or compatibility rule is missing: $needle" }
}
foreach ($path in $overrides) {
  $text = Get-Content -Raw $path
  foreach ($id in @('search_actions_region', 'search_action_order', 'pagination_region', 'result_count_presentation', 'row_action_presentation')) {
    if ($text -notmatch "(?m)^  ${id}:") { throw "Override is missing defined ID ${id}: $path" }
  }
  if ($text -match 'left|right|route|permission|data|copy') { throw "Override contains product binding data: $path" }
}
$bindingText = Get-Content -Raw $binding
foreach ($needle in @('destination_reference', 'permission_reference', 'state_reference', 'meaning_reference', 'display_language')) {
  if (-not $bindingText.Contains($needle)) { throw "Binding example is missing: $needle" }
}
if ($bindingText -notmatch '(?ms)open_record:\s+available: true\s+destination_reference:\s+\S+\s+destination_available: true') { throw 'Available open_record must declare a non-empty available detail destination.' }
foreach ($action in @('search:', 'clear:')) {
  if (-not $bindingText.Contains($action)) { throw "Binding example does not explicitly declare action availability: $action" }
}
foreach ($needle in @('pack_id:', 'pack_version:')) { if (-not $bindingText.Contains($needle)) { throw "Binding example is missing compatibility identity: $needle" } }
$limitedText = Get-Content -Raw $limitedBinding
foreach ($needle in @('clear:', 'available: false', 'pagination:', 'aggregate:', 'open_record:')) { if (-not $limitedText.Contains($needle)) { throw "Limited binding does not exercise capability omission: $needle" } }
if ($limitedText -notmatch '(?ms)^features:\s+search:\s+available: true\s+clear:\s+available: false') { throw 'Limited binding must retain Search while making Clear unavailable.' }
$defaultOverrideText = Get-Content -Raw $overrides[0]
$alternateOverrideText = Get-Content -Raw $overrides[1]
if ($defaultOverrideText -notmatch '(?m)^  search_action_order: \[search, clear\]\r?$') { throw 'Case A default override must preserve the declared default action order.' }
if ($alternateOverrideText -notmatch '(?m)^  search_action_order: \[clear, search\]\r?$') { throw 'Case B alternate override must demonstrate the supported alternate action order.' }
$calibration = Get-Content -Raw (Join-Path $root 'templates/business-app/calibration.md')
foreach ($needle in @('filtered to `[search]`', 'if none remain, omit the entire action group', 'must exactly equal the manifest values')) {
  if (-not $calibration.Contains($needle)) { throw "Calibration does not demonstrate a bounded resolution rule: $needle" }
}
foreach ($needle in @('open_record: true` requires a non-empty, available binding-owned detail destination', 'no configuration can recreate it', 'product-binding capabilities, or fixed Markdown')) {
  if (-not $calibration.Contains($needle)) { throw "Calibration does not state the required binding boundary: $needle" }
}
foreach ($path in @($definition) + $overrides + @($binding, $limitedBinding)) {
  if ((Get-Content -Raw $path) -match 'https?://|screenshot|source url|evidence register') { throw "YAML example violates the source boundary: $path" }
}

function Assert-ContractCondition {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) { throw $Message }
}

function Assert-ContractRejected {
  param([scriptblock]$Action, [string]$CaseName)
  try { & $Action } catch { $script:negativeCases += 1; return }
  throw "Expected contract rejection: $CaseName"
}

function Assert-UniqueOverrideKeys {
  param([string[]]$Keys)
  if (($Keys | Select-Object -Unique).Count -ne $Keys.Count) { throw 'Duplicate configuration ID in one override.' }
}

function New-SearchListBindingFixture {
  param(
    [bool]$Search = $true,
    [bool]$Clear = $true,
    [bool]$Pagination = $true,
    [bool]$Aggregate = $true,
    [bool]$OpenRecord = $true,
    [object]$DestinationReference = 'product_owned_record_detail',
    [bool]$DestinationAvailable = $true
  )
  [pscustomobject]@{
    searchAvailable = $Search
    clearAvailable = $Clear
    paginationAvailable = $Pagination
    aggregateAvailable = $Aggregate
    openRecordAvailable = $OpenRecord
    destinationReference = $DestinationReference
    destinationAvailable = $DestinationAvailable
  }
}

function Resolve-SearchListFixtureContract {
  param([object[]]$OverrideFiles, [object]$Binding)

  if ($OverrideFiles.Count -gt 1) { throw 'Conflicting local overrides are rejected; there is no precedence rule.' }
  $resolved = [ordered]@{
    search_actions_region = 'end'
    search_action_order = @('search', 'clear')
    pagination_region = 'end'
    result_count_presentation = 'summary'
    row_action_presentation = 'link'
  }
  $allowed = @{
    search_actions_region = @('start', 'center', 'end')
    search_action_order = @(@('search', 'clear'), @('clear', 'search'))
    pagination_region = @('start', 'end')
    result_count_presentation = @('hidden', 'summary')
    row_action_presentation = @('link', 'button', 'overflow_menu')
  }
  if ($OverrideFiles.Count -eq 1) {
    foreach ($id in $OverrideFiles[0].Keys) {
      if (-not $resolved.Contains($id)) { throw "Undefined configuration ID: $id" }
      $value = $OverrideFiles[0][$id]
      if ($null -eq $value) { throw "Null is not permitted: $id" }
      if ($id -eq 'search_action_order') {
        if (($value -is [string]) -or ($value -isnot [System.Collections.IEnumerable]) -or ($value.Count -eq 0)) { throw 'search_action_order must be a non-empty whole array.' }
        $candidate = @($value)
        if (([string]::Join(',', [string[]]$candidate)) -notin @('search,clear', 'clear,search')) { throw 'search_action_order contains an unknown semantic ID or disallowed order.' }
        $resolved[$id] = $candidate
      } else {
        if ($value -notin $allowed[$id]) { throw "Disallowed value for $id" }
        $resolved[$id] = $value
      }
    }
  }
  if ($Binding.openRecordAvailable) {
    if ([string]::IsNullOrWhiteSpace([string]$Binding.destinationReference) -or -not $Binding.destinationAvailable) { throw 'open_record=true requires an available non-empty detail destination.' }
  }
  $effectiveOrder = @($resolved.search_action_order | Where-Object { if ($_ -eq 'search') { $Binding.searchAvailable } elseif ($_ -eq 'clear') { $Binding.clearAvailable } else { $false } })
  [pscustomobject]@{
    Resolved = $resolved
    SearchActionOrder = $effectiveOrder
    Pagination = if ($Binding.paginationAvailable) { 'exercised' } else { 'not exercised' }
    ResultCount = if ($resolved.result_count_presentation -eq 'hidden') { 'hidden' } elseif ($Binding.aggregateAvailable) { 'exercised' } else { 'not exercised' }
    RowAction = if ($Binding.openRecordAvailable) { 'exercised' } else { 'not exercised' }
  }
}

$positiveCases = 0
$negativeCases = 0
$fullFixture = New-SearchListBindingFixture
$limitedFixture = New-SearchListBindingFixture -Clear $false -Pagination $false -Aggregate $false -OpenRecord $false -DestinationReference $null -DestinationAvailable $false

$caseA = Resolve-SearchListFixtureContract -OverrideFiles @() -Binding $fullFixture
Assert-ContractCondition (($caseA.Resolved.search_actions_region -eq 'end') -and (([string]::Join(',', $caseA.SearchActionOrder)) -eq 'search,clear') -and ($caseA.Pagination -eq 'exercised') -and ($caseA.ResultCount -eq 'exercised') -and ($caseA.RowAction -eq 'exercised')) 'Case A defaults did not resolve to the supported full-binding outcome.'
$positiveCases += 1

$caseB = Resolve-SearchListFixtureContract -OverrideFiles @([ordered]@{ search_actions_region = 'start'; search_action_order = @('clear', 'search'); pagination_region = 'start'; result_count_presentation = 'hidden'; row_action_presentation = 'button' }) -Binding $fullFixture
Assert-ContractCondition (($caseB.Resolved.search_actions_region -eq 'start') -and (([string]::Join(',', $caseB.SearchActionOrder)) -eq 'clear,search') -and ($caseB.ResultCount -eq 'hidden') -and ($caseB.RowAction -eq 'exercised')) 'Case B did not replace the complete scalar and array values.'
$positiveCases += 1

$caseC = Resolve-SearchListFixtureContract -OverrideFiles @() -Binding $limitedFixture
Assert-ContractCondition ((([string]::Join(',', $caseC.SearchActionOrder)) -eq 'search') -and ($caseC.Pagination -eq 'not exercised') -and ($caseC.ResultCount -eq 'not exercised') -and ($caseC.RowAction -eq 'not exercised')) 'Case C did not omit dependent UI while preserving the available Search action.'
$positiveCases += 1

Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @() -Binding (New-SearchListBindingFixture -DestinationReference $null) } 'open_record=true without detail destination'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @() -Binding (New-SearchListBindingFixture -DestinationReference 'product_owned_record_detail' -DestinationAvailable $false) } 'open_record=true with unavailable detail destination'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ unknown_setting = 'x' }) -Binding $fullFixture } 'undefined configuration ID'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ search_actions_region = 'left' }) -Binding $fullFixture } 'enum value outside allowed set'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ search_action_order = @('search', 'unknown') }) -Binding $fullFixture } 'unknown semantic action ID'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ search_actions_region = 'start' }, @{ pagination_region = 'start' }) -Binding $fullFixture } 'multiple local overrides'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ search_actions_region = $null }) -Binding $fullFixture } 'null override value'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ search_action_order = @() }) -Binding $fullFixture } 'empty semantic action array'
Assert-ContractRejected { Assert-UniqueOverrideKeys @('search_actions_region', 'search_actions_region') } 'duplicate configuration ID in one override'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ fixed_markdown = 'replacement' }) -Binding $fullFixture } 'fixed Markdown override target'
Assert-ContractRejected { Resolve-SearchListFixtureContract -OverrideFiles @(@{ product_binding = 'replacement' }) -Binding $fullFixture } 'product binding override target'

Write-Output "Business-app standard-pack static checks passed. Positive contract cases: $positiveCases. Negative contract cases: $negativeCases."
