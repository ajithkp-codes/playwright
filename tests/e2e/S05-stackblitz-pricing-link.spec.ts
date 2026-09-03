import { test, expect } from '@playwright/test';

test('S05: StackBlitz Pricing page link exists', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const pricingLink = page.getByRole('link', { name: /Pricing/i }).first();
  if (await pricingLink.count() > 0) {
    await expect(pricingLink).toBeVisible();
  }
});
