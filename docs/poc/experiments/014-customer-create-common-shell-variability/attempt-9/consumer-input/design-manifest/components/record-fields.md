---
type: UI Component
title: Record fields
description: A shared field-group contract for readable record values and editable record forms.
status: draft
source: authored
scope: Read-only detail, create, edit, and wizard steps.
requires:
  - foundations/accessible-work-surface
  - foundations/compact-work-surface
---

# Guidance

Group related record fields under a meaningful section heading. In a read-only
surface, render supplied values as readable label/value content rather than as
disabled form controls. In create and edit surfaces, use labeled native inputs
appropriate to the supplied value type.

For a read-only operational detail at desktop width, prefer compact horizontal
description rows when captions are short and users repeatedly scan keys and
values. Keep one bounded caption column beside one value column instead of
scattering unrelated fields across equal-width cells. Return to labels above
values when the pane is narrow, captions or translations are long, or values
need the full reading width. Choose the relationship once for the field group;
it is not a per-field choice or local setting.

When the screen needs a denser record-summary presentation, keep that
read-only group as one summary-list-like surface and subordinate any secondary
metadata. Do not turn each fact into its own mini-card or spread one small set
of details across several balanced columns merely because the canvas is wide.

For create and edit controls, place the label above its control by default.
This vertical relationship preserves one input direction and tolerates longer
labels, help, errors, and translations. Keep one alignment within a field
group.

Render a field-group heading as concise text, followed by normal vertical
spacing and the field flow directly on the host content surface. Use the
heading, labels, control boundaries, and spacing to express the group; this
produces the same unboxed grouping used by Search conditions. A full-page form
does not add an outer card or panel merely to contain its fields. A group
heading is not a panel title: it does not add a fill, card, inset padding, or
horizontal rule below itself.

Use an I-shaped single-column reading path as the maintainable default for
create and edit. It keeps unrelated fields, help, and errors in one predictable
vertical order. Put two or three fields on one row only when the product binding
explicitly groups them as a related value set that users understand
left-to-right. Treat that row as one layout unit so help or error content does
not misalign its neighboring controls.

Keep labels visible. Associate help, required state, validation, units, and
format expectations with the field they describe. On validation failure, show
an error summary for the screen and a specific message at each affected field.
Do not clear valid values or make users re-enter already supplied information.
Use one shared height for text inputs, select controls, and other single-line
controls on the same screen. A multiline text area is an intentional exception.

For client-side validation, validate an editable field when the user leaves it
after interacting with it. Show the supplied field-specific error beside that
field at that time. When the user submits the form, validate every declared
field, show the same messages beside their fields, and provide the error
summary for the screen. After a field has an error, re-evaluate that field as
its value changes so its message and invalid state stay current. This blur,
submit, and correction sequence is the shared form behavior; product binding
owns the validation rules and messages, not when the client presents them.

Implement correction as an `input` listener for every editable field. That
listener revalidates the field whenever it is currently in an invalid state,
then updates or clears the same field message and invalid state. This provides
immediate recovery without showing a new required error before the user has
left the field or submitted the form.

Use persistent helper text only for information necessary to complete a field,
such as an accepted format. Write each supplied format hint as one concise,
action-oriented sentence in the same grammatical form; for example,
"Enter the date in YYYY-MM-DD format." Do not alternate capability statements
such as "You can use..." with entry instructions for the same form. Replace
the helper text with a field-specific error only when validation fails, and
use that same error text in the screen summary.

For Japanese format help, use either `［field］は［format］形式で入力してください。`
or `［field］は［characters］を使用して入力してください。` The sentence tells the
user what to enter; it never describes a capability as `使用できます`.

When most fields on a form are required, mark the optional labels instead. When
requiredness is selectively marked, place one visible textual Required token
in the error foreground directly in each required field label. That per-label
token is the complete requiredness explanation; use no extra asterisk legend.
Requiredness must also remain programmatically associated with its field.

For a form that mixes required and optional fields, implement this requirement
at the label itself: each required label contains its own `Required`/`必須`
marker and each optional label contains its own `Optional`/`任意` marker. The
marker is a child of the corresponding `<label>`, immediately after the field
caption, and the required marker consumes the resolved `error_foreground`
color. This direct label structure is the form-wide requiredness treatment;
do not substitute a group-level sentence such as "all fields except Notes are
required."

Create starts from product-supplied defaults or empty values. Edit starts from
the current supplied values and keeps record identity visible. Read-only,
create, and edit may share field meaning, but they do not share interaction
semantics.

# Product boundary

The product binding owns field inventory, captions, order, types, required
state, defaults, current values, help, validation, visibility, sensitivity,
permissions, and update source. Do not infer any of those facts from a fixture.

# Implementation boundary

The concrete read-only caption-column width, reading measure, single-line
control height, control width, breakpoint behavior, CSS, DOM structure beyond
required semantics, and framework are implementation decisions. A multi-column
form layout is not a generic density switch: it requires the supplied
related-field grouping above. This pack adds no field-layout configuration.
