# Repository Guidance

- Read `docs/product-foundation.md` before changing product direction, Reference semantics, or repository architecture.
- Write maintained repository artifacts in English.
- Torrone's current product direction is small, framework-independent, browser-reviewable Reference HTML plus concise guidance. Keep References plain, lightweight, locally understandable, and free of production-application infrastructure unless a bounded experiment explicitly requires otherwise.
- Treat `docs/poc/`, `profile/`, `prompts/`, `templates/`, and historical test/output material as research history or evidence. They may inform current work but do not override the Product Foundation. Do not rewrite historical evidence to make a current result appear cleaner.
- Human review decides design quality. Browser observation and automated comparison may verify bounded observable transfer; they are not design-approval authorities.
- Prefer the smallest reversible change or experiment that can answer the current question. Promote a bounded finding into a repository-wide product rule only through an explicit decision.
- Match verification effort to change risk and impact. Use focused checks for documentation or mechanical cleanup, and broader verification when behavior, Reference semantics, comparison logic, or evidence handling changes. Do not weaken checks merely to obtain a passing result.
- When requirements conflict or a material product decision is missing, preserve the gap and report it instead of inventing a new product-wide convention.
- Do not restore Manifest/OKF-era workflows, skills, schemas, or orchestration as active repository requirements unless a new product decision explicitly calls for them.
