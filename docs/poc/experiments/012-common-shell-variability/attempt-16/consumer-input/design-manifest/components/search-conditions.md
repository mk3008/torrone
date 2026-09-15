---
type: UI Component
title: Search conditions
description: A bounded query region with a primary search action and subordinate clearing action.
status: draft
source: authored
scope: Search/list tasks with product-declared query state.
requires:
  - foundations/layout-panes
  - configuration/record-list-options
---

# Guidance

Place conditions before the results they refine. Put the caption, optional
description, fields, and condition-action toolbar in one bounded condition pane.
Make the action that applies a declared query primary and make clearing
subordinate. Use a stable semantic action order so placement can change without
changing the intent or display copy. Do not introduce a condition, helper text,
validation state, or query behavior unless product requirements or binding
supply it.

Give the condition region a concise group caption so its purpose remains
recognizable beside the result set. The caption is present even when no
supporting explanation is needed. A group description is optional: place it on
the next line only when product-supplied context adds meaning beyond the
caption, visible fields, and actions. Do not use a decorative container merely
to compensate for an omitted caption. A group caption names the field group; it
does not require a fieldset border, card, filled panel, horizontal rule, or
extra inset spacing. Keep the caption, field grid, and action row unboxed
inside their bounded pane unless an independent product-supplied grouping
requires a boundary. If semantic field grouping needs a `<fieldset>`, render it
without a border, fill, decorative rule, or extra inset padding unless that
independent product grouping explicitly requires one.

When [record-list options](../configuration/record-list-options.md) resolves a
search action region, create a dedicated condition-action toolbar directly
below the condition fields. Make the toolbar a separate full-width structural
row of the bounded condition pane, then place the complete action group inside
it. For the default `start` region, align the action group's logical-start edge
with the bounded condition pane's logical-start edge. In CSS Flexbox, implement
that horizontal placement with `justify-content: flex-start`
on the toolbar or its full-width action-group container; use `align-items` only
for vertical alignment. Keep the resolved action order in both source/tab order
and visual order; for the default `[search, clear]` value, render Search
followed by Clear. Give the condition pane, field grid, and toolbar
`width: 100%` up to the bounded pane maximum; use `box-sizing: border-box` and
`minmax(0, 1fr)` or an equivalent intrinsic-size-safe track for multi-column
fields so neither controls nor their borders overflow the pane. This toolbar structure and order are a presentation
consequence of the existing configuration, not a new setting or a permission to
create actions.

# Selection conditions

Use this component only when the product exposes query state and a result set that it affects. If a clear operation does not exist, omit it; configuration cannot create it.

# Relationships

Use with the [searchable record list](../screen-patterns/record-list.md) and [record-list options](../configuration/record-list-options.md).
