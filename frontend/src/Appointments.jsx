import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, Search, Filter, Plus, ShieldCheck, Loader } from 'lucide-react';
import BookingModal from './BookingModal';
import { api } from './api';
import { useAuth } from './context/AuthContext';

export default function Appointments() {
  const { salonId } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchBookings = async () => {
    setLoading(true);
    // Use the logged-in salon's ID, default to pihu-makeover if super admin for demo purposes
    const targetSalonId = salonId === 'SUPER-ADMIN' ? 'pihu-makeover' : salonId;
    const data = await api.getAppointments(targetSalonId);
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [salonId]);

  const handleBookingCreated = () => {
    fetchBookings();
  };

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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-content flex items-center gap-3">
            Salon Appointments & CRM <Calendar className="text-accent" size={28} />
          </h1>
          <p className="text-muted mt-1 text-sm sm:text-base">
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
          <p className="text-xs text-muted font-medium uppercase">Total Bookings</p>
          <h3 className="text-3xl font-bold text-content mt-1">{bookings.length}</h3>
          <p className="text-xs text-emerald-400 mt-1 font-medium">Live synced with Backend</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-xs text-muted font-medium uppercase">Expected Revenue</p>
          <h3 className="text-3xl font-bold text-accent mt-1">
            ₹{bookings.reduce((sum, b) => sum + (b.price || 0), 0).toLocaleString()}
          </h3>
          <p className="text-xs text-gold-400/80 mt-1 font-medium">100% Direct Commission-Free</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-xs text-muted font-medium uppercase">AI Confirmed Rate</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-1">100%</h3>
          <p className="text-xs text-emerald-400 mt-1 font-medium">WhatsApp Notification Sent</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-5 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            placeholder="Search customer, salon, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-primary border border-divider-strong rounded-xl focus:outline-none focus:border-gold-500 text-content text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-primary border border-divider-strong text-content px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-500 text-sm w-full sm:w-auto"
        >
          <option value="All">All Statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="AI">AI WhatsApp Confirmed</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-20 text-accent">
            <Loader className="animate-spin" size={40} />
          </div>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((b, idx) => (
          <div 
            key={b.id || idx} 
            className="glass-panel p-5 rounded-2xl hover:border-gold-500/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent-light border border-gold-500/20 text-accent flex items-center justify-center shrink-0">
                <User size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-content group-hover:text-gold-400 transition-colors">
                    {b.customerName}
                  </h3>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={10} /> {b.status}
                  </span>
                </div>

                <p className="text-sm text-muted font-medium mt-1">
                  {b.serviceName} • <span className="text-accent font-bold">₹{b.price}</span>
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-2">
                  <span className="text-muted font-semibold">{b.salonName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-accent"><Calendar size={12} /> {b.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-accent"><Clock size={12} /> {b.time}</span>
                  <span>•</span>
                  <span className="text-muted italic">Source: {b.source}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-divider justify-end">
              <a
                href={`tel:${b.phone}`}
                className="px-3.5 py-2 bg-tertiary hover:bg-dark-700 border border-divider-strong text-content rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
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
          ))
        ) : (
          <div className="glass-panel p-12 text-center text-muted">
            <p className="text-base">No appointments found matching your search.</p>
          </div>
        )}
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onBookingCreated={handleBookingCreated}
        salonId={salonId === 'SUPER-ADMIN' ? 'pihu-makeover' : salonId}
        salonName="Salon Name" // Could fetch actual name from context if available
      />
    </div>
  );
}
