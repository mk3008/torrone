# Diagnostic review presentation

- Status: **fail**
- Complete raw evidence: `docs/poc/experiments/017-reference-html-ssot/output/diagnostic-adoption/negative-focus.raw.report.json`
- Raw SHA-256: `1C52C5F276885ECF9C9CA8DB76991D7BAA70EFDD656F09A18ECDF1C9723371FC`
- Raw differences: 50 (2 errors, 48 informational diagnostics)
- Reviewer entries: 18 (1 errors, 17 informational signatures)
- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.
- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.

## Errors

| # | Kind | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | error | `elements.processing-notes-toggle.styles.outlineColor` | {"actual":"rgb(255, 0, 255)","expected":"rgb(134, 185, 238)"} | 2 | 2 | 17, 34 |

## Informational diagnostics

| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | extra-element | `elements.navigation-current` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 4, 21, 38 |
| 2 | extra-element | `elements.navigation-empty` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 5, 22, 39 |
| 3 | extra-element | `elements.navigation-filter` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 6, 23, 40 |
| 4 | extra-element | `elements.navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 7, 24, 41 |
| 5 | extra-element | `elements.navigation-secondary` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 8, 25, 42 |
| 6 | extra-element | `elements.navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 9, 26, 43 |
| 7 | extra-element | `elements.semantic:controlled-by:navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 10, 27, 44 |
| 8 | extra-element | `elements.semantic:controlled-by:navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 11, 28, 45 |
| 9 | extra-element | `elements.semantic:controlled-by:user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 12, 29, 46 |
| 10 | extra-element | `elements.semantic:role:banner` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 13, 30, 47 |
| 11 | extra-element | `elements.sign-out-action` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 14, 31, 48 |
| 12 | extra-element | `elements.theme-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 15, 32, 49 |
| 13 | extra-element | `elements.user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 3 | 3 | 16, 33, 50 |
| 14 | geometry | `elements.semantic:role:main.box.height` | {"actual":779.39,"delta":12.889999999999986,"expected":766.5} | 2 | 2 | 3, 37 |
| 15 | geometry | `elements.semantic:role:main.box.height` | {"actual":833.39,"delta":12.889999999999986,"expected":820.5} | 1 | 1 | 20 |
| 16 | geometry | `elements.semantic:role:main.box.x` | {"actual":380,"delta":140,"expected":240} | 3 | 3 | 1, 18, 35 |
| 17 | geometry | `elements.semantic:role:main.box.y` | {"actual":64,"delta":64,"expected":0} | 3 | 3 | 2, 19, 36 |

Shape labels describe report data only. They do not claim a root cause or importance level.

