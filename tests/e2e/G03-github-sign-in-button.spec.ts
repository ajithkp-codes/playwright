import { test, expect } from '@playwright/test';

test('G03: GitHub Sign in button is present', async ({ page }) => {
  await page.goto('https://github.com');
  const signInBtn = page.getByRole('link', { name: /Sign in/i });
  await expect(signInBtn).toBeVisible();
});
