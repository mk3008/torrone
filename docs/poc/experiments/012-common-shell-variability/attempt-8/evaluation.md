# Evaluation

## Status

`prepared for automated verification`

## Input integrity

- Frozen Manifest snapshot: 45 files.
- Fixed prompt: unchanged across all three runs.
- Generator model: `gpt-5.6-terra`, reasoning effort `medium`.
- Each Run owns only its separate `runs/run-N/` directory. No Run will be
  repaired after generation.

## Evaluation focus

- common Header availability and independent Drawer/workspace scrolling;
- Drawer-search label, leading magnifier, supplementary placeholder, clear,
  no-match state, and parent-context retention;
- outer focus halo that remains separate from the ordinary control border;
- full-row, square-cornered, leading-indicator treatment of the current
  navigation item; and
- sidebar controller plus moon/sun next-theme semantics in the Header.

## Limits

The fixed captures can demonstrate visible state and source inspection can
check the structure. Keyboard operation, focus movement, screen-reader output,
preference persistence, and responsive behavior beyond the fixed narrow capture
remain `UNCONFIRMED` unless separately tested.
