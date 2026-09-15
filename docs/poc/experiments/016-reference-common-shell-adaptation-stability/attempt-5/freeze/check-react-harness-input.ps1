[CmdletBinding()]
param(
  [string]$InventoryPath = '',
  [string]$RepositoryRoot = '',
  [string]$RunRoot = ''
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
  $InventoryPath = Join-Path $PSScriptRoot 'react-harness-input-blobs.json'
}
if ([string]::IsNullOrWhiteSpace($RepositoryRoot)) {
  $RepositoryRoot = (git rev-parse --show-toplevel).Trim()
  if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
}
if (-not (Test-Path -LiteralPath $InventoryPath -PathType Leaf)) {
  throw "Missing React harness input inventory: $InventoryPath"
}

$RepositoryRoot = (Resolve-Path -LiteralPath $RepositoryRoot).Path
$inventory = Get-Content -Raw -LiteralPath $InventoryPath | ConvertFrom-Json
if ([int]$inventory.schema_version -ne 1) { throw 'Unexpected React harness inventory schema.' }
if ([string]$inventory.upstream_attempt_4_commit -ne '7431ce8') {
  throw 'Unexpected Attempt 4 upstream freeze.'
}

$failures = [System.Collections.Generic.List[string]]::new()
$filesByPath = @{}
foreach ($entry in @($inventory.files)) {
  $path = [string]$entry.path
  $expectedBlob = [string]$entry.blob
  $filesByPath[$path] = $expectedBlob

  $headBlob = ''
  try {
    $headBlob = (Invoke-Git @('rev-parse', "HEAD`:$path") | Select-Object -First 1).Trim()
  } catch {
    $failures.Add("Fixed harness input is absent from HEAD: $path")
  }
  if ($headBlob -ne $expectedBlob) {
    $failures.Add("HEAD blob differs from fixed harness input: $path")
  }

  $indexLines = @(Invoke-Git @('ls-files', '-s', '--', $path))
  if ($indexLines.Count -ne 1) {
    $failures.Add("Fixed harness input is missing or ambiguous in the index: $path")
  } else {
    $indexBlob = ([string]$indexLines[0] -replace '^\d+\s+([0-9a-f]+)\s+\d+\t.*$', '$1').Trim()
    if ($indexBlob -ne $expectedBlob) {
      $failures.Add("Canonical blob differs: $path")
    }
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
    $failures.Add("Untracked React harness input exists: $($untracked -join ', ')")
  }
}

$expectedDependencies = @('react', 'react-dom')
$expectedDevDependencies = @('@types/react', '@types/react-dom', '@vitejs/plugin-react', 'typescript', 'vite')
$packagePath = Join-Path $RepositoryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/harness/package.json'
$package = Get-Content -Raw -LiteralPath $packagePath | ConvertFrom-Json
$actualDependencies = @($package.dependencies.psobject.Properties.Name | Sort-Object) -join ','
$expectedDependencyList = @($expectedDependencies | Sort-Object) -join ','
$actualDevDependencies = @($package.devDependencies.psobject.Properties.Name | Sort-Object) -join ','
$expectedDevDependencyList = @($expectedDevDependencies | Sort-Object) -join ','
if ($actualDependencies -ne $expectedDependencyList) {
  $failures.Add('Unexpected runtime dependency surface.')
}
if ($actualDevDependencies -ne $expectedDevDependencyList) {
  $failures.Add('Unexpected development dependency surface.')
}

if (-not [string]::IsNullOrWhiteSpace($RunRoot)) {
  if (-not (Test-Path -LiteralPath $RunRoot -PathType Container)) {
    $failures.Add("Run root is missing: $RunRoot")
  } else {
    $canonicalHarnessRoot = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/harness'
    foreach ($relativePath in @($inventory.run_configuration_files)) {
      $canonicalPath = "$canonicalHarnessRoot/$relativePath"
      $expectedBlob = $filesByPath[$canonicalPath]
      $runPath = Join-Path $RunRoot $relativePath
      if (-not (Test-Path -LiteralPath $runPath -PathType Leaf)) {
        $failures.Add("Run configuration is missing: $relativePath")
        continue
      }
      $runBlob = (& git -C $RepositoryRoot hash-object --path=$canonicalPath -- $runPath).Trim()
      if ($LASTEXITCODE -ne 0 -or $runBlob -ne $expectedBlob) {
        $failures.Add("Run configuration differs from the fixed harness: $relativePath")
      }
    }
  }
}

if ($failures.Count -gt 0) {
  throw ($failures -join [Environment]::NewLine)
}

Push-Location $RepositoryRoot
try {
  & powershell -NoProfile -ExecutionPolicy Bypass -File 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-4/freeze/check-attempt-4-input.ps1' -RepositoryRoot $RepositoryRoot
  if ($LASTEXITCODE -ne 0) { throw 'Attempt 4 fixed-input preflight failed.' }
} finally {
  Pop-Location
}

$runMessage = if ([string]::IsNullOrWhiteSpace($RunRoot)) { '' } else { " run-root=$RunRoot" }
Write-Output "React harness input preflight passed. files=$(@($inventory.files).Count)$runMessage"
