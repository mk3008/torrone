# Single Date Human Adjustment Two-Cycle Self-Review

## Outcome

`done` — the fourth adjusted candidate and its evidence were accepted by the
human reviewer on 2026-08-14 as the local basis for the Date range adjustment.
Two review cycles found and corrected the earlier defects and reviewed the
current-date fixture and compact-field delta.

## Cycle 1 — coarse defect extraction

### Corrected defects

1. The first full-month draft used disabled-date text with only 4.07:1
   contrast. The existing bounded accessibility check failed 406 occurrences
   across 35 states. The disabled text was darkened and the full preflight now
   has zero errors.
2. A pointer attempt on a disabled native day initially blurred the focused
   grid day and triggered the general focus-leave closure. Pointer hit testing
   now lands on the containing grid cell while the native button remains
   disabled. The popup stays open, selection stays empty, and the grid focus
   context remains observable.
3. A cancellation-line treatment made the many unavailable dates visually
   noisy, and a floating Close action sat outside the popup edge. The dates now
   use a quieter disabled surface/border treatment, and Close sits inside the
   calendar header.

### Potential non-blockers

- Automatic popup opening on input focus can be surprising in some products,
  but it remains an explicit human requirement and does not steal input focus.
- Clear and the calendar icon are both native named buttons but are excluded
  from sequential Tab navigation. This follows the single-stop combobox model;
  Clear remains redundant with normal text editing.
- The product example changed from a future delivery date to an expense
  transaction date so a future-date prohibition is not self-contradictory.
- The Reference grew from 271 to 487 lines during the second feedback round. The
  change remains local to one file but is strong complexity evidence.
- The third feedback round added six CSS lines and no JavaScript, stable
  identity, or scenario. The popup fell from 404 × 397.5 to 336 × 335.5 CSS
  pixels while retaining 34-pixel date targets.
- Weekend color could become color-only state communication if promoted too
  broadly. Here it only supplements fixed column position and weekday names;
  selected and disabled state styling takes precedence.
- A 336-pixel calendar is materially smaller at the acceptance viewport, but
  can still occupy a large fraction of a short or zoomed viewport. Responsive
  collision and reflow remain unverified, so no universal size rule is claimed.
- The previous fixed clock described September 14 as today while the review
  date was August 14. The underline was mechanically consistent with the
  fixture but misleading in human review. The fixed clock, default month,
  fixtures, validation boundary, and evidence now consistently use 2026-08-14.
- A Today button would need a stable consequence. Common implementations vary,
  and an optional Today action often selects the date rather than only changing
  the visible month. This round does not add the ambiguous action; reopen
  restores selection or fixed today instead.
- The full-width field implied an unknown-length value. Limiting the field
  group to the same 336-pixel width as the calendar better expresses the known
  date length and changes no interaction or metadata.

### Evidence weaknesses

The current Core does not capture the editable input's DOM `value`. It directly
observes invalid state, visible messages, live selected-date output, disabled
state, popup state, focus, and styles. Direct Reference-to-Target value
comparison remains unconfirmed.

The current-day cell is deliberately unkeyed. Its fixed source fixture,
generated `aria-current`/accessible name, and rendered underline are checked,
but the cell is not a first-class comparative Core element. Adding metadata to
all date cells for this local review cue was not justified.

Direct control of the existing in-app `file://` tab was blocked by browser
safety policy. Repository CLI/Core Chromium evidence and screenshots are
primary; live manual reload remains a human review action.

Real screen-reader, other-browser, responsive, locale/timezone, IME, paste-edge,
and backend-validation behavior are not covered.

## Cycle 2 — blocker triage and evidence shape

### Merge blockers

None. Human confirmation was received for this local Single date direction.
The adjusted Date range has its own separate human Gate.

### Non-blockers

- Direct input-value observation should be considered before Target transfer,
  after design confirmation.
- Weekend computed colors are not first-class Core observations. Adding new
  stable keys only for this local calibration would cost more metadata than the
  current source-and-render evidence justifies.
- The same limit applies to the unkeyed current-day cell; its visual and source
  semantics are verified without claiming Target comparison coverage.
- Date range was adjusted from this accepted basis and subsequently received
  its own human approval on 2026-08-14.
- The substantial Reference-size delta should inform later authoring guidance,
  but it does not justify file splitting, a framework, or abstraction yet.
- The fixed past-only business example proves disabled-date representation,
  not a reusable universal date policy.

### Evidence shape status

`pass`

- Final verifier parsed and passed 35 conformance states and 15 scenarios.
- Adjusted source hash matches the generated manifest.
- Both Phase 1 baselines and CLI/Core hashes remain unchanged.
- Runtime console errors, failed requests, and external requests are all zero.
- Harness exclusion, bounded accessibility, identity, Tab departure, month/year
  movement, disabled-date inertness, and stable action geometry checks pass.
- The one-pixel inline separator and 336-pixel popup geometry are asserted;
  representative screenshots show weekend colors without state conflicts.
- The field group is asserted at 336 pixels, and rendered evidence shows the
  August 14 current-date underline separately from selection and disabled state.
- Unchanged Phase 1 Single date and Date range baselines pass their separate
  regression at `20260814T025821Z`.
- Review HTML and all representative screenshot links resolve.
- External/network primitives are absent from the adjusted HTML.

### Reporting shape status

`pass` — repository evidence and the in-app-browser limitation are separated,
the input-value gap is explicit, and the later human acceptance is recorded as
a local decision rather than inferred from mechanical evidence.

### Required questions

- Proven: integrated editable field; input-only page Tab stop; Tab closure;
  month/year navigation; complete grid; disabled dates; manual validation;
  pointer/keyboard selection; close and recovery paths; CLI/Core health.
- Partially proven: normalized field value and individual current-day semantics,
  because rendered/source evidence is direct but Core comparison is indirect.
- Human-dependent: full-month density, weekend palette, exact inline action
  order, compact size, absence of a Today shortcut, disabled-date styling, and
  visual acceptance.
- Misleading wording avoided: human-approved, production accessible,
  locale-complete, Target-equivalent, canonical, or final-Gate success.

### Ready for PR?

`no` — no PR was requested, and stage/commit/push remain out of scope.
