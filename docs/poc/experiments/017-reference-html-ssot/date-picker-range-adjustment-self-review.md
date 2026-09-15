# DatePicker Date Range Adjustment Self-Review

## Cycle 1: Coarse Defect Extraction

### Potential Blockers

None found after the final verifier run.

Earlier rendered rounds exposed the following blockers before the final run:

1. After choosing Start, the popup moved to the End anchor. This caused a large
   geometry shift during one selection operation. Popup ownership is now
   separate from range completion phase, and the verifier asserts unchanged
   popup x/y through the partial state.
2. Hover specificity replaced a selected endpoint's blue fill with a pale
   background while leaving white text. Unchanged bounded contrast detection
   failed. Pressed dates are now excluded from the general hover rule, and both
   readable computed colors and zero accessibility issues are asserted.
3. The first keyboard-completion scenario sent Space directly to the
   nonsequential calendar icon. The final scenario begins at the Start input,
   uses `ArrowDown` to enter the calendar, and completes the range from that
   actual keyboard path.
4. Two visible fields were combined with a hidden two-click range mode. After
   choosing Start, the popup remained open and silently changed meaning to End,
   so one click appeared not to finish. The final candidate treats each field
   as one complete DatePicker operation: one click selects and closes.
5. The pale range interior and filled unavailable-day tiles were too similar.
   The final candidate uses a continuous blue band with solid circular
   endpoints for the range, while unavailable dates have no filled background,
   muted text, native disabled state, and concise availability copy.
6. The first final-state draft directly observed only future unavailability;
   the opposite-boundary constraint was source-checked. One generated identity
   was added for the day immediately before Start so the End picker now proves
   disabled semantics, accessible reason, and transparent background without
   keying all calendar cells.

### Potential Non-Blockers

- Two fields use 608 pixels plus labels at the acceptance viewport; responsive
  behavior is explicitly outside scope.
- Direct input `value` is not captured by Core. The live selection state,
  rendered evidence, and interaction completion cover this candidate without a
  Core change.
- Only four calendar dates receive scenario identities. This is deliberate and
  avoids per-cell metadata.
- Exact range-status wording and the independent-boundary model require human
  judgment.
- The reservation-style two-click pattern remains legitimate when both dates
  are required. This filter-specific result must not be generalized to booking
  workflows.

### Evidence Weaknesses

- Headless Chrome is the only browser evidence.
- Bounded accessibility is not real assistive-technology testing.
- Source assertions support weekend styles and complete grid generation where
  additional observation keys would cost more than this calibration warrants.

### Claim Overreach

- Do not call the candidate accepted until the human review occurs.
- Do not claim a universal two-input Date range rule.
- Do not claim responsive, locale, timezone, production validation, Target
  transfer, or canonical Reference readiness.

## Cycle 2: Blocker Triage and Shape Check

### Merge Blockers

None within this uncommitted PoC handoff. No stage, commit, or PR was requested.

### Non-Blockers

- Human acceptance was subsequently `CONFIRMED` on 2026-08-14; this original
  adjustment review correctly stopped before that decision.
- Core's lack of direct input-value observation remains deferred and visible.
- Production component reuse and responsive placement need separate evidence.

### Evidence Shape Status

`pass` — a reviewer can open the candidate and inspect timestamped preflight,
snapshot, screenshots, source hashes, and three reproducible verifier commands
inside the repository. Repository evidence and untested human/production areas
are separated.

### Reporting Shape Status

`pass` — the result is described as mechanical review readiness, not final
adoption. Accepted Single, adjusted Range, frozen baseline, and unconfirmed
future work are named separately.

### Ready For PR?

`no` — this phase intentionally stops at human confirmation and the user did
not request staging, commit, push, or a PR.

## Required questions

- Proven: accepted Single preservation, one-click independent boundary
  selection, Start-only and End-only periods, completed range state,
  range/unavailable visual separation, focus/dismissal, compact geometry,
  bounded accessibility, identity, console, network, and baseline regression.
- Partially proven: manual value normalization is observed through live state
  and screenshots rather than a direct Core value property.
- Human-dependent: final visual/task-flow acceptance of this filter-oriented
  Date range model.
- Misleading wording: `accepted Date range`, `production-ready`, `responsive`,
  `AT-verified`, `universal`, or `canonical` would exceed the evidence.
