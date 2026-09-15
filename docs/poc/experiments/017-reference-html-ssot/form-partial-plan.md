---
type: PoC gate plan and ledger
title: Form-heavy partial Reference reuse Gate
status: completed; form-partial-beneficial
source: fixed PoC 017 evidence and form-heavy Phase instruction
---

# Issue

The previous Gate found that two responsibility-complete partial References
could reduce local review surface and guide one independent Target. That result
used a search-centered workflow. It does not show whether the same approach
survives a form-heavy edit/validation/review flow, where field relationships,
focus, error recovery, and action hierarchy are more tightly coupled.

# Customer

Reference authors, human design reviewers, AI implementers, and CLI maintainers
deciding whether partial References remain a lower-cost design asset outside
search/list screens.

# Customer Value

A reviewer can approve or correct one complete form responsibility without
rereading an application shell, while an implementer can combine that form
Reference with the already fixed common shell to build a different business
screen. The experiment makes recurring CSS synchronization and diagnostic-noise
cost visible before any shared infrastructure is proposed.

# Candidate boundary

Create one standalone **form workflow** Reference containing the fields,
normal state, submit validation, inline error relationships, correction,
review-before-confirmation state, and edit return. Keep these together because
their state and focus transitions form one human-reviewable responsibility.

Do not split fields, validation messages, confirmation, or actions into smaller
References. Doing so would distribute one causal interaction contract across
files and create implicit ordering or duplicated state meaning.

Reuse the existing `common-shell / navigation` Reference by path and fixed hash;
do not copy or modify it.

# Acceptance Criteria

1. A standalone buildless form-heavy Reference is understandable in a browser
   and exposes normal, validation, correction, review, and edit-return behavior
   with fixed local data and one excluded review harness.
2. Validation is visible without color alone, fields use stable accessible
   error relationships, invalid submission focuses the first invalid field, and
   correction updates both presentation and ARIA state.
3. The fixed common-shell Reference remains byte-identical and its existing
   contract still captures deterministically.
4. One content-, fixture-, DOM-grouping-, class-, local-ID-, state-, and
   CSS-independent Target combines the shell and form design without runtime
   composition, new framework, package, or external request.
5. Current CLI/Core compares shell and form contracts against the integrated
   Target with zero errors across state, style, focus, interaction, and bounded
   accessibility; thresholds are unchanged.
6. A small current-Phase state/style or accessibility defect fails with a
   focused signature, while existing historical and semantic-only negatives
   remain failures.
7. Source evidence records new author/review size, explicit/semantic identity,
   harness/JS cost, natural corrections, Target lookup ambiguity, and any
   Reference dependency or complexity signal.
8. CSS evidence compares the new form Reference with the fixed shell and the
   previous search workspace, including repeated tokens, semantically repeated
   declarations, and the files touched by one shared design change.
9. Diagnostic evidence classifies actual error findings separately from extra-
   part and integrated-layout information noise and reports whether useful
   review remains practical.
10. The accepted Reference, prior partial sources/Target/output/docs, CLI, and
    prior Gate packets remain fixed before and after the experiment.

# Verification Method

| Criterion | Verification |
| --- | --- |
| 1–2 | CLI snapshot with scenario replay, exact state/focus/relationship assertions, and rendered browser review. |
| 3 | Fixed SHA-256 plus repeated common-shell snapshot digest and contract assertions. |
| 4 | Source/import/network/leak scans, class/ID/style-source independence checks, and rendered integrated Target review. |
| 5 | Separate Target-to-shell and Target-to-form CLI reports with error and bundle-health assertions. |
| 6 | Disposable current-Phase negative plus fresh existing negative checks; no canonical mutation. |
| 7–9 | Generated JSON metrics, diagnostic classification, correction ledger, and direct source inspection. |
| 10 | Fixed file hashes and aggregate packet digests checked before and after the Gate. |

# Scope In

- One standalone form workflow Reference under
  `variants/05-form-heavy-partial/reference/`.
