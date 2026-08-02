---
type: PoC operational workflow
title: Manifest quality workflow
status: authored
source: authored
scope: A repeatable quality loop for authored Manifest guidance and frozen three-run static HTML experiments.
---

# Manifest quality workflow

Use this workflow to decide whether reusable Manifest guidance communicates its
intended responsibilities without optimizing a single generated screen. It
extends the [three-run Manifest reproducibility protocol](three-run-reproducibility-protocol.md), which remains authoritative for frozen inputs, validity,
classifications, and full-rerun rules.

## Ownership

| Owner | Owns | Does not own |
| --- | --- | --- |
| Manifest | Reusable cross-screen guidance, hierarchy, components, and finite configuration. | Product facts, runtime mechanics, library choices, or exact dimensions. |
| Fixed product prompt | Product task, facts, labels, constraints, concrete dimensions, library names, and other experiment-specific implementation inputs. | Generic design policy that belongs in the Manifest. |
| Product binding | Product capabilities, routes, permissions, states, data, and business language. | New generic design rules. |
| Fixture contract | Exact reusable artifact, immutable boundary, and digest when a fixture is used. | An unstated substitute for Manifest guidance. |
| Implementation | Concrete HTML, CSS, JavaScript, and runtime choices. | Automatic promotion of a local decision into shared guidance. |

Use `manifest-review` before and after a Manifest revision. Use
`business-screen-review` inside artifact review for task realism, copy,
actions, interaction hierarchy, and accessibility risks. Keep project-specific
OKF-compatible YAML rules in the artifact-review procedure rather than changing
that general skill.

## Two delivery modes

This workflow supports two deliberately separate modes. Do not use a repaired
consumer artifact as evidence that a Manifest communicated its guidance on a
first pass.

| Mode | Purpose | Generated-output rule | Completion rule |
| --- | --- | --- | --- |
| `library-quality-experiment` | Measure how consistently a fixed Manifest and fixed product brief communicate reusable guidance. | Preserve all three first-pass Runs unchanged. Never repair one Run. | Use the three-run protocol, deviation routing, and then the human gate. |
| `consumer-delivery` | Deliver one product artifact from a Manifest, product prompt, binding, and applicable configuration. | The implementer may verify, repair, and re-verify its own artifact within a fixed attempt limit. | Every applicable Manifest verification condition is observed after the final repair; otherwise the artifact is `not done`. |

The three-run protocol governs only `library-quality-experiment`. A consumer
delivery records its own fixed inputs, applicable `# Verification` sections,
verification evidence, repair history, and final limits. It may use the same
capture and review tools, but it does not claim three-run reproducibility.

## Consumer-delivery loop

Freeze the Manifest, prompt, binding, local overrides, implementation
constraints, and the applicable verification conditions before implementation.
Then use this bounded loop:

1. Implement the artifact.
2. Verify every applicable rendered and exercised interaction condition.
3. Repair only findings within the frozen product scope.
4. Re-verify the repaired artifact from the same conditions.

The default limit is three repair-and-reverification cycles after the initial
implementation. Preserve the evidence for each cycle. A browser-dependent
condition is `not verified` when the required browser or equivalent interactive
environment is unavailable; source structure, intended handlers, and screenshots
do not replace that observation. At the limit, any failed or unverified
condition yields `not done` and is reported to the product owner. The product
owner may authorize a new delivery attempt with changed inputs; do not silently
extend an exhausted attempt.

The consumer-delivery human review follows only after the bounded loop reaches
`done`. Its persistent HTML report presents the final artifact, fixed inputs,
applicable verification outcomes, repair-cycle count, evidence limits, and a
concise visible-screen question. It does not ask the human to evaluate internal
claim IDs, raw configuration, digests, or repair narration.

## Operational flow

