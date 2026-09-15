---
type: PoC plan
title: Partial CSS Negative Contract Audit plan
status: completed; historical-drift-confirmed
source: fixed historical evidence and isolated current-browser probes
---

# Issue

The historical partial CSS negative reports 20 errors across two normalized
signatures. A fresh current regression reports 22 errors across four
signatures. The two additions concern `query-filter` focus styles even though
the probe mutates only `.outline-action` border radius. Their cause and
contract ownership are not yet demonstrated.

# Customer

Reference Library maintainers and reviewers who rely on negative evidence to
detect regressions without accepting incidental failures or deleting stronger
observations.

# Customer Value

Maintainers can close the Evidence Harness maintenance investigation knowing
whether the added focus observations belong to the border-radius failure
contract, another valid responsibility, execution lineage, or a concrete
comparison/fixture defect.

# Acceptance Criteria

1. Preserve canonical Reference, Target, Consumer, CLI/Core, comparison,
   tolerance, historical evidence, and historical provenance bytes.
2. Reproduce the fresh 22-error/four-signature report with the current
   CLI/Core, current Edge lineage, and a fresh same-lineage baseline.
3. Compare the historical and fresh baseline, scenario, browser, mutation, and
   raw observation values directly rather than infer from counts.
4. Run isolated valid, exact-copy control, border-radius mutation, a control
   that removes path/copy as a variable, and restore checks.
5. Attribute each added signature to A, B, C, or D with repository evidence.
6. Keep required historical border-radius semantics and reject a simple count
   or unexplained allowlist as the future contract.
7. Change code only if a general comparison or fixture bug is proved; otherwise
   preserve raw evidence and record the correct ownership boundary.
8. Rerun the Evidence Harness Maintenance entry point and retain all six Gate,
   negative, Conformance, Presentation, provenance, and trace checks.
9. Record browser reliability separately from contract results and remove all
   temporary probe workspaces.
10. Run two self-review cycles and update cross-PoC knowledge only for a
    demonstrated general principle.

# Verification Method

| Criterion | Repository verification |
| --- | --- |
| 1 | fixed SHA/tree manifest before and after; scoped source hashes |
| 2–4 | browser-backed JSON from one audit entry point and exact raw-difference matrix |
| 5–7 | causal matrix plus bounded-contract fixtures that reject unrelated additions |
| 8 | full maintenance entry point exit 0 and fresh provenance |
| 9 | harness event record, browser executable/version/hash, cleanup scan |
| 10 | two-cycle self-review and long-lived boundary diff |

# Scope In

- historical and latest fresh partial CSS negative evidence;
- the `.outline-action` border-radius mutation;
- `search empty` step 1 focus observation;
- isolated same-lineage controls needed to separate mutation, file-copy path,
  scenario execution, and comparison behavior;
- one PoC-local failure-contract decision and full maintenance regression.

# Scope Out

- canonical UI or scenario changes;
- CLI/Core, comparison semantics, tolerance, or report schema changes unless a
  clear general bug is reproduced;
- general conversion of all negative assertions;
- new Harness framework, provenance schema, CLI API, Profile, MCP, Manifest,
  or Composite UI Reference work;
- stage, commit, or push.

# Risks

- A copied HTML file may change browser focus behavior independently of the CSS
  mutation. Exact-copy and same-location controls keep that variable visible.
- A fresh baseline can hide a target-side problem if captured from the same
  broken fixture. The baseline remains the fixed search-workspace Reference;
  controls vary only the Target copy and mutation.
- `:focus-visible` is browser-sensitive. Every probe records executable,
  version, viewport, and attempt order; repeats test determinism.
- A signature-only contract can admit unrelated state failures. The audit must
  bind state/action, property, exact expected/actual values, mutation target,
  and restore behavior where causality is proved.

# Required Docs / Tests / Changeset

- this plan;
- one isolated audit entry point and machine-readable evidence;
- a result, verification record, and two-cycle self-review;
- a minimal long-lived knowledge update only if a new general boundary is
  proved;
- changeset: not applicable; no package or public API.

# Repository Evidence Plan

Repository evidence is sufficient: fixed HTML, current CLI/Core, historical and
fresh JSON, real-browser control probes, hashes, and failure-contract fixtures.

# Supplementary Evidence Plan

None. No UI design changes or human visual judgment are in scope.

# Open Questions

- Whether the additions are caused by the border-radius mutation is
  `UNCONFIRMED` until the isolated matrix runs.
- Whether a browser `:focus-visible` condition belongs to Harness Reliability
  or exposes a fixture/comparison defect is `UNCONFIRMED` until exact-copy and
  same-location controls are compared.
- A general negative-contract helper remains `UNCONFIRMED`; one audit does not
  justify a public abstraction.

# Ledger Snapshot

- **Goal:** explain and classify the two added focus signatures without
  weakening negative evidence.
- **Now:** completed; the added focus signatures are execution-condition
  observations rather than radius-mutation failures.
- **Next:** close the Evidence Harness maintenance line and return to the
  deferred Composite UI Reference granularity experiment.
- **Blockers:** none.
- **Evidence Ready?:** yes; the isolated control/mutation/restore matrix and
  the full six-Gate current regression both passed.

# Stop Conditions

Stop if classification requires a new UI decision, human-owned failure meaning,
comparison semantics or tolerance changes, canonical Reference/Consumer edits,
authority changes, or a large Harness redesign.
