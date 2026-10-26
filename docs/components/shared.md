# Megosztott építőelemek (`src/app/shared/`)

Újrahasznosítható, tartalomtól független elemek. A látható szöveget a hívó vagy a `ContentService` adja.

### `a[appAnchor]` (`AnchorLink`)

Oldalon belüli ugrás. A `<base href="/">` miatt a sima `#id` link nem működik, ezért minden belső ugráshoz ezt
használd. A `href` a nyelv valódi címe (`/hu#id`), így szkript nélkül is a jó oldalra visz.

| Bemenet     | Típus    | Jelentés                                    |
| ----------- | -------- | ------------------------------------------- |
| `appAnchor` | `string` | kötelező; a cél elem azonosítója `#` nélkül |

```html
<a appAnchor="tapasztalat">Tapasztalat</a>
```

Kattintásra a célhoz görget (sima ugrás, ha a látogató csökkentett mozgást kért), és a fókuszt is odaviszi, ha a
célnak van `tabindex`-e.

### `app-back-to-top` (`BackToTop`)

Lebegő gomb, amely az oldalon lejjebb görgetve jelenik meg, és a tetejére visz (`appAnchor`-ral). Rejtve `visibility: hidden` és `aria-hidden`, így a képernyőolvasó és a Tab sem éri el.

### `a[appButton]` (`Button`)

Gomb linkként.

| Bemenet    | Típus                  | Alapérték   | Jelentés                                              |
| ---------- | ---------------------- | ----------- | ----------------------------------------------------- |
| `variant`  | `'primary' \| 'ghost'` | `'primary'` | színátmenetes vagy szellem megjelenés                 |
| `size`     | `'normal' \| 'small'`  | `'normal'`  | méret                                                 |
| `external` | `boolean`              | `false`     | új lapon nyílik (`target="_blank"`, `rel="noopener"`) |

### `app-card` (`Card`)

Üveghatású kártya, `<ng-content>` tartalommal. A `featured` bemenet (alapérték `false`) színátmenetes keretet ad.

### `app-chip-list` (`ChipList`)

Címkék (technológiák) sora. Bemenet: `items` (`readonly string[]`, kötelező). A szövegszíne az `--accent-ink` token, amely a világos témában a kontraszt miatt sötétebb kék.

### `app-code-window` (`CodeWindow`)

Kódablak fülekkel és színezéssel. Bemenetek: `files` (`readonly CodeFile[]`, kötelező) és `idPrefix` (`string`, kötelező): a fülek és a panel azonosítóinak előtagja, mert egy oldalon több kódablak is lehet (a hero-ban `hero-code`, az AI szekcióban `ai-code`). A kiválasztott fül új
fájllistánál az elsőre áll vissza. A fülek `tablist` szemantikájúak: a nyilak lépnek, a Home és az End a szélekre
visz. A színezést a `highlight()` végzi (Kotlin és Markdown), soronként tokenekre bontva. Az árnyékát a beágyazó elem
a `--code-window-shadow` CSS-változóval cserélheti le (az AI szekció a visszafogottabb `--shadow-soft` tokent adja, hogy
ne lógjon rá az alatta álló megjegyzésre).

**Tesztek:** `code-window.spec.ts`, `highlight.spec.ts`.

### `appCountUp` (`CountUp`)

A szövegben lévő számok 0-ról a végértékig nőnek, amikor az elem először a képernyőre ér (kb. 1,1 mp, lassuló
görbével). Bemenet: `appCountUp`, a végérték szövegként (például `5+` vagy `8–25`; minden egész szám külön nő).

```html
<strong [appCountUp]="'5+'">5+</strong>
```

A kiszolgált HTML, a szkript nélküli látogató, a mozgáscsökkentést kérő látogató és a nyomtatás a végértéket
látja. Az animáció az Angular saját szövegcsomópontját írja, és pontosan a végértéken áll meg. A hero statisztikái
használják.

### `app-language-toggle` (`LanguageToggle`)

Nyelvváltó gomb, amely a másik nyelv kódját mutatja (`HU` vagy `EN`), és a `LanguageService.toggle()`-t hívja.

### `appReveal` (`Reveal`)

Belépő animáció: egyszer, amikor az elem a képernyőre ér. Bemenet: `appReveal`, a késleltetés lépésekben (1 lépés =
80 ms, alapérték 0, számmá alakítva). Mozgáscsökkentésnél, vagy ha nincs `IntersectionObserver`, az elem azonnal
látszik.

### `app-section-heading` (`SectionHeading`)

Szekciócím rövid bevezetővel. Bemenetek: `title` (kötelező) és `lead` (alapérték: üres).

### `app-theme-toggle` (`ThemeToggle`)

Téma váltó gomb: nap- vagy holdikon, a felirat a következő témát nevezi meg. A `ThemeService.toggle()`-t hívja.

### `app-typewriter` (`Typewriter`)

Szavakat gépel be és töröl. Bemenet: `words` (`readonly string[]`, kötelező). A kiszolgáló és a mozgáscsökkentést
kérő látogató az első szót látja, gépelés nélkül, így a kiszolgált HTML is teljes tartalmú.

**Tesztek:** minden elemhez tartozik `*.spec.ts` a saját mappájában.
