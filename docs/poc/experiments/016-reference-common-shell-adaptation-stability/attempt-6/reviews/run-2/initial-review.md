---
type: independent initial artifact review
title: Attempt 6 Run 2 initial review
status: implementation correction required
run: run-2
phase: initial
browser_evidence: corrected 1440x900 serial captures
---

# Attempt 6 Run 2 — independent initial review

## Verdict

**Fail — narrow implementation correction is required before the human review
gate.** The implementation preserves the frozen fixture and exact visual assets,
and the corrected browser captures show the intended shell family and the mapped
Light/Dark treatment. It nevertheless contradicts applicable frozen guidance in
Drawer scroll ownership, search behavior with a collapsed parent, selected-row
weight, focus treatment, icon-only tooltips, and the console-error-free
requirement.

The exact visual-binding and SVG-rendering categories are **partial**, not
accepted: the static checks pass and the rendered evidence is positive for the
captured states, but the required Dark + Drawer-hidden combination is not in the
serial evidence. No exact-binding substitution is visible in the states that
were captured.

This review used only Run 2, the approved/frozen owner inputs, and Run 2 serial
evidence. It did not inspect a peer Run, Attempt 5 output, another reviewer, or
correction history. The provisional 1280x720 images under `observation/run-2/initial/`
were excluded after the orchestrator identified the observation-tooling error.
Only the nine machine-verified 1440x900 files under
[`corrected-1440x900/`](../../observation/run-2/corrected-1440x900/) determine
browser findings below.

## Category results

| Category | Result | Evidence-backed finding | Classification |
| --- | --- | --- | --- |
| Structural invariants | **fail** | The Header, Drawer, Main, hidden-Drawer track removal, and separate Drawer/workspace containers are present. However, the complete `.navigation-drawer` is the scroll owner, so the search region scrolls with a long menu instead of remaining above the one navigation scrollport. | `non-conformance` (`structural-invariant-miss`) |
| Menu hierarchy | **fail** | The supplied top-level/parent/child order and ordinary expanded/collapsed states render correctly. A child search match remains hidden when `Workspace` is collapsed because the child list is controlled only by `workspaceExpanded`; the complete supplied hierarchy is therefore not searchable in that state. | `non-conformance` (`structural-invariant-miss`) |
| Exact visual bindings | **partial** | Canonical copies, state/icon references, selected surface/foreground/physical-start indicator, token colors, and captured Light/Dark rendering conform. Dark + Drawer hidden is not observed, so the full required exact visual state set is not proven. | `observation-gap`; no captured `exact-binding-miss` |
| SVG rendering contract | **partial** | All seven SVGs are byte-identical, the implementation uses the permitted CSS-mask family with `background-color: currentColor`, and the static SVG check passes. Dark rendering is visible for the Drawer-hide, theme-to-light, disclosure-expanded, and search assets; Dark Drawer-show and disclosure-collapsed are not captured. | `observation-gap`; no captured SVG substitution |
| Adaptation freedom | **pass** | React component/state organization, TSX DOM, plain-CSS structure, geometry, workspace cards, and the token-derived hover treatment are independently implemented. CSS masks are explicitly permitted. No UI/icon library or Reference HTML/CSS copy is used. | `allowed-implementation-freedom` |

## Frozen-input and static evidence

- The Run fixture is byte-identical to the approved
  [product fixture](../../../product-fixture-vnext-candidate/fixture.json)
  (SHA-256 `7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D`).
- `visual-tokens.css`, `binding-map.json`, and all seven Run SVGs are byte-identical
  to the approved Attempt 3 sources. The Run evidence map is also unchanged.
- The Attempt 3 visual-binding check passed: `Visual binding validation passed.`
- The vNext candidate check passed: `Reference contract vNext candidate static
  check passed.`
- The SVG rendering check passed with `themed-assets=7`.
- Static success proves source identity and integration only. It is not used as
  a substitute for the corrected 1440x900 captures.

