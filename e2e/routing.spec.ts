import { expect, test } from '@playwright/test';
import { contentEn, contentHu } from '../src/app/data/content';

test.describe('címek és nyelv', () => {
  test('a gyökércím a böngésző nyelvére visz: magyar', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'hu-HU' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/hu$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'hu');
    await context.close();
  });

  test('a gyökércím a böngésző nyelvére visz: angol', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await context.close();
  });

  test('a /hu és az /en szkript nélkül, a kiszolgált HTML-ben is teljes tartalmú', async ({
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

  test('a nyelvváltó a másik nyelv címére visz, és ott marad frissítés után is', async ({
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

  test('a választott nyelvet a következő látogatáskor a gyökércím is megjegyzi', async ({
    page,
  }) => {
    await page.goto('/hu');
    await page.getByRole('button', { name: /^EN/ }).click();
    await expect(page).toHaveURL(/\/en$/);
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('egy nyelvi cím puszta megnyitása nem írja felül a böngésző nyelvéből adódó alapértéket', async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: 'hu-HU' });
    const page = await context.newPage();
    await page.goto('/en');
    await page.goto('/');
    await expect(page).toHaveURL(/\/hu$/);
    await context.close();
  });

  test('nem létező cím 404-es státuszt kap, de használható oldalt mutat', async ({ page }) => {
    const response = await page.goto('/nincs-ilyen-oldal');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});
