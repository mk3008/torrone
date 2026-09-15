[CmdletBinding()]
param(
  [string]$CanaryRoot = '',
  [string]$CaptureRoot = '',
  [string]$BaselineCommit = ''
)

$ErrorActionPreference = 'Stop'
$repositoryRoot = (git rev-parse --show-toplevel).Trim()
if ($LASTEXITCODE -ne 0) { throw 'Not inside a Git worktree.' }
if ([string]::IsNullOrWhiteSpace($BaselineCommit)) {
  $BaselineCommit = (git -C $repositoryRoot rev-parse HEAD).Trim()
}
if ([string]::IsNullOrWhiteSpace($CanaryRoot)) {
  $CanaryRoot = Join-Path 'C:\tmp' "react-harness-canary-$([guid]::NewGuid().ToString('N'))"
}
if ([string]::IsNullOrWhiteSpace($CaptureRoot)) {
  $CaptureRoot = Join-Path 'C:\tmp' "react-harness-capture-$([guid]::NewGuid().ToString('N'))"
}

$createdCanary = $false
$serverProcess = $null
$browserSession = "react-harness-canary-$([guid]::NewGuid().ToString('N'))"
$preflight = Join-Path $PSScriptRoot 'check-react-harness-input.ps1'
$boundaryCheck = Join-Path $PSScriptRoot 'check-react-harness-boundary.ps1'

function Invoke-Preflight {
  param([string]$RunRoot = '')
  $arguments = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $preflight, '-RepositoryRoot', $CanaryRoot)
  if (-not [string]::IsNullOrWhiteSpace($RunRoot)) {
    $arguments += @('-RunRoot', $RunRoot)
  }
  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $output = @(& powershell @arguments 2>&1)
  $exitCode = $LASTEXITCODE
  $ErrorActionPreference = $previousErrorActionPreference
  return [pscustomobject]@{ ExitCode = $exitCode; Output = $output }
}

function Invoke-ExpectedPass {
  param([string]$Name, [string]$RunRoot = '')
  $result = Invoke-Preflight -RunRoot $RunRoot
  if ($result.ExitCode -ne 0) {
    throw "Expected preflight pass failed: $Name. $($result.Output -join [Environment]::NewLine)"
  }
  Write-Output "Canary pass: $Name"
}

function Invoke-ExpectedRejection {
  param([string]$Name, [string]$RunRoot = '')
  $result = Invoke-Preflight -RunRoot $RunRoot
  if ($result.ExitCode -eq 0) {
    throw "Expected preflight rejection was accepted: $Name. $($result.Output -join [Environment]::NewLine)"
  }
  Write-Output "Expected rejection: $Name"
}

function Restore-CanaryPath {
  param([string]$Path)
  & git -C $CanaryRoot restore --staged --worktree --source $BaselineCommit -- $Path
  if ($LASTEXITCODE -ne 0) { throw "Cannot restore canary path: $Path" }
}

function Invoke-Playwright {
  param([string[]]$Arguments)
  $output = @(& npx --yes --package '@playwright/cli@0.1.18' playwright-cli "-s=$browserSession" @Arguments 2>&1)
  if ($LASTEXITCODE -ne 0) {
    throw "Playwright command failed: $($Arguments -join ' '). $($output -join [Environment]::NewLine)"
  }
  return $output
}

