# UI Design Manifest PoC experiment ladder

> Experiments may use original UI evidence only as test oracles. Standard application receives a source-blind manifest packet and target-product inputs; accepted historical results require revalidation before they demonstrate this boundary.

The ladder tests small, observable claims in order. It dogfoods two things: whether extraction methods expose useful business-application observation points, and whether source-independent Markdown communicates the retained roles and relationships through reconstruction and semantic re-extraction. Passing one gate permits the next experiment; it does not prove overall utility, fidelity, or canonical status. Keep raw artifacts so an independent evaluator can distinguish observation, inference, authored defaults, contextual patterns, and target-product decisions.

Reference HTML experiments also follow the
[Reference HTML observation boundary](reference-html-observation-boundary.md).
That note is cross-PoC experimental guidance, not a Manifest or Profile
authority.

## Gate 1 — Structure discovery

**Question:** Can a fresh reader locate relevant manifest concepts without loading the whole bundle?

**Raw evidence:** reader transcript or tool log, files opened in order, selected concept paths, elapsed navigation notes, and broken-link/front-matter check.

**Pass signal:** the reader starts at `index.md`, finds the bounded concepts, and can state their scope and provenance.

**Stop/rework:** missing routes, misleading descriptions, invalid front matter, or reliance on undocumented directory knowledge. Repair indexes or profile wording before extraction.

## Gate 2 — Bounded extraction

**Question:** Can an extractor use permitted source evidence to exercise the observation method and produce a small valid bundle while separating observation, inference, authored defaults, contextual patterns, target-product decisions, and gaps?

**Raw evidence:** scope declaration, viewport/state captures, extraction transcript, output tree, evidence and inference registers, unresolved list, and validation output.

**Pass signal:** every claim is traceable or labeled, the bundle is navigable and structurally valid, excluded source areas remain uninspected, and the output is treated as a candidate rather than automatic canonical knowledge.

**Stop/rework:** copied implementation code, unlabeled inference, scope drift, missing critical evidence, or a catalog-sized output. Narrow scope or rewrite before reconstruction.

## Gate 3 — Manifest-only visual reconstruction

**Question:** Can a fresh implementer reconstruct a bounded static slice using target-product inputs plus only relevant Manifest concepts, without seeing the source UI, so the Markdown's communication quality can be evaluated?

**Raw evidence:** exact input packet, files opened, implementation diff, rendered captures at declared viewports, guidance trace, assumptions, and build/test output.

For a repeated-generation experiment, use the
[three-run Manifest reproducibility protocol](experiments/three-run-reproducibility-protocol.md):
freeze the complete input set, preserve all outputs unchanged, classify
deviations before changing any input, and regenerate all runs after an input
change. The test subject is the fixed Manifest plus product prompt (and a
separately declared fixture when one is used); never repair a generated output
to make a three-run result look compliant.

**Pass signal:** the slice runs, the evaluator can trace visible decisions to manifest concepts, and no prohibited source evidence reached the implementer.

**Stop/rework:** source leakage, missing runnable output, unverifiable guidance influence, or gaps that force material invention. Improve the manifest rather than coaching the implementer informally.

## Gate 4 — Interaction reproduction

**Question:** Can the reconstructed slice apply the nominated interaction responsibility and relevant states from the allowed inputs?

**Raw evidence:** scripted or recorded interaction, before/after captures, focus and keyboard observations, state transitions, console output, and functional test results.

**Pass signal:** the bounded interaction completes and required observable states are represented without violating requirements.

**Stop/rework:** critical state absent, interaction ambiguity, inaccessible operation, or behavior inferred beyond evidence. Return to extraction or obtain a product decision.

## Gate 5 — Independent comparison

**Question:** Can an evaluator who did not extract or implement identify agreements, deviations, and unsupported choices?

**Raw evidence:** side-by-side captures or recordings, evaluator rubric, issue list with evidence references, severity rationale, and manifest-to-result trace.

**Pass signal:** findings are reproducible, scoped, and distinguish manifest gaps from implementation mistakes and acceptable higher-precedence deviations.

**Stop/rework:** evaluator received hidden source context, conclusions lack raw evidence, or the rubric embeds unstated style preferences. Reset the comparison before human acceptance.

## Gate 6 — Human visual acceptance

**Question:** Does the product owner judge the bounded result useful enough to continue the PoC?

**Raw evidence:** source and reconstruction shown at declared viewports/states, prior evaluator findings, owner decision, requested changes, and rationale.

**Pass signal:** the owner explicitly accepts the bounded result for the experiment and identifies the next useful scope. Promotion to shared knowledge remains a separate, explicit decision.

**Stop/rework:** rejection, unresolved requirement risk, or no explicit judgment. Record whether to revise extraction, profile guidance, implementation, or the experiment itself. Do not translate acceptance into a general fidelity guarantee.
