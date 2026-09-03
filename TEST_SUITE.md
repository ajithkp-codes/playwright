# Test Suite Documentation

## Overview

This is a professional test automation suite built with Playwright. It includes 50+ test cases organized into logical categories with proper separation of concerns.

---

## 📁 Project Structure

```
playwright/
├── tests/                          # All test files
│   ├── e2e/                       # End-to-End Tests
│   │   ├── 01-playwright-docs.spec.ts
│   │   ├── 02-github.spec.ts
│   │   ├── 03-mdn-docs.spec.ts
│   │   └── 04-stackblitz.spec.ts
│   ├── performance/                # Performance Tests
│   │   └── performance.spec.ts
│   └── accessibility/              # Accessibility Tests
│       └── accessibility.spec.ts
│
├── src/                            # Source code & utilities
│   ├── fixtures/                  # Test data fixtures
│   │   └── test-data.ts
│   ├── utils/                     # Helper functions
│   │   └── test-helpers.ts
│   ├── pages/                     # Page objects (if needed)
│   └── config/                    # Configuration
│
├── config/                         # Configuration files
├── reports/                        # Test reports
├── data/                          # Test data files
├── docs/                          # Documentation
├── ci/                            # CI/CD configuration
│
├── playwright.config.ts            # Main config
├── currents.config.ts              # Currents config
├── package.json                    # Dependencies
├── .env.example                    # Environment template
├── Jenkinsfile                     # Jenkins pipeline
│
├── TEST_SUITE.md                   # This file
├── README.md                       # Project overview
└── [Other documentation files]
```

---

## 🧪 Test Categories

### 1. End-to-End Tests (tests/e2e/)

**Purpose:** Test complete user workflows and page functionality

#### 01-playwright-docs.spec.ts
- **URL:** https://playwright.dev
- **Tests:** 11 cases
- **Coverage:**
  - Page loading and structure
  - Navigation and links
  - Search functionality
  - Responsive design

#### 02-github.spec.ts
- **URL:** https://github.com
- **Tests:** 12 cases
- **Coverage:**
  - Page structure
  - Authentication elements
  - Navigation
  - Footer and links
  - Accessibility

#### 03-mdn-docs.spec.ts
- **URL:** https://developer.mozilla.org
- **Tests:** 11 cases
- **Coverage:**
  - Page structure
  - Search and discovery
  - Localization
  - Accessibility features

#### 04-stackblitz.spec.ts
- **URL:** https://stackblitz.com
- **Tests:** 10 cases
- **Coverage:**
  - Project creation
  - Navigation
  - Pricing and information
  - Interactive elements

### 2. Performance Tests (tests/performance/)

**Purpose:** Monitor and measure page performance metrics

#### performance.spec.ts
- **Tests:** 10 cases
- **Metrics Tracked:**
  - Page load time
  - First contentful paint (FCP)
  - DOM content loaded time
  - Resource counts
  - Memory usage
  - Network activity

### 3. Accessibility Tests (tests/accessibility/)

**Purpose:** Ensure WCAG compliance and accessibility

#### accessibility.spec.ts
- **Tests:** 15 cases
- **Coverage:**
  - Navigation accessibility
  - Image and media alt text
  - Form accessibility
  - Color contrast
  - ARIA and semantic HTML
  - Keyboard navigation

---

## 🎯 Test Statistics

| Metric | Count |
|--------|-------|
| **Total Test Cases** | 59 |
| **Test Suites** | 3 categories |
| **E2E Tests** | 44 cases |
| **Performance Tests** | 10 cases |
| **Accessibility Tests** | 15 cases |
| **Websites Tested** | 4 |
| **Browsers Tested** | 3 (Chromium, Firefox, WebKit) |

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Category
```bash
# E2E tests only
npm test tests/e2e

# Performance tests only
npm test tests/performance

# Accessibility tests only
npm test tests/accessibility
```

### Run Specific Test File
```bash
npm test tests/e2e/01-playwright-docs.spec.ts
```

### Run Tests in Interactive Mode
```bash
npm run test:ui
```

### Run Tests with Visible Browser
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

---

## 📊 Test Naming Convention

Tests follow a consistent naming pattern:

```
[CATEGORY][NUMBER]: [Description]

Examples:
- P1: Should load with correct title
- G1: Should load GitHub homepage
- M1: Should load MDN homepage
- S1: Should load StackBlitz homepage
- PERF1: Playwright.dev - Page load time
- A11Y1: Playwright.dev - Keyboard navigation
```

### Prefixes
- **P** = Playwright.dev tests
- **G** = GitHub tests
- **M** = MDN tests
- **S** = StackBlitz tests
- **PERF** = Performance tests
- **A11Y** = Accessibility tests

---

## 🛠️ Test Organization

### By Website
- Playwright.dev (P1-P11)
- GitHub (G1-G12)
- MDN (M1-M11)
- StackBlitz (S1-S10)

