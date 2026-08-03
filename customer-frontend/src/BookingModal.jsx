import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { createAppointment } from './api';
import { format, addDays } from 'date-fns';

export default function BookingModal({ service, onClose }) {
    const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Success
    const [date, setDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
    const [time, setTime] = useState('10:00');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timeSlots = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];

    const handleBook = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createAppointment({
                customerName: name,
                salonName: "Pihu Makeover",
                serviceName: service.name,
                price: 0,
                date: date,
                time: time,
                status: "CONFIRMED",
                phone: phone,
                source: "CUSTOMER_WEBSITE"
            });
            setStep(3);
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Failed to book appointment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="bg-amber-50 px-6 py-4 flex justify-between items-center border-b border-amber-100">
                    <div>
                        <h2 className="text-xl font-serif text-gray-900">Book Appointment</h2>
                        <p className="text-sm text-amber-700">{service.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-amber-600" /> Select Date
                                </label>
                                <input 
                                    type="date" 
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)}
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-amber-600" /> Available Times
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {timeSlots.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTime(t)}
                                            className={`py-2 rounded-xl border text-sm font-medium transition-all ${
                                                time === t 
                                                ? 'bg-amber-600 border-amber-600 text-white shadow-md shadow-amber-600/20' 
                                                : 'bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-amber-50'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => setStep(2)}
                                className="w-full bg-zinc-900 text-white rounded-xl py-3.5 font-medium mt-4 hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleBook} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-6">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Booking Summary</h4>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p>Service: <span className="text-gray-900">{service.name}</span></p>
                                    <p>Date: <span className="text-gray-900">{date} at {time}</span></p>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button 
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 bg-white border border-gray-200 text-gray-700 rounded-xl py-3.5 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] bg-amber-600 text-white rounded-xl py-3.5 font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/30 flex justify-center items-center"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        'Confirm Booking'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif text-gray-900 mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                Thank you, {name}. Your appointment for {service.name} is confirmed for {date} at {time}. We've sent a confirmation SMS to {phone}.
                            </p>
                            <button 
                                onClick={onClose}
                                className="bg-zinc-900 text-white px-8 py-3 rounded-full font-medium hover:bg-zinc-800 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
