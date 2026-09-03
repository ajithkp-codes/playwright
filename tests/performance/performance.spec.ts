/**
 * Performance Tests
 * Category: Performance & Metrics Testing
 *
 * Monitors page load performance, metrics, and resource usage
 * Tracks trends and identifies performance bottlenecks
 */

import { test, expect } from '@playwright/test';

test.describe('Performance & Metrics Testing', () => {
  test.describe('Page Load Performance', () => {
    test('PERF1: Playwright.dev - Page load time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('https://playwright.dev', { waitUntil: 'load' });
      const loadTime = Date.now() - startTime;
      console.log(`Playwright.dev load time: ${loadTime}ms`);
      expect(loadTime).toBeGreaterThan(0);
    });

    test('PERF2: GitHub - Page load time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('https://github.com', { waitUntil: 'load' });
      const loadTime = Date.now() - startTime;
      console.log(`GitHub load time: ${loadTime}ms`);
      expect(loadTime).toBeGreaterThan(0);
    });

    test('PERF3: MDN - Page load time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('https://developer.mozilla.org', { waitUntil: 'load' });
      const loadTime = Date.now() - startTime;
      console.log(`MDN load time: ${loadTime}ms`);
      expect(loadTime).toBeGreaterThan(0);
    });

    test('PERF4: StackBlitz - Page load time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('https://stackblitz.com', { waitUntil: 'networkidle' });
      const loadTime = Date.now() - startTime;
      console.log(`StackBlitz load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(30000);
    });
  });

  test.describe('Paint & Layout Metrics', () => {
    test('PERF5: First contentful paint metric', async ({ page }) => {
      await page.goto('https://playwright.dev', { waitUntil: 'load' });

      const fcp = await page.evaluate(() => {
        const paintEntries = window.performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcpEntry?.startTime || 0;
      });

      console.log(`FCP: ${fcp}ms`);
      expect(fcp).toBeGreaterThan(0);
    });

    test('PERF6: DOM content loaded time', async ({ page }) => {
      await page.goto('https://github.com');

      const domLoadTime = await page.evaluate(() => {
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      });

      console.log(`DOM Load Time: ${domLoadTime}ms`);
      expect(domLoadTime).toBeGreaterThan(0);
    });
  });

  test.describe('Resource Loading', () => {
    test('PERF7: Resource count tracking', async ({ page }) => {
      await page.goto('https://developer.mozilla.org');

      const resourceCount = await page.evaluate(() => {
        const resources = window.performance.getEntriesByType('resource');
        return resources.length;
      });

      console.log(`Resources loaded: ${resourceCount}`);
      expect(resourceCount).toBeGreaterThanOrEqual(0);
    });

    test('PERF8: Memory efficiency check', async ({ page }) => {
      await page.goto('https://playwright.dev');

      const memoryInfo = await page.evaluate(() => {
        if ('memory' in performance) {
          return {
            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
            totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          };
        }
        return null;
      });

      if (memoryInfo) {
        console.log(`Memory Used: ${(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
        expect(memoryInfo.usedJSHeapSize).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Event Tracking', () => {
    test('PERF9: Page load event tracking', async ({ page }) => {
      let loadEventFired = false;

      page.on('load', () => {
        loadEventFired = true;
      });

      await page.goto('https://playwright.dev');
      expect(loadEventFired).toBeTruthy();
    });

    test('PERF10: Network activity monitoring', async ({ page }) => {
      let requestCount = 0;
      let responseCount = 0;

      page.on('request', () => requestCount++);
      page.on('response', () => responseCount++);

      await page.goto('https://github.com');

      console.log(`Requests: ${requestCount}, Responses: ${responseCount}`);
      expect(requestCount).toBeGreaterThan(0);
      expect(responseCount).toBeGreaterThan(0);
    });
  });
});
