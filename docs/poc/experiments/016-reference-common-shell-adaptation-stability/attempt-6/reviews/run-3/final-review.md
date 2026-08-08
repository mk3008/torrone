# Attempt 6 Run 3 — independent final review

## Verdict

**Status: correction required.**

The final artifact contains all three assigned corrections: it prevents the
implicit favicon request, visibly exposes a matching child from a stored
collapsed parent, and removes every implementation-authored copy item named in
the initial review. Fixed fixture and visual-binding inputs remain unchanged,
and the visual-binding and SVG static checks still pass.

One interaction regression prevents acceptance. During a child search from a
stored collapsed state, `Workspace` is presented as expanded through
`aria-expanded=true` and the expanded/collapse icon. Activating that disclosure
does not collapse the visible group or produce any immediate visible state
change; it only toggles the hidden stored state. Clearing the query can then
leave the group expanded even though the pre-search stored state was collapsed.
The control therefore advertises a next action that its activation does not
perform in the current state.

## Review isolation

This re-review used only:

- this reviewer's immutable `attempt-6/reviews/run-3/initial-review.md`;
- the Attempt 6 freeze and fixed Reference/binding/vNext/fixture inputs;
- `attempt-6/runs/run-3/final/`; and
- the parent-supplied Run 3 browser facts: the final console was
  artifact-error-free and collapsed-parent search visibly exposed
  `Section 01`.

No peer Run, peer review, or immutable initial implementation was inspected.
No server or browser was started. The parent-supplied browser facts are
identified separately from this reviewer's source and static observations.

## Initial-finding reconciliation

| Initial finding | Final result | Evidence | Classification |
| --- | --- | --- | --- |
| Artifact-attributable `/favicon.ico` 404 | **corrected** | `final/index.html` declares a local blank SVG data-URL favicon. Parent browser observation reports an artifact-error-free final console. | conforming; initial `non-conformance` closed |
| Matching child hidden when `Workspace` is stored collapsed | **corrected for result visibility, but introduces a control-meaning regression** | `matchingWorkspaceChildren`, `searchRevealsWorkspaceChildren`, and `workspaceDisplayedExpanded` expose child matches. Parent browser observation confirms `Section 01` is visible from collapsed state. The disclosure activation still toggles `workspaceExpanded` rather than the displayed state. | new implementation `non-conformance` |
| Invented product/demo copy | **corrected** | Source scan reports zero matches for `Shared operations`, `Workspace map`, `Fixture ready`, `Operational sequence`, `Neutral fixture item`, and `Numbered fixture items`. Frozen fixture content and accepted generic labels remain. | conforming; initial `non-conformance` closed |

## Correction and regression matrix

| State / operation | Expected result | Final evidence | Finding |
| --- | --- | --- | --- |
| Normal empty search | Stored disclosure state controls parent expansion | `searchRevealsWorkspaceChildren` is false for an empty query, so `workspaceDisplayedExpanded` equals `workspaceExpanded`. | pass |
| Stored collapsed state, enter `Section 01` | Matching child becomes visible without silently replacing the stored disclosure state | Source derives a temporary displayed expansion; parent browser observation confirms `Section 01` becomes visible. | pass for the requested search result |
| Forced-open search state | The visible disclosure affordance and activation outcome have stable, coherent meaning | `aria-expanded` and icon use `workspaceDisplayedExpanded=true`, but `onClick` toggles only `workspaceExpanded`. From stored false, the first activation changes stored false to true while the group stays visibly expanded. | fail; interaction regression |
| Clear query without disclosure activation | Original collapsed state returns | The search-derived term becomes false and the untouched stored state remains false. | pass in source |
| Clear query after activating the forced-open disclosure once | Result remains consistent with the control's advertised collapse action | Stored state was changed to true while the UI did not visibly collapse, so clearing the query leaves the group expanded. | fail; hidden state mutation contradicts the visible action |
| True no-match query | Frozen empty message remains available | `workspaceVisible` and `hasMatches` become false when neither parent, child, nor top-level item matches; the frozen empty message renders. | pass in source; no independent browser capture supplied to this reviewer |
| Console load | No artifact-attributable errors or warnings | Parent browser observation reports error-free operation; the explicit data-URL favicon removes the prior implicit request cause. | pass |

## Fixed-input and regression checks

The following independent repository checks passed against `run-3/final`:

- visual-binding validation;
- vNext candidate static validation;
- SVG rendering validation with seven themed assets; and
- Attempt 6 product fixture preflight at baseline `2b3ebb0`.

SHA-256 comparison found `binding-map.json`, `visual-tokens.css`, and all seven
fixed SVGs identical to their canonical sources. The final fixture is identical
to the frozen fixture with SHA-256
`7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D`.

