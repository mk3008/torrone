# Test A agent report

Status: **done**

## Outcome

A directly reviewable supplier onboarding Review queue Reference and a
content- and implementation-independent equipment inspection finding Target
were authored and verified. Reference Conformance passes, the Target passes
comparison without errors or diagnostics, an isolated risk-badge color
negative fails with exactly one normalized signature, and the byte-identical
Target passes again after the negative.

No CLI/Core file, dependency, build system, framework, data layer, network
behavior, global rule, or long-lived knowledge file was changed.

## Governing authority and selected responsibilities

The authority order used for this task was:

1. `AGENTS.md` repository guidance: docs-first, English repository artifacts,
   small observable experiments, and running implementation plus applicable
   requirements as authority.
2. `task.md` new business requirement and required work.
3. `docs/poc/reference-html-observation-boundary.md`, which is subordinate PoC
   guidance rather than a Manifest, Profile, or application requirement.
4. The two accepted partial References as concrete responsibility samples.
5. The CLI/Core execution contract as the sole observation, conformance, and
   comparison mechanism.

Applicable common-shell responsibilities selected from `common-shell.html`:

- banner and application shell;
- navigation visibility, group disclosure, filtering, and selection;
- light/dark theme round trip;
- user-menu opening, focus transfer, Escape closing, and focus return.

Applicable search-workspace responsibilities selected from
`search-workspace.html`:

- filter disclosure by pointer and keyboard;
- search-driven Initial, Results, and Empty states;
- clear back to Initial;
- fixed result rows and lightweight page navigation.

The Reference has 12 scenarios and 25 checked states including Initial. No
scenario selector was needed: every state is reachable through product
controls, so no harness was added and the observation boundary reports zero
excluded harness roots.

## Authored files and line counts

| File | Lines | Responsibility |
| --- | ---: | --- |
| `reference.html` | 195 | Reference product DOM and scenario contract |
| `reference.css` | 111 | Reference-local visual implementation |
| `reference.js` | 121 | Reference interactions and state transitions |
| `target.html` | 138 | Content-different Target DOM and fixtures |
| `target.css` | 111 | Independently written Target CSS |
| `target.js` | 119 | Target state model and render organization |
| `target-scenario-overrides.json` | 9 | One content-only Empty-query override |
| `negative/target-risk-color.html` | 100 | Non-destructive negative entry |
| `negative/risk-color-mutation.css` | 4 | One-property negative override |
| `agent-report.md` | 254 | This completion and evidence report |

Reference and Target use different wording, fixtures, DOM grouping, classes,
local IDs, and JavaScript organization. A static source check found 38 unique
Reference class tokens and 36 unique Target class tokens with **0 overlap**;
the seven local IDs in each implementation also have **0 overlap**. Target
sources contain no Reference CSS/JavaScript import and no supplier fixture
vocabulary. Reference sources contain no inspection fixture vocabulary.

## Identity and Consumer annotation observations

Reference and Target each contain **18 explicit `data-ref` identities**, all
unique:

`navigation-toggle`, `navigation-filter`, `navigation-parent`,
`navigation-current`, `navigation-secondary`, `navigation-empty`,
`user-menu-toggle`, `filters-toggle`, `search-query`, `search-action`,
`clear-action`, `primary-action`, `result-initial`, `result-empty`,
`risk-badge`, `result-pagination`, `page-previous`, and `page-next`.

The initial snapshot contains **10 naturally resolved semantic identities**:

`semantic:role:banner`, `semantic:role:main`, `semantic:role:table`,
`semantic:role:menuitem`, `semantic:role:button:aria-pressed`,
`semantic:aria-live:polite`, and controlled regions for
`navigation-toggle`, `navigation-parent`, `user-menu-toggle`, and
`filters-toggle`.

Thus the initial observation has 28 identities total: 18 explicit and 10
semantic. Explicit keys are limited to scenario targets and material states or
styles that cannot be resolved naturally. The Target adds no Consumer-only
annotation, scenario metadata, stable wording key, copied local ID, or fixture
identity. Comparison reports zero extra-annotated-element diagnostics.

## Verification commands and results

Commands were run from the repository root. `REFERENCE_UI_DEBUG` only emitted
CLI lifecycle detail; it did not change observation or comparison rules.

```powershell
node --check docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/reference.js
node --check docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/target.js
```

Result: both exit `0`.

```powershell
$env:REFERENCE_UI_DEBUG='1'
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs preflight docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/reference.html --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/reference-preflight.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/reference-preflight
```

Result: `pass`, 0 errors, 0 signatures, 25 checked states.

```powershell
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs snapshot docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/reference.html --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/reference.snapshot.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/reference-snapshot
```

Result: exit `0`; 28 initial elements, 12 scenarios, 0 bounded
accessibility issues, 0 external requests, and 0 console errors.

```powershell
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/target.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/reference.snapshot.json --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/target-scenario-overrides.json --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/target.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/target
```

Result: `pass`, 0 errors, 0 signatures, and 0 diagnostics.

```powershell
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/negative/target-risk-color.html --root docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a --baseline docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/reference.snapshot.json --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/target-scenario-overrides.json --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/negative-risk-color.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/negative-risk-color
```

