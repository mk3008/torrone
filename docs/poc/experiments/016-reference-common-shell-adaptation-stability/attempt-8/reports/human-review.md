---
type: PoC human review decision
title: Attempt 8 interactive Reference behavior transmission
status: pending human review
source: human review required
---

# Decision requested

Decide whether the interactive Reference, together with the frozen Manifest
and product inputs, communicated the two scoped behaviors with meaningful
stability across the three independent Runs.

The mechanical review is complete and found no scoped non-conformance. This
document deliberately does not promote that result to acceptance.

# Review materials

- [Interactive Reference](../reference/index.html) — illustrative behavior
  example only; it is not a normative implementation.
- [Cross-run image comparison](../comparison/index.html).
- [Mechanical artifact review](artifact-review.md).
- [Frozen interaction contract](../freeze/interaction-contract.md).

To operate an individual Run, run `npm ci --no-audit --no-fund` and then
`npm run dev` from its `initial` directory, then open the frozen initial URL
from the interaction contract. Run one server at a time on the fixed port
`4175`.

# Human checks

1. `Close navigation` hides the complete Drawer while workspace task content
   stays available; `Open navigation` restores the same Drawer.
2. The complete `Workspace` row toggles only its own child disclosure.
3. Drawer visibility and parent disclosure remain independent after the
   hide/show cycle.
4. `Activity` looks and behaves as a leaf, not as a disclosure parent.
5. The permitted differences in workspace layout do not obscure or weaken the
   two scoped behaviors.

# Current mechanical findings

- `done`: All Runs completed the exact ten-step sequence at `1440 x 900`,
  retain six hashed screenshots, and preserve their implementation digest over
  capture.
- `done`: The Header/Drawer controller and parent-row disclosure reproduce the
  frozen visible state transitions in all three Runs.
- `partial`: Runs 2 and 3 retain one favicon 404 each. It is outside the
  frozen behavior contract and was not repaired, but it remains visible as a
  harness-quality concern.
- `not done`: Broad keyboard, assistive-technology, responsive, animation, and
  production-readiness verification are outside this attempt.

# Decision record

Set `status` to `accepted`, `rejected`, or `follow-up required`, then add the
reviewer, date, decision, and a brief rationale. A rejection or follow-up
decision must classify any material mismatch as `manifest-gap`, `prompt-gap`,
`fixture-gap`, `observation-gap`, `non-conformance`, or `allowed-variance`.
