---
name: project-conventions
description: A portfólió projekt szabályai (Angular, stílus, design, nyelv). Háttértudás minden kódváltoztatáshoz.
user-invocable: false
---

# Projektkonvenciók

**Technológia:** Angular 22, standalone komponensek, signals, zoneless, új vezérlési szerkezetek (`@if`, `@for`), SCSS. Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

**Felépítés:** `src/app/sections/` a szekciók, `src/app/shared/` az újrahasznosítható építőelemek (island, button, chip-list, section-heading), `src/app/core/` a segédek, `src/app/data/` a modellek és a teljes tartalom, `src/styles.scss` a design tokenek.

**Komponensek:** minden komponens saját mappában, külön `.ts`, `.html`, `.scss` és `.spec.ts` fájllal (nincs inline template vagy style). SOLID, DRY, KISS: egy felelősség komponensenként, az ismétlődő UI shared komponensbe kerül, bemenetek `input()`, kétirányú állapot `model()`, kimenet signalokkal; nincs felesleges absztrakció. Új komponenshez írj specet (Vitest, `ng test`).

**Design (frontend-design skill, "Szigetek" koncepció):**
- Metafora: a Java és a Kotlin valódi szigetek; az oldal a tenger (`--sea`), a tartalom szigeteken (`app-island`) áll. A pályafutás útvonal, mert az időrend valódi sorrend.
- Betűk: Young Serif (címek) és Albert Sans (szöveg), helyben betöltve. Színek csak a tokenekből (`--sea`, `--deep`, `--foam`, `--sun`, `--mint`, `--coral`, `--ink`).
- Kerülendő sablonjegyek: krém és terrakotta, hajszálvonal, azonos kártyák rácsban, kis nagybetűs címke vagy eyebrow, monospace címke, nyíl a gombok szövegében, pontokkal tagolt meta-sor, egy szó kiemelése a címsorban.
- Mozgás: egy oldalbetöltési jelenet (hero), egyébként csak interakcióra válaszoló mozgás. `prefers-reduced-motion` tartalék kötelező.

**Szöveg:** magyar. A tartalom csak valós adat lehet (önéletrajz, LinkedIn); nincs kitalált ügyfél, szám vagy idézet. Személyes adat (telefon, születési dátum, lakcím) nem kerül az oldalra.

**Ellenőrzés:** `npm test -- --watch=false` és `npm run build` hibátlan legyen. Vizuális változtatás után az inspector futtatása és a képernyőképek átnézése.
