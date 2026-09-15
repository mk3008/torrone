---
type: next PoC instruction
title: Independent-CSS Target transfer
status: ready to start; not started
source: accepted PoC 017 result and open evidence gap
---

# Instruction for the next AI

## Issue

PoC 017 established content-different vanilla and React transfer only against
an older frozen Reference. The React Target shared implementation CSS with the
vanilla Target. It remains unconfirmed whether the human-accepted current
Reference can guide a content-different Target whose CSS is independently
authored.

## Customer

Reference authors, human reviewers, and implementation engineers who need to
know whether browser-observed design decisions remain useful when the Target
owns its framework, component structure, state, build, and CSS implementation.

## Customer Value

An AI can implement a new business screen from the accepted Reference without
turning Reference CSS into a shared production dependency, while the CLI still
reports meaningful state/style/focus/accessibility differences.

## Acceptance Criteria

1. Treat PoC 017's accepted `reference/index.html`, current Core/CLI, and
   `output/human-review/reference.snapshot.json` as frozen inputs. Do not edit
   them merely to make the Target pass.
2. Create exactly one content-different React Target with fixed local dummy
   data. Use different task copy, field labels, row data, and domain content
   while preserving the observable navigation, filter, result-grid, and action
   relationships.
3. The Target owns its CSS. Do not import, link, symlink, concatenate, generate
   from, or runtime-load Reference CSS or an existing consumer stylesheet.
   Reproduce the design from browser-observed output and Reference review, not
   through a shared stylesheet dependency.
4. The Target supports the product-observable Initial, Results, and Empty
   result states and the existing product interaction scenarios. Do not include
   the Reference scenario selector in the Target.
5. Request identifiers remain links and the primary create action retains its
   placement, but destination screens and undecided business operations remain
   out of scope.
6. The unchanged CLI verifies the Target against the accepted current baseline
   without weakening style, state, focus, accessibility, network, or negative-
   test criteria.
7. Preserve the frozen negative and semantic-only failures. A Target pass must
   not be obtained by changing the baseline, deleting applicable stable keys,
   hiding compared product UI, or relaxing comparison rules.
8. Produce reviewer-usable screenshots for Initial, Results, Empty, Dark, and
   user-menu focus/Escape evidence. Keep final design acceptance human-owned.
9. Record exactly what CSS independence was proved, the Target authoring and
   correction cost, useful and noisy CLI differences, and every unconfirmed
   item. Do not freeze a Reference profile or CLI specification from one run.

## Verification Method

| Criterion | Verification |
| --- | --- |
| Frozen input | Record and check the accepted Reference/baseline digests before and after the experiment. |
| Content and implementation difference | Inspect Target copy/data, React source, component/state ownership, and build output. |
| CSS independence | Source scan and dependency inspection show no Reference/existing-consumer stylesheet sharing or runtime import. Document Target CSS files and provenance. |
| Observable states | Replay the accepted CLI contract and inspect Initial/Results/Empty screenshots. |
| Focus and bounded accessibility | Require zero action/console errors, duplicate keys, unnamed interactive nodes, and bounded accessibility issues; confirm user-menu Escape focus recovery. |
| Local boundary | Require zero external and failed network requests. |
| Negative capability | Re-run the existing frozen negative and semantic-only checks with their required failure signatures. |
| Human quality | Human review checks operational realism, hierarchy, density, action placement, grid usability, and whether differences classified as diagnostic are acceptable. |

## Scope In

- One content-different React Target.
- Independently authored Target CSS.
- Current accepted PoC 017 observation baseline and action contract.
- Initial/Results/Empty plus existing navigation, filter, theme, and user-menu
  states.
- CLI evidence, screenshots, correction-cost record, and human review packet.

## Scope Out

- Editing the accepted Reference to accommodate the Target unless a genuine
  Reference/Core defect is demonstrated and reported before proceeding.
- Backend/API/database/authentication, asynchronous loading, routing, or real
  business operations.
- Destination UI for identifier links or the create action.
- A reusable partial-Reference library, profile/schema freeze, MCP server,
  existing Manifest replacement, file-layout migration, responsive coverage,
  or multi-browser certification.
- Multiple Targets or broad framework comparison. This run isolates CSS
  implementation ownership.

## Risks

- Mechanically copying the inline Reference CSS would look independent at
  runtime but would not test independent authoring.
- Changing product content and CSS together can make a failure ambiguous;
  classify each difference as implementation defect, allowed content effect,
  or CLI overconstraint without weakening the gate.
- Stable keys can be mistaken for a component catalog. Use the accepted local
  matching handles only where the current baseline requires them.
- A visually plausible screenshot can hide broken keyboard/focus/state paths;
  replay every scenario before human acceptance.

## Required Docs / Tests / Changeset

- A new bounded PoC 018 directory with its own plan/ledger.
- One React Target and independently authored CSS.
- Frozen-input digest record; do not copy the Reference as a second maintained
  source of truth.
- CLI verification report, interaction screenshots, CSS-independence evidence,
  correction-cost record, result, self-review, and human-review decision file.
- No MCP implementation and no Changeset unless a published package is
  intentionally changed, which is outside this instruction.

## Repository Evidence Plan

Use source/dependency scans, React clean build, unchanged-baseline digest checks,
CLI scenario replay, deterministic capture, external-request checks, and
expected negative exits. Repository evidence can establish build ownership,
CSS non-sharing, state/style/focus observations, and preserved defect detection.

## Supplementary Evidence Plan

Repository evidence cannot establish business realism or meaningful visual
equivalence. Retain the minimum state screenshots and require one explicit
human decision after mechanical and self-review gates pass.

## Open Questions

- Which computed-style differences are true Target defects versus harmless
  independent-CSS implementation differences?
- Does the current stable-key/scenario set remain maintainable with different
  content?
- Is any CLI comparison coupled to Reference CSS mechanics rather than the
  browser-observed result?
- After this isolated run, is there enough evidence to test reusable partial
  References, or is another correction cycle needed first?

## Ledger Snapshot

- **Goal:** Test current Reference transfer with independent Target CSS.
- **Now:** PoC 017 human review is accepted; CSS independence is unconfirmed.
- **Next:** Create PoC 018 and one bounded React Target without modifying PoC
  017 inputs.
- **Blockers:** Stop and report before changing the accepted baseline or CLI
  gate to accommodate the Target.
- **Evidence Ready?:** PoC 017 inputs are ready; PoC 018 has not started.

