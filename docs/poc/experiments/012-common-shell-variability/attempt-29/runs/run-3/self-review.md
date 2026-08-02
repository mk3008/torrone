# Run 3 self-review

Scope: only `C:\tmp\common-shell-human-feedback-v1\generated\run-3`.

| Contract check | Observation | Result |
| --- | --- | --- |
| Parent disclosure | `グループ 01` is a complete native button. Its click handler toggles only `expanded`; it renders a trailing down/right chevron and never assigns `.current` to the parent. | Pass (source review) |
| Header icon controls | Both icon-only Header buttons use a 38×38 bounded button surface with an explicit `border-interactive` border in the Light and Dark role sets. | Pass (source review) |
| Search boundary and focus | The labelled `input[type=search]` has its ordinary `border-interactive` boundary. `:focus-visible` provides a separate 3px, 3px-offset focus outline. | Pass (source review) |
| Workspace grid alignment | The Header is the fluid shell band. The page grid is inside the separately scrolling workspace and the bounded content begins at the grid's start padding. | Pass (source review) |
| Fixture interaction and independent scroll | The fixed leaf list supports current-destination selection; input filtering includes parent context; `.nav-list` and `.workspace` independently own vertical scrolling. | Pass (source review) |
| External dependencies | `rg -n 'https?://|cdn|@import' index.html styles.css app.js` returned no matches. The only script tag is `<script src="app.js">`; all images are local copied fixture assets. | Pass (command check) |

## Commands

```text
node --check C:\tmp\common-shell-human-feedback-v1\generated\run-3\app.js
rg -n 'https?://|cdn|@import' index.html styles.css app.js
```

`node --check` completed without output. The external-reference command reported `EXTERNAL_REFERENCES=0`.

## Limitations

No browser capture or assistive-technology testing was performed. The interaction and visual-focus conclusions above are based on the generated local source and static command checks, so they do not constitute human approval or proof of rendered behavior at the specified viewports.
