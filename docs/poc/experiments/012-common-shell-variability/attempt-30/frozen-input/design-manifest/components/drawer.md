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
current one. Use the product binding's single supplied current destination to
apply a square-cornered, full-row selection surface with
`selection_background`, a type-weight difference, and a leading
`selection_indicator` fixed to the Drawer’s physical left edge. The indicator
never follows a child indentation lane. A selected child keeps the same nested
label start as its unselected child siblings; the selection surface and leading
indicator must not remove that hierarchy indentation. The expanded parent
immediately above preserves the supplied hierarchy context. Unselected items use the
ordinary Drawer surface; do not give them a competing filled background. Do
not add visible `Current` copy merely to demonstrate state. The binding
supplies whether a current destination exists and which item it is; the pack
supplies this conditional selection treatment and does not turn it into a
Drawer configuration value or a fixed item default.

When an available navigation item is activated for its supplied destination,
the product navigation state replaces the binding's current-destination value
with that destination and transfers the selection treatment to exactly that
item. The item's hierarchy, including its label indentation, continues to come
only from its supplied parent/child relationship: activating an item never
adds, removes, or changes indentation. In particular, an activated leaf keeps
its ordinary leaf label start; selection never makes a leaf look like a child.
Keep selected and unselected rows of the same supplied hierarchy level in the
same layout geometry, including label start and padding. Apply current-item
treatment as a paint layer only: the full-row selection surface, type weight,
and physical-left indicator may change, but they must not add a hierarchy-like
inset or otherwise shift the label. Expose the binding's one current destination
semantically as the current navigation item as well as visually.
A product without a supplied current destination renders no current-item
treatment.

Do not confuse Drawer visibility with hierarchy disclosure. Visibility concerns
whether the available Drawer region is shown; a disclosure concerns a supplied
parent/child navigation relationship. Neither fact creates the other. For a
supplied disclosure parent, use the complete parent row as one disclosure
control. Keep its children visibly nested and place a trailing downward chevron
when that parent is expanded or a right-pointing chevron when it is collapsed.
Do not place that affordance on a leaf item, and do not invent nesting, an
expansion state, or a disclosure icon when the binding does not supply
hierarchy. Disclosure activation changes only that parent's supplied
expanded/collapsed state: expanding or collapsing a parent never creates
current-item treatment, and it never clears, replaces, or otherwise changes
the binding's current destination or its one current-item treatment. If the
current item is hidden because its ancestor is collapsed, retain the
current-destination value; when the ancestor is expanded again, restore the
same item's selection treatment with its unchanged hierarchy indentation.

When the product binding declares that navigation search is available, put one
labelled text field at the top of the Drawer, before its scrollable navigation
list. Use a concise local-scope label and a watermark placeholder that names
the matching scope without repeating the label. Render the field as one
ordinary editable control with its ordinary field boundary and the pack's
existing outer focus treatment; do not place a second text box or a duplicate
clear affordance inside that control. It filters the complete supplied Drawer
hierarchy as the user types and has no separate submit action. Match supplied
parent labels as well as child and leaf labels. Retain a matching child's
supplied parent context so a result never loses its hierarchy, and show an
explicit no-matches state when nothing matches. Navigation search is a discovery aid,
not a substitute for concise, task-oriented navigation or an invented item.

Treat an available navigation search as one complete interaction, not as a
labelled static field. Changing the field updates the visible list and the
no-matches state; clearing the field restores the unfiltered list. Rendered
examples show the filtered, no-match, and restored states. This specifies
interaction structure, not a runtime, framework, or new configuration value.

Give an available Drawer one finite vertical region below the shared Header.
Keep the Drawer search region and any supplied Drawer identity region visible
above its navigation list. Give that list the remaining available height as
the Drawer’s only vertical scroll region, so a long supplied list scrolls
without moving the Header, the search region, or the workspace's current
vertical position. Keep supplied hierarchy to two visible
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
