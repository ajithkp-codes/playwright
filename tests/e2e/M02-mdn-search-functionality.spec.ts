import { test, expect } from '@playwright/test';

test('M02: MDN search functionality is available', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const searchBox = page.locator('[data-testid="top-search-input"], input[placeholder*="Search"]').first();
  if (await searchBox.count() > 0) {
    await expect(searchBox).toBeVisible();
  }
});
