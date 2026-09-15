$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$viewport = '1440,1200'

if (-not (Test-Path -LiteralPath $chrome)) { throw "Chrome is unavailable: $chrome" }

function Invoke-Capture([string]$source, [string]$destination, [string]$label) {
  $profile = Join-Path $env:TEMP ("ui-design-manifest-customer-shell-" + [guid]::NewGuid().ToString('N'))
  try {
    $arguments = @('--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', "--window-size=$viewport", "--user-data-dir=$profile", "--screenshot=$destination", $source)
    $normal = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
    if (-not (Test-Path -LiteralPath $destination)) {
      $arguments = @('--headless=new', '--disable-gpu', '--use-angle=swiftshader', "--window-size=$viewport", "--user-data-dir=$profile", "--screenshot=$destination", $source)
      $fallback = Start-Process -FilePath $chrome -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
      if (-not (Test-Path -LiteralPath $destination)) { throw "Capture failed: $label" }
      return [ordered]@{ fallback_used = $true; normal_exit_code = $normal.ExitCode; swiftshader_exit_code = $fallback.ExitCode }
    }
    return [ordered]@{ fallback_used = $false; normal_exit_code = $normal.ExitCode; swiftshader_exit_code = $null }
  } finally {
    Remove-Item -LiteralPath $profile -Recurse -Force -ErrorAction SilentlyContinue
  }
}

Add-Type -AssemblyName System.Drawing
$records = @()
foreach ($run in 1..3) {
  $runRoot = Join-Path $root "runs/run-$run"
  foreach ($theme in @('light', 'dark')) {
    foreach ($drawer in @('open', 'hidden')) {
      $output = Join-Path $runRoot "customer-search-$drawer-$theme.png"
      $fileUri = ([uri](Resolve-Path -LiteralPath (Join-Path $runRoot 'index.html')).Path).AbsoluteUri + "?drawer=$drawer&theme=$theme"
      $capture = Invoke-Capture $fileUri $output "run-$run/$drawer/$theme"
      $image = [System.Drawing.Image]::FromFile($output)
      try {
        $records += [ordered]@{
          run = $run; drawer = $drawer; theme = $theme; png = "runs/run-$run/customer-search-$drawer-$theme.png"; fallback_used = $capture.fallback_used
          normal_exit_code = $capture.normal_exit_code; swiftshader_exit_code = $capture.swiftshader_exit_code
          bytes = (Get-Item -LiteralPath $output).Length; width = $image.Width; height = $image.Height
          sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $output).Hash
        }
      } finally { $image.Dispose() }
    }
  }
}

[ordered]@{
  chrome_path = $chrome
  chrome_version = (Get-Item -LiteralPath $chrome).VersionInfo.ProductVersion
  viewport = '1440x1200'
  command_mode = 'headless=new, disable-gpu, no-first-run, no-default-browser-check; SwiftShader once only after capture-file absence'
  command_template = 'chrome.exe --headless=new --disable-gpu --no-first-run --no-default-browser-check --window-size=1440,1200 --user-data-dir=<temporary-profile> --screenshot=<png> file:///.../index.html?drawer=<open|hidden>&theme=<light|dark>'
  captures = $records
} | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $root 'capture-record.json') -Encoding utf8
