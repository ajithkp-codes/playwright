import { test, expect } from '@playwright/test';

test('S01: StackBlitz homepage loads', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  await expect(page).toHaveTitle(/StackBlitz/);
});
