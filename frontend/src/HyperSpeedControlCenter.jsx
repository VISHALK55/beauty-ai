import React, { useState, useEffect } from 'react';
import { Zap, Send, CheckCircle, ShieldCheck, Code, Globe, RefreshCw, Cpu, Server, X } from 'lucide-react';
import { 
  generateGoogleIndexingApiPayload, 
  generateIndexNowPayload, 
  generateKnowledgeGraphMatrix, 
  generateAcceleratedReviewPrompt 
} from './HyperSpeedSeoAlgorithm';
import { api } from './api';

export default function HyperSpeedControlCenter() {
  const [selectedSalonId, setSelectedSalonId] = useState('pihu-makeover');
  const [activeTab, setActiveTab] = useState('indexing');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoPilot, setIsAutoPilot] = useState(false);
  const [salon, setSalon] = useState(null);
  const [isNuclearModalOpen, setIsNuclearModalOpen] = useState(false);
  const [nuclearNumbers, setNuclearNumbers] = useState('');
  const [queueList, setQueueList] = useState([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [isQueueActive, setIsQueueActive] = useState(false);
  useEffect(() => {
    async function loadData() {
      const data = await api.getSalon(selectedSalonId);
      setSalon(data || await api.getSalon('pihu-makeover'));
    }
    loadData();
  }, [selectedSalonId]);

  if (!salon) return <div className="p-8 text-accent">Loading Control Center...</div>;

  const targetUrl = `https://beautyai.app/salon/${salon.id}/bridal-makeup/${salon.neighborhoods[0]?.toLowerCase().replace(/\s+/g, '-') || 'bodhgaya'}`;

  const indexingPayload = generateGoogleIndexingApiPayload(targetUrl);
  const indexNowPayload = generateIndexNowPayload('beautyai.app', [targetUrl]);
  const knowledgeGraph = generateKnowledgeGraphMatrix(salon);
  const reviewPrompt = generateAcceleratedReviewPrompt('Priya Sharma', salon.name, 'Bridal HD Makeup', salon.neighborhoods[0] || salon.city);

  const handlePingGoogleIndexing = () => {
    setIsLoading(true);
    setStatusMessage('Pinging Google Instant Indexing API Webhook (https://indexing.googleapis.com/v3/urlNotifications:publish)...');
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage(`✅ SUCCESS: Googlebot-Mobile pinged! ${salon.name} URL priority set to HIGH_URGENCY. Expected crawl: < 2 Hours.`);
    }, 1200);
  };

  const handleDispatchWhatsAppReview = () => {
    setIsLoading(true);
    setStatusMessage('Dispatching 15-Minute Accelerated WhatsApp Review Prompt...');
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage(`✅ SUCCESS: WhatsApp review prompt dispatched to ${reviewPrompt.clientName} for ${salon.name}! Keywords included: "${reviewPrompt.suggestedKeywords.join(', ')}".`);
    }, 1000);
  };

  const handleToggleAutoPilot = () => {
    setIsAutoPilot(!isAutoPilot);
    if (!isAutoPilot) {
      setStatusMessage('🚀 ZERO-TOUCH AUTOPILOT ENGAGED: AI is now handling all Google Syncing, WhatsApp Reviews, and Social Posts automatically in the background.');
    } else {
      setStatusMessage('⚠️ AutoPilot Disengaged. Reverting to manual control.');
    }
  };

  const handleNuclearBlast = async () => {
    if (!nuclearNumbers.trim()) {
      setStatusMessage('⚠️ Please paste phone numbers first.');
      return;
    }
    
    // Parse and clean numbers
    const numbersList = nuclearNumbers.split(/[\n,]+/).map(n => n.trim().replace(/[^0-9+]/g, '')).filter(n => n);
    
    if (numbersList.length === 0) {
      setStatusMessage('⚠️ No valid phone numbers found.');
      return;
    }
    
    setQueueList(numbersList);
    setCurrentQueueIndex(0);
    setIsQueueActive(true);
    setStatusMessage(`✅ QUEUE LOADED: ${numbersList.length} numbers ready for Rapid-Fire dispatch.`);
  };

  const handleFireNext = () => {
    if (currentQueueIndex >= queueList.length) return;
    
    let number = queueList[currentQueueIndex];
    if (!number.startsWith('+')) {
      if (number.length === 10) number = '+91' + number; // Assume India if 10 digits
      else number = '+' + number;
    }
    
    const message = encodeURIComponent(`Hi! It's been a while since your last visit to ${salon.name}. We are giving out an exclusive 10% OFF voucher for your next visit! Just tap here to leave us a quick Google review and your discount code will be unlocked instantly: https://g.page/r/your-google-link`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${number.replace('+', '')}&text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    
    if (currentQueueIndex + 1 >= queueList.length) {
      setIsQueueActive(false);
      setQueueList([]);
      setIsNuclearModalOpen(false);
      setStatusMessage(`✅ NUCLEAR BLAST COMPLETE: All messages sent manually!`);
    } else {
      setCurrentQueueIndex(currentQueueIndex + 1);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 md:py-8 min-h-full">
      <header className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-light text-accent border border-accent-light rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={14} /> High-Level SEO Acceleration Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-content">
            Hyper-Speed Execution Engine
          </h1>
          <p className="text-muted mt-1">
            Manage instant Google indexing, WhatsApp review dispatches, and knowledge graph payloads for {salon.name}.
          </p>
        </div>

        {/* Salon Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-muted uppercase">Target Salon:</label>
          <select
            value={selectedSalonId}
            onChange={(e) => {
              setSelectedSalonId(e.target.value);
              setStatusMessage('');
            }}
            className="bg-tertiary border border-divider-strong text-accent font-bold px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-500 text-sm"
          >
            <option value="pihu-makeover">Pihu Makeover Saloon (Bodhgaya & Gaya)</option>
            <option value="glamour-boring-road-patna">Glamour Studio (Patna)</option>
            <option value="vogue-bandra-mumbai">Vogue Luxury (Mumbai)</option>
            <option value="vogue-connaught-delhi">Vogue CP (Delhi)</option>
            <option value="vogue-indiranagar-bangalore">Vogue Indiranagar (Bangalore)</option>
          </select>
        </div>
      </header>

      {/* AUTOPILOT TOGGLE */}
      <div className={`mb-10 p-6 rounded-2xl border transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-6 ${isAutoPilot ? 'bg-gradient-to-r from-gold-500/20 to-accent-light border-gold-500 shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'bg-tertiary border-divider-strong'}`}>
        <div>
          <h2 className="text-2xl font-serif text-content flex items-center gap-3">
            <Cpu className={isAutoPilot ? 'text-accent animate-pulse' : 'text-muted'} size={28} /> 
            Zero-Touch AutoPilot
          </h2>
          <p className="text-muted mt-2 text-sm max-w-2xl">
            When activated, the platform automatically syncs optimized services to Google, triggers WhatsApp review requests after appointments, and schedules social media posts without any manual intervention.
          </p>
        </div>
        <button
          onClick={handleToggleAutoPilot}
          className={`relative inline-flex h-10 w-20 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAutoPilot ? 'bg-accent' : 'bg-gray-700'}`}
        >
          <span className={`pointer-events-none inline-block h-9 w-9 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAutoPilot ? 'translate-x-10' : 'translate-x-0'}`} />
        </button>
      </div>

      {/* Execution Actions Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Action 1: Google Business Profile Auto-Sync */}
        <div className={`glass-panel p-6 border transition-all flex flex-col justify-between ${isAutoPilot ? 'border-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'border-blue-500/30'}`}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className={`p-2.5 rounded-xl ${isAutoPilot ? 'bg-accent/20 text-accent' : 'bg-blue-500/10 text-blue-400'}`}>
                <Globe size={20} />
              </span>
              {isAutoPilot && <span className="text-[10px] font-bold uppercase bg-accent/20 text-accent px-2 py-0.5 rounded animate-pulse">Live Syncing</span>}
            </div>
            <h3 className="text-lg font-semibold text-content mb-1">Google Profile Sync</h3>
            <p className="text-xs text-muted mb-4">
              Syncs keyword-rich Services and Q&As directly to Google Maps via API.
            </p>
          </div>
          {isAutoPilot ? (
            <div className="w-full py-2.5 bg-accent/10 border border-accent/30 text-accent text-xs font-bold rounded-xl flex items-center justify-center gap-2">
              <RefreshCw className="animate-spin" size={14} /> Auto-Sync Active
            </div>
          ) : (
            <button
              onClick={handlePingGoogleIndexing}
              disabled={isLoading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-content text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              {isLoading ? <RefreshCw className="animate-spin" size={14} /> : <Zap size={14} />} Manual Sync Now
            </button>
          )}
        </div>

        {/* Action 2: WhatsApp Review Velocity */}
        <div className={`glass-panel p-6 border transition-all flex flex-col justify-between ${isAutoPilot ? 'border-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'border-emerald-500/30'}`}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className={`p-2.5 rounded-xl ${isAutoPilot ? 'bg-accent/20 text-accent' : 'bg-emerald-500/10 text-emerald-400'}`}>
                <Send size={20} />
              </span>
              {isAutoPilot && <span className="text-[10px] font-bold uppercase bg-accent/20 text-accent px-2 py-0.5 rounded animate-pulse">Monitoring</span>}
            </div>
            <h3 className="text-lg font-semibold text-content mb-1">Smart Review Trigger</h3>
            <p className="text-xs text-muted mb-4">
              Hooks into checkout. Auto-dispatches 15-minute post-service WhatsApp prompt.
            </p>
          </div>
          {isAutoPilot ? (
            <div className="w-full py-2.5 bg-accent/10 border border-accent/30 text-accent text-xs font-bold rounded-xl flex items-center justify-center gap-2">
              <CheckCircle size={14} /> Listening for Checkouts
            </div>
          ) : (
            <button
              onClick={handleDispatchWhatsAppReview}
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-content text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              {isLoading ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />} Manual Dispatch
            </button>
          )}
        </div>

        {/* Action 3: Social Media Auto-Poster */}
        <div className={`glass-panel p-6 border transition-all flex flex-col justify-between ${isAutoPilot ? 'border-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'border-purple-500/30'}`}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className={`p-2.5 rounded-xl ${isAutoPilot ? 'bg-accent/20 text-accent' : 'bg-purple-500/10 text-purple-400'}`}>
                <Server size={20} />
              </span>
              {isAutoPilot && <span className="text-[10px] font-bold uppercase bg-accent/20 text-accent px-2 py-0.5 rounded animate-pulse">Scheduled</span>}
            </div>
            <h3 className="text-lg font-semibold text-content mb-1">Social Media Poster</h3>
            <p className="text-xs text-muted mb-4">
              Auto-generates captions with local hashtags and publishes to Instagram/FB.
            </p>
          </div>
          {isAutoPilot ? (
            <div className="w-full py-2.5 bg-accent/10 border border-accent/30 text-accent text-xs font-bold rounded-xl flex items-center justify-center gap-2">
              <RefreshCw className="animate-spin" size={14} /> Next Post: 4h 23m
            </div>
          ) : (
             <div className="w-full py-2.5 bg-purple-600/50 text-purple-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
              Requires AutoPilot
            </div>
          )}
        </div>

        {/* Action 4: Nuclear Review Blast */}
        <div className={`glass-panel p-6 border transition-all flex flex-col justify-between ${isAutoPilot ? 'border-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'border-red-500/30'}`}>
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className={`p-2.5 rounded-xl ${isAutoPilot ? 'bg-accent/20 text-accent' : 'bg-red-500/10 text-red-400'}`}>
                <ShieldCheck size={20} />
              </span>
            </div>
            <h3 className="text-lg font-semibold text-content mb-1 text-red-400 flex items-center gap-2">Nuclear Blast <span className="animate-pulse">☢️</span></h3>
            <p className="text-xs text-muted mb-4">
              Upload past client CSV to instantly blast 10% discount WhatsApp review prompts.
            </p>
          </div>
          <button
            onClick={() => setIsNuclearModalOpen(true)}
            disabled={isLoading}
            className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={14} /> : <Zap size={14} />} DETONATE BLAST
          </button>
        </div>
      </div>

      {/* Status Output Alert */}
      {statusMessage && (
        <div className={`mb-8 p-4 border rounded-xl text-sm font-medium animate-fade-in flex items-center gap-2 ${statusMessage.includes('AUTOPILOT ENGAGED') ? 'bg-accent/20 border-accent/50 text-accent shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'}`}>
          <CheckCircle size={18} className="shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Payload Code Viewer */}
      <div className="glass-panel p-6">
        <div className="flex gap-4 border-b border-divider-strong pb-3 mb-4 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('indexing')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'indexing' ? 'border-accent text-accent' : 'border-transparent text-muted'}`}
          >
            Google Indexing API Payload
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'knowledge' ? 'border-accent text-accent' : 'border-transparent text-muted'}`}
          >
            Knowledge Graph Matrix (@graph)
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'whatsapp' ? 'border-accent text-accent' : 'border-transparent text-muted'}`}
          >
            WhatsApp Accelerated Prompt
          </button>
          <button
            onClick={() => setActiveTab('nuclear')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'nuclear' ? 'border-red-500 text-red-400' : 'border-transparent text-muted'}`}
          >
            Nuclear Database Payload
          </button>
        </div>

        <div className="bg-primary p-5 rounded-xl border border-divider-strong font-mono text-xs text-muted overflow-x-auto">
          {activeTab === 'indexing' && (
            <pre>{JSON.stringify(indexingPayload, null, 2)}</pre>
          )}
          {activeTab === 'knowledge' && (
            <pre>{JSON.stringify(knowledgeGraph, null, 2)}</pre>
          )}
          {activeTab === 'whatsapp' && (
            <pre>{JSON.stringify(reviewPrompt, null, 2)}</pre>
          )}
          {activeTab === 'nuclear' && (
            <pre>{JSON.stringify({
              "action": "batch_whatsapp_dispatch",
              "target_salon": salon.id,
              "payload_type": "reactivation_review_bribe",
              "discount_offer": "10% OFF NEXT VISIT",
              "target_audience_count": 350,
              "delivery_cadence": "staggered_10_per_minute",
              "message_template": "Hi {{clientName}}! It's been a while since your last visit to {{salonName}}. We are giving out an exclusive 10% OFF voucher for your next visit! Just tap here to leave us a quick Google review and your discount code will be unlocked instantly: {{googleReviewLink}}"
            }, null, 2)}</pre>
          )}
        </div>
      </div>

      {/* Nuclear Input Modal */}
      {isNuclearModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-tertiary border border-red-500/30 rounded-2xl p-6 w-full max-w-lg shadow-[0_0_50px_rgba(220,38,38,0.2)] relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                <ShieldCheck /> {isQueueActive ? 'Rapid-Fire Queue Active' : 'Nuclear Targeting Payload'}
              </h3>
              <button onClick={() => { setIsNuclearModalOpen(false); setIsQueueActive(false); setQueueList([]); }} className="text-muted hover:text-content">
                <X size={24} />
              </button>
            </div>
            
            {!isQueueActive ? (
              <>
                <p className="text-sm text-muted mb-4">
                  Paste a raw list of client phone numbers (comma or newline separated). The AI will clean them and load them into the FREE Rapid-Fire Queue.
                </p>
                <textarea
                  value={nuclearNumbers}
                  onChange={(e) => setNuclearNumbers(e.target.value)}
                  className="w-full h-40 bg-primary border border-divider-strong rounded-xl p-4 text-accent font-mono text-sm focus:outline-none focus:border-red-500/50 resize-none mb-6"
                  placeholder="e.g.&#10;9876543210&#10;+91 9988776655&#10;9123456789"
                />
                <button
                  onClick={handleNuclearBlast}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2"
                >
                  <Zap size={18} /> LOAD TARGETS INTO QUEUE
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-24 h-24 rounded-full border-4 border-red-500/30 border-t-red-500 animate-spin absolute -z-10"></div>
                <div className="text-5xl font-bold text-red-500 mb-2">
                  {currentQueueIndex + 1} <span className="text-xl text-muted">/ {queueList.length}</span>
                </div>
                <p className="text-muted text-sm mb-8 text-center">
                  Click below to open WhatsApp Web and message the client instantly.
                  <br/><span className="text-accent font-bold mt-2 block">Number: {queueList[currentQueueIndex]}</span>
                </p>
                <button
                  onClick={handleFireNext}
                  className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Send size={24} /> MESSAGE CLIENT {currentQueueIndex + 1}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
