---
type: PoC experiment result
title: Form-heavy partial Reference reuse Gate result
status: form-partial-beneficial
source: fixed inputs, browser observation, independent Target implementation, and human screen review
---

# Attainment status

- **Gate status:** `form-partial-beneficial`
- **Workflow attainment:** `done`
- **Decision scope:** one form-workflow Reference combined with the fixed common
  shell/navigation Reference.

# Outcome

The responsibility-complete partial approach remained useful on a form-heavy
screen. A standalone maintenance-work Reference carried input hierarchy,
required-field validation, correction, review-before-confirmation, edit return,
focus, error relationships, action hierarchy, and light/dark styling into an
independent credit-adjustment Target. The fixed common shell was reused without
modification.

The Target passes separate comparisons against the shell and form contracts
with zero errors. It has different business wording, fixtures, class names,
local IDs, DOM grouping, state functions, and CSS. It imports neither Reference
and contains no runtime composition or Reference scenario harness.

This result supports a bounded form-workflow part. It does not support field-
level fragments, a form catalog, shared CSS infrastructure, or replacement of
the accepted integrated Reference.

# Responsibility boundary

The form partial deliberately keeps the following together:

- the editable fields and action hierarchy;
- required and format validation;
- summary and inline error presentation;
- correction and ARIA-state cleanup;
- review-before-confirmation presentation;
- review-to-edit return and focus restoration.

These elements form one causal interaction responsibility. Splitting fields,
messages, and buttons into smaller samples would distribute state meaning and
focus behavior across files without measured benefit.

The final transaction, backend validation, persistence, cancellation result,
and post-create navigation are outside the Reference. `Create`/`Submit` and
`Cancel` specify placement, hierarchy, and appearance only at this Gate.

# Standalone review and harness

The form Reference is one 440-line, 15,931-byte buildless HTML file. It opens
directly and has three compact harness states: Normal, Validation, and Review.
The harness is identified by one `data-reference-harness` root and is excluded
from product DOM and accessibility-tree observation. The Target contains no
harness root or scenario contract.

The machine scenarios are not a second expected-state source. Three scenarios
and ten actions operate the running browser document; the CLI captures their
resulting state, computed style, focus, relationships, and bounded
accessibility. Target overrides contain only five content values needed to keep
fixture vocabulary independent.

# Target independence

The Target is a Revenue Desk credit-adjustment screen rather than a maintenance
request. It exposes the exact union of the fixed 13-observation shell contract
and the new 19-observation form contract.

Measured source independence:

- zero shared class tokens with either Reference;
- zero shared local IDs with either Reference;
- non-identical embedded style sources;
- no import, include, template runtime, build, framework, external dependency,
  network API, or data layer;
- no maintenance-work, access-review, or purchase-order fixture leakage;
- 26 explicit observations plus six natural/relational semantic observations.

The Target uses separate shell and form style scopes in one independent CSS
implementation. This was necessary because the first integrated rendering let
form typography and tokens leak into the shell. The correction was Target-
local and did not change either Reference.

# CLI/Core result

The existing Core and CLI required no change. Current thresholds and fail-
closed behavior were retained.

| Comparison | Status | Errors | Information diagnostics |
| --- | --- | ---: | ---: |
| Target vs fixed common shell | pass | 0 | 247 |
| Target vs form workflow | pass | 0 | 192 |

The form comparison reproduced all important states:

- missing required values show a summary and two inline errors;
- both invalid controls expose `aria-invalid="true"` and stable
  `aria-describedby` relationships;
- invalid submission focuses the first invalid field;
- invalid email focuses the email field;
- correcting the email clears the summary, inline message, and ARIA invalid
  state;
- valid review hides the form, shows the review region, and focuses its
  heading;
- Back to edit restores the form and focuses the primary field.

All snapshots and scenarios reported zero console errors, action errors,
external requests, and failed requests. The form and shell captures were
byte-deterministic on repeat.

The final full run used local Chrome 151 and completed in 38.3 seconds with 12
attempts, zero timeouts, and zero retries. Earlier nested-PowerShell launches
exhausted the Gate's one retry at `Page.enable` with both local Edge and Chrome,
while one-level CLI probes and the final one-level Gate succeeded. This is
recorded as harness reliability evidence only; no browser-equivalence claim or
CLI change follows from it.

# Negative coverage

