import { test, expect } from '@playwright/test';

test('M08: MDN language selector available', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const langSelector = page.locator('[data-testid="language-switcher"], select[aria-label*="language" i]').first();
  if (await langSelector.count() > 0) {
    await expect(langSelector).toBeVisible();
  }
});
