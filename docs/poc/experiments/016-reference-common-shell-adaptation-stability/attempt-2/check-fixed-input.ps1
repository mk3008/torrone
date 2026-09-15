[CmdletBinding()]
param(
  [string]$InventoryPath = '',
  [string[]]$AdditionalTargetPath = @()
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($InventoryPath)) {
  $InventoryPath = Join-Path $PSScriptRoot 'fixed-input-blobs.json'
}

function Invoke-Git {
  param([string[]]$Arguments)
  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $result = & git @Arguments 2>&1
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $previousErrorActionPreference
  if ($exitCode -ne 0) {
    throw "git $($Arguments -join ' ') failed: $($result -join [Environment]::NewLine)"
  }
  return @($result | Where-Object { $_ -notmatch '^warning: unable to access ' })
}

function Test-GitQuiet {
  param([string[]]$Arguments)
  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  & git @Arguments 2>$null
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $previousErrorActionPreference
  return $exitCode -eq 0
}

if (-not (Test-Path -LiteralPath $InventoryPath -PathType Leaf)) {
  throw "Missing fixed-input blob inventory: $InventoryPath"
}

$repositoryRoot = (Invoke-Git @('rev-parse', '--show-toplevel') | Select-Object -First 1).Trim()
$inventory = Get-Content -Raw -LiteralPath $InventoryPath | ConvertFrom-Json
$baseline = $inventory.baseline_commit

if ($baseline -ne '9cd19321e53f6279e956df8a6d1fe562c3360544') {
  throw 'Unexpected approved baseline commit.'
}

if ($inventory.baseline_tag -ne 'reference-common-shell-v0.1') {
  throw 'Unexpected approved baseline tag.'
}

$resolvedBaseline = (Invoke-Git @('rev-parse', "$baseline`^{commit}") | Select-Object -First 1).Trim()
if ($resolvedBaseline -ne $baseline) {
  throw 'Approved baseline commit did not resolve exactly.'
}

$failures = [System.Collections.Generic.List[string]]::new()
$expectedFiles = @($inventory.files)

foreach ($entry in $expectedFiles) {
  $actualBlob = (Invoke-Git @('rev-parse', "$baseline`:$($entry.path)") | Select-Object -First 1).Trim()
  if ($actualBlob -ne $entry.blob) {
    $failures.Add("Approved blob inventory mismatch: $($entry.path)")
  }
}

foreach ($path in $AdditionalTargetPath) {
  $actualBlob = (Invoke-Git @('rev-parse', "$baseline`:$path") | Select-Object -First 1).Trim()
  $expectedFiles += [pscustomobject]@{ path = $path; blob = $actualBlob }
  if (-not (Test-GitQuiet @('diff', '--quiet', $baseline, '--', $path))) {
    $failures.Add("Approved baseline differs from additional target: $path")
  }
  if (-not (Test-GitQuiet @('diff', '--cached', '--quiet', '--', $path))) {
    $failures.Add("Staged difference exists in additional target: $path")
  }
  if (-not (Test-GitQuiet @('diff', '--quiet', '--', $path))) {
    $failures.Add("Unstaged difference exists in additional target: $path")
  }
}

foreach ($root in @($inventory.target_roots)) {
  if (-not (Test-GitQuiet @('diff', '--quiet', $baseline, '--', $root))) {
    $failures.Add("Approved baseline differs from working tree: $root")
  }
  if (-not (Test-GitQuiet @('diff', '--cached', '--quiet', '--', $root))) {
    $failures.Add("Staged difference exists in fixed target: $root")
  }
  if (-not (Test-GitQuiet @('diff', '--quiet', '--', $root))) {
    $failures.Add("Unstaged difference exists in fixed target: $root")
  }

  $untracked = @(Invoke-Git @('ls-files', '--others', '--exclude-standard', '--', $root))
  if ($untracked.Count -gt 0) {
    $failures.Add("Untracked fixed-target path exists: $($untracked -join ', ')")
  }
}

foreach ($entry in $expectedFiles) {
  $workingPath = Join-Path $repositoryRoot $entry.path.Replace('/', [IO.Path]::DirectorySeparatorChar)
  if (-not (Test-Path -LiteralPath $workingPath -PathType Leaf)) {
    $failures.Add("Missing fixed target: $($entry.path)")
  }
}

if ($failures.Count -gt 0) {
  throw ($failures -join [Environment]::NewLine)
}

& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $repositoryRoot 'docs/poc/experiments/015-reference-first-common-shell/check-reference.ps1')
if ($LASTEXITCODE -ne 0) {
  throw 'Reference semantic validation failed.'
}

Write-Output "Fixed-input preflight passed. baseline=$baseline files=$($expectedFiles.Count)"
