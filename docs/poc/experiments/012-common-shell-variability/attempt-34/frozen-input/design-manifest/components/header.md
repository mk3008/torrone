---
type: UI Component
title: Header
description: The common-shell region that identifies the workspace and hosts available global controls.
status: draft
source: authored
scope: Desktop business-app work surfaces that use the standard common shell.
---

# Guidance

Use a Header as the default common-shell region for this business-app pack. It
identifies the product or workspace and provides a stable home for an available
global control. It is not a duplicate page header: the Header identifies the
application or workspace, while the [page header](page-header.md) identifies
the current task or destination.

Render the Header as the shared shell's fluid top band. It spans the full
available inline width above the Drawer and workspace, and it owns its own
leading, identity, and logical-end control areas. Do not wrap it in a page
content maximum, a centered form container, or a bounded task pane. When an
available Drawer is open, it begins below the Header and changes only the
workspace width; it does not make the Header narrower, offset, or bounded.

When the product binding declares an available Drawer, place its controller in
the leading Header area. Keep the controller visually associated with the
Header in both visible and hidden Drawer states. The controller does not make
the Drawer, its navigation items, or any route available. The
[Drawer](drawer.md) remains responsible for its available navigation content.
Use the [icon vocabulary](../foundations/iconography.md): a complete
left-panel control with a left-pointing close direction while the Drawer is
visible, and the corresponding right-pointing open direction while it is
hidden. Use one familiar, legible panel-control glyph that communicates the
available action at its rendered size. The controller's accessible name and
tooltip name the available action: "Open navigation" or "Close navigation".
Keep the icon in an icon-only button with the pack's visible focus treatment.
When that controller is activated, make the supplied Drawer body visibly
appear or disappear while preserving the workspace's current content and task
state. The action changes the workspace's available inline width only as the
consequence of the Drawer body's visibility; it does not hide, replace, or
turn the workspace itself into the controlled panel.

Keep the shared Header available while the workspace scrolls. The Header is a
shell control region, not document content: it remains at the top edge of the
application viewport so an available Drawer controller and other supplied
global controls do not scroll away with a long task. A sticky or fixed
implementation may provide this behavior; the implementation must reserve the
Header's occupied space and must not overlap the first workspace content. Do
not put page-specific finalizing actions into the persistent Header merely
because it remains visible.

Keep a supplied workspace identity stable across a shared shell. Do not turn
the Header into a second navigation list, a record-specific action bar, a
decorative banner, or a place to repeat the page title. Place a theme-selection
control here only when the product binding declares the selectable theme mode;
otherwise do not infer one.

# Theme application

The Header consumes the resolved semantic palette. Use `surface_background`
for its background, `text_primary` for its ordinary content, and
`border_subtle` when a boundary is needed. Every available icon-only Header
control uses `surface_background` for its surface, `text_primary` for its
glyph, and a visible `border_interactive` boundary in every supported theme;
it also consumes the pack's visible focus treatment. Do not introduce a
separate brand, dark, or literal Header color merely to make the shared shell
look more prominent.

Apply the resolved `text_primary` foreground to the Header itself; do not rely
on an ancestor's inherited foreground across a theme change. Activate the
selected palette on the shared-shell root that contains the page and Header,
so their page/surface/text roles resolve from the same mode.

Apply that resolved foreground to the supplied workspace identity and every
other readable Header label as well as to the Header region. In each supported
theme, the identity and every available control glyph remain recognizable
against their own resolved surfaces at rest; a visible boundary, focus state,
or tooltip supplements but does not replace that resting-state legibility.

When the product binding declares a selectable light/dark mode, place the
available selection control at the logical end of the Header. For a supplied
two-state command, use an icon-only control whose accessible name and familiar
glyph describe the next mode: use a moon glyph while Light is active and a sun
glyph while Dark is active. Do not use an ambiguous half-filled theme glyph; do not add a
visible `Theme` caption. Give the control a matching tooltip and the pack's
outer `focus_ring` treatment. Apply every resolved palette role, including
Header roles, when the mode changes. A Header control does not create
selectable-theme capability, an initial preference, or persistence.

# Product boundary

The product binding owns the workspace identity, whether the common Header is
replaced by another approved shell, the available global controls, the
available Drawer and its state, navigation items, destinations, permissions,
and any theme-selection capability. The default Header does not invent any of
those values.

# Non-goals

This component sets no Header height, responsive behavior, breakpoint,
keyboard behavior, animation, CSS, DOM, route, or framework.
