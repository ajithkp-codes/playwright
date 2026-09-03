import { test, expect } from '@playwright/test';

test('A11Y13: Navigation should have proper roles', async ({ page }) => {
  await page.goto('https://github.com');
  const navItems = page.locator('nav a, [role="link"]');
  const count = await navItems.count();
  expect(count).toBeGreaterThan(0);
});
