---
type: UI Foundation
title: Iconography
description: Stable visual responsibilities for common-shell icons without mandating an icon source or runtime.
status: draft
source: authored
scope: Icons in this business-app standard pack.
---

# Guidance

Use stable semantic responsibilities for familiar common-shell controls. This
pack does not mandate an icon library, icon catalog, SVG source, or framework.
When a product, implementation constraint, or request names an icon library or
an established local icon system, use that system's icon for the semantic role.
When none is named, the implementation may select a familiar equivalent that
renders the supplied meaning clearly. Preserve the accessible name and tooltip
of an icon-only control.

For the two Drawer state controls, use a complete left-panel shape with a
clearly directional chevron. While the Drawer is visible, use a left-pointing
close direction; while it is hidden, use a right-pointing open direction. Keep
the panel shape and direction legible as one familiar action glyph at the
rendered button size.

For common-shell controls, use these visual meanings:

| Responsibility | Visual meaning | When used |
| --- | --- | --- |
| Reveal a hidden left Drawer | Complete left panel with a right-pointing chevron | The available Drawer is hidden. |
| Hide a visible left Drawer | Complete left panel with a left-pointing chevron | The available Drawer is visible. |
| Search the local Drawer navigation | Watermark placeholder text | In the supplied navigation-search field. |
| Show an expanded parent navigation group | Downward chevron | On the supplied parent group's trailing disclosure. |
| Show a collapsed parent navigation group | Right-pointing chevron | On the supplied parent group's trailing disclosure. |
| Switch from Light to Dark | Moon glyph | While Light is active. |
| Switch from Dark to Light | Sun glyph | While Dark is active. |

An icon-only control still needs an accessible action name and a matching
tooltip. Use a moon or sun glyph for the available next theme mode rather than
an ambiguous half-filled theme glyph. Leave familiar icon-only global controls
without an extra visible textual caption.

# Product boundary

The product binding owns whether an icon-bearing action exists, its actual
availability, its command, and any domain-specific icon meaning. This
foundation supplies visual responsibilities only for the stable common-shell
controls; it does not manufacture a product action or an icon library
dependency.

# Non-goals

This foundation sets no icon size, stroke width, color, library dependency,
CSS, DOM, framework, external asset policy, or icon implementation method. The
Drawer-control legibility requirement prevents malformed or ambiguous output;
it does not require a particular package or delivery mechanism.
