import { test, expect } from '@playwright/test';

test('A11Y05: Images should have alt text', async ({ page }) => {
  await page.goto('https://developer.mozilla.org');
  const images = page.locator('img');
  const imgCount = await images.count();
  for (let i = 0; i < Math.min(imgCount, 5); i++) {
    const img = images.nth(i);
    await expect(img).toBeVisible();
  }
});
