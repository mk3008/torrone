# Evaluation

## Verdict

`partial`

The updated color-role contract is observed in all three runs: every search
control uses the opaque `surface_background` / `text_primary` /
`border_interactive` mapping, and every Grid uses the required header and body
roles. The independent search contract is not fully satisfied because Run 1
does not pin the leading Customer ID column when the Grid scrolls.

## Evidence

- Static check: `tests/check-customer-search-common-shell-variability-attempt26.ps1`
  — fails only at Run 1's missing pinned leading Grid column.
- Captures: 12 desktop states and 3 narrow states in `runs/`.
- Capture record: `capture-record.json`; Chrome `150.0.7871.187`, all normal
  capture exit codes `0`, no SwiftShader fallback.
- Visual review: `customer-search-hidden-light.png` for each run confirms
  opaque search fields against the workspace background and a tone-distinct
  Grid header.

## Limits

The static specimen confirms the initial rendered states and CSS role use. It
does not prove assistive-technology behavior or a real product data flow.
