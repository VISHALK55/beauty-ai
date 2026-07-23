import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Scissors, 
  MessageSquare, 
  Settings,
  PhoneCall,
  MapPin,
  Store,
  Search,
  Zap,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container (Desktop static + Mobile slide-out drawer) */}
      <div 
        className={`fixed lg:static top-0 left-0 bottom-0 w-72 lg:w-64 h-screen border-r border-white/10 flex flex-col glass-panel rounded-none shrink-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <div>
            <h1 className="text-2xl font-bold text-gold-500">Beauty<span className="text-white">AI</span></h1>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-widest font-sans">Salon Platform</p>
          </div>
          {/* Close button for Mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          <NavLink to="/" end onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18}/> Dashboard
          </NavLink>
          <NavLink to="/salons" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Store size={18}/> 100+ Salons Directory
          </NavLink>
          <NavLink to="/google-preview" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Search size={18}/> Google Search View
          </NavLink>
          <NavLink to="/speed-control" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Zap size={18}/> Hyper-Speed Engine
          </NavLink>
          <NavLink to="/geo-rank" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <MapPin size={18}/> Geo Rank AI
          </NavLink>
          <NavLink to="/ai-receptionist" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <MessageSquare size={18}/> AI Chat Bot
          </NavLink>
          <NavLink to="/voice-calls" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <PhoneCall size={18}/> AI Voice Calls
          </NavLink>
          <NavLink to="/services" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Scissors size={18}/> Services
          </NavLink>
          <NavLink to="/appointments" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Calendar size={18}/> Appointments
          </NavLink>
          <NavLink to="/staff" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={18}/> Staff & CRM
          </NavLink>
          <NavLink to="/settings" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={18}/> Settings
          </NavLink>
        </nav>
        
        <div className="p-5 border-t border-white/5 bg-dark-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center text-dark-900 font-bold text-sm">
              PM
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Pihu Makeover</p>
              <p className="text-xs text-gold-400">Bodhgaya Branch</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
