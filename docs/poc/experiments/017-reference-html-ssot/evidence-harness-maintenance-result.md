---
type: PoC result
title: Evidence Harness Maintenance Gate result
status: evidence-harness-maintained
source: immutable historical evidence plus isolated current regression
---

# Evidence Harness Maintenance Gate result

## Attainment

**`evidence-harness-maintained`**

The two reported maintenance failures were reproduced and repaired without
changing the canonical Reference, any Target or Consumer, CLI/Core comparison
semantics, tolerance, Conformance rules, raw report schema, or Diagnostic
Presentation utility.

Historical evidence and current regression now have separate responsibilities:

- `review/historical-evidence-provenance.json` fixes the entry point,
  verification record, implementation provenance, file count, and tree digest
  for the six evidence families exercised by this Gate;
- the original scripts and historical output directories remain byte-identical;
- `verify-evidence-harness-maintenance.ps1` runs disposable copies with current
  implementation guards and writes only to a timestamped current-evidence
  family;
- `current-regression-provenance.json` records the current Core, CLI, transient
  entry points, browsers, outputs, and reliability separately.

This is a PoC-local maintenance pattern. It is not a provenance schema, public
API, Profile, or repository-wide migration.

## Reproduced problems and original intent

| Problem | Reproduction | Original evidence intent | Repair |
| --- | --- | --- | --- |
| Historical Core SHA stops | Original relational, partial, and form entry points exited before browser validation and reported the historical and current Core hashes. | Prove which implementation produced the historical evidence and detect silent implementation drift. | Keep the old guard and evidence immutable; substitute current Core/CLI hashes only in disposable current-regression scripts and record both historical and current provenance. |
| Focus negative rejects a stronger result | Historical raw evidence has two errors/one signature. The saved strengthened current result has three errors/two signatures, so both old exact-count assertions reject it. | Preserve the injected focus-color failure and prove raw-to-presentation error visibility. | Require the historical `filter-toggle` signature and bound every addition to the same `outlineColor`, expected color, mutated color, severity, and exact presentation trace. |

The focus contract rejects a pass, a missing required signature, an unrelated
property, wrong expected/actual values, and an incomplete presentation trace.
It accepts the saved three-error result without deleting the additional
`query-filter` observation. Seven fixture tests and both historical-strength
and strengthened saved evidence pass the contract.

## Current regression

Fresh run: `output/evidence-harness-maintenance/20260813T112543Z/`

| Gate | Result | Important retained evidence |
| --- | --- | --- |
| Relational semantic reuse | pass | positive transfer and ambiguity fail-closed behavior |
| Partial Reference | pass | historical negative, semantic-only negative, CSS negative, positive part-to-integrated comparisons |
| Form-heavy partial | pass | historical negative, semantic-only negative, relationship negative, positive form workflow |
| Reference Conformance | pass | eight positive shapes, nine reversible probe families, CSS/historical/semantic-only negatives |
| Diagnostic Review | pass | four fresh current comparisons, bounded live focus negative, raw/presentation trace, Conformance negatives |
| Diagnostic Presentation Adoption | pass | immutable raw audit, deterministic derived outputs, failure isolation, saved strengthened focus evidence |

The five browser-backed Gate executions recorded 99 attempts, zero timeout,
and zero retry. Edge `151.0.4129.78` and Chrome `151.0.7922.109` executable
hashes are in current provenance. The Adoption audit reads its already-fixed
browser evidence; its historical nine attempts are not added to the 99 fresh
attempts.

Four reviewer JSON/Markdown pairs were regenerated from the fresh partial and
form raw reports. They are explicitly nonauthoritative derived artifacts, and
the publisher proved the raw hashes unchanged.

## Negative and Conformance evidence

| Evidence | Fresh result |
| --- | --- |
| Historical comparative negative | fail, 32 errors, 15 signatures |
| Semantic-only negative | fail, one `semanticInventory.combobox` signature |
| Partial CSS negative | fail, 22 errors, four signatures; required border-radius failure retained |
| Form relationship negative | fail, six errors, four signatures |
| Conformance CSS negative | fail, two errors, one signature |
| Live Diagnostic focus negative | fail, two errors, required focus signature; bounded contract pass |
| Saved strengthened focus canary | fail, three errors, two signatures; bounded contract pass |

The fresh partial CSS negative has two more errors and two more signatures than
its historical saved result. They are `query-filter` focus observations, while
the injected mutation changes border radius. The existing Gate records them in
complete raw evidence but only requires the historical border-radius path.
This experiment did not invent a semantic explanation or broaden its contract;
the case remains a concrete candidate for a separate negative-contract audit.

## Authority and scope

Historical bytes were checked before and after the complete run. The
provenance manifest, six historical entry points, six verification records,
and six historical output trees all retained their fixed hashes/digests.
Disposable workspaces were removed, and fresh output never entered a historical
directory.

No human design or failure-semantics decision was required for the two reported
issues. No UI review was needed because no UI source changed.

## New limits and next phase

- Only the reproduced focus mutation has a demonstrated bounded-addition
  contract. Generalizing this helper or replacing other exact-count assertions
  is unconfirmed.
- Partial CSS negative additions need an evidence-specific meaning audit before
  changing that Gate.
- The historical provenance JSON and timestamped current layout remain PoC
  artifacts; do not freeze them as a schema or API.
- Composite References, Consumer validation-metadata interference, Profile/API
  freeze, MCP, and Manifest/OKF migration remain deferred.

Recommended next: perform a small negative-contract audit for the partial CSS
probe, then return to the queued Composite UI Reference experiments only if
that audit does not reveal a broader comparison or fixture defect.
