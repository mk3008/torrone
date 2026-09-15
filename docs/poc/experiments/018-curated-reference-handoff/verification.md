# PoC 018 — verification and review handoff

## Evidence boundary

Initial target implementation was committed as `71ce423e2f6b9f5e3f22b769f8f6c6b329d53761` before reading review infrastructure. Integration then read only `review/examples.json`, `review/index.template.html`, `tools/build-review.py`, and `docs/development-workflow.md` (plus the current README's review pointers). No historical experiment implementation or result was consulted. The date-only helper was subsequently extracted to support focused tests.

## Completed checks

Run from the repository root, with Node and Python 3.10+:

```sh
node tests/check-curated-handoff-dates.cjs
node tests/check-curated-handoff.cjs --static-only
node --check docs/poc/experiments/018-curated-reference-handoff/target/invoice.js
git diff --check
```

- Date tests passed: 21 accepted/rejected format cases, 6 date arithmetic boundaries, optional/partial and equal boundaries, future cutoff, reversed-range feedback, and recovery after editing/clearing the opposite boundary.
- Review packaging passed: the new entry is an implementation candidate in its own section, every selected HTML and explicitly included CSS/JS asset matches its source bytes and recorded SHA-256.
- Syntax and whitespace checks passed.
- The approved Date range executable remains Git blob `d2be91d512ac310cb306adfe0e9bfe556ec2bca8`; its curation entry is unchanged. No prior experiment output was edited.

## Browser verification not completed here

The standalone browser runner could not launch because Chromium was unavailable; the official Playwright browser download timed out. The environment's managed browser rejected the local review address (`net::ERR_BLOCKED_BY_CLIENT`). No browser behavior, screenshot, responsive-layout or real-device pass is claimed.

A focused reproducible browser check is included for an environment with Playwright and its Chromium installed:

```sh
node tests/check-curated-handoff.cjs
```

Make Playwright available through that environment's normal Node module resolution (or `NODE_PATH`). The script checks 1280, 390 and 320 px viewports, partial ranges, normalization, calendar-based invalid recovery, future and reversed constraints, range styling, Clear, focus return, dismissal, Tab, keyboard/month/year navigation, and generated bundle links. It leaves screenshots beside its disposable review bundle. This runner has **not passed in this environment** and needs execution before relying on those interaction assertions.

## Human review requested

Open the existing Torrone Reference Review surface and choose **Implementation candidates → Invoice issued-date filter — PoC 018**. The PR records the deployed snapshot revision and publication result.

Operate the candidate first without the original side-by-side:

1. Does each visible boundary read as one integrated operation? Is its relationship to the same Reference operation model recognizable?
2. Try earliest-only and latest-only dates, by typing and calendar selection. A single calendar choice completes only its owning boundary.
3. Enter an impossible date or reversed interval; correct it manually, choose a valid calendar date, or clear a boundary. Is the recovery path credible?
4. Try Clear, Escape, close, click outside, Tab/Shift+Tab and reopen. Are the active boundary and return focus understandable?
5. On a real phone, type first, then open the calendar. Does the keyboard recede, does the calendar sit immediately below the active boundary, and do completion and dismissal avoid reopening the keyboard?
6. Review local choices recorded in `handoff-notes.md`, especially tab-reachable actions and dependent-boundary revalidation. If those expose missing curation guidance, record that separately instead of changing the approved Reference here.

Human recognition, actual software-keyboard behavior, assistive technology, cross-browser behavior and design quality remain unevaluated. No score or approval is assigned. A later reviewer may inspect historical research; this implementation did not require it.

## Follow-up: real-phone keyboard obstruction

The owner tested snapshot `570d35ac6eb7d67bbf4aa2d5923de48760aa3ed2` in the ChatGPT-embedded review surface on an Android phone. The supplied screenshots (`Screenshot_20260916_075517.jpg` and `Screenshot_20260916_075524.jpg`) show the software keyboard covering the earliest-date editor. The owner also reported that the latest-date editor was completely invisible. This is observed usability failure, not approval; it supersedes the earlier lack of phone observations.

The candidate previously only dismissed the calendar when an input received focus. It did not reserve scroll space or reposition the editable control. The correction adds temporary bottom scroll space while a narrow-screen date field is focused, then brings that field's label/editor to the top. Bounded retries accommodate keyboard animation when the embedding host does not deliver a child viewport resize; viewport resize events also recheck the current input. Moving focus to calendar/Clear/elsewhere cancels retries and removes the space. Desktop behavior and the approved Reference are unchanged.

`node tests/check-curated-handoff-entry.cjs` passes checks of both fields, delayed opening without resize, resize handling with/without VisualViewport, switching fields, blur/calendar cleanup, and desktop isolation. The existing date and packaging checks also pass. These are event-level tests, not a real browser/keyboard simulation. The initial browser-verification limitation remains; confirm the corrected display on the same phone after reopening the updated review surface.
