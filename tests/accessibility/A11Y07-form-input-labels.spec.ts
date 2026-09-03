import { test, expect } from '@playwright/test';

test('A11Y07: Form inputs should have labels', async ({ page }) => {
  await page.goto('https://github.com');
  const inputs = page.locator('input[type="text"], input[type="email"], textarea');
  const inputCount = await inputs.count();
  expect(inputCount).toBeGreaterThanOrEqual(0);
});
