---
type: PoC result
title: Composite UI Reference Granularity Gate result
status: composite-granularity-beneficial
source: noncanonical Reference candidates, independent Targets, and browser-backed comparison evidence
---

# Composite UI Reference Granularity Gate result

## Attainment

**`composite-granularity-beneficial`**

A responsibility-complete operation is a useful Reference boundary between a
workspace and an atomic control. Date selection and entity lookup both remained
directly readable, browser-operable, and transferable when each Reference kept
initiation, intermediate state, completion, empty/no-match behavior where
applicable, and clear/reselection together.

The beneficial unit is **one independently meaningful operation model**, not a
UI-family catalog in one file. Single-date and date-range selection are separate
models; autocomplete selection and dialog-confirmed lookup are separate models.
All four candidates remain noncanonical.

## Candidate comparison

| Family | Candidate | Independent operation | Result |
| --- | --- | --- | --- |
| Date | single date | open, choose, complete, clear, reopen | natural standalone candidate |
| Date | date range | open, choose start, choose end, complete, clear/reselect | natural standalone candidate; Target transfer passed |
| Date | one-file family sheet | single date and range side by side | useful review sheet, but not a transferable one-variant baseline |
| Entity | autocomplete | query, highlight, choose, no results, clear | natural standalone candidate; Target transfer passed |
| Entity | dialog lookup | open, query, select, explicitly confirm/cancel, no results, clear | natural standalone candidate with a materially different completion model |

The family sheet and the two split Date References carried equal scenario
coverage: six scenarios and 21 actions. The sheet observed 22 states in one
load; the split References observed 23 because each file has an initial state.

| Date authoring shape | Files | Lines | CSS / JS lines | Explicit / semantic identities | Harness metadata roots | One-variant Target result |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| one family sheet | 1 | 103 | 26 / 24 | 12 / 2 | 2 | inapplicable fail: 108 errors across 14 signatures |
| single + range References | 2 | 201 | 49 / 51 | 12 / 2 | 4 | date-range Target pass against the range Reference |

The sheet saves duplicated static CSS/JavaScript and two harness roots. It does
not reduce the 12 explicit observation identities. More importantly, the
current comparison authority cannot apply that whole baseline to a Target that
implements only the range model: unrelated single-date scenarios and elements
become required. Fixing that would need a slicing/configuration mechanism that
this Gate intentionally did not design.

Separate References therefore have the lower total cost for materially
different operation models. A common visual correction touches two split files
instead of one sheet, but a variant-specific correction remains local and a
new variant can be added without changing an existing accepted Reference. The
sheet remains a disposable human-review comparison, not the selected authority.

## Transferability

Two minimal Targets embedded the selected operations in different business
workspaces:

- date range: reporting period became an inventory-count scheduling window;
- autocomplete: billing account became shipping-carrier assignment.

Both Targets changed business copy, fixture values, wrapping DOM, classes,
local IDs, state shape, JavaScript organization, and CSS source. Neither Target
contains Reference scenarios or a Reference harness. Reference and Target
style-block hashes differ, and each pair shares zero class tokens, zero local
IDs, and zero stylesheet imports. Scans found no selected Reference business
terms in either Target.

The current CLI/Core comparison passed both Targets with zero errors while
retaining complete informational geometry/extra-element diagnostics. It did
not require a workspace-scale Reference or shared source implementation.

## Identity and Consumer impact

The two transferred Targets use 12 explicit `data-ref` identities: seven for
date range and five for autocomplete. Their controlled popup/listbox regions
add two relational semantic observations. The one-file Date sheet does not
reduce explicit identity work; it only consolidates its harness/scenario roots.

This Gate did not attempt to remove Consumer annotations. Multiple date
buttons, two live status regions, and repeated entity options make visible
wording, fixture values, DOM order, classes, and local IDs unsafe substitutes.
The existing explicit identities therefore remained the smaller justified
interference for this experiment.

Natural product semantics were retained independently of validation metadata.
The autocomplete Reference and Target now update `aria-activedescendant` using
different local IDs. The current Core does not observe or compare that
relationship. This is an important bounded accessibility gap, not evidence for
adding a Reference-only identifier or freezing a broader identity rule.

## Authoring and correction cost

Each selected candidate is one directly openable HTML file of 84–106 lines.
It needs no build, dependency, network, backend, shared Target CSS, or runtime.
The Reference-only authoring overhead per file is one visible harness label,
one scenario JSON block, and five to eight explicit identities.

Development corrections were local but exposed real review costs:

- using `aria-pressed` on every date button caused semantic ambiguity; native
  selection state was changed to `aria-selected` without keying every day;
- moving focus from an Enter-activated button to another button could activate
  the destination during the same synthetic key sequence; Space was used for
  trigger activation and focus transfer was deferred;
- the dialog's disabled action initially measured 4.27:1 text contrast and was
  corrected in one CSS declaration;
- a `role="option"` button needed explicit Enter/Space handling; the keyboard
  scenario was extended to exercise the natural Tab path;
- autocomplete highlighting needed `aria-activedescendant`; correcting it
  touched the Reference and its independent Target, while local IDs remained
  different.

These were candidate and Target corrections only. The approved PoC 017
Reference, existing Target evidence, CLI/Core, and historical output trees did
not change.

## Validation and negative evidence

The final retained run is
`output/composite-granularity/20260813T235448Z/`.

- five Reference preflights passed over 70 checked states in total;
- five snapshots reported zero bounded accessibility issues;
- both independent Targets passed comparative validation;
- console errors, external requests, and failed requests were all zero;
- leaving the date popup open after completion failed with 39 errors across 13
  signatures;
- changing only the entity option radius failed with ten
  `borderRadius` errors;
- breaking the dialog controller relationship failed Reference Conformance in
  all 18 observed states with `missing-aria-controls-target`;
- applying the whole Date family sheet to a range-only Target failed rather
  than silently ignoring the unrelated variant.

Conformance remains Reference-only, comparison remains Reference-versus-Target,
and the summary/reporting layer remains nonauthoritative.

## Human-facing assessment

The candidates are natural enough to review as bounded business operations:
action captions are specific, copy is short, focus is visible, completion is
observable, and clear/reselection is available. The harness label is visibly
separate and excluded from observation.

The Date fixtures intentionally show only a bounded week and do not decide
month navigation, locale, timezone, disabled dates, or production calendar-grid
semantics. Real assistive-technology behavior, responsive behavior, and other
browsers were not tested. Human approval is not needed for this granularity
finding, but it would be required before promoting any candidate as an accepted
DatePicker or Entity Selector design.

## Decision and next step

Retain the provisional rule: a partial Reference may own one complete operation
model when it can be initiated, observed through meaningful states, completed,
and reset without invented workspace context. Keep materially different
operation models in separate References unless later evidence justifies an
authoring-only composition mechanism.

Do not adopt these candidates canonically, build a variant schema, add a
generator/runtime, freeze a Profile/API, or start a component catalog. The most
useful next bounded question is whether the 12 explicit Consumer identities can
be reduced without losing these two transfer results, especially for
accessibility relationships such as active descendant. Treat that as a separate
Consumer identity/observation experiment, not an automatic continuation.
