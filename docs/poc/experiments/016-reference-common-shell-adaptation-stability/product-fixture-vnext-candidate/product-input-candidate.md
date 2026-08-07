---
type: product-owned application input candidate
status: candidate; not canonical or frozen
---

# Product input candidate — neutral operations workspace hierarchy

## Product facts

The canonical candidate data is [fixture.json](fixture.json).

- Application name: `Operations workspace`.
- Navigation order: top-level `Overview`; parent `Workspace`; its child items
  `Section 01`, `Section 02`, and `Section 03`; then top-level `Activity`.
- Initial state: `Overview` is current and `Workspace` is expanded.
- The supplied parent may collapse/re-expand without changing the current
  destination.
- Selecting an item changes current-location treatment only; it does not
  navigate.
- Main fixture: `Neutral workspace content` with neutral numbered items.
- The existing search label, placeholder, Drawer states, and theme states are
  retained as product facts for preview observation.

## Ownership boundary

This candidate owns only labels, hierarchy, order, and supplied states. It does
not define layout, nesting presentation, indentation, dimensions, color,
icons, controls, DOM structure, or interaction styling. Those remain owned by
the approved Reference and its contracts.

## Candidate-only condition

The data is intentionally smaller than the historical long fixture so that a
human can see the role ordering in one Drawer without scrolling. This is not a
new product requirement and is not a basis for changing the historical product
input.
