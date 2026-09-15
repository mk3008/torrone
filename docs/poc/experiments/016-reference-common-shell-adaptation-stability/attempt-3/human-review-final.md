---
type: human review packet
title: Attempt 3 exact visual binding outcome
status: human interaction review recorded
---

# Human review: Attempt 3

Open [the comparison page](comparison/index.html) at a 1440 × 900 viewport.
For each state, compare the approved Reference against Run 1 initial, Run 2
Reference-alignment icon-color, and Run 3 initial.

Confirm:

1. Header, Drawer, selected row, and active indicator use the exact approved
   token treatment in light and dark themes.
2. All seven fixed SVGs have the same shape, direction, basic size, and named
   location; no substitute or distorted icon appears.
3. Drawer hidden, parent collapse, and navigation selection retain their
   structural state without visual drift.
4. Run 2's Header controls retain the visible surface and interactive border
   in both themes, with no new icon, color, or placement regression.

The decision requested is whether the three outputs are identical for the
declared exact subset—not merely in the same design family. See
[final evaluation](final-evaluation.md), [Attempt 2 comparison](comparison/attempt-2-vs-attempt-3.md), and Run 2's [final re-review](runs/run-2/final-review.md).

## Reference-alignment addendum — 2026-08-04

The primary Run 2 comparison target is now the separate
[`reference-alignment icon-color derivative`](runs/run-2/reference-alignment-icon-color/index.html),
not the historical `final` artifact. The two additional outcomes are:

1. A hovered non-current navigation row remains visually distinct from the
   selected row.
2. The focused Search navigation field has a visible outer focus ring that
   does not overlap its border.

HTTP-served evidence covers the required shell states and Search focus-visible
in both themes. See the
[`capture record`](runs/run-2/reference-alignment-icon-color/http-capture-record.md),
the [independent review](runs/run-2/reference-alignment-icon-color/review.md),
and the focus section of the [comparison page](comparison/index.html).

Human review confirmed the hover interaction. Independent review confirmed
that fixed icons remain visible in dark mode and that the correction introduced
no state or accessibility regression. The remaining follow-ups are limited to
future validation and adaptation-contract strengthening; they are outside
Attempt 3.
