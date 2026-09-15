# Torrone Product Foundation

Torrone exists to give business applications an explicit, reviewable UI design original that can be understood by both humans and AI.

The repository may change its mechanisms as the research evolves. This document defines the product problem, current direction, scope, and decision boundaries that should remain visible when those mechanisms change.

## Why Torrone exists

Business applications often do not have a role that continuously owns system-wide UI consistency. They may have shared CSS, components, and many existing screens, but still lack an explicit design original that answers questions such as:

- Which existing screen should a new screen follow?
- Which differences are deliberate and which are historical accidents?
- How should recurring interactions behave, not only how should they look?
- Which parts of a design are important to preserve and which are implementation freedom?

When that reference is absent, new screens copy different predecessors and drift gradually. Colors, spacing, action placement, state expression, scrolling, focus, confirmation, selection, and other interaction details become slightly different from screen to screen. Each difference may be small, but the application eventually stops feeling like one coherent product.

Shared CSS and component libraries reduce some visual drift, but they do not by themselves define composition, responsibility, state transitions, focus behavior, or the intended operation model of a screen or interaction.

## Why documentation alone was insufficient

Torrone originally explored natural-language and structured design knowledge, including DESIGN-style Markdown and an OKF-compatible Markdown/YAML Manifest.

That work remains useful research, but it exposed a practical limit: GUI design leaves too much interpretation space when expressed only as prose or configuration. A short description leaves many blanks for an implementer to fill. A sufficiently exhaustive description becomes expensive to author, read, and review, while still making dynamic behavior difficult to understand.

This problem is especially visible with AI implementation. An AI can fill unspecified context with a plausible result, but plausible local choices can still produce application-wide inconsistency. The goal is therefore not to describe every pixel in more prose. It is to reduce ambiguous interpretation at lower review cost.

## Current product direction: Reference HTML

Torrone's current direction is to use a small, executable Reference HTML as a design original for a bounded UI responsibility.

A Reference combines two forms of information:

1. **A working example** that can be opened, seen, and operated in a browser.
2. **Concise guidance** that states what the example is intended to demonstrate, what should be preserved, what may vary, and what is not a requirement.

The working example gives concrete visual and interaction context. The explanation prevents accidental implementation details from becoming requirements.

A Reference should normally be plain HTML, CSS, and JavaScript with fixed dummy data. It should be buildless or equivalently lightweight, framework-independent, locally understandable, easy to edit, and small enough for direct human review.

The Reference is not production application code. A product implementation may use React, Vue, server-rendered HTML, another framework, different DOM structure, different CSS organization, and different state management. The implementation should reproduce the intended UI responsibility, not copy the Reference source.

## What a Reference is expected to communicate

A Reference should make it easy to understand both:

- **what must be preserved**, and
- **what the preserved design feels like when rendered and operated**.

Useful subjects include visual hierarchy, relative density, grouping, region responsibility, action priority, scrolling responsibility, state expression, selection, focus movement, disclosure, confirmation, completion behavior, and other interaction relationships.

Exact dimensions, pixel values, DOM shape, CSS architecture, framework APIs, and incidental fixture content are not requirements unless explicitly stated otherwise. A Reference communicates an approximate design and an observable operation model, not pixel-perfect reproduction.

The preferred unit is a complete causal UI responsibility rather than an arbitrary visual fragment. If initiation, meaningful intermediate state, completion, clearing, reselection, or focus return form one operation model, they should normally remain reviewable together.

## Review is a primary product requirement

Torrone is not only a handoff mechanism for implementers. It is intended to make UI design itself cheaper to review.

Reviewing production code is expensive and often obscures the user experience behind application architecture, data access, framework structure, and unrelated behavior. Reviewing a small Reference lets a designer, product owner, developer, or other reviewer operate the relevant UI directly and make concrete judgments such as "this behavior is good", "this transition is confusing", or "this state should not work this way".

The intended loop is:

1. Create or revise a small Reference for one bounded UI responsibility.
2. Open it in a browser and review the actual look and behavior.
3. Correct the Reference until the responsible human reviewer accepts the design direction.
4. Use the accepted Reference and its guidance as the design original for product implementation.
5. Let humans and AI implement the product using its own architecture and vocabulary.
6. Compare observable behavior where useful, while keeping design approval separate from mechanical comparison.

A comparison can show whether an implementation transferred observable properties from a Reference. It cannot prove that the Reference itself is a good design. Human review remains the authority for design quality.

## Human and AI use the same design original

Torrone should not require a separate, informal explanation for AI implementation.

A useful Reference must be understandable as an explicit design input to both a human implementer and an AI agent. The AI should be able to inspect the working example and its guidance, identify the intended responsibilities and states, and distinguish required design relationships from implementation freedom.

When material behavior is genuinely unspecified, the system should preserve that gap rather than encourage an implementation to silently invent a new product-wide convention.

This requirement is one reason References should stay small, explicit, and free of unnecessary application infrastructure.

## Target domain

Torrone is primarily for business, administrative, productivity, operational, and other application UIs where recurring screen and interaction patterns should feel like one product.

It is particularly useful when:

- many screens share recurring responsibilities;
- several developers or AI agents implement screens over time;
- there is no continuously available system-wide UI design owner;
- teams need an explicit answer to "what should this kind of UI follow?";
- consistency and predictable operation matter more than page-by-page novelty.

Torrone is not primarily intended for teaser sites, campaign pages, promotional sites, highly art-directed marketing pages, or other one-off surfaces where deliberate uniqueness is itself a design goal. The same limitation often applies to highly bespoke commerce or editorial presentation where each page is intentionally optimized as an individual composition rather than as part of a repeated application interaction model.

## Scope boundaries

Torrone aims to provide a maintainable design original and a review/transfer workflow. It does not aim to become:

- a production frontend framework;
- a shared runtime required by consuming applications;
- a universal component implementation library;
- a pixel-perfect cloning system;
- a complete natural-language specification of every UI detail;
- a replacement for accessibility, security, product, or business requirements;
- an automatic oracle for whether a design is good;
- a large DSL or metadata catalog that is harder to review than the UI itself.

Any tooling should support authoring, reviewing, observing, or transferring the Reference. Tooling complexity is not a product goal by itself.

## Relationship to Manifest and OKF research

The earlier Manifest/OKF work established useful ideas about provenance, responsibility, configuration boundaries, and source-independent design knowledge. It also demonstrated the review and interpretation cost of relying on prose and structured metadata as the primary UI description.

Those artifacts are research history and may continue to inform concise companion guidance. Torrone does not require the final product format to remain an OKF Manifest, and the product should not preserve that mechanism merely because it was explored earlier.

Reference HTML is the current central direction because it lets the UI explain the UI while concise text explains what matters about that example.

## What is stable and what is still experimental

The product problem and principles in this document are the current foundation. Many implementation details remain research subjects.

In particular, the following should not be treated as frozen product contracts without separate evidence and an explicit decision:

- Reference file layout or profile;
- stable-key notation or identity strategy;
- CLI or Core APIs;
- exact comparison schema or report format;
- MCP exposure;
- responsive strategy;
- cross-browser guarantees;
- real assistive-technology coverage;
- framework bindings;
- application-wide Reference granularity.

Current Reference HTML research has shown promising transfer across independently implemented targets and supports keeping browser comparison separate from human design approval. Those findings guide further work, but bounded experiments must not silently become permanent architecture.

## Decision test for future work

A future change is aligned with Torrone when it materially improves one or more of these outcomes without creating greater complexity elsewhere:

- make a UI design original easier to author;
- make it easier for a human to review by seeing and operating it;
- reduce ambiguous interpretation for a human or AI implementer;
- preserve application-wide visual and interaction consistency;
- transfer design intent without forcing production implementation structure;
- keep the Reference small, understandable, and maintainable.

If a proposal mainly expands metadata, tooling, architecture, or verification surface without improving those outcomes, it should normally be removed, deferred, or kept experimental.
