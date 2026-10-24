---
name: project-conventions
description: A portfólió projekt szabályai (Angular, stílus, design, nyelv). Háttértudás minden kódváltoztatáshoz.
user-invocable: false
---

# Projektkonvenciók

**Technológia:** Angular 22, standalone komponensek, signals, zoneless, új vezérlési szerkezetek (`@if`, `@for`), SCSS. Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

**Felépítés:** `src/app/pages/` az útvonalak oldalai (`/hu`, `/en`, `/`, `404`), `src/app/cv/` az önéletrajz-PDF forrása, `src/app/sections/` a szekciók, `src/app/shared/` az újrahasznosítható építőelemek, `src/app/core/` a szolgáltatások (nyelv, tartalom, téma, SEO, scroll-spy) és segédek, `src/app/data/` a modellek és a kétnyelvű tartalom (`content.hu.ts`, `content.en.ts`), `src/styles.scss` a design tokenek.

**Útvonalak és előrenderelés:** az oldal statikusan előrenderelt, nyelvenként saját címmel (`/hu`, `/en`). Böngészőspecifikus kód (`document`, `localStorage`, időzítő) csak `DOCUMENT`, `isPlatformBrowser` vagy `afterNextRender` mögött. Oldalon belüli ugráshoz `appAnchor`, nem sima `#id` link (a `<base href="/">` miatt).

**Kétnyelvűség:** szöveg nem kerülhet a komponensekbe. Minden magyarul és angolul is a tartalomfájlokban van, a komponensek a `ContentService`-ből (`content()` signal) olvasnak. Új szöveg mindkét nyelven kell.

**Komponensek:** minden komponens saját mappában, külön `.ts`, `.html`, `.scss` és `.spec.ts` fájllal (nincs inline template vagy style). SOLID, DRY, KISS: egy felelősség komponensenként, az ismétlődő UI shared komponensbe kerül, bemenetek `input()`, kétirányú állapot `model()`, kimenet signalokkal; nincs felesleges absztrakció. Új komponenshez írj specet (Vitest, `ng test`).

**Design (modern fejlesztői portfólió):**
- Betűk: Space Grotesk (címek) és Inter (szöveg), helyben betöltve. Színek és téma csak a tokenekből (`--bg`, `--card`, `--text`, `--muted`, `--accent`, `--accent-2`, `--accent-3`, `--gradient`); a világos és sötét téma tokenjei a `styles.scss`-ben.
- Üveghatású kártyák (`app-card`), színátmenetes elsődleges gomb, hero gépelő szöveggel és kódablakkal. Idővonal csak időrendi tartalomhoz.
- Mozgás: belépő animáció (`appReveal`), lebegő háttérfények, hover. `prefers-reduced-motion` tartalék kötelező.

**Hozzáférhetőség:** a kontraszt legalább 4,5:1 mindkét témában; szövegszínnek `--accent-text`-et használj. Minden vezérlőnek legyen látható fókusza és (ikonnál) felirata, a felirat tartalmazza a látható szöveget.

**Szöveg:** magyar. A tartalom csak valós adat lehet (önéletrajz, LinkedIn); nincs kitalált ügyfél, szám vagy idézet. Személyes adat (telefon, születési dátum, lakcím) nem kerül az oldalra.

**Ellenőrzés:** `npm test -- --watch=false` és `npm run build` hibátlan legyen; felhasználói funkciónál `npm run e2e` is (előbb build). Tartalomváltozás után `npm run cv`. Vizuális változtatás után az inspector futtatása és a képernyőképek átnézése.
