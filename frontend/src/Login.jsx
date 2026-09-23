import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { api } from './api';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1 = Enter Phone, 2 = Enter OTP
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!phone || phone.length < 10) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }
        
        setError('');
        setIsLoading(true);
        
        try {
            await api.sendOtp(phone);
            setStep(2);
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 4) {
            setError('Please enter a valid OTP.');
            return;
        }
        
        setError('');
        setIsLoading(true);
        
        try {
            const response = await api.verifyOtp(phone, otp);
            if (response.token) {
                login(response.token, response.role, response.salonId);
                navigate('/dashboard/ad-campaigns');
            } else {
                setError('Invalid OTP.');
            }
        } catch (err) {
            setError('Incorrect OTP. Please check the code and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="glass-panel p-8 rounded-2xl w-full max-w-md border border-gold-500/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-content mb-2">Partner Portal</h2>
                    <p className="text-muted">Enter your mobile number to log in securely.</p>
                </div>
                
                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>}
                
                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Mobile Number</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-divider-strong bg-dark-900 text-muted font-bold">
                                    +91
                                </span>
                                <input 
                                    type="tel" 
                                    placeholder="e.g. 9876543210"
                                    className="w-full bg-secondary border border-divider-strong rounded-r-xl px-4 py-3 text-content focus:outline-none focus:border-gold-500 transition-colors tracking-wider"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    required
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-accent hover:bg-gold-400 text-primary font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Sending...' : 'Send Secure OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                        <div className="text-center mb-4">
                            <p className="text-sm text-muted">We sent a 6-digit code to</p>
                            <p className="font-bold text-accent tracking-wider mt-1">+91 {phone}</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-muted mb-2">Enter OTP</label>
                            <input 
                                type="text" 
                                placeholder="••••••"
                                className="w-full bg-secondary border border-divider-strong rounded-xl px-4 py-4 text-center text-2xl text-content tracking-[0.5em] focus:outline-none focus:border-gold-500 transition-colors font-mono"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                required
                            />
                            <p className="text-xs text-muted mt-2 text-center">Use <span className="text-gold-500 font-bold">123456</span> for testing</p>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-accent hover:bg-gold-400 text-primary font-bold py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Verifying...' : 'Verify & Login'}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={() => { setStep(1); setOtp(''); setError(''); }}
                            className="w-full text-muted hover:text-white text-sm font-medium transition-colors"
                        >
                            Change Mobile Number
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
