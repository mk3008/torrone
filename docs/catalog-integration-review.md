# Accepted catalog integration review

Date: 2026-10-16. Execution: [#58](https://github.com/mk3008/torrone/issues/58). Control: [root #77](https://github.com/mk3008/root/issues/77).

Ten independently accepted appearance examples were isolated on ten main-based Draft PRs. This branch combines their final accepted files and gallery cards; it does not merge those PRs. Artwork and PNG blobs are copied without edits. Entry-page status text now links each human decision. Original per-phase evidence remains historical evidence, including its then-pending adoption status.

## Accepted inputs

| Entry | PNGs | Browse | Human visual acceptance | Exact accepted head |
| --- | --- | --- | --- | --- |
| MENU-001 | 9 | [Gallery](../catalog/menus/one-level/index.html) | [#39](https://github.com/mk3008/torrone/pull/39#issuecomment-6188915992) | `af7d89adad449ddaf871865da2e4e864c8f2c9fc` |
| POPOVER-001 | 2 | [Gallery](../catalog/components/anchored-popover/index.html) | [#41](https://github.com/mk3008/torrone/pull/41#issuecomment-6190373994) | `2662960971eaa59b9efffa85224be44f0037eff8` |
| ICON-BUTTON-001 | 5 | [Gallery](../catalog/components/flat-icon-button/index.html) | [#43](https://github.com/mk3008/torrone/pull/43#issuecomment-6191706773) | `283b457b9c35468e82f4c7df16664c5964e07d58` |
| DATE-RANGE-001 | 8 | [Gallery](../catalog/components/date-range/index.html) | [#45](https://github.com/mk3008/torrone/pull/45#issuecomment-6191945674) | `1e33f63b640a95da0ae40dcf6f6e17a740546bd5` |
| INLINE-LOOKUP-001 | 7 | [Gallery](../catalog/components/inline-entity-lookup/index.html) | [#47](https://github.com/mk3008/torrone/pull/47#issuecomment-6192564496) | `17a57d93965d3d15ab6097daabc3ad26aa0245c7` |
| DIALOG-001 | 2 | [Gallery](../catalog/dialogs/framed/index.html) | [#49](https://github.com/mk3008/torrone/pull/49#issuecomment-6205936168) | `d738d9876c18814e73ded378b8f997860a784178` |
| PAGINATION-001 | 4 | [Gallery](../catalog/components/pagination/index.html) | [#51](https://github.com/mk3008/torrone/pull/51#issuecomment-6206130758) | `c5ac978db591da791f47b1601edcfc608bd315de` |
| BADGE-001 | 2 | [Gallery](../catalog/components/text-badge/index.html) | [#53](https://github.com/mk3008/torrone/pull/53#issuecomment-6206299372) | `54c99a8c2da4cf76f93e7fc11ae725b69dfcac42` |
| DISCLOSURE-001 | 2 | [Gallery](../catalog/components/disclosure/index.html) | [#55](https://github.com/mk3008/torrone/pull/55#issuecomment-6206673160) | `b69327ca6558b3874562f45be4246f81f2b3502a` |
| TEXT-BUTTON-001 | 6 | [Gallery](../catalog/components/text-button/index.html) | [#57](https://github.com/mk3008/torrone/pull/57#issuecomment-6206867682) | `c99292997fe59cd21358f5d31f37c3acbf37da2f` |

Total: **47 independent PNGs**. SHELL-001's existing five images remain unchanged (52 PNGs in the combined catalog). The rejected eight-image chooser proposal is excluded; DIALOG-001 uses only the final two frame images. Its superseded review document remains historical evidence.

## Source inventory and remaining boundaries

| Existing material | Disposition |
| --- | --- |
| Approved flat icon-button Reference | Five appearances extracted as ICON-BUTTON-001. Activation, keyboard and focus behavior stay in the executable original. |
| Approved date-range Reference | Eight appearances extracted as DATE-RANGE-001. Validation, recovery, keyboard and calendar operations stay in the executable original. Recovery/invoice redirects are not additional patterns. |
| Approved inline entity lookup | Seven appearances extracted as INLINE-LOOKUP-001. Conditional above-field and narrow popup placement remains unpictured; executable behavior is retained. |
| Approved specific entity chooser | Only generic dialog-frame regions extracted as DIALOG-001, as a separate proposal. Launching screen, query rules, selection resets and results are specific-screen behavior, excluded from the frame entry. |
| Historical navigation/account research | MENU-001 has six source-supported appearances plus three proposed disabled appearances. POPOVER-001 is a new generic proposal informed by research. Historical approval is not transferred. |
| Access review working draft | PAGINATION-001: first-page source appearance plus three proposals. BADGE-001: two source-supported appearances, generic extraction proposed. DISCLOSURE-001: open/closed relationship grounded in source, neutral body/copy adapted. TEXT-BUTTON-001: six source-supported appearances, generic extraction proposed. No source approval is inferred. |
| Existing SHELL-001 | Five images retained; the complete region is necessary to convey the shell relationship. No source or asset changes. |
| Watch Switch | Four images previously accepted in Chat, but the original ZIP is not recovered or registered. Outstanding under root #77; do not redraw and call it the accepted original. |
| Catalog boundary README | Separate pending [PR #37](https://github.com/mk3008/torrone/pull/37). `catalog/README.md` is intentionally untouched here. |
| Historical whole-screen candidate / held Graph work | [PR #36](https://github.com/mk3008/torrone/pull/36) and [PR #33](https://github.com/mk3008/torrone/pull/33) remain separate, unchanged. No further production is implied. |

Each entry's README retains exact provenance and source/proposal classification. Human visual acceptance does not change the source classification, executable Reference approval or unverified behavior. The inventory is a bounded salvage pass over existing materials, not an exhaustive component-library specification. Additional fields, tables or screens need a concrete reuse need and separate scope.

## Integration checks

- 105 imported files outside current entry status pages matched their accepted-head Git blobs exactly, including all 47 PNGs, 47 SVGs and 11 historical review documents.
- All 47 accepted PNGs decoded successfully; the combined catalog contains 52 PNGs including the unchanged five Shell images.
- Eleven current HTML pages passed local-destination/fragment checks (179 references), nonempty image alt checks and unique-ID checks.
- The Shell index card is byte-identical. Shell files, References, working sources, historical PoCs, catalog README and shared CSS are unchanged.
- All ten original candidate PR heads were read back and match the accepted input table; all remain Draft and unmerged.
- `git diff --check` passed. This integration reuses accepted artwork; no rerender or new design approval is claimed.
- Browser layout and interaction checks were not executed: local Chromium is unavailable. Static parsing does not establish browser/device/accessibility conformity.

## Application interaction applicability

This is a static browsing surface. The affected path is catalog index → entry gallery → independent PNG / provenance → catalog index. No consuming-product shared interaction record exists here; no navigation, dialog or input contract is being implemented. Those behavior requirements remain with the consuming product and bounded executable References. Static link and anchor checks cover file destinations and unique IDs only. Native focus traversal, activation, narrow viewport layout, touch, mobile keyboard, contrast and assistive technology are unverified; the local Chromium binary is unavailable. Existing per-phase browser limitations remain in force.

## Findings and handoff

- Fragmented accepted branches: addressed by one additive catalog Draft, preserving final accepted asset bytes.
- Duplicate category IDs from independent index additions: addressed by one menu, one dialog and one component section.
- Stale visual-adoption labels: updated only on current entry pages/READMEs; original evidence and original PR branches retained.
- Specific chooser scope: final generic dialog frames only; rejected intermediate assets excluded.
- Watch Switch original, README boundary PR and held proposals: remain explicitly tracked in root #77 and their existing PRs. No substitute artifact or automatic approval.

Human review is limited to the combined navigation and integration scope. Existing appearance acceptance stands. Merge, release, deployment and closure of original PRs remain separate decisions.
