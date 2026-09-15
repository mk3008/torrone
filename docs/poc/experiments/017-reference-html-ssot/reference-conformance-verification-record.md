---
type: verification record
title: Reference Conformance and absolute invariant Gate verification
status: passed
source: verify-reference-conformance.ps1 and output/reference-conformance
---

# Authoritative command

```powershell
& .\verify-reference-conformance.ps1
```

The command was run from the experiment directory with local headless Chrome
151. The final run completed with exit `0`.

# Verification matrix

| Claim | Evidence | Result |
| --- | --- | --- |
| CLI/Core parse | `node --check` for both sources | pass |
| deterministic positive | repeated valid-fixture preflight hashes | byte-identical pass |
| accepted/prior References | eight preflight reports | all pass; 0 errors/warnings |
| exact defect canary | broken comparison, broken preflight, restored preflight | pass / error / pass |
| new DOM rules | missing IDREF, harness-crossing IDREF, invalid label, harness key, invalid token cycles | each error, each restore pass |
| reused Core/runtime rules | duplicate key, console, action, network cycles | each error, each restore pass |
| existing negatives | semantic ambiguity, relational ambiguity, missing `h1` | each error |
| comparative positive | form Target vs form Reference | pass; 0 errors |
| comparative negatives | historical, semantic-only, CSS | fail with expected signatures |
| accepted Reference regression | fresh snapshot | 27 elements, 11 scenarios |
| fixed evidence | four source hashes and form packet digest before/after | unchanged |
| external communication | source scan plus every positive report | none |
| Consumer impact | source metrics and opt-in snapshot inspection | 0 Consumer edits; normal snapshots contain no conformance facts |

# Canary detail

The disposable Reference and Target each replaced exactly one current
`setAttribute('aria-invalid', 'true')` call with the previously used
`toggleAttribute('aria-invalid', invalid)` call.

- comparative report: `pass`, zero errors;
- preflight report: `error`, one unique signature;
- observed occurrences: primary required field, contact required field, and
  invalid email;
- console errors, action errors, external requests, and failed requests: zero;
- restored Reference preflight: `pass`.

# Reversible negative detail

All nine probe families were copied to a unique temporary directory and
deleted after execution. Each family produced a positive report before the
mutation, an error report after one mutation, and a byte-identical positive
report after restoring the source.

The external-network probe produced both the expected external-request and
failed-request signatures. Static DOM mutations repeat across initial and
scenario states, so their raw error counts are two while their unique signature
count is one.

# CLI behavior

- `preflight` with a valid input and `--out`: exit `0`;
- detected invariant error: exit `1`;
- incomplete invocation: exit `2` and usage including `preflight`;
- report status vocabulary: `pass` / `error`;
- warning count: always zero in this Gate;
- no score field or quality percentage;
- ordinary snapshot regression confirmed `initial.conformance` is absent.

# Harness reliability

The final Gate record contains 51 attempts, zero DevTools timeouts, and zero
retries. Three preliminary restricted-sandbox attempts timed out at
`Page.enable`; they are retained in the reliability note rather than counted as
Reference failures. The fixed form-heavy packet remained 98 files with the
same digest.

# Visual boundary check

The minimal valid fixture was captured at 1440 by 900 before and after its one
action. Its hidden harness did not appear in the product surface or AX
observation. The trigger remained in place and the status below it changed from
`Not searched` to `Lookup complete`. This evidence is only a sanity check for
the fixture; it is not a new business Screen Pattern.

# Verification limits

Only local Chrome 151 was used. Bounded accessibility observation is not real
assistive-technology evidence. Custom application validation, responsive
behavior, other browsers, malformed-contract report classification, and
subjective design quality were not verified by this Gate.
