---
type: PoC experiment contract
title: Common shell navigation search single-field rerun
status: completed
source: authored
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
consumer input. The prompt supplies product facts only; Header persistence,
Drawer-search composition and behavior, navigation selection treatment,
icon meaning, focus treatment, and scroll ownership come from the Manifest.

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
| Navigation search uses one labelled, watermark-bearing editable control with one visible field boundary | runtime source inspection and focused screenshot |
| Navigation search filters without a submit action, retains matching child context, restores the list when cleared, and has a no-match state | runtime interaction screenshots and source inspection |
| A supplied current Drawer item uses the fixed full-row selection treatment with a leading indicator, while selected children retain their sibling indentation | initial-state screenshots and source inspection |
| Activating a supplied Drawer destination transfers the one current-item treatment without changing hierarchy indentation | runtime click evidence and source inspection |
| Collapsing and re-expanding a parent leaves the binding current destination unchanged and restores its same child treatment | runtime disclosure evidence and source inspection |
| Header uses a legible directionally meaningful Drawer controller and next-mode theme controller | paired Drawer-visible/hidden screenshots and source inspection |
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

## Selection boundary

After this contract was executed and evaluated, the product owner selected
Run 1 as the reusable common-shell reference. That choice is recorded outside
this frozen generation contract in [selected-common-shell.md](selected-common-shell.md).
It does not change the consumer input, the three generated outputs, or the
meaning of this test.
