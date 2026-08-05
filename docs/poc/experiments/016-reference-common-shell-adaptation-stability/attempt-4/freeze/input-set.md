---
type: PoC frozen input set
title: Next framework-adaptation inputs for the vNext common-shell contract
status: frozen for preflight; framework and Runs not selected
---

# Next framework-adaptation input set

## Responsibility boundary

| Input group | Owner | Canonical source | Integrity check |
| --- | --- | --- | --- |
| Approved runnable Reference and auxiliary Manifest | Reference | Commit `9cd19321e53f6279e956df8a6d1fe562c3360544`, tag `reference-common-shell-v0.1` | `../../attempt-2/check-fixed-input.ps1` |
| Product application facts | Product | Commit `c44c997f93fe989bc4902f49d4cb24a6850694bf` product blob inventory | `../../attempt-2/check-product-input.ps1` |
| Exact visual authorities: token, fixed SVGs, binding map, structural inputs, and existing common adaptation instruction | Attempt 3 | Commit `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff` visual-binding inventory | `../../attempt-3/freeze/check-attempt-3-input.ps1` |
| vNext contract prose, SVG rendering contract, Foundations candidate, validation definition, and their static checks | vNext contract | Commit `a3ef3fa680314a3b2721076698b13dbe97d0ead4` blob inventory | `check-attempt-4-input.ps1` |

The vNext inventory is [attempt-4-input-blobs.json](attempt-4-input-blobs.json).
Its Git blob IDs are authoritative for the vNext-owned inputs. The existing
Reference, product, and Attempt 3 inventories remain authoritative for their
respective owners; this preparation does not copy or replace them.

## Common adaptation instruction

Use [Attempt 3 adaptation instructions](../../attempt-3/adaptation-instructions.md)
verbatim as the common adaptation instruction. Read it together with the
vNext contract documents and all three owner groups above. It fixes neither a
framework nor an implementation structure. A future framework-specific
experiment condition, if authorized, must be a separately frozen input and
must not change these inputs.

## Source-of-truth order

1. Approved HTML, CSS, JavaScript, tokens, SVG assets, and binding map.
2. Natural-language contract and Manifest documents that refer to those
   sources.

The prose must not redefine visual values, asset geometry, or state mappings.
It can describe responsibility and adaptation boundary only.

## Dispatch prerequisite

Before any future Run, execute the Reference, product, Attempt 3, and Attempt
4 preflights from the isolated worktree. A pass proves identical inputs only;
it does not select a framework or authorize implementation or Run dispatch.
