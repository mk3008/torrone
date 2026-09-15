---
type: UI Screen Pattern
title: Record edit
description: A focused form for updating one existing product-declared record.
status: draft
source: authored
scope: Single-record editing.
requires:
  - foundations/layout-panes
  - components/record-fields
  - flows/record-lifecycle
---

# Guidance

Keep record identity visible and prepopulate fields from the current supplied
state. Put identity in the title or adjacent title context; do not add an
ambiguous information or success banner just to repeat the same identity.
Follow the Record fields single-column default unless the binding explicitly
supplies a related field group.

Use one clear Save action and a separate Cancel action. Put the complete form
in one bounded form task pane. Place the complete action group in a dedicated
form-action toolbar directly after the final field group. Make the toolbar a
separate full-width structural row in that bounded pane, then align the action
group to its logical start; in a left-to-right interface, use
`justify-content: flex-start` on that toolbar or its full-width action-group
container. This uses the same action-row structure as Search conditions and
keeps the fields, actions, and surrounding page surface distinct. Keep the
form actions at the bottom of the form rather than at its top. A long-form
implementation may keep the toolbar available while scrolling only when it
does not obscure the final field or its validation message. Do not treat the
entire read-only detail as disabled inputs, and do not hide changed values
behind a second interaction.

Within this form-action toolbar, put Save before Cancel in source, reading,
visual, and Tab order. Do not move initial focus to Cancel. Keep this primary-
then-secondary order consistent across full-page create and edit tasks; it is
not local configuration.

Keep valid values on validation failure. When the product detects a concurrent
change, show the conflict and recovery choices without silently overwriting
either version. Confirm abandonment only when unsaved changes are material and
the product supplies that state.

# Transition roles

This pattern receives `begin_edit` and provides `save_success`, `save_failure`,
and `cancel_edit`. It returns to a binding-owned destination and does not infer
that destination from page history.

# Product boundary

Current values, editable fields, validation, permissions, change detection,
conflict policy, persistence, outcome, and destinations are product-owned.

# Implementation boundary

Toolbar persistence, scroll container mechanics, control widths, concrete
height, CSS, DOM, and framework are implementation decisions. A save-success
message is an outcome after Save; the form-action toolbar and record identity
must not be styled as that outcome. A bidirectional platform may mirror
physical alignment without changing the logical action sequence.
