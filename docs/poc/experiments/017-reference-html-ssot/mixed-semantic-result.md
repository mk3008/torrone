---
type: PoC experiment result
title: Mixed semantic and stable-key experiment result
status: partial
source: repository verification and bounded rendered review
---

# Goal

Determine whether native semantics can reduce author-maintained stable-key
metadata without weakening the accepted Reference's independent transferability
and defect detection.

# Attainment Status

- **Experiment status:** `partial`
- **Workflow attainment:** `partial`

Six semantic identities worked and explicit metadata fell from 27 to 21 while
all requested transfer and negative gates held. The total maintenance benefit
is not yet proven because the shared Core gained material matching complexity
and only one screen/Target pair was exercised.

# Outcome

Reference authors can omit explicit keys for the document banner/main and four
regions that are uniquely controlled by already-keyed buttons in this bounded
screen. They should retain explicit keys for actions, repeated roles,
conditional unroled states, and representative style points. The experiment
also removed three business-specific key names inside the Variant only.

# Why It Matters

The result replaces the prior “nine plausible candidates” estimate with a
tested six-key boundary and concrete counterexamples. It avoids promoting
semantic uniqueness that breaks when a second table, menuitem, live region,
navigation landmark, or stateful button appears.

# Actions Taken

- Added isolated Reference and React Target Variants plus an ambiguity probe.
- Added fail-closed mixed capture/action resolution and correct scoped-header
  landmark inference to the shared Core.
- Added pure-semantic role inventory comparison after the old semantic-only
  negative initially passed incorrectly.
- Added a fixed-input, separate-output verification Gate and evidence records.
- Left the accepted Reference, fixed Transferability Target/evidence, Manifest,
  and Git index untouched.

# Code Changes

- `core/browser-core.js`: mixed semantic indexing/resolution, relationship keys,
  scoped banner inference, ambiguity and semantic inventory observation.
- `cli/reference-ui.mjs`: scenario actions resolve explicit or semantic keys;
  pure-semantic baselines compare role inventory.
- `variants/02-mixed-semantic/`: Reference, React Target, and ambiguity probe.
- `verify-mixed-semantic.ps1`: isolated fixed-input and regression Gate.
- `output/mixed-semantic/`: new evidence only.

# Verification Methods

- Fixed SHA-256/digest checks before and after work.
- Node syntax checks and clean existing-version Vite build.
- Repeated Reference browser capture and full Target CLI verification.
- Source leakage, external-reference, business-key, CSS-provenance checks.
- Explicit semantic ambiguity, historical defect, semantic-only, and CSS
  negatives.
- Direct Initial screenshot inspection and two-cycle self review.

# Repository Evidence

- `mixed-semantic-key-classification.md`
- `mixed-semantic-cost-record.md`
- `mixed-semantic-verification-record.md`
- `output/mixed-semantic/source-metrics.json`
- `output/mixed-semantic/reference.snapshot.json`
- `output/mixed-semantic/target.report.json`
- `output/mixed-semantic/semantic-ambiguity.snapshot.json`
- `output/mixed-semantic/historical-negative.report.json`
- `output/mixed-semantic/semantic-only-consumer.report.json`
- `output/mixed-semantic/style-negative.report.json`

# Supplementary Evidence

`output/mixed-semantic/target/00-initial.png` was inspected for visible
regression and harness leakage. It supports, but does not replace, the browser
JSON and source evidence.

# Review Triage

- **Blockers:** None for the bounded `partial` result.
- **Non-blockers:** 24 geometry diagnostics; seven pre-Gate DevTools startup
  timeouts; fixed CSS reused intentionally; three names changed only in Variant.
- **Human dependence:** Whether the 22.2% Reference-annotation reduction is
  worth approximately 88 additional shared-Core lines across a future catalog.

# Semantic failures observed

1. Tag-name-only banner inference broke on a valid Target `main > header`.
2. `aria-pressed` and `aria-expanded` were ambiguous with two controls.
3. `menuitem`, `navigation`, `table`, and `aria-live=polite` were ambiguous with
   two normal instances.
4. Pure semantic comparison initially ignored unmatched form controls and
   falsely passed until role inventory was added.

# Reference-complexity finding

No Reference DOM or line-count growth occurred, and no DSL/metadata block was
added. Complexity shifted into the shared Core. This is the main reason the
result is `partial` rather than `meets`.

# Future conformance evidence

Yes, a concrete signal exists: adding a same-role element can make a generated
identity disappear. This Gate asserts an exact semantic inventory and zero
ambiguities, but a reusable lightweight conformance check may be worth a later
separate experiment. No scoring CLI or frozen rule was added now.

# Now / Next

- **Now:** Preserve the six-key result as evidence; do not migrate the accepted
  Reference or freeze a mixed Profile.
- **Next:** Prefer one very small second-shape test of controller-relationship
  identities. If it does not amortize Core complexity or repeats ambiguity,
  keep explicit keys as the default.

# Open Questions

- Does another screen naturally reuse the four controlled-region identities?
- Can the Core candidate catalog shrink after separating tested failures from
  adopted behavior?
- Is startup instability reproducible outside this desktop environment?
- Would a conformance preflight be simpler than expanding runtime comparison?

