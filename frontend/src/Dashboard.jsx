import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  Search,
  TrendingUp,
  Bell,
  Clock,
  Zap,
  CheckCircle2,
  Send,
  MapPin,
  Smartphone,
  Copy,
  Star,
  Sparkles,
  Globe
} from 'lucide-react';
import BookingModal from './BookingModal';
import AdCampaignLauncher from './AdCampaignLauncher';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="glass-panel p-6 animate-slide-up">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-semibold mt-2">{value}</h3>
      </div>
      <div className="p-3 bg-dark-900 rounded-xl text-gold-400">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm">
      <TrendingUp size={16} className="text-green-500" />
      <span className="text-green-500 font-medium">{trend}</span>
      <span className="text-gray-500">vs last week</span>
    </div>
  </div>
);

const UpcomingAppointments = () => (
  <div className="glass-panel p-6 mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl">Upcoming Appointments</h2>
      <button className="text-gold-400 text-sm hover:underline">View All</button>
    </div>
    
    <div className="space-y-4">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center">
              <span className="text-lg">👩</span>
            </div>
            <div>
              <p className="font-medium">Sarah Jenkins</p>
              <p className="text-sm text-gray-400">Premium Hair Spa • ₹900</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-gold-400 justify-end">
              <Clock size={16} />
              <span className="font-medium">10:30 AM</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">with Stylist Alex</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-10 py-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif text-gold-500">Pihu Makeover Command Center</h1>
          <p className="text-gray-400 mt-1">Hyper-Speed Acceleration Engine is <span className="text-green-400 font-bold">ACTIVE</span></p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-full focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all w-64"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-roseGold-500 rounded-full"></span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Calendar size={18} />
            New Booking
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value="₹24,500" icon={<TrendingUp size={24} />} trend="+12.5%" />
        <StatCard title="Appointments" value="32" icon={<Calendar size={24} />} trend="+5.2%" />
        <StatCard title="AI Interactions" value="128" icon={<MessageSquare size={24} />} trend="+18.4%" />
      </div>

      {/* 🚀 AUTOMATED AD CAMPAIGN LAUNCHER 🚀 */}
      <AdCampaignLauncher salonName="Pihu Makeover Saloon" salonId="pihu-makeover-beauty-salon" />

      {/* 🔴 NEW HYPER-SPEED SEO PANEL 🔴 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6 border border-gold-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gold-400">
              <Zap size={22} className="text-yellow-400 fill-yellow-400" /> Hyper-Speed Acceleration Engine
            </h2>
            <span className="bg-green-900/40 text-green-400 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-green-500/30">Active</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-dark-900/60 rounded-lg">
              <div>
                <p className="font-medium">Google Instant Indexing API</p>
                <p className="text-xs text-gray-400">Timeline: {'<'} 2 Hours</p>
              </div>
              <span className="text-green-400 flex items-center gap-1 text-sm"><CheckCircle2 size={16} /> Googlebot Pinged</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-dark-900/60 rounded-lg">
              <div>
                <p className="font-medium">Knowledge Graph Activation</p>
                <p className="text-xs text-gray-400">Timeline: 48 Hours</p>
              </div>
              <span className="text-green-400 flex items-center gap-1 text-sm"><CheckCircle2 size={16} /> Entity Matrix Live</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gold-900/20 border border-gold-500/30 rounded-lg">
              <div>
                <p className="font-bold text-gold-400">#1 Rank vs Nature Saloon</p>
                <p className="text-xs text-gold-500/70">Timeline: 48 Hours (Ultra-Aggressive)</p>
              </div>
              <span className="text-gold-400 text-sm font-bold animate-pulse">Review Dispatch Active</span>
            </div>
          </div>

          {/* 🔴 LIVE GOOGLE REVIEWS TRACE 🔴 */}
          <div className="mt-6 p-4 bg-dark-900/80 rounded-xl border border-white/5 relative">
             <div className="flex justify-between items-center mb-3">
               <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2"><Globe size={16} className="text-blue-400"/> Live Google Maps Trace</h3>
               <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Syncing...</span>
             </div>
             
             <div className="flex items-center gap-4 mb-3">
                <div className="text-4xl font-bold text-white">4.9</div>
                <div>
                   <div className="flex gap-1 mb-1">
                     {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-gold-400 text-gold-400" />)}
                   </div>
                   <div className="text-xs text-gray-400">55 Total Reviews</div>
                </div>
             </div>

             <div className="bg-dark-800 p-3 rounded-lg border-l-2 border-gold-500">
               <p className="text-xs text-gray-300 italic">"Excellent service and good product use always"</p>
               <p className="text-[10px] text-gray-500 mt-1">- Traced 10 minutes ago</p>
             </div>
          </div>
        </div>

        {/* 🔴 15-MIN REVIEW DISPATCHER & CITATION BUILDER 🔴 */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 border border-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Smartphone size={22} className="text-green-400" /> 15-Min Review Dispatcher
            </h2>
            <p className="text-sm text-gray-400 mb-6">Fire this immediately after a client leaves to secure the Maps ranking.</p>
            
            <a 
              href="https://wa.me/?text=Hi!%20Thank%20you%20for%20visiting%20Pihu%20Makeover.%20Could%20you%20please%20leave%20a%20quick%205-star%20review%20and%20upload%20your%20photo%20here%3F%20[Link]" 
              target="_blank" rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(37,211,102,0.3)] cursor-pointer"
            >
              <Send size={18} /> Trigger WhatsApp Request
            </a>
          </div>

          {/* 📸 META ADS & INSTAGRAM BIO LINK GROWTH HUB 📸 */}
          <div className="glass-panel p-6 border border-pink-500/30 relative overflow-hidden bg-gradient-to-r from-purple-900/10 to-pink-900/10">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-pink-400">
              <Sparkles size={20} /> Social & Meta Ads Growth Hub
            </h2>
            <p className="text-xs text-gray-400 mb-4">Target local women in Bodhgaya & Gaya via Instagram & Facebook Ads.</p>
            
            <div className="space-y-3 text-xs">
              <div className="bg-dark-900/80 p-3 rounded-lg border border-white/5">
                <span className="text-gray-400 uppercase font-mono block text-[10px]">Official IG & FB Bio Link:</span>
                <span className="text-gold-400 font-mono select-all">https://beautyai.app/salon/pihu-makeover-beauty-salon</span>
              </div>
              
              <div className="flex gap-2">
                <a 
                  href="https://www.instagram.com/pihu_makeover22/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 px-3 rounded-lg text-center font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  Instagram Page
                </a>
                <a 
                  href="https://www.facebook.com/pihumakeover.bodhgaya" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 bg-blue-600 text-white py-2.5 px-3 rounded-lg text-center font-bold text-xs hover:bg-blue-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  Facebook Page
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin size={20} className="text-blue-400" /> NAP Citation Copier
            </h2>
            <div className="bg-dark-900 p-4 rounded-lg text-sm font-mono text-gray-300 relative group">
              <p>Pihu Makeover Saloon</p>
              <p>Opposite Govt Middle School, Sujata Bypass, Rajapur Road</p>
              <p>Bodhgaya, Bihar 824231</p>
              <p>+91 98765 43210</p>
              <button onClick={() => navigator.clipboard.writeText("Pihu Makeover Saloon\nOpposite Govt Middle School, Sujata Bypass, Rajapur Road\nBodhgaya, Bihar 824231\n+91 98765 43210")} className="absolute top-3 right-3 text-gray-500 hover:text-white bg-dark-800 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <Copy size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Paste exactly as above in JustDial & Sulekha.</p>
          </div>
        </div>
      </div>

      <UpcomingAppointments />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
