import { InjectionToken } from '@angular/core';

/**
 * Az éles oldal címe (`https://…`, záró perjel nélkül).
 *
 * Amíg üres, a canonical, a hreflang és az `og:url` címke kimarad, és a sitemap nem
 * készül el, mert rossz abszolút cím rosszabb, mint a hiány. A kitelepítéskor itt
 * kell megadni egyszer, minden más innen származik.
 */
export const SITE_ORIGIN = '';

/** Az oldal címe injektálhatóan, hogy a tesztek más értéket adhassanak neki. */
export const SITE_ORIGIN_TOKEN = new InjectionToken<string>('SITE_ORIGIN', {
  providedIn: 'root',
  factory: () => SITE_ORIGIN,
});
