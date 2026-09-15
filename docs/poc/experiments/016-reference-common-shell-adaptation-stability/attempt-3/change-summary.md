---
type: PoC change summary
title: Attempt 3 visual-binding scope summary
status: completed candidate preparation
source: authored
---

# Attempt 3 scope summary

## Exact items added

The candidate fixes one deliberately narrow Reference-owned set:

- two complete Light/Dark semantic token sets used by shell surfaces, readable
  content, borders, selection, active indicator, and focus;
- seven SVG assets for Drawer, theme, disclosure, and search states;
- Drawer/theme/disclosure state-to-asset mapping and rendered sizes;
- Header leading/logical-end, parent trailing, search leading, and active-row
  physical-start locations; and
- an exact visual-binding review gate separate from structural conformance.

## Text reduced instead of duplicated

The Attempt 3 Reference contract does not repeat literal colors, SVG path
data, icon dimensions, or detailed layout measurements in prose. Those exact
values now have one owner: `reference-owned/visual-bindings/`. The prose keeps
only scope, structural outcomes, deviation conditions, and implementation
freedom. This prevents a natural-language paraphrase from drifting away from
the asset source.

The existing approved Reference contract and global Manifest are preserved as
history and generic guidance. They are not rewritten to make old Attempt 2
results appear non-conformant.

## Freedom retained

The candidate still leaves DOM structure, component architecture, state
storage, CSS organization, file layout, routing, data loading, responsiveness,
animation, and test tooling to the implementation. Product-owned names,
navigation data, permissions, and fixtures remain outside the visual-binding
layer.

## Deliberately not done

No Attempt 3 Run, product-input change, Reference source edit, Manifest edit,
framework adaptation, or Page Pattern work was started.
