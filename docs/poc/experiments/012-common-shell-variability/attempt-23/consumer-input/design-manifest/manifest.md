---
type: UI Design Manifest
title: Example operations workspace
description: A restrained example for navigation, record lifecycle, search-result, guided-task, and monitoring workflows.
status: experimental
source: authored
pack_version: 0.3.0
pack_id: example-business-app-standard-pack
scope: Illustrative desktop Drawer, search, record lifecycle, Dialog, Wizard, Dashboard, accessibility, and transition roles.
requires:
  - foundations/layout-panes
  - foundations/accessible-work-surface
  - foundations/color-and-theme
  - policies/confirm-consequential-action
  - policies/confirm-destructive-action
---

# Product and scope

This fictional workspace helps an operations user locate records, scan a result
set, read and maintain one record, complete a bounded guided task, and monitor
current work. The pack covers a bounded desktop business-workflow slice; it
does not define authentication, mobile behavior, data access, or a full
component library.

# Source-independence boundary

All content is authored to demonstrate structure. It contains no original-UI evidence and must be applicable without an original UI, URL, screenshot, or extraction trace.

# Precedence

Target-product implementation and repository guidance come first; explicit accessibility, security, and business requirements follow; this local manifest is next; explicit starter guidance is last. Original or reference UI is not an application authority.

# Configuration and product binding

The pack supplies stable Markdown guidance, the five finite definitions in
[record-list options](configuration/record-list-options.md), and the editable
Light and Dark semantic values in
[theme colors](configuration/theme-colors.md). Resolve each definition with at
most one separate local override; direct edits to this directory are a pack
fork. Drawer, result-card, record-lifecycle, Dialog, Wizard, Dashboard, and
accessibility guidance add no configuration. The separate product binding
supplies feature availability, destinations, permissions, state, field
semantics, data sources, aggregate meaning, consequences, step models,
post-action behavior, business language, and theme-selection capability. It
does not override resolved theme values or replace the Application Input
Contract.

# Application input contract

The application owner must provide the task-level state model, primary-record value, identity context, aggregate information, optional destinations, and behavior for unresolved fields. This illustrative manifest does not authorize an implementer to invent them. If a neutral, source-blind fixture is allowed, it may fill only an already instructed semantic slot with recorded provenance; it must not create product meaning, source-specific copy, or a new hierarchy slot.

# Relationships

Discover the available guidance through [Foundations](foundations/index.md),
[Components](components/index.md), [Policies](policies/index.md),
[Screen patterns](screen-patterns/index.md), [Flows](flows/index.md), and the
[fixed and variable responsibility map](variability.md).
Combine only the concepts required by the product-owned task and capability
binding.

# Unresolved

Concrete keyboard mappings, narrow-viewport composition, real field schemas,
loading, empty, failure, permission-limited states, destinations, persistence,
and business consequences remain unspecified until product binding,
implementation, and applicable requirements supply them.
