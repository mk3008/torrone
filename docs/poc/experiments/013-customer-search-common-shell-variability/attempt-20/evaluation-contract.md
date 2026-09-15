---
type: PoC experiment contract
title: Customer-search localized Grid overflow, attempt 20
status: completed
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

# Outcome boundary

The experiment is complete when all three sources are generated once, then
captured and evaluated as they are. A failed visual result remains evidence; it
must not be individually regenerated or edited. Changes to the Manifest,
prompt, or fixture require a later numbered attempt with three new runs.

## Completion record

This is the third and final retry for this question. All three fresh runs were
generated and captured once after their sources were complete. The final
assessment is recorded in [evaluation.md](evaluation.md); no fourth run or
individual repair is allowed within this experiment.

