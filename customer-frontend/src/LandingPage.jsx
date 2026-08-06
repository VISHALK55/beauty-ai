import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Phone, Star, Heart, Calendar, ChevronRight, Camera, Link, MessageCircle } from 'lucide-react';
import BookingModal from './BookingModal';
import { getSalonId, fetchSalon, fetchServices } from './api';

export default function LandingPage() {
    const [selectedService, setSelectedService] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [salon, setSalon] = useState(null);
    const [backendServices, setBackendServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const id = await getSalonId();
                const [salonData, servicesData] = await Promise.all([
                    fetchSalon(id),
                    fetchServices(id)
                ]);
                setSalon(salonData);
                setBackendServices(servicesData || []);
            } catch (error) {
                console.error("Error loading salon data:", error);
                // Fallback to Pihu Makeover data so the template always renders beautifully
                setSalon({
                    id: 'salon-pihu-makeover',
                    name: 'Pihu Makeover',
                    address: 'Bodhgaya, Bihar',
                    phone: '+91 9876543210',
                    city: 'Bodhgaya'
                });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Comprehensive services list with Unsplash images
    const allServices = [
        // Makeup & Bridal
        { id: 'm1', category: 'Makeup & Bridal', name: 'Bridal Services', image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800' },
        { id: 'm2', category: 'Makeup & Bridal', name: 'Make-up', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800' },
        
        // Hair Care & Styling
        { id: 'h1', category: 'Hair', name: 'Haircut', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
        { id: 'h2', category: 'Hair', name: 'Hairstyling', image: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?auto=format&fit=crop&q=80&w=800' },
        { id: 'h3', category: 'Hair', name: 'Blow Dry', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800' },
        { id: 'h4', category: 'Hair', name: 'Balayage', image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800' },
        { id: 'h5', category: 'Hair', name: 'Hair Extensions', image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=800' },
        { id: 'h6', category: 'Hair', name: 'Braids', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800' },
        { id: 'h7', category: 'Hair', name: 'Box Braids', image: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800' },
        { id: 'h8', category: 'Hair', name: 'Dreadlocks', image: 'https://images.unsplash.com/photo-1647427045330-22c608f51a25?auto=format&fit=crop&q=80&w=800' },
        
        // Skin & Body
        { id: 's1', category: 'Skin & Body', name: 'Facials', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800' },
        { id: 's2', category: 'Skin & Body', name: 'Acne Treatments', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800' },
        { id: 's3', category: 'Skin & Body', name: 'Body Waxing', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800' },
        { id: 's4', category: 'Skin & Body', name: 'Laser Hair Removal', image: 'https://images.unsplash.com/photo-1633511116669-c0c55b5f21d3?auto=format&fit=crop&q=80&w=800' },
        { id: 's5', category: 'Skin & Body', name: 'Permanent Hair Removal', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800' },

        // Brows & Lashes
        { id: 'e1', category: 'Brows & Lashes', name: 'Eyebrow Shaping', image: 'https://images.unsplash.com/photo-1588514125325-1e3532c21dc6?auto=format&fit=crop&q=80&w=800' },
        { id: 'e2', category: 'Brows & Lashes', name: 'Eyebrow Threading', image: 'https://images.unsplash.com/photo-1512413914564-07ebce9c228a?auto=format&fit=crop&q=80&w=800' },
        { id: 'e3', category: 'Brows & Lashes', name: 'Eyebrow Beautification', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800' },
        { id: 'e4', category: 'Brows & Lashes', name: 'Brow Lamination', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800' },
        { id: 'e5', category: 'Brows & Lashes', name: 'Hair Threading', image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&q=80&w=800' },
        { id: 'e6', category: 'Brows & Lashes', name: 'Eyelashes', image: 'https://images.unsplash.com/photo-1587779774619-a1b4dcf3c859?auto=format&fit=crop&q=80&w=800' },
        { id: 'e7', category: 'Brows & Lashes', name: 'Eyelash Extensions', image: 'https://images.unsplash.com/photo-1629813354728-1b601f016f40?auto=format&fit=crop&q=80&w=800' },
        { id: 'e8', category: 'Brows & Lashes', name: 'Lash Lift', image: 'https://images.unsplash.com/photo-1512413913044-106093557451?auto=format&fit=crop&q=80&w=800' },
        { id: 'e9', category: 'Brows & Lashes', name: 'Lash Perms', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800' },
        
        // Nails
        { id: 'n1', category: 'Nails', name: 'Manicure', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=800' },
        { id: 'n2', category: 'Nails', name: 'Pedicure', image: 'https://images.unsplash.com/photo-1516975080661-460d3ce39d74?auto=format&fit=crop&q=80&w=800' },
        { id: 'n3', category: 'Nails', name: 'Acrylic Nails', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800' }
    ];

    // Smart categorizer for backend services that lack explicit categories or images
    const getCategoryAndImage = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('nail') || lowerName.includes('mani') || lowerName.includes('pedi')) {
            return { category: 'Nails', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&q=80&w=800' };
        } else if (lowerName.includes('bridal') || lowerName.includes('makeup') || lowerName.includes('airbrush') || lowerName.includes('hd')) {
            return { category: 'Makeup & Bridal', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=800' };
        } else if (lowerName.includes('hair') || lowerName.includes('keratin') || lowerName.includes('color') || lowerName.includes('spa') || lowerName.includes('smoothening') || lowerName.includes('rebonding') || lowerName.includes('cut')) {
            return { category: 'Hair', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800' };
        } else if (lowerName.includes('brow') || lowerName.includes('lash') || lowerName.includes('threading')) {
            return { category: 'Brows & Lashes', image: 'https://images.unsplash.com/photo-1588514125325-1e3532c21dc6?auto=format&fit=crop&q=80&w=800' };
        } else if (lowerName.includes('facial') || lowerName.includes('wax') || lowerName.includes('skin') || lowerName.includes('bleach') || lowerName.includes('d-tan') || lowerName.includes('cleanup') || lowerName.includes('massage')) {
            return { category: 'Skin & Body', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800' };
        }
        return { category: 'General', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800' };
    };

    // Merge backend services with hardcoded ones (or replace entirely if preferred)
    // Here we use backend services, mapping their fields to match the UI format
    const mappedBackendServices = backendServices.map(bs => {
        const { category, image } = getCategoryAndImage(bs.name);
        return {
            id: bs.id,
            category: bs.category || category,
            name: bs.name,
            price: bs.priceINR,
            duration: bs.duration,
            image: bs.image || image
        };
    });

    // Use mapped backend services if available, otherwise fall back to template defaults
    const displayServices = mappedBackendServices.length > 0 ? mappedBackendServices : allServices;

    const categories = ['All', 'Makeup & Bridal', 'Hair', 'Skin & Body', 'Brows & Lashes', 'Nails', 'General'];

    const filteredServices = activeCategory === 'All' 
        ? displayServices 
        : displayServices.filter(s => s.category === activeCategory);

    if (loading) return <div className="h-screen flex items-center justify-center bg-[#1A1A1A] text-[#E8B5A2] text-xl font-serif tracking-widest uppercase">Loading Experience...</div>;
    if (!salon) return <div className="h-screen flex items-center justify-center bg-[#1A1A1A] text-red-400">Salon not found</div>;

    return (
        <div className="bg-[#FAF9F6] font-sans selection:bg-[#E8B5A2]/30 text-gray-800">
            {/* Hero Section */}
            <div className="relative h-[80vh] md:h-[90vh] bg-zinc-900 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <img 
                    src={salon.image || "/images/bride_1.png"} 
                    alt={`Luxury Salon - ${salon.name}`} 
                    className="absolute inset-0 w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
                />
                
                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                    <div className="inline-flex items-center space-x-2 border border-[#E8B5A2]/50 px-5 py-2 rounded-full mb-8 backdrop-blur-sm bg-black/20">
                        <Sparkles className="w-4 h-4 text-[#E8B5A2]" />
                        <span className="text-[#E8B5A2] text-xs md:text-sm font-medium tracking-[0.2em] uppercase">{salon.city || 'Premier'} / Luxury Studio</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-light text-white mb-6 font-serif tracking-tight">{salon.name}</h1>
                    <p className="text-lg md:text-2xl text-gray-300 font-light mb-10 max-w-2xl leading-relaxed">
                        {salon.aiSystemPrompt ? salon.aiSystemPrompt.substring(0, 150) + "..." : "Elevating bridal beauty with flawless precision, luxury treatments, and unforgettable transformations."}
                    </p>
                    <a href="#services" className="bg-[#E8B5A2] hover:bg-[#d9a28f] text-black px-10 py-4 rounded-none text-sm md:text-base font-bold tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-3">
                        Discover Services <ChevronRight size={18} />
                    </a>
                </div>
            </div>

            {/* Info Strip */}
            <div className="bg-[#2A2A2A] py-6 px-4 text-[#E8B5A2]">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 text-sm tracking-wider font-light">
                    <div className="flex items-center gap-3">
                        <MapPin size={18} />
                        <span>{salon.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={18} />
                        <a href={`tel:${salon.phone}`} className="hover:text-white transition-colors">{salon.phone}</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Star size={18} />
                        <span>{salon.rating || '5.0'}/5 ({salon.reviews || 0} Reviews)</span>
                    </div>
                </div>
            </div>

            {/* Meet the Founder Section */}
            <div className="max-w-6xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative flex justify-center animate-float">
                        <div className="aspect-[3/4] w-full max-w-[320px] bg-zinc-900 relative z-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#E8B5A2]/30 rounded-sm">
                            <img 
                                src="/images/owner.jpg" 
                                alt={`Founder of ${salon.name}`} 
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                style={{ filter: "contrast(1.05) saturate(1.1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop";
                                }}
                            />
                        </div>
                        {/* Decorative Box */}
                        <div className="absolute top-6 left-[50%] ml-[-180px] w-full max-w-[320px] h-full border-2 border-[#E8B5A2] z-0 hidden md:block opacity-60"></div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                        <h4 className="text-[#E8B5A2] text-sm font-bold tracking-[0.2em] uppercase mb-4">The Visionary</h4>
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">Meet the Artist Behind the Magic</h2>
                        <div className="w-16 h-1 bg-[#E8B5A2] mb-8"></div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            With years of expertise, the founder of {salon.name} has transformed hundreds of clients on their special day. Her philosophy is simple: makeup shouldn't hide you; it should illuminate the most beautiful version of yourself.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Trained under top international academies, she brings global trends and flawless techniques right to {salon.city || 'your city'}, ensuring every client feels like royalty.
                        </p>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Signature_placeholder.svg" alt="Signature" className="h-12 opacity-40 w-fit" />
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div id="services" className="bg-[#1A1A1A] py-24 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h4 className="text-[#E8B5A2] text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Complete Menu</h4>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">Signature Experiences</h2>
                        <div className="w-16 h-1 bg-[#E8B5A2] mx-auto"></div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === cat 
                                    ? 'bg-[#E8B5A2] text-black shadow-[0_0_15px_rgba(232,181,162,0.3)]' 
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredServices.map(service => (
                            <div 
                                key={service.id} 
                                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square bg-zinc-900"
                                onClick={() => setSelectedService(service)}
                            >
                                <img 
                                    src={service.image} 
                                    alt={service.name} 
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 md:p-6 flex flex-col justify-end">
                                    <span className="text-[#E8B5A2] text-xs font-bold uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        {service.category} {service.price ? `• ₹${service.price}` : ''}
                                    </span>
                                    <h3 className="text-lg md:text-xl font-serif text-white">{service.name}</h3>
                                    <button className="mt-4 w-full py-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#E8B5A2] hover:text-black hover:border-transparent">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Studio Gallery Section */}
            <div className="py-24 max-w-7xl mx-auto px-4 border-b border-white/10">
                <div className="text-center mb-16">
                    <Heart className="w-8 h-8 text-[#E8B5A2] mx-auto mb-4" />
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Real Brides, Real Magic</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">Glimpses of our stunning bridal transformations.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={`bride_${num}`} className={`relative group overflow-hidden cursor-pointer ${num % 2 === 0 ? 'animate-float' : ''}`} style={{ animationDelay: `${num * 0.5}s` }} onClick={() => setSelectedService({ id: `gal_bride_${num}`, name: 'Bridal Transformation' })}>
                            <img src={`/images/bride_${num}.png`} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" style={{ filter: "contrast(1.05) saturate(1.1)" }} alt={`Bridal Gallery ${num}`} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <button className="bg-[#E8B5A2] text-black px-6 py-2 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interior Gallery Section */}
            <div className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <Camera className="w-8 h-8 text-[#E8B5A2] mx-auto mb-4" />
                    <Heart className="w-8 h-8 text-[#E8B5A2] mx-auto mb-4" />
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Our Luxury Studio</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">Step into a world of elegance. A premium space designed for your ultimate comfort.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['interior_1', 'interior_2', 'interior_3', 'interior_4'].map((img, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-sm shadow-xl cursor-pointer bg-zinc-100" onClick={() => setSelectedService({ id: `gal_${index}`, name: 'Studio Experience' })}>
                            <img 
                                src={`/images/${img}.jpg`} 
                                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" 
                                style={{ filter: "contrast(1.1) brightness(1.05) saturate(1.15)" }}
                                alt={`Salon Interior ${index + 1}`} 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <button className="bg-[#E8B5A2] text-black px-6 py-2 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <a href="https://www.instagram.com/pihu_makeover22?igsh=ODZqc3U0M2JsY3pt" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 tracking-widest text-sm uppercase font-bold transition-colors">
                        <Link size={18} /> Follow Our Journey
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div>
                        <h2 className="text-3xl font-serif mb-6">{salon.name}</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Your destination for premium beauty treatments, skincare, and luxury hair styling in {salon.city || 'your city'}.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E8B5A2] hover:text-black transition-colors font-bold text-xs">FB</a>
                            <a href="https://www.instagram.com/pihu_makeover22?igsh=ODZqc3U0M2JsY3pt" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#E8B5A2] hover:text-black transition-colors font-bold text-xs">IG</a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-serif mb-6 text-[#E8B5A2]">Contact Us</h4>
                        <div className="space-y-4 text-gray-400">
                            <p className="flex items-start gap-3">
                                <MapPin className="shrink-0 mt-1" size={18} />
                                <span>{salon.address}</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <Phone size={18} />
                                <a href={`tel:${salon.phone}`} className="hover:text-white transition-colors">{salon.phone}</a>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-serif mb-6 text-[#E8B5A2]">Opening Hours</h4>
                        <div className="space-y-2 text-gray-400">
                            <p className="flex justify-between border-b border-white/10 pb-2"><span>Mon - Sat</span> <span>10:00 AM - 8:00 PM</span></p>
                            <p className="flex justify-between border-b border-white/10 pb-2"><span>Sunday</span> <span>By Appointment</span></p>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-600 text-sm border-t border-white/10 pt-8">
                    &copy; {new Date().getFullYear()} {salon.name}. All rights reserved.
                </div>
            </footer>

            {/* Modal */}
            {selectedService && (
                <BookingModal 
                    service={selectedService} 
                    onClose={() => setSelectedService(null)} 
                />
            )}
            {/* Floating WhatsApp CTA */}
            <div className="fixed bottom-6 right-6 z-40">
                 <a href={`https://wa.me/${(salon.phone || '').replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(salon.name)}!%20I%20would%20like%20to%20book%20a%20consultation.`} 
                    target="_blank" rel="noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center group relative">
                    <MessageCircle size={28} fill="currentColor" />
                    <span className="absolute right-full mr-4 bg-zinc-900 text-white text-xs font-bold px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">WhatsApp Us</span>
                 </a>
            </div>
        </div>
    );
}
