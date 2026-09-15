---
type: business screen review
title: Composite UI Reference candidate screen review
status: pass for bounded Gate use; not canonical UI acceptance
---

# Composite UI Reference candidate screen review

## Review boundary

Reviewed the rendered single-date, date-range, autocomplete, dialog-lookup,
Date family-sheet candidates, and the two independent Targets. This review asks
whether they behave like understandable business operations; it does not accept
them as production component designs.

## Findings

### Workflow and copy

- Date candidates expose choose, intermediate selection, completion, clear,
  and reselection without adding application workflow.
- Entity candidates distinguish immediate autocomplete selection from explicit
  dialog confirmation/cancel. The difference is operational, not decorative.
- Labels and actions use task captions (`Choose date`, `Choose range`, `Find
  location`, `Select`, `Cancel`, `Clear`) rather than instructional prose.
- No demo-only success banner or explanatory card was added. The only
  Reference label is visibly a harness and is excluded from observation.

### State and interaction

- Initial, open, partially selected, completed, empty/no-match, clear, and
  reopened states are visibly distinct where applicable.
- Focus rings are visible. Date ArrowRight movement, Space/Enter activation,
  autocomplete ArrowDown/Enter, dialog Tab/Enter, pointer activation, and clear
  paths are covered by browser scenarios.
- Completion closes the popup/dialog and returns focus to the initiator; the
  date negative proves that failure to close remains observable.

### Accessibility

- Labels, controlled-region relationships, expanded state, live status text,
  selected option/day state, dialog naming, disabled action state, and natural
  focus order are present.
- Disabled action contrast was corrected after a measured 4.27:1 failure.
- Autocomplete now maintains `aria-activedescendant` while focus stays in the
  combobox. The Core does not currently compare it, so source/human review owns
  this observation in this Gate.
- Bounded automated accessibility checks pass, but no real assistive-technology
  test was performed.

## Risks deliberately left open

- The fixed Date fixture shows one bounded week. It does not recommend month
  navigation, weekday headers, locale, timezone, unavailable dates, or calendar
  layout for a production DatePicker.
- The dialog and autocomplete show small fixed result sets. They do not define
  remote search, loading, pagination, or large-result behavior.
- Responsive layout, other browsers, and actual assistive technologies remain
  out of scope.

## Decision

The screens are adequate evidence for the granularity question. They do not
need human product approval before recording the Gate result because no
canonical UI is being adopted. Human design/accessibility review becomes
necessary if any candidate is proposed as a durable Library Reference.

