# Test C agent report

Status: **done**

## Outcome

The software-license Reference and the independently authored facility-badge
Target are complete. Reference Conformance passes, the content-different Target
passes exact observable comparison, and an isolated primary-action color
mutation fails with only the intended signature.

Two business-facing defects were found and fixed during review:

1. Hiding the Reference navigation removed the first Grid item and allowed main
   content to auto-place into the zero-width navigation column. The main content
   now remains explicitly in Grid column 2.
2. Pagination initially changed only the page label. Both implementations now
   render distinct page-two fixtures and restore page-one fixtures on Previous.

No CLI/Core, dependency, build, framework, network/data layer, global guidance,
or long-lived knowledge was changed or added.

## Deliverables

- `reference/index.html`: directly operable software license renewal queue.
- `target/index.html`, `target/styles.css`, and `target/app.js`: independently
  structured facility access badge renewal queue.
- `target/scenario-overrides.json`: two content-only fill overrides.
- `negative/index.html` and `negative/defect.css`: isolated, non-destructive
  material negative that leaves the passing Target unchanged.
- `output/reference.preflight.json`: Reference Conformance evidence.
- `output/reference.snapshot.json`: accepted observation baseline.
- `output/target.report.json`: passing comparative evidence.
- `output/negative.report.json`: expected failing negative evidence.
- `output/reference-preflight/`, `output/reference/`, and `output/target/`: 23
  screenshots each (initial plus 22 post-action states).

## Authority and accepted responsibility application

The Reference applies the accepted common-shell responsibilities as a product
shell: navigation visibility, a collapsible navigation group, navigation
filtering, current-route selection, theme round trip, and user-menu Escape with
focus return. It applies the accepted search-workspace responsibilities as one
causal workflow: filter disclosure, search, clear, Initial/Results/Empty states,
the result table, and pagination.

The new business requirement supplies the product facts. The Reference uses
software-license content and fixtures; the Target uses facility-badge content
and fixtures. License IDs and Badge IDs are fragment links only. `New renewal
review`, navigation destinations, and Sign out have no invented destination UI
or post-click workflow. Search, filtering, theme, menu, and pagination behavior
exist only because they are required observable interactions.

The cold-start knowledge supplement was applied by inspecting CSS, DOM, and
JavaScript organization rather than treating file hashes, class names, local
IDs, or imports as independence proof.

## Interaction coverage

The Reference contract contains 11 meaningful scenarios and 22 actions:

| Scenario | Actions | Observable purpose |
| --- | ---: | --- |
| navigation visibility | 2 | close and restore the full navigation |
| navigation parent | 2 | collapse and restore the grouped routes |
| navigation filter no match | 2 | show and clear the navigation empty state |
| navigation selection | 2 | move and restore current-route treatment |
| theme round trip | 2 | apply and restore the complete dark theme |
| user menu escape | 2 | open the menu, then close and return focus |
| search results | 1 | move from Initial to Results |
| search empty | 2 | use a no-match query and reach Empty |
| clear to initial | 2 | search, then reset to Initial |
| filter keyboard round trip | 2 | hide and restore filters with Enter |
| pagination round trip | 3 | search, move to distinct page 2, return to page 1 |

The Target overrides only the two vocabulary-dependent fills:
`No navigation item` becomes `No badge section`, and `No match` becomes
`Nothing found`. No action, target, expected state, style, or comparison rule is
overridden.

## Verification evidence

Final execution used `Chrome/151.0.7922.109` at the CLI default 1440 x 900
viewport.

| Check | Result |
| --- | --- |
| `node --check target/app.js` | exit 0 |
| Reference preflight | pass; 0 errors, 0 signatures, 23 checked states |
| Reference snapshot | 31 observed elements, 11 scenarios, 0 accessibility issues |
| Reference runtime | 0 external requests, 0 failed requests, 0 console errors |
| Target verification | pass; 0 errors, 0 signatures, 0 diagnostics |
| Target runtime | 0 external requests, 0 failed requests, 0 console errors |
| Isolated negative | expected exit 1; 23 errors, 1 signature, 0 diagnostics |

The negative signature is exactly
`elements.create-action.styles.backgroundColor` in all 23 states. Expected is
`rgb(29, 112, 179)` and mutated actual is `rgb(138, 44, 32)`. The repetition is
state coverage, not additional mutation scope.

Final commands:

```powershell
node --check 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\target\app.js'

node 'docs\poc\experiments\017-reference-html-ssot\cli\reference-ui.mjs' preflight `
  'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\reference\index.html' `
  --out 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\reference.preflight.json' `
  --artifacts 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\reference-preflight'

