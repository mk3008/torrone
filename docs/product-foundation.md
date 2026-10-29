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

Application-wide interaction requirements are explicit design inputs alongside catalog examples and any applicable bounded References. The consuming application owns such decisions as sequential navigation, Enter/submit behavior, focus return, error recovery, and keyboard/scroll relationships. A component Reference demonstrates its local responsibility; its approval does not establish those policies for every screen. Torrone must carry the applicable shared requirements into implementation and review rather than leave their application to memory. See [Application interaction requirements](application-interaction.md) for the lightweight handoff and coverage check.

## Why documentation alone was insufficient

Torrone originally explored natural-language and structured design knowledge, including DESIGN-style Markdown and an OKF-compatible Markdown/YAML Manifest.

That work remains useful research, but it exposed a practical limit: GUI design leaves too much interpretation space when expressed only as prose or configuration. A short description leaves many blanks for an implementer to fill. A sufficiently exhaustive description becomes expensive to author, read, and review, while still making dynamic behavior difficult to understand.

This problem is especially visible with AI implementation. An AI can fill unspecified context with a plausible result, but plausible local choices can still produce application-wide inconsistency. The goal is therefore not to describe every pixel in more prose. It is to reduce ambiguous interpretation at lower review cost.

## Current product direction: image-first visual catalog

The primary reusable design handoff is the [visual catalog](../catalog/README.md): independent images of relevant UI appearance states, with concise captions, scope, provenance, adoption rationale and human visual acceptance. Humans and AI can inspect normal, selected, focused, expanded or invalid appearances without operating a sample. Show only states that matter to the pattern; do not infer unpictured transitions.

The catalog's HTML pages organize the pictures for browsing. Their layout and HTML/CSS/DOM structure are not the design being transferred. Adopt the coarse relationships needed by the consuming screen; exact colors, typography, spacing and geometry remain illustrative unless explicitly required by that product.

### Authoring sources and implementation freedom

Editable SVG artwork is a valid image source. HTML/CSS/JS may also help produce or fine-tune state images as optional internal editing/rendering sources. HTML authoring is not a required stage; a mandatory pipeline or new generator needs a separate decision.

Web and Native applications may use their own architecture and platform-standard controls. Do not turn a Web example into a requirement to recreate custom controls or reproduce HTML/CSS on Windows or another platform. Transfer the adopted design intent and applicable requirements, not the author's implementation technique.

### Executable References and application-owned requirements

An interactive example is useful when operation itself needs review; it is not the default catalog presentation. Existing [curated References](../references/README.md) retain their exact approved artifacts, guidance, human-approval evidence and bounded scopes. Image-first guidance does not revoke those approvals. Approval of a source Reference does not approve an extracted image, and visual acceptance of an image does not approve executable behavior.

Images alone do not specify navigation, state-transition conditions, business rules, focus/keyboard paths, error recovery, accessibility or test acceptance. Keep these explicit in the consuming application's requirements and appropriate existing design/test sources. Use a compatible approved Reference where it helps, and preserve missing requirements as gaps. No new specification registry is required.

Keep executable examples lightweight, locally understandable and free of production-application infrastructure. The following Reference-specific guidance applies when an executable example is needed; it does not require creating one for every image pattern.

## What a Reference is expected to communicate

A Reference should make it easy to understand both:

- **what must be preserved**, and
- **what the preserved design feels like when rendered and operated**.

Useful subjects include visual hierarchy, relative density, grouping, region responsibility, action priority, scrolling responsibility, state expression, selection, focus movement, disclosure, confirmation, completion behavior, and other interaction relationships.

Exact dimensions, pixel values, DOM shape, CSS architecture, framework APIs, and incidental fixture content are not requirements unless explicitly stated otherwise. A Reference communicates an approximate design and an observable operation model, not pixel-perfect reproduction.

For an executable Reference, the unit is a bounded causal UI responsibility. If initiation, meaningful intermediate state, completion, clearing, reselection, or focus return form one operation model, they should normally remain reviewable together.

## Communicate through interaction before instructions

