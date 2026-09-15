---
type: PoC maintenance cost record
title: Shared token ownership and theme independence cost
status: completed comparison
source: fixed References, new A/B Variants, static audit, and reversible probes
---

# Scope

This record compares two Reference-Library-internal authoring choices across
four responsibility-distinct References. It does not propose that a Consumer
import Reference CSS, tokens, classes, DOM, theme code, or a runtime.

- **A — self-contained:** each Reference owns all of its token values.
- **B — token only:** one 11-line static stylesheet owns only canvas, surface,
  and focus color for light and dark; selectors and component styling remain in
  each HTML file.

The fourth specimen is a read-only shipment-exception summary workspace. It is
not a canonical design candidate.

# Ownership audit

| Decision | Value or rule | Change reason |
| --- | --- | --- |
| Share | canvas | Application workspace backdrop across four light References and the two complete dark References. |
| Share | surface | Primary contained content surface across the same responsibilities and themes. |
| Share value only | focus color | Keyboard focus indicator color; local element scope, width, offset, and selector remain owned by each Reference. |
| Keep local | status accent | Shipment status and timeline meaning, although its light and dark values equal the shell accent. |
| Keep local | text, muted text, border, muted/status surfaces, timeline rules | Reference-specific presentation and independently changeable component meaning. |
| Keep local | selectors, typography, layout, focus geometry, component and theme overrides | No reproduced common ownership reason. |

No new shared token candidate met the ownership test.

# Static understanding cost

| Measure | A | B |
| --- | ---: | ---: |
| Files needed to understand one complete Reference | 1 | 2 |
| Static shared imports across four References | 0 | 4 |
| Shared stylesheet size | 0 | 11 lines |
| Light shared-value definitions | 12 | 3 |
| Dark shared-value definitions in complete dark References | 6 | 3 |
| Product JavaScript in the fourth Reference | 0 | 0 |
| Build/runtime/dependency additions | 0 | 0 |

B adds one small, predictable lookup. The local HTML continues to show which
elements receive focus, how wide the indicator is, and which component rules
change in dark mode. Both candidates open directly from `file://`.

# Common theme probe

The disposable probe changed the focus color in light and dark. The four light
References and two complete dark References use that value for the same
keyboard-focus reason.

| Cost | A | B |
| --- | ---: | ---: |
| Changed files | 4 | 1 |
| Changed locations | 6 | 2 |
| Light locations | 4 | 1 |
| Dark locations | 2 | 1 |
| Fan-out validations | 5 | 5 |
| Restore file writes | 4 | 1 |
| Unexpected comparison paths | 0 | 0 |

Every affected comparison failed only at expected `outlineColor` paths. Both
trees restored byte-identically. Sharing reduces authoring and restore work and
the opportunity for theme synchronization omissions; it does not reduce the
required validation fan-out.

# Local and false-sharing probe

The disposable local probe changed the fourth Reference's status accent in
both themes. The value deliberately equals the shell accent in the baseline,
but the status/timeline and navigation-selection responsibilities can change
independently.

| Cost | A | B |
| --- | ---: | ---: |
| Changed files / locations | 1 / 2 | 1 / 2 |
| Shared-layer edits | 0 | 0 |
| Validations | 3 | 3 |
| Restore writes | 1 | 1 |
| Prior Reference hashes changed | 0 | 0 |

The detail light/dark comparisons failed on the expected status paths while
the shell comparison passed with zero errors. The shared stylesheet remained
unchanged. Promoting this equal value would therefore create coupling without
a common change reason.

# Cost conclusion

B has the lower demonstrated maintenance cost for the three existing shared
meanings. A remains simpler for every local value and for isolated reading. The
useful boundary is a thin value dependency, not a shared component or theme
stylesheet. Dark support does not justify forcing dark rules into References
that currently define only a light design.

