# Fixed common-shell fixture

This fixture preserves the structure, interactions, and page-slot boundary of
Common-shell Attempt 22, Run 1. Its shell CSS is normalized to expose the
complete resolved semantic palette required by the current Manifest; the
shell script remains unchanged. Only the workspace dummy-content slot is
replaced with the explicit `<!-- PAGE_SLOT -->` integration point. The
original dummy-content target is kept as an explicitly non-rendered
compatibility element.

| Asset | SHA-256 |
| --- | --- |
| `shell.css` | `8A10A6C1F038C61DB16E2001EF26A7221A32D1AF54D4DBDEC48E9ED39DA2E3A2` |
| `shell.js` | `1753A5FC9FE19B73878D55C893F63F781F00B83A778D2657763F322909967565` |

The fixture owns Header, Drawer, fixed-header behavior, independent Drawer and
workspace scrolling, menu search, Drawer disclosure, current menu selection,
and light/dark theme switching. Implementations may write only page content in
the page slot plus `page.css` and `page.js`.
