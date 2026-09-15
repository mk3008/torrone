# Diagnostic Review Presentation Variants

This directory records presentation alternatives for complete PoC 017
comparison reports. It contains no Reference, Target, Consumer, or metadata
contract.

- **A — raw:** the unchanged report `differences` array.
- **B — exact observation signature:** group repeated state/frame occurrences
  only when diagnostic kind, normalized observable path, expected value, and
  actual value are all equal. This is the adoption candidate.
- **C — field-only:** group by kind and normalized path without value identity.
  This is a measured rejection candidate when real reports contain multiple
  value pairs for one field.

Every B entry retains the complete one-based raw indexes and the source report
hash. Grouping changes review presentation only; it does not change raw
generation, comparison status, counts, severity, or exit behavior.

