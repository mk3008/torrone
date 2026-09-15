---
type: PoC reference
title: Reference-first common shell
status: proposed for human review
source: authored from selected reference evidence
---

# Reference-first common shell

This small, browser-readable PoC tests a reference-first delivery path for a
shared application shell. It deliberately keeps the existing Design Manifest
and its three-run experiment workflow intact. It is not a replacement
Manifest, component library, starter application, or framework adapter.

The visual and interaction reference is Attempt 23 Run 1, selected by the
product owner after the completed three-run experiment:

- [selection record](../012-common-shell-variability/attempt-23/selected-common-shell.md)
- [selected source](../012-common-shell-variability/attempt-23/runs/run-1/index.html?drawer=open&theme=light)
- [reference contract](reference-contract.md)

## View the reference

Open [index.html](index.html?drawer=open&theme=light) directly in a modern
browser. No server, package installation, external asset, or build step is
required.

Use the left Header control to hide or reveal the Drawer. The resulting URL
also records the state, so these URLs can be opened directly:

- [Drawer visible](index.html?drawer=open&theme=light)
- [Drawer hidden](index.html?drawer=hidden&theme=light)
- [Dark palette](index.html?drawer=open&theme=dark)

The right Header control toggles the demonstration palette. The navigation
search, disclosure control, current location, and long neutral workspace make
the shell's ordinary states and its independent Drawer/workspace scrolling
inspectable. They are illustrative fixtures, not product requirements.

## What this PoC asks a reviewer to copy

Observe the shell as a relationship: a persistent application Header, a
clearly controlled Drawer that leaves no empty track when hidden, and a
separately scrolling workspace. Use [reference-contract.md](reference-contract.md)
to decide which observed characteristics are invariants, defaults, parameters,
or implementation freedom. Do not copy this page's DOM, CSS, literal labels,
or JavaScript simply because they are visible.

## Verification

Run the repository-local, non-destructive check from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File docs/poc/experiments/015-reference-first-common-shell/check-reference.ps1
```

The check verifies the reference files, direct-view state URLs, required
semantic landmarks and controls, state metadata, absence of external
references, and the documentation boundary. It does not assert pixel equality
or claim a framework implementation is conformant.
