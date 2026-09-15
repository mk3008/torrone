---
type: PoC result
title: Reference HTML SSOT experiment result
status: human review accepted; next bounded PoC recommended
source: repository checks, browser observation, and direct screen review
---

# Outcome

`promising within a bounded scope` — the frozen transfer run showed that a
buildless interactive Reference HTML can act as the design observation source
for content-different vanilla and React screens. That run used 13 stable keys
and four action-only scenarios. The later human-review Reference now uses 27
selective keys and 11 scenarios to expose navigation, focus, and the
Initial/Results/Empty result-region states. The old consumers were not updated,
so they are not evidence of conformance to the current Reference.

This result does not justify replacing the existing Manifest, defining a large
schema, or shipping an MCP server. It does justify continuing with another
screen pattern using the same small Core/CLI boundary.

# What belongs in the Reference

- One directly runnable business task with fixed, realistic dummy data.
- Native landmarks, headings, forms, labels, table/link semantics, and ARIA
  state/relationships.
- The actual visual decisions in normal CSS, including Light/Dark values,
  focus, status, density, borders, spacing, and overflow behavior.
- The smallest local JavaScript needed to expose meaningful states. In the
  current Reference that is navigation, filter disclosure, theme, user-menu
  focus/Escape, result filtering, result-state transitions, and the review
  harness selector.
- Stable `data-ref` keys only on elements needed for observation or scenario
  targeting. The current Reference has 27 rather than annotating every field,
  link, cell, wrapper, or dummy record.
- Action-only browser sequences when native semantics cannot identify the
  state path by themselves.

# What does not belong in the Reference

- Restated expected style values, state outcomes, boxes, roles, or accessible
  names in JSON/YAML. The browser already observes them.
- Consumer DOM, class names, component boundaries, framework state, file
  layout, or build configuration.
- Product schemas, real identifiers, remote assets, network calls, storage,
  authentication, asynchronous loading, or real business rules.
- Review instructions, acceptance criteria, Contract vocabulary, or design
  explanations inside the product canvas.
- A universal element-key catalog inferred from one queue screen.
- Undecided Request ID/New request destinations, a detail dialog, approval
  actions, API timing, count-query strategy, or target state-management names.

# HTML, CSS, and JavaScript range supported by evidence

| Area | Evidence-backed allowance | Not established |
| --- | --- | --- |
| HTML | Standard semantic HTML, native form/table/link elements, inline SVG, selective `data-ref`, one inert JSON scenario block, and one harness-root marker | Custom elements, shadow DOM, iframes, canvas-only UI |
| CSS | Local CSS, custom properties, Grid/Flexbox, media queries, `color-mix()`, focus/hover/state selectors | Preprocessors, CSS-in-JS equivalence, animation contracts, cross-browser token normalization |
| JavaScript | Small synchronous local event/state code, form filtering, focus recovery, harness switching, no module/build requirement | Network, storage, asynchronous state, routing, application frameworks inside the Reference |

The supported range is a PoC observation, not a general allow/deny policy.

# Metadata decision

## Retain experimentally

- `data-ref` on cross-content design-bearing elements.
- One JSON block with scenario names and actions only.
- One `data-reference-harness` marker on the Reference-only selector root.

Expected outcomes are derived by executing those actions in the live Reference.
This avoids hand-synchronizing Reference behavior with a second state contract.

## Reject for now

- Per-element expected roles, text, CSS values, geometry, and state metadata.
- A schema registry, component taxonomy, style-token export, or framework map.
- Stable keys on every field, cell, wrapper, and fixture item.

# CLI/Core result

The dependency-free Node CLI launches local Chrome/Edge through DevTools and
uses one browser Core for `snapshot` and `verify`. It records:

- explicitly keyed element presence, tag, inferred/native role, and accessible
  name for diagnosis;
- initial and action-step visibility, ARIA/native state, active focus, selected
  computed styles, and structural geometry;
- heading and landmark summaries, DOM accessibility risks, accessibility-tree
  role counts, and unnamed interactive nodes;
- external requests, browser/viewport identity, source digests, screenshots,
  and focused differences.
- console/uncaught errors and a derived count of harness roots excluded from
  product DOM and accessibility-tree observation.

Content text is not a comparison gate. The selected computed-style properties
and state on matching keys are gates. Geometry is diagnostic only and limited
to structural `header/nav/main/form/table/dialog` elements after text-sized controls produced
32 repetitive false-positive diagnostics in the first vanilla run.

An MCP adapter was not implemented. If later needed, it should expose these
same snapshot/verify inputs and JSON outputs without owning analysis logic.

# Candidate comparison

| Candidate | Observed result | Disposition |
| --- | --- | --- |
| Semantic HTML only | Directly readable and accessible, but content-specific IDs and changed control counts produced 8 missing-key errors and 9 extra/geometry diagnostics before any useful design comparison. | Reject as the sole cross-content matching method; keep semantic HTML as the base. |
| Semantic HTML + selective stable keys + action-only scenarios | The frozen 13-key/four-scenario transfer run passed for vanilla and React. The current 27-key/11-scenario Reference adds only handles needed by the expanded observable states. | Retain as the next bounded experiment candidate. The key count and scenario set are not canonical. |
| Full declarative role/style/state/geometry metadata | Candidate 2 already produced useful pass/fail evidence without it. It would duplicate observable facts and raise correction/drift cost. | Reject without implementation for this scope. Reconsider only after a demonstrated gap. |

