---
type: PoC human review packet
title: Attempt 3 visual-binding candidate review
status: ready for review; Runs not started
source: authored
---

# Human review: Attempt 3 visual-binding candidate

## What to inspect

1. Open the approved [Reference](../../015-reference-first-common-shell/index.html?drawer=open&theme=light).
2. Compare its Header, Drawer, selected row, disclosure, and theme states with
   the [binding map](reference-owned/visual-bindings/binding-map.json) and the
   individual [icon assets](reference-owned/visual-bindings/icons/).
3. Read the [cause analysis](cause-analysis.md) and confirm that each Attempt 2
   visual difference is classified at the Reference/experiment boundary rather
   than as a retroactive defect in the preserved Attempt 2 Runs.
4. Confirm the [adaptation instructions](adaptation-instructions.md) allow
   asset reuse but do not require Reference DOM, complete CSS, or JavaScript.
5. Review the [validation contract](validation/visual-binding-validation.md)
   and the [review contract](review-contract.md), then consult the
   [validation record](validation/validation-record.md) and
   [scope summary](change-summary.md) and [self-review](self-review.md).

## Decision questions

| Question | Candidate answer | Human decision |
| --- | --- | --- |
| Are the palette tokens, icons, pairing, and named locations the right exact subset? | Yes; they directly address every observed Attempt 2 visual difference. | pending |
| Does the candidate preserve structural implementation freedom? | Yes; DOM, component, state, CSS organization, and files are explicitly free. | pending |
| Does the candidate avoid changing generic Manifest policy? | Yes; no Manifest file changes. | pending |
| Is the static validation sufficiently strict before browser review? | It rejects altered tokens, SVG paths, asset/location declarations, and missing source integration. | pending |
| Are browser review checks limited to rendered placement and state? | Yes; they do not require full-page pixel equality. | pending |

## Recommendation

Approve the candidate only if the named exact subset matches the human-approved
Reference. After approval, freeze this Attempt 3 input candidate and run the
portable preflight before any new three-Run experiment. Do not start Runs,
change the approved Reference, or edit Attempt 1/2 records as part of this
review.
