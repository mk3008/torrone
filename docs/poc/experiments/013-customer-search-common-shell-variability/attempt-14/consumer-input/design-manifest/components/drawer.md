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
current one. Use a restrained current-item treatment such as a leading accent
and a type-weight difference; do not add visible `Current` copy merely to
demonstrate state. The binding supplies the current destination; the product
or implementation design system supplies the accent token, its exact color,
and the selected-row shape. Those visual choices are variable, but are not a
Drawer configuration value.

Do not confuse Drawer visibility with hierarchy disclosure. Visibility concerns
whether the available Drawer region is shown; a disclosure concerns a supplied
parent/child navigation relationship. Neither fact creates the other. When the
binding supplies an expanded parent/child relationship, keep its children
visibly nested and show a trailing disclosure affordance on the parent. Do not
place that affordance on a leaf item, and do not invent nesting, an expansion
state, or a disclosure icon when the binding does not supply hierarchy.

When an available Drawer is visually hidden, omit its region, empty boundary,
and reserved space. A [Header](header.md)-side controller and the Drawer body
have separate responsibilities: the Header owns the controller's available
placement and treatment, while the Drawer owns only its available navigation
content. This guidance does not assert that either is available or operational.

# Product boundary

The product binding owns whether a Drawer exists, its items and display
language, destinations, current destination, permissions, visibility state,
state persistence, hierarchy, and disclosure state. Do not invent a product
item, route, permission, state, or navigation relationship when it is not
supplied.

# Non-goals

This component sets no opening default, persistent/temporary default,
responsive rule, breakpoint, keyboard behavior, focus behavior, Escape
behavior, ARIA/assistive-technology behavior, animation, width, CSS, DOM, or
configuration value.
