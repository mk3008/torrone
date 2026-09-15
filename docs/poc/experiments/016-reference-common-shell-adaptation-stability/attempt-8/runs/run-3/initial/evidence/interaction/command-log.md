# Resolved capture command log

Every command below ran from the Run root. Exit codes are observed process exit
codes. Snapshot details emitted by the CLI are also retained in
`.playwright-cli/`; the serial observation record preserves the before/action/
after interpretation.

| Order | Exit | Resolved command | Output record |
| ---: | ---: | --- | --- |
| 0 | 1 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction open 'http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview' --browser chrome` | npm cache creation failed with `EPERM` before a browser session was created. |
| 1 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction open 'http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview' --browser chrome` | Browser opened; fixed URL loaded; first snapshot stored; console reported 1 error/0 warnings. |
| 2 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction resize 1440 900` | Viewport set to `1440 x 900`. |
| 3 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Initial Drawer-visible, parent-expanded accessibility snapshot; `Workspace` ref `e22`. |
| 4 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction screenshot --filename evidence/interaction/01-initial-expanded.png` | PNG saved with CSS scale. |
| 5 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction click e22` | Resolved to `getByRole('button', { name: 'Workspace' })`; parent collapsed. |
| 6 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh collapsed snapshot; children absent; `Activity` leaf present; `Close navigation` ref `e5`. |
| 7 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction screenshot --filename evidence/interaction/02-parent-collapsed-before.png` | PNG saved with CSS scale. |
| 8 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh pre-close snapshot; `Close navigation` ref `e5`. |
| 9 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction click e5` | Resolved to `getByRole('button', { name: 'Close navigation' })`; Drawer hidden. |
| 10 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh hidden snapshot; Drawer absent; `Open navigation` ref `e68`. |
| 11 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction screenshot --filename evidence/interaction/03-drawer-hidden.png` | PNG saved with CSS scale. |
| 12 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh pre-open snapshot; `Open navigation` ref `e68`. |
| 13 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction click e68` | Resolved to `getByRole('button', { name: 'Open navigation' })`; Drawer returned. |
| 14 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh returned Drawer snapshot; parent still collapsed; `Workspace` ref `e81`. |
| 15 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction screenshot --filename evidence/interaction/04-drawer-visible-collapsed.png` | PNG saved with CSS scale. |
| 16 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh pre-expand snapshot; `Workspace` ref `e81`. |
| 17 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction click e81` | Resolved to `getByRole('button', { name: 'Workspace' })`; parent expanded. |
| 18 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh expanded snapshot; three children present; `Workspace` ref `e81`. |
| 19 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction screenshot --filename evidence/interaction/05-parent-expanded.png` | PNG saved with CSS scale. |
| 20 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh pre-collapse snapshot; `Workspace` ref `e81`. |
| 21 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction click e81` | Resolved to `getByRole('button', { name: 'Workspace' })`; parent collapsed. |
| 22 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction snapshot` | Fresh final snapshot; children absent; Drawer visible; `Activity` leaf present. |
| 23 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction screenshot --filename evidence/interaction/06-parent-collapsed-after.png` | PNG saved with CSS scale. |
| 24 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction console` | Total messages 4; errors 1; warnings 0; retained error is `/favicon.ico` HTTP 404. |
| 25 | 0 | `npx --yes --package @playwright/cli@0.1.18 playwright-cli -s=attempt8-run-3-interaction close` | Browser session closed successfully. |

Server startup was `npm run dev` and the strict-port Vite process reported
`http://127.0.0.1:4175/`. The process was stopped after the browser session
closed. Its stdout and stderr are retained under `evidence/server/`.
