import { test, expect } from '@playwright/test';

test('M11: MDN page has text content', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toBeTruthy();
  expect(bodyText?.length).toBeGreaterThan(0);
});
