# Project Structure Guide

Complete documentation of the test automation project structure.

---

## 📂 Directory Tree

```
playwright/
│
├── tests/                              # ✓ All test files
│   ├── e2e/                           # End-to-End Tests
│   │   ├── 01-playwright-docs.spec.ts  # Playwright.dev tests (11 cases)
│   │   ├── 02-github.spec.ts           # GitHub tests (12 cases)
│   │   ├── 03-mdn-docs.spec.ts         # MDN tests (11 cases)
│   │   └── 04-stackblitz.spec.ts       # StackBlitz tests (10 cases)
│   │
│   ├── performance/                   # Performance Tests
│   │   └── performance.spec.ts         # Performance metrics (10 cases)
│   │
│   └── accessibility/                 # Accessibility Tests
│       └── accessibility.spec.ts       # A11Y testing (15 cases)
│
├── src/                               # ✓ Source code & utilities
│   ├── fixtures/                     # Test data & fixtures
│   │   └── test-data.ts              # Centralized test data
│   │
│   ├── utils/                        # Helper functions
│   │   └── test-helpers.ts           # Reusable test utilities
│   │
│   ├── pages/                        # Page objects (future)
│   │   └── [page-objects.ts]
│   │
│   └── config/                       # Test configuration
│       └── [test-config.ts]
│
├── config/                            # ✓ Configuration files
│   ├── playwright.config.ts           # Playwright configuration
│   ├── currents.config.ts             # Currents cloud reporting
│   └── [other configs]
│
├── ci/                                # ✓ CI/CD configuration
│   ├── Jenkinsfile                   # Jenkins pipeline
│   └── [other CI configs]
│
├── reports/                           # ✓ Test reports
│   ├── playwright-report/             # Local HTML reports
│   ├── test-results/                  # Test result XMLs
│   └── screenshots/                   # Screenshot captures
│
├── data/                              # ✓ Test data files
│   ├── users.json                    # User test data
│   ├── credentials.json              # Test credentials
│   └── [other test data]
│
├── docs/                              # ✓ Documentation
│   ├── SETUP.md                      # Setup instructions
│   ├── CONTRIBUTING.md               # Contributing guide
│   └── [other docs]
│
├── node_modules/                      # npm dependencies
│
├── [Root Configuration Files]
│   ├── playwright.config.ts           # Main Playwright config
│   ├── currents.config.ts             # Currents config
│   ├── package.json                   # Node dependencies
│   ├── package-lock.json              # Dependency lock
│   ├── .env.example                   # Environment template
│   ├── .gitignore                     # Git ignore rules
│   ├── Jenkinsfile                    # Jenkins pipeline
│   └── tsconfig.json                  # TypeScript config
│
├── [Documentation Files]
│   ├── README.md                      # Project overview
│   ├── TEST_SUITE.md                  # Test suite documentation
│   ├── PROJECT_STRUCTURE.md           # This file
│   ├── QUICK_START.md                 # Quick start guide
│   ├── TEST_CASES_SUMMARY.md          # Test cases detail
│   ├── CURRENTS_QUICK_SETUP.md       # Currents setup
│   ├── CURRENTS_SETUP.md             # Full Currents guide
│   ├── JENKINS_QUICK_REFERENCE.md    # Jenkins commands
│   ├── JENKINS_INSTALL_MAC.md        # Jenkins installation
│   └── [other documentation]
│
└── [Root Files]
    ├── install-jenkins.sh             # Jenkins installer
    └── [other scripts]
```

---

## 📋 Directory Descriptions

### /tests - Test Files
Contains all Playwright test files organized by type.

