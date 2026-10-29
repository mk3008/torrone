# Visual-catalog selection desk pilot: frozen baseline

Date: 2026-10-29. Execution: [Issue #63](https://github.com/mk3008/torrone/issues/63).

## Status and method

This is a same-agent, source-grounded desk exercise, not an independent model benchmark, human usability study or evidence of error-rate reduction. The author read the current catalog index and all eleven entry READMEs, selected the synthetic cases below and authored the decision checks and A answers. The author already knew the hypothesis that supplementary selection guidance might help. Freezing A before writing B prevents later editing of A; it does not remove hypothesis awareness, selection bias, carryover or author-as-judge bias.

Condition A is the catalog index, entry descriptions, limits and state images at repository commit `581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0`. No experimental selection aid is included. Linked executable References retain separate authority but were not operated as part of this exercise. The catalog's global instructions to inspect responsibilities, states and limits apply equally to A and B. Neither condition is just the index table.

Six representative original PNGs were actually opened: hidden Shell, highlighted lookup candidate, dialog desktop frame, expanded disclosure, Start calendar and High badge. The remaining images were available through their original entry links but were not all visually inspected. This exercise evaluates responsibility/scope selection; it does not establish complete image comprehension or visual design quality. A later image-based trial must expose the same images in both conditions.

Decisions use ordinary terms: suitable for the stated appearance responsibility; partial visual reuse with an explicit gap; no registered match; or clarification required. These are experiment answer descriptions, not new catalog metadata.

## Requirements, falsifiable checks and recorded A answers

The requirements are synthetic business-application requests, not requests received from end users. Each check follows a current source boundary; it is not an independently approved design oracle. A final product choice can differ when the application supplies additional requirements.

| Case | UI request | Check derived from current catalog | Recorded A decision and reason |
| --- | --- | --- | --- |
| C01 | In an operations workspace, hide all left navigation, including icons, and let the content use the space. | SHELL-001 can supply this region relationship. Do not transfer the source's menu contents or routing. | Suitable: SHELL-001. Its summary explicitly describes complete hiding and expanding workspace; application navigation remains separate. |
| C02 | Collapse the same workspace navigation but keep a permanent icon rail visible. | Do not present SHELL-001 as satisfying this requirement. No rail variant appears in the registered index. | No registered match for the requested rail. SHELL-001 explicitly excludes the compact/icon-rail variant. A separate design would be needed; do not invent a registered ID. |
| C03 | A purchase form chooses one existing location by name or ID; compare an emphasized candidate with a committed value. | INLINE-LOOKUP-001 supplies single-entity appearances; highlight must not imply commitment. | Suitable: INLINE-LOOKUP-001 for the field/list appearances. Candidate highlight is separate from commitment, which adds Clear and an ID below the field. Actual query/commit events remain application requirements. |
| C04 | The form must select several locations and show removable chips for all selections. | Do not claim the single-entity lookup covers multi-selection or chips. | No registered match for the whole request. INLINE-LOOKUP-001 is explicitly single-entity; neither chips nor multiple committed selections are registered here. This does not prohibit a future adapted design. |
| C05 | Keep the single-location lookup, but it must show server loading, timeout and retry states. | Partial reuse is possible, but those states cannot be declared covered by the seven images or no-results state. | Partial: INLINE-LOOKUP-001 for represented field/list appearances only. Loading, server error and retry are missing; no-results is an unmatched local query, not a network failure. |
| C06 | An edit dialog needs a persistent title and actions around a scrolling form body. Approval rules and saving are specified elsewhere. | DIALOG-001 supplies the regions, not approval, Save behavior or proven scrolling/focus operation. | Suitable for region composition: DIALOG-001 desktop frame. Form content is replaceable. Scrolling must be implemented and verified; its pictured cue is not executed behavior. No generic executable dialog approval is inferred. |
| C07 | An audit page has three expandable sections; exactly one must stay open, and switching must retain unsaved values. | DISCLOSURE-001 can illustrate one open/closed section but cannot establish accordion coordination or value retention. | Partial: DISCLOSURE-001 for each local appearance. Exactly-one-open coordination and value retention need application requirements/design and verification; the pair does not define a multi-section accordion. |
| C08 | An invoice filter allows either date boundary to be empty. A calendar should visibly identify which boundary is being edited. | DATE-RANGE-001 can supply the appearances. Its August fixture/cutoff must not become invoice rules. | Suitable: DATE-RANGE-001 empty, partial and calendar-owner appearances. Optionality comes from this request, not the pictures. Actual date availability, normalization and keyboard behavior remain separate. |
| C09 | Clicking a rounded priority label must toggle the list filter and visibly show selection. | BADGE-001 is noninteractive; shape similarity is insufficient. No filter-chip pattern is registered in the index. | No registered match for the complete selectable-filter responsibility. Reject BADGE-001 for activation/selection. The label's visual treatment could inform a separately designed control, but approval does not transfer. |
| C10 | The request says only “choose a location”; it does not say one/many, local inline lookup or a separate selection task. | Do not force a final choice based on appearance or terminology alone. DIALOG-001 is a frame, not a registered chooser operation model. | Clarification required: ask selection cardinality and whether selection happens in the field or a separate task. INLINE-LOOKUP-001 is a conditional candidate for one inline entity; DIALOG-001 is at most a frame candidate for a separate task. No final adoption. |
| C11 | A developer tool needs the previously reviewed Watch on/off/disabled pattern. | The index explicitly says Watch images have not been recovered for registration. Prior review does not create a catalog ID or recover assets. | No registered match. Do not invent WATCH-001 or substitute a button's pressed/disabled appearance for persistent Watch state. Preserve the missing-asset condition. |
| C12 | A Search text command needs normal, keyboard focus, disabled and loading appearances. | TEXT-BUTTON-001 covers normal/focus but explicitly omits disabled/loading. ICON-BUTTON-001's disabled image does not approve a text variant. | Partial: TEXT-BUTTON-001 for normal and focus. Disabled/loading need an explicit new design; do not interpolate them from other entries or call the lifecycle complete. |

A selected ID denotes proposed visual reuse, not a new human approval or complete product solution. “No registered match” concerns this fixed index, not every historical Reference or all possible UI designs.

## Source anchors available to both conditions

- [catalog/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/README.md)
- [catalog/shells/workspace/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/shells/workspace/README.md)
- [catalog/components/inline-entity-lookup/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/components/inline-entity-lookup/README.md)
- [catalog/dialogs/framed/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/dialogs/framed/README.md)
- [catalog/components/disclosure/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/components/disclosure/README.md)
- [catalog/components/date-range/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/components/date-range/README.md)
- [catalog/components/text-badge/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/components/text-badge/README.md)
- [catalog/components/text-button/README.md](https://github.com/mk3008/torrone/blob/581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0/catalog/components/text-button/README.md)

Critical source sections: Shell summary; lookup Category, Source and Limits; dialog Reuse, Scope and Limits; disclosure composition and Limits; date Source and fixture / Boundaries; badge Category and Limits; text-button Limits; index final paragraph for Watch.

## Observations reserved for the comparison

For every answer, inspect chosen ID, supporting source, unpictured-state handling, missing-requirement handling and any unsupported behavior/approval claim. Record human corrections only when an actual human reviews an answer; no review means **not measured**, not zero. Search time, reader effort and future maintenance time are also not measured here.

A is preserved in its own commit before the experimental aid and B comparison. This document is not a product guide or a required workflow.
