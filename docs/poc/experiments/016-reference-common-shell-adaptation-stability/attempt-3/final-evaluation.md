---
type: PoC final evaluation
title: Attempt 3 exact visual binding stability
status: complete; human review recorded
---

# Attempt 3 final evaluation

## Run outcomes

| Run | Initial decision | Implementation corrections | Final decision |
| --- | --- | ---: | --- |
| Run 1 | pass | 0 | pass |
| Run 2 | exact-binding miss: Header control surface/border | 1 | pass after independent re-review |
| Run 3 | pass | 0 | pass |

All three initial artifacts passed the structural matrix (7/7 invariants per
Run: 21/21, 100%). Exact visual bindings initially passed in 2/3 Runs (all
binding rows in Runs 1 and 3; Run 2 missed its Header control surface). After
one Run 2 implementation correction, all three passed their exact-binding
matrix (3/3 Runs, 100%).

## Correction accounting

Run 2 has **one implementation correction**: restore the fixed token-backed
surface and interactive border on Header icon-only controls. No other output or
fixed input was changed.

The URL-construction failure during capture is **one observation-harness
correction**, not an implementation correction. It generated browser error
PNGs before the URL was changed to explicit, correctly delimited navigation.
It changed neither frozen input nor Run 2 code, and regenerated screenshots
were independently reviewed.

## Attempt 2 comparison

Attempt 2 permitted palette and icon substitutions, icon geometry variance,
and variable icon direction/location under a design-family threshold. Attempt
3's copied token/SVG/map assets and visual validator eliminated those observed
classes in all three final outputs. The added reviewer gate found the one
remaining declared-surface miss in Run 2; this was corrected once rather than
being accepted as family variance. The active indicator and named icon
locations are present in the final evidence.

## Limits and recommendation

The comparison page is a human review aid, not a pixel-equality test. Raster
Reference captures created before the corrected navigation method include
error-page evidence; the approved Reference source, binding map, contract, and
static provenance remain the authority. Human review must compare the rendered
Run captures against that authority and confirm visual equality of the exact
subset.

**Recommendation: hold at the human gate.** The implementation-facing success
conditions are met: all final Runs meet structural and exact gates, at least
two needed no correction, no shared exact-binding misunderstanding occurred,
and Attempt 2's visual differences were not repeated. The full Reference-to-
Run raster comparison remains a human confirmation because some Reference
capture files are observation-error pages. Do not proceed to another Pattern
or treat this as framework-independence evidence.

## Reference-alignment addendum — 2026-08-04

Human observation identified two additional Run 2 deviations in the existing
`final` artifact: its menu hover used the selected-row background, and its
focus ring overlapped the input border. They are corrected only in the new
`runs/run-2/reference-alignment/` derivative; earlier artifacts and records
remain historical evidence.

The derivative passes all three frozen-input preflights, static visual-binding
validation, JavaScript syntax checking, and independent static review. The
approved Reference behavior is restored in source: hover uses the normal page
background while current-row selection retains the selection background, and
the focus ring uses the external `3px` offset. This is a current-Reference
adaptation only—not a new Exact visual binding or validation requirement.

Its rendered six-state and hover/focus evidence is still `unconfirmed`:
browser automation rejected navigation to the new local `file:` artifact and
no alternate browser path was used. Therefore the prior overall completion
claim must not be used for this latest Run 2 derivative. Attempt 3 is
`partial; awaiting the browser evidence and final visual re-review`.

## HTTP observation addendum — 2026-08-04

The local `file:` restriction was addressed as observation tooling only. A
temporary Node standard-library server bound to `127.0.0.1:50096` served only
the Run 2 Reference-alignment directory, then was stopped and removed. The
resulting state and focus evidence is recorded in
`runs/run-2/reference-alignment/http-capture-record.md`.

Independent review found no visual nonconformance in the new light/dark,
Drawer visible/hidden, parent expanded/collapsed, selection, or focus-visible
captures. The focus ring is visible outside the field border in both themes;
the prior Header control correction remains intact. The browser automation
pointer API did not sustain a CSS `:hover` state, so no genuine hover image is
available. Source inspection confirms the Reference-equivalent hover/current
distinction, but the final visual decision remains `partial` until a human
confirms that interaction. This is an observation gap—not a Run 2 correction
or a change to the Attempt 3 input contract.

## Icon-color final addendum — 2026-08-04

Human review confirmed the actual hover interaction. A further dark-theme
review then found that Run 2's externally loaded `currentColor` SVGs rendered
black. The new `runs/run-2/reference-alignment-icon-color/` derivative fixes
that Run 2 implementation error by using the unchanged canonical SVGs as CSS
masks with the existing token-derived foreground.

Independent review of its nine new HTTP-served captures passed. Header,
Drawer, search, and disclosure icons are visible in light and dark themes;
Drawer visibility, parent disclosure, selection, active indicator, focus,
hover, and accessible control names have no regression. All three frozen-input
preflights, visual-binding validation, JavaScript syntax, and dependency scan
passed. Run 2 now has three implementation corrections; the temporary HTTP
delivery remains observation tooling and does not affect that count.

Attempt 3 is `complete for this browser-native common-shell scope`. It shows
that Exact visual bindings suppress the Attempt 2 palette/icon differences
when their integration is correctly implemented. Do not extend to another
Pattern or framework. The only follow-up is outside this Attempt: strengthen
future validation and adaptation guidance for themed `currentColor` SVG
integration.
