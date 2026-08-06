---
type: PoC framework-adaptation harness preparation
title: React framework-adaptation harness
status: prepared; common-shell implementation and Runs not started
---

# React framework-adaptation harness

## Purpose

This directory prepares the neutral execution surface for the next common-shell
adaptation experiment. It consumes the frozen Attempt 4 input set without
changing it. The harness deliberately contains no Header, Drawer, navigation,
visual token, SVG, or common-shell implementation.

## Contents

- [Experiment condition](condition/experiment-condition.md) fixes the environment,
  commands, viewport, capture URLs, and Run isolation rule.
- [Shared adaptation instructions](condition/shared-adaptation-instructions.md) is the
  future worker input. It does not authorize a Run by itself.
- [Harness](harness/) is the minimal React + TypeScript + Vite application.
- [Harness freeze](freeze/) contains the portable integrity check and canary
  evidence for this harness only; see its [canary record](freeze/canary-record.md).

## Scope boundary

This preparation supplies an empty React entry point and a query-driven theme
environment. It is not a reference implementation and it is not evidence that
the vNext contract is technology-neutral. That evidence must come from future
isolated framework-adaptation artifacts.
