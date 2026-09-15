---
type: Two-cycle self review
title: Reference HTML SSOT PoC self review
status: complete
source: post-verification review
---

# Cycle 1: Coarse Defect Extraction

## Potential Blockers

| Finding | Resolution |
| --- | --- |
| The CLI marked the harness root `hidden`, but the author rule `display: grid` kept its three buttons in the accessibility tree. The recorded root count falsely suggested successful exclusion. | The capture now temporarily applies `display: none !important` plus `aria-hidden`, restores prior inline/ARIA state exactly, and records the actual accessibility-tree node reduction. Initial observed buttons fell from 11 to 8 and 12 harness nodes were excluded. Every state now gates a positive node reduction. |
| The DevTools client sent a command before registering its pending response. A fast response could be dropped, causing an intermittent `Page.enable` timeout; failed startup also left the static server alive. | Pending requests are registered before send, browser/profile cleanup runs on failed startup, and the static server closes when browser startup fails. Three consecutive non-debug snapshots then passed. |
| Search changed the product region to Results or Empty while the visible Reference selector remained on Initial. | The product state renderer now synchronizes the harness selector. Updated screenshots show the matching pressed state. |

All potential blockers were resolved and the complete PoC verification reran
successfully.

## Potential Non-Blockers

- The frozen React consumer shares the vanilla implementation stylesheet. It is
  historical framework/DOM/state evidence, not independent CSS or current-
  Reference evidence.
- The one-file Reference is 979 lines. The user-facing change remained local;
  line count alone is not evidence that a split would lower correction cost.
- The old negative fixture still contains a dialog defect. It is intentionally
  bound to the frozen baseline and is not a current Reference recommendation.
- Human visual acceptance remains pending by design.

## Evidence Weaknesses

- Chrome at one desktop viewport is the only browser/environment evidence.
- In-app automation could not control the already-open `file:` page because of
  the browser safety policy. The directly openable page remains available for
  the human reviewer; automated evidence uses the CLI loopback server.
- The experiment has one screen pattern and no independent AI generation set.
- Assistive-technology output, responsive behavior, and independent CSS
  re-authoring remain unverified.

## Claim Overreach

The current report explicitly separates frozen transfer evidence from current
human-review evidence. It avoids claims that the old targets conform to the
three-state Reference, that the harness marker is a permanent profile, or that
CSS/framework independence is complete.

# Cycle 2: Blocker Triage And Shape Check

## Merge Blockers

None after the harness-exclusion and DevTools-race fixes. Human review was
accepted on 2026-08-12; that acceptance is recorded without promoting a
canonical format.

## Non-Blockers

- Local Git reports permission warnings while reading the user's global ignore
  file; the scoped experiment status remains observable and unchanged.
- No MCP adapter was built because the CLI/Core boundary already answers the
  current hypothesis and an adapter would add no new evidence.

## Evidence Shape Status

`pass` — reproducible evidence is in `verify.ps1`, current/frozen JSON reports,
source, and screenshots. The current gate covers all states, console/action
errors, stable-key inventory, bounded a11y, actual harness AX-node exclusion,
negative signatures, determinism, and external requests. `UNCONFIRMED` remains
visible for CSS re-authoring and other evidence limits.

## Reporting Shape Status

`pass` — the report leads with bounded capability gained, keeps adoption
partial, separates positive and negative evidence, names open questions, and
records human approval separately from the mechanical pass.

## Acceptance Criteria Review

| Criterion | Status |
| --- | --- |
| Prior evidence carried forward without inheriting Manifest structure | proven |
| Buildless, local, interactive Reference | proven from source and CLI browser use; in-app file-URL automation unavailable |
| Deterministic element/style/state/interaction/a11y CLI/Core | proven for selected properties and 11 current scenarios |
| Content-different vanilla application | proven only for the frozen earlier Reference |
| Content-different React application | partial and frozen: DOM/state/build proven; independent CSS and current conformance unconfirmed |
| Deliberate defects rejected | proven |
| Candidate/cost comparison | proven for semantic-only, minimal-key, and reasoned full-metadata rejection |
| Final boundary and adoption report | proven mechanically; bounded human review accepted 2026-08-12 |

## Required Questions

- **Which criteria are proven?** Prior-evidence use, bounded Reference operation,
  deterministic three-state capture, actual harness exclusion, frozen vanilla
  adaptation, frozen React DOM/state adaptation, negative detection, and
  candidate reporting.
- **Which are partial?** Full framework independence, direct file-URL evidence,
  current Target transfer and maintenance cost beyond one integrated queue.
- **What did human acceptance cover?** Business realism, the visual distinction
  of Initial/Results/Empty, harness visual weight, and current one-file
  reviewability. It did not cover Target transfer or CSS independence.
- **What wording would mislead?** “Framework-independent” without the CSS limit,
  “accessibility verified,” “pixel-equivalent,” “canonical,” or “replaces the
  Manifest.” None is used as a completion claim.

## Ready For PR?

`yes`, if presented as an experimental human-review packet with frozen transfer
evidence clearly separated. `no` for canonical adoption, current Target
conformance, existing-authority replacement, or MCP/product release.
