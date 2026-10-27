/**
 * The address of the live site (`https://…`, no trailing slash).
 *
 * While empty, the canonical, hreflang, `og:url` and share image tags are omitted, and the
 * sitemap is not built, because a wrong absolute address is worse than none. On deployment it has
 * to be set here once; everything else derives from it (the `postbuild` script reads it too).
 */
export const SITE_ORIGIN = '';
