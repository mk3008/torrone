---
type: business screen review
title: Partial Reference and integrated Target screen review
status: accepted for the bounded Gate
source: rendered evidence and observable contracts
---

# Review surfaces

- common shell initial and navigation/filter/theme/account-menu states;
- search workspace Initial, Results, Empty, filter disclosure, and Clear;
- integrated supplier-compliance Target in Initial, Results, Empty, light, and
  dark states.

# Human review result

The common shell is understandable without product content. Its large dashed
placeholder clearly describes the missing responsibility and is labelled as a
Reference harness, so it is not likely to be mistaken for a recommended
product card. Navigation density, active-item treatment, nested-menu depth,
filtering, theme control, and account-menu placement remain directly visible.

The search workspace reads as a realistic purchase-order task rather than a
demo. Filters lead to explicit Initial, Results, and Empty states. Search and
Clear are placed together; the result action remains in the result header; the
ID column is actionable and sticky; pagination exposes only Previous, current
page, and Next. The scenario selector is compact, labelled as a Reference part,
and outside product observation.

The integrated Target reads as one supplier-assurance screen. It does not copy
Reference fixture identity or explanatory harness copy. Navigation, title,
filters, result states, primary action, table, pagination, theme, and account
menu form one coherent task flow. The `New case` action intentionally carries
placement and visual priority only; no unapproved creation flow was invented.

# Corrections prompted by review

- Disabled pager text was too low-contrast in the first workspace draft and
  was darkened.
- Target controls initially did not inherit the intended label typography.
- The first integrated dark theme left light-theme text and disabled-control
  colors in the workspace. Target-only dark-theme rules corrected the visible
  mismatch.

The last finding is a composition-specific warning: independently acceptable
parts do not remove the need to review the integrated screen.

# Accessibility and interaction boundary

Native labels, buttons, links, landmarks, table semantics, `aria-controls`,
expanded/pressed state, focus return, and visible focus are retained. The CLI
reports no bounded accessibility issue or unnamed interactive accessibility
node. This is browser-based bounded evidence, not a substitute for real AT or
cross-browser review.

# Accepted limitations

- The part harnesses are review aids, not product UI.
- The primary create action and row links do not prescribe destination or
  navigation modality.
- Responsive behavior, mobile drawer behavior, loading/error states, other
  browsers, and real AT remain out of scope.
- Part-to-Target CLI reports contain substantial informational noise, so a
  reviewer must distinguish comparison scope from product defects.

# Decision

The two parts and the integrated Target are acceptable evidence for this Gate.
They are not promoted as a reusable catalog or complete product design.

