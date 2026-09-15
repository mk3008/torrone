# Consumer Identity Interference two-cycle self review

## Cycle 1: comparison and architecture review

### Findings

1. Annotation count alone initially made external mapping look favorable.
   Source inspection showed that five attributes became five selectors, a
   24-line loader, a three-file validation copy, and new local-ID/class
   synchronization. The result text was corrected to classify this as moved
   cost, not reduced interference.
2. The external mapping copy is not a production-ready external injection
   design. It loads its mapping in the isolated validation page because the CLI
   has no injection surface. The report now treats this as additional adoption
   cost rather than claiming zero runtime integration.
3. Conditional instrumentation removes production DOM attributes but retains
   all 21 author-maintained source sites. The comparison was corrected to count
   source/build knowledge and dual artifact lineage, not bundle size alone.
4. Composite `data-ref` attributes are dual-use JavaScript hooks in the existing
   sample. They were separated from the React Targets' validation-only
   annotations so the experiment does not hide the product-hook refactor needed
   to remove them.
5. The Core's current natural-semantic boundary was measured but not expanded.
   No role, wording, fixture, class, local-ID, DOM-index, or selector heuristic
   was added to improve the candidate.

### Corrections

- Added stable-key and external-mapping maintenance probes for the same
  Composite responsibility.
- Added wrong-target, missing, ambiguity, stale-selector, and repaired-selector
  evidence.
- Added a two-mode Fresh Agent replay with identical maintenance and negative
  tasks rather than trusting the experienced implementation result.
- Recorded the first failed npm argument-forwarding form and intermittent
  Chrome/CDP startup events as operational cost rather than silently retrying.

### Cycle 1 conclusion

The bounded architecture/source/maintenance result favors mixed/hybrid. The
remaining explicit identities are cheaper and more diagnosable than the tested
external or conditional alternatives.

## Cycle 2: evidence, regression, and claim review

### Blocking finding

The direct Reference Conformance regression invocation regenerated a historical
output tree. This violated the explicit no-overwrite condition even though the
browser checks passed and all product/implementation sources remained fixed.

The unchanged historical manifest detected the difference:

- expected: 56 files,
  `E2D84F1C5A3C6721BA0632A386431F73B0C206F3472B754477B6137C7BCEAABE`;
- actual: 56 files,
  `E22602D628329CE7E4682E7CBDB24E7981CF1F721C5DFC4B1CC60373DD2DE850`.

### Response

- Did not change the provenance manifest, Gate conditions, retries, comparison
  semantics, or expected negative results.
- Copied the new run to an explicitly current Gate-local boundary.
- Searched previous current-regression copies, temporary directories, local
  worktrees, and accessible shadow-copy information; no authoritative original
  tree was found.
- Stopped claiming Composite, active-descendant, Diagnostic Presentation, or
  Evidence Harness complete regression once the provenance guard failed.
- Lowered overall attainment from `hybrid-preferred` to `partial`, while keeping
  `hybrid-preferred` only as the supported comparative-method result.
- Added a dedicated incident record and a prevention recommendation; did not
  expand this Gate into an Evidence Harness redesign.

### Other claim checks

- Annotation-zero was not used as success criteria.
- Product-natural ARIA/landmarks were not counted as Consumer interference.
- Source independence was not inferred from renamed hashes/classes/IDs; it
  relies on the fixed preceding transfer evidence and independently structured
  React/Composite implementations.
- Fresh Agent knowledge was not inflated with this Gate's answer; it received
  only the allowed packet, fixed inputs, and CLI help.
- The known focus-sensitive Harness variability was not converted into a
  tolerance, retry contract, or result advantage.
- No Profile, stable-key specification, mapping format, build mode, CLI API,
  Consumer policy, or production architecture was frozen.

## Final triage

- Method result: mixed/hybrid is the lowest observed total-cost boundary.
- Gate attainment: `partial` because historical/current evidence separation is
  broken until an authoritative backup restores the historical tree.
- Human design review: not required; no UI design changed.
- Human product/architecture decision: none.
- External action needed: authoritative evidence restoration, not a design
  choice.
- Stage/commit/push: not performed.
