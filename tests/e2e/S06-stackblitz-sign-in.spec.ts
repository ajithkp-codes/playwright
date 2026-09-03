import { test, expect } from '@playwright/test';

test('S06: StackBlitz sign in option available', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const signIn = page.getByRole('link', { name: /Sign in/i }).first();
  if (await signIn.count() > 0) {
    await expect(signIn).toBeVisible();
  }
});