# Defect detection

The frozen negative consumer deliberately removed the theme-toggle name,
changed the filter-toggle radius, and prevented dialog Escape. It still exits
`1` against the frozen baseline and reports the same required signatures. The
dialog remains only in that historical defect fixture; it is not present in the
current Reference and is not a current product recommendation. The
semantic-only cross-content comparison also still fails. No comparison rule
was weakened for the human-review adjustment.

# Authoring, correction, and maintenance cost

| Artifact | Measured size | Observation |
| --- | ---: | --- |
| Semantic-only micro Reference | 36 lines / 1,728 bytes | Very cheap, but insufficient cross-content identification. |
| Interactive one-file Reference before this adjustment | 909 lines / 32,320 bytes | Prior human corrections remained localized to the directly openable file. Size alone did not justify a split. |
| Current stable metadata | 27 keys, 11 scenarios, 19 actions | Expanded for observable navigation, focus, and three result states; no expected style/state values are restated. |
| Vanilla consumer | 512 lines across HTML/CSS/JS / 17,265 bytes | Shows that the same output can use split files and different content. |
| React consumer source | 157 JSX lines plus package/build files | Reference remained unchanged; the consumer alone required install/build. |

Earlier visual/copy/dummy-data corrections changed only the one Reference file.
This adjustment crossed files only because it introduced an observation
boundary for a non-product harness and separated current evidence from frozen
transfer evidence. Exact counts and locality are recorded in
`human-review-adjustment-record.md`. A `data-ref` rename affects scenario
targets, so keys should remain few and long-lived. This experiment still does
not settle one-file versus split Reference packaging.

# New-screen application and framework independence

- Vanilla `Transfer exception queue`: `pass`, zero errors and zero structural
  geometry diagnostics after the geometry-scope correction.
- React `Supplier onboarding cases`: `pass`, zero errors and two dialog-height
  diagnostics caused by different task copy.
- Both replayed the older navigation, filter, theme, and dialog contract. They
  have not replayed the current result-state or user-menu contract.

Framework independence is established only for semantic output, component/DOM
organization, state management, and build ownership. The React consumer imports
the vanilla implementation stylesheet to isolate the framework variable, so an
independent CSS re-authoring result is still `UNCONFIRMED`. The Reference itself
has no framework or build dependency.

# Machine review versus human review

## Keep in CLI

- Key presence/uniqueness, tag/role/state/focus, computed style, local-only
  network boundary, scenario replay, bounded contrast/name/relationship risks,
  source digests, deterministic JSON/PNG, and focused negative checks.

## Keep in human review

- Operational realism, density, hierarchy, copy quality, visual clarity of
  theme/focus/status, acceptability of structural geometry differences, and
  meaningful equivalence for keyboard/assistive-technology users.

# Cost and evidence limits

The experiment ran at one desktop viewport in Chrome 151. It did not test
responsive/narrow layouts, another browser engine, independent AI generations,
visual pixel diffing, CSS-in-JS, multiple screen patterns, or a real MCP client.
The full browser snapshots are machine-generated evidence and are not intended
for manual maintenance.

# Problems discovered in the human-review adjustment

- Excluding a harness from keyed DOM capture is insufficient. Headings,
  landmarks, bounded accessibility checks, focus, and the browser accessibility
  tree each need the same product boundary.
- A `hidden` attribute alone did not remove the harness from the accessibility
  tree because author CSS kept its display active. The CLI now proves an actual
  node-count reduction rather than trusting the marker count.
- The DevTools client had a response-registration race that surfaced as an
  intermittent startup timeout. Repeated review scenarios made this stability
  defect visible; three consecutive starts pass after the fix.
- A Reference-only selector can visually contradict product-driven state unless
  both paths use one renderer. The first Results screenshot exposed this and
  the selector now follows product Search/Clear transitions.
- Frozen Target reports can become misleading after the Reference evolves.
  Current evidence therefore uses a separate output namespace and does not
  present the old targets as current matches.

# Unconfirmed items carried forward

- Transfer of the human-accepted Initial/Results/Empty treatment and harness-
  excluded observation contract to a content-different Target.
- Independent CSS authoring in a Target; the historical React run shared CSS.
- Whether reusable partial References reduce stable-key/scenario growth and
  make corrections easier than the integrated example.
- Whether one-file or split packaging is cheaper after a real cross-file
  correction, plus responsive, cross-browser, assistive-technology, and MCP
  exposure evidence.

# Recommended next reversible experiment

First test a Target whose CSS is independently authored while preserving the
same browser-observed result. A later form-heavy partial Reference can test
validation and recovery without turning this integrated queue into a complete
application. Compare one-file versus split packaging only when an actual
correction demonstrates a cost. Do not change the existing Manifest or promote
a profile/schema before those results and human review.
