$ErrorActionPreference = 'Stop'

$attemptRoot = Split-Path -Parent $PSScriptRoot
$canonicalBindings = Join-Path $attemptRoot 'reference-owned/visual-bindings'
$checker = Join-Path $PSScriptRoot 'check-visual-bindings.ps1'
$templateEvidence = Join-Path $PSScriptRoot 'visual-binding-evidence.template.json'
$temporaryRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("attempt-3-visual-binding-self-test-" + [guid]::NewGuid().ToString('N'))

function Expect-Failure([string]$Name, [scriptblock]$Action) {
  try {
    & $Action
  } catch {
    Write-Output "Expected rejection: $Name"
    return
  }
  throw "Self-test did not reject intentional drift: $Name"
}

try {
  New-Item -ItemType Directory -Path $temporaryRoot | Out-Null
  Copy-Item -LiteralPath $canonicalBindings -Destination (Join-Path $temporaryRoot 'reference-visual-bindings') -Recurse
  Copy-Item -LiteralPath $templateEvidence -Destination (Join-Path $temporaryRoot 'visual-binding-evidence.json')

  $icons = @(
    'drawer-hide.svg', 'drawer-show.svg', 'theme-to-dark.svg', 'theme-to-light.svg',
    'disclosure-expanded.svg', 'disclosure-collapsed.svg', 'search.svg'
  )
  $iconMarkup = ($icons | ForEach-Object { "<img alt=`"`" src=`"reference-visual-bindings/icons/$_`">" }) -join "`n"
  Set-Content -LiteralPath (Join-Path $temporaryRoot 'index.html') -NoNewline -Value "<div data-reference-visual-theme=`"light`"><link rel=`"stylesheet`" href=`"reference-visual-bindings/visual-tokens.css`">$iconMarkup</div>"
  Set-Content -LiteralPath (Join-Path $temporaryRoot 'styles.css') -NoNewline -Value '.fixture { color: var(--reference-text-primary); }'
  Set-Content -LiteralPath (Join-Path $temporaryRoot 'app.js') -NoNewline -Value 'const themeHook = "data-reference-visual-theme";'

  & $checker -TargetRoot $temporaryRoot

  $targetTokens = Join-Path $temporaryRoot 'reference-visual-bindings/visual-tokens.css'
  (Get-Content -Raw -LiteralPath $targetTokens).Replace('#f4f7fa', '#ffffff') | Set-Content -LiteralPath $targetTokens -NoNewline
  Expect-Failure 'token change' { & $checker -TargetRoot $temporaryRoot }
  Copy-Item -LiteralPath (Join-Path $canonicalBindings 'visual-tokens.css') -Destination $targetTokens -Force

  $targetIcon = Join-Path $temporaryRoot 'reference-visual-bindings/icons/drawer-hide.svg'
  (Get-Content -Raw -LiteralPath $targetIcon).Replace('M4 5h16v14H4z', 'M0 0h1v1H0z') | Set-Content -LiteralPath $targetIcon -NoNewline
  Expect-Failure 'SVG path change' { & $checker -TargetRoot $temporaryRoot }
  Copy-Item -LiteralPath (Join-Path $canonicalBindings 'icons/drawer-hide.svg') -Destination $targetIcon -Force

  $targetEvidence = Join-Path $temporaryRoot 'visual-binding-evidence.json'
  (Get-Content -Raw -LiteralPath $targetEvidence).Replace('header-leading', 'header-logical-end') | Set-Content -LiteralPath $targetEvidence -NoNewline
  Expect-Failure 'location declaration change' { & $checker -TargetRoot $temporaryRoot }

  Write-Output 'Visual binding self-test passed.'
} finally {
  if (Test-Path -LiteralPath $temporaryRoot) {
    Remove-Item -LiteralPath $temporaryRoot -Recurse -Force
  }
}
