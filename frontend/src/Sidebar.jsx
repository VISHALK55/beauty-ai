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
  Store
} from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 h-screen border-r border-white/5 flex flex-col glass-panel rounded-none shrink-0">
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gold-500">Beauty<span className="text-white">AI</span></h1>
      <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Salon Dashboard</p>
    </div>
    
    <nav className="flex-1 px-4 space-y-2 mt-4">
      <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={20}/> Dashboard
      </NavLink>
      <NavLink to="/appointments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Calendar size={20}/> Appointments
      </NavLink>
      <NavLink to="/staff" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Users size={20}/> Staff & CRM
      </NavLink>
      <NavLink to="/services" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Scissors size={20}/> Services
      </NavLink>
      <NavLink to="/ai-receptionist" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <MessageSquare size={20}/> AI Chat Bot
      </NavLink>
      <NavLink to="/voice-calls" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <PhoneCall size={20}/> AI Voice Calls
      </NavLink>
      <NavLink to="/geo-rank" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <MapPin size={20}/> Geo Rank AI
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Settings size={20}/> Settings
      </NavLink>
    </nav>
    
    <div className="p-6 border-t border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-dark-900 font-bold">
          JD
        </div>
        <div>
          <p className="text-sm font-medium">Jane Doe</p>
          <p className="text-xs text-gray-400">Owner</p>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
