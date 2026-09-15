---
type: PoC correction-cost record
title: Human-review Reference adjustment cost
status: measured
source: pre-change snapshot and repository diff
---

# Purpose

This record treats the human-review adjustment itself as maintenance-cost
evidence. It does not recommend a permanent file layout.

# Observed correction locality

Earlier review corrections to navigation, action placement, copy, pagination,
grid links, and the user menu stayed within `reference/index.html`. They did not
require a parallel expected-value file. The current adjustment crossed the
Reference boundary only for two demonstrated reasons:

1. the Reference-only scenario selector had to be excluded from every product
   observation surface, including the accessibility tree; and
2. current human-review evidence had to be separated from the frozen
   vanilla/React transfer baseline; and
3. repeated observation exposed and justified a DevTools request-registration
   race and failed-start cleanup fix in the CLI.

# Measured source change

The pre-change files were copied before editing and compared with
`git diff --no-index --numstat`.

| Responsibility | Files | Before → after | Added / removed lines |
| --- | ---: | ---: | ---: |
| Product and harness UI | `reference/index.html` | 909 → 979 lines; 32,320 → 34,889 bytes | 141 / 71 |
| Product-observation boundary and CLI stability | `core/browser-core.js`, `cli/reference-ui.mjs` | 989 → 1,088 lines | 148 / 49 |
| Reproducible regression gate | `verify.ps1` | 128 → 164 lines | 63 / 27 |

The Reference moved from 25 to 27 unique stable keys, from 9 to 11 scenarios,
and from 16 to 19 actions. The increase came from Search/Clear/requester
targeting and the two new visible result-state elements; the three dialog-
related keys and dialog scenario were removed. The selector itself has no
stable key and needs only one root-level `data-reference-harness` marker.

# Synchronization cost

- Observable style, accessible name, focus, and state values remain derived
  from the live Reference; no YAML/JSON expected-value mirror was added.
- The scenario JSON contains actions only. It does not restate style values or
  target implementation state names.
- `verify.ps1` asserts acceptance outcomes such as the three mutually exclusive
  visible states, but it does not mirror the full captured state or CSS.
- The old vanilla/React consumers were not edited. Their reports remain bound
  to the frozen baseline rather than being silently presented as current.

# File-layout observation

The user-facing correction remained local to one directly openable Reference
file. The cross-file work was caused by a new observation-boundary capability,
not by the file reaching a particular line count. This round therefore provides
no evidence that splitting HTML/CSS/JavaScript would reduce total correction
cost. File-layout selection remains open.
