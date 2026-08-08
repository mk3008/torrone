---
type: independent initial artifact review
experiment: 016-reference-common-shell-adaptation-stability
attempt: 6
run: 1
artifact_state: initial
review_status: implementation correction required
---

# Attempt 6 Run 1 initial review

## Verdict

**Overall: fail.** Run 1 passes the requested structural, hierarchy, exact-binding,
and SVG rendering categories when the canonical static evidence is combined with
the corrected `1440x900` captures. It is not ready for the human acceptance gate
because five implementation defects remain:

1. the serial observer reported a `/favicon.ico` 404, which violates the task's
   console-error-free requirement and is attributable to the artifact; and
2. the visible `COMMON SHELL` Header overline is unsupplied Contract/demo copy,
   not product-owned application content;
3. the Drawer itself owns vertical overflow, so the supplied search region
   scrolls with navigation instead of remaining above a navigation-list-only
   scrollport;
4. the focus outline uses a negative offset and overlays the control boundary
   instead of forming the required outer halo with a visible gap; and
5. the current navigation row has no type-weight difference from an unselected
   peer.

The implementation methods otherwise remain within the permitted adaptation
freedom. The non-current hover state is reported separately as a human-only
judgment; the visible underline passes that judgment and is not converted into
an exact common-shell binding.

## Scope and evidence boundary

This review inspected only:

- the Attempt 6 freeze records and approved product fixture;
- the approved runnable Reference and relevant auxiliary Manifest guidance;
- the frozen Attempt 3 token stylesheet, binding map, fixed SVGs, adaptation
  instruction, review contract, and validation definition;
- the frozen vNext layered contract, SVG rendering contract, interaction
  candidate, and validation definition;
- `attempt-6/runs/run-1/initial/`;
- `attempt-6/observation/run-1/corrected-1440x900/`.

No other Attempt 6 Run, Attempt 5 output, other review, correction history, or
prior-attempt generated output was inspected. The provisional `1280x720` images
under `observation/run-1/initial/` were explicitly excluded from acceptance
after the orchestrator identified the viewport reset as an observation-tooling
defect. All nine accepted PNGs under `corrected-1440x900/` were independently
read as `1440x900` files.

No OKF-compatible YAML value is applicable to this experiment. The exact visual
authority is the canonical CSS token stylesheet, fixed SVG set, and JSON binding
map rather than a resolved YAML option.

## Verification performed

- `check-visual-bindings.ps1 -TargetRoot <Run 1 initial>`: pass.
- `check-svg-rendering-contract.ps1 -TargetRoot <Run 1 initial>`: pass;
  seven themed assets recognized.
- `check-next-contract-candidate.ps1`: pass.
- Run copies of `visual-tokens.css`, `binding-map.json`, and all seven fixed SVGs:
  SHA-256-identical to their canonical Attempt 3 sources.
- Run `public/product-fixture.json`: SHA-256-identical to the approved Attempt 6
  fixture.
- Corrected browser evidence: nine PNGs, each machine- and reviewer-verified as
  `1440x900`.

Static identity proves the exact sources used, not their rendered effect. The
rendered effects were therefore checked separately in the corrected captures.

## Category results

