---
type: PoC experiment result
title: Partial Reference maintenance and composition Gate result
status: partial-reference-beneficial
source: fixed inputs, browser observation, maintenance probes, and human screen review
---

# Attainment status

- **Gate status:** `partial-reference-beneficial`
- **Workflow attainment:** `done`
- **Decision scope:** two responsibility-complete References: common
  shell/navigation and search workspace.

# Outcome

Two separately openable Reference HTML files were sufficient for implementing
one coherent, content-different business screen without importing, copying, or
composing their source at runtime. The integrated Target exposes the exact
union of the two contracts and passes each comparison with zero errors.

The result is beneficial at this boundary because the two sources together are
609 lines and 27,713 bytes, compared with 979 lines and 34,889 bytes for the
accepted whole-screen baseline. A responsibility-local correction limits
review to 255 or 354 lines rather than 979. This benefit is not free: there are
now two files and two harnesses, 50 normalized CSS declarations overlap, eight
of those are design tokens, and a common focus-token change touches two files
instead of one.

The measured result supports small, interaction-complete parts. It does not
support splitting every visual subsection, creating a catalog, or replacing
the accepted integrated Reference.

# Tested boundaries

| Partial Reference | Included responsibility | Standalone harness |
| --- | --- | --- |
| Common shell and navigation | Header, drawer, navigation filtering/disclosure/selection, theme, and account menu | One excluded content placeholder |
| Search workspace | Filter disclosure, Search/Clear, Initial/Results/Empty, grid, pagination, and primary result action | One excluded scenario selector |

Filters and results intentionally remain one partial. Search, Clear, filter
disclosure, and the three result states form one causal interaction contract.
Splitting them would introduce duplicated state description or a composition
rule before evidence showed either was worthwhile.

# Boundary suitability

| Boundary | Gate decision | Evidence boundary |
| --- | --- | --- |
| Shell plus navigation | Useful | Its controls and states are reviewable with only one excluded content placeholder. |
| Search workspace as one workflow | Useful | Filters, actions, result states, table, and pagination replay without an application shell. |
| Filter panel separate from result states | Not selected | Search/Clear transitions would cross files. This is a design-risk finding, not an experimentally proven universal prohibition. |
| Smaller table/control catalog items | Not tested | The Gate deliberately stopped at two candidates. |

# Composition result

The Target is a supplier-compliance case screen, not the shell's operations
queue or the workspace's purchase-order search. It has different wording,
fixtures, class names, local IDs, grouping, and independently authored CSS.
The Target shares zero class tokens and zero local IDs with either partial and
contains no scenario harness.

Composition required no include, template, Web Component, framework, package,
dependency graph, source concatenation, or CLI composition feature. The AI read
the two standalone References and applied their observable design to one page.
The exact 13-key shell contract and 14-key workspace contract are disjoint; the
Target's 27 observations are their exact union.

# CLI/Core result

The existing CLI compared state, computed style, focus, bounded accessibility,
and interaction separately against both partials:

- shell comparison: `pass`, 0 errors, 182 informational diagnostics;
- workspace comparison: `pass`, 0 errors, 199 informational diagnostics;
- console errors, action errors, external requests, and failed requests: zero;
- historical negative: 15 failure signatures retained;
- semantic-only negative: ambiguous combobox still fails;
- fresh partial style negative: changed button radius fails with two
  `borderRadius` signatures.

One general Core correction was necessary. A shell-only document has no
product `main`; the old bounded h1 check nevertheless required a product h1.
The check now applies only when an observed product `main` exists. A separate
whole-page probe with a `main` and no h1 still reports exactly one
`unexpected-h1-count`, and the accepted Reference still captures 27 elements,
11 scenarios, and no issues. This is a bounded fragment/whole-document fix,
not a composition mechanism.

The comparisons are mechanically useful but noisy. The CLI reports elements
belonging to the other partial as extras, and the workspace comparison also
reports integrated-layout geometry. The 381 information diagnostics are not
errors, but they increase review cost. No partial-scope metadata or filtering
API was added because one Gate does not justify that mechanism.

# Stable identity result

The two parts retain the previously supported mixed identity boundary:
21 explicit keys plus six natural/relational semantic observations, 27 total.
The split itself reduced neither the observation contract nor the identity
requirement. Explicit annotation count is lower than the original 27 only
because the earlier mixed-identity result is reused; it is not a benefit caused
by partialization.

No key is shared between the two part contracts. This made independent lookup
and union checking simple and avoided a composition-specific namespace or
dependency map.

# Human-review result

Each Reference can be opened directly and reviewed as one responsibility. The
shell placeholder and workspace scenario selector are visibly labelled as
Reference harnesses and are excluded from product DOM and accessibility-tree
observation. The Target has no explanatory Reference UI and reads as a normal
supplier-assurance workflow.

Integration review remains mandatory. Early Target rendering exposed dark-mode
contrast and inherited control-typography mismatches that were not apparent
when looking at each light partial alone. The Target required local CSS fixes,
and the search partial required one disabled-pager contrast correction. This is
evidence against treating independent part passes as proof of whole-screen
visual coherence.

# Cost decision

The result is `partial-reference-beneficial`, rather than `partial`, because:

1. both parts are independently executable and reviewable;
2. one different-content Target was implemented without source/runtime
   composition or additional instructions encoded as a system;
3. all 27 observations and all 11 scenarios remain testable;
4. combined source and local review surface are materially smaller;
5. the measured duplication and common-change penalty are bounded and visible.

The benefit applies to responsibility-local maintenance. A shared visual-token
change is more expensive, and every composed Target still needs an integration
review. If future parts share substantially more CSS or frequently require
cross-part corrections, `no-benefit` may be the better conclusion for those
boundaries.

# New problems found

- Whole-document accessibility checks need an explicit fragment boundary in
  their logic; authors must not add fake product content to satisfy them.
- Current comparison reports are noisy when an integrated Target contains
  observations outside one partial contract.
- Standalone files duplicate base/theme declarations and harness code.
- Independent review does not reveal every cross-part theme/contrast problem.
- File names plus two disjoint contracts were sufficient here, but discovery
  cost was tested with only two parts and one Target.

# Reference complexity signals

No data layer, framework, build, dependency graph, or composition runtime was
needed, and interaction JavaScript remained responsibility-local. Complexity
did increase in three observable places: the second standalone harness, 50
shared normalized CSS declarations, and two-file synchronization for common
tokens. These are maintenance signals to monitor; they did not justify a new
conformance/preflight CLI in this Phase.

# Long-lived knowledge

The cross-PoC [Reference HTML observation boundary](../../reference-html-observation-boundary.md)
now records this result only as a bounded candidate: prefer complete
interaction responsibilities, do not invent a runtime composition mechanism
when AI reference is sufficient, retain integration review, and do not satisfy
whole-page checks with fake product content. Experiment-specific fixtures,
hashes, counts, and corrections remain in this directory.

# Next phase recommendation

Retain these two parts as evidence, not as a catalog or replacement source of
truth. Exercise the same responsibility boundaries only when a real next
Reference need arises, and measure whether common-token synchronization and
integration corrections recur. Consider a CLI partial-scope capability only
if diagnostic noise repeatedly impedes review; do not add metadata or a
composition engine pre-emptively.

Do not freeze the Reference Profile, key notation, file layout, composition
rule, or CLI API. Do not proceed automatically to MCP, Manifest replacement,
large-scale partial migration, responsive work, other browsers, or real AT.
