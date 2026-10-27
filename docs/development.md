# Development

## Environment

Node 24 LTS, npm. The dependencies are installed according to `package-lock.json`: `npm ci`.

## Commands

| Command                     | What it does                                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm start`                 | development server: http://localhost:4200                                                                        |
| `npm test -- --watch=false` | unit tests (Vitest + jsdom, `ng test`)                                                                           |
| `npm run build`             | production build: prerendered `/hu`, `/en`, `404`, then the `postbuild` script; output: `dist/portfolio/browser` |
| `npm run e2e`               | Playwright E2E tests against the production build, on a local Cloudflare server (first `npm run build`)          |
| `npm run cv`                | rebuilds the downloadable résumé (PDF) into the `public/cv/` folder                                              |
| `npm run links`             | checks the external links (projects, certificates, profiles); runs weekly in CI                                  |
| `npm run preview`           | build and local Cloudflare preview (`wrangler dev`)                                                              |
| `npm run deploy`            | build and deploy (needs `wrangler login`)                                                                        |

If no Playwright browser is installed, the path of a Chromium can be given with the `E2E_CHROMIUM_PATH` environment variable.
`npm run cv` uses the `CHROME_PATH` variable in the same way.

## Language of the repository

Only the texts shown on the site are Hungarian (the content files, the bilingual 404 and root pages, the Hungarian SEO meta in `index.html`, the `llms.txt` labels). Code, comments, test names, documentation, skills, scripts, workflows and commit messages are English.

## Testing

- **Unit tests** (`*.spec.ts`, next to the component): they check the behaviour, not the implementation. The
  `content.spec.ts` also guards the matching structure of the two languages, the project count and the absence of personal data.
- **E2E** (`e2e/`): look at the whole route on the production build: root redirect, language switch, prerendered HTML
  without scripting, theme, mobile menu, collapsible project lists, résumé download, 404. They read the expected texts from the
  content files instead of copying them.
- **Accessibility** (`e2e/a11y.spec.ts`): the WCAG 2.1 A/AA rules of axe on `/hu` and `/en`, in both themes; contrast and clashing ids are covered too. A separate test (`e2e/security.spec.ts`) checks the security headers and that the CSP blocks nothing.
- After a change the unit tests and the build must be clean; a visible feature also needs an E2E test.

## Security headers and privacy

`public/_headers` gives the static security headers (`X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`). After the build `scripts/postbuild.mjs`
writes the `Content-Security-Policy` line at the end of the same `/*` rule: the page may only load from its own sources,
and the executable inline scripts (theme, event replay, CSS swap) are allowed by their sha256 hashes. For a new inline script there is nothing to do, the build
calculates the hash. If you add an external service
(for example analytics), its source must also be allowed in the policy of `postbuild.mjs`.

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request and on the `main` branch: install, unit tests, build,
installing the Playwright browser, E2E tests. The runner is `ubuntu-24.04`, because `ubuntu-latest` is already a
version that the Playwright in use does not support. `.github/workflows/links.yml` runs the link check weekly, and `.github/dependabot.yml` proposes
dependency updates weekly (the Angular packages in one group). On the `main` branch, if the `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` secrets are set, it also deploys: it downloads the artifact produced and tested by the build job, it does not rebuild.

## Dependency overrides

`package.json` pins `vite` to `~8.3.5` and `miniflare`'s `undici` to `^7.30.1` with npm `overrides`, to pull in security fixes before the parent packages (`@angular/build`, `wrangler`) release them. Remove an override as soon as the parent package requires a fixed version itself; otherwise it blocks later updates (Dependabot included). Check them whenever Angular or wrangler is upgraded.

## Deployment

The site runs on Cloudflare Workers as static assets (`wrangler.jsonc`: `404-page`, `drop-trailing-slash`).
Before going live the address of the site must be set once in `src/app/core/site-origin.ts` (`SITE_ORIGIN`,
`https://…`, without a trailing slash): this is what produces canonical, hreflang, `og:url` and the sitemap.

## Résumé (PDF)

`scripts/build-cv.mjs` (with the help of `scripts/bundle.mjs`, using esbuild) compiles the code of `src/app/cv/`, makes HTML from the content of the two languages, and
prints it to PDF with Playwright Chromium. The PDFs are version-controlled, so after a content change they have to be
rebuilt and committed. The build stops with an error if a PDF would have more than two pages.

## Claude Code

The skills of the project are in `.claude/skills/`, the agent in `.claude/agents/`, the hooks in `.claude/hooks/`:

| Skill / agent           | What it is for                              |
| ----------------------- | ------------------------------------------- |
| `/edit-content`         | editing the content in both languages       |
| `/document-components`  | documenting the parts in the `docs/` folder |
| `project-conventions`   | background knowledge about the conventions  |
| `a11y-reviewer` (agent) | accessibility review                        |
