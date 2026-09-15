---
type: PoC cross-experiment guidance
title: Reference HTML observation boundary
status: experimental; corroborated boundaries and unconfirmed candidates
authority: PoC experiment guidance only; not a Manifest, Profile, or application requirement
---

# Reference HTML observation boundary

This note retains cross-experiment knowledge for future Reference HTML PoCs.
It is subordinate to repository guidance and applicable product requirements.
It does not define a Reference HTML Profile, stable-key specification, CLI API,
or replacement for the Manifest.

## Corroborated boundaries

A Reference HTML is a human-reviewable, executable design sample. It should use
fixed dummy data and only the HTML, CSS, and JavaScript required to expose the
design, states, focus behavior, accessibility relationships, and bounded
interactions under review. It should not contain a network client, data
processing layer, authentication system, or application platform.

Simplicity is a design requirement, not only a convenient implementation
choice. Do not turn the Reference into a second application, a DSL, or a
metadata catalog for the benefit of machine analysis. Conversely, moving
authoring work into a highly inferential Core is not a free simplification.
Choose the boundary with the lower total author, reviewer, Target implementer,
and tooling maintenance cost.

The running Reference is the observation source. Do not maintain a second copy
of expected states or computed styles when a browser can observe them directly.
Keep harness-only controls outside the product observation boundary.

Browser comparison proves observable transfer, not design correctness. A defect
implemented identically in a Reference and Target can pass differential
verification. Human approval remains an independent authority.

Human calibration across the Single date and Date range samples added a useful
review prompt: the visible control model, completion behavior, valid partial
states, focus return, and opposing state treatments should tell one coherent
story. Review the first activation as carefully as the final state. This does
not prescribe one-click range completion, optional boundaries, exact colors,
date formats, or a calendar layout; those remain product and component-family
decisions. One human calibration is especially valuable for a new Reference
family or materially new operation model. Feed the correction back into
scenarios, negatives, and AI self-review prompts rather than treating repeated
human approval as the mechanism. Closely related, calibrated models may need
less frequent human review, but product-specific choices must not be promoted
as general Reference rules.

A human reviewer's suggested alternative is a hypothesis until the reviewer or
applicable product requirements select it. Prefer the smallest coherent change
that resolves the observed problem without inventing extra modes, completion
actions, or surrounding workflow. If several product-coherent models remain,
record the choice as unresolved; Conformance or Target comparison cannot select
or approve one of them.

A separate Reference-only conformance preflight is useful for the smaller set
of contradictions that one running Reference can prove objectively. It is a
Library authoring responsibility, not a Consumer frontend contract or a design-
quality score. It should reuse browser observation, avoid false-positive-prone
inference, and must not require metadata, structure, or ARIA that the product UI
would not otherwise need. Do not add a Conformance rule without a reproduced
objective Reference defect.

## Identity boundary

Use native or relational semantic identity only when it is naturally present,
unique, and stable across product wording, fixture values, class names, local
IDs, and reasonable DOM grouping differences.

The following bounded patterns have been corroborated across different screen
shapes:

- naturally unique `banner` and `main` landmarks;
- a controlled region identified through an already explicit controller and
  that controller's existing, single `aria-controls` relationship.

The relational pattern does not justify adding a controller, region, ARIA, or
DOM wrapper that the product UI would not otherwise need. It also does not
generalize to an arbitrary same-role element.

When a semantic descriptor has multiple candidates, fail closed. Do not select
by DOM order, visible wording, fixture value, class name, or local ID spelling.
An explicit stable key is an acceptable and usually simpler choice when natural
semantics are not uniquely stable. Metadata reduction or semantic conversion
rate is not a success measure.

Local ID spelling is also not a transferable identity for an unkeyed
`aria-describedby` target. The current Core compares that relationship's
existence plus the target's element type, inferred role, and visibility;
Reference Conformance rejects a missing target. This keeps local IDs
independent but does not prove descriptive-copy equivalence. Use explicit
identity only when the description itself must be a first-class observation.

For `aria-activedescendant`, relation presence and the active target are state-
dependent observations. When the target already resolves through the existing
explicit or semantic identity map, compare that logical identity rather than
the local ID string. A wrong existing option then differs, a missing target is
invalid, and a duplicate identity remains ambiguous instead of being selected
by text or position. This bounded result does not make an unresolved option an
equivalent identity and does not automatically define handling for every ARIA
relation.

