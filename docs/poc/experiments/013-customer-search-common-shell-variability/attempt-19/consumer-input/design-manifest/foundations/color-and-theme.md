---
type: UI Foundation
title: Color and theme
description: Semantic color roles and theme boundaries for a consistent business-app work surface.
status: draft
source: authored
scope: Visual themes applied to components and screen patterns in this pack.
requires:
  - foundations/accessible-work-surface
---

# Guidance

Define theme colors by semantic role rather than by component or literal hue.
This pack fixes a small role vocabulary and supplies editable concrete values
for each required mode in
[Theme colors](../configuration/theme-colors.md). Components consume the role
meaning; they do not choose a new literal color for each occurrence.

At minimum, distinguish page and raised surfaces, a result-grid header surface
and foreground, primary and muted text, subtle and interactive borders, action foreground and background, links,
selection foreground, background, and indicator, visible focus, and paired
foreground/background roles for success, information, warning, and error.
Apply the same role consistently across components. In particular, a result
grid's ordinary body uses `surface_background` and `text_primary`; the host
workspace uses `page_background`; and only its header uses the result-grid
header roles. Do not replace those roles with a literal per-screen table color.

# Required role application

Resolve the active mode once on the common-shell root, then expose every
resolved semantic role to its descendants. A component must consume the role
for its semantic job; it must not substitute a visually similar role or a
literal fallback value.

For every filled primary action, including Search, Create, Save, and another
product-declared primary command, set `background-color` from
`action_background` and `color` from `action_foreground`. Use the same two
roles in Light and Dark mode. Do not use `selection_indicator`, a status role,
or a literal `#fff`/`#000` as the primary-action foreground or background.

For every result Grid, set each `thead th` `background-color` from
`table_header_background` and `color` from `table_header_foreground`. Set each
ordinary `tbody td` `background-color` from `surface_background` and `color`
from `text_primary`. `page_background` is the workspace layer, not a Grid
header or ordinary Grid-body fill. These are fixed role-to-element mappings,
not optional visual variations or per-screen theme choices.

In a CSS custom-property implementation, declare the values corresponding to
the active palette before the component renders, then apply exactly:

```css
.primary-action {
  background-color: var(--action-background);
  color: var(--action-foreground);
}

thead th {
  background-color: var(--table-header-background);
  color: var(--table-header-foreground);
}

tbody td {
  background-color: var(--surface-background);
  color: var(--text-primary);
}
```

Selectors are implementation choices. When CSS custom properties are used,
the shared-shell root must define the canonical role variables
`--action-background`, `--action-foreground`, `--table-header-background`,
`--table-header-foreground`, `--surface-background`, and `--text-primary`
from the active resolved palette. Page-specific CSS must consume those
canonical variables directly. Do not copy a palette value into a page-local
custom property, create page-local aliases such as `--grid-surface-background`, or place
Light/Dark hexadecimal palette values in page-specific CSS: those approaches
stop a component from following a permitted theme-color override.

The role-to-element mapping, the canonical role variables, and their resolved
values are fixed requirements; they are not implementation choices.

# Standard button emphasis

Use one filled **primary** button for the one principal action in a task area.
It uses the resolved `action_background` and `action_foreground` pair. Use the
same standard **lower-emphasis** treatment for an independent or supporting
action such as a collection-scoped Add action: `surface_background`,
`border_interactive`, and `text_primary`, with a visible outline rather than a
second filled action. Keep its label typography, control height, and horizontal
padding treatment consistent with the primary action; only emphasis changes.

Use the error role only for a product-declared destructive action. A destructive
action that is not the task's principal action uses the lower-emphasis shape
with an error foreground/border; a destructive finalizing action may use the
filled treatment with a product-declared destructive palette. Do not infer a
danger action from an ordinary label.

This is fixed guidance, not button-style configuration. A product binding may
declare an action's availability, consequence, and hierarchy; when it
explicitly declares a different hierarchy, follow that declaration. It does not
permit a page to invent a new button appearance. Buttons that navigate remain
links unless the product declares an in-place action.

Treat `information` as a semantic status role, not as a substitute for the
action accent or selection role. A blue brand or action color does not
automatically make a surface informational. Likewise, success, warning, and
error colors do not create those states; they reinforce product-supplied state
meaning.

Keep content and controls readable at the contrast required by applicable
requirements. Do not use color as the only cue for status, selection,
validation, required state, current navigation, progress, or interactive
affordance. Pair color with text, shape, icon, position, border, or another
programmatically available cue.

Keep brand color separate from semantic status roles. Light and dark modes may
change a role's color value and surface-layer relationship, but must not change
its meaning or make the same color mean conflicting states. Preserve visible
boundaries where adjacent surfaces would otherwise merge.

This business-app pack requires both `light` and `dark` modes. Apply the same
semantic roles, content, task structure, available actions, and state meaning
in both modes. Do not infer high-contrast, tenant, or additional
user-selectable modes from either palette.

The product binding chooses one of three mode policies: `light-only`,
`dark-only`, or `selectable`. A single-mode policy exposes no selection
control. For `selectable`, expose the two supplied palettes and use `light` as
the initial mode unless the binding explicitly supplies another initial
preference. A mode policy changes which resolved palette is active; it does
not permit components to introduce their own literal colors or a third
palette.

The color-and-theme foundation does not decide whether a theme-selection
control appears in a Header, menu, settings screen, or host shell. That
placement, its visible caption, icon, and interaction model belong to the
Header or host-shell contract. If a product supplies a two-state icon-only
command, its accessible name must describe the next action. If it supplies
`system`, `light`, and `dark`, present the alternatives explicitly rather than
cycling an unlabeled button through three states. `system` resolves to one of
the two required palettes; it is not a third palette.

# Configuration boundary

The concrete `#RRGGBB` values for all required roles and modes are
manifest-owned configuration. The values in
[`theme-colors.default.yaml`](../configuration/theme-colors.default.yaml) are
maintainable defaults for this business-app pack, not universal design truths.
A manifest consumer may replace them through one reviewed local theme-color
override while preserving every role ID and meaning.

A theme does not create a status, selection, permission, action, or business
meaning. Changing a value changes presentation only. Changing, removing, or
repurposing a role changes the contract.

# Product boundary

The product binding owns theme identity, the available mode-selection
capability, selectable preferences, initial preference source, persistence,
brand constraints, and additional applicable requirements. It does not own or
override the concrete role values. An arbitrary in-application color editor is
a separate product capability and is not implied by the editable manifest.

# Implementation boundary

CSS custom-property names, theme loading, system-preference integration,
fallback behavior, transition behavior, and framework are implementation
decisions. The implementation must apply the resolved manifest values without
changing their semantic roles. Verify both required modes and every state
combination. A static application specimen is illustrative evidence, not
contrast or assistive-technology certification.
