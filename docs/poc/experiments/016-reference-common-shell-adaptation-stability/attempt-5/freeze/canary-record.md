---
type: PoC React harness canary record
status: passed
scope: empty harness only; common-shell adaptation and Runs not started
---

# React harness canary record

## Isolation and non-mutation

The canary used a detached temporary Git snapshot containing the exact blob
inventory in [react-harness-input-blobs.json](react-harness-input-blobs.json).
It created a second isolated worktree for the actual test. Neither worktree
contained a common-shell implementation, and the canonical Reference, product
input, Attempt 3 input, Attempt 4 input, and historical Run artifacts were not
edited.

The canary's temporary server, task-local npm cache, server logs, browser
session, screenshots, and both temporary worktrees were removed after the
test. A post-run directory check found no `C:\tmp\react-harness-canary-*` or
`C:\tmp\react-harness-capture-*` artifact.

## Preconditions and integrity cases

| Case | Result |
| --- | --- |
| Reference, product, Attempt 3, Attempt 4, and harness preflights on a normal checkout | pass |
| Harness boundary check | pass; no shell component or prohibited direct dependency |
| CRLF-only representation of the condition document | pass |
| Unstaged condition-document change | rejected |
| Staged Vite configuration change | rejected |
| Untracked file below the canonical harness root | rejected |
| Derived Run configuration equal to the canonical template | pass |
| Derived Run `package.json` change | rejected |

## Runtime and HTTP evidence

The canary executed `npm ci` with a task-local cache, `npm run typecheck`, and
`npm run build` in the empty harness. All passed.

| Property | Value |
| --- | --- |
| Server | Vite development server, bound to `127.0.0.1:4175` only |
| Viewport | `1440 × 900` CSS pixels |
| Browser observer | temporary `@playwright/cli@0.1.18`; not a project dependency |
| Light URL | `http://127.0.0.1:4175/?theme=light&drawer=open&workspace=expanded&current=Overview` |
| Dark URL | `http://127.0.0.1:4175/?theme=dark&drawer=open&workspace=expanded&current=Overview` |
| Browser observation | both entries rendered the corresponding `theme=light` / `theme=dark` state and produced temporary PNG captures |

This is only evidence that the React execution and capture path works. It does
not assess a common shell, visual bindings, or framework-neutral reproduction.

## Decision

The frozen React harness is ready to be used as a template for three future
isolated Runs. This record does not dispatch those Runs.
