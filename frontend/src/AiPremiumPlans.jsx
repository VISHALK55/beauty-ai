import React from 'react';
import { Check, Sparkles, PhoneCall, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

const plans = [
  {
    name: "AI Chat Assistant",
    icon: <MessageSquare size={24} className="text-pink-500" />,
    price: "₹999",
    period: "/month",
    description: "Automate your WhatsApp and Web Chat with a 24/7 intelligent virtual receptionist.",
    features: [
      "24/7 Automated Responses",
      "WhatsApp Integration",
      "Website Chat Widget",
      "Basic Intent Recognition",
      "Standard Email Support"
    ],
    buttonText: "Upgrade to Chat AI",
    highlighted: false,
    color: "from-pink-500 to-rose-400"
  },
  {
    name: "AI Voice Receptionist",
    icon: <PhoneCall size={24} className="text-gold-500" />,
    price: "₹2,499",
    period: "/month",
    description: "Never miss a booking. Human-like voice AI answers calls and handles basic scheduling.",
    features: [
      "Human-like Voice Call Handling",
      "Missed Call Recovery & Whisper",
      "Virtual Number Routing",
      "Call Recording & Transcripts",
      "Priority Support"
    ],
    buttonText: "Upgrade to Voice AI",
    highlighted: true,
    color: "from-gold-600 to-amber-400"
  },
  {
    name: "Ultimate AI Suite",
    icon: <Sparkles size={24} className="text-purple-500" />,
    price: "₹3,499",
    period: "/month",
    description: "The complete automation engine. Dominate your market with total AI coverage.",
    features: [
      "Everything in Voice & Chat",
      "Advanced NLP Booking Engine",
      "Multi-Language Support",
      "Custom Brand Voice Tuning",
      "Dedicated Success Manager"
    ],
    buttonText: "Get the Ultimate Suite",
    highlighted: false,
    color: "from-purple-600 to-indigo-400"
  }
];

export default function AiPremiumPlans() {
  return (
    <div className="h-full overflow-y-auto bg-dark-950 p-6 md:p-10 relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gold-500/10 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} /> Premium Modules
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-6">
            Unlock Hyper-Speed <span className="text-gold-500">Automation</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Supercharge your salon's growth with our proprietary AI features. Reduce missed opportunities to zero and let our virtual assistants handle your clients 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-3xl p-1 bg-gradient-to-b border border-white/10 overflow-hidden group hover:scale-105 transition-transform duration-300 ${
                plan.highlighted ? 'from-gold-500/50 to-dark-900 shadow-[0_0_40px_rgba(212,175,55,0.15)]' : 'from-white/10 to-dark-900'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-gold-500 text-dark-950 text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider z-20">
                  Most Popular
                </div>
              )}
              
              <div className="bg-dark-900 h-full rounded-[23px] p-8 flex flex-col relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-dark-800 border border-white/5 flex items-center justify-center mb-6 shadow-inner">
                  {plan.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1">
                        <Check size={16} className={plan.highlighted ? "text-gold-500" : "text-gray-400"} />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.highlighted 
                      ? 'bg-gold-500 hover:bg-gold-400 text-dark-950 shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                      : 'bg-dark-800 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <ShieldCheck size={18} />
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
          <ShieldCheck size={16} /> Secure integration. Cancel or upgrade at any time.
        </div>
      </div>
    </div>
  );
}
