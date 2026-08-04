---
type: interaction foundations candidate
status: proposed; human decision required
---

# Interaction Foundations candidate

Hover, `focus-visible`, selected, active, and disabled are cross-application
interaction states. They should not be elevated as Drawer-only details merely
because the shared shell supplies examples of them.

## Candidate direction

| State | Candidate responsibility | Decision status |
| --- | --- | --- |
| Hover | Express a semantic interactive response distinct from selection where both are present. | Human decision required |
| `focus-visible` | Provide a perceivable, unobscured keyboard focus treatment. | Human decision required |
| Selected | Communicate the current navigation or content choice. | Human decision required |
| Active | Communicate transient activation where applicable. | Human decision required |
| Disabled | Communicate unavailable interaction without impersonating an enabled state. | Human decision required |

A future Foundation may introduce a semantic token such as
`interactive-hover-background`. The current Reference's page background is
not thereby declared to be the universal hover meaning. Likewise, the current
focus color, thickness, and offset are evidence for review, not unverified
application-wide mandatory values.

Once Canonical Foundations exist, the common-shell contract should reference
them rather than independently redefining interaction treatment. Until then,
the approved Reference remains the relevant visual authority for the shared
shell and the unresolved questions remain review gates.
