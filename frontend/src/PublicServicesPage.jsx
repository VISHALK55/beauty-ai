import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Search, Menu, X, MessageCircle, Mail } from 'lucide-react';

const salon = {
  id: "pihu-makeover",
  name: "Pihu Makeover",
  city: "Gaya, Bihar 824231",
  streetAddress: "Sujata Bypass Road, Near Govt. Middle School Rajapur, Bodhgaya",
  phone: "+91 9113715558",
  email: "pihumakeover@gmail.com",
  instagram: "https://www.instagram.com/pihu_makeover22?igsh=ODZqc3U0M2JsY3pt",
};

const PublicServicesPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const whatsappLink = `https://wa.me/${salon.phone.replace(/\D/g, '')}?text=Hi!%20I'm%20interested%20in%20your%20services.`;

  return (
    <div className="min-h-screen bg-[#1c080b] text-white font-sans selection:bg-gold-500/30">
      <Helmet>
        <title>Our Luxury Services | Pihu Makeover</title>
        <meta name="description" content="Explore our luxury bridal, hair, skin, and nail services at Pihu Makeover in Bodhgaya." />
      </Helmet>

      {/* --- TOP BAR --- */}
      <div className="bg-[#1a0a0a] border-b border-white/5 py-2 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Clock size={14} className="text-gold-500" /> MON – SUN: 9.00 AM–9.00 PM
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-gold-500 transition-colors font-bold tracking-wider">FB</a>
          <a href="#" className="hover:text-gold-500 transition-colors font-bold tracking-wider">YT</a>
          <a href={salon.instagram} target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors font-bold tracking-wider">IG</a>
          <button className="bg-transparent border border-gold-500 text-gold-500 px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-dark-950 transition-colors">
            Enquire Now
          </button>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="bg-[#110505]/80 backdrop-blur-lg sticky top-0 z-50 border-b border-white/5 py-4 px-4 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-serif text-gold-500 font-bold uppercase tracking-wide">
          {salon.name}
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-300">
          <Link to="/" className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Home</Link>
          <Link to="/services" className="text-gold-500 border-b-2 border-gold-500 pb-1">Services</Link>
          <Link to="/academy" className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Academy</Link>
          <Link to="/blog" className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Blog</Link>
          <Link to="/contact" className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Search size={20} className="text-gray-300 hover:text-gold-500 cursor-pointer transition-colors" />
          <Menu size={24} className="lg:hidden text-gray-300 hover:text-gold-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#110505]/98 backdrop-blur-md z-[60] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex justify-between items-center p-4 border-b border-white/5">
          <div className="text-xl font-serif text-gold-500 font-bold uppercase tracking-wide">{salon.name}</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-gold-500"><X size={28} /></button>
        </div>
        <div className="p-4 flex flex-col gap-6 text-lg font-bold uppercase tracking-widest text-gray-300">
          <Link to="/" className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" className="text-gold-500" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/academy" className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Academy</Link>
          <Link to="/blog" className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to="/contact" className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/gallery/services_hero.png" 
            alt="Luxury Salon Interior" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110505]/80 via-[#1c080b]/90 to-[#1c080b]"></div>
        </div>

        <div className="relative z-10 max-w-5xl px-6">
          <div className="inline-block border border-gold-500/50 rounded-full px-6 py-2 mb-8 bg-black/30 backdrop-blur-sm">
            <span className="text-gold-500 font-bold tracking-[0.2em] text-sm flex items-center gap-2">
              <span className="text-lg leading-none">✦</span> EXQUISITE INDULGENCE
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Our Luxury <span className="text-gold-500 italic">Services</span>
          </h1>
          
          <div className="text-gray-300 tracking-[0.3em] text-sm md:text-base mb-16 uppercase">
            Bridal • Hair • Skin • Essentials • Nails
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-left border-t border-white/10 pt-10">
            <div>
              <div className="text-3xl font-serif font-bold text-gold-500 mb-2">5+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Service Categories</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-gold-500 mb-2">50+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Premium Treatments</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-gold-500 mb-2">200+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Local Target Areas</div>
            </div>
            <div>
              <div className="text-3xl font-serif font-bold text-gold-500 mb-2">1000+</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- LOCAL SEO & SEARCH SECTION --- */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Find Beauty Services <span className="text-gold-500 italic">Near You</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Serving Bodhgaya, AP Colony Gaya, Delha, Manpur, Swarajpuri Road, Chand Chaura, Rampur, and all major areas in Gaya District.
          </p>
          <div className="w-16 h-px bg-gold-500/50 mx-auto mt-6"></div>
        </div>

        {/* Search Inputs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 bg-[#150608] border border-white/10 rounded-full flex items-center px-6 py-4">
            <Search className="text-gray-500 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Search service or area (e.g. Keratin Gaya, Bridal AP Colony)..." 
              className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600"
            />
          </div>
          <div className="md:w-1/3 bg-[#150608] border border-white/10 rounded-full flex items-center px-6 py-4">
            <MapPin className="text-gray-500 mr-3" size={20} />
            <select className="bg-transparent border-none outline-none text-white w-full appearance-none cursor-pointer">
              <option className="bg-[#150608]">All Gaya & Bodhgaya Localities</option>
              <option className="bg-[#150608]">Bodhgaya</option>
              <option className="bg-[#150608]">Gaya City</option>
            </select>
          </div>
        </div>

        {/* Popular Neighborhoods */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <span className="text-gold-500 font-bold text-sm mr-2">Popular Neighborhoods:</span>
          <span className="bg-gold-500 text-dark-950 px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer">All Locations</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 Bodhgaya</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 AP Colony</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 Delha</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 Manpur</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 Swarajpuri Road</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 Chand Chaura</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 Rampur</span>
          <span className="border border-white/10 hover:border-gold-500/50 text-gray-300 hover:text-gold-500 px-4 py-1.5 rounded-full text-xs cursor-pointer transition-colors">📍 Station Road</span>
        </div>

        {/* Tag Cloud */}
        <div className="bg-[#240a10] border border-white/5 rounded-2xl p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 text-sm">Showing <strong>240</strong> localized service searches in Gaya & Bodhgaya:</span>
            <span className="text-gold-500 text-xs">Showing top selections</span>
          </div>
          
          <div className="flex flex-wrap gap-3 max-h-[160px] overflow-y-auto custom-scrollbar relative pr-2">
            {[
              "Bridal makeup near me", "Best bridal makeup artist near me", "HD bridal makeup near me in Gaya", "Airbrush makeup artist near me Bodhgaya",
              "Bridal beauty parlor near me AP Colony", "Makeup studio near me in Gaya city", "Engagement makeup artist near me",
              "Party makeup near me Swarajpuri Road", "Haldi function makeup artist near me", "Mehndi makeup artist near me Delha",
              "Pre bridal beauty packages near me", "Saree draping artist near me", "Bridal mehandi artist near me", "Huda beauty bridal makeup near me",
              "MAC makeup bridal studio near me", "Bobby Brown base bridal makeup near me", "Muslim bridal makeup artist near me",
              "South Indian bridal makeup artist near me", "Reception makeup artist near me Gaya", "Pro wedding shoot makeup near me",
              "Low cost bridal makeup near me Bodhgaya", "Luxury bridal makeover studio near me",
              "Bridal hair styling and draping near me", "Bridal makeup near Mahabodhi Temple", "Bridal makeup near Gaya Railway Station",
              "Bridal parlour near AP Colony park", "Bridal makeup artist near Swarajpuri Road", "Bridal makeup studio near Delha overbridge",
              "Bridal makeup parlour near Manpur Patwatoli", "Waterproof bridal makeup near me", "Glass skin bridal makeup near me",
              "Celebrity saree draping near me", "Bridal glow skin facial near me", "Bridal hair bun style near me",
              "Bridal makeup price near me in Gaya", "Bridal makeover packages near me", "Top 10 bridal makeup artist near me",
              "Famous makeup parlour near me in Gaya", "Professional makeup studio near me", "Cosmetology makeup academy near me",
              "Best bridal makeup artist in Bodhgaya", "HD bridal makeup AP Colony Gaya", "Airbrush bridal makeup Swarajpuri Road Gaya",
              "Top wedding makeup studio Delha Gaya", "Bridal beauty parlor Manpur Gaya"
            ].map((tag, idx) => (
              <span key={idx} className="bg-[#150608] border border-white/5 text-gray-300 hover:text-white hover:border-gold-500/30 px-4 py-2 rounded-full text-xs cursor-pointer transition-colors flex items-center gap-2">
                <span className="text-gold-500/50 text-[10px]">⊙</span> {tag}
              </span>
            ))}
            
            {/* Scroll indicator overlay */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-gold-500/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* --- SERVICES GRID --- */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Column 1 */}
          <div className="bg-[#180709] border border-gold-500/20 rounded-2xl p-6 flex flex-col shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-gold-500 font-serif text-xl italic">01</span>
              <h3 className="text-xl font-serif text-white font-bold">Bridal Makeup</h3>
            </div>
            
            <ul className="space-y-6 flex-grow">
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">HD Bridal Makeup</span>
                </div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">HD Bridal Makeup</span>
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-gold-500/30 text-gold-500 text-[9px] font-bold tracking-widest px-2 py-1 rounded w-max">WITH BOBBY BROWN BASE</div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">Huda Beauty Signature Makeup</span>
                </div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">Air Brush Premium Bridal Makeup</span>
                </div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">Normal Bridal Makeup</span>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 flex gap-3 pt-6 border-t border-white/5">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <MessageCircle size={16} /> WHATSAPP
              </a>
              <a href={`tel:${salon.phone}`} className="flex-1 bg-transparent border border-gold-500/50 hover:bg-gold-500 hover:text-dark-950 text-gold-500 rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <Phone size={16} /> CALL
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="bg-[#180709] border border-gold-500/50 rounded-2xl p-6 flex flex-col shadow-[0_0_30px_rgba(212,175,55,0.1)] relative transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50 rounded-t-2xl"></div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-gold-500 font-serif text-xl italic">02</span>
              <h3 className="text-xl font-serif text-gold-400 font-bold leading-tight">Ceremony & Party<br/>Makeup</h3>
            </div>
            
            <ul className="space-y-6 flex-grow">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-200">Pro Wedding Shoot Makeup</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-200">HD Engagement Makeup</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-200">Engagement Makeup</span>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">Classic Party Makeup</span>
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-gold-500/30 text-gold-500 text-[9px] font-bold tracking-widest px-2 py-1 rounded w-max">+ HAIR DRAPING</div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">Premium Party Makeup</span>
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-gold-500/30 text-gold-500 text-[9px] font-bold tracking-widest px-2 py-1 rounded w-max">+ HAIR DRAPING</div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">Haldi Ceremony Special</span>
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-gold-500/30 text-gold-500 text-[9px] font-bold tracking-widest px-2 py-1 rounded w-max">+ HAIR DO</div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-200">Mehandi Ceremony Special</span>
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-gold-500/30 text-gold-500 text-[9px] font-bold tracking-widest px-2 py-1 rounded w-max">+ HAIR DO & DRAPING</div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-200">Normal & Celebrity Style Saree Draping</span>
              </li>
            </ul>
            
            <div className="mt-8 flex gap-3 pt-6 border-t border-white/5">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <MessageCircle size={16} /> WHATSAPP
              </a>
              <a href={`tel:${salon.phone}`} className="flex-1 bg-transparent border border-gold-500 hover:bg-gold-500 hover:text-dark-950 text-gold-500 rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <Phone size={16} /> CALL
              </a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="bg-[#180709] border border-gold-500/20 rounded-2xl p-6 flex flex-col shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-gold-500 font-serif text-xl italic">03</span>
              <h3 className="text-xl font-serif text-white font-bold leading-tight">Pre-Bridal Packages</h3>
            </div>
            
            <ul className="space-y-8 flex-grow">
              <li className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gold-400 font-bold">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0"></div>
                  Silver Package
                </div>
                <div className="flex flex-wrap gap-2 ml-3.5">
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Threading</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Classic Facial</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Full Hand Wax</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Full Leg Wax</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Hair Cut</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Hair Spa</span>
                </div>
              </li>
              
              <li className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gold-400 font-bold">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0"></div>
                  Gold Package
                </div>
                <div className="flex flex-wrap gap-2 ml-3.5">
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Threading</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Classic Facial</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Full Hand Wax</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Full Leg Manicure</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Hair Spa</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Body Polishing</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Hair Cut</span>
                </div>
              </li>

              <li className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gold-400 font-bold">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shrink-0"></div>
                  Diamond Package
                </div>
                <div className="flex flex-wrap gap-2 ml-3.5">
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Threading</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">O3+ Bridal Facial</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">De-tan Full Body Wax</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Body Polishing</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Advance Hair Cut</span>
                  <span className="border border-white/20 text-gray-400 text-[10px] px-2 py-1 rounded">Mani & Pedi</span>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 flex gap-3 pt-6 border-t border-white/5">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <MessageCircle size={16} /> WHATSAPP
              </a>
              <a href={`tel:${salon.phone}`} className="flex-1 bg-transparent border border-gold-500/50 hover:bg-gold-500 hover:text-dark-950 text-gold-500 rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <Phone size={16} /> CALL
              </a>
            </div>
          </div>

          {/* Column 4 */}
          <div className="bg-[#180709] border border-gold-500/20 rounded-2xl p-6 flex flex-col shadow-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-gold-500 font-serif text-xl italic">04</span>
              <h3 className="text-xl font-serif text-white font-bold leading-tight">Mehandi Art</h3>
            </div>
            
            <ul className="space-y-6 flex-grow">
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2 font-bold text-gray-200">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  Arabic Design
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-white/10 text-gray-400 text-[10px] px-2 py-1 rounded w-max">Front & Back Both Hands</div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2 font-bold text-gray-200">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  Mandala Design
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-white/10 text-gray-400 text-[10px] px-2 py-1 rounded w-max">Both Hands Front & Back</div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2 font-bold text-gray-200">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  Normal Bridal Mehandi
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-white/10 text-gray-400 text-[10px] px-2 py-1 rounded w-max">Hand & Foot</div>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-start gap-2 font-bold text-gray-200">
                  <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 shrink-0"></div>
                  Advance Bridal Mehandi
                </div>
                <div className="ml-3.5 bg-[#2a0e14] border border-white/10 text-gray-400 text-[10px] px-2 py-1 rounded w-max">Hand & Foot</div>
              </li>
            </ul>
            
            <div className="mt-8 flex gap-3 pt-6 border-t border-white/5">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <MessageCircle size={16} /> WHATSAPP
              </a>
              <a href={`tel:${salon.phone}`} className="flex-1 bg-transparent border border-gold-500/50 hover:bg-gold-500 hover:text-dark-950 text-gold-500 rounded py-2.5 flex justify-center items-center gap-2 font-bold text-xs tracking-wider transition-colors">
                <Phone size={16} /> CALL
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0a0404] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-serif text-gold-500 font-bold uppercase tracking-wide mb-6">
              {salon.name}
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Premium salon and academy providing expert hair, makeup, and skin care services along with certified professional courses.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">FB</a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">YT</a>
              <a href={salon.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">IG</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Our Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Bridal Makeup</span></li>
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Ceremony & Party Makeup</span></li>
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Pre-Bridal Packages</span></li>
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Mehandi Art</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold-500 shrink-0 mt-0.5" size={16} />
                <span>{salon.streetAddress}, {salon.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold-500 shrink-0" size={16} />
                <a href={`tel:${salon.phone}`} className="hover:text-white transition-colors">{salon.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold-500 shrink-0" size={16} />
                <a href={`mailto:${salon.email}`} className="hover:text-white transition-colors">{salon.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest updates on offers and services.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-dark-900 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 w-full"
              />
              <button className="bg-gold-500 hover:bg-gold-600 text-dark-950 font-bold uppercase tracking-widest text-sm px-4 py-3 rounded transition-colors w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} {salon.name}. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicServicesPage;
