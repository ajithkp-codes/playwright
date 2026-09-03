import { test, expect } from '@playwright/test';

test('P01: Playwright.dev page loads with correct title', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
