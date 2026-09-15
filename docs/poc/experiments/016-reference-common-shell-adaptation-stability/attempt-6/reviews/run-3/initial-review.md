# Attempt 6 Run 3 — independent initial review

## Verdict

**Status: correction required.**

Run 3 preserves the frozen shell structure, the approved menu roles and order,
the canonical visual-binding files, and the permitted themed-SVG rendering
family. The corrected 1440 × 900 captures show the required Light and Dark
surfaces, fixed icon placements, selected-row treatment, physical-start
indicator, focus ring, and a distinguishable unselected hover state.

The Run is not ready for the human review gate because it has three
implementation-owned non-conformances:

1. the artifact causes the observed `/favicon.ico` 404 and therefore does not
   meet the console-error-free requirement;
2. a child search result is suppressed when `Workspace` is stored as collapsed;
   and
3. visible implementation-authored product/demo copy exceeds the frozen
   product ownership boundary and fails the business-screen copy gate.

No frozen input change is requested. The remaining browser limits are recorded
separately from implementation defects.

## Isolation and evidence basis

This review used only:

- the Attempt 6 freeze records;
- the approved Reference at baseline `9cd1932`;
- the permitted visual tokens, binding map, and SVGs at baseline `1d805e8`;
- the vNext contract and validation at baseline `a3ef3fa`;
- the approved product fixture at baseline `2b3ebb0`;
- `attempt-6/runs/run-3/initial/`; and
- `attempt-6/observation/run-3/corrected-1440x900/`.

No peer Run, prior-attempt output, other review, or correction history was
inspected. The provisional 1280 × 720 observation directory and the Run's
provisional captures do not determine any browser-visual finding below. Every
browser-visual finding uses the corrected 1440 × 900 directory. The isolated
single-Run assignment does not permit a three-Run comparison-validity finding.

No OKF-compatible YAML value applies to this experiment. Exact visual values
resolve from the canonical `visual-tokens.css` and `binding-map.json` sources.

## Category results

| Category | Result | Evidence and classification |
| --- | --- | --- |
| Structural invariants | **partial** | Header, Drawer, and Main are distinct; hidden Drawer removes its track; Header controls retain position; source provides independent Drawer/workspace overflow and independent disclosure/current state. Separate scroll positions and child-current collapse/re-expand were not exercised in corrected browser evidence. Core observations pass; the unexercised interactions are an `observation-gap`, not an implementation failure. |
| Menu hierarchy | **partial** | The approved order and roles are visibly correct, and collapse hides only `Section 01`–`03`. However, source inspection shows that a matching child remains hidden when search is active while `Workspace` is collapsed. This is a `non-conformance` attributable to implementation. |
| Exact visual bindings | **pass** | Canonical assets are unchanged, static validation passes, corrected captures show mapped icons in their named locations and token-resolved Light/Dark/selection/focus effects. Classification: conforming for the exercised vNext state set; no `exact-binding-miss` found. This is not a full-page pixel-equivalence claim. |
| SVG rendering contract | **pass** | All seven canonical SVGs are unchanged and used as CSS masks with `currentColor`; the vNext SVG checker passes and corrected captures show perceptible fixed icons in both shell themes and mapped states. Classification: conforming; no direct-image, filter, Unicode, or replacement-asset misuse found. |
| Adaptation freedom | **fail** | React components, state hooks, CSS organization, geometry, typography, card composition, and CSS-mask integration are allowed implementation freedom. Invented visible product/demo copy is not implementation freedom because product identity, labels, and fixture content remain product-owned. Classification: `non-conformance`. |
| Business-screen realism and copy | **fail** | Visible fixture/process language and invented product nouns remain. The required zero-prohibited-copy gate is not met. Classification: implementation-owned `non-conformance`. |
| Console-error-free operation | **fail** | The Run's serialized browser record reports `GET /favicon.ico` as 404, and `index.html` has no favicon declaration. The error is attributable to the artifact. Classification: implementation-owned `non-conformance`. |

