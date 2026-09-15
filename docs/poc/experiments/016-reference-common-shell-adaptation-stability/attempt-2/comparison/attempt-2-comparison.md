---
type: PoC comparison
title: Reference common-shell adaptation stability — Attempt 2
status: completed; human decision pending
source: reviewer synthesis
---

# Attempt 2 three-Run comparison

## Result

All three final artifacts belong to the same common-shell design family: a
persistent Header, a left navigation Drawer with a normal search field and
disclosure, a distinct remaining workspace, full-row current-location
treatment with a leading non-colour cue, and a Drawer-hidden workspace that
uses the vacated track. Each artifact is a separate browser-native HTML, CSS,
and JavaScript implementation; no Reference HTML or CSS was copied as the
output.

| Measure | Run 1 | Run 2 | Run 3 | Aggregate |
| --- | ---: | ---: | ---: | ---: |
| Initial Reference invariants | 6 / 6 | 6 / 6 | 6 / 6 | 18 / 18 (100%) |
| Final Reference invariants | 6 / 6 | 6 / 6 | 6 / 6 | 18 / 18 (100%) |
| Initial product-parameter completeness | 7 / 8 | 7 / 8 | 7 / 8 | 21 / 24 (87.5%) |
| Final product-parameter completeness | 8 / 8 | 8 / 8 | 8 / 8 | 24 / 24 (100%) |
| Bounded correction cycles | 1 | 1 | 1 | 3 |

The six Reference invariant outcomes are Header persistence; a labelled
next-action Drawer control; no residual hidden Drawer track; independent
navigation/workspace scrollport structure; full-row, non-colour current cue;
and visible keyboard focus styling. The eight product-parameter checks are
application identity/control surface, supplied Drawer navigation and current
state, search label/placeholder/filter/no-match, disclosure behavior, neutral
80-item fixture, initial open state, Light/Dark palette availability, and
destination treatment without navigation.

## Initial findings and corrections

| Run | Initial finding | Relationship | Problem class | Final correction |
| --- | --- | --- | --- | --- |
| 1 | The supplied `Search navigation` label was neither visible nor exposed as the searchbox name. | product parameter | `implementation-translation-error` | Added the visible programmatic label. |
| 2 | Dark palette left Header identity and main heading at Light-scope inherited foreground values. | required palette parameter / semantic-palette default | `implementation-translation-error` | Applied the selected foreground at shell scope. |
| 3 | The same foreground-scope defect also made Dark heading and fixture text unreadable. | required palette parameter / semantic-palette default | `implementation-translation-error` | Applied the selected foreground at shell scope. |

No finding was a `reference-or-manifest-gap`, `adaptation-instruction-gap`,
`verification-condition-gap`, or `design-family-divergence`. Run 1's compact
dark Header, Run 2's grid fixture, Run 3's SVG controls, and the differing URL
parameter names are allowed implementation freedoms, not design changes.

## Browser and static evidence

For every final Run, the orchestrator review observed the Light open state, the Dark
palette, Drawer-hidden state, labelled filter with no-match text, disclosure
collapse/re-expansion retaining the selected `Activity` destination, current
row treatment, and the 80-item fixture. The Drawer-hidden main measured the
full 1280px browser viewport in Runs 2 and 3; Run 1 was also observed without a
Drawer track. Source and DOM review establish separate `overflow-y` navigation
and workspace scrollports and visible `:focus-visible` rules. Browser DOM
checks confirmed distinct overflow heights and retained independent scroll
positions (`120` and `210`) for both regions in every final Run. This is not a
claim of full assistive-technology, responsive, or production-readiness
testing.

Both frozen-input guards passed after implementation:

- Reference-owned inputs: `9cd19321e53f6279e956df8a6d1fe562c3360544`, 52 files.
- Product-owned input: `c44c997`, one contract file.

`node --check app.js` passed for all three final artifacts. No frozen input was
changed.

## Stability judgement

The stated success thresholds are met:

- all three final Runs satisfy every Reference invariant;
- all three reached the final result with one correction cycle;
- no all-Run design-family misunderstanding occurred; and
- a reviewer can identify one common-shell family without requiring identical
  DOM, CSS, geometry, icons, or URL implementation.

The recurring issue in Runs 2 and 3 is a CSS custom-property inheritance
mistake in Dark palette implementation. It is a shared implementation
mechanism, not a disagreement about the Reference's information structure or
Drawer semantics. It should remain recorded as evidence, not trigger a frozen
input change during this Attempt. The isolated execution records establish
separate initial artifacts and fixed-input preflights, but do not preserve a
machine-readable same-model/same-prompt transcript. That equality is therefore
**UNCONFIRMED in repository evidence** and limits this result to a practical
three-artifact stability observation rather than a controlled model benchmark.

## Direct comparison links

Use [the browser comparison page](index.html) to open each initial/final pair.
The per-Run records are [Run 1](../runs/run-1/review.md),
[Run 2](../runs/run-2/review.md), and [Run 3](../runs/run-3/review.md).
