# ICON-BUTTON-001 image review — 2026-10-15

Execution: [#42](https://github.com/mk3008/torrone/issues/42). Review: [five state images](../catalog/components/flat-icon-button/index.html), [state matrix and sources](../catalog/components/flat-icon-button/README.md).

## Result and provenance

Five independent PNGs reconstruct normal, hover, active/pressed, focus-visible and disabled appearances from the approved [Flat icon buttons](../references/icon-button.md) Reference. All use its same double-chevron glyph; no unsupported state is invented. This new catalog artifact remains pending human visual adoption.

Verified the executable's approved Git blob `b8e039b8dbee39ccd668d3936be60abffe1fa447` and curation blob `5b4c142aeb0c59ab5959a7bd4c29ff3972839be9`. Read the linked [human approval](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948). The exact source remains approved in its own scope; its draft filename/text does not negate the recorded curation decision. No original source or approval evidence changed.

The images are static SVG reconstructions rasterized with Sharp 0.35.5 / librsvg 2.63.2, not browser captures of actual pseudo-classes. Source CSS and glyph path ground the state distinctions; exact export geometry is illustrative. Combined states and forced-colors rendering are not represented. Source approval is not transferred automatically to these drawings.

## Application interaction applicability

No consuming application policy is supplied or modified. This is appearance salvage only; no input events, focus movement, command semantics or accessibility behavior are implemented. The approved executable's target-size, keyboard and disabled-semantics contract remains authoritative where applicable; the image catalog neither replaces nor relaxes it.

| Responsibility / path | Evidence |
| --- | --- |
| Catalog index → gallery → PNG / scope links | Static local destinations, fragments and alt text checked. Browser navigation/narrow layout unverified. |
| Appearance state differences | Five actual PNGs inspected, unique identities and central glyph position checked. |
| Native Enter/Space, pointer activation, Tab/focus, disabled event suppression | Not implemented or tested by these images; no behavior coverage claim. |
| Existing approved References and other catalog candidates | Unchanged; original approval scope retained. |

## Verification

- All five PNGs decode, are nonblank and have unique identities; export size 180 × 180 each. Export size and canvas are not target dimensions or button borders.
- All five SVGs parse; exact source glyph path retained. Enabled images retain the same dark-glyph pixel coordinates through normal, hover, active and focus appearances.
- Re-rendered SVGs produce byte-identical PNGs. No dependency, reusable generator, framework or test machinery added.
- Author inspected every PNG: unboxed normal, distinguishable hover/pressed target fills, inner focus outline, muted disabled icon. Same glyph and isolated canvas throughout. This is an author self-check, not independent design approval.
- Local HTML links/fragments and image alt text resolve; exactly five gallery images; entry README local references resolve. Original executable/curation blob identities match.
- `git diff --check` passed. Diff is limited to the new flat-icon-button entry, its index card and this verification note. No Shell, References, research history, earlier candidates or earlier PRs changed.
- Browser execution remains unavailable from the established missing Chromium/download failure in this session. No unchanged installation retry. Browser, forced-colors, responsive, mobile, accessibility or interaction passes are not claimed. Existing Entity lookup CI is separate regression evidence, not coverage of this candidate. Actual PNGs are visible directly in the Draft PR without deployment.

### PNG identities

| State | SHA-256 |
| --- | --- |
| normal | `a7b2c20582859ac3e3bf6cd230cd60d2e235a8fa00f19d4fb7d4be6b429e0040` |
| hover | `055649dde6c9873520baf66cd5f08805cbeb361021ea47515d298388694c3c65` |
| active | `165fa3ec576c61ef8bc4fd4d2dc941365a33e468b979a8b64f63378ef429a9a8` |
| focus-visible | `ba67d3182083525d26bd82e4930653bd0f15c951c0ad3449699eacc8ef9b6d4f` |
| disabled | `516110bc606f725e555fbd39a3a2fdd356df3b96b000c25cd72a14773e37db29` |

## Material GUI findings and disposition

| Finding | Outcome |
| --- | --- |
| Glyph differences would obscure state differences | Same source glyph and fixed central position used throughout. |
| Hover fill could be mistaken for focus | Focus has its own independently pictured outline, with no hover fill. |
| Catalog omission of behavior or dimensions could weaken the approved Reference | Explicitly retain the original applicable target-size, accessibility and behavior contract; images are not substitutes for it. |
| Approved source could be confused with an automatically accepted catalog export | Candidate status and exact source approval are stated separately. |
| Browser/forced-colors/combined states are not verified or represented | Preserve the limitation; do not infer them from static drawings. |

Human review concerns the five new approximate appearance images. Merge/release/deployment and the next pattern remain separate from this candidate's production.
