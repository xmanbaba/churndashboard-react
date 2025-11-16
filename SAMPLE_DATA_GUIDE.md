# 📊 Sample Data Files Guide
## CSV Templates for Dashboard Upload

---

## 📁 Available Sample Files

All sample CSV files are in the `/telco-dashboard/` folder:

### 1. **sample-data-template.csv** ⭐ (Main Template)
**Use for**: Basic demo with default values

**Values:**
- Base ARPU: $8.00
- ARPU Growth Rate: 2.0%
- Base Churn Rate: 5.0%
- Churn Monthly Change: -10 bps
- Starting Subscribers: 5.0M

**Scenario**: Moderate growth with improving churn

---

### 2. **scenario-optimistic-growth.csv** 📈
**Use for**: Demonstrating best-case scenario

**Values:**
- Base ARPU: $10.00
- ARPU Growth Rate: 3.5%
- Base Churn Rate: 4.0%
- Churn Monthly Change: -15 bps
- Starting Subscribers: 7.5M

**Scenario**: Strong market position, aggressive growth, excellent retention

**When to use**: Show executives what's possible with strong performance

---

### 3. **scenario-pessimistic.csv** 📉
**Use for**: Demonstrating worst-case scenario

**Values:**
- Base ARPU: $6.50
- ARPU Growth Rate: 0.5%
- Base Churn Rate: 7.0%
- Churn Monthly Change: +10 bps (increasing churn!)
- Starting Subscribers: 4.0M

**Scenario**: Challenging market conditions, high churn, slow growth

**When to use**: Show risks and importance of intervention

---

### 4. **scenario-aggressive-expansion.csv** 🚀
**Use for**: Demonstrating high-growth strategy

**Values:**
- Base ARPU: $12.00
- ARPU Growth Rate: 5.0%
- Base Churn Rate: 3.5%
- Churn Monthly Change: -20 bps
- Starting Subscribers: 10.0M

**Scenario**: Premium positioning, rapid expansion, low churn

**When to use**: Show potential with major investment or market leadership

---

### 5. **scenario-market-decline.csv** ⚠️
**Use for**: Crisis scenario planning

**Values:**
- Base ARPU: $7.00
- ARPU Growth Rate: -1.0% (declining!)
- Base Churn Rate: 8.5%
- Churn Monthly Change: +20 bps (worsening!)
- Starting Subscribers: 5.0M

**Scenario**: Market recession, competitive pressure, subscriber losses

**When to use**: Demonstrate need for strategic changes, risk management

---

### 6. **scenario-orange-liberia.csv** 🍊 (Realistic for Demo)
**Use for**: Orange Liberia specific demo

**Values:**
- Base ARPU: $9.00
- ARPU Growth Rate: 2.5%
- Base Churn Rate: 5.5%
- Churn Monthly Change: -12 bps
- Starting Subscribers: 6.0M

**Scenario**: Realistic Orange Liberia market conditions

**When to use**: Main demo scenario for Orange executives

---

## 📋 File Format Explained

### CSV Structure
```csv
baseARPU,arpuGrowthRate,baseChurnRate,churnMonthlyChange,startingSubscribers
8.0,2.0,5.0,-10,5.0
```

### Column Definitions

| Column | Description | Unit | Example |
|--------|-------------|------|---------|
| **baseARPU** | Starting average revenue per user | Dollars ($) | 8.0 = $8.00 |
| **arpuGrowthRate** | Monthly ARPU growth rate | Percentage (%) | 2.0 = 2% growth |
| **baseChurnRate** | Starting monthly churn rate | Percentage (%) | 5.0 = 5% churn |
| **churnMonthlyChange** | Monthly change in churn rate | Basis points (bps) | -10 = -0.10% per month |
| **startingSubscribers** | Initial subscriber base | Millions | 5.0 = 5 million |

### Important Notes

⚠️ **Basis Points (bps)**: 
- 100 bps = 1%
- -10 bps = -0.10% (churn improving)
- +10 bps = +0.10% (churn worsening)

