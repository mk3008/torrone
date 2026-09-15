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
- `PanelLeftClose` / `PanelLeftOpen` Drawer controller plus `Moon` / `Sun`
  next-theme semantics in the Header; and
- `ChevronDown` / `ChevronRight` parent-disclosure semantics.

## Automated result

- Three independent output directories were generated from only the frozen
  Manifest and unchanged fixed prompt.
- Syntax and local-only dependency scans passed in every Run.
- `check-common-shell-navigation-scroll-variability-attempt15.ps1` passed:
  three independent Runs, 46 frozen Manifest files, three fixed initial
  `1440x1200` captures, and no external dependencies.
- `check-business-workflow-standard-pack.ps1` passed: 26 Concepts, 23 index
  links, 5 record-list configuration IDs, 23 theme roles, 2 theme modes,
  10 override values, 8 negative cases, 72 contrast assertions, and 2 product
  binding fixtures.
- `check-source-boundaries.ps1` and `git diff --check` passed. The latter
  emitted only existing line-ending warnings.
- Chrome `150.0.7871.187` captured all 15 addressable states (three Runs ×
  Light/Dark × Drawer open/hidden, plus three narrow Light/open states) at the
  recorded viewport. The normal `--headless=new --disable-gpu` path succeeded
  for every capture; SwiftShader was not used. Paths, raw-byte SHA-256 values,
  dimensions, and byte counts are in `capture-record.json`.
- Direct visual inspection of the three fixed initial captures found a
  full-row square selection with its indicator at the physical left edge and
  no added leaf indentation.
- Browser runtime checks exercised each Run as follows: select a normal leaf,
  verify exactly one semantic current item and unchanged leaf padding; select
  `項目 01-02`; collapse `グループ 01`; re-expand it; verify that
  `項目 01-02` is again the sole current item and retains its child padding.
  All three Runs passed. The observed leaf padding was `16px` across the
  selected/unselected leaves in Runs 1 and 2; Run 3's source and runtime state
  use the same base row geometry and its selected child retained `38px`.
- The comparison page has 16 local HTML/PNG references and 0 broken targets.

## Limits

Screenshots and the focused runtime checks do not prove keyboard behavior,
focus order, screen-reader output, preference persistence, or general
responsive quality. These remain `UNCONFIRMED`; the narrow captures establish
only that the supplied narrow viewport renders without a capture failure.
