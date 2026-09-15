---
type: PoC hypothesis record
title: Reference HTML notation hypotheses
status: active
source: authored
---

# Candidate 1: semantic HTML only

Use landmarks, headings, native controls, labels, IDs, and ARIA relationships,
with no Reference-specific metadata.

Expected advantage: the HTML has no new notation and remains directly useful
outside this tool.

Expected risk: a CLI can inspect one page, but content-specific IDs and changed
control counts make it difficult to match design-bearing elements in a screen
with different content. Positional selectors make the report depend on DOM
shape.

The bounded fixture is in [`iterations/01-semantic-only`](iterations/01-semantic-only/).

# Candidate 2: semantic HTML plus minimal stable keys

Add `data-ref` only to design-bearing elements that must be matched across the
Reference and consumers. Keep native elements and ARIA as the state and
relationship vocabulary. Add one inline JSON block containing action sequences
only; do not repeat the expected state.

Expected advantage: the browser-observed Reference state remains the sole
expected state. Consumers may change text, DOM wrappers, CSS organization, and
framework while the CLI retains a small matching surface.

Expected risk: keys can grow into an ungoverned catalog, and action sequences
can become expensive if every product behavior is included.

# Candidate 3: full declarative contract metadata

Restate roles, expected styles, geometry, state values, and interaction outcomes
in JSON or YAML next to the HTML.

Expected advantage: straightforward static parsing.

Expected risk: it duplicates observable browser facts, increases correction
cost, and creates a second source that humans must synchronize. This candidate
will be rejected without implementation unless Candidate 2 cannot produce a
useful report.

# Decision rule

Prefer the candidate with the lowest total correction and drift cost that can
still identify meaningful cross-content differences. Parser convenience alone
is not sufficient reason to retain metadata.

