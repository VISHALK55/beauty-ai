import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from './api';
import { MapPin, Phone, Star, ExternalLink, Search, Filter, Sparkles, Building2, Plus, X } from 'lucide-react';

export default function SalonDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedService, setSelectedService] = useState('hair-cut');
  
  const [salonsData, setSalonsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSalon, setNewSalon] = useState({
    name: '', city: '', address: '', phone: '', email: '', instagram: '', image: '', neighborhoods: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const data = await api.getSalons();
    setSalonsData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddSalon = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Auto-generate ID from name
      const generatedId = newSalon.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const payload = {
        ...newSalon,
        id: generatedId,
        rating: 5.0,
        reviews: 0,
        neighborhoods: newSalon.neighborhoods.split(',').map(n => n.trim()).filter(Boolean)
      };
      await api.createSalon(payload);
      await loadData();
      setIsAddModalOpen(false);
      setNewSalon({ name: '', city: '', address: '', phone: '', email: '', instagram: '', image: '', neighborhoods: '' });
    } catch (err) {
      alert("Failed to add salon. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  const salons = Object.values(salonsData);
  const cities = ['All', ...Array.from(new Set(salons.map(s => s.city).filter(Boolean)))];

  const filteredSalons = salons.filter(salon => {
    const matchesSearch = (salon.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (salon.address || salon.streetAddress || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || salon.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 md:py-8 min-h-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight flex items-center gap-3">
            Programmatic SEO Directory <Building2 className="text-gold-500" size={28} />
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base md:text-lg">
            Explore 100+ AI-enabled salons active on the Programmatic SEO & Geo-Rank Engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-full font-mono text-sm font-bold">
            {salons.length} Salons Live
          </span>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-dark-900 rounded-full font-bold text-sm transition-colors"
          >
            <Plus size={18} /> Add New Salon
          </button>
        </div>
      </header>

      {/* Search & City Filter Bar */}
      <div className="glass-panel p-6 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by salon name, area, or street..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-white/10 rounded-xl focus:outline-none focus:border-gold-500 text-white"
          />
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-gold-400" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-dark-900 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500"
          >
            {cities.map(city => (
              <option key={city} value={city}>{city === 'All' ? 'All Cities' : city}</option>
            ))}
          </select>

          {/* Service Selector for SEO URL Testing */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="bg-dark-900 border border-white/10 text-gold-400 font-medium px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500"
          >
            <option value="hair-cut">Hair Cut</option>
            <option value="hair-spa">Hair Spa</option>
            <option value="bridal-makeup">Bridal Makeup</option>
            <option value="facial">Facial</option>
            <option value="keratin">Keratin</option>
          </select>
        </div>
      </div>

      {/* Salons Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalons.map(salon => {
          const mainNeighborhood = salon.neighborhoods && salon.neighborhoods[0] ? salon.neighborhoods[0].toLowerCase().replace(/\s+/g, '-') : (salon.city ? salon.city.toLowerCase() : 'local');
          const seoUrl = `/salon/${salon.id}/${selectedService}/${mainNeighborhood}`;

          return (
            <div key={salon.id} className="glass-panel rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={salon.image}
                    alt={salon.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-dark-900/80 backdrop-blur-md rounded-full text-gold-400 font-bold text-xs flex items-center gap-1 border border-white/10">
                    <Star size={14} className="fill-gold-400" /> {salon.rating} ({salon.reviews})
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-gold-500/90 text-dark-900 font-bold text-xs rounded-md uppercase tracking-wider">
                    {salon.city}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {salon.name}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-gold-500 shrink-0" /> {salon.streetAddress}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {salon.neighborhoods.map((hood, idx) => (
                      <span key={idx} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-2 py-1 rounded-md">
                        {hood}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <a
                  href={`tel:${salon.phone}`}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <Phone size={14} /> {salon.phone}
                </a>

                <Link
                  to={seoUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 bg-gold-500/10 hover:bg-gold-500/20 px-3 py-2 rounded-lg transition-colors border border-gold-500/20"
                >
                  Test SEO Page <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      )}
      {filteredSalons.length === 0 && !loading && (
        <div className="glass-panel p-12 text-center text-gray-400 mt-8">
          <p className="text-lg">No salons found matching "{searchTerm}". Try clearing your filter.</p>
        </div>
      )}

      {/* Add New Salon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#110505] border border-gold-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-2xl font-serif text-white flex items-center gap-2">
                <Sparkles className="text-gold-500" size={20} /> Add New Salon
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="addSalonForm" onSubmit={handleAddSalon} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Salon Name *</label>
                    <input type="text" required value={newSalon.name} onChange={e => setNewSalon({...newSalon, name: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="e.g. Glamour Studio" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">City *</label>
                    <input type="text" required value={newSalon.city} onChange={e => setNewSalon({...newSalon, city: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="e.g. Patna, Bihar" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Address *</label>
                    <input type="text" required value={newSalon.address} onChange={e => setNewSalon({...newSalon, address: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="e.g. 123 Main St, Near Park" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input type="tel" required value={newSalon.phone} onChange={e => setNewSalon({...newSalon, phone: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="+91 9876543210" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                    <input type="email" value={newSalon.email} onChange={e => setNewSalon({...newSalon, email: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="hello@glamour.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Instagram Link</label>
                    <input type="url" value={newSalon.instagram} onChange={e => setNewSalon({...newSalon, instagram: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Hero Image URL *</label>
                    <input type="url" required value={newSalon.image} onChange={e => setNewSalon({...newSalon, image: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="https://unsplash.com/..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Neighborhoods (Comma separated)</label>
                    <input type="text" value={newSalon.neighborhoods} onChange={e => setNewSalon({...newSalon, neighborhoods: e.target.value})} className="w-full bg-[#1c080b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500" placeholder="e.g. AP Colony, Swarajpuri Road" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-[#0a0303] rounded-b-2xl flex justify-end gap-4">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 font-bold text-sm transition-colors">
                Cancel
              </button>
              <button type="submit" form="addSalonForm" disabled={submitting} className="px-6 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-dark-900 font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2">
                {submitting ? 'Saving...' : 'Save & Launch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
