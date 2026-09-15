---
type: PoC experiment contract
title: Customer-search localized Grid overflow, attempt 19
status: superseded
source: authored
baseline_commit: 2074bf0ac6b99d6265917bad987cf2dc2039e139
---

# Purpose

Test whether the Manifest's pane-ownership contract keeps result actions and
pagination outside a locally horizontally scrolling Grid body. The unchanged
product prompt, frozen Manifest snapshot, and fixed shell fixture are the only
screen-generation inputs. Generate all three runs once without individual
replacement or repair.

## Fresh-run requirement

Each run starts with only the fixed `shell.css` and `shell.js` assets copied
from the common-shell fixture. Its `index.html`, `page.css`, and `page.js` must
be newly authored from the frozen Manifest snapshot and fixed product prompt.
Do not copy any page source or capture from an earlier attempt.

## Superseded execution

All three page sources were freshly authored. However, Run 1 assigned
`overflow-x: clip` directly to `.shell-workspace` from page CSS in order to
control document overflow. That crosses the fixed-shell responsibility
boundary. A strengthened Manifest rule and a fresh full three-run attempt are
required; do not individually repair Run 1.

# Outcome boundary

The experiment is complete when all three sources are generated once, then
captured and evaluated as they are. A failed visual result remains evidence; it
must not be individually regenerated or edited. Changes to the Manifest,
prompt, or fixture require a later numbered attempt with three new runs.

