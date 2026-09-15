# Evaluation

## Inputs

- Baseline commit: `2074bf0ac6b99d6265917bad987cf2dc2039e139`
- Model: `gpt-5.6-terra`; reasoning effort: `medium`; independent runs: `3`
- Fixed product prompt SHA-256:
  `27AD9B686EA590F45B75E100F9FFE68D2B82E3B2BE7BACBC4A609A9E135E9874`
- Frozen Manifest entry SHA-256:
  `680AD7CE4ACD092CCF678CDDEDCA0BB4571E1A4EC6490B98D4DDC70D369C68F2`
- Immutable fixture: template `764E870E5DC584BAB41EF07220653AD98ACBC3A9769D31F678BDBF3A9AB7C21F`,
  CSS `577B2A080C1EB8272953617DDD3B344DD65D2A4D5FA5AE1D18973E9CDE8FE206`,
  JavaScript `AFFDECA06526580975C1F06DAE701EA4201D8D9CE54230B0934CB021BB46DCBD`.

## Capture

All 12 states were captured with Chrome `150.0.7871.187` at `1440x1200` using
`--headless=new --disable-gpu`. Every normal capture exited `0`; SwiftShader
was not used. The complete path, command template, dimensions, sizes, and
raw-byte digests are in [capture-record.json](capture-record.json).

## Static result

`tests/check-customer-search-common-shell-variability-attempt16.ps1` passed:
three complete runs, 45 frozen Manifest files, immutable shell assets, 12
non-empty 1440x1200 PNGs, and no external dependencies.

`tests/check-business-workflow-standard-pack.ps1` and
`tests/check-source-boundaries.ps1` also passed after the shell/pane contract
revision.

## Visual result

Run 1 and Run 3 visibly retain the shell-wide Header, the bounded search
conditions region, and the fluid result Grid. Run 2's captured states visibly
lose the Header and Drawer content even though its immutable shell CSS and JS
match the fixture byte-for-byte and its HTML outside the page slot matches the
fixture.

The Run 2 PNG was captured again without changing any source. Its raw-byte
SHA-256 remained `70DDCD49CBED733A17B5AE3E7418615F2DCE03B7465F542F6A03B416ABF40188`;
this is not a one-time capture failure. Direct browser computed-style diagnosis
was unavailable because the local `file:` URL is blocked by the browser review
surface. No individual Run was repaired or regenerated.

## Verdict

`partial`. The new contract and fixture eliminate the former generic shell
class collision for two independent outputs, but the third output still makes
the shared-shell result visually non-conforming. This attempt is retained as
evidence of a remaining Manifest/fixture robustness gap, not as acceptance of
the page pattern.
