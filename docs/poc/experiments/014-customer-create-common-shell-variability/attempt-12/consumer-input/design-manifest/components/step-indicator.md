---
type: UI Component
title: Step indicator
description: A progress summary for a declared linear multi-step task.
status: draft
source: authored
scope: Linear wizard flows with three or more stable high-level steps.
requires:
  - foundations/accessible-work-surface
---

# Guidance

Show a step indicator only for a declared linear process with three or more
stable high-level steps. Identify completed, current, and pending steps using
text or another non-color cue. State the current position and total, and keep a
real screen heading directly associated with the current step.

The indicator reports user work before the final submission; it is not
navigation unless the binding explicitly supplies revisitable steps and their
validation behavior. Keep Back and the ordinary advance action or final action
in a separate action group. When review is supplied, use it as the final
numbered step before submission.

Do not add `Complete`, `Success`, or `Result` as a pending numbered step merely
to predict a post-submission outcome. After the final action, remove the
indicator and show the supplied success, pending, partial, or failure outcome
as a separate state. A completion message may remain a real step only when it
is itself declared user work, such as a non-transactional onboarding step with
meaningful Back or Reset behavior.

Do not show a fixed step map when conditional answers can change the number or
meaning of future steps. A short two-screen task does not need an indicator.

# Product boundary

The product binding owns step count, labels, order, per-step completion,
current step, revisitability, validation gates, persistence, and conditional
branching. Transaction submission and its outcome are separate product
responsibilities. This component adds no wizard configuration.
