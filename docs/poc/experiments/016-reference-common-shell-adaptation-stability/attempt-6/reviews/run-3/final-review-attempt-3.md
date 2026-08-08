# Attempt 6 Run 3 — independent final review, correction attempt 3

## Verdict

**Status: accepted.**

The correction resolves the only blocking finding from this reviewer's prior
final review. During a child search from a stored collapsed state, `Workspace`
is now natively disabled and non-actionable while it is temporarily forced
open. Its `aria-expanded` value, expanded icon, accessible name, rendered child
state, and live status agree. Attempted activation leaves both visible and
stored state unchanged, and clearing the query restores the original collapsed
state.

The earlier favicon, collapsed-child search, and prohibited-copy corrections
remain effective. No regression was found in the frozen fixture, exact visual
assets, SVG rendering, structural states, selection, hover, focus, or
artifact-attributable console result.

This is acceptance of the Run 3 correction gate. It makes the Run eligible for
parent reconciliation and the human review gate; it is not automatic promotion
or human visual approval.

## Review isolation

This re-review used only:

- this reviewer's immutable `attempt-6/reviews/run-3/final-review.md`;
- the Attempt 6 fixed Reference, binding, vNext, and fixture inputs;
- the updated `attempt-6/runs/run-3/final/src/App.tsx` and `src/styles.css`;
- `attempt-6/runs/run-3/final/worker-correction-report-attempt-3.md`; and
- `attempt-6/runs/run-3/final/output/playwright/attempt-3/`.

No peer Run, peer review, or immutable initial implementation was inspected.
No server or browser was started by this reviewer, and no source or evidence
artifact was edited. No OKF-compatible YAML value applies to this experiment;
exact values resolve from the canonical token stylesheet and binding map.

## Prior finding reconciliation

| Prior final-review finding | Attempt 3 result | Evidence | Classification |
| --- | --- | --- | --- |
| Search-forced expanded parent advertised collapse while activation changed only hidden stored state | **corrected** | `disabled={searchRevealsWorkspaceChildren}` prevents activation; `aria-expanded` and the fixed icon use displayed expansion; the accessible name explains the forced-open search state; the live status also uses displayed expansion. Focused captures and DOM results prove activation is a no-op and clearing restores stored collapse. | conforming; prior `non-conformance` closed |
| Favicon correction | preserved | Explicit local data-URL favicon remains in source; stated Playwright console result is Errors `0`, Warnings `0`. | conforming |
| Matching child from collapsed search | preserved | `Section 01` is visible in capture `02`; the focused DOM result reports one child. | conforming |
| Assigned product/demo copy removal | preserved | Independent source scan finds zero assigned prohibited-copy matches. | conforming |

## Focused interaction sequence

All captures below are under
`runs/run-3/final/output/playwright/attempt-3/` and were independently checked
as 1440 × 900 PNGs.

| Step | Expected result | Evidence | Finding |
| --- | --- | --- | --- |
| 1. Stored `Workspace` collapsed | Parent is actionable and collapsed; no children are shown | `01-search-start-collapsed.png` shows the right/collapsed icon, `Overview`, `Workspace`, and `Activity`, with no Section rows. | pass |
| 2. Search `Section 01` | Matching child appears; parent is displayed expanded without overwriting stored collapse | `02-search-child-visible-disabled.png` shows only `Workspace` and indented `Section 01`, with the down/expanded icon. Source sets `aria-expanded=true`, `disabled=true`, and accessible name `Workspace, expanded to show matching search results`. | pass |
| 3. Attempt parent activation | Disabled parent remains non-actionable; displayed and stored state do not change | `03-search-disabled-activation-noop.png` is byte-identical to capture `02` with SHA-256 `88C265396C2404217386DFCAAD19837615D18A6980367171CE2929E06643DC57`. Reported DOM facts remain `disabled=true`, `aria-expanded=true`, `childCount=1`. | pass |
| 4. Clear query | Stored collapsed state is restored predictably | `04-search-cleared-stored-collapsed.png` again shows the right/collapsed icon and no Section rows. Reported DOM facts are `disabled=false`, `aria-expanded=false`, `childCount=0`. | pass |
| 5. True no-match | Frozen recovery message is visible | `05-search-no-match.png` visibly shows `No matching navigation items.` | pass |

The correction preserves stable control meaning. While matching search results
must remain visible, the parent no longer presents an activatable collapse
action that can mutate hidden future state. Native disabled semantics, the
explanatory accessible name, default cursor, and suppressed disabled hover
align pointer and accessibility behavior with that temporary state.

## Frozen-input and static preservation

Independent checks against the final artifact passed:

- visual-binding validation;
- vNext candidate static validation;
- SVG rendering validation with seven themed assets; and
- Attempt 6 product fixture preflight at baseline `2b3ebb0`.

SHA-256 comparison found the final copies of `binding-map.json`,
`visual-tokens.css`, and all seven fixed SVGs identical to their canonical
sources. The final fixture is identical to the frozen fixture with SHA-256
`7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D`.

No `manifest-gap`, `prompt-gap`, `fixture-gap`, `reference-binding-gap`,
`exact-binding-miss`, or SVG-rendering miss was found.