try {
  & git -C $repositoryRoot worktree add --quiet --detach $CanaryRoot $BaselineCommit
  if ($LASTEXITCODE -ne 0) { throw 'Cannot create isolated React harness canary worktree.' }
  $createdCanary = $true

  Invoke-ExpectedPass 'all frozen inputs and harness, normal checkout'
  & powershell -NoProfile -ExecutionPolicy Bypass -File $boundaryCheck -RepositoryRoot $CanaryRoot
  if ($LASTEXITCODE -ne 0) { throw 'React harness boundary check failed.' }

  $conditionPath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/condition/experiment-condition.md'
  $conditionFullPath = Join-Path $CanaryRoot $conditionPath
  $conditionText = [IO.File]::ReadAllText($conditionFullPath)
  [IO.File]::WriteAllText($conditionFullPath, ([regex]::Replace($conditionText, "`r?`n", "`r`n")), [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedPass 'CRLF-only checkout representation'
  Restore-CanaryPath $conditionPath

  [IO.File]::AppendAllText($conditionFullPath, "`n<!-- canary condition mutation -->`n", [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'unstaged common-condition change'
  Restore-CanaryPath $conditionPath

  $vitePath = 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/harness/vite.config.ts'
  $viteFullPath = Join-Path $CanaryRoot $vitePath
  [IO.File]::AppendAllText($viteFullPath, "`n// canary staged configuration mutation`n", [Text.UTF8Encoding]::new($false))
  & git -C $CanaryRoot add -- $vitePath
  if ($LASTEXITCODE -ne 0) { throw 'Cannot stage canary Vite configuration mutation.' }
  Invoke-ExpectedRejection 'staged shared-configuration change'
  Restore-CanaryPath $vitePath

  $untrackedPath = Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/harness/canary-untracked.ts'
  [IO.File]::WriteAllText($untrackedPath, 'export {}', [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'untracked harness file'
  Remove-Item -LiteralPath $untrackedPath -Force

  $derivedRunRoot = Join-Path $CaptureRoot 'derived-run'
  Write-Output 'Canary stage: derive isolated Run configuration fixture'
  New-Item -ItemType Directory -Path $CaptureRoot -Force | Out-Null
  Copy-Item -LiteralPath (Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/harness') -Destination $derivedRunRoot -Recurse
  Invoke-ExpectedPass 'derived Run configuration equality' -RunRoot $derivedRunRoot
  [IO.File]::AppendAllText((Join-Path $derivedRunRoot 'package.json'), "`n", [Text.UTF8Encoding]::new($false))
  Invoke-ExpectedRejection 'derived Run dependency configuration change' -RunRoot $derivedRunRoot
  Remove-Item -LiteralPath $derivedRunRoot -Recurse -Force

  $harnessRoot = Join-Path $CanaryRoot 'docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-5/harness'
  Write-Output 'Canary stage: install, typecheck, and build'
  Push-Location $harnessRoot
  try {
    & npm ci --cache (Join-Path $CaptureRoot 'npm-cache') --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'npm ci failed in isolated canary.' }
    & npm run typecheck
    if ($LASTEXITCODE -ne 0) { throw 'TypeScript verification failed in isolated canary.' }
    & npm run build
    if ($LASTEXITCODE -ne 0) { throw 'Vite production build failed in isolated canary.' }

    $stdoutLog = Join-Path $CaptureRoot 'vite.stdout.log'
    $stderrLog = Join-Path $CaptureRoot 'vite.stderr.log'
    $viteCli = Join-Path $harnessRoot 'node_modules/vite/bin/vite.js'
    $serverProcess = Start-Process -FilePath 'node.exe' -ArgumentList @($viteCli, '--host', '127.0.0.1', '--port', '4175', '--strictPort') -WorkingDirectory $harnessRoot -RedirectStandardOutput $stdoutLog -RedirectStandardError $stderrLog -PassThru -WindowStyle Hidden
    $lightUrl = 'http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview'
    $darkUrl = 'http://127.0.0.1:4175/?theme=dark&drawer=open&workspace=expanded&current=Overview'
    $serverReady = $false
    for ($attempt = 0; $attempt -lt 30; $attempt += 1) {
      try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $lightUrl -TimeoutSec 2
        if ($response.StatusCode -eq 200) { $serverReady = $true; break }
      } catch {
        Start-Sleep -Milliseconds 500
      }
    }
    if (-not $serverReady) { throw 'Vite development server did not become reachable over HTTP.' }

    Write-Output 'Canary stage: browser HTTP capture'
    Invoke-Playwright @('open', $lightUrl) | Out-Null
    Invoke-Playwright @('resize', '1440', '900') | Out-Null
    $lightSnapshot = Invoke-Playwright @('snapshot')
    if (($lightSnapshot -join [Environment]::NewLine) -notmatch 'theme=light') { throw 'Light theme entry did not render its theme state.' }
    $lightCapture = Join-Path $CaptureRoot 'light.png'
    Invoke-Playwright @('screenshot', '--filename', $lightCapture) | Out-Null
    if (-not (Test-Path -LiteralPath $lightCapture -PathType Leaf)) { throw 'Light HTTP capture was not created.' }

    Invoke-Playwright @('goto', $darkUrl) | Out-Null
    $darkSnapshot = Invoke-Playwright @('snapshot')
    if (($darkSnapshot -join [Environment]::NewLine) -notmatch 'theme=dark') { throw 'Dark theme entry did not render its theme state.' }
    $darkCapture = Join-Path $CaptureRoot 'dark.png'
    Invoke-Playwright @('screenshot', '--filename', $darkCapture) | Out-Null
    if (-not (Test-Path -LiteralPath $darkCapture -PathType Leaf)) { throw 'Dark HTTP capture was not created.' }
    Write-Output 'Canary pass: HTTP browser display and automated light/dark capture'
  } finally {
    Pop-Location
  }

  Invoke-ExpectedPass 'all frozen inputs and harness after install/build/capture'
  Write-Output 'React framework-adaptation harness canary passed.'
} finally {
  Write-Output 'Canary cleanup: stop browser, server, capture directory, and worktree'
  try { Invoke-Playwright @('close') | Out-Null } catch { }
  if ($null -ne $serverProcess -and $null -ne (Get-Process -Id $serverProcess.Id -ErrorAction SilentlyContinue)) {
    & taskkill.exe /PID $serverProcess.Id /T /F | Out-Null
    Start-Sleep -Milliseconds 500
  }
  if (Test-Path -LiteralPath $CaptureRoot) {
    Remove-Item -LiteralPath $CaptureRoot -Recurse -Force
  }
  if ($createdCanary -and (Test-Path -LiteralPath $CanaryRoot)) {
    & git -C $repositoryRoot worktree remove --force $CanaryRoot
    if ($LASTEXITCODE -ne 0) { throw 'Cannot remove isolated React harness canary worktree.' }
  }
  Write-Output 'Canary cleanup complete.'
}
