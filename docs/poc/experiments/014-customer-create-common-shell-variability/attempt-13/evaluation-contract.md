---
type: PoC experiment contract
title: Customer-create composition with normalized Common-shell Attempt 22 Run 1, attempt 13
status: completed
source: authored
---

# Purpose

Measure whether the current frozen Manifest, the fixed reusable common shell
from Common-shell Attempt 22 Run 1, and a fixed product-specific prompt
produce comparable customer-create pages across three independent runs.

This is a Manifest-plus-prompt test. The supplied common shell is reused and
not reinterpreted. A generated output is never repaired; an input correction
requires a fresh set of all three runs.

# Frozen inputs

1. `consumer-input/design-manifest/` — complete current Manifest snapshot.
2. `consumer-input/common-shell-fixture/` — immutable shell preserving the
   structure and interaction baseline of Common-shell Attempt 22 Run 1 while
   exposing the complete current semantic palette at the shell root.
3. `consumer-input/user-prompt-ja.md` — fixed customer-create product facts.

# Immutable shell boundary

Copy the fixture template to `index.html`, copy `shell.css` and `shell.js`
byte-for-byte, and insert only page content in `<!-- PAGE_SLOT -->`. Add
page-specific styling only in `page.css` and page validation only in `page.js`.
Header, Drawer, navigation, theme control, and markup outside the page slot
must remain unchanged.

# Execution matrix

| Item | Value |
| --- | --- |
| Model | `gpt-5.6-terra` |
| Reasoning effort | `medium` |
| Implementations | `3` |
| Cross-run communication | prohibited |
| Desktop viewport | `1440x1200` |
| Narrow viewport | `720x1200` |
