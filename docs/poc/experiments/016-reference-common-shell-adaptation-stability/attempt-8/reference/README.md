---
type: PoC reference
title: Interactive common-shell behavior Reference
status: illustrative
source: authored from the Attempt 8 plan and current Manifest guidance
---

# Interactive common-shell behavior Reference

This deliberately small, browser-operable Reference illustrates two existing
common-shell behaviors: a Header controller changes Drawer visibility, and a
supplied parent row changes only its own disclosure state. It is experiment
material, not a reusable shell, product specification, component library, or
implementation starter.

## View and exercise

Open [index.html](index.html) directly in a modern browser. No server, package,
external asset, or build step is required.

Exercise this fixed sequence while reading the Observation panel:

1. Start with `Drawer: visible` and `Parent: collapsed`.
2. Activate `Close navigation`; observe `Drawer: hidden` and `Parent: collapsed`.
3. Activate `Open navigation`; observe the same Drawer body return with its parent
   still collapsed.
4. Activate the parent row; observe `Drawer: visible` and `Parent: expanded`,
   with the supplied child visible.
5. Activate the parent row again; observe `Drawer: visible` and
   `Parent: collapsed`, with the supplied child hidden.

The supplied leaf is a static navigation row. It has no disclosure control,
expanded/collapsed state, or child region.

## Responsibility boundary

### Normative Markdown

The current Manifest remains normative guidance for this experiment:

- [Header](../../../../../../templates/business-app/design-manifest/components/header.md)
  owns the available Drawer controller and the visible/hidden transition while
  preserving workspace content and task state.
- [Drawer](../../../../../../templates/business-app/design-manifest/components/drawer.md)
  distinguishes Drawer visibility from hierarchy disclosure, limits disclosure
  activation to the supplied parent's own state, and assigns no disclosure
  affordance to a leaf.

This Reference does not add, replace, or reinterpret either concept.

### Illustrative Reference behavior

The executable page makes only the two scoped state dimensions and their
independence easy to observe. The Observation panel is an experiment aid, not
a proposed product-shell region. Literal labels, visual styling, layout, and
control rendering are illustrative.

### Fixture data

[fixture.js](fixture.js) supplies neutral demonstration labels and the fixed
initial states. Those values carry no product identity, destination, route,
permission, persistence, or business meaning. A consuming product must supply
its own binding rather than reusing these labels or defaults.

### Implementation freedom

Consumers remain free to choose DOM structure, CSS, state representation,
event wiring, framework, file layout, and test tooling. Copying this page's
HTML, CSS, JavaScript, observation aid, or fixture is not required and is not
evidence of Manifest alignment.

## Non-goals

This Reference makes no claim about Escape behavior, focus management, Tab
order, assistive-technology announcements, responsive behavior, animation,
routes, current-destination updates, persistence, or production readiness.
