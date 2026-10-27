import { expect, test } from '@playwright/test';
import { contentHu } from '../src/app/data/content';

test.describe('use on the Hungarian page', () => {
  test.beforeEach(async ({ page }) => page.goto('/hu'));

  test('there is a single h1, and the first Tab lands on the skip-to-content link', async ({
    page,
  }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText(contentHu.ui.skipLink);
  });

  test('there are no two elements with the same id on the page', async ({ page }) => {
    const duplicates = await page.evaluate(() => {
      const seen = new Set<string>();
      const dup = new Set<string>();
      document.querySelectorAll('[id]').forEach(({ id }) => (seen.has(id) ? dup : seen).add(id));
      return [...dup];
    });
    expect(duplicates).toEqual([]);
  });

  test('the menu link scrolls to the section, the active item is marked, the title does not change', async ({
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

  test('the theme can be switched, and it stays after a refresh', async ({ page }) => {
    const html = page.locator('html');
    const before = await html.getAttribute('data-theme');
    await page
      .getByRole('button', {
        name: new RegExp(`${contentHu.ui.toggles.toLight}|${contentHu.ui.toggles.toDark}`),
      })
      .click();
    // The `data-theme` attribute is set by an effect, so we wait for the change.
    await expect(html).not.toHaveAttribute('data-theme', before!);
    const after = await html.getAttribute('data-theme');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', after!);
  });

  test('the project list of a non-current employer is closed, and can be opened', async ({
    page,
  }) => {
    const second = contentHu.jobs[1];
    const card = page.locator('app-job-card', { hasText: second.company });
    const projectName = second.projects![0].name;
    const heading = card.getByRole('heading', { name: projectName, level: 4 });
    await expect(heading).toBeHidden();
    await card.locator('summary').click();
    await expect(heading).toBeVisible();
  });

  test('the projects of the current employer are open by default', async ({ page }) => {
    const first = contentHu.jobs[0];
    const card = page.locator('app-job-card', { hasText: first.company });
    await expect(
      card.getByRole('heading', { name: first.projects![0].name, level: 4 }),
    ).toBeVisible();
  });

  test('the title of the Anthropic certificates points to the verification page', async ({
    page,
  }) => {
    const anthropic = contentHu.studies.filter((s) => s.where === 'Anthropic');
    for (const study of anthropic) {
      const link = page.locator('#tanulmanyok').getByRole('link', { name: study.title });
      await expect(link).toHaveAttribute('href', study.url!);
      await expect(link).toHaveAttribute('target', '_blank');
    }
  });

  test('the tasks of the RDI project can be opened and read', async ({ page }) => {
    const job = contentHu.jobs.find((j) => j.company.startsWith('RDI'))!;
    const card = page.locator('app-job-card', { hasText: job.company });
    await card.locator('summary').click();
    for (const point of job.projects![0].points!) {
      await expect(card.getByText(point, { exact: true })).toBeVisible();
    }
  });

  test('the résumé is a downloadable PDF', async ({ page, request }) => {
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

  test('the contact section also has the résumé download and the email', async ({ page }) => {
    const panel = page.locator('#kapcsolat');
    await expect(panel.getByRole('link', { name: contentHu.ui.contact.cv })).toBeVisible();
    await expect(panel.getByRole('link', { name: contentHu.profile.email })).toHaveAttribute(
      'href',
      `mailto:${contentHu.profile.email}`,
    );
  });

  test('the contact section states the availability', async ({ page }) => {
    await expect(page.locator('#kapcsolat .availability')).toHaveText(
      contentHu.ui.contact.availability,
    );
  });

  test('there is no phone number and date of birth on the page', async ({ page }) => {
    const text = await page.locator('body').innerText();
    expect(text).not.toMatch(/\+36\s?\d/);
    expect(text).not.toContain('1997');
  });
});

test.describe('mobile view', () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test('the menu opens with the hamburger, and closes on clicking a link', async ({ page }) => {
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

  test('there is no horizontal scrolling', async ({ page }) => {
    await page.goto('/hu');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