node 'docs\poc\experiments\017-reference-html-ssot\cli\reference-ui.mjs' snapshot `
  'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\reference\index.html' `
  --out 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\reference.snapshot.json' `
  --artifacts 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\reference'

node 'docs\poc\experiments\017-reference-html-ssot\cli\reference-ui.mjs' verify `
  'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\target\index.html' `
  --baseline 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\reference.snapshot.json' `
  --scenario-overrides 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\target\scenario-overrides.json' `
  --out 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\target.report.json' `
  --artifacts 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\target'

node 'docs\poc\experiments\017-reference-html-ssot\cli\reference-ui.mjs' verify `
  'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\negative\index.html' `
  --root 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c' `
  --baseline 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\reference.snapshot.json' `
  --scenario-overrides 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\target\scenario-overrides.json' `
  --out 'docs\poc\experiments\017-reference-html-ssot\variants\13-cold-start-portability\test-c\output\negative.report.json'
```

`REFERENCE_UI_DEBUG=1` was set on successful CLI reruns to retain browser
lineage details in terminal evidence; it does not change observation or
comparison behavior.

## Business-screen and visual audit

The audit inspected Initial, Results, Empty, dark theme, navigation hidden,
user menu open, and page 2 screenshots across both implementations. In
particular, inspection covered:

- `output/reference/00-initial.png`
- `output/target/00-initial.png`
- both `search-results-01.png` captures
- both `theme-round-trip-01.png` captures
- `output/reference/navigation-visibility-01.png`
- `output/target/user-menu-escape-01.png`
- `output/target/search-empty-02.png`
- `output/target/pagination-round-trip-02.png`

Audit result: **pass after the two fixes recorded above**.

- The screen reads as an operational queue rather than a demonstration. It has
  a compact page purpose, working filters, a restrained state panel, scanable
  business rows, and lightweight pagination.
- `New renewal review` is the only primary-emphasis action. Search, Clear, and
  disclosure/pagination controls remain secondary.
- Initial and Empty explain the operator's next valid action without adding
  manifest or implementation commentary.
- Results have one linked ID followed by one value in each of five remaining
  columns. Static inspection found three body rows with `6,6,6` cells in each
  implementation, and the page-two renderers also supply six values per row.
- Pagination uses only Previous, the current page, and Next. It exposes no
  invented total count. Page 2 has distinct records and correct opposing
  disabled treatment.
- Dark treatment covers shell, navigation, filters, states, results surfaces,
  borders, selection, focus, and status treatment coherently.
- The user menu is anchored to its controller, moves focus to Sign out on open,
  and returns focus to the controller on Escape.
- Reference Conformance and snapshot accessibility checks report no issue.

The static business-boundary audit also found exactly one `New renewal review`
button per implementation, zero non-fragment product links, zero network-client
tokens, and three six-cell source rows per implementation.

## Reference simplicity and invented-interaction audit

The Reference is one 26,727-byte, 553-line HTML file with inline CSS and
JavaScript. It uses fixed dummy records, two bounded result pages, no framework,
no build, no imports, no data client, no fetch, no authentication behavior, and
no second expected-value file. Its scenario JSON describes actions only; the
browser remains the state/style source.

The file is larger than either accepted partial Reference because it owns the
integrated shell and complete search/pagination responsibility. The source is
still directly reviewable: styles follow visible Reference components, markup
contains the real operable sample, and behavior uses small local setters. No
DSL, profile, catalog, or reusable application platform was introduced.

No invented destination was implemented. Product links are `#...` fragments;
primary and menu actions intentionally have no workflow handler. The bounded
two-page fixture behavior demonstrates pagination without claiming a service,
total, or downstream screen.

## Identity and Consumer annotation cost

The baseline observes 31 elements:

- 23 explicit `data-ref` identities, shared because they are the transfer and
  scenario contract;
- 8 natural or relational identities: banner, main, menuitem, polite live
  region, and the four regions controlled by filter toggle, navigation parent,
  navigation toggle, and user-menu toggle.

The 23 explicit identities cover actions, changing state surfaces, pagination,
and the few treatments whose transfer is intentionally observed. Unkeyed row
copy, ordinary navigation links, labels, and selects were not annotated merely
to improve coverage. The existing `aria-controls` relations serve product
behavior and were not added only for the harness.

Reference and Target each use seven local IDs and share zero local ID strings.
The Target therefore pays for the 23 actual transfer annotations, not Reference
ID spelling or Reference DOM grouping. This is a moderate but explainable cost
for a two-responsibility integrated screen; annotation reduction was not used
as a success metric.

## CSS and source independence proof

The proof is organizational and behavioral, not only superficial source
difference:

