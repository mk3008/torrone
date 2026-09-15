---
type: UI Component
title: Drawer
description: A product-bound navigation region kept distinct from the workspace and Header control.
status: draft
source: authored
scope: Static navigation and visibility guidance for an available product Drawer.
---

# Guidance

Keep the Drawer navigation region separate from the workspace where users carry
out the current task. When the product binding supplies a current destination,
make that location identifiable without treating every navigation item as the
current one. Render the current item as a square-cornered, full-row selection
surface that includes the item's indentation lane, with
`selection_background`, a leading `selection_indicator`, and a type-weight
difference. When the current destination is a child, align its label with the
normal row start inside the selected full-row surface; do not leave an empty
indentation lane before the current label. The expanded parent immediately
above preserves the supplied hierarchy context. Unselected items use the
ordinary Drawer surface; do not give them a competing filled background. Do
not add visible `Current` copy merely to demonstrate state. The binding
supplies the current destination; the pack supplies this default selection
treatment and does not turn it into a Drawer configuration value.

Do not confuse Drawer visibility with hierarchy disclosure. Visibility concerns
whether the available Drawer region is shown; a disclosure concerns a supplied
parent/child navigation relationship. Neither fact creates the other. When the
binding supplies an expanded parent/child relationship, keep its children
visibly nested and show a trailing `ChevronDown` disclosure affordance on the
parent; use `ChevronRight` when that supplied parent is collapsed. Do not place
that affordance on a leaf item, and do not invent nesting, an expansion state,
or a disclosure icon when the binding does not supply hierarchy.

When the product binding declares that navigation search is available, put one
labelled search field at the top of the Drawer, before its scrollable navigation
list. Render the search as one conventional outlined field: a visible concise
local-scope label, an always-present leading `Search` icon, and a
supplementary placeholder that says what may be matched without repeating the
label verbatim. The field filters the available Drawer items as the user types;
it has no separate submit button. Offer a trailing `X` clear control only while the
field has a value. When the field is empty, do not render the clear control or
reserve space for it; make the empty-state rule override the general clear-control
style. Retain a matching child's supplied parent context so a
result never loses its hierarchy, offer an explicit no-matches state when
nothing matches, and apply the pack's outer `focus_ring` treatment. Navigation
search is a discovery aid, not a substitute for concise, task-oriented
navigation or an invented item.

Keep the Drawer search region and any supplied Drawer identity region visible
above its independently vertically scrolling navigation list. The list may
scroll when it exceeds the available height, without moving the Header or the
workspace's current vertical position. Keep supplied hierarchy to two visible
levels in the Drawer; route deeper or unbounded content through a supplied
drill-down or collection destination instead of turning the Drawer into an
unbounded site map.

When an available Drawer is visually hidden, omit its region, empty boundary,
and reserved space. A [Header](header.md)-side controller and the Drawer body
have separate responsibilities: the Header owns the controller's available
placement and treatment, while the Drawer owns only its available navigation
content. This guidance does not assert that either is available or operational.

# Product boundary

The product binding owns whether a Drawer exists, its items and display
language, destinations, current destination, permissions, visibility state,
state persistence, hierarchy, disclosure state, and whether navigation search
is available. Do not invent a product item, route, permission, state,
navigation relationship, or navigation-search capability when it is not
supplied.

# Non-goals

This component sets no opening default, persistent/temporary default,
responsive rule, breakpoint, keyboard behavior, Escape behavior,
ARIA/assistive-technology behavior, animation, width, CSS, DOM, or
configuration value.
