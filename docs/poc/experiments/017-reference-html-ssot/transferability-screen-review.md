---
type: Business screen review
title: Independent shipment-exception Target review
status: realism and copy gate passed
source: rendered CLI evidence and focused source verification
---

# Verdict

The content-different Target passes the bounded business-screen realism and copy
gate. It reads as a shipment-exception work surface, not a Reference demo or
verification fixture. The Target has no visible scenario harness and no
Reference access-review fixture/copy. Mechanical equivalence does not make it a
production-ready logistics application.

# Screens and states reviewed

| State | Evidence |
| --- | --- |
| Initial | `output/transferability-gate/target/00-initial.png` |
| Results | `output/transferability-gate/target/search-results-01.png` |
| Empty | `output/transferability-gate/target/search-empty-02.png` |
| User menu open and Escape recovery | `output/transferability-gate/target/user-menu-escape-01.png` plus CLI focus comparison |
| Dark | `output/transferability-gate/target/theme-change-01.png` |

The acceptance viewport is `1440 x 900`. Initial, Results, Empty, and the open
user menu were inspected directly. The CLI exercised all 11 Reference scenario
paths.

# Copy inventory

| Copy type | Target examples | Disposition |
| --- | --- | --- |
| Task identity | `Shipment exception queue`, `Fulfillment Desk` | Keep. |
| Field label/help | `Facility`, `Severity`, `Reported by` | Keep; needed for search. |
| Fixture/status/recovery | `SX-2081`, `Critical`, `No exceptions found` | Keep; task-real fixed data/state. |
| Concise action | `Search`, `Clear`, `New exception`, `Previous`, `Next`, `Sign out` | Keep. |
| Prohibited demo, Contract, acceptance, or UI-explanation copy | None | Gate count: `0`. |

The product description is one operational sentence. No text explains stable
keys, scenarios, CLI comparison, CSS independence, or the Gate.

# Action inventory

| Action | Rationale |
| --- | --- |
| Shell navigation toggle | Stable header location; collapses the full rail. |
| Navigation parent/filter/selection | One parent level, product-native labels, selectable links, and a no-match state. |
| Theme toggle | Compact named action with pressed state and visible theme result. |
| User menu | Opens account identity and Sign out; Escape restores trigger focus. |
| Filter disclosure | Adjacent to the form; keyboard round trip preserves trigger placement. |
| Search/Clear | Separate command row; Search reaches Results/Empty and Clear returns to Initial. |
| New exception | One primary action in the result heading; destination remains unspecified. |
| Exception ID links | One linked ID per row; destination surface remains unspecified. |
| Pagination | Only Previous/current page/Next plus a refinement hint. |

# Interaction and accessibility risks

- Selected navigation uses shape/background, weight, and a square accent edge,
  not color alone.
- Status pills carry text in addition to color.
- The first grid column is sticky in source and every ID is a link, but the
  current keyed comparison does not directly gate those cell-level facts.
- The CLI proves focus recovery, state attributes, selected computed styles,
  zero bounded a11y issues, zero unnamed accessibility-tree controls, and zero
  action/console errors at one desktop Chrome viewport.
- Screen-reader announcements, responsive behavior, real navigation/account
  actions, and production data behavior remain unverified by scope.

# Contract boundary decision

No Target-specific logistics rule, CSS selector, reducer action, DOM grouping,
or scenario override is promoted to the Manifest or a Reference Profile. The
one `routing` fill-value override is test-harness data outside product UI, not a
product option or expected-state source.

# Evidence

- `output/transferability-gate/target.report.json`
- `output/transferability-gate/target.snapshot.json`
- `output/transferability-gate/source-independence.json`
- `consumers/transferability-gate-react/`

# Remaining verification limits

The current CLI does not directly compare all visible ID links, sticky first-
column behavior, one-value-per-cell content discipline, pagination child
composition, or relative placement geometry. Those remain source/rendered human
checks. Passing evidence does not prove complete WCAG, production readiness, or
a frozen Reference/CLI contract.

