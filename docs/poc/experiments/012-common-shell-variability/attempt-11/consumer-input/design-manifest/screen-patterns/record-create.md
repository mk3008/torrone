---
type: UI Screen Pattern
title: Record create
description: A focused form for creating one product-declared record.
status: draft
source: authored
scope: Single-record creation.
requires:
  - foundations/layout-panes
  - components/record-fields
  - flows/record-lifecycle
---

# Guidance

Identify the create task in the screen title and show only supplied fields.
Start from product defaults or empty values; do not copy values from an
unrelated record. Follow the Record fields single-column default unless the
binding explicitly supplies a related field group.

Keep one clear primary Create action and a separate Cancel action when the
binding supplies a safe destination. Put the complete form in one bounded form
task pane. Place the complete action group in a dedicated form-action toolbar
directly after the final field group. Make the toolbar a separate full-width
structural row in that bounded pane, then align the action group to its logical
start; in a left-to-right interface, use
`justify-content: flex-start` on that toolbar or its full-width action-group
container. This uses the same action-row structure as Search conditions and
keeps the fields, actions, and surrounding page surface distinct. Keep the
form actions at the bottom of the form rather than at its top. A long-form
implementation may keep the toolbar available while scrolling only when it
does not obscure the final field or its validation message.

Within this form-action toolbar, put Create before Cancel in source, reading,
visual, and Tab order. Do not move initial focus to Cancel. Keep this primary-
then-secondary order consistent across full-page create and edit tasks; it is
not local configuration.

On validation failure, keep entered values, place messages with their fields,
and provide a summary that moves users to the errors. While submission is
pending, prevent duplicate creation without moving the primary action.

# Transition roles

This pattern receives `begin_create` and provides `create_success`,
`create_failure`, and `cancel_create`. The product binding supplies all
destinations and whether unsaved cancellation needs confirmation.

# Product boundary

Field schema, defaults, validation, permissions, persistence, identity
generation, duplicate detection, result, notification, and destinations are
product-owned.

# Implementation boundary

Toolbar persistence, scroll container mechanics, control widths, concrete
height, CSS, DOM, and framework are implementation decisions. The fixed
requirements are one aligned field flow, an unboxed field-group presentation,
one dedicated bottom form-action toolbar, and primary-before-cancellation
logical order. A bidirectional platform may mirror physical alignment without
changing the logical action sequence.
