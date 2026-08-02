# Self-review — Run 2

## Checks and observations

1. **Parent disclosure:** The complete `グループ 01` row is a button that toggles
   the child region. Its down/right chevron remains on the trailing edge; the
   parent is never selected merely because disclosure changes.
2. **Header controls:** Both icon-only buttons are 40 × 40 bounded surfaces
   with a visible interactive border in both palettes. Their accessible names
   and tooltips describe the next available action.
3. **Search field:** The labelled Drawer field retains its ordinary boundary.
   Keyboard focus uses a separate three-pixel outer ring with an offset.
4. **Grid alignment:** The workspace's bounded content pane begins at the
   workspace logical start edge. The Header remains a full-width shared band.
5. **Fixture interaction:** A leaf updates the current destination, filtering
   updates the supplied navigation fixture (including no-match state), and the
   Drawer navigation has its own vertical scrolling region separate from the
   80-item workspace content.
6. **External assets:** The HTML references only `styles.css`, `app.js`, and
   local copied icon files. No external images, fonts, scripts, or stylesheets
   are included.

## Commands

- `node --check app.js` — passed.
- `rg --pcre2 -n 'https?://|cdn|@import|<script(?![^>]*src="app.js")' index.html styles.css app.js` — no matches (`EXTERNAL_REFERENCES=0`).

## Limitations

This static self-review does not prove browser rendering, keyboard traversal,
contrast, assistive-technology behavior, or human approval.
