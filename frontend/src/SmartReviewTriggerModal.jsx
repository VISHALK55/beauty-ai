import React from 'react';
import { MessageSquare, X, Star } from 'lucide-react';

export default function SmartReviewTriggerModal({ isOpen, onClose, appointment, salonId, salonName }) {
  if (!isOpen || !appointment) return null;

  const reviewLink = `https://beautyai.makeup/review/${salonId}`;
  
  const rawMessage = `Hi ${appointment.customerName.split(' ')[0]}, thank you for visiting ${salonName} today! As a thank you, here is 10% off your next visit. Please let us know how we did here: ${reviewLink}`;
  
  const handleSend = () => {
    // Open WhatsApp Web with the pre-filled message
    const formattedPhone = appointment.phone.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(rawMessage);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, '_blank');
    onClose(); // Auto-close after triggering
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans animate-fade-in">
      <div className="max-w-xl w-full bg-secondary border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
        
        {/* Header */}
        <div className="p-6 border-b border-divider bg-tertiary flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif text-content flex items-center gap-2">
              <Star className="text-gold-400 fill-gold-400" size={24} /> 
              Smart Review Trigger
            </h2>
            <p className="text-sm text-muted mt-1">Appointment completed. Dispatch review request?</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-secondary border border-divider hover:border-gold-500/50 text-muted hover:text-white rounded-lg transition-colors z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="glass-panel p-4 bg-tertiary/50">
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Target Client</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-content">{appointment.customerName}</span>
              <span className="text-sm text-accent">{appointment.phone}</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Generated Payload</p>
            <div className="p-4 bg-primary border border-divider-strong rounded-xl text-content text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {rawMessage}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-tertiary border-t border-divider-strong flex flex-col sm:flex-row justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-secondary hover:bg-primary border border-divider-strong text-content font-bold rounded-xl transition-colors w-full sm:w-auto"
          >
            Skip for now
          </button>
          <button 
            onClick={handleSend}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <MessageSquare size={18} />
            Dispatch via WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}
