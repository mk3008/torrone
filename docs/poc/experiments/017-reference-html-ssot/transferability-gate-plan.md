---
type: PoC gate plan and ledger
title: Current Reference transferability gate
status: complete; gate meets
source: authored
---

# Issue

The approved current Reference has browser-observed state, style, focus,
interaction, and bounded accessibility evidence, but its current React evidence
shares CSS with an older vanilla Target. It is still unconfirmed whether the
current Reference can guide a content-different Target with independent DOM,
component/state structure, and CSS while the existing CLI/Core compares the
observable result rather than implementation source.

# Customer

The customers are reviewers and engineers who want to use a directly reviewed
Reference as an AI implementation input without requiring every Target to use
the same framework, DOM structure, state model, CSS source, or business data.

# Customer Value

A passing gate would let the team proceed to another bounded experiment knowing
that the current Reference can transfer through observable behavior and style,
not only through shared source. A failing gate will identify the specific
Reference or general CLI/Core boundary that needs human review before broader
adoption.

# Acceptance Criteria

1. The approved Reference file stays byte-identical at SHA-256
   `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056`.
2. A new Target uses different business nouns, copy, identifiers, fixtures,
   React components, DOM grouping, and reducer-managed state.
3. The Target imports no Reference or old-Target CSS and its stylesheet is not
   a renamed source copy.
4. The current CLI/Core reports `pass` against the approved Reference baseline,
   including all 11 scenario paths and 27 stable keys.
5. Target console/action errors, external/failed requests, duplicate keys,
   bounded accessibility issues, and unnamed accessibility-tree controls are
   all zero.
6. The Target contains no Reference scenario selector or product-visible test
   harness.
7. Reference fixture/copy leakage and prohibited source sharing scans pass.
8. Existing complete regression, historical negative, and semantic-only
   negative behavior remain unchanged.
9. A separate reversible Target-style mutation fails with a focused computed-
   style signature and does not overwrite existing evidence.
10. Stable-key use, correction cost, useful/insufficient Reference evidence,
    comparison boundaries, and remaining uncertainty are recorded.

# Verification Method

| Criterion | Method |
| --- | --- |
| 1 | Hash the Reference before and after all work; gate script rejects drift. |
| 2 | Source inspection, distinct fixture/copy scan, React production build, rendered screenshots. |
| 3 | Import/path scan, stylesheet hashes, normalized similarity evidence, and manual source review. |
| 4–6 | Capture a Gate-local snapshot from the fixed Reference, then run CLI `verify` plus report assertions. Historical baselines are not overwritten. |
| 7 | Exact forbidden-string and cross-file reference scans. |
| 8 | Existing `verify.ps1`. |
| 9 | Copy the built Target to a temporary directory, inject one CSS override, require CLI exit `1`, and assert its signature. |
| 10 | Gate result, stable-key audit, correction ledger, screen review, and two-cycle self-review. |

# Scope In

- One content-different React/Vite Target using only dependency versions already
  present in PoC 017.
- Independent CSS authored in the new Target package.
- Current Reference initial/Results/Empty, shell/navigation, filters, grid,
  pagination, theme, user menu, focus, and action scenarios.
- Minimal general CLI/Core correction only if evidence shows a non-Target-
  specific observation defect.
- Gate-local reports and screenshots without overwriting historical outputs.

# Scope Out

- Reference edits, MCP, responsive/other-browser/real-AT evidence, partial
  References, file-layout selection, a second Reference, profile/API freeze,
  Manifest replacement, or Git stage/commit/push.

# Risks

- Exact selected computed styles may reward source imitation rather than visual
  understanding; source-independence evidence must be reviewed separately.
- Content-dependent geometry and accessibility-tree role counts can differ
  without a design defect.
- Stable keys may be necessary for matching yet still impose authoring cost.
- A CLI pass can miss important visible hierarchy or realistic task-flow issues;
  rendered review remains required.
- Changing the CLI for one Target could weaken the gate. Any change must be
  general, minimal, and pass old negatives.

# Required Docs / Tests / Changeset

- New Target source/package and independent stylesheet.
- Gate verification script, current Target report/screenshots, independent
  style-negative report, stable-key audit, correction ledger, business-screen
  review, verification record, result, and self-review.
- No Changeset because this is a repository-local PoC.

# Repository Evidence Plan

Use source hashes, import/copy/leakage scans, production build output, CLI JSON,
determinism and negative reports, old regression results, and explicit report
assertions. Keep current gate evidence under `output/transferability-gate/`.

# Supplementary Evidence Plan

Inspect the Target Initial, Results, Empty, Dark, and user-menu screenshots at
`1440 x 900`. Screenshots support realism and visual hierarchy but do not prove
keyboard or assistive-technology behavior; those remain CLI/source checks.

# Open Questions

- Do all 27 keys earn their maintenance cost in this transfer?
- Which visual relationships remain human-reviewed because geometry is only
  diagnostic and visible text is intentionally not compared?
- Does independent CSS require any generally useful CLI observation that the
  current comparison omits?
- Is passing one integrated Target enough to proceed to a partial-Reference
  experiment without freezing a profile? It is not enough to freeze one.

# Ledger Snapshot

- **Goal:** Prove or reject current-Reference transfer with independent content,
  React structure/state, and CSS.
- **Now:** Independent Target, Gate verification, rendered review, and two-cycle
  self review are complete with a bounded `meets` result.
- **Next:** Use this evidence to choose one bounded follow-up without freezing
  the Reference Profile, CLI API, stable-key vocabulary, or file layout.
- **Blockers:** None. Any necessary Reference change is an immediate stop.
- **Evidence Ready?:** Yes for this Gate; not for profile/API freeze.
