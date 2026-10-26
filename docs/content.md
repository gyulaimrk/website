# Tartalom

Az oldal minden szövege két fájlban van: `src/app/data/content.hu.ts` és `content.en.ts`. A típusok a
`src/app/data/models.ts`-ben vannak, a `content.ts` `CONTENTS` néven nyelv szerint adja ki a két tartalmat.

## Adatmodell

| Típus         | Mit ír le                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Profile`     | név, szerep, elérhetőségek, fotó, bemutatkozás, nyelvek, jogosítvány, önéletrajz-útvonal, a hero kódablakában használt `roleConstants` (a `Role` enum értékei) |
| `Job`         | munkahely: cég, szerep, időszak, leírás, projektek (`JobProject`), és opcionálisan a munkahelyre jellemző eszközök (`tech`, például a Plane az Adroitnál)      |
| `JobProject`  | név, alcím (`subtitle`), link, rövid szöveg, konkrét feladatok (`points`) és a projekten használt technológiák és eszközök (`tech`)                                        |
| `Skill`       | eszköztár-kártya: cím, címke, szöveg, kiemelés                                                                                                                 |
| `SideProject` | mellékprojekt: leírás bekezdésekben (`paragraphs`), élő cím, forráskód, technológiák                                                                                                        |
| `Study`       | tanulmány vagy tanúsítvány: cím, kiállító, időszak, leírás, nyilvános link (`url`)                                                                             |
| `CodeFile`    | a kódablak egy fájlja: név, nyelv, tartalom                                                                                                                    |
| `AiWorkflow`  | a „Hogyan dolgozom AI-val” szekció pontjai és a CLAUDE.md részlet                                                                                              |
| `Ui`          | az összes felületi szöveg: menü, gombok, szekciócímek, címkék                                                                                                  |

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

## A tapasztalat évei

A „több mint 5 éve” és a „3+” jellegű számok nincsenek beírva: a tartalomban `{javaYears}` és `{aiYears}` helyettesítő áll
(a statisztikában `{javaYears}+`). A `data/experience.ts` a kezdő hónapokból (`EXPERIENCE_START`) számolja a teljes éveket, és a
`data/content.ts` a betöltéskor cseréli be, ezért a böngészőben mindig az aktuális szám látszik. Az előrenderelt HTML a
build idejét tükrözi, ezért a `ci.yml` havonta újraépít és telepít. Új kezdő dátumnál az `EXPERIENCE_START`-ot kell
módosítani.
