# Document-tab workspace

Static Japanese document workspace. No build is required.

## Run

```sh
cd /bench/app
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`. Use `?case=fit|parent|child|both|desktop|pcChild`; an absent or unknown case uses `both`.

## Sources

Uses the supplied fixture structure and official Lucide SVG files from `/bench/icons`. Torrone catalog references consulted: `POPOVER-001`, `ICON-BUTTON-001`, and `TEXT-BUTTON-001` (the latter had no local README). Product requirements override illustrative catalog styling.
