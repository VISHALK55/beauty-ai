import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; 

const BODHGAYA_COMPETITORS = [
  {
    name: "Bodhi Glow Salon",
    services: "Haircuts, Basic Makeup, Waxing",
    reviews: "Average service, wait times can be long. Makeup was a bit cakey but overall okay."
  },
  {
    name: "Gaya Glamour Makeovers",
    services: "Bridal Makeup, Facials, Hair Spa",
    reviews: "Very expensive for what they offer. The staff is sometimes rude. Bridal makeup was delayed by 30 mins."
  },
  {
    name: "Temple Beauty Hub",
    services: "Threading, Manicure, Pedicure, Simple Hairdo",
    reviews: "Hygiene is a big issue here. Towels seemed unwashed. Cheap but not worth the risk."
  }
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CompetitorIntelligence = () => {
  const [competitorName, setCompetitorName] = useState('');
  const [servicesOffered, setServicesOffered] = useState('');
  const [rawReviews, setRawReviews] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  
  const [savedReports, setSavedReports] = useState([]);
  const [selectedReportSk, setSelectedReportSk] = useState(null);
  const [isGeneratingAds, setIsGeneratingAds] = useState(false);
  const [attackAds, setAttackAds] = useState(null);
  
  const [isAutoPilotOn, setIsAutoPilotOn] = useState(false);
  const [autoPilotStatus, setAutoPilotStatus] = useState('');

  // Fetch saved intel on load
  const fetchSavedIntel = async () => {
    try {
      const response = await fetch('https://0vhta6exz6.execute-api.us-east-1.amazonaws.com/api/v1/ai/competitors', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSavedReports(data);
        return data;
      }
    } catch (err) {
      console.error("Failed to fetch saved intel", err);
    }
    return [];
  };

  useEffect(() => {
    fetchSavedIntel();
  }, []);

  const runAnalysisApi = async (name, services, reviews) => {
    const response = await fetch('https://0vhta6exz6.execute-api.us-east-1.amazonaws.com/api/v1/ai/analyze-competitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        competitorName: name,
        servicesOffered: services,
        rawReviews: reviews
      })
    });
    if (!response.ok) throw new Error('Analysis failed');
    return response.json();
  };

  const runAdsApi = async (sk) => {
    const response = await fetch('https://0vhta6exz6.execute-api.us-east-1.amazonaws.com/api/v1/ai/generate-attack-ads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ sk })
    });
    if (!response.ok) throw new Error('Ads failed');
    return response.json();
  };

  const startBodhgayaDomination = async () => {
    setIsAutoPilotOn(true);
    setError(null);
    
    for (let i = 0; i < BODHGAYA_COMPETITORS.length; i++) {
      if (!isAutoPilotOn) { // Check if user turned it off
        break; 
      }
      
      const comp = BODHGAYA_COMPETITORS[i];
      setAutoPilotStatus(`[Auto-Pilot] Targeting ${comp.name}...`);
      
      setCompetitorName(comp.name);
      setServicesOffered(comp.services);
      setRawReviews(comp.reviews);
      setReport(null);
      setAttackAds(null);
      setIsLoading(true);
      
      try {
        // Step 1: Analyze
        setAutoPilotStatus(`[Auto-Pilot] Analyzing weaknesses of ${comp.name}...`);
        const analysisData = await runAnalysisApi(comp.name, comp.services, comp.reviews);
        setReport(analysisData.analysisReport);
        
        // Refresh sidebar to get the new sk
        const updatedReports = await fetchSavedIntel();
        const latestReport = updatedReports.find(r => r.competitorName === comp.name);
        
        if (latestReport) {
          setSelectedReportSk(latestReport.sk);
          
          // Step 2: Generate Ads
          setIsLoading(false);
          setIsGeneratingAds(true);
          setAutoPilotStatus(`[Auto-Pilot] Generating Attack Ads for ${comp.name}...`);
          
          const adsData = await runAdsApi(latestReport.sk);
          setAttackAds(adsData.ads);
        }
        
      } catch (err) {
        setError(`Auto-Pilot Error on ${comp.name}: ${err.message}`);
      } finally {
        setIsLoading(false);
        setIsGeneratingAds(false);
      }
      
      setAutoPilotStatus(`[Auto-Pilot] Completed takedown of ${comp.name}. Waiting 5 seconds...`);
      await delay(5000); // Wait 5 seconds so user can see it
    }
    
    setAutoPilotStatus(`[Auto-Pilot] Bodhgaya domination complete! All targets neutralized.`);
    setIsAutoPilotOn(false);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setReport(null);
    setAttackAds(null);

    try {
      const data = await runAnalysisApi(competitorName, servicesOffered, rawReviews);
      setReport(data.analysisReport);
      fetchSavedIntel();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAds = async (sk) => {
    setIsGeneratingAds(true);
    setAttackAds(null);
    setSelectedReportSk(sk);
    try {
      const data = await runAdsApi(sk);
      setAttackAds(data.ads);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAds(false);
    }
  };

  const selectSavedReport = (saved) => {
    setReport(saved.generatedReport);
    setCompetitorName(saved.competitorName);
    setServicesOffered(saved.servicesOffered);
    setRawReviews(saved.rawReviews);
    setAttackAds(null);
    setSelectedReportSk(saved.sk);
  };

  return (
    <div className="georank-container">
      <div className="georank-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="georank-title">Competitor Intel 🕵️</h1>
          <p className="georank-subtitle">AI-Powered Market Takedown Strategy (Bodhgaya Region)</p>
        </div>
        <div>
          <button 
            onClick={isAutoPilotOn ? () => setIsAutoPilotOn(false) : startBodhgayaDomination}
            className="generate-btn"
            style={{
              padding: '1rem 2rem',
              background: isAutoPilotOn ? '#ef4444' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem',
              boxShadow: isAutoPilotOn ? '0 0 20px rgba(239, 68, 68, 0.4)' : '0 0 20px rgba(245, 158, 11, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            {isAutoPilotOn ? '🛑 STOP AUTO-PILOT' : '🚀 START BODHGAYA DOMINATION LOOP'}
          </button>
        </div>
      </div>

      {autoPilotStatus && (
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', color: '#fcd34d', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {autoPilotStatus}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Saved Intel Sidebar */}
        <div className="georank-card" style={{ padding: '1.5rem' }}>
          <h2 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Saved Target Intel</h2>
          {savedReports.length === 0 ? (
            <p style={{ color: '#71717a', fontSize: '0.9rem' }}>No targets analyzed yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {savedReports.map((saved, idx) => (
                <div 
                  key={idx} 
                  onClick={() => selectSavedReport(saved)}
                  style={{ 
                    padding: '1rem', 
                    background: selectedReportSk === saved.sk ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0,0,0,0.4)', 
                    border: selectedReportSk === saved.sk ? '1px solid #8b5cf6' : '1px solid #3f3f46', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>{saved.competitorName}</h3>
                  <p style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>{new Date(saved.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Interface */}
        <div className="georank-grid" style={{ marginTop: 0, gridTemplateColumns: '1fr 1fr' }}>
          <div className="georank-card">
            <h2 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.2rem' }}>New Target Analysis</h2>
            <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '0.5rem' }}>Competitor Name</label>
                <input 
                  type="text" 
                  value={competitorName}
                  onChange={(e) => setCompetitorName(e.target.value)}
                  placeholder="e.g. Nature's Salon"
                  required
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.5)', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '0.5rem' }}>Services Offered</label>
                <input 
                  type="text" 
                  value={servicesOffered}
                  onChange={(e) => setServicesOffered(e.target.value)}
                  placeholder="e.g. Basic Haircuts, Threading, Bridal"
                  required
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.5)', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#a1a1aa', marginBottom: '0.5rem' }}>Raw Google Reviews (Paste Text)</label>
                <textarea 
                  value={rawReviews}
                  onChange={(e) => setRawReviews(e.target.value)}
                  placeholder="Paste negative or mixed reviews here..."
                  required
                  rows="6"
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.5)', border: '1px solid #3f3f46', borderRadius: '6px', color: '#fff', fontFamily: 'monospace' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isLoading || isAutoPilotOn}
                className="generate-btn"
                style={{ width: '100%', padding: '1rem', background: (isLoading || isAutoPilotOn) ? '#3f3f46' : '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: (isLoading || isAutoPilotOn) ? 'not-allowed' : 'pointer' }}
              >
                {isLoading ? 'ANALYZING TARGET...' : 'GENERATE ATTACK PLAN'}
              </button>
            </form>
          </div>

          <div className="georank-card result-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>AI Tactical Report</h2>
              {report && selectedReportSk && (
                <button 
                  onClick={() => handleGenerateAds(selectedReportSk)}
                  disabled={isGeneratingAds || isAutoPilotOn}
                  style={{ padding: '0.5rem 1rem', background: (isGeneratingAds || isAutoPilotOn) ? '#3f3f46' : '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: (isGeneratingAds || isAutoPilotOn) ? 'not-allowed' : 'pointer' }}
                >
                  {isGeneratingAds ? 'GENERATING ADS...' : 'GENERATE ATTACK ADS'}
                </button>
              )}
            </div>
            
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '1.5rem', overflowY: 'auto', border: '1px solid #3f3f46' }}>
              {!isLoading && !report && !error && (
                <div style={{ color: '#71717a', textAlign: 'center', marginTop: '4rem' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🎯</span>
                  Select a target or generate a new report.
                </div>
              )}

              {isLoading && (
                <div style={{ color: '#a1a1aa', textAlign: 'center', marginTop: '4rem' }}>
                  Processing competitor data through LLM...
                </div>
              )}

              {error && (
                <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '6px' }}>
                  {error}
                </div>
              )}

              {attackAds && (
                <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '6px' }}>
                  <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>Generated Attack Ads</h3>
                  <div style={{ color: '#e4e4e7', lineHeight: '1.6' }} className="markdown-body">
                    <ReactMarkdown>{attackAds}</ReactMarkdown>
                  </div>
                </div>
              )}

              {report && (
                <div style={{ color: '#e4e4e7', lineHeight: '1.6' }} className="markdown-body">
                  <ReactMarkdown>{report}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorIntelligence;
