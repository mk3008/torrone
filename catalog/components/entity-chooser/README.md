# CHOOSER-001 — Entity Chooser Dialog appearances

[View eight independent images](index.html).

- Category: Component / parent-dependent single-entity chooser.
- Platform: Web-origin illustrations; browser, real-device and assistive-technology rendering unverified.
- Status: **Image-catalog candidate; human visual adoption pending.** Source approval remains separate.
- Appearance: combined conditions above comparable results, one pending radio choice and persistent confirmation/cancellation actions; the parent shows a committed name, ID and Clear separately.

| State image | Appearance | Source grounding |
| --- | --- | --- |
| [parent-empty](images/parent-empty.png) | Parent trigger without a committed value; the chooser is closed. | Parent markup; hidden .selection |
| [dialog-all](images/dialog-all.png) | Blank conditions and comparable rows; no pending choice, Select disabled. | resetDialog; renderResults; desktop .results allocation |
| [dialog-filtered](images/dialog-filtered.png) | Riverside, West and Depot combine to leave one unchosen result. | renderResults: ID/name AND region AND facility type |
| [dialog-pending](images/dialog-pending.png) | A checked radio and row emphasis identify the pending location; Select is enabled. | Native radio change; checked-row style; enabled confirm |
| [dialog-condition-changed](images/dialog-condition-changed.png) | Facility type is now All types; two results remain, neither checked, and Select is disabled. | Condition change clears pendingId; matching rows remain |
| [dialog-no-results](images/dialog-no-results.png) | Riverside, East and Depot have no combined match; conditions remain visible. | renderResults empty branch |
| [parent-committed](images/parent-committed.png) | Closed chooser with the committed name, ID and Clear action below the parent trigger. | Confirm handler; renderSelection; closed dialog |
| [narrow-pending](images/narrow-pending.png) | A fullscreen-shaped chooser with paired conditions, stacked row details and persistent actions. | max-width:800px styles: fullscreen allocation, stacked details, paired actions |

The dialog is the minimum composition that shows the relationship between conditions, comparison rows, pending choice and explicit confirmation. Parent values are separate images. No application shell, background page or research banner is included. Gallery layout and image canvas do not define the UI.

## Sources and new artwork

The approved [curation](../../../references/entity-lookup.md), blob `8c9ad171d3585364577ff808c616c3d8f01347ae`, identifies the [executable](../../../review/references/entity-lookup.html), blob `b28487af5c464d119099fd7cf12a1432a2dae512`, and the [human decision in PR #31](https://github.com/mk3008/torrone/pull/31). Its [review record](../../../docs/entity-lookup-review.md) explains result-first desktop allocation and narrow fullscreen allocation.

Every image is a **new source-supported reconstruction**, drawn as [SVG artwork](artwork/) and rasterized to PNG. These are not source screenshots, observed browser states or automatically approved exports. No additional behavior or unsupported loading/server-error/permission/pagination state is proposed. Exact geometry, colors, typography, spacing, control glyphs and fixture wording are illustrative.

The ten-record source fixture is retained. Riverside + West + Depot matches LC-044 only; Riverside + West + All types matches LC-044 and LC-045; Riverside + East + Depot matches none; Harbor + East + Service point matches LC-052 only. The all-results image shows six complete rows at the top of a bounded result region, with remaining records clipped and a scrollbar cue. Its exact visible row count is not a product requirement. Name and ID share each desktop line; narrow rows stack details.

## Limits

The same desktop dialog/header/footer geometry is used with many, one, two and zero matches. This illustrates allocation, not actual scrolling or viewport behavior. The narrow image illustrates a fullscreen-shaped composition; it does not demonstrate software-keyboard, safe-area or visible-viewport handling. Cancel, Close, Escape, reopening, Clear, focus return, native radio keys and condition-change transitions remain in the approved executable. A static state cannot prove those operations or their history.

A consuming application supplies its own [shared interaction policy](../../../docs/application-interaction.md). These pictures define no application navigation, validation, submission or persistence policy. Unpictured combinations, responsiveness, native control rendering and accessibility cannot be inferred.
