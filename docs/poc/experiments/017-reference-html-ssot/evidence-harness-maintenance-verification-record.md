---
type: verification record
title: Evidence Harness Maintenance Gate verification
status: pass
source: repository commands and browser-backed JSON
---

# Evidence Harness Maintenance Gate verification

## Fixed implementation and run

| Item | Evidence |
| --- | --- |
| Core SHA-256 | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| CLI SHA-256 | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Maintenance entry point SHA-256 | `692829FEA16C54840248048620AF535FE1ECB507FF599E428CC4FF306E0B18B3` |
| Historical manifest SHA-256 | `D2DDF8102D236DFA588A47EC2196D4FB68C895C1DB9C59AAEC3ADFA098CD47EF` |
| Fresh run | `output/evidence-harness-maintenance/20260813T112543Z/` |
| Edge | `151.0.4129.78`, executable SHA in current provenance |
| Chrome | `151.0.7922.109`, executable SHA in current provenance |

## Repository checks

| Check | Result |
| --- | --- |
| PowerShell entry-point parse | pass |
| CLI/Core/failure-contract JavaScript syntax | pass |
| Focus failure-contract fixtures | pass, 7/7 |
| Existing Diagnostic Presentation fixtures | pass |
| Stale-SHA canaries | pass, three original entry points exit before validation |
| Saved strengthened focus canary | pass, old assertions reject and bounded contract accepts |
| Six isolated current Gate executions | pass |
| Fresh derived reviewer presentations | pass, four written, raw hashes unchanged |
| Historical manifest/entry-point/record/output check before run | pass |
| Same historical check after run | pass |
| Temporary workspace cleanup | pass, zero remaining roots |
| New source external-transport scan | pass |
| Canonical Reference / Target / Consumer / CLI / Core changes | zero |

The final maintenance command was:

```powershell
pwsh -NoProfile -File docs/poc/experiments/017-reference-html-ssot/verify-evidence-harness-maintenance.ps1
```

## Browser and Gate evidence

| Gate | Attempts | Timeout | Retry | Result |
| --- | ---: | ---: | ---: | --- |
| Relational reuse | 5 | 0 | 0 | pass |
| Partial Reference | 13 | 0 | 0 | pass |
| Form-heavy partial | 12 | 0 | 0 | pass |
| Reference Conformance | 51 | 0 | 0 | pass |
| Diagnostic Review | 18 | 0 | 0 | pass |
| **Fresh browser total** | **99** | **0** | **0** | **pass** |
| Diagnostic Adoption saved-evidence audit | historical 9 | 0 | 0 | pass |

Reference Conformance retained eight positive Reference shapes, nine
reversible probe families, the form `pass/error/pass` canary, and established
CSS, historical, and semantic-only negatives.

## Failure-contract checks

The contract fixes:

- raw status `fail` and raw error-summary consistency;
- required normalized path
  `elements.filter-toggle.styles.outlineColor`;
- all allowed additions to `elements.<key>.styles.outlineColor`;
- exact expected `rgb(134, 185, 238)` and actual `rgb(255, 0, 170)` values;
- complete equality between raw error indexes and presentation error indexes.

The seven fixtures cover historical strength, strengthened observation,
missing required signature, unrelated property, wrong values, unexpected pass,
and incomplete presentation trace.

## Reliability interpretation

No timeout or retry occurred in the retained final full run. The earlier development
stop happened before browser execution because the first maintenance checker
used the wrong digest-relative root. It was a maintenance-script defect, not a
browser or UI result; it was corrected and its incomplete current-output run
was removed.
