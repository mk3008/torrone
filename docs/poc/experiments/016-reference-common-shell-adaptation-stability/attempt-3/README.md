---
type: PoC input candidate
title: Reference common-shell adaptation stability — Attempt 3 candidate
status: prepared; Runs not started
source: authored from approved Reference and Attempt 2 evidence
---

# Attempt 3 candidate: exact visual binding

## Goal

This candidate keeps the approved Reference-first approach and adds a narrow
Reference-owned visual-binding layer. It exists because Attempt 2 preserved the
common-shell structure across three implementations while human review found
uncontrolled variation in palette, icon shape, and icon expression.

The candidate is not an edit to the approved Reference, the Manifest, the
Attempt 2 product input, or any Attempt 1/2 artifact. No Attempt 3 Run has
been dispatched.

## Candidate inputs

| Input | Owner | Purpose |
| --- | --- | --- |
| [Reference contract](reference-owned/reference-contract.md) | Reference | Separates exact visual bindings, structural invariants, and adaptation guidance. |
| [Visual binding assets](reference-owned/visual-bindings/) | Reference | Canonical palette tokens, SVG icon assets, and their state/location map. |
| [Adaptation instructions](adaptation-instructions.md) | Experiment | States what may be reused and what must be independently implemented. |
| [Visual validation](validation/visual-binding-validation.md) | Experiment | Defines static and browser review evidence for the fixed visual subset. |
| Attempt 2 product contract | Product | Remains unchanged at `../attempt-2/product-input/application-input-contract.md`. |

## Boundaries

The fixed assets do not make the Reference DOM, JavaScript, layout rules, or
complete stylesheet a starter implementation. A consumer may use its own
elements, components, state storage, and CSS organization. It must, however,
reuse the fixed visual-token stylesheet and fixed icon assets without
substitution for the visual responsibilities named in the binding map.

## Status and next gate

This candidate is ready for human review of its scope, exact assets, and
validation boundary. It is **not yet ready to dispatch Attempt 3 Runs** until a
human approves that boundary and freezes this candidate with the established
portable preflight process.
