import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Zap } from 'lucide-react';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-secondary animate-fade-in text-content overflow-x-hidden">
      {/* Mobile Top Header (Visible on Mobile & Tablet) */}
      <header className="lg:hidden flex items-center justify-between px-5 py-4 bg-dark-950/90 backdrop-blur-md border-b border-divider-strong sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-muted hover:text-white rounded-lg bg-white/5 border border-divider-strong active:scale-95 transition-transform"
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-accent leading-tight">Beauty<span className="text-content">AI</span></h1>
            <p className="text-[10px] text-muted uppercase tracking-widest">Pihu Makeover</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-accent-light text-accent border border-gold-500/20 rounded-full text-[10px] font-bold flex items-center gap-1">
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
