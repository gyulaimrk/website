# Szekciók (`src/app/sections/`)

Egy szekció összeállít: a `ContentService`-ből olvas, és kis komponensekre bízza a megjelenítést. Szöveg nincs
bennük. A szekciók `id`-ja a menü és a görgetésfigyelő horgonya.

### `app-nav` (`Nav`)

Fejléc és menü: márka (monogram és név), a szekciókra mutató linkek, nyelv- és témaváltó, a „Kapcsolat” gomb és
mobilon hamburger. Az aktív menüponton `aria-current="true"` van (a `ScrollSpyService` alapján). A hamburger
`aria-expanded` állapotú; az Escape és bármely link bezárja a menüt.

**Tesztek:** `nav.spec.ts`: monogram, név, menüpontok és kapcsolat gomb; a márkalink neve tartalmazza a látható szöveget; az aktív menüpont jelölése; a mobilmenü nyitása, zárása és az Escape.

### `app-hero` (`Hero`)

Bemutatkozás: köszönés, a név az egyetlen `h1`-ben, gépelő szerep (`app-typewriter`), bemutatkozó szöveg, három
gomb (Munkáim, önéletrajz letöltése, LinkedIn), statisztikák. A kódablak két fülét a komponens állítja össze: az
első a profilból épített `Main.kt` (alapértelmezett, a `developerInstance()` függvény készíti a `developer-instance.ts`-ben), a második a `Developer.kt` data class (`codeSamples`).

**Tesztek:** `hero.spec.ts`: egyetlen `h1`, szerep és statisztikák, a két fül sorrendje és tartalma, a gombok hivatkozásai, nyelvváltás.

### `app-about` (`About`)

A bemutatkozó levél bekezdései és egy kártya a fotóval és a tényekkel (hely, szerep, nyelvek, jogosítvány, e-mail).
A fotó lusta betöltésű, rögzített mérettel.

**Tesztek:** `about.spec.ts`: minden bekezdés és az öt tény, a fotó leíró felirattal, a feliratok követik a nyelvet.

### `app-skills` (`Skills`)

Az eszköztár kártyái. A kiemelt kártya (`highlight`) széles és színátmenetes keretű.

**Tesztek:** `skills.spec.ts`: minden képességhez kártya, a kiemelt szélesebb és keretes.

### `app-ai-workflow` (`AiWorkflow`)

„Hogyan dolgozom AI-val”: négy pont kártyákon, mellette kódablakban a valódi `CLAUDE.md` rövidített részlete és
egy megjegyzés.

**Tesztek:** `ai-workflow.spec.ts`: mind a négy pont, a színezett CLAUDE.md részlet a megjegyzéssel, nyelvváltás.

### `app-experience` (`Experience`) és `app-job-card` (`JobCard`)

Időrend, a legfrissebb munkahellyel elöl. A `JobCard` egy munkahely kártyája: szerep, időszak, leírás,
összecsukható projektlista (`<details>`, a darabszámmal a feliratban) és technológiák.

| Bemenet   | Típus     | Alapérték | Jelentés                                                    |
| --------- | --------- | --------- | ----------------------------------------------------------- |
| `job`     | `Job`     | kötelező  | a megjelenített munkahely                                   |
| `current` | `boolean` | `false`   | a jelenlegi munkahely: kiemelt kártya, nyitott projektlista |

A projekt neve link, ha van `url`; a rövid szöveg és a feladatlista (`points`) csak akkor jelenik meg, ha van.

**Tesztek:** `experience.spec.ts` (egy idővonal-elem munkahelyenként, csak a legfrissebb kiemelt), `job-card.spec.ts` (projektlista, feladatlista, nyitott és zárt állapot).

### `app-side-projects` (`SideProjects`) és `app-project-card` (`ProjectCard`)

A mellékprojektek listája. A `ProjectCard` egy projekt kártyája (`project` bemenet, kötelező): leírás, technológiák, és
az élő cím (`url`) vagy a forráskód (`sourceUrl`) gombja, ha van.

**Tesztek:** `side-projects.spec.ts` (kártya minden mellékprojekthez), `project-card.spec.ts` (új lapon nyíló linkek, csak a meglévők).

### `app-education` (`Education`) és `li[appStudyItem]` (`StudyItem`)

Három kártya: tanulmányok, az Anthropic-tanúsítványok (kiemelt), további tanúsítványok. A további tanúsítványok
alatt link áll a LinkedIn-profil összes tanúsítványához. A `StudyItem` egy bejegyzés.

| Bemenet | Típus   | Jelentés                                   |
| ------- | ------- | ------------------------------------------ |
| `study` | `Study` | kötelező; a cím linkké válik, ha van `url` |

A kiállítót és a dátumot egy sorban mutatja, ami hiányzik, azt kihagyja (nincs üres vessző).

**Tesztek:** `education.spec.ts` (három kártya, minden bejegyzés egyszer, a LinkedIn-link), `study-item.spec.ts` (cím linkként, üres sorok kihagyása, leírás).

### `app-contact` (`Contact`)

Kapcsolat panel: LinkedIn, önéletrajz-letöltés (`download` attribútummal) és e-mail gomb.

**Tesztek:** `contact.spec.ts`: LinkedIn, önéletrajz-letöltés és e-mail gomb; az önéletrajz gomb letöltésre jelölt.

### `app-footer` (`Footer`)

Szerzői jogi sor az aktuális évvel, és a LinkedIn és e-mail linkek (a feliratuk a tartalomfájlból jön).

**Tesztek:** `footer.spec.ts`: az elérhetőségek és az aktuális év.
