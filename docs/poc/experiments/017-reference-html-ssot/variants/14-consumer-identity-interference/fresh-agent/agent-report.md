# Fresh-agent report: Consumer identity interference gate

## Goal

Independently compare the current explicit-identity workspace with the mixed
semantic/explicit workspace, then test whether ordinary Consumer maintenance
requires validation-specific identity or Core changes and whether both modes
still fail closed for missing and duplicate explicit identities.

## Attainment status

`done`

All requested positive comparisons, maintenance copies, and isolated negatives
were exercised with the current CLI/Core. Fixed References, fixed Targets,
CLI/Core, and scenario overrides were not edited.

## Outcome

Both modes passed the unchanged baseline and the same four-part maintenance
change without any validation-identity, scenario, Reference, or Core change.
Both modes rejected the same missing and duplicate explicit-key mutations with
the same signatures. The mixed/hybrid mode retained 27 observed identities
while reducing Consumer `data-ref` annotations from 27 to 21.

Recommendation: **mixed/hybrid** for the next bounded gate. It was marginally
easier for this fresh agent because six product-natural identities required no
Consumer validation annotation, while its build, maintenance edit, comparison,
and negative behavior were otherwise identical to the explicit baseline. This
is not evidence for removing the remaining 21 explicit keys or freezing a
Profile.

## Why it matters

The result provides bounded evidence that existing native landmarks and
already-needed ARIA control relationships can reduce Consumer-only metadata
without adding maintenance work or weakening ambiguity handling for an explicit
key. It also keeps the important limit visible: browser comparison proves
observable transfer, not design correctness.

## Source independence

Read before or during the work:

- repository `AGENTS.md`;
- `docs/poc/reference-html-observation-boundary.md`;
- `variants/13-cold-start-portability/baseline-packet.md`;
- `cli/README.md` and the CLI `--help` output;
- only the browser-start portion of `cli/reference-ui.mjs`, after a DevTools
  timeout required operational diagnosis;
- the fixed A/B Reference and Target inputs named in the assignment, including
  package manifests, locks, Vite configuration, source, CSS, and scenario
  overrides.

Not read:

- the root agent's result for this gate;
- external-mapping or instrumentation experiment notes;
- prior gate results, self-reviews, verification records, or historical output.

Experiment-knowledge additions beyond the allowed packet: **0**. Reading the
fixed comparison inputs and the allowed CLI source on failure was necessary to
perform the assignment, not an additional experiment result source.

## Identity classification

| Mode | Observed identities | Explicit `data-ref` | Product-natural semantic/relational | Mode |
| --- | ---: | ---: | ---: | --- |
| A: explicit baseline | 27 | 27 | 0 | `explicit-data-ref` |
| B: mixed candidate | 27 | 21 | 6 | `mixed-data-ref-semantic` |

The six mixed identities were:

- `semantic:role:banner` from the unique native `<header>` banner;
- `semantic:role:main` from the unique native `<main>` landmark;
- `semantic:controlled-by:navigation-toggle` from the existing navigation
  toggle's `aria-controls` relationship;
- `semantic:controlled-by:navigation-parent` from the existing disclosure's
  `aria-controls` relationship;
- `semantic:controlled-by:user-menu-toggle` from the existing user-menu
  toggle's `aria-controls` relationship;
- `semantic:controlled-by:filter-toggle` from the existing filter disclosure's
  `aria-controls` relationship.

The native elements and ARIA relationships are product-natural accessibility
semantics. `data-ref` is validation-only annotation. No ARIA, landmark, wrapper,
or visible product content was added to obtain the six mixed identities.

## Acceptance criteria and verification

