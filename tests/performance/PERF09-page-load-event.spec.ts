import { test, expect } from '@playwright/test';

test('PERF09: Page load event tracking', async ({ page }) => {
  let loadEventFired = false;
  page.on('load', () => {
    loadEventFired = true;
  });
  await page.goto('https://playwright.dev');
  expect(loadEventFired).toBeTruthy();
});
