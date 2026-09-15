---
type: PoC maintenance evidence
title: Form-heavy partial Reference reuse cost record
status: completed
source: source metrics, natural correction history, and Target implementation
---

# Author and review surface

| Artifact | Files | Lines | Bytes | Purpose |
| --- | ---: | ---: | ---: | --- |
| Accepted whole Reference | 1 | 979 | 34,889 | Historical different-content baseline; not a form-equivalent source. |
| Fixed common shell | 1 | 354 | 15,436 | Reused unchanged. |
| New form workflow Reference | 1 | 440 | 15,931 | Complete form responsibility and local harness. |
| Integrated Target HTML | 1 | 631 | 27,033 | Current whole-screen review proxy, not a Reference baseline. |
| Target value overrides | 1 | 29 | — | Five content-only scenario values. |

A form-specific correction now asks the author to inspect 440 lines rather
than the 631-line integrated screen or 979-line historical whole Reference.
This is a useful local-review reduction, but the baselines have different
content and are not a controlled whole-versus-part form experiment.

The reusable Reference set now contains three files: shell, search workspace,
and form workflow. That increases discovery and cross-cutting change cost even
though the new screen reused the 354-line shell without editing it.

# Identity and harness cost

| Measure | Form Reference | Integrated Target |
| --- | ---: | ---: |
| Explicit keys | 17 | 26 |
| Semantic observations | 2 | 6 |
| Total observations | 19 | 32 |
| Scenario harness roots | 1 | 0 |
| Harness buttons | 3 | 0 |
| Scenarios / actions | 3 / 10 | Replayed from Reference |

The form's explicit keys identify controls, their error messages and
relationships, action areas, and alternating edit/review regions. Native roles
alone cannot distinguish these across changed labels, multiple textboxes and
buttons, and hidden states without returning to wording or DOM order. Keeping
the keys was lower cost than adding form-specific semantic inference.

The harness is one compact root. Adding Validation and Review states required
one button and one branch each in the existing local state setter; it did not
require duplicate product markup or an expected-state file.

# CSS synchronization recurrence

The form Reference contains 117 unique normalized CSS declarations.

| Comparison | Exact shared declarations | Recurring token names |
| --- | ---: | ---: |
| Form vs common shell | 40 | 7 across the prior partial set |
| Form vs search workspace | 59 | 7 across the prior partial set |

The seven recurring names are `--border`, `--canvas`, `--focus`, `--muted`,
`--surface`, `--surface-muted`, and `--text`. Only canvas, focus, and surface
values exactly match the light search workspace; other values are close but
not identical. This illustrates both synchronization pressure and the risk of
assuming same-named tokens are automatically one contract.

One future focus-token correction would now touch three Reference files. This
recurrence is a real cost. The Gate does not establish that importing shared
CSS, generating files, or adding a token system would have lower total cost,
so none was introduced.

# JavaScript cost

The form Reference has 74 unique normalized JavaScript lines. Only four lines
exactly overlap the shell script and five overlap the search-workspace script.
Validation, correction, and review transitions remained local; there was no
evidence for a shared state abstraction.

The script is still fixed-data UI behavior. It has no model, data transform,
asynchronous path, network client, persistence, router, or framework state
layer.

# Natural correction history

| Correction | Files touched | Why it occurred | Cost implication |
| --- | ---: | --- | --- |
| Write `aria-invalid="true"` rather than an empty boolean-like attribute | 2 | Reference and Target independently shared an incorrect helper pattern; visual review found the missing summary. | Differential matching alone cannot validate correctness. The same conceptual fix had to be made in both sources. |
| Isolate form typography/tokens from the fixed shell | 1 | Initial integrated Target let form defaults change shell observations. | Cross-part global-style ownership is an integration cost. |
| Restore shell landmark/hidden/active styles | 1 | Independent DOM and CSS did not initially reproduce all fixed shell observations. | CLI paths made the correction target clear; no Reference edit was needed. |
| Increase dark primary-action color | 1 | Integrated Target contrast was 4.32 against a 4.5 requirement. | Separate part review does not remove integrated theme review. |
| Wrap scenario values in the supported `overrides` object | 1 | First value-only file used the wrong CLI input shape. | Existing fail-closed input handling was sufficient; no new API was justified. |

Small product copy and layout changes stayed local to one form file. Cross-
cutting visual changes and shared behavioral misunderstandings did not.

# Find, combine, and ambiguity cost

The implementer needed two plainly named Reference files and one established
CLI command per contract. Their 13- and 19-observation inventories were
disjoint, so no namespace, dependency manifest, or conflict resolver was
needed. The Target exact union check made missed or surplus observed identities
obvious.

The Reference was clear about visible validation, focus recovery, review, and
edit return. It intentionally did not answer final transaction, cancellation,
backend validation, or navigation questions. Those omissions prevented the AI
from inventing a workflow, but the Target author still had to treat final
buttons as appearance-only.

The main ambiguity was CSS ownership: which part controls global font, theme,
and surface tokens after integration. The CLI located mismatching computed
styles, but it did not—and should not—choose an implementation architecture.

# Diagnostic-review cost

The two passing Target reports contain 439 informational diagnostics:

- shell: 247 extra observed Target elements;
- form: 143 extra observed Target elements plus 49 integrated-layout geometry
  differences.

The categories remained easy to summarize mechanically, and all actual errors
remained separate. Reading the raw reports is nevertheless expensive. Because
the same pattern occurred in both search and form composition Gates, diagnostic
presentation is now a justified separate PoC candidate. It is not evidence for
adding scope metadata to Reference HTML.

# Total-cost conclusion

For this form workflow, the local review surface, unchanged shell reuse, and
complete interaction contract outweigh the extra harness and measured CSS
duplication. The result is therefore `form-partial-beneficial`.

The benefit is selective. A library-wide visual change is already more
expensive across three files, and each integrated Target still needs human
theme and workflow review. If later parts require cross-file state semantics or
substantially more repeated CSS/JS, the conclusion should be revisited.

