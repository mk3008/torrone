---
type: PoC experiment contract
title: Customer-search canonical theme-role reproducibility, attempt 13
status: completed-non-conforming
source: authored
baseline_commit: 2074bf0ac6b99d6265917bad987cf2dc2039e139
---

# Purpose

Test the canonical theme-role Manifest snapshot after attempt 11 found that
page-local aliases with copied palette values do not preserve an editable theme
contract. The snapshot requires canonical role variables on the shared theme
root and direct page-CSS consumption; it prohibits page-local aliases and
page-local palette literals.

The product prompt and immutable fixture are unchanged from attempt 11. All
three runs must be generated once from the frozen consumer inputs alone. No
output may be edited, replaced, or selectively regenerated. See the
[three-run reproducibility protocol](../../three-run-reproducibility-protocol.md).

# Outcome

All three runs and twelve captures were completed without individual output
repair. The focused check did not pass. Run 2 declares a fallback because the
immutable shell fixture does not define the full canonical theme-role variable
set required by this Manifest snapshot. That is a fixture gap, not a reason to
rewrite Run 2. The existing leading-identity-operation assertion also rejects
Run 1's generated markup, a separate output non-conformance.
