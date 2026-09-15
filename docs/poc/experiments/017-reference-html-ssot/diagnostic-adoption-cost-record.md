---
type: PoC maintenance cost record
title: Diagnostic Presentation Adoption cost
status: completed comparison
source: third-responsibility reuse and four-report post-Gate adoption
---

# Reuse cost

| Item | Existing lines | Lines changed for third responsibility | New adoption lines |
| --- | ---: | ---: | ---: |
| exact reporter | 253 | 0 | 0 |
| analysis helper | 133 | 0 | 0 |
| fixture tests | 73 | 0 | 0 |
| best-effort publisher | — | — | 91 |
| four-report adapter | — | — | 40 |

Dependencies, raw-schema changes, Reference metadata, grouping rules, and
Reference-specific conditions added: zero.

The responsibility-distinct comparison required one 393-line noncanonical,
buildless integrated Target because no existing shell/detail Target was
available. Its first browser comparison required one local CSS correction
cycle (status-badge values and scroll ownership). This is experiment-fixture
cost, not a per-report cost and not part of the adopted reporting utility.

# Reviewer cost

Direct review of the new responsibility requires 126 raw items and 969 JSON
lines. Exact presentation requires 23 distinct entries and 65 Markdown lines,
while preserving all 126 indexes. Across the six demonstrated comparisons,
946 raw informational items become 102 exact entries and 844 repetitions are
folded.

The new detail comparison also contains one real field-only false group. The
safer exact presentation costs one extra entry and is retained.

# Adoption cost

The adapter contains four orchestration mappings because the existing Gates
use four fixed raw filenames. These are not semantic or grouping heuristics.
Adding another comparison costs one mapping plus its generated destinations;
the reporter remains unchanged unless a genuinely new raw difference shape is
introduced.

The publisher's size pays for failure boundaries that a direct Node call does
not provide: atomic derived-file promotion, raw-hash verification, raw/output
alias protection, and a non-failing skip path. A forced missing-reporter run
removed only stale derived outputs, retained the raw byte-for-byte, and
returned exit 0. A separate alias probe left the raw present and unchanged.

# Conclusion

The central implementation cost is now amortized across responsibility-
distinct screen parts. Keeping the reporter standalone is cheaper and safer
than duplicating grouping code in each Gate or moving an experimental format
into CLI/Core. The 125-line adoption layer is justified, but it does not
justify a public command, schema formalization, or additional taxonomy.
