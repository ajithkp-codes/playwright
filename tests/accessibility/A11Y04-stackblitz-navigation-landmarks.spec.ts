import { test, expect } from '@playwright/test';

test('A11Y04: StackBlitz navigation landmarks', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const nav = page.locator('nav, [role="navigation"]');
  const count = await nav.count();
  expect(count).toBeGreaterThan(0);
});
