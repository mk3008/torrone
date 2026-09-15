# Consumer Identity Interference cost record

## Measurement boundary

The experiment compares total maintenance work rather than source annotation
count alone. Product-natural semantics and ARIA are not counted as Library
interference. Validation-only identity, external synchronization, build/runtime
requirements, resolver complexity, failure diagnosis, and Fresh Agent knowledge
are counted.

The fixed subjects were one workspace responsibility and one Composite UI:

| Responsibility | Shape | Explicit identity | Natural semantic/relational identity | Consumer classification |
| --- | --- | ---: | ---: | --- |
| Workspace A | accepted Reference + independent React Target | 27 | 0 used for correspondence | 27 validation-only Target annotations |
| Workspace B | mixed Reference + independent React Target | 21 | 6 | 21 validation-only Target annotations; six identities arise from existing product-natural semantics/relations |
| Composite | Entity Autocomplete Reference + independent Target | 5 | 1 | five Target annotations are dual-use JavaScript hooks in this sample |

The current Core is 514 lines. Its direct explicit lookup and existing natural
semantic/relational index occupy 60 physical lines (`browser-core.js:199-258`).
This Gate added no resolver, role heuristic, wording/fixture inference, or Core
branch.

## A. Explicit identity baseline

The explicit workspace uses 27 literal Target attributes and no external asset.
The attributes do not affect React state, components, CSS, DOM grouping, event
handling, or production runtime. A developer can see the correspondence beside
the element it identifies.

On the Composite maintenance copy, stable identity required no change for any
implementation-only edit:

| Probe | Product-source delta | Identity delta | Core/mapping delta | Comparison |
| --- | ---: | ---: | ---: | --- |
| local ID rename | one file, 1 add / 1 delete | 0 | 0 | pass |
| class rename plus matching CSS | one file, 2 add / 2 delete | 0 | 0 | pass |
| grouping wrapper | one file, 5 add / 3 delete | 0 | 0 | pass |
| unrelated hidden element | one file, 1 add | 0 | 0 | pass |

The baseline cost is therefore one local annotation per genuinely ambiguous
observation target. It is visible Consumer-source maintenance, but it does not
create a second synchronization file.

## B. Existing natural semantic / relational boundary

The mixed workspace retains all 27 observations while replacing six explicit
keys with rules already corroborated by prior Gates. The current browser replay
reported 21 explicit plus six natural identities, 11 scenarios, zero comparison
errors, zero console errors, and zero external/failed requests. The existing
semantic ambiguity probe still fails closed.

This is a real reduction in Reference/Consumer author-maintained metadata because
the six remaining semantics are product-natural and already serve accessibility
or document structure. It does not add an external mapping, build mode, or new
Core code in this Gate. It does not attempt semantic identity for repeated or
otherwise ambiguous actions.

## C. External mapping experiment

The isolated Composite copy removed all five `data-ref` attributes from the
Consumer HTML. It added a five-entry one-to-one selector mapping:

| Asset | Lines | Nonblank | Bytes |
| --- | ---: | ---: | ---: |
| Consumer HTML | 57 | 56 | 4,448 |
| Consumer JavaScript after hook refactor | 58 | 58 | 2,224 |
| identity mapping/loader | 24 | 22 | 1,003 |

The original self-contained Consumer was one 87-line / 6,766-byte file. The
experiment became three files and 139 source lines. Five Consumer annotations
became five selectors plus a loader. Because the CLI has no external-injection
surface, the small experiment loads the mapping in its validation copy; a real
adoption would additionally need an injection or copy-generation boundary.

Observed behavior:

| Probe | Result | Errors / signatures | Meaning |
| --- | --- | ---: | --- |
| mapped positive | pass | 0 / 0 | mapping can reproduce the observation |
| wrong target | fail | 43 / 17 | state, focus, style, interaction, and active-descendant differences remain detectable |
| missing mapping | fail | 10 / 1 | missing correspondence is not guessed |
| ambiguous selector | fail | 10 / 1 | duplicate key is fail-closed |
| local ID changed, mapping stale | fail | 35 / 15 | Consumer implementation-only change creates mapping maintenance |
| local ID changed, mapping repaired | pass | 0 / 0 | one additional selector synchronization restores it |
| class changed, mapping stale | fail | 10 / 1 | Consumer implementation-only change creates mapping maintenance |
| class changed, mapping repaired | pass | 0 / 0 | one additional selector synchronization restores it |
| grouping wrapper | pass | 0 / 0 | selector happened to tolerate this wrapper |
| unrelated hidden element | pass | 0 / 0 | unrelated content is ignored |

All runs had zero console, external-network, and failed-request errors. The
mapping remains diagnosable, but the reason for correspondence moved away from
the element and local ID/class changes acquired a second synchronization point.
The result removes surface annotation without lowering total cost.

## D. Conditional test-time instrumentation

The existing Vite environment allowed a small conditional helper without a new
dependency:

```text
validationRef(key) -> key in identity-validation mode, undefined in production
```

The React source still has 21 `data-ref` prop sites and 21 helper calls. The
validation build passed against the mixed baseline with zero errors and 24
informational diagnostics. The production build omitted the sampled key strings
and was 364 bytes smaller, but it exposed only eight heuristic semantic
observations and failed comparison with 343 errors / 48 signatures.

This direction removes attributes from the production DOM, not author-maintained
identity from the component. It adds a helper, a named validation build mode,
two artifact lineages, and command knowledge. The first attempted npm forwarding
form also treated the mode arguments as positional; direct `npx vite build
--mode ...` was required. Existing declared dependencies were reused, but
`npm ci` reported the package's inherited one moderate and one high audit issue.
No dependency or audit fix was added.

## Total-cost comparison before Fresh Agent replay

| Direction | Consumer identity surface | Cost moved outside element | Architecture/runtime effect | Fail-closed | Preliminary total-cost reading |
| --- | --- | --- | --- | --- | --- |
| A explicit | 27 workspace; 5 Composite | none | none for workspace; Composite sample dual-uses local hooks | yes | simple, stable baseline |
| B mixed | 21 workspace; 5 Composite | six product-natural identities resolved by existing Core | none | yes | lowest observed total cost |
| C external map | 0 Composite source attributes | five selectors, 24-line loader, three-file shape, selector synchronization | validation-copy runtime/injection boundary required | yes | complexity moved, not reduced |
| D test mode | 0 production DOM attributes; 21 source sites remain | helper, mode, two build lineages | build process now matters to validation | yes in validation mode; production comparison fails | runtime cleanliness without maintenance reduction |

The Fresh Agent replay is recorded separately and is required before the final
operational recommendation.
