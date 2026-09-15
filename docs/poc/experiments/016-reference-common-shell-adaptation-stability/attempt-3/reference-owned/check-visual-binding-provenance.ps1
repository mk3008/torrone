$ErrorActionPreference = 'Stop'

$repositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..\..\..\..\..')).Path
$referenceRoot = Join-Path $repositoryRoot 'docs/poc/experiments/015-reference-first-common-shell'
$bindingRoot = Join-Path $PSScriptRoot 'visual-bindings'
$referenceCss = Get-Content -Raw -LiteralPath (Join-Path $referenceRoot 'styles.css')
$referenceHtml = Get-Content -Raw -LiteralPath (Join-Path $referenceRoot 'index.html')
$referenceJs = Get-Content -Raw -LiteralPath (Join-Path $referenceRoot 'app.js')
$tokenCss = Get-Content -Raw -LiteralPath (Join-Path $bindingRoot 'visual-tokens.css')
$bindingMap = Get-Content -Raw -LiteralPath (Join-Path $bindingRoot 'binding-map.json') | ConvertFrom-Json

$tokens = @{
  'page-background' = @('#f4f7fa', '#101820')
  'surface-background' = @('#ffffff', '#1b2632')
  'text-primary' = @('#172033', '#f4f7fa')
  'text-muted' = @('#52657a', '#bac6d2')
  'border-subtle' = @('#c7d2df', '#516273')
  'border-interactive' = @('#75889c', '#91a3b5')
  'selection-background' = @('#e7f1fc', '#203e5a')
  'selection-foreground' = @('#172033', '#f4f7fa')
  'selection-indicator' = @('#0b5cad', '#74b7f5')
  'focus-ring' = @('#3b82f6', '#ffd54a')
}

foreach ($token in $tokens.GetEnumerator()) {
  foreach ($value in $token.Value) {
    if ($referenceCss -notmatch "--$($token.Key):\s*$value") {
      throw "Approved Reference CSS lacks expected token value: --$($token.Key) $value"
    }
    if ($tokenCss -notmatch "--reference-$($token.Key):\s*$value") {
      throw "Candidate visual token stylesheet lacks expected value: --reference-$($token.Key) $value"
    }
  }
}

$iconEvidence = @{
  'drawer-hide.svg' = 'M4 5h16v14H4zM9 5v14M15 9l-3 3 3 3'
  'drawer-show.svg' = 'M4 5h16v14H4zM9 5v14M12 9l3 3-3 3'
  'theme-to-dark.svg' = 'M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8z'
  'theme-to-light.svg' = 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41'
  'disclosure-expanded.svg' = 'm6 9 6 6 6-6'
  'disclosure-collapsed.svg' = 'm9 18 6-6-6-6'
  'search.svg' = 'm16 16 4 4'
}

foreach ($icon in $iconEvidence.GetEnumerator()) {
  $assetText = Get-Content -Raw -LiteralPath (Join-Path $bindingRoot "icons/$($icon.Key)")
  if ($assetText -notlike "*$($icon.Value)*") {
    throw "Candidate icon asset lacks expected path: $($icon.Key)"
  }
  if (($referenceHtml + $referenceJs) -notlike "*$($icon.Value)*") {
    throw "Approved Reference source lacks expected icon path: $($icon.Key)"
  }
}

if ($bindingMap.themeRootAttribute -ne 'data-reference-visual-theme') {
  throw 'Binding map has an unexpected theme root hook.'
}
if (($bindingMap.themeModes -join ',') -ne 'light,dark') {
  throw 'Binding map has an unexpected theme mode set.'
}
if ($bindingMap.icons.drawerVisible.asset -ne 'icons/drawer-hide.svg' -or $bindingMap.icons.drawerHidden.asset -ne 'icons/drawer-show.svg') {
  throw 'Binding map has an unexpected Drawer state-to-icon pairing.'
}
if ($bindingMap.icons.disclosureExpanded.location -ne 'parent-row-trailing' -or $bindingMap.icons.disclosureCollapsed.location -ne 'parent-row-trailing') {
  throw 'Binding map has an unexpected disclosure placement.'
}
if ($bindingMap.surfaces.selection.indicatorLocation -ne 'drawer-row-physical-start') {
  throw 'Binding map has an unexpected active indicator placement.'
}
if ($bindingMap.surfaces.selection.indicatorWidth -ne '0.25rem' -or $bindingMap.surfaces.selection.rowCoverage -ne 'full-row') {
  throw 'Binding map has an unexpected active indicator representation.'
}
foreach ($iconName in @('drawerVisible', 'drawerHidden', 'themeLight', 'themeDark')) {
  if ($bindingMap.icons.$iconName.size -ne '1.25rem') { throw "Binding map has an unexpected icon size: $iconName" }
}
foreach ($iconName in @('disclosureExpanded', 'disclosureCollapsed', 'search')) {
  if ($bindingMap.icons.$iconName.size -ne '1rem') { throw "Binding map has an unexpected icon size: $iconName" }
}

Write-Output 'Reference visual binding provenance check passed.'
