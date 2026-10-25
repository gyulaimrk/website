import { expect, test } from '@playwright/test';
import { contentHu } from '../src/app/data/content';

test.describe('használat a magyar oldalon', () => {
  test.beforeEach(async ({ page }) => page.goto('/hu'));

  test('egyetlen h1 van, és az első Tab a tartalomra ugró linkre áll', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText(contentHu.ui.skipLink);
  });

  test('nincs két azonos azonosítójú elem az oldalon', async ({ page }) => {
    const duplicates = await page.evaluate(() => {
      const seen = new Set<string>();
      const dup = new Set<string>();
      document.querySelectorAll('[id]').forEach(({ id }) => (seen.has(id) ? dup : seen).add(id));
      return [...dup];
    });
    expect(duplicates).toEqual([]);
  });

  test('a menü linkje a szekcióhoz görget, az aktív pont jelölt, a cím nem változik', async ({
    page,
  }) => {
    const link = contentHu.ui.nav.links.find((l) => l.fragment === 'tapasztalat')!;
    const nav = page.getByRole('navigation', { name: contentHu.ui.nav.label });
    await nav.getByRole('link', { name: link.label }).click();
    await expect(page).toHaveURL(/\/hu$/);
    await expect(page.locator('#tapasztalat')).toBeInViewport();
    await expect(nav.getByRole('link', { name: link.label })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  test('a téma váltható, és frissítés után is megmarad', async ({ page }) => {
    const html = page.locator('html');
    const before = await html.getAttribute('data-theme');
    await page
      .getByRole('button', {
        name: new RegExp(`${contentHu.ui.toggles.toLight}|${contentHu.ui.toggles.toDark}`),
      })
      .click();
    // A `data-theme` attribútumot egy effect állítja, ezért a változást megvárjuk.
    await expect(html).not.toHaveAttribute('data-theme', before!);
    const after = await html.getAttribute('data-theme');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', after!);
  });

  test('a nem aktuális munkahely projektlistája zárt, és megnyitható', async ({ page }) => {
    const second = contentHu.jobs[1];
    const card = page.locator('app-job-card', { hasText: second.company });
    const projectName = second.projects![0].name;
    const heading = card.getByRole('heading', { name: projectName, level: 4 });
    await expect(heading).toBeHidden();
    await card.locator('summary').click();
    await expect(heading).toBeVisible();
  });

  test('az aktuális munkahely projektjei alapból nyitva vannak', async ({ page }) => {
    const first = contentHu.jobs[0];
    const card = page.locator('app-job-card', { hasText: first.company });
    await expect(
      card.getByRole('heading', { name: first.projects![0].name, level: 4 }),
    ).toBeVisible();
  });

  test('az Anthropic-tanúsítványok címe a hitelesítő oldalra mutat', async ({ page }) => {
    const anthropic = contentHu.studies.filter((s) => s.where === 'Anthropic');
    for (const study of anthropic) {
      const link = page.locator('#tanulmanyok').getByRole('link', { name: study.title });
      await expect(link).toHaveAttribute('href', study.url!);
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('a McDonald’s projekt feladatai nyithatók és olvashatók', async ({ page }) => {
    const job = contentHu.jobs.find((j) => j.company.startsWith('RDI'))!;
    const card = page.locator('app-job-card', { hasText: job.company });
    await card.locator('summary').click();
    for (const point of job.projects![0].points!) {
      await expect(card.getByText(point, { exact: true })).toBeVisible();
    }
  });

  test('az önéletrajz letölthető PDF', async ({ page, request }) => {
    const link = page.locator('#top').getByRole('link', { name: contentHu.ui.hero.cv });
    const href = await link.getAttribute('href');
    expect(href).toBe(contentHu.profile.cv);
    const response = await request.get(`/${href}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
    expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
    const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
    expect(download.suggestedFilename()).toBe(href!.split('/').pop());
  });

  test('a kapcsolat szekcióban is van önéletrajz-letöltés és e-mail', async ({ page }) => {
    const panel = page.locator('#kapcsolat');
    await expect(panel.getByRole('link', { name: contentHu.ui.contact.cv })).toBeVisible();
    await expect(panel.getByRole('link', { name: contentHu.profile.email })).toHaveAttribute(
      'href',
      `mailto:${contentHu.profile.email}`,
    );
  });

  test('a kapcsolat szekció kiírja az elérhetőséget', async ({ page }) => {
    await expect(page.locator('#kapcsolat .availability')).toHaveText(
      contentHu.ui.contact.availability,
    );
  });

  test('az oldalon nincs telefonszám és születési dátum', async ({ page }) => {
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/\+36\s?\d/);
    expect(text).not.toContain('1997');
  });
});

test.describe('mobil nézet', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('a menü a hamburgerrel nyílik, linkre kattintva bezárul', async ({ page }) => {
    await page.goto('/hu');
    const burger = page.getByRole('button', { name: contentHu.ui.nav.openMenu });
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await burger.click();
    const close = page.getByRole('button', { name: contentHu.ui.nav.closeMenu });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    const link = contentHu.ui.nav.links[0];
    await page
      .getByRole('navigation', { name: contentHu.ui.nav.label })
      .getByRole('link', { name: link.label })
      .click();
    await expect(page.getByRole('button', { name: contentHu.ui.nav.openMenu })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  test('nincs vízszintes görgetés', async ({ page }) => {
    await page.goto('/hu');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
