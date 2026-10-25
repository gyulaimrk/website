# Önéletrajz (`src/app/cv/`)

A letölthető önéletrajz (PDF) forrása. A tartalom ugyanaz, mint az oldalé, ezért nem térhet el tőle.

### `renderCv(lang, content, assets)` (`render-cv.ts`)

Egy nyelv teljes önéletrajzának HTML-je: fejléc fotóval és elérhetőségekkel, bemutatkozás, tapasztalat
(projektekkel és feladatokkal), eszköztár, mellékprojektek, tanulmányok és tanúsítványok. A szöveget HTML-escape-pel
írja ki. Ha az összes további tanúsítványt ugyanaz a kiállító adta, azt egyszer, a címben mutatja.

| Paraméter | Jelentés                                                 |
| --------- | -------------------------------------------------------- |
| `lang`    | `'hu'` vagy `'en'`; a `<html lang>` értéke               |
| `content` | az adott nyelv `Content` objektuma                       |
| `assets`  | `photo` (data URL) és `fontCss` (beágyazott betűtípusok) |

### `renderAllCv(assets)` (`cv-entry.ts`)

Belépési pont a `scripts/build-cv.mjs` számára: nyelvenként a HTML-t és a PDF fájlnevét (a `profile.cv`
útvonalából) adja.

## Gyártás

`npm run cv`: esbuild lefordítja a belépési pontot, a Playwright Chromium PDF-be nyomtat, az eredmény a
`public/cv/` mappába kerül. A gyártás hibával leáll, ha egy PDF kettőnél több oldalas.

**Tesztek:** `render-cv.spec.ts`: mindkét nyelven szerepel minden munkahely, projekt és tanúsítvány, nincs személyes adat, a
szöveg escape-elt, a közös kiállító kezelése.
