# Generated common-shell self-review

This is a generated-fixture self-review, not human approval.

## 1. Parent disclosure and current item

- Before: `グループ 01` was expanded, with its child region visible and a trailing down chevron. `項目 01-01` alone had the physical-left indicator and full-row selection surface.
- Action: activated the complete `グループ 01` row.
- After: the child region was hidden and the trailing glyph was the right chevron. The current destination value was unchanged; no selection was added, removed, or transferred by disclosure.
- Action: activated supplied leaf `項目 02`.
- After: `項目 02` became the sole `aria-current="page"` row with its selection surface from the physical left edge through the row width. It retained the same top-level label start. Child labels retain their shared nested start when selected.

## 2. Header glyphs

- Light: `Close navigation` shows the local panel-left-close glyph; `Switch to Dark` shows the moon glyph. Both have visible borders, named tooltips, and independent focus halos.
- Dark: `Close navigation` shows the local panel-left-close glyph; `Switch to Light` shows the sun glyph. Both retain visible borders, recognizable inverted glyph contrast, names, tooltips, and focus halos.
- Hidden Drawer states show the panel-left-open glyph with `Open navigation` in both themes. Glyph observation is separate from each 36px clickable button boundary and focus treatment.

## 3. Drawer visibility

- Before: the Drawer region, its search and fixed navigation, its right boundary, and reserved column were visible; the Header controller showed the close glyph, named `Close navigation`, with matching tooltip. Workspace remained a separate scrollable task region.
- Action: activated `Close navigation`.
- After: the Drawer region, boundary, and reserved space were absent; the controller showed the open glyph and accessible name/tooltip `Open navigation`; the workspace widened but remained present.
- Action: activated `Open navigation`.
- After: the Drawer region, supplied navigation, boundary, and reserved column returned; the workspace narrowed only as a consequence of the Drawer state.

## 4. Navigation search

- Before: the labelled `メニュー検索` field had its ordinary interactive boundary.
- Action: focused it, then entered `01-02`.
- After: an outer focus halo remained visibly separate from the ordinary boundary. The matching child appeared under its retained `グループ 01` context.
- Action: cleared the field.
- After: the complete fixed hierarchy and top-level item list were restored. A no-match state is explicit for unmatched text.

## 5. Layout and scrolling

- Before/after: top-level workspace content begins at the workspace grid's logical start edge; the Header is its own full-width fluid band.
- Drawer navigation uses the Drawer list's vertical scroll region below the fixed search area. Workspace dummy numbers use the workspace's independently scrollable region; neither scrolls the Header.

## 6. Local-resource check

- Observation: `index.html` references only `styles.css`, `app.js`, and local `icons/*.svg`. No external images, fonts, scripts, stylesheets, CDN links, or imports are used.

## Limits

- Review is source and local interaction observation only; it is not human approval, formal accessibility certification, or cross-browser certification.
