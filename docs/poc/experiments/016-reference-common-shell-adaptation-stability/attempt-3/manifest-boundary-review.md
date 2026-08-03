---
type: Manifest review record
title: Attempt 3 visual-binding boundary review
status: done
source: manifest-review workflow
---

# Manifest boundary review

## Changed Manifest files

None. The global Manifest remains the generic, product-configurable guidance
that existed before Attempt 3.

## Findings

| Review rule | Finding | Resolution |
| --- | --- | --- |
| Keep universal guidance in the Manifest | The global iconography foundation intentionally permits an established local icon system; the theme configuration intentionally permits reviewed local palette overrides. | Leave both Manifest areas unchanged. They are not a suitable owner for one selected Reference's exact assets. |
| Keep fixed product/reference decisions out of generic guidance | Attempt 2 needs one approved Reference's exact tokens and icon paths, not a universal business-app icon package. | Add Reference-owned assets only under Attempt 3. |
| Avoid framework or DOM prescription | Exact bindings need a stable state and location vocabulary, but must not require the Reference markup. | Use assets plus a map and a narrow evidence hook; keep DOM and CSS organization free. |
| Make requirements observable | “Same design family” was too weak for the human review expectation. | Add a separate exact visual-binding gate and static source/asset validation. |

## Result

`done` — the candidate changes no Manifest file. It resolves the observed
ambiguity at the Reference/experiment boundary, where the fixed visual source
belongs, and leaves product-owned facts unchanged.