## Corrected 1440 × 900 state matrix

All paths in this table are under
`attempt-6/observation/run-3/corrected-1440x900/`.

| Screen/state | Applicable requirement | Expected visible effect | Evidence and finding | Classification / limit |
| --- | --- | --- | --- | --- |
| Light, Drawer open, `Workspace` expanded, `Overview` current | Structure, hierarchy, Light bindings | Header/Drawer/Main; top-level-parent-child ordering; Light surfaces; selected full row | `01-light-open.png`: all roles are visible in approved order; Header-leading drawer-hide icon, Header-end theme-to-dark icon, search-leading icon, trailing expanded disclosure, selected surface, and physical-start indicator are visible. | pass |
| Dark, Drawer open, `Workspace` expanded, `Overview` current | Dark bindings and themed SVG perceptibility | Whole shell changes theme without losing icon geometry or state | `02-dark-open.png`: Dark Header/Drawer/workspace and all visible fixed icons remain perceptible; selected surface and indicator change to their Dark values. | pass |
| Light, Drawer hidden | Drawer visibility invariant | Drawer and reserved track disappear; Header and Main remain; next action becomes show | `03-drawer-hidden.png`: Drawer is absent and workspace occupies the body; Header-leading drawer-show and theme-to-dark icons remain visible. Source names the action `Show navigation`. | pass |
| Light, expanded parent | Parent disclosure and hierarchy | Down/expanded disclosure; exactly three children | `04-workspace-expanded.png` is byte-identical to `01-light-open.png`, which is expected for the same state. Three indented child rows are visible. | pass |
| Light, collapsed parent | Parent disclosure and hierarchy | Right/collapsed disclosure; only the three children disappear | `05-workspace-collapsed.png`: `Overview`, `Workspace`, and `Activity` remain; `Section 01`–`03` disappear; collapsed icon is trailing. | pass |
| Light, `Section 01` selected | Selection binding and hierarchy alignment | Full-row selected child, physical-start indicator, retained child indentation | `06-selected.png`: `Section 01` has the selected surface and start indicator while retaining child alignment; Main reports `Section 01`. | pass |
| Hover attempt on selected `Overview` | Hover observation | A selected row is not a discriminating hover target | `07-hover-overview.png` is byte-identical to `01-light-open.png`; source intentionally excludes `.is-selected` from the hover rule. | `observation-gap`; not used for hover acceptance |
| Keyboard focus on search | Focus binding | Perceivable, unobscured focus-visible ring | `08-focus-visible-search.png`: the input has a clearly visible blue outline outside its normal border. A sampled ring pixel is `#3B82F6`, the Light focus token. | pass for visible effect; screenshot cannot prove keyboard order or assistive technology behavior |
| Hover on unselected `Activity` | Interaction Foundations candidate | Hover differs from normal and selected without impersonating selection | `09-hover-activity.png`: the row surface changes from sampled `#FFFFFF` to `#F3F8FE`; it has no selected start indicator. | Browser fact: visible difference exists. Human-only judgment: the response is subtle but distinguishable from the stronger selected surface and indicator, so it is acceptable for this shell. This does not promote a canonical hover token. |

## Exact visual and SVG evidence

Independent static checks produced:

- `Visual binding validation passed.`
- `Reference contract vNext candidate static check passed.`
- `SVG rendering contract static check passed ... themed-assets=7.`

SHA-256 comparison found the Run copies of `binding-map.json`,
`visual-tokens.css`, and every one of the seven SVG files byte-identical to the
canonical binding directory. The copied product fixture is also byte-identical
to the approved fixture (`7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D`).

Corrected-capture pixel samples demonstrate the visible cascade, rather than
using static presence as acceptance by itself:

