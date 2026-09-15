# Evaluation

## Status

`done`

## Input integrity

- Frozen Manifest snapshot: 46 files.
- Fixed prompt: unchanged across all three runs.
- Generator model: `gpt-5.6-terra`, reasoning effort `medium`.
- Each Run owns only its separate `runs/run-N/` directory. No Run will be
  repaired after generation.

## Evaluation focus

- Header availability and independent Drawer/workspace scrolling;
- the supplied Drawer search, current-destination, selection, and disclosure
  responsibilities; and
- Drawer-controller legibility in both states: its complete panel outline,
  divider, and directional chevron remain inside the icon canvas without
  clipping or overlap; the visible Drawer closes to the left and the hidden
  Drawer opens to the right.

## Verification result

- Three independent output directories were generated from only the frozen
  Manifest and unchanged fixed prompt; no individual output was repaired.
- `check-common-shell-navigation-scroll-variability-attempt17.ps1` passed:
  three Runs, 46 frozen Manifest files, three `1440x1200` initial captures,
  paired open/hidden comparison images, no external dependencies, and no
  icon-library name in the frozen Manifest.
- Chrome `150.0.7871.187` captured all 15 addressable states (three Runs ×
  Light/Dark × Drawer open/hidden, plus three narrow Light/open states) with
  `--headless=new --disable-gpu`. Every capture succeeded on the normal path;
  SwiftShader was not used. `capture-record.json` retains the PNG paths,
  SHA-256 values, dimensions, and byte counts.
- Direct visual review of all six Light-state open/hidden capture pairs found
  an unclipped panel outline, divider, and directional chevron in each Run.
  The prior Run 3 malformed, partly off-canvas chevron is not present.
- Runtime review opened each Run in the visible state, found `Close navigation`,
  activated it, and found `Open navigation` with the Drawer absent. This aligns
  the button label, action, and visible state in all three Runs.

## Limits

Screenshots and focused runtime checks do not prove keyboard behavior, focus
order, screen-reader output, preference persistence, or general responsive
quality.
