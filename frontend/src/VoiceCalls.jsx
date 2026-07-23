import React, { useState } from 'react';
import { 
  PhoneCall, 
  PhoneIncoming, 
  PhoneMissed, 
  Play, 
  CheckCircle, 
  Clock,
  Mic,
  CalendarCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const mockCalls = [
  {
    id: 1,
    caller: "+91 98765 43210",
    time: "10:45 AM",
    duration: "2m 14s",
    status: "Booked",
    type: "incoming",
    aiHandled: true,
    transcript: [
      { speaker: "AI", text: "Hello! Thank you for calling Surbhi Beauty Parlour. I am the AI assistant. How can I help you today?" },
      { speaker: "Caller", text: "Hi, do you have any slots available for bridal makeup this Sunday?" },
      { speaker: "AI", text: "Yes, we have availability at 11:00 AM and 2:00 PM this Sunday for Bridal HD Makeup. Which slot works best for you?" },
      { speaker: "Caller", text: "11 AM works perfect." },
      { speaker: "AI", text: "Excellent! I have booked your appointment for Sunday at 11:00 AM. We look forward to seeing you!" }
    ]
  },
  {
    id: 2,
    caller: "+91 87654 32109",
    time: "09:30 AM",
    duration: "45s",
    status: "Inquiry",
    type: "incoming",
    aiHandled: true,
    transcript: [
      { speaker: "AI", text: "Hello! Thank you for calling Surbhi Beauty Parlour. How can I assist you?" },
      { speaker: "Caller", text: "What time do you close today?" },
      { speaker: "AI", text: "We are open until 8:00 PM today. Would you like to schedule an appointment before we close?" },
      { speaker: "Caller", text: "No thanks, just checking." },
      { speaker: "AI", text: "You're welcome! Have a great day." }
    ]
  },
  {
    id: 3,
    caller: "+91 76543 21098",
    time: "Yesterday",
    duration: "0s",
    status: "Missed",
    type: "missed",
    aiHandled: false,
    transcript: null
  }
];

const StatCard = ({ title, value, icon, subtitle }) => (
  <div className="glass-panel p-6 animate-slide-up hover:-translate-y-1 transition-transform duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">{title}</p>
        <h3 className="text-3xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{value}</h3>
      </div>
      <div className="p-4 bg-dark-900/50 rounded-2xl text-gold-400 border border-white/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm">
      <span className="text-gold-400 font-medium">{subtitle}</span>
    </div>
  </div>
);

const CallRow = ({ call }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group mb-4">
      <div 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between p-5 bg-dark-900/50 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all cursor-pointer shadow-lg hover:shadow-gold-500/10 relative overflow-hidden"
      >
        {/* Subtle left border accent */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${call.type === 'missed' ? 'bg-rose-500' : 'bg-gold-500'}`}></div>
        
        <div className="flex items-center gap-5 pl-2">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${
            call.type === 'missed' ? 'bg-rose-500/20 text-rose-500' : 'bg-dark-800 text-gold-400'
          }`}>
            {call.type === 'missed' ? <PhoneMissed size={20} /> : <PhoneIncoming size={20} />}
          </div>
          <div>
            <p className="font-semibold text-lg tracking-wide">{call.caller}</p>
            <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
              <span className="flex items-center gap-1"><Clock size={14} /> {call.time}</span>
              {call.duration !== "0s" && <span>• {call.duration}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              call.status === 'Booked' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
              call.status === 'Inquiry' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
              'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              {call.status === 'Booked' && <CalendarCheck size={12} />}
              {call.status}
            </span>
            {call.aiHandled && (
              <p className="text-xs text-gold-400/80 mt-2 flex items-center justify-end gap-1 font-medium">
                <Mic size={12} /> AI Handled
              </p>
            )}
          </div>
          
          <button className="p-2 text-gray-500 group-hover:text-gold-400 transition-colors">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Expandable Transcript Area */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <div className="glass-panel p-6 ml-6 mr-2 relative border-l-2 border-gold-500/30 rounded-l-none">
          {call.transcript ? (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gold-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Play size={14} className="fill-gold-400" /> Audio Transcript
              </h4>
              {call.transcript.map((line, idx) => (
                <div key={idx} className={`flex ${line.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    line.speaker === 'AI' 
                      ? 'bg-dark-800 text-gray-200 rounded-tl-sm border border-white/5' 
                      : 'bg-gold-500/10 text-gold-50 border border-gold-500/20 rounded-tr-sm'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">
                      {line.speaker}
                    </span>
                    <p className="text-sm">{line.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <PhoneMissed size={32} className="mb-2 opacity-50" />
              <p>No transcript available for missed calls.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function VoiceCalls() {
  return (
    <div className="px-10 py-8 min-h-full">
      <header className="flex justify-between items-center mb-10 animate-fade-in">
        <div>
          <h1 className="text-4xl font-serif tracking-tight">AI Voice Calls</h1>
          <p className="text-gray-400 mt-2 text-lg">Monitor all phone conversations handled by your AI.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            AI Agent Online
          </div>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Total Calls" 
          value="142" 
          icon={<PhoneCall size={28} strokeWidth={1.5} />} 
          subtitle="This week" 
        />
        <StatCard 
          title="AI Resolution Rate" 
          value="94%" 
          icon={<CheckCircle size={28} strokeWidth={1.5} />} 
          subtitle="Handled without human" 
        />
        <StatCard 
          title="New Bookings" 
          value="28" 
          icon={<CalendarCheck size={28} strokeWidth={1.5} />} 
          subtitle="Generated via phone" 
        />
      </div>

      {/* Call Log */}
      <div className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-serif">Recent Calls</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-dark-800 rounded-lg text-sm border border-white/10 hover:border-gold-500/50 transition-colors">All Calls</button>
            <button className="px-4 py-2 bg-dark-900 rounded-lg text-sm text-gray-400 border border-transparent hover:border-white/10 transition-colors">Missed</button>
            <button className="px-4 py-2 bg-dark-900 rounded-lg text-sm text-gray-400 border border-transparent hover:border-white/10 transition-colors">Booked</button>
          </div>
        </div>
        
        <div className="space-y-2">
          {mockCalls.map(call => (
            <CallRow key={call.id} call={call} />
          ))}
        </div>
      </div>
    </div>
  );
}
