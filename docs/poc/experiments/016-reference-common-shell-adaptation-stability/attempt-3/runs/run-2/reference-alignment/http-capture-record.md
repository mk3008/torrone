---
type: attempt-3-http-capture-record
run: run-2
artifact: reference-alignment
date: 2026-08-04
status: partial; hover pseudo-state evidence unavailable
---

# Run 2 Reference-alignment HTTP capture record

## Why HTTP was used

The browser automation policy rejects new local `file:` navigations. That is a
capture-tooling constraint, not a nonconformance of the artifact. No suitable
existing Attempt 3 local delivery/capture method was found, so this observation
used a temporary Node standard-library HTTP server. No dependency, runtime,
server script, log, cache, or configuration was added to the repository.

## Delivery boundary

| Property | Value |
| --- | --- |
| Server | Node standard-library `http` server |
| Bind address | `127.0.0.1` |
| Port | `50096` |
| Served root | `runs/run-2/reference-alignment/` only |
| Viewport | 1440 × 900 |
| Lifetime | Capture-only; stopped immediately after capture |

The server process was stopped after capture and its temporary script, PID/
port files, and logs were removed from `C:\tmp`. It neither read nor served
the repository root, fixed inputs, or other Run outputs.

## Captured URLs and evidence

| Evidence | URL query | Result |
| --- | --- | --- |
| `light-drawer-open.png` | `?drawer=open&theme=light&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `dark-drawer-open.png` | `?drawer=open&theme=dark&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `drawer-hidden.png` | `?drawer=hidden&theme=light&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `dark-drawer-hidden.png` | `?drawer=hidden&theme=dark&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `parent-expanded.png` | `?drawer=open&theme=light&workspace=expanded&current=Overview` | captured, 1440 × 900 |
| `parent-collapsed.png` | `?drawer=open&theme=light&workspace=collapsed&current=Overview` | captured, 1440 × 900 |
| `selection-section-01.png` | `?drawer=open&theme=light&workspace=expanded&current=Section%2001` | captured, 1440 × 900 |
| `search-focus-visible.png` | light open; Search navigation focused by keyboard input | captured, 1440 × 900 |
| `search-focus-visible-dark.png` | dark open; Search navigation focused by keyboard input | captured, 1440 × 900 |

Base URL during capture:

`http://127.0.0.1:50096/index.html`

## Interaction observation

Keyboard focus was confirmed before both focus captures. The focused input
matched `:focus-visible`; computed style reported the approved external focus
outline (`3px` ring and `3px` offset, rendered as `2.85714px` after browser
scaling). The images show that the ring is neither clipped nor hidden by the
adjacent search-field border in either theme.

The browser automation surface can click the navigation row but does not
maintain a CSS `:hover` pseudo-state after its pointer-move command. A trial
capture did not show the state and was removed rather than recorded as
evidence. The implementation's hover rule remains statically aligned to the
Reference, but a real hover screenshot is not available from this tooling.

## Non-mutation statement

This observation changed no Run 2 HTML, CSS, JavaScript, fixed input,
Reference, product input, or validation. Local HTTP delivery is observation
tooling only and is not an implementation correction.
