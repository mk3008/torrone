# Source-level self-review

This is a source-level review of this Run only. It is not human approval and does not establish browser-rendered or assistive-technology behavior.

## 1. Disclosure and current item

- Before: `グループ 01` is expanded (`aria-expanded="true"`) with a trailing down chevron; `項目 01-01` alone is current (`aria-current="page"`), with a physical-left indicator and a full-width square selection surface.
- Action: activate the complete parent row. After: its children are omitted and the trailing glyph changes to the supplied right chevron. `current` is not written by the parent handler, so the supplied current item is retained without transfer or removal.
- Action: activate a supplied leaf. After: `current` is replaced and rendering applies the full-row `.current` paint treatment. A child still has `.child { padding-left:40px }`, whether selected or not; selection adds no hierarchy inset.

## 2. Header glyphs and focus

- Light: the Drawer control uses the supplied close/open panel glyph according to Drawer state; the theme control shows the supplied moon as the next action. Dark: the Drawer glyph remains state-specific; the theme control shows the supplied sun as the next action.
- Each icon-only control has an explicit accessible name and matching `title`; its 38px surface has a visible interactive border. The CSS applies a separate, offset `:focus-visible` ring. The glyph files are present in the local icon fixture and their image boxes are 20px.

## 3. Drawer visibility

- Before close: `.shell-body` has a 272px Drawer track, the Drawer contains its labelled search and supplied navigation scrollport, and the Header control is named/titled `Close navigation` with the close glyph.
- Action: activate it. After: `data-drawer="hidden"` hides the Drawer and changes the body to one workspace track; no empty boundary or reserve remains. The Header control becomes `Open navigation` with the open glyph. The workspace remains the `main` task region.
- Action: activate open. After: the same Drawer region and navigation are restored; workspace width again follows the Drawer track.

## 4. Drawer search

- Before: the labelled search field has its ordinary `border-interactive` boundary. On focus, its containing field receives the separately offset visible focus ring.
- Action: type a supplied match. After: matching parent context and matching supplied rows are rendered; a no-match state is explicit when applicable. Action: clear the field. After: the complete hierarchy is restored.

## 5. Shell geometry and scrolling

- The workspace page grid is inside `main`, and its top-level dummy section starts at the grid's logical start edge. The Header is a full shared fluid band above the split.
- The Header is outside both scrollports. `.navigation-list` owns Drawer list vertical scrolling, while `.workspace` owns workspace dummy-content vertical scrolling; neither container changes the other's scroll owner in source.

## 6. External resources

- `index.html` references only `styles.css`, `app.js`, and relative `icons/` fixture assets. No external images, fonts, scripts, stylesheets, CDNs, or network requests are declared.

## Limits

- This review inspected source behavior and static references only. It did not run a browser, capture a viewport, prove rendered contrast, keyboard focus appearance, scrollbar behavior, or assistive-technology behavior.
