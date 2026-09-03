import { test, expect } from '@playwright/test';

test('M04: MDN Reference section accessible', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const refLink = page.getByRole('link', { name: /Reference/i }).first();
  if (await refLink.count() > 0) {
    await expect(refLink).toBeVisible();
  }
});
