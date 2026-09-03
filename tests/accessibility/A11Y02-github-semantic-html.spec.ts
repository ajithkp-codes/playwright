import { test, expect } from '@playwright/test';

test('A11Y02: GitHub semantic HTML structure', async ({ page }) => {
  await page.goto('https://github.com');
  const headers = page.locator('h1, h2, h3, h4, h5, h6');
  const headerCount = await headers.count();
  expect(headerCount).toBeGreaterThan(0);
});
