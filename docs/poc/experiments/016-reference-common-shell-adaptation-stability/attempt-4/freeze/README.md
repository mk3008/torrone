---
type: PoC frozen-input preparation
title: Framework adaptation experiment — vNext contract input freeze
status: prepared; adaptation implementation and Runs not started
source: approved Attempt 3 evidence and vNext candidate revision a3ef3fa
---

# vNext contract input freeze for the next framework-adaptation experiment

## Issue

The next experiment needs every isolated Run to receive the same approved
Reference, product facts, exact visual authorities, and vNext prose without
depending on checkout line endings or an individual worktree's byte layout.

## Customer and value

Reviewers can distinguish an actual input change from a CRLF/LF checkout
representation before any framework implementation begins. Future Runs can
therefore compare adaptation results against one identifiable input set.

## Acceptance and evidence

| Acceptance criterion | Verification method | Evidence |
| --- | --- | --- |
| Ownership of every input is explicit. | Inspect [input set](input-set.md). | Responsibility boundary and upstream inventories. |
| vNext prose cannot drift silently. | Run [portable preflight](check-attempt-4-input.ps1). | `a3ef3fa` blob inventory, Git diffs, and untracked-root check. |
| Checkout representation is not treated as content drift. | Run [isolated canary](run-preflight-canary.ps1). | [Canary record](canary-record.md). |
| Reference, product, and Attempt 3 visual authorities remain protected. | The portable preflight invokes their existing preflights unchanged. | Existing upstream preflight results. |

## Scope in

This preparation identifies and validates inputs only. It does not choose or
install a framework, create an adaptation implementation, dispatch a Run, or
change the approved Reference, product contract, tokens, SVGs, binding map, or
historical artifacts.

## Scope out

Technology neutrality and reproducibility are not claims of this preparation.
They will be evaluated from the resulting artifacts of a later
framework-adaptation experiment.

## Ledger snapshot

| Field | State |
| --- | --- |
| Goal | Prepare portable, identical inputs for a later framework-adaptation experiment. |
| Now | Inventory, portable preflight, and isolated canary are prepared. |
| Next | Obtain a separate authorization before selecting a framework or dispatching any Run. |
| Blockers | None for input preparation; implementation and Run dispatch are intentionally out of scope. |
| Evidence ready? | Yes after the recorded canary and regression checks pass. |

## Risks

The preflight proves source identity and fixed-input integrity. It cannot
prove a framework's rendering behavior; that evidence must come from the next
experiment's implementations and browser review.
