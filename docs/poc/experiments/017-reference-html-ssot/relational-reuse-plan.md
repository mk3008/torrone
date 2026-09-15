---
type: PoC gate plan and ledger
title: Relational semantic identity reuse gate
status: completed; mixed-beneficial
source: prior PoC 017 evidence and fixed resolver
---

# Issue

The mixed experiment showed that four regions could be identified through an
already-keyed controller and its native `aria-controls` relationship. That
evidence came from one access-review-shaped screen. It remains unknown whether
the same resolver pays for itself on a second, naturally different business
screen without new heuristics or author-only semantics.

# Customer

Reference authors and tool maintainers deciding whether relational semantic
identity is a reusable low-cost aid or whether explicit stable keys should
remain the default for everything except obvious landmarks.

# Customer Value

This Gate ends the current mixed-mode investigation with evidence rather than
key-reduction preference. A positive result permits cautious reuse of the
existing relation rule. A negative result establishes a simpler explicit-key
default before more Core complexity accumulates.

# Acceptance Criteria

1. The accepted Reference, Transferability packet, Mixed packet, existing
   negatives, shared Core, and CLI stay byte-identical.
2. A small buildless Reference uses a business shape unlike the access-review
   search/grid screen and contains only naturally needed `aria-controls`
   relationships.
3. A content-, fixture-, DOM-grouping-, class-, and local-ID-different Target
   reproduces the selected observable state/style/focus/interaction result.
4. Existing relational semantic identities resolve with the current Core and
   CLI without a new heuristic, exception, metadata kind, or fallback.
5. Ambiguity remains zero; an intentional duplicate-controller relationship
   fails closed rather than using DOM order, text, fixture, class, or ID spelling.
6. Console, external/failed requests, duplicate keys, bounded accessibility,
   unnamed AX controls, and action errors are all zero in positive evidence.
7. Existing historical, semantic-only, and CSS negatives remain unchanged and
   fail when replayed to a new output directory.
8. Reference author cost, explicit-key alternative cost, Core maintenance cost,
   and DevTools startup attempts/timeouts are recorded.
9. Only cross-experiment principles with appropriate evidence are promoted to
   a clearly scoped long-lived PoC knowledge authority.

# Verification Method

| Criterion | Method |
| --- | --- |
| 1 | Fixed SHA-256 for Reference/Core/CLI and deterministic aggregate digests for prior Transferability/Mixed packets, before and after. |
| 2 | Direct source and rendered inspection; scan for external communication, data layers, and unnecessary relationships. |
| 3 | CLI snapshot/verify against separate Reference and Target files; source-difference metrics. |
| 4 | Assert exact generated keys and unchanged Core/CLI hashes. |
| 5 | Reversible duplicate-controller Variant must expose a semantic ambiguity and omit that identity. |
| 6 | JSON assertions across initial and scenario states. |
| 7 | Copy existing reports into the new evidence packet after checking their preserved statuses/signatures; do not overwrite or unnecessarily rerun fixed fixtures. |
| 8 | Source metrics, correction ledger, reproducible Gate log, and cost comparison. |
| 9 | Authority review against root README, Profile, and experiment ladder; link one scoped knowledge document only if needed. |

# Scope In

- One compact checklist/board Reference and one independently authored Target.
- Naturally occurring user-menu and filter-disclosure relationships only.
- Existing `semantic:controlled-by:*`, `banner`, and `main` resolver behavior.
- Three bounded interaction scenarios: filter pointer/keyboard round trip and
  user-menu Escape recovery.
- Separate output under `output/relational-reuse/`.

# Scope Out

- Core/CLI semantic additions, accepted input edits, Profile/key/API freeze,
  partial References, form-heavy application behavior, conformance CLI, MCP,
  responsive/other-browser/real-AT work, Manifest migration, and Git
  stage/commit/push.
- Previously recorded grid, pagination, placement, and form-value gaps.

# Risks

- Recreating all four prior relationships would bias the UI toward the prior
  shell; only relationships justified by the new task are permitted.
- Two omitted attributes may be too small a local saving to justify the shared
  Core; total maintenance cost must decide the Gate.
- A superficially different screen may still reuse implementation source. The
  Target therefore uses different business content, DOM grouping, classes,
  local IDs, and CSS source organization.
- DevTools startup instability can weaken evidence independently from identity
  correctness; attempts and timeouts must remain separate.

# Required Docs / Tests / Changeset

- `variants/03-relational-reuse/` Reference, Target, and ambiguity probe.
- Reproducible verification script and separate evidence.
- Screen review, verification/cost record, two-cycle self review, and result.
- One scoped long-lived knowledge document only if authority review confirms no
  existing suitable source.
- No Changeset for this repository-local PoC.

# Repository Evidence Plan

Use source hashes/digests, exact observation inventories, interaction reports,
ambiguity assertions, source-difference metrics, fixed negative integrity, and
Markdown/source checks. The Gate must pass without editing Core or CLI.

# Supplementary Evidence Plan

Inspect Reference and Target Initial, filter-open, and user-menu-open captures
at `1280 x 800`. Rendered evidence judges business-screen naturalness and lack
of artificial controls; it does not prove keyboard or assistive technology.

# Open Questions

- Do two natural relationships on a second screen sufficiently amortize the
  already-paid central resolver cost?
- Is controller identity plus native `aria-controls` clearer to authors than a
  second explicit key on the controlled region?
- Does the evidence support `mixed-beneficial`, `semantic-minimal`, or only a
  bounded `partial` result?

# Ledger Snapshot

- **Goal:** Reuse the existing relational resolver on a second natural screen
  and conclude the current mixed-mode investigation.
- **Now:** The isolated Reference/Target, unchanged-resolver comparison,
  ambiguity probe, screen review, and knowledge promotion are complete.
- **Next:** Stop semantic expansion; reuse the narrow boundary only in a future
  independently motivated Reference.
- **Blockers:** Any required Core/CLI semantic change or unnatural relationship.
- **Evidence Ready?:** Yes; the Gate is `mixed-beneficial` with two natural
  relations reused, zero new heuristics, and fail-closed ambiguity.
