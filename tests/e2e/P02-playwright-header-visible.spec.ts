import { test, expect } from '@playwright/test';

test('P02: Playwright.dev header is visible', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page.locator('header')).toBeVisible();
});