- the historical negative still fails with all 15 unique signatures;
- the semantic-only ambiguous-combobox negative still fails closed;
- a disposable current-form negative removing both field/error relationships
  fails with both `relationships.describedBy` signatures and four unique error
  signatures overall.

No threshold, comparison rule, or expected state was weakened.

# Stable identity and metadata

The form contract uses 17 explicit keys and two semantic keys (`main` and
`form`). Explicit identity remains simpler for content-independent field,
message, choice-group, action-area, and review-state mapping because labels and
action wording differ between Reference and Target, several same-role controls
exist, and hidden/visible states alternate.

No form-specific resolver, ordinal selection, wording match, fixture match,
namespace, dependency manifest, or new metadata block was added. The new form
phase therefore did not uncover a safe reason to reduce explicit identity
further.

# Human-review result

Normal, validation, corrected/review, edit-return, integrated light, and
integrated dark states were inspected. The screens read as operational forms,
use direct captions, keep the primary action at the end of the workflow, and
make validation visible through summary text, inline text, borders, and focus
rather than color alone.

Human review found one defect that the differential comparison could not find:
both initial implementations wrote an empty `aria-invalid` attribute while
their summary logic queried `aria-invalid="true"`. Inline errors appeared, but
the summary stayed hidden. Because Reference and Target shared the same defect,
their comparison passed. The visual review caught it; both sources were then
corrected and the Gate rerun. This is direct evidence that browser comparison
does not replace human approval or a separately justified conformance check.

# Reproduced costs

The earlier search Gate's two main costs recurred:

- **CSS synchronization:** the new form file has 117 normalized CSS
  declarations; 40 exactly match shell declarations, 59 match search-workspace
  declarations, and seven token names recur. A shared focus-token change now
  reaches three standalone Reference files.
- **Diagnostic noise:** 439 non-error diagnostics were emitted. The shell
  report contains 247 extra-part observations. The form report contains 143
  extra-part observations and 49 integrated-layout geometry differences.

These diagnostics remained classifiable and did not hide any error in this
Gate. No suppression, partial-scope metadata, or shared-style mechanism was
added. Recurrence now justifies separate problem statements, not an automatic
solution.

# New problems found

- A Reference and Target can share a design defect and still pass differential
  verification; human review remains an independent authority.
- Global CSS ownership is implicit when independently authored parts are
  combined. The first Target attempt changed shell typography, semantics,
  hidden-state behavior, and active-navigation styles until the scopes were
  reconciled.
- Independent light-part review did not prevent one integrated dark primary-
  action contrast failure (`4.32`, below the existing `4.5` threshold).
- Scenario override JSON initially used the wrong container shape. The existing
  CLI failed closed, and changing it to the documented `overrides` object was
  sufficient; no CLI change was needed.
- Date controls render in the browser locale while the review state displays
  the stored ISO value. That product-format decision is visible for human
  review but is not generalized by this Gate.

# Complexity assessment

The form Reference remains a small executable sample rather than a second
application: one file, fixed values, 74 unique JavaScript lines, no model/data
layer, no asynchronous behavior, and one three-state harness. The review state
copies only visible field values into a summary.

The first signs of growth are the 17 explicit identities, the third copy of
cross-cutting visual tokens, and the need to keep validation and review state in
one script. None justified a conformance CLI, shared runtime, or smaller
fragments in this Phase.

# Long-lived knowledge

Only findings reproduced across the search and form Gates were promoted to the
[Reference HTML observation boundary](../../reference-html-observation-boundary.md):
responsibility-complete partials can lower local review cost; AI reference does
not require runtime composition; integrated review remains necessary; common
CSS/token synchronization and part-to-whole diagnostic noise are recurring
costs.

The specific form boundary remains a one-phase candidate. Its fixture, field
set, counts, and corrections remain local evidence.

# Next phase recommendation

Retain the form workflow, common shell, and prior search workspace as evidence,
not as a frozen catalog. If the next work addresses authoring cost, isolate one
problem at a time:

1. measure whether scope-aware diagnostic presentation can reduce review noise
   without adding Reference metadata; or
2. test a low-dependency token-authoring approach while preserving each
   Reference's direct browser readability and avoiding a shared runtime.

Do not freeze a Profile, stable-key notation, file layout, composition rule, or
CLI API. Do not proceed automatically to MCP, Manifest replacement, responsive
work, other browsers, real AT, or large-scale partial migration.
