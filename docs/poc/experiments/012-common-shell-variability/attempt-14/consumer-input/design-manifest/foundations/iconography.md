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

This foundation sets no icon size, stroke width, color, library, SVG source,
CSS, DOM, framework, or external asset policy.
