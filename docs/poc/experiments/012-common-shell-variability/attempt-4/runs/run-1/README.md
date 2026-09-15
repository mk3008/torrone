# Run 1 implementation

This run is a fresh static common-shell implementation from the frozen Manifest
snapshot and the fixed Japanese product request. It contains only the supplied
Header, Drawer/navigation-search fixture, and neutral numbered workspace.

Open `index.html` with these query parameters to inspect the initial states:

- `?drawer=open&theme=light`
- `?drawer=hidden&theme=light`
- `?drawer=open&theme=dark`
- `?drawer=hidden&theme=dark`

The Drawer search filters the supplied navigation fixture immediately, retains
the `グループ 01` parent when a child matches, provides a clear action, and
reports an explicit no-match state. The Header, Drawer list, and workspace use
separate scroll ownership; no external asset or network dependency is used.
