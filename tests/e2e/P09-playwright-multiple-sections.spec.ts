import { test, expect } from '@playwright/test';

test('P09: Playwright.dev has multiple sections', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const sections = await page.locator('section').count();
  expect(sections).toBeGreaterThan(0);
});
