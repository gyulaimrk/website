import { expect, test } from '@playwright/test';
import { contentEn, contentHu } from '../src/app/data/content';

test.describe('SEO', () => {
  for (const [path, content] of [
    ['/hu', contentHu],
    ['/en', contentEn],
  ] as const) {
    test(`${path}: cím és leírás a saját nyelvén`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(content.ui.meta.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        content.ui.meta.description,
      );
    });
  }

  test('a robots.txt és a 404.html kiszolgálódik', async ({ request }) => {
    expect((await request.get('/robots.txt')).status()).toBe(200);
    const notFound = await request.get('/404.html');
    expect(notFound.status()).toBe(200);
  });

  test('amíg nincs végleges cím, nincs hamis canonical és hreflang', async ({ request }) => {
    const html = await (await request.get('/hu')).text();
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('hreflang');
  });
});
