# Attempt 24 common-shell artifact review

## Scope and verdict

**Verdict: not ready for human review.** This is a `greenfield-manifest`
comparison with no fixture. The capture set is intact, but the frozen consumer
inputs did not make the selected configuration (`no override`) observable to a
Run: all three outputs applied values from the linked example override. In
addition, Run 1 has shell-scroll and dark-page defects, and Run 3 throws at
startup and does not render its navigation.

No frozen Run, capture, Manifest, prompt, or contract was changed by this
review. The prescribed recovery is a new frozen input set followed by **three
fresh independent Runs**; an individual-output repair is not permitted.

## Reviewed boundary and evidence integrity

| Item | Finding | Evidence |
| --- | --- | --- |
| Frozen input | Three-run `gpt-5.6-terra` / medium contract; only the frozen Manifest snapshot, linked example support file, and fixed Japanese prompt are consumer inputs. No fixture is used. | `generation-input-manifest.yaml`; `frozen-input/generation-contract.yaml` |
| Capture inventory | Complete: 60 records / 60 PNGs, ten required states for each Run and viewport. Reviewer recomputed SHA-256 and dimensions: 0 mismatches. | `evidence-captures/evidence-manifest.json` |
| Viewports | 30 captures at `1440x1200` and 30 at `720x1200`. | Same manifest |
| Frozen source identity | `source-digests-before.json` and `source-digests-after.json` are byte-identical (nine generated source files). | `evidence-captures/source-digests-*.json` |
| Run independence | The freeze contract and each generation report declare isolated outputs and no excluded-material access. This is process evidence, not a proof of the model's unseen context. | `generation-input-manifest.yaml`; `tmp/orchestration/common-shell-workflow-validation-v1/reports/common-shell-run-*.yaml` |

For every matrix row, the required evidence exists at
`evidence-captures/run-{1,2,3}/{desktop,narrow}/<state>.png`; `desktop` is
1440x1200 and `narrow` is 720x1200. This compact path notation expands to the
six PNGs for that state and is intentionally used instead of cherry-picking a
preferred Run.

## Resolved configuration versus visible effect

The selected theme override is explicitly `none` in the frozen generation
contract. Therefore the required resolved values include Light
`selection_background: #E7F1FC`, `selection_indicator: #0B5CAD`, and Dark
`selection_background: #203E5A`, `selection_indicator: #74B7F5` (with the
other semantic roles from `theme-colors.default.yaml`). The linked
`theme-colors.example.yaml` is documentation-link support only.

| Run | Static resolved values actually declared | Visible effect in Light/Dark captures | Finding |
| --- | --- | --- | --- |
| 1 | Declares example-override selection values `#F3EAFB/#6B3FA0` and `#3A254D/#D5B4FF`, not the canonical selected-none values. | Selected row is purple. Dark cards and Drawer are dark, but the workspace page background remains Light `#F4F7FA`. | Non-conforming output; the common input-selection omission is F-01 and the Light workspace in Dark mode is F-02. |
| 2 | Declares the same example-override values under local aliases `--selection` / `--indicator`, rather than canonical semantic variables. | Purple selection and dark page/surface effects render consistently. | Non-conforming output; common F-01 plus F-04. |
| 3 | Declares the same example-override values (and action/link values) rather than selected-none canonical values. | Base Light/Dark colors change before startup fails; Header action glyph and Drawer navigation are blank. | Non-conforming output; common F-01 plus F-05. |

## Per-run and per-viewport matrix

