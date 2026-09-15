---
type: UI Component
title: Breadcrumb
description: Secondary navigation that identifies one page in a supplied application hierarchy.
status: draft
source: authored
scope: Full-page destinations with a stable hierarchy deeper than the global navigation.
requires:
  - foundations/accessible-work-surface
---

# Guidance

Use a breadcrumb only when a stable multi-level application hierarchy helps
users understand the current page. Place it below the global Header and
navigation and above the page title, aligned to the page content start.

List ancestors from the highest useful level to the direct parent. Each
ancestor is a link to its supplied destination. If the current page is included,
place it last, mark it current, and do not make it a link. Use the same concise
name as the corresponding page title. Use one product-wide policy for including
or omitting the current page; do not vary it screen by screen.

A breadcrumb represents hierarchy, not visit history. It does not promise a
return to every screen the user previously visited, replace global navigation,
or show progress through a wizard or transaction. Use an explicit Back or
return action when the task needs to restore a supplied origin, query, page,
selection, or scroll context. Do not show Breadcrumb and Back together by
default.

Use a navigation landmark and an ordered list so the hierarchy and current
position remain available to assistive technology. Separators are visual and
must not become unlabeled navigation items.

# Product boundary

The product binding owns whether a hierarchy exists, ancestor identities,
labels, order, destinations, the current page, and any separate return-context
behavior. Do not derive a hierarchy from browser history, route syntax, or
fixture nesting.

# Implementation boundary

Separator treatment, overflow and truncation, compact-width behavior, sticky
page-header mechanics, CSS, DOM details beyond required semantics, and
framework are implementation decisions. Breadcrumb is not local
configuration.
