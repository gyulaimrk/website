/**
 * Build utáni igazítás: az `npm run build` után magától lefut (`postbuild`).
 *
 * A Cloudflare `not_found_handling: "404-page"` beállítása a kimenet gyökerében lévő
 * `404.html`-t szolgálja ki, valódi 404-es státusszal. Az Angular `404/index.html`-t
 * készít, ezért ide másoljuk a helyére.
 *
 * Ha a `SITE_ORIGIN` (src/app/core/site.config.ts) ki van töltve, sitemap.xml is készül
 * nyelvváltozatonként, és a robots.txt hivatkozik rá. Üres címnél egyik sem készül el.
 */
import { access, appendFile, copyFile, readFile, readdir, writeFile } from 'node:fs/promises';

const OUT = 'dist/portfolio/browser';
const FROM = `${OUT}/404/index.html`;
const TO = `${OUT}/404.html`;

try {
  await access(FROM);
} catch {
  console.error(`Hiányzik az előrenderelt 404-oldal: ${FROM}`);
  console.error('A "404" útvonalnak szerepelnie kell az app.routes.server.ts-ben.');
  process.exit(1);
}

await copyFile(FROM, TO);
console.log('404.html a kimenet gyökerébe másolva');

const origin = (await readFile('src/app/core/site.config.ts', 'utf8')).match(
  /SITE_ORIGIN\s*=\s*'([^']*)'/,
)?.[1];

if (origin) {
  const entries = await readdir(OUT, { withFileTypes: true });
  const langs = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === '404') continue;
    const hasPage = await access(`${OUT}/${entry.name}/index.html`).then(
      () => true,
      () => false,
    );
    if (hasPage) langs.push(entry.name);
  }
  const url = (lang) => `${origin}/${lang}`;
  const urls = langs
    .map((lang) => {
      const alternates = langs
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${url(lang)}</loc>\n${alternates}\n  </url>`;
    })
    .join('\n');
  await writeFile(
    `${OUT}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
  );
  await appendFile(`${OUT}/robots.txt`, `\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`sitemap.xml elkészült (${langs.join(', ')}) a(z) ${origin} címhez`);
} else {
  console.log('SITE_ORIGIN üres: sitemap.xml nem készül');
}
