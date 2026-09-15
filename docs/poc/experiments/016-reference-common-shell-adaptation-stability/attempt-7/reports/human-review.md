---
type: PoC human review decision
title: Attempt 7 hover responsibility decision
status: accepted
source: human review
---

# Decision

Human review accepts the Attempt 7 outcome for the observed navigation-row
hover issue.

The durable priority is the responsibility split:

1. Theme YAML owns configurable semantic color parameters.
2. Manifest prose owns the observable interaction nuance: an enabled,
   non-current row changes its complete hit-area surface on pointer hover and
   remains recognizable apart from current or selected state.
3. The runnable Reference demonstrates a minimal interaction example without
   becoming the normative implementation or a product component library.

## Accepted variation

Attempt 7 does not yet define an `interactive_hover_background` semantic role.
Consequently, the generated Runs' hover background and boundary treatments are
accepted as implementation variation when they satisfy the frozen observable
rule. They are not a new exact visual binding, and no Run is retroactively
changed to match the Reference's page-background-only hover rendering.

The existing interaction-foundations candidate may later promote a dedicated
hover-background role. If adopted, that work must define the semantic role in
the Theme colors configuration and its versioning/migration contract, assign
initial Light and Dark values, update the normative Manifest wording, and
regenerate a fresh independent comparison. It must not alter Attempt 7's
frozen runs or reuse this acceptance as proof of the future role.

## Scope conclusion

No dedicated hover-border role is accepted or required by this decision. The
current priority is the YAML/prose/Reference responsibility split, not exact
hover color or boundary values.
