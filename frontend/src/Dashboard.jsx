import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  Search,
  TrendingUp,
  Bell,
  Clock
} from 'lucide-react';
import BookingModal from './BookingModal';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="glass-panel p-6 animate-slide-up">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-semibold mt-2">{value}</h3>
      </div>
      <div className="p-3 bg-dark-900 rounded-xl text-gold-400">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm">
      <TrendingUp size={16} className="text-green-500" />
      <span className="text-green-500 font-medium">{trend}</span>
      <span className="text-gray-500">vs last week</span>
    </div>
  </div>
);

const UpcomingAppointments = () => (
  <div className="glass-panel p-6 mt-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl">Upcoming Appointments</h2>
      <button className="text-gold-400 text-sm hover:underline">View All</button>
    </div>
    
    <div className="space-y-4">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-white/5 hover:border-gold-500/30 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center">
              <span className="text-lg">👩</span>
            </div>
            <div>
              <p className="font-medium">Sarah Jenkins</p>
              <p className="text-sm text-gray-400">Premium Hair Spa • ₹900</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-gold-400 justify-end">
              <Clock size={16} />
              <span className="font-medium">10:30 AM</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">with Stylist Alex</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-10 py-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif">Welcome back, Jane</h1>
          <p className="text-gray-400 mt-1">Here's what's happening at your salon today.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              className="pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-full focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all w-64"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-roseGold-500 rounded-full"></span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Calendar size={18} />
            New Booking
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value="₹24,500" icon={<TrendingUp size={24} />} trend="+12.5%" />
        <StatCard title="Appointments" value="32" icon={<Calendar size={24} />} trend="+5.2%" />
        <StatCard title="AI Interactions" value="128" icon={<MessageSquare size={24} />} trend="+18.4%" />
      </div>

      <UpcomingAppointments />
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
