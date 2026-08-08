---
type: PoC frozen input set
title: Approved hierarchy-observable product fixture for Attempt 6
status: frozen for preflight; React Runs not started
---

# Attempt 6 product-owned frozen input

## Purpose

This freeze promotes the human-approved fixture candidate at commit
`2b3ebb0` to the product-owned input for the next React adaptation experiment.
It makes parent, child, and non-parent top-level menu facts observable without
adding a product-owned visual specification.

## Frozen product input

The Git blob inventory in
[product-fixture-input-blobs.json](product-fixture-input-blobs.json) is the
authority for these candidate-source files:

- [fixture.json](../../product-fixture-vnext-candidate/fixture.json): labels,
  hierarchy, order, supplied initial state, search facts, and neutral main
  fixture.
- [product-input-candidate.md](../../product-fixture-vnext-candidate/product-input-candidate.md):
  the product ownership boundary.
- [preview/index.html](../../product-fixture-vnext-candidate/preview/index.html)
  and [preview/preview.js](../../product-fixture-vnext-candidate/preview/preview.js):
  an observation-only preview which loads the canonical fixture data.
- [check-fixture-candidate.ps1](../../product-fixture-vnext-candidate/check-fixture-candidate.ps1):
  the candidate consistency check.

The human decision is recorded in [approval-record.md](approval-record.md).
The candidate directory remains the source path; this freeze does not copy,
rename, or alter its contents.

## Responsibility boundary

| Input group | Owner | Authority | Check |
| --- | --- | --- | --- |
| Approved runnable Reference and auxiliary Manifest | Reference | Existing approved Reference input | `../../attempt-2/check-fixed-input.ps1` |
| Exact visual assets, structural inputs, and common adaptation instruction | Attempt 3 | Existing Attempt 3 input inventory | `../../attempt-3/freeze/check-attempt-3-input.ps1` |
| vNext contract prose and validation | Attempt 4 | Existing Attempt 4 input inventory | `../../attempt-4/freeze/check-attempt-4-input.ps1` |
| React runtime and execution harness | Attempt 5 harness | Existing harness inventory | `../../attempt-5/freeze/check-react-harness-input.ps1` |
| Labels, hierarchy, order, supplied states, and preview observation | Product | This freeze's `2b3ebb0` blob inventory | `check-product-fixture-input.ps1` |

Product input does not prescribe presentation. Layout, colors, indentation,
icons, control treatment, and hierarchy visualization remain Reference and
contract responsibilities.

## Dispatch prerequisite

Before a future Attempt 6 Run, run the product fixture preflight together with
the existing Reference, Attempt 3, Attempt 4, and React-harness preflights.
A pass proves only that all inputs are unchanged. It does not authorize a Run
or establish an adaptation result.
