import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Search, Menu, X, Mail, PhoneCall } from 'lucide-react';
import { useSalon } from './context/SalonContext';
// Removed hardcoded salon object

const PublicContactPage = () => {
  const { salon } = useSalon();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary text-content font-sans selection:bg-gold-500/30">
      <Helmet>
        <title>Contact Us | {salon.name}</title>
        <meta name="description" content={`Contact ${salon.name} in ${salon.city} for luxury salon treatments, bridal makeup bookings, and professional cosmetology courses.`} />
      </Helmet>

      {/* --- TOP BAR --- */}
      <div className="bg-[#1a0a0a] border-b border-divider py-2 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-muted gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Clock size={14} className="text-accent" /> MON – SUN: 9.00 AM–9.00 PM
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-gold-500 transition-colors font-bold tracking-wider">FB</a>
          <a href="#" className="hover:text-gold-500 transition-colors font-bold tracking-wider">YT</a>
          <a href={salon.instagram} target="_blank" rel="noreferrer" className="hover:text-gold-500 transition-colors font-bold tracking-wider">IG</a>
          <button className="bg-transparent border border-accent text-accent px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-dark-950 transition-colors">
            Enquire Now
          </button>
        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="bg-dark-950/80 backdrop-blur-lg sticky top-0 z-50 border-b border-divider py-4 px-4 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-serif text-accent font-bold uppercase tracking-wide">
          {salon.name}
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted">
          <Link to={`/s/${salon.id}`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Home</Link>
          <Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Services</Link>
          <Link to={`/s/${salon.id}/academy`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Academy</Link>
          <Link to={`/s/${salon.id}/blog`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="text-accent border-b-2 border-accent pb-1">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden lg:flex items-center text-xs font-bold uppercase tracking-widest text-accent border border-accent-light px-4 py-1.5 rounded-full hover:bg-gold-500 hover:text-dark-950 transition-colors">Admin</Link>`r`n          <Search size={20} className="text-muted hover:text-gold-500 cursor-pointer transition-colors" />
          <Menu size={24} className="lg:hidden text-muted hover:text-gold-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-dark-950/98 backdrop-blur-md z-[60] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex justify-between items-center p-4 border-b border-divider">
          <div className="text-xl font-serif text-accent font-bold uppercase tracking-wide">{salon.name}</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-muted hover:text-gold-500"><X size={28} /></button>
        </div>
        <div className="p-4 flex flex-col gap-6 text-lg font-bold uppercase tracking-widest text-muted">
          <Link to={`/s/${salon.id}`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to={`/s/${salon.id}/academy`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Academy</Link>
          <Link to={`/s/${salon.id}/blog`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="text-accent" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>`r`n          <Link to="/login" className="text-accent border border-accent-light text-center py-3 rounded-xl mt-4" onClick={() => setIsMobileMenuOpen(false)}>ADMIN LOGIN</Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full py-32 flex flex-col items-start justify-center text-left overflow-hidden px-6 md:px-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/gallery/contact_hero.png" 
            alt="Contact Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-dark-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-dark-950/50"></div>
        </div>

        <div className="relative z-10 max-w-4xl pt-10">
          <div className="text-accent font-bold tracking-[0.3em] text-sm md:text-base mb-4 uppercase">
            REACH OUT
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-content leading-tight">
            Contact <span className="text-accent italic">Us</span>
          </h1>
        </div>
      </div>

      {/* --- CONTENT & FORM SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-divider">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="flex flex-col">
            <div className="text-accent font-bold tracking-[0.3em] text-xs mb-4 uppercase">
              ELITE LOUNGE
            </div>
            <h2 className="text-4xl font-serif text-content mb-6">
              {salon.name} Studio
            </h2>
            <p className="text-muted text-sm leading-relaxed mb-12 max-w-md">
              Experience premium luxury salon treatments & professional cosmetology courses. 
              Connect with our admission coordinators and bridal booking specialists today.
            </p>

            <div className="space-y-12">
              {/* Address */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-divider-strong flex items-center justify-center shrink-0">
                  <MapPin className="text-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-3">Our Address</h4>
                  <p className="text-muted text-sm leading-relaxed max-w-xs">
                    {salon.streetAddress}, <br />
                    {salon.city}
                  </p>
                </div>
              </div>

              {/* Support & Phones */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-divider-strong flex items-center justify-center shrink-0">
                  <PhoneCall className="text-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-3">Booking & Admissions Support</h4>
                  <p className="text-muted text-lg mb-6">{salon.phone}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href={`tel:${salon.phone}`} className="bg-[#8B0000] hover:bg-[#a50000] text-content font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                      <Phone size={14} /> CALL NOW
                    </a>
                    <a href={`https://wa.me/${salon.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(salon.name)}!%20I%20would%20like%20to%20book%20a%20consultation.`} target="_blank" rel="noreferrer" className="bg-green-800 hover:bg-green-700 text-content font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full transition-colors border border-green-700 flex items-center justify-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                      WHATSAPP
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-divider-strong flex items-center justify-center shrink-0">
                  <Mail className="text-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-3">Email Inquiries</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    {salon.email}
                  </p>
                </div>
              </div>
              
              {/* Hours */}
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-divider-strong flex items-center justify-center shrink-0">
                  <Clock className="text-accent" size={20} />
                </div>
                <div>
                  <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-3">Opening Hours</h4>
                  <p className="text-muted text-sm leading-relaxed">
                    MON - SUN: 9.00 AM - 9.00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="absolute inset-0 border border-gold-500/20 rounded-2xl md:-ml-8 md:mt-8 pointer-events-none hidden md:block"></div>
            <div className="bg-primary border border-divider-strong rounded-2xl p-8 md:p-12 relative z-10 shadow-2xl">
              <h3 className="text-3xl font-serif text-content mb-10">BOOK YOUR CONSULTATION</h3>
              
              <form className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="relative border-b border-divider-strong">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest absolute -top-4 left-0">Full Name</label>
                    <input type="text" className="w-full bg-transparent border-none outline-none text-content py-2" />
                  </div>
                  <div className="relative border-b border-divider-strong">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest absolute -top-4 left-0">Phone Number</label>
                    <input type="tel" className="w-full bg-transparent border-none outline-none text-content py-2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="relative border-b border-divider-strong">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest absolute -top-4 left-0">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-none outline-none text-content py-2" />
                  </div>
                  <div className="relative border-b border-divider-strong">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest absolute -top-4 left-0">I'm Interested In</label>
                    <select className="w-full bg-transparent border-none outline-none text-content py-2 appearance-none cursor-pointer">
                      <option className="bg-primary"></option>
                      <option className="bg-primary">Bridal Makeup Package</option>
                      <option className="bg-primary">Pre-Bridal Treatment</option>
                      <option className="bg-primary">Academy Admission</option>
                      <option className="bg-primary">General Salon Service</option>
                    </select>
                  </div>
                </div>

                <div className="relative border-b border-divider-strong pt-6">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest absolute top-2 left-0">Special Notes / Bridal Wedding Date</label>
                  <textarea rows="3" className="w-full bg-transparent border-none outline-none text-content py-2 resize-none mt-2"></textarea>
                </div>

                <div className="pt-4">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-start justify-center">
                      <input type="checkbox" className="w-5 h-5 appearance-none border border-white/30 rounded-sm bg-transparent checked:bg-gold-500 checked:border-gold-500 transition-colors cursor-pointer" />
                      <div className="absolute top-1 pointer-events-none opacity-0 group-has-[:checked]:opacity-100">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest leading-relaxed">
                      I AGREE TO SEND THESE DETAILS THROUGH WHATSAPP AND HAVE READ THE <span className="text-accent border-b border-accent-light">PRIVACY POLICY</span>.
                    </span>
                  </label>
                </div>

                <button type="button" className="w-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-primary font-bold uppercase tracking-widest text-sm py-4 rounded hover:opacity-90 transition-opacity">
                  SUBMIT LUXURY REQUEST
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* --- MAP SECTION --- */}
      <div className="w-full py-20 bg-[#1a0a0a]">
        <div className="text-center mb-12">
          <div className="text-accent font-bold tracking-[0.3em] text-xs mb-4 uppercase">
            LOCATION MAP
          </div>
          <h2 className="text-4xl font-serif text-content mb-6">
            Find Us in {salon.city?.split(',')[0]}
          </h2>
          <div className="w-16 h-px bg-gold-500/50 mx-auto"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 h-[400px]">
          {/* Embedding a standard Google Map iframe for Bodhgaya */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14457.754716772703!2d84.98188165!3d24.70014045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32c510b642a8b%3A0xd689ba6e8b79b2!2sBodh%20Gaya%2C%20Bihar!5e0!3m2!1sen!2sin!4v1707920108381!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '1rem', filter: 'grayscale(0.2) contrast(1.2)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-primary border-t border-divider pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="text-3xl font-serif text-accent font-bold uppercase tracking-wide mb-6">
              {salon.name}
            </div>
            <p className="text-muted text-sm mb-6 leading-relaxed">
              Premium salon and academy providing expert hair, makeup, and skin care services along with certified professional courses.
            </p>
            <div className="flex items-center gap-4 text-muted">
              <a href="#" className="w-10 h-10 rounded-full border border-divider-strong flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">FB</a>
              <a href="#" className="w-10 h-10 rounded-full border border-divider-strong flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">YT</a>
              <a href={salon.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-divider-strong flex items-center justify-center hover:bg-gold-500 hover:text-dark-950 transition-colors font-bold text-xs">IG</a>
            </div>
          </div>

          <div>
            <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-6">Our Services</h4>
            <ul className="space-y-3 text-muted text-sm">
              <li><Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors">Bridal Makeup</Link></li>
              <li><Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors">Ceremony & Party Makeup</Link></li>
              <li><Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors">Pre-Bridal Packages</Link></li>
              <li><Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors">Mehandi Art</Link></li>
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
            <p className="text-muted text-sm mb-4">Subscribe to get the latest beauty updates and offers.</p>
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
    </div>
  );
};

export default PublicContactPage;