- One independent integrated Target under
  `variants/05-form-heavy-partial/target/`.
- Scenario override values required only to keep Target fixture vocabulary
  independent.
- Separate `output/form-heavy-partial/` evidence.
- A reproducible Gate script and bounded plan/result/cost/review/verification/
  self-review records.
- Minimal cross-PoC guidance update only for findings actually reproduced
  across the search and form phases.

# Scope Out

- Editing or redesigning any accepted/prior Reference or Target.
- Splitting individual fields/messages/actions into a catalog.
- Common CSS/token infrastructure, imports, build, runtime composition,
  composition API, scope metadata, or diagnostic suppression.
- Reference conformance/preflight, Profile/key/CLI API freeze, MCP, responsive,
  other browsers, real AT, Manifest/OKF migration, stage, commit, or push.

# Risks

- Validation relationships may require many explicit keys and make metadata
  reduction less valuable than clear identity.
- A review state can turn the Reference into a small application if fixture
  transformation or workflow branching grows.
- Shell plus form verification may repeat the previous extra-element and
  integrated-layout diagnostic noise at a larger scale.
- Theme/focus/error styles may duplicate existing tokens across a third
  standalone Reference, increasing shared-change cost.
- A visually plausible form can still have broken focus recovery or stale
  `aria-invalid`/`aria-describedby` state.
- Content-independent scenario fills require a Target override file; it must
  remain input vocabulary only, not a duplicate expected-state source.

# Required Docs / Tests / Changeset

- Plan/ledger, form Reference, independent Target, scenario overrides, Gate
  script, JSON/PNG evidence, cost record, business-screen review, verification
  record, two-cycle self review, and result.
- No Changeset: this is a docs-first PoC and publishes no package.

# Repository Evidence Plan

Use source hashes/digests, exact observation inventories, deterministic browser
capture, scenario replay, relationship/focus assertions, independent source
scans, Target comparison reports, CSS/JS metrics, and disposable negatives.
These prove the mechanical contract and measured maintenance surface.

# Supplementary Evidence Plan

Inspect final normal, validation, corrected/review, edit-return, light, and dark
screenshots at the acceptance viewport. Screenshots are required for realistic
form hierarchy and copy judgment but cannot prove keyboard or real assistive-
technology behavior; browser state evidence supplies only bounded coverage.

# Fixed evidence

- Accepted Reference SHA-256:
  `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056`.
- Common-shell SHA-256:
  `08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527`.
- Core SHA-256:
  `14BB52C2C60B9DA9A27B7593C772B09E18A2DA2A79AD7C129827330C0D4077EA`.
- CLI SHA-256:
  `7109A169EB8F6EA7C1483B2C14C8A9711560667ECD80DFDCCCC19380E38A8837`.
- Fixed previous Partial Reference packet: 98 files, digest
  `72B69347C75CC6EFABF647B2CE8E31C7D9B98220CB9E4501181D81A564C0D9D3`.

# Open Questions

- Is one form workflow still small enough to review without becoming a second
  application?
- Do stable error-message relationships make explicit keys clearly preferable
  in this screen type?
- Does common-shell pass unchanged on a second integrated Target?
- Do CSS/token synchronization and information diagnostics recur strongly
  enough to become separate next-Phase problem statements?
- Is the review-before-confirmation boundary useful without specifying the
  final backend transaction or post-submit navigation?

# Ledger Snapshot

- **Goal:** Determine whether responsibility-complete partial References remain
  beneficial for a form-heavy screen and reproduce prior cross-part costs.
- **Now:** The standalone Reference, independent Target, mechanical Gate,
  human review, cost record, and self-review are complete.
- **Next:** Preserve the evidence and decide separately whether diagnostic
  presentation or token-authoring cost warrants a future bounded PoC.
- **Blockers:** Any required prior-Reference edit, large Core/CLI change,
  runtime/shared-style infrastructure, or unresolved workflow choice.
- **Evidence Ready?:** Yes; the Gate passed with fixed inputs and preserved
  negatives. No blocker was reached.
