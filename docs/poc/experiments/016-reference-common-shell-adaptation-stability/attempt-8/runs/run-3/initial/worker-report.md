# Attempt 8 Run 3 worker report

## Task metadata

| Field | Value |
| --- | --- |
| Task | `generate-run-3` |
| Attempt | `1` |
| Worker thread | `019fef6d-8997-7f11-b182-66f5f82382d9` |
| Execution surface | `codex-thread-ui` |
| Observed base commit | `4ea1e7d5a3dcba4579c7b62254efb632e9b6a776` |
| Model / effort | configured default; no override authorized; resolved runtime identity not exposed to this worker |
| Assigned root | `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-8/runs/run-3/initial/` |
| Status | `ready_for_review` |

## Goal

Independently produce and mechanically evidence the third untouched Attempt 8
React Run from the frozen Manifest, product fixture, visual bindings, harness,
prompt, and illustrative Reference behavior without inspecting a peer Run.

## Now / Next

- Now: the independent Run, fixed assets, implementation digest, six untouched
  PNGs, exact serial observation, command/browser/console records, and this
  report are saved under the assigned Run root.
- Next: the orchestrator verifies this report, base/scope/diff, evidence, and
  classification. A separate artifact review and later human gate decide
  meaningful equivalence and acceptance.

## Open Questions

- Meaningful equivalence, product usefulness, and human acceptance remain
  `UNCONFIRMED`; this worker does not accept its own output.
- Equal resolved model/effort across all three Runs remains an orchestrator
  check. This worker used the packet's configured default and did not inspect
  another Run.
- Dark-theme rendered placement, broad keyboard traversal, assistive-technology
  behavior, responsive behavior, and production readiness are outside the
  frozen focused ten-step capture and remain `UNCONFIRMED` by this report.
- The retained `/favicon.ico` 404 produces one console error. It did not
  interrupt the focused interaction, but this is not a zero-error console pass.

## Actions Taken

- Read `AGENTS.md`, the four Attempt 8 freeze inputs, all declared Manifest and
  owner inputs in source-of-truth order, and the reproducibility protocol.
- Operated the accepted interactive Reference over local HTTP only after the
  normative owners were read. Its visible state independence and leaf behavior
  were observed; its implementation source, DOM, fixture shape, CSS,
  Observation panel, and file layout were not reused.
- Ran the existing owner, Standard Pack, workflow, source-boundary,
  Header/Drawer, SVG, and Reference checks before implementation.
- Derived the assigned Run from the canonical empty React harness and copied
  the exact visual-binding assets and evidence map unchanged.
- Authored one independent React/TypeScript/plain-CSS shell using Run-owned
  components, state, DOM, event wiring, and CSS organization.
- Installed the locked graph, typechecked, built, froze the implementation
  digest, and then executed the frozen ten-step Chrome sequence without reload
  or state reset.
- Preserved all observation outputs without editing the implementation or any
  PNG after the digest was recorded.

## Code Changes

All changes are below the assigned Run root. No Manifest, Reference, product
fixture, harness owner, frozen input, historical Attempt, or peer Run was
edited.

- Canonical harness configuration: `.gitignore`, `index.html`, `package.json`,
  `package-lock.json`, TypeScript files, and `vite.config.ts`.
- Independent source: `src/HarnessApp.tsx`, `src/harness.css`, `src/main.tsx`,
  and `src/vite-env.d.ts`.
- Exact fixed inputs: `reference-visual-bindings/` and
  `visual-binding-evidence.json`.
- Run-local evidence: `evidence/`, `.playwright-cli/`, and this report.

## Acceptance matrix

