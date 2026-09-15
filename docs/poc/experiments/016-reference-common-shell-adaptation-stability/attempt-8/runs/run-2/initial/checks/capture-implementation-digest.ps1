[CmdletBinding()]
param(
  [string]$RunRoot = '',
  [string]$OutputPath = ''
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($RunRoot)) {
  $RunRoot = Split-Path -Parent $PSScriptRoot
}
$resolvedRoot = (Resolve-Path -LiteralPath $RunRoot).Path

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
  $OutputPath = Join-Path $resolvedRoot 'evidence/implementation-digest.txt'
}

$fixedFiles = @(
  '.gitignore',
  'index.html',
  'package-lock.json',
  'package.json',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'visual-binding-evidence.json'
)

$files = [System.Collections.Generic.List[System.IO.FileInfo]]::new()
foreach ($relativePath in $fixedFiles) {
  $path = Join-Path $resolvedRoot $relativePath
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
    throw "Missing implementation file: $relativePath"
  }
  $files.Add((Get-Item -LiteralPath $path))
}

foreach ($relativeRoot in @('src', 'checks', 'reference-visual-bindings')) {
  $path = Join-Path $resolvedRoot $relativeRoot
  if (-not (Test-Path -LiteralPath $path -PathType Container)) {
    throw "Missing implementation tree: $relativeRoot"
  }
  foreach ($file in Get-ChildItem -LiteralPath $path -File -Recurse) {
    $files.Add($file)
  }
}

$entries = foreach ($file in $files | Sort-Object FullName) {
  $relative = $file.FullName.Substring($resolvedRoot.Length).TrimStart([char[]]@('\', '/')).Replace('\', '/')
  $hash = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
  "$hash  $relative"
}

$treeBytes = [System.Text.Encoding]::UTF8.GetBytes(($entries -join "`n") + "`n")
$sha256 = [System.Security.Cryptography.SHA256]::Create()
try {
  $treeHash = ([System.BitConverter]::ToString($sha256.ComputeHash($treeBytes))).Replace('-', '').ToLowerInvariant()
} finally {
  $sha256.Dispose()
}

$outputDirectory = Split-Path -Parent $OutputPath
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null

$content = @(
  'algorithm=sha256',
  "file_count=$($entries.Count)",
  "implementation_tree_sha256=$treeHash",
  '',
  $entries
)

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($OutputPath, [string[]]$content, $utf8NoBom)
Write-Output "Implementation digest captured. files=$($entries.Count) sha256=$treeHash output=$OutputPath"