The applicable resolved palette values are the frozen OKF-compatible
`theme_colors` roles and the exact subset in the Run token stylesheet:

| Role ID | Light | Dark | Expected visible effect |
| --- | --- | --- | --- |
| `page_background` | `#F4F7FA` | `#101820` | Main workspace background |
| `surface_background` | `#FFFFFF` | `#1B2632` | Header, Drawer, controls, and fixture cards |
| `text_primary` | `#172033` | `#F4F7FA` | Region text and currentColor control glyphs |
| `text_muted` | `#52657A` | `#BAC6D2` | Search adornment, placeholder, and secondary copy |
| `border_subtle` | `#C7D2DF` | `#516273` | Region and card boundaries |
| `border_interactive` | `#75889C` | `#91A3B5` | Search and Header-control boundaries |
| `selection_background` | `#E7F1FC` | `#203E5A` | Full selected Drawer row |
| `selection_foreground` | `#172033` | `#F4F7FA` | Selected-row label |
| `selection_indicator` | `#0B5CAD` | `#74B7F5` | Physical-left selected-row indicator |
| `focus_ring` | `#3B82F6` | `#FFD54A` | Keyboard focus color; geometry is governed separately by the accessible-work-surface guidance |

## Corrected 1440x900 state matrix

| Screen/state | Applicable requirement | Browser observation | Result / limit |
| --- | --- | --- | --- |
| [01 Light, Drawer open](../../observation/run-2/corrected-1440x900/01-light-open.png) | Light role values; Drawer-hide at Header leading; moon at Header logical end; expanded disclosure trailing; search icon leading; selected full row | Distinct Header/Drawer/workspace surfaces are visible. All named icons are perceptible and correctly placed. `Overview` has the selected surface and physical-left indicator. | Captured exact subset passes. Selected type-weight defect is recorded separately. |
| [02 Dark, Drawer open](../../observation/run-2/corrected-1440x900/02-dark-open.png) | Dark role values; themed currentColor output; sun for next Light action | The complete shell switches coherently to Dark. Fixed icons and selected-row indicator remain perceptible. | Captured exact subset and observed SVGs pass. |
| [03 Drawer hidden](../../observation/run-2/corrected-1440x900/03-drawer-hidden.png) | Drawer region, boundary, and reserved track disappear; Header and Main remain | Main uses the former Drawer width, while the leading Header control changes to Drawer-show. | Structural state passes in Light. Dark hidden is unobserved. |
| [04 Workspace expanded](../../observation/run-2/corrected-1440x900/04-workspace-expanded.png) | Top-level `Overview`; parent `Workspace`; children `Section 01`–`03`; top-level `Activity` | Required roles and order are visible together. Downward disclosure is at the parent-row trailing edge. | Ordinary expanded hierarchy passes. |
| [05 Workspace collapsed](../../observation/run-2/corrected-1440x900/05-workspace-collapsed.png) | Collapse hides only the three children and preserves other roles/current destination | `Overview`, `Workspace`, and `Activity` remain; only children disappear; disclosure changes rightward; `Overview` remains current. | Ordinary collapsed hierarchy passes. Search-while-collapsed defect is source-proven separately. |
| [06 Section 01 selected](../../observation/run-2/corrected-1440x900/06-selected.png) | Full-row selection, selection foreground, physical-left `0.25rem` indicator, unchanged child indentation | The selected child keeps the same label start as its siblings; full-row fill and left indicator are visible; current destination is retained as `Section 01`. | Exact mapped subset passes. Required selected-row type-weight difference is absent. |
| [07 Hover over Overview](../../observation/run-2/corrected-1440x900/07-hover-overview.png) | Hover should be a semantic response distinct from selection where both are present; final acceptance is a human gate | Browser-observation fact: the capture shows the already-selected `Overview` row and is visually identical to its ordinary selected state. Source intentionally excludes selected rows from the hover rule. | Non-discriminating by itself; the human hover judgment is completed from `09-hover-activity.png`. |
| [08 Search `focus-visible`](../../observation/run-2/corrected-1440x900/08-focus-visible-search.png) | Resolved focus color plus a separate outer halo, visible gap, and retained ordinary border | The blue focus color is visible, but it is inset over the control boundary rather than separated outside it. Source confirms `outline-offset: -0.1875rem`. | **Fail:** `non-conformance`. Screenshot does not prove keyboard traversal or assistive-technology behavior. |
| [09 Hover over Activity](../../observation/run-2/corrected-1440x900/09-hover-activity.png) | Non-selected hover response remains a human visual gate, not an exact common-shell binding | Browser-observation fact: unselected `Activity` receives a pale full-row hover surface while `Overview` retains its stronger selected surface and physical-left indicator; row geometry does not move. Human judgment: the hover is subtle but perceptible and distinguishable from both the ordinary row and selected state at 1440x900. | **Pass as allowed implementation freedom.** This does not promote the token-derived mix into generic Manifest guidance. |

