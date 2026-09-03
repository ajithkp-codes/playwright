import { test, expect } from '@playwright/test';

test('M03: MDN main navigation menu visible', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible();
});