### By Type
- E2E/Functional (44 tests)
- Performance (10 tests)
- Accessibility (15 tests)

### By Feature
- Page Loading
- Navigation
- Search
- Forms
- Responsiveness
- Performance
- Accessibility

---

## 📝 Test Execution Plan

### Daily Testing
```bash
# Run all tests daily
npm test
```

### CI/CD Pipeline
```bash
# Run with Currents reporting
CURRENTS_PROJECT_ID=LBuyQE npm test
```

### Pre-Deployment
```bash
# Run all browsers before deployment
npm test -- --project=chromium
npm test -- --project=firefox
npm test -- --project=webkit
```

---

## 🔍 Key Testing Patterns

### Pattern 1: Page Load Testing
```typescript
test('Should load with correct title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/pattern/);
});
```

### Pattern 2: Element Visibility
```typescript
test('Should display header', async ({ page }) => {
  await expect(page.locator('header')).toBeVisible();
});
```

### Pattern 3: Navigation Testing
```typescript
test('Should navigate to docs', async ({ page }) => {
  await page.getByRole('link', { name: /Docs/i }).click();
  await expect(page).toHaveURL(/docs/);
});
```

### Pattern 4: Conditional Testing
```typescript
test('Should check optional elements', async ({ page }) => {
  const element = page.locator('.optional-element');
  if (await element.count() > 0) {
    await expect(element).toBeVisible();
  }
});
```

### Pattern 5: Performance Testing
```typescript
test('Should load within timeout', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('https://example.com');
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(30000);
});
```

---

## 📈 Test Reporting

### Local Report
```bash
npm run test:report
```

### Currents Dashboard
- **URL:** https://app.currents.dev/projects/LBuyQE
- **Features:**
  - Real-time test monitoring
  - Video and screenshot recording
  - Performance metrics
  - Historical trends
  - Test analytics

---

## 🔧 Utilities & Helpers

### Available Test Helpers (src/utils/test-helpers.ts)

- `waitForElement()` - Wait for element visibility
- `checkAccessibility()` - Check page accessibility
- `getPerformanceMetrics()` - Get page performance data
- `captureScreenshot()` - Take screenshots
- `validateLinks()` - Check link validity
- `testResponsiveDesign()` - Test multiple viewports
- `waitForNetworkIdle()` - Wait for network completion
- `fillAndSubmitForm()` - Form automation
- `retryAction()` - Retry failed actions

### Example Usage
```typescript
import { waitForElement, getPerformanceMetrics } from '../src/utils/test-helpers';

test('Should wait for element', async ({ page }) => {
  await page.goto('https://example.com');
  await waitForElement(page, '.dynamic-element', 5000);
  const metrics = await getPerformanceMetrics(page);
  console.log('Performance:', metrics);
});
```

---

## 📊 Test Data

### Test URLs (src/fixtures/test-data.ts)
```typescript
TEST_URLS = {
  PLAYWRIGHT: 'https://playwright.dev',
  GITHUB: 'https://github.com',
  MDN: 'https://developer.mozilla.org',
  STACKBLITZ: 'https://stackblitz.com',
}
```

### Viewport Sizes
```typescript
VIEWPORT_SIZES = {
  MOBILE: { width: 375, height: 667, name: 'Mobile (iPhone)' },
  TABLET: { width: 768, height: 1024, name: 'Tablet (iPad)' },
  DESKTOP: { width: 1920, height: 1080, name: 'Desktop' },
}
```

---

## ✅ Best Practices

1. **Descriptive Test Names** - Clear purpose from name
2. **Organized by Category** - Related tests grouped together
3. **Reusable Utilities** - Common functions in helpers
4. **Consistent Data** - Centralized test data
5. **Proper Waits** - Explicit waits, no hardcoded delays
6. **Error Handling** - Graceful handling of optional elements
7. **Performance Monitoring** - Metrics collection
8. **Accessibility Checks** - WCAG compliance
9. **CI/CD Integration** - Jenkins/GitHub Actions ready
10. **Documentation** - Well-documented tests

---

## 🚀 Next Steps

1. **Add Page Objects** - Create page object model if needed
2. **Add API Tests** - Create tests/api directory for API testing
3. **Add Visual Tests** - Create tests for visual regression
4. **Expand Test Data** - Add more test scenarios
5. **Setup CI/CD** - Configure Jenkins or GitHub Actions
6. **Add Reporting** - Configure Currents integration
7. **Monitor Trends** - Track test metrics over time

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Test Automation Best Practices](https://playwright.dev/docs/best-practices)
- [Currents Documentation](https://docs.currents.dev)
- [Test Suite README](./README.md)

---

## 📞 Support

For questions or issues:
1. Check test documentation in this file
2. Review individual test files for examples
3. Check helper functions in `src/utils/test-helpers.ts`
4. Consult Playwright documentation

---

**Version:** 1.0.0  
**Last Updated:** September 3, 2026  
**Maintained By:** QA Team
