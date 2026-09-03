# Currents Integration Setup Guide

## What is Currents?

[Currents](https://currents.dev) is a cloud-based test results analysis and reporting platform for Playwright. It provides:

✅ **Real-time test result tracking**
✅ **Detailed test analytics & trends**
✅ **Video/screenshot attachments on failures**
✅ **CI/CD integration**
✅ **Historical test data**
✅ **Parallel test execution monitoring**
✅ **Smart failure detection**

---

## Installation Status

✅ **@currents/playwright** is already installed!

Installed version: **^2.5.0**

---

## Configuration

### Files Created/Updated

1. **currents.config.ts** - Currents configuration
2. **playwright.config.ts** - Updated with Currents reporter
3. **.env.example** - Environment variables template
4. **package.json** - Added Currents scripts

### Current Configuration

```typescript
// currents.config.ts
import { CurrentsConfig } from '@currents/playwright';

const config: CurrentsConfig = {
  projectId: 'LBuyQE',
  recordKey: process.env.CURRENTS_RECORD_KEY!,
};

export default config;
```

---

## Setup Instructions

### Step 1: Get Your Record Key

1. Go to [Currents Dashboard](https://app.currents.dev)
2. Sign up or log in with your GitHub/GitLab account
3. Navigate to your project settings
4. Copy your **Record Key** (keep it private!)

Your Project ID: **LBuyQE**

### Step 2: Set Environment Variables

#### Option A: Create .env file (Local Development)

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your record key
CURRENTS_RECORD_KEY=your_actual_record_key_here
```

**⚠️ Important:** Never commit `.env` to git! It's already in `.gitignore`.

#### Option B: Use Environment Variables (CI/CD)

```bash
# Set as environment variable before running tests
export CURRENTS_RECORD_KEY=your_actual_record_key_here
npm test
```

#### Option C: Pass via Command Line

```bash
CURRENTS_RECORD_KEY=your_record_key npx playwright test
```

---

## Running Tests with Currents

### Local Development

```bash
# Load from .env and run tests
npm test
```

The Currents reporter is configured to run automatically!

### With Explicit Currents Reporter

```bash
npm run test:currents
```

### CI/CD Environment

```bash
# GitHub Actions example
CURRENTS_PROJECT_ID=LBuyQE CURRENTS_RECORD_KEY=${{ secrets.CURRENTS_RECORD_KEY }} npm test
```

### Alternative Commands

```bash
# Run tests with Currents reporter and Playwright reporter
npm test

# Run specific test file
npm test -- tests/comprehensive.spec.ts

# Run specific test suite
npm test -- --grep "GitHub"

# Run on specific browser
npm test -- --project=chromium

# Headless with Currents
npm test -- --headed
```

---

## GitHub Actions Integration

### Setup Secrets

1. Go to your GitHub repository
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add secret:
   - Name: `CURRENTS_RECORD_KEY`
   - Value: Your actual record key

### Workflow Example

Create `.github/workflows/currents-tests.yml`:

```yaml
name: Currents Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run Playwright tests with Currents
        env:
          CURRENTS_PROJECT_ID: LBuyQE
          CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
        run: npm test
```

---

## Playwright Configuration Details

### Updated Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { currentsReporter } from '@currents/playwright';

export default defineConfig({
  // ... other config
  
  // Currents reporter added
  reporter: [
    'html',
    currentsReporter(),
  ],
  
  // Enhanced test recording
  use: {
    trace: 'retain-on-failure-and-retries',  // Record traces on failure
    video: 'retain-on-failure',               // Record videos on failure
    screenshot: 'on',                         // Capture screenshots
  },
});
```

### What These Settings Do

| Setting | Purpose |
|---------|---------|
| `trace: 'retain-on-failure-and-retries'` | Captures detailed trace on test failures |
| `video: 'retain-on-failure'` | Records video of failed test runs |
| `screenshot: 'on'` | Takes screenshots during test execution |

These recordings are automatically uploaded to Currents for analysis.

---

## Viewing Test Results

### On Currents Dashboard

1. Go to [Currents Dashboard](https://app.currents.dev)
2. Navigate to your project **LBuyQE**
3. View:
   - ✅ Test run results in real-time
   - 📊 Historical trends
   - 📹 Videos of failed tests
   - 📸 Screenshots
   - 📈 Analytics and insights

### Local HTML Report

Currents uploads results automatically, but you also get a local report:

```bash
npm run test:report
```

This opens the local HTML report in your browser.

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `CURRENTS_RECORD_KEY` | ✅ Yes | Your Currents API key (keep private!) |
| `CURRENTS_PROJECT_ID` | ❌ No | Project ID (defaults to LBuyQE) |

### Optional Variables

```bash
# Override default project ID
CURRENTS_PROJECT_ID=your_project_id

# Set CI/CD build ID (for grouping tests)
CURRENTS_CI_BUILD_ID=build-123

# Set build URL for linking
CURRENTS_CI_BUILD_URL=https://github.com/...
```

---

## Troubleshooting

### Tests run but no results on Currents

**Problem:** Tests complete locally but don't appear on Currents dashboard

**Solutions:**
1. Verify `CURRENTS_RECORD_KEY` is correct
2. Check that reporter is enabled in `playwright.config.ts`
3. Look for reporter error in test output
4. Verify internet connection (uploading results)

```bash
# Run with verbose logging
CURRENTS_RECORD_KEY=your_key npm test -- --reporter=verbose
```

### "recordKey is not set" error

**Problem:** Error message: `recordKey is not set`

**Solution:** Make sure environment variable is set:

```bash
# Check if variable is set
echo $CURRENTS_RECORD_KEY

# If empty, set it:
export CURRENTS_RECORD_KEY=your_actual_key

# Then run tests
npm test
```

### Permission denied or invalid key

**Problem:** Error during result upload

**Solutions:**
1. Double-check your record key is copied correctly
2. Verify project ID matches (LBuyQE)
3. Generate a new key in Currents dashboard if needed
4. Check that key hasn't expired

### Video/screenshot uploads failing

**Problem:** Tests pass but videos/screenshots not on Currents

**Solutions:**
1. Check that `video` and `screenshot` settings are enabled in config
2. Verify they're only captured on failures:
   - `video: 'retain-on-failure'`
   - `screenshot: 'on'`
3. Ensure network connectivity for uploads

---

## Best Practices

### ✅ Do's
- ✅ Keep `CURRENTS_RECORD_KEY` private (use environment variables)
- ✅ Commit `currents.config.ts` (configuration only)
- ✅ Store key in CI/CD secrets manager
- ✅ Use `.env.example` to document requirements
- ✅ Run tests with Currents in CI/CD pipeline
- ✅ Review test trends on Currents dashboard

### ❌ Don'ts
- ❌ Don't commit `.env` file (already in .gitignore)
- ❌ Don't hardcode record key in config files
- ❌ Don't share record key in PRs or issues
- ❌ Don't paste key in logs or terminal output
- ❌ Don't regenerate key unless necessary

---

## Example Workflows

### Local Development

```bash
# 1. Copy example env file
cp .env.example .env

# 2. Edit .env and add your key
nano .env

# 3. Run tests (Currents runs automatically)
npm test

# 4. Check results on Currents dashboard
# https://app.currents.dev/projects/LBuyQE
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
        env:
          CURRENTS_PROJECT_ID: LBuyQE
          CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
```

### Local with Specific Configuration

```bash
# Run only failed tests with Currents
npm test -- --last-failed

# Run with debug output
npm test -- --reporter=verbose

# Run specific file
npm test -- tests/comprehensive.spec.ts
```

---

## Dashboard Features

### Real-time Monitoring
- Watch test runs as they execute
- See pass/fail status in real-time
- Monitor parallel test execution

### Analytics
- Test duration trends
- Failure rate analysis
- Most flaky tests identification
- Performance metrics

### Insights
- Detailed error messages
- Screenshot/video attachments
- Stack traces
- Comparison with previous runs

### Integration
- Slack notifications
- GitHub PR comments
- Email reports
- Webhook support

---

## FAQ

**Q: Can I use Currents without the record key?**
A: Yes, tests run locally with just the HTML reporter. Currents is optional for uploading results to their cloud.

**Q: How often are results uploaded?**
A: After each test run completes. Results are typically available within seconds.

**Q: Can I view results without internet?**
A: Yes, use the local HTML report with `npm run test:report`. Currents cloud requires internet.

**Q: How long are test results retained?**
A: Depends on your Currents plan. Check their documentation for details.

**Q: Can I use Currents with CI/CD services other than GitHub?**
A: Yes! Currents supports most CI/CD platforms (GitLab CI, Jenkins, CircleCI, etc.).

**Q: Is there a free tier?**
A: Yes! Currents offers a free tier for open-source projects. Check their pricing page.

---

## Resources

- 🌐 **Currents Website:** https://currents.dev
- 📚 **Documentation:** https://docs.currents.dev
- 🔧 **Playwright Reporter:** https://docs.currents.dev/guide/playwright
- 💬 **Support:** support@currents.dev
- 📖 **API Reference:** https://docs.currents.dev/api

---

## Next Steps

1. ✅ Get your record key from Currents
2. ✅ Set `CURRENTS_RECORD_KEY` environment variable
3. ✅ Run: `npm test`
4. ✅ Check results on Currents dashboard
5. ✅ Configure GitHub Actions for CI/CD
6. ✅ Review test analytics on dashboard

---

## Project Information

**Project ID:** LBuyQE
**Installed:** @currents/playwright v2.5.0
**Playwright Version:** v1.62.1
**Browsers:** Chromium, Firefox, WebKit

---

Happy testing with Currents! 🚀
