import { expect, test } from '@playwright/test';
import { contentHu } from '../src/app/data/content';

test.describe('llms.txt', () => {
  test('a webgyökérben van, és a tartalomból készült összefoglalót ad', async ({ request }) => {
    const response = await request.get('/llms.txt');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain(`# ${contentHu.profile.name}`);
    expect(text).toContain(contentHu.profile.cv);
    expect(text).toContain('/hu');
    expect(text).toContain('/en');
  });
});

test.describe('nyomtatás', () => {
  test('mindig világos, a navigáció és a díszítés nélkül, és minden tartalom látszik', async ({
    page,
  }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await page.goto('/hu');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.emulateMedia({ media: 'print' });

    await expect(page.locator('app-nav')).toBeHidden();
    await expect(page.locator('app-back-to-top')).toBeHidden();
    await expect(page.locator('app-code-window').first()).toBeHidden();
    // A háttér átmenetesen vált (transition), ezért várjuk a végállapotot.
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor))
      .toBe('rgb(255, 255, 255)');
    // A görgetésre várakozó belépő animáció elemei is látszanak.
    const hidden = await page.evaluate(
      () =>
        [...document.querySelectorAll('.rv')].filter((el) => getComputedStyle(el).opacity !== '1')
          .length,
    );
    expect(hidden).toBe(0);
    await expect(page.locator('h1')).toContainText(contentHu.profile.name);
  });
});
