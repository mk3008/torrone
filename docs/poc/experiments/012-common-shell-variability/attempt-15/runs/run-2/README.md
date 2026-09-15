# Run 2 — Common shell

Open `index.html` locally. Query state: `?drawer=open` / `?drawer=hidden` and `?theme=light` / `?theme=dark`.

The binding's one current destination is exposed with `aria-current="page"`. Leaf activation updates only that binding; parent disclosure changes only expanded state. Current paint preserves each hierarchy level's existing padding and label start, including after collapse and re-expand. No external dependencies are used.
