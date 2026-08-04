---
type: human review packet
title: Approval decision for Reference common-shell contract vNext candidate
status: ready for human review
scope: review material only; candidate not canonical or frozen
---

# Human review packet: Reference common-shell contract vNext candidate

## Goal

Decide whether the vNext candidate should be approved as the basis for a
future input-freezing decision. This packet is a decision aid; it does not
approve, freeze, or modify the candidate.

## Now / Next

Attempt 3's browser-native experiment is already human-approved. The current
review is only for the contract candidate derived from that experiment. After
the decisions in this packet, the next action is either to record approval
conditions or to revise the candidate and return for review. No framework
adaptation starts from this packet.

## What is being reviewed

| Item | Status | In this decision? |
| --- | --- | --- |
| Attempt 3 experimental result | Human-approved at `b240d92` | No; historical basis only |
| Reference common-shell contract vNext candidate | Proposed at `8aa5fe2` | Yes |
| Interaction Foundations candidate | Proposed responsibility split | Yes, for boundary only; not for concrete values |
| Canonical token values or Foundation values | Not newly approved here | No |
| React or other framework adaptation | Not performed | No |

## Outcome

This packet enables a reviewer to accept, conditionally accept, request
revision of, or redirect the candidate without having to infer which document
is authoritative or which questions remain open.

## Why it matters

The candidate can prevent a recurrence of Attempt 3's themed SVG failure
while avoiding a contract that accidentally requires Reference HTML/CSS
copying or prematurely standardizes application-wide interaction states.

## Attainment status

`done` — the requested review entry point is present. The approval decision
itself remains a human gate.

## Decision items

