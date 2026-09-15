# Evaluation

## Result

`partial`

The three pages reuse the selected Run 1 shell assets byte-for-byte and all
fifteen captures were produced. The visible dummy-content leak found in
Attempt 24 is absent. However, Run 3 does not pin the leading Customer ID
column even though its Grid has local horizontal overflow and an identity link.

## Evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Fixed shell reuse | pass | Each run's `shell.css` and `shell.js` matches the fixture SHA-256. |
| Capture | pass | 15 PNGs, Chrome `150.0.7871.187`; `1440x1200` plus `720x1200`; no SwiftShader fallback. |
| External dependency scan | pass | Each worker reported no external URL, CDN, or import. |
| Fixture integration | pass | The Run 1 dummy target remains non-rendered; no numbered dummy content appears in Attempt 25 captures. |
| Leading identity pinning | fail in Run 3 | `runs/run-3/page.css` provides local Grid overflow but no sticky/frozen leading identity column. |

## Interpretation

The fixed Manifest already states the relevant requirement in
`components/result-grid.md`: a Grid with an identity link and local horizontal
overflow pins the leading identity column. Therefore this is an observed
generation variance, not a repairable page defect and not evidence to rewrite
the individual Run 3 output.
