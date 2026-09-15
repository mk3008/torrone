# Attempt 7 manifest authoring report

## Goal

Resolve the common-shell hover ambiguity exposed by Attempt 6 with the
smallest docs-only Standard Pack change. The fixed guidance must make the
pointer-hover state of an enabled, non-current interactive or navigation row
observable across its full hit-area surface and keep hover separately
recognizable from current or selected state.

## Now / Next

- Now: authoring, post-edit Manifest review, and repository verification are
  complete; the scoped Markdown set is ready for one commit.
- Next: create the scoped commit and hand the resulting hash to the
  orchestrator for review. Fresh frozen three-run generation and its human gate
  remain downstream workflow steps, not part of this authoring task.

## Open Questions

- None within the authoring scope. The existing Standard Pack has a coherent
  owner and the rule does not require a product binding, new semantic token,
  new configuration value, Reference change, or pack release decision.

## Attempt 6 Issue Classification

The authoritative Attempt 7 task packet classifies the variation as a
`manifest-gap`: Attempt 6 Run 1 used label underline alone for a non-current
navigation hover, while Runs 2 and 3 used a row-surface change whose relation
to current or selected state was not fixed by the Standard Pack. This
classification supersedes the historical per-Run treatment of hover as
allowed implementation variance; the frozen Attempt 6 evidence remains
unchanged.

## Pre-edit Manifest Review

Status: `partial` — the ownership and wording shape are resolved, but the
Manifest gap has not yet been edited.

### Asserted behavior and scope

- For an enabled, non-current interactive or navigation row, pointer hover
  changes the full hit-area surface rather than only decorating its text.
- Where hover and current or selected states both apply to a screen, their
  rendered treatments remain separately recognizable.
- The rule is cross-screen. It does not define disabled behavior, keyboard or
  focus behavior, exact colors, CSS, DOM, framework structure, or a
  Reference-specific token.

### Owner review

- `templates/business-app/design-manifest/foundations/accessible-work-surface.md`
  is the coherent existing owner because it already defines cross-screen,
  perceivable interaction-state treatment for interactive controls.
- `templates/business-app/design-manifest/components/drawer.md` owns Drawer
  current-item presentation, so it should reference the cross-screen hover
  rule without redefining it.
- `templates/business-app/design-manifest/variability.md` should summarize the
  new fixed foundation responsibility so the responsibility map stays aligned
  with the normative owner.

### Findings before editing

| Rule and location | Finding | Planned disposition |
| --- | --- | --- |
| Cross-screen interactive state — `foundations/accessible-work-surface.md` | Focus and non-color state cues are defined, but enabled non-current row hover has no observable surface requirement. | Resolve with one affirmative paragraph plus the demonstrated text-decoration boundary. |
| Drawer current versus hover — `components/drawer.md` | Current-item presentation is fixed, but non-current navigation hover is not mapped to a cross-screen owner. | Resolve with a short link to the foundation and require separate recognizability. |
| Responsibility summary — `variability.md` | The Accessible work surface summary does not expose the intended hover responsibility. | Resolve by updating the existing foundation row; add no setting or new row. |
| Configuration and product boundary | The behavior needs no product fact, exact visual binding, or durable choice across products. | Intentionally leave product binding and configuration unchanged. |
| Implementation boundary | The observable outcome does not require selectors, properties, values, DOM shape, JavaScript, or framework instructions. | Keep all mechanics implementation-owned. |

The negative boundary against text decoration alone is justified by the
material Run 1 misreading. The normative result will otherwise be expressed
positively and in familiar design language.

## Reference Compatibility

Pre-edit inspection of
`docs/poc/experiments/015-reference-first-common-shell/styles.css` shows an
observable full-row surface change on navigation-row hover. The current row
uses a different selection surface, stronger type, and a leading indicator.
The proposed Manifest wording is compatible with those visible results while
deliberately omitting the Reference's selectors, property names, and values.

## Post-edit Manifest Review

Status: `done` for the authored diff.

| Review check | Result | Disposition |
| --- | --- | --- |
| Observable outcome | The foundation requires a full hit-area surface change and separate recognition from current or selected state. | Resolved. |
| Cross-screen ownership | The normative rule exists once in Accessible work surface; Drawer links to it and retains ownership only of current-item presentation. | Resolved. |
| Positive wording | The primary instruction states what the rendered row does. The text-decoration prohibition is retained only to close the demonstrated Run 1 ambiguity. | Resolved. |
| Product and configuration boundary | No product facts, choices, routes, states, settings, semantic tokens, or exact visual bindings were added. | Preserved. |
| Implementation boundary | No CSS selector, property, literal value, DOM shape, JavaScript, library, or framework requirement was added. | Preserved. |
| Reference independence | The wording is compatible with the Reference's visible behavior but neither names nor copies its implementation mechanics. | Preserved. |

No post-edit Manifest finding remains unresolved.

## Actions Taken

- Read repository guidance, the current Standard Pack owners, frozen Attempt 6
  review/freeze records, and the Reference hover source.
- Completed this pre-edit Manifest review before changing any Standard Pack
  Markdown.
- Authored one cross-screen rule, a Drawer mapping, and the aligned
  responsibility-map summary.
- Completed the post-edit Manifest review and ran the relevant existing and
  focused static checks.

## Code Changes

No code or runtime changed. The exact Markdown changes are:

- `templates/business-app/design-manifest/foundations/accessible-work-surface.md`
  — `# Guidance` owns the cross-screen pointer-hover rule; `# Verification`
  makes its rendered outcome inspectable.
