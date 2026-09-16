# Curated References

This directory answers a practical Torrone question: **which UI design original should a human or AI follow for this responsibility?**

Curation is intentionally small. It is not a component catalog, a schema platform, or a second design system.

## Lifecycle

A Reference has one of two useful states:

- **draft** — a candidate under review. It is not a design original and must not be treated as product-wide precedent.
- **approved** — a bounded Reference explicitly accepted by a human reviewer. Humans and AI may use it as the design original for the responsibility and scope recorded in its curation entry.

Only an explicit human decision can make a Reference `approved`. Passing tests, browser comparison, a successful build, or merging a pull request does not approve a design.

An approved design original is the combination of:

1. the exact executable Reference identified by the entry;
2. the concise guidance that defines what should be preserved and what may vary; and
3. the recorded human-approval evidence.

The executable example shows what the design looks and feels like. The guidance prevents incidental HTML, CSS, fixture data, or geometry from becoming accidental requirements.

## Changing an approved Reference

Do not silently edit an approved design original and keep calling it approved.

When the executable Reference or a material preserved behavior changes, treat the change as a draft until a human reviewer explicitly accepts the new version. Keep the previous approval evidence intact. A new candidate may reuse the same responsibility, but approval does not transfer automatically.

Changes that only clarify wording without changing the approved design meaning should still be reviewed proportionally, but do not require inventing a new lifecycle state.

## Using curated References

Before implementing a recurring UI responsibility, check this directory first.

Also identify the consuming application's shared interaction requirements using [Application interaction requirements](../docs/application-interaction.md). A bounded Reference is one input to the composed screen, not the complete application contract. Check compatibility before implementation and record cross-control coverage at handoff; do not infer a global keyboard policy from an isolated example.

Use an approved Reference only within its stated scope. Product requirements may override a Reference, but the difference should be explicit rather than silently interpreted as a new application-wide convention. If the required operation model materially differs, use or create a different Reference instead of stretching an existing one beyond its meaning.

Historical material under `docs/poc/` is research evidence. Working copies under `review/` are review surfaces. Neither is canonical merely because it exists. A curation entry makes the current design-original relationship explicit.

## Current curated References

- [Date range filter](date-range.md) — **approved** for a filter-style date range with independently optional Start and End boundaries.
- [Date range dependent recovery](date-range-recovery.md) — **draft** correction for opposite-boundary validation; original approval remains unchanged.
- [Invoice date range review requirements](invoice-date-range.md) — **draft** refinement preserving owner review requirements and the accepted Sunday cue; whole-candidate approval remains pending. Use it for continued Invoice desk work alongside the base Reference.

This directory is a curation pilot. Its file layout and metadata are not a frozen Torrone profile or public API.
