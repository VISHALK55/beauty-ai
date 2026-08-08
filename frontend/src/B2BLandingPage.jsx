import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Globe, Bot, MapPin, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function B2BLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-content font-sans overflow-x-hidden">
      <Helmet>
        <title>BeautyAI | The Ultimate Salon SaaS Platform</title>
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-divider-strong">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
              <Sparkles className="text-black" size={20} />
            </div>
            <span className="text-2xl font-bold font-serif tracking-wide text-content">
              Beauty<span className="text-accent">AI</span>
            </span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-divider-strong text-sm font-medium transition-all"
          >
            Partner Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:pt-52 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-black to-black -z-10"></div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light border border-gold-500/20 text-accent text-sm font-medium mb-8 animate-fade-in-up">
            <Sparkles size={16} /> 
            <span>The Future of Salon Management</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold tracking-tight mb-8 animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Is your salon losing clients <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
              while you sleep?
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-muted max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            Stop missing out on high-paying clients. BeautyAI installs a 24/7 AI-powered sales system into your salon, complete with a luxury digital storefront.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent hover:bg-gold-400 text-black font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              Launch Your Platform <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => window.open('http://beauty-ai-frontend-20260806.s3-website-us-east-1.amazonaws.com', '_blank')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-divider-strong text-content font-medium text-lg transition-colors"
            >
              View Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof / Trusted By */}
      <section className="py-12 px-6 border-y border-divider bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-bold text-muted uppercase tracking-widest mb-6">Powering Elite Salons in Bihar</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            
            <div className="flex items-center gap-4 bg-secondary border border-divider-strong px-8 py-4 rounded-2xl cursor-pointer hover:border-gold-500/50 transition-colors" onClick={() => window.open('http://beauty-ai-frontend-20260806.s3-website-us-east-1.amazonaws.com', '_blank')}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-serif font-bold text-black text-xl">P</div>
              <div className="text-left">
                <p className="text-content font-bold text-lg leading-tight">Pihu Makeover</p>
                <p className="text-accent text-sm flex items-center gap-1"><MapPin size={12}/> Bodhgaya (Active)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-secondary border border-divider-strong px-8 py-4 rounded-2xl opacity-90">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-serif font-bold text-content text-xl">H</div>
              <div className="text-left">
                <p className="text-content font-bold text-lg leading-tight">Glamour Studio</p>
                <p className="text-accent text-sm flex items-center gap-1"><MapPin size={12}/> Gaya (Active)</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">The Ultimate Growth Engine</h2>
            <p className="text-muted max-w-2xl mx-auto">We don't just build you a website. We automate your booking pipeline.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Globe />}
              title="Premium Digital Storefront"
              desc="A stunning, high-end website customized with your brand and photos, generated instantly."
            />
            <FeatureCard 
              icon={<Bot />}
              title="24/7 AI Receptionist"
              desc="An AI that never sleeps, answering customer queries on WhatsApp and securing bookings at 2 AM."
            />
            <FeatureCard 
              icon={<MapPin />}
              title="Geo-Rank SEO"
              desc="Dominate local searches. Our programmatic SEO engine ranks your salon in every neighborhood."
            />
            <FeatureCard 
              icon={<TrendingUp />}
              title="Smart CRM"
              desc="Manage all AI-confirmed bookings, track revenue, and launch ad campaigns from one dashboard."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-secondary to-black border border-divider-strong rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-light blur-[100px] rounded-full -z-10"></div>
          
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-serif font-bold leading-tight">
              Live in <span className="text-accent">60 Seconds.</span>
            </h2>
            <p className="text-lg text-muted">
              Stop paying JustDial. Stop paying expensive content creators to run your ads. Our platform automatically generates a premium booking website that ranks on Google and books clients for you.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3"><ShieldCheck className="text-accent" /> Fully Branded to your Salon</li>
              <li className="flex items-center gap-3"><ShieldCheck className="text-accent" /> Mobile Optimized</li>
              <li className="flex items-center gap-3"><ShieldCheck className="text-accent" /> Instant Global URL</li>
            </ul>
          </div>
          <div className="flex-1">
            <div className="bg-black border border-divider-strong rounded-2xl p-2 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-transparent opacity-20 rounded-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000" 
                alt="Salon Demo" 
                className="w-full h-auto rounded-xl object-cover aspect-[4/3] opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-primary">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Simple, One-Time Pricing</h2>
          <p className="text-muted max-w-2xl mx-auto mb-16">Stop paying JustDial commissions and expensive marketing agencies. Own your platform forever.</p>
          
          <div className="max-w-2xl mx-auto text-left">
            <div className="bg-gradient-to-b from-gold-900/40 to-secondary border border-accent-light p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-light blur-3xl -z-10"></div>
              <h3 className="text-3xl font-bold text-accent mb-2">Lifetime Access</h3>
              <div className="text-5xl font-serif font-bold text-content mb-6">₹7,999 <span className="text-xl text-muted font-sans font-normal">one-time</span></div>
              <p className="text-muted mb-8 text-lg">A complete, done-for-you digital storefront and AI growth engine. No recurring fees, no hidden costs.</p>
              <ul className="space-y-4 mb-10 text-gray-200">
                <li className="flex items-center gap-3 text-lg"><ShieldCheck size={24} className="text-accent" /> Premium Website Design & Hosting</li>
                <li className="flex items-center gap-3 text-lg"><ShieldCheck size={24} className="text-accent" /> 24/7 AI WhatsApp Receptionist</li>
                <li className="flex items-center gap-3 text-lg"><ShieldCheck size={24} className="text-accent" /> Automated Geo-Rank SEO (No JustDial Needed)</li>
                <li className="flex items-center gap-3 text-lg"><ShieldCheck size={24} className="text-accent" /> CRM Dashboard to Manage Bookings</li>
              </ul>
              <button onClick={() => navigate('/login')} className="w-full py-4 rounded-xl bg-accent hover:bg-gold-400 text-black font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Launch My Salon Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-divider-strong text-center text-muted text-sm">
        <p>&copy; {new Date().getFullYear()} BeautyAI Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-secondary border border-divider hover:border-gold-500/30 p-8 rounded-2xl transition-colors group">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
