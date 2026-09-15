# Evaluation — superseded

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

All three page sources were newly authored from empty run directories. Run 1
then assigned `overflow-x: clip` to the fixed `.shell-workspace` container from
page CSS. The attempt-specific static check correctly rejects that cross-boundary
implementation. No individual output was repaired or regenerated.

## Verdict

`partial`. The localized Grid policy is present, but the former Manifest text
did not reliably keep page CSS out of the fixed shell. Attempt 20 uses the
strengthened policy and starts three new runs.

