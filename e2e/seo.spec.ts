import { expect, test } from '@playwright/test';
import { contentEn, contentHu } from '../src/app/data/content';

test.describe('SEO', () => {
  for (const [path, content] of [
    ['/hu', contentHu],
    ['/en', contentEn],
  ] as const) {
    test(`${path}: title and description in its own language`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(content.ui.meta.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        content.ui.meta.description,
      );
    });
  }

  test('robots.txt and 404.html are served', async ({ request }) => {
    expect((await request.get('/robots.txt')).status()).toBe(200);
    const notFound = await request.get('/404.html');
    expect(notFound.status()).toBe(200);
  });

  test('until there is a final address, there is no false canonical and hreflang', async ({
    request,
  }) => {
    const html = await (await request.get('/hu')).text();
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain('hreflang');
  });
});
