import { expect, test } from '@playwright/test';
import { contentEn, contentHu } from '../src/app/data/content';

test.describe('addresses and language', () => {
  test('the root address leads to the browser’s language: Hungarian', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'hu-HU' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/hu$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'hu');
    await context.close();
  });

  test('the root address leads to the browser’s language: English', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await context.close();
  });

  test('/hu and /en have full content even in the served HTML, without scripting', async ({
    request,
  }) => {
    for (const [path, lang, content] of [
      ['/hu', 'hu', contentHu],
      ['/en', 'en', contentEn],
    ] as const) {
      const html = await (await request.get(path)).text();
      expect(html, path).toContain(`<html lang="${lang}"`);
      expect(html, path).toContain(content.profile.name);
      expect(html, path).toContain(content.ui.experience.title);
      expect(html, path).toContain(content.jobs[0].company);
      expect(html.match(/<h1[\s>]/g), path).toHaveLength(1);
      expect(html, path).not.toMatch(/\{(java|ai)Years\}/);
    }
  });

  test('the language toggle leads to the address of the other language, and stays there after a refresh', async ({
    page,
  }) => {
    await page.goto('/hu');
    await page.getByRole('button', { name: /^EN/ }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toContainText(contentEn.profile.name);
    await page.reload();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole('navigation', { name: contentEn.ui.nav.label })).toBeVisible();
  });

  test('the chosen language is remembered by the root address on the next visit too', async ({
    page,
  }) => {
    await page.goto('/hu');
    await page.getByRole('button', { name: /^EN/ }).click();
    await expect(page).toHaveURL(/\/en$/);
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('merely opening a language address does not overwrite the default coming from the browser language', async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: 'hu-HU' });
    const page = await context.newPage();
    await page.goto('/en');
    await page.goto('/');
    await expect(page).toHaveURL(/\/hu$/);
    await context.close();
  });

  test('a non-existent address gets a 404 status, but shows a usable page', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});
