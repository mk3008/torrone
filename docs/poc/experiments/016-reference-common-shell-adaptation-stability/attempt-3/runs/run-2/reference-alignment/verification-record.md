---
type: attempt-3-run-verification-record
run: run-2
artifact: reference-alignment
status: partial; hover pseudo-state evidence unavailable
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
| Required light/dark, Drawer, parent-state, and selection states are visually recaptured | Temporary HTTP browser capture at 1440 × 900 | pass | Seven new state PNGs; see `http-capture-record.md` | high |
| Focus-visible is visible outside the search-field border in both themes | Keyboard focus plus browser capture and computed-style inspection | pass | `search-focus-visible.png`, `search-focus-visible-dark.png`; ring and offset inspected before capture | high |
| Actual CSS hover state is visually captured | Pointer hover plus browser capture | unconfirmed | The browser pointer-move operation did not sustain `:hover`; its trial PNG was discarded | unconfirmed |

## Capture method and remaining limitation

The new local `file:` URL was rejected by browser automation. Following the
observation-only constraint, the artifact directory was instead served by a
temporary `127.0.0.1` Node standard-library HTTP server. The delivery details,
URLs, screenshots, server shutdown, and non-mutation boundary are recorded in
`http-capture-record.md`.

All required rendered states and both focus-visible states now have valid
evidence. Only an actual CSS hover pseudo-state capture remains unavailable:
the browser automation surface did not sustain hover after pointer movement.
This is an observation gap, not an implementation failure. Neither `initial`
nor `final` was changed.