## Visual and console regression review

The complete attempt-3 capture set was visually inspected:

| State | Evidence | Finding |
| --- | --- | --- |
| Light, Drawer open, expanded, `Overview` current | `06-light-open.png`; `09-workspace-expanded.png` | Header, Drawer, Main, hierarchy, full-row selection, physical-start indicator, fixed icons, and three children remain coherent. Pass. |
| Dark, Drawer open, expanded | `07-dark-open.png` | Theme surfaces, selected treatment, indicator, search, disclosure, drawer, and theme icons remain perceptible. Pass. |
| Drawer hidden | `08-drawer-hidden.png` | Drawer and reserved track are absent; Header and Main remain; show-navigation icon is visible. Pass. |
| Parent collapsed | `10-workspace-collapsed.png` | Only the three child rows disappear; top-level rows and parent remain. Pass. |
| `Section 01` selected | `11-selected.png` | Child retains hierarchy alignment, full-row selection, and physical-start indicator; Main reports `Section 01`. Pass. |
| Unselected hover | `12-hover-activity.png` | Activity hover is visibly distinct from normal and from selected state without a selected indicator. Pass for shell-level human judgment; no Foundation promotion is implied. |
| Search focus-visible | `13-focus-visible-search.png` | Search input has a clear, unobscured focus ring. Pass for visible effect. |

Representative pixel samples match canonical values:

| Effect | Light | Dark |
| --- | --- | --- |
| Header / Drawer surface | `#FFFFFF` | `#1B2632` |
| Workspace surface | `#F4F7FA` | `#101820` |
| Selected-row surface | `#E7F1FC` | `#203E5A` |
| Physical-start indicator | `#0B5CAD` | `#74B7F5` |
| Focus ring | `#3B82F6` | not separately exercised in Dark |

The stated Playwright console observation reports Errors `0` and Warnings `0`,
with only the informational React DevTools message. The explicit data-URL
favicon remains present, Vite stderr is empty, and no artifact-attributable
console regression is evidenced.

## Business-screen review

### Copy inventory

| Copy class | Disposition |
| --- | --- |
| Frozen application, navigation, search, Main heading/description, empty message, and item-count facts | fixture-owned; retained |
| `Navigation`, `Current destination`, and derived numbered items | concise identity/state/data; acceptable |
| Assigned implementation-authored product/demo copy | absent; copy gate passes |
| Forced-search parent accessible name | state explanation required for non-actionable operation; concise and accurate; acceptable |

The realism/copy gate has zero assigned prohibited items. No implementation
copy was promoted into the product fixture or fixed contract.

### Action inventory

| Action | Finding |
| --- | --- |
| Drawer toggle | Native, correctly named next action, stable Header-leading position, fixed mapped icon. Pass. |
| Theme toggle | Native, correctly named next theme, stable Header-end position, fixed mapped icon. Pass. |
| Search | Labelled native input; child match, no-match recovery, and clear-query restoration are evidenced. Pass. |
| `Workspace` disclosure outside child search | Native, actionable, coherent stored expansion state. Pass. |
| `Workspace` parent during forced child-search exposure | Natively disabled, non-actionable, accurately expanded, and given an explanatory accessible name. Pass for the assigned correction. |
| Destination selection | Separate full-row buttons with `aria-current`; non-colour indicator retained. Pass. |

### Interaction and accessibility limits

- Native disabled state removes the forced-open parent from activation and
  keyboard focus. The accessibility name and DOM state were verified in the
  supplied evidence, but no screen-reader session was performed.
- The disabled parent intentionally retains clear parent identity rather than
  adopting a new exact visual binding. Default cursor and absence of hover
  feedback communicate nonactionability during pointer exploration. Broader
  cross-application disabled styling remains a human/Foundation question, not
  a Run 3 correction defect.
- Screenshots cannot prove keyboard order, focus restoration, live-region
  announcement timing, or assistive-technology quality.
- The previously recorded loaded-shell no-`h1` risk remains unchanged and
  outside the assigned common-shell correction. It is not represented as
  resolved or as a new blocker.

## Deviation ledger

| Finding | Classification | Disposition |
| --- | --- | --- |
| Hidden stored-state mutation during forced child search | prior `non-conformance`, now corrected | close finding |
| Favicon, matching-child visibility, and copy corrections | conforming and preserved | no further correction |
| Canonical assets, fixture, visual/SVG integration, structure, and exercised interaction states | conforming | no fixed-input change |
| Native disabled presentation during forced search | `allowed-variance` within the reviewer-authorized non-disclosable option | accept for this Run; do not promote to a Foundation |
| No screen-reader session and no Dark focus capture | human/evidence limits | retain explicitly; no implementation correction inferred |

## Gate recommendation

Run 3 correction attempt 3 is **accepted**. The focused sequence closes the
prior disclosure regression, all earlier corrections remain effective, and no
in-scope regression or fixed-input drift was found. Advance the Run to parent
reconciliation and, once the governed evidence set is complete, the human
review gate. Do not automatically promote the generated Run or its disabled
state treatment into canonical guidance.
