---
type: PoC stable-key audit
title: Current Reference stable-key use in the transferability gate
status: observed; not frozen
source: Reference contract, Target source, and CLI reports
---

# Outcome

All 27 keys were used by the current explicit-key capture mode. Eleven were
direct scenario targets. Sixteen were state/style/focus/accessibility comparison
points. Removing any key today would remove that element from observation
entirely because explicit mode does not mix keyed and heuristic candidates.

This operational use does not prove that all 27 should become a permanent
profile. Nine have credible semantic alternatives if a later Core can match
individual unkeyed elements reliably. Eighteen still need an explicit identity
because content changes, multiple same-role elements exist, or the element has
no useful semantic role.

# Key-by-key observation

| Key | Gate use | Semantic-only substitute | Editing-cost observation |
| --- | --- | --- | --- |
| `app-header` | Header state/style comparison | Possible: unique banner | One stable shell annotation; not scenario-coupled. |
| `navigation-toggle` | Scenario target; expanded/style state | Weak: changing accessible name and several header buttons | Required in action JSON and Target. |
| `theme-toggle` | Scenario target; pressed/theme styles | Possible: unique pressed button | Required in action JSON and Target. |
| `user-menu-toggle` | Scenario target and Escape focus return | Weak: unique menu-popup controller | Required in action JSON and Target. |
| `user-menu-popover` | Hidden/open menu state and styles | Possible: unique `role=menu` | State point only. |
| `sign-out-action` | Focus target after menu open; menuitem styles | Possible: unique menuitem | Prevents copy matching; no action step. |
| `primary-navigation` | Visibility/style during shell toggle | Weak: results pagination is another navigation landmark | Shell state point. |
| `navigation-filter` | Fill scenario target and focus/style | Weak: multiple text inputs; label copy differs | Required by two scenarios. |
| `navigation-parent` | Expand/collapse scenario and state | Weak: multiple expanded buttons | Required by scenario. |
| `navigation-children` | Child-region visibility | No strong native role/identity | State point only. |
| `navigation-access-review` | Selection round trip and filter visibility | No: product link text changes | Required by scenario despite Reference-specific key name. |
| `navigation-audit-exports` | Selection round trip and filter visibility | No: product link text changes | Required by scenario despite Reference-specific key name. |
| `navigation-empty` | No-match visibility/state/style | No: unroled paragraph with changed copy | State point only. |
| `workspace` | Main surface style/geometry diagnosis | Possible: unique main landmark | One shell annotation. |
| `filter-toggle` | Keyboard scenario and expanded/style state | Weak: multiple expanded buttons | Required by scenario. |
| `filter-panel` | Hidden/visible form and selected styles | Possible: unique product form | State point only. |
| `requester-filter` | Empty-result fill target | Weak: multiple text inputs and changed label | Required by scenario; key name is business-specific debt. |
| `filter-actions` | Search-toolbar layout/style | No: unroled grouping | State/style point only. |
| `search-action` | Results/Empty scenario target and focus | Possible if action copy is fixed | Required by three scenarios. |
| `clear-action` | Clear-to-Initial scenario target and focus | Possible if action copy is fixed | Required by scenario. |
| `new-request-action` | Primary-action placement/style | No: Target action noun changes | State/style point only; no destination behavior. |
| `result-summary` | Live summary visibility/style | Possible: unique `aria-live` node | State point only. |
| `result-initial` | Initial-state visibility/style | No useful role; copy changes | State point only. |
| `result-empty` | Empty-state visibility/style | No useful role; copy changes | State point only. |
| `result-table` | Results visibility/table style/diagnostic geometry | Possible: unique table in current screen | Needed when future screens contain multiple grids. |
| `status-badge` | Status treatment in Results | No role and fixture text changes | One representative status annotation. |
| `result-pagination` | Results visibility/style | Weak: second navigation with changed label | State point only. |

# Scenario-target summary

The 11 direct targets are `navigation-toggle`, `navigation-parent`,
`navigation-access-review`, `navigation-audit-exports`, `navigation-filter`,
`filter-toggle`, `theme-toggle`, `user-menu-toggle`, `requester-filter`,
`search-action`, and `clear-action`.

The remaining 16 keys are not redundant under the current Core: they carry
observed state/style/focus/a11y comparison points. However, `app-header`,
`user-menu-popover`, `sign-out-action`, `workspace`, `filter-panel`,
`result-summary`, `result-table`, and possibly one navigation landmark are
candidates for a later mixed semantic/key experiment.

# Naming debt

`navigation-access-review`, `navigation-audit-exports`, and `requester-filter`
successfully match content-different Target elements but retain Reference
business nouns. This did not leak visible content, yet it makes the metadata
less readable in the Target. Rename/migration cost would touch the Reference
scenario JSON, Target, and historical evidence, so this gate records the debt
without changing the approved input or freezing a naming rule.

