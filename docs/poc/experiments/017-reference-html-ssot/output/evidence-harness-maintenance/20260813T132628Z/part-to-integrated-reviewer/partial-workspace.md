# Diagnostic review presentation

- Status: **pass**
- Complete raw evidence: `C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/017-reference-html-ssot/output/evidence-harness-maintenance/20260813T132628Z/partial-reference/target-workspace.report.json`
- Raw SHA-256: `71C6B4BBB7A2E1D41651AC75F61938923DAADFBD982191B5A2C4AA6E2F0A6ADE`
- Raw differences: 199 (0 errors, 199 informational diagnostics)
- Reviewer entries: 25 (0 errors, 25 informational signatures)
- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.
- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.

## Errors

None.

## Informational diagnostics

| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | extra-element | `elements.navigation-current` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 7, 32, 51, 70, 95, 114, 130, 149, 168, 187 |
| 2 | extra-element | `elements.navigation-empty` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 8, 33, 52, 71, 96, 115, 131, 150, 169, 188 |
| 3 | extra-element | `elements.navigation-filter` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 9, 34, 53, 72, 97, 116, 132, 151, 170, 189 |
| 4 | extra-element | `elements.navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 10, 35, 54, 73, 98, 117, 133, 152, 171, 190 |
| 5 | extra-element | `elements.navigation-secondary` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 11, 36, 55, 74, 99, 118, 134, 153, 172, 191 |
| 6 | extra-element | `elements.navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 12, 37, 56, 75, 100, 119, 135, 154, 173, 192 |
| 7 | extra-element | `elements.semantic:controlled-by:navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 13, 38, 57, 76, 101, 120, 136, 155, 174, 193 |
| 8 | extra-element | `elements.semantic:controlled-by:navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 14, 39, 58, 77, 102, 121, 137, 156, 175, 194 |
| 9 | extra-element | `elements.semantic:controlled-by:user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 15, 40, 59, 78, 103, 122, 138, 157, 176, 195 |
| 10 | extra-element | `elements.semantic:role:banner` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 16, 41, 60, 79, 104, 123, 139, 158, 177, 196 |
| 11 | extra-element | `elements.sign-out-action` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 17, 42, 61, 80, 105, 124, 140, 159, 178, 197 |
| 12 | extra-element | `elements.theme-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 18, 43, 62, 81, 106, 125, 141, 160, 179, 198 |
| 13 | extra-element | `elements.user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 19, 44, 63, 82, 107, 126, 142, 161, 180, 199 |
| 14 | geometry | `elements.result-pagination.box.width` | {"actual":1087,"delta":295,"expected":1382} | 2 | 2 | 22, 85 |
| 15 | geometry | `elements.result-pagination.box.x` | {"actual":309,"delta":280,"expected":29} | 2 | 2 | 20, 83 |
| 16 | geometry | `elements.result-pagination.box.y` | {"actual":717.5,"delta":10,"expected":707.5} | 2 | 2 | 21, 84 |
| 17 | geometry | `elements.result-table.box.width` | {"actual":1087,"delta":295,"expected":1382} | 2 | 2 | 25, 88 |
| 18 | geometry | `elements.result-table.box.x` | {"actual":309,"delta":280,"expected":29} | 2 | 2 | 23, 86 |
| 19 | geometry | `elements.result-table.box.y` | {"actual":505,"delta":10,"expected":495} | 2 | 2 | 24, 87 |
| 20 | geometry | `elements.semantic:controlled-by:filter-toggle.box.width` | {"actual":1087,"delta":295,"expected":1382} | 9 | 9 | 3, 28, 47, 66, 91, 110, 145, 164, 183 |
| 21 | geometry | `elements.semantic:controlled-by:filter-toggle.box.x` | {"actual":309,"delta":280,"expected":29} | 9 | 9 | 1, 26, 45, 64, 89, 108, 143, 162, 181 |
| 22 | geometry | `elements.semantic:controlled-by:filter-toggle.box.y` | {"actual":244,"delta":10,"expected":234} | 9 | 9 | 2, 27, 46, 65, 90, 109, 144, 163, 182 |
| 23 | geometry | `elements.semantic:role:main.box.width` | {"actual":1145,"delta":295,"expected":1440} | 10 | 10 | 6, 31, 50, 69, 94, 113, 129, 148, 167, 186 |
| 24 | geometry | `elements.semantic:role:main.box.x` | {"actual":280,"delta":280,"expected":0} | 10 | 10 | 4, 29, 48, 67, 92, 111, 127, 146, 165, 184 |
| 25 | geometry | `elements.semantic:role:main.box.y` | {"actual":64,"delta":10,"expected":54} | 10 | 10 | 5, 30, 49, 68, 93, 112, 128, 147, 166, 185 |

Shape labels describe report data only. They do not claim a root cause or importance level.

