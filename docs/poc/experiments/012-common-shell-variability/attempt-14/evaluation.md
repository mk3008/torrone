# Evaluation

## Status

`prepared`

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
- `PanelLeftClose` / `PanelLeftOpen` Drawer controller plus `Moon` / `Sun`
  next-theme semantics in the Header; and
- `ChevronDown` / `ChevronRight` parent-disclosure semantics.

## Automated result

- Three independent output directories were generated from only the frozen
  Manifest and unchanged fixed prompt.
- Syntax and local-only dependency scans passed in every Run.
- Pending fresh three-run generation, capture, static checks, direct visual
  inspection, and runtime review. No prior Run is evidence for this attempt.

## Limits

The three fixed captures demonstrate only Light / Drawer-visible initial state.
The other URL-addressable Drawer and theme states are linked from the comparison
page but are not captured in this attempt. Keyboard operation, focus movement,
screen-reader output, preference persistence, and responsive behavior remain
`UNCONFIRMED` unless separately tested.
