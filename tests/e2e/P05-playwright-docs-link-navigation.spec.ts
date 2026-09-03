import { test, expect } from '@playwright/test';

test('P05: Playwright.dev Docs link navigation works', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: /Docs/i }).first().click();
  await expect(page).toHaveURL(/docs/);
});
