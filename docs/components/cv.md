# Résumé (`src/app/cv/`)

The source of the downloadable résumé (PDF). The content is the same as the site's, so it cannot differ from it.

### `renderCv(lang, content, assets)` (`render-cv.ts`)

The HTML of the whole résumé in one language: a header with photo and contact details, introduction, experience
(with projects and tasks), skills, side projects, studies and certificates. The text is written out with HTML escaping.
If all the further certificates were issued by the same body, it is shown once, in the heading.

| Parameter | Meaning                                           |
| --------- | ------------------------------------------------- |
| `lang`    | `'hu'` or `'en'`; the value of `<html lang>`      |
| `content` | the `Content` object of the given language        |
| `assets`  | `photo` (data URL) and `fontCss` (embedded fonts) |

### `renderAllCv(assets)` (`cv-entry.ts`)

The entry point for `scripts/build-cv.mjs`: per language it gives the HTML and the file name of the PDF (from the
`profile.cv` path).

## Building

`npm run cv`: esbuild compiles the entry point, Playwright Chromium prints to PDF, and the result goes into the
`public/cv/` folder. The build stops with an error if a PDF has more than two pages.

**Tests:** `render-cv.spec.ts`: in both languages every employer, project and certificate appears, there is no personal data, the
text is escaped, and the shared issuer is handled.
