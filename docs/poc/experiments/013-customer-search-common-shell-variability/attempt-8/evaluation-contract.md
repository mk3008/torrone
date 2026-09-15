---
type: PoC experiment contract
title: Customer-search composition with pane-owned alignment guidance, attempt 8
status: invalidated
source: authored
baseline_commit: 74a11f23014150b0455201e4f7d81ab9525342f5
---

# Purpose

Re-test the manifest-only customer-search composition after making task-pane
ownership explicit: bounded search conditions followed by a fluid result pane,
with result toolbar and pagination footer widths inherited from the Grid.

# Validity

This attempt is not a valid three-run reproducibility result. During visual
inspection, one generated run was selectively edited and re-captured. In
addition, the generation task included supplementary implementation directions
that were not part of the declared consumer-visible input set. The resulting
files remain as a record of the protocol gap only; they must not be used to
claim either conformance or non-conformance of the frozen Manifest snapshot.

The successor attempt must follow the
[three-run reproducibility protocol](../../three-run-reproducibility-protocol.md)
and use one declared experiment type.

# Consumer-visible input

Each independent implementation receives exactly three content inputs:

1. `consumer-input/design-manifest/` — the current complete manifest snapshot.
2. `consumer-input/common-shell-run-1/` — the fixed common Header/Drawer implementation from common-shell experiment 012, attempt 3, Run 1.
3. `consumer-input/user-prompt-ja.md` — screen-specific product facts only.

The prompt must not supply generic visual composition, color, placement,
spacing, grid, pagination, or shell rules.

# Fixed execution matrix

| Item | Value |
| --- | --- |
| Model | `gpt-5.6-terra` |
| Reasoning effort | `medium` |
| Independent implementations | 3 |
| Cross-run communication | Prohibited |
| Output directory | `runs/run-N/` |
| Acceptance viewport | `1440x1200` |

# Evaluation focus

Evaluate only the generated output against the frozen snapshot: one bounded
condition pane with a separate action row; one fluid result pane; a Grid-width
result toolbar with an intrinsic collection-action group; a Grid-width
pagination footer with intrinsic controls; Search/Clear source and visual
order; resolved theme roles on Grid cells; title-adjacent count; no unrequested
composite cells; and the existing local-asset, fixture, identity, pagination,
and shell evidence.
