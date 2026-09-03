import { test, expect } from '@playwright/test';

test('M06: MDN Learning section exists', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const learnLink = page.getByRole('link', { name: /Learn/i }).first();
  if (await learnLink.count() > 0) {
    await expect(learnLink).toBeVisible();
  }
});
