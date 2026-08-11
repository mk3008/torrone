---
type: PoC interaction and capture contract
title: Attempt 8 Drawer visibility and parent disclosure observation
status: frozen input candidate; no Run observed
---

# Attempt 8 interaction contract

## Purpose and authority

This contract makes one serial browser observation comparable across the three
independent Runs. It applies the current Header and Drawer Manifest concepts to
the product-owned Attempt 6 fixture. It does not prescribe a DOM, component
tree, selector, state representation, event handler, CSS rule, animation,
storage mechanism, or browser-test implementation.

The product fixture remains authoritative for the initial state: Light theme,
Drawer open, `Workspace` expanded, and `Overview` current. The illustrative
Reference's neutral `Parent: collapsed` initial state is not a product fact.
The sequence first collapses `Workspace`, then observes the focused
`collapsed → expanded → collapsed` cycle.

## Fixed capture condition

| Property | Frozen value |
| --- | --- |
| Run count | `3`, generated independently from the same frozen inputs |
| Viewport | `1440 × 900` CSS pixels |
| Run server | Canonical harness `npm run dev` on `http://127.0.0.1:4175` |
| Initial URL | `http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview` |
| Observer | `@playwright/cli@0.1.18` through temporary `npx`; not a project dependency |
| Browser | Playwright CLI Chrome; record the actual browser version |
| Session | One fresh named session per Run; no session or page is shared across Runs |
| Capture order | Serial, in the exact ten-step order below, without reload or state reset |

Start the canonical Run server from the assigned Run root with:

```text
npm run dev
```

Use this command template, replacing `{n}` only with the assigned Run number
and replacing each `{fresh-ref-for-...}` only with the element reference from
the immediately preceding Playwright snapshot. Record every resolved command,
output, and exit code in the Run evidence. The semantic accessible names, not
a shared selector or DOM shape, identify the controls.

```text
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction open 'http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview' --browser chrome
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction resize 1440 900
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction screenshot --filename evidence/interaction/01-initial-expanded.png
```

After every state-changing activation, take a fresh snapshot before inspecting
or using another element reference. Save screenshots with the exact filenames
in the sequence. After the four initial commands above, use this exact command
order. Each `click` placeholder is resolved only from the immediately preceding
snapshot and must identify the stated accessible name.

```text
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction click {fresh-ref-for-Workspace}
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction screenshot --filename evidence/interaction/02-parent-collapsed-before.png
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction click {fresh-ref-for-Close-navigation}
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction screenshot --filename evidence/interaction/03-drawer-hidden.png
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction click {fresh-ref-for-Open-navigation}
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction screenshot --filename evidence/interaction/04-drawer-visible-collapsed.png
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction click {fresh-ref-for-Workspace}
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction screenshot --filename evidence/interaction/05-parent-expanded.png
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction click {fresh-ref-for-Workspace}
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction snapshot
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction screenshot --filename evidence/interaction/06-parent-collapsed-after.png
```

Step 3 is the `Activity` leaf inspection made from the post-step-2 snapshot;
it intentionally performs no activation. At the end, run and record:

```text
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction console
npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-{n}-interaction close
```

## Exact ten-step sequence

