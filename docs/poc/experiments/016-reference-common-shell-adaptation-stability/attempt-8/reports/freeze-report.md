# Attempt 8 interaction freeze report

## Task metadata

| Field | Value |
| --- | --- |
| Task | `interaction-freeze` |
| Attempt | `2` |
| Worker thread | `019fee67-8063-7c70-9baf-1cf96255bd9e` |
| Execution surface | `codex-thread-ui` |
| Observed base commit | `3f5dbb754531e4c6576f5660f229fdf1c7abc960` |
| Model | configured default; no override authorized |
| Durable report | `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-8/reports/freeze-report.md` |

## Goal

Freeze one complete, reproducibly identified input set and one observable
interaction contract so three later independent React Runs can test behavior
transmission from the accepted interactive Reference without copying its
implementation or changing any existing owner.

## Now / Next

- Now: the complete Manifest, accepted Reference, product fixture, harness,
  exact prompt, model policy, capture condition, and ten-step interaction
  sequence are frozen and ready for orchestrator review.
- Next: the orchestrator reviews this report and the four freeze files. This
  worker does not dispatch Runs or accept the freeze.

## Open Questions

- The resolved generation model and reasoning effort remain `UNCONFIRMED` until
  dispatch. The frozen policy permits no override: all three Runs must use the
  same configured default, record the resolved values, and stop before
  generation if they differ.
- Behavior transmission and meaningful equivalence remain `UNCONFIRMED` until
  three untouched Runs, focused capture, artifact review, and human review
  exist.
- Chrome availability and actual browser version remain `UNCONFIRMED` until a
  Run starts its frozen Playwright CLI capture. CLI `0.1.18` command syntax was
  verified during this freeze; no Run browser was opened.

## Actions Taken

- Read the repository guidance, Attempt 8 plan, accepted Reference and its
  authoring report, current Header and Drawer concepts, Attempt 7 freeze
  records, Attempt 5 harness boundary, Attempt 6 product fixture owner, and the
  three-run reproducibility protocol.
- Kept the current Header and Drawer concepts as the normative behavior owners;
  no Manifest authoring or post-edit Manifest review was applicable.
- Preserved the product fixture's initial `Workspace` expanded state instead
  of promoting the illustrative Reference's neutral collapsed state.
- Added a complete owner inventory with Git blob/tree identities and SHA-256
  worktree-byte hashes, one exact Run prompt, and one serial ten-step capture
  contract.
- Ran the existing owner, Standard Pack, Manifest workflow, source-boundary,
  Reference syntax, and focused inventory checks without changing them.
- Ran two self-review cycles and corrected the Playwright browser option,
  protocol classification wording, source-of-truth order, full capture-command
  order, and carried-forward Reference observation limit.
- Correction attempt 2 reconciled the Attempt 3 baseline with the 40-character
  owner value `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff` and regenerated the
  machine-readable inventory digest without changing any owner or contract.

## Code Changes

This task adds docs-only experiment material:

- `attempt-8/freeze/input-set.md`;
- `attempt-8/freeze/input-inventory.json`;
- `attempt-8/freeze/fixed-prompt.md`;
- `attempt-8/freeze/interaction-contract.md`; and
- this report.

No Attempt 8 README change was required because the frozen input set and this
report link all new artifacts directly. No Manifest, accepted interactive
Reference, approved Reference, product fixture owner, harness owner, historical
Attempt, generated Run, runtime, package, validator, or interaction DSL changed.

## Exact owner inventory

The detailed per-file authority is
[`input-inventory.json`](../freeze/input-inventory.json), SHA-256
`b95f6b624ad35c957c3c5336ccdcc9fe71483f22b6d42d04df205e147498b076`.
It records 78 verified path entries; repeated owner-inventory files are counted
where both their authority and their listed files are checked.

