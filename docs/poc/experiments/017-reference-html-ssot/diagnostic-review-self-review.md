---
type: PoC self review
title: Diagnostic Review Signal / Noise Gate two-cycle self review
status: completed
source: requirements, generated evidence, fixture tests, and full rerun
---

# Cycle 1 — grouping and evidence authority

## Potential blockers found

1. The first attractive grouping was `kind + normalized path`. Real form data
   showed three such groups with two different value pairs. Calling each one a
   common cause would be unsupported false grouping.
2. A short presentation can look authoritative enough that a reviewer might
   stop looking for complete raw evidence.
3. Sorting by guessed importance would require a new human rule and could hide
   a future signal.

## Corrections

- Selected exact observation signature instead: severity/shape/path plus all
  raw expected/actual/delta fields. State/frame is the only folded dimension.
- Retained complete one-based raw indexes, full state lists in JSON, raw path,
  and raw SHA-256 for every presentation.
- Used only existing severity for errors-first ordering. Informational groups
  are lexical by shape/path/value. Shape labels explicitly do not claim cause
  or importance.
- Added fixtures for same-key/different-property, same-property/different-key,
  and same-path/different-value cases.

## Evidence weaknesses after correction

Exact observation grouping does not prove one root cause. The report therefore
claims only repeated identical observations. Root-cause grouping remains
unconfirmed without more evidence and was not implemented.

# Cycle 2 — regression, detectability, and reporting shape

## Potential blockers found

1. The first current regression used Edge for a form baseline originally
   observed with Chrome and produced focus-style errors. Even the same Edge
   binary did not reliably reproduce an older saved `fill` focus state.
2. The first Markdown summary showed occurrence and raw indexes but did not
   state how many states/frames were folded.
3. Reporting-layer source is 459 lines including analysis and tests; claiming
   that the presentation is free or ready for CLI adoption would overreach.

## Corrections

- Current regressions now capture fresh baselines with the evidence family's
  browser: Edge for search and Chrome for form-heavy. No comparison expectation
  or browser-specific exception changed.
- Added state count to each reviewer row; complete state names remain in JSON.
- Report the implementation cost explicitly and keep the utility experimental
  and outside CLI/Core. No API/output format is frozen.
- Injected the focus defect into a temporary Target copy only. It remained raw
  indexes 162/182, became reviewer error entry 1, and restored the persistent
  Target byte-identically.

# Blocker triage and shape check

- **Merge blockers:** none for this bounded experimental evidence.
- **Non-blockers:** cross-browser `:focus-visible` equivalence, very large raw-
  index list rendering, and official CLI integration remain unconfirmed.
- **Evidence shape:** repository evidence contains source hashes, complete raw
  index coverage, deterministic repeats, current comparison regression, and
  negative behavior. No supplementary evidence is required.
- **Reporting shape:** outcome, raw authority, limitations, implementation
  cost, and future decision boundary are explicit.
- **Ready for reviewer handoff:** yes. This does not mean ready for canonical
  CLI/API adoption.

# Proven and partial criteria

All bounded Gate acceptance criteria are proven across the search and form-
heavy comparison families. Root-cause grouping, other-browser equivalence,
official command shape, and broader Reference families are not proven and are
not part of the attainment claim.

# Final conclusion

`diagnostic-presentation-beneficial` is justified. Review repetition falls
materially and a real error moves from raw position 162 to the first reviewer
entry without changing a byte of fixed evidence or any comparison decision.
The result supports a separate reviewer presentation responsibility, not
diagnostic suppression or a frozen CLI feature.

