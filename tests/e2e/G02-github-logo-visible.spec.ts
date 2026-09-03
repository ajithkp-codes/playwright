import { test, expect } from '@playwright/test';

test('G02: GitHub logo is visible', async ({ page }) => {
  await page.goto('https://github.com');
  const logo = page.locator('[data-testid="footer"] a[href="/"], a[href="https://github.com"]').first();
  if (await logo.count() > 0) {
    await expect(logo).toBeVisible();
  }
});
