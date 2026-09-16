# Repository Guidance

- Read `docs/product-foundation.md` before changing product direction, Reference semantics, or repository architecture.
- Write maintained repository artifacts in English.
- Torrone's current product direction is small, framework-independent, browser-reviewable Reference HTML plus concise guidance. Keep References plain, lightweight, locally understandable, and free of production-application infrastructure unless a bounded experiment explicitly requires otherwise.
- Before implementing or changing a recurring UI responsibility, check `references/`. An `approved` curation entry is the current design original only for the responsibility and scope stated by that entry.
- For UI work, apply `docs/application-interaction.md` before implementation and at handoff: identify the consuming application's shared interaction requirements as well as the applicable Reference, record their application and gaps, and verify affected cross-control paths. A component-only pass is not application coverage. For non-UI changes, state why this check is not applicable.
- Never infer design approval from a passing test, browser comparison, generated preview, or merged pull request. Only explicit human approval may set or retain `status: approved`; material changes to an approved Reference return to draft until reviewed again.
- Treat working copies under `review/` as review surfaces, not canonical design originals unless an approved curation entry explicitly identifies them. Treat `docs/poc/`, `profile/`, `prompts/`, `templates/`, and historical test/output material as research history or evidence. They may inform current work but do not override the Product Foundation or an applicable approved curation entry. Do not rewrite historical evidence to make a current result appear cleaner.
- Human review decides design quality. Browser observation and automated comparison may verify bounded observable transfer; they are not design-approval authorities.
- Prefer the smallest reversible change or experiment that can answer the current question. Promote a bounded finding into a repository-wide product rule only through an explicit decision.
- Match verification effort to change risk and impact. Use focused checks for documentation or mechanical cleanup, and broader verification when behavior, Reference semantics, comparison logic, or evidence handling changes. Do not weaken checks merely to obtain a passing result.
- When requirements conflict or a material product decision is missing, preserve the gap and report it instead of inventing a new product-wide convention.
- Do not restore Manifest/OKF-era workflows, skills, schemas, or orchestration as active repository requirements unless a new product decision explicitly calls for them.

- For transfer PoCs, classify human findings as target implementation defects or Reference gaps. Return Reference-level decisions to its next-version candidate; do not invent PoC-specific product requirements or curated variants. Follow `references/README.md` and retain historical evidence.
