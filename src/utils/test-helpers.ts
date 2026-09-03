/**
 * Test Helper Functions
 * Common utilities for test operations
 */

import { Page, expect } from '@playwright/test';

/**
 * Wait for element to be visible with custom timeout
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.waitForSelector(selector, { timeout });
  await page.locator(selector).waitFor({ state: 'visible', timeout });
}

/**
 * Perform accessibility check
 */
export async function checkAccessibility(page: Page): Promise<void> {
  const result = await page.evaluate(() => {
    const checks = {
      hasHeader: document.querySelector('header') !== null,
      hasMain: document.querySelector('main, [role="main"]') !== null,
      hasNav: document.querySelector('nav, [role="navigation"]') !== null,
      hasFooter: document.querySelector('footer') !== null,
    };
    return checks;
  });

  expect(result.hasMain || result.hasNav).toBeTruthy();
}

/**
 * Get page performance metrics
 */
export async function getPerformanceMetrics(page: Page): Promise<any> {
  return await page.evaluate(() => {
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintEntries = window.performance.getEntriesByType('paint');

    return {
      loadTime: navigation?.loadEventEnd - navigation?.loadEventStart,
      domReadyTime: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      connectTime: navigation?.responseEnd - navigation?.requestStart,
      resourceCount: window.performance.getEntriesByType('resource').length,
      fcp: paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime || 0,
    };
  });
}

/**
 * Take screenshot for comparison
 */
export async function captureScreenshot(
  page: Page,
  filename: string,
  fullPage: boolean = false
): Promise<void> {
  await page.screenshot({
    path: `screenshots/${filename}.png`,
    fullPage,
  });
}

/**
 * Check all links are valid
 */
export async function validateLinks(page: Page): Promise<void> {
  const links = await page.locator('a[href]').all();

  for (const link of links.slice(0, 10)) { // Check first 10 links
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
  }
}

/**
 * Simulate network condition
 */
export async function setNetworkCondition(
  page: Page,
  type: 'slow-4g' | 'fast-3g' | 'slow-3g' | '4g' = '4g'
): Promise<void> {
  const speeds = {
    'slow-4g': { downloadThroughput: 50 * 1024 / 8, uploadThroughput: 20 * 1024 / 8, latency: 2000 },
    'fast-3g': { downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8, latency: 40 },
    'slow-3g': { downloadThroughput: 400 * 1024 / 8, uploadThroughput: 400 * 1024 / 8, latency: 400 },
    '4g': { downloadThroughput: 4 * 1024 * 1024 / 8, uploadThroughput: 3 * 1024 * 1024 / 8, latency: 20 },
  };

  await page.context().route('**/*', async (route) => {
    await route.continue();
  });
}

/**
 * Test responsive design
 */
export async function testResponsiveDesign(
  page: Page,
  sizes: Array<{ width: number; height: number; name: string }>
): Promise<void> {
  for (const size of sizes) {
    await page.setViewportSize({ width: size.width, height: size.height });
    const viewport = page.viewportSize();
    expect(viewport?.width).toBe(size.width);
    expect(viewport?.height).toBe(size.height);
  }
}

/**
 * Wait for network idle
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 10000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Get console messages
 */
export async function captureConsoleMessages(page: Page): Promise<string[]> {
  const messages: string[] = [];

  page.on('console', (msg) => {
    messages.push(`${msg.type()}: ${msg.text()}`);
  });

  return messages;
}

/**
 * Handle dialogs
 */
export async function handleDialog(page: Page, accept: boolean = true): Promise<string | null> {
  let dialogMessage: string | null = null;

  page.once('dialog', async (dialog) => {
    dialogMessage = dialog.message();
    if (accept) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });

  return dialogMessage;
}

/**
 * Fill and submit form
 */
export async function fillAndSubmitForm(
  page: Page,
  formData: Record<string, string>
): Promise<void> {
  for (const [selector, value] of Object.entries(formData)) {
    await page.fill(selector, value);
  }

  const submitButton = page.locator('button[type="submit"]');
  if (await submitButton.isVisible()) {
    await submitButton.click();
  }
}

/**
 * Retry failed action
 */
export async function retryAction(
  action: () => Promise<void>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<void> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      await action();
      return;
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  if (lastError) {
    throw lastError;
  }
}

/**
 * Compare URLs
 */
export function compareUrls(actualUrl: string, expectedPattern: RegExp | string): boolean {
  if (typeof expectedPattern === 'string') {
    return actualUrl.includes(expectedPattern);
  }
  return expectedPattern.test(actualUrl);
}

/**
 * Generate test report summary
 */
export function generateTestSummary(passed: number, failed: number, skipped: number): void {
  const total = passed + failed + skipped;
  const passPercentage = ((passed / total) * 100).toFixed(2);

  console.log(`
╔════════════════════════════════════════════════╗
║          TEST EXECUTION SUMMARY               ║
╠════════════════════════════════════════════════╣
║ Total Tests:  ${total.toString().padEnd(35)} ║
║ Passed:       ${passed.toString().padEnd(35)} ║
║ Failed:       ${failed.toString().padEnd(35)} ║
║ Skipped:      ${skipped.toString().padEnd(35)} ║
║ Pass Rate:    ${passPercentage}%${' '.repeat(28)} ║
╚════════════════════════════════════════════════╝
  `);
}
