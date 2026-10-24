---
name: project-conventions
description: A portfólió projekt szabályai (Angular, stílus, design, nyelv). Háttértudás minden kódváltoztatáshoz.
user-invocable: false
---

# Projektkonvenciók

**Technológia:** Angular 22, standalone komponensek, signals, zoneless, új vezérlési szerkezetek (`@if`, `@for`), SCSS. Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

**Felépítés:** `src/app/sections/` a szekciók, `src/app/shared/` az újrahasznosítható építőelemek (button, card, chip-list, section-heading, reveal, typewriter, code-window, theme-toggle), `src/app/core/` a segédek és a téma, `src/app/data/` a modellek és a teljes tartalom, `src/styles.scss` a design tokenek.

**Komponensek:** minden komponens saját mappában, külön `.ts`, `.html`, `.scss` és `.spec.ts` fájllal (nincs inline template vagy style). SOLID, DRY, KISS: egy felelősség komponensenként, az ismétlődő UI shared komponensbe kerül, bemenetek `input()`, kétirányú állapot `model()`, kimenet signalokkal; nincs felesleges absztrakció. Új komponenshez írj specet (Vitest, `ng test`).

**Design (modern fejlesztői portfólió):**
- Betűk: Space Grotesk (címek) és Inter (szöveg), helyben betöltve. Színek és téma csak a tokenekből (`--bg`, `--card`, `--text`, `--muted`, `--accent`, `--accent-2`, `--accent-3`, `--gradient`); a világos és sötét téma tokenjei a `styles.scss`-ben.
- Üveghatású kártyák (`app-card`), színátmenetes elsődleges gomb, hero gépelő szöveggel és kódablakkal. Idővonal csak időrendi tartalomhoz.
- Mozgás: belépő animáció (`appReveal`), lebegő háttérfények, hover. `prefers-reduced-motion` tartalék kötelező.

**Szöveg:** magyar. A tartalom csak valós adat lehet (önéletrajz, LinkedIn); nincs kitalált ügyfél, szám vagy idézet. Személyes adat (telefon, születési dátum, lakcím) nem kerül az oldalra.

**Ellenőrzés:** `npm test -- --watch=false` és `npm run build` hibátlan legyen. Vizuális változtatás után az inspector futtatása és a képernyőképek átnézése.
