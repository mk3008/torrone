$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$fixture = Get-Content -Raw -LiteralPath (Join-Path $root 'fixture.json') | ConvertFrom-Json
$roles = @($fixture.navigation.role)

if (($roles | Where-Object { $_ -eq 'top-level' }).Count -lt 2) { throw 'Fixture candidate requires two top-level non-parent items.' }
if (($roles | Where-Object { $_ -eq 'parent' }).Count -ne 1) { throw 'Fixture candidate requires one parent item.' }
$parent = @($fixture.navigation | Where-Object { $_.role -eq 'parent' })[0]
if (@($parent.children | Where-Object { $_.role -eq 'child' }).Count -lt 1) { throw 'Fixture candidate requires at least one child item.' }

$preview = Get-Content -Raw -LiteralPath (Join-Path $root 'preview\preview.js')
if ($preview -notmatch "fetch\('../fixture\.json'\)") { throw 'Preview must load the canonical candidate fixture data.' }
if ($preview -notmatch "navigation-row\$\{child \? ' child' : ''\}") { throw 'Preview must preserve the Reference child-row hook for observation.' }

Write-Output 'Product fixture vNext candidate check passed. roles=top-level,parent,child; preview=canonical-data-backed.'
