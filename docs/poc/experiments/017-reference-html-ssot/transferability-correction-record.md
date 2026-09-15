---
type: PoC implementation and correction-cost record
title: Transferability Target correction record
status: measured
source: source files and preserved CLI iteration reports
---

# Target construction cost

The new Target adds one React package using the exact dependency versions
already present in PoC 017. Product source is 307 JSX lines and 409 CSS lines,
plus a small HTML entry, Vite configuration, package metadata, and one
scenario-input override file. The approved Reference remained byte-identical.

The Target uses four product components (`HeaderBar`, `NavigationRail`,
`SearchCard`, and `ResultsCard`), a reducer-managed state object, derived menu
visibility, and an independently named layered stylesheet. No old Target or
Reference CSS is imported.

# Comparison and correction loops

| Run | Result | What it exposed | Correction |
| --- | --- | --- | --- |
| Initial | 109 errors / 12 signatures | 80 raw `aria-controls` ID-string mismatches, child-link padding cascade, and menu-filter state differences | General CLI IDREF comparison fix; Target layer-specific padding; Target filter behavior. |
| Iteration 2 | 9 errors / 7 signatures | React-controlled navigation input did not respond to the CLI's native input event | Used `onInput`, preserving reducer state while supporting browser-native fill. |
| Iteration 3 | 2 errors / 2 signatures | Reference input value `policy` assumed Reference vocabulary and group location | Rejected the visible-copy workaround; added a product-external fill-value override and restored Target-native `Routing holds`. |
| Final | `pass`, 0 errors, 24 diagnostics | Selected state/style/focus/a11y behavior matched; absolute structural y positions differed by about 5.2 px | No gate weakening. Geometry remains diagnostic and was reviewed visually. |
| Post-pass visual review | CLI still `pass` | Empty screenshot showed that the controlled reporter value disappeared after React re-render; Core does not capture form values | Switched the Target field to native `input` event handling and reran the full Gate. |
| Relationship-gate run | 80 errors / 4 signatures | Newly captured relationship arrays had identical values but the comparator used JavaScript reference equality | Added general JSON value comparison for structured observation values. |

# Useful Reference evidence

- Live Initial/Results/Empty behavior made the intended default and recovery
  states unambiguous.
- Computed-style snapshots supplied exact observable treatments without
  requiring CSS source reuse.
- Action-only scenarios identified focus recovery, navigation filtering,
  disclosure, selection, theme, and result transitions.
- Stable keys made content-different elements targetable without DOM-path or
  text matching.
- Screenshots clarified grid density, action placement, independent scrolling,
  and pagination simplicity.

# Excess or implementation-coupled evidence

- Raw ID values in `aria-controls` were implementation identity, not UI design.
  The CLI now compares the stable-key identity of relationship targets while
  allowing local ID spelling to differ; the bounded a11y check still requires
  the local target ID to exist.
- The 24 geometry diagnostics repeat the same approximately 5.2 px vertical
  offset across states. The offset comes from content/harness composition and
  is useful for review, not a style failure.
- Three stable-key names retain Reference business nouns even though their
  matching role is reusable.

# Missing evidence and AI judgment

- The Reference does not specify how Target-specific fixture vocabulary should
  drive the same fill scenario. A one-value override was needed.
- Exact grid column proportions and page-heading-to-card distance are geometry
  diagnostics, not gates; visual judgment was required.
- Form-control values are not currently captured. Screenshot review was needed
  to catch the disappearing search value even after a zero-error CLI pass.
- The Reference shows the user menu but does not define production account
  command behavior, which correctly remained inert.
- CSS source independence cannot be proven by the UI report alone; path/import,
  hash, selector-overlap, and source-organization evidence was added.

# CLI usefulness

The normalized signatures reduced 109 raw occurrences to 12 causes and drove
three focused correction loops. It also exposed two general issues rather than
encouraging Target workarounds: raw IDREF comparison and Reference-vocabulary
fill values. The final independent-style mutation produced one signature across
20 captured states, demonstrating that the selected computed-style gate remains
active.
