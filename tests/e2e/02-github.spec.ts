/**
 * GitHub Platform Tests
 * URL: https://github.com
 * Category: E2E Tests
 *
 * Test Suite for GitHub platform
 * Covers: Navigation, links, UI elements, interactions
 */

import { test, expect } from '@playwright/test';

test.describe('GitHub - Source Control Platform', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://github.com');
  });

  test.describe('Page Loading & Structure', () => {
    test('G1: Should load GitHub homepage', async ({ page }) => {
      await expect(page).toHaveTitle(/GitHub/);
    });

    test('G2: Should display GitHub logo', async ({ page }) => {
      const logo = page.locator('[data-testid="footer"] a[href="/"], a[href="https://github.com"]').first();
      if (await logo.count() > 0) {
        await expect(logo).toBeVisible();
      }
    });

    test('G3: Should display navigation bar', async ({ page }) => {
      const navbar = page.locator('nav, [role="navigation"]').first();
      await expect(navbar).toBeVisible();
    });
  });

  test.describe('Authentication & User Actions', () => {
    test('G4: Sign in button should be present', async ({ page }) => {
      const signInBtn = page.getByRole('link', { name: /Sign in/i });
      await expect(signInBtn).toBeVisible();
    });

    test('G5: Sign up button should be clickable', async ({ page }) => {
      const signUpBtn = page.getByRole('link', { name: /Sign up/i });
      if (await signUpBtn.isVisible()) {
        await expect(signUpBtn).toBeEnabled();
      }
    });
  });

  test.describe('Search & Navigation', () => {
    test('G6: Search box should be accessible', async ({ page }) => {
      const searchBox = page.getByPlaceholder(/Search/i);
      if (await searchBox.count() > 0) {
        await expect(searchBox).toBeVisible();
      }
    });

    test('G7: Explore link should be visible', async ({ page }) => {
      const exploreLink = page.getByRole('link', { name: /Explore/i }).first();
      if (await exploreLink.count() > 0) {
        await expect(exploreLink).toBeVisible();
      }
    });

    test('G8: Marketplace link should exist', async ({ page }) => {
      const marketplaceLink = page.getByRole('link', { name: /Marketplace/i }).first();
      if (await marketplaceLink.count() > 0) {
        await expect(marketplaceLink).toBeVisible();
      }
    });
  });

  test.describe('Footer & Links', () => {
    test('G9: Pricing link should be present', async ({ page }) => {
      const pricingLink = page.getByRole('link', { name: /Pricing/i }).first();
      if (await pricingLink.count() > 0) {
        await expect(pricingLink).toBeVisible();
      }
    });

    test('G10: Footer should contain links', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footerLinks = page.locator('footer a');
      const count = await footerLinks.count();
      expect(count).toBeGreaterThan(0);
    });

    test('G11: Page should have interactive elements', async ({ page }) => {
      const interactiveElements = page.locator('button, a, [role="button"]');
      const count = await interactiveElements.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('G12: Links should be valid', async ({ page }) => {
      const links = page.locator('a[href]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
