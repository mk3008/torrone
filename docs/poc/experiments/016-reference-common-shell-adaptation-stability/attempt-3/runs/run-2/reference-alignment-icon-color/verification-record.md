---
type: attempt-3-run-verification-record
run: run-2
artifact: reference-alignment-icon-color
status: complete
date: 2026-08-04
---

# Run 2 icon-color verification

| Acceptance criterion | Method | Result | Evidence |
| --- | --- | --- |
| Reference input unchanged | `attempt-2/check-fixed-input.ps1` | pass | Baseline `9cd19321e53f6279e956df8a6d1fe562c3360544`; 52 files |
| Product input unchanged | `attempt-2/check-product-input.ps1` | pass | One fixed product file |
| Attempt 3 input unchanged | `attempt-3/freeze/check-attempt-3-input.ps1` | pass | Baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff`; 24 files |
| Fixed tokens, map, and seven SVGs unchanged and integrated | `validation/check-visual-bindings.ps1` | pass | Canonical binding assets and implementation references |
| No external dependency or external SVG substitution | static URL/CDN/import scan | pass | No matches in implementation sources |
| JavaScript validity | `node --check app.js` | pass | `app.js` |
| Themed fixed-icon rendering | HTTP browser inspection and nine 1440 × 900 captures | pass | `http-capture-record.md`; dark Header/disclosure use `#f4f7fa`, search uses `#bac6d2` |
| Focus-visible and state regressions | Browser capture, computed focus style, source comparison | pass | Outer focus ring in both themes; Drawer, disclosure, selection, indicator, and hover CSS unchanged |
| Accessible control names | Source and browser semantic inspection | pass | Header buttons retain `aria-label` plus screen-reader-only text; icon spans are `aria-hidden` |

Independent review passed. The validation and adaptation-contract limitations
are documented in `correction-report.md`; neither is changed in this Attempt.