| Acceptance criterion | Verification method | Result | Repository evidence | Confidence |
| --- | --- | --- | --- | --- |
| Re-run A and B with current CLI/Core | Fresh snapshots, byte-identical Target source copies, Vite 5.4.14 builds, then CLI verify | pass | `evidence/*-reference.snapshot.json`, `evidence/*-baseline.report.json` | high for Chrome 151 |
| Apply the same maintenance changes without altering fixed inputs | Isolated source copies, source diff, build, and verify against each fixed snapshot | pass | `explicit/maintenance-target/`, `mixed/maintenance-target/`, `evidence/*-maintenance.report.json` | high for observed contract |
| Preserve observed behavior/design | Compare baseline versus maintenance report status and complete diagnostic payload | pass; both have identical 24-diagnostic payloads | the four baseline/maintenance reports | high for CLI-observed states/styles; human design correctness remains independent |
| Missing explicit identity fails closed | Remove only `data-ref="new-request-action"`, build, verify | fail as required | `evidence/*-negative-missing.report.json` | high |
| Duplicate explicit identity fails closed | Add `data-ref="new-request-action"` to exactly one second button, build, verify | fail as required | `evidence/*-negative-duplicate.report.json` | high |
| No Core weakening | Inspect changed-file scope and use unchanged CLI/Core | pass | only this `fresh-agent/` tree is newly created; Core changes: 0 | high |

## Baseline comparison results

| Case | Snapshot | Verify | Errors / signatures | Diagnostics | Console | Network |
| --- | --- | --- | ---: | ---: | --- | --- |
| A explicit | 27 elements, 11 scenarios, 0 accessibility issues | pass | 0 / 0 | 24 geometry/extra-element | 0 errors | 0 external, 0 failed |
| B mixed | 27 elements, 11 scenarios, 0 accessibility issues | pass | 0 / 0 | 24 geometry/extra-element | 0 errors | 0 external, 0 failed |

Both reports used `Chrome/151.0.7922.109`. The 24 diagnostics are informational
and were not suppressed. A and B used their own fixed snapshots and their own
existing scenario-override path; the override content was already identical.

## Maintenance change and cost

The following conceptually identical changes were applied to each isolated
Target:

1. Rename the filter form local ID and update its existing `aria-controls`:
   `gate-filter-form` or `mixed-search-form` to `maintained-filter-form`.
2. Rename product class `task-introduction` to `workspace-heading` and update
   all three matching product CSS selectors.
3. Add a neutral `workspace-content` wrapper around the search and result cards.
4. Add one unrelated `hidden` element after that wrapper.

| Cost | A explicit | B mixed |
| --- | ---: | ---: |
| Source files changed | 2 | 2 |
| Conceptual edit locations | 8 | 8 |
| Diff lines | +11 / -8 | +11 / -8 |
| Local-ID/ARIA locations | 2 | 2 |
| Product class/CSS locations | 4 | 4 |
| Wrapper locations | 1 | 1 |
| Hidden-element locations | 1 | 1 |
| Validation identity changes | 0 | 0 |
| Identity count before/after | 27 / 27 explicit | 21 / 21 explicit plus 6 semantic |
| Scenario/override changes | 0 | 0 |
| Reference changes | 0 | 0 |
| Core changes | 0 | 0 |

Static extraction confirmed the complete `data-ref` sequence was unchanged in
each maintenance copy. Each maintenance report passed with 0 errors and the
exact same complete diagnostic payload as its baseline report, not merely the
same diagnostic count. Console and network remained clean.

## Negative results

Each negative was copied from its unmodified baseline Target, so the identity
mutation was isolated from the maintenance experiment.

| Mode | Mutation | Exit | Status | Error signature | Occurrences | Diagnostics | Console/network |
| --- | --- | ---: | --- | --- | ---: | ---: | --- |
| A explicit | remove `data-ref="new-request-action"` | 1 | fail | `elements.new-request-action` | 20 | 24 | 0 console errors; 0 external/failed requests |
| A explicit | duplicate it onto the pager's `Next` button | 1 | fail | `duplicateKeys` | 20 | 24 | 0 console errors; 0 external/failed requests |
| B mixed | remove `data-ref="new-request-action"` | 1 | fail | `elements.new-request-action` | 20 | 24 | 0 console errors; 0 external/failed requests |
| B mixed | duplicate it onto the pager's `Next` button | 1 | fail | `duplicateKeys` | 20 | 24 | 0 console errors; 0 external/failed requests |

