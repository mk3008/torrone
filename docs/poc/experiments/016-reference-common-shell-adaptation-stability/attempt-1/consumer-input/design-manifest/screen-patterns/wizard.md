---
type: UI Screen Pattern
title: Wizard
description: A declared linear multi-step form with bounded progress and review.
status: draft
source: authored
scope: Three-or-more-step linear business tasks.
requires:
  - components/record-fields
  - components/step-indicator
  - flows/wizard-progress
---

# Guidance

Use a wizard when a complex task has three or more stable, ordered sections
that users should complete progressively. Keep each step focused, identify the
current step and total, and provide a real heading for the current task.

Use separate Back and ordinary advance actions. `Next` or `Continue` may label
the advance role according to product language. Preserve entered values when
moving between steps. Before the final consequential submission, provide a
review step when the product requires users to verify supplied information.
Review shows supplied answers and Change destinations. Replace the ordinary
advance action with a supplied, consequence-specific final action such as
`Submit`, `Create`, or `Place order`; do not use generic `OK`.

Use `Preview` only when users must inspect a supplied rendering or generated
output. Do not rename ordinary answer review as Preview. Completion feedback is
separate from the pre-submit review and is not a pending progress step. After
submission, show the supplied success, pending, partial, or failure outcome and
next action without Back/Next controls. Failure must not be presented as
completion.

Do not force a nonlinear task into a wizard. If steps change materially based
on answers, the binding must supply the resulting route and progress meaning;
do not present a misleading fixed indicator.

# Product boundary

Steps, labels, order, questions, validation, branching, revisitability,
persistence, review content and Change destinations, advance and final action
labels, submission, outcome, recovery, and destinations are product-owned.
