---
type: PoC evidence carry-forward
title: Prior observations used by the Reference HTML experiment
status: active evaluation input
source: repository evidence review
---

# Purpose

This matrix carries observed quality signals into the Reference HTML PoC. It
does not carry forward the Manifest structure, vocabulary, or file boundaries
as requirements.

# Observations to preserve

| Observation | Prior evidence | PoC use |
| --- | --- | --- |
| Product canvases become demo-like when they contain Contract, evaluation, acceptance, or UI-explanation copy. | Standard-pack review SR-02 and SR-05 in [`010`](../010-business-workflow-static-html-review/attempt-1/screen-review.md) | Keep the Reference product canvas limited to task identity, fixture data, field help, state, recovery, and concise actions. Keep review notes outside the UI. |
| Current or selected state should not be repeated as synthetic visible `Selected`/`Current` copy. | [`009` static review](../009-standard-pack-static-html-review/attempt-1/screen-review.md) and `010` SR-01 | Use native selection semantics plus restrained visual treatment. Capture both with the CLI. |
| Drawer hiding must remove the region, boundary, and reserved track while preserving the work task. | Common-shell failures and [`016` Attempt 8 artifact review](../016-reference-common-shell-adaptation-stability/attempt-8/reports/artifact-review.md) | Include a navigation hide/show round trip and compare the controller, region visibility, and resulting workspace state. |
| Parent disclosure, leaf identity, current destination, and Drawer visibility must remain independent states. | [`016` Attempt 8](../016-reference-common-shell-adaptation-stability/attempt-8/reports/artifact-review.md) | Record every step from one Reference action sequence and replay it in each consumer. |
| Navigation grouping can disappear during semantic extraction even when a current link survives. | [`005` round-trip human brief](../005-semantic-roundtrip-suite/human-review.md) | Do not infer reusable structure from text alone; capture landmarks, controls, relationships, and visible state from the browser. |
| Result aggregation and ordering roles can be lost while a table still looks plausible. | [`005` round-trip human brief](../005-semantic-roundtrip-suite/human-review.md) | Keep table caption, column headers, result count, and separate row operation observable. Do not generalize the dummy columns. |
| Selection and opening a record are separate operations. | [`009` Grid/Card review](../009-standard-pack-static-html-review/attempt-1/screen-review.md) | Use a separate detail action rather than making the complete row an ambiguous selection/navigation target. |
| Compact business screens still need clear identity, hierarchy, bounded reading measure, and action ordering. Equal-width grids often flatten short facts. | `010` SR-03 and SR-06 | Use a compact queue with a clear page title, bounded filters, and a table. Leave hierarchy quality to browser evidence and human review. |
| Form/help/error tracks and action captions were more reliable when the intended region and consequence were observable. | [`014` Attempt 10](../014-customer-create-common-shell-variability/attempt-10/evaluation.md) and `010` action inventory | Use native labels and concise task-specific actions. The PoC does not attempt a full form contract. |
| Static screenshots do not prove keyboard, focus, Escape, ARIA transitions, assistive-technology output, or runtime behavior. | Evidence limits in [`009`](../009-standard-pack-static-html-review/attempt-1/screen-review.md), [`010`](../010-business-workflow-static-html-review/attempt-1/screen-review.md), and [`016` Attempt 8](../016-reference-common-shell-adaptation-stability/attempt-8/reports/artifact-review.md) | Drive real pointer and keyboard input, record active focus and ARIA state after every step, and keep full accessibility conformance unclaimed. |
| Static source rules can miss a state-dependent visual defect. A pinned shadow was required to appear only after horizontal scrolling. | [`013` Attempt 23](../013-customer-search-common-shell-variability/attempt-23/evaluation.md) | Prefer browser-computed state snapshots over source-pattern checks when a state is reachable cheaply. |
| Exact visual assets/tokens and structural invariants can coexist with framework-owned DOM, state, and component organization. | [`016` vNext candidate](../016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/reference-contract.md) and Attempt 6 evidence | Compare observable output by stable keys; do not require Reference DOM, class names, component boundaries, or state storage. |
| A mechanically conforming three-run set still needs a human decision about meaningful equivalence and allowed layout variation. | [`016` Attempt 8 human review](../016-reference-common-shell-adaptation-stability/attempt-8/reports/human-review.md) | Treat a passing CLI report as review readiness, never automatic design acceptance. |

# Useful mechanical checks already demonstrated

- Frozen-input and implementation digests expose accidental edits during
  observation.
- Local-only and external-reference checks catch accidental network coupling.
- Native roles, ARIA state, `hidden`, focus, and control relationships expose
  many interaction regressions without interpreting business copy.
- Browser-computed colors and contrast checks are more direct than searching
  CSS source for literal values.
- Fixed state sequences and named screenshots make non-happy-path review
  repeatable.
- Negative fixtures are necessary to prove that a checker rejects the defect
  it claims to detect.

# Human review that remains necessary

- Whether density, hierarchy, alignment, grouping, and reading order feel like
  an operational product rather than a demonstration.
- Whether action captions and dummy task flow are realistic enough to teach the
  intended design decision.
- Whether a visual difference is harmful, product-justified, or allowed
  implementation variance.
- Whether theme, focus, status, and state changes are visually clear and not
  merely present in computed values.
- Whether the complete interaction is meaningful for keyboard and assistive-
  technology users; the PoC only provides bounded signals.

# Failure patterns not to repeat

- Repairing one generated Run and then presenting it as reproducibility
  evidence.
- Treating one sample's labels, column count, fixture hierarchy, or DOM as a
  reusable rule.
- Keeping a hidden Drawer track or coupling Drawer and disclosure state.
- Checking only initial screenshots for state-dependent styling.
- Using internal review vocabulary as persistent product copy.
- Adding metadata that repeats values already observable in HTML, CSS, ARIA,
  or interaction behavior.
- Treating a clean static check as proof of visual quality or accessibility
  conformance.

