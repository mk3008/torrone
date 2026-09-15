---
type: PoC experiment plan and ledger
title: Mixed semantic and stable-key experiment
status: complete; experiment partial
source: authored from accepted Reference and transferability evidence
---

# Issue

The accepted Reference and independent Target transfer through 27 explicit
stable keys, but the current all-or-nothing Core ignores semantic candidates as
soon as any `data-ref` exists. The prior audit identified plausible semantic
substitutes without proving that they remain stable across different business
copy, fixtures, DOM grouping, classes, and local IDs.

# Customer

Reference authors and Target implementers who need reliable cross-content UI
comparison without maintaining metadata that native HTML and ARIA already make
unambiguous.

# Customer Value

A bounded mixed-mode result can reduce author-maintained annotations while
retaining deterministic failure when semantics become ambiguous. A negative
result is equally useful because it prevents parser complexity from replacing
simple explicit keys without a real maintenance benefit.

# Acceptance Criteria

1. The accepted Reference and all prior transferability inputs/evidence stay
   byte-identical; all new evidence uses a separate output directory.
2. An experiment Reference Variant remains directly openable HTML/CSS/JavaScript
   and removes explicit keys only from a small, justified candidate set.
3. A content-different React Target Variant retains independent component,
   reducer, DOM, and Reference/vanilla-CSS boundaries.
4. Mixed capture deterministically identifies each migrated element without
   visible text, fixture values, class names, DOM position, or local ID spelling.
5. Ambiguous semantics fail closed and demonstrate why selected explicit keys
   remain necessary.
6. The mixed Target passes all 11 scenarios and the existing state, style,
   focus, interaction, bounded-a11y, console, and local-network gates.
7. New-output copies of the historical negative, semantic-only negative, and
   independent CSS negative still fail with their required defect signatures.
8. All 27 original keys receive a final evidence-based classification, and
   author/Core maintenance cost is compared with explicit-only mode.

# Verification Method

| Criterion | Method |
| --- | --- |
| 1 | Fixed SHA-256 assertions before and after the experiment; no command writes prior output paths. |
| 2 | Source inspection, direct browser capture, explicit/semantic key counts, and syntax checks. |
| 3 | Clean existing-version Vite build plus import, leakage, external-reference, and source-provenance checks. |
| 4 | Exact semantic-key assertions in Reference and Target snapshots plus cross-content/source evidence. |
| 5 | A reversible ambiguous-semantic mutation and a retained-key ambiguity probe. |
| 6 | CLI `verify` against the Variant baseline with report assertions. |
| 7 | Re-run each negative into `output/mixed-semantic/` and require CLI exit `1`. |
| 8 | Key-by-key result, conversion/correction ledger, and two-cycle self review. |

# Scope In

- Candidate batches drawn from the prior nine-key audit.
- A minimal mixed capture/resolution capability in the shared browser Core and
  action resolver only if it remains generic and fail-closed.
- One copied experiment Reference Variant and one copied prior independent
  Target Variant, modified only to isolate identification behavior.
- Gate-local JSON, screenshots, negatives, and cost records.

# Scope Out

- Accepted Reference edits, Reference/profile/key/API freeze, partial
  References, a second form-heavy Reference, conformance scoring, MCP,
  responsive/other-browser/real-AT work, Manifest migration, and Git
  stage/commit/push.
- Unrelated known comparison gaps such as cell-level grid rules and form values.

# Risks

- A selector may be unique only accidentally; mixed mode must reject ambiguity
  rather than select by order.
- Removing an attribute can force replacement selectors in Reference
  JavaScript, shifting rather than reducing maintenance cost.
- A generic semantic catalog can become a hidden profile or DSL. Only native
  roles and state/relationship semantics exercised by candidates are allowed.
- Reusing the already-independent Target CSS isolates matching behavior but
  does not constitute a second independent CSS-authoring proof.

# Required Docs / Tests / Changeset

- Mixed Reference and React Target Variants.
- Reproducible mixed Gate script and isolated evidence directory.
- Final key classification, cost/correction record, verification record,
  two-cycle self review, and bounded result.
- No Changeset for this repository-local PoC.

# Repository Evidence Plan

Use fixed-input hashes, source scans, Core/CLI syntax, clean build output,
browser snapshots/reports, exact mixed-key assertions, ambiguity negatives,
existing defect fixtures replayed to new output paths, and deterministic repeat
capture.

# Supplementary Evidence Plan

Inspect representative mixed Initial, Results, Empty, theme, and menu states
only if source and JSON cannot establish that the Variant remains a natural
business screen. Rendered review does not prove real AT or responsive behavior.

# Open Questions

- Do the eight strongest candidates reduce ongoing author metadata enough to
  justify the small shared-Core increase?
- Does action targeting by a unique ARIA state remain understandable, or is an
  explicit key simpler despite passing?
- Which candidates fail as soon as a second same-role element appears?
- Should business-noun keys be renamed now only inside the Variant, without
  implying a frozen vocabulary?

# Ledger Snapshot

- **Goal:** Measure whether mixed semantic/stable-key matching reduces human-
  maintained identity without weakening transferability or negatives.
- **Now:** The isolated mixed Variant, regressions, cost record, and two-cycle
  self review are complete with attainment `partial`.
- **Next:** Preserve the six-key evidence and choose at most one second-shape
  controller-relationship test before considering any accepted-input migration.
- **Blockers:** None. Any accepted-Reference edit or Reference-specific parser
  branch stops the experiment.
- **Evidence Ready?:** Yes for this bounded result; no for Profile/API freeze.
