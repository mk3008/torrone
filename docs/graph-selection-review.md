# Graph selection and omitted Reads

Status: **draft**. Human design review is pending. No design adoption, production Viewer change, or merge is implied.

## Open and operate

Open `review/references/graph-selection-draft.html` directly in a desktop browser. It is a self-contained file with no build, external assets, requests, or saved data. It is also an entry in the existing `python3 tools/build-review.py` review bundle.

Select **業務設計**, choose a Read marked **Normally omitted**, then select **実装**. The temporary Read disappears; the selected target, graph and Detail should agree. Try both omitted Reads, the always-present Input-only relation and the business Exception. Compare **All lines**, clear and reselect.

The HTML is the review target. The PR records the source and verification, not a substitute for operating the Reference. Screenshots are evidence of individual states only.

## Source and responsibility

- [Viewer source revision](https://github.com/mk3008/alder_viewer/tree/394dafec1cab6823087a9d5954c9634a7eb7b446): README visual grammar, `fixtures/alder-sample-v1.json`, `src/main.ts` and `src/style.css`.
- The embedded subset retains the exact four nodes and six relations from the source fixture, including Japanese business text. There are two paired Reads, one Input-only, two Outputs and one business Exception.
- [Execution issue #32](https://github.com/mk3008/torrone/issues/32).
- [Application interaction requirements](application-interaction.md) and [Reference lifecycle](../references/README.md).

Alder owns kind, scope and relation meaning. Viewer owns application navigation and graph / Detail interaction. This Reference proposes one bounded executable operation; coordinates and rendering remain implementation choices. No approved graph Reference or separate approved whole-Viewer keyboard policy was found in the inspected sources. Existing Entity lookup and Chooser References are unrelated and unchanged.

## Preserve / May vary

Preserve independent Business / Object shape and scope color, selectable outside-scope nodes, matching selection across the diagram and Detail, reachable full captions, and temporary Read disclosure that resets on target change. Input-only and Exception remain visible. Business Exception is a return to a preceding business, not a UI error.

May vary: dimensions, radii, coordinates, edge routing, framework, DOM and internal state organization. Scope outside must not be interpreted as disabled or unnecessary. The candidate retains legibility rather than fading unrelated nodes; only irrelevant relation lines are de-emphasized.

## Proposed shared interaction choices

These are **candidates**, pending human review, not retroactive Viewer requirements:

- Native Tab / Shift+Tab traversal: display mode, View details, graph viewport, nodes, visible relation lines, output captions, and Detail controls. Enter / Space activate native buttons and relation paths.
- Node selection keeps focus on its initiating control. View details explicitly moves focus to the updated heading. This avoids involuntary movement when comparing nodes while offering a direct cross-region path.
- A relation selected from Detail replaces that region and focuses the new heading, avoiding focus loss when the old button is removed. Back to node restores its originating relation button. Direct graph selection keeps focus on the graph control.
- Escape and Clear selection remove graph / Detail selection and temporary Reads; focus returns to the selected node or originating node when available, otherwise to the graph viewport. Blank graph space clears without moving focus.
- Display-mode change clears selection and temporary state while leaving focus on the radio. The summary counts the temporarily visible line accurately.
- At narrow widths, the diagram remains an independently scrollable fixed canvas and Detail stacks below it. This is a reachability treatment, not evidence of mobile usability or an adopted responsive Viewer strategy.

The distinction between amber selection / relation endpoints and blue keyboard focus is a candidate so that focus can move without changing business kind or scope colors. A different whole-Viewer policy is a reason to revisit these choices before transfer.

## Boundaries and findings

- Addressed here: directly operable HTML, omitted-Read discovery, full captions, temporary-line count, selection reset and local focus recovery.
- Not pursued: auto layout, general graph library, editing, arbitrary import, pan / zoom, whole-Viewer 17-node density and large-graph performance. They do not answer this small transfer question; revisit only with a separately scoped consuming-product need.
- Pending human decision in #32: accept, revise or reject this bounded operation and the candidate keyboard / focus choices. Passing browser checks do not resolve that decision.
- Real mobile touch / software keyboard, screen readers and other browsers remain unverified. No external system is modeled.

## Verification

Evidence below separates local infrastructure failures from the successful GitHub Actions browser run. Run the focused regression with `node tests/check-graph-selection.cjs` (Playwright and Chromium available in the test environment); it writes screenshots and a JSON result under ignored `tmp/graph-selection-evidence/`.

### 2026-10-05 local execution attempts

| Source / path | Evidence and conditions | Result / gap |
| --- | --- | --- |
| Exact Viewer fixture subset | Embedded JSON compared with the four-node source subset | Passed: four exact nodes and six exact relations |
| Reference syntax / review bundle | JavaScript compilation, `git diff --check`, `python3 tools/build-review.py` | Passed; self-contained HTML copied without modification |
| Candidate state and recovery | `node tests/check-graph-selection-state.cjs` | Passed: both omitted Reads, target switching, Back, Clear, Escape, mode resets, repeated selection, Input-only / Exception retention and blank-canvas clear. Simulated handlers only. |
| Native interaction / rendered layout | `node tests/check-graph-selection.cjs`, Linux Chromium; ordinary and approved elevated execution attempted | Blocked before page load: environment rejected Chromium socket creation. Browser regression did not run. |
| Cloud-browser local review | File protocol and loopback URL attempted | Blocked by browser runtime URL policy. No bypass attempted. |
| Narrow / desktop screenshots and real keyboard traversal | No rendered Reference reached in the available test browser | Unverified. No screenshot or browser-pass claim is made. |

### 2026-10-05 browser verification

The subsequent [Graph Reference browser run](https://github.com/mk3008/torrone/actions/runs/37326476948) passed on source revision `322d9afbaca72dd0eabc9c2117dafea75f419dab`, using Playwright 1.58.2 and Chromium 145.0.7632.6 on Ubuntu. The HTML bytes are unchanged from `3f69fd9daaa3c7bfb12b52af6e2b1891b8df7499`: SHA-256 `f638d4146dd36f5f29fb42b841da7a1d4c08cf4e83836972c984db6d1b13fae9`.

| Candidate path | Browser evidence | Result / limit |
| --- | --- | --- |
| Node → Detail → either omitted Read → Back | Both paired Reads revealed separately; 4 → 5 → 4 rendered strokes; heading focus and return to originating relation button | Passed |
| Relation → different node / Clear / Escape | Temporary Read disappears, graph and Detail agree, focus returns to the appropriate node or viewport | Passed |
| Native keyboard across controls | Enter / Space activation, Tab / Shift+Tab between nodes, View details then Tab into Read, Escape recovery | Passed for the exercised paths, not a whole-Viewer keyboard policy |
| Order change and mode interruption | Repeated reselection, different source node, All lines / representative change, blank-canvas clear | Passed |
| Input-only and business Exception | Retained across target changes; distinct Exception description | Passed |
| Desktop 1440×1000 and narrow 390×844 | Five PNGs in the [browser evidence artifact](https://github.com/mk3008/torrone/actions/runs/37326476948/artifacts/11351813704); overview, omitted Read, Exception, narrow node Detail and narrow return inspected | Passed for these rendered states; narrow screen is not a real mobile-device test |
| Runtime | No page errors and no external requests from the standalone HTML | Passed |

The initial browser test used Playwright `:visible` to count SVG paths; a vertical path has a zero-width geometric box even when its stroke is rendered. That test false negative was corrected by checking rendered stroke styles. Browser cleanup now also occurs after a failed assertion. Neither correction changed the Reference HTML. These findings are addressed in the regression and retained in CI history.

Artifacts expire after 14 days; the test script reproduces them. Screenshots are also supplied with the human-review handoff. The sample is still a draft: screen readers, real touch / mobile keyboard, other browsers and whole-Viewer density remain unverified. Only human review can adopt this design.
