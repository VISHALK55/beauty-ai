import React, { useState, useEffect } from 'react';
import { api } from './api';
import { 
  MapPin, 
  MessageCircle, 
  TrendingUp, 
  Star, 
  Map,
  Zap,
  Globe,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const StatCard = ({ title, value, icon, subtitle, highlight }) => (
  <div className="glass-panel p-6 animate-slide-up hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
    {highlight && (
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
    )}
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-sm text-muted font-medium tracking-wide uppercase">{title}</p>
        <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{value}</h3>
      </div>
      <div className={`p-4 bg-dark-900/50 rounded-2xl border border-divider shadow-lg ${highlight ? 'text-blue-400 border-blue-500/20 shadow-blue-500/20' : 'text-muted'}`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm relative z-10">
      <span className={highlight ? "text-blue-400 font-medium" : "text-muted font-medium"}>{subtitle}</span>
    </div>
  </div>
);

export default function GeoRank() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [salon, setSalon] = useState(null);
  const [mapsUrl, setMapsUrl] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getSalon('pihu-makeover');
        if (data) {
          setSalon(data);
          setMapsUrl(data.googleMapsLink || "https://maps.google.com/?cid=123456789");
        } else {
          setSalon({ name: "Error Loading Data", city: "Unknown" });
        }
      } catch (err) {
        console.error("GeoRank load error:", err);
        setSalon({ name: "Error Loading Data", city: "Unknown" });
      }
    }
    loadData();
  }, []);

  if (!salon) return <div className="p-10 text-accent">Loading Geo Rank Engine...</div>;

  return (
    <div className="px-10 py-8 min-h-full">
      <header className="flex justify-between items-center mb-10 animate-fade-in">
        <div>
          <h1 className="text-4xl font-serif tracking-tight flex items-center gap-3">
            Geo Rank AI <Zap size={28} className="text-blue-500 fill-blue-500/20" />
          </h1>
          <p className="text-muted mt-2 text-lg">Automate your local SEO and dominate Google Maps in {salon.city}.</p>
        </div>
      </header>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-panel p-8 relative overflow-hidden animate-slide-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h2 className="text-2xl font-serif mb-2">Automated Review Engine</h2>
              <p className="text-muted">Automatically sends a WhatsApp message to clients 2 hours after their appointment, requesting a 5-star Google review.</p>
            </div>
            
            {/* Custom Toggle Switch */}
            <div 
              className={`w-16 h-8 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300 ${isEnabled ? 'bg-blue-500' : 'bg-tertiary'}`}
              onClick={() => setIsEnabled(!isEnabled)}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isEnabled ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-muted mb-2 uppercase tracking-wide">Google Business Profile URL</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <MapPin size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
                  <input 
                    type="text" 
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-dark-900/80 border border-divider-strong rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-content font-mono text-sm"
                  />
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-content font-medium rounded-xl transition-colors shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                  Save Link
                </button>
              </div>
            </div>

            <div className="bg-dark-900/60 border border-divider rounded-xl p-5 border-l-4 border-l-blue-500">
              <h4 className="text-sm font-bold text-muted mb-2 flex items-center gap-2">
                <MessageCircle size={16} className="text-blue-400" /> WhatsApp Preview
              </h4>
              <p className="text-muted italic text-sm">
                "Hi! Thank you for visiting {salon.name} ({salon.city}) today. If you loved your service, we would be incredibly grateful if you left us a quick 5-star review here: <span className="text-blue-400 not-italic">{mapsUrl}</span>"
              </p>
            </div>
          </div>
        </div>

        {/* Location Intelligence Card */}
        <div className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
            <Globe size={20} className="text-blue-400" /> Local Dominance
          </h3>
          
          <div className="space-y-6">
            <div className="bg-dark-900/50 p-4 rounded-xl border border-divider">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted">Current Ranking ({salon.city})</span>
                <span className="text-accent font-bold flex items-center gap-1">Top 3 <TrendingUp size={14} /></span>
              </div>
              <div className="w-full bg-tertiary rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm text-muted uppercase tracking-wide mb-3">AI Targeted Areas</h4>
              <ul className="space-y-3">
                {salon.neighborhoods?.slice(0, 2).map((hood, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle size={16} className="text-green-500" /> {hood} <span className="ml-auto text-muted">Rank #1</span>
                  </li>
                ))}
                {salon.neighborhoods?.length > 2 && (
                  <li className="flex items-center gap-3 text-sm">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div> {salon.neighborhoods[2]} <span className="ml-auto text-blue-400">Optimizing...</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <h3 className="text-xl font-serif mb-6 mt-10">Live AI Impact</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Review Requests Sent" 
          value="48" 
          icon={<MessageCircle size={28} strokeWidth={1.5} />} 
          subtitle="This week" 
        />
        <StatCard 
          title="New 5-Star Reviews" 
          value="12" 
          icon={<Star size={28} strokeWidth={1.5} className="fill-gold-400/20" />} 
          subtitle="+400% conversion rate"
          highlight={true}
        />
        <StatCard 
          title="Map Views Generated" 
          value="1,240" 
          icon={<Map size={28} strokeWidth={1.5} />} 
          subtitle="From local searches" 
        />
      </div>
    </div>
  );
}
