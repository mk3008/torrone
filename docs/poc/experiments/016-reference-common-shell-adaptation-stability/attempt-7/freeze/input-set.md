---
type: PoC frozen input set
title: Attempt 7 full-hit-area hover inputs
status: frozen-input candidate; no Run generated
source: existing owner inventories plus reviewed Manifest commit
---

# Attempt 7 frozen input set

## Freeze decision

The complete applicable Standard Pack Manifest is read from
`templates/business-app/design-manifest/` at reviewed commit
`d0363783a7897b754125eb6871904811d9b3b854` (`docs(manifest): define
full-row hover treatment`). The hover-specific reviewed source identities are:

| Source | Git blob |
| --- | --- |
| `templates/business-app/design-manifest/foundations/accessible-work-surface.md` | `4678a941c4ca8d39f8e82468ee979446c13c5b5c` |
| `templates/business-app/design-manifest/components/drawer.md` | `adcd262c058ed2bc77592681d544fceb7650638a` |
| `templates/business-app/design-manifest/variability.md` | `5e5efa16f43d439e0bea2311cf3daaa70d52f8c2` |

The commit, not a copied excerpt, is the Manifest authority. The first file
owns the cross-screen observable outcome and verification wording; the Drawer
file applies it to enabled, non-current navigation rows and separates it from
current-item treatment; the variability map keeps the concrete treatment
implementation-owned. No hover color, opacity, token, selector, DOM structure,
or framework mechanic is frozen here.

## Existing owner identities

