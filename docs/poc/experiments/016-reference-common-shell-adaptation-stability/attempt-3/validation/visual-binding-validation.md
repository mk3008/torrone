---
type: PoC validation contract candidate
title: Attempt 3 visual binding validation
status: candidate for human review
source: authored from Attempt 2 findings
---

# Visual binding validation

## Static gate

Run `../reference-owned/check-visual-binding-provenance.ps1` first. It confirms
that the candidate token values and SVG paths derive from the approved
Reference rather than an invented palette or icon set.

Run `check-visual-bindings.ps1 -TargetRoot <run-output>` after an Attempt 3
implementation is complete. It checks that the target carries the unchanged
token stylesheet, binding map, SVG assets, and evidence map; references the
token stylesheet and every asset from implementation source; and exposes the
selected theme-root hook. This detects palette substitutions, altered SVG
shapes, missing state assets, altered state/location mapping, and missing
binding integration before visual review.

Run `self-test-visual-bindings.ps1` to prove the checker passes a conforming
fixture and rejects a changed token, SVG path, and location declaration. The
test uses a temporary directory and does not edit any Reference or Attempt 2
artifact.

## Browser gate

After the static gate passes, inspect the rendered target at the required
states from the review contract. Compare the visible element against the
binding map, not against a subjective design-family judgement:

- Header, Drawer, control, workspace, selected-row, indicator, and focus
  colors resolve from the token stylesheet in both modes.
- Each Drawer and theme state shows its mapped fixed icon at its mapped Header
  location.
- Parent disclosure shows the mapped asset and direction at the trailing edge
  of the parent row for both expanded and collapsed states.
- Search icon appears at the leading edge of the search field.
- The selected row uses the mapped background and foreground and its indicator
  remains at the Drawer row's physical start.

This is intentionally not a full-page pixel comparison. DOM shape, text
metrics, content geometry, and non-bound visual details stay outside the exact
visual gate.

## Limits

Static evidence proves the fixed assets and declared mapping are present in a
target. Browser review remains necessary to confirm actual rendered placement,
state visibility, and cascade behavior. A failed browser check is an
`exact-binding-miss`, not an allowed visual variance.
