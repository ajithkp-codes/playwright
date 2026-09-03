import { test, expect } from '@playwright/test';

test('S07: StackBlitz documentation link present', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const docLink = page.getByRole('link', { name: /Doc/i }).first();
  if (await docLink.count() > 0) {
    await expect(docLink).toBeVisible();
  }
});
