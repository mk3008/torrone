# Diagnostic review presentation

- Status: **pass**
- Complete raw evidence: `docs/poc/experiments/017-reference-html-ssot/output/diagnostic-adoption/target-shell.raw.report.json`
- Raw SHA-256: `B37CE44505A019A66C5F754361221467D4F116336F50E478FA71823C511AE08C`
- Raw differences: 78 (0 errors, 78 informational diagnostics)
- Reviewer entries: 6 (0 errors, 6 informational signatures)
- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.
- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.

## Errors

None.

## Informational diagnostics

| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | extra-element | `elements.activity-timeline` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73 |
| 2 | extra-element | `elements.processing-notes-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75 |
| 3 | extra-element | `elements.processing-notes` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 2, 8, 14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74 |
| 4 | extra-element | `elements.record-status` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 4, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 76 |
| 5 | extra-element | `elements.record-summary` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 5, 11, 17, 23, 29, 35, 41, 47, 53, 59, 65, 71, 77 |
| 6 | extra-element | `elements.semantic:role:main` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78 |

Shape labels describe report data only. They do not claim a root cause or importance level.

