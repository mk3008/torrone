# Browser and capture record

| Property | Observed value |
| --- | --- |
| Run | Attempt 8 Run 3, initial untouched generation |
| Initial URL | `http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview` |
| Server | Canonical `npm run dev`; Vite `5.4.14`; `127.0.0.1:4175`; strict port |
| Viewport | `1440 x 900` CSS pixels |
| Observer | `@playwright/cli@0.1.18` through temporary `npx` |
| Browser | Google Chrome `151.0.7922.108` from `C:\Program Files\Google\Chrome\Application\chrome.exe` |
| Session | `attempt8-run-3-interaction` |
| Session policy | One fresh session; no reload, navigation, or state reset after the initial open |
| Implementation tree | SHA-256 `dcf527155aa23f20e87e3df17b109d751358d172a40296c24b91aceaa1b67169`; 22 files |
| Console | 1 error, 0 warnings |
| Console error | `favicon.ico` returned HTTP 404 at the fixed origin |
| Console informational entry | React development-mode DevTools suggestion |

The first sandboxed `npx` open attempt exited `1` before creating a browser
because npm could not create its user-cache temporary directory (`EPERM`). The
identical frozen open command was rerun through the approved execution path and
exited `0`. No implementation byte changed. This is an observation-tooling
fallback, not a Run regeneration or capture retry.

The console error is retained as part of the untouched Run result. It did not
interrupt the ten-step interaction or prevent any required screenshot, but it
is not reclassified as a passing zero-error console result.

## PNG record

| File | Dimensions | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `01-initial-expanded.png` | `1440 x 900` | 36,904 | `ab6f30e20cf46a0ffe4ec2e409de8eac69264c85ccf484e7b9e57191cf1374f0` |
| `02-parent-collapsed-before.png` | `1440 x 900` | 33,474 | `3f1e3669037688b208141588cbf7aae96210b5bf0165efcd3285582f13c9e152` |
| `03-drawer-hidden.png` | `1440 x 900` | 26,209 | `95c5a93b4fedf3275f8e667dd6568265d0f797639ab40453413d43c125efcfbd` |
| `04-drawer-visible-collapsed.png` | `1440 x 900` | 33,674 | `273d2f84787800c314754b0d0d0152ba74833d99ed199ea92d403f106bfe8502` |
| `05-parent-expanded.png` | `1440 x 900` | 36,960 | `045da8ca6500a094880e98bdc32e2abff04a88d776a6746b8667323beece554f` |
| `06-parent-collapsed-after.png` | `1440 x 900` | 33,474 | `3f1e3669037688b208141588cbf7aae96210b5bf0165efcd3285582f13c9e152` |

All six files are the direct `page.screenshot` outputs from the serial session.
They were not resized, annotated, recompressed, or selectively replaced.