| Input owner | Canonical source and identity | Existing check |
| --- | --- | --- |
| Approved runnable Reference | `docs/poc/experiments/015-reference-first-common-shell/` at commit `9cd19321e53f6279e956df8a6d1fe562c3360544`, tag `reference-common-shell-v0.1`; selected from `attempt-2/fixed-input-blobs.json` whose blob is `5c9a3abbbdc64064c581ae75949fe61cdce6d477` | `docs/poc/experiments/015-reference-first-common-shell/check-reference.ps1` |
| Exact visual bindings and common adaptation boundary | `attempt-3/freeze/attempt-3-input-blobs.json`, baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff`, inventory blob `16101cd90a5bcbee0cfceff24bbc2b24c72b460f` | `attempt-3/freeze/check-attempt-3-input.ps1` |
| vNext layered and SVG contracts | `attempt-4/freeze/attempt-4-input-blobs.json`, baseline `a3ef3fa680314a3b2721076698b13dbe97d0ead4`, inventory blob `d92410750d63ac76582d0c0912436e2f0adb7ef3` | `reference-contract-vnext-candidate/validation/check-next-contract-candidate.ps1` and its SVG checks |
| React condition and empty harness | `attempt-5/freeze/react-harness-input-blobs.json`, defining commit `e54d05742b7097bfe1e4670ebc1a8c83b2155e14`, inventory blob `66cbe4dcdc83b522389cfbcb2be8a18d76bc7126`; its recorded Attempt 4 upstream is `7431ce856c8bf461a9ce82b7328b5492f47decb3` | `attempt-5/freeze/check-react-harness-boundary.ps1`; the inventory remains the byte authority |
| Hierarchy-observable product fixture | `attempt-6/freeze/product-fixture-input-blobs.json`, product baseline `2b3ebb0128fc7bdf37d597f128b7bdefc2287363`, inventory blob `c35e140b1e2a26c4373b9ca6338282f82c01820b` | `attempt-6/freeze/check-product-fixture-input.ps1` |

All relative paths in the table are below
`docs/poc/experiments/016-reference-common-shell-adaptation-stability/` unless
shown from the repository root.

### Approved Reference subset

The Attempt 2 inventory also contains its historical auxiliary Manifest. For
Attempt 7, the approved runnable Reference subset remains byte-identical while
the reviewed Manifest commit above is the applicable Manifest authority.

| Reference path | Git blob at `9cd19321…` |
| --- | --- |
| `docs/poc/experiments/015-reference-first-common-shell/README.md` | `dc51b8ff48e2171b265c01cabeb9d71c17fe56b6` |
| `docs/poc/experiments/015-reference-first-common-shell/app.js` | `0bb72e0b4bebc1921726131b1929b5386dac73c0` |
| `docs/poc/experiments/015-reference-first-common-shell/check-reference.ps1` | `c87bf33d0df4c197a1cda2440a52d175d3cddad4` |
| `docs/poc/experiments/015-reference-first-common-shell/index.html` | `df40e304bdccf1a06a6dc4a4b6a0ff0bdda28462` |
| `docs/poc/experiments/015-reference-first-common-shell/reference-contract.md` | `267c388ecce48dc46fef10ce855b2ac27308599a` |
| `docs/poc/experiments/015-reference-first-common-shell/styles.css` | `06bb364cc5fa037888232558696285e7513144f6` |

This split does not copy Reference HTML/CSS/JavaScript mechanics into the
Manifest or this frozen contract. Reference rendering and exact visual
bindings remain their owners' authority; implementation structure remains a
Run freedom.

## Product fixture preservation

The fixed product input remains the five-file `2b3ebb0…` fixture inventory.
Its initial state still supplies `Overview` as current, `Workspace` expanded,
an enabled non-current top-level `Activity` destination, the existing labels
and hierarchy, and the existing Light/Drawer-open state. Attempt 7 introduces
no new label, route, permission, hierarchy fact, state, search fact, or visual
product requirement.

## Instructions for every later Run

Each of the three Runs must:

1. receive this same frozen input set, the same fixed product input, the same
   Run prompt, model, reasoning effort, and React experiment condition;
2. start independently from the frozen empty harness and receive no prior Run
   output, review, correction, or implementation fragment;
3. follow the existing source-of-truth and responsibility boundaries rather
   than copying the Reference DOM, CSS, or JavaScript;
4. render an enabled, non-current `Activity` navigation row so pointer hover is
   recognizable through a change to the row's full hit-area surface;
5. reject a text-decoration-only hover result and keep the hover treatment
   separately recognizable from the simultaneously visible `Overview`
   current/selected treatment; and
6. leave the concrete hover rendering, component structure, state handling,
   DOM, CSS, and framework mechanics to that Run.

These additions do not replace or relax any existing structural, hierarchy,
search, theme, focus, exact-binding, SVG, harness, build, or browser-observation
requirement.

## Existing preflight results at freeze time

| Existing check | Result at reviewed commit `d036378…` | Meaning |
| --- | --- | --- |
| Attempt 2 `check-fixed-input.ps1` | **not pass** | Its 52-file historical bundle includes the old auxiliary Manifest and reports only `templates/business-app/design-manifest` as different. This is the intended reviewed Manifest change, not Reference drift. |
| Reference `check-reference.ps1` | **pass** | The runnable Reference retains its required shell structure, behavior, and source boundary. A direct Git tree comparison also found the Reference directory unchanged from `9cd19321…`. |
| Attempt 3 `check-attempt-3-input.ps1` | **pass**, 24 files | Exact visual-binding inventory and provenance remain intact. |
| Attempt 4 `check-attempt-4-input.ps1` | **not pass** | Its own inventory stage reaches its nested Attempt 2 check, then inherits the historical-Manifest mismatch above. The vNext root is unchanged from `a3ef3fa…`, and its standalone static check passes. |
| Attempt 5 `check-react-harness-input.ps1` | **not pass** | It reaches nested Attempt 4 and inherits the same mismatch. The React owner roots are unchanged from `e54d057…`, and the existing harness boundary check passes. |
| Attempt 6 `check-product-fixture-input.ps1` | **pass**, 5 files | The approved fixture identity, hierarchy, and initial state remain intact. |
| vNext contract, SVG target, and SVG self-test checks | **pass** | Layered contract structure is intact; seven themed assets pass; the mask fixture is accepted and direct-image misuse is rejected. |
| Standard Pack and Manifest workflow checks | **pass** | Both business pack checks, source-boundary check, and the seven-phase Manifest quality workflow check pass. |

The non-passing composite checks remain recorded and are not silently waived.
This freeze adds no replacement validator. A passing focused owner check does
not convert the historical composite result into a pass, and this document
does not authorize Run dispatch.
