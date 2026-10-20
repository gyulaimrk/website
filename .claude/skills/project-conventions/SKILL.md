---
name: project-conventions
description: A portfólió projekt szabályai (Angular, stílus, design, nyelv). Háttértudás minden kódváltoztatáshoz.
user-invocable: false
---

# Projektkonvenciók

**Technológia:** Angular 22, standalone komponensek, signals, zoneless, új vezérlési szerkezetek (`@if`, `@for`), SCSS. Node 24 LTS. Hosting: Cloudflare (Wrangler), CI: GitHub Actions.

**Felépítés:** `src/app/sections/` a szekciók (kisebb részkomponensekkel), `src/app/shared/` az újrahasznosítható építőelemek, `src/app/core/` a segédek, `src/app/data/` a modellek és a teljes tartalom, `src/styles.scss` a design tokenek.

**Komponensek:** minden komponens saját mappában, külön `.ts`, `.html`, `.scss` és `.spec.ts` fájllal (nincs inline template vagy style). SOLID, DRY, KISS: egy felelősség komponensenként, az ismétlődő UI shared komponensbe kerül, bemenetek `input()`, kétirányú állapot `model()`, kimenet signalokkal; nincs felesleges absztrakció. Új komponenshez írj specet (Vitest, `ng test`).

**Design (design-taste-frontend skill szerint):**
- Egy betűtípus: Hanken Grotesk (helyben, `@fontsource`). Mono csak kódblokkban.
- Színek csak a tokenekből: `--bg`, `--surface`, `--paper`, `--ink`, `--muted`, `--accent`.
- Tilos: gradiens, árnyék pihenő elemen, vékony vonal vagy keret, ikonos kártya, emoji, kis nagybetűs címke, sorszámozás (01/02), eyebrow felirat.
- Címsor legfeljebb két sor minden szélességen; szövegméret legalább 14px; egyforma külső margó (`--margin`).
- Minden animáció `transform`/`opacity`, `prefers-reduced-motion` tartalék kötelező.

**Szöveg:** magyar. A tartalom csak valós adat lehet (önéletrajz, LinkedIn); nincs kitalált ügyfél, szám vagy idézet. Személyes adat (telefon, születési dátum, lakcím) nem kerül az oldalra.

**Ellenőrzés:** `npm test -- --watch=false` és `npm run build` hibátlan legyen. Vizuális változtatás után az inspector futtatása és a képernyőképek átnézése.
