import { test, expect } from '@playwright/test';

test('M10: MDN content area is rendered', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const main = page.locator('main, [role="main"]').first();
  await expect(main).toBeVisible();
});