| Requirement | Applicable frozen guidance / expected effect | Run 1 | Run 2 | Run 3 | Evidence and limit |
| --- | --- | --- | --- | --- | --- |
| Header identity and global controls | `components/header.md`: full-width shell Header, workspace identity, leading Drawer control, logical-end theme control. | **Pass, visual**; identity and both icon controls render. | **Pass, visual**; identity and both controls render. | **Fail**; identity renders but startup exception prevents assigning either icon and action name. | `initial-menu-light-palette`, `initial-menu-dark-palette` at both viewports; Run 3 console logs. |
| Header remains during workspace scroll | Header outside the workspace scroll owner and available at viewport top. | **Partial/fail**: capture shows sticky Header, but static CSS gives document/body—not `main.workspace`—the vertical scroll owner. | **Pass**: `.workspace { overflow-y:auto }` within fixed below-header shell; capture retains Header. | **Fail**: intended separate `main` scroll is static, but runtime error prevents supplied Header controls and navigation. | `workspace-scroll-header-persistent-light` at both viewports; source CSS/HTML. Screenshot cannot prove keyboard operation. |
| Drawer / separate navigation scroll | Search region remains above independently scrolling list; workspace scroll does not move it. | **Pass for list scroll; fail for whole-shell separation**: list is locally scrollable, but workspace scroll is document scroll (F-03). | **Pass**: Drawer and workspace have separately constrained scroll regions. | **Fail**: no navigation is rendered after startup error. At narrow width the overlay also lacks workspace-scroll prevention (F-06). | `drawer-scroll-light`, `workspace-scroll-header-persistent-light`; source CSS. |
| Navigation search | Labelled local field filters fixed fixture, retains parent context, and exposes explicit no-match. | **Pass**: match and no-match visible; input has accessible label, although the label text is visually hidden. | **Pass**: visible label, match and no-match. | **Fail**: no list or no-match state renders; attempted interaction targets do not exist. | `search-match-light`, `search-no-match-dark`; Run 3 console log. |
| Current selection | One current destination; square full-row selection, physical-left indicator, weight change, semantic current state; activation transfers without a route. | **Pass**: capture shows transferred selection on Item 30; static code updates `aria-current`. | **Pass**: same transfer and `aria-current`. | **Fail**: navigation never renders. | `selection-transfer-light`; static JavaScript. |
| Parent disclosure | Expanded parent has chevron; collapse changes only disclosure and preserves current destination for later restoration. | **Partial**: collapse capture hides the current child; static state preserves `current`, but re-expansion is not captured. | **Partial**: same evidence limit; static state preserves `current`. | **Fail**: navigation never renders. | `disclosure-current-destination-light`; re-expansion is unobserved, but static evidence supports state preservation for Runs 1/2. |
| Hidden Drawer removal | Hidden state omits Drawer region, border, and reserved track; Header control remains usable. | **Pass, visual**: workspace expands; no residual track. | **Pass, visual**: workspace expands; no residual track. | **Partial**: track is removed before failure, but the Header control is blank/unusable. | `drawer-hidden-light`, `drawer-hidden-dark-track-removal` at both viewports. |
| Light / Dark semantic palette | Both modes, same meaning, selected canonical values, Header/page/surface roles all change together. | **Fail**: example override selected and Light page background leaks into Dark workspace. | **Fail**: example override selected; canonical variable requirement also unmet. | **Fail**: example override selected and runtime failure removes required rendered control/nav effects. | `initial-menu-light-palette`, `initial-menu-dark-palette`; source CSS. |
| Visible focus | Outer `focus_ring` treatment for keyboard-reachable inputs, buttons, nav, and disclosure. | **Partial**: input focus halo is visible in search captures; static selector covers buttons/nav. No keyboard traversal evidence. | **Partial**: same; static selector also covers disclosure. | **Partial/fail**: CSS declares the treatment, but startup error leaves nav and Header glyph controls unrendered; no focused interaction outcome. | Search captures and CSS. Screenshots cannot prove keyboard sequence or AT behavior. |
| Neutral workspace and copy gate | Only supplied identity, search label/placeholder, neutral workspace label, and 1–80 content; no demo/process/Contract explanation. | **Pass**. | **Pass**; native ordered-list markers visually repeat each supplied ordinal, but introduce no business content. | **Pass for static neutral content**; navigation absence remains F-05. | Initial captures and source. No prohibited visible explanatory copy found. |
| Local/static asset boundary | Lucide only; no external image/font/CDN/script. | **Pass**: inline SVG only. | **Pass**: local stylesheet, script, and local Lucide SVG. | **Pass**: inline SVG only. | Static reference scans; generated source. |
| Required captures / source independence | All ten states at both viewports and source stays untouched. | **Pass**. | **Pass**. | **Pass as capture integrity, not UI conformance**: all files are valid, but several screenshots truthfully show the broken runtime. | All 60 evidence-manifest entries; digest comparison. |

