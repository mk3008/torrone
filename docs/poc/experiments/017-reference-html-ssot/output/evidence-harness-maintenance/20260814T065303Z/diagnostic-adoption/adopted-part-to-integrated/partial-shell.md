# Diagnostic review presentation

- Status: **pass**
- Complete raw evidence: `C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/017-reference-html-ssot/output/partial-reference/target-shell.report.json`
- Raw SHA-256: `833DB640FC2C4AA6E4D8D16EC3F7298D4EE686AF38213B7F4E776C35A5A8E720`
- Raw differences: 182 (0 errors, 182 informational diagnostics)
- Reviewer entries: 14 (0 errors, 14 informational signatures)
- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.
- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.

## Errors

None.

## Informational diagnostics

| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | extra-element | `elements.clear-action` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 1, 15, 29, 43, 57, 71, 85, 99, 113, 127, 141, 155, 169 |
| 2 | extra-element | `elements.create-action` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 2, 16, 30, 44, 58, 72, 86, 100, 114, 128, 142, 156, 170 |
| 3 | extra-element | `elements.filter-actions` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 3, 17, 31, 45, 59, 73, 87, 101, 115, 129, 143, 157, 171 |
| 4 | extra-element | `elements.filter-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 4, 18, 32, 46, 60, 74, 88, 102, 116, 130, 144, 158, 172 |
| 5 | extra-element | `elements.query-filter` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 5, 19, 33, 47, 61, 75, 89, 103, 117, 131, 145, 159, 173 |
| 6 | extra-element | `elements.result-empty` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 6, 20, 34, 48, 62, 76, 90, 104, 118, 132, 146, 160, 174 |
| 7 | extra-element | `elements.result-initial` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 7, 21, 35, 49, 63, 77, 91, 105, 119, 133, 147, 161, 175 |
| 8 | extra-element | `elements.result-pagination` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 8, 22, 36, 50, 64, 78, 92, 106, 120, 134, 148, 162, 176 |
| 9 | extra-element | `elements.result-summary` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 9, 23, 37, 51, 65, 79, 93, 107, 121, 135, 149, 163, 177 |
| 10 | extra-element | `elements.result-table` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 10, 24, 38, 52, 66, 80, 94, 108, 122, 136, 150, 164, 178 |
| 11 | extra-element | `elements.search-action` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 11, 25, 39, 53, 67, 81, 95, 109, 123, 137, 151, 165, 179 |
| 12 | extra-element | `elements.semantic:controlled-by:filter-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 12, 26, 40, 54, 68, 82, 96, 110, 124, 138, 152, 166, 180 |
| 13 | extra-element | `elements.semantic:role:main` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 13, 27, 41, 55, 69, 83, 97, 111, 125, 139, 153, 167, 181 |
| 14 | extra-element | `elements.status-badge` | {"actual":"extra annotated element","expected":"<not present>"} | 13 | 13 | 14, 28, 42, 56, 70, 84, 98, 112, 126, 140, 154, 168, 182 |

Shape labels describe report data only. They do not claim a root cause or importance level.

