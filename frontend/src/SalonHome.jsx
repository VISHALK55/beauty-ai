import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Star, Clock, CalendarCheck, ChevronRight, ShieldCheck, Sparkles, Navigation, MessageCircle, PhoneCall, CheckCircle2, Gift, Search, Menu, Mail, Heart, X } from 'lucide-react';
import BookingModal from './BookingModal';
import CallTrackingModal from './CallTrackingModal';
import { useSalon } from './context/SalonContext';

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

const allServices = [
  { title: "Acne treatments", img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600" },
  { title: "Acrylic nails", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?auto=format&fit=crop&q=80&w=600" },
  { title: "Balayage", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600" },
  { title: "Blow dry", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600" },
  { title: "Body waxing", img: "https://images.unsplash.com/photo-1552693673-1bf275ce33c6?auto=format&fit=crop&q=80&w=600" },
  { title: "Box braids", img: "https://images.unsplash.com/photo-1605980776564-07d3910c2cde?auto=format&fit=crop&q=80&w=600" },
  { title: "Braids", img: "https://images.unsplash.com/photo-1564245642054-9a40552bbaaa?auto=format&fit=crop&q=80&w=600" },
  { title: "Bridal services", img: "/services/bridal_makeup.png" },
  { title: "Brow lamination", img: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=600" },
  { title: "Dreadlocks", img: "https://images.unsplash.com/photo-1596499876569-4e8c148fc286?auto=format&fit=crop&q=80&w=600" },
  { title: "Eyebrow beautification", img: "https://images.unsplash.com/photo-1518146747223-936d5952f9ce?auto=format&fit=crop&q=80&w=600" },
  { title: "Eyebrow shaping", img: "https://images.unsplash.com/photo-1512413914441-28562d515a6b?auto=format&fit=crop&q=80&w=600" },
  { title: "Eyebrow threading", img: "https://images.unsplash.com/photo-1512140411802-535359e99214?auto=format&fit=crop&q=80&w=600" },
  { title: "Eyelash extensions", img: "https://images.unsplash.com/photo-1587778082149-bd5b1130ba46?auto=format&fit=crop&q=80&w=600" },
  { title: "Facials", img: "/services/skin_care.png" },
  { title: "Haircut", img: "/services/haircut_style.png" },
  { title: "Hair extensions", img: "https://images.unsplash.com/photo-1600537025211-1a89b35b62b7?auto=format&fit=crop&q=80&w=600" },
  { title: "Hairstyling", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600" },
  { title: "Hair threading", img: "https://images.unsplash.com/photo-1512140411802-535359e99214?auto=format&fit=crop&q=80&w=600" },
  { title: "Laser hair removal", img: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=600" },
  { title: "Lash lift", img: "https://images.unsplash.com/photo-1587778082149-bd5b1130ba46?auto=format&fit=crop&q=80&w=600" },
  { title: "Lash perms", img: "https://images.unsplash.com/photo-1587778082149-bd5b1130ba46?auto=format&fit=crop&q=80&w=600" },
  { title: "Make-up", img: "https://images.unsplash.com/photo-1596462502278-27bf85040462?auto=format&fit=crop&q=80&w=600" },
  { title: "Manicure", img: "https://images.unsplash.com/photo-1519014816548-bf5fe059c98b?auto=format&fit=crop&q=80&w=600" },
  { title: "Pedicure", img: "/services/nail_art.png" },
  { title: "Permanent hair removal", img: "https://images.unsplash.com/photo-1552693673-1bf275ce33c6?auto=format&fit=crop&q=80&w=600" }
];

// Removed hardcoded salon object

const SalonHome = () => {
  const { salon } = useSalon();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState(null);
  
  const openBooking = (serviceName = null) => {
    setPreselectedService(serviceName);
    setIsBookingModalOpen(true);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isCallTrackingOpen, setIsCallTrackingOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  return (
    <div className="min-h-screen bg-primary text-content font-sans selection:bg-gold-500/30">
      <Helmet>
        <title>{salon.name} | Best Salon in {salon.city}</title>
        <meta name="description" content={`Book your appointment at ${salon.name}, premium beauty salon for bridal makeup, hair care, and skin treatments.`} />
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
          <a href={salon.instagram} target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors font-bold tracking-wider">IG</a>
          <button 
            onClick={() => openBooking()}
            className="bg-accent text-primary px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="bg-dark-950/95 backdrop-blur-lg sticky top-0 z-50 border-b border-divider py-4 px-4 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-serif text-accent font-bold uppercase tracking-wide">
          {salon.name}
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted">
          <Link to={`/s/${salon.id}`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Home</Link>
          <Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Services</Link>
          <Link to={`/s/${salon.id}/academy`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Academy</Link>
          <Link to={`/s/${salon.id}/blog`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden lg:flex items-center text-xs font-bold uppercase tracking-widest text-accent border border-accent-light px-4 py-1.5 rounded-full hover:bg-gold-500 hover:text-dark-950 transition-colors">
            Admin
          </Link>
          <Search size={20} className="text-muted hover:text-gold-500 cursor-pointer transition-colors" />
          <Menu size={24} className="lg:hidden text-muted hover:text-gold-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-dark-950/95 backdrop-blur-md z-[60] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex justify-between items-center p-4 border-b border-divider">
          <div className="text-xl font-serif text-accent font-bold uppercase tracking-wide">{salon.name}</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-muted hover:text-gold-500"><X size={28} /></button>
        </div>
        <div className="p-4 flex flex-col gap-6 text-lg font-bold uppercase tracking-widest text-muted overflow-y-auto max-h-[calc(100vh-70px)] custom-scrollbar">
          <Link to={`/s/${salon.id}`} className="hover:text-gold-500 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to={`/s/${salon.id}/academy`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Academy</Link>
          <Link to={`/s/${salon.id}/blog`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/login" className="text-accent border border-accent-light text-center py-3 rounded-xl mt-4" onClick={() => setIsMobileMenuOpen(false)}>ADMIN LOGIN</Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden bg-primary py-12 md:py-0">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-transparent z-10 md:hidden"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text */}
          <div className="relative z-20">
            <div className="inline-block px-3 py-1 bg-accent-light text-accent border border-accent-light rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} className="inline mr-2" />
              Top Salon in {salon.city?.split(',')[0]}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-content mb-4 leading-tight">
              Premium <span className="text-accent">Beauty Salon & Academy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted mb-8 max-w-xl font-light">
              Professional salon service tailored to your beauty needs. Transform your look with our expert stylists today.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={salon.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 text-content px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> For more details visit here
              </a>
              <a 
                href={`tel:${salon.phone}`}
                className="bg-transparent border border-white hover:border-gold-500 hover:text-gold-500 text-content px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors rounded flex items-center gap-2"
              >
                <Phone size={18} /> Call Now
              </a>
              <a 
                href={`https://wa.me/${salon.phone?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors rounded flex items-center gap-2"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold-500/20 transform md:scale-105 mt-12 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent z-10"></div>
            <img src={salon.heroImage || salon.image || "/gallery/owner.jpg"} className="w-full h-[400px] md:h-[600px] object-cover" alt={`${salon.name} Hero`} />
            <div className="absolute bottom-6 left-6 z-20 text-accent font-serif text-2xl bg-dark-950/80 px-4 py-2 rounded-lg border border-gold-500/20 backdrop-blur">
              Award Winning Service
            </div>
          </div>
          
        </div>
      </div>

      {/* --- OUR SERVICES CATEGORIES --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 pb-0" id="services">
        <div className="text-center mb-16">
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif text-content mb-4">Our Premium Services</h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">Indulge in our luxurious beauty and styling categories tailored for your perfection.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Bridal Makeup", img: "/services/bridal_makeup.png", link: "/salon/pihu-makeover/bridal-makeup" },
            { title: "Haircut Style", img: "/services/haircut_style.png", link: "/salon/pihu-makeover/haircut-styling" },
            { title: "Skin Care Services", img: "/services/skin_care.png", link: "/salon/pihu-makeover/facial-skincare" },
            { title: "Nail Art Services", img: "/services/nail_art.png", link: "/salon/pihu-makeover/nails" },
          ].map((srv, idx) => (
            <div onClick={() => openBooking(srv.title)} key={idx} className="group block relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-secondary border border-divider hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-72 overflow-hidden">
                <img src={srv.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={srv.title} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-dark-950/60 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full flex items-center justify-between z-10">
                <h3 className="text-xl font-serif text-content font-bold tracking-wide leading-tight group-hover:text-gold-400 transition-colors">{srv.title}</h3>
                <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-accent group-hover:bg-gold-500 group-hover:text-dark-950 transition-colors shrink-0">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* --- BRANDS WE USE --- */}
        <div className="mb-24 py-12 border-y border-divider text-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-8">Premium Brands We Trust</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
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
            {(salon.galleryImages && salon.galleryImages.length > 0 ? salon.galleryImages : ['/gallery/gallery_1.jpg', '/gallery/gallery_2.jpg', '/gallery/gallery_3.jpg', '/gallery/gallery_4.jpg']).map((imgSrc, idx) => (
              <div key={idx} className="relative group overflow-hidden cursor-pointer rounded-xl" onClick={() => openBooking('Bridal Makeup')}>
                <img src={imgSrc} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 bg-tertiary" alt={`${salon.name} Portfolio ${idx + 1}`} />
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
                  <img src={`/gallery/gallery_${idx + 1}.jpg`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Blog cover" />
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

      {/* --- FOOTER --- */}
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
              <a href={salon.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-divider-strong flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">IG</a>
            </div>
          </div>

          <div>
            <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-6">Best Services</h4>
            <ul className="space-y-3 text-muted text-sm">
              <li><span onClick={() => openBooking('Haircut Style')} className="hover:text-gold-500 transition-colors cursor-pointer">Haircut Style</span></li>
              <li><span onClick={() => openBooking('Bridal Makeup')} className="hover:text-gold-500 transition-colors cursor-pointer">Bridal Makeup</span></li>
              <li><span onClick={() => openBooking('Skin Care Services')} className="hover:text-gold-500 transition-colors cursor-pointer">Skin Care Services</span></li>
              <li><span onClick={() => openBooking('Nail Art Services')} className="hover:text-gold-500 transition-colors cursor-pointer">Nail Art Services</span></li>
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
                <a href={`mailto:${salon.email}`} className="hover:text-white transition-colors">{salon.email}</a>
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

      {/* Modals */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} preselectedService={preselectedService} />
      <CallTrackingModal 
        isOpen={isCallTrackingOpen} 
        onClose={() => setIsCallTrackingOpen(false)} 
        salonName={salon.name} 
        salonPhone={salon.phone} 
        salonId={salon.id} 
      />
      
      {/* Floating WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-40">
         <a href={`https://wa.me/${salon.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(salon.name)}!%20I%20would%20like%20to%20book%20a%20consultation.`} 
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
              <a 
                href={`tel:${salon.phone}`}
                onClick={() => setSelectedBlogPost(null)}
                className="bg-accent hover:bg-white text-primary px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors rounded shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 mx-auto w-max"
              >
                <PhoneCall size={18} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonHome;
