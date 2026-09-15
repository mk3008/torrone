---
type: UI Policy
title: Confirm destructive action
description: Require clear intent before an irreversible record action proceeds.
status: draft
source: authored
scope: Irreversible actions initiated from the example record list.
requires:
  - policies/confirm-consequential-action
  - components/confirmation
---

# Guidance

Separate a destructive action from routine actions and name its consequence
before execution. Ask for confirmation when the outcome cannot be readily
undone. Preserve keyboard access, focus clarity, and a safe cancellation path.
Keep the affected record visible or identifiable, prevent repeat submission
while pending, and do not promise undo unless the product supplies a real
reversal or retention window.

Use typed confirmation only for supplied high-impact or unusually irreversible
actions. A medium-impact record deletion normally needs a concise identity and
consequence, an explicit `Delete` action, and `Cancel`.

# Unresolved

The business meaning of irreversible, post-delete destination, retention,
dependencies, audit behavior, execution state, and authorization checks belong
to the product requirements, not this example.
