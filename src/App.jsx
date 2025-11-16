import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './App.css';

function App() {
  // State for simulation controls - REALISTIC ORANGE LIBERIA VALUES
  const [forecastHorizon, setForecastHorizon] = useState(60);
  const [baseARPU, setBaseARPU] = useState(4.5); // Changed from 8.0
  const [arpuGrowthRate, setArpuGrowthRate] = useState(1.5); // Changed from 2.0
  const [baseChurnRate, setBaseChurnRate] = useState(6.0); // Changed from 5.0
  const [churnMonthlyChange, setChurnMonthlyChange] = useState(-5); // Changed from -10
  const [startingSubscribers, setStartingSubscribers] = useState(1.2); // Changed from 5.0
  
  // State for forecast data
  const [forecastData, setForecastData] = useState([]);
  
  // State for AI chat
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Calculate forecast data
  useEffect(() => {
    calculateForecast();
  }, [forecastHorizon, baseARPU, arpuGrowthRate, baseChurnRate, churnMonthlyChange, startingSubscribers]);

  const calculateForecast = () => {
    const data = [];
    let currentSubscribers = startingSubscribers * 1000000;

    for (let month = 1; month <= forecastHorizon; month++) {
      const arpu = baseARPU * Math.pow(1 + arpuGrowthRate / 100, month - 1);
      const churnRate = Math.max(0.1, baseChurnRate + (month - 1) * (churnMonthlyChange / 100));
      
      if (month > 1) {
        currentSubscribers = currentSubscribers * (1 - data[month - 2].churnRate / 100);
      }
      
      const revenue = currentSubscribers * arpu;

      data.push({
        month,
        arpu: parseFloat(arpu.toFixed(2)),
        churnRate: parseFloat(churnRate.toFixed(2)),
        subscribers: Math.round(currentSubscribers),
        revenue: Math.round(revenue)
      });
    }

    setForecastData(data);
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        
        // Process uploaded data and update forecast
        if (jsonData.length > 0 && jsonData[0].baseARPU !== undefined) {
          setBaseARPU(parseFloat(jsonData[0].baseARPU) || 4.5);
          setArpuGrowthRate(parseFloat(jsonData[0].arpuGrowthRate) || 1.5);
          setBaseChurnRate(parseFloat(jsonData[0].baseChurnRate) || 6.0);
          setChurnMonthlyChange(parseFloat(jsonData[0].churnMonthlyChange) || -5);
          setStartingSubscribers(parseFloat(jsonData[0].startingSubscribers) || 1.2);
          
          alert('Data uploaded successfully! Dashboard updated.');
        } else {
          alert('File uploaded. Using default parameters.');
        }
      } catch (error) {
        alert('Error reading file. Please ensure it\'s a valid Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Download forecast as Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(forecastData.map(d => ({
      Month: d.month,
      'ARPU ($)': d.arpu,
      'Churn Rate (%)': d.churnRate,
      Subscribers: d.subscribers,
      'Revenue ($)': d.revenue
    })));
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Forecast');
    XLSX.writeFile(workbook, 'orange_liberia_forecast.xlsx');
  };

  // Format AI response with paragraph spacing
  const formatAIResponse = (text) => {
    return text.split('\n\n').map((para, idx) => (
      <p key={idx} style={{ marginBottom: '12px', lineHeight: '1.6' }}>{para}</p>
    ));
  };

  // SMART AI CALL with AUTOMATIC FALLBACK
  const callAIWithFallback = async (dashboardContext) => {
    const providers = [
      {
        name: 'Together AI',
        key: import.meta.env.VITE_TOGETHER_API_KEY,
        endpoint: 'https://api.together.xyz/v1/chat/completions',
        model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo'
      },
      {
        name: 'Groq',
        key: import.meta.env.VITE_GROQ_API_KEY,
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        model: 'llama-3.1-70b-versatile'
      },
      {
        name: 'DeepSeek',
        key: import.meta.env.VITE_DEEPSEEK_API_KEY,
        endpoint: 'https://api.deepseek.com/v1/chat/completions',
        model: 'deepseek-chat'
      }
    ];

    let lastError = null;

    for (const provider of providers) {
      if (!provider.key) {
        console.log(`${provider.name}: No API key configured, skipping...`);
        continue;
      }

      try {
        console.log(`Trying ${provider.name}...`);
        
        const response = await fetch(provider.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${provider.key}`
          },
          body: JSON.stringify({
            model: provider.model,
            messages: [
              {
                role: 'system',
                content: 'You are an AI assistant helping Orange Telecom Liberia executives analyze a dashboard for ARPU and Churn forecasting. Orange Liberia operates in the Liberian telecommunications market with approximately 1-1.5 million subscribers. Provide professional, context-aware telco insights specific to the Liberian market and help with what-if analysis. Revenue figures should be in millions of USD, not billions.'
              },
              {
                role: 'user',
                content: dashboardContext
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.choices[0]?.message?.content || 'No response generated.';
          console.log(`✅ Success with ${provider.name}!`);
          return { success: true, response: aiResponse, provider: provider.name };
        } else {
          const errorText = await response.text();
          lastError = `${provider.name} error ${response.status}: ${errorText}`;
          console.log(`❌ ${provider.name} failed:`, lastError);
        }
      } catch (error) {
        lastError = `${provider.name} error: ${error.message}`;
        console.log(`❌ ${provider.name} failed:`, lastError);
      }
    }

    // All providers failed
    return { 
      success: false, 
      error: lastError || 'All AI providers failed. Please check your API keys.' 
    };
  };

  // AI Chat functionality with SMART FALLBACK
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newUserMessage = { role: 'user', content: userMessage };
    setChatMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    setIsLoading(true);

    try {
      // Create context about current dashboard state - WITH REALISTIC VALUES
      const finalMonthData = forecastData[forecastData.length - 1];
      const totalRevenue = forecastData.reduce((sum, d) => sum + d.revenue, 0);
      
      const dashboardContext = `
Current Orange Liberia Dashboard State:
- Market Context: Orange Liberia operates in Liberia with ~1-1.5M subscribers
- Base ARPU: $${baseARPU}
- ARPU Growth Rate: ${arpuGrowthRate}% monthly
- Base Churn Rate: ${baseChurnRate}%
- Churn Monthly Change: ${churnMonthlyChange} bps
- Starting Subscribers: ${startingSubscribers}M
- Forecast Horizon: ${forecastHorizon} months

Latest Forecast Results (Month ${forecastHorizon}):
- Final ARPU: $${finalMonthData?.arpu.toFixed(2)}
- Final Churn Rate: ${finalMonthData?.churnRate.toFixed(2)}%
- Final Subscribers: ${(finalMonthData?.subscribers / 1000000).toFixed(2)}M
- Total ${forecastHorizon}-Month Revenue: $${(totalRevenue / 1000000).toFixed(1)}M (millions, not billions)

IMPORTANT: All revenue figures are in MILLIONS of USD. Orange Liberia's market size means revenues are in the hundreds of millions, not billions.

User Question: ${userMessage}

Provide a clear, professional response specific to Orange Liberia's market context. If discussing what-if scenarios, use realistic assumptions for the Liberian telecom market. Format your response with clear paragraphs.
`;

      // Try all providers with automatic fallback
      const result = await callAIWithFallback(dashboardContext);

      if (result.success) {
        // Check if AI suggested parameter changes
        const parameterChanges = extractParameterChanges(userMessage, result.response);
        if (parameterChanges) {
          applyParameterChanges(parameterChanges);
        }

        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: result.response,
          provider: result.provider 
        }]);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I apologize, but I encountered an error: ${error.message}. Please check your API configuration and internet connection.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract parameter changes from user query
  const extractParameterChanges = (userQuery, aiResponse) => {
    const query = userQuery.toLowerCase();
    const changes = {};

    // ARPU changes
    if (query.includes('arpu') && (query.includes('decline') || query.includes('decrease') || query.includes('reduce'))) {
      const match = query.match(/(\d+)%/);
      if (match) {
        const percentage = parseFloat(match[1]);
        changes.baseARPU = baseARPU * (1 - percentage / 100);
      }
    } else if (query.includes('arpu') && (query.includes('increase') || query.includes('grow'))) {
      const match = query.match(/(\d+)%/);
      if (match) {
        const percentage = parseFloat(match[1]);
        changes.baseARPU = baseARPU * (1 + percentage / 100);
      }
    }

    // Churn changes
    if (query.includes('churn') && query.includes('monthly change')) {
      const match = query.match(/(\d+)%/);
      if (match) {
        changes.churnMonthlyChange = parseFloat(match[1]) * 100;
      }
    } else if (query.includes('churn') && (query.includes('rate') || query.includes('was'))) {
      const match = query.match(/(\d+(?:\.\d+)?)%/);
      if (match) {
        changes.baseChurnRate = parseFloat(match[1]);
      }
    }

    return Object.keys(changes).length > 0 ? changes : null;
  };

  // Apply parameter changes
  const applyParameterChanges = (changes) => {
    if (changes.baseARPU !== undefined) setBaseARPU(parseFloat(changes.baseARPU.toFixed(2)));
    if (changes.baseChurnRate !== undefined) setBaseChurnRate(parseFloat(changes.baseChurnRate.toFixed(2)));
    if (changes.churnMonthlyChange !== undefined) setChurnMonthlyChange(parseFloat(changes.churnMonthlyChange.toFixed(0)));
  };

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Calculate summary metrics
  const finalMonth = forecastData[forecastData.length - 1];
  const totalRevenue = forecastData.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <img 
          src="https://images.groovetech.io/omFPWbC7va1G9-ZXYyeVhqk5iE9zXYsUQgXRP4SUXSo/rs:fit:0:0:0/g:no:0:0/c:0:0/aHR0cHM6Ly9hc3NldHMuZ3Jvb3ZlYXBwcy5jb20vaW1hZ2VzLzVmNWQ1NDkzODA2NmVmMDA2OTQwMmRlMy8xNzYzMjI1OTE1X1N0cmF0ZWd5SG91c2VMb2dvLmpwZw.webp"
          alt="Strategy House"
          className="logo-left"
        />
        <h1 className="main-title">Orange Liberia Executive Dashboard: ARPU & Churn Forecasting</h1>
        <img 
          src="https://images.groovetech.io/4_o_OdYYdW0sxTXIcQdDZxk_3-IjdZa6edWxA1nO8uM/rs:fit:0:0:0/g:no:0:0/c:0:0/aHR0cHM6Ly9hc3NldHMuZ3Jvb3ZlYXBwcy5jb20vaW1hZ2VzLzVmNWQ1NDkzODA2NmVmMDA2OTQwMmRlMy8xNzYzMjI1ODkxX0NvcnJlY3RPcmFuZ2VMb2dvLmpwZw.webp"
          alt="Orange"
          className="logo-right"
        />
      </header>

      {/* Introduction */}
      <div className="intro">
        <p>Welcome to the <strong>Orange Liberia AI-Driven Executive Dashboard</strong>.</p>
        <p>This interactive tool is designed for Orange Liberia executives to:</p>
        <ul>
          <li>Understand the <strong>impact of ARPU and Churn on revenue</strong></li>
          <li>Simulate <strong>different business scenarios</strong> for the Liberian market</li>
          <li>Download results for <strong>boardroom reporting</strong></li>
          <li><strong>Ask AI questions</strong> for instant insights and what-if analysis</li>
        </ul>
        <p>💡 This demo shows how <strong>AI leadership</strong> enables faster, data-driven decision-making for telco executives.</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Sidebar - Controls */}
        <aside className="sidebar">
          <h2>⚙️ Simulation Controls</h2>
          
          <div className="control-group">
            <label>Forecast Horizon (Months): {forecastHorizon}</label>
            <input
              type="range"
              min="6"
              max="60"
              value={forecastHorizon}
              onChange={(e) => setForecastHorizon(parseInt(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Base ARPU ($)</label>
            <input
              type="number"
              min="2"
              max="50"
              step="0.5"
              value={baseARPU}
              onChange={(e) => setBaseARPU(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>ARPU Monthly Growth Rate (%): {arpuGrowthRate}</label>
            <input
              type="range"
              min="-5"
              max="10"
              step="0.1"
              value={arpuGrowthRate}
              onChange={(e) => setArpuGrowthRate(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Base Monthly Churn Rate (%): {baseChurnRate}</label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={baseChurnRate}
              onChange={(e) => setBaseChurnRate(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Churn Monthly Change (bps): {churnMonthlyChange}</label>
            <input
              type="range"
              min="-50"
              max="50"
              value={churnMonthlyChange}
              onChange={(e) => setChurnMonthlyChange(parseInt(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Starting Subscribers (Millions)</label>
            <input
              type="number"
              min="0.1"
              max="50"
              step="0.1"
              value={startingSubscribers}
              onChange={(e) => setStartingSubscribers(parseFloat(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label>Upload External Data</label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>

          <button onClick={downloadExcel} className="download-btn">
            📥 Download Forecast (Excel)
          </button>
        </aside>

        {/* Right Content Area */}
        <div className="content">
          {/* Visualizations */}
          <section className="visualizations">
            <h2>📈 Forecast Visualizations</h2>
            
            <div className="charts-grid">
              <div className="chart-container">
                <h3>ARPU Forecast</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="arpu" stroke="#FF7900" strokeWidth={2} dot={{ fill: '#FF7900' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>Churn Rate Forecast</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="churnRate" stroke="#000000" strokeWidth={2} dot={{ fill: '#000000' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>Revenue Forecast (USD)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#FF7900" strokeWidth={2} dot={{ fill: '#FF7900' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* AI Chat Section */}
          <section className="ai-chat-section">
            <h2>🤖 AI Assistant - Ask Questions & Run What-If Scenarios</h2>
            
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.length === 0 && (
                  <div className="chat-welcome">
                    <p><strong>Welcome! I'm your Orange Liberia AI Assistant.</strong></p>
                    <p>Try asking questions like:</p>
                    <ul>
                      <li>"What if ARPU declined by 15%?"</li>
                      <li>"What would happen if we reduced churn by 2%?"</li>
                      <li>"How can we improve subscriber retention in Liberia?"</li>
                      <li>"What's the revenue impact of increasing ARPU to $5?"</li>
                      <li>"What if we gained 300,000 new subscribers?"</li>
                    </ul>
                  </div>
                )}
                
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.role}`}>
                    <strong>
                      {msg.role === 'user' ? 'You' : `AI Assistant${msg.provider ? ` (${msg.provider})` : ''}`}:
                    </strong>
                    <div style={{ marginTop: '8px' }}>
                      {formatAIResponse(msg.content)}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="chat-message assistant">
                    <strong>AI Assistant:</strong>
                    <p>Analyzing your question...</p>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>
              
              <div className="chat-input-container">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question about the forecast..."
                  className="chat-input"
                />
                <button onClick={handleSendMessage} disabled={isLoading} className="send-btn">
                  Send
                </button>
              </div>
            </div>
          </section>

          {/* Executive Insights */}
          <section className="insights">
            <h2>🔎 Executive Insights</h2>
            {finalMonth && (
              <div className="insights-content">
                <p><strong>Starting Subscribers:</strong> {startingSubscribers.toFixed(1)}M</p>
                <p><strong>Final Subscribers after {forecastHorizon} months:</strong> {(finalMonth.subscribers / 1000000).toFixed(2)}M</p>
                <p><strong>Final ARPU:</strong> ${finalMonth.arpu.toFixed(2)}</p>
                <p><strong>Final Churn Rate:</strong> {finalMonth.churnRate.toFixed(2)}%</p>
                <p><strong>Total {forecastHorizon}-Month Revenue:</strong> ${(totalRevenue / 1000000).toFixed(1)}M (millions USD)</p>
                <p><strong>Average Monthly Revenue:</strong> ${(totalRevenue / forecastHorizon / 1000000).toFixed(2)}M</p>
                
                <p className="observation">
                  💡 <em>Orange Liberia Insight:</em> Even small changes in <strong>ARPU growth</strong> or <strong>Churn rate</strong> have 
                  a significant impact on revenue for Orange Liberia's market. This dashboard demonstrates how executives can test different scenarios and adjust 
                  <strong> pricing, promotions, and retention strategies</strong> to sustain growth in the competitive Liberian telecommunications market.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Suleiman Shaibu | Orange Telecom Liberia Executive Dashboard</p>
      </footer>
    </div>
  );
}

export default App;