# Gyulai Márk – portfolio

A portfolio site in Hungarian and English: Angular 22 (standalone, signals, zoneless), SCSS, Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

## Commands

- `npm ci` – dependencies (`package-lock.json` is versioned)
- `npm start` – development server (http://localhost:4200)
- `npm test -- --watch=false` – unit tests (Vitest + jsdom, `ng test`)
- `npm run build` – production build (prerendered `/hu`, `/en`, `404`, then the `postbuild` script): `dist/portfolio/browser`
- `npm run e2e` – Playwright E2E tests against the production build, on a local Cloudflare server (build first with `npm run build`; if no Playwright browser is installed: `E2E_CHROMIUM_PATH=<path of the chromium>`)
- `npm run links` – checks the external links (runs weekly in CI; sites that reject robots are reported as “unverifiable”)
- `npm run cv` – rebuilds the downloadable résumé (PDF) into `public/cv/`; run it after a content change and commit the PDFs
- `npm run preview` – build and local Cloudflare preview (`wrangler dev`)
- `npm run deploy` – build and deploy (needs `wrangler login`)

## Where to find what

- **Documentation:** `docs/` (index: `docs/README.md`): architecture, development, content, and per part `docs/components/`. Update it with the `/document-components` skill.
- **Skills:** `.claude/skills/`: `edit-content` (content in both languages), `document-components` (documentation), `project-conventions` (background knowledge).
- **Agent:** `.claude/agents/a11y-reviewer.md` (accessibility review).
- **Hooks:** `.claude/hooks/` (formatting, protection, build and test check at the end of a turn); configured in `.claude/settings.json`.
- **Content:** `src/app/data/content.hu.ts` and `content.en.ts`; **tests:** `*.spec.ts` next to the components, the E2E tests in the `e2e/` folder.

## Conventions in brief

- Bilingual site: text lives only in the content files, the components read from the `ContentService`.
- Everything outside the site texts is English: code, comments, test names, documentation, scripts and commit messages. The Hungarian texts (and the Hungarian text fixtures the tests assert on) are only the site content in `content.hu.ts`.
- The content may only be real data; ask when data is missing.
- Every component is standalone, with separate `.ts`, `.html`, `.scss` and `.spec.ts` files.
- SOLID, DRY, KISS; one responsibility per component.
- After a change the unit tests and the build must be clean; a visible feature also needs an E2E test.

## Structure

Every component is in its own folder, with four separate files: `name.ts`, `name.html`, `name.scss`, `name.spec.ts`. Every component is standalone.

- `src/app/data/` – `models.ts` (types), `content.hu.ts` and `content.en.ts` (the whole content and UI texts of the two languages), `content.ts` (`CONTENTS`), `content.spec.ts` (also checks that the structure of the two languages matches)
- `src/app/pages/` – the pages of the routes: `portfolio` (the `/hu` and `/en` page, assembles the sections), `root-redirect` (`/`: leads to the visitor's language), `not-found` (`404`, `noindex`)
- `src/app/core/` – services: `LanguageService` (language, from the `:lang` parameter of the URL; stores only on a deliberate switch), `language.guard` (invalid language code → 404), `site-origin.ts` (`SITE_ORIGIN`) and `site.config.ts` (its injectable counterpart), `ContentService` (the content of the current language, the components read from it), `ThemeService` (theme), `SeoService` (title and meta), `ScrollSpyService` (active menu item), `storage` (safe localStorage), `prefers-reduced-motion`
- `src/app/cv/` – the HTML of the résumé (`render-cv.ts`, from the content files) and `cv-entry.ts`, used by `scripts/build-cv.mjs` (esbuild + Playwright Chromium PDF)
- `src/app/shared/` – reusable building blocks: `anchor-link` (because of `<base href="/">` a plain `#id` link does not work: always use `appAnchor` for an in-page jump; its `href` is `/hu#id`, so it also works without scripting), `button`, `card`, `chip-list`, `section-heading`, `reveal`, `typewriter`, `count-up` (the numbers of the statistics grow on appearance; with reduced motion and without scripting the final value is shown), `code-window`, `theme-toggle`, `language-toggle`, `back-to-top`
- `src/app/sections/` – the sections of the page: `nav`, `hero`, `about`, `skills`, `ai-workflow` (How I work with AI), `experience` (+ `job-card`, collapsible project list), `side-projects` (+ `project-card`), `education` (+ `study-item`), `contact`, `footer`
- `src/styles.scss` – design tokens (dark and light theme) and global style
- `src/index.html` – static SEO (meta, Open Graph, JSON-LD), `public/` – favicon, `og-image.png`, `robots.txt`, `_headers` (caching)
- `wrangler.jsonc` – Cloudflare assets configuration (`404-page`, `drop-trailing-slash`); `.github/workflows/ci.yml` – unit tests, build, E2E and deploy; `playwright.config.ts` + `e2e/` – E2E tests; `scripts/postbuild.mjs` – copies `404.html`, and builds the sitemap if `SITE_ORIGIN` is set

## Routes, prerendering, language

- The site lives at two language addresses: `/hu` and `/en` (`app.routes.ts`, `:lang` parameter); `/` leads to the visitor's language. `ng build` prerenders statically (`app.routes.server.ts`, `outputMode: static`), and hydration runs with event replay. A new language: `content.xx.ts`, extend `CONTENTS`/`LANGS`; the routes come from `LANGS`.
- Prerenderable code: `document`, `localStorage` and timers only behind `DOCUMENT`/`isPlatformBrowser`/`afterNextRender`. The first render is deterministic (the theme starts from `dark`, the typewriter with the first word), otherwise there will be a hydration error.
- `SITE_ORIGIN` (`core/site-origin.ts`) is empty until the site is deployed: then there is no canonical, hreflang, `og:url` or sitemap. On deployment set it here once (`https://…`, without a trailing slash); `postbuild` builds the sitemap and the robots.txt reference from it too.
- The `inMemoryRouting` build (`--configuration preview`) is only needed for the Artifact preview (there is no real URL, the language switch happens in memory); we never use it for the production build.

## Rules

- Bilingual site (Hungarian and English). No text may go into the components: everything is in `content.hu.ts` and `content.en.ts`, and the components read from the `ContentService`. New text is needed in both languages; `content.spec.ts` reports if the structure of the two languages differs.
- The content may only be real data (résumé, LinkedIn). Nothing may be invented; if data is missing, ask. A phone number, date of birth and home address must not appear on the site.
- Company names: apart from the employers (Adroit Group, RDI Software Hungary, EPAM Systems) no company name appears anywhere: not on the site, not in the CV, not in the docs, tests or this file. Clients and projects are described generically (for example “a car rental service”, “a Swiss financial startup”, “an international enterprise”), and no link to a client's own site is kept. Tools, certificate issuers (Anthropic, LinkedIn Learning), the university and the side projects (lizacover.hu, this portfolio) are not covered by this.
- Side projects: lizacover.hu (the portfolio of the graphic designer Elizabet Ivanovszki, `gyulaimrk/ie-fe` repo) and this portfolio itself (with a source link, without a live address until it is deployed).
- Principles the site names: clean code, SOLID, DRY, KISS (Design, About), ACID and transaction management (Design, for every project that uses a database), FIRST (Testing). The Swiss fintech project is in the past tense (finished), the car rental and AI consulting projects in the present tense.
- Technologies and tools are listed per project (`JobProject.tech`: languages, frameworks, databases, CI/CD and issue-tracking tools); at employer level (`Job.tech`) only Adroit's Plane appears. The CI/CD and tracking tools per project: car rental – Jenkins, GitLab; Swiss fintech – GitLab, ArgoCD; RDI enterprise application – GitHub, ArgoCD; AI consulting – Azure DevOps; Jira and Confluence for the Adroit and RDI projects, GitHub Copilot for the RDI project; the technologies of the EPAM projects are the owner's own lists (Git, Maven, Jenkins for the widget backend and the exam system); Claude for the Adroit projects too; Plane only among the labels of the Adroit employer (not per project); the side projects – GitHub, GitHub Actions, Claude Code.
- Years of experience: the texts contain `{javaYears}` and `{aiYears}` (`{javaYears}+` in the statistics); the number is calculated by `data/experience.ts` from the start month (`EXPERIENCE_START`: Java July 2021, AI July 2023), so they grow on their own. Do not type a year count by hand; CI rebuilds and deploys monthly so the prerendered page is refreshed too.
- Availability (contact section): open to project-based collaboration, part-time engagements and AI consulting (`ui.contact.availability`, the second paragraph of the section).
- Mentoring: at EPAM they mentored a junior developer, at RDI unofficially a junior colleague; this appears at the two employers and in the About text.
- International teams: the EPAM financial platform, the RDI project and the Swiss fintech project were done with international teams, and international collaboration is natural for the owner; this appears in the About text and in the project descriptions.
- Wording: the text of Experience and Side projects is the owner's own wording (first person); next to the project name there is a short subtitle (`JobProject.subtitle`, for example “Financial platform – Web framework serving widgets”).
- Projects per employer (8 in total, this is the number in the statistics): Adroit: a car rental system (Kotlin backend: calculations, asynchronous synchronisation, PostgreSQL, own OAuth with Spring Security, @Scheduled, design-first), a financial application of a Swiss startup (backend for frontend, Kotlin, Spring Boot 4, OpenAPI design-first), AI consulting and software development (AI Consultant and developer: a platform supporting manual testing, code-first (C#/.NET backend, PostgreSQL, Node.js, Angular, connectable to agents as an MCP server), error handling, clean code, repo-level AI skills, documentation); RDI: an enterprise application of an international company (user accounts, authentication, authorisation); EPAM: “Financial platform – Web framework serving widgets”, “Financial platform – Backend development of web widgets” (the same project as a junior and as a Software Engineer, with its own task list in each role), an internal wellbeing application (Software Engineer), an internal exam system (junior; Spring, Hibernate, PostgreSQL, Angular, JSP). The widget backend appears under two roles but counts as one project (the name and the subtitle together identify it). One short, insignificant engagement was left out at the owner's request. The projects have no separate dates.
- Design (modern, traditional developer portfolio): Space Grotesk (headings) and Inter (text), fonts served locally (`@fontsource`). A blue–cyan gradient highlight, glass-effect cards, dark and light theme (`data-theme`, tokens in `styles.scss`). Hero: typewriter role, Kotlin code window, statistics. The timeline may only be used for chronological order. Motion: entrance animation, floating background glows, hover; a reduced-motion fallback is mandatory.
- Code principles: SOLID, DRY, KISS. One responsibility per component (the section assembles, the small component renders); lift repeated UI into a shared component; do not build more than the task asks. The sections work from `data/content.ts`, hard-coded text in the components is to be avoided.
- Every new component also gets `.html`, `.scss` and `.spec.ts` files (no inline template/style). The spec tests the behaviour, not the implementation.
- Accessibility and SEO: a single `h1`, a skip-to-content link, `aria-current` on the active menu item, a visible focus, a text contrast of at least 4.5:1 in both themes (Lighthouse above 90 in every category). Take the colours from the tokens, use `--accent-text` for text colour, not `--accent-3`.
- After a change `npm test -- --watch=false` and `npm run build` must be clean.
- Security: `public/_headers` gives static headers, `postbuild` calculates the `Content-Security-Policy` (hashes of the inline scripts); for a new external source the policy in `postbuild.mjs` must be extended too. `e2e/a11y.spec.ts` (axe) and `e2e/security.spec.ts` guard it.
- The 404 page and the root redirect page are deliberately bilingual, their text is in the template (they have no language prefix).
- Light theme: `--accent-3` is darker (#087587), so the white text of the button reaches the contrast at every point of the gradient and so does the focus ring; `e2e/a11y.spec.ts` checks this at token level.
- Text colour tokens: `--accent-text` (general text), `--accent-ink` (the blue of the chips, darker in the light theme for contrast). When printing, the light theme always applies (`@media print`).
- `llms.txt`: generated by `postbuild` from the content (`data/llms-txt.ts`).
- The portrait photo is real (`public/mark-gyulai.jpg`, pointed to by `profile.photo`); the code window of the hero shows two tabs: by default the instance built from the profile (`Main.kt`, `developer-instance.ts`), then the `Developer` data class with the `Role` enum (`codeSamples`); the roles are `profile.roleConstants` (the values of the `Role` enum, the `Developer.roles` list).
- Résumé: `profile.cv` points to the path (`public/cv/*.pdf`), and the PDF is built from the content files by `npm run cv`. No GitHub link goes into it (neither the profile nor the source code). After a content change it has to be rebuilt and committed. Certificate link: `Study.url` (only a real address given by the user; nothing may be invented).
- Testing: unit tests for behaviour (Vitest), E2E for the whole route (`e2e/`, reading the expected text from the content files instead of copying it). A new, user-visible feature also needs an E2E test.

## Claude automation

- `.claude/settings.json` hooks: Prettier formatting after an edit, protection of generated files (`package-lock.json`, `dist/`, `.env`), `ng build` check at the end of a turn.
- Skills: `/edit-content` (editing the content in both languages), `/document-components` (documenting the parts in the `docs/` folder), `project-conventions` (background knowledge).
- Agent: `a11y-reviewer` (accessibility review).
- `.mcp.json`: context7 and Playwright MCP.
