---
type: verification record
title: aria-activedescendant relational observation Gate verification
status: partial
---

# `aria-activedescendant` relational observation Gate verification

## Primary repository evidence

| Evidence | Path / value |
| --- | --- |
| False-pass canary | `output/active-descendant-observation-canary/20260814T073329Z/` |
| Final Gate summary | `output/active-descendant-observation/20260814T075748Z/gate-summary.json` |
| Composite current regression | `output/composite-granularity/20260814T074337Z/gate-summary.json` |
| Retained full-Harness failure | `output/evidence-harness-maintenance/20260814T075010Z/current-regression-failure.json` |
| Diagnostic Review exact control | `output/active-descendant-observation/diagnostic-review-current-control/regression.search-workspace.report.json` |
| Immediate Diagnostic Review pass control | `output/active-descendant-observation/diagnostic-reproduction/report.json` |
| Diagnostic Adoption current control | `output/active-descendant-observation/diagnostic-adoption-current-control/gate-summary.json` |
| Fixed Composite Reference SHA-256 | `F7AE21DAE37C07965FF488435102B0B1DA7A12F8BC3D7DD66FC5E103DC135F03` |
| Fixed Composite Target SHA-256 | `1ED5AC6CD1C139B656D46DA11AC2C50637831EB55A22007D142CC2380FEA741C` |
| Current Core SHA-256 | `E62FD23295EFF665B8EC280B55AF4D40DD4E3B4063F5B40DAFA224ECA46C506F` |
| Current CLI SHA-256 | `19872837F9F7BEDE66F64C8F6C30AE20B769097E2C5374377394BBC7C4C07271` |

Reproduce the bounded relation checks and assemble the retained regression
result with:

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-activedescendant-observation.ps1 `
  -UseRecordedRegressionEvidence
```

Running the entry point without that switch attempts a fresh Composite and
all-six-family Evidence Harness regression. It currently stops at the recorded
focus-sensitive Diagnostic Review positive rather than weakening that check.

## Acceptance evidence

| Acceptance criterion | Result | Repository evidence |
| --- | --- | --- |
| current observation hole reproduced | pass | preserved pre-change wrong-target report passes with zero errors |
| different local IDs accepted | pass | `account-option-primary` and `carrier-option-primary` resolve to `entity-option-primary` |
| existing identity resolver reused | pass | no new semantic descriptor or fallback; relation uses captured identity map |
| state-aware observation | pass | relation exists only after keyboard move in both snapshots |
| wrong logical target | pass | one active-descendant relationship error |
| missing target | pass | one Conformance `missing-aria-reference` error |
| ambiguous identity | pass | duplicate identity plus relation mismatch; no position/text fallback |
| unchanged independent Target | pass | source hashes fixed; zero shared IDs/classes; zero annotation increase |
| Composite current regression | pass | current Composite summary and negative reports |
| all-six-family Evidence Harness | **not confirmed** | three runs stop at unrelated focus-sensitive Diagnostic Review positive |

## State evidence

Reference and Target snapshots both record:

- initial, query-open, selected, pointer-selected, empty, and clear states:
  relation absent;
- `keyboard entity selection`, step 2: relation target
  `entity-option-primary`, primary `aria-selected="true"`, input focus retained.

The valid Target comparison reports zero errors, ten informational
geometry/extra-element diagnostics, zero console errors, zero external
requests, and zero failed requests.

## Negative evidence

| Probe | Status | Errors / signatures |
| --- | --- | --- |
| wrong existing secondary option | fail | 1 / 1 |
| missing target Reference | error | 1 / 1 |
| duplicate explicit identity | fail | 11 / 2 |

The canary and negative use an actual `carrier-option-secondary` ID. The first
development canary used an empty ID and is intentionally excluded from final
authority.

## Regression evidence

`verify-composite-granularity.ps1` passed with the current implementation. Its
Entity Autocomplete Target comparison has zero errors, while the existing
family-sheet, completion, CSS, and relationship negatives still fail.

Three Evidence Harness runs reached the same point:

- `20260814T073739Z`;
- `20260814T074432Z`;
- `20260814T075010Z`.

Relational reuse, Partial Reference, Form-heavy Partial, and Reference
Conformance passed. Diagnostic Review then failed with exactly:

- `elements.query-filter.styles.outlineColor`;
- `elements.query-filter.styles.outlineStyle`.

The same Edge baseline/Target command also produced a direct zero-error pass.
This is execution-sensitive focus evidence, not an active-descendant failure.
Diagnostic Adoption, which the Harness did not reach, passed in a separate
isolated current control with zero timeout and retry.

## Supplementary evidence

None is required for the relational claim. No canonical visual design changed,
so screenshots are not used as acceptance authority.

## Confidence and limits

Confidence is high for the explicit-identity active-descendant comparison and
its wrong/missing/duplicate negatives. A clean full current Evidence Harness
run is `UNCONFIRMED`. A naturally semantic, unannotated active option was not
added merely to increase coverage; broader semantic-target and all-ARIA-
relation claims remain outside this Gate.

