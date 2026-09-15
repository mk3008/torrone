---
type: PoC validation record
title: Attempt 3 visual-binding candidate validation
status: passed with human gate pending
source: local non-destructive checks
---

# Validation record

| Check | Result | What it proves |
| --- | --- | --- |
| `015-reference-first-common-shell/check-reference.ps1` | pass | The approved Reference structural source remains valid. |
| `attempt-2/check-fixed-input.ps1` | pass | The approved Reference and auxiliary Manifest still match `9cd1932`; Attempt 3 did not edit them. |
| `attempt-2/check-product-input.ps1` | pass | The Attempt 2 product-owned input remains unchanged. |
| `reference-owned/check-visual-binding-provenance.ps1` | pass | Candidate token values and SVG paths are traceable to the approved Reference. |
| `validation/self-test-visual-bindings.ps1` | pass | A conforming temporary target passes; changed token, SVG path, and location declaration each fail. |
| source scan | pass | Candidate assets and validation contain no HTTP(S), CDN, or package dependency. |
| `git diff --check` | pass | The candidate has no whitespace errors. |

## Remaining human evidence

No Attempt 3 target exists by design, so no browser conformance capture is
available. The human gate reviews the chosen exact subset and browser review
procedure before inputs are frozen and Runs are dispatched.
