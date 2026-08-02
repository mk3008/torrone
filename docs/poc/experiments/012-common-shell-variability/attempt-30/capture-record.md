# Attempt 30 capture record

- Browser: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Browser version: `150.0.7871.187`
- Viewport: `1440 × 1200`
- Capture mode: `--headless=new --disable-gpu`
- Fallback: not used
- Result: 12/12 successful, exit code `0`

Each state was captured by substituting the Run number, theme, and Drawer
state in the following command. The absolute `file:` URI was built from the
existing local HTML path before the query string was appended.

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' `
  '--headless=new' '--disable-gpu' `
  '--user-data-dir=C:\tmp\common-shell-human-feedback-v2-chrome-profile-3' `
  '--window-size=1440,1200' `
  '--screenshot=<attempt-30>\evidence-captures\run-<n>-<theme>-<drawer>.png' `
  'file:///.../runs/run-<n>/index.html?drawer=<open|hidden>&theme=<light|dark>'
```

The first capture command constructed `file:///=open&theme=light` because the
PowerShell interpolation parsed `$html?drawer` as one variable. Those error
page images were overwritten before this record was made. The command above
uses `${uri}?drawer=...&theme=...`; all evidence listed below is from that
corrected command.

| PNG | Bytes | Dimensions | Raw-byte SHA-256 |
| --- | ---: | --- | --- |
| `run-1-light-open.png` | 55856 | 1440 × 1200 | `1A21628BB969557EC20CC24C1255CEC473707CEF81934B73E6F0EBA1B46D7316` |
| `run-1-light-hidden.png` | 29857 | 1440 × 1200 | `6C181C892B263D740F4A23E747A10324A139D1A67725C688EDF8887D9252C6AC` |
| `run-1-dark-open.png` | 55785 | 1440 × 1200 | `77C8B7990F078220D707DCAF2A6DDE154E133D98D627CBAF1CD710BE795FC792` |
| `run-1-dark-hidden.png` | 29989 | 1440 × 1200 | `FF80155111B8509998DAF898BA3227FF5114943B4273942FE1FCD68C0AF092AC` |
| `run-2-light-open.png` | 67970 | 1440 × 1200 | `B41EABA6C4CD3C4E7161B6811FB51E77BF20332DB5F0623CEEE3E62D8F889DC5` |
| `run-2-light-hidden.png` | 43147 | 1440 × 1200 | `7075CF199A2BEC6CD390348B749DE1485F88A2A7D563DBEF157DFA9B8C28276C` |
| `run-2-dark-open.png` | 68906 | 1440 × 1200 | `6A67BB0D59BE720E7C190904F767C3CCE937AC5219CE439D70A1E6AF0C68CBC3` |
| `run-2-dark-hidden.png` | 44324 | 1440 × 1200 | `25F475FEDC0C868EAB5B2DAA79E47D5E1534030340E99F2228C5B696579BCB1C` |
| `run-3-light-open.png` | 62081 | 1440 × 1200 | `095F9B4E6315D518BB4E778059F619BACAC0B17281065459D916B23D996BAC04` |
| `run-3-light-hidden.png` | 36020 | 1440 × 1200 | `4149F3ABC605699E5F1A42D3A93640F747EF924082DDACF0DA4774F2457300CA` |
| `run-3-dark-open.png` | 62208 | 1440 × 1200 | `339FAD151F70431B53AD34FC32790F0C59E035CC77EF8AC38BE8BBD0D5EB80EB` |
| `run-3-dark-hidden.png` | 36497 | 1440 × 1200 | `9B790103C41031152F7C671E8BA6CA38BA639D177EF2FDA3549D5C5BA3359D96` |
