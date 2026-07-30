import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Scissors } from 'lucide-react';
import { api } from './api';

const BookingModal = ({ isOpen, onClose, onBookingCreated }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    serviceId: '',
    date: '',
    time: '10:00'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      const data = await api.getSalonServices('pihu-makeover-beauty-salon');
      if (data && data.length > 0) {
        setServices(data);
        setFormData(prev => ({ ...prev, serviceId: data[0].id }));
      }
    }
    if (isOpen) {
      loadServices();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedService = services.find(s => s.id === formData.serviceId) || services[0];
      
      const newBooking = {
        customerName: formData.customerName,
        salonName: 'Pihu Makeover Saloon',
        serviceName: selectedService ? selectedService.name : 'Custom Service',
        price: selectedService ? selectedService.priceINR : 0,
        date: formData.date || new Date().toISOString().split('T')[0],
        time: formData.time || '11:00 AM',
        status: 'Confirmed',
        phone: '+91 99345 ' + Math.floor(10000 + Math.random() * 90000),
        source: 'Manual Booking'
      };

      await api.createAppointment('pihu-makeover-beauty-salon', newBooking);

      if (onBookingCreated) {
        onBookingCreated();
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
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
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} (₹{s.priceINR})</option>
                  ))}
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