## Deviation ledger and route

| ID | Deviation and evidence | Classification | Prescribed route | Three fresh Runs? |
| --- | --- | --- | --- | --- |
| F-01 | Every Run uses `theme-colors.example.yaml` values although the frozen generation contract selects no override. The only allowed consumer paths omit that selected-none fact, while the linked example is present. | `prompt-gap` | State the chosen palette / `selected_theme_color_override: none` explicitly in the fixed product prompt (or expose an equivalent immutable selected-config input to consumers), refreeze, then regenerate all Runs. Do not alter a Run. | **Yes** |
| F-02 | Run 1 Dark capture keeps a Light workspace page background. Its dark variables are scoped to `#app`; the `body` page background retains root Light `--page-background`. | `non-conformance` | Record against Run 1. Address only through the next full attempt after F-01; no local repair. | **Yes, with F-01** |
| F-03 | Run 1 `.workspace` has no vertical scroll owner; the document scrolls, contrary to independent Drawer/workspace scroll ownership. | `non-conformance` | Record against Run 1; regenerate as part of the new full attempt. | **Yes, with F-01** |
| F-04 | Run 2 maps role values through page-local aliases (`--page`, `--selection`, etc.), although frozen theme guidance requires canonical semantic variables where custom properties are used. | `non-conformance` | Record against Run 2; make the requirement salient in the next frozen input if needed, then regenerate all three. | **Yes, with F-01** |
| F-05 | Run 3 logs `ReferenceError: Invalid left-hand side in assignment` in `setShell`; `drawerButton.getAttribute('aria-label')=...` aborts before icon assignment and `render()`. Both viewports show blank navigation. | `non-conformance` | Record against Run 3. Regenerate a full independent set; do not patch Run 3. | **Yes, with F-01** |
| F-06 | Run 3 narrow CSS displays the Drawer as an overlay but does not prevent workspace scroll while open, contrary to layout-panes guidance. | `non-conformance` | Record against Run 3; assess in the next full attempt after F-01. | **Yes, with F-01** |
| L-01 | Screenshots do not prove keyboard traversal, AT announcements, focus movement, contrast ratios, or Run 1/2 disclosure re-expansion. | `observation-gap` | Add focused static/interaction evidence when reviewing a newly generated attempt; it cannot clear F-01–F-06. | No by itself |

`allowed-variance`: no material unowned visual variance was accepted. The differing
grid/list presentation is an implementation choice, but it does not offset any
failed frozen requirement.

## Business-screen review notes

The visible copy inventory contains only workspace identity, local search
label/placeholder, fixed navigation data, no-match feedback, neutral workspace
identity, and numeric fixture data. There is no visible demo, Contract,
acceptance, or process explanation. Icon-only Header controls use concise,
action-oriented accessible names in Runs 1 and 2. Run 3 cannot satisfy this
gate at runtime because its controls have no assigned glyph/name after the
exception. There is no task-page primary action to assess.

## Human gate recommendation

**not ready for human review.** Capture integrity and output independence are
verified, but unresolved F-01 plus output non-conformance F-02 through F-06
remain. Correct the frozen input selection ambiguity, regenerate all three
Runs from that same new frozen input set, recapture both viewports and all ten
states, then repeat artifact review.
