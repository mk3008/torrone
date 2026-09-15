[CmdletBinding()]
param(
  [string]$InventoryPath = '',
  [string]$RepositoryRoot = ''
)

$ErrorActionPreference = 'Stop'

function Invoke-Git {
  param([string[]]$Arguments)
  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $result = & git -C $RepositoryRoot @Arguments 2>&1
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $previousErrorActionPreference
  if ($exitCode -ne 0) {
    throw "git -C $RepositoryRoot $($Arguments -join ' ') failed: $($result -join [Environment]::NewLine)"
  }
  return @($result | Where-Object { $_ -notmatch '^warning: unable to access ' })
}

function Test-GitQuiet {
  param([string[]]$Arguments)
  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  & git -C $RepositoryRoot @Arguments 2>$null
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $previousErrorActionPreference
  return $exitCode -eq 0
}

if ([string]::IsNullOrWhiteSpace($InventoryPath)) {
  $InventoryPath = Join-Path $PSScriptRoot 'product-fixture-input-blobs.json'
}
if ([string]::IsNullOrWhiteSpace($RepositoryRoot)) {
  $RepositoryRoot = (git rev-parse --show-toplevel).Trim()
  if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
}
if (-not (Test-Path -LiteralPath $InventoryPath -PathType Leaf)) {
  throw "Missing product fixture input inventory: $InventoryPath"
}

$RepositoryRoot = (Resolve-Path -LiteralPath $RepositoryRoot).Path
$inventory = Get-Content -Raw -LiteralPath $InventoryPath | ConvertFrom-Json
if ([int]$inventory.schema_version -ne 1) { throw 'Unexpected product fixture inventory schema.' }
$baseline = [string]$inventory.baseline_commit
if ($baseline -ne '2b3ebb0') { throw 'Unexpected product fixture baseline commit.' }

$resolvedBaseline = (Invoke-Git @('rev-parse', "$baseline`^{commit}") | Select-Object -First 1).Trim()
if (-not $resolvedBaseline.StartsWith($baseline)) { throw 'Product fixture baseline commit did not resolve.' }

$failures = [System.Collections.Generic.List[string]]::new()
foreach ($entry in @($inventory.files)) {
  $path = [string]$entry.path
  $expectedBlob = [string]$entry.blob
  $baselineBlob = (Invoke-Git @('rev-parse', "$baseline`:$path") | Select-Object -First 1).Trim()
  if ($baselineBlob -ne $expectedBlob) {
    $failures.Add("Approved blob inventory mismatch: $path")
  }

  $indexLines = @(Invoke-Git @('ls-files', '-s', '--', $path))
  if ($indexLines.Count -ne 1) {
    $failures.Add("Fixed product input is missing or ambiguous in the index: $path")
  } else {
    $indexBlob = ([string]$indexLines[0] -replace '^\d+\s+([0-9a-f]+)\s+\d+\t.*$', '$1').Trim()
    if ($indexBlob -ne $expectedBlob) {
      $failures.Add("Canonical blob differs: $path")
    }
  }

  if (-not (Test-GitQuiet @('diff', '--quiet', $baseline, '--', $path))) {
    $failures.Add("Approved baseline differs from working tree: $path")
  }
  if (-not (Test-GitQuiet @('diff', '--cached', '--quiet', '--', $path))) {
    $failures.Add("Staged difference exists: $path")
  }
  if (-not (Test-GitQuiet @('diff', '--quiet', '--', $path))) {
    $failures.Add("Unstaged difference exists: $path")
  }
}

foreach ($root in @($inventory.target_roots)) {
  $untracked = @(Invoke-Git @('ls-files', '--others', '--exclude-standard', '--', $root))
  if ($untracked.Count -gt 0) {
    $failures.Add("Untracked product fixture input exists: $($untracked -join ', ')")
  }
}

$fixturePath = Join-Path $RepositoryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/fixture.json'
try {
  $fixture = Get-Content -Raw -LiteralPath $fixturePath | ConvertFrom-Json
  $navigation = @($fixture.navigation)
  if ($navigation.Count -ne 3) { throw 'Fixture must have exactly three top-level supplied items.' }
  if ($navigation[0].id -ne 'overview' -or $navigation[0].role -ne 'top-level') { throw 'Overview must be the first top-level non-parent item.' }
  if ($navigation[1].id -ne 'workspace' -or $navigation[1].role -ne 'parent') { throw 'Workspace must be the expandable parent.' }
  if ($navigation[2].id -ne 'activity' -or $navigation[2].role -ne 'top-level') { throw 'Activity must be the final top-level non-parent item.' }
  $children = @($navigation[1].children)
  $childIds = @($children | ForEach-Object { [string]$_.id })
  if (($childIds -join ',') -ne 'section-01,section-02,section-03') { throw 'Only Section 01–03 may be Workspace children, in order.' }
  if (@($children | Where-Object { $_.role -ne 'child' }).Count -ne 0) { throw 'Workspace child roles must be child.' }
  if ($fixture.initial.currentDestination -ne 'overview' -or -not [bool]$fixture.initial.workspaceExpanded) { throw 'Supplied initial navigation state differs.' }
} catch {
  $failures.Add("Product fixture hierarchy/state consistency failed: $($_.Exception.Message)")
}

$candidateChecker = Join-Path $RepositoryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/check-fixture-candidate.ps1'
try {
  & powershell -NoProfile -ExecutionPolicy Bypass -File $candidateChecker | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Candidate checker returned non-zero.' }
} catch {
  $failures.Add("Fixture preview/input consistency failed: $($_.Exception.Message)")
}

if ($failures.Count -gt 0) {
  throw ($failures -join [Environment]::NewLine)
}

Write-Output "Product fixture input preflight passed. baseline=$baseline files=$(@($inventory.files).Count)"
