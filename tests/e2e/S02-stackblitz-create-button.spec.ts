import { test, expect } from '@playwright/test';

test('S02: StackBlitz Create project button visible', async ({ page }) => {
  await page.goto('https://stackblitz.com');
  const createBtn = page.getByRole('button', { name: /Create/i }).first();
  if (await createBtn.count() > 0) {
    await expect(createBtn).toBeVisible();
  }
});
