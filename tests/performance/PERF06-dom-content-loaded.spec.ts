import { test, expect } from '@playwright/test';

test('PERF06: DOM content loaded time', async ({ page }) => {
  await page.goto('https://github.com');
  const domLoadTime = await page.evaluate(() => {
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
  });
  console.log(`DOM Load Time: ${domLoadTime}ms`);
  expect(domLoadTime).toBeGreaterThan(0);
});
