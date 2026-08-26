import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Star, Clock, CalendarCheck, ChevronRight, ShieldCheck, Sparkles, Navigation, MessageCircle, PhoneCall, CheckCircle2, Gift, Search, Menu, Mail, Heart, X } from 'lucide-react';
import { generateLocalBusinessSchema, generateServiceSchema } from './SeoAlgorithm';
import { api } from './api';
import BookingModal from './BookingModal';
import CallTrackingModal from './CallTrackingModal';

// DB Fetch based on URL parameters (Programmatic SEO)
const fetchServiceData = (serviceSlug) => {
  const db = {
    'bridal-makeup': { name: "Bridal & Party Makeup", description: "Premium HD bridal & party makeup with 3D lash extensions & flawless finish." },
    'airbrush-makeup': { name: "Airbrush HD Bridal Suite", description: "Ultra-waterproof airbrush HD makeup package for grand weddings." },
    'haircut-styling': { name: "Haircuts, Styling & Coloring", description: "Modern haircuts, professional blow-dry, and balayage/highlights." },
    'facial-skincare': { name: "Facials, Skin Care & Spa", description: "Deep cleansing facials, skin brightening, and relaxing spa treatments." },
    'nails': { name: "Manicures, Pedicures & Acrylic Nails", description: "Luxury mani-pedi spa and professional acrylic nail extensions." },
    'lashes-brows': { name: "Eyelash Extensions & Brow Lamination", description: "Semi-permanent eyelash extensions and brow lamination for a bold look." },
    'hair-removal': { name: "Waxing & Laser Hair Removal", description: "Full body waxing and advanced laser hair removal services." }
  };
  return db[serviceSlug] || { name: serviceSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), description: "Professional salon service tailored to your beauty needs." };
};

const blogPostsData = [
  { 
    title: "Best Ladies Beauty Parlour in Bodhgaya & Gaya: Where Beauty Meets Perfection", 
    date: "August 3, 2024",
    content: "Finding the right beauty parlour in Gaya or Bodhgaya can be overwhelming, but the key is looking for experienced professionals who prioritize hygiene and use premium products. At our salon, we ensure every client receives personalized attention to enhance their natural beauty. Whether it's a simple haircut or a full bridal makeover, perfection is our standard."
  },
  { 
    title: "Best Airbrush Bridal Makeup Tips for Your Big Day in Bodhgaya", 
    date: "August 10, 2024",
    content: "Airbrush makeup is the secret to a flawless, long-lasting bridal look in Bodhgaya's climate. Unlike traditional makeup, it sprays a fine mist of foundation that sits lightly on the skin, covering imperfections without looking cakey. For the best results, ensure your skin is deeply hydrated before the session. Trust our experts to give you that perfect HD glow that lasts through tears and sweat!"
  },
  { 
    title: "Hydra Facial in Gaya & Bodhgaya: A Journey to Radiant, Glowing Skin", 
    date: "August 15, 2024",
    content: "A HydraFacial is one of the most effective non-invasive skin resurfacing treatments available today across Gaya and Bodhgaya. It combines cleansing, exfoliation, extraction, hydration, and antioxidant protection all in one. Perfect before big events, it leaves your skin looking instantly brighter and more youthful without any downtime."
  }
];

