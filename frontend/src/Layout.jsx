import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Zap } from 'lucide-react';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-dark-900 animate-fade-in text-white overflow-x-hidden">
      {/* Mobile Top Header (Visible on Mobile & Tablet) */}
      <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-dark-950/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-transform"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gold-500 leading-tight">Beauty<span className="text-white">AI</span></h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Pihu Makeover</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-full text-[10px] font-bold flex items-center gap-1">
            <Zap size={12} /> Rank #1
          </span>
        </div>
      </header>

      {/* Responsive Sidebar (Desktop sidebar + Mobile drawer) */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 min-h-[calc(100vh-65px)] lg:h-screen lg:overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
