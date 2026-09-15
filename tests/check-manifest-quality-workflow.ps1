$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$workflow = 'docs/poc/experiments/manifest-quality-workflow.md'
$workflowPath = Join-Path $root $workflow
$readmePath = Join-Path $root 'README.md'

if (-not (Test-Path -LiteralPath $workflowPath)) { throw "Missing workflow document: $workflow" }

$text = Get-Content -Raw -LiteralPath $workflowPath
$required = @(
  '1. Author or revise',
  '2. Freeze',
  '3. Generate three Runs',
  '4. Capture and verify',
  '5. Review artifacts',
  '6. Route deviations',
  '7. Human review',
  'same frozen prompt text, model, and reasoning effort',
  'manifest-gap',
  'prompt-gap',
  'fixture-gap',
  'observation-gap',
  'Never selectively edit, regenerate, or replace',
  'resolved OKF-compatible YAML ID and',
  'HTML and PNG evidence is required for all three Runs',
  'Interaction observation contract',
  'Fixed human-review report format',
  'complete fixed product prompt as readable',
  'complete frozen-input inventory',
  'action actually performed',
  'business-screen-review',
  'artifact-review report and matrix',
  'human gate is a request for judgment'
)
foreach ($needle in $required) {
  if (-not $text.Contains($needle)) { throw "Workflow is missing required contract text: $needle" }
}

foreach ($relative in @(
  'docs/poc/experiments/three-run-reproducibility-protocol.md',
  'tests/check-business-workflow-static-html-review.ps1'
)) {
  if (-not (Test-Path -LiteralPath (Join-Path $root $relative))) { throw "Workflow dependency is missing: $relative" }
}

foreach ($match in [regex]::Matches($text, '\]\(([^)#]+)(?:#[^)]+)?\)')) {
  $target = $match.Groups[1].Value
  if ($target -match '^[a-z][a-z0-9+.-]*:' -or $target.StartsWith('#')) { continue }
  $resolved = Join-Path (Split-Path -Parent $workflowPath) ($target -replace '/', [IO.Path]::DirectorySeparatorChar)
  if (-not (Test-Path -LiteralPath $resolved)) { throw "Broken local workflow link: $target" }
}

$readme = Get-Content -Raw -LiteralPath $readmePath
if (-not $readme.Contains('docs/poc/experiments/manifest-quality-workflow.md')) {
  throw 'README does not link the Manifest quality workflow.'
}

Write-Output 'Manifest quality workflow checks passed. Required phases: 7. Local workflow links: valid.'
