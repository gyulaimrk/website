# Services and helpers (`src/app/core/`)

### `ContentService`

The content of the current language. The `content()` signal gives `CONTENTS[lang]` according to `LanguageService.lang()`; the
components read from here, not from the raw data files.

### `LanguageService`

The language of the page. The language follows from the route (`/hu`, `/en`), and the `lang` signal is set by the route guard through
`use()`, which also updates the `<html lang>` attribute. It only remembers the deliberate switch (`toggle()`), for redirecting the
root address (`preferred()`: the remembered language, otherwise the browser's); merely opening a language address does not
write to storage.

| Member                      | What it does                             |
| --------------------------- | ---------------------------------------- |
| `lang`                      | the current language (signal)            |
| `use(lang)`                 | sets the language (called by the guard)  |
| `preferred()`               | the visitor's language                   |
| `other()`                   | the other language                       |
| `navigateTo(lang, options)` | navigates to the address of the language |
| `toggle()`                  | navigates to the other language          |

### `languageMatch` and `languageActivate` (`language.guard.ts`)

The guards of the language route. `languageMatch` (`CanMatchFn`) only matches `/hu` and `/en`, everything else is a 404.
`languageActivate` (`CanActivateFn`) sets the language of the route, also when the parameter changes.

### `ThemeService`

Light and dark theme. The first render is always dark (hydration); afterwards the saved or system theme
is applied, through the `data-theme` attribute. If the visitor switches before the first render, their decision stays.
It only saves the deliberate switch with the `storage` helpers, not the system theme. A small script in `index.html` sets the attribute before the paint,
so there is no flash.

### `SeoService`

The title, the description, the share data and (if `SITE_ORIGIN` is filled in) canonical, hreflang and `og:url`
per language (the share image, `og:url`, canonical and hreflang only with a known `SITE_ORIGIN`). `update(lang)` is for the portfolio page, `noindex(title)` for the 404, `urlFor(lang)` for the address of a language.

### `ScrollSpyService`

Watches which section is in the upper part of the screen. `observe(sections)` starts it, and the `active` signal gives the
id (without the hash). The menu uses it for the `aria-current` marking.

### `site-origin.ts` and `site.config.ts`

`SITE_ORIGIN`: the live address (`https://…`, without a trailing slash); while empty, canonical, hreflang, `og:url` and the
sitemap are left out. `site-origin.ts` is a plain value, so `scripts/postbuild.mjs` uses the same one (loaded with esbuild, not by text search). `site.config.ts` provides it injectably as `SITE_ORIGIN_TOKEN`, so tests can give another value.

### `storage.ts`

`readStored(key, allowed)` and `writeStored(key, value)`: safe `localStorage` access. With unavailable storage or an
invalid value they give `undefined` or silently skip.

### `prefersReducedMotion()`

True if the visitor asked for reduced motion (or the browser does not support the query). Every moving element
checks it.

**Tests:** the services and helpers have a `*.spec.ts` in the `core/` folder (except `site.config.ts` and `language.guard.ts`; the latter is covered by the E2E tests: an invalid address gives a 404, and the language switch leads to the address of the other language).