No repository evidence indicates a regression in the exact asset identity,
state-to-icon mapping, CSS-mask/currentColor rendering family, selected-row
tokens, indicator width/location, focus token, Header/Drawer/Main relationship,
or independent Drawer/workspace overflow declarations. These are source and
static findings. No new final 1440 × 900 capture set was present in the assigned
final artifact, so this re-review does not claim a new independent browser
visual acceptance for those already-passing areas.

## Business-screen review

### Copy inventory

| Copy class | Final disposition |
| --- | --- |
| Frozen application, navigation, search, Main heading/description, empty-state, and item-count facts | retained; fixture-owned |
| `Navigation`, `Current destination`, and derived numbered items | concise identity/state/data; acceptable |
| Initial-review prohibited copy list | absent from final source; copy gate passes |

The final screen has zero implementation-authored prohibited items from the
assigned correction list. No product fact was promoted into the fixture or
fixed contract.

### Action inventory and interaction hierarchy

| Action | Final finding |
| --- | --- |
| Drawer visibility toggle | Native button, next-action name, fixed mapped icon, stable Header-leading position. No regression found. |
| Theme toggle | Native button, next-theme name, fixed mapped icon, stable Header-end position. No regression found. |
| Search | Labelled native input; matching child and true no-match source paths now exist. Search result correction is present. |
| `Workspace` disclosure outside active child search | Separate native button with coherent stored expansion state. Pass. |
| `Workspace` disclosure during forced child-search expansion | Visible expanded state and activation effect disagree. Fail. |
| Destination selection | Separate full-row buttons with `aria-current`; no source regression found. |

The disclosure failure violates stable meaning and state feedback: the user
receives no visible result from an apparently available collapse action, while
future state changes invisibly.

### Accessibility and evidence limits

- Source retains native controls, accessible names, labelled landmarks,
  `aria-current`, focus-visible CSS, and a non-colour selected indicator.
- The forced-open disclosure exposes an accessibility inconsistency as well as
  a pointer interaction problem: assistive technology receives
  `aria-expanded=true`, yet activating the button does not make the controlled
  content collapse.
- Removing the Drawer `h1` leaves the loaded shell with the fixture Main heading
  as `h2` and no `h1`. The initial review already treated heading structure as
  an out-of-contract accessibility risk; the copy correction makes that risk
  more visible but it is not the blocking common-shell finding here.
- Screenshots and source cannot prove keyboard order, focus restoration, or
  screen-reader announcements. No new independent browser capture or
  assistive-technology evidence was supplied to this reviewer.

## Deviation ledger

| Finding | Classification | Route |
| --- | --- | --- |
| Favicon correction and parent-observed clean console | conforming | no further correction |
| Assigned prohibited copy removed | conforming | no further correction |
| Matching child is visible from stored collapsed state | conforming for the original search-result defect | preserve this correction |
| Expanded disclosure advertises collapse but mutates only hidden stored state during search-forced expansion | `non-conformance` (implementation regression) | correct Run 3 final interaction logic only |
| Canonical assets, fixture, visual/SVG integration, and shell source invariants remain unchanged | conforming | no fixed-input change |
| Missing new final capture set for independent full visual regression review | `observation-gap` | retain as an evidence limit; do not infer an implementation defect |

No `manifest-gap`, `prompt-gap`, `fixture-gap`, `reference-binding-gap`,
`exact-binding-miss`, or SVG-rendering miss was found. No frozen input change is
requested.

## Narrow correction request

Preserve all three completed corrections and change only the forced-search
disclosure behavior so its advertised state and activation outcome agree.

When a child match temporarily forces the group open, either:

- make the forced-open parent non-disclosable for that temporary state while
  preserving an understandable parent identity; or
- provide an activation whose immediate visible result and stored-state effect
  are both consistent with the control's displayed expanded/collapse meaning.

The required outcome is that an apparently available collapse action never
silently changes only a hidden post-search state. Verify this focused sequence:

1. start with stored `Workspace` collapsed;
2. search for `Section 01` and confirm the child is visible;
3. activate the parent affordance and confirm the visible result matches its
   advertised action, or confirm the affordance is correctly non-actionable;
4. clear the query and confirm the stored state is predictable and consistent
   with any deliberate user action; and
5. retain the artifact-error-free console and zero prohibited-copy result.

Do not change the fixture, Reference, visual bindings, vNext contract, Manifest,
or immutable initial artifact.

## Gate recommendation

Run 3 final remains **correction required**. The assigned favicon, search-result,
and copy defects are corrected, but the search correction introduced a material
disclosure-control regression. After that narrow interaction correction and
focused serial re-observation, the Run can be reviewed again for acceptance.
