---
type: human approval record
title: Attempt 3 browser-native common-shell approval
status: approved; closed
approved_on: 2026-08-04
basis_commit: 0e2311d
---

# Attempt 3 human approval

## Decision

Attempt 3 is approved and closed for the browser-native shared-common-shell
scope. This is evidence that the three implementations could converge on the
approved Reference's declared exact subset. It is not evidence that every Run
was stable on its first implementation, nor that the contract is already
framework-independent.

## Human-confirmed checks

The human reviewer confirmed the following in the Run 2 final
`reference-alignment-icon-color` derivative:

- A non-current navigation item's hover treatment is acceptable in both light
  and dark themes and remains distinguishable from a selected item.
- The seven fixed SVGs retain their shape, color, direction, basic placement,
  and dark-theme visibility.
- `focus-visible`, selection, the active indicator, Drawer visibility, and
  parent-navigation expansion/collapse have no regression.

The approval evidence is the final review packet, the Run 2 independent
review, and the recorded HTTP-served captures. The approved Reference and
Attempt 3's frozen inputs remain the authority for the declared exact subset.

## Run accounting

| Run | Initial result | Implementation corrections | Final result |
| --- | --- | ---: | --- |
| Run 1 | pass | 0 | pass |
| Run 2 | exact-visual-binding misses found during review | 3 | pass |
| Run 3 | pass | 0 | pass |

Run 2's three implementation corrections were: the Header icon-only control
surface/border, the navigation hover and Search focus-ring alignment, and the
themed rendering of fixed `currentColor` SVGs. The local HTTP delivery and
capture-method changes were observation tooling only; they changed neither
the implementation nor frozen inputs and are not counted as implementation
corrections.

## Interpretation and follow-up boundary

Run 1 and Run 3 were initially conformant. Run 2 required review-driven
correction before it was conformant. Therefore Attempt 3 demonstrates
eventual convergence with exact visual bindings, not fully first-pass-stable
adaptation.

The approval does not change Attempt 1--3 inputs, historical artifacts, or
prior reviewer decisions. Follow-up work may propose a next Reference-contract
revision for themed SVG rendering and cross-application interaction
foundations, but that work is separate from this closed Attempt.

## Evidence

- [Final evaluation](final-evaluation.md)
- [Final human-review packet](human-review-final.md)
- [Run 2 icon-color review](runs/run-2/reference-alignment-icon-color/review.md)
- [Run 2 HTTP capture record](runs/run-2/reference-alignment-icon-color/http-capture-record.md)
