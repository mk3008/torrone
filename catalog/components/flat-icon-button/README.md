# ICON-BUTTON-001 — Flat icon command appearances

[View the five state images](index.html).

- Category: Component / icon-only command button.
- Platform: Web-origin illustration. Native, forced-colors and real-device rendering unverified.
- Status: **Human-accepted appearance examples.** [Visual acceptance](https://github.com/mk3008/torrone/pull/43#issuecomment-6191706773). Source Reference approval remains separate.
- Appearance: bare icon at rest; target fill on hover/pressed appearances; a separate inner focus outline; muted disabled icon.

| State image | Short caption | Provenance |
| --- | --- | --- |
| [normal.png](images/normal.png) | Bare icon without a visible border or filled target. | Source-supported reconstruction |
| [hover.png](images/hover.png) | A light fill reveals the target around the icon. | Source-supported reconstruction |
| [active.png](images/active.png) | A stronger fill distinguishes the pressed appearance. | Source-supported reconstruction |
| [focus-visible.png](images/focus-visible.png) | Inner outline marks keyboard focus independently of hover. | Source-supported reconstruction |
| [disabled.png](images/disabled.png) | Muted icon without a filled target. | Source-supported reconstruction |

One source glyph is used throughout so the state differences can be compared. The double chevron is fixture artwork, not a requirement for a specific command. The plain image canvas is not a visible button boundary. Each state has a separate PNG and editable [SVG artwork](artwork/).

## Sources and scope

[Curated Flat icon buttons](../../../references/icon-button.md) identifies the approved [executable Reference](../../../review/references/icon-button-draft.html), Git blob `b8e039b8dbee39ccd668d3936be60abffe1fa447`, and [human approval](https://github.com/mk3008/torrone/pull/19#issuecomment-5704820948). Its CSS supplies all five pictured appearance distinctions: `.icon-button`, `:hover:not(:disabled)`, `:active:not(:disabled)`, `:focus-visible` and `:disabled`. The consistent double-chevron path also comes from that executable.

These new SVG drawings and PNG rasterizations reconstruct appearance from source code. They are not original screenshots, browser-observed pseudo-class states or newly approved image artifacts. No unsupported visual state was added. State combinations (such as simultaneous focus and hover) and forced-colors appearances are not pictured or newly specified.

Theme/colors, typography, spacing, dimensions, density and exact placement are not defined by this image catalog. The consuming product still has to apply its requirements and any applicable Reference. In particular, the source's target-size, accessibility, keyboard and disabled-semantics contract remains in that Reference; an approximate picture does not replace or weaken it. Click handling, command meaning, focus movement, transitions and application policy cannot be inferred from these images.
