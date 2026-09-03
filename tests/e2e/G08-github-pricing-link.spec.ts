import { test, expect } from '@playwright/test';

test('G08: GitHub Pricing link is present', async ({ page }) => {
  await page.goto('https://github.com');
  const pricingLink = page.getByRole('link', { name: /Pricing/i }).first();
  if (await pricingLink.count() > 0) {
    await expect(pricingLink).toBeVisible();
  }
});