1. **CSS authoring model:** Reference CSS is inline and follows product
   components in visual order (shell, navigation, workspace, filters, results).
   Target CSS is an external stylesheet with one layer-order declaration and
   five authoring layers: foundation, composition, controls, content, and
   state. Target rules intentionally group cross-component contracts with
   `:is(...)`, `data-ui`, `data-tone`, and `data-surface`; they are not a
   selector-by-selector renamed copy of Reference component blocks.
2. **Layout construction:** the Reference work area is CSS Grid, including an
   explicit main-column placement needed when navigation is hidden. The Target
   work area is Flexbox and closes navigation by changing width and flex basis.
   The exact browser comparison passes despite these different source
   constructions.
3. **State organization:** Reference behavior reads state from DOM attributes
   and uses component-specific setter functions with direct listeners. Target
   behavior owns one `model`, one comprehensive `render`, an action map, and a
   delegated click listener. Its page rows are object records; Reference page
   rows are positional value arrays rendered by a local page setter.
4. **DOM and local identity:** product vocabulary, grouping classes, data
   attributes, and all seven local IDs are independently named. Stable
   `data-ref` values are deliberately shared because they are the comparison
   identities, not source-organization evidence.
5. **Observable constraint:** some computed values must be equal for exact
   transfer, so value equality is expected and not presented as source reuse.
   The pass with 0 errors and 0 diagnostics demonstrates observable transfer;
   the structural inspection above demonstrates independent authoring.

Supporting source metrics:

| Source | Bytes | Lines |
| --- | ---: | ---: |
| `reference/index.html` | 26,727 | 553 |
| `target/index.html` | 7,609 | 132 |
| `target/styles.css` | 8,587 | 208 |
| `target/app.js` | 6,890 | 170 |
| `target/scenario-overrides.json` | 231 | 14 |
| `negative/index.html` | 7,675 | 135 |
| `negative/defect.css` | 149 | 4 |

Additional observed organization metrics: Reference has no `@layer` directive;
Target has one layer-order declaration plus five layer blocks. Reference has 12
`addEventListener` calls and 24 direct query calls; Target has 5 listener calls
and 9 direct query calls around its central lookup/render organization. These
numbers support, but do not replace, the structural proof above. No permanent
similarity threshold is proposed.

## Failed attempts and corrections

1. The first preflight launch timed out on the CLI `Page.enable` command. No
   artifact was written. A fresh debug-lineage run completed successfully.
2. A combined snapshot-then-verify attempt hit the same transient
   `Page.enable` timeout; verify then correctly failed to open the absent
   snapshot. Running the commands separately succeeded.
3. The first real Target comparison reported 1 error and 3 geometry diagnostics
   in navigation-hidden state. Screenshot inspection showed the Reference Grid
   auto-placement defect described in Outcome. The Reference was fixed,
   preflighted, snapshotted again, and the Target then passed with no diagnostic.
4. The first negative fixture construction accidentally produced an empty
   `negative/index.html`; the resulting 417 errors across 45 signatures were
   fixture noise, not accepted evidence. The fixture was rebuilt through
   `apply_patch`; the final negative now has only the intended 23 occurrences of
   one signature.
5. Two read-only PowerShell metric commands initially had an invalid empty pipe
   after `foreach`. They changed no files and were rerun with captured arrays.

## Knowledge conclusions

- The knowledge supplement is confirmed for this screen: hashes, imports, IDs,
  and class names would have been inadequate. Reviewing layout algorithm, CSS
  rule organization, DOM grouping, and JavaScript state flow provided the
  meaningful independence evidence.
- Exact observable transfer was achievable across independently organized Grid
  and Flex implementations and across DOM-state and centralized-model
  JavaScript, without weakening comparison.
- Human screen review remains indispensable. The initial Reference navigation
  defect could have been reproduced or compensated by a Target; comparison
  alone does not establish design correctness.
- A responsibility-complete integrated shell/search Reference remained
  directly reviewable without adding runtime composition or a shared CSS
  system. This is evidence for this bounded screen, not a frozen granularity
  rule.
- The 23-key Consumer annotation cost is visible and auditable. Natural and
  relational identity removed eight additional explicit keys, but conversion
  rate was not optimized and no ambiguous heuristic was introduced.
- Scenario fill overrides were sufficient for content-different negative-query
  vocabulary while leaving action and comparison authority unchanged.
- The isolated negative demonstrates that a material loss of the sole primary
  action emphasis is detected without mutating the passing Target or broadening
  the failure contract.

Mechanical evidence does not promote either screen to approved design. Human
approval remains independent, and responsive behavior below the declared
960-pixel minimum and real assistive-technology behavior were not evaluated.
