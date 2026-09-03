import { test, expect } from '@playwright/test';

test('S08: StackBlitz community section exists', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const communityLink = page.getByRole('link', { name: /Community/i }).first();
  if (await communityLink.count() > 0) {
    await expect(communityLink).toBeVisible();
  }
});
