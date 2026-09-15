# Configuration

- [Record-list options](record-list-options.md) - The finite, shared vocabulary for the searchable record-list slice.
- [Theme colors](theme-colors.md) - Editable concrete Light and Dark values for the fixed semantic color roles.
- [Theme color defaults](theme-colors.default.yaml) - The canonical palette resolved before an optional local theme-color override.

Resolve each definition's pack defaults with at most one sibling local override.
A record-list override and one theme-color override may coexist because they
belong to separate definitions. An override may reference only defined IDs and
allowed values; it cannot add a feature, route, permission, state, data value,
aggregate meaning, displayed business language, semantic color role, or mode.

Record create, read, edit, delete, Dialog, Confirmation, Wizard, Dashboard,
and accessibility add no configuration in this pack version. Color and theme
adds only the bounded role-value configuration above. Theme selection
capability and persistence remain product binding; control placement and
rendering remain Header/host-shell and implementation decisions.

Use the [fixed and variable responsibility map](../variability.md) to locate
product-owned values and implementation-only choices without turning them into
local settings.
