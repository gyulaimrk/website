# Dokumentáció

Gyulai Márk kétnyelvű (magyar és angol) portfóliója: Angular 22, előrenderelve, Cloudflare-en tárolva.
Ez a mappa a fejlesztőknek szól; a gyors indulás a gyökér `README.md`-ben van.

## Tartalom

| Dokumentum                                     | Miről szól                                                    |
| ---------------------------------------------- | ------------------------------------------------------------- |
| [Architektúra](architecture.md)                | Szerkezet, útvonalak, adatfolyam, előrenderelés, SEO          |
| [Fejlesztés](development.md)                   | Parancsok, tesztelés, CI, kitelepítés, az önéletrajz gyártása |
| [Tartalom](content.md)                         | Hogyan szerkeszthető a tartalom, az adatmodell, a szabályok   |
| [Oldalak](components/pages.md)                 | `src/app/pages/`: útvonalak oldalai                           |
| [Szekciók](components/sections.md)             | `src/app/sections/`: az oldal szekciói                        |
| [Megosztott építőelemek](components/shared.md) | `src/app/shared/`: gomb, kártya, kódablak, direktívák         |
| [Szolgáltatások](components/core.md)           | `src/app/core/`: nyelv, téma, SEO, görgetésfigyelő            |
| [Önéletrajz](components/cv.md)                 | `src/app/cv/`: a letölthető PDF forrása                       |

## Karbantartás

A részegységek dokumentációját a `/document-components` skill frissíti; a szabályait a
`.claude/skills/document-components/SKILL.md` írja le. A projekt szabályai a gyökér `CLAUDE.md`-ben vannak.
