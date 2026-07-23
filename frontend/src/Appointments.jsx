import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Search, Filter, Plus, ShieldCheck } from 'lucide-react';
import BookingModal from './BookingModal';

export const initialBookings = [
  {
    id: 'BK-1001',
    customerName: 'Suman Kumari',
    salonName: 'Pihu Makeover Saloon',
    salonId: 'pihu-makeover',
    serviceName: 'Bridal HD Makeup',
    price: 6450,
    date: '2026-07-24',
    time: '11:00 AM',
    status: 'Confirmed',
    phone: '+91 99345 11223',
    source: 'Google Search (Programmatic SEO)'
  },
  {
    id: 'BK-1002',
    customerName: 'Anjali Verma',
    salonName: 'Pihu Makeover Saloon',
    salonId: 'pihu-makeover',
    serviceName: 'Luxury Hair Spa',
    price: 900,
    date: '2026-07-24',
    time: '02:30 PM',
    status: 'AI WhatsApp Confirmed',
    phone: '+91 98765 88990',
    source: 'AI Receptionist Chat'
  },
  {
    id: 'BK-1003',
    customerName: 'Pooja Singh',
    salonName: 'Surbhi Beauty Parlour',
    salonId: 'surbhi-gaya',
    serviceName: 'Gold Radiance Facial',
    price: 1200,
    date: '2026-07-25',
    time: '10:00 AM',
    status: 'Confirmed',
    phone: '+91 94312 55667',
    source: 'Direct Website Booking'
  }
];

export default function Appointments() {
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('beautyai_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        setBookings(initialBookings);
      }
    } else {
      setBookings(initialBookings);
      localStorage.setItem('beautyai_bookings', JSON.stringify(initialBookings));
    }
  }, []);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.salonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status.includes(statusFilter);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 md:py-8 min-h-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white flex items-center gap-3">
            Salon Appointments & CRM <Calendar className="text-gold-500" size={28} />
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Where all confirmed bookings from Google Search, AI Chat, and Website land live.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 text-xs sm:text-sm px-5 py-3 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          <Plus size={18} /> New Manual Booking
        </button>
      </header>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel p-5">
          <p className="text-xs text-gray-400 font-medium uppercase">Total Bookings</p>
          <h3 className="text-3xl font-bold text-white mt-1">{bookings.length}</h3>
          <p className="text-xs text-emerald-400 mt-1 font-medium">Live synced with Backend</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-xs text-gray-400 font-medium uppercase">Expected Revenue</p>
          <h3 className="text-3xl font-bold text-gold-400 mt-1">
            ₹{bookings.reduce((sum, b) => sum + (b.price || 0), 0).toLocaleString()}
          </h3>
          <p className="text-xs text-gold-400/80 mt-1 font-medium">100% Direct Commission-Free</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-xs text-gray-400 font-medium uppercase">AI Confirmed Rate</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-1">100%</h3>
          <p className="text-xs text-emerald-400 mt-1 font-medium">WhatsApp Notification Sent</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-5 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search customer, salon, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-dark-950 border border-white/10 rounded-xl focus:outline-none focus:border-gold-500 text-white text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-dark-950 border border-white/10 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-500 text-sm w-full sm:w-auto"
        >
          <option value="All">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="AI">AI WhatsApp Confirmed</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredBookings.map((b, idx) => (
          <div 
            key={b.id || idx} 
            className="glass-panel p-5 rounded-2xl hover:border-gold-500/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                <User size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-gold-400 transition-colors">
                    {b.customerName}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={10} /> {b.status}
                  </span>
                </div>

                <p className="text-sm text-gray-300 font-medium mt-1">
                  {b.serviceName} • <span className="text-gold-400 font-bold">₹{b.price}</span>
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-2">
                  <span className="text-gray-300 font-semibold">{b.salonName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-gold-400"><Calendar size={12} /> {b.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-gold-400"><Clock size={12} /> {b.time}</span>
                  <span>•</span>
                  <span className="text-gray-500 italic">Source: {b.source}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/5 justify-end">
              <a
                href={`tel:${b.phone}`}
                className="px-3.5 py-2 bg-dark-800 hover:bg-dark-700 border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Phone size={14} /> Call Client
              </a>
              <a
                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
            </div>
          </div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="glass-panel p-12 text-center text-gray-400">
            <p className="text-base">No appointments found matching your search.</p>
          </div>
        )}
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
