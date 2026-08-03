---
type: PoC frozen-input preparation
title: Reference common-shell adaptation stability — Attempt 3 input freeze
status: prepared; Runs not started
source: approved Attempt 3 visual-binding candidate
---

# Attempt 3 frozen-input preparation

## Issue

Attempt 2 reproduced the common-shell structure but did not bind the approved
visual decisions tightly enough. The approved `1d805e8` candidate supplies the
narrow exact visual layer. Before any new Run, it must be identified as the
same Git-canonical content in every isolated worktree.

## Customer and value

Reviewers and implementers can now establish that every Attempt 3 Run receives
the same approved Reference, product facts, visual bindings, instructions, and
validation. A checkout-only CRLF/LF representation cannot block that check,
while an actual input change can.

## Acceptance and evidence

| Acceptance criterion | Verification method | Evidence |
| --- | --- | --- |
| Every required input has one owner and canonical source. | Inspect [input set](input-set.md). | Ownership boundary and blob inventory. |
| Attempt 3 visual inputs cannot drift silently. | Run [portable preflight](check-attempt-3-input.ps1). | `1d805e8` blob comparison, Git diffs, and untracked-root check. |
| Text checkout representation is not treated as content drift. | Run the isolated [canary](run-preflight-canary.ps1). | [Canary record](canary-record.md). |
| No Run is dispatched during preparation. | Inspect this directory and `runs/`. | No Attempt 3 Run output exists. |

## Scope

This preparation freezes inputs only. It neither changes the approved
Reference, auxiliary Manifest, product contract, or Attempt 1/2 history, nor
creates an application implementation or starts a Run.

## Ledger snapshot

| Field | State |
| --- | --- |
| Goal | Freeze all Attempt 3 inputs after human approval. |
| Now | Input inventory, portable preflight, and isolated canary are prepared. |
| Next | Human reviews this freeze and explicitly authorizes any future Run dispatch. |
| Blockers | None for preflight preparation; Run dispatch is intentionally out of scope. |
| Evidence ready? | Yes; repository checks and canary evidence are recorded. |
