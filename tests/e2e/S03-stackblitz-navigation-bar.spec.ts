import { test, expect } from '@playwright/test';

test('S03: StackBlitz navigation bar present', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const navbar = page.locator('nav, [role="navigation"]').first();
  await expect(navbar).toBeVisible();
});
