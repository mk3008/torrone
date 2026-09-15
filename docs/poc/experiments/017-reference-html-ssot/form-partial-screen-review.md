---
type: human-facing business screen review
title: Form-heavy partial Reference and integrated Target review
status: accepted for Gate evidence
source: rendered normal, validation, review, edit-return, light, and dark states
---

# Review decision

The standalone form and integrated Target are suitable as bounded business-
application examples for this Gate. They are not complete applications and do
not imply a final transaction or navigation pattern.

# Task flow

The form presents one clear task: enter the required details, review them, and
return to edit if necessary. Field grouping, required markers, summary errors,
inline errors, and the final action row follow the user task rather than
demonstrating component varieties.

The review step is justified because it lets the experiment observe a
meaningful state change, confirms values before a consequential create action,
and provides a concrete Back-to-edit focus contract. It does not invent an
approval workflow or backend confirmation.

# Copy and action captions

- Page and section titles name the task directly.
- Introductory copy is one short instruction, not implementation explanation.
- Error copy tells the user what to correct and what to do next.
- `Review`, `Back to edit`, and `Create`/`Submit` are specific to the immediate
  action; `Cancel` is visually secondary.
- Reference-harness wording appears only in the excluded top strip. The Target
  has no Reference explanation or scenario control.

No demo-style status paragraph, architectural explanation, or invented
business metric appears in the product UI.

# Accessibility and interaction review

- Inputs have visible labels and required controls also use native `required`.
- The radio choices use a fieldset and legend.
- Validation is communicated by an alert summary, inline text, red border, and
  focus; it is not color-only.
- Invalid controls have stable described-by relationships and explicit
  `aria-invalid="true"`; correction removes stale invalid state.
- Invalid submission focuses the first invalid field.
- Review focuses its heading; Back to edit restores focus to the primary field.
- Keyboard focus rings remain visible in light and dark themes.
- Existing bounded contrast and unnamed-control checks pass.

# Visual integration

The form hierarchy remains readable both standalone and inside the shell. The
Target preserves shell/navigation behavior while using independently authored
form styles. Dark mode required a Target-local primary-action color correction;
the final rendered state passes the existing contrast check.

Validation adds content above the fields and can move the action row below the
viewport. This is acceptable here because focus deliberately moves to the
first invalid field and the page remains scrollable; preserving the submit
button's pointer position is not the next task in the recovery flow.

# Human-only finding

The first Reference and Target implementations both produced visible inline
errors but no summary because their helper emitted an empty `aria-invalid`
attribute. Differential comparison passed because the behavior matched. A
rendered-state review caught the missing summary, after which both sources were
corrected and fully reverified.

This is the strongest evidence from the review: a passing comparison proves
transfer, not that the Reference design is good. Human approval remains part of
the Reference authority boundary.

# Deliberate exclusions

- final create/submit behavior and persistence;
- cancellation outcome;
- backend or asynchronous validation;
- post-submit success/error state;
- navigation and routing;
- responsive, other-browser, and real AT review.

The date control uses browser-locale presentation while its review value is the
stored ISO string. That visible formatting choice remains a product-level human
decision and is not promoted as a reusable rule by this Gate.

