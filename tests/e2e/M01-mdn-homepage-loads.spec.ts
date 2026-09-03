import { test, expect } from '@playwright/test';

test('M01: MDN homepage loads successfully', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  await expect(page).toHaveTitle(/MDN/);
});
