import { expect, test } from '@playwright/test';
import { contentHu } from '../src/app/data/content';

test.describe('llms.txt', () => {
  test('it is in the web root, and gives a summary built from the content', async ({ request }) => {
    const response = await request.get('/llms.txt');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain(`# ${contentHu.profile.name}`);
    expect(text).toContain(contentHu.profile.cv);
    expect(text).toContain('/hu');
    expect(text).toContain('/en');
  });
});

test.describe('printing', () => {
  test('always light, without navigation and decoration, and all content is visible', async ({
    page,
  }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await page.goto('/hu');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.emulateMedia({ media: 'print' });

    await expect(page.locator('app-nav')).toBeHidden();
    await expect(page.locator('app-back-to-top')).toBeHidden();
    await expect(page.locator('app-code-window').first()).toBeHidden();
    // The background changes gradually (transition), so we wait for the end state.
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor))
      .toBe('rgb(255, 255, 255)');
    // The elements of the entrance animation waiting for scrolling are visible too.
    const hidden = await page.evaluate(
      () =>
        [...document.querySelectorAll('.rv')].filter((el) => getComputedStyle(el).opacity !== '1')
          .length,
    );
    expect(hidden).toBe(0);
    await expect(page.locator('h1')).toContainText(contentHu.profile.name);
  });
});

test.describe('counting up on appearance', () => {
  test('the numbers of the statistics grow from 0 to the final value, and stop at the final value', async ({
    page,
  }) => {
    await page.goto('/hu');
    const values = page.locator('.stats li strong');
    const finals = contentHu.stats.map((stat) => stat.value);

    // At the end of the animation exactly the number from the content is there.
    await expect(values).toHaveText(finals, { timeout: 5000 });
  });

  test('with reduced motion the final value is shown immediately', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/hu');
    await expect(page.locator('.stats li strong')).toHaveText(
      contentHu.stats.map((stat) => stat.value),
      { timeout: 500 },
    );
  });

  test('the served HTML without scripting contains the final values', async ({ request }) => {
    const html = await (await request.get('/hu')).text();
    contentHu.stats.forEach((stat) => expect(html).toContain(`>${stat.value}</strong>`));
  });
});
