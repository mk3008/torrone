---
type: PoC plan and ledger
title: Reference HTML SSOT experiment plan
status: human review accepted; next bounded PoC not started
source: authored
---

# Issue

The repository has substantial evidence about business-application UI quality,
but its current text-first Manifest workflow can still lose visible hierarchy,
interaction state, exact visual treatment, and the distinction between an
implementation defect and an allowed implementation freedom. It is unknown
whether a small interactive HTML reference can reduce that translation loss
without becoming expensive metadata or a framework-specific fixture.

# Customer

The immediate customers are UI designers and product engineers who review a
business-application UI and then ask an AI implementation agent to apply the
same design decisions to a different screen.

# Customer Value

A reviewer can correct the actual UI once in a directly readable browser
artifact. An implementation agent can inspect the same artifact, and a CLI can
report useful design, state, interaction, and accessibility differences without
requiring the reviewer to maintain a second full specification.

# Acceptance Criteria

1. Existing review and experiment evidence is summarized without treating the
   current Manifest syntax as an authority for the new method.
2. A small Reference uses fixed dummy data, opens without a build, performs no
   network or storage work, and exposes meaningful pointer and keyboard states.
3. The common Core and CLI deterministically capture important elements,
   browser-computed styles, state attributes, interaction sequences, and a
   bounded accessibility summary.
4. A product-content-different vanilla implementation can be compared without
   requiring the Reference DOM structure or visible copy.
5. A product-content-different React implementation can be compared without
   changing or rebuilding the Reference.
6. A deliberate state, style, or accessibility defect produces a focused CLI
   failure without weakening the comparison criteria.
7. Semantic-only and minimal stable-key candidates are compared by usefulness,
   authoring cost, correction locality, metadata volume, and drift risk.
8. The result identifies what belongs in the Reference, what does not, what the
   CLI can verify, what remains human-reviewed, and which candidates were kept
   or rejected.

# Verification Method

| Criterion | Evidence |
| --- | --- |
| 1 | `prior-evidence.md` with repository source links and evidence limits |
| 2 | Direct browser open, static source check, interaction screenshots |
| 3 | Repeat CLI capture with byte-identical JSON plus Core self-checks |
| 4 | Vanilla verification report and screenshots |
| 5 | React build, verification report, and screenshots |
| 6 | Negative fixture or mutation report with non-zero CLI exit |
| 7 | Candidate reports, line/file/metadata counts, and correction diff |
| 8 | Final experiment result and accepted human-review decision record |

# Scope In

- One compact business work-queue pattern with Header, navigation, filters,
  statuses, and Initial/Results/Empty result-region states.
- Fixed local dummy data and local HTML/CSS/JavaScript.
- Browser-observed semantics, states, selected computed styles, geometry for
  diagnosis, focus, contrast, and interaction transitions.
- One vanilla and one React consumer with different product content.
- A dependency-free Node CLI/Core experiment and an explicit future MCP
  boundary.

# Scope Out

- Replacing, migrating, or deleting the existing Manifest or historical Runs.
- A universal HTML schema, editor, registry, package, or production validator.
- Network, database, authentication, persistence, asynchronous loading, or real
  business rules.
- Full WCAG conformance, assistive-technology certification, responsive design
  coverage, animation quality, or production browser support.
- Pixel identity and product-copy identity between Reference and consumers.
- Implementing an MCP server before the CLI/Core proves useful.
- Choosing the Request ID or New request destination, a detail surface, or
  approval workflow.
- Updating the vanilla or React consumers to the human-review Reference.

# Risks

- Exact computed-style comparison can overfit browser defaults or one screen.
- Stable keys can become excessive metadata or an accidental component catalog.
- Interaction steps can duplicate behavior expectations and create two truths.
- A passing semantic diff can still conceal poor hierarchy or unrealistic task
  flow.
- A React build can be mistaken for a Reference build requirement.

The experiment mitigates these risks by comparing candidates, deriving expected
state from the live Reference rather than restating it, keeping geometry
diagnostic rather than normative, and retaining a human gate.

# Required Docs / Tests / Changeset

- This plan and an evidence carry-forward matrix.
- Two notation candidates and an explicit disposition.
- Reference and two content-different consumers.
- Shared Core, CLI usage, deterministic and negative checks.
- Frozen JSON reports, screenshots, experiment result, and human-review packet.
- No Changeset is required because this is a repository-local PoC, not a
  published package change.

# Repository Evidence Plan

Repository commands will check source boundaries, external references, CLI
determinism, expected pass/fail reports, React compilation, file diffs, and
whitespace. Frozen JSON reports will name the input digests and browser version.

# Supplementary Evidence Plan

Browser screenshots and direct live-page review are required for visual
hierarchy, density, business realism, and whether reported allowed differences
remain acceptable. These observations cannot be promoted automatically from
numeric checks.

# Open Questions

- Are stable `data-ref` keys sufficient, or is any additional metadata needed?
- Which computed-style properties produce useful differences without coupling
  consumers to one DOM or CSS authoring technique?
- Are action-only interaction sequences enough to avoid a duplicated expected-
  state specification?
- Can an explicitly marked review harness be excluded from every product
  observation surface without adding per-element metadata?
- Which layout relationships should ever become machine gates rather than
  diagnostic measurements?
- Does the React result preserve the same observable contract with a different
  component and state structure?

# Ledger Snapshot

- **Goal:** Determine the smallest evidence-backed Reference HTML and CLI/Core
  boundary that improves AI implementation and verification.
- **Now:** Human review accepted the current Reference on 2026-08-12. The
  Initial/Results/Empty states and compact harness are mechanically verified.
- **Next:** Run one bounded Target experiment with different product content
  and independently authored CSS; do not share the Reference stylesheet.
- **Blockers:** None for the next reversible experiment.
- **Evidence Ready?:** Yes for that experiment; not sufficient for canonical
  adoption, a frozen profile, or complete framework independence.
