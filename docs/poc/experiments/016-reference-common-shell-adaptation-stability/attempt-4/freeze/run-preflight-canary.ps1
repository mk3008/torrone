[CmdletBinding()]
param([string]$CanaryRoot = '')

$ErrorActionPreference = 'Stop'
$baseline = 'a3ef3fa680314a3b2721076698b13dbe97d0ead4'
$repositoryRoot = (git rev-parse --show-toplevel).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
$freezeRoot = $PSScriptRoot
$inventoryPath = Join-Path $freezeRoot 'attempt-4-input-blobs.json'
$preflightPath = Join-Path $freezeRoot 'check-attempt-4-input.ps1'
$createdCanary = $false

function Invoke-ExpectedRejection {
  param([string]$Name)
  $rejectionOutput = @()
  try {
    $rejectionOutput = @(& powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot 2>$null)
  } catch {
    $rejectionOutput += $_.Exception.Message
  }
  $rejectionExitCode = $LASTEXITCODE
  if ($rejectionExitCode -eq 0) {
    throw "Expected preflight rejection was accepted: $Name. Output: $($rejectionOutput -join [Environment]::NewLine)"
  }
  Write-Output "Expected rejection: $Name"
}

function Invoke-ExpectedPass {
  param([string]$Name)
  & powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot | Out-Null
  if ($LASTEXITCODE -ne 0) {
    throw "Expected preflight pass failed: $Name"
  }
  Write-Output "Canary pass: $Name"
}

function Restore-CanaryPath {
  param([string]$Path)
  & git -C $CanaryRoot restore --staged --worktree --source $baseline -- $Path
  if ($LASTEXITCODE -ne 0) { throw "Cannot restore canary path: $Path" }
}

if ([string]::IsNullOrWhiteSpace($CanaryRoot)) {
  $CanaryRoot = Join-Path 'C:\tmp' "cs-a4-$([guid]::NewGuid().ToString('N'))"
}

try {
  & git -C $repositoryRoot worktree add --quiet --detach $CanaryRoot $baseline
  if ($LASTEXITCODE -ne 0) { throw 'Cannot create isolated Attempt 4 canary worktree.' }
  $createdCanary = $true

  Invoke-ExpectedPass 'normal checkout'

  $contractPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/reference-contract.md'
  $contractFullPath = Join-Path $CanaryRoot $contractPath
  $contractText = [IO.File]::ReadAllText($contractFullPath)
  $crlfText = [regex]::Replace($contractText, "`r?`n", "`r`n")
  [IO.File]::WriteAllText($contractFullPath, $crlfText, [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedPass 'CRLF-only checkout representation'
  Restore-CanaryPath $contractPath

  [IO.File]::AppendAllText($contractFullPath, "`n<!-- canary contract mutation -->`n", [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'unstaged contract change'
  Restore-CanaryPath $contractPath

  $tokenPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/visual-tokens.css'
  $tokenFullPath = Join-Path $CanaryRoot $tokenPath
  [IO.File]::AppendAllText($tokenFullPath, "`n/* canary token mutation */`n", [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'unstaged token change'
  Restore-CanaryPath $tokenPath

  $svgPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/icons/drawer-hide.svg'
  $svgFullPath = Join-Path $CanaryRoot $svgPath
  [IO.File]::AppendAllText($svgFullPath, "`n<!-- canary SVG mutation -->`n", [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'unstaged SVG change'
  Restore-CanaryPath $svgPath

  [IO.File]::AppendAllText($contractFullPath, "`n<!-- canary staged contract mutation -->`n", [Text.UTF8Encoding]::new($false))
  & git -C $CanaryRoot add -- $contractPath
  if ($LASTEXITCODE -ne 0) { throw 'Cannot stage canary contract mutation.' }
  Invoke-ExpectedRejection 'staged contract change'
  Restore-CanaryPath $contractPath

  $untrackedPath = Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/canary-untracked.md'
  [IO.File]::WriteAllText($untrackedPath, 'canary', [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'untracked vNext input'
  Remove-Item -LiteralPath $untrackedPath -Force

  Invoke-ExpectedPass 'clean restoration'
  Write-Output 'Attempt 4 portable preflight canary passed.'
} finally {
  if ($createdCanary -and (Test-Path -LiteralPath $CanaryRoot)) {
    & git -C $repositoryRoot worktree remove --force $CanaryRoot
    if ($LASTEXITCODE -ne 0) { throw 'Cannot remove isolated Attempt 4 canary worktree.' }
  }
}
