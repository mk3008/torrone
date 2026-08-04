---
type: attempt-3-http-capture-record
run: run-2
artifact: reference-alignment-icon-color
date: 2026-08-04
status: complete
---

# Run 2 icon-color HTTP capture record

## Delivery method

Browser automation rejects new local `file:` navigation. This is observation
tooling only, not an artifact nonconformance. No suitable existing Attempt 3
capture method was available, so a temporary Node standard-library HTTP server
served only this derivative.

| Property | Value |
| --- | --- |
| Bind address | `127.0.0.1` |
| Port | `59002` |
| Served root | `runs/run-2/reference-alignment-icon-color/` only |
| Viewport | 1440 × 900 |
| Lifetime | Capture-only; stopped after capture |

The server, its `C:\tmp` script, PID/port files, and logs were removed after
capture. No repository-wide path, fixed input, or other Run was served.

## Captures

| Evidence | Query or interaction | Result |
| --- | --- | --- |
| `light-drawer-open.png` | `?drawer=open&theme=light&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `dark-drawer-open.png` | `?drawer=open&theme=dark&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `drawer-hidden.png` | `?drawer=hidden&theme=light&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `dark-drawer-hidden.png` | `?drawer=hidden&theme=dark&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `parent-expanded.png` | `?drawer=open&theme=light&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `parent-collapsed.png` | `?drawer=open&theme=light&workspace=collapsed&current=Overview` | captured, 1440 × 900 |
| `selection-section-01.png` | `?drawer=open&theme=light&workspace=expanded&current=Section%2001` | captured, 1440 × 900 |
| `search-focus-visible.png` | light open; keyboard-focused search input | captured, 1440 × 900 |
| `search-focus-visible-dark.png` | dark open; keyboard-focused search input | captured, 1440 × 900 |

The dark-theme browser inspection confirmed the Header drawer/theme,
search, and disclosure masks use token-derived visible colors rather than
black. Computed values were `#f4f7fa` for Header/disclosure controls and
`#bac6d2` for the search icon.

The prior human hover confirmation remains applicable: this derivative does
not change its hover CSS. It does not present a new hover PNG as evidence.

## Non-mutation statement

HTTP delivery and capture did not modify fixed inputs or the prior Run 2
artifacts. The only implementation change in this derivative is the fixed-SVG
integration method described in `correction-report.md`.
