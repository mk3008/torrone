---
type: PoC experiment contract
title: Customer-search composition with Common-shell Attempt 22 Run 1, attempt 24
status: running
source: authored
---

# Purpose

Measure whether the current frozen Manifest, one fixed reusable common shell
from Common-shell Attempt 22 Run 1, and one fixed product-specific prompt
produce comparable customer-search pages across three independent
implementations.

This is a Manifest-plus-prompt test. The common shell is a supplied reusable
fixture, not a fourth design input to reinterpret. A generated page is never
repaired; an input change requires a fresh set of all three runs.

# Frozen inputs

1. `consumer-input/design-manifest/` — complete current Manifest snapshot.
2. `consumer-input/common-shell-fixture/` — immutable shell derived from
   Common-shell Attempt 22 Run 1.
3. `consumer-input/user-prompt-ja.md` — fixed customer-search product facts.

# Immutable shell boundary

Copy `shell-template.html` to `index.html`, and copy `shell.css` and
`shell.js` byte-for-byte. Insert only the page in `<!-- PAGE_SLOT -->`; add
page-specific CSS in `page.css` and page-specific behavior in `page.js`.
Do not modify Header, Drawer, its navigation, theme control, query-state
behavior, or markup outside the page slot.

# Execution matrix

| Item | Value |
| --- | --- |
| Model | `gpt-5.6-terra` |
| Reasoning effort | `medium` |
| Implementations | `3` |
| Cross-run communication | prohibited |
| Desktop viewport | `1440x1200` |
| Narrow viewport | `720x1200` |

# Evaluation focus

Confirm that each run retains the fixed shell, renders the supplied customer
search facts, has no external dependency, and keeps the result Grid's
horizontal overflow local to its data region. Review visual output as business
screens; screenshots do not prove keyboard or assistive-technology behavior.
