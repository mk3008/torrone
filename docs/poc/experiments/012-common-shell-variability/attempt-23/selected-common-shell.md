---
type: PoC selected implementation reference
title: Selected common shell — Attempt 23 Run 1
status: selected
source: product-owner decision
---

# Selected common shell

## Decision

The product owner selected Attempt 23 Run 1 as the reusable common-shell
reference. This records a selection from the completed independent three-run
experiment; it does not make the generated HTML/CSS a distribution Manifest or
change the frozen Manifest snapshot used by the experiment.

## Selected source

- [Interactive reference](runs/run-1/index.html?drawer=open&theme=light)
- [Run 1 implementation note](runs/run-1/README.md)
- [Three-run comparison](comparison.html)
- [Evaluation](evaluation.md)

The selected source includes the shared Header, Drawer, navigation search,
current-item treatment, theme control, and independently scrolling Drawer and
workspace demonstrated by Run 1. Product-specific navigation labels, current
destination, and workspace content remain supplied fixture values.

## Identity

| File | Raw-byte SHA-256 |
| --- | --- |
| `runs/run-1/index.html` | `0024D3942126179E03CA21F6FD491B7545464762889FBDA86E29D868112757A0` |
| `runs/run-1/styles.css` | `4BAE121B473CE0698DEA9A39CCF3A733837B6E76B0F354C404FB0C76232BEC2E` |
| `runs/run-1/app.js` | `C3B18BA84F53703BD1D6FB3CBE1B4A556868DA445121EF856E544A1EB1AF2E4C` |

The capture matrix and browser record remain in
[capture-record.json](capture-record.json). Its initial selected state is
`runs/run-1/shell-open-light.png` at `1440 x 1200`.

## Reuse rule

For a future experiment that needs this common shell, copy these three source
files into that experiment's frozen `consumer-input/common-shell-fixture/`
before generation and identify this record as the fixture origin. Preserve the
copied fixture for that experiment. Do not edit this selected Run in place,
and do not retroactively change historical experiment inputs or outputs.

The common shell is a reusable implementation reference, not a substitute for
the Manifest. A future test still uses its own frozen Manifest snapshot and
its own product-specific prompt.
