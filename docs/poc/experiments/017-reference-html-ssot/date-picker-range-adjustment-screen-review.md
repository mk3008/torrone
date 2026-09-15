# DatePicker Date Range Adjustment Screen Review

## Verdict

`ready for human calibration` — the candidate now presents a realistic
transaction-date filter rather than a hotel-style mandatory range. Each
boundary is a complete one-click DatePicker operation, and either one may remain
blank. No mechanical or task-flow blocker remains in the reviewed desktop
boundary.

## Task flow

- The primary task is evident from the page title and two boundary labels.
- Direct entry does not require opening the calendar.
- One date click commits the active boundary and closes; no hidden second-click
  mode remains.
- Start-only and End-only filters are visible, valid states rather than
  incomplete errors.
- Clearing End preserves useful Start context and supports recovery.
- Selecting both fields remains an explicit two-field workflow. Reopening the
  calendar provides range context but does not change the interaction mode.
- No submit, backend, or unrelated workflow action was invented.

## Copy and action captions

| Visible copy | Classification | Disposition |
| --- | --- | --- |
| `Transaction date filter` | task identity | keep |
| `Filter recorded transactions by date.` | required task help | keep |
| format and either-date-may-be-blank hint | required input help | keep |
| `Start date` / `End date` | field labels | keep |
| `Choose start date.` / `Choose end date.` | current popup state | keep |
| concise available-through/from-to sentence | availability and error prevention | keep |
| invalid, future, and reversed-range messages | validation and recovery | keep |
| fixed-review-fixture label | review harness | keep outside product observation |

There is no demo, Contract, acceptance-process, or UI-teaching copy in the
product boundary.

## Action inventory

| Action | Treatment | Rationale |
| --- | --- | --- |
| Start / End input | normal page Tab stops; focus opens; `ArrowDown` enters calendar | primary editable boundary controls |
| Clear | named native button outside sequential Tab order | value-local pointer/AT shortcut; normal text editing remains available |
| Calendar icon | named native button outside sequential Tab order | preserves the accepted Single one-stop field model |
| Enabled day | one roving grid stop; click/Enter selects and closes | one complete operation for the owning field |
| Disabled day | native disabled and not focusable | prevents future or reversed calendar selection |
| Month/year navigation | normal popup controls | calendar context movement |
| Close / Escape / input Tab departure | explicit dismissal paths | recovery without changing a value |

## Accessibility risks

- Positive evidence: two native text inputs, explicit labels, described format,
  local `aria-invalid`/error relationships, named buttons, disabled future
  dates, grid semantics, expanded ownership, focus restoration, and bounded
  accessibility pass.
- The Clear/calendar buttons are intentionally excluded from sequential Tab
  order, matching the accepted Single composition; direct input and
  `ArrowDown` remain the keyboard entry model.
- Weekend colors supplement weekday headings and column position. They are not
  the only cue.
- Endpoint and range-interior colors are not the only machine state: endpoints
  expose pressed state, the interior exposes selected cells, and a live sentence
  states the range.
- Range and unavailable states no longer share a filled tile. The selected
  interval has a connected blue band and circular endpoints; unavailable dates
  have transparent backgrounds, muted text, disabled semantics, and an
  availability sentence.
- `UNCONFIRMED`: real screen-reader announcements, browser/zoom variation, and
  small-viewport popup collision.

## Contract traceability

- The candidate is the executable observation SSOT.
- Twenty identities are authored for boundaries, controls, state text,
  availability, and navigation; five date identities are generated only for
  scenario evidence.
- No parallel expected-style document or per-cell metadata catalog was added.
- The verifier asserts state, focus, geometry, style, runtime, network, bounded
  accessibility, and frozen-source hashes without changing CLI/Core.

## Non-blocking judgment points

- Whether two independent fields, one atomic reservation picker, or one combined
  range field is preferable depends on whether both endpoints are required.
  This candidate chooses independent optional boundaries and does not
  universalize them.
- The range-status line identifies the active field; its exact wording remains
  human-reviewable.
- A custom picker at this behavior level is already a small application-like
  artifact. Reuse should favor the observed interaction contract, not copying
  this JavaScript implementation as a production component.
