import { expect, test } from '@playwright/test';

test.describe('biztonsági fejlécek', () => {
  test('az oldal küldi a CSP-t és a keretbe ágyazás elleni fejléceket', async ({ request }) => {
    for (const path of ['/hu', '/en', '/nincs-ilyen-oldal']) {
      const headers = (await request.get(path)).headers();
      expect(headers['content-security-policy'], path).toContain("default-src 'self'");
      expect(headers['content-security-policy'], path).toContain("frame-ancestors 'none'");
      expect(headers['x-frame-options'], path).toBe('DENY');
      expect(headers['x-content-type-options'], path).toBe('nosniff');
      expect(headers['referrer-policy'], path).toBe('strict-origin-when-cross-origin');
    }
  });

  test('a CSP nem tilt le semmit: nincs szabálysértés és konzolhiba a használat közben', async ({
    page,
  }) => {
    const problems: string[] = [];
    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await page.goto('/hu');
    // A beágyazott szkriptek (téma, eseményismétlés) és a hidratálás is lefut.
    await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/);
    await page.getByRole('button', { name: /^EN/ }).click();
    await expect(page).toHaveURL(/\/en$/);
    await page.locator('app-job-card summary').first().click();
    await page.getByRole('button', { name: /light|dark|világos|sötét/i }).click();

    expect(problems).toEqual([]);
  });
});
