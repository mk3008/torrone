---
type: PoC result
title: Curated Reference handoff result
status: partial
source: Issue #8, fresh implementation checkpoint, handoff notes, verification, and owner phone review
---

# PoC 018 — curated Reference handoff result

## Result

**Overall: `partial`**

Two different questions need to stay separate:

- **Bounded Reference transfer: `meets`.** A fresh implementation context used the current Torrone guidance, the curated Date range entry, and its approved executable without reading the historical DatePicker research archive. It produced an independent invoice issued-date filter with different product vocabulary, local IDs, classes, DOM organization, and implementation files while retaining the intended filter-style operation model.
- **Complete application handoff and verification: `partial`.** Real-phone review exposed keyboard obstruction, a calendar-tap dismissal race, focus inconsistencies, and rendering concerns. The original handoff also did not carry an explicit application-level interaction policy. Several corrections are covered by focused handler/static tests, but native browser/IME traversal and some cross-control paths remain unverified, and the Invoice candidate is not fully human-approved.

`partial` therefore does not mean that the curated Reference failed to transfer its bounded design responsibility. It means that the experiment also demonstrated a boundary: a bounded Reference is not, by itself, the complete interaction contract for a composed application screen.

## What the curated Reference transferred successfully

The fresh implementer did not need `docs/poc/`, previous Targets, old comparison reports, or Manifest/OKF material to understand and reproduce the central operation model.

The current curation made these points sufficiently clear to implement:

- Start and End are independently optional filter boundaries;
- completing one boundary does not require completing the other;
- manual entry and calendar selection are two input paths for the same responsibility;
- invalid manual input must remain recoverable;
- Clear is part of the boundary operation;
- the calendar needs usable month/year navigation and distinguishable selected, range, unavailable, and ordinary states; and
- narrow-screen use needs a layout that keeps the active boundary and calendar relationship understandable.

The executable Reference supplied concrete interaction detail without requiring source reuse. The independent Target confirms that Reference HTML can transfer design meaning while leaving production structure free.

## What the experiment exposed outside the bounded Reference

Human phone review found defects that were not evidence of a missing Date range operation model:

- the software keyboard could obscure the active editor;
- focus transfer could dismiss the calendar before a date tap committed;
- manual-entry focus behavior became inconsistent across equivalent fields; and
- a selected-date focus indicator could be clipped.

The follow-up also exposed an application-level design question: shared Enter, Tab, focus-return, scrolling, and mobile-keyboard behavior cannot safely be inferred from one component example. The consuming application needs an explicit interaction policy or an explicit recorded gap.

This supports keeping **application interaction requirements** distinct from **bounded Reference requirements**. The Reference remains responsible for its local operation model; the application owns shared interaction semantics and cross-control composition.

## Human review remains necessary

Focused tests caught and prevented regressions after several corrections, but they did not replace real-device review. The owner found failures that the initial static and handler-level checks had not established.

This strengthens Torrone's existing separation:

- automated checks can verify bounded behavior and transfer properties;
- browser/device operation can expose interaction failures that source-level checks miss; and
- explicit human review remains the authority for design acceptance.

A passing test, deployed preview, or PR merge still does not approve the Invoice candidate.

## Curation follow-up

`references/invoice-date-range.md` is an appropriate **draft** curation entry for preserving explicit owner review requirements during continued candidate work.

It must not be read as a second approved Date range original or as a universal keyboard/calendar policy. In particular:

- the compact month-navigation request is a preserved candidate requirement;
- the Sunday red orientation cue has bounded human acceptance;
- the current manual Enter policy remains a proposal unless explicitly accepted;
- unresolved browser/focus/tab-stop differences remain visible; and
- full candidate approval still requires an explicit human decision.

This is useful curation without adding a new schema, registry, CLI, or metadata system.

## Product-level consequence

PoC 018 supports one small extension to Torrone's operating model:

> A bounded Reference and an application's shared interaction requirements are separate design inputs. Implementation and review must identify both when both are material.

This is an omission-prevention rule, not a universal Enter/Tab convention. It should remain lightweight and should not require exhaustive interaction documentation when no shared decision is material.

## Remaining limits

This experiment does not establish:

- that the Invoice candidate is an approved Reference;
- that its current Enter behavior is the preferred application policy;
- complete native Tab/Shift+Tab and IME behavior across browsers/devices;
- assistive-technology behavior;
- a universal mobile breakpoint, week-start convention, Sunday color convention, or calendar layout; or
- that every future UI needs a separate application-policy document.

The approved Date range Reference remains unchanged. PoC 018 validates the curated handoff within its bounded responsibility while retaining the unresolved application-level and browser/device limits above.
