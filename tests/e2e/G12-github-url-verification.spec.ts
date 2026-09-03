import { test, expect } from '@playwright/test';

test('G12: GitHub URL verification', async ({ page }) => {
  await page.goto('https://github.com');
  expect(page.url()).toContain('github.com');
});
