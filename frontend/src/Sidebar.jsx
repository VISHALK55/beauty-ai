import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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
  X,
  Lock,
  Image,
  LogOut
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAuthenticated, logout, userRole, salonId } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
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
        className={`fixed lg:static top-0 left-0 bottom-0 w-72 lg:w-64 h-screen border-r border-divider-strong flex flex-col glass-panel rounded-none shrink-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-divider">
          <div>
            <h1 className="text-2xl font-bold text-accent">Beauty<span className="text-content">AI</span></h1>
            <p className="text-xs text-muted mt-0.5 uppercase tracking-widest font-sans">Salon Platform</p>
          </div>
          {/* Close button for Mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-muted hover:text-white rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          <NavLink to="/services" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Scissors size={18}/> Services
          </NavLink>
          <NavLink to="/dashboard/appointments" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Calendar size={18}/> Appointments
          </NavLink>
          <NavLink to="/dashboard/ai-premium" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <MessageSquare size={18}/> AI Chat Bot
          </NavLink>
          <NavLink to="/dashboard/ai-premium" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <PhoneCall size={18}/> AI Voice Calls
          </NavLink>
          <NavLink to="/dashboard/content" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Image size={18}/> Website Content
          </NavLink>
          <NavLink to="/dashboard/settings" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={18}/> Settings
          </NavLink>

          {/* SUPER ADMIN SECTION */}
          {isAuthenticated && userRole === 'SUPER_ADMIN' && (
            <>
              <div className="mt-8 mb-2 px-4 flex justify-between items-center">
                <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Super Admin</p>
              </div>
              <div className={userRole !== 'SUPER_ADMIN' ? 'opacity-50 pointer-events-none grayscale select-none' : ''}>
                <NavLink to="/dashboard/salons" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''} border border-gold-500/20 bg-gold-900/10`}>
                  <Store size={18} className={userRole === 'SUPER_ADMIN' ? "text-accent" : "text-muted"} /> All Salons (Network)
                  {userRole !== 'SUPER_ADMIN' && <Lock size={14} className="ml-auto text-muted" />}
                </NavLink>
                <NavLink to="/dashboard/onboard-partner" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Users size={18} className={userRole === 'SUPER_ADMIN' ? "text-green-400" : "text-muted"} /> Onboard Partner
                  {userRole !== 'SUPER_ADMIN' && <Lock size={14} className="ml-auto text-muted" />}
                </NavLink>
                <NavLink to="/dashboard/ad-campaigns" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Store size={18}/> Ad Campaign Manager
                  {userRole !== 'SUPER_ADMIN' && <Lock size={14} className="ml-auto text-muted" />}
                </NavLink>
                <NavLink to="/dashboard/speed-control" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Zap size={18}/> Hyper-Speed Engine
                  {userRole !== 'SUPER_ADMIN' && <Lock size={14} className="ml-auto text-muted" />}
                </NavLink>
                <NavLink to="/dashboard/geo-rank" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <MapPin size={18}/> Geo Rank AI
                  {userRole !== 'SUPER_ADMIN' && <Lock size={14} className="ml-auto text-muted" />}
                </NavLink>
                <NavLink to="/dashboard/google-preview" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <Search size={18}/> Google Search View
                  {userRole !== 'SUPER_ADMIN' && <Lock size={14} className="ml-auto text-muted" />}
                </NavLink>
                <NavLink to="/dashboard/super-admin-settings" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''} mt-4 border-t border-divider-strong pt-4`}>
                  <Settings size={18}/> Security Settings
                  {userRole !== 'SUPER_ADMIN' && <Lock size={14} className="ml-auto text-muted" />}
                </NavLink>
              </div>
            </>
          )}
        </nav>
        
        {/* Global User Section */}
        <div className="p-4 border-t border-divider">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                {userRole === 'SUPER_ADMIN' ? 'SA' : salonId ? salonId.substring(0, 2).toUpperCase() : 'PM'}
              </div>
              <div>
                <p className="text-sm font-bold text-content">{userRole === 'SUPER_ADMIN' ? 'Super Admin' : salonId || 'Pihu Makeover'}</p>
                <p className="text-[10px] text-accent tracking-wider">Authorized Access</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center gap-2" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
