[CmdletBinding()]
param(
  [string]$InventoryPath = '',
  [string]$RepositoryRoot = ''
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($InventoryPath)) {
  $InventoryPath = Join-Path $PSScriptRoot 'attempt-3-input-blobs.json'
}

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

if (-not (Test-Path -LiteralPath $InventoryPath -PathType Leaf)) {
  throw "Missing Attempt 3 input inventory: $InventoryPath"
}

if ([string]::IsNullOrWhiteSpace($RepositoryRoot)) {
  $RepositoryRoot = (git rev-parse --show-toplevel).Trim()
  if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
}
$RepositoryRoot = (Resolve-Path -LiteralPath $RepositoryRoot).Path

$inventory = Get-Content -Raw -LiteralPath $InventoryPath | ConvertFrom-Json
$baseline = [string]$inventory.baseline_commit
if ($baseline -ne '1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff') {
  throw 'Unexpected approved Attempt 3 baseline commit.'
}

$resolvedBaseline = (Invoke-Git @('rev-parse', "$baseline`^{commit}") | Select-Object -First 1).Trim()
if ($resolvedBaseline -ne $baseline) {
  throw 'Approved Attempt 3 baseline commit did not resolve exactly.'
}

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
    $failures.Add("Fixed input is missing or ambiguous in the index: $path")
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
    $failures.Add("Untracked Attempt 3 input exists: $($untracked -join ', ')")
  }
}

if ($failures.Count -gt 0) {
  throw ($failures -join [Environment]::NewLine)
}

$provenanceCheck = Join-Path $RepositoryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/check-visual-binding-provenance.ps1'
& powershell -NoProfile -ExecutionPolicy Bypass -File $provenanceCheck
if ($LASTEXITCODE -ne 0) {
  throw 'Reference visual-binding provenance validation failed.'
}

Write-Output "Attempt 3 visual-binding input preflight passed. baseline=$baseline files=$(@($inventory.files).Count)"
