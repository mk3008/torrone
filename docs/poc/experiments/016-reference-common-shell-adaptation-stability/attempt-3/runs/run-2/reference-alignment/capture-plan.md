---
type: attempt-3-run-capture-plan
run: run-2
artifact: reference-alignment
viewport: 1440x900
status: awaiting permitted browser capture
---

# Run 2 Reference-alignment capture plan

Capture every URL at a 1440 × 900 viewport. The state names are evidence
labels only; the URLs are the source of truth.

| Evidence label | Query state |
| --- | --- |
| `light-drawer-open.png` | `?drawer=open&theme=light&workspace=expanded&current=Overview` |
| `dark-drawer-open.png` | `?drawer=open&theme=dark&workspace=expanded&current=Overview` |
| `drawer-hidden.png` | `?drawer=hidden&theme=light&workspace=expanded&current=Overview` |
| `dark-drawer-hidden.png` | `?drawer=hidden&theme=dark&workspace=expanded&current=Overview` |
| `parent-collapsed.png` | `?drawer=open&theme=light&workspace=collapsed&current=Overview` |
| `selection-section-01.png` | `?drawer=open&theme=light&workspace=expanded&current=Section%2001` |

Additionally capture one interaction image for each corrected behavior:

- Hover a non-current navigation row while `Overview` is current; retain both
  rows in the image so the normal-background hover and selection-background
  current state can be compared.
- Focus `Search navigation`; retain the field border and entire focus outline
  in the image so the external `3px` offset is visible.

Base path:

`file:///C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/runs/run-2/reference-alignment/index.html`
