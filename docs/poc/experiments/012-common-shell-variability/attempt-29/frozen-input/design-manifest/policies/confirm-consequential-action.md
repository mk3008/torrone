---
type: UI Policy
title: Confirm consequential action
description: Ask for an explicit decision only when a supplied action has a material consequence.
status: draft
source: authored
scope: Consequential record and workflow actions.
requires:
  - components/confirmation
---

# Guidance

Do not add confirmation by default. Require it when the product declares a
material consequence, limited reversibility, or a meaningful risk of accidental
activation. The confirmation must name the action and consequence, preserve a
safe cancellation path, and prevent repeated submission while pending.

Use product impact and reversibility to select confirmation strength. A routine
save does not become safer merely because a generic `Are you sure?` step was
added. Destructive actions also follow the stricter
[destructive-action policy](confirm-destructive-action.md).

# Product boundary

The product owns impact, reversibility, permissions, retention, dependencies,
acknowledgment, execution, outcome, and audit requirements.
