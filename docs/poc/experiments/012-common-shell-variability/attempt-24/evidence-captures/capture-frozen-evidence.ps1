param(
  [string]$ServerBase = 'http://127.0.0.1:41824',
  [string]$ChromeExecutable = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
)

$ErrorActionPreference = 'Stop'
$attemptRoot = Split-Path -Parent $PSScriptRoot
$runsRoot = Join-Path $attemptRoot 'runs'
$manifestPath = Join-Path $PSScriptRoot 'evidence-manifest.json'
$commandLogPath = Join-Path $PSScriptRoot 'capture-command-log.jsonl'
$sourceBeforePath = Join-Path $PSScriptRoot 'source-digests-before.json'
$sourceAfterPath = Join-Path $PSScriptRoot 'source-digests-after.json'

function Get-SourceDigests {
  param([string]$Root)
  @(Get-ChildItem $Root -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\captures\\' } |
    Sort-Object FullName |
    ForEach-Object {
      [ordered]@{
        path = $_.FullName.Substring($attemptRoot.Length + 1).Replace('\', '/')
        sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $_.FullName).Hash.ToLowerInvariant()
        bytes = $_.Length
      }
    })
}

$sourceBefore = Get-SourceDigests -Root $runsRoot
$sourceBefore | ConvertTo-Json -Depth 4 | Set-Content -Encoding utf8 $sourceBeforePath
$records = [System.Collections.Generic.List[object]]::new()

function Invoke-Cli {
  param([string]$Session, [string[]]$Arguments)
  $npxArguments = @('--yes', '--package', '@playwright/cli', 'playwright-cli', "-s=$Session") + $Arguments
  $command = 'npx ' + (($npxArguments | ForEach-Object { if ($_ -match '[\s]' ) { '"' + $_ + '"' } else { $_ } }) -join ' ')
  $output = & npx @npxArguments 2>&1 | Out-String
  $exitCode = $LASTEXITCODE
  $entry = [ordered]@{ command = $command; exit_code = $exitCode; output = $output.TrimEnd() }
  $entry | ConvertTo-Json -Compress -Depth 5 | Add-Content -Encoding utf8 $commandLogPath
  if ($exitCode -ne 0) { throw "Playwright CLI failed ($exitCode): $command`n$output" }
  return [pscustomobject]$entry
}

function Get-PngMetadata {
  param([string]$Path)
  $image = [System.Drawing.Image]::FromFile($Path)
  try {
    [ordered]@{
      sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant()
      bytes = (Get-Item -LiteralPath $Path).Length
      dimensions = "$($image.Width)x$($image.Height)"
    }
  } finally {
    $image.Dispose()
  }
}

$runConfigs = @(
  [ordered]@{ run = 'run-1'; search = '#nav-search'; workspaceX = 960; disclosure = 'text=グループ 01' },
  [ordered]@{ run = 'run-2'; search = '#nav-search'; workspaceX = 960; disclosure = 'text=グループ 01' },
  [ordered]@{ run = 'run-3'; search = '#navSearch'; workspaceX = 960; disclosure = 'text=グループ 01' }
)
$viewports = @(
  [ordered]@{ name = 'desktop'; width = 1440; height = 1200 },
  [ordered]@{ name = 'narrow'; width = 720; height = 1200 }
)

