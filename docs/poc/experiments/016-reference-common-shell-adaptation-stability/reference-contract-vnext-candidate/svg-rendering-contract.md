---
type: SVG rendering contract candidate
status: proposed; not canonical
---

# Themed fixed-SVG rendering contract

## Required result

For every fixed SVG identified by the canonical binding map, an implementation
must preserve the approved geometry and render it with the current theme's
applicable foreground. The resulting icon must remain perceptible in the
light and dark themes and states defined by the approved Reference.
Cross-application interaction states not defined by that Reference remain
out of scope for this contract.

## Permitted implementation families

- Inline SVG that inherits the intended `currentColor`.
- A CSS mask based on the unchanged canonical SVG plus the intended themed
  foreground.
- A framework-specific mechanism with a verified equivalent output.

These are examples, not prescribed component or stylesheet structures.

## Prohibited implementation families

- Rendering a canonical `currentColor` SVG through an external `img` without
  a mechanism that applies the required themed foreground.
- Approximating themed color with CSS filters.
- Replacing a canonical icon with another asset, a Unicode character, or an
  approximate drawing.

Accessible names remain independent of icon rendering. Validation must check
the asset identity and the rendered result; an asset reference alone does not
prove that the icon inherited an appropriate foreground.
