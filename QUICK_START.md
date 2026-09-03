# Playwright Quick Start Guide

## 📦 Installation Status
✅ **Playwright is fully installed and configured!**

All browsers (Chromium, Firefox, WebKit) have been downloaded and are ready to use.

---

## 🚀 Running Tests

### Basic Commands
```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests with debugger
npm run test:debug

# Run tests with visible browser
npm run test:headed

# View HTML report
npm run test:report
```

### Run Specific Tests
```bash
# Run only comprehensive tests
npm test -- tests/comprehensive.spec.ts

# Run only example tests
npm test -- tests/example.spec.ts

# Run specific test suite
npm test -- --grep "GitHub"

# Run single test
npm test -- --grep "P1: Page loads"
```

### Run on Specific Browser
```bash
# Run only on Chromium
npm test -- --project=chromium

# Run only on Firefox
npm test -- --project=firefox

# Run only on WebKit
npm test -- --project=webkit

# Run on specific browsers
npm test -- --project=chromium --project=firefox
```

### Advanced Options
```bash
# Run with multiple workers (parallel)
npm test -- --workers=4

# Run with single worker (sequential)
npm test -- --workers=1

# Update snapshots
npm test -- --update-snapshots

# Run tests in debug mode
npm test -- --debug

# Show verbose output
npm test -- --reporter=verbose
```

---

## 📝 Writing Your First Test

### Simple Test Template
```typescript
import { test, expect } from '@playwright/test';

test('my first test', async ({ page }) => {
  // Navigate to URL
  await page.goto('https://example.com');

  // Verify title
  await expect(page).toHaveTitle('Example');

  // Check if element exists
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
});
```

### Test with Multiple Steps
```typescript
test('login and verify', async ({ page }) => {
  // Navigate
  await page.goto('https://example.com/login');

  // Fill form
  await page.fill('#username', 'testuser@example.com');
  await page.fill('#password', 'password123');

  // Click submit
  await page.click('button[type="submit"]');

  // Wait for navigation
  await page.waitForURL('/dashboard');

  // Verify redirect
  expect(page.url()).toContain('/dashboard');
});
```

### Test with Assertions
```typescript
test('verify page content', async ({ page }) => {
  await page.goto('https://example.com');

  // Check multiple elements
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();

  // Check text content
  await expect(page.locator('h1')).toContainText('Welcome');

  // Check element count
  const items = page.locator('.item');
  expect(await items.count()).toBeGreaterThan(0);
});
```

---

## 🎯 Test Suite Organization

### Describe Blocks (Group Tests)
```typescript
test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/login');
  });

  test('valid login', async ({ page }) => {
    // Test code
  });

  test('invalid login', async ({ page }) => {
    // Test code
  });
});
```

### Setup and Teardown
```typescript
test.describe('Product Tests', () => {
  let productId: string;

  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('https://example.com');
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
    await page.close();
  });

  test.beforeAll(async () => {
    // Setup once before all tests
    productId = 'product-123';
  });

  test.afterAll(async () => {
    // Cleanup once after all tests
  });
});
```

---

## 🎭 Locating Elements

### Different Ways to Find Elements
```typescript
// By role
page.getByRole('button', { name: 'Submit' })

// By label
page.getByLabel('Username')

// By placeholder
page.getByPlaceholder('Enter name')

// By text
page.getByText('Welcome')

// By test ID
page.getByTestId('main-button')

// CSS selector
page.locator('.button-class')

// XPath
page.locator('//button[text()="Submit"]')

// Complex selector
page.locator('button:has-text("Click me")')
```

### Best Practices
✅ Use `getByRole()` (most resilient)
✅ Use `getByLabel()` (good for forms)
✅ Use `getByTestId()` (reliable)
⚠️ Avoid CSS classes (can change)
❌ Avoid complex XPath (brittle)

---

## ✅ Common Assertions

### Visibility & Existence
```typescript
await expect(element).toBeVisible();
await expect(element).toBeHidden();
await expect(element).toHaveCount(3);
await expect(element).toBeTruthy();
```

### Text Content
```typescript
await expect(element).toHaveText('Expected text');
await expect(element).toContainText('Partial');
await expect(page).toHaveTitle('Page Title');
```

### Attributes
```typescript
await expect(element).toHaveAttribute('href', '/path');
await expect(element).toHaveClass('active');
await expect(element).toHaveValue('input-value');
```

### URL & Navigation
```typescript
await expect(page).toHaveURL('https://example.com');
await expect(page).toHaveURL(/example/);
```

### Enabled/Disabled
```typescript
await expect(button).toBeEnabled();
await expect(button).toBeDisabled();
await expect(input).toBeFocused();
```

---

## ⏱️ Waiting & Timeouts

### Explicit Waits
```typescript
// Wait for element
await page.waitForSelector('.element');

// Wait for URL
await page.waitForURL('**/success');

// Wait for function
await page.waitForFunction(() => document.readyState === 'complete');

// Wait for network
await page.waitForLoadState('networkidle');
```

