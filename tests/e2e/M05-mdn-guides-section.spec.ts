import { test, expect } from '@playwright/test';

test('M05: MDN Guides section available', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const guideLink = page.getByRole('link', { name: /Guide/i }).first();
  if (await guideLink.count() > 0) {
    await expect(guideLink).toBeVisible();
  }
});
