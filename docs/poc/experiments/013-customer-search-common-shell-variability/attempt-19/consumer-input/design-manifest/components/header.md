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

Keep a supplied workspace identity stable across a shared shell. Do not turn
the Header into a second navigation list, a record-specific action bar, a
decorative banner, or a place to repeat the page title. Place a theme-selection
control here only when the product binding declares the selectable theme mode;
otherwise do not infer one.

# Theme application

The Header consumes the resolved semantic palette. Use `surface_background`
for its background, `text_primary` for its ordinary content, and
`border_subtle` when a boundary is needed. A Header controller uses the same
surface/text roles and `border_interactive` when it needs a visible boundary.
Do not introduce a separate brand, dark, or literal Header color merely to
make the shared shell look more prominent.

Apply the resolved `text_primary` foreground to the Header itself; do not rely
on an ancestor's inherited foreground across a theme change. Activate the
selected palette on the shared-shell root that contains the page and Header,
so their page/surface/text roles resolve from the same mode.

When the product binding declares a selectable light/dark mode, place the
available selection control at the logical end of the Header. For a supplied
two-state command, use an icon-only control whose accessible name describes
the next mode; do not add a visible `Theme` caption. Apply every resolved
palette role, including Header roles, when the mode changes. A Header control
does not create selectable-theme capability, an initial preference, or
persistence.

# Product boundary

The product binding owns the workspace identity, whether the common Header is
replaced by another approved shell, the available global controls, the
available Drawer and its state, navigation items, destinations, permissions,
and any theme-selection capability. The default Header does not invent any of
those values.

# Non-goals

This component sets no Header height, sticky behavior, responsive behavior,
breakpoint, keyboard or focus behavior, animation, CSS, DOM, route, or
framework.
