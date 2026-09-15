---
type: UI Foundation
title: Iconography
description: Stable semantic names for common-shell icons without mandating an icon runtime.
status: draft
source: authored
scope: Icons in this business-app standard pack.
---

# Guidance

Use canonical Lucide icon names as the pack's semantic
vocabulary. The names identify the intended familiar glyph; they do not require
an application to install Lucide, load an external asset, or use a particular
framework. An implementation may use its local icon system only when it renders
the same named meaning and preserves the accessible name and tooltip of an
icon-only control.

For the two Drawer state controls, preserve the canonical visual geometry as
well as the name. `PanelLeftClose` is a complete rectangular application panel
with a narrow leading left pane and a clearly left-pointing chevron in the
remaining pane: it means that the currently visible left Drawer will close.
`PanelLeftOpen` uses the same complete panel geometry with a clearly
right-pointing chevron: it means that a hidden left Drawer will open. When a
local inline SVG is needed, use the canonical Lucide SVG for that name (or an
exact local equivalent), not an approximate reconstructed icon. Do not replace
either glyph with a generic `Menu`, a two-pane rectangle without a directional
chevron, a standalone chevron, a bookmark-like shape, or a panel whose chevron
points in the opposite action direction. Keep the panel outline and directional
chevron legible as separate strokes at the control's rendered size.

For common-shell controls, use these names:

| Responsibility | Icon name | When used |
| --- | --- | --- |
| Reveal a hidden left Drawer | `PanelLeftOpen` | The available Drawer is hidden. |
| Hide a visible left Drawer | `PanelLeftClose` | The available Drawer is visible. |
| Search the local Drawer navigation | `Search` | Always leading inside a supplied navigation-search field. |
| Clear a nonempty navigation-search field | `X` | Only while the field has a value. |
| Show an expanded parent navigation group | `ChevronDown` | On the supplied parent group's trailing disclosure. |
| Show a collapsed parent navigation group | `ChevronRight` | On the supplied parent group's trailing disclosure. |
| Switch from Light to Dark | `Moon` | While Light is active. |
| Switch from Dark to Light | `Sun` | While Dark is active. |

An icon-only control still needs an accessible action name and a matching
tooltip. Do not substitute an ambiguous half-filled theme glyph or a generic
`Menu` glyph for the Drawer state controls. Do not add a visible textual
caption merely to explain a familiar icon-only global control.

# Product boundary

The product binding owns whether an icon-bearing action exists, its actual
availability, its command, and any domain-specific icon meaning. This
foundation supplies names only for the stable common-shell responsibilities;
it does not manufacture a product action or an icon library dependency.

# Non-goals

This foundation sets no icon size, stroke width, color, icon-library
dependency, CSS, DOM, framework, or external asset policy. The canonical
Drawer-control glyph requirement prevents semantic ambiguity; it does not
require a particular SVG package or delivery mechanism.
