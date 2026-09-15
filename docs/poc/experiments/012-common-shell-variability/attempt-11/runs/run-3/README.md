# Run 3 common shell

Standalone static common-shell implementation built from the supplied Attempt 11 input.

Open `index.html` with `?drawer=open` or `?drawer=hidden` and `?theme=light` or `?theme=dark` to set initial state. Controls update state and the query string.

The Drawer search only filters the fixed fixture. Its X clear control exists only while a query is nonempty. The selected child uses a square full-row surface; its label starts at the normal row start while its `selection_indicator` is fixed to the Drawer’s physical left edge.

All required icons are local inline SVG. There are no external image, font, CDN, script, or runtime dependencies.
