# Capture record

## Scope

This record fixes the twelve initial states shown by `comparison.html`: three independent runs, Light and Dark themes, and Drawer open and hidden states.

## Environment

- Browser: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Chrome version: `150.0.7871.187`
- Viewport: `1440 × 1200`
- Renderer: `--headless=new --disable-gpu`
- Fallback: not used
- Profile: a fresh capture-only profile under `C:\tmp\common-shell-human-feedback-v5-chrome-profile-recapture`

## Command and result

Each capture used the following argument shape, with the run, state, and output path substituted:

```text
C:\Program Files\Google\Chrome\Application\chrome.exe --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1200 --user-data-dir=C:\tmp\common-shell-human-feedback-v5-chrome-profile-recapture --screenshot=<output> file:///C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/012-common-shell-variability/attempt-33/runs/run-<n>/index.html?drawer=<open|hidden>&theme=<light|dark>
```

All 12 commands exited `0`. The first capture pass accidentally encoded the query separator and produced identical browser error pages. Those files were detected by raw-byte comparison, discarded as evidence, and overwritten by the successful commands recorded here. No generated HTML, CSS, JavaScript, or fixture was changed.

## Fixed PNGs

| PNG | bytes | dimensions | SHA-256 raw bytes |
| --- | ---: | --- | --- |
| run-1-light-open.png | 48,544 | 1440×1200 | `07E2450362C4C6CE3462F1AD8C91D05F9F3D37D84102C37B71FA16D5FF94D36F` |
| run-1-light-hidden.png | 24,186 | 1440×1200 | `B29359C87F9772683FF2F5F242C3FF5872AFC674E6F7EB874FFF5601C8675F69` |
| run-1-dark-open.png | 44,388 | 1440×1200 | `F981834CBD7211E5CD48A4FAF65F2717A337292ED6EF2382BC341172F190C551` |
| run-1-dark-hidden.png | 19,327 | 1440×1200 | `E0FCDF63C116DE0C8A901F51ECAF34286ABC4AE63EB8A85FD1D3DE79D6C18303` |
| run-2-light-open.png | 49,830 | 1440×1200 | `BD8D3ACF1A4E67E67831C00DCFE85A8248E1385147B7A0761A4EA6CF2E2303F7` |
| run-2-light-hidden.png | 24,725 | 1440×1200 | `E48BBDF6D2E680C8891DAB38C5DB2313DEE9269B636ADD33210BA6404B0BBFB3` |
| run-2-dark-open.png | 49,853 | 1440×1200 | `26E8C40702DD83B07FA89953BC3B714A80324E1F7EFB17CF6C66FFD95282AEA2` |
| run-2-dark-hidden.png | 24,865 | 1440×1200 | `81BEEEF1F730099E2A003521D3D0D133509FC3468551DC5860F139B1F4C315F2` |
| run-3-light-open.png | 63,995 | 1440×1200 | `E9DF0D1680FDD25BB971F66E71CDBFFAB698F1A0B87C610F320548A918D420AB` |
| run-3-light-hidden.png | 39,142 | 1440×1200 | `C813052E72B9002B639AFAA0F8758EF314BAB1AE1B8BC1D6650A4B4F0B0AEF9E` |
| run-3-dark-open.png | 64,853 | 1440×1200 | `23EB74673C23CA0CD60E014CBCCFBFD1F7E882D083A8D1BA4C4B3E73E83EC847` |
| run-3-dark-hidden.png | 39,859 | 1440×1200 | `C33C0B8A16298AB25F06F480C98470A5C6F0244928FC35B2B1976ACCF9C91EC7` |

