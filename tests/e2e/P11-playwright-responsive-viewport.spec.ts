import { test, expect } from '@playwright/test';

test('P11: Playwright.dev is responsive - viewport check', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const viewportSize = page.viewportSize();
  expect(viewportSize?.width).toBeGreaterThan(0);
});
