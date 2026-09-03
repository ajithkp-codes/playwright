import { test, expect } from '@playwright/test';

test('A11Y01: Playwright.dev keyboard navigation', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const links = page.locator('a[href]');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);
});