Missing samples report expected `present`, actual `missing`. Duplicate samples
report expected `unique`, actual `new-request-action`. The 20 occurrences cover
the initial state and all captured scenario states; they collapse to one stable
signature in each report.

## Exact commands

Commands were run from the repository root unless a different working directory
is named.

Environment/setup, run from `fresh-agent/`:

```powershell
npm ci
.\node_modules\.bin\vite.cmd build explicit/baseline-target
.\node_modules\.bin\vite.cmd build mixed/baseline-target
.\node_modules\.bin\vite.cmd build explicit/maintenance-target
.\node_modules\.bin\vite.cmd build mixed/maintenance-target
.\node_modules\.bin\vite.cmd build explicit/negative-missing-target
.\node_modules\.bin\vite.cmd build explicit/negative-duplicate-target
.\node_modules\.bin\vite.cmd build mixed/negative-missing-target
.\node_modules\.bin\vite.cmd build mixed/negative-duplicate-target
```

Snapshots:

```powershell
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs snapshot docs/poc/experiments/017-reference-html-ssot/reference/index.html --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-reference.snapshot.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-reference-artifacts
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs snapshot docs/poc/experiments/017-reference-html-ssot/variants/02-mixed-semantic/reference/index.html --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-reference.snapshot.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-reference-artifacts
```

Baseline and maintenance verifies:

```powershell
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/explicit/baseline-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-baseline.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-baseline-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/consumers/transferability-gate-react/scenario-overrides.json
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/mixed/baseline-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-baseline.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-baseline-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/02-mixed-semantic/target-react/scenario-overrides.json
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/explicit/maintenance-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-maintenance.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-maintenance-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/consumers/transferability-gate-react/scenario-overrides.json
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/mixed/maintenance-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-maintenance.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-maintenance-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/02-mixed-semantic/target-react/scenario-overrides.json
```

Negative verifies:

```powershell
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/explicit/negative-missing-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-negative-missing.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-negative-missing-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/consumers/transferability-gate-react/scenario-overrides.json
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/explicit/negative-duplicate-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-negative-duplicate.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/explicit-negative-duplicate-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/consumers/transferability-gate-react/scenario-overrides.json
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/mixed/negative-missing-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-negative-missing.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-negative-missing-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/02-mixed-semantic/target-react/scenario-overrides.json
node docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs verify docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/mixed/negative-duplicate-target/dist/index.html --baseline docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-reference.snapshot.json --out docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-negative-duplicate.report.json --artifacts docs/poc/experiments/017-reference-html-ssot/variants/14-consumer-identity-interference/fresh-agent/evidence/mixed-negative-duplicate-artifacts --scenario-overrides docs/poc/experiments/017-reference-html-ssot/variants/02-mixed-semantic/target-react/scenario-overrides.json
```

Successful reruns set `$env:REFERENCE_UI_DEBUG='1'` immediately before the same
CLI command to expose browser startup progress; this does not alter comparison
semantics.

## Setup friction and errors

- The copied targets had no `node_modules`. One `npm ci` at their owned common
  parent installed only their already-declared, lock-pinned dependencies. Local
  Node `v22.14.0` and npm `10.9.2` exactly matched the declared engines.
- `npm ci` succeeded but reported two dependency-audit findings (one moderate,
  one high). No audit fix or dependency change was attempted.
- `node .../reference-ui.mjs --help` printed valid usage but exited 1.
- The first explicit snapshot attempt and the first explicit maintenance verify
  attempt each exited 1 after about 16 seconds with
  `Timed out waiting for DevTools command Page.enable`. Re-running the exact
  comparison with `REFERENCE_UI_DEBUG=1` succeeded. No input or implementation
  was changed. This intermittent Chrome/CDP startup behavior affected both the
  initial baseline phase and maintenance phase; it is not evidence favoring A
  or B.
