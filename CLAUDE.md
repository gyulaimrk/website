# Gyulai Márk – portfólió

Magyar nyelvű portfólió oldal, Angular 22 (standalone, signals, zoneless), SCSS, Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

## Parancsok
- `npm ci` – függőségek (a `package-lock.json` verziózott)
- `npm start` – fejlesztői szerver (http://localhost:4200)
- `npm test -- --watch=false` – egységtesztek (Vitest + jsdom, `ng test`)
- `npm run build` – éles build (előrenderelt `/hu`, `/en`, `404`, utána a `postbuild` szkript): `dist/portfolio/browser`
- `npm run e2e` – Playwright E2E tesztek az éles buildre, Cloudflare helyi szerveren (előbb `npm run build`; ha nincs telepített Playwright-böngésző: `E2E_CHROMIUM_PATH=<chromium útvonala>`)
- `npm run cv` – a letölthető önéletrajz (PDF) újragyártása a `public/cv/` mappába; tartalomváltozás után kell futtatni, és a PDF-eket commitolni
- `npm run preview` – build és helyi Cloudflare előnézet (`wrangler dev`)
- `npm run deploy` – build és telepítés (`wrangler login` kell hozzá)

## Hol találod mit
- **Dokumentáció:** `docs/` (indexe: `docs/README.md`): architektúra, fejlesztés, tartalom, és részegységenként a `docs/components/`. Frissítése a `/document-components` skillel.
- **Skillek:** `.claude/skills/`: `edit-content` (tartalom mindkét nyelven), `document-components` (dokumentáció), `project-conventions` (háttértudás).
- **Ágens:** `.claude/agents/a11y-reviewer.md` (hozzáférhetőségi átvizsgálás).
- **Hookok:** `.claude/hooks/` (formázás, védelem, build- és tesztellenőrzés a kör végén); beállításuk a `.claude/settings.json`-ban van.
- **Tartalom:** `src/app/data/content.hu.ts` és `content.en.ts`; **tesztek:** a komponensek mellett `*.spec.ts`, az E2E tesztek az `e2e/` mappában.

## Konvenciók röviden
- Kétnyelvű oldal: szöveg csak a tartalomfájlokban van, a komponensek a `ContentService`-ből olvasnak.
- A tartalom csak valós adat lehet; hiányzó adatnál kérdezni kell.
- Minden komponens standalone, külön `.ts`, `.html`, `.scss` és `.spec.ts` fájllal.
- SOLID, DRY, KISS; egy komponens egy felelősség.
- Módosítás után az egységteszt és a build hibátlan legyen; látható funkcióhoz E2E teszt is jár.

## Felépítés
Minden komponens saját mappában, négy külön fájllal: `név.ts`, `név.html`, `név.scss`, `név.spec.ts`. Minden komponens standalone.
- `src/app/data/` – `models.ts` (típusok), `content.hu.ts` és `content.en.ts` (a két nyelv teljes tartalma és felületi szövegei), `content.ts` (`CONTENTS`), `content.spec.ts` (a két nyelv szerkezetének egyezését is ellenőrzi)
- `src/app/pages/` – az útvonalak oldalai: `portfolio` (a `/hu` és `/en` oldal, összeállítja a szekciókat), `root-redirect` (`/`: a látogató nyelvére visz), `not-found` (`404`, `noindex`)
- `src/app/core/` – szolgáltatások: `LanguageService` (nyelv, az URL `:lang` paraméteréből; csak tudatos váltáskor tárol), `language.guard` (érvénytelen nyelvkód → 404), `site-origin.ts` (`SITE_ORIGIN`) és `site.config.ts` (az injektálható párja), `ContentService` (az aktuális nyelv tartalma, ebből olvasnak a komponensek), `ThemeService` (téma), `SeoService` (cím és meta), `ScrollSpyService` (aktív menüpont), `storage` (biztonságos localStorage), `prefers-reduced-motion`
- `src/app/cv/` – az önéletrajz HTML-je (`render-cv.ts`, a content fájlokból) és a `cv-entry.ts`, amit a `scripts/build-cv.mjs` használ (esbuild + Playwright Chromium PDF)
- `src/app/shared/` – újrahasznosítható építőelemek: `anchor-link` (a `<base href="/">` miatt a sima `#id` link nem működik: oldalon belüli ugráshoz mindig `appAnchor`-t használj), `button`, `card`, `chip-list`, `section-heading`, `reveal`, `typewriter`, `code-window`, `theme-toggle`, `language-toggle`, `back-to-top`
- `src/app/sections/` – az oldal szekciói: `nav`, `hero`, `about`, `skills`, `ai-workflow` (Hogyan dolgozom AI-val), `experience` (+ `job-card`, nyitható projektlista), `side-projects` (+ `project-card`), `education` (+ `study-item`), `contact`, `footer`
- `src/styles.scss` – design tokenek (sötét és világos téma) és globális stílus
- `src/index.html` – statikus SEO (meta, Open Graph, JSON-LD), `public/` – favicon, `og-image.png`, `robots.txt`, `_headers` (gyorsítótár)
- `wrangler.jsonc` – Cloudflare assets konfiguráció (`404-page`, `drop-trailing-slash`); `.github/workflows/ci.yml` – egységteszt, build, E2E és deploy; `playwright.config.ts` + `e2e/` – E2E tesztek; `scripts/postbuild.mjs` – `404.html` másolása, és sitemap, ha van `SITE_ORIGIN`

## Útvonalak, előrenderelés, nyelv
- Az oldal két nyelvi címen él: `/hu` és `/en` (`app.routes.ts`, `:lang` paraméter); `/` a látogató nyelvére irányít. Az `ng build` statikusan előrenderel (`app.routes.server.ts`, `outputMode: static`), a hidratálás eseményismétléssel fut. Új nyelv: `content.xx.ts`, `CONTENTS`/`LANGS` bővítése; az útvonalak a `LANGS`-ból jönnek.
- Előrenderelhető kód: `document`, `localStorage`, időzítők csak `DOCUMENT`/`isPlatformBrowser`/`afterNextRender` mögött. Az első megjelenítés determinisztikus (a téma `dark`-ról indul, a gépelő az első szóval), különben hidratálási hiba lesz.
- `SITE_ORIGIN` (`core/site-origin.ts`) üres, amíg az oldal nincs kitelepítve: ilyenkor nincs canonical, hreflang, `og:url` és sitemap. Kitelepítéskor itt kell megadni egyszer (`https://…`, záró perjel nélkül), a `postbuild` a sitemapet és a robots.txt hivatkozását is ebből készíti.
- Az `inMemoryRouting` build (`--configuration preview`) csak az Artifact-előnézethez kell (nincs valódi URL, a nyelvváltás memóriában történik); éles buildhez sosem használjuk.

## Szabályok
- Kétnyelvű oldal (magyar és angol). Szöveg nem kerülhet a komponensekbe: minden a `content.hu.ts` és `content.en.ts` fájlokban van, a komponensek a `ContentService`-ből olvasnak. Új szöveg mindkét nyelven kell; a `content.spec.ts` jelzi, ha a két nyelv szerkezete eltér.
- A tartalom csak valós adat lehet (önéletrajz, LinkedIn). Kitalálni nem szabad; ha hiányzik adat, kérdezz. Telefonszám, születési dátum, lakcím nem kerülhet az oldalra.
- Mellékprojektként szerepel a lizacover.hu (Ivanovszki Elizabet grafikus portfóliója, `gyulaimrk/ie-fe` repó) és ez a portfólió maga (forráskód-linkkel, élő cím nélkül, amíg nincs kitelepítve).
- Elvek, amelyeket az oldal megnevez: clean code, SOLID, DRY, KISS (Tervezés, Rólam), ACID és tranzakciókezelés (Tervezés, minden adatbázist használó projektnél), FIRST (Tesztelés). A Helvo múlt idejű (lezárult), a MOL Limo és a GLI jelen idejű.
- Projektenként használt eszközök (`JobProject.tech`): MOL Limo – Jenkins, GitLab; Helvo – GitLab, ArgoCD; McDonald’s – GitHub, ArgoCD; GLI Solutions – Azure DevOps; az EPAM-os projektek (Broadridge, multitenant keretrendszer, belső vizsgarendszer) – Jenkins, GitLab; minden munkahelyi projekthez Jira és Confluence, a Plane csak az Adroit munkahely címkéi között szerepel (nem projektenként); a mellékprojektek – GitHub, GitHub Actions.
- Mentorálás: az EPAM-nál junior fejlesztőt mentorált, az RDI-nál nem hivatalosan egy junior munkatársat; ez szerepel a két munkahelynél és a Rólam szövegben.
- Nemzetközi csapatok: a Broadridge, a McDonald’s és a Helvo projekt nemzetközi csapatokkal zajlott, és a tulajdonos számára természetes a nemzetközi együttműködés; ez szerepel a Rólam szövegben és a projektleírásokban.
- Megfogalmazás: a projektleírásokban „a csapatommal” (egyes szám első személyű „én” helyett), kivéve a MOL Limo rent a car, ahol egyedül végzett munka szerepel.
- Projektek munkahelyenként (összesen 7, ennyi szerepel a statisztikában): Adroit: MOL Limo rent a car (Kotlin backend: számítások, aszinkron szinkronizálás, PostgreSQL, saját OAuth Spring Security-vel, @Scheduled, design-first), Helvo (svájci pénzügyi startup; backend for frontend, Kotlin, Spring Boot 4, OpenAPI design-first), GLI Solutions (AI Consultant és fejlesztő: manuális tesztelést segítő platform, code-first (C#/.NET backend, PostgreSQL, Node.js, Angular, MCP szerverként agentekhez köthető), hibakezelés, clean code, repó szintű AI skillek, dokumentáció); RDI: McDonald’s (felhasználói fiókok, authentikáció, autorizáció); EPAM: Broadridge pénzügyi alkalmazás (juniorként és Software Engineerként is ugyanaz a projekt), a hozzá tartozó multitenant keretrendszer, és az EPAM belső vizsgarendszere (junior; nem Broadridge; Spring Boot 3, MySQL, JUnit). A Broadridge-projekt két szerepnél is szerepel, de egy projektnek számít. A Railnet (rövid ideig, nem számottevő) a tulajdonos kérésére kimaradt. A projektekhez nincs külön dátum.
- Design (modern, hagyományos fejlesztői portfólió): Space Grotesk (cím) és Inter (szöveg), betűk helyben (`@fontsource`). Indigó–lila–ciánkék átmenet kiemelés, üveghatású kártyák, sötét és világos téma (`data-theme`, tokenek a `styles.scss`-ben). Hero: gépelő szerep, Kotlin kódablak, statisztikák. Az idővonal csak időrendhez használható. Mozgás: belépő animáció, lebegő háttérfények, hover; mozgáscsökkentési tartalék kötelező.
- Kódelvek: SOLID, DRY, KISS. Egy komponens egy felelősség (a szekció összeállít, a kis komponens megjelenít); ismétlődő UI-t shared komponensbe emelj; ne építs többet, mint amit a feladat kér. A szekciók a `data/content.ts`-ből dolgoznak, a hard-kódolt szöveg a komponensekben kerülendő.
- Minden új komponenshez készül `.html`, `.scss` és `.spec.ts` fájl is (nincs inline template/style). A spec a viselkedést teszteli, nem a megvalósítást.
- Hozzáférhetőség és SEO: egyetlen `h1`, tartalomra ugró link, `aria-current` az aktív menüponton, látható fókusz, a szöveg kontrasztja legalább 4,5:1 mindkét témában (a Lighthouse minden kategóriában 90 fölött). A színeket tokenekből vedd, szövegszínnek `--accent-text`-et használj, ne `--accent-3`-at.
- Módosítás után `npm test -- --watch=false` és `npm run build` hibátlan legyen.
- A portréfotó valódi (`public/mark-gyulai.jpg`, a `profile.photo` mutat rá); a hero kódablaka két fület mutat: alapból a profilból épített példányt (`Main.kt`, `hero.ts`), utána a `Developer` data classt (`codeSamples`).
- Önéletrajz: a `profile.cv` útvonalra mutat (`public/cv/*.pdf`), a PDF-et az `npm run cv` készíti a content fájlokból. Tartalmi változás után újra kell gyártani és commitolni. Tanúsítványlink: `Study.url` (csak valós, a felhasználó által megadott cím; kitalálni nem szabad).
- Tesztelés: egységteszt a viselkedésre (Vitest), E2E a teljes útvonalra (`e2e/`, a content fájlokból olvassa az elvárt szöveget, nem másolja). Új, felhasználó által látható funkcióhoz E2E teszt is jár.

## Claude-automatizálás
- `.claude/settings.json` hookok: Prettier formázás szerkesztés után, generált fájlok (`package-lock.json`, `dist/`, `.env`) védelme, `ng build` ellenőrzés a kör végén.
- Skillek: `/edit-content` (tartalom szerkesztése mindkét nyelven), `/document-components` (részegységek dokumentálása a `docs/` mappában), `project-conventions` (háttértudás).
- Ágens: `a11y-reviewer` (hozzáférhetőségi átvizsgálás).
- `.mcp.json`: context7 és Playwright MCP.
