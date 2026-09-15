---
type: preparation verification record
status: passed
---

# Attempt 6 product fixture preparation verification

## Portable integrity

The product fixture preflight uses the `2b3ebb0` Git blob inventory. It checks
the canonical fixture, product contract, observation preview, and candidate
consistency script for baseline, index, staged, unstaged, and untracked
differences. It separately asserts the approved supplied hierarchy and initial
state, then invokes the preview/data consistency check.

The isolated canary evidence is in [canary-record.md](canary-record.md).

## HTTP preview observation

The preview was served temporarily with Python standard-library `http.server`
on `127.0.0.1:4175`, rooted at `docs/poc/experiments`. The observed URL was:

`http://127.0.0.1:4175/016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/preview/index.html?theme=light&drawer=open`

At the initial expanded state, `Overview` and `Activity` were present as
top-level destinations; `Workspace` was present as the parent; and `Section
01` through `Section 03` were present as its children. After closing
`Workspace`, only those three child rows disappeared; the two top-level rows
and parent remained. Browser console errors and warnings: `0`.

The HTTP server is an observation tool only. It does not change the candidate,
fixed input, Reference, vNext contract, React harness, or any historical Run.
It was stopped after observation and port `4175` was confirmed released.

## Existing input checks

The following non-destructive checks passed:

- Reference fixed-input preflight (`9cd1932`): 52 files.
- Attempt 3 visual-binding preflight (`1d805e8`): 24 files.
- Attempt 4 vNext-contract preflight (`a3ef3fa`): 11 files.
- React harness preflight: 14 files.
- Attempt 6 product fixture preflight (`2b3ebb0`): 5 files.
- vNext contract static check.
- SVG rendering contract static check against the React harness.
- SVG rendering self-test: valid CSS-mask fixture accepted and intentional
  direct-image misuse rejected.
- Product fixture candidate consistency check and `node --check` for the
  preview script.
- `git diff --check`.
