---
name: edit-content
description: A portfólió tartalmának (munkahelyek, projektek, képességek, tanulmányok) szerkesztése a src/app/data/content.ts fájlban.
disable-model-invocation: true
---

# Tartalom szerkesztése

Az oldal minden szövege a `src/app/data/content.ts` fájlban van; a komponensek csak megjelenítik.

1. Olvasd el a fájlt, és a kért változtatást ott végezd el (`profile`, `jobs`, `skills`, `studies`, `filterTech`).
2. **Csak valós adatot írj be.** Forrás: a felhasználó üzenete, az önéletrajza, a LinkedIn-profilja. Ha egy adat (dátum, szerep, technológia) nem ismert, kérdezz, ne találj ki semmit. Telefonszám, születési adat és lakcím nem kerülhet az oldalra.
3. Munkahely alatti projekt: a `jobs[].projects` listába kerül (név, opcionális `role` és `url`, rövid leírás), külön munkahelyként ne.
4. Új technológia a szűrőben: add hozzá a `filterTech`-hez, és az érintett `jobs[].tech` listákhoz.
5. A szövegek magyarul, tegező vagy első személyű stílusban készüljenek, rövid, konkrét mondatokkal.
6. Végül futtasd az `npm run build` parancsot, és jelezd, ha hibát talál.
