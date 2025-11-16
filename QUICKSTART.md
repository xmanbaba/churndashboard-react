# 🚀 QUICK START GUIDE
## Orange Telco Executive Dashboard

### Get Started in 3 Steps:

## Step 1: Install Dependencies
```bash
cd telco-dashboard
npm install
```

## Step 2: Configure AI Chat (Required)
```bash
# Get free Gemini API key from: https://makersuite.google.com/app/apikey
# Then create .env file:
cp .env.example .env

# Edit .env and add your API key:
# VITE_GEMINI_API_KEY=your_api_key_here
```

## Step 3: Run Locally
```bash
npm run dev
```
Dashboard will open at http://localhost:3000

## Step 4: Deploy to Vercel
```bash
npm install -g vercel
vercel

# Don't forget to add VITE_GEMINI_API_KEY in Vercel dashboard!
# Settings → Environment Variables
```

📚 **Need help with AI setup?** See [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md)

---

## ✨ What's New in This Dashboard

### 1. ✅ Orange Branding
- White background with black text (professional presentation)
- Orange color scheme (#FF7900)
- Strategy House logo (left) + Orange logo (right)
- Copyright notice at bottom

### 2. ✅ AI Chat Assistant
- Ask what-if questions in plain English
- Dashboard automatically updates based on AI analysis
- Get professional telco insights
- Example: "What if ARPU declined by 30%?"

### 3. ✅ 60-Month Forecast
- Extended from 12 to 60 months for realistic history
- Better trend visualization
- More comprehensive analysis

### 4. ✅ Data Import/Export
- Upload Excel files with custom parameters
- Download forecast results for presentations
- Ready for boardroom reporting

### 5. ✅ Real-Time Interactivity
- All controls update charts instantly
- Smooth animations
- Responsive design (desktop, tablet, mobile)

---

## 🎯 Key Features Demo

### AI Chat Examples:
1. "What if ARPU declined by 30%?" → Dashboard updates automatically
2. "What would happen if monthly churn change was 15%?" → Charts reflect new scenario
3. "How can we improve subscriber retention?" → Professional telco advice
4. "What's the revenue impact of reducing churn by 2%?" → Detailed analysis

### Control Panel:
- Forecast Horizon: 6-60 months (default: 60)
- Base ARPU: $2-$50 (default: $8)
- ARPU Growth Rate: -5% to 10% (default: 2%)
- Base Churn Rate: 1%-15% (default: 5%)
- Churn Monthly Change: -50 to 50 bps (default: -10)
- Starting Subscribers: 0.1M-50M (default: 5M)

### Data Import Template:
Create an Excel file with these columns:
- baseARPU
- arpuGrowthRate
- baseChurnRate
- churnMonthlyChange
- startingSubscribers

---

## 📊 Dashboard Sections

1. **Header**: Dual branding (Strategy House + Orange)
2. **Introduction**: Overview of dashboard capabilities
3. **Simulation Controls**: Adjust all parameters
4. **Forecast Visualizations**: 3 interactive charts
5. **AI Chat**: Ask questions and get insights
6. **Executive Insights**: Key metrics summary
7. **Footer**: Copyright notice

---

## 🎨 Design Specifications

**Colors:**
- Primary: Orange #FF7900
- Background: White #FFFFFF
- Text: Black #000000
- Accent: Light Gray #F5F5F5

**Typography:**
- Headers: Segoe UI, 24-28px
- Body: Segoe UI, 14-16px
- Professional and readable

**Layout:**
- Responsive grid
- Left sidebar for controls
- Main area for visualizations
- Full-width AI chat section

---

## 💡 Tips for Executive Demo

### Opening (30 seconds)
"This AI-powered dashboard shows how Orange can leverage data science and artificial intelligence for strategic ARPU and churn management."

### Show Controls (1 minute)
Adjust sliders and show real-time chart updates

### AI Demo (2-3 minutes) - THE WOW FACTOR
1. Ask: "What if ARPU declined by 30%?"
2. Watch the AI analyze and update charts
3. Ask: "How can we reduce churn in our market?"
4. Show professional insights

### Data Integration (1 minute)
- Upload sample Excel file
- Download results

### Close (30 seconds)
"This is how AI enables faster, data-driven decision-making for executive leadership."

---

## 🔧 Troubleshooting

**Issue**: npm install fails
**Solution**: Delete node_modules and package-lock.json, then run npm install again

**Issue**: Charts not showing
**Solution**: Make sure you ran npm install - recharts dependency is required

**Issue**: AI chat not working
**Solution**: Check browser console for errors, ensure fetch API is supported

**Issue**: Logos not loading
**Solution**: Verify internet connection - logos are loaded from external URLs

---

## 📁 Project Files

```
telco-dashboard/
├── src/
│   ├── App.jsx          # Main dashboard (AI chat, charts, controls)
│   ├── App.css          # Orange branding and styling
│   ├── main.jsx         # React entry point
│   └── index.css        # Base styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Build configuration
├── vercel.json          # Vercel deployment
├── README.md            # Full documentation
├── DEPLOYMENT.md        # Deployment guide
└── QUICKSTART.md        # This file
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
- Free hosting
- Automatic deployments
- Custom domains
- HTTPS included
- See DEPLOYMENT.md for details

### Option 2: Local Development
```bash
npm run dev
```

### Option 3: Build for Production
```bash
npm run build
npm run preview
```

---

## 📞 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Review README.md for detailed docs
3. See DEPLOYMENT.md for deployment help

---

## ✅ Pre-Demo Checklist

Before presenting to executives:

- [ ] Test on Chrome/Edge browser
- [ ] Test all slider controls
- [ ] Test AI chat with 3-4 questions
- [ ] Upload sample Excel file
- [ ] Download Excel export
- [ ] Verify logos display
- [ ] Check Orange branding (colors)
- [ ] Verify copyright notice
- [ ] Test on projector/large screen
- [ ] Prepare backup internet connection

---

## 🎉 You're Ready!

Your Orange Telco Executive Dashboard is complete with:
✅ Professional white background
✅ Orange branding
✅ AI chat assistant
✅ 60-month forecasting
✅ Data import/export
✅ Real-time interactivity
✅ Executive insights
✅ Ready for Vercel deployment

**Time to wow those executives!** 🚀

---

© 2025 Suleiman Shaibu
