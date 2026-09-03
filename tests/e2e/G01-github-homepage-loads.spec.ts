import { test, expect } from '@playwright/test';

test('G01: GitHub homepage loads', async ({ page }) => {
  await page.goto('https://github.com');
  await expect(page).toHaveTitle(/GitHub/);
});
