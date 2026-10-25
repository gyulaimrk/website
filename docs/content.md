# Tartalom

Az oldal minden szövege két fájlban van: `src/app/data/content.hu.ts` és `content.en.ts`. A típusok a
`src/app/data/models.ts`-ben vannak, a `content.ts` `CONTENTS` néven nyelv szerint adja ki a két tartalmat.

## Adatmodell

| Típus         | Mit ír le                                                                                |
| ------------- | ---------------------------------------------------------------------------------------- |
| `Profile`     | név, szerep, elérhetőségek, fotó, bemutatkozás, nyelvek, jogosítvány, önéletrajz-útvonal |
| `Job`         | munkahely: cég, szerep, időszak, leírás, projektek (`JobProject`), technológiák          |
| `JobProject`  | név, szerep, link, rövid szöveg és konkrét feladatok (`points`)                          |
| `Skill`       | eszköztár-kártya: cím, címke, szöveg, kiemelés                                           |
| `SideProject` | mellékprojekt: leírás, élő cím, forráskód, technológiák                                  |
| `Study`       | tanulmány vagy tanúsítvány: cím, kiállító, időszak, leírás, nyilvános link (`url`)       |
| `CodeFile`    | a kódablak egy fájlja: név, nyelv, tartalom                                              |
| `AiWorkflow`  | a „Hogyan dolgozom AI-val” szekció pontjai és a CLAUDE.md részlet                        |
| `Ui`          | az összes felületi szöveg: menü, gombok, szekciócímek, címkék                            |

## Szabályok

- **Kétnyelvűség:** minden változtatás mindkét fájlban megtörténik, azonos szerkezettel. A `content.spec.ts`
  jelzi, ha a két nyelv szerkezete eltér.
- **Csak valós adat:** önéletrajz, LinkedIn és a tulajdonos közlése a forrás. Kitalálni nem szabad, hiányzó
  adatnál kérdezni kell. Telefonszám, születési dátum és lakcím nem kerülhet az oldalra.
- **Szöveg nem kerülhet komponensbe:** a komponensek a `ContentService`-ből olvasnak.
- **Projektszám:** a statisztikában szereplő szám egyezik a munkahelyek alatt felsorolt különböző projektek
  számával (a több szerepnél szereplő projekt egyszer számít); ezt is a `content.spec.ts` védi.
- **Linkek, e-mail, számok és technológianevek** mindkét nyelven azonosak.
- **Tanúsítványlink:** csak a tulajdonos által megadott valós cím kerülhet a `Study.url` mezőbe.

## Változtatás után

1. `npm test -- --watch=false` és `npm run build`.
2. `npm run cv`, és a `public/cv/` fájlokat is commitold, mert az önéletrajz a tartalomból készül.
3. Látható funkció esetén `npm run e2e`.
