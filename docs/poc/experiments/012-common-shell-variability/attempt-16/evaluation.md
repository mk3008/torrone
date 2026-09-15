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

- common Header availability and independent Drawer/workspace scrolling;
- Drawer-search label, leading `Search` icon, supplementary placeholder,
  value-dependent `X` clear control, no-match state, and parent-context
  retention;
- outer focus halo that remains separate from the ordinary control border;
- full-row, square-cornered, leading-indicator treatment of the current
  navigation item, with the indicator fixed to the Drawer’s physical left edge
  rather than to a child indentation lane, while selected-child labels retain
  the same nested start as unselected child siblings; and
- binding-owned current-destination state: the fixture's initial
  `項目 01-01` value is an input example, not a component default; and
- activation transfers that binding-owned current state to one supplied
  destination without changing the item's hierarchy indentation.
- selection is a paint layer: selected and unselected rows at the same
  hierarchy level retain identical label start and padding; and
- collapsing and re-expanding a parent preserves the binding current
  destination and restores its selected child.
- canonical `PanelLeftClose` / `PanelLeftOpen` Drawer-controller geometry and
  action direction in both visual states, plus `Moon` / `Sun` next-theme
  semantics in the Header; and
- `ChevronDown` / `ChevronRight` parent-disclosure semantics.

## Verification result

- Three independent output directories were generated from only the frozen
  Manifest and unchanged fixed prompt; no individual output was repaired.
- `check-common-shell-navigation-scroll-variability-attempt16.ps1` passed:
  three Runs, 46 frozen Manifest files, three `1440x1200` initial captures,
  paired open/hidden comparison images, and no external dependencies.
- Chrome `150.0.7871.187` captured all 15 addressable states (three Runs ×
  Light/Dark × Drawer open/hidden, plus three narrow Light/open states) with
  `--headless=new --disable-gpu`; all captures succeeded on the normal path,
  so SwiftShader was not used. The capture record retains path, SHA-256,
  dimensions, and byte count for every PNG.
- Direct visual review of the six Light-state capture pairs found a complete
  panel outline with a left-facing chevron while the Drawer is visible and the
  corresponding right-facing chevron while hidden in every Run. No malformed
  generic two-pane, bookmark-like, or reversed-direction controller appeared.
- Runtime review opened each Run in the visible state, found `Close navigation`,
  activated it, and found `Open navigation` with no Drawer region remaining.
  This confirms that label, action, and rendered state align for all three
  generated implementations.
- `check-business-workflow-standard-pack.ps1` passed: 26 Concepts, 23 index
  links, 5 record-list configuration IDs, 23 theme roles, 2 theme modes,
  10 override values, 8 negative cases, 72 contrast assertions, and 2 product
  binding fixtures. `check-source-boundaries.ps1` passed. `git diff --check`
  passed with only existing line-ending warnings. The comparison has 18 local
  HTML/PNG references and no broken target.

## Limits

Screenshots and the focused runtime checks do not prove keyboard behavior,
focus order, screen-reader output, preference persistence, or general
responsive quality. These remain `UNCONFIRMED`; the narrow captures establish
only that the supplied narrow viewport renders without a capture failure.
