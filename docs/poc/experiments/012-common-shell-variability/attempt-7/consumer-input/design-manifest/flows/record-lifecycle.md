---
type: UI Flow
title: Record lifecycle
description: Cross-screen responsibilities for creating, reading, editing, and deleting one record.
status: draft
source: authored
scope: Record create, detail, edit, and delete patterns.
requires:
  - screen-patterns/record-create
  - screen-patterns/record-detail
  - screen-patterns/record-edit
  - screen-patterns/record-delete
  - flows/screen-transition
---

# Guidance

Treat create, read-only detail, edit, and delete as separate task states. A
product binding may connect only the states the product supports:

- `begin_create` → create → supplied success or cancellation destination
- detail → `begin_edit` → edit → supplied save or cancellation destination
- detail → `begin_delete` → confirmation → supplied deletion destination

Keep identity and return context across a transition when supplied. Do not
infer Edit from read access, Delete from Edit, or Create from list access.
Reject an available transition whose destination, permission, or required
state is missing.

In read-only detail, keep supplied global actions such as Edit and Delete in
the page header. In create and full-page edit, keep finalizing Create or Save
and cancellation in a persistent footer action region so a long form cannot
scroll them out of reach. In that full-page region, keep the primary finalizing
action before cancellation in source, reading, visual, and Tab order. Do not
use a success-style banner for record identity; show mutation success only
after the product reports a successful outcome.

Preserve entered data on recoverable validation failure. Confirm abandonment
only when material unsaved state exists. A successful mutation needs supplied
outcome feedback and a destination; it does not silently return to an assumed
screen.

# Product boundary

Capabilities, permissions, state, validation, persistence, concurrency,
outcomes, return context, and destinations are product-owned.
