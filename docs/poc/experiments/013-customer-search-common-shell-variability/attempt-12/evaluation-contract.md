---
type: PoC experiment contract
title: Customer-search canonical theme-role reproducibility, attempt 12
status: invalidated-before-generation
source: authored
baseline_commit: 2074bf0ac6b99d6265917bad987cf2dc2039e139
---

# Purpose

Repeat the fixed-shell composition test after removing the remaining CSS
variable-name ambiguity found in attempt 11. The new Manifest snapshot requires
the canonical resolved role variables to be defined on the shared theme root
and consumed directly by page CSS. It prohibits page-local role aliases and
page-local Light/Dark palette literals.

The only consumer-visible input change from attempt 11 is that Manifest
snapshot. The product prompt and immutable fixture are unchanged. Generate all
three runs once; do not edit, replace, or selectively regenerate a run after
generation. See the [three-run reproducibility protocol](../../three-run-reproducibility-protocol.md).

# Invalidation

No run output was created. The orchestration message repeated a design
requirement already present in the frozen Manifest, so this attempt was stopped
before generation rather than used as a contaminated three-run result.
