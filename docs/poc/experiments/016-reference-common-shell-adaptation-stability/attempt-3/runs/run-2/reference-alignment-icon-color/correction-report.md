---
type: attempt-3-run-correction-report
run: run-2
artifact: reference-alignment-icon-color
base_artifact: ../reference-alignment
status: verified
implementation_correction_count: 3
observation_harness_correction_count: 1
---

# Run 2 Reference-alignment icon-color correction

## Preservation boundary

This is a new derivative of `../reference-alignment`. It preserves every
earlier Run 2 artifact and review record. The Reference, product input,
Attempt 3 fixed input, visual tokens, binding map, and seven SVG files are
unchanged.

## Implementation correction 3

The fixed SVGs use `stroke="currentColor"`. The preceding derivative loaded
them through external `img` elements, where `currentColor` did not inherit the
theme foreground and rendered black on dark surfaces.

This derivative replaces those `img` elements with `aria-hidden` fixed-icon
spans. CSS mask and `-webkit-mask` use the unchanged SVG paths for geometry;
`background: currentColor` supplies the existing token-derived foreground.
The Header drawer/theme controls, search adornment, and parent disclosure are
covered. Their accessible button names remain separate `aria-label` and
screen-reader-only text.

Classification: `implementation-error`.

## Follow-up candidates, out of scope

- `validation-gap`: the Attempt 3 static validator proves asset identity and
  source reference but does not prove that a `currentColor` SVG renders with
  the intended themed foreground.
- `adaptation-contract-gap` candidate: the contract names SVG assets and
  foreground tokens, but does not explicitly state that an external-SVG
  integration must preserve themed `currentColor` rendering.

Both are recorded as future work only. This Attempt does not change a fixed
contract, validation rule, asset, token, or binding map.

## Correction accounting

1. Header icon-only control surface and border.
2. Navigation hover distinction and external focus-ring placement.
3. This themed fixed-SVG color correction.

The prior URL-construction repair remains one observation-harness correction;
the temporary HTTP server used here is a capture method, not an implementation
correction.
