[CmdletBinding()]
param([string]$CanaryRoot = '')

$ErrorActionPreference = 'Stop'
$repositoryRoot = (git rev-parse --show-toplevel).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
$freezeRoot = $PSScriptRoot
$preflightPath = Join-Path $freezeRoot 'check-product-fixture-input.ps1'
$inventoryPath = Join-Path $freezeRoot 'product-fixture-input-blobs.json'
$createdCanary = $false

function Invoke-ExpectedPass {
  param([string]$Name)
  & powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "Expected preflight pass failed: $Name" }
  Write-Output "Canary pass: $Name"
}

function Invoke-ExpectedRejection {
  param([string]$Name)
  $output = @()
  try { $output = @(& powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot 2>&1) } catch { $output += $_.Exception.Message }
  if ($LASTEXITCODE -eq 0) { throw "Expected preflight rejection was accepted: $Name. $($output -join [Environment]::NewLine)" }
  Write-Output "Expected rejection: $Name"
}

function Restore-CanaryPath {
  param([string]$Path)
  & git -C $CanaryRoot restore --staged --worktree --source HEAD -- $Path
  if ($LASTEXITCODE -ne 0) { throw "Cannot restore canary path: $Path" }
}

if ([string]::IsNullOrWhiteSpace($CanaryRoot)) {
  $CanaryRoot = Join-Path 'C:\tmp' "cs-a6-$([guid]::NewGuid().ToString('N'))"
}

try {
  & git -C $repositoryRoot worktree add --quiet --detach $CanaryRoot HEAD
  if ($LASTEXITCODE -ne 0) { throw 'Cannot create isolated Attempt 6 canary worktree.' }
  $createdCanary = $true

  Invoke-ExpectedPass 'normal checkout'

  $fixturePath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/fixture.json'
  $fixtureFullPath = Join-Path $CanaryRoot $fixturePath
  $fixtureText = [IO.File]::ReadAllText($fixtureFullPath)
  [IO.File]::WriteAllText($fixtureFullPath, [regex]::Replace($fixtureText, "`r?`n", "`r`n"), [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedPass 'CRLF-only checkout representation'
  Restore-CanaryPath $fixturePath

  $hierarchyMutation = (Get-Content -Raw -LiteralPath $fixtureFullPath).Replace('"role": "child"', '"role": "top-level"')
  [IO.File]::WriteAllText($fixtureFullPath, $hierarchyMutation, [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'hierarchy change'
  Restore-CanaryPath $fixturePath

  $itemMutation = (Get-Content -Raw -LiteralPath $fixtureFullPath).Replace('"label": "Overview"', '"label": "Overview changed"')
  [IO.File]::WriteAllText($fixtureFullPath, $itemMutation, [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'item change'
  Restore-CanaryPath $fixturePath

  $orderFixture = Get-Content -Raw -LiteralPath $fixtureFullPath | ConvertFrom-Json
  $orderFixture.navigation = @($orderFixture.navigation[1], $orderFixture.navigation[0], $orderFixture.navigation[2])
  $orderMutation = $orderFixture | ConvertTo-Json -Depth 8
  [IO.File]::WriteAllText($fixtureFullPath, $orderMutation, [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'order change'
  Restore-CanaryPath $fixturePath

  [IO.File]::AppendAllText($fixtureFullPath, "`n", [Text.UTF8Encoding]::new($false))
  & git -C $CanaryRoot add -- $fixturePath
  if ($LASTEXITCODE -ne 0) { throw 'Cannot stage canary fixture mutation.' }
  Invoke-ExpectedRejection 'staged difference'
  Restore-CanaryPath $fixturePath

  $untrackedPath = Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/canary-untracked.txt'
  [IO.File]::WriteAllText($untrackedPath, 'canary', [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'untracked fixed-input file'
  Remove-Item -LiteralPath $untrackedPath -Force

  Invoke-ExpectedPass 'clean restoration'
  Write-Output 'Attempt 6 product fixture portable preflight canary passed.'
} finally {
  if ($createdCanary -and (Test-Path -LiteralPath $CanaryRoot)) {
    & git -C $repositoryRoot worktree remove --force $CanaryRoot
    if ($LASTEXITCODE -ne 0) { throw 'Cannot remove isolated Attempt 6 canary worktree.' }
  }
}
