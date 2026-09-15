---
type: PoC experiment contract
title: Common shell navigation, scroll, and Drawer-controller boundary rerun
status: prepared
source: authored
baseline_commit: d767cba
---

# Purpose

Measure whether the current distribution-facing Manifest, together with one
unchanged request for a reusable common shell with supplied navigation search
and neutral scroll content, yields similar implementations across three fresh
runs. The test evaluates Manifest guidance, not a repaired individual output.

# Consumer-visible input

Each run receives exactly two inputs:

1. `consumer-input/design-manifest/` — a frozen snapshot of the complete
   current Manifest directory.
2. `consumer-input/user-prompt-ja.md` — the unchanged Japanese product request.

No prior Run, capture, comparison, test, evaluation rubric, or special skill is
consumer input. The prompt supplies product facts only; persistent Header,
Drawer-search composition and behavior, navigation selection treatment,
Header-icon semantics, focus treatment, and scroll ownership must come from the
Manifest.

# Fixed execution matrix

| Item | Value |
| --- | --- |
| Model | `gpt-5.6-terra` |
| Reasoning effort | `medium` |
| Independent implementations | 3 |
| Output directory | `runs/run-N/` |
| Desktop capture viewport | `1440 x 1200` CSS pixels |
| Narrow capture viewport | `720 x 1200` CSS pixels |
| Drawer states | `open`, `hidden` |
| Theme states | `light`, `dark` |
| Interaction states | initial menu, matching menu filter, no-match menu filter, Drawer scroll, workspace scroll |

# Acceptance criteria

| Criterion | Evidence |
| --- | --- |
| Header remains available while workspace scrolls | runtime before/after screenshot and recorded bounding box |
| Drawer search stays above its list, filters without a submit button, preserves matching child context, has a nonempty-value clear action that restores the list, and has a no-match state | runtime interaction screenshots and source inspection |
| Drawer search has a visible local label, leading magnifier, supplementary placeholder, and outer focus halo | initial and focused runtime screenshots plus source inspection |
| A supplied current Drawer item uses the fixed full-row square selection treatment with a leading indicator, while selected children retain their sibling indentation | initial-state screenshots and source inspection |
| Activating a supplied Drawer destination transfers the one current-item treatment without changing hierarchy indentation | runtime click evidence and source inspection |
| Collapsing and re-expanding a parent leaves the binding current destination unchanged and restores its same child treatment | runtime disclosure evidence and source inspection |
| Selecting a leaf retains the identical label start and padding of an unselected leaf | runtime computed-style evidence and source inspection |
| Header uses a legible Drawer controller: complete panel outline, divider, and directional chevron are fully within the icon canvas; close points left while visible and open points right while hidden. A hand-authored SVG keeps these as separate paths or shapes and keeps the chevron vertices within its viewBox | paired Drawer-visible/hidden screenshots and source inspection |
| Header uses the next-mode moon/sun icon semantics | all initial-state screenshots and source inspection |
| Drawer and workspace have independent vertical scroll positions | runtime scroll-position record and screenshots |
| Drawer hidden state has no residual track | initial-state screenshot and source inspection |
| Supplied Light/Dark semantic palettes cover the whole shell | all theme captures and source inspection |
| Neutral workspace contains only the supplied label and numbered scroll fixture | source inspection |

# Evaluation boundary

Similarity does not mean pixel equality. Typography, geometry, CSS, DOM, and
control dimensions remain implementation decisions. Keyboard, focus movement,
Escape, screen-reader behavior, persistence, responsive design quality, and
navigation destinations are not accepted by screenshots; source-level checks
provide only partial evidence for them.
