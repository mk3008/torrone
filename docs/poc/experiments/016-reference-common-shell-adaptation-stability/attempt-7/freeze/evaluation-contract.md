---
type: PoC evaluation contract
title: Attempt 7 full-hit-area hover evidence
status: frozen evaluation candidate; no Run evaluated
---

# Attempt 7 hover evaluation contract

## Purpose and evidence boundary

This contract adds one focused, comparable hover observation to the existing
Attempt 6 React regression matrix. It does not replace an existing capture,
preflight, build, structural, interaction, exact-binding, SVG, or human-review
requirement. It evaluates the reviewed Manifest outcome without prescribing a
hover color, opacity, token, selector, DOM shape, transition, or implementation
technique.

## Required comparison states for every Run

Every Run must capture the following four PNGs serially at `1440 × 900`. Reset
to the fixed fixture state before each theme pair: Drawer open, `Workspace`
expanded, `Overview` current/selected, `Activity` enabled and non-current, no
navigation search text, and no activated destination change.

| State | Required action and visible comparison | Required filename |
| --- | --- | --- |
| Light baseline | Use the fixed Light state and keep the pointer outside navigation-row hit areas. Show `Overview` current/selected and `Activity` idle in the same Drawer. | `hover-light-before.png` |
| Light hover | Without clicking, move the pointer into a visually empty inline-end portion of the complete `Activity` row hit area, away from its text. Keep `Overview` current/selected. | `hover-light-activity.png` |
| Dark baseline | Change only the supported theme to Dark, keep the same navigation state, and keep the pointer outside navigation-row hit areas. | `hover-dark-before.png` |
| Dark hover | Without clicking, move the pointer to the same semantic part of the complete `Activity` row hit area. Keep `Overview` current/selected. | `hover-dark-activity.png` |

The target is `Activity` because the fixed product fixture makes it an enabled,
non-current top-level leaf while `Overview` supplies a simultaneously visible
current/selected comparison. Do not target the already-current row, a disabled
row, only its label text, or the `Workspace` disclosure affordance.
In this Drawer contract, the supplied current destination receives the
selected/current-item treatment; this comparison does not invent a second
product-owned selection fact.

## Required interaction observation

For each theme pair, record a short Run-owned observation alongside the PNGs:

- the actual page URL and the observed `1440 × 900` viewport;
- the before and hover filenames and their hashes;
- that the pointer action was performed on the complete `Activity` row hit
  target at a point away from its label, without clicking;
- that `Activity` was enabled and non-current before the action;
- that `Overview` remained current/selected and the Drawer, hierarchy,
  expansion, search, and destination state did not change; and
- browser console error and warning counts for the focused observation.

This is focused evidence metadata, not a new validator or a claim that a
screenshot proves event semantics. If the browser action or state cannot be
observed, classify it as an `observation-gap`; do not infer success from source
or repair the frozen input.

## Evaluation matrix

| Criterion | Evidence | Decision owner | Pass condition |
| --- | --- | --- | --- |
| Same comparison state | Four named PNGs and the Run observation record | Mechanical inspection | All Runs use the fixed target, current item, themes, viewport, and before/hover sequence. |
| Action actually performed | Browser observation record | Mechanical inspection | Pointer movement targets the enabled, non-current `Activity` row away from its label; no click or state transition occurs. |
| Full-hit-area surface response | Before/hover pairs in both themes | Human visual judgment | The row surface changes across its full hit area; a text-only decoration or label-only effect fails. |
| Distinct from current/selected | Each hover PNG shows `Activity` hovered while `Overview` remains current/selected | Human visual judgment | Hover and current/selected remain separately recognizable in both themes. |
| No state or hierarchy regression | Observation record plus the existing regression matrix | Mechanical inspection, then artifact review | Current destination, expansion, order, indentation, search, and geometry do not change merely because of hover. |
| Implementation freedom preserved | Run source and review findings | Artifact review | No exact hover color/token or copied Reference implementation is promoted into the frozen contract. |

## Human-only judgment

Whether the surface response is perceptible across the full row and visually
distinct from current/selected treatment is a human visual judgment. Image
presence, dimensions, file hashes, state metadata, and the recorded browser
action are mechanically checkable evidence, but they cannot decide visual
quality by themselves. Passing mechanical evidence never accepts a Run.

## Deviation routing

- Missing or inconsistent capture/action metadata is an `observation-gap`.
- A rendered label-only hover, no full-row surface change, or a hover treatment
  indistinguishable from current/selected is an implementation
  `non-conformance` against the frozen Manifest guidance.
- A claimed need for a product label, route, permission, state, visual token,
  exact color, Reference edit, or new generic validator must stop the Run and
  return to the applicable owner; it is not repaired inside generated output.
- No generated Run is promoted until the existing mechanical checks, focused
  artifact review, and final human comparison gate are complete.
