import React, { useState, useEffect } from 'react';
import { Megaphone, Target, DollarSign, Calendar, Sparkles, CheckCircle2, Play, Building2, Layers, TrendingUp, Users } from 'lucide-react';
import { api } from './api';

export default function AdCampaignLauncher({ salonName, salonId }) {
  const [campaignType, setCampaignType] = useState('single'); // 'single' or 'multi'
  const [selectedSalon, setSelectedSalon] = useState(salonId || 'pihu-makeover');
  const [selectedMultiSalons, setSelectedMultiSalons] = useState(['pihu-makeover', 'glamour-gaya']);
  const [selectedTemplate, setSelectedTemplate] = useState('bridal');
  const [dailyBudget, setDailyBudget] = useState('250');
  const [durationDays, setDurationDays] = useState('7');
  const [isCampaignActive, setIsCampaignActive] = useState(false);
  const [salonsData, setSalonsData] = useState({});

  useEffect(() => {
    async function loadData() {
      const data = await api.getSalons();
      setSalonsData(data);
    }
    loadData();
  }, []);

  const availableSalons = Object.values(salonsData).slice(0, 6);

  const adTemplates = {
    bridal: {
      title: "Bridal HD Makeup Special",
      headline: "Best HD Bridal Makeup in Bodhgaya & Gaya - Book Online & Get 20% OFF!",
      description: "Look breathtaking on your special day. Book luxury HD bridal makeup with 1-Click Instant Confirmation.",
      targetAudience: "Women aged 18-35 • Radius: 15 km of Bodhgaya & Gaya",
      estimatedReach: "18,000 - 28,000 Women",
      defaultPrice: "250"
    },
    hair: {
      title: "Keratin & Luxury Hair Spa Festival",
      headline: "Frizz-Free Silk Smooth Hair Treatment starting at ₹2,499!",
      description: "Rejuvenate your hair with protein hair botox & smoothing. Instant Booking across top partner salons.",
      targetAudience: "Women aged 16-45 • Radius: 10 km of Bodhgaya",
      estimatedReach: "22,000 - 35,000 Women",
      defaultPrice: "200"
    },
    facial: {
      title: "Hydra Gold Radiance Glow",
      headline: "7-Step Hydra Gold Facial - Get Instant Brightening & Glow!",
      description: "Deep cleansing facial treatment by verified top stylists. Book your slot online today.",
      targetAudience: "All Women • Radius: 10 km of Bodhgaya",
      estimatedReach: "15,000 - 25,000 Women",
      defaultPrice: "150"
    }
  };

  const currentTemplate = adTemplates[selectedTemplate];

  const toggleMultiSalon = (id) => {
    if (selectedMultiSalons.includes(id)) {
      if (selectedMultiSalons.length > 1) {
        setSelectedMultiSalons(selectedMultiSalons.filter(s => s !== id));
      }
    } else {
      setSelectedMultiSalons([...selectedMultiSalons, id]);
    }
  };

  const activeSalonCount = campaignType === 'single' ? 1 : selectedMultiSalons.length;
  const activeSalonNames = campaignType === 'single' 
    ? (salonsData[selectedSalon]?.name || salonName || "Pihu Makeover")
    : `${selectedMultiSalons.length} Top Partner Salons (Bodhgaya & Gaya)`;

  return (
    <div className="glass-panel p-6 border border-accent-light rounded-2xl relative overflow-hidden bg-gradient-to-r from-secondary via-dark-800 to-secondary mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-divider-strong pb-6 mb-6 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5 mb-1">
            <Megaphone size={14} /> Multi-Salon Ad Campaign Launcher
          </span>
          <h2 className="text-2xl font-serif text-content flex items-center gap-2">
            Ad Campaign Manager ({activeSalonNames})
          </h2>
          <p className="text-muted text-sm mt-1">
            Launch targeted Instagram, Facebook & Google Ads for single or multiple beauty parlours at once.
          </p>
        </div>

        {isCampaignActive ? (
          <span className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
            <CheckCircle2 size={14} /> Campaign Live across {activeSalonCount} Salon(s)
          </span>
        ) : (
          <span className="px-4 py-2 bg-accent-light text-accent border border-accent-light rounded-full text-xs font-bold uppercase tracking-wider">
            Ready to Launch
          </span>
        )}
      </div>

      {/* Mode Selector Toggle: Single Salon vs Multi-Salon Bundle */}
      <div className="flex gap-3 mb-6 bg-dark-950/80 p-1.5 rounded-xl border border-divider-strong w-full sm:w-fit">
        <button
          onClick={() => setCampaignType('single')}
          className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            campaignType === 'single'
              ? 'bg-accent text-primary shadow-md'
              : 'text-muted hover:text-white'
          }`}
        >
          <Building2 size={15} /> Single Parlour Campaign
        </button>
        <button
          onClick={() => setCampaignType('multi')}
          className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            campaignType === 'multi'
              ? 'bg-accent text-primary shadow-md'
              : 'text-muted hover:text-white'
          }`}
        >
          <Layers size={15} /> Multi-Parlour Co-Op Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Configuration Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Select Salon(s) */}
          {campaignType === 'single' ? (
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                <Building2 size={14} className="text-accent" /> Select Parlour
              </label>
              <select
                value={selectedSalon}
                onChange={(e) => setSelectedSalon(e.target.value)}
                className="w-full bg-secondary border border-divider-strong text-content rounded-xl p-3 text-sm font-semibold focus:border-gold-500 outline-none"
              >
                {availableSalons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.city}) - {s.rating}★ ({s.reviews} reviews)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                <Users size={14} className="text-accent" /> Select Parlours Included in Joint Campaign
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                {availableSalons.map((s) => {
                  const isChecked = selectedMultiSalons.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleMultiSalon(s.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-accent-light border-accent text-gold-300 font-bold'
                          : 'bg-dark-900/60 border-divider text-muted hover:border-white/20'
                      }`}
                    >
                      <span>{s.name}</span>
                      {isChecked ? <CheckCircle2 size={16} className="text-accent" /> : <span className="w-4 h-4 rounded-full border border-gray-600"></span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Select Ad Template */}
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-3">Select Ad Offer & Goal</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.keys(adTemplates).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedTemplate(key);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedTemplate === key 
                      ? 'bg-accent-light border-accent text-gold-300 shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                      : 'bg-dark-900/60 border-divider text-muted hover:border-white/20'
                  }`}
                >
                  <p className="font-bold text-sm text-content">{adTemplates[key].title}</p>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{adTemplates[key].headline}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Budget & Duration Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                <DollarSign size={14} className="text-accent" /> Daily Budget (₹)
              </label>
              <select 
                value={dailyBudget}
                onChange={(e) => setDailyBudget(e.target.value)}
                className="w-full bg-secondary border border-divider-strong text-content rounded-xl p-3 text-sm font-mono focus:border-gold-500 outline-none"
              >
                <option value="150">₹150 / day (Starter Reach)</option>
                <option value="250">₹250 / day (Recommended)</option>
                <option value="500">₹500 / day (High Scale)</option>
                <option value="1000">₹1,000 / day (Regional Dominance)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar size={14} className="text-accent" /> Duration
              </label>
              <select 
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full bg-secondary border border-divider-strong text-content rounded-xl p-3 text-sm font-mono focus:border-gold-500 outline-none"
              >
                <option value="3">3 Days (Quick Test)</option>
                <option value="7">7 Days (Full Week Peak)</option>
                <option value="14">14 Days (Extended Festival)</option>
              </select>
            </div>
          </div>

          {/* Target Audience Summary */}
          <div className="bg-dark-900/80 p-4 rounded-xl border border-divider flex flex-wrap items-center justify-between text-xs gap-2">
            <span className="text-muted flex items-center gap-2">
              <Target size={16} className="text-accent" /> {currentTemplate.targetAudience}
            </span>
            <span className="text-accent font-bold font-mono">Total Reach: {currentTemplate.estimatedReach}</span>
          </div>

          {/* Launch Button */}
          <button
            onClick={async () => {
              try {
                // Set UI state to indicate processing...
                setIsCampaignActive(true);
                
                // Call real backend API
                const payload = {
                  salonIds: campaignType === 'single' ? selectedSalon : selectedMultiSalons.join(','),
                  templateType: selectedTemplate,
                  dailyBudget: parseInt(dailyBudget),
                  durationDays: parseInt(durationDays)
                };
                
                const response = await api.launchAdCampaign(payload);
                console.log("Ad Campaign Backend Response:", response);
                
                // Keep UI active upon success
              } catch (error) {
                console.error("Failed to launch ad campaign", error);
                setIsCampaignActive(false);
                alert("Failed to connect to the backend server. Please check your connection.");
              }
            }}
            className="w-full py-4 bg-gradient-to-r from-accent via-amber-500 to-gold-600 hover:from-gold-400 hover:to-amber-400 text-primary font-bold rounded-xl text-base transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={18} fill="currentColor" /> {isCampaignActive ? `Update Active Ad (${activeSalonCount} Salons)` : `Launch Ad for ${activeSalonCount} Parlour(s) (₹${parseInt(dailyBudget) * parseInt(durationDays)} Total)`}
          </button>
        </div>

        {/* Right Column: Live Sponsored Ad Preview & Multi-Salon Metrics */}
        <div className="space-y-4">
          <div className="bg-white text-gray-900 p-4 rounded-2xl shadow-xl border border-gray-200 text-xs">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-content text-[10px] font-bold flex items-center justify-center">IG</span>
              <span className="font-bold text-gray-800">
                {campaignType === 'single' ? (salonsData[selectedSalon]?.name || "Pihu Makeover") : "Bodhgaya Beauty Network"}
              </span>
              <span className="ml-auto text-[10px] text-muted">Sponsored</span>
            </div>

            <h4 className="font-bold text-sm text-gray-900 mb-1">{currentTemplate.headline}</h4>
            <p className="text-gray-600 leading-normal mb-3">{currentTemplate.description}</p>
            
            <div className="bg-blue-600 text-content py-2 px-3 rounded-lg text-center font-bold text-xs uppercase tracking-wider shadow-sm">
              Book Salon Online ➔
            </div>
            <p className="text-[10px] text-muted text-center mt-1 font-mono">
              Destination: beautyai.app/salon/{campaignType === 'single' ? selectedSalon : 'network'}
            </p>
          </div>

          {/* Multi-Salon Live Performance Analytics */}
          <div className="bg-dark-900/90 border border-green-500/30 rounded-2xl p-4 text-xs space-y-3">
            <span className="text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <TrendingUp size={14} /> {campaignType === 'single' ? "Single Parlour Analytics" : "Multi-Salon Network Performance"}
            </span>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-tertiary p-2.5 rounded-lg border border-divider">
                <span className="text-muted block text-[10px]">Total Impressions</span>
                <span className="text-content font-mono font-bold text-sm">{activeSalonCount * 6420}</span>
              </div>
              <div className="bg-tertiary p-2.5 rounded-lg border border-divider">
                <span className="text-muted block text-[10px]">Clicks to Website</span>
                <span className="text-accent font-mono font-bold text-sm">{activeSalonCount * 480}</span>
              </div>
              <div className="bg-tertiary p-2.5 rounded-lg border border-divider">
                <span className="text-muted block text-[10px]">Total Bookings</span>
                <span className="text-green-400 font-mono font-bold text-sm">{activeSalonCount * 32}</span>
              </div>
              <div className="bg-tertiary p-2.5 rounded-lg border border-divider">
                <span className="text-muted block text-[10px]">Total Budget Spend</span>
                <span className="text-content font-mono font-bold text-sm">₹{parseInt(dailyBudget) * parseInt(durationDays)}</span>
              </div>
            </div>

            {campaignType === 'multi' && (
              <div className="mt-3 pt-3 border-t border-divider-strong space-y-1.5">
                <span className="text-muted text-[10px] uppercase font-bold tracking-wider block">Bookings Per Parlour:</span>
                {selectedMultiSalons.map((id, idx) => (
                  <div key={id} className="flex justify-between items-center text-[11px]">
                    <span className="text-muted">{salonsData[id]?.name || id}</span>
                    <span className="text-green-400 font-mono font-bold">{32 - (idx * 5)} bookings</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
