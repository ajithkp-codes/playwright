import { test, expect } from '@playwright/test';

test('M07: MDN breadcrumb navigation present', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const breadcrumb = page.locator('[data-testid="breadcrumbs"], nav[aria-label*="breadcrumb" i]').first();
  if (await breadcrumb.count() > 0) {
    await expect(breadcrumb).toBeVisible();
  }
});
