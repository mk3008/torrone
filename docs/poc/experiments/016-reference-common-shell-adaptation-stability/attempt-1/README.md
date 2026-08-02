---
type: PoC stability experiment
title: Reference common-shell adaptation stability
status: frozen-input preparation
source: authored
---

# Reference common-shell adaptation stability

This experiment evaluates whether a fixed approved common-shell Reference and
a frozen auxiliary Manifest can guide three isolated application
implementations toward the same common-shell design family. It is a consumer
adaptation experiment, not a revision of the Reference or Manifest.

The baseline is tag `reference-common-shell-v0.1` at commit
`9cd19321e53f6279e956df8a6d1fe562c3360544`.

## Frozen input

- [Experiment contract](experiment-contract.md)
- [Application input contract](consumer-input/application-input-contract.md)
- [Frozen input inventory](input-inventory.json)
- [Frozen input check](check-frozen-input.ps1)
- `consumer-input/reference-common-shell/` — exact local Reference copy
- `consumer-input/design-manifest/` — exact local snapshot of the existing
  business-app Manifest
- [Review contract](review-contract.md)

The chosen fixed implementation technology is native browser HTML, CSS, and
JavaScript. It is already used by the repository's static HTML experiments,
needs no package or build system, and permits each Run to choose its own normal
markup and styling approach without copying the Reference implementation.

## Evidence layout

Each Run preserves its first implementation under `runs/run-N/initial/`.
Independent review evidence is stored under `runs/run-N/review/`. If a reviewer
finds an implementation issue, the corrected implementation is stored under
`runs/run-N/final/`, preserving the first pass unchanged. Comparison and
human-review material are added only after all three Runs complete.

Do not change the Reference, the frozen Manifest snapshot, the application
input, or the review contract while this Attempt is active.
