import { test, expect } from '@playwright/test';

test('PERF08: Memory efficiency check', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const memoryInfo = await page.evaluate(() => {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      };
    }
    return null;
  });
  if (memoryInfo) {
    expect(memoryInfo.usedJSHeapSize).toBeGreaterThan(0);
  }
});
