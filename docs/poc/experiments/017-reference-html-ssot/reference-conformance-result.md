---
type: PoC experiment result
title: Reference Conformance and absolute invariant Gate result
status: conformance-beneficial
source: fixed References, exact form-defect reproduction, reversible probes, and browser verification
---

# Attainment status

- **Gate status:** `conformance-beneficial`
- **Workflow attainment:** `done`
- **Decision scope:** a bounded Reference-Library preflight for objective
  contradictions; no Profile or CLI API freeze.

# Outcome

A Target-free preflight found an important defect that comparative validation
provably missed. It did so without changing an approved Reference, Consumer,
Target, scenario threshold, or comparison rule, and without adding Reference
metadata or a build/runtime layer.

The new command is:

```text
node cli/reference-ui.mjs preflight <html-or-directory> --out <report.json>
```

It emits `pass` or `error`, no score, exit `0` for pass, exit `1` for detected
Reference errors, and exit `2` for invocation/tool failure. Its report declares
`responsibility: reference-library-only`.

# Responsibility boundary

The flow is intentionally separated:

```text
Reference HTML -> Reference Conformance -> browser observation

Reference observation + Target observation -> comparative validation
```

Preflight may reject a broken Reference before human review or transfer. It
does not determine whether the design is good, require a Consumer to implement
the preflight rules, or require a Target to use Reference DOM, classes,
metadata, CSS, state names, runtime, or framework.

# Exact reproduced defect

Disposable copies restored the original form-heavy implementation mistake in
both independent sources:

```js
control.toggleAttribute('aria-invalid', invalid)
```

The call created an empty attribute while summary selectors and CSS required
`[aria-invalid="true"]`. Inline messages appeared but the summary and invalid
styling did not.

| Evidence | Result |
| --- | --- |
| broken Reference snapshot + broken Target comparison | `pass`, 0 errors |
| broken Reference alone | `error`, three occurrences of one cross-state signature |
| restored disposable Reference | `pass`, 0 errors |

This is the requested canary: the same defect remains invisible to difference
comparison and becomes visible without a Target.

# Adopted invariants

Preflight reuses existing bounded accessibility, AX naming, duplicate/ambiguous
identity, network, console, and action-error observations. The only new DOM
inspection covers unresolved ARIA ID references, product-to-harness ARIA
references, invalid explicit label relationships, unsupported non-empty
`aria-invalid` tokens, and comparison keys inside an excluded harness.

One narrow cross-state rule covers the reproduced native-validation defect.
The full adoption and rejection rationale is in
[the invariant classification](reference-conformance-invariant-classification.md).

# Positive, negative, and false-positive evidence

Eight different existing Reference shapes passed with zero errors and zero
warnings: accepted integrated, semantic-only, mixed, relational, common shell,
search workspace, form workflow, and the minimal conformance fixture.

Nine invariant families completed `pass -> one-defect error -> restored pass`
cycles. The valid fixture repeat was byte-identical. Existing semantic
ambiguity, relational ambiguity, and bounded missing-`h1` probes continued to
fail. A disposable CSS difference still failed comparative validation.

The false-positive boundary was exercised directly:

- an empty `aria-invalid` with no contradictory scenario state passed;
- seven accepted/prior Reference artifacts plus the minimal fixture passed;
- partial References were not forced to invent whole-page landmarks;
- no wording, fixture, class, DOM-order, or local-ID inference was added.

# Reference and Consumer cost

- approved/prior Reference files changed: **0**;
- Consumer/Target files changed: **0**;
- Reference metadata, wrappers, schema, DSL, validation-only ARIA, dependencies,
  or build steps added: **0**;
- persistent test input added: one 64-line buildless valid fixture;
- all broken variants are disposable temporary copies.

The Core grew from the recorded 414 lines to 501 and the CLI from 814 to 929.
The change is general rather than Reference-specific: one opt-in DOM inspector,
one preflight aggregator/command, and one correction to the existing duplicate-
key collector. Ordinary `snapshot` and `verify` bundles do not contain the new
conformance facts.

# Comparative regression

- current form Target against current form Reference: `pass`, zero errors;
- historical negative: `fail`, all 15 established signatures;
- semantic-only negative: `fail`, `semanticInventory.combobox` retained;
- CSS negative: `fail`, `elements.lookup-action.styles.borderRadius` retained;
- accepted Reference: 27 observations and 11 scenarios retained;
- fixed form-heavy packet: 98 files and digest
  `E3DDFE25D0855B6ADE922DC0625F6DA7A6BFFF66444234FA9491F4AA201F5D91`.

# Problems found during the Gate

The existing duplicate stable-key detector could not report duplicates because
it consulted the output map before populating it. A candidate-key `Set` fixed
the issue without changing identity policy. The first duplicate probe also
changed a selector used by fixture JavaScript; the probe was narrowed to a
non-script-owned element so it tests one defect.

Static DOM errors currently appear once per observed state. The report exposes
one unique signature, but repeated occurrences can still be verbose. This is a
minor presentation candidate, not evidence for suppression metadata or a
broader diagnostic-noise project.

# Harness reliability

The authoritative Gate executed 51 browser invocations on Chrome 151 with zero
timeouts and zero retries. Three preliminary launches under the restricted
process sandbox timed out at `Page.enable`; the same commands passed when the
headless browser was launched with the required process permission. Those
events are recorded separately and do not affect Reference pass/error status.

# Human judgment

No human design decision is required to accept this bounded Gate. Choices
about custom-validation semantics, future workspace/composite References,
Consumer identity interference, Profile/API freeze, and design quality remain
future research or human-review concerns; preflight does not decide them.

# Recommendation

Retain the preflight as experimental Library-side evidence and run it before
comparative transfer and human design review. Do not add more checks without a
reproduced objective defect. Do not freeze the CLI/API or Reference Profile,
and do not proceed automatically to MCP, Consumer requirements, shared CSS,
diagnostic suppression, responsive work, other browsers, or real AT testing.