| Owner or frozen input | Identity | Count and boundary |
| --- | --- | --- |
| Complete Standard Pack Manifest | Commit `3f5dbb754531e4c6576f5660f229fdf1c7abc960`; tree `1f493af6aaae09b6c89d35f46b45a0f8ac35ffce` | 46 files, each with Git blob and SHA-256. Complete normative snapshot. |
| Accepted interactive Reference | Same commit; tree `c98218e35fe491fa7bd14113db135f31c427ef41` | 5 files, each with Git blob and SHA-256. Illustrative executable behavior only. |
| Product fixture owner | Inventory blob `c35e140b1e2a26c4373b9ca6338282f82c01820b`; inventory SHA-256 `23064bfa7960cdfce6301de7bc313076b4c89443126a0db73e300bcff7aaf542`; baseline `2b3ebb0128fc7bdf37d597f128b7bdefc2287363` | 5 owner files. Sole authority for product facts and initial state. |
| React harness owner | Inventory blob `66cbe4dcdc83b522389cfbcb2be8a18d76bc7126`; inventory SHA-256 `c6d1b1ed51b5df3b282b8520fe3bc6196c38777b4726cb14d217da7f59b2a86d`; owner commit `e54d05742b7097bfe1e4670ebc1a8c83b2155e14` | 14 files. Fixed React/Vite/npm/plain-CSS condition; implementation source remains Run-owned. |
| Attempt 3 exact visual inputs | Inventory blob `16101cd90a5bcbee0cfceff24bbc2b24c72b460f`; inventory SHA-256 `c99507b6f221809ca59062d8667eb56dded6c35106cc4ebd392e0f809886d8f9`; baseline `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff` | Reused existing exact visual-binding authority. |
| Attempt 4 vNext/SVG contracts | Inventory blob `d92410750d63ac76582d0c0912436e2f0adb7ef3`; inventory SHA-256 `27a6e1414497a7dfcb8ff29b2d90f14f7096a7e97f31c79a999b726be108db7a`; baseline `a3ef3fa680314a3b2721076698b13dbe97d0ead4` | Reused existing layered and SVG authority. |
| Three-run protocol | Blob `f0f1f7dc816fc6e682508e6ff8b0ea899c0037ca`; SHA-256 `e7d1b1c86df45079cf68611e349eca95f54b002bba2fefb06a1bbec179fa0a25` | Untouched-run, rerun, evidence, and human-gate authority. |
| Exact fixed prompt | [`fixed-prompt.md`](../freeze/fixed-prompt.md), SHA-256 `cf309330242c273b35629ca51919d3b87aa9fee8363269dc0a95faac2f8d9392` | Byte-identical prompt for all three Runs; assigned path and transport metadata add no implementation instruction. |
| Interaction and capture contract | [`interaction-contract.md`](../freeze/interaction-contract.md), SHA-256 `0d27b54f98fae5bbf176f9393ac957511e358d2e3dedd2cbbd8940b4ee497cee` | 10 serial steps, 6 named PNGs, `1440 × 900`, Playwright CLI `0.1.18`, Chrome, command log, console counts, and hashes. |
| Frozen input set | [`input-set.md`](../freeze/input-set.md), SHA-256 `09d9bd697fda4c2e54c5d0fc6ac38159d8f666b6cb8aba135ac10e43804b13cf` | Owner order, no-copy boundary, generation/model policy, preflight limits, and dispatch boundary. |

## Interaction contract summary

The exact contract begins from the product fixture's Light, Drawer-open,
`Workspace`-expanded, `Overview`-current state. It then:

1. records the product initial state;
2. collapses `Workspace` to establish the focused before state;
3. verifies `Activity` has no disclosure behavior without activating it;
4. activates `Close navigation`;
5. verifies hidden Drawer/body/boundary/reserved-space removal while the
   workspace, current destination, and collapsed disclosure state remain;
6. activates `Open navigation`;
7. verifies the same Drawer content returns with disclosure still collapsed;
8. expands `Workspace` and verifies only its children/disclosure state change;
9. collapses `Workspace` again and verifies the same stable dimensions; and
10. records final state, dimensions, hashes, commands, browser version, exit
   codes, and console counts.

Every Run may operate the accepted Reference to understand those visible
transitions, but the fixed prompt and contract explicitly prohibit copying its
DOM, fixture shape, JavaScript organization, CSS, state storage, Observation
panel, or file layout.

