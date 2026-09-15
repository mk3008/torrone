---
type: PoC cause analysis
title: Attempt 2 visual binding gaps
status: completed
source: Reference and Attempt 2 artifact inspection
---

# Cause analysis: Attempt 2 visual differences

## Evidence boundary

The full Attempt 2 dispatch prompt was not preserved as a repository artifact.
The durable execution evidence is the frozen Attempt 1 experiment contract,
the Attempt 2 product contract, the three initial artifacts, and their review
records. Any claim about wording not present in those files is therefore
marked as an inference rather than treated as evidence.

## Input-to-output trace

| Difference observed in human review | Reference evidence | Attempt 2 input or review evidence | Output evidence | Cause classification |
| --- | --- | --- | --- | --- |
| Run 1 uses a dark Header and a separate Drawer/selection palette rather than the Reference palette. | The approved Reference exposes concrete Light/Dark custom-property values in `015-reference-first-common-shell/styles.css`. | The Reference contract calls palette a `Default`, says literal geometry is not to be copied, and lists CSS architecture as `Freedom`. The product contract leaves visual hierarchy to the Reference but does not name reusable palette assets. | `run-1/initial/styles.css` introduces `--header`, `--drawer`, and `--accent` values that differ from the Reference token set. | `Reference fixed-scope gap`; `adaptation-instruction ambiguity`; `validation gap`. |
| Run 1 uses a text chevron for parent disclosure instead of the Reference SVG. | The Reference renders a trailing SVG disclosure with one path for expanded and another for collapsed state. | The Reference contract lists `icon source` as `Freedom`. The frozen experiment contract prohibits copying Reference source without making an exception for visual assets. The Attempt 2 review labels icon treatment `freedom-variance`. | `run-1/initial/app.js` emits `⌄` and rotates it instead of using the Reference disclosure asset. | `Reference fixed-scope gap`; `adaptation-instruction ambiguity`; `reviewer-criterion gap`; `validation gap`. |
| Run 2 uses a three-line menu symbol rather than the Reference panel-and-direction control; the human review found its shape malformed. | The Reference uses distinct open/close SVG panel glyphs. The Manifest's iconography guidance requires a panel plus directional chevron but intentionally allows an icon source. | The frozen experiment contract says a Run must not copy Reference source text. It does not say that the Reference panel SVG is a reuse exception. | `run-2/initial/styles.css` creates `.drawer-symbol` from three borders; `run-2/initial/index.html` uses that symbol. | `Reference fixed-scope gap`; `adaptation-instruction ambiguity`; `validation gap`; `incidental implementation error` for the malformed result. |
| Run 3 uses different Drawer and theme SVG paths from the Reference. | The Reference contains concrete SVG paths for both states of the Drawer, theme, and disclosure controls. | `icon source` remains `Freedom`; the product input does not bind icon assets; the review accepts SVG choices as `freedom-variance`. | `run-3/initial/app.js` supplies different panel, moon/sun, and disclosure paths. | `Reference fixed-scope gap`; `adaptation-instruction ambiguity`; `reviewer-criterion gap`; `validation gap`. |

## Root cause

The generic Manifest is not the root defect. Its iconography and editable
theme configuration deliberately support products that need their own icon
system or palette. The defect is the absence of a Reference-specific override
when this experiment asked for visual reproduction of one approved shell.

Three boundary statements combined to create that absence:

1. The Reference contract classified `icon source` and CSS architecture as
   implementation freedom, without distinguishing the Reference's own icon
   shapes and palette values from a product's arbitrary icon system.
2. The Attempt 1 fixed implementation condition prohibited copying Reference
   source text, without allowing a small exact asset/token subset to be reused.
3. Attempt 2 validation guarded frozen inputs and structural outcomes but did
   not compare a consumer's icon assets, theme tokens, active indicator, or
   state-to-icon mapping with the approved Reference.

The Attempt 2 reviewer criterion then treated a recognizably similar shell as
acceptable. Its recorded `freedom-variance` for icon treatment made the human
expectation of visual reproduction stricter than the reviewer gate.

## Decision

Attempt 3 narrows only the Reference-specific visual subset. It does not make
the generic Manifest's product-configurable palette or generic icon guidance
less flexible. The exact palette tokens, icon paths, state mapping, and named
locations move to [Reference-owned visual bindings](reference-owned/visual-bindings/).
All other implementation choices remain in the structural/adaptation layers.
