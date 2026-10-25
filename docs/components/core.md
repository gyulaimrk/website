# Szolgáltatások és segédek (`src/app/core/`)

### `ContentService`

Az aktuális nyelv tartalma. A `content()` jel a `CONTENTS[lang]`-ot adja a `LanguageService.lang()` szerint; a
komponensek innen olvasnak, a nyers adatfájlokból nem.

### `LanguageService`

Az oldal nyelve. A nyelv az útvonalból következik (`/hu`, `/en`), a `lang` jelet az útvonal őre állítja be a
`use()`-szal, ami a `<html lang>` attribútumot is frissíti. A látogató utolsó választását csak a gyökércím
átirányításához jegyzi meg (`preferred()`: a megjegyzett nyelv, különben a böngészőé).

| Tagja                       | Mit csinál                        |
| --------------------------- | --------------------------------- |
| `lang`                      | az aktuális nyelv (jel)           |
| `use(lang)`                 | beállítja a nyelvet (az őr hívja) |
| `preferred()`               | a látogató nyelve                 |
| `other()`                   | a másik nyelv                     |
| `navigateTo(lang, options)` | átvisz a nyelv címére             |
| `toggle()`                  | átvisz a másik nyelvre            |

### `languageMatch` és `languageActivate` (`language.guard.ts`)

A nyelvi útvonal őrei. A `languageMatch` (`CanMatchFn`) csak a `/hu` és az `/en` címre illeszkedik, minden más 404.
A `languageActivate` (`CanActivateFn`) beállítja az útvonal nyelvét, paraméterváltáskor is.

### `ThemeService`

Világos és sötét téma. Az első megjelenítés mindig sötét (hidratálás); utána a mentett vagy a rendszer szerinti téma
kerül rá, a `data-theme` attribútumon keresztül. Ha a látogató az első megjelenítés előtt vált, az ő döntése marad.
A választást a `storage` segédekkel menti. Az `index.html` kis szkriptje a festés előtt beállítja az attribútumot,
így nincs villanás.

### `SeoService`

A cím, a leírás, a megosztási adatok és (ha a `SITE_ORIGIN` ki van töltve) a canonical, hreflang és `og:url`
nyelvenként. `update(lang)` a portfólió oldalhoz, `noindex(title)` a 404-hez, `urlFor(lang)` a nyelv címéhez.

### `ScrollSpyService`

Megfigyeli, melyik szekció van a képernyő felső részén. Az `observe(sections)` indítja, az `active` jel adja az
azonosítót (hash nélkül). A menü az `aria-current` jelöléshez használja.

### `site.config.ts`

`SITE_ORIGIN`: az éles cím (`https://…`, záró perjel nélkül), amíg üres, a canonical, hreflang, `og:url` és a
sitemap kimarad. A `SITE_ORIGIN_TOKEN` injektálhatóan adja, hogy a tesztek más értéket adhassanak.

### `storage.ts`

`readStored(key, allowed)` és `writeStored(key, value)`: biztonságos `localStorage`-hozzáférés. Nem elérhető tár vagy
érvénytelen érték esetén `undefined`, illetve csendes kihagyás.

### `prefersReducedMotion()`

Igaz, ha a látogató csökkentett mozgást kért (vagy a böngésző nem ismeri a lekérdezést). Minden mozgó elem ezt
nézi.

**Tesztek:** a szolgáltatásokhoz és a segédekhez tartozik `*.spec.ts` a `core/` mappában (a `site.config.ts` és a `language.guard.ts` kivételével, ez utóbbit az E2E tesztek fedik: érvénytelen cím 404-et ad, a nyelvváltás a másik nyelv címére visz).