| ID | Decision item | Candidate's current approach | Recommended decision | Main evidence | Risk | Direct check |
| --- | --- | --- | --- | --- | --- | --- |
| A | Exact visual-binding scope | Token stylesheet, seven fixed SVGs, binding-map locations/state mapping, and declared shell treatments are exact through their canonical sources. | Accept with condition | [Layered contract](reference-contract.md#exact-visual-bindings) keeps values/assets out of prose and identifies their sources. | A standard Reference theme could be mistaken for mandatory concrete colors in every product or brand. | Confirm the distinction in [Question 1](#q1) and [Question 2](#q2). |
| B | SVG rendering contract | Requires canonical geometry and themed, perceptible output; allows inline SVG, CSS masks, and verified framework-specific mechanisms. | Accept with condition | [SVG contract](svg-rendering-contract.md) is result-oriented and preserves accessible names independently. | The rule is evidenced for the current seven `currentColor` assets; future multicolor or another asset class needs its own review. | Confirm [Question 4](#q4). |
| C | Exact versus implementation freedom | DOM, components, state, CSS form, files, and framework remain free while outputs stay exact. | Accept | [Layered contract](reference-contract.md#adaptation-freedoms). | A later implementation guide could reintroduce copy-by-implication; this candidate itself does not. | Confirm [Question 3](#q3). |
| D | Interaction Foundations split | Hover, focus-visible, selected, active, and disabled are proposed as cross-application concerns; values are not canonicalized. | Human decision required | [Foundations candidate](interaction-foundations-candidate.md) explicitly marks every state for human decision. | Premature promotion could make one shell's interaction details global without enough evidence. | Answer [Question 5](#q5) and [Question 6](#q6). |
| E | Natural language versus code/asset authority | Prose names authorities and describes intent/boundaries; it does not repeat visual values, SVG paths, or dimensions. | Accept | [Natural-language reduction](reference-contract.md#natural-language-reduction) and [authority boundary](README.md#authority-boundary). | The source paths must remain discoverable and stable if later frozen. | Check [binding map](../attempt-3/reference-owned/visual-bindings/binding-map.json) if unclear. |
| F | Validation proportionality | Static checks protect asset/source use; browser and human checks remain responsible for actual visibility and interaction observation. | Accept with condition | [Validation plan](validation-plan.md) and [verification record](verification-record.md). | Static success cannot prove actual cross-theme rendering; automation may not reliably sustain hover. | Confirm [Question 7](#q7). |

## Semantic comparison with the Attempt 3 fixed contract

| Area | Attempt 3 fixed input | vNext candidate meaning | Decision significance |
| --- | --- | --- | --- |
| Exact asset use | Tokens, assets, and binding map were frozen for the browser-native experiment. | Makes their responsibility explicit as the exact visual authority without copying their values into prose. | Clarifies what must remain visually identical. |
| Structural behavior | Header, Drawer, workspace, state, and navigation invariants were tested. | Retains those responsibilities as a separate layer. | No new HTML/CSS copying requirement. |
| Implementation freedom | Run implementations could choose their own code shape. | Explicitly preserves DOM, component, state, CSS, file, and framework freedom. | Confirms exact output is not exact source code. |
| Themed SVG drawing | Run 2 exposed an external-`img` `currentColor` rendering failure. | Adds a result contract and prohibits only the unthemed direct-image failure class, filters, and substitutes. | New prevention for the demonstrated failure. |
| Interaction states | Reference behavior was reviewed in shell context. | Moves hover, focus-visible, selected, active, and disabled toward a future cross-application Foundation. | Boundary is proposed; concrete values remain open. |
| Natural language | Earlier material contained implementation-facing visual explanation. | Refers to canonical token/asset/map sources instead of repeating values, paths, or dimensions. | Reduces dual sources of truth and ambiguous equivalence language. |
| Validation | Attempt 3 checked provenance and exact bindings, with human visual review. | Adds detection for direct external-image use of canonical `currentColor` SVGs and retains browser/human gates. | New static failure is detectable; visual result is not overclaimed. |

## Must read

1. [Candidate entry](README.md) — confirm this is proposed only and does not
   replace the approved Reference or frozen inputs.
2. [Layered contract](reference-contract.md) — decide the Exact,
   structural, and freedom boundaries.
3. [SVG rendering contract](svg-rendering-contract.md) — decide whether the
   output constraint is technology-neutral and sufficiently scoped.
4. [Interaction Foundations candidate](interaction-foundations-candidate.md)
   — decide the responsibility split while leaving concrete values open.
5. [Verification record](verification-record.md) — confirm the evidence,
   self-test result, and residual human gate.
6. [Attempt 3 human approval](../attempt-3/human-approval.md) — confirm what
   has already been approved and that Run 2's three corrections remain
   historical fact.

## Read only if needed

- [Token stylesheet](../attempt-3/reference-owned/visual-bindings/visual-tokens.css)
  — inspect the actual Reference standard only when assessing theme or brand
  impact.
- [Binding map](../attempt-3/reference-owned/visual-bindings/binding-map.json)
  — inspect the seven icon IDs, state mapping, locations, and basic sizes.
- [Fixed SVG assets](../attempt-3/reference-owned/visual-bindings/icons/) —
  inspect the current asset category and confirm the scope is not assumed to
  cover future multicolor assets.
- [SVG rendering checker](validation/check-svg-rendering-contract.ps1) —
  confirm it rejects direct external-image use rather than requiring CSS mask.
- [SVG rendering self-test](validation/self-test-svg-rendering-contract.ps1)
  — confirm the intentional bad fixture fails and the mask fixture succeeds.
- [Attempt 3 final evaluation](../attempt-3/final-evaluation.md) and
  [Run 2 final review](../attempt-3/runs/run-2/reference-alignment-icon-color/review.md)
  — inspect the originating visual evidence and correction classification.

## Recommended review order

1. Read this packet's scope table and confirm that Attempt 3 itself is not
   being re-approved.
2. Read the layered contract and decide whether Exact/freedom boundaries are
   acceptable.
3. Read the SVG rendering contract and decide whether it fixes the observed
   failure without prescribing an implementation technique.
4. Read the Interaction Foundations candidate and make the open boundary
   decisions.
5. Read the validation plan and verification record for the limits of static
   proof and the human gate.
6. Open token, binding-map, asset, and checker files only if a decision above
   needs direct source confirmation.

## Questions requiring an explicit answer

| ID | Question | Recommended answer | Basis |
| --- | --- | --- | --- |
| <a id="q1"></a>Q1 | May the concrete theme tokens be fixed as the Reference's standard theme? | Yes, within the Reference-adoption scope. | The candidate names the approved token source as exact rather than reproducing values. |
| <a id="q2"></a>Q2 | Is it understood that those concrete tokens are not automatically mandatory values for every product? | Yes. | Brand/application-wide policy is not established by this candidate; it needs an explicit adoption or future Foundation decision. |
| <a id="q3"></a>Q3 | May the seven SVGs and their semantic placement be Exact? | Yes. | They are identified by the canonical binding map while DOM and framework remain free. |
| <a id="q4"></a>Q4 | Does the SVG contract fix the required rendering result without fixing a particular implementation? | Yes, with the condition that it currently governs the seven canonical `currentColor` assets only. | Inline SVG, CSS mask, and verified framework-specific mechanisms are expressly permitted. |
| <a id="q5"></a>Q5 | Do you approve moving hover, focus-visible, selected, active, and disabled to Interaction Foundations responsibility? | Human decision required. | The boundary avoids turning a shared-shell example into an untested universal rule. |
| <a id="q6"></a>Q6 | May concrete Interaction Foundations values remain unresolved until a separate experiment? | Yes. | The candidate explicitly avoids making current hover or focus measurements universal mandatory values. |
| <a id="q7"></a>Q7 | Does the validation plan preserve implementation freedom while detecting the demonstrated misuse? | Yes, with the condition that browser/human gates remain mandatory for actual rendered visibility and hover. | The self-test rejects direct image misuse but does not claim pixel or browser-state proof. |
| <a id="q8"></a>Q8 | May this vNext candidate be frozen as an input for a future framework-adaptation experiment? | Accept with condition. | First resolve Q1, Q2, Q5, Q6, and Q7; then create a separate approved freezing decision. |

## Actions taken

- Consolidated the existing candidate, approval, and verification evidence
  into this one review entry point.
- Kept the material link-based: no token values, SVG paths, or source code
  are duplicated here.

## Code changes

One new review document only: `human-review-packet.md`. No contract candidate,
Reference, frozen input, verification code, experiment artifact, or prior
evaluation was modified.

## Verification methods

- Reviewed the candidate's layered contract, SVG contract, Foundations
  candidate, validation plan, and verification record.
- Used the pre-existing verification record for the frozen-input preflights,
  direct-image self-test, and static candidate check; this packet adds no
  replacement verification claim.

## Repository evidence

The required sources are linked above. In particular, the verification record
records passing Reference, product, and Attempt 3 preflights and the direct
external-image rejection self-test.

## Supplementary evidence

Attempt 3's approved human review and Run 2's final browser-native review are
historical evidence for the problem and its correction. They do not constitute
new cross-framework evidence.

## Review triage

- **Accept:** C and E.
- **Accept with condition:** A, B, and F.
- **Human decision required:** D and the conditions recorded in Q1, Q2, Q5,
  Q6, and Q7.
- **Revise:** none identified from the current record; select this outcome if
  the conditions reveal a contrary brand, asset-category, or validation need.

## Open questions

- Which products, if any, adopt the Reference's concrete standard theme?
- What semantic values and exceptions should become application-wide
  Interaction Foundations?
- How should a future contract extend the SVG result rule to multicolor or
  non-`currentColor` assets?
- What browser evidence is required before a framework-specific adaptation is
  treated as conformant?

## Final recommendation

**Conditionally approvable.** Approve the layered-contract direction and the
current SVG result contract if the reviewer explicitly accepts the following
conditions:

1. Reference theme tokens are a standard for an adopting Reference instance,
   not a blanket set of mandatory product colors.
2. The SVG contract currently governs the seven canonical `currentColor`
   assets; a future asset class requires separate review.
3. Interaction Foundations are an approved responsibility split only; their
   concrete hover/focus/other state values are not Canonical in this decision.
4. Static validation remains a guard, while rendered cross-theme visibility
   and automation-limited states retain browser and human-review gates.

If any condition is rejected, select **Revise** and identify the affected
contract layer. Do not freeze or use the candidate as a new experiment input
until the answers are recorded in a separate approval decision.
