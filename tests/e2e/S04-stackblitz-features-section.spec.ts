import { test, expect } from '@playwright/test';

test('S04: StackBlitz features section available', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const features = page.locator('section');
  const count = await features.count();
  expect(count).toBeGreaterThan(0);
});
