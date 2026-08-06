---
type: PoC experiment condition
title: React framework-adaptation condition
status: frozen candidate; Runs not dispatched
upstream-input: attempt-4/freeze/input-set.md at 7431ce8
---

# React framework-adaptation condition

## Fixed technology surface

| Concern | Fixed condition |
| --- | --- |
| Runtime | Node.js `22.14.0` |
| Package manager | npm `10.9.2`; use `npm ci` from the committed lockfile |
| Framework | React `19.0.0` with TypeScript `5.7.2` |
| Development server / build tool | Vite `5.4.14` with `@vitejs/plugin-react` `4.3.4` |
| Styling mechanism | Plain imported CSS only; no CSS Modules are supplied by this harness |
| Browser APIs | Browser-native APIs only |
| UI libraries and icon libraries | Not installed or permitted |
| State library | Not installed or permitted |
| CSS-in-JS and utility-CSS framework | Not installed or permitted |

The exact dependency graph is the committed
[package-lock.json](../harness/package-lock.json). These versions are deliberately
exact so that all future isolated Runs install one graph. They were selected to
work with the locally available Node.js/npm pair and to provide the requested
minimal React/Vite surface; this preparation does not claim that they are the
latest versions or compare alternatives.

## Harness responsibilities

The harness provides only the following infrastructure:

- a React component execution entry point;
- TypeScript compilation and Vite production build;
- a plain-CSS import path;
- a query-driven light/dark theme environment through `theme=light|dark`;
- an HTTP entry for browser capture; and
- a documented place where a future Run may consume fixed SVG assets.

It supplies no design answer. In particular it does not supply a palette,
layout, icon rendering implementation, Header, Drawer, navigation, or product
fixture. A future Run must obtain those answers only from the frozen owner
inputs described below.

## Commands

Run all commands from [harness](../harness/).

| Purpose | Command |
| --- | --- |
| Install the locked graph | `npm ci` |
| Start the development server | `npm run dev` |
| TypeScript verification | `npm run typecheck` |
| Production build | `npm run build` |
| Serve the production build | `npm run preview` |

The development server binds only to `127.0.0.1:4175`; preview binds only to
`127.0.0.1:4176`. Both ports are strict so a conflicting process fails rather
than silently changing the capture condition.

## Capture condition

| Property | Fixed value |
| --- | --- |
| Viewport | `1440 × 900` CSS pixels |
| Development-server origin | `http://127.0.0.1:4175` |
| Canary observer | `@playwright/cli@0.1.18` through temporary `npx`; not a project dependency |
| Light entry | `/?theme=light&drawer=open&workspace=expanded&current=Overview` |
| Dark entry | `/?theme=dark&drawer=open&workspace=expanded&current=Overview` |
| Hidden-drawer entry | `/?theme=light&drawer=hidden&workspace=expanded&current=Overview` |
| Collapsed-parent entry | `/?theme=light&drawer=open&workspace=collapsed&current=Overview` |
| Selected-item entry | `/?theme=light&drawer=open&workspace=expanded&current=Section%2001` |

The empty harness honors only `theme`; the remaining state keys are capture
entry contracts for the later common-shell implementation. Their presence does
not pre-implement any shell state.

## Ownership boundary

| Owner | Canonical responsibility | Must not be redefined here |
| --- | --- | --- |
| Reference | Approved runnable Reference and auxiliary Manifest | Visual behavior and reference structure |
| Product | Application name, product fixture, and product constraints | Layout, color, asset geometry, and visual hierarchy |
| Attempt 3 | Exact visual authorities: tokens, seven SVGs, binding map, and structural inputs | Token values, SVG paths, and binding-state mapping |
| Attempt 4 / vNext | Contract prose, SVG rendering contract, validation definitions, and common input boundary | Any new visual value or untested behavior |
| React harness | Execution, build, plain-CSS loading, query theme environment, and HTTP capture entry | Design answers and common-shell components |

## Run isolation and output placement

Each future Run must begin from a separately created, detached Git worktree at
the harness-freeze commit. A worker receives only the frozen owner inputs,
this condition, and [the shared instructions](shared-adaptation-instructions.md).
It must not open another Run's worktree, output, report, capture, or review.

Inside that worktree, the worker first derives its own application directory
from this empty `harness/` template under
`attempt-5/runs/run-{1,2,3}/initial/`. It implements only the derived
application directory; the canonical template remains unchanged. The
harness preflight can compare each derived package, lockfile, TypeScript, and
Vite configuration file with the fixed template, so no Run can silently use a
different dependency graph or shared build setting. Final artifacts and
reviews remain under the same Run directory. No Run is created by this
preparation.

## Evidence plan

The harness canary must install, typecheck, build, serve, open both query theme
entries by HTTP, and take an automated browser screenshot. It must run the
Reference, product, Attempt 3, Attempt 4, and harness preflights before
reporting success. Browser evidence from future Runs, rather than this empty
entry, will assess visual reproduction and framework adaptability.
