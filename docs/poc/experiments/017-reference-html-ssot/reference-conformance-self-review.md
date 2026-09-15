---
type: two-cycle self review
title: Reference Conformance and absolute invariant Gate self review
status: completed
source: requirements, implementation, browser evidence, and business-screen boundary review
---

# Cycle 1: correctness, false positives, and regression

## Findings corrected

1. **Empty `aria-invalid` was initially an unsafe candidate.** Standards review
   confirmed that an empty value is false-equivalent rather than an unsupported
   token. The adopted canary requires a new false-equivalent scenario state,
   failed native validity, and a newly visible described-by target. An empty
   value alone passes.
2. **Existing duplicate-key collection was ineffective.** It inspected the
   element-output map before population. A local `seenKeys` set now reports the
   duplicate while retaining the first candidate and existing fail-closed
   semantics.
3. **The first duplicate probe also broke fixture JavaScript.** Changing the
   status key made its selector return `null`, producing only a runtime error.
   The mutation now changes the form key, which is not used by the script, and
   isolates the identity defect.
4. **The first console mutation contained a literal PowerShell newline escape.**
   The generated script string now contains a real newline and the intended
   `console.error` only.
5. **The fixture harness looked like a product action in the screenshot.** It
   is now hidden because the fixture needs only a structural exclusion root,
   not a human scenario selector.
6. **A source metric searched for a nonexistent explicit command branch.** It
   now counts the actual `conformanceReport` branch marker.
7. **One adopted harness-crossing relationship rule lacked a focused probe.**
   The final Gate adds one reversible `aria-describedby` mutation into the
   hidden harness and proves `error -> restored pass`.

## Correctness conclusion

The final Gate passed 8 positive Reference shapes, 9 reversible negative
families, 3 existing probes, the exact canary, a current form comparison, and 3
comparative negative families. No comparative threshold was changed. New facts
are captured only when `preflight` opts in; ordinary snapshot/verify bundles
remain unchanged.

# Cycle 2: scope, business-screen boundary, and claims

## Business-screen boundary review

- **Verdict:** pass as a mechanical valid fixture; not accepted or proposed as
  a reusable business Screen Pattern.
- **Rendered states:** 1440×900 initial and `Lookup` action state.
- **Copy inventory:** `Record lookup` is task identity; `Lookup criteria` is a
  section identity; `Record query` is a field label; `Use a name or identifier`
  is completion help; `Not searched`/`Lookup complete` are state; `Lookup` is a
  concise action. Prohibited demo/Contract/process explanation: zero.
- **Action inventory:** one non-destructive `Lookup` action, placed with its
  field and status. Its caption is concise and remains one line.
- **Interaction/accessibility:** the status changes below the trigger without
  moving it; the form has browser-resolved labels and help; bounded issues and
  unnamed AX controls are zero. Screenshot evidence does not prove keyboard or
  real AT behavior.
- **Contract decision:** none of this fixture's layout or wording is promoted.
  Its only purpose is reversible conformance testing.

## Scope audit

- No accepted Reference, prior Target, Consumer, fixed evidence packet, or
  Manifest was edited.
- No Consumer framework/DOM/class/metadata/CSS/state/runtime requirement was
  created.
- No schema, DSL, wrapper, Reference annotation block, dependency, build,
  shared CSS, token package, diagnostic suppression, MCP, responsive behavior,
  other-browser claim, real AT claim, stage, commit, or push was added.
- Static/reference conformance diagnostics are not comparative visual
  diagnostics and do not decide design quality.

## Claim audit

`conformance-beneficial` is supported by the exact same-defect canary and by
zero-error positives across eight materially different Reference shapes. The
result does not claim comprehensive HTML/ARIA validity, custom-validation
coverage, a frozen invariant catalog, a Reference Profile, a stable-key
specification, Consumer conformance, or replacement of human review.

## Remaining risks

- The cross-state canary intentionally misses custom validation and cases where
  an error description was already visible initially.
- Static issues repeat once per observed state; unique signatures keep them
  classifiable, but presentation could become verbose on larger scenario sets.
- Malformed scenario contracts remain tool errors rather than conformance
  reports.
- Bounded accessibility and one Chrome engine are not exhaustive web or AT
  validation.

# Final self-review decision

No remaining issue blocks the bounded Gate and no additional human design
decision is required. Future expansion should start from another reproduced,
objectively decidable Reference defect rather than from a broader rule catalog.
