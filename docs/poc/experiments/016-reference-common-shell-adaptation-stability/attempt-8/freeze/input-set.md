---
type: PoC frozen input set
title: Attempt 8 interactive-Reference behavior transmission inputs
status: frozen input candidate; no Run generated
source: existing owner inventories plus accepted Attempt 8 Reference
---

# Attempt 8 frozen input set

## Freeze decision

Freeze the complete consumer-visible input set at repository commit
`3f5dbb754531e4c6576f5660f229fdf1c7abc960`. The exact machine-readable file
inventory is [input-inventory.json](input-inventory.json); the exact Run prompt
is [fixed-prompt.md](fixed-prompt.md); and the serial observation method is
[interaction-contract.md](interaction-contract.md).

No Manifest wording changed for Attempt 8. The current Header and Drawer
concepts already own Drawer visible/hidden activation, the independence of
Drawer visibility and hierarchy disclosure, complete parent-row disclosure,
and the leaf non-disclosure boundary. The complete applicable Manifest is the
46-file tree at `templates/business-app/design-manifest/`, Git tree
`1f493af6aaae09b6c89d35f46b45a0f8ac35ffce`.

The generation boundary uses the protocol's `greenfield-manifest` type because
no implementation fixture is reused. Attempt 8 adds one declared experimental
condition: a consumer-visible illustrative behavior Reference. This additional
input means the result must not be reported as Manifest-only generation. It is
not `composition-with-fixed-shell` because no Reference implementation bytes
are reused. The test subject is the complete Manifest, exact product prompt,
fixed product fixture and React harness condition, and the observable behavior
of the accepted Reference. The experiment measures behavior transmission, not
code reuse.

## Frozen owners

