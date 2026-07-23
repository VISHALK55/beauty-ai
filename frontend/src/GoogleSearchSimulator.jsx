import React, { useState } from 'react';
import { Search, MapPin, Star, Phone, Globe, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Zap, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { calculateAcceleratedTimeline } from './HyperSpeedSeoAlgorithm';

export default function GoogleSearchSimulator() {
  const [query, setQuery] = useState('best beauty parlour in bodhgaya');
  const [activeTab, setActiveTab] = useState('all');
  const timeline = calculateAcceleratedTimeline();

  return (
    <div className="px-4 py-6 sm:px-6 md:px-10 md:py-8 min-h-full">
      <header className="mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={14} /> Real-Time Google SERP Simulator
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight">
          How Customers See Pihu Makeover on Google
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base md:text-lg">
          Simulate real customer searches on Google Mobile & Desktop for Bodhgaya & Gaya.
        </p>
      </header>

      {/* Simulated Google Search Bar */}
      <div className="bg-white text-gray-900 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto mb-8 md:mb-10 border border-gray-200">
        <div className="flex items-center gap-3 bg-gray-100 px-5 py-3.5 rounded-full border border-gray-300 shadow-inner">
          <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 font-medium outline-none text-base"
          />
          <Search size={18} className="text-gray-400" />
        </div>

        {/* Google Filter Pills */}
        <div className="flex gap-6 mt-4 border-b border-gray-200 pb-2 px-2 text-sm font-medium text-gray-600">
          <span className={`cursor-pointer pb-2 border-b-2 ${activeTab === 'all' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent'}`} onClick={() => setActiveTab('all')}>All</span>
          <span className={`cursor-pointer pb-2 border-b-2 ${activeTab === 'maps' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent'}`} onClick={() => setActiveTab('maps')}>Maps</span>
          <span className="text-gray-400">Images</span>
          <span className="text-gray-400">News</span>
        </div>

        {/* ---------------------------------------------------- */}
        {/* GOOGLE MAPS 3-PACK SECTION (THE TOP PACK) */}
        {/* ---------------------------------------------------- */}
        <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-50">
          <div className="bg-blue-50 px-5 py-3 border-b border-blue-100 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
              <MapPin size={14} /> Google Local Pack (Rank #1 in Bodhgaya)
            </span>
            <span className="text-xs text-gray-500 font-mono">Near Mahabodhi Temple</span>
          </div>

          {/* Map Pack Result Card - Pihu Makeover */}
          <div className="p-4 sm:p-5 bg-white border-b border-gray-200 hover:bg-blue-50/40 transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                    Pihu Makeover Saloon
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck size={10} /> Google Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs sm:text-sm">
                  <span className="font-bold text-amber-600">4.9</span>
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-gray-500 font-medium">(215 reviews)</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">Beauty salon</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-normal">
                  Main Road, Near Mahabodhi Temple, Bodhgaya, Bihar • Open ⋅ Closes 9 PM
                </p>
                <p className="text-xs text-emerald-700 font-medium mt-1.5 flex items-center gap-1">
                  <CheckCircle2 size={12} className="shrink-0" /> WhatsApp Booking & AI Voice Confirmation Available
                </p>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <a
                  href="tel:+919876543210"
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-semibold hover:bg-blue-100 flex items-center gap-1.5 justify-center"
                >
                  <Phone size={13} /> Call
                </a>
                <Link
                  to="/salon/pihu-makeover/bridal-makeup/bodhgaya"
                  target="_blank"
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-semibold hover:bg-blue-700 flex items-center gap-1.5 justify-center shadow-sm"
                >
                  <Globe size={13} /> Website
                </Link>
              </div>
            </div>
          </div>

          {/* Competitor Result 2 (Lower Rank) */}
          <div className="p-4 bg-gray-50/60 opacity-60 border-b border-gray-200 text-xs">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-700">Radiance Beauty Care</p>
                <p className="text-gray-500">4.7 ★ (145 reviews) • Temple Street, Bodhgaya</p>
              </div>
              <span className="text-gray-400">Rank #2</span>
            </div>
          </div>
        </div>

        {/* ORGANIC SEARCH RESULT CARD */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Organic Search Result #1</span>
          
          <div className="mt-2">
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
              <span className="w-4 h-4 rounded-full bg-gold-500 text-dark-900 font-bold flex items-center justify-center text-[10px]">P</span>
              <span>surbhibeauty.com › salon › pihu-makeover › bridal-makeup</span>
            </div>

            <Link
              to="/salon/pihu-makeover/bridal-makeup/bodhgaya"
              target="_blank"
              className="text-xl font-semibold text-blue-700 hover:underline block leading-snug"
            >
              Bridal HD Makeup in Bodhgaya | Pihu Makeover Saloon
            </Link>

            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              Book Bridal HD Makeup at Pihu Makeover Saloon near Mahabodhi Temple in Bodhgaya. Rejuvenating hair spa, HD bridal makeup, and facial treatments. Rated <strong className="text-gray-900">4.9 ★ (215 Google Reviews)</strong>. 24/7 Instant AI Booking Available.
            </p>

            <div className="mt-3 flex items-center gap-3 text-xs text-blue-600 font-medium">
              <Link to="/salon/pihu-makeover/bridal-makeup/bodhgaya" target="_blank" className="hover:underline flex items-center gap-1">
                Book Appointment Online <ExternalLink size={12} />
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/salon/pihu-makeover/hair-spa/sujata-bypass" target="_blank" className="hover:underline">
                Hair Spa Packages
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/salon/pihu-makeover/facial/kalchakra-maidan" target="_blank" className="hover:underline">
                Sujata Bypass Branch
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* HIGH-LEVEL ACCELERATION ALGORITHM DASHBOARD */}
      {/* ---------------------------------------------------- */}
      <div className="max-w-4xl mx-auto glass-panel p-8 border border-gold-500/30 rounded-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-serif flex items-center gap-2 text-white">
              Hyper-Speed Acceleration Engine <Zap className="text-gold-400 fill-gold-400/20" size={24} />
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Timeline cut down from 3 weeks to 7 days using Google Instant Indexing API & 15-min Review Dispatch.
            </p>
          </div>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            Algorithm Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase text-xs">
                <th className="py-3 px-4">Milestone</th>
                <th className="py-3 px-4">Standard Time</th>
                <th className="py-3 px-4 text-gold-400">Accelerated Time</th>
                <th className="py-3 px-4">Algorithm Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {timeline.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">{item.milestone}</td>
                  <td className="py-4 px-4 text-gray-500 line-through">{item.standardTime}</td>
                  <td className="py-4 px-4 text-gold-400 font-bold text-base flex items-center gap-1">
                    <Zap size={14} /> {item.acceleratedTime}
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-400 font-mono">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
