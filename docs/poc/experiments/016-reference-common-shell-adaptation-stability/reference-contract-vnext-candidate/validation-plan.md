---
type: validation plan candidate
status: proposed; not canonical
---

# Validation plan for the vNext candidate

## Static validation

Verify identity and use of the canonical token stylesheet, fixed SVGs, and
binding map. Reject substituted or altered fixed SVGs, incompatible icon/state
mapping, and an external `img` use of a canonical `currentColor` SVG that
cannot apply themed foreground. Verify the active-indicator binding. The
candidate's self-test deliberately introduces a direct-image violation and
expects the checker to reject it.

## Browser validation

Observe light and dark themes; Drawer shown and hidden; parent navigation
expanded and collapsed; selection; hover; and `focus-visible`. Confirm the
actual foreground and perceptibility of every fixed icon, not only the source
file it names. Capture the same viewport and state set when comparing with the
Reference.

## Human review

Confirm actual visibility, state distinguishability, and unwanted visual
drift against the Reference. If browser automation cannot reliably sustain
hover or another state, leave that state as a human gate rather than reporting
it as automatically verified.

## Candidate checks

- `validation/check-next-contract-candidate.ps1` checks the candidate's
  authority boundaries and required validation structure.
- `validation/check-svg-rendering-contract.ps1` detects the prohibited direct
  external-image use in a target implementation.
- `validation/self-test-svg-rendering-contract.ps1` proves the detector
  rejects an intentional violation while accepting the CSS-mask family.
