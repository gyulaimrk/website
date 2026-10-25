---
name: document-components
description: A komponensek, direktívák, szolgáltatások és egyéb részegységek dokumentálása a docs/ mappában. Használd új vagy módosított részegység után, vagy ha a docs/ elavult.
---

# Részegységek dokumentálása

A dokumentáció a `docs/` mappában van, magyarul, és a **kódból** készül: nem írsz le olyat, amit nem olvastál ki a forrásból.

## Hová kerül

| Részegység                                      | Fájl                          |
| ----------------------------------------------- | ----------------------------- |
| `src/app/pages/`                                | `docs/components/pages.md`    |
| `src/app/sections/` (és al-komponenseik)        | `docs/components/sections.md` |
| `src/app/shared/`                               | `docs/components/shared.md`   |
| `src/app/core/` (szolgáltatások, őrök, segédek) | `docs/components/core.md`     |
| `src/app/cv/`                                   | `docs/components/cv.md`       |
| Szerkezet, útvonalak, adatfolyam                | `docs/architecture.md`        |
| Parancsok, tesztelés, CI, kitelepítés           | `docs/development.md`         |
| Tartalom és adatmodell                          | `docs/content.md`             |

Új mappa vagy téma esetén vedd fel a `docs/README.md` tartalomjegyzékébe is.

## Egy részegység bejegyzése

Minden komponens, direktíva és szolgáltatás egy `###` címet kap a szelektorával vagy nevével, ezen a szerkezeten:

1. **Egy mondat arról, mit csinál** (egy felelősség; ha ez nem fér egy mondatba, jelezd).
2. **Bemenetek** (`input()`), kimenetek, ha vannak: név, típus, alapérték, jelentés. Táblázatban.
3. **Használat**: rövid kódpélda a szelektorral, ha nem triviális.
4. **Viselkedés és kivételek**: ami nem látszik a névből (például hidratálás, mozgáscsökkentés, billentyűkezelés, melyik szolgáltatást használja).
5. **Tesztek**: melyik `.spec.ts` fedi, és mit ellenőriz röviden.

## Munkamenet

1. Nézd meg, mi változott (`git diff --name-only`), és olvasd el az érintett `.ts`, `.html` és `.spec.ts` fájlokat.
2. Frissítsd vagy add hozzá a bejegyzést; töröld az elavultat. A bejegyzések sorrendje a mappa betűrendje.
3. Ellenőrizd, hogy minden mappában lévő komponensnek van bejegyzése, és egy bejegyzés sem hivatkozik nem létező fájlra vagy bemenetre.
4. Ha a szerkezet (útvonal, adatfolyam, parancs) változott, az `architecture.md` és a `development.md` is frissüljön.

## Szabályok

- Magyarul írj, rövid mondatokkal, felsorolás helyett inkább folyó szöveggel, ahol magyarázol.
- A kódot, parancsot és fájlnevet `kódformában` jelöld.
- Ne másold be a forráskódot; a dokumentáció azt mondja el, amit a kódból nem látni azonnal.
- Ne találj ki tulajdonságot: ami nem biztos, azt olvasd ki a kódból vagy hagyd ki.
- A dokumentáció nem tartalmaz személyes adatot (telefonszám, születési dátum, lakcím).