| Effect | Light sample | Dark sample | Canonical values |
| --- | --- | --- | --- |
| Header / Drawer surface | `#FFFFFF` | `#1B2632` | exact match |
| Workspace surface | `#F4F7FA` | `#101820` | exact match |
| Selected-row surface | `#E7F1FC` | `#203E5A` | exact match |
| Physical-start indicator | `#0B5CAD` | `#74B7F5` | exact match |
| Focus ring | `#3B82F6` in Light | not separately captured in Dark | exact match for exercised focus state |

`src/styles.css` uses the vNext-permitted CSS-mask family: the unchanged SVG is
the mask geometry, `background-color: currentColor` supplies the themed
foreground, and the fixed 1.25 rem / 1 rem sizes match the binding map. The
corrected captures visibly confirm the drawer, theme, disclosure, and search
assets in their mapped locations. This combined source, identity, and rendered
evidence supports the pass; the static checker alone would not.

## Structural and hierarchy evidence

- `src/App.tsx` renders one `header`, an `aside` plus labelled `nav` only while
  the Drawer is open, and one `main`.
- `src/styles.css` gives both `.navigation-drawer` and `.workspace` their own
  `overflow-y: auto`, while `.shell-body--drawer-hidden` removes the Drawer
  column.
- Drawer and theme controls use native buttons and next-action accessible names.
- Parent disclosure is a separate native button with `aria-expanded` and
  `aria-controls`.
- Destination selection uses separate buttons and `aria-current="page"`; the
  selected start indicator makes state non-colour-only.
- Disclosure changes only `workspaceExpanded`; current destination state is
  independent in source. Corrected evidence does not exercise collapse while a
  child is current, so that behavioral transition remains an observation limit.
- The product fixture copy is unchanged. Corrected expanded, collapsed, and
  selected images show `Overview` top-level, `Workspace` as parent, exactly
  three children, and `Activity` top-level in approved order.

### Hierarchy-aware search defect

The source calculates matching children in `visibleWorkspaceChildren`, but
renders that array only when `workspaceExpanded` is true. At the same time,
`hasMatches` becomes true for a matching hidden child, so the empty state is
also suppressed. Therefore, with `Workspace` collapsed, searching for
`Section 01` shows the parent but not the matching destination and not the
no-match recovery. The approved Reference shows matching children while a
query is active, and the product fixture retains search facts. This is an
implementation non-conformance, not a fixture or prompt gap.

## Business-screen review

### Copy inventory

| Copy | Disposition |
| --- | --- |
| `Operations workspace`, navigation destination labels, search label and placeholder, `Neutral workspace content`, its description, no-match message, and item count | Frozen fixture-owned content or directly derived fixture data; not an implementation finding. |
| `Navigation`, `Current destination`, and `24 items` | Concise interface identity/state/data; acceptable. |
| `Shared operations` | Invented brand/product identity not supplied by the fixture; remove. |
| `Workspace map` | Invented workspace/navigation identity not supplied by the fixture; remove rather than promote to product fact. |
| `Fixture ready` | Prohibited fixture/experiment-status copy; remove. |
| `Operational sequence` | Invented business section noun not supplied by the fixture; remove. |
| Repeated `Neutral fixture item` and the assistive label `Numbered fixture items` | Prohibited fixture/demo copy; remove. The numbered neutral cards can remain without invented item semantics. |

Because prohibited items remain, the realism/copy gate fails even though one
fixture-owned description itself intentionally explains the overflow fixture.
That frozen sentence is outside this implementation correction request.

### Action inventory

| Action | Finding |
| --- | --- |
| Drawer visibility toggle | Native button, stable Header-leading geometry, correct fixed icon, and concise next-action accessible name. Pass. |
| Theme toggle | Native button, stable Header-end geometry, correct fixed icon, and concise next-theme accessible name. Pass. |
| Search | Labelled native search input with immediate filtering and an empty-state path. Focus treatment passes visually; the collapsed-child result defect requires correction. |
| `Workspace` disclosure | Separate from selection, trailing state icon, `aria-expanded`, and stable parent-row position. Pass for shown states. |
| Destination selection | Separate full-row buttons with `aria-current`; selected state is not colour-only. Pass. |

