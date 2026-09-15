---
type: PoC comparison
title: Attempt 2 and Attempt 3 common-shell adaptation outcomes
status: complete; human review recorded
---

# Attempt 2 vs Attempt 3

## Observed difference

| Topic | Attempt 2 | Attempt 3 initial result |
| --- | --- | --- |
| Palette | Run 1 used a different palette. | Fixed token assets are present and static validation passes in all three Runs. |
| Icons | All Runs chose substitute icons; Run 2 also distorted one. | All Runs carry and reference the seven fixed SVG assets; no reviewer found an icon substitute or malformed geometry. |
| Direction and location | Disclosure and header icon expression varied. | State/location map is carried unchanged and the reviewed initial screenshots show the mapped placement. |
| Active indicator | Not an exact visual gate. | Fixed indicator binding is present and reviewed in selection captures. |
| Initial exact conformance | Not measured as an exact gate. | 2/3 passed initial exact review; Run 2 exposed one header-control surface/border miss. |
| Corrections | Visual differences were tolerated as design-family variance. | Run 2 required three implementation corrections; its initial artifact remains preserved. |

## Interpretation

Attempt 3 eliminates the Attempt 2 class of palette/icon substitution and
icon-geometry variation in the reviewed initial outputs. The Run 2 finding is
also useful: fixed assets alone did not guarantee every declared token surface
was visibly applied, but the exact review gate identified the error and allowed
a bounded one-Run correction without changing inputs.

The comparison does not claim framework independence or a pixel-perfect page.
The remaining human judgment is whether the browser captures show the exact
subset at the intended semantic locations; DOM and non-bound geometry remain
implementation freedom.

The icon-color derivative now has HTTP-served state and focus captures. Its
reviewer found no visual regression, and human review confirmed the real hover
interaction. The fixed-SVG color correction prevents the former dark-theme
black-icon failure without changing any fixed asset or contract.
