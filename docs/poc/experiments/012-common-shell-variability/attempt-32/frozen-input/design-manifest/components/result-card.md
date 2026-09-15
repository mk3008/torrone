---
type: UI Component
title: Result card
description: A record-oriented result presentation for identity and heterogeneous summaries.
status: draft
source: authored
scope: Product-supplied result collections whose records benefit from individual recognition.
---

# Guidance

Use result cards when individual identity, different summaries, or browsing by
coherent record units matters. Prefer the [result grid](result-grid.md) when
dense comparison of the same attributes, sorting, or repeated scanning is more
important.

Keep the card collection separate from the information hierarchy inside each
card. A supplied title identifies the record; a supplied summary explains it;
and supplied metadata provides supporting context. Do not merge selection and
detail navigation into one interactive area. When selection is available,
distinguish selected and unselected states with more than color alone.

Keep an incomplete final row natural rather than stretching its cards to fill
the remaining width. Omit images, status, count, action, or destination slots
that the product does not supply. When a binding supplies multi-selection, an
upper-right checkbox is sufficient to show the choice and its checked state;
do not add synthetic visible `Select` or `Selected` copy merely to demonstrate
it. The control's accessible name remains binding-owned. When the binding also
supplies a detail destination, keep its supplied title link distinct from that
checkbox; do not make the whole card body perform both selection and navigation.
If either capability is absent, omit its dependent control rather than
inventing a fallback.

# Product boundary

The product binding owns record identity and title, summary and metadata,
selection capability and state, detail destination, optional actions, media,
status, pagination capability, empty/loading/failure states, and the source of
state updates. This fixed guidance does not create any of those facts.

# Implementation boundary

Width, column count, card dimensions, animation, CSS, DOM, and framework are
implementation decisions. This pack supplies no card-specific configuration.

# Relationships

Use [search conditions](search-conditions.md) and [pagination](pagination.md)
only when their product-owned prerequisites are available. The
[search-with-cards pattern](../screen-patterns/search-with-cards.md) combines
those shared concepts, and [list/card to detail](../flows/list-to-detail.md)
governs an available detail transition.
