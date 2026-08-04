---
type: review candidate
title: Reference common-shell contract vNext candidate
status: proposed; not canonical; not frozen
source_attempt: attempt-3
source_commit: 0e2311d
---

# Reference common-shell contract vNext candidate

This directory is a human-review candidate derived from the approved
browser-native Attempt 3 outcome. It does not change the approved Reference,
the product-owned input, Attempt 3's frozen input, or any historical Run.

The candidate separates exact visual bindings, structural invariants, and
adaptation freedoms. It also makes the rendering result for themed
`currentColor` SVGs explicit and routes interaction-state questions to a
future cross-application foundation rather than silently turning them into
common-shell bindings.

## Review set

- [Layered contract](reference-contract.md)
- [SVG rendering contract](svg-rendering-contract.md)
- [Interaction Foundations candidate](interaction-foundations-candidate.md)
- [Validation plan](validation-plan.md)
- [Static candidate check](validation/check-next-contract-candidate.ps1)
- [SVG rendering self-test](validation/self-test-svg-rendering-contract.ps1)
- [Verification record](verification-record.md)

## Authority boundary

The approved assets, token stylesheet, and binding map remain in
`../attempt-3/reference-owned/visual-bindings/`. This candidate refers to
those sources; it does not copy their values or create a replacement source
of truth. It must be approved and deliberately frozen in a later task before
it can become an experiment input.

## Human review requested

Decide whether the SVG output contract is sufficiently technology-neutral,
whether the proposed validation layers are proportionate, and which
interaction-state semantics should become application-wide Foundations rather
than Reference-specific requirements.
