---
type: PoC handoff
title: Manifest-based design experiment checkpoint
status: paused
source: authored
scope: Current repository state before any later methodology or delivery-model change.
---

# Goal

Preserve the current docs-first UI Design Manifest work as a checkpoint. This document records the existing Manifest-oriented method, evidence, and open work without promoting a new methodology or repairing historical output.

# Now / Next

The repository is paused on `main` at the checkpoint commit created with this document. The latest common-shell work is incomplete: it has frozen three-run evidence through Attempt 34, but no accepted final human-review gate.

Before any later work, decide whether to continue the existing three-run reproducibility method or explicitly adopt a different delivery workflow. Do not rewrite, delete, or selectively repair preserved Runs to make an older comparison look successful.

# Current Manifest structure

The distributable business-app example is rooted at [`templates/business-app/design-manifest/index.md`](../../templates/business-app/design-manifest/index.md). It contains foundations, components, screen patterns, flows, policies, finite configuration definitions, and `variability.md`. The profile at [`profile/ui-profile.md`](../../profile/ui-profile.md) defines the Markdown/OKF-compatible structure and source-independence boundary.

The Manifest owns reusable guidance. The application prompt and product binding own product-specific facts. Implementation owns HTML, CSS, JavaScript, runtime behavior, and concrete delivery mechanics.

# Current generation and verification flow

The existing authoritative experiment flow is:

1. Review and revise reusable Manifest guidance with `manifest-review`.
2. Freeze a Manifest snapshot, full prompt, binding/fixture, model, viewport, and capture command.
3. Generate three independent Runs from that same frozen input.
4. Preserve generated HTML/CSS/JS unchanged; capture fixed PNG states and run narrow static checks.
5. Review all three artifacts against the frozen Manifest and observation contract.
6. Classify findings as `manifest-gap`, `prompt-gap`, `fixture-gap`, `observation-gap`, `non-conformance`, or `allowed-variance`.
7. Change inputs only when the classification calls for it; then create a new full three-run Attempt. Do not repair an individual Run.
8. Open a concise human-review HTML report only after mechanical gates and in-scope correction loops complete.

The durable protocol is [`three-run-reproducibility-protocol.md`](experiments/three-run-reproducibility-protocol.md) and the operational description is [`manifest-quality-workflow.md`](experiments/manifest-quality-workflow.md).

# Human-approved decisions and durable evidence

| Decision or evidence | Location | Status |
| --- | --- | --- |
| Static HTML review for Drawer, Search Grid, and Search Card | `docs/poc/experiments/009-standard-pack-static-html-review/attempt-1/` | Human-reviewed; already tracked. |
| Business workflow static HTML review | `docs/poc/experiments/010-business-workflow-static-html-review/attempt-1/` | Human-reviewed; already tracked. |
| Selected common-shell reference: Attempt 23 Run 1 | `docs/poc/experiments/012-common-shell-variability/attempt-23/selected-common-shell.md` | Product-owner selection; included in this checkpoint. |
| Customer-search comparison Attempt 23 | `docs/poc/experiments/013-customer-search-common-shell-variability/attempt-23/` | Human-reviewed; already tracked. |
| Customer-create comparison Attempt 10 | `docs/poc/experiments/014-customer-create-common-shell-variability/attempt-10/` | Human-reviewed; already tracked. |

# Stable knowledge and observed failure examples

The current Manifest accumulated reusable guidance for Header/Drawer ownership, Drawer navigation search and disclosure, separate scroll regions, bounded and fluid workspace panes, local Grid horizontal scrolling, semantic Light/Dark palette roles, focus treatment, and the boundary between generic guidance and product-owned facts.

| Attempt | Observed result | Classification or consequence |
| --- | --- | --- |
| 29 | Run 2 did not preserve independent Drawer/workspace vertical scrolling. | Preserved three-run non-conformance; human gate not opened. |
| 30–33 | Frozen reruns and capture/observation work exposed incomplete shell, capture, and evidence paths. | Historical learning evidence; no selectively repaired Run is accepted. |
| 34 | Screenshot capture succeeded, but visual review found Run 2's Dark Header icon glyphs absent despite visible button boundaries. | Incomplete evidence; not human-approved. |

# Checkpoint classification

## Included in this checkpoint

- Current tracked Manifest, profile, README, prompt, and static-check changes.
- Current workflow and three-run protocol documents.
- The business-app implementation-constraints example and iconography foundation.
- Common-shell Attempt 23, including its selected-reference record.
- Common-shell Attempts 29–34 and their frozen inputs, generated Runs, capture records, comparison pages, reports, and focused check scripts.
- This handoff document.

These files contain accepted reference evidence, explicit experiment decisions, or the latest incomplete evidence needed to start a new frozen Attempt.

## Left uncommitted intentionally

| Path or group | Reason |
| --- | --- |
| `docs/poc/experiments/012-common-shell-variability/attempt-4` through `attempt-28` | Earlier exploratory and reproducible intermediate runs; not the selected reference or current active evidence chain. |
| `docs/poc/experiments/013-customer-search-common-shell-variability/attempt-*` beyond tracked evidence | Reproducible intermediate variability runs pending a separate retention decision. |
| `docs/poc/experiments/014-customer-create-common-shell-variability/attempt-*` beyond tracked evidence | Reproducible intermediate variability runs pending a separate retention decision. |
| `tests/check-common-shell-navigation-scroll-variability-attempt*.ps1`, `tests/check-customer-*-variability-attempt*.ps1` | Attempt-specific intermediate checkers whose outputs are not in this checkpoint. |
| `shell.css`, `shell.js` at repository root | Purpose and ownership are unconfirmed; neither file is deleted or committed. |

## Ignored and excluded from version control

`.gitignore` already excludes `.env`, `.env.*`, `node_modules/`, cache directories, logs, `tmp/`, browser automation state, coverage, and common build outputs. No secret, credential, private key, or token file was found in the working tree during this checkpoint inspection. No `.gitignore` change is needed for the observed files.

# Open questions

- Whether to retain, archive externally, or remove locally preserved earlier variability Attempts after a separate evidence-retention decision.
- Whether root `shell.css` and `shell.js` are reusable artifacts, local prototypes, or obsolete; their owner must decide.
- Whether to continue Attempt 34's quality-experiment line. Any changed Manifest or prompt requires a new frozen input and full three-run rerun.
- Whether a future workflow should permit self-repair for consumer delivery. That decision is intentionally outside this checkpoint.

# Verification methods

- Reviewed repository guidance, README, profile, protocol, workflow, and selected experiment records.
- Recorded branch, HEAD, unstaged diff, untracked paths, experiment counts, and `.gitignore` coverage before staging.
- Searched common secret-bearing filename patterns without finding a secret artifact.
- Did not delete, reset, stash, rebase, or regenerate any existing artifact.

# Attainment status

`partial` — existing Manifest-based design work is preserved, but the latest common-shell quality evidence has not completed its human-review gate.

# Outcome

A future maintainer can distinguish approved evidence, current incomplete three-run evidence, reproducible intermediate material, and unowned files without treating an unfinished output as a successful design result.

# Why it matters

This checkpoint prevents past human decisions and diagnostic evidence from being lost while avoiding a misleading retroactive repair of generated Runs.
