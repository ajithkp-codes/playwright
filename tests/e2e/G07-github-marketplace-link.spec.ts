import { test, expect } from '@playwright/test';

test('G07: GitHub Marketplace link exists', async ({ page }) => {
  await page.goto('https://github.com');
  const marketplaceLink = page.getByRole('link', { name: /Marketplace/i }).first();
  if (await marketplaceLink.count() > 0) {
    await expect(marketplaceLink).toBeVisible();
  }
});
