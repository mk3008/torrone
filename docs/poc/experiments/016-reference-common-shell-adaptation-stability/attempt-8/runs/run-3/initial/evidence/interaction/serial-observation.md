# Serial interaction observation

## Fixed state dimensions

- Product identity and order: `Operations workspace`; `Overview`, `Workspace`,
  `Section 01`-`03`, then `Activity`.
- Workspace task: `Neutral workspace content`, its supplied description, and
  the ordered overflow fixture `1`-`24`.
- Initial state: Light theme, Drawer visible, `Workspace` expanded, and
  `Overview` current.
- Observation session: `attempt8-run-3-interaction`, `1440 x 900`, without
  reload or state reset.

## Ten-step record

| Step | Before | Action actually performed | After | Stable-state observation | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Fresh fixed URL. | Opened with Chrome, resized to `1440 x 900`, and took a fresh snapshot. | Drawer visible; `Workspace` exposed `Section 01`-`03`; `Overview` had the current full-row treatment; workspace task visible. | Light theme, product labels/order, `Activity`, and task content matched the fixture. | `01-initial-expanded.png`; initial snapshot. |
| 2 | Drawer visible; `Workspace` expanded; `Overview` current. | Clicked fresh ref `e22`, accessible name `Workspace`. | `Workspace` collapsed and the three child rows disappeared; its trailing direction changed. | Drawer, `Overview` current treatment, `Activity`, heading, description, and 24-item task stayed present. | `02-parent-collapsed-before.png`; post-click snapshot. |
| 3 | Drawer visible; `Workspace` collapsed; `Overview` current. | Inspected `Activity` in the post-step-2 snapshot without activating it. | No state changed. `Activity` was a leaf button with no expanded/collapsed state, disclosure glyph, child list, or nested region. | Drawer visible; `Workspace` collapsed; `Overview` current; task unchanged. | Step-2 fresh snapshot and `02-parent-collapsed-before.png`. |
| 4 | Fresh snapshot of the same collapsed Drawer state. | Clicked fresh ref `e5`, accessible name `Close navigation`. | Activation accepted; the next fresh snapshot exposed `Open navigation`. | No destination, disclosure, theme, or workspace-task control was activated. | Resolved click command and step-5 snapshot. |
| 5 | Drawer close action completed. | Took a fresh snapshot and inspected the hidden state. | Drawer landmark, search, navigation rows, boundary, and reserved inline track were absent; workspace used the available width. | Heading, description, 24-item task, Light theme, collapsed disclosure state, and current destination value remained stable. | `03-drawer-hidden.png`; hidden-state snapshot. |
| 6 | Header exposed `Open navigation`; task remained visible. | Clicked fresh ref `e68`, accessible name `Open navigation`. | Activation accepted; the Drawer returned. | No disclosure, destination, theme, or task state changed. | Resolved click command and step-7 snapshot. |
| 7 | Drawer open action completed. | Took a fresh snapshot and inspected the returned Drawer. | Same labels/order returned; Header exposed `Close navigation`; `Workspace` remained collapsed and children remained absent. | `Overview` current treatment, `Activity` leaf status, and task content remained stable. | `04-drawer-visible-collapsed.png`; returned-state snapshot. |
| 8 | Drawer visible; `Workspace` collapsed; `Overview` current. | Clicked fresh ref `e81`, accessible name `Workspace`. | `Workspace` expanded; `Section 01`-`03` appeared; trailing direction changed. | Drawer, `Overview` current treatment, `Activity`, and workspace task remained unchanged. | `05-parent-expanded.png`; post-click snapshot. |
| 9 | Drawer visible; `Workspace` expanded; `Overview` current. | Clicked fresh ref `e81`, accessible name `Workspace`, again. | `Workspace` collapsed; `Section 01`-`03` disappeared; trailing direction returned. | Drawer, `Overview` current treatment, `Activity`, and workspace task remained unchanged. | `06-parent-collapsed-after.png`; post-click snapshot. |
| 10 | Final Drawer-visible, `Workspace`-collapsed state. | Recorded final snapshot, PNG dimensions/hashes, Chrome version, and console counts; then closed the session. | Final state remained Drawer visible and `Workspace` collapsed. | `Overview` remained current; labels/order, `Activity` leaf status, and workspace task were unchanged. | Six `1440 x 900` PNGs; browser record; console record; command log. |

## Mechanical limits

The serial snapshots and PNGs show the scoped visible transitions and stable
content. Static checks separately establish fixed-asset identity and source
integration. Neither evidence class decides meaningful behavioral equivalence,
production readiness, or human acceptance. The retained favicon 404 means the
console result is not a zero-error pass.
