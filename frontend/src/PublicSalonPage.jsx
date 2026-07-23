import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateLocalBusinessSchema, generateServiceSchema } from './SeoAlgorithm';
import { MapPin, Phone, Star, Sparkles, CheckCircle2 } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto px-6 py-12">
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

          <div className="flex items-center gap-4 mb-10">
            <div className="text-3xl font-light">₹{service.price}</div>
            <div className="text-gray-500 line-through text-lg">₹{service.price + 500}</div>
            <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold uppercase">Save ₹500 today</div>
          </div>

          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="btn-primary text-lg px-8 py-4 w-full md:w-auto shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] flex justify-center items-center gap-2 cursor-pointer"
          >
            Book Appointment Now <CheckCircle2 size={20} />
          </button>
        </div>

        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This page was dynamically generated by the Hyper-Local Geo Rank AI Engine.</p>
          <Link to="/" className="text-gold-500 hover:underline mt-2 inline-block">Return to Admin Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
