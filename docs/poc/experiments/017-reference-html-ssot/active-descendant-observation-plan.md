---
type: PoC plan
title: aria-activedescendant relational observation Gate plan
status: complete; partial
---

# `aria-activedescendant` relational observation Gate plan

## Issue

The Composite UI Reference and its independent autocomplete Target use
different local IDs for their active options. The current Core does not record
`aria-activedescendant`, so a Target can point at the wrong existing option
while retaining the expected popup, visible highlight, selection state, and
styles.

## Customer

Reference authors, Consumer implementers, and reviewers using PoC 017
comparative evidence.

## Customer value

An autocomplete Target can remain free to choose local IDs while comparative
validation checks which logical option owns keyboard focus inside the popup.

## Acceptance criteria and verification

| Criterion | Verification method |
| --- | --- |
| Existing gap is real | Preserve a pre-change Core/CLI canary in a new output boundary; a wrong active target must incorrectly pass. |
| Local IDs remain independent | Snapshot the fixed Composite Reference and verify its fixed independent Target; the two active option IDs must differ while both resolve to `entity-option-primary`. |
| State-aware relation | Inspect initial, query-open, ArrowDown, Enter completion, pointer completion, no-results, and clear states from the existing scenarios. |
| Wrong target fails | Point only `aria-activedescendant` at an existing unkeyed secondary option while retaining the primary visible selection; require a relationship failure. |
| Missing target fails | Point a Reference scenario at a missing ID and require `missing-aria-reference` from Reference Conformance. |
| Ambiguity fails closed | Duplicate the active option's existing explicit identity and point at the duplicate; require identity and relationship failures without text/index fallback. |
| Transferability remains intact | Require zero shared local IDs/classes, distinct CSS source, no fixture leakage, and a zero-error valid Target comparison. |
| Existing evidence remains valid | Run Composite, Conformance/current negatives, and the Evidence Harness current regression in separate new output boundaries; verify fixed evidence digests. |

## Scope in

- the fixed Composite Entity Autocomplete Reference and Target as read-only
  inputs;
- an isolated canary and reversible temporary negative probes;
- the smallest general Core/CLI comparison change justified by the canary;
- current regressions, two-cycle self-review, and bounded long-lived knowledge.

## Scope out

- visual or interaction design changes;
- Entity Selector canonical approval;
- Consumer identity-interference reduction;
- new semantic heuristics, metadata, public CLI options, Profile/API freeze,
  MCP, Manifest migration, responsive work, other-browser claims, or real AT;
- stage, commit, and push.

## Risks

- Comparing raw ID strings would break framework/DOM independence.
- Treating option text, fixture values, or DOM position as identity would make
  the result content-specific.
- Recording only relation presence would still miss the wrong logical target.
- Requiring `aria-activedescendant` in every state would invent a UX rule.
- An unresolved or duplicate identity must not silently compare equal.

## Required docs and evidence

- preserved canary report and implementation bytes;
- final Gate summary and positive/negative reports;
- result, verification, cost, and two-cycle self-review records;
- a minimal update to the PoC observation boundary only if the result survives
  the independent Target and negative probes.

## Repository evidence plan

All acceptance criteria can be confirmed from source hashes, browser JSON,
Gate summaries, and current-regression provenance stored under this experiment.

## Supplementary evidence plan

No visual-design decision is made. Screenshots may be retained by existing
Gates but are not required to prove the relational claim.

## Open questions

- Whether the existing explicit option identity is sufficient without a new
  Consumer annotation.
- Whether a relation target that lacks any existing stable/semantic identity
  should be reported as unresolved by comparison alone or needs a later,
  separately justified Reference-authoring check.

## Ledger

- **Goal:** compare active-option meaning rather than local ID spelling.
- **Now:** the relation and Composite regression are proven; the complete
  Evidence Harness stops at an unrelated known focus-sensitive positive.
- **Next:** Consumer Identity Interference may proceed with that explicit
  reliability note; do not relabel this Gate as fully green.
- **Blockers:** none for the bounded relation capability; one evidence blocker
  remains for a clean all-six-family current regression.
- **Evidence ready?:** yes for the `partial` result.
