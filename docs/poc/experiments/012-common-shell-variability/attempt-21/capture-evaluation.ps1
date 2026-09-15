$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$viewport = '1440,1200'
$narrowViewport = '720,1200'
$profileRoot = 'C:\tmp'

if (-not (Test-Path -LiteralPath $chrome)) { throw "Chrome is unavailable: $chrome" }

function Invoke-OneCapture([string[]]$arguments, [string]$destination) {
  Remove-Item -LiteralPath $destination -Force -ErrorAction SilentlyContinue
  $process = Start-Process -FilePath $chrome -ArgumentList $arguments -NoNewWindow -PassThru
  $deadline = [DateTime]::UtcNow.AddSeconds(20)
  try {
    while (-not (Test-Path -LiteralPath $destination) -and [DateTime]::UtcNow -lt $deadline) {
      Start-Sleep -Milliseconds 100
    }
    return (Test-Path -LiteralPath $destination)
  } finally {
    if (-not $process.HasExited) { Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue }
  }
}

function Invoke-Capture([string]$source, [string]$destination, [string]$label, [string]$size) {
  $profile = Join-Path $profileRoot ("ui-design-manifest-common-shell-" + [guid]::NewGuid().ToString('N'))
  try {
    $arguments = @('--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', "--window-size=$size", "--user-data-dir=$profile", "--screenshot=$destination", $source)
    if (Invoke-OneCapture $arguments $destination) { return $false }
  } finally {
    Remove-Item -LiteralPath $profile -Recurse -Force -ErrorAction SilentlyContinue
  }

  $fallbackProfile = Join-Path $profileRoot ("ui-design-manifest-common-shell-swiftshader-" + [guid]::NewGuid().ToString('N'))
  try {
    $fallbackArguments = @('--headless=new', '--disable-gpu', '--use-angle=swiftshader', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', "--window-size=$size", "--user-data-dir=$fallbackProfile", "--screenshot=$destination", $source)
    if (-not (Invoke-OneCapture $fallbackArguments $destination)) { throw "Capture failed: $label" }
    return $true
  } finally {
    Remove-Item -LiteralPath $fallbackProfile -Recurse -Force -ErrorAction SilentlyContinue
  }
}

Add-Type -AssemblyName System.Drawing
$records = @()
foreach ($run in 1..3) {
  $runRoot = Join-Path $root "runs/run-$run"
  $html = Join-Path $runRoot 'index.html'
  foreach ($theme in @('light', 'dark')) {
    foreach ($drawer in @('open', 'hidden')) {
      $output = Join-Path $runRoot "shell-$drawer-$theme.png"
      $fileUri = ([uri](Resolve-Path -LiteralPath $html).Path).AbsoluteUri + "?drawer=$drawer&theme=$theme"
      $fallback = Invoke-Capture $fileUri $output "run-$run/$drawer/$theme" $viewport
      $image = [System.Drawing.Image]::FromFile($output)
      try {
        $records += [ordered]@{
          run = $run; drawer = $drawer; theme = $theme; viewport = '1440x1200'; png = "runs/run-$run/shell-$drawer-$theme.png"; fallback_used = $fallback
          bytes = (Get-Item -LiteralPath $output).Length; width = $image.Width; height = $image.Height
          sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $output).Hash
        }
      } finally { $image.Dispose() }
    }
  }
  $narrowOutput = Join-Path $runRoot 'shell-open-light-narrow.png'
  $narrowUri = ([uri](Resolve-Path -LiteralPath $html).Path).AbsoluteUri + '?drawer=open&theme=light'
  $fallback = Invoke-Capture $narrowUri $narrowOutput "run-$run/open/light/narrow" $narrowViewport
  $image = [System.Drawing.Image]::FromFile($narrowOutput)
  try {
    $records += [ordered]@{
      run = $run; drawer = 'open'; theme = 'light'; viewport = '720x1200'; png = "runs/run-$run/shell-open-light-narrow.png"; fallback_used = $fallback
      bytes = (Get-Item -LiteralPath $narrowOutput).Length; width = $image.Width; height = $image.Height
      sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $narrowOutput).Hash
    }
  } finally { $image.Dispose() }
}

[ordered]@{
  chrome_path = $chrome
  chrome_version = (Get-Item -LiteralPath $chrome).VersionInfo.ProductVersion
  viewport = '1440x1200'
  narrow_viewport = '720x1200'
  command_mode = 'headless=new, disable-gpu, independent C:\\tmp temporary profile; SwiftShader once only after failure'
  command_template = 'chrome.exe --headless=new --disable-gpu --no-first-run --no-default-browser-check --remote-debugging-port=0 --window-size=<viewport> --user-data-dir=C:\\tmp\\<temporary-profile> --screenshot=<png> file:///.../index.html?drawer=<open|hidden>&theme=<light|dark>'
  captures = $records
} | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $root 'capture-record.json') -Encoding utf8
