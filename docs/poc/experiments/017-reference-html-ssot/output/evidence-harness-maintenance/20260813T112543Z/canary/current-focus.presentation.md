# Diagnostic review presentation

- Status: **fail**
- Complete raw evidence: `C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/017-reference-html-ssot/output/diagnostic-adoption/established-regression/injected-focus.report.json`
- Raw SHA-256: `FF48CC538FF74747C2392AFA5F5FA535E803804761B314D63F3385748869E360`
- Raw differences: 202 (3 errors, 199 informational diagnostics)
- Reviewer entries: 27 (2 errors, 25 informational signatures)
- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.
- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.

## Errors

| # | Kind | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | error | `elements.filter-toggle.styles.outlineColor` | {"actual":"rgb(255, 0, 170)","expected":"rgb(134, 185, 238)"} | 2 | 2 | 163, 183 |
| 2 | error | `elements.query-filter.styles.outlineColor` | {"actual":"rgb(255, 0, 170)","expected":"rgb(134, 185, 238)"} | 1 | 1 | 45 |

## Informational diagnostics

| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | extra-element | `elements.navigation-current` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 7, 32, 52, 71, 96, 115, 131, 150, 170, 190 |
| 2 | extra-element | `elements.navigation-empty` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 8, 33, 53, 72, 97, 116, 132, 151, 171, 191 |
| 3 | extra-element | `elements.navigation-filter` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 9, 34, 54, 73, 98, 117, 133, 152, 172, 192 |
| 4 | extra-element | `elements.navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 10, 35, 55, 74, 99, 118, 134, 153, 173, 193 |
| 5 | extra-element | `elements.navigation-secondary` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 11, 36, 56, 75, 100, 119, 135, 154, 174, 194 |
| 6 | extra-element | `elements.navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 12, 37, 57, 76, 101, 120, 136, 155, 175, 195 |
| 7 | extra-element | `elements.semantic:controlled-by:navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 13, 38, 58, 77, 102, 121, 137, 156, 176, 196 |
| 8 | extra-element | `elements.semantic:controlled-by:navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 14, 39, 59, 78, 103, 122, 138, 157, 177, 197 |
| 9 | extra-element | `elements.semantic:controlled-by:user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 15, 40, 60, 79, 104, 123, 139, 158, 178, 198 |
| 10 | extra-element | `elements.semantic:role:banner` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 16, 41, 61, 80, 105, 124, 140, 159, 179, 199 |
| 11 | extra-element | `elements.sign-out-action` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 17, 42, 62, 81, 106, 125, 141, 160, 180, 200 |
| 12 | extra-element | `elements.theme-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 18, 43, 63, 82, 107, 126, 142, 161, 181, 201 |
| 13 | extra-element | `elements.user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 10 | 10 | 19, 44, 64, 83, 108, 127, 143, 162, 182, 202 |
| 14 | geometry | `elements.result-pagination.box.width` | {"actual":1087,"delta":295,"expected":1382} | 2 | 2 | 22, 86 |
| 15 | geometry | `elements.result-pagination.box.x` | {"actual":309,"delta":280,"expected":29} | 2 | 2 | 20, 84 |
| 16 | geometry | `elements.result-pagination.box.y` | {"actual":717.5,"delta":10,"expected":707.5} | 2 | 2 | 21, 85 |
| 17 | geometry | `elements.result-table.box.width` | {"actual":1087,"delta":295,"expected":1382} | 2 | 2 | 25, 89 |
| 18 | geometry | `elements.result-table.box.x` | {"actual":309,"delta":280,"expected":29} | 2 | 2 | 23, 87 |
| 19 | geometry | `elements.result-table.box.y` | {"actual":505,"delta":10,"expected":495} | 2 | 2 | 24, 88 |
| 20 | geometry | `elements.semantic:controlled-by:filter-toggle.box.width` | {"actual":1087,"delta":295,"expected":1382} | 9 | 9 | 3, 28, 48, 67, 92, 111, 146, 166, 186 |
| 21 | geometry | `elements.semantic:controlled-by:filter-toggle.box.x` | {"actual":309,"delta":280,"expected":29} | 9 | 9 | 1, 26, 46, 65, 90, 109, 144, 164, 184 |
| 22 | geometry | `elements.semantic:controlled-by:filter-toggle.box.y` | {"actual":244,"delta":10,"expected":234} | 9 | 9 | 2, 27, 47, 66, 91, 110, 145, 165, 185 |
| 23 | geometry | `elements.semantic:role:main.box.width` | {"actual":1145,"delta":295,"expected":1440} | 10 | 10 | 6, 31, 51, 70, 95, 114, 130, 149, 169, 189 |
| 24 | geometry | `elements.semantic:role:main.box.x` | {"actual":280,"delta":280,"expected":0} | 10 | 10 | 4, 29, 49, 68, 93, 112, 128, 147, 167, 187 |
| 25 | geometry | `elements.semantic:role:main.box.y` | {"actual":64,"delta":10,"expected":54} | 10 | 10 | 5, 30, 50, 69, 94, 113, 129, 148, 168, 188 |

Shape labels describe report data only. They do not claim a root cause or importance level.