| Acceptance criterion | Verification method | Result | Repository evidence | Supplementary evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| One independent React/Vite/plain-CSS Run uses the canonical harness and supplied product facts. | Seven configuration blob comparisons; dependency scan; source inspection; Node/npm check; locked install, typecheck, build. | `done` | Independent source and configuration in this Run; seven `CONFIG_MATCH` results; `npm ci`, `npm run typecheck`, and `npm run build` all exited `0`. | None. | High. |
| The Run reuses exact tokens/SVGs and obeys the vNext rendering boundary without copying the illustrative Reference implementation. | Attempt 3 visual-binding checker; vNext SVG checker; external-runtime scan; prohibited Reference-label scan. | `done` | `reference-visual-bindings/`, `visual-binding-evidence.json`, CSS-mask integration, visual-binding check pass, SVG check pass, zero Reference neutral-label matches. | Browser PNGs show the mapped icons in the focused Light states. | High for source identity and focused rendering; no dark-state visual acceptance claim. |
| The exact ten-step Drawer/disclosure sequence is complete and serial. | One fresh named Chrome session; resolved semantic refs; fresh snapshot after each state change; 10-row observation record. | `done` | [Serial observation](evidence/interaction/serial-observation.md) and [command log](evidence/interaction/command-log.md). | Six PNGs below. | High for the focused observed sequence. |
| Six untouched `1440 x 900` PNGs, hashes, command/browser/console records, and stable implementation digest are retained. | `System.Drawing` dimensions; SHA-256; pre/post implementation-tree digest; process/version inspection; CLI console and close. | `done` | [Browser record](evidence/interaction/browser-record.md), [implementation digest](evidence/implementation-digest.txt), PNG files, CLI snapshots, and Vite logs. | Visual inspection of all six PNGs. | High. |
| Failures and limits are classified without repairing generated bytes or claiming human acceptance. | Digest comparison; failure triage; two-cycle self-review. | `done` | Classification and self-review sections below; pre/post digest identical. | None. | High. |
| Scope is limited to the assigned Run root and no peer output was inspected. | Path-limited status and file inventory; work performed only from declared owners and Run 3. | `done` | Path-limited status lists only `attempt-8/runs/run-3/initial/`. | Worker protocol history. | High within the path-limited boundary. |

## Verification Methods and Results

### Frozen-owner and repository checks

| Check | Result | Limit |
| --- | --- | --- |
| Attempt 2 `check-fixed-input.ps1` | expected historical **not pass**, exit `1` | Same current-Manifest mismatch: `templates/business-app/design-manifest`; no new cause. |
| Attempt 2 product input | pass; 1 file | Existing user-level Git ignore permission warnings retained. |
| Approved Reference static check | pass | Static floor only. |
| Attempt 3 frozen input and provenance | pass; 24 files | Fixed source identity only. |
| Attempt 4 composite | expected historical **not pass**, exit `1` | Stopped only at the nested Attempt 2 current-Manifest mismatch. |
| Attempt 5 harness composite | expected historical **not pass**, exit `1` | Stopped only at the nested Attempt 4/Attempt 2 mismatch. |
| Attempt 5 canonical harness boundary | pass | Canonical empty harness only. |
| Attempt 6 product fixture input | pass; 5 files at baseline `2b3ebb0` | Product owner identity only. |
| Product fixture candidate check | pass | Roles and canonical-data-backed preview confirmed. |
| vNext candidate static check | pass | Contract structure only. |
| SVG checker against canonical empty harness | pass; 7 themed assets | Source misuse check only. |
| SVG rendering self-test | pass | CSS mask accepted; direct external image rejected. |
| Business-app Standard Pack | pass | 3 positive and 11 negative contract cases. |
| Business-workflow Standard Pack | pass | 27 concepts, 23 links, 5 configuration IDs, 23 roles, 2 modes, 72 contrast assertions, and recorded negative cases. |
| Manifest quality workflow | pass | 7 required phases and local links. |
| Source-boundary check | pass | Existing source-independence boundary. |
| Header/Drawer method check | pass after loading `System.Drawing` | Same environment prerequisite recorded by the freeze. |
| Attempt 8 Reference `node --check` | pass for `fixture.js` and `app.js` | Syntax only; no Run behavior claim. |

The three historical composite non-passes match the frozen expected cause.
Focused owners all passed, so no new owner drift or failure cause was observed.

### Run-local checks

