# MENU-001 isolated image review — 2026-10-15

Execution: [Issue #38](https://github.com/mk3008/torrone/issues/38). Review surface: [gallery](../catalog/menus/one-level/index.html), [state matrix and sources](../catalog/menus/one-level/README.md).

## Result and decision boundary

Nine independent state PNGs and their editable static SVG artwork are ready as a candidate. Six reconstruct the historical Menu's visual relationships; three disabled pictures are new proposals without historical Menu evidence. No state is newly accepted. Human visual adoption is pending, independently of merge/release.

Child states use only a parent and target child because a child alone does not communicate indentation. No header, full drawer, workspace, account UI or Screen is present. Neutral fixture labels replace historical business names. The SVG drawings use source-informed relationships, not a pixel-exact transfer. The PNGs were rendered from SVG with the runtime's Sharp/librsvg; no historical bitmap was edited or imported into the candidate.

## Source inspection and missing evidence

Read PoC 017 HTML blob `836b66eb540156583804bf56780969a1f3ed5e23` and visually inspected `00-initial.png`, `navigation-parent-round-trip-01.png` and `navigation-selection-round-trip-01.png` under `output/human-review/reference/`. Their source links and Git blob identities are recorded in the state matrix. Checked PR #36's inventory and PR #37's visual-scope proposal without changing either PR.

The original captures support selected/unselected row treatment, child indentation and parent arrow orientations. The closed-parent screenshot also contains incidental hover fill; this is not treated as the closed-state appearance. Historical Menu disabled evidence is missing. The new subdued treatment is a proposal for leaf, child and closed parent, not an inferred permission rule or an approved style. Open-disabled and selected-disabled combinations remain unspecified.

## Application interaction applicability

This phase follows the appearance-only boundary in Issue #38 and the catalog-scope proposal at PR #37 head `ace5ccb0ad2943c042cec3d2259a46c718bcb411`. No consuming application's navigation policy is supplied or changed. There is no approved Menu entry in `references/README.md`; PoC 017 is research, not a replacement approval source.

| Path / responsibility | Applicability and evidence |
| --- | --- |
| Application keyboard, routing, permissions, focus return, cross-control transitions | Not implemented or defined by these static images; no application conformance claim. Missing consuming-product policy is preserved. |
| Catalog index → MENU-001 gallery → individual PNG / scope / Shell | Local destinations, fragment targets and image alt text checked statically. Actual browser navigation and narrow-viewport layout remain unverified. |
| Whole drawer show/hide and existing Shell paths | Unchanged; no interaction retest claimed. |

## Verification

- All nine PNGs decode, have distinct SHA-256 identities and contain nonblank rendered artwork. Single-row exports are 480 × 76; child-context exports are 480 × 158. These are export facts, not required UI dimensions.
- All nine SVGs parse and have an accessible title/name. Re-rendered SVGs produce the committed PNG bytes with the installed Sharp renderer.
- Visually inspected every exported PNG. Labels and arrows are visible; selection emphasis, child indentation and subdued proposals are distinguishable. Each image contains only its target row or the minimal parent/child context. This is an author self-check, not independent design review.
- Six relevant image pairs differ: leaf/child selection, parent arrow orientation and each of the three ordinary/disabled proposals.
- Local gallery/index links, same-page fragments, image alt text and README file references resolve. Gallery contains exactly nine state images. Original HTML and three screenshot blob identities match the stated provenance.
- `git diff --check` passed. Scope audit permits only `catalog/index.html`, the new `catalog/menus/one-level/` subtree and this evidence note. No changes to `catalog/README.md`, Shell, References, PoC history, PR #36 or PR #37.
- Browser execution was unavailable: Playwright is installed but its Chromium executable is absent. Browser downloads failed ZIP extraction; a probe of the Chromium download endpoint returned a 195-byte HTML response rather than a ZIP. No browser screenshots, responsive-layout pass, screen-reader test, mobile-device test, interaction test or E2E pass is claimed. No repository dependency or browser framework was added.

### Export identities

| State | PNG SHA-256 |
| --- | --- |
| leaf-unselected | `114b07c73225cd09e9a733a929c20e7005f1685f4167c82959aa57808872fa6c` |
| leaf-selected | `658051c7949a45bbcf4549e9f6359edd3a2f83707ce7827563674c70d852fc86` |
| child-unselected | `7fe8854859630d0ebc2c201db0379aecd3ed876f6df91b3cd0c5f3485e33114f` |
| child-selected | `9a83f89fe49d8da9197a811d0be4eea6335f4c557409fe3b23b0c56f07bac432` |
| parent-closed | `656b05fb5a29e6aef7af9204773d950ebebe635f2a1a91de49998c33c27ecebd` |
| parent-open | `a1d1485c5e5e41300941df0595d0a2291b2ae81423556ee3697bd4ab364de46c` |
| leaf-disabled | `a473a0e4331d906cec294af6600e4394cdbe274169c9417377576c8a987f86ec` |
| child-disabled | `401f29d445cde891580b5ad983da978b5e180d83844d9a611b4e52dccd021d2f` |
| parent-disabled | `02385025633be2828b3fae3f03ab1dd70090c9f602b8e6f1d571dacec7cfcf49` |

## Material GUI findings and disposition

| Finding | Disposition |
| --- | --- |
| Full screenshots obscured the intended independent state unit in the earlier candidate | Addressed by isolated row artwork; only child indentation retains a two-row context. Historical PR #36 is preserved. |
| Disabled states lack historical Menu evidence | Addressed through a separate new-proposal group and explicit per-state provenance. Human may reject all three independently. |
| Parent closed capture contains hover emphasis | Addressed by separating arrow direction from incidental hover fill in the reconstruction. |
| Browser rendering and narrow gallery navigation are unverified | Explicit limitation above. Review PNGs directly on GitHub; do not infer responsive or application coverage from static checks. |

Human review should judge the six source-supported appearances and the three disabled proposals separately. There is no request to adopt colors, fonts, geometry, any runtime behavior or a subsequent pattern. Merge and release remain separate decisions.
