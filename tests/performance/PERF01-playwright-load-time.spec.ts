import { test, expect } from '@playwright/test';

test('PERF01: Playwright.dev page load time', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('https://playwright.dev', { waitUntil: 'load' });
  const loadTime = Date.now() - startTime;
  console.log(`Playwright.dev load time: ${loadTime}ms`);
  expect(loadTime).toBeGreaterThan(0);
});
