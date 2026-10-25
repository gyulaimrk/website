/**
 * Az éles oldal címe (`https://…`, záró perjel nélkül).
 *
 * Amíg üres, a canonical, a hreflang, az `og:url` és a megosztási kép címkéje kimarad, és a
 * sitemap nem készül el, mert rossz abszolút cím rosszabb, mint a hiány. A kitelepítéskor itt
 * kell megadni egyszer, minden más innen származik (a `postbuild` szkript is ezt olvassa).
 */
export const SITE_ORIGIN = '';
