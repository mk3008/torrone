# Calendar-only scroll correction

Owner follow-up: tapping an editor must not scroll the page; opening its calendar should. They also reported a possible Start-to-End focus jump after an outside tap.

Removed the entire focus/resize retry helper and focus-dependent 100vh padding. Those changed geometry during manual entry and blur and could displace tap targets; this is a plausible contributor, not a confirmed reproduction of the phone symptom. No outside-tap handler explicitly selects End. Calendar opening now uses preventScroll for intermediate focus and explicitly reveals the owning boundary stack (label/editor followed by calendar header), never the calendar in isolation.

The prior entry test required behavior now rejected by the owner. Its replacement executes the actual focus, Enter and calendar-opening handlers: both fields, desktop/narrow, composition Enter, no manual scroll helper/padding, and calendar-only scroll. Recovery regressions still pass. Earlier reconciliation evidence and patches remain historical and are superseded for this scroll behavior.

Final Chrome pass at 390 CSS pixels: Start tap, outside heading tap and End tap keep scrollY=0 and body height=404. Outside taps leave body focused, never End. Opening End calendar changes scrollY to 120 and exposes the popup; owning label/editor/header top positions are 198/224/284px, all visible together. See scroll-correction.json and exact identity in scroll-correction-identity.json. Width fixture is not real phone/IME emulation; actual mobile keyboard behavior remains for owner review.
