---
type: UI Screen Pattern
title: Search with cards
description: A bounded search pattern for finding and browsing individually identifiable records.
status: draft
source: authored
scope: Desktop result collections where card-level identity and varied summaries help the task.
requires:
  - foundations/compact-work-surface
  - components/search-conditions
  - components/result-card
  - components/pagination
  - flows/list-to-detail
---

# User task

Help a user refine a product-declared result collection and browse recognisable
records without inventing identity, summaries, actions, or destinations.

# Guidance

Keep search conditions separate from the card collection they refine. Reuse
[search conditions](../components/search-conditions.md) for available Search
and Clear actions, and reuse [pagination](../components/pagination.md) only
when the product declares pageable results. Use [result cards](../components/result-card.md)
for the collection and its internal information hierarchy.

Choose this pattern when individual identity, different summaries, or browsing
by record unit matters. Choose [search with grid](record-list.md) when dense
comparison of common attributes, sorting, or repeated scanning matters. The
product requirement or application task selects one pattern; no configuration
value changes a grid into cards.

# Transition roles

This pattern may provide `open_record` only when the product binding declares
an available detail destination. It uses the [list/card to detail
flow](../flows/list-to-detail.md) for that transition and does not own record
identity, destination, permissions, selection state, query persistence, page
position, or scroll restoration.

# Product boundary

Search availability, result data, titles, summaries, metadata, media, status,
counts, actions, selection, pagination, empty/loading/failure states, state
updates, and destinations remain product-owned. Omit any dependent UI that the
product does not supply.

# Non-goals

Card sizing, width, column count, animation, CSS, DOM, framework, responsive
transformation, keyboard, focus, Escape, and ARIA/assistive technology are not
defined here. This pattern adds no card-specific configuration.
