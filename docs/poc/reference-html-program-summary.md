---
type: PoC program summary
title: Reference HTML research handoff
status: partial
authority: research handoff only; not a Manifest, Profile, consumer contract, or production architecture decision
---

# Reference HTML research handoff

## Purpose

UI Design Manifest is exploring two complementary, framework-independent ways
to preserve reusable business-application design knowledge: a source-independent
Markdown/YAML Manifest and an executable Reference HTML. This summary records
the latter research track for a future implementation environment.

A Reference HTML is intended to be a small, buildless, human-reviewable,
interactive UI sample with fixed dummy data. It should make a complete design
or interaction responsibility directly observable in a browser, then support
transfer to independently implemented product UIs (including different
frameworks). It is not production UI, a second application, a framework
template, or a universal component catalog.

## What the PoC has completed

- Authored and browser-observed small interactive References and transferred
  them to independently implemented vanilla and React Targets.
- Exercised initial and interaction state, computed style, focus, bounded
  accessibility relations, negative mutations, and human review as separate
  evidence sources.
- Demonstrated that a Reference should usually own one complete, causal
  interaction responsibility rather than an arbitrary visual fragment. This
  was tested for search-oriented parts, form-heavy parts, date selection, and
  entity lookup.
- Demonstrated a thin shared Core/CLI boundary for browser observation and
  comparison; an eventual MCP, if justified, should only expose that same
  capability rather than become a second analysis authority.
- Demonstrated that small, local explicit identities can coexist with naturally
  unique semantic or relational identity. The current comparative result is
  `hybrid-preferred`: preserve explicit keys for genuinely ambiguous targets;
  use natural identity only where it already exists, is unique, and survives
  harmless implementation changes.
- Recorded human calibration corrections for date controls. Browser comparison
  caught observable transfer, while human review selected a coherent control
  and completion model.

## Important findings

1. Keep the Reference executable and readable. Use only the HTML, CSS, and
   JavaScript necessary to show the reviewed states, focus behavior,
   accessibility relationships, and bounded interactions. Do not add network,
   authentication, database, application platform, or duplicated expected-value
   files.
2. Human review remains necessary. A Reference and Target can share the same
   design defect and still pass differential comparison.
3. Do not trade local authoring simplicity for hidden tooling complexity.
   External selector maps and conditional instrumentation moved identity work
   into synchronization, build modes, or runtime coupling; they were not a
   lower-total-cost replacement for small local annotations.
4. Fail identity resolution closed. Do not infer identity from product wording,
   fixture values, CSS classes, local IDs, DOM order, or position. Ambiguity is
   evidence that a stable explicit key may be the simpler boundary.
5. Separate Reference conformance from Reference-to-Target comparison.
   Conformance finds objective Reference defects; comparison finds observable
   transfer differences. Neither is a design-quality oracle.
6. Keep raw evidence separate from reviewer presentation and keep historical
   evidence separate from current regressions. Presentation may summarize but
   must retain complete traceability; current runs must never overwrite the
   evidence that supported an earlier decision.
7. Share visual tokens inside the Reference library only when a demonstrated
   common meaning reduces maintenance cost. Do not infer a consumer CSS package,
   shared runtime, DOM convention, or component system from that result.

## What is not complete

The Consumer Identity Interference Gate is `partial`, not complete. A legacy
Reference Conformance command directly regenerated a 56-file historical output
tree. The provenance guard correctly rejects the replacement tree, and neither
the provenance manifest nor a near-match output was altered to conceal that
fact. The original tree must be restored from an authoritative backup and the
integrity check rerun in isolation before treating the otherwise supported
`hybrid-preferred` result as a completed Gate or starting Reference Discovery /
Curation.

The PoC also does **not** establish a Reference HTML Profile, stable-key
notation, CLI API, package, framework binding, application-wide file layout,
responsive strategy, cross-browser support, real assistive-technology support,
or a production adoption decision.

## Recommended next step

In the new development environment, restore the historical evidence first.
Then run the Gate's isolated integrity check and decide whether to accept or
re-evaluate its comparative result. Keep further work as small, evidence-led
experiments; do not promote the findings into a framework-dependent runtime or
a canonical design system without separate transfer, maintenance, and human
review evidence.

## Evidence map

- [Repository purpose](../../README.md)
- [PoC 017 index and current state](experiments/017-reference-html-ssot/README.md)
- [Cross-experiment observation boundary](reference-html-observation-boundary.md)
- [Consumer identity result](experiments/017-reference-html-ssot/consumer-identity-interference-result.md)
- [Evidence incident and recovery requirement](experiments/017-reference-html-ssot/consumer-identity-interference-evidence-incident.md)
- [Transferability result](experiments/017-reference-html-ssot/transferability-gate-result.md)
- [Cold-start portability result](experiments/017-reference-html-ssot/cold-start-portability-result.md)
- [DatePicker Phase 2 result](experiments/017-reference-html-ssot/date-picker-human-calibration-phase-2-result.md)
