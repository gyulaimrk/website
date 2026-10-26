# Documentation

The bilingual (Hungarian and English) portfolio of Márk Gyulai: Angular 22, prerendered, hosted on Cloudflare.
This folder is for developers; the quick start is in the root `README.md`.

## Contents

| Document                                       | What it covers                                           |
| ---------------------------------------------- | -------------------------------------------------------- |
| [Architecture](architecture.md)                | Structure, routes, data flow, prerendering, SEO          |
| [Development](development.md)                  | Commands, testing, CI, deployment, building the résumé   |
| [Content](content.md)                          | How to edit the content, the data model, the rules       |
| [Pages](components/pages.md)                   | `src/app/pages/`: the pages of the routes                |
| [Sections](components/sections.md)             | `src/app/sections/`: the sections of the page            |
| [Shared building blocks](components/shared.md) | `src/app/shared/`: button, card, code window, directives |
| [Services](components/core.md)                 | `src/app/core/`: language, theme, SEO, scroll spy        |
| [Résumé](components/cv.md)                     | `src/app/cv/`: the source of the downloadable PDF        |

## Language

The documentation is in English, like everything else in the repository except the site texts in `content.hu.ts` (and the Hungarian text the tests assert on). The same goes for new docs, comments, test names and commit messages.

## Maintenance

The documentation of the parts is updated by the `/document-components` skill; its rules are described in
`.claude/skills/document-components/SKILL.md`. The project rules are in the root `CLAUDE.md`.
