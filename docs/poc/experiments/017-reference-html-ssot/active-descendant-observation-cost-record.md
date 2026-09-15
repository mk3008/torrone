# `aria-activedescendant` relational observation Gate cost record

## Authoring and Consumer cost

| Surface | Change |
| --- | ---: |
| fixed Composite Reference files | 0 |
| fixed Composite Target files | 0 |
| Reference annotations | 5 -> 5 |
| Target annotations | 5 -> 5 |
| Consumer annotation increase | 0 |
| new Consumer/Reference metadata | 0 |
| new public CLI options | 0 |

The existing `entity-option-primary` identity was sufficient. Different local
IDs required no correction or synchronization.

## Shared implementation cost

Relative to the Core/CLI bytes preserved by the false-pass canary:

| File | Before | After | Diff |
| --- | ---: | ---: | ---: |
| `core/browser-core.js` | 508 lines | 514 lines | `+10 / -4` |
| `cli/reference-ui.mjs` | 929 lines | 929 lines | `+1 / -1` |

The Core change observes relation presence, resolves the target with the
existing identity map, and includes the attribute in missing-ID Conformance.
The CLI change extends the existing relationship-presence comparison list.

## Gate evidence cost

- canary capture entry point: 131 lines;
- final Gate verifier: 475 lines;
- plan: 98 lines;
- persistent negative source: one exact wrong-target HTML in the final canary;
- runtime negative variants: generated in a guarded temporary directory;
- duplicate expected-state file: none.

The verifier is evidence harness code, not a Consumer or Reference requirement.
It retains source hashes and fixed-tree digests because this Gate was explicitly
required not to overwrite historical evidence.

## Execution cost

- final false-pass canary: about 9 seconds;
- targeted positive/negative Gate: about 21 seconds;
- each Composite current regression: about 75 seconds;
- three attempted all-six-family Harness runs: approximately 354.5, 349.7,
  and 274.9 seconds;
- focused Diagnostic Review capture: about 22 seconds;
- isolated Diagnostic Adoption control: about 7 seconds.

The repeated full-Harness cost did not produce new relation evidence. It was
retained because reporting a full pass after the focus-sensitive stop would
have weakened the requested completion criterion.

## Maintenance judgment

The lasting implementation cost is small and centralized. Reference and
Consumer authoring cost did not increase. The much larger cost is regression
execution and provenance handling, especially the pre-existing focus-sensitive
Diagnostic Review positive; this Gate does not redesign that Harness.

