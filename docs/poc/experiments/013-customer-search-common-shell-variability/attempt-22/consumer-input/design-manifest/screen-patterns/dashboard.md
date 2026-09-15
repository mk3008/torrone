---
type: UI Screen Pattern
title: Dashboard
description: A prioritized operational summary composed from product-declared panels.
status: draft
source: authored
scope: Business users monitoring status and choosing the next task.
requires:
  - components/dashboard-panel
---

# Guidance

State the dashboard purpose, applicable time scope, and freshness. Put the most
important operational exceptions and actions before supporting summaries.
Limit the initial view to panels that help users understand status or choose a
next task.

Keep metrics, queues, and trends distinct. Use consistent units, time ranges,
series meanings, and filter scope. When panels are related, make the
relationship explicit; do not imply that one filter updates another panel
unless the binding supplies that behavior.

Show loading, empty, partial, stale, and failure states at the smallest useful
scope. Do not replace a detailed analytic workspace with an overcrowded
summary dashboard.

# Product boundary

Purpose, panels, priorities, data, calculations, freshness, thresholds,
filters, relationships, permissions, actions, destinations, and states are
product-owned.
