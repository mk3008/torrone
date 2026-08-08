# Attempt 6 Run 3 initial worker report

## Status

`ready_for_review`

The uncorrected initial React implementation is durable under this Run's
assigned output directory. Repository checks, TypeScript verification, and the
production build pass. Six HTTP captures are proven to originate from the Run
3 Vite process. The orchestrator's capture-isolation clarification stopped this
worker's browser session before accepted `focus-visible` and hover captures
could be produced; those states and the final serial console review remain for
the orchestrator's per-Run observation pass.

## Goal

Produce one independent, uncorrected Attempt 6 React common-shell adaptation
from the frozen inputs, with enough durable evidence for isolated review and
three-Run comparison.

## Now / Next

- Now: source, unchanged fixed assets, approved fixture, six proven Run 3
  captures, mechanical verification, and this report are durable.
- Next: the orchestrator performs serial browser observation for focus-visible,
  hover, interactive flows, final console state, and rendered exact bindings;
  an independent reviewer then judges the initial output.

## Open Questions

- Does the serial reviewer accept the rendered fixed SVG foreground and exact
  named locations in both themes?
- Does hover remain an explicit human gate, or can the serial observer capture
  it reliably?
- Should the uncorrected `/favicon.ico` 404 and implementation-owned supporting
  microcopy be correction findings?

## Actions Taken

- Verified the six fixed-owner inputs before and after implementation.
- Derived the Run from the canonical React harness configuration.
- Copied canonical visual bindings and product fixture unchanged.
- Authored an independent React/TypeScript/plain-CSS shell.
- Installed, typechecked, built, statically validated, captured, and documented
  the initial result without a repair cycle.

## Code Changes

All code and evidence additions are confined to this Run's `initial/`
directory. Component/state logic is in `src/App.tsx`; styling and canonical
asset integration are in `src/styles.css`.

## Verification Methods

- Owner PowerShell preflights and the harness `-RunRoot` comparison.
- Attempt 3 visual-binding checker and vNext contract/SVG static checkers.
- `npm ci`, `npm run typecheck`, and `npm run build`.
- SHA-256 fixture comparison, 1440 x 900 image dimension checks, accessibility
  snapshot, DOM state evaluation, console observation, and Vite process-origin
  verification.

## Repository Evidence

- Application source and unchanged binding/fixture copies in this directory.
- `visual-binding-evidence.json`.
- Six PNG files and `captures/browser-observation.txt`.
- The acceptance matrix and command results recorded below.

## Supplementary Evidence

The live browser process command line, accessibility snapshot, DOM evaluations,
and console stream were observed during the worker session and serialized into
`captures/browser-observation.txt` and this report. Confidence in final browser
acceptance remains weaker until the orchestrator reproduces the states serially.

## Review Triage

- Review first: rendered exact binding, themed SVG perceptibility, selection
  indicator location, focus-visible, and hover.
- Review second: toggle/search transitions, console 404, and visible supporting
  microcopy against the product ownership boundary.
- Non-blocking mechanical evidence: frozen-input integrity, harness equality,
  typecheck, build, visual-binding static check, and SVG static check all pass.

## Attainment Status

`partial`

## Outcome

Reviewers can now run and compare an independent Run 3 React common shell with
its uncorrected initial artifacts and trace each mechanical claim to durable
evidence.

## Why It Matters

Keeping the Run independent, uncorrected, and evidence-backed lets the
experiment evaluate adaptation stability rather than the quality of a shared
template or a worker's repair loop.

## Identity

- Task: `run-3`
- Attempt: `1`
- Base commit: `04da0dfd30b0e9d26c3e7d98480ee35c4fc9b395`
- Worker thread: `019fe170-f2b8-7622-87a1-2ac17589f329`
- Execution surface: `codex-thread-ui`
- Assigned output: `attempt-6/runs/run-3/initial/`
- Implementation correction count: `0`
- Observation-tool correction count: `2`

## Changed paths

All repository changes are confined to
`docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/runs/run-3/initial/`:

- Canonical harness configuration: `.gitignore`, `package.json`,
  `package-lock.json`, `tsconfig.json`, `tsconfig.app.json`,
  `tsconfig.node.json`, and `vite.config.ts`.
- Application entry and implementation: `index.html`, `src/main.tsx`,
  `src/App.tsx`, `src/styles.css`, and `src/vite-env.d.ts`.
- Unchanged product input copy: `public/product-fixture.json`.
- Unchanged exact-binding interface: `reference-visual-bindings/` and
  `visual-binding-evidence.json`.
- Initial observation evidence: `captures/`.
- This durable report: `worker-report.md`.

No frozen input, Reference, vNext contract, canonical React harness, past
Attempt, or another Run output was changed or inspected outside the packet's
allowed fixed-source set.

## Initial artifacts

The implementation uses React 19, TypeScript, Vite, and imported plain CSS.
The component/state/DOM organization is implementation-owned and does not copy
the Reference HTML, complete stylesheet, or JavaScript.

