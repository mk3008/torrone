# Run 2 self-review

This is a generated-fixture self-review, not human approval.

## 1. Disclosure and current item

- Before: `グループ 01` is expanded, its trailing glyph is the downward local
  chevron, and `項目 01-01` alone has the selected full-row surface, physical
  left indicator, heavier text, and `aria-current="page"`.
- Action: activated the complete `グループ 01` row, then selected supplied leaf
  `項目 02`.
- After: the child region is hidden and the trailing glyph is the right local
  chevron; the selected treatment remained on `項目 01-01` until the leaf was
  activated. `項目 02` then receives selection over its entire row, from the
  Drawer physical left edge through available width. Its label starts at the
  same top-level position as peer leaves.

## 2. Header icons

- Light: `Close navigation` uses the local left-panel/left-chevron glyph;
  `Switch to dark theme` uses the local moon glyph. Both are recognizable at
  rest on an opaque, bordered Header control.
- Dark: `Close navigation` retains the legible local close glyph; `Switch to
  light theme` uses the local sun glyph. Both retain their own visible
  boundary.
- Hidden Drawer: `Open navigation` uses the local left-panel/right-chevron
  glyph. Every button has an accessible next-action name, matching `title`,
  and an ordinary border plus a separate, offset focus halo.

## 3. Drawer visibility

- Before close: Drawer region, search, fixed navigation and its boundary are
  present; the Header controller says `Close navigation`; the workspace remains
  the scrollable task region beside it.
- Action: activated `Close navigation`, then `Open navigation`.
- After close: the Drawer region, its boundary, and reserved track are absent;
  the workspace expands while preserving its content. After open, the same
  Drawer and workspace split return. The controller label, tooltip, and glyph
  update with each state.

## 4. Navigation search

- Before: the opaque labelled field has a visible ordinary boundary and, on
  focus, a separate outer focus halo.
- Action: entered `01-02`, then cleared it.
- After: the matching child appears with `グループ 01` retained as hierarchy
  context; clearing restores the complete fixed hierarchy. A no-match message
  appears for unmatched terms.

## 5. Layout and scroll ownership

- The dummy-content title starts at the workspace page-grid logical start
  edge; the Header remains a fluid shell band. The Drawer navigation list and
  workspace each have their own `overflow-y:auto` scrollport below the Header.

## 6. Local-resource check

- Reviewed HTML, CSS, and JavaScript: no external image, font, stylesheet,
  script, CDN, or network URL is referenced. Icons resolve from `icons/`.

## Commands and limits

- Static validation commands and file inventory are recorded in the durable
  report. This review is source inspection plus local static verification; it
  does not certify browser rendering, assistive technology behavior, contrast,
  or human approval.
