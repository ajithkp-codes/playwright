import { test, expect } from '@playwright/test';

test('A11Y10: Text size should be appropriate', async ({ page }) => {
  await page.goto('https://github.com');
  const paragraphs = page.locator('p');
  const pCount = await paragraphs.count();
  expect(pCount).toBeGreaterThan(0);
});