✅ **File must have header row** (column names)
✅ **Use commas** as separators
✅ **No spaces** after commas
✅ **Decimal point** (not comma) for numbers

---

## 🎯 How to Use Sample Files

### Step 1: Choose Your Scenario
Select the CSV file that matches your demo needs

### Step 2: Upload to Dashboard
1. Open the dashboard
2. Find "Upload External Data" in left sidebar
3. Click "Choose File"
4. Select your CSV file
5. Dashboard updates automatically!

### Step 3: Demo
Charts will immediately reflect the new parameters

---

## ✏️ Creating Your Own Scenarios

### Method 1: Edit Existing File

1. **Open any sample CSV in text editor**
   ```bash
   nano scenario-orange-liberia.csv
   ```

2. **Modify values**
   ```csv
   baseARPU,arpuGrowthRate,baseChurnRate,churnMonthlyChange,startingSubscribers
   9.5,3.0,4.8,-15,6.5
   ```

3. **Save and upload**

### Method 2: Create New File in Excel

1. **Open Excel**
2. **Create columns**: baseARPU, arpuGrowthRate, baseChurnRate, churnMonthlyChange, startingSubscribers
3. **Add your values** in row 2
4. **Save As** → CSV format
5. **Upload to dashboard**

### Method 3: Copy Template

```bash
# Copy template
cp sample-data-template.csv my-custom-scenario.csv

# Edit
nano my-custom-scenario.csv

# Upload to dashboard
```

---

## 📊 Scenario Comparison Table

| Scenario | ARPU | Growth | Churn | Trend | Use Case |
|----------|------|--------|-------|-------|----------|
| Template | $8.00 | 2.0% | 5.0% | Improving | Default demo |
| Optimistic | $10.00 | 3.5% | 4.0% | Strong | Best case |
| Pessimistic | $6.50 | 0.5% | 7.0% | Weak | Worst case |
| Aggressive | $12.00 | 5.0% | 3.5% | Excellent | High growth |
| Decline | $7.00 | -1.0% | 8.5% | Crisis | Risk planning |
| Orange Liberia | $9.00 | 2.5% | 5.5% | Realistic | Main demo |

---

## 🎭 Demo Scenarios

### Scenario 1: "What If We Succeed?"
**File**: `scenario-optimistic-growth.csv`

**Demo Script:**
1. Upload optimistic scenario
2. Show 60-month projections
3. Ask AI: "What's driving this growth?"
4. Show revenue potential

**Key Message**: "This is achievable with focused execution"

---

### Scenario 2: "What If We Don't Act?"
**File**: `scenario-pessimistic.csv`

**Demo Script:**
1. Upload pessimistic scenario
2. Show declining subscriber base
3. Ask AI: "How can we reverse this trend?"
4. Show impact of inaction

**Key Message**: "We must take action to avoid this"

---

### Scenario 3: "Orange Liberia Reality"
**File**: `scenario-orange-liberia.csv`

**Demo Script:**
1. Upload Orange Liberia scenario
2. Show realistic projections
3. Ask AI: "What levers can we pull to improve?"
4. Demonstrate sensitivity analysis

**Key Message**: "Here's our current trajectory and opportunities"

---

### Scenario 4: "Crisis Management"
**File**: `scenario-market-decline.csv`

**Demo Script:**
1. Upload market decline scenario
2. Show revenue impact
3. Ask AI: "Emergency measures for this situation?"
4. Test intervention strategies

**Key Message**: "We're prepared for adverse scenarios"

---

## 🔄 Quick Scenario Switching

During your demo, you can quickly switch between scenarios:

```
1. Start with Orange Liberia scenario (baseline)
2. Switch to Optimistic (show potential)
3. Switch to Pessimistic (show risks)
4. Back to Orange Liberia (action plan)
```

This demonstrates flexibility and comprehensive planning!

---

## ⚙️ Parameter Guidelines

