import { test, expect } from '@playwright/test';

test('PERF02: GitHub page load time', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('https://github.com', { waitUntil: 'load' });
  const loadTime = Date.now() - startTime;
  console.log(`GitHub load time: ${loadTime}ms`);
  expect(loadTime).toBeGreaterThan(0);
});
