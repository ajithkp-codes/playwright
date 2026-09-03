import { test, expect } from '@playwright/test';

test('A11Y15: Should support tab navigation', async ({ page }) => {
  await page.goto('https://github.com');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => {
    return document.activeElement?.tagName;
  });
  expect(focused).toBeTruthy();
});
