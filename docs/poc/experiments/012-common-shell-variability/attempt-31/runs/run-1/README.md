# Common-shell static specimen — Run 1

Open `index.html` locally in a browser. Optional initial states use query parameters:

- `?drawer=open` or `?drawer=hidden`
- `?theme=light` or `?theme=dark`

The Header controller changes only Drawer visibility. The theme controller changes
the active semantic palette. Drawer item selection updates the current-item
treatment in place; it does not navigate. The workspace intentionally contains
only the supplied neutral heading and numbers 1–80.

All icon resources are copied from the supplied local fixture. No external
fonts, images, scripts, stylesheets, dependencies, persistence, or routes are used.
