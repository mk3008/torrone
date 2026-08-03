---
type: attempt-3-run-correction-report
run: run-2
artifact: reference-alignment
status: ready_for_reverification
base_artifact: ../final
implementation_correction_count: 2
observation_harness_correction_count: 1
---

# Attempt 3 Run 2 — Reference-alignment correction

## Preservation boundary

This is a new derivative of the existing `final` artifact. The `initial` and
`final` artifacts, their captures, their review records, and all frozen inputs
remain unchanged. The derivative copies the already-approved Header icon-only
control correction from `final` and adds only the two corrections below.

## Corrections

| Topic | Reference behavior | Prior Run 2 behavior | Classification | Change |
| --- | --- | --- | --- | --- |
| Drawer-row hover | Uses the normal page background, visually distinct from the current-row selection background. | Used the selection background for hover and current rows. | `implementation-error` | `.navigation-row:hover` and `.parent-row:hover` now use `--reference-page-background`. |
| Focus-visible placement | Renders the focus ring outside the control border. | Used a negative outline offset, overlapping the search-field border. | `implementation-error` | The shared focus-visible rule now uses `outline-offset: 3px`. |

The correction is an adaptation to the current approved Reference, not a new
Attempt 3 Exact visual binding. It does not assert that `page-background` is a
universal semantic hover token, nor that this focus treatment is limited to
the common shell.

## Cross-cutting follow-up, out of scope

The two findings also identify unorganised application-wide interaction
concerns:

- Future Foundations work may define semantic hover-state tokens independently
  of the Reference's current `page-background` value.
- Future Foundations/accessibility work may define shared `:focus-visible`
  color, thickness, offset, visibility requirements, and exception rules.

Neither proposal changes the Attempt 3 fixed input, binding map, validation,
Reference, product input, or evaluation criteria. They are recorded here only
as follow-up candidates after Attempt 3 closes.

## Correction accounting

- Implementation correction 1: Header icon-only control surface and border in
  the existing `final` artifact.
- Implementation correction 2: this Reference-alignment correction for hover
  distinction and external focus-ring placement.
- Observation-harness correction 1: prior URL construction repair. It remains
  separate because it did not change any Run 2 implementation source.

## Reverification required

Before this derivative can be used in the Attempt 3 final evaluation, rerun
all three frozen-input preflights, static visual-binding validation, JavaScript
syntax checking, external-reference scanning, and the six-state browser
capture/review gate. The reviewer must confirm that the two changes introduce
no regression in structural invariants, theme behavior, or fixed assets.
