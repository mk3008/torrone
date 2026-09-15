# Run 1

Static common-shell specimen for the fixed consumer input.

Open `index.html` directly in a browser. The initial view accepts these query
parameters:

- `?drawer=open` or `?drawer=hidden`
- `?theme=light` or `?theme=dark`

The Header control changes Drawer visibility without leaving a residual Drawer
track. The other Header control switches the active Light/Dark semantic palette.
Drawer search filters the supplied fixed fixture, preserving the parent context
for matching child items. Selecting an item only transfers the current-location
treatment; it does not navigate. The workspace has only its title and the
neutral sequence from 1 through 80.

All icons are inline Lucide-style SVG paths. No external assets, fonts, CDN, or
scripts are used.
