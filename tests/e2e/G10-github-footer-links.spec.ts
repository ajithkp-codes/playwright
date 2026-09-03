import { test, expect } from '@playwright/test';

test('G10: GitHub footer contains links', async ({ page }) => {
  await page.goto('https://github.com');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const footerLinks = page.locator('footer a');
  const count = await footerLinks.count();
  expect(count).toBeGreaterThan(0);
});
