# Evaluation

## Inputs

- Baseline commit: `2074bf0ac6b99d6265917bad987cf2dc2039e139`
- Model: `gpt-5.6-terra`; reasoning effort: `medium`; independent runs: `3`
- Fixed product prompt SHA-256:
  `27AD9B686EA590F45B75E100F9FFE68D2B82E3B2BE7BACBC4A609A9E135E9874`
- Frozen Result Grid contract SHA-256:
  `03F4F77C6B46C5B1A923B78B2D11013ECEEDAE6D3CD8D39E634BDA9C91A70DC8`

## Capture

All 12 states were captured with Chrome `150.0.7871.187` at `1440x1200` using
`--headless=new --disable-gpu`. Every normal capture exited `0`; SwiftShader
was not used. The complete path, command template, dimensions, sizes, and
raw-byte digests are in [capture-record.json](capture-record.json).

## Result

The updated Result Grid guidance requires the smallest leading context strip
to be pinned inside a horizontally scrolling Grid: the supplied selection
column when present and the supplied primary identity column. It reserves a
pinned logical-end action column for a product-declared always-available action
only.

Run 1 and Run 3 implement a leading sticky identity column. Run 2 has the same
required leading identity link but has no `position: sticky` / logical-start
offset in page CSS. The attempt-specific static check therefore rejects Run 2.
No individual output was repaired, regenerated, or replaced.

The common shell and pane observation from attempt 16 is reproduced in Run 2:
the Header and Drawer content are not visibly rendered even though immutable
shell assets and markup outside the page slot match their fixture. That remains
a separate robustness gap.

## Verdict

`partial`. The fixed policy produces the intended pinned context in two of
three independent outputs, but not in all three. The evidence establishes that
the policy is useful and that the current Manifest phrasing is not yet a
reliable generation constraint.
