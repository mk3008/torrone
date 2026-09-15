---
type: future framework-adaptation worker input
title: React common-shell adaptation instructions
status: frozen candidate; do not dispatch from this document alone
---

# React common-shell adaptation instructions

## Read before implementation

1. Run the Reference, product, Attempt 3, Attempt 4, and React-harness
   preflights from the isolated worktree.
2. Read the Attempt 4 input set and its owner documents in the stated
   source-of-truth order.
3. Read [the React experiment condition](experiment-condition.md).

## Required adaptation boundary

Implement the approved common shell with React, TypeScript, Vite, and plain
CSS. Preserve the approved visual authorities and contracts from the frozen
inputs. The React component tree, DOM, state handling, CSS organization, and
file layout are implementation choices, provided they do not change the
approved result.

Start by deriving the assigned Run's application directory from the frozen
empty `harness/` template. Do not edit the canonical template. Its package,
lockfile, TypeScript, and Vite configuration must remain byte-for-canonical
content equivalent in the derived application; use the harness preflight's
`-RunRoot` comparison to prove that condition.

For the fixed `currentColor` SVG assets, use an integration method that applies
the current theme foreground color and preserves the approved asset shape. Do
not use an external `img` rendering path that leaves those assets unable to
receive their intended foreground color. The frozen SVG rendering contract is
the authority for this rule.

## Prohibited shortcuts

- Do not copy the Reference HTML or CSS verbatim as the resulting React
  implementation.
- Do not replace fixed SVG assets, tokens, or binding mappings.
- Do not add a UI library, icon library, utility-CSS framework, CSS-in-JS
  library, or external design system.
- Do not change frozen inputs, the lockfile, shared Vite configuration, or
  another Run's output.
- Do not implement another page pattern or product feature.

## Required evidence after a future implementation

Re-run every frozen-input and harness preflight, typecheck, and production
build. Capture the fixed URLs and provide the existing structural and visual
validation evidence. This preparation does not start a Run or authorize any
implementation.
