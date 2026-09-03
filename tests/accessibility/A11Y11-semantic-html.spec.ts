import { test, expect } from '@playwright/test';

test('A11Y11: Should use semantic HTML', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const main = page.locator('main');
  await expect(main).toBeVisible();
});