## Responsibility split

Reference authors maintain the smallest useful executable sample and only the
explicit identities that transfer or verification actually needs. The shared
Core owns browser observation, identity resolution, state/style/focus/bounded
accessibility capture, and comparison. The CLI is the executable interface to
that Core.

When an experiment claims Consumer source or style-implementation independence,
different hashes, class names, local IDs, or import graphs are not sufficient
evidence. Inspect whether the Consumer's source organization is independently
structured rather than a systematic renaming of Reference rules. Required
observed values may match; the implementation organization should not be
derived from the Reference. Record the proof without inventing an unvalidated
numeric similarity threshold.

Evaluate Consumer identity interference by total maintenance cost, not by an
annotation-zero target. Product-natural, uniquely resolvable semantics may carry
identity when they already serve the UI, while genuinely ambiguous observations
may retain a small explicit identity beside the element. Moving the same
correspondence into selector mappings, conditional build modes, or a larger
resolver is not an improvement when it adds synchronization, debug knowledge, or
architecture/runtime coupling. Treat production architecture and runtime
interference as stronger costs than a local validation-only identity annotation.

Across search-centered and form-heavy Gates, selective partial References were
useful when each file owned one complete, independently reviewable interaction
responsibility. AI interpretation was sufficient to combine each part with a
fixed common shell; no source/runtime composition mechanism was needed. Keep a
causal state flow together rather than splitting by visual subsection, and
review every integrated Target because independent part passes did not expose
all cross-part theme and typography defects.

The same responsibility boundary also held below workspace scale for two
different composite families: Date selection and entity lookup. A useful part
kept initiation, meaningful intermediate state, completion, and clear or
reselection in one directly operable Reference. Single-date versus date-range,
and autocomplete versus dialog-confirmed lookup, remained separate because
their operation and completion models differ. A one-file Date family sheet
saved duplicate CSS/JavaScript but could not validate a one-variant Target
without an unproven slicing/configuration mechanism. Prefer one complete
operation model per Reference; do not infer a family catalog, variant schema,
or atomic-control rule from this bounded result.

This boundary has recurring costs. Cross-cutting surface, focus, typography,
and theme declarations are maintained in multiple standalone files. Part-to-
integrated comparisons also repeatedly emit information about the other part
and integrated geometry. These informational shapes are distinct from a
Reference conformance defect or Target comparison error. They do not justify a
shared-CSS system, scope metadata, or suppression rule.

Keep complete machine comparison evidence separate from reviewer-oriented
presentation. Across both search and form-heavy part-to-integrated comparisons,
folding only state/frame repetitions with the same severity, observable path,
and exact values reduced reviewer entries while preserving every indexed raw
occurrence and pass/fail decision. Aggregation is not deletion. Do not weaken
diagnostic generation or comparison semantics to shorten a report. When the
raw report cannot prove one cause, do not invent a cause label or merge value-
distinct observations. Evaluate review cost by distinct actionable information
and traceability, not by raw diagnostic count alone.

The same exact-observation presentation reproduced without a reporting-rule
change for a third responsibility: a read-only detail Reference composed with
the common shell. Keep that presentation as a regenerable, nonauthoritative
derivative of raw evidence and keep its implementation separate from
Reference authoring, Consumer implementation, comparative CLI/Core, and
Reference Conformance. A producer may be followed by best-effort presentation,
but presentation failure must not remove raw evidence or change comparison
status. Capture a fresh baseline with the same browser lineage and execution
conditions as its Target before interpreting focus or other browser-sensitive
differences; stale or cross-browser baseline drift is not a reporting problem
and does not justify tolerance or grouping changes.

Keep historical evidence provenance and current regression provenance as
separate responsibilities. Historical evidence retains the implementation,
entry point, input, and result that supported the original decision; it does
not require every future regression to use those implementation bytes. Run a
current regression in a separate output boundary, record the current
implementation and execution lineage, and never relabel or overwrite old
evidence as fresh. For a reproduced negative mutation, prefer a required
failure meaning plus deterministically bounded additions over an exact error
count. Do not remove legitimate new detection to recover a historical count,
and do not admit arbitrary extra failures. This boundary is demonstrated for
one focus-color mutation; applying it to other negatives remains evidence-
specific rather than automatic.

