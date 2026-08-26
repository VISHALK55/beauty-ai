import React, { useState } from 'react';
import { Menu, Zap, ArrowLeft } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      <main className="flex-1 min-h-[calc(100vh-65px)] lg:h-screen lg:overflow-y-auto w-full flex flex-col">
        {/* Global Back Button */}
        <div className="w-full px-4 sm:px-6 md:px-10 pt-6 pb-0 flex items-center justify-start shrink-0">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm font-medium bg-secondary/50 px-3 py-1.5 rounded-lg border border-divider-strong hover:border-gold-500/30"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
