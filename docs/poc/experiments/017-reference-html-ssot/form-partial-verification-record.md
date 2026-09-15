---
type: PoC verification evidence
title: Form-heavy partial Reference reuse verification
status: passed
source: verify-form-heavy-partial.ps1 and generated browser artifacts
---

# Command

```powershell
& .\docs\poc\experiments\017-reference-html-ssot\verify-form-heavy-partial.ps1
```

# Mechanical result

| Check | Result |
| --- | --- |
| Fixed accepted Reference, common shell, Core, CLI, and prior evidence packets | pass before and after Gate |
| Common-shell repeat capture | pass; snapshot hashes equal |
| Form-workflow repeat capture | pass; snapshot hashes equal |
| Target vs common shell | pass; 0 errors, 247 information diagnostics |
| Target vs form workflow | pass; 0 errors, 192 information diagnostics |
| Exact Target contract | pass; 32 observations = 13 shell + 19 form |
| Console/action errors | 0 |
| External requests / failed requests | 0 / 0 |
| Duplicate keys / semantic ambiguities | 0 / 0 |
| Bounded accessibility issues / unnamed controls | 0 / 0 |
| Historical negative | fail as intended; 15 unique signatures retained |
| Semantic-only negative | fail as intended on `semanticInventory.combobox` |
| Current form relationship negative | fail as intended on both `relationships.describedBy` paths |
| Browser harness | 12 attempts, 0 timeouts, 0 retries |

The final authoritative one-level run used local Chrome `151.0.7922.109` and
completed in 38.3 seconds. Before it, two nested Edge Gate launches and two
nested Chrome Gate launches each exhausted the Gate's one retry because
`Page.enable` did not answer within ten seconds (eight timed-out browser starts
in total). One additional one-level attempt exceeded the outer command's
124-second limit without a conclusive Gate result. Direct one-command probes
completed in 3.7–4.5 seconds, and the final one-level full Gate then completed
without retry. This is execution-harness evidence, not a cross-browser
compatibility claim or a diagnosed browser defect.

# State, focus, relationship, and interaction evidence

The Gate asserts rather than infers the following browser-observed facts:

- missing required values expose the summary, both inline messages,
  `aria-invalid="true"`, and both described-by relationships;
- focus moves to the first invalid field;
- invalid email focuses the contact field and exposes its error;
- correction removes the contact error, summary, and invalid state;
- valid review hides the form, shows the review region, and focuses the review
  heading;
- Back to edit hides review, restores the form, and focuses the primary field;
- common-shell navigation filtering, disclosure, selection, drawer, theme, and
  account-menu scenarios remain unchanged.

# Harness boundary

The standalone form snapshot reports exactly one excluded harness root in both
DOM and accessibility-tree observation. The integrated Target reports zero and
contains no `data-reference-harness`, `data-reference-scenarios`, or
`data-reference-state` source marker. Harness state is not product state.

# Independence and leakage checks

Static checks found:

- no external URL, CSS import, runtime source import, fetch/XHR/WebSocket, or
  storage API in the experiment sources;
- no Reference business wording or fixture IDs in the Target;
- zero shared class tokens and local IDs;
- no identical style source;
- no framework, package, build, or runtime composition mechanism.

# Diagnostic classification

| Report | Extra-part information | Geometry information | Other information |
| --- | ---: | ---: | ---: |
| Shell | 247 | 0 | 0 |
| Form | 143 | 49 | 0 |

No error was reclassified or suppressed. The classification is evidence about
output review cost, not a new comparison rule.

# Browser review evidence

The Gate captured initial and every scenario step at the fixed viewport.
Normal, validation, correction, review, edit return, integrated light, and
integrated dark images were inspected. This supports visible hierarchy and
state judgment. It does not prove responsive behavior, another browser, or
real assistive-technology output.

# Evidence boundary

The verification proves deterministic current-browser observation, existing
bounded accessibility checks, focus/state/style/interaction equivalence, and
negative sensitivity. It does not prove the final transaction, server-side
validation, post-submit navigation, cancellation behavior, responsive design,
Edge/Chrome equivalence, broader cross-browser behavior, or real AT behavior.
