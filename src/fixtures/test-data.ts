/**
 * Test Data Fixtures
 * Centralized test data for consistent testing
 */

export const TEST_URLS = {
  PLAYWRIGHT: 'https://playwright.dev',
  GITHUB: 'https://github.com',
  MDN: 'https://developer.mozilla.org',
  STACKBLITZ: 'https://stackblitz.com',
};

export const TEST_TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  VERY_LONG: 60000,
};

export const VIEWPORT_SIZES = {
  MOBILE: { width: 375, height: 667, name: 'Mobile (iPhone)' },
  TABLET: { width: 768, height: 1024, name: 'Tablet (iPad)' },
  DESKTOP: { width: 1920, height: 1080, name: 'Desktop' },
};

export const TEST_DATA = {
  URLS: [
    {
      name: 'Playwright.dev',
      url: TEST_URLS.PLAYWRIGHT,
      category: 'Documentation',
      expectedTitle: /Playwright/,
    },
    {
      name: 'GitHub',
      url: TEST_URLS.GITHUB,
      category: 'Social Platform',
      expectedTitle: /GitHub/,
    },
    {
      name: 'MDN Web Docs',
      url: TEST_URLS.MDN,
      category: 'Documentation',
      expectedTitle: /MDN/,
    },
    {
      name: 'StackBlitz',
      url: TEST_URLS.STACKBLITZ,
      category: 'IDE',
      expectedTitle: /StackBlitz/,
    },
  ],

  BROWSERS: ['chromium', 'firefox', 'webkit'],

  TEST_SCENARIOS: {
    PAGE_LOAD: 'Page Loading',
    NAVIGATION: 'Navigation',
    SEARCH: 'Search Functionality',
    FORMS: 'Form Interactions',
    RESPONSIVE: 'Responsive Design',
    PERFORMANCE: 'Performance',
    ACCESSIBILITY: 'Accessibility',
  },
};

export const SELECTORS = {
  COMMON: {
    HEADER: 'header',
    FOOTER: 'footer',
    MAIN: 'main, [role="main"]',
    NAV: 'nav, [role="navigation"]',
    SEARCH: 'input[placeholder*="search" i], [aria-label*="search" i]',
  },
  GITHUB: {
    SIGN_IN: 'a[href="#"]:has-text("Sign in")',
    SIGN_UP: 'a[href="#"]:has-text("Sign up")',
    SEARCH: 'input[placeholder*="Search"]',
  },
  PLAYWRIGHT: {
    GET_STARTED: 'a:has-text("Get started")',
    DOCS: 'a:has-text("Docs")',
    SEARCH: 'input[placeholder*="search" i]',
  },
};

export const MESSAGES = {
  SUCCESS: '✓ Test passed',
  FAILURE: '✗ Test failed',
  SKIP: '⊘ Test skipped',
  WARNING: '⚠ Warning',
  INFO: 'ℹ Info',
};
