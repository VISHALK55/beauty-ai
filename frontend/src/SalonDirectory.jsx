import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { salonsDatabase } from './salonsData';
import { MapPin, Phone, Star, ExternalLink, Search, Filter, Sparkles, Building2 } from 'lucide-react';

export default function SalonDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedService, setSelectedService] = useState('hair-cut');

  const salons = Object.values(salonsDatabase);
  const cities = ['All', ...Array.from(new Set(salons.map(s => s.city)))];

  const filteredSalons = salons.filter(salon => {
    const matchesSearch = salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          salon.streetAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          salon.neighborhoods.some(n => n.toLowerCase().includes(searchTerm.toLowerCase()));
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalons.map(salon => {
          const mainNeighborhood = salon.neighborhoods[0] ? salon.neighborhoods[0].toLowerCase().replace(/\s+/g, '-') : salon.city.toLowerCase();
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

      {filteredSalons.length === 0 && (
        <div className="glass-panel p-12 text-center text-gray-400 mt-8">
          <p className="text-lg">No salons found matching "{searchTerm}". Try clearing your filter.</p>
        </div>
      )}
    </div>
  );
}
