import { defineConfig, devices } from '@playwright/test';

const port = 8799;

// The tests look at the production build on Cloudflare's local server (wrangler dev),
// with the same 404 and address handling as in production. Beforehand: npm run build.
export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/test-output',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['github'], ['list']] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    launchOptions: {
      // Only needed where Playwright's own browser is not installed.
      executablePath: process.env['E2E_CHROMIUM_PATH'] || undefined,
      args: process.env['E2E_CHROMIUM_PATH'] ? ['--no-sandbox'] : [],
    },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npx wrangler dev --port ${port} --ip 127.0.0.1`,
    url: `http://127.0.0.1:${port}/hu`,
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
