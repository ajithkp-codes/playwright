import { test, expect } from '@playwright/test';

test('PERF04: StackBlitz page load time', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('https://stackblitz.com', { waitUntil: 'networkidle' });
  const loadTime = Date.now() - startTime;
  console.log(`StackBlitz load time: ${loadTime}ms`);
  expect(loadTime).toBeLessThan(30000);
});
