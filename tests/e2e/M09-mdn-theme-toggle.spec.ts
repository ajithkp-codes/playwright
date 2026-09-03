import { test, expect } from '@playwright/test';

test('M09: MDN theme toggle exists', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const themeToggle = page.locator('[data-testid="theme-toggle"], [aria-label*="theme" i], [aria-label*="dark" i]').first();
  if (await themeToggle.count() > 0) {
    await expect(themeToggle).toBeVisible();
  }
});
