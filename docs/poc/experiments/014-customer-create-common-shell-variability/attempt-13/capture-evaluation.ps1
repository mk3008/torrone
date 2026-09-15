$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$profiles = [System.Collections.Generic.List[string]]::new()

if (-not (Test-Path -LiteralPath $chrome)) { throw "Chrome is unavailable: $chrome" }

function Invoke-Capture([string]$source, [string]$destination, [string]$viewport, [string]$label) {
  if (Test-Path -LiteralPath $destination) { Remove-Item -LiteralPath $destination -Force }
  $profile = Join-Path $env:TEMP ("ui-design-manifest-customer-create-" + [guid]::NewGuid().ToString('N'))
  $null = $profiles.Add($profile)
  $arguments = @('--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', "--window-size=$viewport", "--user-data-dir=$profile", "--screenshot=$destination", $source)
  $normal = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
  Start-Sleep -Seconds 2
  $fallbackUsed = $false
  $swiftshaderExit = $null
  if (-not (Test-Path -LiteralPath $destination)) {
    $arguments = @('--headless=new', '--disable-gpu', '--use-angle=swiftshader', '--no-first-run', '--no-default-browser-check', "--window-size=$viewport", "--user-data-dir=$profile", "--screenshot=$destination", $source)
    $fallback = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
    Start-Sleep -Seconds 2
    $fallbackUsed = $true
    $swiftshaderExit = $fallback.ExitCode
  }
  if (-not (Test-Path -LiteralPath $destination)) { throw "Capture failed: $label" }
  return [ordered]@{ fallback_used = $fallbackUsed; normal_exit_code = $normal.ExitCode; swiftshader_exit_code = $swiftshaderExit }
}

Add-Type -AssemblyName System.Drawing
$records = @()
foreach ($run in 1..3) {
  $runRoot = Join-Path $root "runs/run-$run"
  foreach ($drawer in @('open', 'hidden')) {
    foreach ($theme in @('light', 'dark')) {
      $output = Join-Path $runRoot "customer-create-$drawer-$theme.png"
      $uri = ([uri](Resolve-Path -LiteralPath (Join-Path $runRoot 'index.html')).Path).AbsoluteUri + "?drawer=$drawer&theme=$theme"
      $result = Invoke-Capture $uri $output '1440,1200' "run-$run/$drawer/$theme"
      $image = [System.Drawing.Image]::FromFile($output)
      try {
        $records += [ordered]@{ run = $run; drawer = $drawer; theme = $theme; viewport = '1440x1200'; png = "runs/run-$run/customer-create-$drawer-$theme.png"; bytes = (Get-Item -LiteralPath $output).Length; width = $image.Width; height = $image.Height; sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $output).Hash } + $result
      } finally { $image.Dispose() }
    }
  }
  $output = Join-Path $runRoot 'customer-create-narrow-hidden-light.png'
  $uri = ([uri](Resolve-Path -LiteralPath (Join-Path $runRoot 'index.html')).Path).AbsoluteUri + '?drawer=hidden&theme=light'
  $result = Invoke-Capture $uri $output '720,1200' "run-$run/narrow/hidden/light"
  $image = [System.Drawing.Image]::FromFile($output)
  try {
    $records += [ordered]@{ run = $run; drawer = 'hidden'; theme = 'light'; viewport = '720x1200'; png = "runs/run-$run/customer-create-narrow-hidden-light.png"; bytes = (Get-Item -LiteralPath $output).Length; width = $image.Width; height = $image.Height; sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $output).Hash } + $result
  } finally { $image.Dispose() }
}

[ordered]@{
  chrome_path = $chrome
  chrome_version = (Get-Item -LiteralPath $chrome).VersionInfo.ProductVersion
  viewport = '1440x1200'
  narrow_viewport = '720x1200'
  command_mode = 'headless=new, disable-gpu, no-first-run, no-default-browser-check; wait two seconds after each capture; SwiftShader once only after capture-file absence'
  command_template = 'chrome.exe --headless=new --disable-gpu --no-first-run --no-default-browser-check --window-size=<viewport> --user-data-dir=<temporary-profile> --screenshot=<png> file:///.../index.html?drawer=<open|hidden>&theme=<light|dark>'
  captures = $records
} | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $root 'capture-record.json') -Encoding utf8

foreach ($profile in $profiles) { Remove-Item -LiteralPath $profile -Recurse -Force -ErrorAction SilentlyContinue }
