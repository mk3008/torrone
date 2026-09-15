---
type: attempt-3-run-review
run: run-2
artifact: initial
review_scope: approved Reference + frozen input + run-2 initial artifact + five screenshots
review_date: 2026-08-03
review_result: correction-needed
---

# Summary

Status: `partial`

Run 2's initial artifact clears the structural gate and preserves meaningful
implementation freedom, but it does not fully clear the exact visual-binding
gate. The rendered Header icon controls use transparent, borderless hit areas
instead of the approved `control` surface treatment. A correction is needed
before this Run can be treated as conforming.

# Intended Outcome Review

The intended outcome was an independent implementation that preserved the
approved common-shell structure while reusing the fixed visual bindings exactly
where Attempt 3 narrowed them. That outcome is materially but not fully
achieved:

- Structural invariants are present in the initial artifact and supported by
  the supplied screenshots.
- The fixed token stylesheet, binding map, and SVG assets are present and the
  required states are wired correctly.
- The browser-visible exact binding is still incomplete because the Header
  controls do not render with the approved `control` border/background
  treatment.

# Structural / Exact / Freedom Matrix

| Gate | State / topic | Expected from approved Reference + frozen input | Evidence | Result | Classification |
| --- | --- | --- | --- | --- | --- |
| Structural | Light open / dark open / drawer hidden shell states | Header remains present; hidden Drawer removes the reserved navigation track while workspace remains usable. | `initial/light-drawer-open.png`, `initial/dark-drawer-open.png`, `initial/drawer-hidden.png`, `initial/app.js` | pass | none |
| Structural | Parent collapse state | Parent disclosure remains separate from Drawer visibility and supports collapsed state without changing the stored destination. | `initial/parent-collapsed.png`, `initial/app.js` | pass with evidence limit | none |
| Structural | Current-row treatment | Current destination is rendered as one full Drawer row with a physical-start indicator. | `initial/light-drawer-open.png`, `initial/selection-section-01.png`, `initial/styles.css` | pass | none |
| Exact | Fixed tokens, state pairing, named icon locations, selected-row indicator | The approved `reference-visual-bindings/` assets are present, referenced, and rendered in the prescribed states and locations. | `initial/visual-binding-evidence.json`, `initial/light-drawer-open.png`, `initial/dark-drawer-open.png`, `initial/drawer-hidden.png`, `initial/parent-collapsed.png`, `initial/selection-section-01.png`; static gate `validation/check-visual-bindings.ps1` passed | pass | none |
| Exact | Header icon-only control surface | Header controls consume the approved `control` surface, including visible `border_interactive` boundary, in both themes. | Approved binding map `reference-owned/visual-bindings/binding-map.json:10`; approved Reference `015-reference-first-common-shell/styles.css:61-70`; Run CSS `initial/styles.css:36-42`; rendered controls in `initial/light-drawer-open.png`, `initial/dark-drawer-open.png`, `initial/drawer-hidden.png` | fail | `exact-binding-miss` |
| Freedom | Independent implementation boundary | DOM tree, CSS organization, state model, and file structure may differ if both prior gates hold. | `initial/index.html`, `initial/styles.css`, `initial/app.js`, approved adaptation guidance | pass | `allowed-implementation-freedom` |

# Findings

1. `exact-binding-miss` — Header icon controls are not rendered with the approved `control` surface.
   The approved binding map fixes `control.background`, `control.foreground`,
   and `control.border` at the exact-binding layer
   (`reference-owned/visual-bindings/binding-map.json:10`), and the approved
   Reference renders those controls with a visible interactive border and
   surface background (`015-reference-first-common-shell/styles.css:61-70`).
   Run 2 instead renders `.header-control` with `border: 0` and
   `background: transparent` (`initial/styles.css:36-42`), which is also
   visible in the light, dark, and hidden-Drawer screenshots. This means the
   asset/state pairing is correct, but the browser-visible exact control
   binding is not.

Correction needed: `yes`

# Evidence Gaps

- The screenshots are sufficient for the visible Header/Drawer/theme/search/
  selection bindings reviewed here, but they cannot prove keyboard traversal or
  assistive-technology behavior.
- Independent scroll behavior and destination retention after collapse then
  re-expansion are supported by source inspection in `initial/app.js`, not by a
  focused interaction capture sequence.
- Static validation proves unchanged token values, SVG paths, and declared
  asset wiring, but the browser gate remains necessary for rendered control
  treatment; this Run shows why that distinction matters.

# Test Coverage Concerns

- The current static gate did not catch the missing visible Header control
  border/background even though the browser gate explicitly requires rendered
  `control` colors. Future evidence collection should keep the browser review
  mandatory for this case.
- No additional automated check in this review scope proves focus-ring
  visibility on actual interaction states.

# Overall Risk

Overall risk: `medium`

Most of the Run aligns with the approved input, so the correction surface looks
small and local. However, the remaining miss sits inside the intentionally
narrow exact visual subset, so it blocks acceptance until corrected and
re-reviewed.
