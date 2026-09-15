$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$viewport = '1440,1200'
$profiles = [System.Collections.Generic.List[string]]::new()

if (-not (Test-Path -LiteralPath $chrome)) { throw "Chrome is unavailable: $chrome" }

Add-Type -AssemblyName System.Drawing
$records = @()
foreach ($run in 1..3) {
  $runRoot = Join-Path $root "runs/run-$run"
  foreach ($drawer in @('open', 'hidden')) {
    foreach ($theme in @('light', 'dark')) {
      $output = Join-Path $runRoot "customer-search-$drawer-$theme.png"
      if (Test-Path -LiteralPath $output) { Remove-Item -LiteralPath $output -Force }
      $profile = Join-Path $env:TEMP ("ui-design-manifest-customer-shell-" + [guid]::NewGuid().ToString('N'))
      $null = $profiles.Add($profile)
      $fileUri = ([uri](Resolve-Path -LiteralPath (Join-Path $runRoot 'index.html')).Path).AbsoluteUri + "?drawer=$drawer&theme=$theme"
      $arguments = @('--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', "--window-size=$viewport", "--user-data-dir=$profile", "--screenshot=$output", $fileUri)
      $normal = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
      Start-Sleep -Seconds 2
      $fallbackUsed = $false
      $swiftshaderExit = $null
      if (-not (Test-Path -LiteralPath $output)) {
        $arguments = @('--headless=new', '--disable-gpu', '--use-angle=swiftshader', '--no-first-run', '--no-default-browser-check', "--window-size=$viewport", "--user-data-dir=$profile", "--screenshot=$output", $fileUri)
        $fallback = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
        Start-Sleep -Seconds 2
        $fallbackUsed = $true
        $swiftshaderExit = $fallback.ExitCode
      }
      if (-not (Test-Path -LiteralPath $output)) { throw "Capture failed: run-$run/$drawer/$theme" }
      $image = [System.Drawing.Image]::FromFile($output)
      try {
        $records += [ordered]@{
          run = $run; drawer = $drawer; theme = $theme; png = "runs/run-$run/customer-search-$drawer-$theme.png"; fallback_used = $fallbackUsed
          normal_exit_code = $normal.ExitCode; swiftshader_exit_code = $swiftshaderExit
          bytes = (Get-Item -LiteralPath $output).Length; width = $image.Width; height = $image.Height
          sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $output).Hash
        }
      } finally { $image.Dispose() }
    }
  }
}

foreach ($run in 1..3) {
  $runRoot = Join-Path $root "runs/run-$run"
  $output = Join-Path $runRoot 'customer-search-narrow-hidden-light.png'
  if (Test-Path -LiteralPath $output) { Remove-Item -LiteralPath $output -Force }
  $profile = Join-Path $env:TEMP ("ui-design-manifest-customer-shell-narrow-" + [guid]::NewGuid().ToString('N'))
  $null = $profiles.Add($profile)
  $fileUri = ([uri](Resolve-Path -LiteralPath (Join-Path $runRoot 'index.html')).Path).AbsoluteUri + '?drawer=hidden&theme=light'
  $arguments = @('--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--window-size=720,1200', "--user-data-dir=$profile", "--screenshot=$output", $fileUri)
  $normal = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
  Start-Sleep -Seconds 2
  $fallbackUsed = $false
  $swiftshaderExit = $null
  if (-not (Test-Path -LiteralPath $output)) {
    $arguments = @('--headless=new', '--disable-gpu', '--use-angle=swiftshader', '--no-first-run', '--no-default-browser-check', '--window-size=720,1200', "--user-data-dir=$profile", "--screenshot=$output", $fileUri)
    $fallback = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
    Start-Sleep -Seconds 2
    $fallbackUsed = $true
    $swiftshaderExit = $fallback.ExitCode
  }
  if (-not (Test-Path -LiteralPath $output)) { throw "Narrow capture failed: run-$run/hidden/light" }
  $image = [System.Drawing.Image]::FromFile($output)
  try {
    $records += [ordered]@{
      run = $run; drawer = 'hidden'; theme = 'light'; viewport = '720x1200'; png = "runs/run-$run/customer-search-narrow-hidden-light.png"; fallback_used = $fallbackUsed
      normal_exit_code = $normal.ExitCode; swiftshader_exit_code = $swiftshaderExit
      bytes = (Get-Item -LiteralPath $output).Length; width = $image.Width; height = $image.Height
      sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $output).Hash
    }
  } finally { $image.Dispose() }
}

[ordered]@{
  chrome_path = $chrome
  chrome_version = (Get-Item -LiteralPath $chrome).VersionInfo.ProductVersion
  viewport = '1440x1200'
  narrow_viewport = '720x1200'
  command_mode = 'headless=new, disable-gpu, no-first-run, no-default-browser-check; wait two seconds after each capture; SwiftShader once only after capture-file absence'
  command_template = 'chrome.exe --headless=new --disable-gpu --no-first-run --no-default-browser-check --window-size=1440,1200 --user-data-dir=<temporary-profile> --screenshot=<png> file:///.../index.html?drawer=<open|hidden>&theme=<light|dark>'
  captures = $records
} | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $root 'capture-record.json') -Encoding utf8

foreach ($profile in $profiles) {
  Remove-Item -LiteralPath $profile -Recurse -Force -ErrorAction SilentlyContinue
}