There is no destructive action in scope.

### Interaction and accessibility limits

- Corrected focus evidence proves a visible search-input ring, but screenshots
  cannot prove keyboard traversal, focus restoration, screen-reader
  announcements, or other assistive-technology behavior.
- Source uses native controls and labelled landmarks, which is positive focused
  implementation evidence.
- Drawer hide, parent collapse, theme switching, and selection retain stable
  trigger geometry in the inspected states.
- The document-heading structure is atypical: the Drawer title is `h1` while
  the Main heading is `h2`, leaving the Drawer-hidden state without an `h1`.
  This is recorded as an accessibility risk outside the frozen common-shell
  acceptance contract, not as an asserted contract failure.
- Independent Drawer/workspace scroll positions were not demonstrated by the
  corrected captures because the approved short Drawer fixture does not
  overflow at 1440 × 900. Source supports independent overflow; actual
  two-scrollport operation remains unexercised.

## Deviation ledger

| Finding | Classification | Route |
| --- | --- | --- |
| Frozen fixture and canonical binding copies are unchanged | conforming | no action |
| React component boundaries, hooks, CSS organization, geometry, typography, cards, and CSS-mask implementation | `allowed-variance` / `allowed-implementation-freedom` | no input or implementation change required |
| Matching child hidden during search while parent is collapsed | `non-conformance` (implementation defect) | correct Run implementation only; do not change fixture, prompt, Reference, or Manifest |
| Invented product/demo copy | `non-conformance` (implementation defect) | remove implementation-authored copy; do not add it to frozen product input |
| `/favicon.ico` 404 | `non-conformance` (implementation defect) | prevent the artifact-owned request failure and re-observe a clean console |
| Selected-row hover capture is non-discriminating | `observation-gap` | superseded for visible hover assessment by `09-hover-activity.png`; retain the human-only nature of semantic hover judgment |
| Child-current collapse/re-expand and independent scroll positions are not browser-exercised | `observation-gap` | collect focused unchanged-artifact evidence if the gate requires browser proof; no implementation correction is justified from the current evidence |

No `manifest-gap`, `prompt-gap`, `fixture-gap`, `reference-binding-gap`,
`adaptation-instruction-gap`, `exact-binding-miss`, or observed SVG-rendering
miss was found.

## Narrow correction request

Correct only the three attributable implementation defects:

1. Add an explicit non-requesting favicon declaration (for example the
   Reference's data-URL favicon) or a valid local favicon so the artifact no
   longer produces `/favicon.ico` 404. Re-observe the serial console and require
   zero artifact-attributable errors or warnings.
2. While a non-empty search query matches a child, render the matching child
   even when the stored parent state is collapsed, or temporarily expose the
   matching group without overwriting the stored disclosure state. Verify
   `Section 01` from collapsed state and the true no-match recovery.
3. Remove `Shared operations`, `Workspace map`, `Fixture ready`, `Operational
   sequence`, repeated `Neutral fixture item`, and the assistive-only
   `Numbered fixture items` label. Retain only frozen fixture facts, directly
   derived data, and necessary generic interface labels.

Do not change the approved Reference, Manifest, binding assets, vNext contract,
product fixture, or frozen prompt. After correction, rerun the existing static
binding/SVG checks and repeat serial 1440 × 900 observation for the affected
states and copy/console/search gates.

## Gate recommendation

Do not advance Run 3 to human acceptance yet. Request the narrow implementation
correction above, refresh the affected serial evidence, and retain the stated
scroll, child-current transition, keyboard, and assistive-technology limits.
Passing mechanical or corrected browser evidence would make the Run eligible
for human review; it would not automatically promote or approve it.
