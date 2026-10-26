# Gyulai Márk – portfolio

A bilingual (Hungarian and English) portfolio built on Angular 22 and Node.js 24 LTS. The site is statically prerendered,
with its own address per language (`/hu`, `/en`), and hosted on Cloudflare.

```bash
npm ci
npm start                 # development server: http://localhost:4200
npm test -- --watch=false # unit tests (Vitest)
npm run build             # production build: dist/portfolio/browser
npm run e2e               # E2E tests (Playwright), build first: npm run build
npm run cv                # rebuild the downloadable résumé (PDF)
```

## Documentation

The detailed documentation is in the [`docs/`](docs/README.md) folder: architecture, development, content and the components, part by part.
The project rules are in `CLAUDE.md`, and the Claude Code skills are in the `.claude/skills/` folder.

## Language of the repository

The site is shown in Hungarian and English, and those texts live only in the content files. Everything else is written in English: code, comments, test names, documentation, skills, scripts, workflow files and commit messages. Keep it that way in new work.

## Content

Every text is in `src/app/data/content.hu.ts` and `content.en.ts`; the structure of the two languages must be identical
(checked by `content.spec.ts`). After a content change run `npm run cv`,
so the résumé is refreshed too.

## Cloudflare

Static assets under Cloudflare Workers (`wrangler.jsonc`).

```bash
npm run preview   # build + local Cloudflare preview
npm run deploy    # build + production deploy (first: npx wrangler login)
```

GitHub Actions (`.github/workflows/ci.yml`) tests and builds the site on every push, runs the
E2E tests, and deploys on the `main` branch if the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets are set.

## Before going live

The final address of the site has to be set once: `src/app/core/site-origin.ts`, `SITE_ORIGIN` (`https://…`,
without a trailing slash). This is what produces canonical, hreflang, `og:url` and the sitemap. Until then they are left out.
