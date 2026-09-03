import { test, expect } from '@playwright/test';

test('P03: Playwright.dev navigation menu exists', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
});
