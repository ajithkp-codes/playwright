import { test, expect } from '@playwright/test';

test('PERF10: Network activity monitoring', async ({ page }) => {
  let requestCount = 0;
  let responseCount = 0;
  page.on('request', () => requestCount++);
  page.on('response', () => responseCount++);
  await page.goto('https://github.com');
  expect(requestCount).toBeGreaterThan(0);
  expect(responseCount).toBeGreaterThan(0);
});
