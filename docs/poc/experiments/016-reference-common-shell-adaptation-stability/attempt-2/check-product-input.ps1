[CmdletBinding()]
param([string]$InventoryPath = '')

$ErrorActionPreference = 'Stop'
if ([string]::IsNullOrWhiteSpace($InventoryPath)) { $InventoryPath = Join-Path $PSScriptRoot 'product-input-blobs.json' }
$inventory = Get-Content -Raw -LiteralPath $InventoryPath | ConvertFrom-Json
$repo = (git rev-parse --show-toplevel).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
$failures = [System.Collections.Generic.List[string]]::new()

foreach ($entry in @($inventory.files)) {
  $indexBlob = (git ls-files -s -- $entry.path) -replace '^\d+\s+([0-9a-f]+)\s+\d+\t.*$', '$1'
  if ($indexBlob -ne $entry.blob) { $failures.Add("Canonical blob differs: $($entry.path)") }
  git diff --cached --quiet -- $entry.path
  if ($LASTEXITCODE -ne 0) { $failures.Add("Staged difference exists: $($entry.path)") }
  git diff --quiet -- $entry.path
  if ($LASTEXITCODE -ne 0) { $failures.Add("Unstaged difference exists: $($entry.path)") }
}

foreach ($root in @($inventory.target_roots)) {
  $untracked = @(git ls-files --others --exclude-standard -- $root)
  if ($LASTEXITCODE -ne 0) { throw "Cannot inspect untracked files under $root" }
  if ($untracked.Count -gt 0) { $failures.Add("Untracked product input exists: $($untracked -join ', ')") }
}

if ($failures.Count -gt 0) { throw ($failures -join [Environment]::NewLine) }
Write-Output "Product-input preflight passed. files=$(@($inventory.files).Count)"
