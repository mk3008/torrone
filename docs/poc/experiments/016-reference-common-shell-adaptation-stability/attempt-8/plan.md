---
type: PoC plan
title: Interactive Reference behavior transmission
status: active
---

# Issue

Attempt 7 established a visual-state rule, but it did not test whether a
minimal executable Reference helps independently generated implementations
reproduce bounded behavior without copying its internal implementation.

# Customer

Manifest authors and product implementers evaluating a common shell.

# Customer Value

The experiment will show whether Markdown, a small interactive Reference, and
a fixed product input can communicate two observable state transitions while
preserving implementation freedom.

# Acceptance Criteria

1. Existing normative Markdown identifies Drawer controller activation as a
   visible/hidden state toggle and identifies parent-row activation as an
   expanded/collapsed disclosure toggle.
2. The Reference demonstrates only those two interactions and remains a
   fixture-driven illustrative example, not a reusable implementation.
3. Each independent Run observes visible-to-hidden-to-visible Drawer state and
   collapsed-to-expanded-to-collapsed parent disclosure state.
4. Each Run observes that those state dimensions do not change one another and
   that a leaf has no disclosure behavior.
5. The unchanged three-Run set has focused browser evidence, applicable static
   checks, an artifact review, and a human-review packet.

# Verification Method

Freeze the complete input inventory, prompt, fixture, model, viewport, and
interaction sequence before generation. For every Run retain before/action/
after browser observations, console counts, and focused images or recordings.
Review the set against the frozen Manifest and contract without editing any
generated Run. Human review compares the live Reference and live Runs by their
observable state transitions only.

# Scope In

- Header-side Drawer visibility activation.
- Parent-row disclosure activation.
- The independence of those two state dimensions.
- One existing parent/child/leaf fixture and three independent React Runs.

# Scope Out

Escape behavior, focus-management design, Tab traversal, broad ARIA work,
responsive rules, animation, route semantics, current-destination updates,
new interaction configuration or DSL, reusable runtime, and component-library
work.

# Risks

- Existing Markdown may already be sufficient; a duplicated Manifest rule
  would weaken its ownership boundary.
- An executable Reference may leak fixture or implementation details into a
  Run unless the freeze and review packet make the boundary explicit.
- Browser capture can prove the selected state transition but cannot by itself
  decide whether the interaction model is meaningfully equivalent.

# Required Docs / Tests / Changeset

The Attempt needs a frozen input set, interaction contract, runnable Reference,
three untouched Run directories, capture records, artifact review, comparison
material, and a human-review report. No new package, runtime, validator,
configuration, or changeset is planned.

# Repository Evidence Plan

Repository evidence will show the existing Markdown responsibility, frozen
input identities, Reference boundary, Run-local implementation separation,
static checks, build results, and browser observation records.

# Supplementary Evidence Plan

Human review is required to operate the Reference and each Run and determine
whether the two state transitions have a meaningful behavioral mismatch.

# Open Questions

Whether interactive Reference improves behavior transmission remains
unconfirmed until all three untouched Runs and the human gate are complete.