| Check | Result | What it proves |
| --- | --- | --- |
| Harness configuration comparison | pass; 7/7 canonical blobs match | `.gitignore`, package/lockfile, TypeScript, and Vite configuration stayed byte-for-canonical equivalent. |
| Attempt 5 wrapper with `-RunRoot` | expected historical **not pass** | It reached the same nested Attempt 2 mismatch; no Run configuration mismatch was reported before that boundary. |
| Attempt 3 visual-binding checker | pass | Exact asset/evidence identity and source integration. |
| vNext SVG target checker | pass; 7 themed assets | No prohibited direct external-image rendering. |
| Runtime versions | pass | Node `22.14.0`; npm `10.9.2`. |
| External runtime reference scan | pass | No HTTP(S), CDN, or direct `<img>` runtime reference in `index.html` or `src/`. |
| `npm ci --no-audit --no-fund` | pass | 65 locked packages installed. |
| `npm run typecheck` | pass | TypeScript project builds cleanly. |
| `npm run build` | pass | Vite `5.4.14`; 34 modules transformed; production bundle emitted. |
| Implementation digest before/after capture | pass | Both observations equal `dcf527155aa23f20e87e3df17b109d751358d172a40296c24b91aceaa1b67169`; 22 files. |
| Exact Chrome capture | pass for completeness | 26 recorded command rows including the pre-session tooling failure; one successful fresh session; 10 serial observation rows; 6 PNGs. |
| PNG dimensions and hashes | pass | Six files, all `1440 x 900`, hashes below. |
| Final console | recorded, not zero-error | 1 error, 0 warnings; favicon HTTP 404 retained. |
| Capture cleanup | pass | Browser closed, Vite stopped, port 4175 listeners = 0. |

## Implementation digest

- Algorithm: SHA-256 over sorted `sha256  relative/path` LF lines, UTF-8
  without BOM.
- Scope: 22 Run implementation files excluding `node_modules/`, `dist/`,
  `evidence/`, `.playwright-cli/`, and the durable `worker-report.md`.
- Before capture:
  `dcf527155aa23f20e87e3df17b109d751358d172a40296c24b91aceaa1b67169`.
- After capture:
  `dcf527155aa23f20e87e3df17b109d751358d172a40296c24b91aceaa1b67169`.
- Full manifest: [implementation-digest.txt](evidence/implementation-digest.txt).

## Interaction evidence

The serial observation records the required
`expanded -> collapsed -> hidden/collapsed -> visible/collapsed -> expanded -> collapsed`
sequence while preserving the workspace task, `Overview` current treatment,
and `Activity` leaf boundary. See
[serial-observation.md](evidence/interaction/serial-observation.md) for all ten
before/action/after rows and
[command-log.md](evidence/interaction/command-log.md) for resolved refs, outputs,
and exit codes.

| PNG | Dimensions | SHA-256 |
| --- | --- | --- |
| [01 initial expanded](evidence/interaction/01-initial-expanded.png) | `1440 x 900` | `ab6f30e20cf46a0ffe4ec2e409de8eac69264c85ccf484e7b9e57191cf1374f0` |
| [02 parent collapsed before](evidence/interaction/02-parent-collapsed-before.png) | `1440 x 900` | `3f1e3669037688b208141588cbf7aae96210b5bf0165efcd3285582f13c9e152` |
| [03 Drawer hidden](evidence/interaction/03-drawer-hidden.png) | `1440 x 900` | `95c5a93b4fedf3275f8e667dd6568265d0f797639ab40453413d43c125efcfbd` |
| [04 Drawer visible collapsed](evidence/interaction/04-drawer-visible-collapsed.png) | `1440 x 900` | `273d2f84787800c314754b0d0d0152ba74833d99ed199ea92d403f106bfe8502` |
| [05 parent expanded](evidence/interaction/05-parent-expanded.png) | `1440 x 900` | `045da8ca6500a094880e98bdc32e2abff04a88d776a6746b8667323beece554f` |
| [06 parent collapsed after](evidence/interaction/06-parent-collapsed-after.png) | `1440 x 900` | `3f1e3669037688b208141588cbf7aae96210b5bf0165efcd3285582f13c9e152` |

`02` and `06` have identical hashes because their visible Drawer/collapsed
state and focused/hovered parent-row state are identical in the serial session.

## Failure and deviation classification

