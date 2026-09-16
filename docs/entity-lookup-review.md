# Entity lookup correction — Issue #21

Based on main `26baca8` including PR #23's removal of historical PoC 018 from the active review surface. That boundary and the owner's Reference lifecycle edits are retained. Exact changed sources are identified by the implementation PR commit and generated review-build.json; earlier mobile review evidence is not evidence for this new version.

## Coverage

Policy source: [Entity lookup draft](../references/entity-lookup.md), proposed under Issue #21. Shared rules: [Application interaction requirements](application-interaction.md). No existing approved Entity entry was found. No application-wide policy is inferred from this fixture.

| Path and expected result | Regression coverage | Execution boundary |
| --- | --- | --- |
| ID/name filtering and either actual record committed | Browser: one filtered commit case per record; handler fixture retained | Real label click, checked radio and enabled Select asserted before confirmation |
| Empty results recover; query clears pending; replacement is exclusive | Browser: empty-to-results and replacement case | Native input/change delivery, no state injection |
| Cancel/Close/Escape retain committed value; reopening resets pending | Browser: separate case per exit | Real modal close/cancel and focus return |
| Clear empties parent and permits reselection | Browser: Clear/reselection case | Actual active element checked |
| Tab/Shift+Tab, radio arrows/Space, action Enter/Space | Browser: keyboard-only desktop cases | Chromium, Firefox and WebKit; no locator focus or event dispatch shortcuts |
| Fullscreen mobile result and footer operation | Browser: touch case at 390×640 and 390×400 | Chromium touch/viewport emulation, not a physical keyboard test |

## Browser Gate

The owner requested native browser coverage in [PR #24](https://github.com/mk3008/torrone/pull/24#issuecomment-5706158971). `tests/browser/entity-lookup.spec.cjs` loads the unchanged Reference through HTTP and operates actual native controls. `.github/workflows/entity-lookup-browser.yml` runs the handler check and browser tests for PRs and main, with zero retries and retained HTML reports plus failure traces/screenshots. A checked radio paired with a disabled Select fails before any attempt to confirm. This is an operation-regression Gate, not human design approval or a repository branch-protection change.

Reproduce from `tests/browser`:

```sh
npm ci
npx playwright install --with-deps chromium firefox webkit
npm test
```

Playwright is a pinned, test-only dependency in this directory; the Reference remains buildless. The configuration serves only `review/references`. The workflow follows [Playwright's CI setup](https://playwright.dev/docs/ci-intro). Execution results belong to the exact PR commit's Actions check and its report artifact, not the presence of this test file.

The active Work browser's Issue #5 local-preview URL-policy block remains unchanged; no local workaround is used. CI executes the regression suite in its own runner. Viewport resizing does not reproduce a phone's software keyboard, browser chrome, IME or embedded host: actual-device footer/results visibility with the keyboard open remains a human-review item. Passing native browser regressions does not approve this draft. At the modal document boundary, native traversal may visit browser chrome (the page reports BODY as active) before re-entering; the keyboard test permits this single neutral step but still requires the next control to be Close/Select and rejects focus on background page controls. The first browser run exposed an overly strict immediate-wrap assertion, not a requested custom focus trap; native behavior remains unchanged.

## General policy finding

This example supports a bounded rule: cheap local interaction semantics must work even when external I/O is mocked. A single two-record fixture suffices; no API or simulation framework is needed. The authoritative wording is proposed in references/README.md and remains subject to this PR's review. Harness guidance is conditional; no state-injection harness was needed or validated here. A harness-only transition must never stand in for this example's real filtering/confirmation.

No new unrelated GUI findings were opened. Actual-device keyboard visibility and human adoption remain explicit review limits of Issue #21.
