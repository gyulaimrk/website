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
Minden komponens saját mappában, négy külön fájllal: `név.ts`, `név.html`, `név.scss`, `név.spec.ts`.
- `src/app/data/` – `models.ts` (típusok) és `content.ts` (az oldal teljes tartalma), `content.spec.ts`
- `src/app/core/` – keretrendszer-független segédek (`prefers-reduced-motion`)
- `src/app/shared/` – újrahasznosítható építőelemek: `island` (szerves formájú tartalomhordozó), `button`, `chip-list`, `section-heading`
- `src/app/sections/` – az oldal szekciói: `nav`, `hero` (név és a Java/Kotlin szigetek), `about`, `route` (+ `route-stop`: az útvonal munkahelyi megállói), `archipelago` (eszköztár), `contact`, `footer`
- `src/styles.scss` – design tokenek és globális stílus
- `wrangler.jsonc` – Cloudflare assets konfiguráció; `.github/workflows/ci.yml` – teszt, build és deploy

## Szabályok
- A tartalom csak valós adat lehet (önéletrajz, LinkedIn). Kitalálni nem szabad; ha hiányzik adat, kérdezz. Telefonszám, születési dátum, lakcím nem kerülhet az oldalra.
- Adroit Group alatt projektként szerepel a GLI Solutions (AI Consultant) és a MOL Limo rent a car; ezekhez nincs külön dátum.
- Design: Hanken Grotesk, csak a tokenek színei; nincs gradiens, árnyék, vékony vonal, emoji, monospace, sorszámozás. Címsor legfeljebb két sor. Animáció csak `transform`/`opacity`, mozgáscsökkentési tartalékkal.
- Kódelvek: SOLID, DRY, KISS. Egy komponens egy felelősség (a szekció összeállít, a kis komponens megjelenít); ismétlődő UI-t shared komponensbe emelj; ne építs többet, mint amit a feladat kér. A szekciók a `data/content.ts`-ből dolgoznak, a hard-kódolt szöveg a komponensekben kerülendő.
- Minden új komponenshez készül `.html`, `.scss` és `.spec.ts` fájl is (nincs inline template/style). A spec a viselkedést teszteli, nem a megvalósítást.
- Módosítás után `npm test -- --watch=false` és `npm run build` hibátlan legyen.
- A kép nélküli állapot ismert hiány: valódi fotók még nincsenek, a grafikák rajzoltak.

## Claude-automatizálás
- `.claude/settings.json` hookok: Prettier formázás szerkesztés után, generált fájlok (`package-lock.json`, `dist/`, `.env`) védelme, `ng build` ellenőrzés a kör végén.
- Skillek: `/edit-content` (tartalom szerkesztése), `project-conventions` (háttértudás).
- Ágens: `a11y-reviewer` (hozzáférhetőségi átvizsgálás).
- `.mcp.json`: context7 és Playwright MCP.
