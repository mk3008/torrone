# Attempt 5 — React adaptation evaluation

## Goal

Determine whether the frozen Reference-first contract can be independently
adapted to React while retaining structural invariants, Exact visual bindings,
the SVG rendering contract, and the product fixture without constraining React
component structure.

## Now / Next

**Now:** the three isolated React Runs have reached mechanical and independent
review convergence. The final human gate is limited to actual hover rendering
in each Run; it was not reliably retained by the available automation.

**Next:** request that narrow hover check from a human reviewer. Do not modify
the fixed inputs, vNext contract, or any Run unless that observation identifies
a concrete implementation defect.

## Open questions

- Does an unselected navigation item have the intended hover treatment in
  light and dark themes for all three final artifacts?
- No cross-framework claim follows from this React-only experiment.

## Actions taken

- Created three isolated React implementations from the same frozen inputs and
  dependency graph.
- Re-ran all chained preflights, TypeScript checks, production builds, static
  visual-binding checks, and SVG rendering-contract checks for the reviewed
  artifacts.
- Performed independent Run reviews without sharing other Run output with the
  reviewer.
- Repaired Run 1's independently-scrollable-region omission and Run 3's
  hidden-Drawer SVG state mapping. Run 3's earlier port conflict was recovered
  as an observation-only action and is not counted as an implementation repair.

## Code changes

| Run | Initial verdict | React implementation repairs | Observation-tool repairs | Final verdict before human hover gate |
| --- | --- | ---: | ---: | --- |
| Run 1 | not ready: Drawer/workspace scrolling was unbounded | 1 | 0 | accepted by correction reviewer |
| Run 2 | ready for parent review | 0 | 0 | accepted by independent reviewer |
| Run 3 | runtime review initially blocked; later found hidden-Drawer SVG mismatch | 1 | 1 | accepted by correction re-review |

The Run 3 observation recovery did not change source or frozen input. Its
subsequent SVG state correction is one React implementation repair.

## Verification methods

- Portable preflights for Reference, product input, Attempt 3 visual bindings,
  Attempt 4 vNext inputs, and the React harness.
- `npm run typecheck` and `npm run build` in the derived Run artifacts.
- Static visual-binding and SVG rendering-contract validators.
- Fixed-origin browser review at `127.0.0.1:4175`, `1440 × 900`, including
  theme, Drawer, disclosure, selection, focus-visible, and scroll checks where
  attributable to the reviewed Run.
- Independent-review reports listed below.

## Repository evidence

- [Run 1 initial worker report](runs/run-1/initial/worker-report.md) and
  [correction report](runs/run-1/correction-report-attempt-2.md)
- [Run 1 initial review](reviews/run-1/initial-review.md) and
  [correction review](reviews/run-1/correction-review-attempt-2.md)
- [Run 2 worker report](runs/run-2/initial/worker-report.md) and
  [independent review](reviews/run-2/initial-review.md)
- [Run 3 initial worker report](runs/run-3/initial/worker-report.md),
  [observation recovery](runs/run-3/observation-recovery-report.md), and
  [implementation correction](runs/run-3/correction-report-attempt-3.md)
- [Run 3 final re-review](reviews/run-3/correction-review-attempt-4.md)
- [State comparison material](comparison.md)

## Supplementary evidence

- The Run 1/2 and Reference retained images are linked from
  [comparison material](comparison.md).
- Run 3's final browser observations are durable JSON and review records, but
  its reviewer did not retain new PNG files. This is an evidence-format limit,
  not a substitute for a screenshot comparison.

## Review triage

| Finding | Classification | Resolution |
| --- | --- | --- |
| Run 1 auto-height shell made Drawer/workspace scrolling non-independent. | React implementation omission | Corrected once; independent reviewer accepted the scroll evidence. |
| Fixed port was occupied during Run 3 observation. | Harness / observation-tool issue | Recovered without changing source; excluded from implementation-repair count. |
| Run 3 hidden Drawer retained `drawer-hide.svg`. | SVG rendering implementation error | Corrected once; independent re-review observed canonical `drawer-show.svg`. |
| Hover could not be held by browser automation. | Human-review gate / observation limit | Remains open; do not infer pass or failure. |

No shared adaptation-instruction, vNext-contract, product-input, or frozen
asset defect was established by the three reviews.

## Attainment status

**partial** — all final structural checks are accepted (`15 / 15` across the
five structural criteria per Run), and all final static Exact-binding checks
are accepted (`21 / 21` across seven binding groups per Run). Browser evidence
directly confirms the complete exact set for Runs 2 and 3; Run 1's corrected
captures and correction review confirm the repaired structure and unchanged
exact authorities, while its target-attributable focus/hover observation was
not available. Hover is an explicit human gate for every Run.

For initial results, Run 2 was accepted without a React repair. Run 1 needed
one repair; Run 3 needed one repair after the observation path was restored.
Thus all three meet the "initial or one repair" threshold, but the experiment
does **not** demonstrate that all initial React generations were already
stable.

## Outcome

The frozen contract can drive three independently structured React shells to
the same accepted structural and fixed-asset outcome without sharing a common
React component implementation. The evidence is sufficient to conduct the
narrow human hover review; it is not yet sufficient to make a final
human-approved React success claim.

## Why it matters

The two detected implementation defects were observable against fixed
authorities and converged without altering those authorities. This supports
using the contract as a controlled input for the next verification decision,
while keeping the remaining interaction observation explicit rather than
silently treating static checks as visual proof.
