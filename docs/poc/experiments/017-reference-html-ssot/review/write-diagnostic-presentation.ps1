[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$RawReport,

  [Parameter(Mandatory = $true)]
  [string]$OutputJson,

  [Parameter(Mandatory = $true)]
  [string]$OutputMarkdown,

  [string]$Reporter = (Join-Path $PSScriptRoot 'diagnostic-presentation.mjs')
)

$ErrorActionPreference = 'Stop'

function Remove-DerivedFile([string]$Path) {
  if ($Path -and [IO.File]::Exists($Path)) {
    [IO.File]::Delete($Path)
  }
}

$tempJson = $null
$tempMarkdown = $null
$jsonPath = $null
$markdownPath = $null
$derivedPathsAreSafe = $false

try {
  $rawPath = (Resolve-Path -LiteralPath $RawReport).Path
  $reporterPath = (Resolve-Path -LiteralPath $Reporter).Path
  $jsonPath = [IO.Path]::GetFullPath($OutputJson)
  $markdownPath = [IO.Path]::GetFullPath($OutputMarkdown)

  if ($rawPath -eq $jsonPath -or $rawPath -eq $markdownPath -or $jsonPath -eq $markdownPath) {
    throw 'Raw and derived output paths must be distinct.'
  }
  $derivedPathsAreSafe = $true

  $rawHashBefore = (Get-FileHash -LiteralPath $rawPath -Algorithm SHA256).Hash
  $raw = Get-Content -Raw -LiteralPath $rawPath | ConvertFrom-Json -Depth 100
  $expectedExit = if ($raw.status -eq 'pass') { 0 } else { 1 }

  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($jsonPath)) | Out-Null
  [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($markdownPath)) | Out-Null
  $suffix = ".tmp-$([Guid]::NewGuid().ToString('N'))"
  $tempJson = "$jsonPath$suffix"
  $tempMarkdown = "$markdownPath$suffix"

  $reporterOutput = @(& node $reporterPath $rawPath --out $tempJson --markdown $tempMarkdown 2>&1)
  $reporterExit = $LASTEXITCODE
  if ($reporterExit -ne $expectedExit) {
    throw "Reporter exited with $reporterExit; expected $expectedExit for raw status '$($raw.status)'. Output: $($reporterOutput -join ' ')"
  }
  if (-not [IO.File]::Exists($tempJson) -or -not [IO.File]::Exists($tempMarkdown)) {
    throw 'Reporter did not produce both derived outputs.'
  }

  $rawHashAfter = (Get-FileHash -LiteralPath $rawPath -Algorithm SHA256).Hash
  if ($rawHashAfter -ne $rawHashBefore) {
    throw 'Authoritative raw evidence changed while generating its presentation.'
  }

  [IO.File]::Move($tempJson, $jsonPath, $true)
  $tempJson = $null
  [IO.File]::Move($tempMarkdown, $markdownPath, $true)
  $tempMarkdown = $null

  $global:LASTEXITCODE = 0
  [pscustomobject]@{
    status = 'written'
    rawReport = $rawPath
    rawSha256 = $rawHashAfter
    outputJson = $jsonPath
    outputMarkdown = $markdownPath
  }
} catch {
  Remove-DerivedFile $tempJson
  Remove-DerivedFile $tempMarkdown
  if ($derivedPathsAreSafe) {
    Remove-DerivedFile $jsonPath
    Remove-DerivedFile $markdownPath
  }
  Write-Warning "Reviewer presentation skipped: $($_.Exception.Message)"
  $global:LASTEXITCODE = 0
  [pscustomobject]@{
    status = 'skipped'
    rawReport = $RawReport
    reason = $_.Exception.Message
  }
}
