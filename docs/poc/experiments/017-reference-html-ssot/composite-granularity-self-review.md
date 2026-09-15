---
type: two-cycle self review
title: Composite UI Reference Granularity Gate self review
status: pass with explicit follow-up limits
---

# Composite UI Reference Granularity Gate self review

## Cycle 1 — candidate correctness and fair comparison

1. **Finding:** the first Date family sheet had only two pointer scenarios,
   while the split candidates had keyboard and clear/reopen coverage.
   **Fix:** expanded the sheet to the same six scenarios and 21 actions before
   comparing line, state, metadata, and transfer cost.
2. **Finding:** `aria-pressed` on every calendar day made unkeyed repeated
   buttons enter semantic identity inventory and fail ambiguity checks.
   **Fix:** used the natural `aria-selected` state and retained explicit keys
   only for the days that scenarios and transfer actually observe.
3. **Finding:** an Enter-activated trigger could move focus to a second button
   before keyup and activate the destination in the same synthetic sequence.
   **Fix:** used Space for button initiation and deferred popup focus without
   adding a custom keyboard abstraction.
4. **Finding:** the dialog disabled action failed contrast at 4.27:1.
   **Fix:** changed one local disabled-text value and reran Conformance over all
   states.
5. **Finding:** the dialog keyboard scenario focused an option directly and a
   `role="option"` button did not perform selection from Enter in the captured
   path.
   **Fix:** added explicit Enter/Space handling and a query-to-option Tab step.
6. **Finding:** autocomplete highlighting changed `aria-selected` but did not
   expose the active option through the focused combobox.
   **Fix:** added independent local option IDs and `aria-activedescendant`
   updates to Reference and Target. Recorded that Core does not compare it.

## Cycle 2 — evidence integrity, scope, and overclaim

1. **Finding:** the family sheet's 98-line source reduction could be mistaken
   for a complete maintenance win.
   **Fix:** report that explicit identities remain 12, only two harness roots
   are saved, and the whole baseline fails against a one-variant Target with
   108 errors. No slicing mechanism was added.
2. **Finding:** calling DatePicker or Entity Selector the selected granularity
   could imply a family-wide or component-catalog rule.
   **Fix:** state the boundary as one complete operation model and keep all
   four candidates noncanonical.
3. **Finding:** equal browser observations alone would not prove independent
   authoring.
   **Fix:** retain distinct CSS hashes, zero class/local-ID/import overlap,
   business-term leak scans, Target-only workspace wrappers, and source-model
   differences alongside comparison reports.
4. **Finding:** bounded a11y pass could overclaim coverage of active descendant,
   production calendar semantics, or actual assistive technology.
   **Fix:** keep those as explicit human/source-review or future-test gaps and
   do not add a broad Core rule in this Gate.
5. **Finding:** preserving historical evidence only by before/after equality
   would miss pre-existing drift.
   **Fix:** the runner now also verifies every historical hash/tree against the
   fixed provenance manifest before and after the Gate. The retained run proves
   before/after stability; the strengthened assertion is in the entry point.
6. **Finding:** a post-pass rerun hung in browser startup and left an owned Node
   process, temporary profile, mutation root, and incomplete output.
   **Fix:** identified the exact command line and safe paths, removed only those
   owned resources, retained the earlier complete run, and reported the event
   without reopening the closed Harness line or weakening a check.
7. **Finding:** development and failed output directories could be mistaken for
   accepted evidence.
   **Fix:** removed only outputs created during this Gate and retained one named
   final run.
8. **Finding:** the dialog keyboard scenario initially treated a successful
   `press` action as completion even though Enter left the dialog open and the
   selection unset.
   **Fix:** changed confirmation to standard Space activation and require the
   observed final state to show a closed dialog, selected entity, collapsed
   trigger, and focus returned to the trigger.

No approved Reference, existing Target, CLI/Core comparison behavior,
Conformance rule, historical evidence, Profile, API, MCP surface, or canonical
component changed. The evidence supports `composite-granularity-beneficial`
without resolving Consumer annotation reduction or production DatePicker and
Entity Selector design.
