# Architecture

## Overview

The site is a statically prerendered Angular 22 application (standalone components, signals, zoneless). There is no
server-side runtime: the build produces ready-made HTML, which Cloudflare serves as static assets.

```
src/app/
  data/       models and the whole content of both languages
  core/       services: language, content, theme, SEO, scroll spy
  pages/      the pages of the routes
  sections/   the sections of the page
  shared/     reusable building blocks
  cv/         the source of the downloadable résumé
```

## Routes

| Address                 | Page            | Note                                                                                        |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| `/`                     | `RootRedirect`  | takes the visitor to their language (the remembered choice, otherwise the browser language) |
| `/hu`, `/en`            | `PortfolioPage` | the whole portfolio on one page, with its own address per language                          |
| `/404`, unknown address | `NotFound`      | `noindex`; Cloudflare serves the root `404.html` with a real 404 status                     |

The routes come from `LANGS` (`data/content.ts`). The `languageMatch` guard only matches a valid language code,
and `languageActivate` sets the language of the page.

## Data flow

```
content.hu.ts / content.en.ts  ->  CONTENTS  ->  ContentService.content()  ->  components
                                                       ^
                                           LanguageService.lang() (from the route)
```

There is no text in the components: they all read from the `content()` signal of the `ContentService`, which gives the
content of the current language. On a language switch the route changes, the signal updates, and the view is redrawn.

## Prerendering and hydration

`ng build` prerenders every route (`app.routes.server.ts`, `outputMode: static`), and the browser
hydrates with event replay. The conditions for this:

- Browser-specific code (`document`, `localStorage`, timers) only runs behind `DOCUMENT`, `isPlatformBrowser` or
  `afterNextRender`.
- The first render is deterministic: the theme starts from `dark`, the typewriter shows the first word. The saved or
  system theme is applied after the first render.
- In-page jumps use the `appAnchor` directive because of `<base href="/">`.

## SEO

- Static meta, Open Graph and JSON-LD in `index.html`.
- The `SeoService` adjusts the title and the description per language, and only adds the canonical, hreflang and `og:url` tags
  if `SITE_ORIGIN` (`core/site-origin.ts`) is filled in. While it is empty, the sitemap is not built either.
- `scripts/postbuild.mjs` copies `404.html` to the root of the output, and with `SITE_ORIGIN` builds a sitemap
  and adds a reference to it in `robots.txt`.

## Security, printing, AI-friendly output

- **Headers:** `_headers` gives security headers and the `Content-Security-Policy` calculated by the build
  ([Development](development.md)).
- **Printing:** the `@media print` rule of `styles.scss` always uses the light theme, hides the navigation, the
  code windows and the decorative glows, and opens the collapsed details.
- **`llms.txt`:** `postbuild` builds a short, machine-readable summary for AI tools from the content files
  (`src/app/data/llms-txt.ts`).

## Accessibility

A single `h1`, a skip-to-content link, `aria-current` on the active menu item (`ScrollSpyService`), a visible focus,
a text contrast of at least 4.5:1 in both themes (`--accent-text` as the text colour), a reduced-motion fallback for
the moving elements (`prefersReducedMotion`).

## Résumé

The PDFs the `profile.cv` path points to are built from the content files by `npm run cv` (see
[Résumé](components/cv.md)).