| Owner | Canonical identity | Consumer boundary |
| --- | --- | --- |
| Complete Standard Pack Manifest | Commit `3f5dbb754531e4c6576f5660f229fdf1c7abc960`; 46-file tree `1f493af6aaae09b6c89d35f46b45a0f8ac35ffce`; per-file Git blobs and SHA-256 values in `input-inventory.json` | Normative reusable design guidance. Header and Drawer are the focused behavior owners; the full snapshot remains applicable. |
| Accepted interactive Reference | `attempt-8/reference/` at the same commit; 5-file tree `c98218e35fe491fa7bd14113db135f31c427ef41`; per-file identities in `input-inventory.json` | Illustrative executable behavior only. A Run may operate it but may not copy implementation or neutral fixture details. |
| Product fixture | `attempt-6/freeze/product-fixture-input-blobs.json`, baseline `2b3ebb0128fc7bdf37d597f128b7bdefc2287363`; five owned files listed again in `input-inventory.json` | Sole authority for `Operations workspace` labels, order, hierarchy, capabilities, and initial Light/Drawer-open/Workspace-expanded/Overview-current state. |
| React harness boundary | `attempt-5/freeze/react-harness-input-blobs.json`, defining owner commit `e54d05742b7097bfe1e4670ebc1a8c83b2155e14`; 14 files listed again in `input-inventory.json` | Fixed React/Vite/npm/plain-CSS condition and byte-equivalent Run configuration. Application source remains independently implemented per Run. |
| Exact visual bindings and common adaptation boundary | `attempt-3/freeze/attempt-3-input-blobs.json`, baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff` | Existing exact token, SVG, binding, and structural authorities remain unchanged. |
| vNext layered and SVG contracts | `attempt-4/freeze/attempt-4-input-blobs.json`, baseline `a3ef3fa680314a3b2721076698b13dbe97d0ead4` | Existing contract prose and SVG rendering requirements remain unchanged. |
| Reproducibility protocol | `docs/poc/experiments/three-run-reproducibility-protocol.md` at the freeze commit; identity in `input-inventory.json` | Three independent untouched Runs, deterministic deviation routing, capture retry boundary, and human gate. |

All `attempt-*` relative paths in this document are below
`docs/poc/experiments/016-reference-common-shell-adaptation-stability/`.

### Source-of-truth order for every Run

1. Read the complete current Standard Pack Manifest as normative reusable
   guidance.
2. Read the Attempt 6 product fixture and product boundary as the sole product
   fact authority.
3. Read the Attempt 3 exact visual bindings, then the Attempt 4 vNext and SVG
   contracts, without copying either into a new owner.
4. Read the Attempt 5 experiment condition, shared adaptation instructions,
   and empty-harness boundary as execution constraints.
5. Read the fixed Attempt 8 prompt and interaction contract.
6. Only then operate the accepted Attempt 8 Reference as illustrative behavior
   evidence. Do not promote its neutral fixture or implementation structure
   above any preceding owner.

## Product and Reference boundary

The product fixture initial state is authoritative even though the illustrative
Reference begins with its neutral parent collapsed. Every Run starts from
Light theme, Drawer open, `Workspace` expanded, and `Overview` current. The
ten-step contract then establishes a collapsed before-state and observes the
required `collapsed → expanded → collapsed` cycle.

Runs may observe the accepted Reference's visible Drawer and parent-disclosure
transitions. They must not copy its DOM, fixture shape, JavaScript organization,
CSS, state storage, Observation panel, or file layout. In particular, the
Reference labels `Example workspace`, `Example group`, `Example child`, and
`Example leaf` and its collapsed initial parent are not product facts.

## Run and model policy

- Run count is exactly three.
- Each Run starts from a separate isolated worktree at the same freeze commit,
  derives only its assigned application directory from the canonical empty
  harness, and cannot inspect another Run or prior output.
- The user did not authorize a model override. Dispatch all three Runs with
  `model=configured-default` and `reasoning_effort=configured-default` by
  omitting overrides on the same host/configured profile. Record the resolved
  model and effort for every Run before implementation; stop before generation
  if the resolved values differ.
- Every Run receives the byte-identical `fixed-prompt.md` and this same frozen
  input set. Transport metadata and the assigned output path may differ, but
  they must not add implementation instructions.
- A Run is frozen after its first implementation and evidence handoff. Do not
  edit, regenerate, selectively replace, or compare a repaired outlier with
  untouched peers.

## Capture and evaluation

Every Run uses the exact ten-step sequence, `1440 × 900` viewport, Playwright
CLI `0.1.18` Chrome method, filenames, command-record requirements, stable
state checks, and retry boundary in `interaction-contract.md`.

The observation contract is additive. It does not replace any existing owner
preflight, harness comparison, structural or exact-binding check, typecheck,
production build, broader regression evidence, artifact review, or human
comparison. Mechanical evidence cannot decide meaningful behavioral
equivalence. Passing evidence never accepts a Run automatically.

## Existing preflight status and limitation

Carry the Attempt 7 preflight classification forward and re-run the checks at
this freeze:

- focused Reference, Attempt 3, product fixture, harness boundary, vNext, SVG,
  Standard Pack, Manifest workflow, and source-boundary checks are expected to
  pass when their owners are unchanged;
- Attempt 2 `check-fixed-input.ps1` is expected to remain not pass because its
  historical 52-file bundle pins the old auxiliary Manifest and reports the
  current `templates/business-app/design-manifest` tree as different;
- Attempt 4 and Attempt 5 composite preflights are expected to remain not pass
  only because they invoke that same nested historical Attempt 2 comparison;
  their focused owner roots and standalone checks must still pass; and
- a passing focused check does not convert a historical composite non-pass
  into a pass. Any new failure or different cause meets the stop condition.

The accepted Reference authoring report also retains its observation limit:
Playwright CLI rejected direct `file:` automation, so its final focused browser
exercise served the unchanged static files over local HTTP. Direct-file
operation was supported by source inspection rather than browser automation,
and no screenshot was retained in the repository. That accepted evidence
reported the fixed state sequence, leaf observation, and zero console errors or
warnings, but it does not prove later Run behavior or production readiness.
Attempt 8 Run capture uses the harness HTTP origin by design and does not erase
or reclassify that earlier delivery-protocol limitation.

No check is weakened, replaced, or newly generalized by this freeze. The final
results and exact observed causes belong in the freeze report.

## Dispatch boundary

This document freezes inputs only. It does not dispatch a Run, evaluate a
generated artifact, accept the Reference, or open the human gate. The
orchestrator must review the freeze report and decide the next workflow state.
