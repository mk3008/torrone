---
type: UI Screen Pattern
title: Record detail
description: A destination role for inspecting one product-declared record.
status: draft
source: authored
scope: Detail destination in the example list-to-detail flow.
requires:
  - flows/list-to-detail
  - components/record-fields
  - foundations/compact-work-surface
---

# Guidance

Present the product-declared record identity first, followed by summary and
grouped attributes in a stable label/value reading order. Use readable content,
not disabled edit controls. Preserve long, empty, multi-value, sensitive, and
copyable value behavior only when the binding supplies it.

Make the record identity the strongest text on the screen. Promote a supplied
fact above ordinary fields only when the product binding explicitly identifies
its priority; do not infer importance from field order, value shape, or a
fixture. Keep section headings, captions, ordinary values, and secondary
metadata visually subordinate in that order.

Prefer a bounded, compact, one-column description list for ordinary read-only
details. At desktop width, short and stable captions may sit to the left of
their values to support repeated scanning. Stack captions above values when
the pane is narrow, captions or translations are long, or values need the full
reading width. Do not distribute unrelated fields across equal-width cells
merely to fill the viewport.

Treat the default desktop read-only detail as one summary-list-like record
surface, not as a loose masonry of equally weighted facts. The surface may read
like a restrained card that separates the supplied record from the workspace,
but it must remain one record container rather than many field cards. Keep
secondary metadata visibly subordinate to the primary facts instead of giving
every group the same visual weight.

Establish sections with headings, type weight, alignment, and restrained
spacing. The page and its semantic sections already provide containment for
one record, so do not wrap the whole record or each section in a bordered card
by default. One restrained details surface may separate record content from a
visually distinct workspace, but it must remain one group without internal
field cards. Use additional cards only when the binding supplies an independent
repeated sub-record or a group with its own identity or group-level actions.
Do not add row separators when no row-level action or adjacency problem
requires them.

Keep available global actions separate from the information content and place
non-finalizing actions such as Edit or Delete in the page header. When record
content can extend beyond the viewport, keep the title and available global
actions reachable while the content scrolls; do not duplicate the same actions
at the top and bottom. Offer a return role only when the binding supplies a
valid destination and context-restoration behavior. Editing and deletion are
not implied by this read-only destination; each requires an explicit product
binding and the record lifecycle flow.

# Transition roles

This pattern provides `return_to_list` and receives `open_record`. The [list-to-detail flow](../flows/list-to-detail.md) owns when and why those roles connect.

# Product boundary

Identity, status, summary, fields, captions, order, importance, promoted facts,
visibility, permissions, freshness, return behavior, Edit, Delete, and
destinations are product-owned.

# Implementation boundary

Sticky or collapsing header mechanics, caption-column width, reading measure,
responsive stacking, spacing tokens, CSS, DOM, and framework are
implementation decisions. They must preserve the fixed reading order and
action availability above.
