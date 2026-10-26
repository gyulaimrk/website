// Builds the downloadable résumé (PDF) in both languages: public/cv/.
// The content comes from the content.*.ts files, so the résumé always matches the site.
// Run: npm run cv (the PDFs are version-controlled, rerun after a content change).
import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { importTs, root } from './bundle.mjs';

// The résumé may have at most this many pages; if the content outgrows it, the build stops with an error.
const MAX_PAGES = 3;

const outDir = join(root, 'public', 'cv');

const fontFile = async (pkg, file) =>
  (await readFile(join(root, 'node_modules', '@fontsource', pkg, 'files', file))).toString(
    'base64',
  );

const FONT_FACES = [
  ['Inter', 'inter', 'inter-latin-400-normal.woff2', 400],
  ['Inter', 'inter', 'inter-latin-ext-400-normal.woff2', 400],
  ['Inter', 'inter', 'inter-latin-500-normal.woff2', 500],
  ['Inter', 'inter', 'inter-latin-ext-500-normal.woff2', 500],
  ['Inter', 'inter', 'inter-latin-600-normal.woff2', 600],
  ['Inter', 'inter', 'inter-latin-ext-600-normal.woff2', 600],
  ['Space Grotesk', 'space-grotesk', 'space-grotesk-latin-700-normal.woff2', 700],
  ['Space Grotesk', 'space-grotesk', 'space-grotesk-latin-ext-700-normal.woff2', 700],
];

/** The fonts are embedded; if a file is missing, the build stops so no PDF with fallback fonts is made. */
async function fontCss() {
  const rules = await Promise.all(
    FONT_FACES.map(async ([family, pkg, file, weight]) => {
      const data = await fontFile(pkg, file);
      return `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/woff2;base64,${data}) format('woff2');}`;
    }),
  );
  return rules.join('');
}

const { renderAllCv } = await importTs('src/app/cv/cv-entry.ts');

const photo = `data:image/jpeg;base64,${(await readFile(join(root, 'public', 'mark-gyulai.jpg'))).toString('base64')}`;
const documents = renderAllCv({ photo, fontCss: await fontCss() });

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: process.env.CI || process.env.CHROME_PATH ? ['--no-sandbox'] : [],
});
try {
  for (const [lang, { html, fileName }] of Object.entries(documents)) {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
    const pageCount = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
    if (pageCount > MAX_PAGES) {
      throw new Error(
        `${fileName}: ended up ${pageCount} pages (the limit is ${MAX_PAGES}). Shorten the content or tighten the style in render-cv.ts.`,
      );
    }
    await writeFile(join(outDir, fileName), pdf);
    console.log(`${lang}: public/cv/${fileName} (${Math.round(pdf.length / 1024)} KB)`);
    await page.close();
  }
} finally {
  await browser.close();
}
