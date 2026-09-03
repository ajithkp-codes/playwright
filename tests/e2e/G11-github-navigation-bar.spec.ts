import { test, expect } from '@playwright/test';

test('G11: GitHub navigation bar present', async ({ page }) => {
  await page.goto('https://github.com');
  const navbar = page.locator('nav, [role="navigation"]').first();
  await expect(navbar).toBeVisible();
});
