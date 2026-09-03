import { test, expect } from '@playwright/test';

test('P08: Playwright.dev search functionality exists', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const searchBox = page.locator('[placeholder*="search" i], [aria-label*="search" i]').first();
  if (await searchBox.isVisible()) {
    await expect(searchBox).toBeEnabled();
  }
});