| Category | Status | Evidence and reasoning | Classification |
| --- | --- | --- | --- |
| Structural invariants | **pass** | `HarnessApp.tsx` keeps Header, conditional Drawer, and Main responsibilities distinct. `harness.css` bounds the shell, removes the Drawer column when hidden, and gives Drawer and Main separate `overflow-y: auto` regions. `01-light-open.png` and `03-drawer-hidden.png` show the Header retained, Drawer removed without a blank track, and workspace using the released area. `04-workspace-expanded.png`, `05-workspace-collapsed.png`, `06-selected.png`, and `08-focus-visible-search.png` show coherent independent state transitions, full-row current treatment, and visible focus. | No `structural-invariant-miss`. |
| Menu hierarchy | **pass** | The byte-identical product fixture supplies top-level `Overview`, parent `Workspace`, children `Section 01`–`Section 03`, then top-level `Activity`. `04-workspace-expanded.png` shows that exact order and child indentation. `05-workspace-collapsed.png` hides only the three children while retaining `Overview`, `Workspace`, and `Activity`; the current destination remains `Overview`. `06-selected.png` shows child selection without changing the hierarchy. | No `fixture-gap` or `non-conformance`. |
| Exact visual bindings | **pass** | Canonical token, map, and asset identity passed static validation. `01-light-open.png` and `02-dark-open.png` show the bound whole-shell Light/Dark surfaces, foregrounds, borders, selected-row treatment, and theme-specific controls. `03-drawer-hidden.png` shows the mapped Header-leading show-Drawer icon. `05-workspace-collapsed.png` shows the mapped collapsed disclosure. `06-selected.png` shows full-row selection and the `0.25rem` physical-start indicator. `08-focus-visible-search.png` shows the bound focus color as an actual visible ring. | No `exact-binding-miss` or `reference-binding-gap`. |
| SVG rendering contract | **pass** | Source uses unchanged canonical SVGs as CSS masks with `background-color: currentColor`, an explicitly permitted implementation family. Across the corrected captures, the Drawer hide/show, theme-to-dark/theme-to-light, disclosure expanded/collapsed, and search assets are all perceptible in their mapped states and locations. The dark capture demonstrates the themed foreground rather than an external-image `currentColor` failure. | Conforming; no SVG rendering miss. |
| Adaptation freedom | **partial** | React components, local state, conditional rendering, CSS organization, typography, spacing, dimensions, and CSS-mask integration are permitted implementation choices and preserve the prior gates. However, `HarnessApp.tsx` adds a visible `Common shell` application-context label that is absent from the product fixture and exposes Contract/demo language to users. Product identity and labels are product-owned, so this addition is not covered by technology or code-structure freedom. | Valid methods are `allowed-implementation-freedom`; the added Header copy is an implementation `non-conformance`. |
| Applicable Manifest and business-screen gate | **fail** | The frozen Drawer guidance keeps search above a navigation-list-only scrollport, but `.navigation-drawer` itself has `overflow-y: auto` and the list has no local overflow owner. The accessible-work-surface guidance requires an outer focus halo with a visible gap, but the shared focus rule uses `outline-offset: -3px`; `08-focus-visible-search.png` visibly shows the ring drawn into the ordinary field boundary. The frozen Drawer guidance also requires a type-weight difference for the current row, while `.navigation-button.is-current` changes only color/surface and the leading indicator. | Three implementation `non-conformance` findings; no Manifest input gap. |
| Console-error-free gate | **fail** | The assigned serial observation reports a `/favicon.ico` 404. Run 1 has neither a favicon file nor an icon declaration in `index.html` or `src/`, so the request is attributable to the artifact rather than to a fixed visual source. | Implementation `non-conformance`. |

### Structural evidence limit

The approved hierarchy-observable fixture is intentionally short, so the
corrected captures do not force Drawer overflow. Source confirms that Drawer
and Main can scroll separately, which passes the narrow Reference structural
relationship, but it also proves that the Drawer search would share the
Drawer's scroll because the navigation list is not its own scroll owner. That
latter issue is recorded against the applicable Manifest rather than hidden by
the short fixture. Screenshots alone still cannot prove retained independent
scroll positions or assistive-technology behavior.

## Corrected browser evidence matrix

| Capture | Browser-observation fact | Result |
| --- | --- | --- |
| `01-light-open.png` | Light shell, visible Drawer, expanded Workspace, selected Overview, mapped fixed icons, and main overflow are visible at `1440x900`. | pass |
| `02-dark-open.png` | Dark colors cover Header, Drawer, Main, controls, selection, and fixed-icon foregrounds; the theme-to-light asset is visible. | pass |
| `03-drawer-hidden.png` | Drawer and reserved track are absent; Header and Main remain; the show-Drawer icon is visible at Header leading. | pass |
| `04-workspace-expanded.png` | Parent and exactly three indented children are visible between top-level Overview and Activity. | pass |
| `05-workspace-collapsed.png` | Only the three children disappear; parent and both non-parent top-level items remain; disclosure direction changes. | pass |
| `06-selected.png` | Section 01 becomes current, Main reports Section 01, and the selected child retains child alignment plus full-row background and leading indicator. | pass |
| `07-hover-overview.png` | Overview remains the selected row and no additional hover treatment is visually distinguishable in the capture. | human-only judgment; not scored as an exact-binding failure |
| `08-focus-visible-search.png` | Search has a perceivable blue focus-visible ring that is not clipped by the field boundary. | pass for visible focus evidence |
| `09-hover-activity.png` | The unselected Activity label gains a clear underline while the selected Overview row retains its distinct full-row surface and leading indicator. | pass by human visual judgment |

### Hover: browser fact versus human judgment

The browser evidence proves only the visible results above. Source inspection
shows that the authored underline applies to
`.navigation-button:hover:not(.is-current)`. `07-hover-overview.png` hovers the
current Overview row and is therefore not discriminating hover evidence.
`09-hover-activity.png` exercises the authored non-current state: Activity gains
a perceivable underline without resembling Overview's selected full-row surface
and leading indicator. Because the vNext Interaction Foundations candidate makes
hover a human decision rather than an exact common-shell binding, this reviewer
records the visible response as acceptable `allowed-variance`. No implementation
correction is requested for hover.

## Business-screen realism and copy gate

