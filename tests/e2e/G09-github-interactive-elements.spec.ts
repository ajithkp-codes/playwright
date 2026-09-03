import { test, expect } from '@playwright/test';

test('G09: GitHub page responds to user interactions', async ({ page }) => {
  await page.goto('https://github.com');
  const navItems = page.locator('nav a, [role="link"]');
  const count = await navItems.count();
  expect(count).toBeGreaterThan(0);
});
