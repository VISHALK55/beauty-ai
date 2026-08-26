import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, ChevronRight, Menu, Search, X, MessageCircle, Mail } from 'lucide-react';
import { useSalon } from './context/SalonContext';
// Removed hardcoded salon object

const Academy = () => {
  const { salon } = useSalon();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-primary text-content font-sans selection:bg-gold-500/30">
      <Helmet>
        <title>{salon.name} Academy | Certified Expert Makeup Courses</title>
        <meta name="description" content={`Join ${salon.name} Academy for professional makeup and cosmetology courses in ${salon.city?.split(',')[0]}.`} />
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
      <nav className="bg-dark-950/95 backdrop-blur-lg sticky top-0 z-50 border-b border-divider py-4 px-4 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-serif text-accent font-bold uppercase tracking-wide">
          {salon.name}
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted">
          <Link to={`/s/${salon.id}`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Home</Link>
          <Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent pb-1">Services</Link>
          <Link to={`/s/${salon.id}/academy`} className="text-accent border-b-2 border-accent pb-1">Academy</Link>
          <Link to={`/s/${salon.id}/blog`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Contact</Link>
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
          <Link to={`/s/${salon.id}/academy`} className="text-accent" onClick={() => setIsMobileMenuOpen(false)}>Academy</Link>
          <Link to={`/s/${salon.id}/blog`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>`r`n          <Link to="/login" className="text-accent border border-accent-light text-center py-3 rounded-xl mt-4" onClick={() => setIsMobileMenuOpen(false)}>ADMIN LOGIN</Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 border-b border-divider">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent-light z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent-light z-0"></div>
            
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="/gallery/academy_bride.png" 
                alt="Academy Bride" 
                className="w-full h-auto object-cover opacity-90"
              />
              
              {/* Badges */}
              <div className="absolute top-8 right-0 bg-[#2a0e0e]/90 border border-accent-light text-content px-6 py-4 rounded-l-xl shadow-xl backdrop-blur-sm transform translate-x-2">
                <div className="text-xl font-bold font-serif text-accent leading-tight">Career</div>
                <div className="text-xs uppercase tracking-widest">Guidance &<br/>Support</div>
              </div>
              
              <div className="absolute bottom-8 left-0 bg-[#2a0e0e]/90 border border-accent-light text-content px-6 py-4 rounded-r-xl shadow-xl backdrop-blur-sm transform -translate-x-2">
                <div className="text-2xl font-bold font-serif text-content">500+</div>
                <div className="text-xs uppercase tracking-widest text-accent">Students<br/>Trained</div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-content mb-8 leading-tight">
              as a <span className="text-accent italic">Certified Expert</span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px bg-gold-500/30 flex-grow"></div>
              <div className="w-2 h-2 rotate-45 bg-accent"></div>
              <div className="h-px bg-gold-500/30 flex-grow"></div>
            </div>

            <p className="text-muted text-lg leading-relaxed mb-6">
              The beauty and wellness sector in India, especially in Bihar, is growing at an unprecedented pace. Pihu Makeover Academy provides the highest standard of cosmetology education in Bodhgaya.
            </p>
            <p className="text-muted text-base leading-relaxed mb-10">
              Our training modules bridge the gap between classroom theory and real salon operations. With international product kits, personalized mentoring, and portfolio development, we prepare you to excel from day one.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="border border-divider-strong rounded-xl p-4 text-center bg-white/5">
                <div className="text-2xl font-serif text-content font-bold mb-1">15+</div>
                <div className="text-[10px] uppercase tracking-widest text-accent">Years Experience</div>
              </div>
              <div className="border border-divider-strong rounded-xl p-4 text-center bg-white/5">
                <div className="text-2xl font-serif text-content font-bold mb-1">4</div>
                <div className="text-[10px] uppercase tracking-widest text-accent">Certification Courses</div>
              </div>
              <div className="border border-divider-strong rounded-xl p-4 text-center bg-white/5">
                <div className="text-2xl font-serif text-content font-bold mb-1">15</div>
                <div className="text-[10px] uppercase tracking-widest text-accent">Batch Size Limit</div>
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rotate-45 bg-accent mt-2 shrink-0"></div>
                <span className="text-muted">International product kits (MAC, Kryolan, Huda Beauty)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rotate-45 bg-accent mt-2 shrink-0"></div>
                <span className="text-muted">Live model practice in luxury studio setup</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rotate-45 bg-accent mt-2 shrink-0"></div>
                <span className="text-muted">Portfolio and salon opportunity guidance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rotate-45 bg-accent mt-2 shrink-0"></div>
                <span className="text-muted">Academy course-completion certificate</span>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href={`https://wa.me/${salon.phone.replace(/\D/g, '')}?text=Hi!%20I'm%20interested%20in%20joining%20the%20Academy.`} target="_blank" rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-content px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-colors shadow-lg">
                <MessageCircle size={20} /> WhatsApp Us
              </a>
              <a href={`tel:${salon.phone}`} className="bg-transparent border border-accent text-accent hover:bg-gold-500 hover:text-dark-950 px-8 py-3.5 rounded-full font-bold flex items-center gap-2 transition-colors">
                <Phone size={20} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- PROGRAMS SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Academic Modules</h3>
          <h2 className="text-4xl md:text-5xl font-serif text-content">
            Our Certification <span className="italic font-light text-muted">Programs</span>
          </h2>
          <div className="w-24 h-px bg-gold-500/50 mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* Card 1: Basic */}
          <div className="bg-[#1a0a0a] border border-gold-500/20 rounded-2xl p-8 flex flex-col hover:border-gold-500/50 transition-colors shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-4">
              <Clock size={14} /> 1 Month • Basic Course
            </div>
            <h3 className="text-2xl font-serif text-white mb-4 leading-tight uppercase">Basic Makeup<br/>Course</h3>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Ideal for personal grooming and beginners. Master basic makeup bases, professional hair setting (hairdo), and elegant draping layouts.
            </p>
            
            <div className="mb-6">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Syllabus Modules:</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Syllabus: Makeup, Hairdo & Draping</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Styles: Corporate Look & Self Makeup Look</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Occasions: Day & Night Looks, Haldi & Mehndi Looks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Bridal: Engagement Look & Classic Bridal Look</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Theory: Product Knowledge, Color Wheel & Skin Undertones</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <button className="bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/50 rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button className="bg-transparent border border-accent-light text-accent hover:bg-gold-500 hover:text-dark-950 rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors">
                <Phone size={18} /> Call Now
              </button>
            </div>
          </div>

          {/* Card 2: Advance */}
          <div className="bg-[#1a0a0a] border border-gold-500/20 rounded-2xl p-8 flex flex-col hover:border-gold-500/50 transition-colors shadow-xl relative">
            <div className="absolute -top-4 right-6 bg-gradient-to-r from-gold-600 to-accent-hover text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
              Most Popular
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-4 mt-2">
              <Clock size={14} /> 2 Months • Advance Course
            </div>
            <h3 className="text-2xl font-serif text-white mb-4 leading-tight uppercase">Advance Makeup<br/>Course</h3>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Advanced styling bridging basic to royal bridal makeup. Learn graphic liners, prosthetic FX, vitiligo correction, and regional bride aesthetics.
            </p>
            
            <div className="mb-6">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Syllabus Modules:</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Basic to Royal Bridal Makeup with Advanced Hair Draping</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Graphic Liner & Arabian Eyes Artistry</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Aesthetics: Muslim Bride & South Indian Bride Looks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Specialized: Vitiligo Skin Makeup & Corrective Bases</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Creative: Prosthetics, Fantasy & Stage Makeup</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <button className="bg-[#25D366] text-content hover:bg-[#20bd5a] rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_5px_15px_rgba(37,211,102,0.3)]">
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button className="bg-transparent border border-accent text-accent hover:bg-gold-500 hover:text-dark-950 rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors">
                <Phone size={18} /> Call Now
              </button>
            </div>
          </div>

          {/* Card 3: Masterclass */}
          <div className="bg-[#1a0a0a] border border-gold-500/20 rounded-2xl p-8 flex flex-col hover:border-gold-500/50 transition-colors shadow-xl relative mt-8 md:mt-0">
             <div className="absolute -top-4 right-6 bg-gradient-to-r from-gold-600 to-accent-hover text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
              Special Masterclass
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-4 mt-2">
              <Clock size={14} /> 15 Days • Master Class
            </div>
            <h3 className="text-2xl font-serif text-white mb-4 leading-tight uppercase">Master Class in<br/>Bridal Artistry</h3>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Super-specialized classes for professional makeup artists. Master airbrush techniques, heavy draping, and regional wedding styles.
            </p>
            
            <div className="mb-6">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Workshop Modules:</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>HD Bridal & Luxury Airbrush Machine Makeup</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Styling: Muslim Bride & South Indian Bride looks</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Complimentary: Expert Hairdo & Heavy Lehenga/Saree Draping</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span>Business Guidance & Portfolio Photo Sessions</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <button className="bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/50 rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button className="bg-transparent border border-accent-light text-accent hover:bg-gold-500 hover:text-dark-950 rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors">
                <Phone size={18} /> Call Now
              </button>
            </div>
          </div>

          {/* Card 4: Diploma */}
          <div className="bg-[#1a0a0a] border border-gold-500/20 rounded-2xl p-8 flex flex-col hover:border-gold-500/50 transition-colors shadow-xl relative mt-8 md:mt-0">
             <div className="absolute -top-4 right-6 bg-gradient-to-r from-gold-600 to-accent-hover text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
              Career Focused
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-4 mt-2">
              <Clock size={14} /> 6 Months • Diploma
            </div>
            <h3 className="text-2xl font-serif text-white mb-4 leading-tight uppercase">Cosmetology Diploma<br/>(COSMO COURSE)</h3>
            <p className="text-muted text-sm leading-relaxed mb-8">
              The ultimate all-in-one cosmetology career package covering professional makeup, advanced skin care, chemical hair treatments, and nail artistry.
            </p>
            
            <div className="mb-6">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">Diploma Curriculum:</h4>
              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span><strong>Makeup:</strong> Corporate, Self, Day/Night, Haldi/Mehndi, Engagement, Bridal, Glam, Classic, HD Bridal & Color Theory</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span><strong>Skin:</strong> Threading, Cleanup, De-tan, Facials, HydraFacial, Body Polishing, Manicure & Pedicure (Meni-Pedi)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span><strong>Hair:</strong> 10 Hair Cuts, Botox, Keratin, Smoothing, Global/Highlights/Balayage/Ombre Color & Science</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rotate-45 bg-accent mt-2 shrink-0"></div>
                  <span><strong>Nails:</strong> Acrylic, Builder/Poly Gel, Prep & 8 Nail Arts (Chrome, Cat Eye, Marble, Stone, Glitter, Dotting)</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <button className="bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/50 rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors">
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button className="bg-transparent border border-accent-light text-accent hover:bg-gold-500 hover:text-dark-950 rounded-full py-3 font-bold flex items-center justify-center gap-2 transition-colors">
                <Phone size={18} /> Call Now
              </button>
            </div>
          </div>

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
            <h4 className="text-content font-bold uppercase tracking-widest text-sm mb-6">Academy Courses</h4>
            <ul className="space-y-3 text-muted text-sm">
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Basic Makeup Course</span></li>
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Advance Makeup Course</span></li>
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Bridal Artistry Masterclass</span></li>
              <li><span className="hover:text-gold-500 transition-colors cursor-pointer">Cosmetology Diploma</span></li>
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
            <p className="text-muted text-sm mb-4">Subscribe to get the latest updates on courses and batches.</p>
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

export default Academy;
