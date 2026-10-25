# Gyulai Márk – portfólió

Kétnyelvű (magyar és angol) portfólió, Angular 22 és Node.js 24 LTS alapon. Az oldal statikusan előrenderelt,
nyelvenként saját címmel (`/hu`, `/en`), Cloudflare-en tárolva.

```bash
npm ci
npm start                 # fejlesztői szerver: http://localhost:4200
npm test -- --watch=false # egységtesztek (Vitest)
npm run build             # éles build: dist/portfolio/browser
npm run e2e               # E2E tesztek (Playwright), előbb: npm run build
npm run cv                # a letölthető önéletrajz (PDF) újragyártása
```

## Dokumentáció
A részletes dokumentáció a [`docs/`](docs/README.md) mappában van: architektúra, fejlesztés, tartalom és részegységenként a komponensek.
A projekt szabályai a `CLAUDE.md`-ben, a Claude Code skillek a `.claude/skills/` mappában vannak.

## Tartalom
Minden szöveg a `src/app/data/content.hu.ts` és `content.en.ts` fájlban van, a két nyelv szerkezete azonos
kell legyen (a `content.spec.ts` ellenőrzi). Tartalomváltozás után futtasd az `npm run cv` parancsot,
hogy az önéletrajz is frissüljön.

## Cloudflare
Statikus assetek Cloudflare Workers alatt (`wrangler.jsonc`).

```bash
npm run preview   # build + helyi Cloudflare előnézet
npm run deploy    # build + éles telepítés (előtte: npx wrangler login)
```

A GitHub Actions (`.github/workflows/ci.yml`) minden pushra teszteli és buildeli az oldalt, lefuttatja az
E2E teszteket, és a `main` ágon telepít, ha a `CLOUDFLARE_API_TOKEN` és a `CLOUDFLARE_ACCOUNT_ID` titkok be vannak állítva.

## Élesítés előtt
Az oldal végleges címét egyszer kell megadni: `src/app/core/site-origin.ts`, `SITE_ORIGIN` (`https://…`,
záró perjel nélkül). Ettől lesz canonical, hreflang, `og:url` és sitemap. Addig ezek kimaradnak.
