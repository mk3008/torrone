# DatePicker Human Calibration Phase 2 screen review

## Verdict

`pass` for the approved operation and its independent Target. The review is not
a new design approval; it checks that Target follow-up preserved the already
approved task flow without reintroducing demo copy or interaction ambiguity.

## States reviewed

- initial two-boundary filter;
- Start-only and End-only completion;
- completed range reopened with connected range band;
- unavailable dates and the active availability boundary;
- invalid future input and local recovery;
- Tab, Escape, Close, keyboard selection, and explicit focus restoration.

The final screenshots are under
`output/date-picker-human-calibration-phase-2/20260814T070736Z/` for both the
approved Reference and the shipment Target.

## Realism and copy gate

| Copy | Classification | Disposition |
| --- | --- | --- |
| `Outbound shipment search`, `Departure window` | task identity | keep |
| earliest/latest labels and format hint | required field help | keep |
| availability sentence and local validation | state/error/recovery | keep |
| icon-only Clear/calendar/navigation/Close names | concise actions with accessible names | keep |
| Reference harness label | review-only | absent from Target; excluded in Reference |

There is no product-visible Contract, acceptance, scenario, or UI-teaching
copy in the Target.

## Interaction and accessibility

- One boundary selection completes in one click, closes the popup, and restores
  focus to the owning input.
- Reopening the completed range keeps the endpoint and interior states visible.
- Unavailable dates use native disabled state and do not reuse the range fill.
- Errors stay beside the responsible boundary and clear after correction.
- The two inputs remain the normal page Tab stops; integrated icon actions are
  named native buttons and remain reachable through the explicit picker model.
- The popup stays aligned with the boundary that opened it. No likely next
  target moves during one selection.

Screenshots support hierarchy, density, state visibility, and copy review.
Browser scenarios and raw reports—not screenshots—support keyboard, focus,
relationships, error recovery, and console/network claims. Real AT remains
unverified.

## Contract boundary

Do not promote the shipment copy, October dates, open-ended filter policy,
one-click range semantics, Sunday/Saturday colors, cutoff, exact widths, or
calendar implementation. The reusable review prompt is to check coherence
among visible controls, completion, valid partial states, availability, focus,
and visually opposing states.
