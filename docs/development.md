# Fejlesztés

## Környezet

Node 24 LTS, npm. A függőségek a `package-lock.json` szerint települnek: `npm ci`.

## Parancsok

| Parancs                     | Mit csinál                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm start`                 | fejlesztői szerver: http://localhost:4200                                                                   |
| `npm test -- --watch=false` | egységtesztek (Vitest + jsdom, `ng test`)                                                                   |
| `npm run build`             | éles build: előrenderelt `/hu`, `/en`, `404`, majd a `postbuild` szkript; kimenet: `dist/portfolio/browser` |
| `npm run e2e`               | Playwright E2E tesztek az éles buildre, Cloudflare helyi szerveren (előbb `npm run build`)                  |
| `npm run cv`                | a letölthető önéletrajz (PDF) újragyártása a `public/cv/` mappába                                           |
| `npm run preview`           | build és helyi Cloudflare előnézet (`wrangler dev`)                                                         |
| `npm run deploy`            | build és telepítés (`wrangler login` kell hozzá)                                                            |

Ha nincs telepített Playwright-böngésző, az `E2E_CHROMIUM_PATH` környezeti változóval adható meg egy Chromium útvonala.
Az `npm run cv` ugyanígy a `CHROME_PATH` változót használja.

## Tesztelés

- **Egységteszt** (`*.spec.ts`, a komponens mellett): a viselkedést ellenőrzi, nem a megvalósítást. A
  `content.spec.ts` a két nyelv szerkezetének egyezését, a projektszámot és a személyes adatok hiányát is védi.
- **E2E** (`e2e/`): a teljes útvonalat nézi az éles buildön: gyökér átirányítás, nyelvváltás, előrenderelt HTML
  szkript nélkül, téma, mobilmenü, nyitható projektlisták, önéletrajz letöltése, 404. Az elvárt szövegeket a
  tartalomfájlokból olvassa, nem másolja.
- Módosítás után az egységtesztnek és a buildnek hibátlannak kell lennie; látható funkcióhoz E2E teszt is jár.

## Folyamatos integráció

A `.github/workflows/ci.yml` minden pull requestre és a `main` ágra lefuttatja: telepítés, egységtesztek, build,
a Playwright-böngésző telepítése, E2E tesztek. A futtató `ubuntu-24.04`, mert az `ubuntu-latest` már olyan
verzió, amelyet a használt Playwright nem támogat. A `main` ágon, ha a `CLOUDFLARE_API_TOKEN` és a
`CLOUDFLARE_ACCOUNT_ID` titok be van állítva, a build után telepít is.

## Kitelepítés

Az oldal Cloudflare Workers statikus assetként fut (`wrangler.jsonc`: `404-page`, `drop-trailing-slash`).
Élesítés előtt egyszer meg kell adni az oldal címét a `src/app/core/site.config.ts`-ben (`SITE_ORIGIN`,
`https://…`, záró perjel nélkül): ettől lesz canonical, hreflang, `og:url` és sitemap.

## Önéletrajz (PDF)

A `scripts/build-cv.mjs` esbuilddel lefordítja a `src/app/cv/` kódját, a két nyelv tartalmából HTML-t készít, és
a Playwright Chromiummal PDF-be nyomtatja. A PDF-ek verziózottak, ezért tartalomváltozás után újra kell
gyártani és commitolni őket. A gyártás hibával leáll, ha egy PDF kettőnél több oldalas lenne.

## Claude Code

A projekt skilljei a `.claude/skills/`, az ágens a `.claude/agents/`, a hookok a `.claude/hooks/` mappában vannak:

| Skill / ágens           | Mire való                                       |
| ----------------------- | ----------------------------------------------- |
| `/edit-content`         | a tartalom szerkesztése mindkét nyelven         |
| `/document-components`  | a részegységek dokumentálása a `docs/` mappában |
| `project-conventions`   | háttértudás a konvenciókról                     |
| `a11y-reviewer` (ágens) | hozzáférhetőségi átvizsgálás                    |