### Timeouts
```typescript
// Global timeout in playwright.config.ts
export default defineConfig({
  timeout: 30000, // 30 seconds
});

// Test-level timeout
test('slow test', async ({ page }) => {
  test.slow(); // Gives 3x timeout
});

// Assertion timeout
await expect(element).toBeVisible({ timeout: 10000 });
```

---

## 🐛 Debugging Tips

### Debug Mode
```bash
npm run test:debug
```

### Print Debugging
```typescript
console.log('Current URL:', page.url());
console.log('Page title:', await page.title());

// Screenshot
await page.screenshot({ path: 'screenshot.png' });

// Full page screenshot
await page.screenshot({ path: 'fullpage.png', fullPage: true });

// HTML content
const html = await page.content();
console.log(html);
```

### Playwright Inspector
```bash
npx playwright test --debug
```

### Slow Motion (see what's happening)
```bash
npx playwright test --headed --slow-mo=1000
```

---

## 📊 Test Structure in This Project

### Current Test Files
```
tests/
├── example.spec.ts          (Basic example tests)
├── comprehensive.spec.ts    (50+ test cases)
```

### Test Coverage
- **4 Websites:** Playwright.dev, GitHub, MDN, StackBlitz
- **50+ Tests:** Functionality, Performance, Responsive Design
- **3 Browsers:** Chromium, Firefox, WebKit
- **8 Categories:** Docs, GitHub, MDN, StackBlitz, Navigation, Errors, Performance, Responsive

---

## 🔧 Configuration

### Current Setup (playwright.config.ts)
```typescript
export default defineConfig({
  testDir: './tests',              // Where tests are located
  fullyParallel: true,             // Run tests in parallel
  retries: 2,                      // Retry failed tests (CI only)
  workers: 4,                      // Number of workers
  reporter: 'html',               // Generate HTML report
  use: {
    trace: 'on-first-retry',       // Record trace on retry
  },
  projects: [
    { name: 'chromium', ... },     // Chrome tests
    { name: 'firefox', ... },      // Firefox tests
    { name: 'webkit', ... },       // Safari tests
  ],
});
```

### Customize Configuration
```typescript
// Change number of retries
retries: process.env.CI ? 3 : 0,

// Change timeout
timeout: 60000, // 60 seconds

// Change reporters
reporter: [
  ['html'],
  ['json', { outputFile: 'results.json' }],
  ['junit', { outputFile: 'results.xml' }],
],

// Add base URL for easier navigation
use: {
  baseURL: 'http://localhost:3000',
},
```

---

## 📈 Best Practices

### ✅ Do's
- Use meaningful test names
- One assertion per test (ideally)
- Use page objects for complex apps
- Test user workflows
- Keep tests independent
- Use proper wait strategies
- Add comments for complex logic

### ❌ Don'ts
- Don't test implementation details
- Don't create test interdependencies
- Don't use hardcoded waits (use explicit waits)
- Don't over-assert in single tests
- Don't ignore flaky tests (fix the root cause)
- Don't test third-party libraries
- Don't test external APIs in isolation

---

## 🆘 Troubleshooting

### Tests timing out
```bash
# Increase timeout in playwright.config.ts
timeout: 60000 // 60 seconds
```

### Can't find element
```bash
# Use playwright inspector to find element
npx playwright test --debug

# Print page HTML to debug
console.log(await page.content());
```

### Tests fail in CI but pass locally
```bash
# Disable headless mode to see what's happening
npx playwright test --headed

# Run in slow motion to observe
npx playwright test --slow-mo=1000
```

### Memory issues
```bash
# Reduce number of workers
npm test -- --workers=1
```

---

## 📚 Additional Resources

- **Playwright Docs:** https://playwright.dev/docs/intro
- **API Reference:** https://playwright.dev/docs/api/class-playwright
- **Best Practices:** https://playwright.dev/docs/best-practices
- **Debugging Guide:** https://playwright.dev/docs/debug

---

## 💡 Example Test Cases in This Project

### Category: Playwright.dev (10 tests)
- P1-P10: Navigation, headers, content, responsiveness

### Category: GitHub (10 tests)
- G1-G10: Links, buttons, navigation, interactions

### Category: MDN (10 tests)
- M1-M10: Search, menus, language selection, theming

### Category: StackBlitz (10 tests)
- S1-S10: Project creation, pricing, documentation

### Category: Navigation (10 tests)
- N1-N10: Cross-site, accessibility, performance checks

### Category: Error Handling (10 tests)
- E1-E10: 404s, timeouts, network, scrolling

### Category: Performance (10 tests)
- PM1-PM10: Load times, metrics, memory, events

### Category: Responsive Design (6 tests)
- RD1-RD2: Mobile, tablet, desktop viewports

---

## 🎓 Next Steps

1. **Run Tests:** `npm test`
2. **View Report:** `npm run test:report`
3. **Create Tests:** Add new files to `tests/` folder
4. **Configure:** Modify `playwright.config.ts`
5. **Integrate:** Add to GitHub Actions or your CI/CD
6. **Maintain:** Update tests as app changes

---

Happy Testing! 🚀
