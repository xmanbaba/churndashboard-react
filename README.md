# Orange Telco Executive Dashboard

An AI-powered ARPU & Churn forecasting dashboard for executives at Orange Liberia, demonstrating how AI leadership enables faster, data-driven decision-making.

## Features

✅ **Interactive Forecasting**: Real-time ARPU and Churn rate simulations with 60-month projections
✅ **AI Chat Assistant**: Ask questions and run what-if scenarios using natural language
✅ **Orange Branding**: Professional white background with Orange brand colors
✅ **Data Import/Export**: Upload Excel files with external data and download forecast results
✅ **Executive Insights**: Key metrics and observations for boardroom reporting
✅ **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **Recharts** - Data visualization
- **XLSX** - Excel file handling
- **Anthropic Claude API** - AI-powered chat assistant

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- **Google Gemini API key** (free - see [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md))

### Local Development

1. **Install dependencies**
```bash
npm install
```

2. **Configure AI (Required for chat feature)**
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Gemini API key
# Get free API key: https://makersuite.google.com/app/apikey
# See AI_SETUP_GUIDE.md for detailed instructions
```

3. **Start development server**
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

Follow the prompts to link/create your project. For subsequent deployments:
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Vercel will auto-detect Vite configuration
5. Click "Deploy"

### Environment Variables (Required for AI Chat)

The AI chat feature requires a Google Gemini API key:

1. **Get your free API key**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with Google account
   - Click "Create API Key"
   - Copy the key

2. **For local development**
   Create a `.env` file in the root directory:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. **For Vercel deployment**
   Add to Vercel via dashboard: Project Settings → Environment Variables
   - Name: `VITE_GEMINI_API_KEY`
   - Value: Your API key
   - Environment: Production, Preview, Development

📚 **See [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md) for complete setup instructions**

## Project Structure

```
telco-dashboard/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Orange branding and styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Base styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── vercel.json          # Vercel deployment config
└── README.md            # This file
```

## Using the Dashboard

### Simulation Controls

Use the left sidebar to adjust:
- **Forecast Horizon**: 6-60 months
- **Base ARPU**: Starting average revenue per user
- **ARPU Growth Rate**: Monthly percentage change in ARPU
- **Base Churn Rate**: Starting monthly customer churn percentage
- **Churn Monthly Change**: Basis points change in churn rate
- **Starting Subscribers**: Initial subscriber base in millions

### AI Chat Features

The AI assistant can help with:

1. **What-If Analysis**: 
   - "What if ARPU declined by 30%?"
   - "What would happen if churn increased to 8%?"

2. **Professional Insights**:
   - "How can we improve subscriber retention?"
   - "What strategies reduce churn in telecom?"

3. **Revenue Impact**:
   - "What's the revenue impact of 2% ARPU growth?"
   - "How much revenue do we lose with 5% churn?"

The AI will automatically adjust the dashboard parameters when you ask what-if questions!

### Data Import

Upload an Excel file with the following columns:
- baseARPU
- arpuGrowthRate
- baseChurnRate
- churnMonthlyChange
- startingSubscribers

Example Excel template:
| baseARPU | arpuGrowthRate | baseChurnRate | churnMonthlyChange | startingSubscribers |
|----------|----------------|---------------|-------------------|---------------------|
| 8.0      | 2.0            | 5.0           | -10               | 5.0                 |

### Data Export

Click "Download Forecast (Excel)" to export the complete forecast data for boardroom presentations.

## Orange Branding

The dashboard features:
- Orange primary color: #FF7900
- White background for professional presentation
- Strategy House logo (left header)
- Orange logo (right header)
- Professional typography and layout

## AI Integration Notes

The dashboard uses the **Google Gemini API** for the AI chat assistant. 

### Features:
- Natural language what-if analysis
- Automatic parameter updates based on questions
- Professional telco insights and recommendations
- Real-time chart updates

### Setup:
- Free tier: 15 requests/minute, 1500/day
- No credit card required
- See [AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md) for complete instructions

### Security:
- API key stored in environment variables
- Never committed to Git (.env is in .gitignore)
- Separate keys for dev and production recommended

### Example Questions:
- "What if ARPU declined by 30%?"
- "How can we reduce churn in our market?"
- "What's the revenue impact of 2% ARPU growth?"

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Initial load: <2 seconds
- Chart updates: Real-time
- AI responses: 2-5 seconds
- Excel export: Instant

## Troubleshooting

**Charts not displaying?**
- Ensure all dependencies installed: `npm install`
- Clear browser cache and reload

**AI chat not working?**
- Check browser console for errors
- Verify network connectivity
- Ensure API access is configured

**Deployment fails?**
- Verify all files are committed to git
- Check build command succeeds locally: `npm run build`
- Review Vercel deployment logs

## Support

For questions or issues:
- Check the browser console for error messages
- Review Vercel deployment logs
- Ensure all dependencies are up to date

## License

© 2025 Suleiman Shaibu

---

**Built with ❤️ for Orange Liberia executives**
