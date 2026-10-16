# POPOVER-001 image review — 2026-10-15

Execution: [#40](https://github.com/mk3008/torrone/issues/40). Review: [two images](../catalog/components/anchored-popover/index.html), [provenance and boundaries](../catalog/components/anchored-popover/README.md).

## Bounded result

Two independent PNGs show a closed and an open anchored panel, without Shell, page content or account data. The open specimen includes its trigger because that minimal composition is necessary to show anchoring. Both images are **new generic proposals informed by research**, pending human visual acceptance. Neutral content and the ellipsis are new choices; they are not historically verified or fixed product requirements. No further pattern is included.

Source HTML blob: `836b66eb540156583804bf56780969a1f3ed5e23`. Inspected the actual open/closed source screenshots and the new PNGs. Source open screenshot blob: `99a34f007f017b3ec97297fcc0ff4405599b4b1d`; closed screenshot blob: `caa9f4add763c81ddd00048926791f09510407dd`. Source files are linked in the entry README. PR #36 is inventory only. No original image was edited or copied into this candidate.

## Application interaction applicability

This is an appearance catalog, not an executable Popover implementation. No approved generic Popover Reference or consuming-application policy is supplied. Approved icon-button guidance remains separate. The original account trigger's border is not an approved generic button variant; the current isolated trigger is a new proposal, and its glyph/style may vary.

| Path / responsibility | Coverage |
| --- | --- |
| Catalog index → component gallery → images / provenance | Static local destination, fragment and alt-text checks passed. Browser navigation and narrow layout unverified. |
| Trigger activation, closing, Escape, outside click, focus return, routing, account semantics | Not implemented or specified; no application interaction coverage claim. |
| Existing Shell, Menu, approved References and historical outputs | Unchanged; no adoption or runtime retest inferred. |

## Validation evidence

- Both PNGs decode, are nonblank and have distinct identities. Export dimensions: closed 560 × 120; open 560 × 364. These are export facts, not UI size requirements.
- Both SVGs parse; re-rendering with Sharp 0.35.5 / librsvg 2.63.2 produces byte-identical PNGs. No dependency or generator was added to the repository.
- The upper 100-pixel trigger/background region in the two PNGs is byte-identical. The extra open region supplies the panel, divider and generic content.
- Author inspected both PNGs at full image resolution: trigger and panel are visible, trailing edges align, labels are readable, and no unrelated control or Shell is included. This is self-checking, not independent design approval.
- Gallery has exactly two state images with alt text; local gallery/index links, fragment targets and entry README references resolve. Source HTML and both screenshot blob identities match.
- `git diff --check` passed. Scope audit permits only the new `catalog/components/anchored-popover/` subtree, the additive component card in `catalog/index.html`, and this evidence note. No MENU-001, Shell, References, PoC history, PR #36/#37/#39 or shared CSS is changed.
- Browser rendering is unverified. The same session previously established missing Chromium and failed downloads; no changed environment fact justified repeating the failed installation. No browser/responsive/accessibility/mobile/interaction/E2E pass is claimed. The PR body exposes the two actual PNGs for review without deployment.

### PNG identities

| State | SHA-256 |
| --- | --- |
| closed | `d19ab08880e62f9907181be527f5c09fa5aa866eec84f149ce19e2eadcecd9d8` |
| open | `8389e4ee4e7e42b40e5eddc3efb886d50268361d4190a13e0180af55eb831e1b` |

## Material findings and disposition

| Finding | Outcome |
| --- | --- |
| Account identity and sign-out content would imply an authentication-specific pattern | Replaced with neutral fixtures and explicitly labeled as new generic artwork; human adoption remains pending. |
| A panel alone would hide its relationship to the trigger | Open image retains the minimal trigger/panel pair. |
| Closed source capture includes restored keyboard focus | No focus ring is transferred; closed and focus appearances are not conflated. |
| Source shadow/header colors and geometry could become accidental requirements | Illustration styling is simplified and all exact styling is explicitly illustrative. |
| Initial pixel-region check included the panel's top pixels in the supposed trigger-only region | Corrected the checked region to contain the complete trigger and exclude the panel. The artwork did not change; the corrected comparison passed. |
| Browser presentation remains unavailable | Static image review remains possible; browser and narrow-layout coverage stays unverified. |

Human review decides whether this generic appearance is useful. Acceptance of MENU-001 or historical account research does not accept this candidate. Merge/release/deployment remains a separate decision.
