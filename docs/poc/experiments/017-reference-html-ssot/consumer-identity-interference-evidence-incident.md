# Consumer Identity Interference evidence incident

## Status

`unrecovered`

During this Gate, `verify-reference-conformance.ps1` was invoked directly from
the repository. That historical entry point writes to
`output/reference-conformance`, so the invocation regenerated the 56-file tree
that the Evidence Harness Maintenance Gate had frozen as historical evidence.

No accepted Reference, fixed Target, CLI, Core, scenario contract, verification
record, or historical provenance manifest was changed. The browser run itself
passed mechanically, including its intended negative probes, but its output is
current evidence and must not be represented as the original historical run.

## Integrity observation

- Expected historical tree: 56 files,
  `E2D84F1C5A3C6721BA0632A386431F73B0C206F3472B754477B6137C7BCEAABE`.
- Tree after the accidental direct run: 56 files,
  `E22602D628329CE7E4682E7CBDB24E7981CF1F721C5DFC4B1CC60373DD2DE850`.
- The unchanged provenance guard correctly stopped later Composite and
  `aria-activedescendant` Gate entry points rather than accepting the new tree
  as historical evidence.
- A copy of the current 56-file run was retained under
  `output/consumer-identity-interference/regression/reference-conformance-current`
  so that it remains explicitly separate in meaning.

## Recovery attempts

- Searched prior Evidence Harness current-regression copies. They are separate
  current runs and do not match the historical digest.
- Searched surviving PoC temporary directories and other local worktrees. No
  copy of the historical tree was found.
- Checked for accessible Windows shadow-copy metadata. No usable shadow copy
  could be read in this environment.

The provenance manifest was not edited and no near-match current run was
substituted. Reconstructing bytes solely to satisfy the digest would be false
evidence.

## Effect on this Gate

The Consumer identity experiments, their fixed source hashes, and their
isolated browser evidence remain usable. Current Reference Conformance behavior
was observed as passing, but the required historical/current separation is no
longer fully satisfied in the repository state. Therefore this Gate cannot
claim a final `hybrid-preferred` attainment even if the comparative cost result
favors the mixed boundary. The honest attainment ceiling is `partial` until an
authoritative backup restores the original historical output tree.

## Prevention

All remaining regression work in this Gate uses isolated copies or direct
current CLI checks with Gate-local outputs. A future task should make legacy
entry points refuse direct writes to frozen output locations or require an
explicit isolated output root. That hardening is not implemented here because
it would expand this identity-cost experiment into Evidence Harness redesign.
