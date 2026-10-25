# Oldalak (`src/app/pages/`)

Az útvonalakhoz tartozó, legfelső szintű komponensek. Az útvonalakat az `app.routes.ts`, az előrenderelést az
`app.routes.server.ts` írja le (lásd [Architektúra](../architecture.md)).

### `app-portfolio-page` (`PortfolioPage`)

A teljes portfólió egy oldalon, a `/hu` és az `/en` címen. A tartalomra ugró linket, a menüt, a `main` elemben a
szekciókat (hero, rólam, eszköztár, AI, tapasztalat, mellékprojektek, tanulmányok, kapcsolat), majd a láblécet és a
„vissza a tetejére” gombot fogja össze. Egy `effect` a nyelv minden változásakor frissíti a `SeoService`-t.

**Tesztek:** `portfolio-page.spec.ts`: minden szekció felépül, van tartalomra ugró link (a `main` a célja), a cím a nyelvvel együtt változik.

### `app-root-redirect` (`RootRedirect`)

A gyökércím (`/`). A böngészőben az első megjelenítés után a látogató nyelvére irányít át (`LanguageService.preferred()`,
előzmény nélkül, `replaceUrl`). A kiszolgált HTML-ben mindkét nyelvre mutató linkek vannak, hogy a keresők és a
szkript nélküli látogatók se rekedjenek itt.

**Tesztek:** `root-redirect.spec.ts`: mindkét nyelvre mutató link a szkript nélküli látogatóknak, és az első megjelenítés után a látogató nyelvére navigál, előzmény nélkül.

### `app-not-found` (`NotFound`)

A 404-es oldal. Kétnyelvű, mert nincs nyelvi előtagja; az indulásakor `noindex`-et állít be (`SeoService.noindex`).
A build ebből készíti a gyökérben lévő `404.html`-t.

**Tesztek:** `not-found.spec.ts`: mindkét nyelven tájékoztat és mindkét főoldalra visz; indexelés ellen jelöli az oldalt, és a címet is beállítja.
