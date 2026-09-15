---
type: PoC plan
title: Evidence Harness Maintenance Gate plan
status: completed; evidence-harness-maintained
source: fixed historical evidence, current implementation, and reproducible canaries
---

# Issue

Historical Gate entry points combine two different duties: preserving the
implementation hash used by the original experiment and running a current
regression. Relational, partial, and form-heavy scripts therefore reject the
current Core before testing behavior. The Diagnostic Review negative also
rejects a stronger current result because it encodes one historical signature
count rather than the injected-defect semantics.

# Customer

Reference Library maintainers and reviewers who need to distinguish immutable
historical proof from fresh evidence produced by the current CLI/Core.

# Customer Value

Maintainers can rerun the important historical contracts after Core evolution
without weakening comparison, negative, or provenance checks and without
overwriting the evidence that justified the original decisions.

# Acceptance Criteria

1. Preserve the bytes and recorded provenance of historical relational,
   partial, form-heavy, Diagnostic Review, and Conformance evidence.
2. Reproduce the stale-SHA stop for relational/partial/form and the old focus
   assertion's rejection of the current three-error result.
3. Keep historical entry-point hashes as historical provenance; do not relabel
   a current Core hash as the implementation that created old evidence.
4. Run equivalent relational, partial, and form-heavy Gate scripts against the
   current CLI/Core in isolated workspaces and preserve their full original
   assertions.
5. Replace only the transient Diagnostic focus assertion with a contract that
   requires the historical `filter-toggle` failure and permits additions only
   when every error is the exact focus-color mutation observed on
   `outlineColor`.
6. Reject missing required focus signatures, unrelated extra errors, changed
   expected/actual values, and an unexpected pass.
7. Record current CLI/Core/script/browser/output provenance separately from
   historical provenance.
8. Run Reference Conformance and retained historical, semantic-only, CSS,
   relationship, and Diagnostic Presentation regressions without weakening
   their semantics.
9. Keep fresh current output outside every historical output directory and
   prove no historical digest changed.
10. Add no Reference, Target, Consumer, raw schema, tolerance, comparison,
    Conformance-rule, or public API change.

# Verification Method

| Criterion | Repository verification |
| --- | --- |
| 1, 3, 9 | SHA/tree-digest manifest checked before and after all runs |
| 2 | deterministic JSON canary plus captured original-assert outcomes |
| 4 | isolated execution of the original scripts with only Core/CLI hash substitutions; exit 0 and original negative checks |
| 5, 6 | fixture tests for required, strengthened, missing, unrelated, wrong-value, and pass cases; live Diagnostic Gate run |
| 7 | machine-readable current provenance with source/transient script hashes, current CLI/Core hashes, browser lineage, and output digest |
| 8 | Conformance Gate, Diagnostic Presentation tests/trace, and named negative reports |
| 10 | fixed source hashes and scoped source scan/diff inspection |

# Scope In

- historical provenance for six evidence families, including the Diagnostic
  Presentation Adoption audit;
- one current-regression entry point that creates isolated disposable copies;
- transient hash substitution for three stale scripts;
- one reusable focus-negative contract used only by the transient Diagnostic
  script and its fixture tests;
- current regression artifacts under a new output family;
- result, verification, cost/decision, self-review, and cross-PoC knowledge.

# Scope Out

- editing historical Gate scripts or historical output;
- canonical Reference, Target, Consumer, CLI/Core, tolerance, and raw schema;
- new Conformance rules or Diagnostic Presentation grouping;
- Visual/Token ownership redesign;
- public provenance schema/API, package, MCP, Profile, or composite Reference;
- stage, commit, or push.

# Risks

- A temporary script transformation could change more than the intended hash
  guard or focus assertion. Exact replacement-count checks and transient-script
  hashes make that visible.
- Copying all evidence can mix stale and current files. Every Gate receives a
  separate clean temporary root and only its fresh output is promoted to a
  Core/CLI-addressed current directory.
- A required-signature subset alone could admit unrelated regressions. The
  selected contract additionally validates every error's property and exact
  expected/actual values.
- Browser timeouts could be mistaken for contract failure. Attempts, timeout,
  retry, executable, and browser version remain separate reliability evidence.

# Required Docs / Tests / Changeset

- this plan;
- immutable historical provenance JSON;
- focus failure-contract module and fixture tests;
- current-regression Gate script and generated provenance/evidence;
- result, verification, decision/cost, and two-cycle self-review records;
- README and cross-PoC boundary update if the result reaches the Gate.
- changeset: not applicable; no package or public API.

# Repository Evidence Plan

All acceptance criteria are repository-verifiable through fixed inputs,
browser-backed JSON, script tests, output digests, and captured logs.

# Supplementary Evidence Plan

None. Canonical UI does not change, so visual or human-supplied evidence is not
required.

# Open Questions

- Whether unrelated older exact-count assertions should later adopt their own
  semantic contracts is `UNCONFIRMED`; only the reproduced focus failure is
  changed in this Gate.
- Whether current-regression provenance should become a repository-wide format
  is `UNCONFIRMED`; this remains a PoC-local record.

# Options to compare

| Option | Decision reason |
| --- | --- |
| Keep current Core equal to historical Core | Preserves the old execution only; cannot test current behavior. |
| Delete implementation-hash checks | Reject; loses historical and current provenance. |
| Rewrite historical evidence with current output | Reject; destroys the time-of-creation boundary. |
| Keep historical bytes plus isolated current regression and separate provenance | Selected for the experiment; minimal authority change and no digest cascade. |
| Require exactly two focus errors | Reject; already rejects a valid stronger observation. |
| Require any failure or only one required path | Reject; admits unrelated extra regressions. |
| Require the historical path and constrain every added error to the exact injected focus-color observation | Selected for the experiment. |

# Ledger Snapshot

- **Goal:** restore current reruns without weakening historical or negative
  evidence.
- **Now:** complete; final evidence is under
  `output/evidence-harness-maintenance/20260813T112543Z/`.
- **Next:** audit the partial CSS negative's incidental focus observations
  before generalizing failure contracts.
- **Blockers:** none.
- **Evidence Ready?:** yes; canaries, six isolated Gate results, bounded focus
  fixtures, current provenance, and before/after historical integrity checks
  pass.

# Stop Conditions

Stop if successful repair requires changing evidence authority, choosing new UI
or failure meaning, changing comparison semantics/tolerance, editing a
Reference/Consumer, or introducing a public schema/API.
