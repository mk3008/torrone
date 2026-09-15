# Torrone

Torrone is an experimental, framework-independent approach to keeping business-application UI design consistent and reviewable over time.

Its current direction is to maintain small, plain **Reference HTML** examples plus concise guidance as explicit design originals. A Reference can be opened and operated by a human reviewer, then used by humans or AI as a concrete implementation reference without requiring the product to copy its source code, framework, DOM structure, or exact pixels.

Read [Product Foundation](docs/product-foundation.md) first. It defines the problem Torrone exists to solve, the intended domain, the role of Reference HTML, and the boundaries that should survive changes in implementation strategy.

## Problem

Business applications often have shared CSS, components, and many existing screens but no single design original for the application as a whole. New contributors end up copying different existing screens, and small differences accumulate in layout, color, action placement, state expression, scrolling, focus, and interaction behavior.

The problem is not only visual. CSS and component libraries do not fully explain how recurring UI responsibilities should be composed or operated.

Natural-language design documentation was explored first, including Markdown and an OKF-compatible Markdown/YAML Manifest. That work showed a practical limit: short prose leaves too much unspecified context, while exhaustive prose becomes expensive to author and review and still communicates dynamic behavior poorly. AI implementation makes the ambiguity especially visible because plausible blank-filling can produce locally reasonable but system-wide inconsistent results.

## Reference HTML direction

A Reference HTML combines:

- a small working UI example that exposes the intended look, states, and interaction model in a browser; and
- concise text explaining what must be preserved, what may vary, and what is not a requirement.

References should stay plain, small, easy to edit, framework-independent, and cheap to review. Fixed dummy data is preferred. The Reference is a design original and review surface, not production application code.

Exact pixel values, DOM shape, CSS architecture, framework APIs, and incidental fixture content are not requirements unless explicitly stated. The product implementation owns its architecture. Torrone is concerned with transferring the intended UI responsibility and keeping the application coherent.

Human review remains authoritative for design quality. Browser observation or Reference-to-Target comparison may verify observable transfer, but matching a Reference does not prove that the Reference itself is a good design.

## Intended use

Torrone is aimed at business, administrative, productivity, operational, and similar applications where recurring UI patterns should feel and behave like one product across many screens and contributors.

It is not primarily intended for teaser sites, campaign pages, promotional sites, highly art-directed marketing pages, or other one-off surfaces where deliberate uniqueness is a primary design goal.

## Current research status

The repository has evolved through several approaches. Earlier Manifest/OKF artifacts remain useful research history, especially around provenance, responsibility, and configuration boundaries, but they are no longer assumed to be the final product shape.

Reference HTML is the current central product direction. Its exact profile, stable-key notation, comparison API, CLI/Core shape, responsive strategy, framework bindings, MCP exposure, and other implementation details remain experimental.

The Reference HTML research handoff and experiment archive are preserved under `docs/poc/`. They should be read as research evidence and bounded findings, not as a frozen production specification. Approved design originals are surfaced separately under `references/`.

## Repository map

- [`references/`](references/) — curated design originals. `approved` entries are the current References for their stated responsibilities and scope.
- [Development and Reference review](docs/development-workflow.md) — run a small review bundle in Work, prepare a phone-review handoff, and move an explicitly human-approved design into curation.
- `review/` and `tools/build-review.py` — development review entry point for selected existing HTML samples; not an approval registry.
- `docs/product-foundation.md` — product problem, principles, scope, and decision boundaries.
- `profile/` — earlier UI Manifest profile research.
- `templates/` — Manifest-era starter and business-application examples.
- `prompts/` — extraction and application procedures from the Manifest research track.
- `docs/poc/` — experiments, evidence, and bounded findings.

## Non-goals

Torrone is not intended to become a production frontend framework, a required consumer runtime, a universal component implementation library, a pixel-perfect cloning system, or a large UI DSL. Tooling should exist only when it makes References easier to author, review, observe, or transfer.
