# Fixed common-shell fixture

This fixture is an input to a `composition-with-fixed-shell` experiment. It is
not part of the UI Design Manifest and is not a design reference to reinterpret.

## Immutable assets

| File | SHA-256 |
| --- | --- |
| `shell-template.html` | `764E870E5DC584BAB41EF07220653AD98ACBC3A9769D31F678BDBF3A9AB7C21F` |
| `shell.css` | `577B2A080C1EB8272953617DDD3B344DD65D2A4D5FA5AE1D18973E9CDE8FE206` |
| `shell.js` | `AFFDECA06526580975C1F06DAE701EA4201D8D9CE54230B0934CB021BB46DCBD` |

For each run, copy `shell-template.html` to `index.html`, copy `shell.css` and
`shell.js` byte-for-byte, and insert the generated screen only at
`<!-- PAGE_SLOT -->` inside `<main class="shell-workspace">`.

Do not alter the Header, Drawer, navigation binding, theme or Drawer controls,
query-state behavior, or any markup outside that page slot. Add page-specific
styles only in `page.css` and page-specific behavior only in `page.js`. Those
files must not restyle or redefine the shell classes.

The fixture supports `?drawer=open|hidden&theme=light|dark`. It supplies the
Header/Drawer visual states; the screen in the page slot must fit within the
workspace in every supplied state. The Header is a complete shell-wide top band
above both Drawer and workspace. It is deliberately not a page-content
container and must not be restyled, constrained, offset, or replaced from page
CSS. The workspace is the only page-slot parent. A page may constrain its own
task panes within that workspace but must not make an element exceed the
workspace's available inline size.

The shared-shell root also supplies the complete canonical Light/Dark role
variables needed by the theme contract, including `action_*`, `table_header_*`,
`surface_background`, `text_primary`, and `link`. Page CSS must consume these
variables directly and must not redefine or alias their values.
