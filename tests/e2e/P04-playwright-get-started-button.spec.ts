import { test, expect } from '@playwright/test';

test('P04: Playwright.dev Get Started button is clickable', async ({ page }) => {
  await page.goto('https://playwright.dev');
  const getStartedBtn = page.getByRole('link', { name: /Get started/i });
  await expect(getStartedBtn).toBeVisible();
});
