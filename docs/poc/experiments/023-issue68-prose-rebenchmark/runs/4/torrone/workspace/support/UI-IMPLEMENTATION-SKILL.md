---
name: torrone-ui-implementation
description: Build or change a UI from a Torrone handoff or in a project that uses Torrone. Applies during ordinary implementation, including reviewing the rendered screen, repairing layout defects, and rechecking affected interactions. Use the design wizard for drafting catalog entries.
---

# Torrone UI implementation

Use the application requirements, relevant Torrone states and any applicable Reference to identify which relationships the composed screen must preserve. Apply explicit product and platform requirements first. For an unspecified single-line item with an attached action, use the item's visible center as the initial vertical anchor. In a row with mixed controls, decide how their visible surfaces align and which control sets the row height. Account separately for focus and pointer or touch targets. In adjacent regions, preserve the relationship called for by the design when an optional control appears, disappears, or changes size.

For standard controls, use the application's icon set or platform icons. When the environment leaves the choice open, use an established set such as Lucide. Use the official asset as shipped or the library's official component. If inlining an SVG is necessary, preserve its original path elements, path data and geometry. Do not merge, redraw or simplify paths. Set size and color through the surrounding styles or the component API. Prefer a consistent set across related states. Align the visible symbol with its label or owning surface and check its visual weight independently of the interactive target.

## Review, repair and recheck

1. Render the first working output in context at the affected widths or device modes. Inspect the normal state and at least one state that changes the composition. For example, reveal a trailing action, show an overflow control, or use a longer label. Compare screenshots or measured positions against the source relationships. Operate any affected keyboard, pointer or touch paths.
2. Record each mismatch as expected behavior, observed behavior and evidence. If a local implementation choice caused it, fix the shared layout or positioning rule. Keep explicitly chosen behavior, visible focus and usable hit targets. If the expected relationship needs a product decision, record the gap and leave that decision for the owner.
3. Render again after repair. Recheck the failing state and its normal counterpart, plus any affected interaction. Stop when the focused checks pass or after two repair rounds. Report any remaining failures or unavailable execution. Save first-pass and final observations for a comparison trial. Browser verification supports observable claims and human visual approval remains separate.
