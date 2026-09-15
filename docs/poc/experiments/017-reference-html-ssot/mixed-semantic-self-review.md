---
type: Two-cycle self review
title: Mixed semantic and stable-key experiment self review
status: complete after final verification
source: post-implementation evidence review
---

# Cycle 1: Coarse Defect Extraction

## Potential Blockers

| Finding | Resolution |
| --- | --- |
| Target grouping added a scoped `header`, exposing incorrect banner inference. | Corrected general native-role inference and retained the independent Target DOM. |
| The first semantic-only regression passed by observing only four landmarks and ignoring different form-control counts. | Added pure-semantic native-role inventory comparison; the negative now fails on combobox count. Mixed baselines do not require whole-page role equality. |
| Role-only candidates looked stable only because the current screen had one instance. | Added an ambiguity probe, restored four candidates to explicit keys, and accepted only six bounded semantic identities. |
| A metadata-count win could hide central parser cost. | Recorded 27→21 attributes, unchanged Reference line count, four mixed Core concerns, and the approximately 88-line Core growth; selected `partial`, not `meets`. |

All blocking correctness findings were resolved without editing the accepted
Reference, weakening state/style failures, or writing prior evidence paths.

## Potential Non-Blockers

- 24 repeated geometry diagnostics remain the same approximately 5.2 px
  content-derived vertical offset from the prior Target Gate.
- Three Variant key renames are evidence, not an accepted-input migration.
- Reusing the fixed independent Target CSS isolates matching behavior; it is
  not presented as a second CSS-authoring proof.
- Seven browser startup timeouts are reported as environment/CLI instability;
  the final reproducible Gate passed with the existing debug switch.

## Evidence Weaknesses

- Only one accepted screen and one prior independent Target were tested.
- The pre-change Core line count is a working-session measurement rather than a
  frozen repository artifact; current source metrics are repository-visible.
- No independent evaluator generated a new Target from the mixed Variant.
- The ambiguity probe is intentionally small and cannot enumerate every valid
  enterprise-screen composition.

## Claim Overreach

The result does not say semantic matching is generally cheaper, all landmarks
are safe, 21 is a canonical count, business-neutral names are frozen, or the
Core is ready to become an API/Profile. It says six identities worked in this
bounded transfer while total-cost superiority remains unconfirmed.

# Cycle 2: Blocker Triage And Shape Check

## Merge Blockers

None for preserving this PoC packet with attainment `partial`. The final
integrated command passes after the role-inference, semantic-inventory, and
candidate-boundary corrections.

## Non-Blockers

- The mixed resolver contains candidate descriptors that were useful for the
  negative probe but not adopted as final identities; the result explicitly
  warns against expanding this catalog.
- Pure-semantic role-count comparison is deliberately not applied to mixed
  Targets because their business content can add controls and links.
- Reference conformance scoring remains out of scope despite a concrete future
  signal from semantic-key ambiguity.

## Evidence Shape Status

`pass` — fixed-input hashes, Variant source, source metrics, deterministic JSON,
Target/negative reports, ambiguity probe, and one reproducible command are all
inside the repository. Visual inspection is separated as supplementary proof.

## Reporting Shape Status

`pass` — the result leads with the limited capability gained, reports central
complexity and startup uncertainty, and distinguishes safe semantic identities,
explicit keys, and naming debt.

## Required Questions

- **Which criteria are proven?** Six-key semantic transfer, 21-key explicit
  remainder, different content/DOM/classes/IDs, scenario/state/style/focus/a11y
  pass, fail-closed ambiguity, and all requested negative outcomes.
- **Which are partial?** Net maintenance benefit, reuse across another screen,
  stable semantic catalog, and browser-start reliability.
- **What still depends on human acceptance?** Whether six fewer annotations
  justify the shared-Core complexity and whether a future conformance check is
  worth a separate PoC.
- **What wording would mislead?** “Semantic keys replace stable keys,” “mixed
  mode is cheaper overall,” “profile validated,” or “21 keys are sufficient.”

## Ready For PR?

`yes` as an uncommitted PoC packet with attainment `partial`; `no` for profile,
API, MCP, accepted-Reference migration, or Manifest replacement.

