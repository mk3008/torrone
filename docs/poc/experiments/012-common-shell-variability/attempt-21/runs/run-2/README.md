# Common shell variability sample

Open `index.html` in a browser. The sample is self-contained and uses no external assets.

## Initial states

- `index.html?drawer=open&theme=light` displays the Drawer and Light theme.
- `index.html?drawer=hidden&theme=dark` displays the hidden Drawer state and Dark theme.

The Header remains visible while the workspace scrolls. The Drawer has its own scrolling navigation list, a local fixture-only search with clear and no-match states, disclosure for `グループ 01`, and a selection binding initially set to `項目 01-01`. Selecting another supplied destination changes only that binding and its current-item treatment; it does not navigate.
