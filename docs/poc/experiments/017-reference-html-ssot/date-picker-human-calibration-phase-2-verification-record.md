---
type: verification record
title: DatePicker Human Calibration Phase 2 verification
status: pass
source: current CLI/Core browser evidence and preserved historical provenance
---

# DatePicker Human Calibration Phase 2 verification

## Primary evidence

| Item | Evidence |
| --- | --- |
| Human-approved Reference SHA-256 | `387EC789769DE702263A802DE27368EA2128A2F27C25002E494C00DC65CC5D86` |
| Final Phase 2 run | `output/date-picker-human-calibration-phase-2/20260814T070736Z/` |
| Gate summary | `output/date-picker-human-calibration-phase-2/20260814T070736Z/gate-summary.json` |
| Preserved pre-followup report | `output/date-picker-human-calibration-phase-2/20260814T062509Z/pre-followup-target.verify.json` |
| Current Core SHA-256 | `F09AF96679EC529718AC3766DF19431AECC0A222A91A32523EA56C12CCC47285` |
| Unchanged CLI SHA-256 | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Full current regression | `output/evidence-harness-maintenance/20260814T065303Z/current-regression-provenance.json` |

Reproduce the bounded Gate with:

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-date-picker-human-calibration-phase2.ps1
```

## Acceptance evidence

| Criterion | Result | Repository evidence |
| --- | --- | --- |
| approved Reference unchanged | pass | before/after SHA and four historical-tree digests in `gate-summary.json` |
| mismatch detected before follow-up | pass | `1,384` errors / `110` signatures / `92` diagnostics in preserved report |
| final Target comparison | pass | `25` elements, `22` scenarios, `58` actions, zero errors |
| Reference Conformance | pass | `59` checked states, zero errors |
| state/style/focus/interaction | pass | current baseline-to-Target report and scenario screenshots |
| bounded accessibility | pass | zero issues in Reference and Target states |
| console/network | pass | zero console errors, external requests, and failed requests |
| CSS/DOM/local-ID independence | pass | distinct style hashes; zero shared class tokens and local IDs |
| fixture/content independence | pass | October shipment fixtures, 15 value-only overrides, leakage scan zero |
| harness isolation | pass | Target harness roots zero |
| historical evidence preservation | pass | Composite, Phase 1, accepted Single, and approved Range tree digests unchanged |

## Negative evidence

| Probe | Expected and observed result |
| --- | --- |
| unkeyed description visibility | fail, two errors / one relationship signature |
| missing description in comparison | fail, two errors / one relationship signature |
| missing description in Conformance | error, `missing-aria-reference` |
| selected endpoint background | fail, 43 errors / two style signatures; required `backgroundColor` detected |
| omitted explicit focus restoration after one-click completion | fail, eight `document.activeRef` errors |

Existing current regressions also passed:

- Phase 1 Single: 6 elements, 4 scenarios, 11 actions;
- Phase 1 Range: 8 elements, 4 scenarios, 14 actions;
- accepted Single: 17 elements, 15 scenarios, 34 actions;
- Composite Range Target: zero comparison errors;
- isolated Evidence Harness Maintenance: Relational reuse, Partial Reference,
  Form-heavy Partial, Reference Conformance, Diagnostic Review, and Diagnostic
  Adoption all passed; the retained run records 99 browser attempts with zero
  timeout and zero retry where browser attempts apply.

One earlier non-retained maintenance invocation exceeded the caller's five-
minute limit while a Chrome/CDP preflight process remained active. The owned
process and exact temporary root were stopped and removed. The retained full
rerun completed in `314.6` seconds without timeout or retry. This is execution-
reliability evidence, not a DatePicker or Core correctness failure.

## Limits

The CLI still treats geometry as diagnostic rather than an automatic error.
Live input values are represented through observable validation, selection,
and status states rather than a direct value-property comparison. Real AT,
responsive behavior, production data, and backend behavior were not tested.
