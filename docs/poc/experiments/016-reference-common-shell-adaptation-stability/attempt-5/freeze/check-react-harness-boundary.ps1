[CmdletBinding()]
param([string]$RepositoryRoot = '')

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RepositoryRoot)) {
  $RepositoryRoot = (git rev-parse --show-toplevel).Trim()
  if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
}

$harnessRoot = Join-Path $RepositoryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/harness'
$package = Get-Content -Raw -LiteralPath (Join-Path $harnessRoot 'package.json') | ConvertFrom-Json
$allowedDependencies = @('react', 'react-dom')
$allowedDevDependencies = @('@types/react', '@types/react-dom', '@vitejs/plugin-react', 'typescript', 'vite')

$actualDependencies = @($package.dependencies.psobject.Properties.Name | Sort-Object) -join ','
$expectedDependencies = @($allowedDependencies | Sort-Object) -join ','
$actualDevDependencies = @($package.devDependencies.psobject.Properties.Name | Sort-Object) -join ','
$expectedDevDependencies = @($allowedDevDependencies | Sort-Object) -join ','
if ($actualDependencies -ne $expectedDependencies) {
  throw 'Harness runtime dependencies are outside the fixed minimal React surface.'
}
if ($actualDevDependencies -ne $expectedDevDependencies) {
  throw 'Harness development dependencies are outside the fixed minimal React surface.'
}

$sourceFiles = @(Get-ChildItem -LiteralPath (Join-Path $harnessRoot 'src') -File -Recurse)
if ($sourceFiles.Count -ne 4) { throw 'Unexpected source-file surface in the empty harness.' }
$combinedSource = ($sourceFiles | ForEach-Object { Get-Content -Raw -LiteralPath $_.FullName }) -join [Environment]::NewLine
if ($combinedSource -match '(?i)\b(header|drawer|navigation)\b') {
  throw 'The empty harness must not pre-implement a common-shell component.'
}
if ($combinedSource -match '(?i)(visual-tokens|binding-map|reference-owned|\.svg)') {
  throw 'The empty harness must not copy or consume a fixed visual authority.'
}

Write-Output 'React harness boundary check passed. No common-shell implementation or prohibited dependency surface found.'
