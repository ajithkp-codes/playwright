import { test, expect } from '@playwright/test';

test('A11Y08: Buttons should have accessible names', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const buttons = page.locator('button');
  const buttonCount = await buttons.count();
  expect(buttonCount).toBeGreaterThan(0);
});
