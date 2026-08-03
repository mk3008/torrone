---
type: PoC adaptation instruction candidate
title: Attempt 3 visual-binding adaptation instructions
status: candidate for human review
source: authored from approved Reference assets
---

# Attempt 3 adaptation instructions

## Inputs to read

Read the Attempt 3 Reference contract, the complete visual-binding directory,
the unchanged Attempt 2 product contract, and the validation guide before
implementation. Do not consult an earlier Run, its review, or its correction.

## Reuse unchanged

Copy or reuse these Reference-owned files without editing their token values,
SVG paths, state pairing, or location declarations:

- `reference-owned/visual-bindings/visual-tokens.css`
- `reference-owned/visual-bindings/binding-map.json`
- every file in `reference-owned/visual-bindings/icons/`
- the supplied product fixture data and labels

Attach the active palette to an implementation-owned shell root through the
binding map's theme-root hook. Keep the fixed icons paired with their named
state and location. Use the selected-row binding for its surface, foreground,
and physical-start indicator.

## Implement independently

Reimplement the DOM tree, component boundaries, state model, CSS organization,
file layout, navigation behavior, and responsive behavior using the chosen
technology's ordinary methods. Do not copy the Reference HTML, complete
stylesheet, or JavaScript as an implementation template.

## Prohibited substitutions

- Do not replace a fixed icon with a semantically similar library, Unicode, or
  hand-drawn icon.
- Do not translate the fixed Reference palette into a local or framework
  palette.
- Do not alter a fixed icon's shape, direction, rendered size, or named
  location because another control looks equivalent.
- Do not change selected-row surface, foreground, or physical-start indicator
  under a claim that the result is in the same design family.
- Do not let a framework default style override a fixed visual binding.

## Required evidence for an Attempt 3 Run

Place an unchanged `reference-visual-bindings/` copy in the Run output and add
an unchanged `visual-binding-evidence.json` from the validation template.
Reference the token stylesheet and every fixed icon asset from the target's
HTML, CSS, or JavaScript. This evidence interface is only a visual-binding
inspection hook; it does not require the Reference's DOM structure or class
names.
