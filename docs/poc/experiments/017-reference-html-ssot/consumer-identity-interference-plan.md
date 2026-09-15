# Consumer Identity Interference Gate plan

## Issue

Comparative Validation currently asks Consumer implementations to expose
explicit observation identities. It is not known whether removing those
annotations lowers total maintenance cost or merely moves the same identity
work into mappings, build modes, or a more inferential Core.

## Customer

Future Reference Library and Consumer teams that need stable comparative UI
validation without allowing validation concerns to shape production
architecture.

## Customer value

The Gate should identify the lowest-cost identity boundary that preserves
fail-closed validation, source independence, and cold-start usability. A result
that retains a small explicit identity is acceptable when it is simpler and
more diagnosable than an annotation-free Consumer.

## Acceptance criteria and verification

1. Measure current explicit, semantic/relational, validation-only, and dual-use
   Consumer identities on one workspace and one Composite UI. Verify from
   source plus fresh browser snapshots.
2. Compare explicit, current natural mixed, external mapping, and test-time
   instrumentation without adding a new semantic heuristic. Verify source
   deltas, mapping/build assets, and unchanged Core/CLI hashes.
3. For each viable candidate, verify wrong-target, missing, ambiguity,
   grouping, class/local-ID, and unrelated-element behavior. True mismatches and
   ambiguity must fail; implementation-only changes must pass.
4. Measure where maintenance moves when Consumer source annotations are
   removed. Verify changed file counts and synchronization points for reversible
   Consumer changes.
5. Preserve content/DOM/CSS/state/source independence and all applicable
   existing correctness controls. Verify source inspection, existing Gate
   entry points, and isolated negative reports.
6. Give a fresh-context Agent only the final-candidate packet and a bounded
   maintenance task. Verify autonomous validation and explanation cost without
   leaking this Gate's answer.
7. Promote only a principle reproduced across both responsibilities; do not
   freeze a Consumer contract, Profile, CLI API, mapping format, or build mode.

## Scope in

- explicit and mixed workspace evidence;
- Composite Entity Autocomplete evidence;
- isolated external-mapping and conditional-instrumentation Variants;
- negative and maintenance probes;
- Core complexity and Consumer source review;
- bounded cold-start replay;
- two-cycle self-review and long-lived experimental knowledge update if earned.

## Scope out

- Consumer identity-zero mandate;
- new semantic heuristics or selector inference;
- production plugins, packages, or runtime;
- Reference discovery/catalog work;
- Profile, stable-key, mapping, or CLI API freeze;
- UI redesign, responsive/other-browser/real-AT work;
- focus Harness policy changes;
- MCP, Manifest/OKF migration, stage, commit, or push.

## Main risks

- selector mappings may appear annotation-free while becoming a second SSOT;
- test-mode keys may disappear from production but remain fully maintained in
  component source and build knowledge;
- a count reduction may hide weaker negative detection or ambiguity guessing;
- the Composite implementation currently reuses `data-ref` as a runtime hook,
  so validation-only and dual-use cost must be separated;
- old browser evidence may not share current Core/browser lineage;
- a Fresh Agent may understand literal keys more readily than indirect mapping.

## Required evidence

- baseline and candidate inventories;
- isolated positive, negative, and maintenance JSON reports;
- source/hash/line/annotation metrics;
- Core/CLI and fixed-input hash controls;
- Fresh Agent task, output, and evaluator record;
- verification, cost, result, and two-cycle self-review records.

## Repository evidence plan

Repository JSON and source inspection are sufficient for validation status,
identity counts, ambiguity, network/console state, changed-file cost, and fixed
input preservation. Screenshots are supplementary because the Gate does not
change design.

## Open questions

- Can external mapping avoid one-for-one selector maintenance on either shape?
- Does conditional instrumentation reduce anything beyond production DOM
  visibility?
- Does the existing mixed boundary remain the lowest total-cost result?

## Ledger

- Goal: determine the lowest-total-cost Consumer identity boundary.
- Now: A/B/C/D comparison, maintenance/negative probes, and Fresh Agent replay
  are complete. The bounded method result is hybrid-preferred.
- Next: restore the original frozen Reference Conformance output tree from an
  authoritative backup, then re-run the Evidence Harness integrity/current
  regression boundary in isolation.
- Blockers: the direct legacy conformance run regenerated the 56-file historical
  output tree; the unchanged provenance guard correctly rejects it.
- Evidence ready: partial. Gate-local identity evidence is complete; historical
  evidence separation is not restored.
