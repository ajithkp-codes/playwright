import { test, expect } from '@playwright/test';

test('PERF05: First contentful paint metric', async ({ page }) => {
  await page.goto('https://playwright.dev', { waitUntil: 'load' });
  const fcp = await page.evaluate(() => {
    const paintEntries = window.performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry?.startTime || 0;
  });
  console.log(`FCP: ${fcp}ms`);
  expect(fcp).toBeGreaterThan(0);
});
