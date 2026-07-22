import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Scissors } from 'lucide-react';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    serviceId: 'srv_1',
    date: '',
    time: '10:00'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + 'api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salonId: 'salon_123', // Hardcoded for demo
          customerId: 'cust_' + Math.floor(Math.random() * 1000),
          staffId: 'staff_1',
          serviceId: formData.serviceId,
          startTime: formData.time,
          date: formData.date
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        console.error('Failed to book');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="glass-panel w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-serif mb-6">New Appointment</h2>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon size={32} />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Booking Confirmed!</h3>
            <p className="text-gray-400">Your appointment has been successfully scheduled.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Customer Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Service</label>
              <div className="relative">
                <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <select 
                  value={formData.serviceId}
                  onChange={e => setFormData({...formData, serviceId: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white appearance-none"
                >
                  <option value="srv_1">Premium Haircut & Styling (₹1500)</option>
                  <option value="srv_2">Color & Highlights (₹4500)</option>
                  <option value="srv_3">Bridal Makeup (₹15000)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary mt-6 flex justify-center items-center h-12"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
