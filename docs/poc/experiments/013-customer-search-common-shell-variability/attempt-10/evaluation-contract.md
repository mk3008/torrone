---
type: PoC experiment contract
title: Customer-search Grid composition with a fixed shell, attempt 10
status: completed-observation-gap
source: authored
baseline_commit: 2074bf0ac6b99d6265917bad987cf2dc2039e139
---

# Purpose

Repeat the valid fixed-shell composition experiment after correcting the
product-facts prompt discovered in attempt 9. The prompt now supplies that the
result presentation is a Grid. This is a product-specific pattern choice; it
does not add generic layout or visual directions.

Use the same `composition-with-fixed-shell` boundary, Manifest snapshot, shell
fixture, model, effort, viewport, capture states, and hard invariants as
attempt 9. The only consumer-visible input change is the Grid result fact in
`consumer-input/user-prompt-ja.md`.

No output may be edited or selectively regenerated after the three independent
runs complete. See the [three-run reproducibility protocol](../../three-run-reproducibility-protocol.md).

# Outcome

All three runs were generated independently from the frozen inputs and were
captured without changing, replacing, or selectively regenerating any run.
The supplied Grid product fact is present in all three outputs. The source
boundary checks pass: each run preserves the shell template outside
`PAGE_SLOT`, and its shell CSS and JavaScript match the immutable fixture by
SHA-256.

The captured open states nevertheless show that Run 2 does not visibly show
the fixed Drawer navigation, while Runs 1 and 3 do. The captured source files
do not explain that observation: Run 2 has the same immutable shell assets and
the same template outside the allowed page slot. This is recorded as an
`observation-gap` in the evaluation, not repaired as an individual run and not
attributed to the Manifest without further evidence.
