# Attempt 31 capture record

- Browser: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Browser version: `150.0.7871.187`
- Viewport: `1440 × 1200`
- Capture mode: `--headless=new --disable-gpu`
- Fallback: not used
- Result: 12/12 successful, exit code `0`

Each state was captured with the absolute local HTML path, then its `drawer`
and `theme` query values. The final command uses `Start-Process -Wait
-PassThru`; its process exit code is the recorded result.

```powershell
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$arguments = @(
  '--headless=new', '--disable-gpu', '--hide-scrollbars',
  '--window-size=1440,1200',
  '--user-data-dir=C:\tmp\common-shell-human-feedback-v3-chrome-profile-2',
  '--screenshot=<attempt-31>\evidence-captures\run-<n>-<theme>-<drawer>.png',
  'file:///.../runs/run-<n>/index.html?drawer=<open|hidden>&theme=<light|dark>'
)
(Start-Process -FilePath $chrome -ArgumentList $arguments -Wait -PassThru).ExitCode
```

An earlier helper invoked Chrome directly and then interpreted PowerShell's
unset `$LASTEXITCODE` as a failure although Chrome had written one image. That
image was overwritten. The twelve records below are only from the explicit
process-exit-code command above.

| PNG | Bytes | Dimensions | Raw-byte SHA-256 |
| --- | ---: | --- | --- |
| `run-1-light-open.png` | 69790 | 1440 × 1200 | `7795E685871F6F4F0BCEDCDBBD08AFA373FB60ED1CF16D896B5B7EEBA1D47583` |
| `run-1-light-hidden.png` | 44564 | 1440 × 1200 | `A2A220315B5A6B2D5231B9DC8A755B8DCA1BE40263A137C090285B1B9B5A24F1` |
| `run-1-dark-open.png` | 70960 | 1440 × 1200 | `96AFC8B8B07704500F1FD1D841C91488B8A57900BFD42473595A175F36486B6E` |
| `run-1-dark-hidden.png` | 45664 | 1440 × 1200 | `8928ECCFFFFCF0786B2EDEB507C1B86AADEF9E5506A1CD8E15F8B8E167752327` |
| `run-2-light-open.png` | 58539 | 1440 × 1200 | `1678A501A9327B2D9B319A0F98261EAE8272A8EA6ACE308F93EE13D2DCD35BCC` |
| `run-2-light-hidden.png` | 33096 | 1440 × 1200 | `DCBAB12474D35D161E52369E0645115A11D4232335994F1497E423FD6CE09EDA` |
| `run-2-dark-open.png` | 58859 | 1440 × 1200 | `ACD93DC559F9720D50024B5BCB6AAE187C26ADA18CB3FE1983B4C86EF15BBD3B` |
| `run-2-dark-hidden.png` | 33471 | 1440 × 1200 | `F8E1C92DBD64E4372CAB6B520FD9067A2BE99B5EB84D9A5FEEA4558C3E0AFD83` |
| `run-3-light-open.png` | 70013 | 1440 × 1200 | `872E7F7286EC74C6D04E7933719B34FBCB6068BE1C85948C7C2C0126D3153B29` |
| `run-3-light-hidden.png` | 45272 | 1440 × 1200 | `467A3269CBAEEA36F48C86CA417AC901A457C31A7A86843004B86BFCAD45B37D` |
| `run-3-dark-open.png` | 70860 | 1440 × 1200 | `82CF8F3F335B26903A8F068725FCEF433D756396215BE571B274B1C93DD390CC` |
| `run-3-dark-hidden.png` | 46027 | 1440 × 1200 | `16A5EBD1DAD1328A8227084917949A1FCECF4C624A750AEA2B7440A106DCAA2C` |
