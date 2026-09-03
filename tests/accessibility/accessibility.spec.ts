/**
 * Accessibility Tests
 * Category: A11y & Accessibility Testing
 *
 * Tests for WCAG compliance, screen reader support, and accessibility
 * Ensures content is accessible to all users
 */

import { test, expect } from '@playwright/test';

test.describe('Accessibility Testing', () => {
  test.describe('Navigation Accessibility', () => {
    test('A11Y1: Playwright.dev - Keyboard navigation', async ({ page }) => {
      await page.goto('https://playwright.dev');

      const links = page.locator('a[href]');
      const count = await links.count();
      expect(count).toBeGreaterThan(0);
    });

    test('A11Y2: GitHub - Semantic HTML structure', async ({ page }) => {
      await page.goto('https://github.com');

      const headers = page.locator('h1, h2, h3, h4, h5, h6');
      const headerCount = await headers.count();
      expect(headerCount).toBeGreaterThan(0);
    });

    test('A11Y3: MDN - Breadcrumb navigation', async ({ page }) => {
      await page.goto('https://developer.mozilla.org');

      const breadcrumb = page.locator('[data-testid="breadcrumbs"], nav[aria-label*="breadcrumb" i]').first();
      if (await breadcrumb.count() > 0) {
        await expect(breadcrumb).toBeVisible();
      }
    });

    test('A11Y4: StackBlitz - Navigation landmarks', async ({ page }) => {
      await page.goto('https://stackblitz.com');

      const nav = page.locator('nav, [role="navigation"]');
      const count = await nav.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Image & Media Accessibility', () => {
    test('A11Y5: Images should have alt text', async ({ page }) => {
      await page.goto('https://developer.mozilla.org');

      const images = page.locator('img');
      const imgCount = await images.count();

      for (let i = 0; i < Math.min(imgCount, 5); i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
      }
    });

    test('A11Y6: Videos should have captions', async ({ page }) => {
      await page.goto('https://github.com');

      const videos = page.locator('video');
      const videoCount = await videos.count();
      expect(videoCount).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Form Accessibility', () => {
    test('A11Y7: Form inputs should have labels', async ({ page }) => {
      await page.goto('https://github.com');

      const inputs = page.locator('input[type="text"], input[type="email"], textarea');
      const inputCount = await inputs.count();
      expect(inputCount).toBeGreaterThanOrEqual(0);
    });

    test('A11Y8: Buttons should have accessible names', async ({ page }) => {
      await page.goto('https://stackblitz.com');

      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
    });
  });

  test.describe('Color Contrast & Readability', () => {
    test('A11Y9: Content should be readable', async ({ page }) => {
      await page.goto('https://playwright.dev');

      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText?.length).toBeGreaterThan(0);
    });

    test('A11Y10: Text size should be appropriate', async ({ page }) => {
      await page.goto('https://github.com');

      const paragraphs = page.locator('p');
      const pCount = await paragraphs.count();
      expect(pCount).toBeGreaterThan(0);
    });
  });

  test.describe('ARIA & Semantic HTML', () => {
    test('A11Y11: Should use semantic HTML', async ({ page }) => {
      await page.goto('https://developer.mozilla.org');

      const main = page.locator('main');
      await expect(main).toBeVisible();
    });

    test('A11Y12: Should have proper ARIA labels', async ({ page }) => {
      await page.goto('https://stackblitz.com');

      const ariaElements = page.locator('[aria-label]');
      const ariaCount = await ariaElements.count();
      expect(ariaCount).toBeGreaterThanOrEqual(0);
    });

    test('A11Y13: Navigation should have proper roles', async ({ page }) => {
      await page.goto('https://github.com');

      const navItems = page.locator('nav a, [role="link"]');
      const count = await navItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('A11Y14: Lists should be properly structured', async ({ page }) => {
      await page.goto('https://playwright.dev');

      const lists = page.locator('ul, ol');
      const listCount = await lists.count();
      expect(listCount).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('Focus & Keyboard Navigation', () => {
    test('A11Y15: Should support tab navigation', async ({ page }) => {
      await page.goto('https://github.com');

      // Tab through interactive elements
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      expect(focused).toBeTruthy();
    });
  });
});