Communicate operation through GUI structure and interaction constraints first. Use explanatory prose to supplement meaning the GUI cannot adequately convey. Prefer familiar controls, clear grouping and action placement, visible state and appropriate constraints over instructions that compensate for ambiguous interaction. For example, native radio buttons express a single choice; an unavailable confirmation action prevents completion without a selection.

This is an adopted Torrone design principle, requested in the Entity lookup review. It synthesizes established usability guidance: Nielsen Norman Group's [usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) emphasize error prevention, recognition, minimalism and help when needed. It is not a universal prohibition on text or a requirement for icon-only or flat controls.

Retain meaningful visible labels, accessible control names and information users cannot infer, including necessary formats, consequences and error recovery. [WCAG's labels or instructions guidance](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) remains applicable. An unfamiliar icon is not an adequate replacement for a clear label merely because it saves text.

During authoring and review, ask whether each operation instruction duplicates what the controls already communicate, supplies necessary missing meaning, or compensates for a design ambiguity. Remove duplication, retain necessary meaning, and resolve ambiguity in the interaction before adding prose. Reference curation and review-only fixture notes serve implementers and reviewers; keep them separate from product UI instead of deleting useful scope information under this principle.

## Review is a primary product requirement

Torrone is not only a handoff mechanism for implementers. It is intended to make UI design itself cheaper to review.

Reviewing production code is expensive and often obscures the user experience behind application architecture, data access, framework structure, and unrelated behavior. Reviewing independent state images lets a reviewer compare appearances directly. When operation needs review, a small executable example lets the reviewer judge the relevant behavior and transitions.

The intended loop is:

1. Select or revise a bounded catalog pattern and its relevant independent state images.
2. Review the images, captions, provenance and limits; record the responsible human's visual acceptance for that artifact and scope.
3. If interaction itself needs review, use or revise a bounded executable Reference under its separate approval lifecycle.
4. Hand off the chosen images, concise guidance and applicable application requirements, with any approved executable Reference needed for the operation model.
5. Let humans and AI implement the product using its own platform controls, architecture and vocabulary.
6. Verify the adopted visual relationships and required behavior proportionally, while keeping design approval separate from mechanical comparison.

A comparison can show whether an implementation transferred observable properties from a Reference. It cannot prove that the Reference itself is a good design. Human review remains the authority for design quality.

## Human and AI use the same design original

Torrone should not require a separate, informal explanation for AI implementation.

The same catalog images and captions must be understandable as explicit design inputs to both a human implementer and an AI agent. Both should be able to identify the intended responsibilities and pictured states, distinguish adopted relationships from illustrative details, and find any applicable executable Reference and application-owned requirements.

When material behavior is genuinely unspecified, the system should preserve that gap rather than encourage an implementation to silently invent a new product-wide convention.

Keep images, captions and any executable examples small, explicit and free of unnecessary application infrastructure.

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

Any tooling should support authoring, reviewing, observing, or transferring the design examples. Tooling complexity is not a product goal by itself.

## Relationship to Manifest and OKF research

The earlier Manifest/OKF work established useful ideas about provenance, responsibility, configuration boundaries, and source-independent design knowledge. It also demonstrated the review and interpretation cost of relying on prose and structured metadata as the primary UI description.

Those artifacts are research history and may continue to inform concise companion guidance. Torrone does not require the final product format to remain an OKF Manifest, and the product should not preserve that mechanism merely because it was explored earlier.

The current image-first direction makes relevant appearances directly inspectable while concise text explains their meaning and limits. Earlier executable References and research remain available within their recorded scopes.

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

Earlier Reference HTML research has shown promising transfer across independently implemented targets and supports keeping browser comparison separate from human design approval. Those findings guide further work, but bounded experiments must not silently become permanent architecture.

## Decision test for future work

A future change is aligned with Torrone when it materially improves one or more of these outcomes without creating greater complexity elsewhere:

- make a UI design original easier to author;
- make it easier for a human to review by seeing relevant states and, when needed, operating an example;
- reduce ambiguous interpretation for a human or AI implementer;
- preserve application-wide visual and interaction consistency;
- transfer design intent without forcing production implementation structure;
- keep the design examples small, understandable, and maintainable.

If a proposal mainly expands metadata, tooling, architecture, or verification surface without improving those outcomes, it should normally be removed, deferred, or kept experimental.
