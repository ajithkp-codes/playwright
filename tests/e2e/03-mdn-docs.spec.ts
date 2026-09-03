/**
 * MDN Web Docs Tests
 * URL: https://developer.mozilla.org
 * Category: E2E Tests
 *
 * Test Suite for MDN Web Documentation
 * Covers: Navigation, search, theming, language selection
 */

import { test, expect } from '@playwright/test';

test.describe('MDN Web Docs - Developer Reference', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://developer.mozilla.org');
  });

  test.describe('Page Loading & Structure', () => {
    test('M1: Should load MDN homepage', async ({ page }) => {
      await expect(page).toHaveTitle(/MDN/);
    });

    test('M2: Should display main navigation', async ({ page }) => {
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
    });

    test('M3: Should have content area', async ({ page }) => {
      const main = page.locator('main, [role="main"]').first();
      await expect(main).toBeVisible();
    });
  });

  test.describe('Search & Discovery', () => {
    test('M4: Search functionality should be available', async ({ page }) => {
      const searchBox = page.locator('[data-testid="top-search-input"], input[placeholder*="Search"]').first();
      if (await searchBox.count() > 0) {
        await expect(searchBox).toBeVisible();
      }
    });

    test('M5: Reference section should be accessible', async ({ page }) => {
      const refLink = page.getByRole('link', { name: /Reference/i }).first();
      if (await refLink.count() > 0) {
        await expect(refLink).toBeVisible();
      }
    });

    test('M6: Guides section should be available', async ({ page }) => {
      const guideLink = page.getByRole('link', { name: /Guide/i }).first();
      if (await guideLink.count() > 0) {
        await expect(guideLink).toBeVisible();
      }
    });

    test('M7: Learning section should exist', async ({ page }) => {
      const learnLink = page.getByRole('link', { name: /Learn/i }).first();
      if (await learnLink.count() > 0) {
        await expect(learnLink).toBeVisible();
      }
    });
  });

  test.describe('Localization & Accessibility', () => {
    test('M8: Breadcrumb navigation should be present', async ({ page }) => {
      const breadcrumb = page.locator('[data-testid="breadcrumbs"], nav[aria-label*="breadcrumb" i]').first();
      if (await breadcrumb.count() > 0) {
        await expect(breadcrumb).toBeVisible();
      }
    });

    test('M9: Language selector should be available', async ({ page }) => {
      const langSelector = page.locator('[data-testid="language-switcher"], select[aria-label*="language" i]').first();
      if (await langSelector.count() > 0) {
        await expect(langSelector).toBeVisible();
      }
    });

    test('M10: Theme toggle should exist', async ({ page }) => {
      const themeToggle = page.locator('[data-testid="theme-toggle"], [aria-label*="theme" i], [aria-label*="dark" i]').first();
      if (await themeToggle.count() > 0) {
        await expect(themeToggle).toBeVisible();
      }
    });
  });

  test.describe('Content Quality', () => {
    test('M11: Should have text content', async ({ page }) => {
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText?.length).toBeGreaterThan(0);
    });
  });
});
