# Fixed common-shell fixture

This fixture reuses the generated source of Common-shell Attempt 22, Run 1.
Only the workspace dummy-content slot is replaced with the explicit
`<!-- PAGE_SLOT -->` integration point. The original dummy-content target is
kept as an explicitly non-rendered compatibility element for the unchanged
Run 1 script; `shell.css` and `shell.js` are copied byte-for-byte from that
Run.

| Asset | SHA-256 |
| --- | --- |
| `shell.css` | `F67F4951B463B58C787C65AF81C12ECAFFFF4CEF93817783BF6AF24ACD22FBEB` |
| `shell.js` | `1753A5FC9FE19B73878D55C893F63F781F00B83A778D2657763F322909967565` |

The fixture owns Header, Drawer, fixed-header behavior, independent Drawer and
workspace scrolling, menu search, Drawer disclosure, current menu selection,
and light/dark theme switching. Implementations may write only page content in
the page slot plus `page.css` and `page.js`.
