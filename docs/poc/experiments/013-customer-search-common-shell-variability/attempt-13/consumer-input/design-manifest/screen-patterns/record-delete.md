---
type: UI Screen Pattern
title: Record delete
description: A separately owned destructive decision and execution state for one record.
status: draft
source: authored
scope: Single-record deletion.
requires:
  - components/confirmation
  - policies/confirm-destructive-action
  - flows/record-lifecycle
---

# Guidance

Begin deletion only from an available, permitted action associated with an
identifiable record. Keep the record visible or repeat a concise identity and
supplied consequence in a separate confirmation surface. Use an explicit
Delete action and a safe Cancel path.

If deletion is unavailable, omit it or show an adjacent product-supplied reason
according to the binding. During execution, prevent repeat submission. Show
failure with recovery; after success, move only to the supplied destination and
announce the outcome.

Do not require every record field in the confirmation. Do not promise undo or
typed confirmation without the applicable product capability and impact.

# Transition roles

This pattern receives `begin_delete` and provides `cancel_delete`,
`delete_success`, and `delete_failure`.

# Product boundary

Availability, permission, identity, consequence, impact, reversibility,
retention, dependencies, reason, execution, audit, outcome, and destination are
product-owned.
