$ErrorActionPreference = 'Stop'

$attemptRoot = $PSScriptRoot
$inputRoot = Join-Path $attemptRoot 'consumer-input'
$inventoryPath = Join-Path $attemptRoot 'input-inventory.json'

if (-not (Test-Path -LiteralPath $inventoryPath -PathType Leaf)) {
  throw "Missing frozen input inventory: $inventoryPath"
}

$inventory = Get-Content -Raw -LiteralPath $inventoryPath | ConvertFrom-Json
if ($inventory.baseline_commit -ne '9cd19321e53f6279e956df8a6d1fe562c3360544') {
  throw 'Unexpected frozen baseline commit.'
}

if ($inventory.baseline_tag -ne 'reference-common-shell-v0.1') {
  throw 'Unexpected frozen baseline tag.'
}

$actualFiles = Get-ChildItem -LiteralPath $inputRoot -File -Recurse | ForEach-Object {
  $_.FullName.Substring($inputRoot.Length + 1).Replace('\', '/')
}
$expectedFiles = @($inventory.files.path)

if (@(Compare-Object -ReferenceObject $expectedFiles -DifferenceObject $actualFiles).Count -ne 0) {
  throw 'Frozen input file inventory does not match the files on disk.'
}

foreach ($entry in $inventory.files) {
  $path = Join-Path $inputRoot $entry.path.Replace('/', '\')
  $actualHash = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash
  if ($actualHash -ne $entry.sha256) {
    throw "Frozen input digest mismatch: $($entry.path)"
  }
}

& (Join-Path $inputRoot 'reference-common-shell\check-reference.ps1')
Write-Output "Frozen input check passed for $($inventory.files.Count) files."
