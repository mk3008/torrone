[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$experiment = $PSScriptRoot
$variant = Join-Path $experiment 'variants/11-composite-granularity'
$reference = Join-Path $variant 'references/entity-autocomplete.html'
$target = Join-Path $variant 'targets/entity-autocomplete/index.html'
$seedImplementation = Join-Path $experiment 'output/active-descendant-observation-canary/20260814T072513Z/implementation'
$cli = Join-Path $seedImplementation 'reference-ui.mjs'
$core = Join-Path $seedImplementation 'browser-core.js'
$runId = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$output = Join-Path $experiment "output/active-descendant-observation-canary/$runId"
$probeRoot = Join-Path $env:TEMP "poc017-active-descendant-canary-$([guid]::NewGuid().ToString('N'))"
$env:REFERENCE_UI_BROWSER = 'C:\Program Files\Google\Chrome\Application\chrome.exe'

function Read-Json([string]$Path) {
  return Get-Content -Raw -LiteralPath $Path | ConvertFrom-Json -Depth 100
}

function Write-Json([string]$Path, $Value) {
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName([IO.Path]::GetFullPath($Path))) | Out-Null
  $Value | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $Path -Encoding utf8
}

function Invoke-ReferenceUi([string[]]$Arguments, [int[]]$Expected, [string]$Label) {
  $lines = @(& node $script:runnerCli @Arguments 2>&1)
  $exitCode = $LASTEXITCODE
  $lines | ForEach-Object { Write-Host $_ }
  if ($Expected -notcontains $exitCode) {
    throw "$Label exited with $exitCode; expected one of $($Expected -join ', ')."
  }
  return $exitCode
}

function Replace-ExactlyOnce([string]$Text, [string]$Old, [string]$New, [string]$Label) {
  $count = [regex]::Matches($Text, [regex]::Escape($Old)).Count
  if ($count -ne 1) { throw "$Label replacement count was $count; expected 1." }
  return $Text.Replace($Old, $New)
}

[IO.Directory]::CreateDirectory($output) | Out-Null
[IO.Directory]::CreateDirectory($probeRoot) | Out-Null

try {
  $coreHash = (Get-FileHash -LiteralPath $core -Algorithm SHA256).Hash
  $cliHash = (Get-FileHash -LiteralPath $cli -Algorithm SHA256).Hash
  $referenceHash = (Get-FileHash -LiteralPath $reference -Algorithm SHA256).Hash
  $targetHash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash

  $implementation = Join-Path $output 'implementation'
  [IO.Directory]::CreateDirectory($implementation) | Out-Null
  [IO.File]::WriteAllBytes((Join-Path $implementation 'browser-core.js'), [IO.File]::ReadAllBytes($core))
  [IO.File]::WriteAllBytes((Join-Path $implementation 'reference-ui.mjs'), [IO.File]::ReadAllBytes($cli))

  $runner = Join-Path $probeRoot 'runner'
  [IO.Directory]::CreateDirectory((Join-Path $runner 'cli')) | Out-Null
  [IO.Directory]::CreateDirectory((Join-Path $runner 'core')) | Out-Null
  [IO.File]::WriteAllBytes((Join-Path $runner 'cli/reference-ui.mjs'), [IO.File]::ReadAllBytes($cli))
  [IO.File]::WriteAllBytes((Join-Path $runner 'core/browser-core.js'), [IO.File]::ReadAllBytes($core))
  $script:runnerCli = Join-Path $runner 'cli/reference-ui.mjs'

  $baseline = Join-Path $output 'reference.snapshot.json'
  $validReport = Join-Path $output 'valid-target.verify.json'
  $wrongReport = Join-Path $output 'wrong-active-target.false-pass.verify.json'

  Invoke-ReferenceUi @('snapshot', $reference, '--out', $baseline) @(0) 'canary Reference snapshot' | Out-Null
  Invoke-ReferenceUi @('verify', $target, '--baseline', $baseline, '--out', $validReport) @(0) 'canary valid Target' | Out-Null

  $wrongTarget = Join-Path $output 'probe/wrong-active-target.html'
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($wrongTarget)) | Out-Null
  $wrongText = [IO.File]::ReadAllText($target)
  $wrongText = Replace-ExactlyOnce $wrongText `
    '<button class="carrier-result" type="button" role="option" aria-selected="false"><span>Northline Transport</span>' `
    '<button class="carrier-result" id="carrier-option-secondary" type="button" role="option" aria-selected="false"><span>Northline Transport</span>' `
    'secondary option local ID mutation'
  $wrongText = Replace-ExactlyOnce $wrongText `
    "parts.input.setAttribute('aria-activedescendant', parts.first.id);" `
    "parts.input.setAttribute('aria-activedescendant', parts.menu.querySelectorAll('[role=`"option`"]')[1].id);" `
    'wrong active target mutation'
  [IO.File]::WriteAllText($wrongTarget, $wrongText, [Text.UTF8Encoding]::new($false))
  Invoke-ReferenceUi @('verify', $wrongTarget, '--baseline', $baseline, '--out', $wrongReport) @(0) 'wrong active target canary' | Out-Null

  $baselineJson = Read-Json $baseline
  $validJson = Read-Json $validReport
  $wrongJson = Read-Json $wrongReport
  $arrowState = @($baselineJson.scenarios | Where-Object name -eq 'keyboard entity selection')[0].steps[1].state
  if ($arrowState.elements.'entity-query'.relationships.PSObject.Properties.Name -contains 'activeDescendant') {
    throw 'Pre-change Core unexpectedly observed activeDescendant.'
  }
  if ($validJson.status -ne 'pass' -or $wrongJson.status -ne 'pass' -or $wrongJson.summary.errorCount -ne 0) {
    throw 'The observation-hole canary did not reproduce the expected false pass.'
  }

  $summary = [ordered]@{
    schemaVersion = 1
    gate = 'aria-activedescendant relational observation canary'
    runId = $runId
    status = 'observation-hole-reproduced'
    implementation = [ordered]@{
      coreSha256 = $coreHash
      cliSha256 = $cliHash
      preservedCore = 'implementation/browser-core.js'
      preservedCli = 'implementation/reference-ui.mjs'
    }
    fixedInputs = [ordered]@{
      referenceSha256 = $referenceHash
      targetSha256 = $targetHash
    }
    validTarget = [ordered]@{ status = $validJson.status; errorCount = $validJson.summary.errorCount }
    wrongActiveTarget = [ordered]@{
      mutation = 'A Target-local ID is added to the existing secondary option and only aria-activedescendant points there; the primary option remains aria-selected and styled.'
      status = $wrongJson.status
      errorCount = $wrongJson.summary.errorCount
      activeDescendantObserved = $false
    }
  }
  Write-Json (Join-Path $output 'canary-summary.json') $summary
  Write-Host "Active-descendant observation hole reproduced: $output"
}
finally {
  if (Test-Path -LiteralPath $probeRoot) {
    $resolved = [IO.Path]::GetFullPath($probeRoot)
    $safePrefix = [IO.Path]::GetFullPath($env:TEMP).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
    if (-not $resolved.StartsWith($safePrefix, [StringComparison]::OrdinalIgnoreCase) -or -not (Split-Path -Leaf $resolved).StartsWith('poc017-active-descendant-canary-')) {
      throw "Refusing to remove unexpected temporary path: $resolved"
    }
    Remove-Item -LiteralPath $resolved -Recurse -Force
  }
}
