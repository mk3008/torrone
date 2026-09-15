# Cold-start / Portability Gate plan

## Issue

PoC 017 has accumulated successful Reference authoring, transfer, conformance,
and human-calibration evidence. It is not yet known whether those capabilities
are reproducible from a small public packet or depend on the current agent's
conversation and experiment history.

## Customer and value

The customer is a future Reference author or adopter in another project. The
Gate should show what they can reproduce from durable assets, and at what
reading and maintenance cost, without transferring the PoC's private history.

## Acceptance criteria and verification

1. Two agents run with separate fresh contexts and receive only the recorded
   packet plus their bounded task input. Verify from the saved packet/task
   records and the agents' reports.
2. Test A authors a content-different Reference and an implementation-
   independent Target using an already corroborated shell/search model. Verify
   conformance, comparative validation, source independence, and an independent
   business/architecture/maintenance review.
3. Test B replays the original DatePicker correction feedback without access to
   the approved Reference or Phase 2 analysis. Verify its operation model
   against the frozen oracle by meaning, not byte or DOM equality.
4. Test C classifies replayed knowledge as correctly generalized, correctly
   local, over-generalized, or under-generalized. Verify against the existing
   long-lived knowledge only after Test B completes.
5. Any knowledge addition follows an observed baseline failure and is retested
   with a different fresh agent. Verify file and line deltas and agent identity.
6. Portability and the known focus-sensitive Evidence Harness variability are
   reported separately. No retry, tolerance, focus comparison, or severity
   policy is changed.
7. Fixed References, historical evidence, CLI/Core, Manifest assets, and git
   state are not overwritten or published.

## Scope

In scope: packet selection and measurement; isolated Tests A/B/C; browser
conformance/comparison; source and annotation audits; bounded knowledge
externalization if baseline evidence requires it; two-cycle self-review.

Out of scope: Profile/API freeze, public packaging, new UI families, new human
calibration, Consumer identity reduction, Harness focus fixes, MCP, Manifest or
OKF migration, and git stage/commit/push.

## Risks

- A fresh agent could accidentally inspect the whole repository or the oracle.
- A passing comparison could conceal poor product, architecture, or maintenance
  choices.
- The large DatePicker replay could test implementation stamina more than
  knowledge portability.
- Browser focus variability could be misclassified as an authoring failure.

## Evidence plan

Repository evidence will include the packet inventory and metrics, exact task
inputs, isolated source artifacts and agent reports, CLI JSON, source audits,
oracle evaluation, verification record, and two-cycle self-review. Agent
context separation is supplementary execution evidence and will be stated as
such; file allowlists and post-run source inspection provide repository-visible
corroboration.

## Ledger

- Goal: determine whether PoC 017 is portable from a small durable packet.
- Now: four isolated Fresh Agent runs, two bounded knowledge iterations, and
  independent evaluator verification are complete.
- Next: Consumer Identity Interference may proceed as a separate Gate; no
  Profile, package, API, or canonical UI decision follows automatically.
- Blockers: none known.
- Evidence ready: yes; see the Cold-start result, verification, cost, screen
  review, and self-review records.
