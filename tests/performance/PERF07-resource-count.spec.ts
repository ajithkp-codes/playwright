import { test, expect } from '@playwright/test';

test('PERF07: Resource count tracking', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const resourceCount = await page.evaluate(() => {
    const resources = window.performance.getEntriesByType('resource');
    return resources.length;
  });
  console.log(`Resources loaded: ${resourceCount}`);
  expect(resourceCount).toBeGreaterThanOrEqual(0);
});
