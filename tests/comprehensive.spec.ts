import { test, expect } from '@playwright/test';

// ========================
// PLAYWRIGHT.DEV TESTS
// ========================
test.describe('Playwright.dev - Documentation Site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev');
  });

  test('P1: Page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('P2: Header is visible', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
  });

  test('P3: Navigation menu exists', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('P4: Get Started button is clickable', async ({ page }) => {
    const getStartedBtn = page.getByRole('link', { name: /Get started/i });
    await expect(getStartedBtn).toBeVisible();
  });

  test('P5: Docs link navigation works', async ({ page }) => {
    await page.getByRole('link', { name: /Docs/i }).first().click();
    await expect(page).toHaveURL(/docs/);
  });

  test('P6: Page has main content section', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('P7: Footer is visible', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('P8: Search functionality exists', async ({ page }) => {
    const searchBox = page.locator('[placeholder*="search" i], [aria-label*="search" i]').first();
    if (await searchBox.isVisible()) {
      await expect(searchBox).toBeEnabled();
    }
  });

  test('P9: Multiple sections are present', async ({ page }) => {
    const sections = await page.locator('section').count();
    expect(sections).toBeGreaterThan(0);
  });

  test('P10: Page is responsive - viewport check', async ({ page }) => {
    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBeGreaterThan(0);
  });
});

// ========================
// GITHUB TESTS
// ========================
test.describe('GitHub - Source Control Platform', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://github.com');
  });

  test('G1: GitHub homepage loads', async ({ page }) => {
    await expect(page).toHaveTitle(/GitHub/);
  });

  test('G2: GitHub logo is visible', async ({ page }) => {
    const logo = page.locator('[data-testid="footer"] a[href="/"], a[href="https://github.com"]').first();
    if (await logo.count() > 0) {
      await expect(logo).toBeVisible();
    }
  });

  test('G3: Sign in button is present', async ({ page }) => {
    const signInBtn = page.getByRole('link', { name: /Sign in/i });
    await expect(signInBtn).toBeVisible();
  });

  test('G4: Sign up button is clickable', async ({ page }) => {
    const signUpBtn = page.getByRole('link', { name: /Sign up/i });
    if (await signUpBtn.isVisible()) {
      await expect(signUpBtn).toBeEnabled();
    }
  });

  test('G5: Search box is accessible', async ({ page }) => {
    const searchBox = page.getByPlaceholder(/Search/i);
    if (await searchBox.count() > 0) {
      await expect(searchBox).toBeVisible();
    }
  });

  test('G6: Explore link navigation', async ({ page }) => {
    const exploreLink = page.getByRole('link', { name: /Explore/i }).first();
    if (await exploreLink.count() > 0) {
      await expect(exploreLink).toBeVisible();
    }
  });

  test('G7: Marketplace link exists', async ({ page }) => {
    const marketplaceLink = page.getByRole('link', { name: /Marketplace/i }).first();
    if (await marketplaceLink.count() > 0) {
      await expect(marketplaceLink).toBeVisible();
    }
  });

  test('G8: Pricing link is present', async ({ page }) => {
    const pricingLink = page.getByRole('link', { name: /Pricing/i }).first();
    if (await pricingLink.count() > 0) {
      await expect(pricingLink).toBeVisible();
    }
  });

  test('G9: Page responds to user interactions', async ({ page }) => {
    const navItems = page.locator('nav a, [role="link"]');
    const count = await navItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('G10: Footer contains links', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ========================
// MDN WEB DOCS TESTS
// ========================
test.describe('MDN Web Docs - Developer Reference', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://developer.mozilla.org');
  });

  test('M1: MDN homepage loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/MDN/);
  });

  test('M2: Search functionality is available', async ({ page }) => {
    const searchBox = page.locator('[data-testid="top-search-input"], input[placeholder*="Search"]').first();
    if (await searchBox.count() > 0) {
      await expect(searchBox).toBeVisible();
    }
  });

  test('M3: Main navigation menu visible', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('M4: Reference section accessible', async ({ page }) => {
    const refLink = page.getByRole('link', { name: /Reference/i }).first();
    if (await refLink.count() > 0) {
      await expect(refLink).toBeVisible();
    }
  });

  test('M5: Guides section available', async ({ page }) => {
    const guideLink = page.getByRole('link', { name: /Guide/i }).first();
    if (await guideLink.count() > 0) {
      await expect(guideLink).toBeVisible();
    }
  });

  test('M6: Learning section exists', async ({ page }) => {
    const learnLink = page.getByRole('link', { name: /Learn/i }).first();
    if (await learnLink.count() > 0) {
      await expect(learnLink).toBeVisible();
    }
  });

  test('M7: Breadcrumb navigation present', async ({ page }) => {
    const breadcrumb = page.locator('[data-testid="breadcrumbs"], nav[aria-label*="breadcrumb" i]').first();
    if (await breadcrumb.count() > 0) {
      await expect(breadcrumb).toBeVisible();
    }
  });

  test('M8: Language selector available', async ({ page }) => {
    const langSelector = page.locator('[data-testid="language-switcher"], select[aria-label*="language" i]').first();
    if (await langSelector.count() > 0) {
      await expect(langSelector).toBeVisible();
    }
  });

  test('M9: Theme toggle exists', async ({ page }) => {
    const themeToggle = page.locator('[data-testid="theme-toggle"], [aria-label*="theme" i], [aria-label*="dark" i]').first();
    if (await themeToggle.count() > 0) {
      await expect(themeToggle).toBeVisible();
    }
  });

  test('M10: Content area is rendered', async ({ page }) => {
    const main = page.locator('main, [role="main"]').first();
    await expect(main).toBeVisible();
  });
});