const PublicSalonPage = React.memo(function PublicSalonPage() {
  const { salonId, serviceSlug, neighborhoodSlug } = useParams();
  const [salon, setSalon] = useState(null);
  const [service, setService] = useState(null);
  const [schemas, setSchemas] = useState({ localBusiness: null, service: null });
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCallTrackingOpen, setIsCallTrackingOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch data from DB based on programmatic URL
      let sData;
      try {
        sData = await api.getSalon(salonId);
      } catch (e) {
        console.log("API failed, using fallback data for preview");
      }
      
      sData = {
          ...(sData || {}),
          id: salonId,
          name: sData?.name || salonId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          city: sData?.city || "Gaya, Bihar 824231",
          streetAddress: sData?.streetAddress || "Sujata Bypass Road, Near Govt. Middle School Rajapur, Bodhgaya",
          rating: sData?.rating || 4.8,
          reviews: sData?.reviews || 120,
          phone: sData?.phone || "+91 9113715558",
          email: sData?.email || "hello@" + salonId + ".com",
          instagram: sData?.instagram || "https://www.instagram.com/" + salonId,
          image: sData?.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000"
        };

      const srvData = fetchServiceData(serviceSlug || 'hair-cut');
      setSalon(sData);
      setService(srvData);

      // 2. SEO ALGORITHM EXECUTION (Hyper-Local Grid)
      if (sData) {
        const localSchema = generateLocalBusinessSchema(sData);
        // Note: service schema internally might still generate a dummy price if needed for SEO, 
        // but it will NOT be displayed to the user on this page.
        const srvSchema = generateServiceSchema({...srvData, price: 850}, sData, neighborhoodSlug);
        setSchemas({ localBusiness: localSchema, service: srvSchema });
      }
    }
    fetchData();
  }, [salonId, serviceSlug, neighborhoodSlug]);

  if (!salon || !service) return <div className="p-10 text-content min-h-screen bg-primary flex items-center justify-center">Loading Experience...</div>;

  const displayLocation = neighborhoodSlug ? neighborhoodSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Bodhgaya, Gaya";

  return (
    <div className="min-h-screen bg-primary text-content font-sans selection:bg-gold-500/30">
      <Helmet>
        <title>{service.name} in {displayLocation} | {salon.name}</title>
        <meta name="description" content={`Book ${service.name} at ${salon.name} in ${displayLocation}. ${service.description}`} />
        <link rel="canonical" href={`https://beautyai.app/salon/${salonId}/${serviceSlug}${neighborhoodSlug ? '/' + neighborhoodSlug : ''}`} />
        
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

      {/* --- TOP BAR --- */}
      <div className="bg-[#1a1a1a] border-b border-divider py-2 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-muted gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Clock size={14} className="text-accent" /> MON – SUN: 9.00 AM–9.00 PM
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-gold-500 transition-colors font-bold tracking-wider">FB</a>
          <a href="#" className="hover:text-gold-500 transition-colors font-bold tracking-wider">YT</a>
          <a href={salon.instagram || "#"} className="hover:text-gold-500 transition-colors font-bold tracking-wider">IG</a>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-accent text-primary px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="bg-dark-950/95 backdrop-blur-lg sticky top-0 z-50 border-b border-divider py-4 px-4 md:px-12 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-serif text-accent font-bold uppercase tracking-wide">
          {salon.name}
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted">
          <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <div className="relative group cursor-pointer py-2">
            <span className="hover:text-gold-500 transition-colors flex items-center gap-1">Our Services <ChevronRight size={14} className="rotate-90" /></span>
            {/* Dropdown menu */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-secondary border border-divider-strong rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
              <span className="px-4 py-3 hover:bg-gold-500 hover:text-dark-950 transition-colors border-b border-divider">Bridal Makeup</span>
              <span className="px-4 py-3 hover:bg-gold-500 hover:text-dark-950 transition-colors border-b border-divider">Haircut Style</span>
              <span className="px-4 py-3 hover:bg-gold-500 hover:text-dark-950 transition-colors border-b border-divider">Skin Care Services</span>
              <span className="px-4 py-3 hover:bg-gold-500 hover:text-dark-950 transition-colors">Nail Art Services</span>
            </div>
          </div>
          <span className="hover:text-gold-500 transition-colors cursor-pointer">Blog</span>
          <span className="hover:text-gold-500 transition-colors cursor-pointer">Contact</span>
        </div>

        <div className="flex items-center gap-4">
          <Search size={20} className="text-muted hover:text-gold-500 cursor-pointer transition-colors" />
          <Menu size={24} className="lg:hidden text-muted hover:text-gold-500 cursor-pointer" />
        </div>
      </nav>

      {/* --- HERO SLIDER STYLE --- */}
      <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0"></div>
        {salon.image && (
          <img 
            src={salon.image} 
            alt={`${salon.name} Header`} 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-dark-900/80 to-transparent z-10"></div>
        
        <div className="relative z-20 px-6 md:px-16 max-w-5xl">
          <div className="inline-block px-3 py-1 bg-accent-light text-accent border border-accent-light rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} className="inline mr-2" />
            Top Salon in {displayLocation}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-content mb-4 leading-tight">
            Premium <span className="text-accent">{service.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-8 max-w-2xl font-light">
            {service.description} Transform your look with our expert stylists today.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-accent hover:bg-white text-primary px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2"
            >
              Request Free Consultation
            </button>
            <a 
              href={`tel:${salon.phone}`}
              className="bg-transparent border border-white hover:border-gold-500 hover:text-gold-500 text-content px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors rounded flex items-center gap-2"
            >
              <Phone size={18} /> Call Now
            </a>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Service Highlight Section (No Prices) */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-10"></div>
            {salon.image ? (
              <img src={salon.image} className="w-full h-[500px] object-cover" alt="Service Showcase" />
            ) : (
              <div className="w-full h-[500px] bg-tertiary flex items-center justify-center">Image</div>
            )}
            <div className="absolute bottom-6 left-6 z-20 text-accent font-serif text-2xl bg-dark-950/80 px-4 py-2 rounded-lg border border-gold-500/20 backdrop-blur">
              Award Winning Service
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-serif mb-6 text-content leading-tight">
              Experience the Best <br/><span className="text-accent">{service.name}</span> in {displayLocation}
            </h2>
            <p className="text-muted mb-6 text-lg leading-relaxed">
              At {salon.name}, we believe that beauty is personal. Our highly trained professionals use only the finest products to ensure your {service.name.toLowerCase()} is nothing short of perfection. 
            </p>
            <p className="text-muted mb-8 text-lg leading-relaxed">
              Whether you're preparing for your wedding day or just looking for a refreshing change, our team is dedicated to providing an exceptional and luxurious experience tailored specifically to your needs.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-muted font-medium">
                <CheckCircle2 className="text-accent" size={20} /> Highly experienced styling professionals
              </li>
              <li className="flex items-center gap-3 text-muted font-medium">
                <CheckCircle2 className="text-accent" size={20} /> Premium, skin-safe international products
              </li>
              <li className="flex items-center gap-3 text-muted font-medium">
                <CheckCircle2 className="text-accent" size={20} /> Relaxing, hygienic, and luxurious environment
              </li>
            </ul>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="group flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
            >
              Book an Appointment <ChevronRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>
          </div>
        </div>

        {/* --- BRANDS WE USE (Mock Carousel) --- */}
        <div className="mb-24 py-12 border-y border-divider text-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-8">Premium Brands We Trust</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {/* Using text representations as mock logos for now */}
            <span className="text-3xl font-serif font-bold text-content tracking-wider">L'ORÉAL</span>
            <span className="text-3xl font-sans font-black text-content tracking-tighter">WELLA</span>
            <span className="text-2xl font-serif font-light text-content tracking-widest">LOTUS</span>
            <span className="text-3xl font-mono font-bold text-content">O3+</span>
            <span className="text-3xl font-sans font-bold text-content tracking-wide">M·A·C</span>
          </div>
        </div>

        {/* --- REAL BRIDES / PORTFOLIO GALLERY --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <Heart className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-serif text-content mb-4">Real Brides, Real Magic</h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">Glimpses of our stunning bridal transformations and studio moments.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="relative group overflow-hidden cursor-pointer rounded-xl" onClick={() => setIsBookingModalOpen(true)}>
                <img src={`/gallery/gallery_${num}.jpg`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 bg-tertiary" alt={`Portfolio ${num}`} />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-content font-bold uppercase tracking-widest text-sm border border-white px-6 py-2 rounded hover:bg-white hover:text-black transition-colors">
                    View & Book
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RECENT BLOG POSTS --- */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-content mb-2">Our Blog</h2>
              <p className="text-muted">Discover the latest beauty trends and tips.</p>
            </div>
            <button className="hidden md:flex text-accent hover:text-white items-center gap-2 font-bold uppercase tracking-widest text-xs transition-colors">
              View All Posts <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPostsData.map((post, idx) => (
              <div key={idx} className="group cursor-pointer" onClick={() => setSelectedBlogPost(post)}>
                <div className="w-full h-48 bg-tertiary rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-accent-light group-hover:bg-transparent transition-colors"></div>
                  {/* Placeholder for blog image */}
                </div>
                <div className="flex items-center gap-2 text-xs text-accent font-bold uppercase tracking-wider mb-2">
                  <CalendarCheck size={14} /> {post.date}
                </div>
                <h3 className="text-xl font-serif text-content group-hover:text-gold-500 transition-colors leading-snug">
                  {post.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- FAT FOOTER --- */}
      <footer className="bg-[#111111] border-t border-divider pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-serif text-accent font-bold uppercase tracking-wide mb-6">
              {salon.name}
            </div>
            <p className="text-muted text-sm mb-6 leading-relaxed">
              Premium salon providing expert hair, makeup, and skin care services. Enhance your natural beauty with our dedicated professionals.
            </p>
            <div className="flex items-center gap-4 text-muted">
              <a href="#" className="w-10 h-10 rounded-full border border-divider-strong flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">FB</a>
              <a href="#" className="w-10 h-10 rounded-full border border-divider-strong flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">YT</a>
              <a href={salon.instagram || "#"} className="w-10 h-10 rounded-full border border-divider-strong flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">IG</a>
            </div>
          </div>

          <div>
            <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-6">Best Services</h4>
            <ul className="space-y-3 text-muted text-sm">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Haircut Style</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Bridal Makeup</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Skin Care Services</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Men's Grooming</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Nail Art Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4 text-muted text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-0.5" size={16} />
                <span>{salon.streetAddress}, {salon.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-accent shrink-0" size={16} />
                <a href={`tel:${salon.phone}`} className="hover:text-white transition-colors">{salon.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-accent shrink-0" size={16} />
                <a href={`mailto:${salon.email || 'hello@pihumakeover.com'}`} className="hover:text-white transition-colors">{salon.email || 'hello@pihumakeover.com'}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-6">Newsletter</h4>
            <p className="text-muted text-sm mb-4">Subscribe to get the latest beauty updates and news.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-secondary border border-divider-strong rounded px-4 py-3 text-sm text-content focus:outline-none focus:border-gold-500 w-full"
              />
              <button className="bg-accent hover:bg-gold-600 text-primary font-bold uppercase tracking-widest text-sm px-4 py-3 rounded transition-colors w-full">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-divider pt-8 text-center text-muted text-xs">
          <p>© {new Date().getFullYear()} {salon.name}. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Modals & Floating CTAs */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        salonId={salon.id}
        salonName={salon.name}
      />
      <CallTrackingModal 
        isOpen={isCallTrackingOpen} 
        onClose={() => setIsCallTrackingOpen(false)} 
        salonName={salon?.name} 
        salonPhone={salon?.phone} 
        salonId={salon?.id} 
      />
      
      {/* Floating WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-40">
         <a href={`https://wa.me/${salon?.phone?.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(salon?.name || 'Salon')}!%20I%20would%20like%20to%20book%20a%20consultation.`} 
            target="_blank" rel="noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-content p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center group relative">
            <MessageCircle size={28} fill="currentColor" />
            <span className="absolute right-full mr-4 bg-secondary text-content text-xs font-bold px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-divider-strong">WhatsApp Us</span>
         </a>
      </div>

      {/* Blog Popup Modal */}
      {selectedBlogPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-secondary border border-accent-light rounded-2xl p-8 max-w-2xl w-full relative shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <button 
              onClick={() => setSelectedBlogPost(null)}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="flex items-center gap-2 text-xs text-accent font-bold uppercase tracking-wider mb-4">
              <CalendarCheck size={14} /> {selectedBlogPost.date}
            </div>
            <h2 className="text-3xl font-serif text-content mb-6 leading-tight">{selectedBlogPost.title}</h2>
            <p className="text-muted text-lg leading-relaxed mb-10">
              {selectedBlogPost.content}
            </p>
            <div className="bg-primary rounded-xl p-8 text-center border border-divider">
              <h3 className="text-xl font-serif text-content mb-4">Need Expert Beauty Advice?</h3>
              <p className="text-muted mb-6 text-sm">Our top stylists are ready to give you a free consultation tailored to your needs.</p>
              <button 
                onClick={() => {
                  setSelectedBlogPost(null);
                  setIsCallTrackingOpen(true);
                }}
                className="bg-accent hover:bg-white text-primary px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors rounded shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2 mx-auto"
              >
                <PhoneCall size={18} /> Call Us Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
});

export default PublicSalonPage;
