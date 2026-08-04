---
type: verification record
status: passed for candidate review
verified_on: 2026-08-04
reference_basis: 9cd1932
attempt_3_basis: 0e2311d
---

# vNext candidate verification record

## Acceptance evidence

| Requirement | Method | Result |
| --- | --- | --- |
| Existing Reference-owned input remains unchanged | `attempt-2/check-fixed-input.ps1` | pass; baseline `9cd19321e53f6279e956df8a6d1fe562c3360544`, 52 files |
| Product-owned input remains unchanged | `attempt-2/check-product-input.ps1` | pass; 1 file |
| Attempt 3 visual-binding input remains unchanged | `attempt-3/freeze/check-attempt-3-input.ps1` | pass; baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff`, 24 files |
| Existing Run 2 exact-binding evidence remains valid | `attempt-3/validation/check-visual-bindings.ps1` against `reference-alignment-icon-color` | pass |
| Candidate describes all required layers without becoming a new authority | `validation/check-next-contract-candidate.ps1` | pass |
| Existing themed Run 2 integration has no direct external-image use | `validation/check-svg-rendering-contract.ps1` against `reference-alignment-icon-color` | pass; 7 themed assets |
| Direct external-image misuse is detected | `validation/self-test-svg-rendering-contract.ps1` | pass; CSS-mask fixture accepted and intentional direct-image fixture rejected |
| Run 2 JavaScript remains syntactically valid | `node --check` on its final derivative | pass |
| Candidate changes contain no whitespace errors | `git diff --check 0e2311d` limited to the approval record and candidate paths | pass |

## Repository evidence

The preflights above prove that the candidate did not modify the approved
Reference, product-owned input, or Attempt 3 frozen visual-binding input. The
candidate reuses their paths as authorities rather than copying token values,
SVG paths, or dimensions. The human-approval record is a new historical
record, not a rewrite of an earlier decision.

## Supplementary evidence

Attempt 3's approved browser-native visual evidence remains in its historical
review packet and Run 2 icon-color review. This candidate does not claim a
new browser result: it adds a static guard and a review-ready validation plan
for a later, explicitly approved experiment.

## Confidence and remaining gate

Confidence is high that the candidate preserves frozen-input boundaries and
detects the demonstrated `currentColor` direct-image failure. Human review is
still required before canonicalization, especially for the technology-neutral
SVG output wording and the unresolved application-wide interaction-state
semantics.
