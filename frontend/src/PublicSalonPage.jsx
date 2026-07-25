import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateLocalBusinessSchema, generateServiceSchema } from './SeoAlgorithm';
import { MapPin, Phone, Star, Sparkles, CheckCircle2, Gift, MessageCircle, PhoneCall, ChevronRight } from 'lucide-react';
import { salonsDatabase } from './salonsData';
import BookingModal from './BookingModal';

// DB Fetch based on URL parameters (Programmatic SEO)
const fetchSalonData = (salonId) => {
  return salonsDatabase[salonId] || salonsDatabase['surbhi-gaya']; // fallback
};

const fetchServiceData = (serviceSlug) => {
  const db = {
    'bridal-makeup': { name: "Bridal HD Makeup", price: 6450, description: "Premium HD bridal makeup for your special day." },
    'hair-spa': { name: "Luxury Hair Spa", price: 900, description: "Rejuvenating hair spa and scalp treatment." },
    'hair-cut': { name: "Styling & Hair Cut", price: 450, description: "Modern haircut and blow dry styling." },
    'facial': { name: "Gold Radiance Facial", price: 1200, description: "Deep cleansing and instant skin brightening facial." },
    'keratin': { name: "Keratin Smooth Treatment", price: 3500, description: "Frizz-free silk hair smoothing treatment." }
  };
  return db[serviceSlug] || { name: serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), price: 500, description: "Professional salon service." };
};

