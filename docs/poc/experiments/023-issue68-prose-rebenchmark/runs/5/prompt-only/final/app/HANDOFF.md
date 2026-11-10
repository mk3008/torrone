# Handoff

## Status

done — standalone static app, fixture data, official Lucide assets, browser checks, and evidence are included.

## Tools and checks

- Chromium via Playwright: loaded the app from the documented static server command.
- First pass at 1280×800: confirmed all eight 140 px document tabs fit the 1,148 px inner workspace without overflow controls; initial content was `請求書の明細`; no page-level horizontal overflow.
- First pass at 390×844: confirmed one selected tab per overflowing row, `ほか4` controls, exactly 6 px between surfaces, and count controls aligned to the workspace right inner edge.
- Interaction pass: opened the item list, selected `履歴`, opened the document chooser, selected another document, and closed the selected document.
- Repair: copied the fixture into the static app, changed the fetch to a local relative URL, corrected chooser focus restoration, and documented a server command available in the environment.
- Recheck at 900×700: document overflow showed two arrow controls and right-scroll moved the track by 140 px; the independently fitting item row had no arrows.
- Recheck at 390×844: item selection restored focus to the collapsed item count control; chooser Back/Escape restored focus to the document count control; closing the selected document selected and focused the following document.
- Console/page errors observed in the final interaction pass: none.

## Evidence

- `evidence-desktop.png`
- `evidence-desktop-overflow.png`
- `evidence-narrow.png`
- `evidence-chooser.png`
- `browser-results.json`
- `recheck-results.json`

## Remaining gaps

- Browser checks are bounded automated checks and do not represent human approval.
- Hover tooltip presentation and every possible intermediate viewport width were not exhaustively sampled; width behavior is calculated continuously from the current workspace inner width.
