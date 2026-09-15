---
type: Business screen review
title: Reference HTML and consumer screen review
status: human design review accepted
source: direct rendered evidence and focused browser interaction
---

# Verdict

The current Reference passes the bounded business-screen realism and copy gate
and is ready for human review. No visible Contract, acceptance, process, or UI-
explanation copy appears in the product canvas. The compact scenario selector
is visibly labeled as a Reference harness and is outside the product cards.
This is not automatic design approval.

# Screens and states reviewed

| Surface | States |
| --- | --- |
| Current Reference access review queue | Initial, Results, Empty, navigation hidden/restored, parent collapsed/restored, navigation selection/filter, filters hidden/restored by keyboard, Dark, user menu open/Escape |
| Frozen vanilla/React evidence | Historical transfer states only; not compared to the current Reference |
| Frozen negative fixture | Historical style/name/dialog defects, still rejected against its frozen baseline |

The fixed observation viewport is `1440 x 900`. Initial, Results, and Empty
screenshots were inspected directly. The CLI exposed the product landmarks,
headings, labeled controls, table headers/caption, stable focus, and bounded
accessibility tree while excluding the scenario harness.

# Copy inventory

| Copy type | Examples | Disposition |
| --- | --- | --- |
| Task or record identity | `Access review queue`, `AR-1048`, `Supplier onboarding cases` | Keep. |
| Field label or task help | `Team`, `Risk`, `Requested by` | Keep; needed to operate filters. |
| Data, status, or recovery | `High`, due dates, `No requests found` | Keep as fixed fixture or concise recovery content. |
| Concise action | `Search`, `Clear`, `New request`, linked Request IDs | Keep; destination behavior is intentionally unspecified. |
| Prohibited demo, Contract, acceptance, process, or UI-explanation copy | None | Gate count: `0`. |

The one-sentence page description explains the operational queue, not the UI.
Initial and Empty copy describe the current product state and next step without
mentioning implementation mechanics.

# Action inventory

| Action | Rationale |
| --- | --- |
| Header navigation toggle | Remains at one stable location; hiding navigation removes its complete track and preserves the task. |
| Header theme toggle | Compact but has an accessible name and visible focus treatment. |
| Header user menu | Opens named account actions and restores focus on Escape. |
| `Hide filters` / `Show filters` | Adjacent to the affected filter region; keyboard round trip retains the trigger geometry. |
| Search and Clear | Kept together at the logical end of the filter form; Search reaches Results or Empty and Clear returns to Initial. |
| Request ID links | Every visible row uses link semantics; destination UI is not implemented. |
| New request | Primary action remains in the result heading; destination UI is not implemented. |
| Reference scenario selector | Switches Initial/Results/Empty for review only and follows the displayed state. It is excluded from product observation. |

# Interaction and accessibility risks

- The browser checks cover pointer click, Enter activation, focus, Escape,
  native labels, roles, state attributes, and a bounded accessibility tree.
- The Reference demonstrates Light and Dark at one desktop viewport. Narrow
  reflow, zoom, forced colors, reduced motion, and touch input are unverified.
- The status treatment uses text plus color. There is no multi-selection state
  in this bounded queue.
- Initial and Empty are distinct observable states. Backend query timing, total
  counts, `hasNext`, API design, and target state names are intentionally absent.
- Screen-reader announcement timing and real assistive-technology output remain
  unverified.

# Contract boundary decision

No design rule is promoted to the existing Manifest. The 27 current `data-ref`
keys are local matching handles for this experiment, not a universal component
catalog. The action-only sequences are observation instructions; expected
state/style values come from executing the live Reference.

# Evidence

- [Reference Initial](output/human-review/reference/00-initial.png)
- [Reference Results](output/human-review/reference/search-results-01.png)
- [Reference Empty](output/human-review/reference/search-empty-02.png)
- [Current CLI snapshot](output/human-review/reference.snapshot.json)
- [Historical and current evidence](output/)

# Remaining verification limits

Passing evidence does not prove production readiness, complete WCAG
conformance, visual preference, responsive behavior, data correctness,
authorization, persistence, destination behavior, or whether this one-file
Reference remains comfortable after more partial patterns are added. Those
decisions remain outside this mechanical gate.
