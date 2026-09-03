import { test, expect } from '@playwright/test';

test('P10: Playwright.dev page has text content', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toBeTruthy();
  expect(bodyText?.length).toBeGreaterThan(0);
});
