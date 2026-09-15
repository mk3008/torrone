# Cold-start / Portability two-cycle self review

## Cycle 1: isolation, oracle, and false-success audit

- Fresh Agents used separate fresh contexts and nonoverlapping write
  directories. B completed before the evaluator opened the approved oracle;
  C and D were different Agents from A and B.
- Tasks listed exact allowed files and prohibited whole-repository exploration,
  prior-agent outputs, approved DatePicker files, Phase 2 analysis, and chat.
  The shared filesystem was not a hard read sandbox, so this limit is stated in
  the result rather than hidden.
- Agent B's combined-input/Apply divergence is evidence against oracle leakage.
  Agent D's report explicitly says comparison cannot select a design, rather
  than claiming unseen byte or implementation equivalence.
- CLI pass was not accepted as the success criterion. A was rejected on source
  independence after a zero-error comparison; B was rejected against the human
  oracle after a zero-error comparison.
- The oracle was not adjusted to fit either Agent. Frozen Reference, CLI, and
  Core hashes remained unchanged.

Finding: Baseline portability was insufficient at two proof boundaries. Two
minimal knowledge iterations were justified.

## Cycle 2: iteration generality, cost, and overclaim audit

- The failed Agents were not reused. C and D used different business fixtures
  and received only their applicable supplement, preventing correction through
  hidden conversational coaching.
- The source-independence paragraph contains no CSS recipe or numeric threshold.
  C and D demonstrated it with different source organizations.
- The Human Calibration paragraph contains no DatePicker answer. D selected a
  smallest coherent local model matching the key approved responsibilities and
  explicitly left alternative product decisions unresolved.
- D did not reproduce every local approved affordance, including month/year
  navigation. This is disclosed as a replay limit rather than erased through a
  post-hoc oracle change; the Gate claim is operation responsibility, not exact
  final-artifact reconstruction.
- No product-local DatePicker preference, fixture, color, size, or navigation
  choice was promoted to long-lived guidance.
- The final packet does not include experiment results, failures, self-reviews,
  or the two experimental supplement files. Only two paragraphs were added to
  the existing cross-PoC knowledge.
- Transient browser launch timeouts were separated from correctness. Final
  serialized and independent evaluator evidence passed without policy changes.
- The result is limited to already calibrated operation families in the local
  repository/toolchain. It does not claim a formal public packet, new-family
  authoring, hard filesystem isolation, or external-project installation.

Finding: both additions are general enough for long-lived experimental
knowledge and small enough not to become a dedicated guide. The supported
attainment is `portable-after-minimal-externalization`, not `portable`.

## Remaining risks

- A future adopter still needs curation to know which accepted References are
  mature; catalog selection portability was not tested.
- The packet has 110 KiB including executable CLI/Core and 609 Reference lines;
  it is small relative to PoC history but not yet a formally packaged artifact.
- Process-level input isolation is reproducible, but a future stricter test may
  use filesystem-level read isolation.
- New operation families still require first-time Human Calibration, and
  Consumer identity interference remains intentionally unstudied.

No new human decision is required to close this Gate.
