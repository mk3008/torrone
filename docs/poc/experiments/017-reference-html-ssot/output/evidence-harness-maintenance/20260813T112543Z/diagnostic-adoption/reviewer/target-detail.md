# Diagnostic review presentation

- Status: **pass**
- Complete raw evidence: `docs/poc/experiments/017-reference-html-ssot/output/diagnostic-adoption/target-detail.raw.report.json`
- Raw SHA-256: `CAE446977E0952A5CB03B54351D95DD21DB6CCC1B05DA9C31630B12D26F76FA0`
- Raw differences: 48 (0 errors, 48 informational diagnostics)
- Reviewer entries: 17 (0 errors, 17 informational signatures)
- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.
- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.

## Errors

None.

## Informational diagnostics

| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | extra-element | `elements.navigation-current` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 4, 20, 36 |
| 2 | extra-element | `elements.navigation-empty` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 5, 21, 37 |
| 3 | extra-element | `elements.navigation-filter` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 6, 22, 38 |
| 4 | extra-element | `elements.navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 7, 23, 39 |
| 5 | extra-element | `elements.navigation-secondary` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 8, 24, 40 |
| 6 | extra-element | `elements.navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 9, 25, 41 |
| 7 | extra-element | `elements.semantic:controlled-by:navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 10, 26, 42 |
| 8 | extra-element | `elements.semantic:controlled-by:navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 11, 27, 43 |
| 9 | extra-element | `elements.semantic:controlled-by:user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 12, 28, 44 |
| 10 | extra-element | `elements.semantic:role:banner` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 13, 29, 45 |
| 11 | extra-element | `elements.sign-out-action` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 14, 30, 46 |
| 12 | extra-element | `elements.theme-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 15, 31, 47 |
| 13 | extra-element | `elements.user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 16, 32, 48 |
| 14 | geometry | `elements.semantic:role:main.box.height` | {"actual":779.39,"delta":12.889999999999986,"expected":766.5} | 2 | 2 | 3, 35 |
| 15 | geometry | `elements.semantic:role:main.box.height` | {"actual":833.39,"delta":12.889999999999986,"expected":820.5} | 1 | 1 | 19 |
| 16 | geometry | `elements.semantic:role:main.box.x` | {"actual":380,"delta":140,"expected":240} | 3 | 3 | 1, 17, 33 |
| 17 | geometry | `elements.semantic:role:main.box.y` | {"actual":64,"delta":64,"expected":0} | 3 | 3 | 2, 18, 34 |

Shape labels describe report data only. They do not claim a root cause or importance level.

