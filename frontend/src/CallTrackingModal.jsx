import React, { useState, useEffect } from 'react';
import { Phone, PhoneCall, Volume2, ShieldCheck, CheckCircle2, X, Clock, MapPin } from 'lucide-react';

export default function CallTrackingModal({ isOpen, onClose, salonName, salonPhone, salonId }) {
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, whisper, connected, ended
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setCallStatus('connecting');
      setSeconds(0);

      // Step 1: Connecting
      const t1 = setTimeout(() => {
        setCallStatus('whisper'); // Play 2s Audio Whisper
      }, 1500);

      // Step 2: Connected after whisper
      const t2 = setTimeout(() => {
        setCallStatus('connected');
      }, 3500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  if (!isOpen) return null;

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-secondary border border-accent-light rounded-3xl p-6 sm:p-8 max-w-md w-full relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white p-2 rounded-full bg-white/5 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-light text-accent border border-accent-light rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          <ShieldCheck size={14} /> Beauty AI Telephony Call Gateway
        </div>

        {/* Salon Info */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-accent to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-pulse">
            <PhoneCall size={36} className="text-primary" />
          </div>
          <h3 className="text-2xl font-serif text-content font-bold">{salonName || "Pihu Makeover Saloon"}</h3>
          <p className="text-muted text-sm mt-1 flex items-center justify-center gap-1">
            <MapPin size={14} className="text-accent" /> Main Road, Bodhgaya & Gaya
          </p>
        </div>

        {/* Call Progress Status Box */}
        <div className="bg-dark-800/80 border border-divider-strong rounded-2xl p-5 text-center mb-6 relative overflow-hidden">
          {callStatus === 'connecting' && (
            <div className="space-y-2">
              <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-accent font-bold text-sm">Routing Call via Beauty AI Virtual Gateway...</p>
              <p className="text-muted text-xs font-mono">Virtual Number: +91 80691 28800</p>
            </div>
          )}

          {callStatus === 'whisper' && (
            <div className="space-y-2 animate-bounce">
              <p className="text-pink-400 font-bold text-sm flex items-center justify-center gap-2">
                <Volume2 size={18} className="animate-pulse" /> Playing Audio Whisper to Salon Owner:
              </p>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-3 text-pink-300 font-mono text-xs italic">
                🔊 "Incoming customer lead from Beauty AI Platform..."
              </div>
            </div>
          )}

          {callStatus === 'connected' && (
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                Call Active & Logged
              </span>
              <h4 className="text-3xl font-mono font-bold text-content tracking-widest">{formatTime(seconds)}</h4>
              <p className="text-xs text-muted">Caller ID displayed on Salon Phone: <strong className="text-content">Beauty AI (+91 98765...)</strong></p>
            </div>
          )}
        </div>

        {/* Telephony Attribution Proof Box */}
        <div className="bg-accent-light border border-gold-500/20 rounded-xl p-4 text-xs text-muted space-y-2 mb-6">
          <div className="flex justify-between items-center text-accent font-bold">
            <span>Call Attribution Status</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={12} /> 100% Tracked</span>
          </div>
          <p className="text-muted leading-relaxed">
            This call is logged in Pihu Makeover's <strong className="text-content">Partner Command Center Dashboard</strong> as proof of lead generation.
          </p>
        </div>

        {/* End Call Button */}
        <button
          onClick={() => {
            setCallStatus('ended');
            onClose();
          }}
          className="w-full py-4 bg-red-600 hover:bg-red-500 text-content font-bold rounded-2xl text-base transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Phone size={18} /> End & Return to Salon Page
        </button>
      </div>
    </div>
  );
}
