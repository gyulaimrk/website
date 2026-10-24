# Gyulai Márk – portfólió

Magyar nyelvű portfólió oldal, Angular 22 (standalone, signals, zoneless), SCSS, Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

## Parancsok
- `npm ci` – függőségek (a `package-lock.json` verziózott)
- `npm start` – fejlesztői szerver (http://localhost:4200)
- `npm test -- --watch=false` – egységtesztek (Vitest + jsdom, `ng test`)
- `npm run build` – éles build: `dist/portfolio/browser`
- `npm run preview` – build és helyi Cloudflare előnézet (`wrangler dev`)
- `npm run deploy` – build és telepítés (`wrangler login` kell hozzá)

## Felépítés
Minden komponens saját mappában, négy külön fájllal: `név.ts`, `név.html`, `név.scss`, `név.spec.ts`. Minden komponens standalone.
- `src/app/data/` – `models.ts` (típusok), `content.hu.ts` és `content.en.ts` (a két nyelv teljes tartalma és felületi szövegei), `content.ts` (`CONTENTS`), `content.spec.ts` (a két nyelv szerkezetének egyezését is ellenőrzi)
- `src/app/core/` – szolgáltatások: `LanguageService` (nyelv), `ContentService` (az aktuális nyelv tartalma, ebből olvasnak a komponensek), `ThemeService` (téma), `SeoService` (cím és meta), `ScrollSpyService` (aktív menüpont), `storage` (biztonságos localStorage), `prefers-reduced-motion`
- `src/app/shared/` – újrahasznosítható építőelemek: `button`, `card`, `chip-list`, `section-heading`, `reveal`, `typewriter`, `code-window`, `theme-toggle`, `language-toggle`, `back-to-top`
- `src/app/sections/` – az oldal szekciói: `nav`, `hero`, `about`, `skills`, `experience` (+ `job-card`), `side-projects` (+ `project-card`), `education`, `contact`, `footer`
- `src/styles.scss` – design tokenek (sötét és világos téma) és globális stílus
- `src/index.html` – statikus SEO (meta, Open Graph, JSON-LD), `public/` – favicon, `og-image.png`, `robots.txt`, `_headers` (gyorsítótár)
- `wrangler.jsonc` – Cloudflare assets konfiguráció; `.github/workflows/ci.yml` – teszt, build és deploy

## Szabályok
- Kétnyelvű oldal (magyar és angol). Szöveg nem kerülhet a komponensekbe: minden a `content.hu.ts` és `content.en.ts` fájlokban van, a komponensek a `ContentService`-ből olvasnak. Új szöveg mindkét nyelven kell; a `content.spec.ts` jelzi, ha a két nyelv szerkezete eltér.
- A tartalom csak valós adat lehet (önéletrajz, LinkedIn). Kitalálni nem szabad; ha hiányzik adat, kérdezz. Telefonszám, születési dátum, lakcím nem kerülhet az oldalra.
- Mellékprojektként szerepel a lizacover.hu (Ivanovszki Elizabet grafikus portfóliója, `gyulaimrk/ie-fe` repó) és ez a portfólió maga (forráskód-linkkel, élő cím nélkül, amíg nincs kitelepítve).
- Projektek munkahelyenként (összesen 8, ennyi szerepel a statisztikában): Adroit: MOL Limo rent a car, Railnet, Helvo (svájci startup), GLI Solutions (AI Consultant); RDI: McDonald’s (felhasználói fiókok, authentikáció, autorizáció); EPAM: Broadridge pénzügyi alkalmazás (juniorként és Software Engineerként is ugyanaz a projekt), a hozzá tartozó multitenant keretrendszer, és az EPAM belső vizsgarendszere (junior; nem Broadridge). A Broadridge-projekt két szerepnél is szerepel, de egy projektnek számít. A projektekhez nincs külön dátum.
- Design (modern, hagyományos fejlesztői portfólió): Space Grotesk (cím) és Inter (szöveg), betűk helyben (`@fontsource`). Indigó–lila–ciánkék átmenet kiemelés, üveghatású kártyák, sötét és világos téma (`data-theme`, tokenek a `styles.scss`-ben). Hero: gépelő szerep, Kotlin kódablak, statisztikák. Az idővonal csak időrendhez használható. Mozgás: belépő animáció, lebegő háttérfények, hover; mozgáscsökkentési tartalék kötelező.
- Kódelvek: SOLID, DRY, KISS. Egy komponens egy felelősség (a szekció összeállít, a kis komponens megjelenít); ismétlődő UI-t shared komponensbe emelj; ne építs többet, mint amit a feladat kér. A szekciók a `data/content.ts`-ből dolgoznak, a hard-kódolt szöveg a komponensekben kerülendő.
- Minden új komponenshez készül `.html`, `.scss` és `.spec.ts` fájl is (nincs inline template/style). A spec a viselkedést teszteli, nem a megvalósítást.
- Hozzáférhetőség és SEO: egyetlen `h1`, tartalomra ugró link, `aria-current` az aktív menüponton, látható fókusz, a szöveg kontrasztja legalább 4,5:1 mindkét témában (a Lighthouse minden kategóriában 90 fölött). A színeket tokenekből vedd, szövegszínnek `--accent-text`-et használj, ne `--accent-3`-at.
- Módosítás után `npm test -- --watch=false` és `npm run build` hibátlan legyen.
- A kép nélküli állapot ismert hiány: valódi fotók még nincsenek, a grafikák rajzoltak.

## Claude-automatizálás
- `.claude/settings.json` hookok: Prettier formázás szerkesztés után, generált fájlok (`package-lock.json`, `dist/`, `.env`) védelme, `ng build` ellenőrzés a kör végén.
- Skillek: `/edit-content` (tartalom szerkesztése mindkét nyelven), `project-conventions` (háttértudás).
- Ágens: `a11y-reviewer` (hozzáférhetőségi átvizsgálás).
- `.mcp.json`: context7 és Playwright MCP.
