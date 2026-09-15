# Evaluation — invalidated

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

The sources were not three fresh independent runs: two run directories retained
page sources copied from attempt 17 before the supposed new generation. The
static checks and PNG capture therefore prove only that those files can render;
they cannot prove the Manifest's reproducibility. No individual output was
repaired, regenerated, or replaced.

## Verdict

`not evaluated`. This invalidated attempt is not evidence for or against the
localized Grid-overflow policy. Attempt 19 starts all three pages from empty
run directories and is the next valid evaluation.

