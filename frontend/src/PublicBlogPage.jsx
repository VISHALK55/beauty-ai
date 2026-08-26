import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Search, Menu, X, Mail, ArrowRight } from 'lucide-react';
import { useSalon } from './context/SalonContext';
// Removed hardcoded salon object

const PublicBlogPage = () => {
  const { salon } = useSalon();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getBlogImage = (index, fallback) => {
    if (salon?.galleryImages && salon.galleryImages.length > 0) {
      return salon.galleryImages[index % salon.galleryImages.length];
    }
    return fallback;
  };

  const blogs = [
    {
      title: "Bridal Makeup Trends for Bihar Weddings: The Gold & Glow Aesthetic",
      category: "BRIDAL GLAM",
      location: "Bodhgaya",
      snippet: "Discover how Bihari brides are blending traditional red and gold couture with modern soft glam HD airbrush makeup in 2026. Get expert advice...",
      img: getBlogImage(0, "/gallery/gallery_1.jpg")
    },
    {
      title: "How to Build a Successful Makeup Artist Career in Patna & Gaya",
      category: "EDUCATION",
      location: "Gaya",
      snippet: "A complete step-by-step roadmap to establishing yourself as a highly-paid freelance bridal artist or cosmetologist in the growing Bihar beau...",
      img: getBlogImage(1, "/gallery/gallery_2.jpg")
    },
    {
      title: "AP Colony Gaya me Bridal Makeup Price kitna hai? Budget & Package Guide",
      category: "BRIDAL GLAM",
      location: "AP Colony",
      snippet: "AP Colony Gaya me bridal makeup price range aur booking detail. Janiye HD aur Airbrush makeup packages cost aur Pihu Makeover Studio Mocharim ...",
      img: getBlogImage(2, "/gallery/gallery_3.jpg")
    },
    {
      title: "Swarajpuri Road me Hair Smoothing Rebonding ka price kitna hai?",
      category: "HAIR CARE",
      location: "Swarajpuri Road",
      snippet: "Swarajpuri Road Gaya area me permanent hair smoothing aur rebonding ka average price range. Janiye products aur Pihu Makeover Studio Bodhgaya ...",
      img: getBlogImage(3, "/gallery/gallery_4.jpg")
    },
    {
      title: "Delha area me hard water damage ke liye best Hair Botox treatment",
      category: "HAIR CARE",
      location: "Delha",
      snippet: "Delha Gaya me hard water se damaged aur dry hair ke liye Hair Botox cost. Janiye damage repair aur Pihu Makeover Studio ke chemical-free solut...",
      img: getBlogImage(4, "/gallery/gallery_5.jpg")
    },
    {
      title: "Bodhgaya Temple Area ke dust aur oily skin ke liye Hydrafacial price",
      category: "SKIN THERAPY",
      location: "Bodhgaya Temple Area",
      snippet: "Mahabodhi Temple area Bodhgaya me cosmetic HydraFacial pricing, cleansing steps aur Pihu Makeover Studio ke skin-care packages....",
      img: getBlogImage(5, "/gallery/blog_hero.png")
    }
  ];

  return (
    <div className="min-h-screen bg-primary text-content font-sans selection:bg-gold-500/30">
      <Helmet>
        <title>Beauty & Cosmetology Journal | {salon.name}</title>
        <meta name="description" content={`Read our latest blog posts on bridal makeup, hair care, skin therapy, and cosmetology education at ${salon.name}.`} />
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
          <Link to={`/s/${salon.id}/blog`} className="text-accent border-b-2 border-accent pb-1">Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="hover:text-gold-500 transition-colors border-b-2 border-transparent hover:border-gold-500 pb-1">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden lg:flex items-center text-xs font-bold uppercase tracking-widest text-accent border border-accent-light px-4 py-1.5 rounded-full hover:bg-gold-500 hover:text-dark-950 transition-colors">Admin</Link>`r`n          <Search size={20} className="text-muted hover:text-gold-500 cursor-pointer transition-colors" />
          <Menu size={24} className="lg:hidden text-muted hover:text-gold-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(true)} />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-dark-950/98 backdrop-blur-md z-[60] transition-all duration-300 flex flex-col ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex justify-between items-center p-4 border-b border-divider">
          <div className="text-xl font-serif text-accent font-bold uppercase tracking-wide">{salon.name}</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-muted hover:text-gold-500"><X size={28} /></button>
        </div>
        <div className="p-4 flex flex-col gap-6 text-lg font-bold uppercase tracking-widest text-muted">
          <Link to={`/s/${salon.id}`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to={`/s/${salon.id}/services`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to={`/s/${salon.id}/academy`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Academy</Link>
          <Link to={`/s/${salon.id}/blog`} className="text-accent" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to={`/s/${salon.id}/contact`} className="hover:text-gold-500 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>`r`n          <Link to="/login" className="text-accent border border-accent-light text-center py-3 rounded-xl mt-4" onClick={() => setIsMobileMenuOpen(false)}>ADMIN LOGIN</Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/gallery/blog_hero.png" 
            alt="Beauty Blog Hero" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-950/90 to-primary"></div>
        </div>

        <div className="relative z-10 max-w-4xl px-6 pt-10">
          <div className="text-accent font-bold tracking-[0.3em] text-sm md:text-base mb-6 uppercase">
            INSIGHTS & INSPIRATION
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Beauty & Cosmetology <span className="text-accent italic">Journal</span>
          </h1>
          <div className="w-24 h-px bg-gold-500/50 mx-auto mt-8"></div>
        </div>
      </div>

      {/* --- SEARCH & FILTERS SECTION --- */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-4 pb-16">
        <div className="bg-secondary border border-gold-500/20 rounded-3xl p-5 md:p-8 flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.6)] relative z-20 -mt-20 md:-mt-16 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-dark-800/80 border border-divider rounded-2xl flex items-center px-5 py-4 focus-within:border-gold-500/50 transition-colors">
              <Search className="text-muted mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Search location or beauty service..." 
                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-sm md:text-base"
              />
            </div>
            <div className="w-full md:w-64 bg-dark-800/80 border border-divider rounded-2xl flex items-center px-5 py-4 focus-within:border-gold-500/50 transition-colors">
              <MapPin className="text-muted mr-3 shrink-0" size={20} />
              <select className="bg-transparent border-none outline-none text-white w-full appearance-none cursor-pointer text-sm md:text-base">
                <option className="bg-secondary">All Locations</option>
                <option className="bg-secondary">Gaya</option>
                <option className="bg-secondary">Bodhgaya</option>
              </select>
            </div>
            <div className="w-full md:w-56 bg-dark-800/80 border border-divider rounded-2xl flex items-center px-5 py-4 focus-within:border-gold-500/50 transition-colors">
              <select className="bg-transparent border-none outline-none text-white w-full appearance-none cursor-pointer text-sm md:text-base">
                <option className="bg-secondary">All Categories</option>
                <option className="bg-secondary">Bridal Glam</option>
                <option className="bg-secondary">Hair Care</option>
                <option className="bg-secondary">Skin Therapy</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-muted text-xs md:text-sm mr-1 md:mr-2 w-full md:w-auto mb-2 md:mb-0">Popular Locations:</span>
            <span className="border border-divider-strong hover:border-gold-500/50 text-muted hover:text-gold-500 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs cursor-pointer transition-colors bg-dark-800/50">AP Colony</span>
            <span className="border border-divider-strong hover:border-gold-500/50 text-muted hover:text-gold-500 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs cursor-pointer transition-colors bg-dark-800/50">Mocharim Road</span>
            <span className="border border-divider-strong hover:border-gold-500/50 text-muted hover:text-gold-500 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs cursor-pointer transition-colors bg-dark-800/50">Swarajpuri Road</span>
            <span className="border border-divider-strong hover:border-gold-500/50 text-muted hover:text-gold-500 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs cursor-pointer transition-colors bg-dark-800/50">Delha</span>
            <span className="border border-divider-strong hover:border-gold-500/50 text-muted hover:text-gold-500 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs cursor-pointer transition-colors bg-dark-800/50">Bodhgaya Temple</span>
          </div>
        </div>
      </div>

      {/* --- BLOG GRID --- */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-24">
        <div className="mb-10 text-muted text-sm">
          Showing <strong className="text-accent">673</strong> matches for your search selection.
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <div key={idx} className="bg-secondary border border-divider rounded-2xl flex flex-col group hover:border-gold-500/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all duration-300 overflow-hidden">
              {/* Image Container */}
              <div className="h-56 md:h-64 overflow-hidden relative border-b border-divider">
                <img 
                  src={blog.img} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Labels */}
                <div className="flex justify-between items-center mb-6">
                  <span className="border border-accent-light text-accent text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <span className="text-muted text-[11px] font-medium uppercase tracking-wider">
                    {blog.location}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-serif text-content font-bold leading-tight mb-4 group-hover:text-gold-400 transition-colors">
                  {blog.title}
                </h3>
                
                {/* Snippet */}
                <p className="text-muted text-sm md:text-base leading-relaxed mb-8">
                  {blog.snippet}
                </p>
                
                {/* Read More */}
                <div className="mt-auto pt-4 flex items-center">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer group-hover:text-white transition-colors">
                    READ GUIDE <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-primary border-t border-divider pt-16 md:pt-20 pb-10">
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

export default PublicBlogPage;
