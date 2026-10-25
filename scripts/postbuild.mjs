/**
 * Build utáni igazítás: az `npm run build` után magától lefut (`postbuild`).
 *
 * 1. A Cloudflare `not_found_handling: "404-page"` beállítása a kimenet gyökerében lévő
 *    `404.html`-t szolgálja ki, valódi 404-es státusszal. Az Angular `404/index.html`-t
 *    készít, ezért ide másoljuk a helyére.
 * 2. Ha a `SITE_ORIGIN` (src/app/core/site-origin.ts) ki van töltve, sitemap.xml készül
 *    nyelvváltozatonként, és a robots.txt hivatkozik rá. Üres címnél egyik sem készül el.
 */
import { access, copyFile, readFile, writeFile } from 'node:fs/promises';
import { importTs } from './bundle.mjs';

const OUT = 'dist/portfolio/browser';

async function copy404() {
  const from = `${OUT}/404/index.html`;
  try {
    await access(from);
  } catch {
    console.error(`Hiányzik az előrenderelt 404-oldal: ${from}`);
    console.error('A "404" útvonalnak szerepelnie kell az app.routes.server.ts-ben.');
    process.exit(1);
  }
  await copyFile(from, `${OUT}/404.html`);
  console.log('404.html a kimenet gyökerébe másolva');
}

function sitemapXml(origin, langs) {
  const url = (lang) => `${origin}/${lang}`;
  const alternates = langs
    .map((lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url(lang)}"/>`)
    .join('\n');
  const entries = langs
    .map((lang) => `  <url>\n    <loc>${url(lang)}</loc>\n${alternates}\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`;
}

/** A robots.txt-be egyetlen Sitemap-sort tesz, akárhányszor fut le a szkript. */
async function linkSitemapInRobots(origin) {
  const path = `${OUT}/robots.txt`;
  const current = await readFile(path, 'utf8');
  const withoutSitemap = current.replace(/^Sitemap:.*$/gim, '').trimEnd();
  await writeFile(path, `${withoutSitemap}\n\nSitemap: ${origin}/sitemap.xml\n`);
}

async function writeSitemap() {
  const { SITE_ORIGIN, LANGS } = await importTs({
    contents: `export { SITE_ORIGIN } from './src/app/core/site-origin';
export { LANGS } from './src/app/data/content';`,
  });
  if (!SITE_ORIGIN) {
    console.log('SITE_ORIGIN üres: sitemap.xml nem készül');
    return;
  }
  await writeFile(`${OUT}/sitemap.xml`, sitemapXml(SITE_ORIGIN, LANGS));
  await linkSitemapInRobots(SITE_ORIGIN);
  console.log(`sitemap.xml elkészült (${LANGS.join(', ')}) a(z) ${SITE_ORIGIN} címhez`);
}

await copy404();
await writeSitemap();
