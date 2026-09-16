# Withdraw generic keyboard-following scroll correction

Date: 2026-09-16. Status: decided by the repository owner in the PR #14 Work review conversation.

## Decision

Remove the custom textbox visibility helper from the Date range next candidate and retire it as a shared Reference requirement. Keep browser-native text entry and user-controlled scrolling. Keep calendar-disclosure context adjustment separate. The owner explicitly agreed to withdrawal and said the other behavior had no problems; flat icon-button work is assigned to [follow-up Issue #15](https://github.com/mk3008/torrone/issues/15), which owns its scope and disposition.

## Why

The usability goal (being able to see and operate the editor without unnecessary movement) is valid. The attempted generic implementation did not provide stable observable behavior: the owner repeatedly reported unwanted scrolling, including an up-then-back movement when touching End after scrolling to the bottom. Restricting direction and event triggers did not establish a satisfactory result. Native keyboard/focus behavior and embedding geometry complicate intervention, and real-device verification was not available. The precise cause of the reported oscillation was not established. Passing handler tests did not prove phone usability.

For a small reusable Reference, the observed benefit did not justify further environment-specific handling and validation cost. Do not continue adding conditions or present the withdrawn helper as a recommended example.

## Evidence retained

PoC 020 visibility.md, scroll-correction.md, identities and observations record the attempts and their limits. withdrawn-visibility-policy.md preserves the superseded policy; withdrawn-visibility-test.cjs identifies its original revision and is not an active test. Git history retains the implementation. Nothing here erases failed observations or retroactively labels them successful.

## Remaining contract

- No custom textbox-focus/keyboard-following scrolling or focus-dependent padding.
- Manual scroll remains available; no automatic transfer to another field.
- Calendar disclosure may reveal the owning label/editor and calendar header together.
- The remaining shared Date range requirements and #13 recovery remain in scope.

## Reconsider only when

A real consuming product has an explicit need, bounded supported browser/device/host environments, an available viewport/host contract, and reproducible actual-device evidence that the correction improves visibility without oscillation or interference with typing, pointer activation, selection and manual scroll. Such work starts as a bounded product experiment, not a mandatory global Reference rule.