| Step | Action | Required visible result | Required stable-state check | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Open the fixed initial URL, resize, and snapshot. | Drawer is visible; `Workspace` is expanded; `Section 01`–`03` are visible; `Overview` is current; the workspace task is visible. | Product labels, order, Light theme, and initial states match the fixed product fixture. | `01-initial-expanded.png` plus the observed URL and viewport. |
| 2 | Activate the complete `Workspace` parent row once, then take a fresh snapshot. | `Workspace` becomes collapsed; its three supplied children disappear; its available disclosure direction changes. | Drawer stays visible; `Overview` stays current; workspace content and `Activity` stay present. | `02-parent-collapsed-before.png`; record before/action/after. |
| 3 | Inspect the visible `Activity` leaf without activating it. | `Activity` has no disclosure affordance, expansion state, disclosure icon, nested child region, or parent-row behavior. | The state remains Drawer visible, `Workspace` collapsed, and `Overview` current. | Snapshot observation and a focused browser record; no new PNG is required. |
| 4 | From a fresh snapshot, activate the Header control whose available-action name is `Close navigation`. | The activation is accepted as the Drawer visible-to-hidden action. | Do not activate a destination, parent disclosure, theme control, or workspace action. | Record the actual control reference and action command. |
| 5 | Take a fresh snapshot and inspect the hidden state. | Drawer region, navigation content, boundary, and reserved Drawer space are absent; the Header control now communicates `Open navigation`. | Workspace task content and task state remain; `Workspace` disclosure remains collapsed; `Overview` remains the current-destination value. | `03-drawer-hidden.png` plus before/action/after state record. |
| 6 | From a fresh snapshot, activate the Header control whose available-action name is `Open navigation`. | The activation is accepted as the Drawer hidden-to-visible action. | Do not change disclosure, current destination, theme, or workspace task. | Record the actual control reference and action command. |
| 7 | Take a fresh snapshot and inspect the returned Drawer. | The same supplied Drawer body returns; the Header control now communicates `Close navigation`; `Workspace` is still collapsed and its children remain hidden. | Workspace task content, `Overview` current state, labels, order, and `Activity` leaf status remain unchanged. | `04-drawer-visible-collapsed.png` plus before/action/after state record. |
| 8 | Activate the complete `Workspace` parent row once, then take a fresh snapshot. | `Workspace` becomes expanded; `Section 01`–`03` appear; its available disclosure direction changes. | Drawer remains visible; `Overview` remains current; workspace task content and `Activity` leaf status do not change. | `05-parent-expanded.png` plus before/action/after state record. |
| 9 | Activate the complete `Workspace` parent row again, then take a fresh snapshot. | `Workspace` becomes collapsed; `Section 01`–`03` disappear; its available disclosure direction returns. | Drawer remains visible; `Overview` remains current; workspace task content and `Activity` leaf status do not change. | `06-parent-collapsed-after.png` plus before/action/after state record. |
| 10 | Record the final stable state, console counts, file dimensions, and hashes, then close the browser session. | Final state is Drawer visible and `Workspace` collapsed; the six named PNGs are `1440 × 900`; the observation record is complete. | `Overview` is still current; product labels/order and workspace task are unchanged; `Activity` still has no disclosure behavior. | Browser/version record, console error and warning counts, command log with exit codes, PNG SHA-256 hashes, and final observation summary. |

## Required Run evidence

Each Run retains under its assigned output directory:

- the six named untouched PNGs and their SHA-256 hashes;
- the actual URL, browser and Playwright CLI versions, viewport, session name,
  command log, command outputs, and exit codes;
- one serial observation record naming the before state, action actually
  performed, after state, and stable dimensions for steps 2 and 4–9;
- the step 3 leaf observation and final console error/warning counts; and
- the implementation tree digest captured before observation so a capture
  retry can prove that generated bytes stayed unchanged.

Screenshot presence, dimensions, hashes, console counts, and recorded actions
are mechanical evidence only. Artifact review and human comparison decide
whether the visible behavior is meaningfully equivalent. If capture or action
evidence is incomplete, classify `observation-gap` and re-observe unchanged
Run bytes. Never repair a generated Run to improve this evidence.

## Reference and implementation boundary

A Run may operate the accepted interactive Reference to understand the visible
state transitions. It must not copy the Reference DOM, fixture shape,
JavaScript organization, CSS, state storage, Observation panel, or file layout.
The complete parent-row target, available-action meaning, visible results, and
stable state dimensions come from the Manifest and this evidence contract;
the implementation mechanism remains Run-owned.

Escape behavior, focus-management design, Tab traversal, broad ARIA work,
responsive rules, animation, route semantics, current-destination updates,
new interaction configuration, persistence, and production readiness remain
outside this focused contract.