- `src/App.tsx` implements Header, Drawer, Main workspace, query-derived
  initial states, Drawer visibility, theme switching, Workspace disclosure,
  destination selection, search filtering, and the approved fixture.
- `src/styles.css` implements independent shell layout and uses the canonical
  tokens for exact bound surfaces, selection, indicator, controls, and focus.
- All seven canonical SVGs are referenced as unchanged CSS-mask inputs. The
  mask foreground is `currentColor`, avoiding prohibited direct external-image
  rendering.
- `public/product-fixture.json` is byte-identical to the approved frozen
  candidate. SHA-256 for both canonical and copied files is
  `7DC147B1AB966B48EEE1898828C98D80F6CD06CA3AB2B71702A093151468689D`.

## Preflight and build results

### Before implementation

All owner preflights passed:

| Owner / input | Result |
| --- | --- |
| Approved Reference (`attempt-2/check-fixed-input.ps1`) | pass; 52 files; baseline `9cd19321e53f6279e956df8a6d1fe562c3360544` |
| Product input (`attempt-2/check-product-input.ps1`) | pass; 1 file |
| Attempt 3 exact bindings (`attempt-3/freeze/check-attempt-3-input.ps1`) | pass; 24 files; baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff` |
| Attempt 4 vNext (`attempt-4/freeze/check-attempt-4-input.ps1`) | pass; 11 files; baseline `a3ef3fa680314a3b2721076698b13dbe97d0ead4` |
| Attempt 5 React harness (`attempt-5/freeze/check-react-harness-input.ps1`) | pass; 14 files |
| Attempt 6 product fixture (`attempt-6/freeze/check-product-fixture-input.ps1`) | pass; 5 files; baseline `2b3ebb0` |

### After implementation

The same six owner preflights passed again. Additional verification:

| Check | Result |
| --- | --- |
| React harness preflight with `-RunRoot <run-3/initial>` | pass; canonical configuration equality confirmed |
| `attempt-3/validation/check-visual-bindings.ps1 -TargetRoot <run-3/initial>` | pass |
| `reference-contract-vnext-candidate/validation/check-next-contract-candidate.ps1` | pass |
| `reference-contract-vnext-candidate/validation/check-svg-rendering-contract.ps1 -TargetRoot <run-3/initial>` | pass; 7 themed assets |
| `npm ci` | pass with Node `22.14.0`, npm `10.9.2`, 65 packages installed |
| `npm run typecheck` | pass |
| `npm run build` | pass; 34 modules transformed |

The first `npm ci` invocation could not read the sandbox-external default npm
cache (`EPERM`). Re-running the same locked install with a Run-specific cache
under `C:\tmp` succeeded. npm reported two vulnerabilities from the frozen
dependency graph (one moderate and one high); no dependency or lockfile change
was permitted or made.

## Captures and HTTP observations

Each accepted file below is 1440 x 900 CSS pixels and was captured from the
Run 3 Vite command line
`run-3/initial/node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4175 --strictPort`.
The exact process was verified before shutdown. `vite.stderr.log` is empty.
The durable text record is `captures/browser-observation.txt`.

| Evidence | State | Result |
| --- | --- | --- |
| `captures/01-light-open.png` | light, Drawer open, Workspace expanded, Overview current | captured; snapshot exposed Header, Drawer, Main, all expected navigation roles, and 24 fixture items |
| `captures/02-dark-open.png` | dark, Drawer open, Workspace expanded, Overview current | captured; `theme=dark`, Drawer present, three children |
| `captures/03-drawer-hidden.png` | light, Drawer hidden | captured; Drawer absent, Main present, Header action named `Show navigation` |
| `captures/04-workspace-expanded.png` | light, Workspace expanded | captured; `aria-expanded=true`, exactly three child rows |
| `captures/05-workspace-collapsed.png` | light, Workspace collapsed | captured; zero child rows; Overview and Activity remain; current destination remains Overview |
| `captures/06-selected.png` | light, Section 01 current | captured; selected row and Main both report Section 01 |
| Focus-visible | keyboard focus state | `UNCONFIRMED`; deferred to serial orchestrator observation |
| Hover | unselected interactive response | `UNCONFIRMED`; deferred to serial orchestrator observation |

The initial browser console contained one error: a 404 request for
`/favicon.ico`. It is preserved without implementation repair. The Vite
application itself produced no recorded runtime exception, and Vite stderr was
empty. A final clean-console claim is not made.

## Acceptance matrix

| Acceptance area | Evidence | Result |
| --- | --- | --- |
| Common implementation | React source implements Header, Drawer, Main, toggle controls, search, theme, disclosure, selection, and fixture; typecheck/build pass | pass mechanically |
| Harness integrity | RunRoot harness preflight | pass |
| Frozen input integrity | six owner preflights before and after | pass |
| Header / Drawer / Main structure | source plus light snapshot and Drawer-hidden observation | pass for initial mechanical evidence; independent visual review pending |
| Independent scrolling and Drawer track removal | CSS grid/overflow implementation and hidden-Drawer observation | repository evidence present; browser reviewer confirmation pending |
| Hierarchy | Overview and Activity are top-level; Workspace is the only parent; exactly Section 01-03 are children; expanded/collapsed observations | pass for rendered hierarchy states; click-transition review pending |
| Collapse behavior | collapsed capture shows only children removed while Overview and Activity remain; current destination retained | pass for query-derived state; interactive transition review pending |
| Destination selection | selected URL state reports Section 01 in both selected row and Main | pass for selected state; click-transition review pending |
| Search | source implements immediate hierarchy-aware filtering and empty state | `UNCONFIRMED` in browser after isolation stop |
| Light / dark themes | canonical tokens plus light/dark captures | pass for state rendering evidence; exact perceptibility review pending |
| Exact visual bindings | unchanged asset copy, evidence map, and visual-binding static checker | static pass; browser exact-location/cascade review pending |
| SVG rendering | CSS masks reference every canonical SVG; vNext SVG checker passes | static pass; rendered foreground/perceptibility review pending |
| Accessible names | Header actions name their next action; search and navigation are labelled; disclosure exposes `aria-expanded` | source and snapshot evidence pass; keyboard review pending |
| Focus-visible | canonical focus token is used in `:focus-visible` CSS | `UNCONFIRMED` in browser |
| Hover | implementation has a distinct unselected hover response | `UNCONFIRMED` in browser; Foundation value remains a human gate |
| Browser console | one `/favicon.ico` 404 observed | not clean; uncorrected initial finding |
| Required captures | six of eight states captured and proven Run 3-origin | partial; focus-visible and hover deferred |

## Problem classification

| Finding | Classification | Evidence / handling |
| --- | --- | --- |
| No fixed token, icon, pairing, location declaration, or selected-row asset mismatch was found by static checks. | no `exact-binding-miss` recorded | visual-binding and SVG static checks pass; browser review remains required |
| No Header/Drawer/Main or supplied hierarchy mismatch was found in the accepted mechanical observations. | no `structural-invariant-miss` recorded | snapshot and state evaluations listed above |
| Focus-visible, hover, final console, and full interactive transitions were not completed in this worker session after capture isolation changed. | `validation-gap` | explicitly handed to the orchestrator's serial per-Run observation |
| React component boundaries, state hooks, CSS organization, grid dimensions, typography, card treatment, and CSS-mask integration are not fixed by the binding map. | `allowed-implementation-freedom` | independent implementation; reviewer must still ensure both prior gates remain intact |
| No missing canonical exact decision prevented implementation. | no `reference-binding-gap` recorded | fixed tokens, map, icons, and SVG contract were sufficient |
| No ambiguity required a fixed input change. | no `adaptation-instruction-gap` recorded | implementation stayed within the assigned Run root |

## Observation-tool corrections

Count: `2`.

1. A sandbox denial prevented use of a new `C:\tmp` Playwright working
   directory. The transient browser working directory was moved under this
   Run's `captures/` directory, then verified and deleted after the session.
2. After the orchestrator reported a concurrent localhost-port conflict, the
   listener PID and full command line were checked. The six existing captures
   were accepted only after they were proven to come from this Run's Vite
   executable. The exact Run 3 server PID and browser session were then stopped,
   and no further capture was attempted.

Neither correction changed implementation source, fixed inputs, accepted
screenshots, or configuration.

## Unlisted judgments

- CSS masks were selected from the SVG contract's permitted implementation
  families so the unchanged `currentColor` SVG geometry receives the active
  themed foreground.
- Hover uses an implementation-local mixed surface distinct from selection.
  It is not claimed as a canonical cross-application Foundation value.
- The visible supporting labels `Shared operations`, `Workspace map`,
  `Fixture ready`, `Operational sequence`, and `Neutral fixture item` are
  implementation-owned presentation around the approved fixture. Their
  product-boundary suitability is left to independent review; no correction
  was made in the initial Run.
- The `/favicon.ico` 404 does not map cleanly to the visual-binding taxonomy.
  It is recorded as an unlisted browser-console finding, not silently treated
  as an exact or structural pass.

## Human / follow-up gates

The orchestrator's serial per-Run HTTP observation must provide or decide:

1. Accepted 1440 x 900 `focus-visible` evidence.
2. Accepted 1440 x 900 hover evidence, or an explicit human hover gate.
3. Interactive toggle/selection/search observations and final console result.
4. Rendered exact-binding review for both themes, fixed icon placement and
   perceptibility, selected-row treatment, physical-start indicator, and focus
   cascade.
5. Independent structural and exact-binding review without repairing this
   uncorrected initial output first.

## Evidence conclusion

Repository evidence is sufficient to confirm frozen-input integrity, canonical
harness equality, source inclusion of all exact assets, prohibited SVG-rendering
avoidance, TypeScript correctness, production buildability, fixture identity,
and the six proven Run 3 captures. It is not sufficient to claim final browser
acceptance. The serial observation and independent reviewer are required before
the orchestrator can accept this Run.
