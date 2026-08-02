---
type: UI Component
title: Page header
description: The page-level task or destination identity, distinct from global product navigation.
status: draft
source: authored
scope: Workspace screens that identify a current task, collection, or record.
requires:
  - foundations/compact-work-surface
---

# Guidance

Use one page title to name the current task, destination, collection, or
record. The global Header identifies the product or workspace; a page header
identifies the current screen. When a supplied hierarchy exists, place the
[Breadcrumb](breadcrumb.md) below global navigation and above this page title.

An optional description may explain a supplied task purpose, state, or
consequence when it helps a user decide what to do on this screen. Place it on
the line following the title, keep it short, and omit it when it only repeats
the title, the Breadcrumb, or visible controls. Do not invent an uppercase
category, kicker, eyebrow, or overline merely to create a third line of
typography. Render such a classification only when the product supplies its
meaning and it distinguishes the current screen from another real task or
destination.

Keep page-level actions close to the title only when the product supplies them
and they affect the current screen or record. The title, description, actions,
and optional hierarchy must not claim an unavailable capability, destination,
permission, or outcome.

# Product boundary

The product binding owns the page title, optional description, actual
classification, available actions, record identity, hierarchy, destinations,
and permissions. This component does not prescribe the global Header, routes,
title size, action alignment, sticky behavior, CSS, DOM, or framework.

# Relationships

Use with [Breadcrumb](breadcrumb.md), [Search with grid](../screen-patterns/record-list.md),
and the record lifecycle screen patterns when a page-level task identity is
needed.