### ARPU (Average Revenue Per User)
- **Low**: $5-7 (budget market)
- **Medium**: $8-10 (standard)
- **High**: $11-15 (premium)
- **Very High**: $15+ (enterprise/premium)

### ARPU Growth Rate
- **Negative**: < 0% (declining revenue)
- **Flat**: 0-1% (stable)
- **Moderate**: 1-3% (healthy)
- **Strong**: 3-5% (excellent)
- **Aggressive**: > 5% (expansion)

### Base Churn Rate
- **Excellent**: < 3% (world class)
- **Good**: 3-5% (competitive)
- **Average**: 5-7% (acceptable)
- **High**: 7-10% (concern)
- **Critical**: > 10% (crisis)

### Churn Monthly Change (bps)
- **Improving Fast**: -20 to -15 bps
- **Improving**: -15 to -5 bps
- **Stable**: -5 to +5 bps
- **Worsening**: +5 to +15 bps
- **Crisis**: > +15 bps

### Starting Subscribers
- **Small**: 1-3M
- **Medium**: 3-7M
- **Large**: 7-15M
- **Very Large**: > 15M

---

## 💡 Tips for Executive Demos

### 1. Start with Reality
Use `scenario-orange-liberia.csv` to show current state

### 2. Show Upside
Switch to `scenario-optimistic-growth.csv` to show potential

### 3. Highlight Risks
Use `scenario-pessimistic.csv` to demonstrate importance of action

### 4. AI Integration
After each upload, ask AI relevant questions:
- "What's the revenue impact?"
- "What are the key drivers?"
- "How can we improve these metrics?"

### 5. Interactive Exploration
Let executives suggest changes, create custom CSV on the spot

---

## 🐛 Troubleshooting

### "Upload not working"
- Check file format (must be .csv)
- Verify column names match exactly
- Ensure no extra spaces or special characters
- Open file in text editor to verify format

### "Values not updating"
- Refresh the page
- Check browser console for errors
- Verify CSV has valid numbers
- Try sample-data-template.csv to test

### "Strange results"
- Check churn values (should be 1-15%)
- Verify ARPU is reasonable ($2-50)
- Ensure growth rate is percentage (not decimal)
- Check basis points are correct scale

---

## 📝 Custom Scenario Template

Create your own by copying this template:

```csv
baseARPU,arpuGrowthRate,baseChurnRate,churnMonthlyChange,startingSubscribers
[YOUR_ARPU],[YOUR_GROWTH],[YOUR_CHURN],[YOUR_CHANGE],[YOUR_SUBS]
```

**Example custom scenario:**
```csv
baseARPU,arpuGrowthRate,baseChurnRate,churnMonthlyChange,startingSubscribers
8.5,2.8,5.2,-11,5.8
```

---

## 📂 File Locations

All sample CSV files are located in:
```
telco-dashboard/
├── sample-data-template.csv (main template)
├── scenario-optimistic-growth.csv
├── scenario-pessimistic.csv
├── scenario-aggressive-expansion.csv
├── scenario-market-decline.csv
└── scenario-orange-liberia.csv
```

---

## ✅ Pre-Demo Checklist

Before your demo:
- [ ] All 6 CSV files downloaded/available
- [ ] Tested uploading each scenario
- [ ] Verified charts update correctly
- [ ] Prepared talking points for each scenario
- [ ] Created any custom scenarios needed
- [ ] Tested AI questions for each scenario

---

## 🎯 Recommended Demo Flow

1. **Start**: Upload `scenario-orange-liberia.csv`
   - "Here's our current state"

2. **Upside**: Upload `scenario-optimistic-growth.csv`
   - "Here's what's achievable"

3. **Downside**: Upload `scenario-pessimistic.csv`
   - "Here's what we want to avoid"

4. **Strategy**: Back to `scenario-orange-liberia.csv`
   - "Here's our action plan"

5. **AI Demo**: Ask strategic questions
   - Show intelligent decision support

---

**Your sample data files are ready for an impressive executive demo!** 🚀

---

© 2025 Suleiman Shaibu
