# Token Ownership and Theme Independence Variants

This directory contains the fourth-Reference and A/B evidence for the bounded
ownership Gate.

- `candidate-a-self-contained/detail-summary.html` is the new self-contained
  baseline. The other three A inputs remain the fixed Variant 04/05 References.
- `candidate-b-token-only/` contains copies of all four References backed by one
  static Library-local token file.

The shared file owns only canvas, surface, and focus color in light and dark.
Selectors, focus geometry, typography, component styling, and component/theme
overrides remain in each HTML file. These files are directly browser-loadable,
require no build, and are not Consumer assets or canonical References.

