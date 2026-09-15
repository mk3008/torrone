# Source-level self-review

This review covers only this Run's generated source files. It is not human
approval and does not substitute for browser or assistive-technology testing.

## 1. Disclosure and current item

- Before: the generated default is an expanded `グループ 01`, with the supplied
  down chevron; `項目 01-01` alone has `aria-current="page"`, the full-row
  selection background, bold text, and a physical-left indicator.
- Action implemented: the complete parent row toggles its `aria-expanded`
  value and swaps only the trailing `chevron-down.svg`/`chevron-right.svg`.
- After: source state keeps `current` separate from `expanded`; collapse does
  not alter it, and expansion re-renders the same selected child. Leaf clicks
  replace only `current`; the selected leaf remains `.child` with the same
  40px label start as its peer while `.current` paints the full row and
  `::before` starts at physical left.

## 2. Header icon controls

- Light: the Drawer controller uses local `panel-left-close.svg` and the theme
  control uses local `moon.svg`; both are icon-only buttons with accessible
  names, matching native tooltips, explicit interactive borders, and the
  outer `:focus-visible` ring.
- Dark: the controller retains the recognisable close/open panel glyph, while
  the next-theme icon becomes local `sun.svg`; both controls retain their
  surface, border, and separate focus halo against the dark semantic palette.
- Source observation: icon sources and names are updated in `setDrawer` and
  `setTheme`; individual button boundaries and focus treatment are defined in
  CSS rather than relying on hover or a tooltip.

## 3. Drawer visibility

- Before: `data-drawer="open"` renders a finite Drawer below the Header, its
  boundary, supplied navigation content, and the Close navigation controller.
- Action implemented: the controller toggles only `data-drawer`; its name,
  title, glyph, and `aria-expanded` change together.
- After: hidden state uses `display:none` for the Drawer and changes the shell
  grid to one workspace column. The workspace remains present and owns its
  own scrollport; opening restores the supplied Drawer.

## 4. Search

- Before: the labelled search field has an ordinary visible border.
- Action implemented: input filters the supplied parent, children, and leaves
  with no submit action.
- After: a matching child retains the parent row; clearing restores the full
  hierarchy. An explicit no-match message is rendered when no fixture label
  matches. `:focus-visible` draws a separate outer focus ring.

## 5. Layout and scrolling

- Source observation: Header is a shared full-width top band; workspace page
  grid begins at its logical start edge. The shell body has fixed remaining
  height, while Drawer navigation and workspace separately use `overflow-y:auto`.
  The search region remains above Drawer navigation scrolling.

## 6. External-resource review

- Command: `node --check app.js` completed successfully.
- Command: `rg --pcre2 -n 'https?://|cdn|@import|<script(?![^>]*src="app.js")' index.html styles.css app.js` produced `EXTERNAL_REFERENCES=0`.
- Source observation: the HTML references only local `styles.css`, `app.js`,
  and copied local SVG fixture files.

## Limits

No browser, screenshot, Playwright, server, or prior generated output was
used. Therefore visual rendering, actual keyboard interaction, focus contrast,
scroll behavior, and viewport behavior remain for orchestrator review.
