import React, { useState, useEffect } from 'react';
import { Scissors, Sparkles, Droplets, Globe, Loader } from 'lucide-react';
import { api } from './api';

// Exchange rates relative to INR (approximate for demo)
const exchangeRates = {
  INR: { rate: 1, symbol: '₹' },
  USD: { rate: 0.012, symbol: '$' },
  THB: { rate: 0.43, symbol: '฿' },
  VND: { rate: 300, symbol: '₫' } // e.g. 1 INR = ~300 VND
};

const iconMap = {
  'Scissors': <Scissors className="text-accent" size={24} />,
  'Sparkles': <Sparkles className="text-accent" size={24} />,
  'Droplets': <Droplets className="text-accent" size={24} />
};

const Services = () => {

  const rawServices = [
      "Acne treatments", "Acrylic nails", "Balayage", "Blow dry", "Body waxing", 
      "Box braids", "Braids", "Bridal services", "Brow lamination", "Dreadlocks", 
      "Eyebrow beautification", "Eyebrow shaping", "Eyebrow threading", "Eyelashes", 
      "Eyelash extensions", "Facials", "Haircut", "Hair extensions", "Hairstyling", 
      "Hair threading", "Laser hair removal", "Lash lift", "Lash perms", "Make-up", 
      "Make-up services", "Manicure", "Online beauty salon booking", "Pedicure", "Permanent hair removel"
  ];

  const initialServices = rawServices.map((name, index) => ({
      id: index.toString(),
      name: name,
      description: `Professional ${name.toLowerCase()}`,
      priceINR: 0,
      duration: 'Varies',
      icon: 'Sparkles'
  }));

  const [currency, setCurrency] = useState('INR');
  const [services, setServices] = useState(initialServices);
  const [loading, setLoading] = useState(false);

  const formatPrice = (basePriceINR) => {
    const { rate, symbol } = exchangeRates[currency];
    const converted = basePriceINR * rate;
    
    // Format nicely based on currency
    if (currency === 'VND') {
      return `${symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-content mb-2">Salon Services</h2>
          <p className="text-muted">Dynamic pricing enabled for international tourists.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Currency Switcher */}
          <div className="flex items-center gap-2 bg-tertiary border border-divider-strong rounded-lg px-3 py-2">
            <Globe size={18} className="text-accent" />
            <select 
              className="bg-transparent text-content text-sm outline-none cursor-pointer"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="INR" className="bg-secondary">🇮🇳 Local (INR)</option>
              <option value="USD" className="bg-secondary">🇺🇸 Foreign Tourist (USD)</option>
              <option value="THB" className="bg-secondary">🇹🇭 Thai Tourist (THB)</option>
              <option value="VND" className="bg-secondary">🇻🇳 Vietnam Tourist (VND)</option>
            </select>
          </div>

          <button className="bg-accent hover:bg-gold-600 text-primary font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
            Add New Service
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-accent">
          <Loader className="animate-spin" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((pkg) => (
            <div key={pkg.id} className="glass-panel p-6 rounded-xl border border-divider hover:border-gold-500/30 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-tertiary rounded-lg">
                    {iconMap[pkg.icon] || <Sparkles className="text-accent" size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-content">{pkg.name}</h3>
                    <p className="text-sm text-muted mt-1">{pkg.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-accent">{formatPrice(pkg.priceINR)}</p>
                  <p className="text-xs text-muted mt-1">{pkg.duration}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-content text-sm font-medium py-2 rounded transition-colors cursor-pointer">
                  Edit
                </button>
                <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium py-2 rounded transition-colors cursor-pointer">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
