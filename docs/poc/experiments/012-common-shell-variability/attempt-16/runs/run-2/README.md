# Run 2 — Common shell

Open `index.html` locally. Query state: `?drawer=open` / `?drawer=hidden` and `?theme=light` / `?theme=dark`.

The Header uses canonical local equivalents of Lucide `PanelLeftClose` (complete panel, left pane, left chevron) and `PanelLeftOpen` (same panel, right chevron). The current destination is binding state and is exposed with `aria-current="page"`; drawer navigation, search, disclosure, themes, and separate scrollports are local only. No external assets are used.
