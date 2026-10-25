/**
 * Build utáni igazítás: az `npm run build` után magától lefut (`postbuild`).
 *
 * 1. A Cloudflare `not_found_handling: "404-page"` beállítása a kimenet gyökerében lévő
 *    `404.html`-t szolgálja ki, valódi 404-es státusszal. Az Angular `404/index.html`-t
 *    készít, ezért ide másoljuk a helyére.
 * 2. A `_headers` fájlba tartalombiztonsági irányelv (CSP) kerül: az oldal csak a saját forrásaiból
 *    tölthet be, a végrehajtható beágyazott szkripteket pedig a lenyomatuk (hash) engedélyezi.
 * 3. Az `llms.txt` (rövid, géppel olvasható összefoglaló az AI-eszközöknek) a tartalomfájlokból készül.
 * 4. Ha a `SITE_ORIGIN` (src/app/core/site-origin.ts) ki van töltve, sitemap.xml készül
 *    nyelvváltozatonként, és a robots.txt hivatkozik rá. Üres címnél egyik sem készül el.
 */
import { createHash } from 'node:crypto';
import { access, copyFile, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
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

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return nested.flat();
}

/** A végrehajtható beágyazott szkriptek sha256-lenyomata (a JSON és a JSON-LD adatblokkokat nem hajtja végre a böngésző). */
async function inlineScriptHashes(files) {
  const hashes = new Set();
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    for (const [, attributes, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      const executable =
        !/\ssrc=/.test(attributes) && !/type="(?!text\/javascript|module)/.test(attributes);
      if (executable && body.trim()) {
        hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
      }
    }
  }
  return [...hashes].sort();
}

/**
 * A CSP-t a `_headers` `/*` szabályába írja, a többi biztonsági fejléc mellé (egyetlen szabályba,
 * mert a helyi Cloudflare-szerver nem fésüli össze az azonos mintájú szabályokat). Újrafuttatáskor
 * lecseréli a korábbi sort, így idempotens.
 */
async function writeSecurityHeaders() {
  const hashes = await inlineScriptHashes(await htmlFiles(OUT));
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')}`,
    // Az Angular a komponensek stíluslapját beágyazva adja.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
  const path = `${OUT}/_headers`;
  const lines = (await readFile(path, 'utf8'))
    .split('\n')
    .filter((line) => !line.trimStart().startsWith('Content-Security-Policy:'));
  const rule = lines.indexOf('/*');
  if (rule === -1) {
    console.error('A _headers fájlban nincs "/*" szabály, ide kerülne a CSP.');
    process.exit(1);
  }
  lines.splice(rule + 1, 0, `  Content-Security-Policy: ${policy}`);
  await writeFile(path, lines.join('\n'));
  console.log(`CSP a _headers fájlban (${hashes.length} beágyazott szkript engedélyezve)`);
}

async function writeLlmsTxt() {
  const { CONTENTS, SITE_ORIGIN, renderLlmsTxt } = await importTs({
    contents: `export { CONTENTS } from './src/app/data/content';
export { SITE_ORIGIN } from './src/app/core/site-origin';
export { renderLlmsTxt } from './src/app/data/llms-txt';`,
  });
  await writeFile(`${OUT}/llms.txt`, renderLlmsTxt(CONTENTS, SITE_ORIGIN));
  console.log('llms.txt elkészült');
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
await writeSecurityHeaders();
await writeLlmsTxt();
await writeSitemap();
