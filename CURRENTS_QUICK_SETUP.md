# ⚡ Currents Quick Setup (5 minutes)

## What You Need

Your Currents **Record Key** from [https://app.currents.dev](https://app.currents.dev)

Your **Project ID:** `LBuyQE`

---

## Quick Setup

### Step 1: Get Your Record Key (1 min)

1. Go to [Currents Dashboard](https://app.currents.dev)
2. Sign in with GitHub
3. Go to **Settings** → Copy your **Record Key**

### Step 2: Create .env File (1 min)

```bash
# In your project root, create .env file:
CURRENTS_RECORD_KEY=paste_your_key_here
```

**OR** set as environment variable:

```bash
export CURRENTS_RECORD_KEY=your_key_here
```

### Step 3: Run Tests (1 min)

```bash
npm test
```

That's it! Tests are uploaded to Currents automatically.

### Step 4: View Results (2 min)

1. Go to [Currents Dashboard](https://app.currents.dev/projects/LBuyQE)
2. See your test results in real-time
3. View videos & screenshots of failures

---

## Commands

```bash
# Run tests (automatically uploads to Currents)
npm test

# Run specific browser
npm test -- --project=chromium

# Run specific tests
npm test -- --grep "GitHub"

# Interactive UI
npm run test:ui

# Local report only (no Currents upload)
npm run test:report
```

---

## For GitHub Actions

Add to your workflow secrets:
- Name: `CURRENTS_RECORD_KEY`
- Value: Your record key

Then in your workflow:

```yaml
- run: npm test
  env:
    CURRENTS_PROJECT_ID: LBuyQE
    CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
```

---

## Troubleshooting

**No results appearing?**
- Check your record key is correct
- Verify `.env` file exists
- Run `echo $CURRENTS_RECORD_KEY` to confirm it's set

**"recordKey is not set" error?**
```bash
export CURRENTS_RECORD_KEY=your_key
npm test
```

**Can't find your record key?**
- Log in at [app.currents.dev](https://app.currents.dev)
- Go to project settings
- Copy "Record Key"

---

## Files Set Up

✅ `currents.config.ts` - Configuration  
✅ `playwright.config.ts` - Updated with reporter  
✅ `.env.example` - Template for env variables  
✅ `CURRENTS_SETUP.md` - Full documentation  
✅ `package.json` - Added test scripts  

---

## What Happens Now

When you run `npm test`:

1. ✅ Tests execute locally (Chromium, Firefox, WebKit)
2. 📹 Videos recorded on failures
3. 📸 Screenshots captured
4. 📊 Results uploaded to Currents
5. 🔗 Check dashboard for insights

---

## Dashboard URL

**Your Project:** https://app.currents.dev/projects/LBuyQE

Monitor:
- ✅ Real-time test results
- 📊 Test analytics & trends
- 📹 Failure videos & screenshots
- 📈 Performance metrics
- 🔔 Notifications

---

**Ready?** Run `npm test` and check your Currents dashboard! 🚀
