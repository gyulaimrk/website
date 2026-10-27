import { expect, test } from '@playwright/test';

test.describe('security headers', () => {
  test('the site sends the CSP and the headers against embedding in a frame', async ({
    request,
  }) => {
    for (const path of ['/hu', '/en', '/no-such-page']) {
      const headers = (await request.get(path)).headers();
      expect(headers['content-security-policy'], path).toContain("default-src 'self'");
      expect(headers['content-security-policy'], path).toContain("frame-ancestors 'none'");
      expect(headers['x-frame-options'], path).toBe('DENY');
      expect(headers['x-content-type-options'], path).toBe('nosniff');
      expect(headers['referrer-policy'], path).toBe('strict-origin-when-cross-origin');
    }
  });

  test('the CSP blocks nothing: no violation and no console error during use', async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await page.goto('/hu');
    // The inline scripts (theme, event replay) and the hydration run too.
    await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/);
    await page.getByRole('button', { name: /^EN/ }).click();
    await expect(page).toHaveURL(/\/en$/);
    await page.locator('app-job-card summary').first().click();
    await page.getByRole('button', { name: /light|dark|világos|sötét/i }).click();

    expect(problems).toEqual([]);
  });
});
