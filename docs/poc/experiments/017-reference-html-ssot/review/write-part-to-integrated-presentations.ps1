[CmdletBinding()]
param(
  [string]$PartialOutput = (Join-Path $PSScriptRoot '../output/partial-reference'),
  [string]$FormOutput = (Join-Path $PSScriptRoot '../output/form-heavy-partial'),
  [string]$OutputDirectory = (Join-Path $PSScriptRoot '../output/part-to-integrated-reviewer'),
  [string]$Publisher = (Join-Path $PSScriptRoot 'write-diagnostic-presentation.ps1'),
  [string]$Reporter = (Join-Path $PSScriptRoot 'diagnostic-presentation.mjs')
)

$ErrorActionPreference = 'Stop'

$comparisons = @(
  [pscustomobject]@{ name = 'partial-shell'; raw = Join-Path $PartialOutput 'target-shell.report.json' },
  [pscustomobject]@{ name = 'partial-workspace'; raw = Join-Path $PartialOutput 'target-workspace.report.json' },
  [pscustomobject]@{ name = 'form-shell'; raw = Join-Path $FormOutput 'target-shell.report.json' },
  [pscustomobject]@{ name = 'form-workflow'; raw = Join-Path $FormOutput 'target-form.report.json' }
)

$results = foreach ($comparison in $comparisons) {
  try {
    if (-not (Test-Path -LiteralPath $comparison.raw -PathType Leaf)) {
      throw "Raw report not found: $($comparison.raw)"
    }
    & $Publisher `
      -RawReport $comparison.raw `
      -OutputJson (Join-Path $OutputDirectory "$($comparison.name).json") `
      -OutputMarkdown (Join-Path $OutputDirectory "$($comparison.name).md") `
      -Reporter $Reporter
  } catch {
    Write-Warning "Reviewer presentation '$($comparison.name)' skipped: $($_.Exception.Message)"
    [pscustomobject]@{
      status = 'skipped'
      rawReport = $comparison.raw
      reason = $_.Exception.Message
    }
  }
}

$global:LASTEXITCODE = 0
$results
