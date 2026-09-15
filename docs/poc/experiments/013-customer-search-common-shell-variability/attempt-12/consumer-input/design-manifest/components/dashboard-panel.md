---
type: UI Component
title: Dashboard panel
description: A bounded dashboard region for one supplied metric, queue, trend, or operational exception.
status: draft
source: authored
scope: Product-declared dashboard summaries.
requires:
  - foundations/accessible-work-surface
---

# Guidance

Give each panel one clear question to answer. Keep its title, value or content,
unit, time scope, comparison basis, and freshness visible when supplied.
Prioritize panels by task importance rather than filling an arbitrary grid.

Use a metric for a concise current measure, a queue for actionable work, and a
trend only when change over time matters. Provide a text or tabular equivalent
for important chart meaning, and never encode series, threshold, or status by
color alone.

Do not make the entire panel interactive when it also contains independent
controls. When drill-down exists, give it an explicit, binding-owned
destination and keep filters scoped to the panels they affect.

# Product boundary

The product binding owns metrics, calculations, units, time ranges, thresholds,
series, labels, freshness, alerts, queues, filters, permissions, destinations,
loading, empty, partial, stale, and failure states. Do not invent plausible
business values or claim real-time freshness.

# Implementation boundary

Panel size, grid placement, chart library, chart type, responsive packing,
animation, CSS, DOM, and framework are implementation decisions. This pack
adds no dashboard configuration.
