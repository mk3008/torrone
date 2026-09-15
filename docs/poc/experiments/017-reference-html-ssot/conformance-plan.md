---
type: PoC gate plan and ledger
title: Reference Conformance and absolute invariant Gate
status: completed
source: fixed PoC 017 evidence and Reference Conformance Phase instruction
---

# Issue

Comparative validation can prove that a Target reproduces a Reference, but it
cannot reject a defect reproduced by both. The form-heavy Gate contained one
such defect: validation code introduced an empty `aria-invalid` attribute,
while CSS and summary logic required the literal value `true`. Inline messages
appeared, but the summary and invalid-field styling did not. Reference and
Target matched, so comparison passed.

The unresolved question is whether a small, deterministic, Reference-only
preflight can detect this and a few other objective contradictions without
turning design judgment into a score, modifying approved References, or
placing a new contract on Consumer frontends.

# Customer

Reference authors and human reviewers who need mechanically decidable defects
removed before design review, plus CLI maintainers who need a clear boundary
between absolute Reference checks and Target comparison.

# Customer Value

Authors can run one command on a Reference and receive pass/fail evidence for
objective broken relationships, ambiguous identity, execution errors, and the
reproduced validation contradiction. Reviewers can spend time on design
judgment rather than defects that a browser can determine without a Target.

# Acceptance Criteria

1. A `preflight` command operates on one Reference without a baseline or
   Target, returns deterministic JSON, uses exit `0` for pass, `1` for detected
   conformance errors, and `2` for tool/runtime failure, and emits no score.
2. Disposable copies reproduce the form-heavy defect exactly: the broken
   Reference and broken independent Target still pass comparative validation,
   while preflight fails the broken Reference on a focused absolute invariant.
3. The canary invariant does not reject an empty `aria-invalid` value merely
   because it is empty. It fails only when an interaction state introduces a
   false-equivalent value while native validity is false and a newly associated
   visible description is present.
4. Existing Core primitives are reused for bounded accessibility, unnamed AX
   controls, duplicate stable identity, semantic ambiguity, network, console,
   and scenario action failures; their logic is not copied into a second
   validator.
5. New checks are limited to objective Reference contradictions: unresolved
   `aria-describedby`/`aria-labelledby`/`aria-errormessage` ID references,
   invalid explicit `label[for]` targets, unsupported non-empty
   `aria-invalid` tokens, and `data-ref` inside an excluded harness.
6. At least one positive/break/restore cycle is demonstrated for the canary and
   every new invariant family. Existing negative fixtures are reused for
   semantic ambiguity and bounded accessibility rather than duplicated.
7. The approved integrated Reference, mixed and relational variants, both
   existing partial References, the form Reference, and the semantic-only
   Reference all pass preflight with no error.
8. Existing snapshot and comparative verification behavior remains valid: the
   accepted Reference captures, the independent form Target still passes, and
   historical plus semantic-only negatives still fail with their established
   signatures.
9. No approved/prior Reference, Target, evidence packet, test threshold, or
   Consumer source changes. References gain no metadata, wrapper, ARIA, schema,
   DSL, runtime, or build step.
10. Harness attempts, timeouts, and retries are recorded separately from the
    conformance result.

# Verification Method

| Criterion | Verification |
| --- | --- |
| 1 | CLI syntax/usage probes, pass/fail exit assertions, report schema assertions, and repeat-report comparison after normalizing source path/digest where a disposable restored copy is used. |
| 2–3 | Exact one-occurrence source mutations in a unique temporary directory, broken Reference snapshot, broken Target verify, broken Reference preflight, and restored Reference preflight. |
| 4 | Source inspection plus report provenance values distinguishing reused bounded/Core issues from new absolute issues. |
| 5–6 | One minimal valid fixture, reversible one-defect mutations, focused error-code assertions, and existing negative fixture execution. |
| 7 | Preflight all seven existing Reference shapes and assert zero errors. |
| 8 | Fresh snapshot/verify runs in a new output directory with historical signature assertions. |
| 9 | fixed hashes and aggregate form-heavy packet digest checked before and after; Consumer tree digest checked before and after. |
| 10 | Gate wrapper records every browser invocation and timeout retry. |

# Scope In

- A small `preflight` command in the existing PoC CLI.
- A Core inspection primitive invoked only by preflight.
- One minimal valid fixture under `variants/06-reference-conformance/`.
- Disposable canary and one-defect mutations produced by the Gate script.
- Separate `output/reference-conformance/` JSON evidence.
- A Gate script, result, invariant classification, verification record, two-
  cycle self review, README update, and minimal cross-PoC knowledge update.

