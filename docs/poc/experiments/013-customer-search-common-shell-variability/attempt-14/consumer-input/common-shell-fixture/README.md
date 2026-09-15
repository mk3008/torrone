# Fixed common-shell fixture

This fixture is an input to a `composition-with-fixed-shell` experiment. It is
not part of the UI Design Manifest and is not a design reference to reinterpret.

## Immutable assets

| File | SHA-256 |
| --- | --- |
| `shell-template.html` | `6F46D192CE447F70D8E2BC4DE1C3C0D8CFEE14A53B328E937B05DA76A10CE852` |
| `shell.css` | `991F6EA52ABFCF6B08FB068C26C5C19339F6B21F768776397B8584EDAD833522` |
| `shell.js` | `AFFDECA06526580975C1F06DAE701EA4201D8D9CE54230B0934CB021BB46DCBD` |

For each run, copy `shell-template.html` to `index.html`, copy `shell.css` and
`shell.js` byte-for-byte, and insert the generated screen only at
`<!-- PAGE_SLOT -->` inside `<main class="workspace">`.

Do not alter the Header, Drawer, navigation binding, theme or Drawer controls,
query-state behavior, or any markup outside that page slot. Add page-specific
styles only in `page.css` and page-specific behavior only in `page.js`. Those
files must not restyle or redefine the shell classes.

The fixture supports `?drawer=open|hidden&theme=light|dark`. It supplies the
Header/Drawer visual states; the screen in the page slot must fit within the
workspace in every supplied state.

The shared-shell root also supplies the complete canonical Light/Dark role
variables needed by the theme contract, including `action_*`, `table_header_*`,
`surface_background`, `text_primary`, and `link`. Page CSS must consume these
variables directly and must not redefine or alias their values.
