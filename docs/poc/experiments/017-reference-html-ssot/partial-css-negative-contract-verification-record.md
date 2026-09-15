---
type: verification record
title: Partial CSS Negative Contract Audit verification
status: pass; historical-drift-confirmed
source: repository commands and browser-backed JSON
---

# Partial CSS Negative Contract Audit verification

## Fixed inputs and final evidence

| Item | Evidence |
| --- | --- |
| Core SHA-256 | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| CLI SHA-256 | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Historical provenance manifest SHA-256 | `D2DDF8102D236DFA588A47EC2196D4FB68C895C1DB9C59AAEC3ADFA098CD47EF` |
| Audit run | `output/partial-css-negative-contract/20260813T131903Z/` |
| Current full regression | `output/evidence-harness-maintenance/20260813T132628Z/` |
| Edge | `151.0.4129.78`, executable SHA `AF02A342B7E6FA7D1154D9152B5997FF2BE300B3A7A678FEAAE863C9FBEA32CB` |
| Chrome | `151.0.7922.109`, executable SHA `B24F7C774A5485E65DAE2C88EB0014C3482795BF8A8A37FC6A637B40D23CBC13` |

## Commands

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-partial-css-negative-contract.ps1
& docs/poc/experiments/017-reference-html-ssot/verify-evidence-harness-maintenance.ps1
node --test docs/poc/experiments/017-reference-html-ssot/review/partial-css-failure-contract.test.mjs
node --test docs/poc/experiments/017-reference-html-ssot/review/focus-failure-contract.test.mjs
```

## Audit checks

| Check | Result |
| --- | --- |
| Historical 20/2 shape | pass; two radius signatures and exact `6px -> 20px` values |
| Saved fresh 22/4 shape | pass; radius plus two `query-filter` focus signatures |
| Fresh Reference capture | pass; two captures retained rather than retried into sameness |
| Exact-source control identity | pass; eight controls share one source digest |
| Mutated-source identity | pass; both mutation reports share one distinct digest |
| Saved-baseline contract | pass; 20 mutation-only radius errors |
| Fresh-baseline contract | pass; 20 mutation-only radius errors |
| Secondary focus attribution | pass; both normalized focus signatures observed in exact controls |
| Restore | pass; temporary Target restored byte-identically |
| Health | pass; zero console, external-request, and failed-request observations in every audit report |
| Audit harness reliability | 12 browser attempts, zero timeout, zero retry |
| Partial CSS contract fixtures | pass, 10/10 |
| Focus contract fixtures | pass, 9/9 |

The retained audit matrix classifies the result as
`C-harness-baseline-browser-condition` and records
`mutationCausalForAddedFocusSignatures: false`.

## Complete current regression

| Gate family | Result | Retained evidence |
| --- | --- | --- |
| Relational reuse | pass | transfer and ambiguity fail-closed behavior |
| Partial Reference | pass | positive parts, historical/semantic/CSS negatives |
| Form-heavy partial | pass | positive workflow and relationship negative |
| Reference Conformance | pass | positive shapes, reversible negatives, established comparative negatives |
| Diagnostic Review | pass | fresh comparisons, bounded focus negative, raw/presentation trace |
| Diagnostic Adoption | pass | fixed raw audit and deterministic derived presentation |

Fresh browser attempts were 5 + 13 + 12 + 51 + 18 = 99, with zero timeout
and zero retry. Diagnostic Adoption separately audited its already-fixed
nine-attempt evidence.

The current Partial Reference CSS negative remains `fail` with 22 errors/four
signatures. The form relationship negative remains `fail` with six errors/four
signatures. Current browser reports recorded zero console errors, external
requests, and failed requests for these probes.

## Historical and current evidence separation

`current-regression-provenance.json` records:

- historical manifest verified before and after;
- historical evidence modified: `false`;
- current Core/CLI and entry-point hashes;
- six current Gate output tree digests;
- Edge and Chrome executable versions and hashes;
- nonauthoritative derived presentation provenance.

The historical manifest, its six entry points, six verification records, and
six output trees therefore remain authority for their original runs. The
timestamped outputs are current evidence and do not relabel historical bytes.

## Scope and cleanup

Canonical Reference, Target, Consumer, CLI, Core, comparison semantics,
tolerance, and raw schema changes: zero. The audit and maintenance scripts
removed all of their guarded temporary roots. New source files contain no
external transport or dependency mechanism. Stage, commit, and push were not
performed.
