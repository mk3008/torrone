# Run 3: common shell specimen

Open `index.html` in a browser. This self-contained static specimen has no
external images, fonts, CDN resources, or scripts.

## Query states

- `?drawer=open` or `?drawer=hidden` selects the initial Drawer state.
- `?theme=light` or `?theme=dark` selects the initial theme.

The Header controls update those query values in place. Selecting a fixed
Drawer item moves the single current-item treatment without navigating. The
Drawer search filters only the supplied fixed fixture and retains matching
children under their parent.

## Files

- `index.html` provides the semantic shell and local Lucide-compatible inline SVG glyphs.
- `styles.css` provides the Light/Dark resolved semantic palettes and independent scroll regions.
- `app.js` provides static state controls, fixture selection, and local search.