## Acceptance matrix

| Acceptance criterion | Verification method | Result | Repository evidence | Supplementary evidence | Confidence |
| --- | --- | --- | --- | --- | --- |
| Complete Manifest, accepted Reference, product fixture, harness, exact prompt, model policy, viewport, and capture method have reproducible identities. | Parse inventory; verify every path, Git blob, owner blob, SHA-256, tree, file count, and frozen-document digest. | `done` | `input-inventory.json`; focused inventory check passed for 78 paths, 46 Manifest files, 5 Reference files, 5 product files, and 14 harness files. | None. | High. |
| One exact prompt and one model/effort policy apply to all three independent Runs. | Inspect prompt SHA-256 and generation policy. | `done` for freeze; resolved runtime values remain `UNCONFIRMED`. | `fixed-prompt.md`, `input-set.md`, and inventory generation policy. | Resolution occurs only at dispatch. | High for policy; no claim about future resolved values. |
| Initial state and every required Drawer/disclosure action, result, and stable state are frozen, including leaf non-disclosure. | Count ten table steps; inspect six filenames, command order, before/action/after requirements, and product initial state. | `done` | `interaction-contract.md`; focused check observed 10 steps and 6 PNG names. | Browser behavior remains `UNCONFIRMED` until Runs exist. | High for contract completeness. |
| Runs may observe behavior but cannot copy Reference implementation or neutral fixture. | Inspect fixed prompt, input boundary, interaction contract, and Reference README. | `done` | All three frozen Markdown files name the prohibited DOM, fixture-shape, JavaScript, CSS, state-storage, Observation-panel, and file-layout copying boundaries. | None. | High. |
| Existing preflight outcomes and limits remain visible without weakening checks. | Re-run owner and Standard Pack checks; compare causes with Attempt 7 report. | `done` | Exact result table below retains the historical composite non-pass and focused passes. | Reference authoring browser evidence is carried forward with its `file:` limitation. | High. |
| Reference, Manifest, fixture owner, historical output, and generated Runs are not modified. | Path-limited tracked diff and scoped status inspection. | `done` | No tracked diff under any prohibited owner or Attempt; only the five allowed Attempt 8 documentation paths are added. | Shared worktree caveat below. | High for tracked and task-owned paths. |
| Required final diff and docs checks pass. | `git diff --check`, focused untracked-file whitespace/final-newline checks, JSON parse, and local-link inspection. | `done` | Final checks passed for 5 new files, 7 local links, 78 inventory paths, and no prohibited tracked diff. | None. | High. |

## Preflight results and limits

