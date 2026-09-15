---
type: UI Foundation
title: Compact work surface
description: A restrained density principle for frequently scanned and maintained operational records.
status: draft
source: authored
scope: Desktop record lists, record detail, and record forms in the example workspace.
---

# Guidance

Keep primary identifiers, supplied status, and the next likely action visible
during scanning. Express supplied importance through a restrained type
hierarchy; do not enlarge an ordinary value merely because space is available.
Use headings, type weight, alignment, and restrained spacing before adding a
line or container. Do not put every field in its own card, bordered cell, or
oversized grid area.

For a compact section inside a frequently scanned desktop task, use one
consistent heading group: show the section heading first and, when it adds
meaning, show its supporting description on the next line. Omit the optional
description when the heading, visible data, and controls already make the
section's purpose clear. A count or status that directly qualifies the heading
may remain with it; do not spend a separate line on a decorative label that
merely restates the section name.

For read-only records, keep related keys and values in a compact vertical
sequence with a bounded reading measure. Do not stretch a small field set
across the viewport or use equal-width cells simply to consume available
space. Use separators only when they materially help associate a row with its
action or prevent adjacent groups from merging. A section heading does not
also need an enclosing border when its weight and spacing already establish
the group.

If the detail surface needs stronger containment against a distinct workspace,
prefer one restrained summary-card-like container around the record rather than
many cards inside it. Use hierarchy and measure to show what matters first,
then keep secondary metadata quieter instead of giving every field block the
same footprint.

For forms, keep the label, control, help, and error for one field together.
Use one consistent single-line control height within the screen. Do not create
misaligned rows by pairing an unrelated field with a field that has help or
error content.

# Unresolved

No numeric spacing scale, control-height token, or viewport breakpoint is
prescribed. Derive those choices from the current product implementation and
observed content while preserving the fixed density and alignment guidance.
