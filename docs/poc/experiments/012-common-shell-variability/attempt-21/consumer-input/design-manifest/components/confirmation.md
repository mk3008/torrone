---
type: UI Component
title: Confirmation
description: A pre-action decision surface that names a material consequence and a safe alternative.
status: draft
source: authored
scope: Consequential actions that require an explicit user decision.
requires:
  - components/dialog
---

# Guidance

Use confirmation before a material action only when an accidental choice would
be costly, difficult to reverse, or security-sensitive. Do not confirm routine
navigation, ordinary saves, or actions that are easy to undo.

Name the affected object and consequence. Use an explicit action caption such
as `Delete` when the consequence is destructive; do not use `OK` as the only
description of a consequential action. Keep Cancel as a safe, ordinary
alternative. Match the strength of confirmation to supplied impact and
reversibility; typed confirmation is reserved for high-impact or unusually
irreversible operations.

A pre-action confirmation is not a success receipt. After completion, show
product-supplied outcome feedback and next steps separately.

# Product boundary

The product binding owns the action, affected object, consequence,
reversibility, impact class, permissions, required acknowledgment,
confirmation copy, execution state, outcome, and destination. This component
does not authorize or execute the action.