- No runtime console errors, external requests, or failed network requests were
  present in any successful snapshot or report.

## Actions taken

- Created byte-identical source copies of each fixed Target under this directory.
  Hash comparison covered all seven non-generated files per Target and found
  zero differences before mutation.
- Built baseline, maintenance, missing-key, and duplicate-key copies.
- Captured two fresh Reference snapshots and ten sets of browser artifacts
  (two baselines, two maintenance cases, four negatives, plus Reference captures).
- Preserved complete raw CLI JSON and screenshots under `evidence/`.

## Code changes

Only isolated copies and this report were created under `fresh-agent/`. No
accepted Reference, fixed Target, CLI, Core, scenario override, or historical
evidence was edited. No files were staged, committed, or pushed.

## Verification methods

- SHA-256 tree comparison for fixed Target copy provenance;
- Vite production builds using the existing lock-pinned toolchain;
- current Chrome-backed CLI snapshots and verifies;
- report-field inspection for status, errors, unique signatures, diagnostics,
  console errors, external requests, and failed requests;
- static identity extraction before and after maintenance;
- exact JSON comparison of baseline and maintenance diagnostic payloads;
- changed-scope inspection with Git status.

## Repository evidence

- `evidence/explicit-reference.snapshot.json`
- `evidence/mixed-reference.snapshot.json`
- `evidence/explicit-baseline.report.json`
- `evidence/mixed-baseline.report.json`
- `evidence/explicit-maintenance.report.json`
- `evidence/mixed-maintenance.report.json`
- `evidence/explicit-negative-missing.report.json`
- `evidence/explicit-negative-duplicate.report.json`
- `evidence/mixed-negative-missing.report.json`
- `evidence/mixed-negative-duplicate.report.json`
- corresponding browser screenshots under `evidence/*-artifacts/`
- isolated sources under `explicit/` and `mixed/`

## Supplementary evidence

None. All claimed comparison outcomes are preserved inside the owned repository
tree. Terminal timing for the two transient CDP failures is recorded here but
is not used to support the A-versus-B recommendation.

## Review triage and self-review

### Cycle 1: coarse defect extraction

- Potential blockers: none found.
- Potential non-blockers: intermittent `Page.enable` startup timeout; dependency
  audit warning; Chrome-only scope; 24 retained informational diagnostics.
- Evidence weaknesses: this is one screen family, one maintenance edit set, one
  explicit negative key, and one browser. It does not cover assistive technology,
  responsive behavior, or ambiguous natural-semantic negatives.
- Claim overreach avoided: the result does not claim design correctness, zero
  Consumer interference, safe conversion of all keys, or a stable Profile.

### Cycle 2: blocker triage and shape check

- Merge blockers: none for handing the experiment to the parent evaluator.
- Non-blockers are explicitly separated above.
- Evidence shape: complete raw JSON and screenshots are repository-visible;
  repository and supplementary evidence are separated.
- Reporting shape: outcome, bounded recommendation, uncertainty, and human
  acceptance boundary are explicit.
- Ready for PR: not applicable; the assignment prohibited staging, committing,
  and pushing, and the parent/human gate still owns acceptance.

## Now / next

Now: the fresh-agent evidence supports mixed/hybrid for this bounded Consumer
identity-interference gate.

Next: the parent evaluator should compare this independent result with the other
gate evidence and apply the human acceptance boundary before promoting any
long-lived guidance.

## Open questions

- Does the same no-extra-maintenance result hold for other screen families and
  maintenance changes that directly alter one of the six natural relationships?
- Should intermittent Chrome/CDP startup reliability be investigated separately?
- Human acceptance remains required for the recommendation and for any change to
  long-lived PoC guidance.
