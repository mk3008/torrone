---
type: Run-owned browser observation
run: Attempt 7 Run 3
viewport: 1440 x 900 CSS pixels
observer: "@playwright/cli@0.1.18"
---

# Activity full-row hover observation

## Fixed state and action

The browser was reset before each theme pair. Both entries used Drawer open,
`Workspace` expanded, `Overview` current, an empty navigation search, and no
activated destination change:

- Light: `http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview`
- Dark: `http://127.0.0.1:4175/?theme=dark&drawer=open&workspace=expanded&current=Overview`

The observed viewport was `1440 x 900` for both pairs. For each baseline the
pointer was moved to `(1100, 32)` in the Header, outside all navigation-row hit
areas. The complete `Activity` button measured `left=0`, `right=272`,
`top=382`, `bottom=424`. For each hover capture, Playwright moved the pointer
without clicking to `(248, 403)`: 24 CSS pixels from the row's inline-end edge
and visibly away from the label.

Before the action, `Activity` was enabled (`disabled=false`) and non-current
(`aria-current` absent). During both hover captures, `Overview` retained
`aria-current="page"`, its selected surface, weight, and physical-left
indicator. The Drawer remained open, `Workspace` remained expanded, its three
children remained visible in the supplied order, the navigation search stayed
empty, and the URL retained `current=Overview`. No click or destination change
was performed.

## Serial captures

| Order | State | File | Dimensions | SHA-256 |
| --- | --- | --- | --- | --- |
| 1 | Light baseline | `hover-light-before.png` | `1440 x 900` | `8f9cd899352aa53c3345dea75b47ff5f94e3327deaa98b60e7488ff983b269ac` |
| 2 | Light Activity hover | `hover-light-activity.png` | `1440 x 900` | `c1b1fef2b842f665b1569c25d619ec6a93cc1d53b162017e0a75025c7a5c4009` |
| 3 | Dark baseline | `hover-dark-before.png` | `1440 x 900` | `09e72bd0eadd25c42fa90aa4e858d608160c26a6adda8995554b9b397217881f` |
| 4 | Dark Activity hover | `hover-dark-activity.png` | `1440 x 900` | `ff7d71793218dbf7a816e65f0fc6b2c73b28110cc87dfd02a384a966a7997d21` |

## Focused computed observation

| Theme | Activity before | Activity hover | Overview during hover |
| --- | --- | --- | --- |
| Light | background `rgb(255, 255, 255)`; no box shadow | background `color(srgb 0.885176 0.923294 0.961412)`; `1px` inset full-row boundary | background `rgb(231, 241, 252)`; weight `730`; `aria-current="page"` |
| Dark | background `rgb(27, 38, 50)`; no box shadow | background `color(srgb 0.147765 0.217255 0.287843)`; `1px` inset full-row boundary | background `rgb(32, 62, 90)`; weight `730`; `aria-current="page"` |

Browser console counts for the focused observation were `errors=0` and
`warnings=0` in each theme pair. The only returned entry was React's
development-mode informational DevTools message.

## Evidence limit

The hashes, dimensions, state metadata, computed values, and recorded pointer
action are mechanical evidence. They do not decide whether the full-row surface
response is perceptible enough or sufficiently distinct from the selected row.
That remains artifact-review and human visual judgment. The frozen six-row
navigation fixture also does not overflow its navigation list, so this focused
observation confirms the separate Drawer scrollport structure but does not
exercise Drawer overflow.
