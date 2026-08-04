[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$candidateRoot = Split-Path -Parent $PSScriptRoot
$expectedFiles = @(
  'README.md',
  'reference-contract.md',
  'svg-rendering-contract.md',
  'interaction-foundations-candidate.md',
  'validation-plan.md',
  'validation/check-svg-rendering-contract.ps1',
  'validation/self-test-svg-rendering-contract.ps1'
)

foreach ($relativePath in $expectedFiles) {
  if (-not (Test-Path -LiteralPath (Join-Path $candidateRoot $relativePath) -PathType Leaf)) {
    throw "Missing candidate file: $relativePath"
  }
}

$contract = Get-Content -LiteralPath (Join-Path $candidateRoot 'reference-contract.md') -Raw
foreach ($heading in @('## Exact visual bindings', '## Structural invariants', '## Adaptation freedoms')) {
  if ($contract -notmatch [regex]::Escape($heading)) {
    throw "Missing contract layer: $heading"
  }
}
foreach ($authority in @('visual-tokens.css', 'binding-map.json', 'visual-bindings/icons/')) {
  if ($contract -notmatch [regex]::Escape($authority)) {
    throw "Missing canonical authority reference: $authority"
  }
}
if ($contract -match '#[0-9a-fA-F]{3,8}\b' -or $contract -match '(?i)same design family') {
  throw 'The layered contract repeats an exact value or permits design-family substitution.'
}

$svgContract = Get-Content -LiteralPath (Join-Path $candidateRoot 'svg-rendering-contract.md') -Raw
foreach ($requiredPhrase in @('current theme', 'Inline SVG', 'CSS mask', 'external `img`', 'CSS filters')) {
  if ($svgContract -notmatch [regex]::Escape($requiredPhrase)) {
    throw "Missing SVG rendering contract element: $requiredPhrase"
  }
}

$foundations = Get-Content -LiteralPath (Join-Path $candidateRoot 'interaction-foundations-candidate.md') -Raw
foreach ($state in @('Hover', 'focus-visible', 'Selected', 'Active', 'Disabled', 'interactive-hover-background', 'Human decision required')) {
  if ($foundations -notmatch [regex]::Escape($state)) {
    throw "Missing Interaction Foundations candidate element: $state"
  }
}

$validation = Get-Content -LiteralPath (Join-Path $candidateRoot 'validation-plan.md') -Raw
foreach ($layer in @('## Static validation', '## Browser validation', '## Human review', 'human gate')) {
  if ($validation -notmatch [regex]::Escape($layer)) {
    throw "Missing validation layer or gate: $layer"
  }
}

Write-Output 'Reference contract vNext candidate static check passed.'