Expected result: exit `1`, `fail`, 24 errors across exactly one normalized
signature, 0 diagnostics. The signature is
`elements.risk-badge.styles.backgroundColor`; expected
`rgb(255, 240, 237)`, actual `rgb(223, 244, 255)`. It occurs in every checked
state except the dark-theme activation, where the normal, more-specific dark
rule remains authoritative.

```powershell
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/target.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/reference.snapshot.json --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/target-scenario-overrides.json --out docs/poc/experiments/017-reference-html-ssot/variants/13-cold-start-portability/test-a/evidence/target-control-after.report.json
```

Result: `pass`, 0 errors, 0 diagnostics. The before- and after-negative Target
source digest is byte-identical:
`d3d83b366be878dbfb20892787e18a6c6286dbfe432f6d1cf20785e42be799af`.

Static checks also found no `http`, `https`, `fetch`, `XMLHttpRequest`, or
`WebSocket` use in authored product/negative sources.

## Evidence

Primary JSON evidence:

- `evidence/reference-preflight.json`
- `evidence/reference.snapshot.json`
- `evidence/target.report.json`
- `evidence/negative-risk-color.report.json`
- `evidence/target-control-after.report.json`

Screenshot evidence contains 25 PNGs in each of:

- `evidence/reference-preflight/`
- `evidence/reference-snapshot/`
- `evidence/target/`
- `evidence/negative-risk-color/`

Representative human-review frames include `00-initial.png`,
`search-results-01.png`, `search-empty-02.png`,
`navigation-visibility-01.png`, `theme-round-trip-01.png`,
`user-menu-escape-01.png`, and `pagination-round-trip-02.png` in the relevant
artifact directories. Recorded final evidence uses Chrome 151.0.7922.109 at
1440 by 900.

## Self-review

### Business-app naturalness

Initial, Results, Empty, dark theme, user menu, collapsed navigation, and page
2 were visually inspected. The queue uses normal operational language,
compact filters, fixed tabular values, one value per column, a clear primary
action, and pagination without a total count.

The first screenshot review exposed a real defect that differential comparison
had passed in both implementations: hiding the navigation grid item caused the
main workspace to occupy the zero-width first column. Reference and Target
were corrected independently so the workspace spans the full grid while the
navigation is hidden. Regenerated Target evidence then passed with zero
diagnostics and the collapsed-navigation screenshot shows the workspace using
the full width.

### Architecture boundary and maintenance cost

Both product examples are fixed, local, directly executable HTML/CSS/JavaScript
with no network or application platform. The Target imports neither Reference
CSS nor Reference JavaScript. Its CSS selectors, class vocabulary, IDs, DOM
grouping, state object, and render functions differ from the Reference while
computed observations transfer.

The separate negative entry deliberately duplicates Target markup so the
accepted Target remains untouched; this costs 100 lines and can drift. The
before/after source digest and passing controls bound that risk for this test.
No shared-CSS layer, generator, mutation mode, or new tooling was introduced to
remove a one-experiment duplication.

### Identity and metadata excess

The 18 explicit identities are all exercised action targets or necessary
material observations. Ten additional elements resolve from already-natural
semantics and controller relationships. No key was derived from wording,
fixture content, class name, local ID spelling, or DOM position, and no ARIA or
wrapper was added only to help the resolver.

### Invented interactions

`New supplier review` and its Target counterpart are visible `type="button"`
controls with no handler or destination. Supplier/Finding IDs are visibly
linked with placeholder `href="#"`, but no destination screen or business
operation is implemented. Sign out/log out is present for menu review but has
no business handler. Implemented behavior is limited to the accepted shell,
search-state, clear, disclosure, selection, theme, menu, and pagination
responsibilities.

## Limitations

- Browser evidence covers one Chrome version and a 1440 by 900 viewport only.
- Responsive behavior and real assistive-technology behavior were not tested.
- Comparison proves observable transfer, not design correctness; the shared
  collapsed-grid defect demonstrated why the screenshot review remains
  independent.
- Placeholder record links intentionally do not prove destination behavior.
- The negative HTML duplicates Target DOM and therefore needs manual alignment
  if the Target changes.
- Before the successful recorded runs, several browser launches returned
  `Timed out waiting for DevTools command Page.enable`, and one earlier run hit
  a 120-second outer command timeout. Those attempts produced no accepted JSON
  result. Final runs used the same unmodified CLI/Core and completed normally.

## Knowledge candidates (not promoted)

1. For common-shell References that remove a navigation grid item, visually
   inspect the first collapsed state for workspace allocation; differential
   pass alone can preserve a zero-width-main defect.
2. When a required action has an unspecified destination, a directly
   reviewable no-handler button may avoid inventing destination behavior while
   still exposing its hierarchy and style. This remains task-specific.
3. A separate negative entry that reuses Target CSS/JavaScript can isolate a
   one-property mutation without changing the accepted Target, but duplicated
   markup is an explicit maintenance cost rather than a candidate platform
   feature.

None of these candidates modifies PoC guidance, a Manifest, CLI/Core, or a
stable Profile.
