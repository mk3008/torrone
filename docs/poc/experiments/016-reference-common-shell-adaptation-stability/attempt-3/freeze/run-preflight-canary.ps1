[CmdletBinding()]
param([string]$CanaryRoot = '')

$ErrorActionPreference = 'Stop'
$baseline = '1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff'
$repositoryRoot = (git rev-parse --show-toplevel).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
$freezeRoot = $PSScriptRoot
$inventoryPath = Join-Path $freezeRoot 'attempt-3-input-blobs.json'
$preflightPath = Join-Path $freezeRoot 'check-attempt-3-input.ps1'
$createdCanary = $false

function Invoke-ExpectedRejection {
  param([string]$Name)
  & powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot
  if ($LASTEXITCODE -eq 0) {
    throw "Expected preflight rejection was accepted: $Name"
  }
  Write-Output "Expected rejection: $Name"
}

function Restore-CanaryPath {
  param([string]$Path)
  & git -C $CanaryRoot restore --staged --worktree --source $baseline -- $Path
  if ($LASTEXITCODE -ne 0) { throw "Cannot restore canary path: $Path" }
}

if ([string]::IsNullOrWhiteSpace($CanaryRoot)) {
  $CanaryRoot = Join-Path ([IO.Path]::GetTempPath()) "reference-common-shell-attempt3-canary-$([guid]::NewGuid().ToString('N'))"
}

try {
  & git -C $repositoryRoot worktree add --detach $CanaryRoot $baseline
  if ($LASTEXITCODE -ne 0) { throw 'Cannot create isolated Attempt 3 canary worktree.' }
  $createdCanary = $true

  & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/check-fixed-input.ps1')
  if ($LASTEXITCODE -ne 0) { throw 'Reference-owned canary preflight failed.' }
  & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2/check-product-input.ps1')
  if ($LASTEXITCODE -ne 0) { throw 'Product-owned canary preflight failed.' }
  & powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot
  if ($LASTEXITCODE -ne 0) { throw 'Attempt 3 normal-checkout preflight failed.' }
  Write-Output 'Canary normal checkout passed.'

  $tokenPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/visual-tokens.css'
  $tokenFullPath = Join-Path $CanaryRoot $tokenPath
  $tokenText = [IO.File]::ReadAllText($tokenFullPath)
  $crlfText = [regex]::Replace($tokenText, "`r?`n", "`r`n")
  [IO.File]::WriteAllText($tokenFullPath, $crlfText, [Text.UTF8Encoding]::new($false))
  & powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot
  if ($LASTEXITCODE -ne 0) { throw 'Attempt 3 CRLF-only preflight failed.' }
  Write-Output 'Canary CRLF-only checkout representation passed.'
  Restore-CanaryPath $tokenPath

  [IO.File]::AppendAllText($tokenFullPath, "`n/* canary token mutation */`n", [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'unstaged token change'
  Restore-CanaryPath $tokenPath

  $svgPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/icons/drawer-hide.svg'
  $svgFullPath = Join-Path $CanaryRoot $svgPath
  [IO.File]::AppendAllText($svgFullPath, "`n<!-- canary SVG mutation -->`n", [Text.UTF8Encoding]::new($false))
  & git -C $CanaryRoot add -- $svgPath
  if ($LASTEXITCODE -ne 0) { throw 'Cannot stage canary SVG mutation.' }
  Invoke-ExpectedRejection 'staged SVG change'
  Restore-CanaryPath $svgPath

  $mapPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/binding-map.json'
  $mapFullPath = Join-Path $CanaryRoot $mapPath
  $mapText = [IO.File]::ReadAllText($mapFullPath).Replace('header-leading', 'canary-location')
  [IO.File]::WriteAllText($mapFullPath, $mapText, [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'binding map change'
  Restore-CanaryPath $mapPath

  $validationPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/validation/visual-binding-validation.md'
  $validationFullPath = Join-Path $CanaryRoot $validationPath
  [IO.File]::AppendAllText($validationFullPath, "`n<!-- canary validation mutation -->`n", [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'validation change'
  Restore-CanaryPath $validationPath

  $untrackedPath = Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/canary-untracked.txt'
  [IO.File]::WriteAllText($untrackedPath, 'canary', [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'untracked visual-binding file'
  Remove-Item -LiteralPath $untrackedPath -Force

  & powershell -NoProfile -ExecutionPolicy Bypass -File $preflightPath -InventoryPath $inventoryPath -RepositoryRoot $CanaryRoot
  if ($LASTEXITCODE -ne 0) { throw 'Attempt 3 canary did not return to a clean pass.' }
  Write-Output 'Attempt 3 portable preflight canary passed.'
} finally {
  if ($createdCanary -and (Test-Path -LiteralPath $CanaryRoot)) {
    & git -C $repositoryRoot worktree remove --force $CanaryRoot
    if ($LASTEXITCODE -ne 0) { throw 'Cannot remove isolated Attempt 3 canary worktree.' }
  }
}
