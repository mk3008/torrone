---
type: attempt-3-run-verification-record
run: run-2
artifact: reference-alignment
status: partial; browser recapture pending
date: 2026-08-04
---

# Run 2 Reference-alignment verification

## Acceptance evidence

| Acceptance criterion | Method | Result | Repository evidence | Confidence |
| --- | --- | --- | --- | --- |
| Reference-owned input remains unchanged | `attempt-2/check-fixed-input.ps1` | pass | Approved baseline `9cd19321e53f6279e956df8a6d1fe562c3360544`; 52 files | high |
| Product-owned input remains unchanged | `attempt-2/check-product-input.ps1` | pass | One fixed product file | high |
| Attempt 3 input remains unchanged | `attempt-3/freeze/check-attempt-3-input.ps1` | pass | Approved baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff`; 24 files | high |
| Fixed tokens, SVGs, state map, and theme hook remain integrated | `validation/check-visual-bindings.ps1 -TargetRoot reference-alignment` | pass | `reference-visual-bindings/` unchanged and implementation references verified | high |
| Application JavaScript remains syntactically valid | `node --check app.js` | pass | `app.js` | high |
| No malformed whitespace change | `git diff --check -- runs/run-2/reference-alignment` | pass | Changed artifact path | high |
| No external visual dependency was introduced | static `rg` scan for URLs, CDN, and `@import` | pass; no matches | `index.html`, `styles.css`, `app.js` | high |
| Hover treatment matches the approved Reference | CSS diff and source inspection | pass in source | Reference `.navigation-row:hover` uses normal page background; derivative matches it | medium pending rendered capture |
| Focus ring is outside the control border | CSS diff and source inspection | pass in source | Reference and derivative both use `outline-offset: 3px` | medium pending rendered capture |
| Six required states are visually recaptured | Browser capture at 1440 × 900 | unconfirmed | Browser automation rejected navigation to the new local `file:` artifact before capture | unconfirmed |

## Capture limitation

The browser automation policy rejected navigation to the newly created local
`file:` artifact. No alternate browser, server, or indirect navigation method
was used. This preserves the observation boundary but means the browser gate
cannot yet establish rendered conformance for the six required states or the
hover/focus interaction evidence.

The required manual review URLs are listed in `capture-plan.md`. Once opened
by a permitted browser surface, the screenshots must replace the copied PNGs
in this derivative only; neither `initial` nor `final` may be changed.
