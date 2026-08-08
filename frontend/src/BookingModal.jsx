import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Scissors, Phone } from 'lucide-react';
import { api } from './api';

const BookingModal = ({ isOpen, onClose, onBookingCreated, preselectedService, salonId = 'pihu-makeover-beauty-salon', salonName = 'Pihu Makeover Saloon' }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '10:00'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      const data = await api.getSalonServices(salonId);
      if (data && data.length > 0) {
        setServices(data);
        if (!preselectedService) {
          setFormData(prev => ({ ...prev, serviceId: data[0].id }));
        }
      }
    }
    if (isOpen) {
      loadServices();
    }
  }, [isOpen, preselectedService, salonId]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedService = services.find(s => s.id === formData.serviceId) || services[0];
      const serviceNameToUse = preselectedService || (selectedService ? selectedService.name : 'Custom Service');
      
      let finalPrice = 0;
      if (preselectedService) {
        const matched = services.find(s => s.name.toLowerCase().includes(preselectedService.toLowerCase().split(' ')[0]));
        if (matched) finalPrice = matched.priceINR;
      } else if (selectedService) {
        finalPrice = selectedService.priceINR;
      }
      
        const newBooking = {
          customerName: formData.customerName,
          salonName: salonName,
          serviceName: serviceNameToUse,
          price: finalPrice,
          date: formData.date || new Date().toISOString().split('T')[0],
          time: formData.time || '11:00 AM',
          status: 'Confirmed',
          phone: formData.phone,
          source: 'Manual Booking'
        };

      const res = await api.createAppointment(salonId, newBooking);

      if (!res) {
        throw new Error('Backend failed to create appointment');
      }

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
      alert('Failed to connect to the backend and create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="glass-panel w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-serif mb-6">New Appointment</h2>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon size={32} />
            </div>
            <h3 className="text-xl font-medium text-content mb-2">Booking Confirmed!</h3>
            <p className="text-muted">Your appointment has been successfully scheduled.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Customer Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="text" 
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-tertiary border border-divider-strong rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-content"
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 bg-tertiary border border-divider-strong rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-content"
                  placeholder=""
                />
              </div>
            </div>

            {!preselectedService ? (
              <div>
                <label className="block text-sm text-muted mb-1">Service</label>
                <div className="relative">
                  <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <select 
                    value={formData.serviceId}
                    onChange={e => setFormData({...formData, serviceId: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-tertiary border border-divider-strong rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-content appearance-none"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.priceINR})</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm text-muted mb-1">Selected Service</label>
                <div className="relative">
                  <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={16} />
                  <div className="w-full pl-10 pr-4 py-2 bg-dark-800/50 border border-accent-light rounded-lg text-accent flex items-center">
                    {preselectedService}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted mb-1">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-tertiary border border-divider-strong rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-content [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input 
                    type="time" 
                    required
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-tertiary border border-divider-strong rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-content [color-scheme:dark]"
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
