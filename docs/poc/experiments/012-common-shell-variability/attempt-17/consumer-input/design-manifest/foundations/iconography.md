---
type: UI Foundation
title: Iconography
description: Stable visual responsibilities for common-shell icons without mandating an icon source or runtime.
status: draft
source: authored
scope: Icons in this business-app standard pack.
---

# Guidance

Use stable visual responsibilities for familiar common-shell controls. This
pack does not name an icon library, icon catalog, SVG source, or framework. An
implementation may use its local icon system when it renders the supplied
meaning clearly and preserves the accessible name and tooltip of an icon-only
control.

For the two Drawer state controls, use a complete left-panel shape with a
clearly directional chevron. While the Drawer is visible, use a left-pointing
close direction; while it is hidden, use a right-pointing open direction. The
panel outline, its leading-pane divider, and its directional chevron must all
remain fully inside the rendered icon canvas, uncut and non-overlapping, so the
control reads as one legible panel action at its actual button size. Do not
substitute a generic `Menu`, a two-pane rectangle without a directional
chevron, a standalone chevron, a bookmark-like shape, or a panel whose chevron
points in the opposite action direction.

For common-shell controls, use these visual meanings:

| Responsibility | Visual meaning | When used |
| --- | --- | --- |
| Reveal a hidden left Drawer | Complete left panel with a right-pointing chevron | The available Drawer is hidden. |
| Hide a visible left Drawer | Complete left panel with a left-pointing chevron | The available Drawer is visible. |
| Search the local Drawer navigation | Magnifier | Always leading inside a supplied navigation-search field. |
| Clear a nonempty navigation-search field | Clear mark | Only while the field has a value. |
| Show an expanded parent navigation group | Downward chevron | On the supplied parent group's trailing disclosure. |
| Show a collapsed parent navigation group | Right-pointing chevron | On the supplied parent group's trailing disclosure. |
| Switch from Light to Dark | Moon glyph | While Light is active. |
| Switch from Dark to Light | Sun glyph | While Dark is active. |

An icon-only control still needs an accessible action name and a matching
tooltip. Do not substitute an ambiguous half-filled theme glyph or a generic
`Menu` glyph for the Drawer state controls. Do not add a visible textual
caption merely to explain a familiar icon-only global control.

# Product boundary

The product binding owns whether an icon-bearing action exists, its actual
availability, its command, and any domain-specific icon meaning. This
foundation supplies visual responsibilities only for the stable common-shell
controls; it does not manufacture a product action or an icon library
dependency.

# Non-goals

This foundation sets no icon size, stroke width, color, icon-library
dependency, CSS, DOM, framework, or external asset policy. The Drawer-control
legibility requirement prevents malformed or ambiguous output; it does not
require a particular SVG package or delivery mechanism.
