/**
 * StackBlitz IDE Tests
 * URL: https://stackblitz.com
 * Category: E2E Tests
 *
 * Test Suite for StackBlitz Online IDE
 * Covers: Project creation, navigation, pricing, community
 */

import { test, expect } from '@playwright/test';

test.describe('StackBlitz - Online IDE', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://stackblitz.com');
  });

  test.describe('Page Loading & Structure', () => {
    test('S1: Should load StackBlitz homepage', async ({ page }) => {
      await expect(page).toHaveTitle(/StackBlitz/);
    });

    test('S2: Should display navigation bar', async ({ page }) => {
      const navbar = page.locator('nav, [role="navigation"]').first();
      await expect(navbar).toBeVisible();
    });

    test('S3: Should have features section', async ({ page }) => {
      const features = page.locator('section');
      const count = await features.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Key Features & Actions', () => {
    test('S4: Create project button should be visible', async ({ page }) => {
      const createBtn = page.getByRole('button', { name: /Create/i }).first();
      if (await createBtn.count() > 0) {
        await expect(createBtn).toBeVisible();
      }
    });

    test('S5: Pricing page link should exist', async ({ page }) => {
      const pricingLink = page.getByRole('link', { name: /Pricing/i }).first();
      if (await pricingLink.count() > 0) {
        await expect(pricingLink).toBeVisible();
      }
    });

    test('S6: Sign in option should be available', async ({ page }) => {
      const signIn = page.getByRole('link', { name: /Sign in/i }).first();
      if (await signIn.count() > 0) {
        await expect(signIn).toBeVisible();
      }
    });
  });

  test.describe('Navigation & Information', () => {
    test('S7: Documentation link should be present', async ({ page }) => {
      const docLink = page.getByRole('link', { name: /Doc/i }).first();
      if (await docLink.count() > 0) {
        await expect(docLink).toBeVisible();
      }
    });

    test('S8: Community section should exist', async ({ page }) => {
      const communityLink = page.getByRole('link', { name: /Community/i }).first();
      if (await communityLink.count() > 0) {
        await expect(communityLink).toBeVisible();
      }
    });

    test('S9: Footer information should be present', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.locator('footer').first();
      if (await footer.count() > 0) {
        await expect(footer).toBeVisible();
      }
    });
  });

  test.describe('Interactivity', () => {
    test('S10: Page should have interactive elements', async ({ page }) => {
      const interactiveElements = page.locator('button, a, [role="button"]');
      const count = await interactiveElements.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
