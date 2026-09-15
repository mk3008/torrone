---
type: Attempt 8 Run verification record
run: 2
status: mechanically verified; awaiting review
---

# Attempt 8 Run 2 verification record

## Model and execution policy

- Model policy: `configured-default`.
- Reasoning-effort policy: `configured-default`.
- No model or effort override was supplied at task creation or during the Run.
- The Codex task API exposed no conflicting override. Concrete host-resolved
  labels were not added to the repository as invented facts.
- Execution surface: `codex-thread-ui`; visibility: `codex-task-sidebar`.
- Base commit observed before ACK: `7c407ff0aff0e5efee834501edd1fc6d28acd2c4`.

## Focused pass results

| Check | Result | Evidence and limit |
| --- | --- | --- |
| Node/npm versions | pass | Node `22.14.0`; npm `10.9.2`, matching the frozen harness. |
| `npm ci` | pass | 65 packages added from the committed lockfile; npm reported 1 moderate and 1 high audit vulnerability. The lockfile was not changed. |
| Direct harness comparison | pass | All 7 declared Run configuration files matched the canonical Attempt 5 Git blobs. |
| Attempt 2 product input | pass | Historical product input intact; retained user-level Git ignore permission warnings. |
| Approved Reference static check | pass | Runnable Reference static floor intact. |
| Attempt 3 input/provenance | pass | 24 fixed visual-binding files and provenance passed. |
| Attempt 5 empty-harness boundary | pass | Canonical empty harness remains free of shell design and prohibited dependencies. |
| Attempt 6 product fixture | pass | 5 files at baseline `2b3ebb0`; labels, hierarchy, order, and initial state intact. |
| vNext candidate static check | pass | Layered contract authority structure intact. |
| SVG rendering self-test | pass | CSS mask family accepted; intentional direct-image violation rejected. |
| Run SVG target check | pass | 7 canonical themed assets; no prohibited external `img` rendering. |
| Exact visual-binding check | pass | Token stylesheet, binding map, SVGs, evidence map, theme hook, and asset references intact. |
| Run-local static check | pass | Product facts/order, Reference-label exclusion, fixed assets, source boundary, and focused control count passed. |
| Business-app Standard Pack | pass | 3 positive and 11 negative contract cases. |
| Business-workflow Standard Pack | pass | 27 concepts, 23 links, 5 configuration IDs, 23 roles, 2 modes, 10 override values, 8 negative cases, 72 contrast assertions, and 2 binding fixtures. |
| Manifest quality workflow | pass | 7 required phases and local workflow links valid. |
| Source-boundary check | pass | Existing source-independence boundary intact. |
| Header/Drawer method check | pass | Ran after loading `System.Drawing`; no assertion was weakened. |
| Attempt 8 Reference syntax | pass | `node --check` passed for `fixture.js` and `app.js`. |
| TypeScript | pass | `npm run typecheck`. |
| Production build | pass | `npm run build`; Vite transformed 34 modules and produced the expected `dist` bundle. |
| Scoped diff check | pass | `git diff --check -- <Run root>` returned no error; scoped status shows only the untracked assigned Run root. |

## Preserved historical composite non-passes

| Check | Observed result | Classification |
| --- | --- | --- |
| Attempt 2 `check-fixed-input.ps1` | exit `1`: `Approved baseline differs from working tree: templates/business-app/design-manifest` | Known historical 52-file auxiliary-Manifest mismatch; exact documented cause retained. |
| Attempt 4 `check-attempt-4-input.ps1` | exit `1` only after the same nested Attempt 2 mismatch, followed by `Reference-owned input preflight failed.` | Known composite propagation; no new owner drift. |
| Attempt 5 `check-react-harness-input.ps1 -RunRoot <Run 2>` | exit `1` only after the same nested Attempt 4/Attempt 2 mismatch, followed by `Attempt 4 fixed-input preflight failed.` | Direct Run configuration comparison completed separately and passed; known composite propagation retained. |

## Implementation freeze

The implementation-tree digest covers the byte-equivalent harness
configuration, independently authored source, Run-local checks, canonical
visual bindings, and visual-binding evidence map. It excludes `node_modules`,
`dist`, browser evidence, and reports.

| Point | Files | SHA-256 |
| --- | ---: | --- |
| Before browser observation | 26 | `efd99468112232dd6844e8fef687c093713b8fab47306046df41831c0f2208e5` |
| After browser observation | 26 | `efd99468112232dd6844e8fef687c093713b8fab47306046df41831c0f2208e5` |
| After final verification | 26 | `efd99468112232dd6844e8fef687c093713b8fab47306046df41831c0f2208e5` |

The three digest records compare without differences. No implementation byte
was repaired after the first digest.

## Verification limits

- The six screenshots and browser snapshots prove the exercised viewport and
  sequence only; they are not full assistive-technology or production tests.
- Console observation retained one `/favicon.ico` 404 from the immutable
  harness HTML and zero warnings.
- npm audit findings are inherited from the fixed dependency graph and were
  not repaired because that would change the frozen lockfile.
- Passing checks do not accept this Run or the three-Run set. Artifact review,
  comparison, and human review remain downstream responsibilities.
