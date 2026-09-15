# Self-review — Run 2

This is an implementation self-review, not human approval.

## Evidence and commands

- `node --check app.js` completed successfully.
- A static local-resource scan reported `EXTERNAL_REFERENCES=0` for `index.html`, `styles.css`, and `app.js`.
- Static assertions reported `HAS_REQUIRED_SHELL=True`, `HAS_QUERY_STATES=True`, and `HAS_SCROLL_OWNERS=True`.
- Local Chrome headless captures were made for `?drawer=open&theme=light` at 1440×1200 and `?drawer=hidden&theme=dark` at 720×1200. The captures show the Header as the full-width fixed-height band, an open Drawer with a selected child in Light, and a hidden Drawer with an expanded workspace in Dark.

## Contract observations

1. **Parent disclosure.** Before state in the Light capture: `グループ 01` is expanded, its trailing glyph is the supplied down chevron, and `項目 01-01` has the sole full-row selection and physical-left indicator. The implemented parent-row action changes only `expanded`; it rebuilds the child region and chevron path while retaining `current`. Thus collapsing hides the selected child without changing the current value; expanding restores that same treatment. Limitation: a cached local Playwright CLI was unavailable, so this state transition was inspected from the implementation path rather than activated by automation.
2. **Header icon controls.** Light capture: the visible Drawer control has the complete left-panel/left-chevron close glyph and the theme control has a moon glyph; both have a border, accessible action name, matching tooltip, and outer focus rule. Dark hidden capture: the Drawer control has the complete left-panel/right-chevron open glyph and the theme control has a sun glyph; dark icons are inverted to remain visibly recognizable on their surfaces. Focus behavior is defined as a separate offset outline. Limitation: focus rings and hover tooltips were source-checked, not captured in headless interaction.
3. **Drawer visibility.** Before state is the Light capture’s visible Drawer, supplied search/navigation content, 280px track, close glyph, `Close navigation` label/tooltip, and narrower workspace. The close action sets `hidden`, removes the Drawer track through `drawer-hidden`, switches to the open glyph/name/tooltip, and leaves the workspace section intact; open does the inverse. The Dark hidden capture confirms no empty Drawer boundary or reserved space. Limitation: source-path review was used for the two click transitions.
4. **Navigation search.** Before state is the ordinary bordered search field above the Drawer list. It has the shared outer focus rule. Input filters the fixed parent, child, and leaf fixture; matching children retain their parent, a no-match message is explicit, and clearing rebuilds the full hierarchy. Limitation: the filter path was statically reviewed because browser automation could not be run without fetching a dependency.
5. **Layout and scrolling.** The visual captures show the workspace page grid beginning at the workspace logical start edge while the Header remains a fluid full-shell band. CSS assigns separate `overflow-y: auto` owners to `.nav-scroll` and `.workspace`, with the Header outside both; each list/content region is independently scrollable by design.
6. **External resources.** The static scan found no external URL, CDN, import, or unexpected script. The only script is local `app.js`, stylesheet is local `styles.css`, and all icon files are copied from the supplied local fixture.

## Limits

- The local Playwright CLI was unavailable without an attempted registry download, which was not permitted by the frozen input. No human approval is claimed.
- Headless Chrome captures verify initial visual states only; they do not prove keyboard operation, focus movement, hover tooltip visibility, or assistive-technology behavior.
