---
type: PoC frozen input set
title: Attempt 3 common-shell adaptation inputs
status: frozen for preflight; Runs not started
source: approval record plus Git-canonical inventories
---

# Attempt 3 input set

## Canonical inputs

| Input | Owner | Canonical source | Preflight |
| --- | --- | --- | --- |
| Approved runnable Reference and auxiliary Manifest | Reference | Commit `9cd19321e53f6279e956df8a6d1fe562c3360544`, tag `reference-common-shell-v0.1` | `../../attempt-2/check-fixed-input.ps1` |
| Product application facts and browser-native harness constraint | Product | Commit `c44c997f93fe989bc4902f49d4cb24a6850694bf` blob inventory | `../../attempt-2/check-product-input.ps1` |
| Exact visual bindings, structural invariants, adaptation guidance, review and visual validation | Attempt 3 visual-binding | Commit `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff` blob inventory | `check-attempt-3-input.ps1` |

The Attempt 3 inventory is [attempt-3-input-blobs.json](attempt-3-input-blobs.json).
Its Git blob object IDs are the canonical content of every candidate file in
the approved commit. The inputs are not normalized or copied into a new design
contract.

## Common adaptation prompt

Use [adaptation-instructions.md](../adaptation-instructions.md) verbatim as
the common adaptation prompt. It directs each Run to read the fixed Reference
contract, visual-binding assets, unchanged product contract, and validation
before implementation. It permits reuse of fixed visual assets and product
fixtures, but requires independent implementation of DOM, component, state,
CSS, and file structure.

All three future Runs receive this same file, the same paths above, and the
same fixed application contract. They must not receive another Run's output,
review, or correction.

## Responsibility boundary

Reference-owned inputs answer the common-shell and generic guidance questions;
the product-owned contract supplies application facts only. Attempt 3
visual-binding-owned inputs specify the approved narrow exact visual subset,
the adaptation boundary, and how to validate it. The latter does not override
product labels or turn the Reference DOM/CSS/JavaScript into a copy contract.

## Dispatch prerequisite

Before a Run is created, execute all three preflights from its isolated
worktree. A passing preflight proves frozen-input identity only; it does not
authorize a Run automatically. Human authorization of the three-Run experiment
remains required.
