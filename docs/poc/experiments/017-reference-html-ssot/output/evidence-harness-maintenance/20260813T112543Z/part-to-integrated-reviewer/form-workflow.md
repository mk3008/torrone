# Diagnostic review presentation

- Status: **pass**
- Complete raw evidence: `C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/017-reference-html-ssot/output/evidence-harness-maintenance/20260813T112543Z/form-heavy-partial/target-form.report.json`
- Raw SHA-256: `D208532EFB4D812AB2AFA0897C39A2DEA085D8B67D95D4CC85559C98014F5923`
- Raw differences: 192 (0 errors, 192 informational diagnostics)
- Reviewer entries: 21 (0 errors, 21 informational signatures)
- Grouping: exact diagnostic shape, state-independent observable path, and exact observation values.
- Trace: one-based indexes address the complete raw `differences` array; no raw entry is removed.

## Errors

None.

## Informational diagnostics

| # | Shape | Observable path | Exact values | Occurrences | States | Raw indexes |
| ---: | --- | --- | --- | ---: | ---: | --- |
| 1 | extra-element | `elements.navigation-current` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 6, 23, 41, 59, 76, 94, 110, 128, 146, 162, 180 |
| 2 | extra-element | `elements.navigation-empty` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 7, 24, 42, 60, 77, 95, 111, 129, 147, 163, 181 |
| 3 | extra-element | `elements.navigation-filter` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 8, 25, 43, 61, 78, 96, 112, 130, 148, 164, 182 |
| 4 | extra-element | `elements.navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 9, 26, 44, 62, 79, 97, 113, 131, 149, 165, 183 |
| 5 | extra-element | `elements.navigation-secondary` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 10, 27, 45, 63, 80, 98, 114, 132, 150, 166, 184 |
| 6 | extra-element | `elements.navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 11, 28, 46, 64, 81, 99, 115, 133, 151, 167, 185 |
| 7 | extra-element | `elements.semantic:controlled-by:navigation-parent` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 12, 29, 47, 65, 82, 100, 116, 134, 152, 168, 186 |
| 8 | extra-element | `elements.semantic:controlled-by:navigation-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 13, 30, 48, 66, 83, 101, 117, 135, 153, 169, 187 |
| 9 | extra-element | `elements.semantic:controlled-by:user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 14, 31, 49, 67, 84, 102, 118, 136, 154, 170, 188 |
| 10 | extra-element | `elements.semantic:role:banner` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 15, 32, 50, 68, 85, 103, 119, 137, 155, 171, 189 |
| 11 | extra-element | `elements.sign-out-action` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 16, 33, 51, 69, 86, 104, 120, 138, 156, 172, 190 |
| 12 | extra-element | `elements.theme-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 17, 34, 52, 70, 87, 105, 121, 139, 157, 173, 191 |
| 13 | extra-element | `elements.user-menu-toggle` | {"actual":"extra annotated element","expected":"<not present>"} | 11 | 11 | 18, 35, 53, 71, 88, 106, 122, 140, 158, 174, 192 |
| 14 | geometry | `elements.semantic:role:form.box.x` | {"actual":322.5,"delta":140,"expected":182.5} | 2 | 2 | 19, 72 |
| 15 | geometry | `elements.semantic:role:form.box.x` | {"actual":330,"delta":140,"expected":190} | 7 | 7 | 1, 36, 54, 89, 123, 141, 175 |
| 16 | geometry | `elements.semantic:role:form.box.y` | {"actual":180.19,"delta":10,"expected":170.19} | 9 | 9 | 2, 20, 37, 55, 73, 90, 124, 142, 176 |
| 17 | geometry | `elements.semantic:role:main.box.height` | {"actual":836,"delta":247.41999999999996,"expected":588.58} | 2 | 2 | 109, 161 |
| 18 | geometry | `elements.semantic:role:main.box.height` | {"actual":836,"delta":77.95000000000005,"expected":758.05} | 7 | 7 | 5, 40, 58, 93, 127, 145, 179 |
| 19 | geometry | `elements.semantic:role:main.box.x` | {"actual":322.5,"delta":140,"expected":182.5} | 2 | 2 | 21, 74 |
| 20 | geometry | `elements.semantic:role:main.box.x` | {"actual":330,"delta":140,"expected":190} | 9 | 9 | 3, 38, 56, 91, 107, 125, 143, 159, 177 |
| 21 | geometry | `elements.semantic:role:main.box.y` | {"actual":64,"delta":10,"expected":54} | 11 | 11 | 4, 22, 39, 57, 75, 92, 108, 126, 144, 160, 178 |

Shape labels describe report data only. They do not claim a root cause or importance level.

