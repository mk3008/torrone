---
type: PoC experiment contract
title: Customer-search action alignment and pinned-boundary test, attempt 22
status: completed
source: authored
baseline_commit: 2074bf0ac6b99d6265917bad987cf2dc2039e139
---

# Purpose

Test the revised Manifest defaults with one fixed Japanese product prompt and
three independent fresh page sources. The changes under test are:

- Search and Clear occupy a dedicated logical-start toolbar in their bounded
  condition pane.
- Create and Save use the same bounded-form logical-start action rule.
- A pinned Grid context strip uses the row-separator token and thickness as its
  persistent boundary; a shadow is only an optional scroll-state reinforcement.
- The complete Grid table, including its column header and data rows, uses one
  local horizontal scroll container; result toolbar and pagination remain
  outside it.
- A collection action remains at the logical end of the fluid result toolbar.

Each run may use only the frozen Manifest snapshot, the fixed product prompt,
and the fixed common-shell fixture. `index.html`, `page.css`, and `page.js` are
newly authored once per run. No prior page source or capture is reused.

# Evaluation boundary

Capture and inspect the three runs as generated. A later Manifest or prompt
change requires a new numbered attempt and all three fresh runs; do not repair
one Run in place.
