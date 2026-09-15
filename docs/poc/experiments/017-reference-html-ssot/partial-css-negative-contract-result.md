---
type: PoC result
title: Partial CSS Negative Contract Audit result
status: historical-drift-confirmed
source: immutable historical evidence, isolated current-browser probes, and current regression
---

# Partial CSS Negative Contract Audit result

## Attainment

**`historical-drift-confirmed`**

The two added `query-filter` focus signatures are not caused by the
`.outline-action` border-radius mutation. They are browser execution-condition
observations that can appear in an exact, unmutated Target control and can
reverse or disappear across separate captures with the same Edge executable,
version, viewport, source bytes, scenario, and active element.

The partial CSS negative still proves its intended failure: every isolated
mutation run produced 20 mutation-only errors across the two normalized
`borderRadius` signatures for the two elements selected by `.outline-action`,
with exact values `6px -> 20px`. The focus differences remain in complete raw
evidence but are excluded from that mutation contract.

## Direct evidence

The historical and saved fresh evidence share the same saved Reference
baseline, Target source, Edge version, viewport, CLI, and Core:

| Evidence | Errors / normalized signatures | Meaning |
| --- | --- | --- |
| Historical partial CSS negative | 20 / 2 | only the two required radius signatures |
| Saved fresh partial CSS negative | 22 / 4 | the radius signatures plus `query-filter` `outlineColor` and `outlineStyle` |

In both focus states, `document.activeRef` is `query-filter`. The saved
Reference observation has a solid focus outline, while current captures can
observe the non-`:focus-visible` outline values. A programmatic `fill` focuses
the input, but the browser does not provide a stable focus-visible modality
across separate launches.

The retained final audit at
`output/partial-css-negative-contract/20260813T131903Z/` used one byte-identical
temporary Target source, one radius-mutated source, and restoration to the
original source digest:

| Baseline | Exact controls before/after mutation | Mutation | Contract result |
| --- | --- | --- | --- |
| Saved focus-visible baseline | `0, 2, 0, 0` errors | 22 errors / 4 signatures | 20 errors / 2 signatures are mutation-only; focus is secondary |
| Fresh current baseline | `0, 0, 0, 2` errors | 20 errors / 2 signatures | 20 errors / 2 signatures are mutation-only; focus is secondary |

The exact control source digest is common to all eight controls. The two
mutation reports share a second, distinct source digest. The temporary file
was restored byte-identically and its workspace was removed.

## Classification and contract decision

Classification is **C — Harness / baseline / browser execution condition**.

The added focus signatures are valid raw differences relative to a particular
captured baseline, but they are not implementation differences attributable to
the radius mutation. They therefore do not enter the partial CSS mutation
contract and are not reassigned to a new validation system.

The PoC-local contract now:

- derives the affected stable keys from the element tags actually matched by
  `.outline-action`;
- requires multiple exact, unmutated controls around the mutation;
- refuses the contract if a control already contains an affected radius path;
- keeps every control and mutation raw error in evidence;
- treats only normalized secondary signatures observed in exact controls as
  execution-condition observations;
- requires every remaining mutation-only observation to be one of the two
  derived `borderRadius` paths with exact `6px -> 20px` values;
- rejects a pass, missing affected element, wrong value, unexplained extra
  signature, one-control invocation, or a mutation path already present in a
  control.

This is not an error-count contract, suppression list, tolerance, or change to
CLI/Core comparison semantics.

## Necessary changes

- Added a PoC-local isolated audit entry point.
- Added a small contract evaluator and ten fixture tests.
- Extended the existing PoC-local focus failure contract to accept the two
  exact computed expected colors present in the immutable source: foreground
  color when focus-visible is absent and the focus token when it is present.
  The mutated color, property boundary, required historical signature, raw
  trace, and rejection of any unexplained expected color remain fixed.
- Updated only the current-maintenance focus fixture count.

No canonical Reference, Target, Consumer, CLI, Core, comparison tolerance,
comparison semantics, raw-report schema, or historical evidence changed.

## Correction cost

The Reference authoring cost was zero: no HTML, CSS, scenario, stable key, or
fixture changed. The audit needed one PowerShell entry point, one focused
JavaScript evaluator, fixture tests, and this evidence set. The first strict
shape assertion and a repeated-baseline hash assertion both stopped on real
focus-modality variation; retaining those failed current runs made the
contract boundary observable instead of converting the variation into an
allowlist.

## Full current regression

Fresh run: `output/evidence-harness-maintenance/20260813T132628Z/`

All six Gate families passed. The five browser-backed current Gate executions
recorded 99 attempts, zero timeouts, and zero retries; the sixth family audits
its fixed nine-attempt evidence. Historical evidence and current regression
provenance remain separate.

The full regression deliberately still records the partial CSS negative as 22
errors/four signatures. Nothing was removed to recover the historical count.
Historical, semantic-only, CSS, form-relationship, and focus negatives still
fail; Conformance positives/negatives pass their expected contracts; and four
raw-to-derived Diagnostic Presentation families retain complete hash and raw
index traceability.

## Scope decision

No human design or failure-semantics decision is required. No structural
comparison or fixture defect was found. The Evidence Harness Maintenance line
can close at this boundary. The recommended next phase is the deferred
Composite UI Reference granularity experiment, not Profile/API freeze, MCP,
Manifest migration, or further harness expansion.
