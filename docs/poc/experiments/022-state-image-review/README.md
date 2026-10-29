# PoC 022 — State-image comparison review

Execution: [Torrone #64](https://github.com/mk3008/torrone/issues/64). Control: [root #181](https://github.com/mk3008/root/issues/181).

**Status: prepared, not evaluated.** Accepted source images were inspected, eight controlled cases were authored, and source identities were recorded. No implementation screenshot was successfully captured in this run. There are no measured detection results, false-positive/miss counts, review-time savings, or adoption recommendation. Do not interpret this preparation as a completed PoC.

## Question and boundary

Can comparing accepted state images with implementation screenshots reveal useful discrepancies in selection visibility, hierarchy and region presence, without rejecting legitimate platform/theme differences? This is static visual-transfer research, separate from [PoC 019](../019-ai-browser-review/README.md)'s executable Reference review. It does not judge design quality or approve a design.

The sources are `MENU-001` and `SHELL-001` at `581c77f7d8d3ce3d3bcc3139c94e057f7b4888c0`. See [sources.json](sources.json) for paths, Git blob identities, SHA-256 digests, provenance and acceptance links. Original assets, curation, historical evidence and main guidance are not modified by this experiment. During the interrupted run, the separately approved image-first documentation alignment completed via PR #62, merge `f52e38de345169bec49401f4bc74ecd474c903b1`; [root #178](https://github.com/mk3008/root/issues/178) is the status record. Source identities stay pinned to the original sampling revision. The source catalog assets are unchanged by that documentation-only merge.

## Review material

Open [samples.html](samples.html) after a local checkout. These are independently authored **synthetic HTML specimens**, not production screens, adopted designs, or captured browser evidence. They do not reuse catalog artwork or production implementation code. The native select is merely a browser-standard control candidate until actually rendered and inspected. Labels, colors and numerical dimensions are incidental fixtures.

1. **C01 — selected child without a visible selection cue:** seeded discrepancy; not rendered or evaluated.
2. **C02 — selected child aligned with its parent:** seeded hierarchy discrepancy; not rendered or evaluated.
3. **C03 — hidden drawer retains an icon rail:** seeded region discrepancy against the fully hidden drawer pattern; not rendered or evaluated.
4. **C04 — native selection and grouping:** allowed-difference candidate; not rendered or evaluated; native semantics/behavior remain unverified.
5. **C05 — different palette and density:** allowed-difference candidate retaining menu relationships; not rendered or evaluated.
6. **C06 — state identity omitted from review input:** deliberately insufficient evidence; not rendered or evaluated.
7. **C07 — selected-plus-disabled combination:** catalog-state and consuming-requirement gap; not rendered or evaluated.
8. **C08 — fully hidden drawer with expanded workspace:** positive control; not rendered or evaluated.

Expected outcomes are author-known hypotheses in [protocol.md](protocol.md), not observations. One agent authored the cases and knows their mutations. Any continuation in the same context is unblinded self-review, not an independent efficacy experiment. Do not report precision/recall from this small handpicked set as a product estimate.

## Interrupted run and alternative assessment

The cloud-browser provider initialized. Opening the local catalog page did not produce a page observation; the call was aborted. A subsequent inventory showed only `about:blank` tabs. The connected Browser plugin separately reported that the originating browser context/extension was unavailable. No bot-block, permission-review rejection, successful capture, or browser-rendering failure was established. Do not attribute a technical root cause that was not observed.

A local static server was started but not proven reachable from the cloud browser. No successful connection, screenshot persistence, native-control rendering, or target-state assertion is claimed. Stop the server when it is no longer needed. Shell policy/readiness metadata were unavailable in this environment; no new credentials, network permissions, package installation or proxy bypass were attempted.

Existing historical implementation captures were inventoried as a possible alternative. They were not used as a new audit or a scored test: they lack this protocol's state assignments and controlled mutations, and reusing old captures cannot establish a fresh independent measurement. A source-only check can validate preparation; it cannot replace the missing rendered comparison. No repeated navigation, browser substitution through an external service, or permanent capture engine was introduced.

## Baseline and incremental value

Two baselines must be distinguished. A minimal functional checklist that asks only for navigation destinations and workspace content omits visual relationships; a screenshot comparison might add coverage there. A normal requirement review that explicitly checks selection, indentation and full drawer hiding already targets all three seeded discrepancies. Finding these discrepancies would therefore not prove images outperform complete requirements.

Neither baseline was run against target screenshots. Human review time, human discoveries and AI review time were not measured. Source inspection suggests a hypothesis about reduced interpretation effort, not observed incremental value. The interrupted navigation reported approximately 22,421 seconds of waiting; that delay is excluded from productive review time and cannot be presented as human/AI effort savings. Active setup, reasoning and token cost were not instrumented.

## Material findings and disposition

| Item | Category | Disposition |
| --- | --- | --- |
| C01–C03 mutations | Hypothetical implementation deviations | Research controls only; no product defect asserted or product fix requested. Keep with this experiment. |
| C04 / C05 tolerance | Consuming application's adaptation decision | Observe recognizability after rendering; do not require exact accent pixels, colors, dimensions or CSS. No global native-control policy is adopted. |
| C06 missing state identity | Insufficient evidence | Request the expected state/capture identity during review; do not guess PASS or defect from a plausible image. |
| C07 combined state | Catalog-state gap plus consuming requirement | Preserve as unknown; no automatic catalog extension or product rule. A real consumer must supply its requirement before comparison. No new state is needed for this synthetic test. |
| Missing target screenshots and comparison | Execution blocker | Outstanding in [#64](https://github.com/mk3008/torrone/issues/64); capture, inspect, score and return the results before claiming root #181 Done. |
| Permanent workflow / Skill / CI | Unproven benefit | Not pursued in this run. Reconsider only after measured benefit and human adoption decision. |

This applies [GUI finding disposition](../../../development-workflow.md#disposition-of-gui-findings) without creating a finding registry. There are no discovered production GUI defects. No catalog correction is justified by these planned cases.

## Application interaction and verification limits

This adds research material only; it does not change a consuming application. No application interaction policy has been supplied or adopted. The specimens are frozen appearances; navigation, keyboard, focus, validation, persistence, responsive behavior, accessibility and cross-control paths are unverified and out of this static experiment's claims. Browser-standard controls do not by themselves establish platform or accessibility conformance.

Source/link/hash checks cover preparation integrity only. There is no GUI/E2E pass, screenshot audit, design approval, merge, release or deployment. Next: execute [protocol.md](protocol.md) in a working capture environment, retain exact screenshot bytes and observations, then return a bounded recommendation to root #181. Do not expand into a general comparison engine to work around this run's capture limitation.
