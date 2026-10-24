/**
 * Build utáni igazítás: az `npm run build` után magától lefut (`postbuild`).
 *
 * A Cloudflare `not_found_handling: "404-page"` beállítása a kimenet gyökerében lévő
 * `404.html`-t szolgálja ki, valódi 404-es státusszal. Az Angular `404/index.html`-t
 * készít, ezért ide másoljuk a helyére.
 */
import { access, copyFile } from 'node:fs/promises';

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
