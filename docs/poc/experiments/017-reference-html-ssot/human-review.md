---
type: PoC human review decision
title: Reference HTML SSOT bounded experiment
status: accepted
source: human decision required
---

# Decision outcome

The current Reference was accepted as a natural and maintainable business-
application example for the bounded navigation, search, result-state, and grid
decisions it demonstrates.

The mechanical gate and bounded human review are complete. This decision does
not replace the Manifest or promote the experimental notation to a standard.

# Review materials

- [Reference HTML](reference/index.html)
- [Reference Initial](output/human-review/reference/00-initial.png)
- [Reference Results](output/human-review/reference/search-results-01.png)
- [Reference Empty](output/human-review/reference/search-empty-02.png)
- [Reference Dark](output/human-review/reference/theme-change-01.png)
- [Reference user menu](output/human-review/reference/user-menu-escape-01.png)
- [Business screen review](screen-review.md)
- [Experiment result](experiment-results.md)
- [Verification record](verification-record.md)

# Human checks

1. Initial clearly communicates that no search has run and does not imply a
   backend call or total-count strategy.
2. Results presents one value per column, keeps every Request ID as a link,
   keeps the first/actionable column sticky, and uses only Previous/Next plus
   the current page.
3. Empty is distinguishable from Initial and gives concise recovery guidance.
4. New request remains a primary action in a stable, conventional location;
   neither it nor Request IDs imply a destination surface.
5. The compact scenario selector is visibly a Reference harness, stays out of
   product cards, and does not dominate the page heading.
6. Navigation filtering, parent expansion, selection, independent scrolling,
   theme, filter disclosure, and user-menu focus/Escape remain natural.
7. The one-file Reference remains locally correctable despite its size; a split
   should be requested only if review changes demonstrate a concrete cost.

# Current mechanical disposition

- `done`: deterministic current Reference capture and three-state screenshots.
- `done`: scenario selector excluded from keyed, heading/landmark, bounded
  accessibility, focus, and accessibility-tree product observation.
- `done`: frozen vanilla and React positive evidence remains intact; no current
  conformance claim is made for those consumers.
- `done`: deliberate state/style/accessibility defects rejected.
- `done`: business-screen realism/copy gate has zero prohibited items.
- `partial`: the frozen React run proves framework-state/DOM/build independence,
  not independent CSS re-authoring or current-Reference conformance.
- `not done`: responsive, another browser, full accessibility, second pattern,
  and MCP exposure.

# Decision record

- **Reviewer:** User (human reviewer)
- **Date:** 2026-08-12
- **Decision:** Accepted for continuation with one bounded follow-up PoC.
- **Rationale:** The reviewer inspected the Initial, Results, and Empty states
  in the directly opened Reference and reported no issue. The result-state
  distinction, scenario selector, navigation, filters, grid, and action
  placement are acceptable for the next experiment.

Acceptance means only “continue with a bounded follow-up PoC.” It does not make
the notation canonical, freeze the Reference/CLI profile, prove current Target
transfer, or replace any existing authority.
