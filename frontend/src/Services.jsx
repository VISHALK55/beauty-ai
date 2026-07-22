import React, { useState } from 'react';
import { Scissors, Sparkles, Droplets, Globe } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: 'Basic Glow Up',
    description: 'Haircut, basic styling, and express facial.',
    basePriceINR: 1500,
    duration: '1h 30m',
    icon: <Scissors className="text-gold-500" size={24} />
  },
  {
    id: 2,
    name: 'Bridal Elegance',
    description: 'Full bridal HD makeup, hair styling, and draping.',
    basePriceINR: 15000,
    duration: '3h 00m',
    icon: <Sparkles className="text-gold-500" size={24} />
  },
  {
    id: 3,
    name: 'Rejuvenation Spa',
    description: 'Deep tissue massage, luxury facial, and aromatherapy.',
    basePriceINR: 2500,
    duration: '2h 00m',
    icon: <Droplets className="text-gold-500" size={24} />
  },
  {
    id: 4,
    name: 'Party Makeup',
    description: 'Flawless makeup and styling for bridesmaids/relatives.',
    basePriceINR: 2500,
    duration: '1h 30m',
    icon: <Sparkles className="text-gold-500" size={24} />
  }
];

// Exchange rates relative to INR (approximate for demo)
const exchangeRates = {
  INR: { rate: 1, symbol: '₹' },
  USD: { rate: 0.012, symbol: '$' },
  THB: { rate: 0.43, symbol: '฿' },
  VND: { rate: 300, symbol: '₫' } // e.g. 1 INR = ~300 VND
};

const Services = () => {
  const [currency, setCurrency] = useState('INR');

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
          <h2 className="text-3xl font-bold text-white mb-2">Salon Packages</h2>
          <p className="text-gray-400">Dynamic pricing enabled for international tourists.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Currency Switcher */}
          <div className="flex items-center gap-2 bg-dark-800 border border-white/10 rounded-lg px-3 py-2">
            <Globe size={18} className="text-gold-500" />
            <select 
              className="bg-transparent text-white text-sm outline-none cursor-pointer"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="INR" className="bg-dark-900">🇮🇳 Local (INR)</option>
              <option value="USD" className="bg-dark-900">🇺🇸 Foreign Tourist (USD)</option>
              <option value="THB" className="bg-dark-900">🇹🇭 Thai Tourist (THB)</option>
              <option value="VND" className="bg-dark-900">🇻🇳 Vietnam Tourist (VND)</option>
            </select>
          </div>

          <button className="bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
            Add New Package
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-dark-800 rounded-lg">
                  {pkg.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{pkg.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gold-500">{formatPrice(pkg.basePriceINR)}</p>
                <p className="text-xs text-gray-500 mt-1">{pkg.duration}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-medium py-2 rounded transition-colors cursor-pointer">
                Edit
              </button>
              <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium py-2 rounded transition-colors cursor-pointer">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
