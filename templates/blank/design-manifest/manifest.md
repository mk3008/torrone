---
type: UI Design Manifest
title: Replace with product or bundle name
description: Replace with a one-sentence routing summary.
status: draft
source: authored
scope: Replace with the screens, states, roles, and interactions covered.
---

# Product and scope

Describe the target product, intended user, bounded UI area, and exclusions without naming an original UI or its evidence.

# Source-independence boundary

This bundle must stand alone for application. Do not include original UI names, URLs, screenshots, copied product vocabulary, capture paths, or extraction-evidence links. Record any information that cannot be abstracted as unresolved.

If extraction informed this bundle, keep observed, inferred, authored default, and context-dependent statements distinct. Treat the result as a candidate for reuse, not canonical knowledge from one source. Shared promotion requires explicit scope, corroboration, independent review, and human judgment.

# Precedence

Use: target-product implementation and repository guidance; explicit product requirements; this local manifest; then explicit starter defaults. Do not include an original or reference UI.

# Application input contract

The application owner supplies the task-level state model, primary-record value, identity context, aggregate information, optional destinations, and behavior for unresolved fields. This manifest does not invent those inputs. A neutral, source-blind fixture may fill only an already instructed semantic slot with recorded allowed provenance; it cannot add product meaning, source-specific copy, or a new hierarchy slot.

# Configuration and flows

Put fixed intent, hierarchy, responsibility, and selection criteria in Markdown concepts. Put only finite presentation choices in a configuration concept, with stable IDs, types, defaults, allowed values, meanings, scope, and owner. Keep local overrides separate from the pack; direct pack edits are a fork. Use a flow concept for cross-screen decision criteria, while a product binding owns feature existence, routes, permissions, state, data, aggregates, and display language.

# Verification

For each applicable concept, state the observable rendered outcome that shows
its guidance has been applied. For an exercised interaction, state the visible
before state, user action, and after state. Keep these pass conditions free of
CSS, DOM, framework, library, asset-source, and literal-value requirements.
Keep product-specific facts in the application input contract or binding. If
the required observation cannot be made in the available environment, report it
as not verified rather than inferring a pass.

# Unresolved

List gaps and conflicts that an implementer must not guess away.
