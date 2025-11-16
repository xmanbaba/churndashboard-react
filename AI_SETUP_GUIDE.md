# 🤖 AI Integration Setup Guide
## Google Gemini API Configuration

---

## Why Gemini API?

✅ **Free Tier**: 15 requests/minute, 1500/day - perfect for demos  
✅ **No Credit Card**: Free tier requires no payment info  
✅ **Fast Setup**: Get API key in under 2 minutes  
✅ **Reliable**: Google's production AI infrastructure  
✅ **Smart**: Handles what-if analysis and telco insights  

---

## Step 1: Get Your Free Gemini API Key

### Option A: Quick Setup (Recommended)

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey
   - Or: https://aistudio.google.com/app/apikey

2. **Sign In**
   - Use your Google account
   - Accept terms and conditions

3. **Create API Key**
   - Click "Create API Key" button
   - Select "Create API key in new project" (or use existing)
   - Copy your API key (it looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

4. **Save It Securely**
   - Store it somewhere safe (you'll need it in next step)

---

## Step 2: Configure for Local Development

### Create .env file

1. **Copy the example file**
   ```bash
   cp .env.example .env
   ```

2. **Edit .env file**
   ```bash
   # Open in your editor
   nano .env
   # or
   code .env
   ```

3. **Add your API key**
   ```
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   (Replace with your actual API key from Step 1)

4. **Save and close**

### Verify Setup

```bash
# Run the app
npm run dev

# Open http://localhost:3000
# Try asking the AI a question
# If you see a response, it's working! ✅
```

---

## Step 3: Configure for Vercel Deployment

### Method 1: Vercel Dashboard (Recommended)

1. **Go to your Vercel project**
   - Visit: https://vercel.com/dashboard
   - Select your `telco-dashboard` project

2. **Add Environment Variable**
   - Go to: Settings → Environment Variables
   - Click "Add New"
   - Name: `VITE_GEMINI_API_KEY`
   - Value: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` (your API key)
   - Environment: Production, Preview, Development (select all)
   - Click "Save"

3. **Redeploy**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Method 2: Vercel CLI

```bash
# Set environment variable via CLI
vercel env add VITE_GEMINI_API_KEY

# When prompted, paste your API key
# Select all environments (production, preview, development)

# Redeploy
vercel --prod
```

---

## Step 4: Test the AI Chat

### Test Questions to Try:

1. **What-if Analysis**
   ```
   "What if ARPU declined by 30%?"
   ```
   ✅ Expected: AI analyzes impact, charts update automatically

2. **Strategic Advice**
   ```
   "How can we reduce churn in our market?"
   ```
   ✅ Expected: AI provides professional telco strategies

3. **Revenue Impact**
   ```
   "What's the revenue impact of 2% ARPU growth?"
   ```
   ✅ Expected: AI calculates and explains the impact

4. **Complex Scenario**
   ```
   "If churn increases by 3% and ARPU grows by 5%, what happens to our subscriber base?"
   ```
   ✅ Expected: AI analyzes multi-parameter scenario

---

## Troubleshooting

### Error: "Gemini API key not configured"

**Cause**: Missing or incorrect API key  
**Solution**: 
1. Check `.env` file exists
2. Verify `VITE_GEMINI_API_KEY` is set
3. Restart dev server: `npm run dev`
4. For Vercel: Check environment variables in dashboard

### Error: "API key not valid"

**Cause**: Incorrect API key format  
**Solution**:
1. Go back to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy it exactly (no spaces)
4. Update `.env` file
5. Restart server

### Error: "429 Too Many Requests"

**Cause**: Exceeded free tier limit (15/min or 1500/day)  
**Solution**:
1. Wait a minute and try again
2. For production, consider paid tier
3. Implement rate limiting in your app

### Error: "Failed to fetch"

**Cause**: Network or CORS issue  
**Solution**:
1. Check internet connection
2. Verify API key is correct
3. Check browser console for detailed error
4. Try in incognito mode

### AI Responses but Charts Don't Update

**Cause**: Parameter extraction not working  
**Solution**:
1. Ask more specific questions: "What if ARPU declined by exactly 30%?"
2. Include numbers: "reduce churn to 4.5%"
3. The AI needs to clearly state the parameter changes

---

## Free Tier Limits

| Metric | Free Tier | Notes |
|--------|-----------|-------|
| Requests/Minute | 15 | For demo, this is plenty |
| Requests/Day | 1,500 | ~100 demo sessions/day |
| Tokens/Minute | 1 million | More than enough |
| Cost | $0 | Completely free! |

### When to Upgrade:

- **Production Use**: If you get >100 users/day
- **High Volume**: Need more than 15 req/min
- **Enterprise**: Require SLA guarantees

Paid tier is very affordable (~$0.50 per 1M characters)

---

## Security Best Practices

### ✅ DO:
- Store API key in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in Vercel
- Rotate keys periodically
- Monitor usage in Google Cloud Console

### ❌ DON'T:
- Commit API key to Git
- Share API key publicly
- Hardcode API key in source code
- Use same key for dev and production
- Ignore security warnings

---

## Alternative: Mock AI (For Testing Without API)

If you want to test without setting up Gemini API, I can provide a mock version that uses hardcoded responses. This is useful for:

- Initial development
- Demo without internet
- Testing UI without API costs

Let me know if you want this version!

---

## API Key Management

### Where to Store Keys:

**Local Development:**
```
.env file (never commit this!)
```

**Vercel Production:**
```
Vercel Dashboard → Settings → Environment Variables
```

**Multiple Environments:**
```
.env.development  (local dev)
.env.production   (if needed)
Vercel handles prod automatically
```

---

## Monitoring Usage

### Check Your Usage:

1. Go to: https://console.cloud.google.com/
2. Select your project
3. Navigate to: APIs & Services → Dashboard
4. View: Gemini API metrics

### Set Up Alerts:

1. In Google Cloud Console
2. Go to: Monitoring → Alerting
3. Create alert for API usage
4. Set threshold (e.g., 80% of daily limit)

---

## Cost Calculator (If Upgrading)

**Free Tier**: $0/month

**Pay-as-you-go** (if exceeded free tier):
- Input: $0.00025 / 1K characters
- Output: $0.0005 / 1K characters

**Example**: 1000 questions/day, avg 200 chars each
- Monthly cost: ~$5-10
- Still very affordable!

---

## Quick Reference Commands

```bash
# Create .env file
cp .env.example .env

# Edit .env file
nano .env

# Test locally
npm run dev

# Deploy to Vercel with env var
vercel env add VITE_GEMINI_API_KEY
vercel --prod

# Check if env var is loaded (in browser console)
console.log(import.meta.env.VITE_GEMINI_API_KEY ? 'API Key loaded' : 'API Key missing')
```

---

## Support Resources

- **Gemini API Docs**: https://ai.google.dev/docs
- **API Key Management**: https://makersuite.google.com/app/apikey
- **Pricing**: https://ai.google.dev/pricing
- **Rate Limits**: https://ai.google.dev/gemini-api/docs/quota
- **Status Page**: https://status.cloud.google.com/

---

## ✅ Setup Checklist

Before your demo:

- [ ] Got Gemini API key from Google AI Studio
- [ ] Created `.env` file with API key
- [ ] Tested locally - AI chat responds
- [ ] Added env var to Vercel dashboard
- [ ] Redeployed to Vercel
- [ ] Tested on production URL
- [ ] Verified charts update from AI questions
- [ ] Tested 3-4 different question types
- [ ] Checked API usage in Google Cloud Console

---

**You're all set! The AI integration is now fully functional.** 🎉

---

© 2025 Suleiman Shaibu
