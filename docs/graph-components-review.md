# Graph components

Status: **draft**. Review the parts before considering a composed screen. Human design adoption and merge are separate decisions.

## Open and review

Open `review/references/graph-components-draft.html` directly, or select **Graph components** in the existing `python3 tools/build-review.py` bundle. The self-contained HTML has no build, external requests or saved data.

- **Nodes:** compare Business / Object and in / outside scope. Select, switch and deselect; move keyboard focus without changing selection.
- **Relations:** compare Input-only, Write / Output, its paired omitted Read and business Exception. Follow the arrowhead and open the full caption.
- **Local disclosure:** open the omitted Read, close and return, then reopen and choose another relation. Its temporary line must disappear without hiding Input-only or Exception.

One compact review sheet holds two independent groups. It does not couple node selection to the relation specimens or model a Viewer page. Its arrangement is a review aid, not prescribed application layout. The existing [four-node composition](graph-selection-review.md) remains optional evidence for a specific graph / Detail coordination question; its HTML bytes are unchanged.

## Source and reusable responsibility

The node styles, icons, relation colors/weights, arrowheads, selection/focus distinction and disclosure recovery reuse the existing draft. The four node labels, kinds and scopes and four representative relation records come from the [Viewer fixture at 394dafec](https://github.com/mk3008/alder_viewer/blob/394dafec1cab6823087a9d5954c9634a7eb7b446/fixtures/alder-sample-v1.json). The [Viewer visual grammar](https://github.com/mk3008/alder_viewer/blob/394dafec1cab6823087a9d5954c9634a7eb7b446/README.md) owns their source meaning. Fixture Japanese text is retained.

No applicable approved graph Reference or separate approved whole-Viewer keyboard policy was found. Existing approved References are unchanged. This is a candidate for [issue #32](https://github.com/mk3008/torrone/issues/32), not an adopted application requirement.

**Preserve after approval:** independent kind/scope encoding; outside-scope selectability; normal, selected and focus states that retain kind/scope; relation direction/type/caption; reachable full captions; discoverable omitted Reads; close/return and reset on relation change. Input-only remains available. Exception means a conditional return to a preceding business, not a UI error.

**May vary:** dimensions, coordinates, routing, row placement, DOM, framework and implementation state. The drawing uses a straight isolated line to make direction/type inspectable; it does not prescribe graph edge routing. Fixture labels and the review sheet's two-group layout are not product requirements.

If these parts and guidance are accepted and sufficient for an implementation instruction, no complete page is required. Add composition only when a concrete cross-component question remains. Do not infer adoption from browser results.

## Local interaction proposals and application gaps

These reversible choices remain pending human review under [Application interaction requirements](application-interaction.md):

- Nodes use native buttons. Activation selects; activation again clears. Selecting a peer replaces the selection. Focus stays with the activated control; Tab can move focus independently. Escape in the node group clears its selection without moving focus.
- Each relation uses one native disclosure button, including the omitted Read. Its type, endpoints and caption stay available while its line is omitted. Opening shows the full caption and focuses its heading; Close or Escape restores the initiating button. Activating the same control again closes it. Choosing another relation clears the previous local detail and temporary Read.
- Amber selection and blue keyboard focus remain distinct. A single open local detail keeps the selection meaning clear without adding a side panel or page shell.
- The two review groups are independent. Their natural Tab order is review-sheet traversal, not a proposed Viewer-wide sequence. A consuming Viewer must still decide its entry, graph-to-Detail navigation, selection clearing, display-mode changes and narrow-layout policy.

No whole-Viewer conformity is claimed. The component check below cannot establish composed application coverage.

## Findings and disposition

- **Page-first scope:** addressed by the component review target and optional-composition label. The earlier composition and its evidence are retained, not rewritten or discarded.
- **Necessary operation boundaries:** node selection/focus and relation open/close/return stay together; no separate state catalog, graph engine or component framework was added.
- **Pending human decisions:** accept, revise or reject the node grammar/states, relation grammar and local disclosure choices in #32. Parts may be accepted separately; acceptance of one does not approve all.
- **Deferred:** full Viewer layout, graph / Detail coordination, display-mode controls, dense graphs, pan/zoom, arbitrary data and production implementation. Reopen only for a concrete consuming-product requirement.
- **Verification limits:** screen readers, real touch/mobile keyboard and other browsers remain unverified. A narrow desktop viewport is a reachability check only.

## Verification

Run `node tests/check-graph-components.cjs` with Playwright and Chromium. The existing Graph Reference workflow runs it alongside the preserved composition checks. Evidence goes to ignored `tmp/graph-components-evidence/`; CI artifacts retain screenshots and result JSON for 14 days.

| Source / path | Evidence and conditions | Result / gap |
| --- | --- | --- |
| Reused fixture meaning | Node fields and four relation records compared with the preserved fixture | Passed locally before browser launch |
| Syntax, whitespace and bundle | Embedded JavaScript parse, `node --check`, `git diff --check`, `python3 tools/build-review.py` | Passed locally; both HTML files copied byte-for-byte |
| Original composition state / source | Existing deterministic handler test and SHA-256 `f638d4146dd36f5f29fb42b841da7a1d4c08cf4e83836972c984db6d1b13fae9` | Passed; original HTML unchanged |
| Component native keyboard / rendering | Local Linux Chromium launch | Blocked before page load by environment socket restrictions; no local browser-pass claim |
| Node selection/focus, relation open/close/return, omitted-Read reset, narrow reachability | [Graph browser CI](https://github.com/mk3008/torrone/actions/runs/37391011210), revision `4f7587a0446e815916999cf4a20b31c00c5bd36a`, Playwright 1.58.2 / Chromium 145.0.7632.6 / Ubuntu | Passed; native Enter/Space, Tab/Shift+Tab, Escape, switch/repeat and focus return exercised |
| Desktop 1200×1000 and narrow 390×844 | [Four component screenshots and result JSON](https://github.com/mk3008/torrone/actions/runs/37391011210/artifacts/11380679103) inspected | Normal, selection versus focus and omitted-Read detail states legible; no page overflow in narrow check |
| Standalone runtime | Same browser run | No page errors or external requests |

Source checks are not rendered-UI evidence. The test covers the bounded component paths and interruptions above; it does not grant design approval or application-wide accessibility coverage.

The component HTML reviewed in that run has SHA-256 `4aee8d7a1430344204e3c393a3e0088a6c85dbbcaaad4c7f133d83fd0ef52179`. This evidence update changes documentation only. The original composition browser regression also passed in the same run. Screenshots are individual-state evidence; human design review and the stated unverified conditions remain open.
