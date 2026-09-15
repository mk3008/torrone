---
type: UI Component
title: Dialog
description: A bounded modal task surface with explicit focus and dismissal responsibilities.
status: draft
source: authored
scope: Product-declared modal tasks and confirmations.
requires:
  - foundations/accessible-work-surface
---

# Guidance

Use a modal dialog only when the user must complete, acknowledge, or cancel a
bounded task before returning to the underlying screen. Keep the dialog title,
purpose, affected object, and actions concise. Do not use a dialog as a generic
container for long navigation or an unrelated multi-screen workflow.

When opened, move focus to an appropriate element inside the dialog. Keep the
background inert and keep keyboard focus within the dialog until it closes.
Provide a visible Cancel or Close action, support Escape when dismissal is safe,
and return focus to the invoking control or the next logical target after close.
Do not rely on clicking the backdrop as the only cancellation path.

Place the primary action with its alternatives without changing their geometry
during pending or validation feedback. Avoid nested modal dialogs.

# Product boundary

The product binding owns whether the task is modal, its title, content,
actions, dismissal rules, pending and failure states, affected object, and
post-close target. A dialog does not create an action or permission.

# Implementation boundary

Width, height, animation, elevation, overlay color, CSS, DOM, and framework are
implementation decisions. The implementation must verify focus containment,
Escape behavior, inert background behavior, and assistive-technology support.
