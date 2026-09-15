---
type: PoC experiment contract
title: Customer-search Grid theme-role reproducibility, attempt 11
status: completed-non-conforming
source: authored
baseline_commit: 2074bf0ac6b99d6265917bad987cf2dc2039e139
---

# Purpose

Test whether the strengthened fixed role-to-element mapping produces the same
result-Grid header and filled-primary-action role usage across three
independent fixed-shell composition runs.

The only consumer-visible input change from attempt 10 is the Manifest
snapshot. It now states the exact active-theme mapping for `thead th`,
`tbody td`, and filled primary actions. The Japanese product prompt and
immutable Header/Drawer fixture are unchanged.

All three runs must be generated once from those frozen inputs. A run may not
be edited, replaced, or selectively regenerated after generation. Capture may
be retried only when the generated source digest is unchanged. See the
[three-run reproducibility protocol](../../three-run-reproducibility-protocol.md).

# Expected outcome

For both Light and Dark states, every generated result Grid should apply the
active `table_header_background` / `table_header_foreground` pair to `thead th`
and the active `surface_background` / `text_primary` pair to `tbody td`. Every
filled primary Search action should apply the active `action_background` /
`action_foreground` pair. A failure is evidence of a non-conforming output or
of an insufficiently clear Manifest; it is not repaired within an individual
run.

# Outcome

The captured Light and Dark states visually apply the same Grid-header and
filled-primary-action colors in all three runs. However, Run 1 duplicates the
Light and Dark body-surface/text palette values into page-local custom
properties. Its visible result is correct only for the canonical palette and
would not follow an allowed local theme-color override. The attempt is thus a
valid non-conforming three-run result, not a successful proof of the editable
theme contract. No Run 1 repair is performed.
