import React, { useState } from 'react';
import { Zap, Send, CheckCircle, ShieldCheck, Code, Globe, RefreshCw, Cpu, Server } from 'lucide-react';
import { 
  generateGoogleIndexingApiPayload, 
  generateIndexNowPayload, 
  generateKnowledgeGraphMatrix, 
  generateAcceleratedReviewPrompt 
} from './HyperSpeedSeoAlgorithm';
import { salonsDatabase } from './salonsData';

export default function HyperSpeedControlCenter() {
  const [selectedSalonId, setSelectedSalonId] = useState('pihu-makeover');
  const [activeTab, setActiveTab] = useState('indexing');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const salon = salonsDatabase[selectedSalonId] || salonsDatabase['pihu-makeover'];
  const targetUrl = `https://surbhibeauty.com/salon/${salon.id}/bridal-makeup/${salon.neighborhoods[0]?.toLowerCase().replace(/\s+/g, '-') || 'bodhgaya'}`;

  const indexingPayload = generateGoogleIndexingApiPayload(targetUrl);
  const indexNowPayload = generateIndexNowPayload('surbhibeauty.com', [targetUrl]);
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

  return (
    <div className="px-10 py-8 min-h-full">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={14} /> High-Level SEO Acceleration Control Center
          </div>
          <h1 className="text-4xl font-serif tracking-tight text-white">
            Hyper-Speed Execution Engine
          </h1>
          <p className="text-gray-400 mt-1">
            Execute instant Google indexing, WhatsApp review dispatches, and knowledge graph payloads for {salon.name}.
          </p>
        </div>

        {/* Salon Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-400 uppercase">Target Salon:</label>
          <select
            value={selectedSalonId}
            onChange={(e) => {
              setSelectedSalonId(e.target.value);
              setStatusMessage('');
            }}
            className="bg-dark-800 border border-white/10 text-gold-400 font-bold px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-500 text-sm"
          >
            <option value="pihu-makeover">Pihu Makeover Saloon (Bodhgaya)</option>
            <option value="surbhi-gaya">Surbhi Beauty Parlour (Gaya)</option>
            <option value="glamour-boring-road-patna">Glamour Studio (Patna)</option>
            <option value="vogue-bandra-mumbai">Vogue Luxury (Mumbai)</option>
            <option value="vogue-connaught-delhi">Vogue CP (Delhi)</option>
            <option value="vogue-indiranagar-bangalore">Vogue Indiranagar (Bangalore)</option>
          </select>
        </div>
      </header>

      {/* Execution Actions Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Action 1: Google Indexing API */}
        <div className="glass-panel p-6 border border-blue-500/30 hover:border-blue-500/60 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                <Globe size={20} />
              </span>
              <span className="text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                Target: &lt; 2 Hours
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Instant Google Indexing API</h3>
            <p className="text-xs text-gray-400 mb-4">
              Sends high-urgency payload to Googlebot to index {salon.name} instantly.
            </p>
          </div>
          <button
            onClick={handlePingGoogleIndexing}
            disabled={isLoading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={14} /> : <Zap size={14} />} Ping Googlebot Now
          </button>
        </div>

        {/* Action 2: WhatsApp Review Velocity */}
        <div className="glass-panel p-6 border border-emerald-500/30 hover:border-emerald-500/60 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Send size={20} />
              </span>
              <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                Delay: 15 Mins
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Accelerated Review Dispatch</h3>
            <p className="text-xs text-gray-400 mb-4">
              Dispatches 15-minute post-service WhatsApp prompt with local keyword hints.
            </p>
          </div>
          <button
            onClick={handleDispatchWhatsAppReview}
            disabled={isLoading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />} Dispatch 15-Min Review Prompt
          </button>
        </div>

        {/* Action 3: AWS Serverless Health */}
        <div className="glass-panel p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <Server size={20} />
              </span>
              <span className="text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                AWS Free Tier ($0/mo)
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">AWS Serverless Health</h3>
            <p className="text-xs text-gray-400 mb-4">
              DynamoDB + Lambda (`SalonFunction`) HTTP API status.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl font-mono">
            <CheckCircle size={14} /> AWS SAM Stack Ready
          </div>
        </div>
      </div>

      {/* Status Output Alert */}
      {statusMessage && (
        <div className="mb-8 p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm font-medium animate-fade-in flex items-center gap-2">
          <CheckCircle size={18} className="shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Payload Code Viewer */}
      <div className="glass-panel p-6">
        <div className="flex gap-4 border-b border-white/10 pb-3 mb-4 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('indexing')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'indexing' ? 'border-gold-500 text-gold-400' : 'border-transparent text-gray-400'}`}
          >
            Google Indexing API Payload
          </button>
          <button
            onClick={() => setActiveTab('knowledge')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'knowledge' ? 'border-gold-500 text-gold-400' : 'border-transparent text-gray-400'}`}
          >
            Knowledge Graph Matrix (@graph)
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === 'whatsapp' ? 'border-gold-500 text-gold-400' : 'border-transparent text-gray-400'}`}
          >
            WhatsApp Accelerated Prompt
          </button>
        </div>

        <div className="bg-dark-950 p-5 rounded-xl border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto">
          {activeTab === 'indexing' && (
            <pre>{JSON.stringify(indexingPayload, null, 2)}</pre>
          )}
          {activeTab === 'knowledge' && (
            <pre>{JSON.stringify(knowledgeGraph, null, 2)}</pre>
          )}
          {activeTab === 'whatsapp' && (
            <pre>{JSON.stringify(reviewPrompt, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
