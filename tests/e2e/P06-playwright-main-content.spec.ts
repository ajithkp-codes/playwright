import { test, expect } from '@playwright/test';

test('P06: Playwright.dev page has main content section', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const main = page.locator('main');
  await expect(main).toBeVisible();
});