- **e2e/** - End-to-end tests (44 cases)
  - Tests complete user workflows
  - Tests across multiple websites
  - Tests multiple browsers
  - Tests responsive design

- **performance/** - Performance tests (10 cases)
  - Page load metrics
  - DOM metrics
  - Memory usage
  - Network activity

- **accessibility/** - Accessibility tests (15 cases)
  - WCAG compliance
  - Screen reader support
  - Keyboard navigation
  - Semantic HTML

### /src - Source Code
Contains reusable code and utilities.

- **fixtures/** - Test data and fixtures
  - Centralized URLs
  - Test timeouts
  - Viewport sizes
  - Test data objects

- **utils/** - Helper functions
  - Element waiting
  - Performance checking
  - Screenshot capture
  - Form automation
  - Retry logic

- **pages/** - Page object models (future)
  - Page class definitions
  - Locator definitions
  - Page methods
  - Common operations

- **config/** - Configuration
  - Test configuration
  - Browser options
  - Environment setup

### /config - Configuration Files
All configuration files in one place.

- `playwright.config.ts` - Main Playwright configuration
- `currents.config.ts` - Cloud reporting configuration

### /ci - CI/CD Configuration
Continuous integration pipeline configurations.

- `Jenkinsfile` - Jenkins pipeline definition
- GitHub Actions workflows (future)
- GitLab CI configuration (future)

### /reports - Test Reports
Generated test reports and artifacts.

- `playwright-report/` - HTML test reports
- `test-results/` - XML test result files
- `screenshots/` - Screenshot captures

### /data - Test Data
Test data files for various scenarios.

- `users.json` - User test data
- `credentials.json` - Login credentials
- API response mocks (future)

### /docs - Documentation
Project documentation and guides.

- Setup and installation guides
- Contributing guidelines
- API documentation
- Architecture documentation

---

## 🎯 File Organization Principles

### 1. By Test Type
```
Tests are organized by category:
- E2E Tests: Real user workflows
- Performance: Metrics and speed
- Accessibility: WCAG compliance
```

### 2. By Reusability
```
Common code goes in src/:
- Fixtures: Test data
- Utils: Helper functions
- Pages: Page objects (future)
```

### 3. By Environment
```
Configuration is centralized:
- playwright.config.ts: Base config
- currents.config.ts: Cloud reporting
- .env: Environment variables
```

### 4. By Purpose
```
Reports and data are separated:
- reports/: Generated artifacts
- data/: Test data files
- docs/: Documentation
```

---

## 📊 Test Organization

### By Test Type
```
Total: 59 test cases
├── E2E Tests: 44 cases (75%)
├── Performance: 10 cases (17%)
└── Accessibility: 15 cases (25%)
```

### By Website
```
├── Playwright.dev: 11 E2E tests
├── GitHub: 12 E2E tests
├── MDN: 11 E2E tests
└── StackBlitz: 10 E2E tests
```

### By Category
```
├── Page Loading: 6 tests
├── Navigation: 12 tests
├── Search: 4 tests
├── Forms: 2 tests
├── Performance: 10 tests
└── Accessibility: 15 tests
```

---

## 🚀 Adding New Tests

### To Add E2E Tests:
```
1. Create file: tests/e2e/05-website.spec.ts
2. Add test describe blocks
3. Follow naming convention (W1, W2, W3, etc.)
4. Import fixtures from src/fixtures/test-data.ts
```

### To Add Performance Tests:
```
1. Add tests to: tests/performance/performance.spec.ts
2. Use describe.only for isolated testing
3. Log metrics with console.log
4. Follow PERF naming (PERF1, PERF2, etc.)
```

### To Add Accessibility Tests:
```
1. Add tests to: tests/accessibility/accessibility.spec.ts
2. Check WCAG compliance
3. Test with screen readers
4. Follow A11Y naming (A11Y1, A11Y2, etc.)
```

---

## 📝 Naming Conventions

### Test Files
```
[number]-[description].spec.ts

Examples:
- 01-playwright-docs.spec.ts
- 02-github.spec.ts
- 03-mdn-docs.spec.ts
- 04-stackblitz.spec.ts
```

### Test Cases
```
[PREFIX][NUMBER]: [Description]

Prefixes:
- P = Playwright.dev
- G = GitHub
- M = MDN
- S = StackBlitz
- PERF = Performance
- A11Y = Accessibility

Examples:
- P1: Should load with correct title
- G2: Should display GitHub logo
- M3: Should have main content
- S4: Should have create button
- PERF5: Page load time
- A11Y6: Keyboard navigation
```

### Describe Blocks
```
test.describe('Feature Category', () => {
  test.describe('Specific Feature', () => {
    test('Should do something', async () => {});
  });
});
```

---

## 🔄 File Dependencies

```
Tests
  ↓
  Uses: src/fixtures/test-data.ts
  Uses: src/utils/test-helpers.ts
  
Configuration
  ↓
  Uses: currents.config.ts
  Uses: .env variables
  
CI/CD
  ↓
  Uses: Jenkinsfile
  Uses: config files
  
Reports
  ↓
  Generated by: Test runs
  Contains: Screenshots, videos, reports
```

---

## 📦 Adding New Dependencies

### To add npm package:
```bash
npm install --save-dev <package>
```

### To add dev dependency:
```bash
npm install --save-dev <package>
```

### Update package.json
```json
{
  "devDependencies": {
    "new-package": "^1.0.0"
  }
}
```

---

## 🔐 Security

### .env File
```
DO NOT commit .env file
Use .env.example as template
Store sensitive data in:
- .env (local)
- CI/CD secrets (GitHub, Jenkins)
```

### Git Ignore
```
.env
node_modules/
reports/
test-results/
screenshots/
*.log
.DS_Store
```

---

## 📈 Scaling the Project

### Phase 1: Current
- 59 test cases
- 4 websites
- 3 test categories
- Single CI/CD

### Phase 2: Expansion
- Add page object model (src/pages/)
- Add API tests (tests/api/)
- Add visual regression tests
- Add more websites

### Phase 3: Advanced
- Parallel test execution
- Multi-cloud testing
- Advanced reporting
- Performance trend analysis

---

## 🛠️ Maintenance

### Regular Tasks
- Update test data (src/fixtures/)
- Add new test cases
- Update documentation
- Review and refactor tests

### Quarterly Tasks
- Review test coverage
- Update dependencies
- Optimize performance tests
- Archive old reports

### Annual Tasks
- Major refactoring
- Architecture review
- Tool evaluation
- Strategic planning

---

## 📞 Quick Navigation

| Task | File/Directory |
|------|---|
| Add E2E test | `/tests/e2e/` |
| Add performance test | `/tests/performance/performance.spec.ts` |
| Add accessibility test | `/tests/accessibility/accessibility.spec.ts` |
| Add test data | `/src/fixtures/test-data.ts` |
| Add helper function | `/src/utils/test-helpers.ts` |
| Playwright config | `playwright.config.ts` |
| Currents config | `currents.config.ts` |
| Jenkins pipeline | `Jenkinsfile` |
| Test documentation | `TEST_SUITE.md` |

---

## ✅ Checklist for New Tests

- [ ] Create test file in correct directory
- [ ] Follow naming convention
- [ ] Use test.describe() for grouping
- [ ] Add meaningful test names
- [ ] Use fixtures for test data
- [ ] Use helpers for common operations
- [ ] Add comments for complex logic
- [ ] Test in all browsers
- [ ] Add to documentation
- [ ] Run tests locally before committing

---

## 📚 Related Documents

- [TEST_SUITE.md](./TEST_SUITE.md) - Test suite overview
- [README.md](./README.md) - Project overview
- [QUICK_START.md](./QUICK_START.md) - Getting started
- [TEST_CASES_SUMMARY.md](./TEST_CASES_SUMMARY.md) - All test cases
- [CURRENTS_SETUP.md](./CURRENTS_SETUP.md) - Cloud reporting
- [JENKINS_INSTALL_MAC.md](./JENKINS_INSTALL_MAC.md) - Jenkins setup

---

**Version:** 1.0.0  
**Last Updated:** September 3, 2026  
**Structure Type:** Professional Test Automation
