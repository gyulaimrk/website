// Checks whether the external links on the site are alive.
// Run: npm run links (weekly in CI, in .github/workflows/links.yml).
import { importTs } from './bundle.mjs';

const TIMEOUT_MS = 15_000;
/** For these responses the server probably rejects the robot, the link is not broken. */
const BOT_BLOCKED = new Set([401, 403, 405, 429, 999]);

const { CONTENTS, externalLinks } = await importTs({
  contents: `export { CONTENTS } from './src/app/data/content';
export { externalLinks } from './src/app/data/external-links';`,
});

const urls = [...new Set(Object.values(CONTENTS).flatMap((content) => externalLinks(content)))];

async function check(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; portfolio-link-check)' },
    });
    if (response.ok) return { url, state: 'ok', detail: String(response.status) };
    if (BOT_BLOCKED.has(response.status)) {
      return { url, state: 'unverified', detail: String(response.status) };
    }
    return { url, state: 'broken', detail: String(response.status) };
  } catch (error) {
    return { url, state: 'broken', detail: error.cause?.code ?? error.name };
  }
}

const results = await Promise.all(urls.map(check));
const label = { ok: 'OK        ', unverified: 'UNVERIFIABLE', broken: 'BROKEN    ' };
for (const { url, state, detail } of results) console.log(`${label[state]} ${detail}  ${url}`);

const broken = results.filter((result) => result.state === 'broken');
const unverified = results.filter((result) => result.state === 'unverified');
console.log(
  `\n${results.length} links: ${results.length - broken.length - unverified.length} ok, ${unverified.length} unverifiable (site rejecting robots), ${broken.length} broken`,
);
process.exit(broken.length ? 1 : 0);
