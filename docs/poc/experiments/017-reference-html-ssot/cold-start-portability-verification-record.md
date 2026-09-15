# Cold-start / Portability verification record

## Fixed-input controls

The current-agent evaluator captured the following controls before evaluating
Fresh Agent outputs:

| Control | Result |
| --- | --- |
| human-approved Date range preflight | pass; 59 states |
| human-approved Date range snapshot | 25 elements, 22 scenarios, 0 bounded a11y issues |
| approved independent Date range Target | pass; 0 errors, 105 informational diagnostics |
| accepted common-shell preflight | pass; 13 states |
| accepted search-workspace preflight | pass; 10 states |

The JSON files are under
`output/cold-start-portability/current-controls/`.

The final SHA-256 values remained identical to the frozen start values:

| Fixed file | SHA-256 |
| --- | --- |
| canonical integrated Reference | `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056` |
| approved Single date | `254E3BA5B2ECD1E2A1677DD5C4FC8FA95224FCB605A74387300E47BFA40102B7` |
| approved Date range | `387EC789769DE702263A802DE27368EA2128A2F27C25002E494C00DC65CC5D86` |
| CLI | `19872837F9F7BEDE66F64C8F6C30AE20B769097E2C5374377394BBC7C4C07271` |
| Core | `E62FD23295EFF665B8EC280B55AF4D40DD4E3B4063F5B40DAFA224ECA46C506F` |

## Independent evaluator reruns

The current-agent evaluator reran every Fresh Agent's decisive checks using the
unchanged CLI/Core. Evidence is under each test's `evaluator-evidence/` folder.

| Run | Reference Conformance | Snapshot | Target | Negative | Runtime |
| --- | --- | --- | --- | --- | --- |
| A | pass; 25 states | 28 elements, 12 scenarios, a11y 0 | pass; 0 errors/diagnostics | expected fail; 24 errors, 1 signature | external/failed/console 0 |
| B | pass; Single 28, Range 48 | Range 22 elements, 15 scenarios, a11y 0 | pass; 0 errors, 96 info | six expected failures; 1–27 signatures | external/failed/console 0 |
| C | pass; 23 states | 31 elements, 11 scenarios, a11y 0 | pass; 0 errors/diagnostics | expected fail; 23 errors, 1 signature | external/failed/console 0 |
| D | pass; Single 12, Range 18 | Single 10/7, Range 8/8, a11y 0 | pass; 0 errors/diagnostics | expected fail; 24 errors, 8 signatures | external/failed/console 0 |

For D, the eight completion signatures occurred only in the three states where
a completed boundary operation should have closed the calendar. Partial states
did not fail. `node --check` also passed for the independent Target JavaScript.

## Source-independence audits

Test A was rejected despite its comparison pass. Both stylesheets had 295
declarations and a near one-to-one rule sequence; different names and hashes
did not establish independent implementation.

Test C's retest used materially different source organization: a 26,727-byte
single-file Reference with Grid and direct listeners versus a 23,086-byte
split Target using Flex, five `@layer` blocks, a different DOM, and delegated
state/event organization. Test D similarly used an inline/free-function
Reference versus split CSS and a `CoveragePeriodEditor` Target class with root
event delegation. Class and local-ID intersections were empty, but those facts
were treated as supporting observations rather than the proof by themselves.

## Visual and interaction inspection

The evaluator inspected Initial, Results, Empty, collapsed navigation, dark
theme, user menu, page 2, Date range initial/open/partial/completed, and
unavailable-date frames. Test A and C rendered natural operational queues.
Test D showed two named boundaries, the correct active-boundary calendar, a
real fixed today cue, visually distinct selected/range/unavailable states, and
the same observable model in content-different Target markup.

## Harness variability

Some Fresh Agent browser launches reported transient DevTools `Page.enable`
timeouts when runs were concurrent. Serialized final runs and all evaluator
reruns completed without retry/tolerance/focus-policy changes. The known
focus-sensitive Evidence Harness issue remains separate; an all-family clean
Harness run is not claimed here, and no Harness setting was changed to make the
Portability result green.

## Repository boundaries

- CLI/Core change: 0 files, 0 lines.
- fixed Reference/Target change: 0 files, confirmed by hashes above.
- external network, failed request, and console errors: 0 in accepted final
  evidence.
- stage/commit/push: not performed.