| Phase | Required evidence | Gate and next action |
| --- | --- | --- |
| 1. Author or revise | The intended reusable responsibility, owner, and affected Manifest concepts. | Review with `manifest-review`; retain product-owned facts in the prompt or binding. |
| 2. Freeze | Manifest snapshot and digests; one complete prompt text; binding; fixture contract/digests when used; model; reasoning effort; viewport; capture command. | Do not begin generation until every consumer-visible input is fixed. |
| 3. Generate three Runs | Three independent output directories. | Use the same frozen prompt text, model, and reasoning effort for all Runs. Each Run may write only to its own directory and may not inspect another Run. |
| 4. Capture and verify | Untouched HTML, PNG, capture record, static-check output and limits, and comparison HTML. | A capture retry may repair only the observation mechanism while output bytes remain unchanged. |
| 5. Review artifacts | Per-screen matrix, resolved YAML IDs/values and their visible effects when exercised, HTML/PNG evidence for every Run, focused interaction evidence, and limits. | Use `manifest-artifact-review`; record each material deviation. |
| 6. Route deviations | Deviation ledger with classification and evidence. | Follow the deterministic return paths below; never repair a generated Run. |
| 7. Human review | Persistent static HTML and PNG evidence, comparison HTML, artifact review, verification limits, and a concise decision question. | Request one human decision only after every mechanical gate and in-scope correction loop completes. |

## Artifact-review matrix

For each screen and exercised state, record the applicable Manifest concept and
configuration, product-owned requirement, resolved OKF-compatible YAML ID and
value when applicable, expected visible effect, all three Run evidence paths,
finding, classification, and evidence limit. Verify a resolved YAML value and
its visible effect separately. An effect that cannot be observed is a recorded
limit, not a pass or failure.

HTML and PNG evidence is required for all three Runs. When a run supports
interaction, add focused evidence for the primary task and one relevant
non-happy path. Screenshots alone cannot prove keyboard or assistive-technology
behavior; cite focused tests or implementation evidence, or record that limit.

## Interaction observation contract

Freeze an observable before/action/after contract for every exercised visible
state-changing control. Each Run's self-review records the visible result and
the state retained across the action, including the action actually performed,
rather than only naming an intended handler or document structure. Apply the detailed rules in the
[three-run protocol](three-run-reproducibility-protocol.md#interaction-observation-contract).

## Deterministic return paths

| Classification | Return path |
| --- | --- |
| `manifest-gap` | Return to Manifest authoring and `manifest-review`; freeze a new input set and regenerate all three Runs. |
| `prompt-gap` | Correct the product prompt, freeze it, and regenerate all three Runs. |
| `fixture-gap` | Correct the fixture contract or identity, freeze it, and regenerate all three Runs. |
| `observation-gap` | Change only capture, static, or focused evidence; re-observe the unchanged Runs. |
| `non-conformance` | Record the evidence and leave all generated outputs unchanged. Decide separately whether a future input change warrants a new complete attempt. |
| `allowed-variance` | Record the intentionally unowned difference; keep the unchanged set. |

Changing a Manifest, prompt, or fixture contract invalidates comparison with
the earlier input set. Start a numbered attempt, freeze every input again, and
generate all three Runs afresh. Never selectively edit, regenerate, or replace
one Run to make a comparison appear compliant.

## Human gate and boundaries

The human gate is a request for judgment, not automatic promotion or acceptance.
It follows mechanical generation, capture, static verification, artifact review,
and every correction loop that stays within this workflow. The review packet
links the persistent HTML and PNG artifacts, comparison HTML, frozen-input
inventory, artifact-review report and matrix, deviation ledger, and explicit remaining limits.

## Fixed human-review report format

Use the [fixed human-review report format](three-run-reproducibility-protocol.md#fixed-human-review-report-format)
for every comparison. It shows the complete fixed product prompt as readable
text, the Manifest snapshot, a link to the complete frozen-input inventory,
model/effort, three equivalent HTML/PNG Run cards, and a concise Japanese
decision request. The presentation is stable evidence, not a Run-specific
evaluator narrative.

This workflow does not add a runtime, editor, generic validator, schema
registry, DSL, package ecosystem, generated-output repair path, or automated
visual acceptance. The repository's static review evidence remains illustrative;
for its current bounded capture contract see
[`tests/check-business-workflow-static-html-review.ps1`](../../../tests/check-business-workflow-static-html-review.ps1).
