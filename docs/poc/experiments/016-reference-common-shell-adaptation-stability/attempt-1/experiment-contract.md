---
type: PoC experiment contract
title: Reference common-shell adaptation stability
status: frozen
source: authored
---

# Experiment contract

## Question

Can three independent native-web implementations, given the same approved
Reference and frozen auxiliary Manifest, deliver a recognizably common
application shell with the required states and interactions without copying
the Reference's HTML, CSS, or JavaScript?

## Fixed inputs

| Input | Frozen location | Owner and boundary |
| --- | --- | --- |
| Approved Reference | `consumer-input/reference-common-shell/` | Reusable visual/interaction reference. Its source files are observable input, not copy-required implementation. |
| Auxiliary Manifest | `consumer-input/design-manifest/` | Exact snapshot of the existing business-app Manifest. It contributes reusable guidance and is not edited during this Attempt. |
| Application facts | `consumer-input/application-input-contract.md` | Fixed task-local facts, states, labels, and non-goals. It does not restate the Reference's generic design policy. |
| Review method | `review-contract.md` | Independent per-Run review criteria, classification vocabulary, and correction boundary. |

The baseline commit and Reference tag are recorded in [README.md](README.md).
The input inventory records the copied file paths and SHA-256 digests before
Run dispatch.

## Fixed implementation conditions

- Technology: browser-native HTML, CSS, and JavaScript only.
- No framework, package, CDN, external font, external icon asset, or build
  system is introduced.
- Each Run receives the same fixed inputs and starts from the same base commit.
- Each Run may inspect only the frozen inputs and its assigned output directory;
  it must not inspect another Run's output or reviewer materials.
- A Run implements the shell with its own ordinary DOM, CSS, and JavaScript;
  it must not copy Reference source text or make it a runtime dependency.
- The first implementation is saved unchanged before independent review.
- A reviewer may request a correction only for an implementation issue in that
  Run. Reference or Manifest gaps are recorded but not changed in this Attempt.

## Required application surface

Implement only the common shell supplied by the application input:

- application Header;
- Drawer and its visible/hidden transition;
- main workspace region;
- Light and Dark palettes; and
- the Reference-defined navigation, selection, disclosure, search, focus, and
  independent-scroll states necessary to observe the shell.

Do not implement another screen pattern, search result content, record creation,
real destinations, persistence, data loading, or a framework adapter.

## Initial and final evidence

For each Run, retain:

1. initial source files and initial static/browser verification;
2. the independent initial review and every finding classification;
3. correction count and correction record, when applicable;
4. final source files and final verification; and
5. a concise comparison note covering visual, semantic, and implementation
   differences from the other Runs after all outputs are available.

The initial three outputs are not overwritten. This experiment reports both
initial and final conformance because it measures a bounded consumer-adaptation
loop, rather than a Manifest-only raw-output reproducibility result.
