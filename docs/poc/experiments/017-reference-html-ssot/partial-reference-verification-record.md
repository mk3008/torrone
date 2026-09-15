---
type: PoC verification evidence
title: Partial Reference maintenance and composition verification record
status: passed
source: reproducible repository checks and Edge DevTools observation
---

# Verification command

From the repository root:

```powershell
& 'docs/poc/experiments/017-reference-html-ssot/verify-partial-reference.ps1'
```

Final result: exit code 0 in 45.9 seconds.

# Fixed inputs

The Gate checked these before and after execution:

- accepted Reference SHA-256:
  `868983B43CBE50BE0D9EBA952AD34C87922194167BCBCAF7A4C0163D30D52056`;
- bounded post-correction Core SHA-256:
  `14BB52C2C60B9DA9A27B7593C772B09E18A2DA2A79AD7C129827330C0D4077EA`;
- CLI SHA-256:
  `7109A169EB8F6EA7C1483B2C14C8A9711560667ECD80DFDCCCC19380E38A8837`;
- Transferability packet digest:
  `96457B6FFEEFC5BABFD15FF97DDF781A740C919A04266DD7D769DA438129EFFF`;
- Mixed packet digest:
  `819FBCD6FA157E033E72A3E45FF7ACD5A9CDA51C7DC5730066CB357643010658`;
- fixed Relational Gate packet digest:
  `6FB20902AC306081B66B0170E99DF1DE786A7FA16E66380EE264A62BC24ED17E`.

The accepted Reference and prior Gate artifacts were not edited or overwritten.

# Static checks

- CLI and Core pass `node --check`.
- References, Target, and probe contain no HTTP URL, CSS import, linked runtime
  source, `fetch`, XHR, WebSocket, or EventSource.
- Target contains no Reference scenario/harness attributes.
- Target leakage scan finds none of the accepted, shell-part, or
  workspace-part business wording and fixtures.
- Target shares zero class tokens and zero local IDs with either partial.
- Target style source hash differs from both partials.

# Browser capture

| Artifact | Elements | Scenarios | Actions | Bounded issues | Harness roots |
| --- | ---: | ---: | ---: | ---: | ---: |
| Common shell | 13 | 6 | 12 | 0 | 1 |
| Search workspace | 14 | 5 | 9 | 0 | 1 |
| Integrated Target snapshot | 27 | 0 | 0 | 0 | 0 |
| Accepted Reference regression | 27 | 11 | — | 0 | 1 |

Repeated shell and workspace snapshots have identical SHA-256 digests. Every
captured state has zero duplicate key, semantic ambiguity, bounded accessibility
issue, unnamed interactive accessibility-tree control, console/action error,
external request, and failed request.

The workspace replay confirms Results with table and pagination, Empty without
the table, and Clear returning to Initial. The shell replay confirms account
menu focus moves to Sign out when opened and returns to the account button on
Escape.

# Target comparisons

| Baseline | Status | Errors | Information diagnostics |
| --- | --- | ---: | ---: |
| Common shell | pass | 0 | 182 extra-element |
| Search workspace | pass | 0 | 130 extra-element + 69 geometry |

The diagnostics are expected consequences of comparing one partial contract
with an integrated screen. They do not weaken the error threshold, but they are
review noise and a CLI usability limitation.

# Negative evidence

| Negative | Expected result | Observed |
| --- | --- | --- |
| Historical consumer | fail | 32 errors across 15 signatures |
| Semantic-only consumer | fail | ambiguous combobox signature retained |
| Fresh partial style mutation | fail | 20 errors across two `borderRadius` signatures |
| Whole page with `main` but no h1 | bounded issue | exactly one `unexpected-h1-count` |

The fresh style mutation is made only in a temporary Target copy and removed.
The existing stored mixed-style negative is also hash-protected and checked.

# Core correction evidence

The shell partial originally reproduced `unexpected-h1-count` because it has no
product `main` or h1. Adding fake product content would violate its boundary.
Core now evaluates the h1-count rule only when an observed product `main`
exists. The accepted whole Reference remains clean, while the dedicated
full-page missing-h1 probe still reports the issue. No resolver, comparison
threshold, or Target-specific exception changed.

# DevTools reliability

The authoritative final Gate used the installed Edge DevTools endpoint for 13
capturing/verifying calls: 13 first-attempt completions, zero DevTools timeouts,
and zero retries. Per-call elapsed times and labels are stored in
`output/partial-reference/harness-reliability.json`.

During final-script setup, two outer shell invocations were cancelled by the
command runner's 1-second and 60-second budgets. Those were runner limits, not
DevTools startup timeouts, and are excluded from the Gate's DevTools rate. The
same script then completed within a 180-second outer allowance. This runner
configuration issue is recorded separately and no harness timeout was changed.

# What this proves

The evidence proves that these two standalone part contracts can be observed
deterministically and applied together to one independent Target while current
state/style/focus/interaction/bounded-a11y checks and negative detection remain
active. It also proves that no runtime composition mechanism was required.

It does not prove responsive behavior, other browsers, real AT behavior, large
catalog discovery, arbitrary part boundaries, shared-CSS architecture, or that
381 information diagnostics remain acceptable at larger scale.
