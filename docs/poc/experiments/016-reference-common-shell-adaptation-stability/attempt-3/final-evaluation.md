---
type: PoC final evaluation
title: Attempt 3 exact visual binding stability
status: complete; human review pending
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
