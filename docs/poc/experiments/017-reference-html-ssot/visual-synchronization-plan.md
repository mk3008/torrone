# Reference Visual Rule Synchronization Gate Plan

## Decision frame

This Gate evaluates only maintenance choices inside the Reference Library. It does not change canonical References, Consumer Frontends, comparative observation semantics, or Reference Conformance authority.

The decision will be based on total maintenance cost rather than duplication percentage. A candidate must preserve direct browser use, readable HTML, canonical visual and interaction outcomes, and existing absolute invariants.

## Fixed inputs

| Input | SHA-256 at Gate start |
| --- | --- |
| `variants/04-partial-reference/references/common-shell.html` | `08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527` |
| `variants/04-partial-reference/references/search-workspace.html` | `3078962D0880A28658691922D2F6CB6E9E3A9239BCE735994EC71ABABBFD4C3B` |
| `variants/05-form-heavy-partial/reference/form-workflow.html` | `A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4` |
| Observation Core | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| CLI | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| Existing Conformance evidence packet | 62 files, aggregate digest `E318076A90555C11D9D678F6BB5FF57B311982552A86D59548A44433AC0BF7BF` |

Existing targets, negative evidence, Gate records, and canonical References remain read-only evidence.

## Compared candidates

1. **A — self-contained baseline:** fixed current References; every stylesheet remains inline.
2. **B — shared design tokens only:** a static Library-local CSS file supplies only values demonstrated to change for the same reason; selectors and component styling remain local.
3. **C — shared visual primitives:** a static Library-local CSS file also owns the common focus selector/rule.

No package, generator, preprocessor, bundler, template layer, runtime, schema, or Consumer distribution is introduced.

## Meaning boundary hypothesis

The initial audit identified `canvas`, `surface`, and focus color as candidates with both exact current equality and a shared change reason. Focus width/offset and selectors are compared in the broader primitive candidate rather than being invented as new tokens. Similar names or close values for text, muted text, borders, selected surfaces, primary actions, typography, and component styling are not sufficient evidence of shared ownership and stay local.

## Maintenance probes

- **Common probe:** temporarily change the shared focus color. Record touched files/locations, validation scope, missed-synchronization risk, and restore cost for A/B/C.
- **Local probe:** temporarily change only the form workflow danger color. Confirm that no common layer or other Reference needs editing and that unaffected References still pass.

Probe changes are disposable and must not remain in canonical or candidate artifacts.

## Acceptance criteria

- Fixed-input hashes and the existing Conformance packet digest remain unchanged.
- B and C reproduce A for state, computed style, focus, interaction, bounded accessibility, console/network outcomes, and screenshots.
- Every candidate passes existing absolute invariants without new rules.
- Common and local probes produce the expected detectable difference, then restore to a clean pass.
- Cost records distinguish file count, edit locations, imports, review/exploration scope, coupling, validation volume, and direct-browser cost.
- No CLI/Core, Consumer, build, package, or runtime change is required.
- Two self-review cycles test false sharing, over-abstraction, evidence quality, and scope discipline.

## Stop conditions

Stop with `blocked` rather than adapting the evidence if the experiment requires a canonical design change, a new design principle, a Consumer requirement, build/package/runtime infrastructure, a large architecture change, or authority reassignment.

## Evidence plan

1. Audit exact declaration/token recurrence and prior correction history.
2. Build B and C as new reversible Variants; use A only from fixed inputs.
3. Capture A snapshots and verify B/C against them.
4. Compare screenshot hashes and preflight each document.
5. Run and restore both maintenance probes for all candidates.
6. Re-run fixed Conformance regression and hash guards.
7. Record quantitative and qualitative cost, then complete two self-review cycles.
