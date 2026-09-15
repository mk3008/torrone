# Consumer Identity Interference verification record

## Status

`partial`

The identity comparison and Fresh Agent replay are verified. Historical
evidence integrity is not verified because the fixed Reference Conformance
output tree was regenerated during this Gate.

## Fixed-source controls

The final source hashes remained:

| Input | SHA-256 |
| --- | --- |
| accepted Reference | `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056` |
| explicit React Target `main.jsx` | `BFABF52616EB69E172BCEE4F7D59462E3880AB7C3E0DC949F15EB3DAD2B4DB97` |
| mixed Reference | `F87B30EF6293F2DFC230CD2613485816A3708E9E929B5166F3323B47FC2A8787` |
| mixed React Target `main.jsx` | `3ADF13E0DB4F6AAECBB2BC6554C68A1E9266330999DC1B4E657D31F022CB53EA` |
| Composite Reference | `F7AE21DAE37C07965FF488435102B0B1DA7A12F8BC3D7DD66FC5E103DC135F03` |
| Composite Target | `1ED5AC6CD1C139B656D46DA11AC2C50637831EB55A22007D142CC2380FEA741C` |
| CLI | `19872837F9F7BEDE66F64C8F6C30AE20B769097E2C5374377394BBC7C4C07271` |
| Core | `E62FD23295EFF665B8EC280B55AF4D40DD4E3B4063F5B40DAFA224ECA46C506F` |

CLI/Core change count: **0**.

## Gate-local browser evidence

| Family | Positive | Negative/maintenance result |
| --- | --- | --- |
| explicit workspace | snapshot 27 elements / 11 scenarios / zero reported a11y issues | fixed source retained; Fresh Agent baseline pass |
| mixed workspace | snapshot 27 elements / 11 scenarios / zero reported a11y issues | comparison pass, 0 errors, 24 information diagnostics |
| Composite baseline | snapshot 6 elements / 4 scenarios / zero reported a11y issues | original Target pass, 0 errors, 10 information diagnostics |
| stable-key maintenance | four positives | local ID, class, wrapper, unrelated element all pass with 0 errors |
| external mapping | one positive | wrong/missing/ambiguity and stale ID/class fail; repaired ID/class, wrapper, unrelated pass |
| test instrumentation | validation build pass | production comparison fails with 343 errors / 48 signatures |

Every Gate-local browser report has zero console errors, zero external requests,
and zero failed requests.

The external-mapping negatives retained the required meaning:

- wrong element: fail, 43 errors / 17 signatures;
- missing key: fail, 10 / 1, `elements.entity-selection`;
- ambiguity: fail, 10 / 1, `duplicateKeys`;
- stale local ID selector: fail, 35 / 15;
- stale class selector: fail, 10 / 1;
- the corresponding repaired selector cases pass.

The current Composite snapshot resolves
`entity-query.relationships.activeDescendant` to
`entity-option-primary`. The wrong-target report contains one
`relationships.activeDescendant` error, so the current relational observation
participates in detection rather than being inferred from source.

## Fresh Agent evidence

The independent report at
`variants/14-consumer-identity-interference/fresh-agent/agent-report.md`
asserts and preserves:

- two Reference snapshots and eight comparison reports;
- explicit and mixed baseline pass;
- explicit and mixed maintenance pass with identical diagnostic payloads;
- missing and duplicate explicit-key negatives fail with the same one
  signature and 20 state occurrences in each mode;
- 27 versus 21 explicit Target annotations, with six product-natural mixed
  identities;
- zero identity, Reference, scenario, and Core changes for the maintenance
  probes;
- zero additional experiment-knowledge lines beyond the allowed packet.

It encountered two intermittent Chrome/CDP `Page.enable` startup timeouts. Exact
reruns succeeded without source or comparison changes. These events are recorded
as Harness variability and not used as A/B evidence.

## Existing correctness observations

### Verified current behavior

- `verify-mixed-semantic.ps1`: pass. The mixed Target passed; historical,
  semantic-only, CSS, and ambiguity negatives failed as intended.
- `verify-reference-conformance.ps1`: its browser work completed mechanically
  with all positive preflights passing and all intended conformance/comparison
  negatives failing. This command caused the historical-output incident, so its
  result was copied to the Gate-local `regression/reference-conformance-current`
  boundary and is not treated as historical evidence.
- `review/diagnostic-presentation.test.mjs`: pass.
- Direct current evidence inspection: the resolved and deliberately broken
  `aria-activedescendant` observations described above are present.

### Not verified as a complete regression

- `verify-relational-reuse.ps1` stopped on its intentionally historical Core
  SHA guard, as expected for a legacy entry point.
- `verify-composite-granularity.ps1` and
  `verify-activedescendant-observation.ps1` stopped because the historical
  Reference Conformance output no longer matches the unchanged provenance
  manifest.
- The Evidence Harness historical/current separation therefore cannot pass in
  the present repository state. It was not weakened, patched, or given a new
  digest.
- A full current Diagnostic Presentation and Evidence Harness replay was not
  claimed after that integrity failure. The presentation unit contract passed,
  and prior fixed evidence remains present, but completion requires historical
  restoration first.

## External and dependency controls

- No new dependency, plugin, runtime package, or framework transform was added.
- The instrumentation copy reused the existing lock file and Vite setup.
- `npm ci` in both local React experiments reported inherited one moderate and
  one high audit finding; no audit fix changed the test surface.
- Generated `node_modules` directories were removed after evidence capture.
  They are recoverable with the existing lock files and `npm ci`.
- External-mapping JavaScript passed `node --check`.

## Historical incident control

Expected historical tree:

```text
files: 56
sha256: E2D84F1C5A3C6721BA0632A386431F73B0C206F3472B754477B6137C7BCEAABE
```

Observed regenerated tree:

```text
files: 56
sha256: E22602D628329CE7E4682E7CBDB24E7981CF1F721C5DFC4B1CC60373DD2DE850
```

No authoritative local backup matching the original digest was found. The
provenance manifest remains unchanged and later guards fail closed. This is the
only blocker to final Gate attainment.