| Check | Observed result | Meaning and retained limit |
| --- | --- | --- |
| Attempt 2 `check-fixed-input.ps1` | **not pass**, exit 1: `Approved baseline differs from working tree: templates/business-app/design-manifest` | Known historical 52-file bundle pins the old auxiliary Manifest. It reported no Reference path drift and is not converted to pass. |
| Attempt 2 `check-product-input.ps1` | **pass**, 1 file | Historical product input remains intact. The command also emitted existing user-level Git ignore permission warnings. |
| Approved Reference `check-reference.ps1` | **pass** | Approved runnable Reference static floor remains valid. |
| Attempt 3 `check-attempt-3-input.ps1` | **pass**, 24 files | Exact visual-binding inventory and provenance remain intact. |
| Attempt 4 `check-attempt-4-input.ps1` | **not pass**, exit 1 | It reached the nested Attempt 2 check and stopped only on the same current-Manifest mismatch, then reported `Reference-owned input preflight failed.` |
| Attempt 5 `check-react-harness-input.ps1` | **not pass**, exit 1 | It reached nested Attempt 4/Attempt 2 and stopped only on the same mismatch, then reported `Attempt 4 fixed-input preflight failed.` |
| Attempt 5 harness boundary | **pass** | No common-shell implementation or prohibited dependency surface exists in the canonical empty harness. |
| Attempt 6 product fixture preflight | **pass**, 5 files at baseline `2b3ebb0` | Product labels, hierarchy, and supplied initial state remain intact. |
| vNext candidate static check | **pass** | Layered contract remains intact. |
| SVG target check | **pass**, 7 themed assets | Canonical empty harness contains no prohibited direct-image use. |
| SVG rendering self-test | **pass** | CSS mask accepted; intentional direct external image rejected. |
| Business-app Standard Pack | **pass** | 3 positive and 11 negative contract cases. |
| Business-workflow Standard Pack | **pass** | 27 concepts, 23 index links, 5 configuration IDs, 23 roles, 2 modes, 10 override values, 8 negative cases, 72 contrast assertions, and 2 binding fixtures. |
| Manifest quality workflow | **pass** | 7 required phases and local workflow links valid. |
| Source-boundary check | **pass** | Existing source-independence boundary remains intact. |
| Header/Drawer method check | Initial raw invocation **not pass** before assertions because `[System.Drawing.Image]` was not loaded; same script **pass** after `Add-Type -AssemblyName System.Drawing` | Environment assembly-loading prerequisite, not an Attempt 8 content failure. No script or assertion was weakened. |
| Attempt 8 Reference `node --check` | **pass** for `fixture.js` and `app.js` | Existing accepted Reference JavaScript remains syntactically valid. |
| Playwright CLI command preflight | **pass** for `@playwright/cli@0.1.18 playwright-cli open --help` | Confirmed valid `--browser` values and corrected the frozen command from invalid `chromium` to valid `chrome`. No browser or Run was opened. |
| Focused inventory assertion | **pass** | 78 paths; 46 Manifest, 5 Reference, 5 product, 14 harness; 10 interaction steps. |
| Attempt 2 identity correction | **pass** | Owner, input set, inventory, and report use `1d805e8f4fc30f30b00d88d7e69ab90a0c5c24ff`; input-set SHA-256 is `09d9bd697fda4c2e54c5d0fc6ac38159d8f666b6cb8aba135ac10e43804b13cf`; corrected inventory SHA-256 is `b95f6b624ad35c957c3c5336ccdcc9fe71483f22b6d42d04df205e147498b076`; fixed prompt and interaction contract digests are unchanged. |
| Markdown link check | **pass** | 3 local links across the three freeze Markdown files. |
| `git diff --check` | **pass** after final report save | Tracked diff has no whitespace error; the five untracked task files passed the focused check below. |
| Focused untracked-file check | **pass** for all five task files after final report save | No trailing whitespace, every file has a final newline, and `git diff --no-index --check` produced only expected LF-to-CRLF working-copy warnings. |

The known composite non-pass remains a potential dispatch concern for the
orchestrator. This freeze preserves its exact cause and adds no waiver or
replacement validator. No existing check failed for a new content-related
reason, so the worker stop condition was not triggered.

The accepted Reference authoring browser exercise remains supplementary
evidence. Playwright CLI rejected direct `file:` automation, so the unchanged
static files were served over local HTTP. Direct-file support was
source-inspected, no screenshot was retained, and the report recorded the
focused state sequence, leaf observation, and zero console errors/warnings.
That evidence does not prove a later Run or production behavior.

## Verification Methods

| Method | Result |
| --- | --- |
| Machine-readable owner/path/blob/SHA verification | Pass for 78 recorded entries and both frozen Git trees. |
| Focused prompt/contract assertions | Pass for no-copy wording, product initial state, 10 steps, 6 PNGs, and valid Chrome command. |
| Existing owner preflights | Focused owners pass; three composite wrappers retain the exact historical Manifest mismatch. |
| Standard Pack, Manifest workflow, source-boundary, vNext, SVG, and Reference checks | Pass within the limits above. |
| Path-limited Git inspection | Pass; prohibited tracked paths unchanged. |
| Final JSON/link/whitespace/diff inspection | Pass for 78 inventory paths, 10 interaction steps, 5 new files, 7 local links, and no prohibited tracked diff. |

## Repository Evidence

- The complete per-file inventory and digests are repository-visible in
  `freeze/input-inventory.json`.
- The prompt and interaction contract are standalone frozen inputs rather than
  inferred chat instructions.