## Material deviations

### D1 — Drawer scroll ownership is wrong

**Classification:** `non-conformance` (`structural-invariant-miss`),
implementation defect.

[`src/harness.css`](../../runs/run-2/initial/src/harness.css) assigns
`overflow-y: auto` to the entire `.navigation-drawer`. It does not give the
search region and navigation list separate grid rows, and neither `nav` nor
`.navigation-list` owns the finite remaining scroll area. With a long supplied
menu, the search field scrolls away. This contradicts the approved Drawer and
layout-panes guidance that keeps search above the Drawer’s one navigation-list
scrollport. The compact Attempt 6 fixture does not overflow the Drawer, so this
defect is source-proven and not visually exercised by the captures.

### D2 — Searching a collapsed parent can hide a matching child

**Classification:** `non-conformance` (`structural-invariant-miss`),
implementation defect.

[`src/HarnessApp.tsx`](../../runs/run-2/initial/src/HarnessApp.tsx) computes
`childMatches` and `visibleChildren`, but the child `<ul>` is always
`hidden={!workspaceExpanded}`. If `Workspace` is collapsed and the search
matches `Section 01`, the parent remains visible while the matching child stays
hidden. This contradicts the requirement to filter the complete supplied
hierarchy while retaining the matching child’s parent context. The stored
expanded/collapsed value should remain unchanged by search.

### D3 — Selected rows lack the required type-weight difference

**Classification:** `non-conformance`, implementation defect outside the
narrow exact binding map.

The approved Drawer guidance requires selection background, a type-weight
difference, and the leading indicator. The `.navigation-row.selected` rule
applies the exact foreground and background but no weight. The corrected
selected capture shows `Section 01` at the same weight as its siblings. The
surface, foreground, indicator, and indentation portions of the exact binding
still conform.

### D4 — Focus treatment is inset instead of a separate outer halo

**Classification:** `non-conformance`, implementation defect.

The shared focus rule uses the correct `--reference-focus-ring` color but a
negative outline offset. The approved accessible-work-surface guidance requires
the ordinary border to remain, with a visible gap before a separate outer halo.
The corrected focus capture visibly confirms the overlap/inset result.

### D5 — Icon-only Header controls have no matching tooltip

**Classification:** `non-conformance`, implementation defect.

The Drawer and theme buttons have dynamic `aria-label` values, but source
inspection finds no `title` or equivalent matching tooltip. Approved Header and
iconography guidance requires both the accessible next-action name and a
matching tooltip. The buttons’ visible glyphs and accessible names otherwise
match the supplied state.

### D6 — The observed `/favicon.ico` 404 violates the console-error-free requirement

**Classification:** `non-conformance`, implementation defect.

