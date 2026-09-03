import { test, expect } from '@playwright/test';

test('P07: Playwright.dev footer is visible', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});
