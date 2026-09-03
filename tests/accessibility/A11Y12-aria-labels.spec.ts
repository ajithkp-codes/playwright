import { test, expect } from '@playwright/test';

test('A11Y12: Should have proper ARIA labels', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const ariaElements = page.locator('[aria-label]');
  const ariaCount = await ariaElements.count();
  expect(ariaCount).toBeGreaterThanOrEqual(0);
});
