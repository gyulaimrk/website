/**
 * Post-build adjustment: runs on its own after `npm run build` (`postbuild`).
 *
 * 1. Cloudflare's `not_found_handling: "404-page"` setting serves the `404.html` in the root of the
 *    output, with a real 404 status. Angular builds `404/index.html`,
 *    so we copy it into its place.
 * 2. A content security policy (CSP) goes into the `_headers` file: the page may only load from its own sources,
 *    and the executable inline scripts are allowed by their hash.
 * 3. `llms.txt` (a short, machine-readable summary for AI tools) is built from the content files.
 * 4. If `SITE_ORIGIN` (src/app/core/site-origin.ts) is filled in, a sitemap.xml is built
 *    per language version, and robots.txt refers to it. With an empty address neither is built.
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
    console.error(`The prerendered 404 page is missing: ${from}`);
    console.error('The "404" route must be in app.routes.server.ts.');
    process.exit(1);
  }
  await copyFile(from, `${OUT}/404.html`);
  console.log('404.html copied to the output root');
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

/** Puts a single Sitemap line into robots.txt, however many times the script runs. */
async function linkSitemapInRobots(origin) {
  const path = `${OUT}/robots.txt`;
  const current = (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');
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

/** The sha256 hashes of the executable inline scripts (the browser does not execute JSON and JSON-LD data blocks). */
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
 * Writes the CSP into the `/*` rule of `_headers`, next to the other security headers (into a single rule,
 * because the local Cloudflare server does not merge rules with the same pattern). On a rerun it
 * replaces the previous line, so it is idempotent.
 */
async function writeSecurityHeaders() {
  const hashes = await inlineScriptHashes(await htmlFiles(OUT));
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(' ')}`,
    // Angular embeds the stylesheets of the components.
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
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith('Content-Security-Policy:'));
  const rule = lines.findIndex((line) => line.trim() === '/*');
  if (rule === -1) {
    console.error('There is no "/*" rule in the _headers file, where the CSP would go.');
    process.exit(1);
  }
  lines.splice(rule + 1, 0, `  Content-Security-Policy: ${policy}`);
  await writeFile(path, lines.join('\n'));
  console.log(`CSP in the _headers file (${hashes.length} inline scripts allowed)`);
}

async function writeLlmsTxt() {
  const { CONTENTS, SITE_ORIGIN, renderLlmsTxt } = await importTs({
    contents: `export { CONTENTS } from './src/app/data/content';
export { SITE_ORIGIN } from './src/app/core/site-origin';
export { renderLlmsTxt } from './src/app/data/llms-txt';`,
  });
  await writeFile(`${OUT}/llms.txt`, renderLlmsTxt(CONTENTS, SITE_ORIGIN));
  console.log('llms.txt built');
}

async function writeSitemap() {
  const { SITE_ORIGIN, LANGS } = await importTs({
    contents: `export { SITE_ORIGIN } from './src/app/core/site-origin';
export { LANGS } from './src/app/data/content';`,
  });
  if (!SITE_ORIGIN) {
    console.log('SITE_ORIGIN is empty: sitemap.xml is not built');
    return;
  }
  await writeFile(`${OUT}/sitemap.xml`, sitemapXml(SITE_ORIGIN, LANGS));
  await linkSitemapInRobots(SITE_ORIGIN);
  console.log(`sitemap.xml built (${LANGS.join(', ')}) for the address ${SITE_ORIGIN}`);
}

await copy404();
await writeSecurityHeaders();
await writeLlmsTxt();
await writeSitemap();
