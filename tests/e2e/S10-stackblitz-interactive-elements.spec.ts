import { test, expect } from '@playwright/test';

test('S10: StackBlitz page is interactive', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const interactiveElements = page.locator('button, a, [role="button"]');
  const count = await interactiveElements.count();
  expect(count).toBeGreaterThan(0);
});
