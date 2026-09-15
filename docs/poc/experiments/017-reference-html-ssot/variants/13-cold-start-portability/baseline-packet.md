# Baseline cold-start packet inventory

This file records the packet selected by the current-agent evaluator. It is an
evidence inventory, not an authoring guide and is not itself an input to the
fresh agents.

| Role | Existing file | Lines | Bytes | Must read before work |
| --- | --- | ---: | ---: | --- |
| repository authority | `AGENTS.md` | 20 | 1,850 | yes |
| long-lived PoC knowledge | `docs/poc/reference-html-observation-boundary.md` | 257 | 15,184 | yes |
| CLI usage | `docs/poc/experiments/017-reference-html-ssot/cli/README.md` | 80 | 3,998 | yes |
| CLI executable | `docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs` | 929 | 41,386 | no; execute |
| browser Core | `docs/poc/experiments/017-reference-html-ssot/core/browser-core.js` | 514 | 20,685 | no; CLI dependency |
| accepted common-shell Reference | `docs/poc/experiments/017-reference-html-ssot/variants/04-partial-reference/references/common-shell.html` | 354 | 15,436 | yes for Test A |
| accepted search-workspace Reference | `docs/poc/experiments/017-reference-html-ssot/variants/04-partial-reference/references/search-workspace.html` | 255 | 12,277 | yes for Test A |

## Baseline measurements

- Files: 7
- Human-readable authority/operation documents: 3 files, 357 lines, 21,032 bytes
- Accepted References: 2 files, 609 lines, 27,713 bytes
- CLI/Core runtime: 2 files, 1,443 lines, 62,071 bytes
- Entire packet: 2,409 lines, 110,816 bytes
- References: 2
- Authorities that must be read before work: 2 (`AGENTS.md` and the observation boundary)
- PoC-specific result, failure-history, self-review, or Gate record files: 0

The CLI usage note is operational documentation rather than design authority.
The fresh agents may execute the CLI/Core without reading their source.

## Intentionally excluded

The packet excludes the chat history, current-agent notes, PoC 017 `README.md`,
all Gate results and plans, all self-review and verification records, all
historical output, the accepted DatePicker oracle, its Phase 2 analysis, and
negative-test answers.

