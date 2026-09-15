---
type: PoC self review
title: Shared token ownership and theme independence two-cycle self review
status: completed
source: requirements, source audit, browser evidence, and rerun verification
---

# Cycle 1 — screen and interaction correctness

## Findings

1. The initial status badge used the status accent for text on a light surface.
   Its measured contrast was 4.22:1, below the bounded normal-text threshold.
2. The first scenario used pointer activation, so `:focus-visible` was not
   observed and the common focus probe did not exercise the fourth Reference.
3. Replacing pointer activation with Enter focused the native summary in the
   current browser harness but did not toggle it, so a focus-only observation
   could have been mistaken for an interaction pass.

## Corrections

- Kept the status accent on the dot and border, changed status text to the
  normal text token, and retained the explicit text label.
- Used Space for the native disclosure and asserted the actual closed -> open
  -> closed states plus retained focus.
- Reran light/dark A/B preflight and comparison; all passed.

# Cycle 2 — ownership, geometry, and evidence claims

## Findings

1. A new round-trip assertion exposed a one-pixel trigger-height change when
   the open state added a bottom border. The interaction worked, but the
   Reference still encoded an unnecessary layout shift.
2. The first fixed Consumer tree guard included `node_modules`, making a
   source-boundary check slow and environment-sized rather than evidence-sized.
3. Two final shell PNGs had small chevron-only raster differences even though
   state and computed style were exact.

## Corrections

- Replaced the open-state bottom border with an inset shadow in both A and B,
  preserving the separator without changing layout. The final round-trip
  geometry assertion passes.
- Scoped the Consumer immutability guard to its source and built artifacts,
  excluding dependencies; the 20-file digest is checked before and after.
- Quantified the PNG differences and kept them supplementary. No filename
  allowlist, tolerance, CLI exception, or Conformance change was added.

# Final ownership audit

- Canvas and surface retain one application-level reason in four light and two
  complete dark References.
- Focus color retains one keyboard-indicator reason while selector and geometry
  stay local.
- Equal status and shell accent values are false sharing and remain separate.
- Search and form do not gain invented dark modes merely to increase counts.
- No new token, primitive, component stylesheet, generator, runtime, Consumer
  contract, or metadata was introduced.

# Final conclusion

No remaining issue blocks the bounded Gate. The justified status is
`token-ownership-confirmed`. This confirms the narrow Library-internal
ownership result; it does not authorize canonical migration, file-layout
freeze, Consumer distribution, or broader token extraction.

