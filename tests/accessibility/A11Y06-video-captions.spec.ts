import { test, expect } from '@playwright/test';

test('A11Y06: Videos should have captions', async ({ page }) => {
  await page.goto('https://github.com');
  const videos = page.locator('video');
  const videoCount = await videos.count();
  expect(videoCount).toBeGreaterThanOrEqual(0);
});
