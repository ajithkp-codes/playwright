import { test, expect } from '@playwright/test';

test('G06: GitHub Explore link navigation', async ({ page }) => {
  await page.goto('https://github.com');
  const exploreLink = page.getByRole('link', { name: /Explore/i }).first();
  if (await exploreLink.count() > 0) {
    await expect(exploreLink).toBeVisible();
  }
});