The serial browser observation reported a `/favicon.ico` 404. The Run
[`index.html`](../../runs/run-2/initial/index.html) declares no favicon, so the
browser’s default request and resulting error are attributable to the artifact.
The task’s console-error-free requirement applies; this is not an
observation-tool defect. The approved Reference avoids the request with a local
favicon declaration.

### D7 — Dark hidden-state and complete Dark SVG evidence are absent

**Classification:** `observation-gap`, not an implementation defect.

The corrected set includes Dark + Drawer open and Light + Drawer hidden, but no
Dark + Drawer hidden capture. Consequently Drawer-show and
disclosure-collapsed are not directly observed in Dark. Static shared-mask
evidence is positive but cannot alone establish rendered exact visual
acceptance.

### D8 — Hover evidence and human-only judgment

**Classification:** `allowed-implementation-freedom`; no correction requested.

The original hover capture targets the currently selected `Overview` row, while
the CSS deliberately applies hover paint only to `:not(.selected)`; that image
is correctly treated as non-discriminating. The added `09-hover-activity.png`
exercises an unselected row. As a browser fact, `Activity` receives a pale
full-row surface without the selected indicator while `Overview` remains
selected. As the required human-only judgment, that response is perceptible,
distinct from selection, and acceptable for this Run. The judgment does not
turn the local `color-mix()` into a canonical hover token or resolve the future
Interaction Foundations decision.

## Business-screen and accessibility review

- **Copy gate:** no prohibited implementation-authored demo, Contract, process,
  or UI-explanation copy was found. `Current destination` is state identity.
  The explicitly demonstrative workspace description is frozen fixture-owned
  content and is not promoted into generic Manifest guidance.
- **Action inventory:** Drawer show/hide, theme switch, Workspace disclosure,
  destination selection, and navigation search are concise and placed next to
  their affected region. The icon-only global actions fail only the matching
  tooltip requirement recorded in D5.
- **Selection geometry:** the selected child keeps its nested label position,
  and the leading indicator remains at the Drawer’s physical edge. No capture
  shows the triggering control moving after selection or disclosure.
- **Accessibility limits:** source shows native buttons/input, discernible
  names, `aria-current`, `aria-expanded`, and semantic Header/aside/nav/main
  structure. The screenshot can show focus paint but cannot prove keyboard
  traversal, focus order, announcements, accessibility-tree output, zoom, or
  assistive-technology behavior.
- **Contract boundary:** all defects are consumer implementation
  non-conformance. No product fact, fixture, exact binding, vNext prose, or
  generic Manifest change is requested.

## Narrow implementation correction request

Change only the Run implementation; do not change frozen inputs or canonical
assets.

1. Make the Drawer a finite two-row region: keep the search row fixed and make
   only the remaining navigation region the vertical scroll owner. Preserve the
   independent workspace scroll owner.
2. While a non-empty search matches a child, expose that matching child with
   its parent context even when the stored parent state is collapsed. Do not
   mutate the stored expansion state; clearing search must restore it.
3. Add a discernible selected-row type-weight difference without changing row
   coverage, physical-left indicator, or hierarchy indentation.
4. Retain each control’s ordinary border and draw the resolved focus ring as an
   outer halo with a visible gap; do not overlap the border.
5. Add matching dynamic tooltips to the Drawer and theme icon-only controls.
6. Declare a local/data favicon (or provide the equivalent local asset) so the
   artifact no longer emits the observed `/favicon.ico` 404.

After those implementation corrections, rerun the existing static checks and
serial browser observation. Evidence-only follow-up should include Dark +
Drawer hidden; that request does not authorize an input change.

## Gate recommendation and limits

Do not advance Run 2 to the human review gate yet. The implementation defects
above need one bounded correction and fresh serial evidence. The allowed packet
does not identify or prove a shared model/reasoning-effort condition across peer
Runs, and peer inspection is expressly outside this review; no cross-Run
reproducibility claim is made here.
