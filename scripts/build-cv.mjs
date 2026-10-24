// Legyártja a letölthető önéletrajzot (PDF) mindkét nyelven: public/cv/.
// A tartalom a content.*.ts fájlokból jön, így az önéletrajz mindig egyezik az oldallal.
// Futtatás: npm run cv (a PDF-eket verziókezeljük, tartalomváltozás után újra kell futtatni).
import { build } from 'esbuild';
import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'public', 'cv');

const fontFile = async (pkg, file) =>
  (await readFile(join(root, 'node_modules', '@fontsource', pkg, 'files', file))).toString(
    'base64',
  );

async function fontCss() {
  const faces = [
    ['Inter', 'inter', 'inter-latin-400-normal.woff2', 400],
    ['Inter', 'inter', 'inter-latin-ext-400-normal.woff2', 400],
    ['Inter', 'inter', 'inter-latin-600-normal.woff2', 600],
    ['Inter', 'inter', 'inter-latin-ext-600-normal.woff2', 600],
    ['Space Grotesk', 'space-grotesk', 'space-grotesk-latin-700-normal.woff2', 700],
    ['Space Grotesk', 'space-grotesk', 'space-grotesk-latin-ext-700-normal.woff2', 700],
  ];
  const rules = [];
  for (const [family, pkg, file, weight] of faces) {
    const data = await fontFile(pkg, file).catch(() => null);
    if (data) {
      rules.push(
        `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${data}) format('woff2');}`,
      );
    }
  }
  return rules.join('');
}

const tmp = join(tmpdir(), `cv-build-${process.pid}`);
await mkdir(tmp, { recursive: true });
const bundle = join(tmp, 'cv.mjs');
await build({
  entryPoints: [join(root, 'src/app/cv/cv-entry.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: bundle,
});
const { renderAllCv } = await import(pathToFileURL(bundle).href);

const photo = `data:image/jpeg;base64,${(await readFile(join(root, 'public', 'mark-gyulai.jpg'))).toString('base64')}`;
const pages = renderAllCv({ photo, fontCss: await fontCss() });

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: process.env.CI || process.env.CHROME_PATH ? ['--no-sandbox'] : [],
});
try {
  for (const [lang, { html, fileName }] of Object.entries(pages)) {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
    await writeFile(join(outDir, fileName), pdf);
    console.log(`${lang}: public/cv/${fileName} (${Math.round(pdf.length / 1024)} KB)`);
    await page.close();
  }
} finally {
  await browser.close();
  await rm(tmp, { recursive: true, force: true });
}
