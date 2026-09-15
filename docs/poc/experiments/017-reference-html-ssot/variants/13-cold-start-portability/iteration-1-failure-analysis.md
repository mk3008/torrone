# Baseline failure analysis: Consumer source independence

Test A passed Reference Conformance, comparative validation, and its isolated
style negative. Its business screen was also coherent. However, the Target CSS
does not provide strong evidence of an independently authored style
implementation.

## Observation

- Reference and Target CSS are both 111 lines.
- Both contain 295 parsed declarations.
- 147 of 295 property names occur at the same declaration position.
- After normalizing custom-property names, 142 declaration property/value
  pairs occur at the same position.
- Source inspection shows a mostly one-to-one sequence of corresponding rule
  blocks with renamed classes and custom properties.
- Class-token overlap and local-ID overlap are both zero, and file hashes
  differ, but those checks do not exclude systematic source renaming.

This is not a visual or comparison failure. It is a proof-boundary failure:
the Gate cannot claim style implementation independence from naming/hash audits
alone.

## Cause classification

- Primary: authoring boundary insufficient. The baseline knowledge states that
  Consumer implementation remains independent, but does not say how renamed
  source equivalence can falsely satisfy that claim.
- Secondary: Fresh Agent implementation/self-review error. The task explicitly
  requested independently written CSS, yet the report treated zero token/ID
  overlap as sufficient proof.
- Not a CLI defect: the comparator correctly checks browser observations and is
  not expected to prove source provenance.
- Not a business-screen defect and not Harness/browser variability.

## Iteration decision

Add one general paragraph as an experimental packet supplement and retest with
a different fresh agent and different business fixtures. Do not add a numeric
similarity gate, task-specific CSS recipe, FAQ, or completed code answer.