# Scope Out

- Canonical design changes to any existing Reference.
- Any Consumer source or Consumer conformance requirement.
- Target stable-key, Reference Profile, or CLI API freeze.
- Design scoring, layout/workflow/style-quality rules, visual comparison,
  aesthetic judgment, or automatic design decisions.
- New Reference metadata, wrappers, validation-only ARIA, schema, DSL, build,
  runtime composition, package, framework, or dependency.
- Shared CSS/tokens, diagnostic-noise work, catalog/reference-granularity
  experiments, composite UI References, MCP, responsive, another browser,
  real AT, Manifest/OKF migration, stage, commit, or push.

# Risks

- WAI-ARIA defines empty `aria-invalid` as false-equivalent, so treating every
  empty value as an invalid token would be a false positive and would not be an
  objective invariant.
- A visible `aria-describedby` target is not necessarily an error message. The
  canary must also require a newly introduced false-equivalent ARIA state and
  failed native validity; custom validation outside native validity remains
  unconfirmed.
- Adding issues to the ordinary capture path could accidentally change
  comparative Consumer requirements. New inspection data must remain opt-in to
  preflight.
- Re-emitting existing bounded checks under new code could create divergent
  logic. Aggregation should consume existing snapshot/network/AX results.
- Raw repeated-state findings could become noisy. Report signatures must remain
  focused without suppressing actual state occurrences.
- DevTools startup can time out independently of Reference quality.

# Required Docs / Tests / Changeset

- Plan/ledger, Core/CLI change, one valid fixture, Gate script, JSON evidence,
  invariant classification, result, verification record, two-cycle self
  review, README and observation-boundary updates.
- No screen-review artifact is required because no approved UI design changes.
- No Changeset: this PoC publishes no package.

# Repository Evidence Plan

Use deterministic preflight reports, canary comparative/preflight reports,
focused reversible negatives, seven positive Reference shapes, existing
negative fixtures, fresh accepted/form comparison regression, source scans,
fixed hashes, and packet digests. This is sufficient to prove the bounded
mechanical claim in-repository.

# Supplementary Evidence Plan

No visual or external-system evidence is required. Official WAI-ARIA and HTML
standards are used only to bound the candidate invariants: empty
`aria-invalid` is false-equivalent, ARIA relationship values are ID references,
and an explicit label `for` value must identify a labelable element.

# Fixed Evidence

- Accepted Reference SHA-256:
  `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056`.
- Form Reference SHA-256:
  `A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4`.
- Form Target SHA-256:
  `84DBFB367754C963A8897C64B84B887B61CF30D257EC7A1A3D791253529FE048`.
- Common shell SHA-256:
  `08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527`.
- Pre-change Core SHA-256:
  `14BB52C2C60B9DA9A27B7593C772B09E18A2DA2A79AD7C129827330C0D4077EA`.
- Pre-change CLI SHA-256:
  `7109A169EB8F6EA7C1483B2C14C8A9711560667ECD80DFDCCCC19380E38A8837`.
- Fixed form-heavy evidence packet: 98 files, digest
  `E3DDFE25D0855B6ADE922DC0625F6DA7A6BFFF66444234FA9491F4AA201F5D91`.

# Open Questions

- Does the cross-state canary invariant remain focused on the reproduced defect
  without rejecting any existing Reference shape?
- Are unresolved ID references and harness/key conflicts valuable enough beyond
  existing bounded accessibility to justify the small new Core primitive?
- Can malformed scenario contracts be represented as conformance errors without
  broad CLI restructuring, or should they remain tool failures in this PoC?
- Does issue aggregation stay readable across repeated scenarios?

# Ledger Snapshot

- **Goal:** Prove or reject a low-false-positive, Reference-only absolute
  conformance preflight.
- **Now:** The opt-in preflight, exact canary, reversible probes, comparative
  regression, evidence audit, and two-cycle self review are complete.
- **Next:** Human review of the bounded result only; no design decision is
  required to accept the mechanical Gate.
- **Blockers:** Any required approved-Reference edit, Consumer rule, subjective
  design decision, large Core redesign, or authority change.
- **Evidence Ready?:** Yes; the final Gate completed 51 browser invocations
  with zero timeouts/retries and preserved the fixed form-heavy packet.
