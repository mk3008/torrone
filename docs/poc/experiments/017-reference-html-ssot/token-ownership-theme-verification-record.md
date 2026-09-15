---
type: PoC verification record
title: Shared token ownership and theme independence verification
status: pass
source: Chrome browser execution through the unchanged PoC 017 CLI/Core
---

# Authoritative run

```powershell
& docs/poc/experiments/017-reference-html-ssot/verify-token-ownership-theme.ps1
```

The final run completed with exit `0` in 127.9 seconds. It made 47 browser
invocations with zero timeouts and zero retries.

# Fixed evidence guards

| Evidence | Result after the Gate |
| --- | --- |
| common shell SHA-256 | `08EF898E61804197E5A53A221A4FD5248744BEEF4A7398045622D12750792527` |
| search workspace SHA-256 | `3078962D0880A28658691922D2F6CB6E9E3A9239BCE735994EC71ABABBFD4C3B` |
| form workflow SHA-256 | `A4E3F072767604623763A8841AABE41780531865D7136E8DF19475E1EDA1B1F4` |
| fourth self-contained specimen SHA-256 | `FD9DDD69570D420149A9904E5E05058423815C3AA8CA078FD5128E3206B2A9E3` |
| Core SHA-256 | `62F3267026D307BD39D7D592B784160901513568B95C299F6938ADCFAA1F96B8` |
| CLI SHA-256 | `968DCCE9EE4487D834CFB35EA2B219457AFD06BCD661A621777E43C2815130F8` |
| fixed Visual Synchronization packet | 197 files; `9D35977A710AF47C2AAAC1E209A33A097BA92371D5F6C173E4AB0005F7CEB99E` |
| Consumer source/dist tree | 20 files; `B2B0E11CEC5F01725CEF1A490437A8D2E4B1DC2E1CC50B2306CABA0D0569F26A` |

No approved Reference, prior Gate packet, CLI/Core source, or Consumer file was
written.

# Canonical observation regression

The A baselines contained 13 elements/6 scenarios/13 states for shell, 14/5/10
for search, 19/3/11 for form, and 6/1/3 for the new detail specimen.

- B matched A with zero errors and zero geometry/extra-element diagnostics for
  shell, search, form, detail light, and detail dark.
- State, computed style, focus, interaction, bounded accessibility, identity,
  console, and network observations were compared.
- The detail interaction was asserted as closed -> open -> closed using Space,
  with focus retained on the native disclosure trigger, a solid focus outline,
  and stable trigger geometry.
- Console errors, action errors, external requests, and failed requests were 0.
- The new specimen has no product JavaScript and no Reference harness root.

Forty of 42 A/B PNGs were byte-identical. The two shell parent-navigation
frames differed only around the chevron: 55 pixels in an 8x11 box (maximum
channel delta 56) and 50 pixels in an 11x8 box (maximum delta 22). Computed
state/style comparison was exact, so the PNG hashes remain supplementary
raster-timing evidence rather than an exception or a new threshold.

# Reference Conformance and negatives

Ten positive preflights passed: A and B for all four light References plus A
and B for detail dark. Every observed state reported zero bounded accessibility
issues.

Three retained Conformance negatives (semantic ambiguity, relational
ambiguity, and missing whole-page `h1`) continued to fail. The historical
comparative negative and semantic-only comparative negative also continued to
fail. No Conformance rule, threshold, or allowlist changed.

# Maintenance probes

- The common light/dark focus change produced expected `outlineColor`
  differences in five validations for each candidate. A required four files
  and six edits; B required one file and two edits.
- The detail-local status change produced expected light/dark differences,
  left the shell at zero errors, changed no prior Reference hash, and did not
  touch the shared file.
- Every disposable tree restored byte-identically. No probe value remains in a
  Variant.

# Static boundaries and diagnostic noise

CLI/Core changes, Conformance rules, Consumer requirements, packages, build
steps, runtimes, generators, and external communication additions were all 0.
Candidate-to-baseline comparisons emitted zero information diagnostics because
they are like-for-like A/B sources. The established 381/439 part-to-integrated
noise evidence was not changed or suppressed and remains a separate problem.

