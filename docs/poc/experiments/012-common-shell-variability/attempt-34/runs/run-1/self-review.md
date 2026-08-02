# Run 1 self-review

This review covers only the files generated in this Run directory. It is a
source-level review; no browser, server, Playwright run, or PNG capture was
launched. Consequently, observations marked as source evidence do not claim
visual, keyboard, focus, or assistive-technology verification.

## 1. Parent disclosure and current item

- Before state (source): `expanded` is initialized to `true` and `current` to
  `項目 01-01` in `app.js`.
- Action implemented: the complete `グループ 01` button toggles only `expanded`.
- After state (source): re-rendering uses the unchanged `current` value;
  child rows receive the `.child` class, while `.current` only supplies the
  paint treatment. The selected row is width `100%`, its indicator is pinned
  with `left: 0`, and child padding remains `padding-left: 40px`.
- Leaf action implemented: each supplied leaf calls `setCurrent(label)`, which
  transfers the one `aria-current="page"` and `.current` treatment without
  changing the label's hierarchy class.

## 2. Theme, readable regions, controls, and glyph states

- Before state (source): the shell begins as Light with `data-theme="light"`.
- Action implemented: the icon-only theme button switches between `light` and
  `dark`, exposes the next action through its accessible name and tooltip, and
  changes moon/sun local SVG sources.
- After state (source): Light and Dark declare the fixed manifest palette
  values. Header, Drawer, workspace, labels, inputs, rows, headings, and icon
  controls explicitly consume `var(--text-primary)` and their resolved
  surfaces. Icon-only controls retain an explicit interactive border.
- Focus implementation: keyboard-reachable button/input selectors use a
  `focus_ring` outer outline with `outline-offset: 3px`; the search wrapper
  mirrors that treatment without replacing its ordinary field border.
- Limitation: recognizable resting contrast, icon appearance, tooltip display,
  and focus appearance require browser rendering and were not observed here.

## 3. Drawer visibility

- Before state (source): `data-drawer="open"` displays a 288px Drawer sibling
  beside the workspace, with the close-panel glyph and `Close navigation`.
- Action implemented: the Header controller switches `data-drawer` between
  `open` and `hidden`, updates its accessible name/title and swaps local
  close/open panel glyphs.
- After state (source): the hidden selector sets only `.drawer { display:none; }`;
  workspace remains present and its flexible width can consume the released
  shell space.
- Limitation: physical layout/resizing and tooltip display were not rendered.

## 4. Navigation search

- Before state (source): the labelled `メニューを検索` search input has an
  ordinary `border-interactive` boundary.
- Action implemented: `input` events filter parent, child, and leaf labels;
  matching children retain `グループ 01`, and zero visible rows exposes
  `一致する項目はありません`.
- After state (source): clearing the field (`query === ''`) rebuilds the full
  supplied hierarchy. No standalone submit or clear control is created.
- Limitation: text entry and the visible focus halo were not browser-tested.

## 5. Shell and scroll ownership

- Before state (source): Header is a distinct 60px shell band; workspace page
  grid begins at its own logical start edge within the workspace.
- Action implemented: `.navigation` and `.workspace` each own `overflow-y:auto`;
  the Header is outside both scrollports and `.shell` prevents a document
  scroll owner.
- After state (source): the Drawer search stays outside its navigation
  scrollport; `app.js` creates the neutral dummy sequence 1 through 80 in the
  workspace scrollport.
- Limitation: independent scrolling and narrow reflow were not exercised.

## 6. Local-only asset check

- Command performed: `rg -n "external|https?://"` over this Run directory.
- Observed result: no external HTML/CSS/script/font/image references were
  found. The only `http://` text is the XML namespace embedded in copied SVG
  fixture files.
- Action actually performed: the seven required Lucide fixture SVG files were
  copied into `icons/`; HTML references only local `styles.css`, `app.js`, and
  those local SVG paths.

## Source-level commands

```powershell
rg -n "data-theme|data-drawer|text-primary|surface-background|border-interactive|focus-ring|Close navigation|Open navigation|Switch to|グループ 01|項目 01-01|項目 30|一致する項目はありません|dummy-list|Array\.from|external|https?://" <run-directory>
Get-FileHash <run-directory>\icons\*.svg -Algorithm SHA256
```

## Result

`partial` — implementation and source-level checks are recorded. Visual,
browser, interaction-runtime, and accessibility verification are intentionally
not claimed because this Run was not launched.
