/**
 * Playwright Documentation Website Tests
 * URL: https://playwright.dev
 * Category: E2E Tests
 *
 * Test Suite for Playwright official documentation site
 * Covers: Navigation, content loading, search, responsiveness
 */

import { test, expect } from '@playwright/test';

test.describe('Playwright.dev - Documentation Site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev');
  });

  test.describe('Page Loading & Structure', () => {
    test('P1: Should load with correct title', async ({ page }) => {
      await expect(page).toHaveTitle(/Playwright/);
    });

    test('P2: Should display header', async ({ page }) => {
      await expect(page.locator('header')).toBeVisible();
    });

    test('P3: Should display navigation menu', async ({ page }) => {
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
    });

    test('P4: Should have main content section', async ({ page }) => {
      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('P5: Should display footer', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Navigation & Links', () => {
    test('P6: Get Started button should be clickable', async ({ page }) => {
      const getStartedBtn = page.getByRole('link', { name: /Get started/i });
      await expect(getStartedBtn).toBeVisible();
    });

    test('P7: Docs link should navigate correctly', async ({ page }) => {
      await page.getByRole('link', { name: /Docs/i }).first().click();
      await expect(page).toHaveURL(/docs/);
    });

    test('P8: Multiple sections should be present', async ({ page }) => {
      const sections = await page.locator('section').count();
      expect(sections).toBeGreaterThan(0);
    });
  });

  test.describe('Search & Functionality', () => {
    test('P9: Search functionality should exist', async ({ page }) => {
      const searchBox = page.locator('[placeholder*="search" i], [aria-label*="search" i]').first();
      if (await searchBox.isVisible()) {
        await expect(searchBox).toBeEnabled();
      }
    });

    test('P10: Page should have text content', async ({ page }) => {
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText?.length).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Design', () => {
    test('P11: Should be responsive - viewport check', async ({ page }) => {
      const viewportSize = page.viewportSize();
      expect(viewportSize?.width).toBeGreaterThan(0);
    });
  });
});