| Finding | Classification | Evidence and routing |
| --- | --- | --- |
| Attempt 2/4/5 composite wrappers do not pass. | Known historical composite non-pass; no new Run classification. | Exact cause is the frozen current-Manifest mismatch; focused Reference, Attempt 3, harness boundary, product fixture, vNext, SVG, Standard Pack, workflow, and source-boundary checks pass. No input or check was weakened. |
| First sandboxed `npx` open command exited `1` before creating a session because npm cache creation returned `EPERM`. | `observation-gap`, resolved without changing Run bytes. | The identical command succeeded through the approved execution path; the successful session completed all ten steps. Digest remained unchanged. |
| Chrome recorded `/favicon.ico` HTTP 404; console = 1 error/0 warnings. | `allowed-variance` for reproducibility routing, retained as a non-blocking implementation-owned runtime defect outside the focused behavior contract. | The Manifest, product prompt, and ten-step contract do not bind favicon delivery or require a zero-error console; the contract requires the counts to be retained. No repair was made and no zero-error claim is made. Artifact review may still treat it as undesirable. |
| No scoped Drawer/disclosure/leaf mismatch was observed mechanically. | No deviation classification asserted. | Mechanical evidence is complete, but meaningful equivalence and acceptance remain for artifact and human review. |

## Repository Evidence

- Run source, configuration, exact assets, digest, screenshots, command log,
  browser record, serial observation, server logs, and CLI snapshots all live
  under the assigned Run root.
- The implementation digest proves capture added evidence without changing
  generated bytes.
- Path-limited status shows only the assigned Run root as this worker's output.

## Supplementary Evidence

- Direct visual inspection of all six PNGs confirmed the intended visible
  state sequence at `1440 x 900`.
- Browser accessibility snapshots confirmed the action names, parent
  expanded/collapsed state, child presence/absence, Drawer landmark
  presence/absence, and the lack of disclosure state or child region on
  `Activity`.
- Supplementary browser evidence does not replace repository-visible files or
  human review.

## Review Triage

### Merge blockers

- None for the scoped worker handoff.

### Non-blockers

- The three expected historical composite non-passes remain visible.
- The first `npx` attempt needed an approved observation-tooling fallback.
- The untouched Run retains one favicon 404 console error.
- Artifact review, comparison across all three independent Runs, and human
  acceptance have not happened yet.

## Self-review

### Cycle 1: coarse defect extraction

- Potential blockers: none after confirming six PNGs, 10 serial steps, 26
  command rows, stable digest, fixed refs, and port cleanup.
- Potential non-blockers: historical composite non-passes, the observation
  tooling fallback, favicon 404, and unexercised broader theme/accessibility
  states are retained explicitly.
- Evidence weaknesses: this worker has no peer comparison, human decision, or
  broad production interaction evidence by design. Static exact-binding checks
  and the focused serial browser record prove only their named properties.
- Claim overreach removed: the report does not claim Manifest-only generation,
  zero console errors, dark-state visual acceptance, production readiness,
  cross-Run equivalence, or human acceptance.

### Cycle 2: blocker triage and shape check

- Merge blockers: none for parent review of this Run.
- Non-blockers: same four items above; no hidden input drift or capture
  incompleteness was found.
- Evidence shape status: pass. Main claims are reviewer-confirmable from the
  Run-local source, static check results, digest, command/browser records, and
  six PNGs.
- Reporting shape status: pass. Repository and supplementary evidence are
  separate, `UNCONFIRMED` decisions are visible, and blockers/non-blockers are
  distinct.
- Ready For PR?: no. No PR was requested, and this generated Run still requires
  orchestrator verification plus downstream artifact/human review.

### Required self-review answers

- Proven: independent scoped implementation, canonical harness configuration,
  exact asset identity/integration, typecheck/build, stable digest, complete
  ten-step sequence, six PNG dimensions/hashes, and preserved evidence.
- Partially proven: visible behavior is mechanically observed in the focused
  Light sequence; semantic quality outside that sequence is not broadly proven.
- Human-dependent: cross-Run usefulness, meaningful equivalence, visual
  acceptability, and final gate decision.
- Misleading wording: `accepted`, `equivalent`, `production-ready`, `zero-error`,
  `Manifest-only`, or `all themes verified` would exceed this evidence.

## Attainment Status

`done`

## Outcome

The repository now contains one independent, untouched Attempt 8 Run 3 with a
reproducible React build, stable frozen implementation digest, and complete
serial evidence for the required Drawer/disclosure behavior.

## Why It Matters

The orchestrator and later reviewers can inspect this Run as one comparable
input-preserving specimen, distinguish behavior transmission from Reference
code reuse, and route any visible deviation without retroactively repairing
the generated output.