- Current Header and Drawer concepts retain normative ownership; the accepted
  Reference remains illustrative and the Attempt 6 fixture remains the sole
  product-fact owner.
- Existing owner checks expose the historical composite limitation while the
  focused owner roots and Standard Pack remain green.
- No generated Run or browser capture was created by this task.

## Supplementary Evidence

- Accepted Reference authoring evidence records
  `visible/collapsed → hidden/collapsed → visible/collapsed → visible/expanded → visible/collapsed`, a leaf with no disclosure control, and zero console errors or warnings in one local-HTTP Chromium observation.
- That evidence is not duplicated or promoted to proof of future Run behavior.
  It remains weaker than retained Run-local capture because no screenshot is
  stored and the direct `file:` path was not automated.

## Review Triage

### Merge blockers

- None for this worker scope.

### Non-blockers

- The known Attempt 2/4/5 composite non-pass remains visible for orchestrator
  dispatch review; focused owner checks prove no new owner drift.
- The Header/Drawer method script requires explicit `System.Drawing` assembly
  loading in this PowerShell environment.
- The shared worktree contains unrelated pre-existing untracked paths,
  including an Attempt 6 Playwright stdout file. Claims are limited to the
  task-owned paths and path-limited tracked diff.
- Actual Run model, effort, Chrome version, behavior, and human acceptance are
  intentionally `UNCONFIRMED` at the freeze stage.

## Self-review

### Cycle 1 — coarse defect extraction

- Potential blockers: an initially frozen `--browser chromium` option was not
  valid for Playwright CLI `0.1.18`; it was corrected to `--browser chrome`
  before handoff. No blocker remains from that finding.
- Potential non-blockers: configured-default model resolution is deferred;
  historical composite preflights remain not pass; Reference direct-file
  automation remains unexercised.
- Evidence weaknesses: the first draft named only initial capture commands and
  did not carry the Reference delivery-protocol limit into the input set. The
  final contract now freezes the full click/snapshot/screenshot order, and the
  input set retains that limitation.
- Claim overreach: the report does not call this Manifest-only evidence, does
  not claim a generated Run, and does not infer human acceptance.

### Cycle 2 — blocker triage and shape check

- Merge blockers: none. The final post-report whitespace, link, inventory, and
  diff checks passed.
- Non-blockers: environment assembly loading, shared unrelated untracked files,
  configured-default runtime resolution, and the accepted Reference's local-
  HTTP observation limit remain explicit.
- Evidence shape status: pass. Every freeze criterion maps to a repository
  file, owner check, digest assertion, or explicit `UNCONFIRMED` boundary.
- Reporting shape status: pass. Repository and supplementary evidence are
  separated; historical non-pass and human-decision boundaries are visible.
- Ready For PR?: yes for orchestrator review. No commit or PR was requested.

Proven criteria are the complete owner freeze, exact prompt/policy, complete
ten-step contract, no-copy boundary, preserved preflight classification, and
prohibited-path isolation. No freeze criterion is partially proven after final
checks. Actual Run execution and human acceptance remain outside this task.
Wording that claimed Manifest-only generation, resolved model identity, Run
equivalence, production readiness, or human acceptance would mislead a
reviewer and is intentionally absent.

## Recommendation

Accept this worker output for orchestrator review as the complete Attempt 8
freeze candidate. If accepted, dispatch all three Runs only from these exact
inputs and only after recording equal resolved model/effort values. Preserve
the first-pass Run bytes, route any later deviation through the reproducibility
protocol, and do not repair an individual Run.

## Attainment Status

`done`

## Outcome

The repository now has one reviewable, digest-identified Attempt 8 input set
that can give three isolated Run workers the same product facts, illustrative
behavior boundary, implementation freedoms, prompt, model policy, capture
condition, and serial interaction expectations.

## Why It Matters

Reviewers can distinguish whether later implementations transmit the scoped
Drawer and disclosure behavior from whether they copied one example. The
frozen contract also preserves product ownership and makes observation gaps,
historical preflight limits, and human-only judgment visible before any Run is
created.