### Copy inventory

| Visible copy | Disposition |
| --- | --- |
| `Operations workspace` | Product-supplied application identity; keep. |
| Navigation labels, search placeholder, neutral workspace heading/description, and neutral numbered items | Product fixture or its explicit neutral overflow realization; keep. |
| `Selected destination` and the current destination value | Concise state/record identity; keep. |
| `Common shell` | Prohibited Contract/demo/UI-explanation copy; remove. It is not supplied product identity and is not needed to perform the task. |

### Action inventory

- Drawer visibility uses a native button with a dynamic next-action accessible
  name (`Hide navigation` / `Show navigation`) and mapped fixed icon.
- Theme switching uses a native button with a dynamic next-action accessible
  name and mapped fixed icon.
- Workspace disclosure is separate from Drawer visibility, uses
  `aria-expanded`, and retains destination state.
- Destination selection uses native buttons with `aria-current="page"`.
- Search uses a labelled native search input and visible focus treatment.

No destructive action or ambiguous multi-object action is present. Screenshots
cannot prove keyboard sequence, announcements, or screen-reader output; source
semantics provide only a static accessibility floor.

### Interaction and accessibility risks

- The focus color is perceivable, but `outline-offset: -3px` draws the
  three-pixel outline into the control boundary. This fails the frozen
  accessible-work-surface requirement to retain the ordinary border and draw a
  separate outer halo with a visible gap.
- The selected row has a full-row surface and physical-start indicator, so the
  narrow exact-binding and non-colour-cue requirements pass. It nevertheless
  omits the separate type-weight difference required by the frozen Drawer
  guidance.
- The Drawer gives overflow to the entire aside. With a long supplied menu,
  search would scroll away instead of staying above the navigation list.

## Deviation ledger

| Finding | Classification | Route |
| --- | --- | --- |
| Reported `/favicon.ico` 404 with no artifact favicon declaration or file | `non-conformance`; implementation defect | Narrow Run implementation correction, then console re-observation. No fixed input change. |
| Visible unsupplied `Common shell` Header overline | `non-conformance`; implementation defect and product/copy-boundary violation | Remove the implementation-authored overline, then recapture affected states. No prompt, fixture, Manifest, or Reference change. |
| Drawer-level overflow includes the search region | `non-conformance`; implementation defect | Make only the remaining navigation-list region the Drawer scroll owner while keeping search above it. No input change. |
| Negative focus-outline offset overlays the control boundary | `non-conformance`; implementation/accessibility defect | Restore a separate outer focus halo with a visible gap using the canonical focus color. No exact-binding source change. |
| No selected-row type-weight difference | `non-conformance`; implementation defect | Add the required type-weight distinction without changing the exact selected surface, foreground, indicator, or hierarchy alignment. |
| React structure, state model, CSS organization, CSS-mask SVG integration, and unbound geometry | `allowed-variance` | Record only; no correction. |
| Non-current Activity hover underline | Human-only gate passed; `allowed-variance` | Record only; do not promote the underline into a fixed common-shell binding. |
| Provisional `1280x720` observation set | Corrected observation-tooling defect; excluded evidence | No Run implementation correction. Use only `corrected-1440x900/`. |

No `manifest-gap`, `prompt-gap`, `fixture-gap`, `reference-binding-gap`,
`adaptation-instruction-gap`, `validation-gap`, `exact-binding-miss`, or
`structural-invariant-miss` was found.

## Narrow correction request

Correct only the five implementation defects:

1. make the initial page load console-error-free by serving a valid
   artifact-owned favicon or using an allowed explicit icon declaration that
   prevents the implicit `/favicon.ico` 404; and
2. remove the visible implementation-authored `Common shell` Header overline,
   retaining `Operations workspace` as the supplied application identity;
3. keep the supplied search region above the Drawer navigation scrollport by
   moving vertical overflow ownership from the whole Drawer to the remaining
   navigation-list region;
4. render focus as a separate outer halo with a visible gap while retaining the
   canonical focus-ring color and the control's ordinary border; and
5. add the required current-row type-weight difference without changing the
   exact selected surface, foreground, physical-start indicator, or hierarchy
   alignment.

Do not change the approved fixture, token stylesheet, binding map, fixed SVGs,
Reference, vNext contract, menu hierarchy, state behavior, or unrelated visual
choices. After correction, rerun the static visual/SVG gates and serial browser
observation at `1440x900`, including a clean console check and the affected
Header states.

## Gate recommendation

Return Run 1 for the narrow implementation correction above. Do not request
human acceptance yet. After the corrected artifact passes static validation,
console re-observation, and refreshed `1440x900` evidence, this independent
review can be updated. The hover human-only judgment is already recorded as
pass and does not require correction.