foreach ($runConfig in $runConfigs) {
  foreach ($viewport in $viewports) {
    $session = "common-shell-$($runConfig.run)-$($viewport.width)"
    $directory = Join-Path $PSScriptRoot "$($runConfig.run)\$($viewport.name)"
    New-Item -ItemType Directory -Force $directory | Out-Null
    $open = Invoke-Cli -Session $session -Arguments @('open', "$ServerBase/$($runConfig.run)/index.html?drawer=open&theme=light", '--browser', 'chrome')
    $resize = Invoke-Cli -Session $session -Arguments @('resize', "$($viewport.width)", "$($viewport.height)")
    $snapshot = Invoke-Cli -Session $session -Arguments @('snapshot')

    $stateDefinitions = @(
      [ordered]@{ state = 'initial-menu-light-palette'; theme = 'light'; drawer = 'open'; actions = @() },
      [ordered]@{ state = 'initial-menu-dark-palette'; theme = 'dark'; drawer = 'open'; actions = @() },
      [ordered]@{ state = 'drawer-hidden-light'; theme = 'light'; drawer = 'hidden'; actions = @() },
      [ordered]@{ state = 'drawer-hidden-dark-track-removal'; theme = 'dark'; drawer = 'hidden'; actions = @() },
      [ordered]@{ state = 'search-match-light'; theme = 'light'; drawer = 'open'; actions = @([pscustomobject]@{ command = 'fill'; first = $runConfig.search; second = '項目 30' }) },
      [ordered]@{ state = 'search-no-match-dark'; theme = 'dark'; drawer = 'open'; actions = @([pscustomobject]@{ command = 'fill'; first = $runConfig.search; second = '存在しない項目' }) },
      [ordered]@{ state = 'drawer-scroll-light'; theme = 'light'; drawer = 'open'; actions = @([pscustomobject]@{ command = 'mousemove'; first = '160'; second = '900' }, [pscustomobject]@{ command = 'mousewheel'; first = '0'; second = '900' }) },
      [ordered]@{ state = 'workspace-scroll-header-persistent-light'; theme = 'light'; drawer = 'open'; actions = @([pscustomobject]@{ command = 'mousemove'; first = [string]([math]::Min($viewport.width - 80, $runConfig.workspaceX)); second = '900' }, [pscustomobject]@{ command = 'mousewheel'; first = '0'; second = '1000' }) },
      [ordered]@{ state = 'selection-transfer-light'; theme = 'light'; drawer = 'open'; actions = @([pscustomobject]@{ command = 'click'; first = 'text=項目 30'; second = $null }) },
      [ordered]@{ state = 'disclosure-current-destination-light'; theme = 'light'; drawer = 'open'; actions = @([pscustomobject]@{ command = 'click'; first = $runConfig.disclosure; second = $null }) }
    )

    foreach ($definition in $stateDefinitions) {
      $url = "$ServerBase/$($runConfig.run)/index.html?drawer=$($definition.drawer)&theme=$($definition.theme)"
      $commands = [System.Collections.Generic.List[object]]::new()
      $commands.Add((Invoke-Cli -Session $session -Arguments @('goto', $url)))
      foreach ($action in $definition.actions) {
        $actionArguments = @($action.command, $action.first)
        if ($null -ne $action.second) { $actionArguments += $action.second }
        $commands.Add((Invoke-Cli -Session $session -Arguments $actionArguments))
      }
      $filename = "$($definition.state).png"
      $fullPath = Join-Path $directory $filename
      $commands.Add((Invoke-Cli -Session $session -Arguments @('screenshot', '--filename', $fullPath)))
      if (-not (Test-Path -LiteralPath $fullPath)) { throw "Missing capture: $fullPath" }
      $metadata = Get-PngMetadata -Path $fullPath
      $records.Add([ordered]@{
        run = $runConfig.run
        viewport = [ordered]@{ name = $viewport.name; css_pixels = "$($viewport.width)x$($viewport.height)" }
        state = $definition.state
        url = $url
        png = ($fullPath.Substring($attemptRoot.Length + 1).Replace('\', '/'))
        command = $commands[$commands.Count - 1].command
        exit_code = $commands[$commands.Count - 1].exit_code
        commands = @($commands)
        sha256 = $metadata.sha256
        bytes = $metadata.bytes
        dimensions = $metadata.dimensions
      })
    }
    Invoke-Cli -Session $session -Arguments @('close') | Out-Null
  }
}

$sourceAfter = Get-SourceDigests -Root $runsRoot
$sourceAfter | ConvertTo-Json -Depth 4 | Set-Content -Encoding utf8 $sourceAfterPath
[ordered]@{
  manifest_version = 1
  capture_tool = [ordered]@{
    command = 'npx --yes --package @playwright/cli playwright-cli'
    browser_channel = 'chrome'
    chrome_executable_preflight = $ChromeExecutable
    server_base = $ServerBase
  }
  source_digests_before = 'source-digests-before.json'
  source_digests_after = 'source-digests-after.json'
  command_log = 'capture-command-log.jsonl'
  captures = @($records)
} | ConvertTo-Json -Depth 12 | Set-Content -Encoding utf8 $manifestPath

if (($sourceBefore | ConvertTo-Json -Depth 4 -Compress) -ne ($sourceAfter | ConvertTo-Json -Depth 4 -Compress)) { throw 'Generated Run source digests changed during capture.' }
