---
type: UI Screen Pattern
title: Search with grid
description: A bounded grid pattern for finding, scanning, and opening a record.
status: draft
source: authored
scope: Desktop search/list view in the example operations workspace.
requires:
  - foundations/layout-panes
  - foundations/compact-work-surface
  - components/search-conditions
  - components/result-grid
  - components/pagination
  - components/status-badge
  - configuration/record-list-options
  - flows/list-to-detail
---

# User task

Help an operations user locate a record, compare dense repeated attributes,
understand its current state, and open an available record without losing list
context.

# Guidance

Keep the search task separate from the result set and preserve stable scanning cues after a query is applied. The Search action is primary; Clear is subordinate and only clears a product-declared query state. Associate a row operation with its record and expose a frequent, singular operation rather than hiding it in an overflow menu. Apply the [compact work surface](../foundations/compact-work-surface.md), [search conditions](../components/search-conditions.md), [result grid](../components/result-grid.md), [pagination](../components/pagination.md), and [status badge](../components/status-badge.md). Resolve only the finite placement and presentation choices in [record-list options](../configuration/record-list-options.md).

Compose this screen from two task panes: one bounded condition pane followed by
one fluid result pane. The condition caption, fields, and Search/Clear toolbar
share the bounded pane. The result summary, collection toolbar, Grid, and
pagination footer share the fluid pane. The toolbar and footer therefore match
the Grid width even though their control groups remain compact.

Use the [page header](../components/page-header.md) to identify the search task
before the conditions. It may carry a supplied purpose description, but it
must not manufacture a category label that merely repeats the collection or
screen name. Treat the result summary as part of the grid, not as a second
page header.

# Transition roles

This pattern provides the `open_record` role and requires the [list-to-detail flow](../flows/list-to-detail.md) when the product binding declares that opening a record is available. It does not own the destination, permission, record identity, query persistence, page position, or scroll restoration.

# Unresolved

Feature availability, query semantics, result data, count meaning, page state, routes, permissions, bulk selection, responsive transformation, and all non-default states require product binding or requirements before implementation. Creation and editing are optional transition roles, not configuration values; use them only when the binding declares them.

# Pattern selection

Use this pattern when dense comparison of common attributes, sorting, or rapid
repeated scanning is the task. Use [search with cards](search-with-cards.md)
when individual identity, varied summaries, or record-unit browsing is more
important. A product requirement or application task chooses the pattern; this
pack does not provide a `grid | card` configuration switch.

# Relationships

- [List-to-detail flow](../flows/list-to-detail.md) - Owns the cross-screen decision criteria and context-restoration principle.
- [Record detail](record-detail.md) - Provides the corresponding destination role when the product binding supplies it.
