[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$candidateRoot = Split-Path -Parent $PSScriptRoot
$checker = Join-Path $PSScriptRoot 'check-svg-rendering-contract.ps1'
$experimentRoot = Split-Path -Parent $candidateRoot
$canonicalBindings = Join-Path $experimentRoot 'attempt-3/reference-owned/visual-bindings'
$temporaryRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("reference-contract-svg-self-test-" + [guid]::NewGuid().ToString('N'))

try {
  New-Item -ItemType Directory -Path $temporaryRoot | Out-Null
  $badTarget = Join-Path $temporaryRoot 'bad'
  $goodTarget = Join-Path $temporaryRoot 'good'
  New-Item -ItemType Directory -Path $badTarget, $goodTarget | Out-Null

  Set-Content -LiteralPath (Join-Path $badTarget 'index.html') -Value '<img src="reference-visual-bindings/icons/search.svg" alt="">' -NoNewline
  Set-Content -LiteralPath (Join-Path $goodTarget 'index.html') -Value '<span class="fixed-icon" aria-hidden="true"></span>' -NoNewline
  Set-Content -LiteralPath (Join-Path $goodTarget 'styles.css') -Value '.fixed-icon { background: currentColor; mask: url("reference-visual-bindings/icons/search.svg") center / contain no-repeat; }' -NoNewline

  & $checker -TargetRoot $goodTarget -CanonicalBindings $canonicalBindings
  if (-not $?) {
    throw 'Expected the CSS-mask fixture to pass the SVG rendering contract check.'
  }

  $badRejected = $false
  try {
    & $checker -TargetRoot $badTarget -CanonicalBindings $canonicalBindings
    if (-not $?) {
      $badRejected = $true
    }
  } catch {
    $badRejected = $true
  }
  if (-not $badRejected) {
    throw 'Expected the direct external image fixture to be rejected.'
  }

  Write-Output 'SVG rendering contract self-test passed: mask accepted; direct image rejected.'
} finally {
  if (Test-Path -LiteralPath $temporaryRoot) {
    Remove-Item -LiteralPath $temporaryRoot -Recurse -Force
  }
}