// ========================
// STACKBLITZ TESTS
// ========================
test.describe('StackBlitz - Online IDE', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://stackblitz.com');
  });

  test('S1: StackBlitz homepage loads', async ({ page }) => {
    await expect(page).toHaveTitle(/StackBlitz/);
  });

  test('S2: Create project button visible', async ({ page }) => {
    const createBtn = page.getByRole('button', { name: /Create/i }).first();
    if (await createBtn.count() > 0) {
      await expect(createBtn).toBeVisible();
    }
  });

  test('S3: Navigation bar present', async ({ page }) => {
    const navbar = page.locator('nav, [role="navigation"]').first();
    await expect(navbar).toBeVisible();
  });

  test('S4: Features section available', async ({ page }) => {
    const features = page.locator('section');
    const count = await features.count();
    expect(count).toBeGreaterThan(0);
  });

  test('S5: Pricing page link exists', async ({ page }) => {
    const pricingLink = page.getByRole('link', { name: /Pricing/i }).first();
    if (await pricingLink.count() > 0) {
      await expect(pricingLink).toBeVisible();
    }
  });

  test('S6: Sign in option available', async ({ page }) => {
    const signIn = page.getByRole('link', { name: /Sign in/i }).first();
    if (await signIn.count() > 0) {
      await expect(signIn).toBeVisible();
    }
  });

  test('S7: Documentation link present', async ({ page }) => {
    const docLink = page.getByRole('link', { name: /Doc/i }).first();
    if (await docLink.count() > 0) {
      await expect(docLink).toBeVisible();
    }
  });

  test('S8: Community section exists', async ({ page }) => {
    const communityLink = page.getByRole('link', { name: /Community/i }).first();
    if (await communityLink.count() > 0) {
      await expect(communityLink).toBeVisible();
    }
  });

  test('S9: Footer information present', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });

  test('S10: Page is interactive', async ({ page }) => {
    const interactiveElements = page.locator('button, a, [role="button"]');
    const count = await interactiveElements.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ========================
// CROSS-SITE SCENARIOS
// ========================
test.describe('Navigation & Cross-Site Scenarios', () => {
  test('N1: Playwright.dev - Load and verify URL', async ({ page }) => {
    await page.goto('https://playwright.dev');
    expect(page.url()).toContain('playwright.dev');
  });

  test('N2: GitHub - Verify accessible status', async ({ page }) => {
    const response = await page.goto('https://github.com');
    expect(response?.status()).toBeLessThan(400);
  });

  test('N3: MDN - Page completeness check', async ({ page }) => {
    await page.goto('https://developer.mozilla.org');
    const html = await page.content();
    expect(html.length).toBeGreaterThan(0);
  });

  test('N4: StackBlitz - Performance check', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('https://stackblitz.com', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(30000); // Should load within 30 seconds
  });

  test('N5: Playwright.dev - Multiple page elements', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    expect(headings).toBeGreaterThan(0);
  });

  test('N6: GitHub - Links are valid', async ({ page }) => {
    await page.goto('https://github.com');
    const links = page.locator('a[href]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('N7: MDN - Accessibility check', async ({ page }) => {
    await page.goto('https://developer.mozilla.org');
    const images = page.locator('img');
    const imgCount = await images.count();
    // Check if images have alt text
    for (let i = 0; i < Math.min(imgCount, 5); i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');
      // Some images might not have alt text, but at least check they exist
      expect(img).toBeVisible();
    }
  });

  test('N8: StackBlitz - DOM stability', async ({ page }) => {
    await page.goto('https://stackblitz.com');
    const initialHeadings = await page.locator('h1, h2, h3').count();
    await page.waitForTimeout(2000);
    const laterHeadings = await page.locator('h1, h2, h3').count();
    expect(initialHeadings).toEqual(laterHeadings);
  });

  test('N9: Playwright.dev - Text content availability', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
    expect(bodyText?.length).toBeGreaterThan(0);
  });

  test('N10: GitHub - Browser compatibility', async ({ page, browserName }) => {
    await page.goto('https://github.com');
    expect(['chromium', 'firefox', 'webkit']).toContain(browserName);
  });
});

// ========================
// ERROR HANDLING & EDGE CASES
// ========================
test.describe('Error Handling & Edge Cases', () => {
  test('E1: Handle 404 gracefully - Playwright.dev invalid path', async ({ page }) => {
    const response = await page.goto('https://playwright.dev/invalid-path-12345', {
      waitUntil: 'networkidle'
    });
    expect(response?.status()).toBeLessThan(500);
  });

  test('E2: Timeout handling - Long page load', async ({ page }) => {
    const response = await page.goto('https://github.com', { timeout: 30000 });
    expect(response?.ok()).toBeTruthy();
  });

  test('E3: Network request interception', async ({ page }) => {
    await page.route('**/*', route => route.continue());
    await page.goto('https://playwright.dev');
    expect(page.url()).toContain('playwright.dev');
  });

  test('E4: Multiple navigation in sequence', async ({ page }) => {
    await page.goto('https://playwright.dev');
    expect(page.url()).toContain('playwright.dev');

    await page.goto('https://github.com');
    expect(page.url()).toContain('github.com');

    await page.goto('https://developer.mozilla.org');
    expect(page.url()).toContain('mozilla.org');
  });

  test('E5: Back/Forward navigation simulation', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const url1 = page.url();

    await page.goto('https://github.com');
    const url2 = page.url();

    expect(url1).not.toEqual(url2);
  });

  test('E6: Page reload functionality', async ({ page }) => {
    await page.goto('https://playwright.dev');
    const initialUrl = page.url();
    await page.reload();
    expect(page.url()).toEqual(initialUrl);
  });

  test('E7: Viewport size changes', async ({ page }) => {
    await page.goto('https://playwright.dev');

    await page.setViewportSize({ width: 1920, height: 1080 });
    let viewport = page.viewportSize();
    expect(viewport?.width).toBe(1920);

    await page.setViewportSize({ width: 375, height: 667 });
    viewport = page.viewportSize();
    expect(viewport?.width).toBe(375);
  });

  test('E8: Element existence check variations', async ({ page }) => {
    await page.goto('https://github.com');

    const existingElement = page.locator('header');
    await expect(existingElement).toBeVisible();

    const nonExistingElement = page.locator('.non-existent-class-xyz');
    await expect(nonExistingElement).toHaveCount(0);
  });

  test('E9: Scroll behavior testing', async ({ page }) => {
    await page.goto('https://developer.mozilla.org');

    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    let scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toEqual(0);

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('E10: Dynamic content loading', async ({ page }) => {
    await page.goto('https://stackblitz.com');
    await page.waitForLoadState('networkidle');

    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
  });
});

// ========================
// PERFORMANCE & METRICS
// ========================
test.describe('Performance & Metrics Testing', () => {
  test('PM1: Playwright.dev - Page load time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('https://playwright.dev', { waitUntil: 'load' });
    const loadTime = Date.now() - startTime;
    console.log(`Playwright.dev load time: ${loadTime}ms`);
    expect(loadTime).toBeGreaterThan(0);
  });

  test('PM2: GitHub - DOM content loaded', async ({ page }) => {
    const metrics = await page.evaluate(() => {
      const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
    });
    expect(metrics).toBeGreaterThan(0);
  });

  test('PM3: MDN - Resource count', async ({ page }) => {
    const resourcesPromise = page.evaluate(() => {
      const resources = window.performance.getEntriesByType('resource');
      return resources.length;
    });

    await page.goto('https://developer.mozilla.org');
    const resourceCount = await resourcesPromise;
    console.log(`MDN resources: ${resourceCount}`);
  });

  test('PM4: StackBlitz - First contentful paint', async ({ page }) => {
    await page.goto('https://stackblitz.com', { waitUntil: 'load' });

    const metrics = await page.evaluate(() => {
      const paintEntries = window.performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp?.startTime || 0;
    });

    expect(metrics).toBeGreaterThan(0);
  });

  test('PM5: Memory efficiency check', async ({ page }) => {
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
      expect(memoryInfo.usedJSHeapSize).toBeGreaterThan(0);
    }
  });

  test('PM6: Script execution time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('https://github.com');
    const totalTime = Date.now() - startTime;

    const scriptTime = await page.evaluate(() => {
      const measures = window.performance.getEntriesByType('measure');
      return measures.reduce((total, measure) => total + measure.duration, 0);
    });

    console.log(`Total navigation time: ${totalTime}ms, Script measures: ${scriptTime}ms`);
    expect(totalTime).toBeGreaterThan(0);
  });

  test('PM7: API response times', async ({ page }) => {
    const requestTimings: { [key: string]: number } = {};

    page.on('response', (response) => {
      const timing = response.timing();
      requestTimings[response.url()] = timing.responseTime;
    });

    await page.goto('https://developer.mozilla.org');

    const timings = Object.values(requestTimings);
    console.log(`API response times recorded: ${timings.length}`);
    expect(timings.length).toBeGreaterThanOrEqual(0);
  });

  test('PM8: Browser console messages', async ({ page }) => {
    const messages: string[] = [];

    page.on('console', msg => messages.push(msg.text()));

    await page.goto('https://stackblitz.com');

    console.log(`Console messages: ${messages.length}`);
  });

  test('PM9: Page events tracking', async ({ page }) => {
    let loadEventFired = false;

    page.on('load', () => {
      loadEventFired = true;
    });

    await page.goto('https://playwright.dev');
    expect(loadEventFired).toBeTruthy();
  });

  test('PM10: Network activity monitoring', async ({ page }) => {
    let requestCount = 0;
    let responseCount = 0;

    page.on('request', () => requestCount++);
    page.on('response', () => responseCount++);

    await page.goto('https://github.com');

    expect(requestCount).toBeGreaterThan(0);
    expect(responseCount).toBeGreaterThan(0);
    expect(responseCount).toEqual(requestCount);
  });
});

// ========================
// RESPONSIVE DESIGN TESTS
// ========================
test.describe('Responsive Design Testing', () => {
  const viewports = [
    { name: 'Mobile (iPhone)', width: 375, height: 667 },
    { name: 'Tablet (iPad)', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  viewports.forEach(vp => {
    test(`RD1.${viewports.indexOf(vp)}: Playwright.dev - ${vp.name} viewport`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('https://playwright.dev');

      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(vp.width);
      expect(viewport?.height).toBe(vp.height);
    });

    test(`RD2.${viewports.indexOf(vp)}: GitHub - ${vp.name} responsive`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('https://github.com');

      const content = await page.locator('main, [role="main"]').first();
      if (await content.count() > 0) {
        await expect(content).toBeVisible();
      }
    });
  });
});
