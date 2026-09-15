---
type: UI Component
title: Result grid
description: A scan-oriented result presentation that keeps data meaning product-owned.
status: draft
source: authored
scope: Declared record result sets in the example search/list workflow.
requires:
  - foundations/layout-panes
  - configuration/record-list-options
---

# Guidance

Keep each row's scanning cues and available operation associated with the same record. Reserve the strongest row-level treatment for one frequent operation; use an overflow presentation only when the product has multiple low-frequency operations. Do not decide which columns, records, values, statuses, row count, loading state, permission state, selection model, or sort model exist: those belong to product binding.

When the binding supplies multi-selection, use a leading checkbox column and make
selected and unselected rows distinguishable without relying on color alone. Do
not add visible `Select` or `Selected` text next to every checkbox merely to
demonstrate its state; the control's accessible name remains binding-owned. A
header checkbox is permitted only when the binding also supplies select-all
availability. When selection is absent, omit the selection column and selected
row treatment entirely.

When the binding supplies a sort model, show its active direction in the
corresponding column header. Do not put an active sort choice in detached page
chrome, and do not persist sort indicators for inactive columns. When sorting
is absent, do not infer a sortable header or direction state.

Let the host assign the Grid's named result pane and outer spacing. In Search
with grid, that result pane is fluid. Keep meaningful columns at widths
appropriate to their role rather than stretching them merely to fill the Grid.
If the assigned width has residual space, use one trailing, presentation-only
empty column; it has no label, value, operation, sort state, selection meaning,
or responsive behavior.

Use a tone-distinct header row to separate the column labels from the result
body. Resolve `table_header_background` and `table_header_foreground` from the
active theme and apply those exact values to the header row. Resolve
`surface_background` and `text_primary` from the same active theme and apply
them to every ordinary body cell as an opaque data surface. In a CSS table,
assign `background-color: var(--surface-background)` and
`color: var(--text-primary)` to each `tbody td`; declare those custom
properties from the resolved active-theme values before rendering the table.
Assign `background-color: var(--table-header-background)` and
`color: var(--table-header-foreground)` to each `thead th`. This keeps the
data surface visually separate from the workspace without inventing
per-screen colors. Use one horizontal row separator to preserve scan tracking.
Keep ordinary grid cells free of vertical dividers by default so the row
separator remains the scan cue. Place the grid directly in its assigned
content region; add an outer boundary only when it separates the grid from
adjacent, product-supplied content without creating unused interior space.

Represent one product-declared attribute in each ordinary grid cell. Do not
combine an identifier with a title, or otherwise combine two independent
business attributes, merely to make the grid narrower or more decorative. A
binding may explicitly request a composite cell only when it supplies the
constituent attributes, their hierarchy, and the scanning reason; otherwise
preserve separate columns and values.

Keep the result title and any product-declared count in one compact summary
immediately above the grid. When `result_count_presentation: summary` resolves
and the binding supplies an aggregate, render the count immediately after the
result title on the same heading line. Do not detach it to a far edge or give it
a separate heading line. Do not show a query or filter summary by default. If
the binding supplies an applied-query summary with its meaning, show that
summary on the following line; it describes the result set, rather than
restating editable fields, teaching a visible action, or inventing text such as
an implied current filter. Place an operation that acts on the
visible result collection in the result Grid's adjacent toolbar or action zone,
rather than in unrelated page chrome. Make that toolbar a full-width structural
row of the same result pane as the Grid, and keep its outer inline width equal
to the Grid's. Keep the toolbar associated with the result title and summary,
rather than separating the title from an unrelated instruction at the opposite
edge. When the binding declares that an action creates or otherwise changes the
visible result collection, place it once at the logical end of that
result-summary action zone. The compact action group has its natural width
inside the fluid result-toolbar row. When the binding instead declares
page-level scope, place it in the page header. The binding owns that scope; do
not infer it from an action label or static fixture.
For a collection action in a screen that already has a primary Search action,
use the pack's lower-emphasis outlined or tertiary button treatment rather than
introducing a second primary button. A different supplied action hierarchy may
justify another treatment, but it must be explicit in the binding.

When one frequent operation opens a record and the binding supplies a stable,
human-recognizable primary identifier or title, prefer that leading identity
cell as the record-opening link. Do not add a second trailing `Details` link
only to demonstrate navigation. If the binding does not supply a suitable
identity link, use the configured row-action presentation in a logical-end
action column. Keep destructive or multiple low-frequency row operations
separate from the primary record-opening treatment and use the existing
overflow rule when it applies.

# Horizontal overflow and pinned context

When a Grid needs horizontal scrolling, preserve the minimum row context that
lets a user recognize and operate on the visible row. Keep the leading
selection column pinned at the logical start when selection is supplied. Keep
the leading primary record-identity column pinned immediately after it when
the Grid supplies an identity link. If selection is absent, pin only that
primary identity column. The resulting pinned start strip is therefore one or
two columns by default, never an arbitrary prefix of ordinary data columns.

Use a sticky/frozen implementation inside the Grid's horizontal scroll
container. Give pinned cells an opaque resolved surface and a visible boundary
from the scrolling data so content cannot show through or appear as one
overlapping column. Draw that boundary with the same token and thickness as the
Grid's horizontal row separator; do not use a permanently thicker divider and
do not omit the boundary. At the initial horizontal position (`scrollLeft = 0`),
render the pinned strip with **no box shadow**: the one-pixel separator is the
only boundary. Apply a subtle shadow only after the Grid's own horizontal scroll
position is greater than zero, when scrolling data is actually behind the
pinned strip. Remove that shadow again when the Grid returns to its initial
horizontal position. Derive this visual state from the Grid scroll container,
not merely from the fact that the table can overflow; a scroll-state class or
equivalent stateful mechanism is required. The exact CSS, z-index, framework,
and event mechanics are implementation decisions.

An overflow menu or destructive/action column is not a reason to add another
leading pinned column. Keep low-frequency or destructive row actions at the
logical end. If product requirements say that a logical-end action must remain
available while horizontally scrolling, pin the single supplied action column
at the logical end instead. Do not pin it merely because it uses a three-dot
control.

The product binding owns the real column IDs and whether selection, the
identity link, or an always-available end action exists. It therefore supplies
the exact members of the one-or-two-column start strip and any exceptional
single end action. This is not a general pinning configuration and must not
create a column, an operation, or a selection capability. Do not fix enough
columns that their combined width leaves no useful scrolling data area.

Keep the Grid body as the only horizontally scrolling part of a result
presentation. The Grid body scroll container encloses one complete Grid table:
its column header and every data row scroll together on the same horizontal
axis. Do not make only `tbody` scroll while leaving the column header in a
separate width context. Put the result title/count and collection toolbar in a
non-scrolling result header region immediately above it. Put pagination in a
non-scrolling result footer immediately below it. The header and footer use the
outer width of the result pane, while the table may have a larger intrinsic
minimum width inside its local scroll container. Do not put the toolbar or
pagination inside the table scroll container, and do not make the page or
shared Header horizontally scroll with Grid columns.

# Avoid

Do not use a presentation setting to turn an absent action into an available one, or to hide the only frequent action behind an overflow menu. Do not invent selection, select-all, sorting, or column semantics from a static fixture.

# Relationships

The [searchable record list](../screen-patterns/record-list.md) supplies the screen role. The [list-to-detail flow](../flows/list-to-detail.md) governs an available `open_record` operation.
