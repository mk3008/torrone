---
task_id: run-3
attempt: 2
scope: observation-only capture recovery
status: ready_for_review
implementation_commit: 810badd
prior_report_commit: 739c0c9
---

# Run 3 observation-recovery report

## Outcome

`ready_for_review` — this is an observation-tool recovery, not a React
implementation correction. The existing derived application was started only
with its fixed `npm run dev` command at `127.0.0.1:4175`, observed through
HTTP, and stopped afterward.

## Fixed-state capture

The five required URLs were captured at a `1440 × 900` CSS-pixel viewport by
the Codex in-app browser. [Observation evidence](observation-evidence.json)
records the exact query strings, observed state signals, and returned
screenshot byte counts.

| State | Drawer | Workspace parent | Selected location | Screenshot bytes |
| --- | --- | --- | --- | ---: |
| light-drawer-open | present | expanded | Overview | 70,647 |
| dark-drawer-open | present | expanded | Overview | 73,360 |
| drawer-hidden | absent | not applicable | Overview | 51,017 |
| parent-collapsed | present | collapsed | Overview | 70,423 |
| selected-section-01 | present | expanded | Section 01 | 70,855 |

The browser capability returns screenshot bytes for observation but does not
materialize them as repository files. The durable evidence is therefore the
state-by-state observation record above and in the JSON file, not a claim of
new implementation output. A local PNG made before the clarification arrived
remains untouched outside this recovery record.

## Server cleanup

The started listener was verified as this Run's Vite process (`node.exe`, PID
`29220`, command line rooted at this Run directory) before it was stopped.
The fixed port no longer had a listener afterward.

## Non-destructive integrity checks

- `git diff --quiet 810badd` over the application source, fixed visual
  bindings, harness copies, and visual-binding evidence: passed.
- Attempt 3 visual-binding validation against the existing Run root: passed.
- React harness preflight with `-RunRoot` against the existing Run root:
  passed, including its Reference, product, Attempt 3, and Attempt 4 input
  checks.

No product/UI source, fixed input, frozen-harness copy, Attempt 1 initial
report, or experiment contract was changed by this recovery.
