# Contributing to Tengo Derechos

Thank you for considering a contribution. This project serves people in
crisis. We move carefully and we publish a methodology for a reason — every
change must keep the trust chain intact.

## What we welcome

- Typo and grammar fixes (en or es).
- Accessibility improvements: focus states, screen-reader copy, contrast.
- Bug reports + reproductions.
- Additional Spanish-language voice actors. We are recruiting.
- Translations into additional locales — Mam, K'iche', Q'eqchi', Haitian
  Creole, Vietnamese, Tagalog, Brazilian Portuguese.
- Resource directory submissions via [/resources/submit](https://tengoderechos.org/resources/submit).
- Infrastructure: SW improvements, edge optimizations, build perf.
- New emergency scenarios — open a discussion first.
- Partner integrations and embed-API consumers.

## What requires extra process

- **Legal-content edits** (changing what a guide tells a family to do or say).
  These cannot land via an anonymous PR. They go through the admin review
  console at `/admin/reviews`, which is gated by `ADMIN_TOKEN` and enforces
  attorney-specialty allowlists. If you are an attorney willing to review,
  email `reviewers@tengoderechos.org`.
- **Translations of legal content.** Spanish translations need attorney
  sign-off in addition to language review. Drafts welcome; merging requires
  the attorney pass.
- **Branding changes.** The TD shield, wordmark, and color tokens are
  trademark-protected. Forks for other communities must choose their own
  brand.

## Workflow

1. Open an issue describing the change before opening a PR for anything
   non-trivial.
2. Branch from `main`.
3. Run `npm run lint`, `npm run typecheck`, and `npm run build` before
   pushing — all three must pass.
4. If the change is observable in the browser, include a before/after
   screenshot.
5. PR descriptions should explain the **why**, not just the **what**.

## Languages of review

We review in English and Spanish. Submit your PR + commit messages in
either; we'll handle the rest.

## Licensing of your contributions

By contributing, you agree that:
- Code contributions are released under the [MIT License](./LICENSE).
- Editorial / audio / translation contributions are released under
  [CC BY-SA 4.0](./CONTENT-LICENSE).

## Code of conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md). Harassment of contributors,
including based on immigration status, race, language, religion, or gender
identity, results in a permanent ban from the repository. We're firm about
this.

## Security disclosure

Don't open a public issue for security vulnerabilities. See
[SECURITY.md](./SECURITY.md) for our responsible-disclosure process.
