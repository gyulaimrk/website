---
name: project-conventions
description: The rules of the portfolio project (Angular, style, design, language). Background knowledge for every code change.
user-invocable: false
---

# Project conventions

**Technology:** Angular 22, standalone components, signals, zoneless, the new control flow (`@if`, `@for`), SCSS. Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

**Structure:** `src/app/pages/` holds the pages of the routes (`/hu`, `/en`, `/`, `404`), `src/app/cv/` the source of the résumé PDF, `src/app/sections/` the sections, `src/app/shared/` the reusable building blocks, `src/app/core/` the services (language, content, theme, SEO, scroll-spy) and helpers, `src/app/data/` the models and the bilingual content (`content.hu.ts`, `content.en.ts`), and `src/styles.scss` the design tokens.

**Routes and prerendering:** the site is statically prerendered, with its own address per language (`/hu`, `/en`). Browser-specific code (`document`, `localStorage`, timers) only behind `DOCUMENT`, `isPlatformBrowser` or `afterNextRender`. For in-page jumps use `appAnchor`, not a plain `#id` link (because of `<base href="/">`).

**Bilingual site:** no text may go into the components. Everything is in the content files, in Hungarian and in English, and the components read from the `ContentService` (the `content()` signal). New text is needed in both languages.

**Components:** every component in its own folder, with separate `.ts`, `.html`, `.scss` and `.spec.ts` files (no inline template or style). SOLID, DRY, KISS: one responsibility per component, repeated UI goes into a shared component, inputs are `input()`, two-way state is `model()`, outputs use signals; no needless abstraction. Write a spec for a new component (Vitest, `ng test`).

**Design (modern developer portfolio):**

- Fonts: Space Grotesk (headings) and Inter (text), loaded locally. Colours and theme only from the tokens (`--bg`, `--card`, `--text`, `--muted`, `--accent`, `--accent-2`, `--accent-3`, `--gradient`); the tokens of the light and dark theme are in `styles.scss`.
- Glass-effect cards (`app-card`), a gradient primary button, a hero with typewriter text and a code window. A timeline only for chronological content.
- Motion: entrance animation (`appReveal`), floating background glows, hover. A `prefers-reduced-motion` fallback is mandatory.

**Accessibility:** contrast of at least 4.5:1 in both themes; use `--accent-text` as the text colour. Every control needs a visible focus and (for an icon) a label, and the label contains the visible text.

**Language:** the site is shown in Hungarian and English, and those texts live only in the content files. Everything else in the repository (code, comments, test names, docs, scripts, commit messages) is written in English. The content may only be real data (résumé, LinkedIn); no invented client, number or quote. Personal data (phone, date of birth, address) does not go onto the site.

**Verification:** `npm test -- --watch=false` and `npm run build` must be clean; for a user-facing feature `npm run e2e` too (build first). Run `npm run cv` after a content change. After a visual change run the inspector and look through the screenshots.