- `templates/business-app/design-manifest/components/drawer.md` —
  `# Guidance` maps enabled, non-current navigation rows to the foundation
  without duplicating its normative details.
- `templates/business-app/design-manifest/variability.md` — `# Foundations`
  updates the existing Accessible work surface responsibility summary and
  keeps the concrete hover treatment implementation-owned.
- `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-7/reports/manifest-authoring-report.md`
  — records authoring decisions and evidence.

The Standard Pack remains at its existing version. This bounded authoring task
does not publish a pack release or change configuration compatibility.

## Verification Methods

| Acceptance criterion | Verification method | Result | Confidence |
| --- | --- | --- | --- |
| Enabled, non-current row hover changes the full hit-area surface rather than text alone. | Focused normalized-text assertion against `foundations/accessible-work-surface.md`; final diff inspection. | Pass. The normative Guidance and Verification sections contain both requirements. | High. |
| Hover and current or selected remain separately recognizable wherever both apply. | Focused normalized-text assertion; Drawer mapping inspection. | Pass. The cross-screen rule and Drawer reference both preserve the distinction. | High. |
| The rule has a cross-screen owner and Drawer does not duplicate it. | Manifest-review ownership check across the foundation, Drawer, and variability map. | Pass. The foundation owns the rule; Drawer links to it; the map summarizes it. | High. |
| Wording is observable and implementation independent. | Post-edit Manifest review plus focused scan of added Manifest lines for literal colors and common CSS/DOM/framework terms. | Pass. No prohibited detail was found. | High for the changed text. |
| Standard Pack and workflow contracts remain valid. | `tests/check-business-workflow-standard-pack.ps1`, `tests/check-business-app-standard-pack.ps1`, and `tests/check-manifest-quality-workflow.ps1`. | Pass. | High. |
| Frozen Attempt 6 evidence remains unchanged. | `git diff --name-only -- docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6`. | Pass; no path returned. | High. |
| The scoped Markdown diff has no whitespace errors. | `git diff --check`. | Pass; only repository line-ending conversion warnings were emitted. | High. |
| Reference compatibility is preserved without importing mechanics. | Source inspection of `docs/poc/experiments/015-reference-first-common-shell/styles.css` around the navigation-row hover and current-row rules. | Pass. The Reference visibly changes the full row surface for hover and keeps current distinct through separate selection treatment; no implementation text was copied. | High for source compatibility; rendered regeneration is downstream. |

The first focused assertion used an unnormalized multiline exact string and
failed at the Markdown line break. The corrected assertion normalized
whitespace and passed every content, link-target, responsibility-map, and
implementation-detail check. This was a check-script invocation issue, not a
Manifest defect.

## Repository Evidence

- The three changed Standard Pack files contain the normative owner, Drawer
  mapping, and responsibility summary listed under Code Changes.
- Existing Standard Pack checks passed with 27 concepts, 23 index links, 5
  record-list configuration IDs, 23 theme roles, and all reported positive and
  negative contract cases.
- The Manifest quality workflow check passed all 7 required phases and local
  workflow links.
- Attempt 6 frozen and review records remain byte-unmodified by this diff under
  `docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-6/`.
- The Reference compatibility source remains
  `docs/poc/experiments/015-reference-first-common-shell/styles.css`.

## Supplementary Evidence

- The authoritative task packet supplies the later human classification of
  the Attempt 6 variation as a Manifest guidance gap.

## Review Triage

- Merge blockers: none.
- Non-blockers: exact hover color and concrete rendering mechanics remain
  implementation-owned. Git reported expected LF-to-CRLF working-copy warnings
  but no `git diff --check` error.
- Human acceptance: a later fresh frozen three-run experiment and its human
  gate remain outside this authoring task and are not implied complete.

## Self-review

### Cycle 1 — coarse defect extraction

- Potential blockers: the initial report still described editing and checks as
  pending. Resolved by replacing those placeholders with the final changed
  sections, verification matrix, and results.
- Potential non-blockers: line-ending conversion warnings and downstream
  rendered evidence remain explicit.
- Evidence weaknesses: repository checks do not render a fresh generated Run.
  This is stated as downstream rather than promoted to authoring proof.
- Claim overreach: no generated consistency or human acceptance is claimed.

### Cycle 2 — blocker triage and shape check

- Merge blockers: none.
- Non-blockers: fresh three-run generation and human review remain for the
  governed experiment workflow.
- Evidence shape status: pass; repository and supplementary evidence are
  separated and each acceptance criterion names its verification method.
- Reporting shape status: pass; status, open questions, limits, and customer
  value are explicit.
- Ready for PR?: yes for orchestrator review of this scoped commit; downstream
  experiment acceptance remains separate.

All authoring acceptance criteria are proven. No criterion is only partially
proven within this task. Human acceptance still applies to later regenerated
artifacts, not to the correctness of this Markdown authoring diff.

## Commit

This report is included in the task's single scoped commit. The resulting
commit hash is reported in the terminal `WORKER_REPORT`, after this file is
finalized and the commit object exists.

## Attainment Status

`done`

## Outcome

The Standard Pack now requires enabled, non-current interactive and navigation
rows to express pointer hover across the full hit-area surface and to keep that
state separately recognizable from current or selected state. Drawer guidance
consumes the cross-screen rule without introducing a Drawer-specific hover
contract.

## Why It Matters

Owning the rule once at the cross-screen foundation prevents future
implementations from treating a row hover as text-only decoration while still
preserving implementation freedom over the concrete visual treatment.
