import { test, expect } from '@playwright/test';

test('PERF03: MDN page load time', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('https://developer.mozilla.org', { waitUntil: 'load' });
  const loadTime = Date.now() - startTime;
  console.log(`MDN load time: ${loadTime}ms`);
  expect(loadTime).toBeGreaterThan(0);
});
