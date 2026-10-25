# Architektúra

## Áttekintés

Az oldal egy statikusan előrenderelt Angular 22 alkalmazás (standalone komponensek, signalok, zoneless). Nincs
kiszolgálóoldali futás: a build kész HTML-t ad, amit a Cloudflare statikus assetként szolgál ki.

```
src/app/
  data/       modellek és a két nyelv teljes tartalma
  core/       szolgáltatások: nyelv, tartalom, téma, SEO, görgetésfigyelő
  pages/      útvonalak oldalai
  sections/   az oldal szekciói
  shared/     újrahasznosítható építőelemek
  cv/         a letölthető önéletrajz forrása
```

## Útvonalak

| Cím                    | Oldal           | Megjegyzés                                                                   |
| ---------------------- | --------------- | ---------------------------------------------------------------------------- |
| `/`                    | `RootRedirect`  | a látogató nyelvére visz (megjegyzett választás, különben a böngésző nyelve) |
| `/hu`, `/en`           | `PortfolioPage` | a teljes portfólió egy oldalon, nyelvenként saját címmel                     |
| `/404`, ismeretlen cím | `NotFound`      | `noindex`; a Cloudflare a gyökér `404.html`-t adja valódi 404-es státusszal  |

Az útvonalak a `LANGS`-ból (`data/content.ts`) származnak. A `languageMatch` őr csak érvényes nyelvkódra
illeszkedik, a `languageActivate` beállítja az oldal nyelvét.

## Adatfolyam

```
content.hu.ts / content.en.ts  ->  CONTENTS  ->  ContentService.content()  ->  komponensek
                                                       ^
                                           LanguageService.lang() (az útvonalból)
```

A komponensekben nincs szöveg: mind a `ContentService` `content()` jeléből olvas, ami az aktuális nyelv
tartalmát adja. Nyelvváltáskor az útvonal változik, a jel frissül, a nézet újrarajzolódik.

## Előrenderelés és hidratálás

Az `ng build` minden útvonalat előrendez (`app.routes.server.ts`, `outputMode: static`), a böngésző pedig
hidratál eseményismétléssel. Ennek feltételei:

- Böngészőspecifikus kód (`document`, `localStorage`, időzítő) csak `DOCUMENT`, `isPlatformBrowser` vagy
  `afterNextRender` mögött fut.
- Az első megjelenítés determinisztikus: a téma `dark`-ról indul, a gépelő az első szót mutatja. A mentett vagy
  rendszer szerinti téma az első megjelenítés után kerül rá.
- Oldalon belüli ugrás a `<base href="/">` miatt az `appAnchor` direktívával megy.

## SEO

- Statikus meta, Open Graph és JSON-LD az `index.html`-ben.
- A `SeoService` nyelvenként igazítja a címet és a leírást, és a canonical, hreflang és `og:url` címkéket csak
  akkor teszi ki, ha a `SITE_ORIGIN` (`core/site-origin.ts`) ki van töltve. Amíg üres, a sitemap sem készül.
- A `scripts/postbuild.mjs` a `404.html`-t a kimenet gyökerébe másolja, és `SITE_ORIGIN` esetén sitemapet
  készít, a `robots.txt`-be pedig hivatkozást tesz rá.

## Biztonság, nyomtatás, AI-barát kimenet

- **Fejlécek:** a `_headers` biztonsági fejléceket és a build által számolt `Content-Security-Policy`-t ad
  ([Fejlesztés](development.md)).
- **Nyomtatás:** a `styles.scss` `@media print` szabálya mindig a világos témát használja, elrejti a navigációt, a
  kódablakokat és a díszítő fényeket, és kinyitja az összecsukott részleteket.
- **`llms.txt`:** a `postbuild` a tartalomfájlokból rövid, géppel olvasható összefoglalót készít az AI-eszközöknek
  (`src/app/data/llms-txt.ts`).

## Hozzáférhetőség

Egyetlen `h1`, tartalomra ugró link, `aria-current` az aktív menüponton (`ScrollSpyService`), látható fókusz,
legalább 4,5:1 szövegkontraszt mindkét témában (szövegszínnek `--accent-text`), mozgáscsökkentési tartalék a
mozgó elemeknél (`prefersReducedMotion`).

## Önéletrajz

A `profile.cv` útvonalra mutató PDF-eket az `npm run cv` készíti a tartalomfájlokból (lásd
[Önéletrajz](components/cv.md)).
