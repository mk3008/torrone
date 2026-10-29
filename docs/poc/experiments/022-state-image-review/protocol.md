# Prepared protocol — not executed

## Inputs and sampling

Use `sources.json` at the recorded base revision and the eight specimens in `samples.html`. Read the source entry's responsibility, visual acceptance and limitations before comparison. The original catalog images must be available alongside each target screenshot, not replaced by a textual summary.

All targets are synthetic. No production effectiveness or native-platform validation may be inferred. The intended sample set is deliberately small: three seeded discrepancies, two allowed-difference candidates, two evidence gaps, and one positive control. Expectations are fixed below before capture; do not change them to match reviewer output.

| Case | Reference states | Reviewer's target-state input | Author's expected bounded outcome |
| --- | --- | --- | --- |
| C01 | MENU-001 child-selected / child-unselected | Child is selected | Flag missing visible selection differentiation; implementation deviation. |
| C02 | MENU-001 child-selected | Child is selected under Parent | Flag missing relative child indentation; implementation deviation. |
| C03 | SHELL-001 drawer-hidden-light | Drawer is fully hidden | Flag retained navigation/icon region; implementation deviation. |
| C04 | MENU-001 child-selected / child-unselected | Selected Child in a native grouped selector, explicit consuming adaptation | Accept native highlight/grouping if state and parent-child relation are recognizable; no exact leading-bar requirement. If they are not recognizable, report evidence and uncertainty. |
| C05 | MENU-001 child-selected | Child is selected | Accept palette, spacing, font and density differences while preserving visible emphasis and indentation. |
| C06 | MENU-001 child-selected / child-unselected | State identity intentionally withheld | Unknown: ask whether the child should be selected. A plain row alone cannot establish mismatch. |
| C07 | MENU-001 child-selected / child-disabled | Child is both selected and disabled; consumer combination policy absent | Unknown: the catalog explicitly leaves selected-disabled combinations undefined. Do not invent precedence. |
| C08 | SHELL-001 drawer-hidden-light | Drawer is fully hidden | No visible region discrepancy within the bounded pattern. No behavioral PASS. |

These are known controls, not hidden test labels. An evaluator who sees this file or authored the specimen cannot claim blind detection. An actual consumer's adopted responsibility must resolve any conflicting explicit requirement before applying these expectations.

## Execution steps

1. Freeze the exact specimen revision and source digests before capture. Record browser/version, viewport, device scale, theme and time. Serve repository files using an already available local static server; no package installation is required by the specimen.
2. Capture each entire numbered specimen at a readable width (suggested desktop viewport: 1280 × 900). Capture one specimen at a time or crop its complete labelled region, preserving any parent, drawer and workspace context required for its case. Record the capture bounds; do not confuse a cropped capture with implementation region loss.
3. Save and inspect every screenshot before accepting it. Reject blank, unloaded, obstructed, incomplete or incorrectly assigned captures. Retain exact accepted bytes, SHA-256, target revision, case and state identity. The source PNGs remain at their original identity; display scaling is presentation only.
4. For a requirements-only baseline, review the target against the adopted text relationships, recording findings and time before the image comparison. Separate a minimal functional checklist from a full visual requirement review. In the same context, acknowledge carryover; a second pass is not an independent comparator.
5. Present source and target images together. For each case record visible evidence, discrepancy/allowed difference/unknown, classification, confidence and what the image cannot prove. Do not read DOM/CSS as visual evidence or require exact pixels. Keep raw observations before scoring against the expected table.
6. Count correct control findings, false positives on allowed differences, misses, and unknowns separately. A missing capture is **not run**, not PASS or a model miss. Do not include C06/C07 in a binary defect metric. Record active preparation/review time separately from environment waiting, and state any unmeasured human/token/API cost.
7. Account for material findings through existing Issue/PR disposition. Synthetic mutations do not become product bug reports. Catalog insufficiency is not automatically an implementation defect. Preserve consuming requirements and unsupported claims as gaps.
8. Return evidence and limits to root #181. Choose among existing review sufficient, small optional supplement, further evaluation required, or do not adopt. Stop after this sample set unless a specific unresolved result justifies another case. No Skill, permanent CI, workflow requirement or new engine is authorized by a favorable self-review.

## Observation fields

Use a plain table in the experiment report: case; source/state; target screenshot and digest; raw visible observation; verdict; implementation/catalog/consumer/unknown category; expected outcome comparison; false positive/miss/unknown/not-run; incremental finding relative to baseline; active seconds; limitation/disposition.

No independent human baseline is currently available. Do not substitute the author's expectation table for measured human performance. Any recommendation must distinguish sample plausibility, same-agent demonstration, independently reproduced findings and real product benefit.
