# Deployment Guide - Orange Telco Dashboard to Vercel

## Quick Start Deployment (5 minutes)

### Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Git installed on your computer

---

## Step 1: Upload Code to GitHub

### Option A: Using GitHub Desktop (Easiest)
1. Download and install GitHub Desktop
2. Create new repository:
   - Click "File" → "New Repository"
   - Name: `telco-dashboard`
   - Local Path: Choose the `telco-dashboard` folder
   - Click "Create Repository"
3. Publish to GitHub:
   - Click "Publish repository"
   - Uncheck "Keep this code private" (or keep checked if preferred)
   - Click "Publish repository"

### Option B: Using Command Line
```bash
cd telco-dashboard
git init
git add .
git commit -m "Initial commit - Orange Telco Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/telco-dashboard.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find and select `telco-dashboard` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: Vite (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Leave everything else as default

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your dashboard will be live at: `https://telco-dashboard-xxx.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project
cd telco-dashboard

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

---

## Step 3: Custom Domain (Optional)

1. In Vercel Dashboard:
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain (e.g., `dashboard.orange-liberia.com`)

2. Configure DNS:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Wait for DNS propagation (5-30 minutes)

---

## Step 4: Verify Deployment

1. **Visit your URL**
   - Open the deployed URL in browser
   - Should see Orange branding and white background

2. **Test Features**
   - ✅ Adjust sliders - charts should update
   - ✅ Upload Excel file - should accept data
   - ✅ Download Excel - should export forecast
   - ✅ AI Chat - type a question and click Send

---

## Troubleshooting

### Build Fails
**Error**: `npm install failed`
- Solution: Check package.json is committed to git
- Solution: Try deleting `node_modules` and `package-lock.json`, then redeploy

**Error**: `Build command failed`
- Solution: Run `npm run build` locally to test
- Check Vercel build logs for specific error
- Ensure all files are committed to git

### Deployment Successful but Site Not Working
**White screen / blank page**
- Check browser console (F12) for errors
- Verify all files are in correct locations
- Check Vercel function logs for runtime errors

**Charts not showing**
- Verify recharts is in package.json dependencies
- Check if data is loading (console.log in useEffect)

**AI Chat not working**
- API calls from browser may need CORS configuration
- Check browser network tab for failed requests
- Verify Claude API access

### Images Not Loading
**Logos not appearing**
- Verify image URLs are accessible
- Check browser console for 404 errors
- Consider uploading logos to Vercel public folder

---

## Environment Variables (If Needed)

If you need to add API keys:

1. **In Vercel Dashboard**:
   - Project Settings → Environment Variables
   - Add: `VITE_API_KEY` = `your-api-key`
   - Redeploy for changes to take effect

2. **In Code**:
   ```javascript
   const apiKey = import.meta.env.VITE_API_KEY;
   ```

---

## Updates and Redeployment

### Automatic Deployment
Vercel automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update dashboard features"
git push
```

### Manual Deployment
In Vercel Dashboard:
- Go to Deployments
- Click "..." on latest deployment
- Click "Redeploy"

---

## Performance Optimization

### Enable Analytics
1. Vercel Dashboard → Analytics → Enable
2. Monitor page views and performance

### Speed Optimizations
- Images are loaded from external CDN
- Vite automatically optimizes build
- Consider adding loading states for AI chat

---

## Production Checklist

Before showing to executives:

- [ ] Test on desktop browser (Chrome, Edge, Firefox)
- [ ] Test on tablet
- [ ] Test on mobile phone
- [ ] Verify logos display correctly
- [ ] Test all sliders and inputs
- [ ] Upload sample Excel file
- [ ] Download Excel export
- [ ] Ask AI several what-if questions
- [ ] Check Orange branding (colors, fonts)
- [ ] Verify copyright notice at bottom
- [ ] Test with slow internet connection
- [ ] Check on different screen sizes

---

## Demo Script for Executives

### 1. Introduction (1 minute)
"Welcome to our AI-Driven Telco Dashboard. This tool demonstrates how AI can transform executive decision-making for ARPU and churn management."

### 2. Show Controls (1 minute)
"On the left, we can adjust key business parameters - ARPU growth rates, churn rates, and subscriber base. Notice how the forecasts update in real-time."

### 3. AI Chat Demo (3 minutes)
"The real innovation is our AI assistant. Watch what happens when I ask:
- 'What if ARPU declined by 30%?'
- Notice the charts update automatically
- 'What strategies can reduce churn in telecom?'
- See how it provides professional insights"

### 4. Data Integration (1 minute)
"We can upload external data from Excel, and download results for boardroom presentations."

### 5. Insights (1 minute)
"The dashboard shows executive insights - total revenue impact, subscriber trends, and strategic recommendations."

---

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev
- **Recharts Documentation**: https://recharts.org

---

## Cost Estimate

- **Vercel Free Tier**:
  - 100GB bandwidth/month
  - Unlimited websites
  - Automatic HTTPS
  - Perfect for demo/small production

- **Vercel Pro** ($20/month):
  - If you need more bandwidth
  - Custom domains
  - Analytics
  - Priority support

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Test all features
3. ✅ Share URL with stakeholders
4. ✅ Gather feedback
5. 🔄 Iterate and improve

---

**Your dashboard is production-ready and optimized for executive presentations!**

Good luck with your demo to Orange Liberia executives! 🚀
