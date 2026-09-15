# Generated common-shell self-review

Scope: source-level review of this Run only. No browser was invoked; observations marked as source-level are not human approval or rendered-interaction evidence.

## 1. Disclosure and current item

Before: `state.expanded` initializes `true`; `項目 01-01` alone has `aria-current="page"` and the `current` class. The parent renders a trailing `chevron-down.svg`.

Action performed: inspected `renderNavigation()` and its parent click handler. The handler changes only `state.expanded` and calls `renderNavigation()`.

After (source-level): the child `<ul>` receives `hidden` only when collapsed (except during an active search), and the parent icon becomes `chevron-right.svg`. Neither current destination nor leaf selection logic is changed. A leaf click changes only `state.current`; its `.nav-row.current` paint spans the full button width, with the indicator drawn by `box-shadow` at the physical left edge. Both child leaves use `.nav-row.leaf { padding-left: 32px; }`, including when selected.

## 2. Header icon controls and themes

Before: Light is the default. The visible Drawer control names and displays `Close navigation` / `panel-left-close.svg`; the theme control displays `moon.svg`.

Action performed: inspected `setDrawerControl()`, `setThemeControl()`, local SVG sources, and the Light/Dark CSS variables.

After (source-level): hidden Drawer changes to `Open navigation` / `panel-left-open.svg`; Dark changes the theme command to the sun glyph and uses the manifest Dark colors. Both icon-only controls retain an opaque `surface-background`, visible `border-interactive`, accessible name, tooltip, and their own `:focus-visible` outer outline. The fixture glyphs are independently supplied local SVGs; visual recognition at rendered size remains for browser review.

## 3. Drawer visibility

Before: visible Drawer is a distinct `aside` with search and scrollable navigation; its grid track is 272px and the workspace is the separate task region.

Action performed: inspected the toggle handler and `[data-drawer="hidden"]` rules.

After (source-level): the toggle switches only `data-drawer`; hidden state uses a single workspace grid track and `display: none` for the Drawer, leaving no Drawer track. The same controller changes glyph, accessible name, and tooltip. Workspace stays present and expands through normal grid reflow.

## 4. Navigation search

Before: the labelled text field has an ordinary `border-interactive` boundary and is above the independent navigation scrollport.

Action performed: inspected focus and `input` handlers.

After (source-level): `:focus-within` provides an outer focus outline with offset. Entered text updates `state.query`; matching children retain their parent group, and clearing the value restores all supplied navigation rows. Browser focus painting and typed DOM behavior remain for orchestrator validation.

## 5. Layout and scroll ownership

Before: Header is the first shell grid row and outside the body scroll regions. Workspace page-grid starts at its local logical start edge.

Action performed: inspected shell grid, `.nav-scroll`, and `.workspace` CSS.

After (source-level): body does not scroll; `.nav-scroll` and `.workspace` each own `overflow-y: auto`, so they are separate vertical scroll regions. Header remains outside both scrollports. Rendered scrollbars and narrow viewport behavior need browser review.

## 6. External resources

Before: implementation uses relative local CSS, JS, and icon paths only.

Action performed: static external-reference scan recorded in the durable report.

After: no external image, font, script, stylesheet, CDN, or network URL was found by that scan.

## Limitations

This self-review cannot establish rendered glyph legibility, contrast, keyboard navigation, actual focus visibility, scroll behavior, or responsive reflow. Those require the orchestrator's browser capture and review. No human approval is claimed.
