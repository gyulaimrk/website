# Pages (`src/app/pages/`)

The top-level components of the routes. The routes are described by `app.routes.ts`, the prerendering by
`app.routes.server.ts` (see [Architecture](../architecture.md)).

### `app-portfolio-page` (`PortfolioPage`)

The whole portfolio on one page, at `/hu` and `/en`. It puts together the skip-to-content link, the menu, the
sections in the `main` element (hero, about, skills, AI, experience, side projects, studies, contact), then the footer and the
“back to top” button. An `effect` updates the `SeoService` on every language change.

**Tests:** `portfolio-page.spec.ts`: every section is built, there is a skip-to-content link (`main` is its target), the title changes together with the language.

### `app-root-redirect` (`RootRedirect`)

The root address (`/`). In the browser, after the first render, it redirects to the visitor's language (`LanguageService.preferred()`,
without history, `replaceUrl`). The served HTML has links to both languages, so search engines and
visitors without scripting are not stuck here.

**Tests:** `root-redirect.spec.ts`: links to both languages for visitors without scripting, and after the first render it navigates to the visitor's language, without history.

### `app-not-found` (`NotFound`)

The 404 page. It is bilingual because it has no language prefix; on start it sets `noindex` (`SeoService.noindex`).
The build makes the `404.html` in the root from it.

**Tests:** `not-found.spec.ts`: it informs in both languages and leads to both home pages; it marks the page against indexing and also sets the title.