For an isolated negative mutation, retain exact unmutated controls before and
after the mutation and use them to separate execution-condition observations
from mutation-only failures. A normalized property signature that also occurs
in a byte-identical control remains complete raw evidence but is not causal
evidence for another property mutation. A secondary failure joins a mutation
contract only when controls exclude it and the mutation reproduces the exact
affected property and values. Browser executable lineage, active element, and
scenario identity are necessary provenance but may not stabilize
`:focus-visible` after programmatic focus across separate launches. Do not hide
that variation with retries, a historical error count, tolerance, or an
unexplained allowlist.

Across four responsibility-distinct light References and two complete dark
References, a very small, static, Library-local token file reduced a reproduced
common light/dark edit from four files and six locations to one file and two
locations while local edits remained local. Canvas, primary surface, and focus
color retained the same ownership and change reason across those themes. Share
a visual value only when that meaning is common, not merely because current
output is equal. Keep selectors, focus geometry, and component/theme rules
local when sharing would broaden hidden element scope without reducing
demonstrated maintenance work. A Reference that has no complete dark design
does not need invented dark rules to participate in the light boundary.
Library-internal sharing does not imply CSS, token, class, DOM, package, or
runtime distribution to Consumers. Preserve direct readability and local
editability before increasing a sharing or deduplication rate.

MCP is not an analysis authority. If later evidence justifies it, MCP should be
a thin interface that exposes the same CLI/Core capabilities to an AI client.

Reference Conformance and comparative validation remain separate operations.
Conformance rejects objective defects in the Reference without a Target;
comparison asks whether a Target reproduces the accepted observation. Neither
operation replaces human design review.

## Rejected directions

- Do not infer identity from wording, fixture values, class names, local ID
  strings, or DOM position.
- Do not add Reference-only ARIA or structure to improve resolver coverage.
- Do not optimize for stable-key count at the expense of ambiguity or Core
  complexity.
- Do not maintain duplicate expected-value files beside the executable
  Reference.
- Do not freeze a Profile, stable-key notation, file layout, or CLI API from a
  bounded PoC result.

## Candidate and unconfirmed work

The following remain candidates rather than requirements:

- whether Reference-only conformance can safely cover custom application
  validation beyond native constraint validity;
- whether malformed scenario contracts should produce a conformance report or
  remain a distinct CLI/tool failure;
- Reference CSS independence across more screen patterns;
- the exact useful form boundary remains unconfirmed beyond one form phase.
  Input, validation, correction, review-before-confirmation, and edit return
  stayed together because they form one causal workflow. Do not infer a form
  catalog or field-level fragment rule from that result;
- whether the demonstrated multi-responsibility exact-observation presentation
  should ever become a versioned CLI/report command; command placement, schema,
  versioning, and long-term derived-file layout remain unfrozen;
- compact raw-index rendering for groups with much larger state counts remains
  unconfirmed. Any compact form must retain deterministic complete traceability;
- whether the demonstrated thin token-only boundary remains beneficial across
  further Reference responsibilities, independently evolved theme families,
  and different Library file layouts; the four-light/two-dark result does not
  justify a package, generator, canonical migration, or file-layout freeze;
- an application-wide Reference may be too large to remain a low-cost review
  surface. Responsibility-complete workspace-scale References are currently a
  promising granularity, but this is not a frozen Profile rule;
- whether operation-complete composite References remain beneficial for more
  families, and where they become too context-dependent. Atomic TextBox or
  Button References may still be too fine to carry useful context;
- Consumer implementation interference should be reduced where evidence
  permits, but zero interference is not an absolute requirement while its
  tradeoff with validation identity and cost remains untested;
- a future Reference HTML Profile would govern the Library authoring surface.
  Turning any part of it into a Consumer rule requires separate transfer and
  maintenance evidence;
- splitting one causal state contract by visual subsection remains unconfirmed
  and should not be assumed beneficial. Search actions, filter disclosure, and
  Initial/Results/Empty stayed together because separating them would require
  duplicated state meaning or an early cross-Reference composition rule;
- fragment observation may require bounded whole-document checks to recognize
  that no product document landmark is present. Do not add fake product content
  to a standalone part solely to satisfy a whole-page check;
- responsive behavior, other browsers, and real assistive-technology testing.

Promote these only through separate evidence. Do not expand an unrelated PoC
to resolve them opportunistically.
