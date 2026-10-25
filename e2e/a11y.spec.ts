import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const LANGS = ['hu', 'en'] as const;
const THEMES = ['dark', 'light'] as const;

test.describe('hozzáférhetőség (axe)', () => {
  for (const lang of LANGS) {
    for (const theme of THEMES) {
      test(`/${lang}, ${theme} téma: nincs WCAG 2.1 AA hiba`, async ({ page }) => {
        // Mozgáscsökkentéssel nincs félig átlátszó belépő animáció, ami hamis kontrasztjelzést adna.
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
        await page.goto(`/${lang}`);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        // A zárt projektlisták tartalmát is ellenőrizzük.
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
