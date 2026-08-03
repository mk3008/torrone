---
type: PoC verification record
title: Attempt 2 verification record
status: passed with stated scope limits
source: reviewer execution
---

# Attempt 2 verification record

| Acceptance criterion | Verification method | Result | Repository evidence | Supplementary evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| Fixed Reference and Manifest inputs were unchanged | Run both Git-canonical preflight scripts after all outputs and reviews were added. | pass | `check-fixed-input.ps1` reports the approved `9cd1932` baseline and 52 files; `check-product-input.ps1` reports the product contract clean. | none | high |
| Three initial artifacts are preserved | Inspect each `runs/run-N/initial/` directory and compare it with its `final/` sibling. | pass | Initial and final directories are separate; [comparison page](comparison/index.html) exposes both. | none | high |
| Each final artifact has valid local JavaScript | `node --check` on every initial and final `app.js`. | pass | Six local `app.js` files passed. | none | high |
| No network or framework dependency was introduced | Source scan for external URLs/imports and source inspection. | pass | Each Run remains local `index.html`, `styles.css`, and `app.js`; comparison page is local-only. | none | medium |
| Initial Runs do not cite another Run or frozen Reference source | Source scan for Run paths and Reference/Manifest source-path strings in the three initial implementations. | pass | The scan returned zero matches. | none | medium |
| Final invariant and product-state behavior | Browser open/hidden Drawer, Light/Dark palette, filtering/no-match, disclosure/current retention, and DOM geometry inspection. | pass | Per-Run [reviews](runs/run-1/review.md) and [synthesis](comparison/attempt-2-comparison.md) identify exact observations, including separate scroll heights and retained scroll positions. | Playwright browser observation at 1280×720 CSS pixels. | high for tested states |
| Human reviewers can inspect and compare the outputs | Open local comparison page and follow links to every initial/final artifact and record. | pass | [comparison/index.html](comparison/index.html) rendered in browser and contains all nine links. | browser screenshot captured during verification; it is not committed because the page itself is the review surface. | high |
| Superior stability over Manifest-only is established | Compare Attempt 23 with matching metrics and conditions. | **UNCONFIRMED** | [Historical comparison](comparison/manifest-method-comparison.md) records the differing matrix and missing matched metric. | none | not applicable |
| Same model and prompt were used for all three Runs | Inspect a durable run-dispatch/execution record. | **UNCONFIRMED** | Initial worker reports prove separate artifacts and fixed-input checks, but no machine-readable dispatch transcript was preserved. | none | not applicable |

## Commands run

```powershell
& .\docs\poc\experiments\016-reference-common-shell-adaptation-stability\attempt-2\check-fixed-input.ps1
& .\docs\poc\experiments\016-reference-common-shell-adaptation-stability\attempt-2\check-product-input.ps1
node --check <each initial and final app.js>
git diff --check -- docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-2
```

The preflights and JavaScript syntax checks passed. Browser review was performed
against a local HTTP server solely because the browser automation tool does not
open `file:` URLs; the artifacts themselves remain direct-openable static
files. Production, assistive-technology, responsive, persistence, and real
navigation behavior are outside this PoC and remain unconfirmed.