export default function PublicSalonPage() {
  const { salonId, serviceSlug, neighborhoodSlug } = useParams();
  const [salon, setSalon] = useState(null);
  const [service, setService] = useState(null);
  const [schemas, setSchemas] = useState({ localBusiness: null, service: null });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOfferUnlocked, setIsOfferUnlocked] = useState(false);

  useEffect(() => {
    // 1. Fetch data from DB based on programmatic URL
    const sData = fetchSalonData(salonId);
    const srvData = fetchServiceData(serviceSlug || 'hair-cut');
    setSalon(sData);
    setService(srvData);

    // 2. SEO ALGORITHM EXECUTION (Hyper-Local Grid)
    // Generate native Google Machine Code (JSON-LD)
    const localSchema = generateLocalBusinessSchema(sData);
    const srvSchema = generateServiceSchema(srvData, sData, neighborhoodSlug);
    
    setSchemas({ localBusiness: localSchema, service: srvSchema });
    
    // Log it so the developer can see the internal engine working
    console.log("🔥 [SEO HYPER-LOCAL ENGINE] Injected Schema:", { localSchema, srvSchema });
  }, [salonId, serviceSlug, neighborhoodSlug]);

  if (!salon || !service) return <div className="p-10 text-white">Loading Programmatic SEO Page...</div>;

  const displayLocation = neighborhoodSlug ? neighborhoodSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : salon.city;

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans selection:bg-gold-500/30">
      {/* 
        ========================================================================
        🔥 THE SEO PAYLOAD (HIDDEN FROM HUMANS, VISIBLE TO GOOGLE)
        ========================================================================
      */}
      <Helmet>
        <title>{service.name} in {displayLocation} | {salon.name}</title>
        <meta name="description" content={`Book ${service.name} at ${salon.name} in ${displayLocation}. ${service.description}`} />
        <link rel="canonical" href={`https://surbhibeauty.com/salon/${salonId}/${serviceSlug}${neighborhoodSlug ? '/' + neighborhoodSlug : ''}`} />
        
        {/* Schema Injection */}
        {schemas.localBusiness && (
          <script type="application/ld+json">
            {JSON.stringify(schemas.localBusiness)}
          </script>
        )}
        {schemas.service && (
          <script type="application/ld+json">
            {JSON.stringify(schemas.service)}
          </script>
        )}
      </Helmet>

      {/* 
        ========================================================================
        BEAUTIFUL PUBLIC LANDING PAGE (VISIBLE TO HUMANS)
        ========================================================================
      */}
      
      {/* 🔴 DYNAMIC SEASONAL BANNER 🔴 */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white text-center py-3 px-4 shadow-[0_0_20px_rgba(220,38,38,0.4)] relative z-50">
        <p className="font-bold flex items-center justify-center gap-2 text-sm md:text-base">
          <Sparkles size={18} className="animate-pulse text-gold-300" />
          FESTIVE SEASON ALERT: Only 3 {service.name} Slots Left This Week! 
          <span className="bg-white/20 px-2 py-1 rounded text-xs uppercase tracking-wider ml-2 hidden md:inline-block">Call Fast</span>
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-gold-500 mb-2">{salon.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1"><MapPin size={16}/> {salon.streetAddress}, {salon.city}</span>
              <span className="flex items-center gap-1"><Phone size={16}/> {salon.phone}</span>
              <span className="flex items-center gap-1 text-gold-400 font-medium">
                <Star size={16} className="fill-gold-400"/> {salon.rating} ({salon.reviews} reviews)
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Based on Programmatic URL */}
        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Sparkles size={14} /> Available Now in {displayLocation}
          </div>

          <h2 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">
            Book <span className="bg-gradient-to-r from-gold-300 to-gold-600 bg-clip-text text-transparent">{service.name}</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            {service.description} Skip the line and book instantly using our AI system.
          </p>

          {/* 🔴 NEW LEAD GEN / HIDDEN PRICE UI 🔴 */}
          {!isOfferUnlocked ? (
            <div className="mb-10 bg-dark-900/50 p-6 rounded-2xl border border-gold-500/20 backdrop-blur-sm max-w-lg">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gold-400">
                <Gift size={20} /> Unlock Custom Pricing
              </h3>
              <p className="text-gray-400 text-sm mb-4">Click below to reveal today's exclusive hidden rate for {service.name}. No upfront payment required.</p>
              
              <button 
                onClick={() => setIsOfferUnlocked(true)}
                className="w-full bg-gradient-to-r from-dark-800 to-dark-700 hover:from-gold-600 hover:to-yellow-500 text-white border border-gold-500/30 hover:border-transparent rounded-xl py-4 font-bold text-lg transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group flex items-center justify-center gap-2 cursor-pointer"
              >
                Reveal Secret Deal <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="mb-10 bg-gradient-to-r from-gold-900/40 to-green-900/40 p-6 rounded-2xl border border-gold-500/50 backdrop-blur-sm max-w-lg animate-in fade-in zoom-in duration-300">
              <div className="text-green-400 font-bold uppercase text-xs tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 size={14} /> Deal Unlocked
              </div>
              <h3 className="text-3xl font-serif text-white mb-1">Your Code: <span className="text-gold-400 bg-black/30 px-3 py-1 rounded-lg border border-gold-500/30 font-mono tracking-widest">GLOW20</span></h3>
              <p className="text-gray-300 text-sm mb-6">Call {salon.name} right now and mention this code to get a customized VIP quote + Free Consultation!</p>
              
              <a 
                href={`tel:${salon.phone.replace(/\\s+/g, '')}`}
                className="w-full btn-primary text-lg px-8 py-4 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] flex justify-center items-center gap-2 cursor-pointer"
              >
                <PhoneCall size={20} /> Call Now for Quote
              </a>
            </div>
          )}

          <p className="text-gray-500 text-sm flex items-center gap-2">
             Or request a call back online:
          </p>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="mt-3 text-gold-500 hover:text-gold-400 text-sm underline underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            Open Consultation Request Form
          </button>
        </div>

        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
        
        {/* 🔴 FLOATING QUICK CONTACT CTAs 🔴 */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
           <a href={`https://wa.me/${salon.phone.replace(/\\D/g, '')}?text=Hi%20${encodeURIComponent(salon.name)}!%20I%20want%20to%20know%20the%20custom%20price%20for%20${encodeURIComponent(service.name)}.`} 
              target="_blank" rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative">
              <MessageCircle size={26} fill="currentColor" />
              <span className="absolute right-full mr-4 bg-dark-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-xl">WhatsApp Us</span>
           </a>
           <a href={`tel:${salon.phone.replace(/\\D/g, '')}`}
              className="bg-gold-500 hover:bg-gold-400 text-dark-950 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group relative">
              <PhoneCall size={26} fill="currentColor" />
              <span className="absolute right-full mr-4 bg-dark-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-xl">Call Directly</span>
           </a>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This page was dynamically generated by the Hyper-Local Geo Rank AI Engine.</p>
          <Link to="/" className="text-gold-500 hover:underline mt-2 inline-block">Return to Admin Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
