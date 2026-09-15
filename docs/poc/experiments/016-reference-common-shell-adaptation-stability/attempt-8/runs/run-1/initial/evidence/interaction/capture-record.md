# Attempt 8 Run 1 serial interaction record

## Capture identity

| Property | Observed value |
| --- | --- |
| Attempt | `2` observation-only correction |
| Session | `attempt8-run-1-interaction` |
| URL | `http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview` |
| Viewport | `1440 x 900` CSS pixels |
| Observer | `@playwright/cli@0.1.18` through temporary `npx` |
| Browser | Chrome `151.0.7922.108` at `C:\Program Files\Google\Chrome\Application\chrome.exe` |
| Run title | `Operations workspace` |
| Console | Total messages `3`; errors `0`; warnings `0`; one displayed informational React DevTools message |
| Implementation SHA-256 before capture | `6b5ed5c12950a3ef253e1e61217422942df9dcec1496fddda2cdbb00a424d07f` |
| Implementation SHA-256 after capture | `6b5ed5c12950a3ef253e1e61217422942df9dcec1496fddda2cdbb00a424d07f` |

The implementation digest uses the 22 implementation paths recorded in
`../implementation-tree.sha256`. Generated `evidence/` and `.playwright-cli/`
observation files are outside that implementation manifest.

## Server record

The Run server was started from the assigned Run root with `npm run dev` and
owned the frozen listener at `127.0.0.1:4175` through Node PID `4776`. Its
command line resolved to the assigned Run's local Vite binary with
`--host 127.0.0.1 --port 4175 --strictPort`. The process was stopped after the
browser session closed.

Server output is retained in:

- `../commands/attempt-2-vite.stdout.log`
- `../commands/attempt-2-vite.stderr.log`

## Resolved command log

Every command below exited `0`. The sequence used one page without reload or
state reset.

```text
01 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction open 'http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview' --browser chrome
02 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction resize 1440 900
03 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
04 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction screenshot --filename evidence/interaction/01-initial-expanded.png
05 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction click e22
06 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
07 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction screenshot --filename evidence/interaction/02-parent-collapsed-before.png
08 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
09 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction click e5
10 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
11 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction screenshot --filename evidence/interaction/03-drawer-hidden.png
12 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
13 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction click e68
14 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
15 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction screenshot --filename evidence/interaction/04-drawer-visible-collapsed.png
16 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
17 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction click e81
18 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
19 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction screenshot --filename evidence/interaction/05-parent-expanded.png
20 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
21 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction click e81
22 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction snapshot
23 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction screenshot --filename evidence/interaction/06-parent-collapsed-after.png
24 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction console
25 npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-1-interaction close
```

Each activation reference came from the immediately preceding explicit
snapshot. Playwright also retained automatic post-activation YAML snapshots in
`.playwright-cli/` for the five state changes.

## Ten-step observation

| Step | Before | Action / inspection | After | Stable state |
| --- | --- | --- | --- | --- |
| 1 | Fresh fixed URL | Opened, resized, and snapshotted | Drawer visible; `Workspace` expanded; `Section 01`-`03` visible; `Overview` current; workspace task visible | Light theme; product labels and order matched the fixture |
| 2 | Drawer visible; `Workspace` expanded | Activated complete `Workspace` row with `e22` | `Workspace` collapsed; children absent; right-pointing disclosure shown | Drawer, `Overview`, workspace content, and `Activity` remained present |
| 3 | Drawer visible; `Workspace` collapsed | Inspected `Activity` from the fresh snapshot without activation | `Activity` was a leaf button with no expansion state, disclosure icon, nested region, or child list | No state changed |
| 4 | Drawer visible; `Workspace` collapsed | Activated `Close navigation` with `e5` | Activation accepted | No destination, disclosure, theme, or workspace action was activated |
| 5 | After close activation | Inspected fresh hidden-state snapshot | Drawer navigation, boundary, and reserved track were absent; Header control communicated `Open navigation` | Workspace content stayed visible; disclosure remained collapsed; `Overview` remained the stored current destination, confirmed when Drawer returned |
| 6 | Drawer hidden; `Workspace` collapsed | Activated `Open navigation` with `e68` | Activation accepted | Disclosure, current destination, theme, and workspace task did not change |
| 7 | After open activation | Inspected fresh returned-Drawer snapshot | Same Drawer body returned; `Close navigation` restored; `Workspace` remained collapsed and children absent | `Overview` selection, labels/order, workspace task, and `Activity` leaf status were unchanged |
| 8 | Drawer visible; `Workspace` collapsed | Activated complete `Workspace` row with `e81` | `Workspace` expanded; `Section 01`-`03` appeared; downward disclosure shown | Drawer, `Overview`, workspace content, and `Activity` remained stable |
| 9 | Drawer visible; `Workspace` expanded | Activated complete `Workspace` row with fresh `e81` | `Workspace` collapsed; children disappeared; right-pointing disclosure returned | Drawer, `Overview`, workspace content, and `Activity` remained stable |
| 10 | Drawer visible; `Workspace` collapsed | Recorded final snapshot, PNG metadata, console, and closed session | Final state matched step 2; the step-2 and step-9 PNG SHA-256 values are identical | Six PNGs are `1440 x 900`; errors `0`; warnings `0` |

## PNG evidence

| File | Dimensions | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `01-initial-expanded.png` | `1440 x 900` | 39,707 | `9ef4d46bac17c3550239050351a7ccbdc32b708510f3e5f2bc4d315d8f3e4131` |
| `02-parent-collapsed-before.png` | `1440 x 900` | 36,159 | `4523d839da54512c296bce35c1487000ce56e8a3b42c8fd0ecb869e8ff4aebc3` |
| `03-drawer-hidden.png` | `1440 x 900` | 28,397 | `d4fe8e4bd97a2a07ecd8229c62370cdff6de66819131fcea3649c6c6214ef9b9` |
| `04-drawer-visible-collapsed.png` | `1440 x 900` | 36,343 | `e067bf855180eb5d382fa2e1a59945a676e1bb603c2de21c5a98d6f615b26ff1` |
| `05-parent-expanded.png` | `1440 x 900` | 39,767 | `9bdd1136e4949bb3655e463d5cbf1138693cf021eb60e958e04702b25d6b261c` |
| `06-parent-collapsed-after.png` | `1440 x 900` | 36,159 | `4523d839da54512c296bce35c1487000ce56e8a3b42c8fd0ecb869e8ff4aebc3` |

## Evidence limits

This record proves the named commands, accessible snapshots, fixed viewport,
captured pixels, raw hashes, and observed state transitions for this Run. It
does not prove assistive-technology behavior, broad keyboard traversal,
responsive behavior, production readiness, or meaningful cross-Run
equivalence. Artifact review and human comparison remain separate gates.
