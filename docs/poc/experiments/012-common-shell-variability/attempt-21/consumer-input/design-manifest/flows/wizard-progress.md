---
type: UI Flow
title: Wizard progress
description: Navigation, validation, review, and completion responsibilities for a declared linear wizard.
status: draft
source: authored
scope: Wizard screens with stable ordered steps.
requires:
  - screen-patterns/wizard
  - flows/screen-transition
---

# Guidance

Next validates the current supplied step before advancing. Back returns to a
supplied previous step without erasing accepted values. When direct revisiting
is available, the binding must define which completed steps are reachable and
how invalidated downstream answers are handled.

Keep review, final submission, and result separate. Review is the final
numbered step when it is supplied: it shows supplied answers and available
Change destinations. The final action is an explicit control on that review
screen, not another numbered step and not the ordinary advance action. Its
caption names the supplied consequence rather than generic `OK`.

After submission begins, prevent duplicate execution and expose a supplied
pending state when the result is not immediate. Only a confirmed success may
show a success completion screen. Pending, partial, and failure outcomes retain
the supplied identity, explain what happened, and provide only supplied retry,
recovery, monitoring, or exit destinations. The result state does not keep the
pre-submit step indicator or Back/Next actions.

Do not claim save-and-resume, branching, progress percentage, or recovery
unless the product supplies the necessary persistence and state model.

# Product boundary

Step transitions, validation, branching, persistence, invalidation, review,
final action, submission, pending state, outcome, recovery, completion, and
destinations are product-owned.
