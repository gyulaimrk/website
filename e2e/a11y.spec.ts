import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { contentHu } from '../src/app/data/content';

const LANGS = ['hu', 'en'] as const;
const THEMES = ['dark', 'light'] as const;

test.describe('accessibility (axe)', () => {
  for (const lang of LANGS) {
    for (const theme of THEMES) {
      test(`/${lang}, ${theme} theme: no WCAG 2.1 AA violations`, async ({ page }) => {
        // With reduced motion there is no half-transparent entrance animation that would give a false contrast report.
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await page.goto(`/${lang}`);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        // The content of the closed project lists is checked too.
        await page.evaluate(() =>
          document.querySelectorAll('details').forEach((details) => (details.open = true)),
        );

        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        expect(
          violations.map((v) => ({
            rule: v.id,
            impact: v.impact,
            targets: v.nodes.map((n) => n.target.join(' ')).slice(0, 5),
          })),
        ).toEqual([]);
      });
    }
  }
});

/** WCAG relative luminance and contrast ratio for two `#rrggbb` colours. */
function contrast(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(bl);
  };
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

test.describe('contrast that axe does not calculate because of the gradients', () => {
  for (const theme of THEMES) {
    test(`${theme} theme: the button text is readable on every gradient colour, the focus ring is visible`, async ({
      page,
    }) => {
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
      await page.goto('/hu');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const token = (name: string) =>
        page.evaluate(
          (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim(),
          name,
        );
      const [onAccent, accent, accent2, accent3, bg] = await Promise.all(
        ['--on-accent', '--accent', '--accent-2', '--accent-3', '--bg'].map(token),
      );

      for (const stop of [accent, accent2, accent3]) {
        expect(contrast(onAccent, stop), `text on the colour ${stop}`).toBeGreaterThanOrEqual(4.5);
      }
      // The focus ring (not text) must be at least 3:1 on the background.
      expect(contrast(accent3, bg), 'focus ring on the background').toBeGreaterThanOrEqual(3);
    });
  }
});

test.describe('hidden element and name', () => {
  test('the “back to top” button is reachable for the screen reader only when scrolled', async ({
    page,
  }) => {
    await page.goto('/hu');
    const link = page.getByRole('link', { name: contentHu.ui.backToTop });
    await expect(link).toHaveCount(0);
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(link).toBeVisible();
  });

  test.describe('mobilon', () => {
    test.use({ viewport: { width: 390, height: 800 } });

    test('the brand link’s name is complete even when the visible name is hidden', async ({
      page,
    }) => {
      await page.goto('/hu');
      const brand = page.getByRole('link', {
        name: `${contentHu.profile.name}: ${contentHu.ui.nav.home}`,
      });
      await expect(brand).toBeVisible();
    });
  });
});

test('internal links point to the real address of the language even without scripting', async ({
  request,
}) => {
  for (const lang of LANGS) {
    const html = await (await request.get(`/${lang}`)).text();
    expect(html).toContain(`href="/${lang}#rolam"`);
    expect(html).toContain(`href="/${lang}#main"`);
    expect(html).not.toMatch(/href="#[a-z]/);
  }
});
