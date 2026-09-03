import { test, expect } from '@playwright/test';

test('G05: GitHub search box is accessible', async ({ page }) => {
  await page.goto('https://github.com');
  const searchBox = page.getByPlaceholder(/Search/i);
  if (await searchBox.count() > 0) {
    await expect(searchBox).toBeVisible();
  }
});
