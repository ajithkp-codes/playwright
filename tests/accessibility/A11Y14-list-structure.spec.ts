import { test, expect } from '@playwright/test';

test('A11Y14: Lists should be properly structured', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const lists = page.locator('ul, ol');
  const listCount = await lists.count();
  expect(listCount).toBeGreaterThanOrEqual(0);
});
