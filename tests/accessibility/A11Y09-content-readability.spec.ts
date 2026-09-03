import { test, expect } from '@playwright/test';

test('A11Y09: Content should be readable', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toBeTruthy();
  expect(bodyText?.length).toBeGreaterThan(0);
});
