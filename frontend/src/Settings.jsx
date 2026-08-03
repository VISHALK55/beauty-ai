import React, { useState } from 'react';
import { Settings as SettingsIcon, CheckCircle2, Lock, KeyRound } from 'lucide-react';
import { api } from './api';
import { useAuth } from './context/AuthContext';

export default function Settings() {
    const { userRole, salonId } = useAuth();
    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    if (userRole !== 'SALON_OWNER' && userRole !== 'SUPER_ADMIN') {
        return (
            <div className="flex items-center justify-center h-full text-red-500 font-bold">
                Access Denied.
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPin !== confirmPin) {
            setErrorMessage("New PIN and Confirm PIN do not match.");
            setStatus('error');
            return;
        }

        if (newPin.length < 6) {
            setErrorMessage("New PIN must be at least 6 characters.");
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            await api.changeSalonPin(currentPin, newPin);
            setStatus('success');
            setCurrentPin('');
            setNewPin('');
            setConfirmPin('');
        } catch (error) {
            setErrorMessage(error.message || "Failed to change PIN.");
            setStatus('error');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto h-full overflow-y-auto pb-20">
            <div className="flex items-center gap-3 mb-8">
                <SettingsIcon size={32} className="text-gold-500" />
                <div>
                    <h1 className="text-3xl font-serif text-white">Account Settings</h1>
                    <p className="text-gray-400">Manage your salon account security and credentials.</p>
                </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <KeyRound className="text-gold-400" size={20}/>
                    Change Secure PIN
                </h2>

                {status === 'success' && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-4 rounded-xl mb-6 flex items-start gap-3">
                        <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                        <div>
                            <p className="font-bold text-sm">PIN successfully updated!</p>
                            <p className="text-xs opacity-80 mt-1">Please use your new PIN the next time you log in to {salonId}.</p>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Current PIN</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="password" 
                                className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors tracking-widest"
                                placeholder="••••••"
                                value={currentPin}
                                onChange={(e) => setCurrentPin(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                        <label className="block text-sm font-bold text-gray-400 mb-1.5 uppercase tracking-wider">New PIN</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="password" 
                                className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors tracking-widest"
                                placeholder="••••••"
                                value={newPin}
                                onChange={(e) => setNewPin(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Confirm New PIN</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="password" 
                                className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors tracking-widest"
                                placeholder="••••••"
                                value={confirmPin}
                                onChange={(e) => setConfirmPin(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className={`mt-4 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {status === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <SettingsIcon size={18} />
                        )}
                        {status === 'loading' ? 'Updating...' : 'Update Secure PIN'}
                    </button>
                </form>
            </div>
        </div>
    );
}
