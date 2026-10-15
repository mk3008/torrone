# CHOOSER-001 image review evidence

Execution: [#48](https://github.com/mk3008/torrone/issues/48). Control: [root #77](https://github.com/mk3008/root/issues/77). Date: 2026-10-15. [Eight-state matrix](../catalog/components/entity-chooser/README.md).

## Source and scope

Approved executable Git blob `b28487af5c464d119099fd7cf12a1432a2dae512`; curation blob `8c9ad171d3585364577ff808c616c3d8f01347ae`. Source approval is recorded through PR #31; it does not approve these new images. Source code, fixture and review notes were inspected. Open Issue/PR inventory and local work contained no separate Entity Chooser image candidate. PR #36's historical full-screen proposal is not the source for this set. Prior accepted images remain in their separate unmerged branches.

Eight new SVG/PNG pairs show parent empty/committed, desktop all/filtered/pending/condition-changed/no-results and narrow pending. Every actual PNG was visually inspected for legibility, alignment, clipping and distinction between unchosen, pending and committed states. No image is an executed browser capture. The dialog-only composition is needed to relate conditions, result comparison and explicit confirmation; parent specimens contain only the relevant trigger/value. No whole application page was produced.

## Verification

| Check | Result and bounded evidence |
| --- | --- |
| PNG integrity | Eight distinct nonblank PNGs decode with Pillow. Parent empty 920×224; parent committed 920×380; five desktop states 1648×1248; narrow pending 780×1280. |
| Editable artwork | All eight SVGs parse; Sharp 0.35.5/librsvg 2.63.2 rasterization reproduces the committed PNG bytes at 2× logical dimensions. |
| Source identity and fixture | Git blob identities match the approved source and curation; exact ten source ID/name/region/type tuples checked. |
| Combined conditions | Explicit expected results: all ten IDs; Riverside/West/Depot → LC-044; Riverside/West/All types → LC-044, LC-045; Riverside/East/Depot → none; Harbor/East/Service point → LC-052. SVG rows/labels agree. |
| Pending versus committed | Exactly one checked row only in desktop/narrow pending images; Select enabled only there. Changed conditions clear pending even though LC-044 still matches. Parent commitment alone shows the committed ID and Clear. |
| Desktop allocation | Identical outer geometry, row clipping region and footer across all five desktop states. Six complete first rows fit the all-results image; later rows are clipped. This is drawing consistency, not scrolling execution. |
| Navigation and assets | New gallery/index local targets and fragments resolve; all image alternative descriptions are nonempty; eight gallery figures each link their full image. README/evidence references resolve. |
| Diff boundary | Only new `catalog/components/entity-chooser/` assets, this evidence file and one additive `catalog/index.html` card. `git diff --check` passes. No package, generator or framework added. |

The raster generator and bounded validation helpers were temporary authoring tools outside the repository. Every published file blob and complete Git tree is compared against this locally verified set before handoff; the publication result is recorded in the PR/Issue checkpoint.

## Application interaction applicability

No consuming application or shared policy revision is introduced. The existing [application interaction requirements](application-interaction.md) continue to apply to real consumers. The source is a standalone fixture, as its [review record](entity-lookup-review.md) states.

| Source / affected path | This handoff | Remaining gap |
| --- | --- | --- |
| Approved chooser: conditions → pending radio → Select → parent | Static states keep pending choice separate from commitment. | No native radio, filtering event, confirmation or host submission execution. |
| Condition change; Cancel/Close/Escape; reopen; Clear; focus return | Condition-changed and parent states illustrate appearances only. No behavior changed. | Cross-control forward/reverse traversal, cancellation history and reopening reset unverified here. |
| Desktop result allocation; narrow visible viewport | Stable desktop frame and narrow fullscreen-shaped drawing. | No internal scrolling, keyboard, touch, safe area, mobile browser chrome or real viewport test. |
| Catalog links and alternative descriptions | Static target/fragment checks passed. | Browser navigation, responsive gallery rendering and assistive technology unverified. |

A fresh Playwright executable-path check found no Chromium binary. No repeated download or new dependency was attempted. Historical source browser evidence remains attached to the source revision; it is not a new pass for this catalog. Human visual adoption remains pending.

## Material GUI findings and disposition

| Finding | Outcome |
| --- | --- |
| A highlighted result could be mistaken for a committed parent value. | Addressed here: checked pending radio + enabled Select inside the chooser; separate committed parent specimen. See state matrix. |
| Changing a condition must not depict a stale pending choice. | Addressed here: the two-result All types state has no checked radio and disabled Select despite LC-044 remaining a match. Source `pendingId = null` remains untouched. |
| One-result/empty states could suggest the dialog shrinks with result count. | Addressed here: identical five desktop frames and footers, result-only clipping region. Exact pixel sizes are illustrative. |
| Fullscreen narrow allocation could be mistaken for verified mobile behavior. | Bounded here: source-supported composition only; keyboard/viewport/scroll/focus checks explicitly unverified in this Issue and handoff. No new mobile implementation proposed. |

No new Reference-level decision, untracked implementation fix or follow-on pattern was introduced. Existing Shell, References, historical sources, PR #36/#37 and earlier candidate image files are unchanged. Merge/release/deployment remain separate decisions.
