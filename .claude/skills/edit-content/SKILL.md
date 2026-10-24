---
name: edit-content
description: A portfólió tartalmának (munkahelyek, projektek, képességek, tanulmányok, felületi szövegek) szerkesztése magyarul és angolul.
disable-model-invocation: true
---

# Tartalom szerkesztése

Az oldal minden szövege két fájlban van: `src/app/data/content.hu.ts` (magyar) és `src/app/data/content.en.ts` (angol). A komponensek a `ContentService`-ből olvasnak.

1. Olvasd el mindkét fájlt, és **ugyanazt a változtatást végezd el mindkettőn**. A két nyelv szerkezete (kulcsok, listák hossza) azonos kell legyen; a `content.spec.ts` ezt ellenőrzi.
2. **Csak valós adatot írj be.** Forrás: a felhasználó üzenete, az önéletrajza, a LinkedIn-profilja. Ha egy adat (dátum, szerep, technológia) nem ismert, kérdezz, ne találj ki semmit. Telefonszám, születési adat és lakcím nem kerülhet az oldalra.
3. Munkahely alatti projekt: a `jobs[].projects` listába kerül (név, opcionális `role` és `url`, rövid leírás), külön munkahelyként ne.
4. A szövegek természetes, folyó nyelven készüljenek (magyarul első személyben, angolul is), ne felsorolásként. A technológia-címkék (`tech`) maradhatnak rövid szavak.
5. Linkek, e-mail, számok és technológianevek mindkét nyelven azonosak.
6. Végül futtasd az `npm test -- --watch=false` és az `npm run build` parancsot, és jelezd, ha hibát találnak.
