---
type: UI Foundation
title: Layout panes and alignment
description: A small, repeatable set of bounded and fluid task regions that gives operations pages stable widths and alignment edges.
status: draft
source: authored
scope: Desktop workspace pages, their task regions, and the toolbars that act on them.
---

# Guidance

Do not make every desktop task consume all available browser width, and do not
let each page invent an unrelated maximum width. Compose the workspace from one
shared page grid and two named content-pane behaviors: **bounded** and
**fluid**. The page grid provides the workspace's outer margins and maximum
extent; a content pane provides the local width and alignment boundary for one
coherent task.

Treat the common shell and page content as different layout owners. The Header
is a shell-global, fluid horizontal band: it spans the full available inline
width of the shared shell, above both the Drawer track and the workspace. It
must not inherit a page maximum width, a bounded form width, or a centered
content wrapper. The Drawer, when supplied, is a sibling track below that
Header; it reduces the workspace's available width but never narrows or
re-centers the Header. Put page grids and their content panes only inside the
workspace.

A bounded pane keeps reading, entry, and related task controls within one
shared constrained measure. Use it for a record read, create, edit, a search
conditions region, or another task whose labels, help, values, and errors must
be read as one vertical unit. A bounded pane may use a maximum inline size, but
that maximum is one implementation-wide layout token or grid span, not a
different arbitrary value on every screen. Make the pane `width: 100%` up to
that maximum and use `box-sizing: border-box` for the pane, its field group,
and its controls. A field, field group, action row, or border must never
extend beyond the bounded pane's inline edges.

A fluid pane uses the available inline width of the page grid for dense,
repeated comparison or collection work. Use it for a result grid, its summary,
its collection toolbar, and its continuation footer. Fluid does not mean that
each cell or control stretches: columns retain their assigned roles and action
groups retain their natural content width.

A screen may compose panes. In Search with grid, put the search conditions and
their action toolbar in one bounded condition pane, then put the result summary,
result grid, collection toolbar, and pagination footer in one fluid result
pane. Do not widen a condition pane merely because a later result grid is
fluid, and do not narrow a result toolbar or pagination footer merely because
the preceding conditions are bounded.

## Viewport and overflow policy

Resolve width ownership before choosing a responsive behavior. The shared shell
owns the browser's full inline width; the Header uses that shell width. The
workspace owns the inline width remaining after an available Drawer track; page
content panes use the workspace width, not the raw browser width. Hiding the
Drawer gives the workspace the full shell width, but does not change the Header
into a page-owned or bounded element.

For a bounded condition pane, use its shared maximum only while that maximum
fits inside the available workspace. When workspace width becomes smaller,
clamp the pane to that available width and reflow the fields to fewer columns
before any control, border, or action row would overflow. Keep the caption,
field grid, and condition-action toolbar at the same bounded inline edges. Do
not introduce horizontal scrolling for the conditions region or for the page
merely to preserve a multi-column field layout.

For a fluid result pane, its result summary, collection toolbar, Grid scroll
container, and pagination footer occupy the available workspace width. The
result pane has three structural regions: a non-scrolling header region for the
summary and collection toolbar; the Grid body; and a non-scrolling footer
region for pagination. A Grid whose meaningful columns do not fit may retain
its content minimum width, but only the Grid body receives `overflow-x: auto`
or an equivalent local horizontal scroll container. That Grid container wraps
the complete table, including its column header and data rows, so the two share
one horizontal axis. Do not give the document,
shared shell, Header, condition pane, result toolbar, or pagination footer that
horizontal overflow. This keeps result actions and continuation controls within
the visible result pane while data columns can be inspected.

Pinned Grid columns belong inside that Grid-body scroll container only. They do
not make the result header or footer scroll, and they do not alter the Header's
shell-global width. Use the result pane's outer inline edges for its toolbar and
pagination; never use the intrinsic minimum width of the Grid table to place
those controls.

The page implementation must not restyle the shared shell, Drawer track, or
workspace container to achieve this policy. In particular, do not assign
`overflow`, `overflow-x`, a page maximum, or a replacement width to the shared
workspace from page CSS. The fixed shell owns those containers; the page owns
only its bounded condition pane, fluid result pane, and the result Grid's local
scroll container.

Every referenced `start`, `center`, or `end` position resolves inside the named
pane that owns the affected task. `end` means the logical inline end of that
pane: right in a left-to-right interface and left in a right-to-left interface.
It never means the browser edge, the Drawer edge, or the edge of an arbitrary
inner wrapper. A toolbar is a full-width structural row of its owning pane;
place its compact control group inside that row at the resolved logical
position.

Use the same pane edge for a collection and the controls that act on it. A
result toolbar is immediately associated with its result summary and grid; a
pagination footer is directly below that grid and has the same inline width.
Keep the controls inside either bar at their natural width. The existing
`pagination_region` setting selects the control group's position inside the
result-pane footer; it does not select a different width for pagination.

When a result grid is intentionally placed inside a Dialog, Drawer, or other
bounded parent surface, the result pane inherits that parent surface's bounded
width. Its toolbar and pagination still match the grid width. The component
does not choose an independent width.

# Required structural mapping

For a desktop Search with grid implementation, use this ownership structure:

1. `shared shell` owns the full-width Header and the optional Drawer/workspace
   split.
2. `workspace page grid` owns the page's outer gutters and maximum extent.
3. `bounded condition pane` owns the caption, fields, and the separate
   condition-action row; every one of those elements uses the same inline
   boundary.
4. `fluid result pane` owns the result summary, result toolbar, Grid, and
   pagination footer; every one of those elements uses the same outer inline
   boundary. Only the Grid body may become a local horizontal scroll container.

Do not place a bounded condition pane in an extra panel merely to distinguish
it from a fluid result pane. The difference is its width contract, not an
additional decorative surface.

# Implementation boundary

The grid column count, gutter, exact maximum sizes, breakpoint values, CSS
token names, DOM, and framework remain implementation decisions. The fixed
requirements are the two pane behaviors, their task-to-pane relationships, and
the ownership rule used to resolve alignment.
