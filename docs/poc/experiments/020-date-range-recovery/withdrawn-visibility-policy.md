# Superseded policy — historical only

## Shared text-entry visibility

Owner clarification (2026-09-16, PR #14 follow-up): text inputs are ordinary editors. Focus is not an instruction to reposition the page. If the active editor and its label are already visible, leave scrolling unchanged. When a keyboard/viewport change obscures them, correct only the measured overlap plus a small clearance. Preserve focus and value; never select the next field. Cancel pending work when editing ends or the focused field changes, and do not move a target during pointer activation.

This applies across text inputs, not only calendar controls. Calendar disclosure has a separate context rule: keep its owning label/editor and calendar header together. Neither responsibility authorizes unconditional focus scrolling, arbitrary keyboard-height guesses, or focus-dependent page padding.

The [Date range next candidate](../references/date-range-recovery.md) demonstrates a small generic text-entry handler using the top-level VisualViewport. This is an example, not a required runtime dependency. The host that owns the visible viewport must own any equivalent policy in an embedded application. A child iframe's viewport cannot reliably describe keyboard occlusion outside it; without a supported host viewport contract, do not claim that the child alone solves the problem. Test both standalone and actual embedding conditions. An editor taller than the available viewport needs caret-aware treatment and is outside this bounded example.

Reference: [VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport). The API geometry is distinct from the policy decision above.

Follow-up direction constraint: textbox visibility correction may only advance the scroll position to lift an editor above the lower obstruction. Ignore zero or negative deltas, even if the upper-edge visibility calculation requests them. Do not automatically scroll backward to recover a label or undo a prior adjustment. Calendar disclosure is a separate behavior.

Minimal-trigger refinement: automatic textbox correction runs only after the visible viewport height decreases. Focus/click, switching between editors, manual scroll and viewport growth do not initiate correction. A queued correction is canceled on focus change. This reduces competing adjustments; native browser focus/keyboard scrolling is separate and is not claimed suppressed.
