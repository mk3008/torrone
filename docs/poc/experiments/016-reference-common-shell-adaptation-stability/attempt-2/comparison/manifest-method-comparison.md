---
type: PoC historical comparison
title: Manifest-only and Reference-first common-shell evidence
status: bounded comparison
source: reviewer synthesis
---

# Historical comparison with the Manifest-only method

## What is comparable

[Attempt 23](../../012-common-shell-variability/attempt-23/) is the closest
prior Manifest-only three-Run study. Its Runs consumed a frozen 46-file
Manifest snapshot plus one product prompt, without a prior generated artifact
or reviewer repair as input. Its evaluation records successful static checks
and Light Drawer-visible/hidden visual review for three independently generated
browser-native shells. Its product owner later selected Attempt 23 Run 1 as the
source evidence for the approved Reference.

Attempt 2 instead supplied the fixed runnable Reference, its auxiliary
Manifest, and a separately frozen product-owned contract to three separately
preserved browser-native implementations. It preserved each initial artifact
and allowed only one implementation-error correction cycle after orchestrator
review.

| Aspect | Attempt 23, Manifest-only | Attempt 2, Reference-first |
| --- | --- | --- |
| Primary fixed input | Manifest snapshot + product prompt | Approved runnable Reference + auxiliary Manifest + product contract |
| Reference available to implementer | No | Yes, frozen at `9cd1932` |
| Product-specific inputs | Prompt | Separate frozen contract at `c44c997` |
| Initial outputs repaired | No | Preserved; bounded correction allowed after review |
| Recorded visual scope | Light open/hidden, plus capture matrix | Light/Dark and open/hidden browser review; interaction state checks |
| Initial Reference invariant result | Not measured using this later Reference contract | 18 / 18 (100%) |
| Final Reference invariant result | Not applicable | 18 / 18 (100%) |
| Correction burden | Not evaluated as a repair loop | 1 per Run; 3 total |

## Limits on causal claims

This is not a matched A/B measurement. Attempt 23 used a different fixed
prompt, model/execution matrix, acceptance contract, and review depth; it also
precedes the Reference selection. Its evaluation does not report the same
Reference-invariant or Dark-palette metric. Therefore this evidence cannot
truthfully establish a numerical reduction in failures or correction burden
relative to Manifest-only generation.

The evidence does establish the narrower outcome requested here: under one
fixed browser-native adaptation condition, three separately preserved implementations
interpreted the Reference as the same shell family, maintained all six named
invariants on the first pass, and converged after at most one bounded
implementation correction. The repository does not contain a machine-readable
transcript proving equality of the execution model and prompt; that condition
is therefore unconfirmed in the durable evidence. The two Dark-palette defects show that a runnable
Reference does not eliminate ordinary implementation mistakes.

## Recommendation

**Continue the Reference-first approach within the browser-native scope.** Do
not revise the Reference, Manifest, guidance, or validation from this Attempt:
every observed defect was in a consuming implementation and all final Runs
conformed. Before claiming that the Reference method is superior to the
Manifest-only method, run a matched comparison with the same product contract,
model condition, review matrix, and state capture coverage. No evidence here
requires stopping the direction or expanding to another Pattern/framework.
