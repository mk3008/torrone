# DatePicker Human Calibration Phase 1 Screen Review

## Verdict

`ready-for-human-review` — no objective defect found that should prevent the intended calibration review. This is readiness evidence, not design approval.

## Review surface

- Single date and Date range remain separate responsibility-complete examples.
- Each page contains one visible product sample and one small, explicitly excluded review label.
- No scenario selector or new review application was added; normal operation exposes the required states.

## Visible-language classification

| Text type | Evidence | Assessment |
| --- | --- | --- |
| Harness label | `AI draft ... fixed review fixture` | Necessary to distinguish the review fixture from product UI; excluded from observations. |
| Task identity | `Required delivery date`, `Reporting period` | Short business-context headings. |
| Field support | One sentence per sample | Explains the task without narrating the implementation. |
| State/recovery | `No ... selected`, intermediate instruction, selected value | Necessary system state and next-step guidance. |
| Actions | `Choose date`, `Choose range`, `Clear` | Short and predictable. |

No visible sentence is implementation narration, Manifest explanation, or unnecessary demo copy.

## Interaction and accessibility readiness

- The trigger exposes and updates `aria-expanded`, controls a labelled dialog, and now toggles both open and closed.
- Opening moves focus to the first candidate day; arrow movement and Enter/Space completion are visible; closing and completion return focus to the trigger.
- Selected native buttons use supported `aria-pressed` state instead of unsupported `aria-selected` state.
- A fixed, fully labelled `aria-current="date"` fixture makes today available for visual and accessible review without pretending to use the system date.
- Clear returns the sample to its initial value and focus point, after which reselection is possible.
- The range intermediate instruction changes after the start date and remains visibly associated with the open picker.
- Existing bounded accessibility checks report zero issues across all observed states.

## Human judgment intentionally retained

The evidence does not decide whether the density, inline popup placement, popup width, selected/today treatment, or completion behavior is preferred. Those are the calibration subjects. Reverse range selection, richer calendar navigation, locale, timezone, disabled dates, responsive behavior, and real assistive-technology behavior are outside this Phase 1 boundary.

## Evidence limits

Screenshots confirm representative states at one viewport and one browser. They do not replace direct operation, keyboard review, responsive testing, other browsers, or real assistive technology. Human review must judge the samples separately before any Phase 2 correction or Target transfer.

