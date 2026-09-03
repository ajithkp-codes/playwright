import { test, expect } from '@playwright/test';

test('G04: GitHub Sign up button is clickable', async ({ page }) => {
  await page.goto('https://github.com');
  const signUpBtn = page.getByRole('link', { name: /Sign up/i });
  if (await signUpBtn.isVisible()) {
    await expect(signUpBtn).toBeEnabled();
  }
});
