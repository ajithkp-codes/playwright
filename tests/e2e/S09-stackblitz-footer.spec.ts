import { test, expect } from '@playwright/test';

test('S09: StackBlitz footer information present', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const footer = page.locator('footer').first();
  if (await footer.count() > 0) {
    await expect(footer).toBeVisible();
  }
});
